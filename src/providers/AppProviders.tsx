// src/providers/AppProviders.tsx
import React from 'react';
import { FavoritesProvider } from '../features/favorites/context/FavoritesContext';
import { ComingSoonProvider } from '../shared/context/ComingSoonContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ComingSoonProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ComingSoonProvider>
  );
}
