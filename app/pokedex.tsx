import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Pressable,
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
      <Pressable
        style={({ hovered, pressed }) => [
          styles.loadMoreButton,
          hovered && styles.loadMoreButtonHover,
          pressed && styles.loadMoreButtonPressed,
        ]}
        onPress={loadMore}
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
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.backButton,
            hovered && styles.backButtonHover,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#6B7280" />
        </Pressable>

        <View style={styles.headerSpacer} />

        {/* Banner neuromórfico */}
        <View style={styles.banner}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.bannerIcon}
            resizeMode="contain"
          />
          <Text style={styles.bannerText}>POKÉDEX</Text>
        </View>

        <View style={styles.headerSpacer} />

        <View style={styles.headerRight} />
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
          <Pressable
            style={styles.retryButton}
            onPress={() => router.replace('/pokedex')}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={displayData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 24 + insets.bottom }}
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
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  backButtonHover: {
    backgroundColor: '#F3F4F6',
  },
  backButtonPressed: {
    backgroundColor: '#E5E7EB',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8ECF1',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 28,
    marginTop: 8,
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(160,170,185,0.4)',
  },
  bannerIcon: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  bannerText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 3,
  },
  headerSpacer: {
    flex: 1,
  },
  headerRight: {
    width: 38,
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
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.4)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(10,80,20,0.5)',
  },
  loadMoreButtonHover: {
    backgroundColor: '#1DB954',
    transform: [{ translateY: -2 }],
  },
  loadMoreButtonPressed: {
    backgroundColor: colors.greenDark,
    transform: [{ translateY: 2 }],
    borderTopWidth: 3,
    borderTopColor: 'rgba(10,80,20,0.5)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.4)',
  },
  loadMoreText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
