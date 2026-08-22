/**
 * Centralized TanStack Query keys and cache timing.
 * Single source of truth — import from here instead of inlining arrays/times.
 */

export const pokemonKeys = {
  index: ['pokemon-index'] as const,
  detail: (id: number | null) => ['pokemon-detail', id] as const,
};

/** How long data is considered fresh (no refetch). Pokemon data is static. */
export const CACHE_TIMES = {
  /** Full index of Pokemon refs */
  index: {
    staleTime: 1000 * 60 * 30,     // 30 min
    gcTime:    1000 * 60 * 60,       // 1 hour
  },
  /** Single Pokemon detail */
  detail: {
    staleTime: 1000 * 60 * 60,      // 1 hour
    gcTime:    1000 * 60 * 60 * 2,   // 2 hours
  },
} as const;
