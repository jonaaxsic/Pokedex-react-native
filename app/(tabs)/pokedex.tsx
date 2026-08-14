import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function PokedexMenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header con botón volver */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pokédex</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logoindex.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Opciones */}
        <View style={styles.options}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/pokedex')}
          >
            <Ionicons name="list" size={32} color="#3B82F6" />
            <Text style={styles.optionText}>Ver Pokédex</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push('/favorites')}
          >
            <Ionicons name="heart" size={32} color="#EF4444" />
            <Text style={styles.optionText}>Ver Favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  options: {
    gap: 16,
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
});
