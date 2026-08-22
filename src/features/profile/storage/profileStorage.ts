import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, DEFAULT_PROFILE } from '../models/UserProfile';

const STORAGE_KEY = '@pokedex_profile';

export async function loadProfile(): Promise<UserProfile> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
