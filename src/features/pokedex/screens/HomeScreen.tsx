// src/features/pokedex/screens/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator, View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../shared/components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { usePokemonList } from '../hooks/usePokemonList';
import { useFavorites } from '../../favorites/hooks/useFavorites';

// Mismos Pokémon del mockup: Squirtle, Charmander, Bulbasaur, Gengar, Pikachu, Eevee
const IDS_INICIALES = [7, 4, 1, 94, 25, 133];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();
  const { pokemonList, loading, error } = usePokemonList(IDS_INICIALES);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filtered = useMemo(
    () => pokemonList.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
    [query, pokemonList]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <ActivityIndicator size="large" color="#4A9FE0" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Image
        source={require('../../../../assets/images/pokedex-ui/new-title.png')}
        style={[styles.title, { width: width * 0.88 }]}
        resizeMode="contain"
      />
      <SearchBar value={query} onChangeText={setQuery} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { height: 180, marginBottom: 8, alignSelf: 'center' },
  errorText: { color: '#EF4444', textAlign: 'center', paddingHorizontal: 24 },
});
