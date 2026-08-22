import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadActivities, saveActivities } from '../src/shared/activity/storage/activityStorage';
import { createActivity } from '../src/shared/activity/models/Activity';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('activityStorage', () => {
  beforeEach(() => AsyncStorage.clear());

  it('loadActivities returns empty array when no data', async () => {
    const result = await loadActivities();
    expect(result).toEqual([]);
  });

  it('saveActivities persists activities', async () => {
    const activities = [
      createActivity('pokemon_explored', 'Title', 'Desc', 25, 'Pikachu'),
    ];
    await saveActivities(activities);
    const loaded = await loadActivities();
    expect(loaded).toHaveLength(1);
    expect(loaded[0].title).toBe('Title');
  });

  it('loadActivities returns empty array on corrupt data', async () => {
    await AsyncStorage.setItem('@pokedex_activity', 'NOT_JSON');
    const result = await loadActivities();
    expect(result).toEqual([]);
  });
});
