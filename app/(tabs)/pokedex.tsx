import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function PokedexMenuScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Fondo */}
      <Image
        source={require('../../assets/images/fondo-otros.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logoindex.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Image
          source={require('../../assets/images/titulo_logo.png')}
          style={styles.title}
          resizeMode="contain"
        />

        {/* Mensaje */}
        <Text style={styles.message}>
          Selecciona una opción
        </Text>

        {/* Opciones como botones funcionales */}
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
            onPress={() => router.push('/battle')}
          >
            <Ionicons name="flash" size={32} color="#F59E0B" />
            <Text style={styles.optionText}>Batalla</Text>
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
  background: {
    position: 'absolute',
    width: width,
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    width: 240,
    height: 70,
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
});