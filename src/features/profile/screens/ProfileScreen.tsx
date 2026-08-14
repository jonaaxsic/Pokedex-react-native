// src/features/profile/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../favorites/hooks/useFavorites';

export default function ProfileScreen() {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={48} color="#9CA3AF" />
        </View>
        <Text style={styles.name}>Entrenador Pokémon</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Regiones vistas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 8, marginBottom: 24 },
  avatarWrapper: { alignItems: 'center', marginBottom: 24 },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  statCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 13, color: '#6B7280', marginTop: 4 },
});
