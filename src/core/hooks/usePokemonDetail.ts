import { useQuery, useQueries } from '@tanstack/react-query';
import { Pokemon } from '../models/Pokemon';
import { pokemonRepository } from '../repositories/pokemonRepository';
import { pokemonKeys, CACHE_TIMES } from '../queryKeys';

/**
 * Fetches a single Pokémon detail by ID.
 * Cached globally — subsequent calls for the same ID hit the cache.
 */
export function usePokemonDetail(id: number | null) {
  return useQuery<Pokemon>({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => pokemonRepository.getById(id!),
    enabled: id != null && id > 0,
    ...CACHE_TIMES.detail,
  });
}

/**
 * Fetches multiple Pokémon details by IDs using TanStack Query.
 * Returns a Map<rawId, Pokemon> for O(1) lookups.
 * Only queries that aren't cached yet are fetched.
 */
export function usePokemonDetails(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: pokemonKeys.detail(id),
      queryFn: () => pokemonRepository.getById(id),
      ...CACHE_TIMES.detail,
    })),
    combine: (results: { status: string; data?: Pokemon }[]) => {
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
