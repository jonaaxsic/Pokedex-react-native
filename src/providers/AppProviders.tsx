// src/providers/AppProviders.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../features/favorites/context/FavoritesContext';
import { ComingSoonProvider } from '../shared/context/ComingSoonContext';
import { ActivityProvider } from '../shared/activity/context/ActivityContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ComingSoonProvider>
        <ActivityProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </ActivityProvider>
      </ComingSoonProvider>
    </QueryClientProvider>
  );
}
