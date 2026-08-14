// src/providers/AppProviders.tsx
import React from 'react';
import { FavoritesProvider } from '../features/favorites/context/FavoritesContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
