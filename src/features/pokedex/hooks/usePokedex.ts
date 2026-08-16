import { useState, useEffect, useMemo, useRef } from 'react';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository } from '../../../core/repositories/pokemonRepository';
import { searchPokemonRefs } from '../utils/searchPokemon';
import { usePokemonIndex } from './usePokemonIndex';

/**
 * Complete Pokedex hook powered by TanStack Query.
 *
 * - Index (all Pokémon refs) is cached globally — 1 request, 30 min fresh.
 * - First 20 details loaded on mount.
 * - Search fetches on-demand from the index, then batch-loads only missing details.
 * - Race conditions handled via abortRef.
 * - No manual state juggling — query cache is the source of truth.
 */
export function usePokedex(query: string = '') {
  const { data: refs = [], isLoading: indexLoading, error: indexError } = usePokemonIndex();
  const [details, setDetails] = useState<Map<number, Pokemon>>(new Map());
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef(0);

  // Load first batch on mount
  useEffect(() => {
    if (refs.length === 0 || loadedCount > 0) return;

    const firstIds = refs.slice(0, 20).map((r) => r.id);
    setLoadingMore(true);

    pokemonRepository
      .getBatch(firstIds)
      .then((pokes) => {
        setDetails(new Map(pokes.map((p) => [p.rawId, p])));
        setLoadedCount(20);
      })
      .finally(() => setLoadingMore(false));
  }, [refs, loadedCount]);

  // Load more batches
  const loadMore = async () => {
    if (loadingMore || loadedCount >= refs.length) return;
    setLoadingMore(true);
    const nextIds = refs.slice(loadedCount, loadedCount + 20).map((r) => r.id);
    const pokes = await pokemonRepository.getBatch(nextIds);
    setDetails((prev) => {
      const next = new Map(prev);
      pokes.forEach((p) => next.set(p.rawId, p));
      return next;
    });
    setLoadedCount((prev) => prev + 20);
    setLoadingMore(false);
  };

  // Search with on-demand fetch
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
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

    // Check which are missing
    const missing = matches.filter((m) => !details.has(m.id));

    if (missing.length === 0) {
      const results = matches.map((m) => details.get(m.id)!);
      if (thisSearch === abortRef.current) {
        setSearchResults(results);
        setIsSearching(false);
      }
      return;
    }

    // Fetch missing
    pokemonRepository
      .getBatch(missing.map((m) => m.id))
      .then((fetched) => {
        if (thisSearch !== abortRef.current) return;

        setDetails((prev) => {
          const next = new Map(prev);
          fetched.forEach((p) => next.set(p.rawId, p));
          return next;
        });

        const fetchedMap = new Map(fetched.map((p) => [p.rawId, p]));
        const results = matches
          .map((m) => fetchedMap.get(m.id) ?? details.get(m.id) ?? null)
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
  }, [query, refs, details]);

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
  };
}
