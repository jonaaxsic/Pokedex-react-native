import React, { useContext } from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesProvider, FavoritesContext } from '../src/features/favorites/context/FavoritesContext';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

function Harness() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) return null;
  return null; // we read values from the captured context ref
}

// Capture context values via a ref
let captured: any = null;
function Capturer() {
  captured = useContext(FavoritesContext);
  return null;
}

function renderProvider() {
  captured = null;
  const renderer = TestRenderer.create(
    <FavoritesProvider>
      <Capturer />
    </FavoritesProvider>
  );
  return renderer;
}

async function waitForLoaded(renderer: any) {
  await act(async () => {
    // flush promises
    await new Promise((r) => setTimeout(r, 50));
  });
  renderer.update(
    <FavoritesProvider>
      <Capturer />
    </FavoritesProvider>
  );
  await act(async () => {
    await new Promise((r) => setTimeout(r, 50));
  });
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    captured = null;
  });

  it('starts with empty favorites', async () => {
    const r = renderProvider();
    await waitForLoaded(r);
    expect(captured).toBeTruthy();
    expect(captured.loading).toBe(false);
    expect(captured.favorites).toEqual([]);
  });

  it('loads persisted favorites', async () => {
    await AsyncStorage.setItem('@pokedex_favorites', JSON.stringify(['#25', '#6']));
    const r = renderProvider();
    await waitForLoaded(r);
    expect(captured.favorites).toEqual(['#25', '#6']);
    expect(captured.isFavorite('#25')).toBe(true);
    expect(captured.isFavorite('#6')).toBe(true);
    expect(captured.isFavorite('#1')).toBe(false);
  });

  it('adds a favorite', async () => {
    const r = renderProvider();
    await waitForLoaded(r);
    act(() => { captured.toggleFavorite('#25'); });
    expect(captured.favorites).toContain('#25');
    expect(captured.isFavorite('#25')).toBe(true);
  });

  it('removes a favorite', async () => {
    await AsyncStorage.setItem('@pokedex_favorites', JSON.stringify(['#25', '#6']));
    const r = renderProvider();
    await waitForLoaded(r);
    act(() => { captured.toggleFavorite('#25'); });
    expect(captured.favorites).not.toContain('#25');
    expect(captured.isFavorite('#25')).toBe(false);
    expect(captured.isFavorite('#6')).toBe(true);
  });

  it('toggle twice removes the favorite (no duplicates)', async () => {
    const r = renderProvider();
    await waitForLoaded(r);
    act(() => { captured.toggleFavorite('#25'); });
    expect(captured.favorites).toContain('#25');
    act(() => { captured.toggleFavorite('#25'); });
    expect(captured.favorites).not.toContain('#25');
    expect(captured.favorites.filter((f: string) => f === '#25')).toHaveLength(0);
  });

  it('persists to AsyncStorage', async () => {
    const r = renderProvider();
    await waitForLoaded(r);
    act(() => { captured.toggleFavorite('#25'); });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
    const stored = JSON.parse(await AsyncStorage.getItem('@pokedex_favorites') ?? '[]');
    expect(stored).toContain('#25');
  });

  it('handles corrupt storage gracefully', async () => {
    await AsyncStorage.setItem('@pokedex_favorites', 'NOT_VALID_JSON');
    const r = renderProvider();
    await waitForLoaded(r);
    expect(captured.favorites).toEqual([]);
  });

  it('supports multiple favorites', async () => {
    const r = renderProvider();
    await waitForLoaded(r);
    act(() => { captured.toggleFavorite('#1'); });
    act(() => { captured.toggleFavorite('#25'); });
    act(() => { captured.toggleFavorite('#150'); });
    expect(captured.favorites).toHaveLength(3);
    expect(captured.isFavorite('#1')).toBe(true);
    expect(captured.isFavorite('#25')).toBe(true);
    expect(captured.isFavorite('#150')).toBe(true);
  });
});
