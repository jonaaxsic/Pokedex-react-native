import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../models/Activity';

const STORAGE_KEY = '@pokedex_activity';

export async function loadActivities(): Promise<Activity[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveActivities(activities: Activity[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}
