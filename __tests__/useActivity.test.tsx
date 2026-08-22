import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityProvider, ActivityContext } from '../src/shared/activity/context/ActivityContext';
import { useActivity } from '../src/shared/activity/context/ActivityContext';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

let captured: any = null;
function Capturer() {
  captured = useActivity();
  return null;
}

function renderProvider() {
  captured = null;
  return TestRenderer.create(
    <ActivityProvider>
      <Capturer />
    </ActivityProvider>
  );
}

async function flush(renderer: any) {
  await act(async () => { await new Promise(r => setTimeout(r, 50)); });
  renderer.update(
    <ActivityProvider>
      <Capturer />
    </ActivityProvider>
  );
}

describe('ActivityContext', () => {
  beforeEach(() => AsyncStorage.clear());

  it('starts with empty activities and loading false', async () => {
    const renderer = renderProvider();
    await flush(renderer);
    expect(captured.loading).toBe(false);
    expect(captured.activities).toEqual([]);
  });

  it('loads persisted activities on mount', async () => {
    const stored = [
      { id: '1', type: 'pokemon_explored', title: 'Pikachu', description: 'Viste a Pikachu', timestamp: Date.now(), pokemonId: 25 },
    ];
    await AsyncStorage.setItem('@pokedex_activity', JSON.stringify(stored));
    const renderer = renderProvider();
    await flush(renderer);
    expect(captured.activities).toHaveLength(1);
    expect(captured.activities[0].title).toBe('Pikachu');
  });

  it('logActivity adds activity to list', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      captured.logActivity('pokemon_explored', 'Pikachu', 'Viste a Pikachu', 25, 'Pikachu');
    });

    expect(captured.activities).toHaveLength(1);
    expect(captured.activities[0].type).toBe('pokemon_explored');
    expect(captured.activities[0].pokemonName).toBe('Pikachu');
  });

  it('logActivity persists to AsyncStorage', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      captured.logActivity('pokemon_favorite', 'Fav', 'Added', 25, 'Pikachu');
    });

    // Wait for useEffect to persist
    await act(async () => { await new Promise(r => setTimeout(r, 50)); });

    const stored = JSON.parse(await AsyncStorage.getItem('@pokedex_activity') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].type).toBe('pokemon_favorite');
  });

  it('trims activities to max 20', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      for (let i = 0; i < 25; i++) {
        captured.logActivity('pokemon_explored', `P${i}`, `Desc ${i}`, i, `P${i}`);
      }
    });

    expect(captured.activities).toHaveLength(20);
  });

  it('newer activities appear first', async () => {
    const renderer = renderProvider();
    await flush(renderer);

    await act(async () => {
      captured.logActivity('pokemon_explored', 'First', 'D1', 1);
      captured.logActivity('pokemon_explored', 'Second', 'D2', 2);
    });

    expect(captured.activities[0].title).toBe('Second');
    expect(captured.activities[1].title).toBe('First');
  });

});
