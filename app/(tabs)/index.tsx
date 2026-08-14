import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeTabScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
          Selecciona una opción del menú inferior
        </Text>

        {/* Opciones */}
        <View style={styles.options}>
          <View style={styles.option}>
            <Text style={styles.optionIcon}>📋</Text>
            <Text style={styles.optionText}>Pokédex</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionIcon}>❤️</Text>
            <Text style={styles.optionText}>Favoritos</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionIcon}>👤</Text>
            <Text style={styles.optionText}>Perfil</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionIcon}>⚔️</Text>
            <Text style={styles.optionText}>Battle</Text>
          </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    width: 240,
    height: 70,
    marginBottom: 40,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  option: {
    width: (width - 80) / 2 - 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
