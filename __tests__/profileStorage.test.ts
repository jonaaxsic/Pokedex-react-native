import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadProfile, saveProfile } from '../src/features/profile/storage/profileStorage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('profileStorage', () => {
  beforeEach(() => AsyncStorage.clear());

  it('loadProfile returns default when no data', async () => {
    const profile = await loadProfile();
    expect(profile).toEqual({ username: 'Entrenador Pokemon', avatarId: 'none' });
  });

  it('saveProfile persists profile', async () => {
    await saveProfile({ username: 'Ash', avatarId: 'trainer-red' });
    const loaded = await loadProfile();
    expect(loaded).toEqual({ username: 'Ash', avatarId: 'trainer-red' });
  });

  it('loadProfile returns default on corrupt data', async () => {
    await AsyncStorage.setItem('@pokedex_profile', 'BAD');
    const profile = await loadProfile();
    expect(profile).toEqual({ username: 'Entrenador Pokemon', avatarId: 'none' });
  });

  it('saveProfile overwrites previous data', async () => {
    await saveProfile({ username: 'Ash', avatarId: 'trainer-red' });
    await saveProfile({ username: 'Misty', avatarId: 'misty' });
    const loaded = await loadProfile();
    expect(loaded.username).toBe('Misty');
    expect(loaded.avatarId).toBe('misty');
  });
});
