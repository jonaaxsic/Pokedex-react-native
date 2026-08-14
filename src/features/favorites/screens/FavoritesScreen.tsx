// src/features/favorites/screens/FavoritesScreen.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../../pokedex/components/PokemonCard';
import { Pokemon } from '../../../core/models/Pokemon';
import { pokemonRepository } from '../../../core/repositories/pokemonRepository';
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesScreen() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoritePokemon([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const numericIds = favorites.map((id) => parseInt(id.replace('#', ''), 10));
    pokemonRepository
      .getByIds(numericIds)
      .then(setFavoritePokemon)
      .catch((e) => console.warn('Error cargando favoritos', e))
      .finally(() => setLoading(false));
  }, [favorites]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Favoritos</Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A9FE0" />
        </View>
      ) : favoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Aún no tienes Pokémon favoritos.{'\n'}Toca el corazón en Inicio
            para agregar uno.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePokemon}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 8, marginBottom: 8 },
  emptyText: { textAlign: 'center', color: '#6B7280', fontSize: 15, lineHeight: 22 },
});
