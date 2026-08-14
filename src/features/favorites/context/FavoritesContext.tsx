// src/features/favorites/context/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loadFavorites, saveFavorites } from '../storage/favoritesStorage';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites()
      .then(setFavorites)
      .catch((e) => console.warn('No se pudieron cargar los favoritos', e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      saveFavorites(favorites).catch((e) =>
        console.warn('No se pudieron guardar los favoritos', e)
      );
    }
  }, [favorites, loading]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}
