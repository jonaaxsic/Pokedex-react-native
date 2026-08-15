import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../src/shared/components/SearchBar';
import PokemonCard from '../src/features/pokedex/components/PokemonCard';
import { usePokemonList } from '../src/features/pokedex/hooks/usePokemonList';
import { useFavorites } from '../src/features/favorites/hooks/useFavorites';

// Pokémon iniciales
const IDS_INICIALES = [7, 4, 1, 94, 25, 133];

export default function PokedexScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { pokemonList, loading, error } = usePokemonList(IDS_INICIALES);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(
    () => pokemonList.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query, pokemonList]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header con botón volver sutil */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Barra de búsqueda */}
      <SearchBar value={query} onChangeText={setQuery} />

      {/* Contenido */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A9FE0" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No se encontraron resultados</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
