// src/features/profile/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../favorites/hooks/useFavorites';

const avatarOptions = [
  { icon: 'person', label: 'Predeterminado' },
  { icon: 'person-circle', label: 'Circle' },
  { icon: 'person-add', label: 'Add' },
  { icon: 'shield', label: 'Escudo' },
  { icon: 'skull', label: 'Cráneo' },
  { icon: 'glasses', label: 'Gafas' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [selectedAvatar, setSelectedAvatar] = useState('person');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header con back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Avatar con selección */}
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => setShowAvatarSelector(!showAvatarSelector)}
            activeOpacity={0.7}
          >
            <View style={styles.avatarCircle}>
              <Ionicons name={selectedAvatar} size={56} color="#9CA3AF" />
            </View>
            <Text style={styles.name}>Entrenador Pokémon</Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" style={styles.avatarChevron} />
          </TouchableOpacity>

          {/* Selector de avatar */}
          {showAvatarSelector && (
            <View style={styles.avatarSelector}>
              <Text style={styles.avatarSelectorTitle}>Selecciona un avatar</Text>
              <View style={styles.avatarOptions}>
                {avatarOptions.map((option) => (
                  <TouchableOpacity
                    key={option.icon}
                    style={[
                      styles.avatarOption,
                      selectedAvatar === option.icon && styles.avatarOptionSelected,
                    ]}
                    onPress={() => {
                      setSelectedAvatar(option.icon);
                      setShowAvatarSelector(false);
                    }}
                  >
                    <Ionicons
                      name={option.icon}
                      size={32}
                      color={selectedAvatar === option.icon ? '#EF4444' : '#9CA3AF'}
                    />
                    <Text style={styles.avatarOptionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>Regiones vistas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Batallas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
    marginRight: -8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#111827' },
  avatarChevron: {
    marginTop: 4,
    opacity: 0.5,
  },
  avatarSelector: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  avatarSelectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  avatarOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  avatarOption: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    paddingVertical: 8,
    borderRadius: 12,
  },
  avatarOptionSelected: {
    backgroundColor: '#FEE2E2',
  },
  avatarOptionLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  statCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    minWidth: 90,
  },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 13, color: '#6B7280', marginTop: 4 },
});