// este archivo defino a los pokemon favoritos

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@pokedex_favorites";

export async function loadFavorites(): Promise<string[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function saveFavorites(favorites: string[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
