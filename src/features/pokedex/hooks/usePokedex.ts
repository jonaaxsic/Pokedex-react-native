import { useEffect, useState, useCallback } from 'react';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository, PokemonRef } from '../../../core/repositories/pokemonRepository';

const BATCH_SIZE = 20;

export function usePokedex() {
  const [refs, setRefs] = useState<PokemonRef[]>([]);
  const [details, setDetails] = useState<Map<number, Pokemon>>(new Map());
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 1) Trae el índice completo (1 solo request, rápido)
  useEffect(() => {
    let cancelled = false;

    pokemonRepository
      .getAllRefs()
      .then(async (allRefs) => {
        if (cancelled) return;
        setRefs(allRefs);
        // 2) Carga el primer lote de detalle
        const firstBatch = allRefs.slice(0, BATCH_SIZE).map((r) => r.id);
        const pokes = await pokemonRepository.getBatch(firstBatch);
        if (cancelled) return;
        setDetails(new Map(pokes.map((p) => [p.rawId, p])));
        setLoadedCount(BATCH_SIZE);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? 'Error al cargar Pokemon');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // 3) loadMore pide el SIGUIENTE lote real a la API
  const loadMore = useCallback(async () => {
    if (loadingMore || loadedCount >= refs.length) return;
    setLoadingMore(true);
    const nextIds = refs.slice(loadedCount, loadedCount + BATCH_SIZE).map((r) => r.id);
    const pokes = await pokemonRepository.getBatch(nextIds);
    setDetails((prev) => {
      const next = new Map(prev);
      pokes.forEach((p) => next.set(p.rawId, p));
      return next;
    });
    setLoadedCount((prev) => prev + BATCH_SIZE);
    setLoadingMore(false);
  }, [refs, loadedCount, loadingMore]);

  // 4) Buscar: si el pokemon ya está en refs pero no tiene detalle, lo pide bajo demanda
  const searchPokemon = useCallback(
    async (query: string): Promise<Pokemon[]> => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return Array.from(details.values()).sort((a, b) => a.rawId - b.rawId);
      }

      const cleanQuery = q.replace(/^0+/, '');
      const matches = refs.filter(
        (r) => r.name.toLowerCase().includes(q) || r.id.toString() === cleanQuery
      );

      // pide el detalle de los que falten
      const missing = matches.filter((m) => !details.has(m.id));
      if (missing.length > 0) {
        const fetched = await pokemonRepository.getBatch(missing.map((m) => m.id));
        setDetails((prev) => {
          const next = new Map(prev);
          fetched.forEach((p) => next.set(p.rawId, p));
          return next;
        });
      }

      return matches
        .map((m) => details.get(m.id) ?? null)
        .filter((p): p is Pokemon => p !== null);
    },
    [refs, details]
  );

  // 5) Get displayed Pokemon (sync wrapper for FlatList)
  const getDisplayedPokemon = useCallback(
    (query: string): Pokemon[] => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return Array.from(details.values()).sort((a, b) => a.rawId - b.rawId);
      }

      const cleanQuery = q.replace(/^0+/, '');
      return refs
        .filter(
          (r) => r.name.toLowerCase().includes(q) || r.id.toString() === cleanQuery
        )
        .map((m) => details.get(m.id))
        .filter((p): p is Pokemon => p !== null);
    },
    [refs, details]
  );

  const hasMore = loadedCount < refs.length;

  return {
    allPokemon: Array.from(details.values()),
    loading,
    loadingMore,
    error,
    hasMore,
    loadedCount,
    loadMore,
    searchPokemon,
    getDisplayedPokemon,
  };
}
