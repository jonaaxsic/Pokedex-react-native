import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository, PokemonRef } from '../../../core/repositories/pokemonRepository';
import { searchPokemonRefs } from '../utils/searchPokemon';
import { usePokemonIndex } from './usePokemonIndex';
import { pokemonKeys, CACHE_TIMES } from '../../../core/queryKeys';

const BATCH_SIZE = 20;

/**
 * Complete Pokedex hook powered by TanStack Query cache.
 *
 * - Index (all Pokémon refs) is cached globally — 1 request, 30 min fresh.
 * - Detail batches go through queryClient.fetchQuery — cached per ID.
 * - Search fetches on-demand from the index, then batch-loads only missing details.
 * - Race conditions handled via abortRef.
 */
const EMPTY_REFS: PokemonRef[] = [];

export function usePokedex(query: string = '') {
  const queryClient = useQueryClient();
  const { data, isLoading: indexLoading, error: indexError } = usePokemonIndex();
  const refs = data ?? EMPTY_REFS;
  const [details, setDetails] = useState<Map<number, Pokemon>>(new Map());
  const detailsRef = useRef(details);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef(0);
  const prefetchedAt = useRef(-1);

  detailsRef.current = details;

  /**
   * Fetch a batch of IDs through TanStack Query cache.
   * Each individual Pokemon is cached by pokemonKeys.detail(id).
   */
  const fetchBatchCached = useCallback(
    async (ids: number[]): Promise<Pokemon[]> => {
      const results = await Promise.all(
        ids.map((id) =>
          queryClient.fetchQuery<Pokemon>({
            queryKey: pokemonKeys.detail(id),
            queryFn: () => pokemonRepository.getById(id),
            ...CACHE_TIMES.detail,
          })
        )
      );
      return results;
    },
    [queryClient]
  );

  /** Prefetch next batch into query cache (fire-and-forget). */
  const prefetchNext = useCallback(() => {
    if (loadingMore || indexLoading) return;
    const nextStart = loadedCount;
    if (nextStart >= refs.length) return;
    if (prefetchedAt.current === nextStart) return;
    prefetchedAt.current = nextStart;
    const ids = refs.slice(nextStart, nextStart + BATCH_SIZE).map((r) => r.id);
    fetchBatchCached(ids).catch(() => { prefetchedAt.current = -1; });
  }, [loadingMore, indexLoading, loadedCount, refs, fetchBatchCached]);

  // Load first batch on mount
  useEffect(() => {
    if (refs.length === 0 || loadedCount > 0) return;

    const firstIds = refs.slice(0, BATCH_SIZE).map((r) => r.id);
    setLoadingMore(true);

    fetchBatchCached(firstIds)
      .then((pokes) => {
        setDetails(new Map(pokes.map((p) => [p.rawId, p])));
        setLoadedCount(BATCH_SIZE);
      })
      .finally(() => setLoadingMore(false));
  }, [refs, loadedCount, fetchBatchCached]);

  // Load more batches
  const loadMore = useCallback(async () => {
    if (loadingMore || loadedCount >= refs.length) return;
    setLoadingMore(true);
    const nextIds = refs
      .slice(loadedCount, loadedCount + BATCH_SIZE)
      .map((r) => r.id);
    const pokes = await fetchBatchCached(nextIds);
    setDetails((prev) => {
      const next = new Map(prev);
      pokes.forEach((p) => next.set(p.rawId, p));
      return next;
    });
    setLoadedCount((prev) => prev + BATCH_SIZE);
    setLoadingMore(false);
  }, [loadingMore, loadedCount, refs, fetchBatchCached]);

  // Search with on-demand fetch
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      ++abortRef.current;
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (refs.length === 0) return;

    const thisSearch = ++abortRef.current;
    setIsSearching(true);

    const matches = searchPokemonRefs(refs, trimmed);
    if (matches.length === 0) {
      if (thisSearch === abortRef.current) {
        setSearchResults([]);
        setIsSearching(false);
      }
      return;
    }

    const currentDetails = detailsRef.current;
    const missing = matches.filter((m) => !currentDetails.has(m.id));

    if (missing.length === 0) {
      const results = matches.map((m) => currentDetails.get(m.id)!);
      if (thisSearch === abortRef.current) {
        setSearchResults(results);
        setIsSearching(false);
      }
      return;
    }

    // Fetch missing through cache
    fetchBatchCached(missing.map((m) => m.id))
      .then((fetched) => {
        if (thisSearch !== abortRef.current) return;

        const fetchedMap = new Map(fetched.map((p) => [p.rawId, p]));
        const results = matches
          .map((m) => fetchedMap.get(m.id) ?? currentDetails.get(m.id) ?? null)
          .filter((p): p is Pokemon => p != null);

        setSearchResults(results);
        setIsSearching(false);
      })
      .catch(() => {
        if (thisSearch === abortRef.current) {
          setSearchResults([]);
          setIsSearching(false);
        }
      });
  }, [query, refs, fetchBatchCached]);

  const displayData = useMemo(
    () =>
      query.trim()
        ? searchResults
        : Array.from(details.values()).sort((a, b) => a.rawId - b.rawId),
    [query, searchResults, details]
  );

  const loading = indexLoading;
  const error = indexError?.message ?? null;
  const hasMore = loadedCount < refs.length;

  return {
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    displayData,
    isSearching,
    prefetchNext,
  };
}
