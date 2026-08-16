// src/providers/AppProviders.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../features/favorites/context/FavoritesContext';
import { ComingSoonProvider } from '../shared/context/ComingSoonContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min — Pokémon no cambia
      gcTime: 1000 * 60 * 30,   // 30 min cache
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ComingSoonProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </ComingSoonProvider>
    </QueryClientProvider>
  );
}
