// src/features/favorites/screens/FavoritesScreen.tsx
import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PokemonCard from '../../pokedex/components/PokemonCard';
import PokemonDetailModal from '../../pokedex/components/PokemonDetailModal';
import { Pokemon } from '../../../core/models/Pokemon';
import { useFavorites } from '../hooks/useFavorites';
import { usePokemonDetails } from '../../../core/hooks/usePokemonDetail';
import { useActivity } from '../../../shared/activity/context/ActivityContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { logActivity } = useActivity();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handleToggleFavorite = useCallback((id: string) => {
    const wasFavorite = isFavorite(id);
    toggleFavorite(id);
    const pokemonId = parseInt(id.replace('#', ''), 10);
    if (!wasFavorite) {
      logActivity('pokemon_favorite', 'Pokemon favorito', 'Agregaste a tu lista de favoritos', pokemonId);
    }
  }, [isFavorite, toggleFavorite, logActivity]);

  const favoriteIds = favorites
    .map((id) => parseInt(id.replace('#', ''), 10))
    .filter((n) => !isNaN(n));

  const favoriteMap = usePokemonDetails(favoriteIds);

  const favoritePokemon = favoriteIds
    .map((id) => favoriteMap.get(id))
    .filter((p): p is Pokemon => p != null);

  const loading = favoriteIds.length > 0 && favoriteMap.size === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header - same pattern as PokedexScreen */}
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#6B7280" />
        </Pressable>

        <View style={styles.headerSpacer} />

        <View style={styles.banner}>
          <Ionicons name="heart" size={20} color="#EF4444" />
          <Text style={styles.bannerText}>FAVORITOS</Text>
        </View>

        <View style={styles.headerSpacer} />
        <View style={styles.headerRight} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A9FE0" />
        </View>
      ) : favoritePokemon.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            Aun no tienes Pokemon favoritos.{'\n'}Toca el corazon en Inicio
            para agregar uno.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePokemon}
          keyExtractor={(item) => item.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={handleToggleFavorite}
              onPress={() => setSelectedPokemon(item)}
            />
          )}
        />
      )}

      <PokemonDetailModal
        pokemon={selectedPokemon}
        visible={selectedPokemon !== null}
        onClose={() => setSelectedPokemon(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4,
  },
  backButton: { padding: 8, borderRadius: 8 },
  backButtonPressed: { backgroundColor: '#E5E7EB' },
  headerSpacer: { flex: 1 },
  headerRight: { width: 38 },
  banner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#E8ECF1', borderRadius: 14,
    paddingVertical: 10, paddingHorizontal: 28,
    marginTop: 8,
    borderTopWidth: 1.5, borderTopColor: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 2, borderBottomColor: 'rgba(160,170,185,0.4)',
  },
  bannerText: { fontSize: 17, fontWeight: '800', color: '#374151', letterSpacing: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyText: { textAlign: 'center', color: '#6B7280', fontSize: 15, lineHeight: 22 },
});
