import { useQuery, useQueries } from '@tanstack/react-query';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository } from '../../../core/repositories/pokemonRepository';

const BATCH_SIZE = 20;

/**
 * Returns the first N loaded Pokémon details.
 * Uses TanStack Query's built-in caching — no race conditions, no stale state.
 */
export function usePokemonBatch(count: number = BATCH_SIZE) {
  return useQuery<Pokemon[]>({
    queryKey: ['pokemon-batch', count],
    queryFn: async () => {
      const ids = Array.from({ length: count }, (_, i) => i + 1);
      return pokemonRepository.getBatch(ids);
    },
    staleTime: 1000 * 0, // Always fresh — we manage pagination manually
    gcTime: 1000 * 0,
  });
}

/**
 * Fetches details for specific Pokémon IDs on demand.
 * Returns a Map for O(1) lookups.
 */
export function usePokemonDetails(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ['pokemon-detail', id],
      queryFn: () => pokemonRepository.getById(id),
      staleTime: 1000 * 60 * 10, // 10 min
      gcTime: 1000 * 60 * 30,
    })),
    combine: (results) => {
      const map = new Map<number, Pokemon>();
      results.forEach((r) => {
        if (r.status === 'success' && r.data) {
          map.set(r.data.rawId, r.data);
        }
      });
      return map;
    },
  });
}
