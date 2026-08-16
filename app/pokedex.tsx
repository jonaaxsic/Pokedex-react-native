import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../src/shared/components/SearchBar';
import PokemonCard from '../src/features/pokedex/components/PokemonCard';
import PokemonDetailModal from '../src/features/pokedex/components/PokemonDetailModal';
import { usePokedex } from '../src/features/pokedex/hooks/usePokedex';
import { useFavorites } from '../src/features/favorites/hooks/useFavorites';
import { colors } from '../src/theme/colors';
import { Pokemon } from '../src/core/models/Pokemon';

export default function PokedexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const {
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    displayData,
    isSearching,
  } = usePokedex(query);
  const { isFavorite, toggleFavorite } = useFavorites();

  const renderFooter = () => {
    if (!hasMore || query.trim()) return null;
    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={loadMore}
        activeOpacity={0.7}
        disabled={loadingMore}
      >
        {loadingMore ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <>
            <Ionicons name="add-circle-outline" size={20} color={colors.white} />
            <Text style={styles.loadMoreText}>Mostrar mas</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pokedex</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search bar */}
      <SearchBar value={query} onChangeText={setQuery} />

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.red} />
          <Text style={styles.loadingText}>Cargando Pokemon...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={48} color="#D1D5DB" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.replace('/pokedex')}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 24 + insets.bottom }}
          ListFooterComponent={renderFooter}
          renderItem={({ item }: { item: Pokemon }) => (
            <PokemonCard
              pokemon={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onPress={() => setSelectedPokemon(item)}
            />
          )}
          ListEmptyComponent={
            isSearching ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.red} />
                <Text style={styles.loadingText}>Buscando Pokemon...</Text>
              </View>
            ) : (
              <View style={styles.center}>
                <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyText}>
                  No se encontro ningun Pokemon
                </Text>
                <Text style={styles.emptySubtext}>
                  Intenta con otro nombre o numero
                </Text>
              </View>
            )
          }
        />
      )}

      {/* Detail Modal */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        visible={selectedPokemon !== null}
        onClose={() => setSelectedPokemon(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  errorText: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: colors.red,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  loadMoreText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
