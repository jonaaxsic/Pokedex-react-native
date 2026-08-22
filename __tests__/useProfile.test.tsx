import React, { useContext } from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityProvider, ActivityContext } from '../src/shared/activity/context/ActivityContext';
import { FavoritesProvider } from '../src/features/favorites/context/FavoritesContext';

// useProfile needs ActivityProvider (for useActivity) — but doesn't actually
// use it, so we just wrap it in both.
// We import useProfile directly and test it through a Capturer that uses it.
import { useProfile } from '../src/features/profile/hooks/useProfile';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

let captured: any = null;
function Capturer() {
  captured = useProfile();
  return null;
}

function renderProvider() {
  captured = null;
  return TestRenderer.create(
    <FavoritesProvider>
      <ActivityProvider>
        <Capturer />
      </ActivityProvider>
    </FavoritesProvider>
  );
}

async function flush(renderer: any) {
  await act(async () => { await new Promise(r => setTimeout(r, 50)); });
  renderer.update(
    <FavoritesProvider>
      <ActivityProvider>
        <Capturer />
      </ActivityProvider>
    </FavoritesProvider>
  );
}

describe('useProfile', () => {
  beforeEach(() => AsyncStorage.clear());

  it('loads default profile on mount', async () => {
    const renderer = renderProvider();
    await flush(renderer);
    expect(captured.profile).toEqual({ username: 'Entrenador Pokemon', avatarId: 'none' });
    expect(captured.loading).toBe(false);
  });

  it('loads persisted profile', async () => {
    await AsyncStorage.setItem('@pokedex_profile', JSON.stringify({ username: 'Ash', avatarId: 'trainer-red' }));
    const renderer = renderProvider();
    await flush(renderer);
    expect(captured.profile.username).toBe('Ash');
    expect(captured.profile.avatarId).toBe('trainer-red');
  });

  it('updateProfile saves and updates state', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      await captured.updateProfile({ username: 'Misty' });
    });

    expect(captured.profile.username).toBe('Misty');
    expect(captured.profile.avatarId).toBe('none'); // unchanged

    const stored = JSON.parse(await AsyncStorage.getItem('@pokedex_profile') ?? '{}');
    expect(stored.username).toBe('Misty');
  });

  it('updateProfile merges partial updates', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      await captured.updateProfile({ avatarId: 'pikachu' });
    });

    expect(captured.profile.username).toBe('Entrenador Pokemon');
    expect(captured.profile.avatarId).toBe('pikachu');
  });
});
