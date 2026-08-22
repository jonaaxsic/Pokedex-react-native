import { useQuery } from '@tanstack/react-query';
import { pokemonRepository, PokemonRef } from '../../../core/repositories/pokemonRepository';
import { pokemonKeys, CACHE_TIMES } from '../../../core/queryKeys';

/**
 * Fetches the complete Pokémon index (IDs + names).
 * This is a lightweight list — only 1 request, stays fresh for 30 min.
 */
export function usePokemonIndex() {
  return useQuery<PokemonRef[]>({
    queryKey: pokemonKeys.index,
    queryFn: () => pokemonRepository.getAllRefs(),
    ...CACHE_TIMES.index,
  });
}
