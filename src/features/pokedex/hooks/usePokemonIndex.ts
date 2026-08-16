import { useQuery } from '@tanstack/react-query';
import { pokemonRepository, PokemonRef } from '../../../core/repositories/pokemonRepository';

/**
 * Fetches the complete Pokémon index (IDs + names).
 * This is a lightweight list — only 1 request, stays fresh for 30 min.
 */
export function usePokemonIndex() {
  return useQuery<PokemonRef[]>({
    queryKey: ['pokemon-index'],
    queryFn: () => pokemonRepository.getAllRefs(),
    staleTime: 1000 * 60 * 30, // 30 min
    gcTime: 1000 * 60 * 60,    // 1 hour
  });
}
