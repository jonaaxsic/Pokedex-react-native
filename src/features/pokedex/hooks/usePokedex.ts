import { useEffect, useState, useCallback, useRef } from 'react';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository } from '../../../core/repositories/pokemonRepository';

const INITIAL_LOAD = 12;
const LOAD_MORE_COUNT = 10;

export function usePokedex() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [displayedCount, setDisplayedCount] = useState(INITIAL_LOAD);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);

  // Load initial batch
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    setLoading(true);
    setError(null);

    pokemonRepository
      .getFirstN(151) // Load all Gen 1 Pokemon
      .then((result) => {
        // Sort by rawId to ensure sequential order (001, 002, 003...)
        const sorted = result.sort((a, b) => a.rawId - b.rawId);
        setAllPokemon(sorted);
      })
      .catch((e) => {
        setError(e.message ?? 'Error al cargar Pokemon');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Load more handler
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + LOAD_MORE_COUNT);
      setLoadingMore(false);
    }, 300);
  }, [loadingMore]);

  // Search filter - supports name, id, and partial matching
  const searchPokemon = useCallback(
    (query: string): Pokemon[] => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return allPokemon.slice(0, displayedCount);
      }

      // Search all loaded Pokemon by name or id
      const results = allPokemon.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        // Support zero-padded IDs like "015" -> "15" -> match id "15"
        const cleanQuery = q.replace(/^0+/, '');
        const idMatch = p.id.toString() === cleanQuery || p.id.toString() === q;
        return nameMatch || idMatch;
      });

      return results;
    },
    [allPokemon, displayedCount]
  );

  // Get displayed Pokemon
  const getDisplayedPokemon = useCallback(
    (query: string): Pokemon[] => {
      return searchPokemon(query);
    },
    [searchPokemon]
  );

  const hasMore = displayedCount < allPokemon.length;

  return {
    allPokemon,
    loading,
    loadingMore,
    error,
    hasMore,
    displayedCount,
    loadMore,
    getDisplayedPokemon,
  };
}
