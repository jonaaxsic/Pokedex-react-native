import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeTabScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Fondo */}
      <Image
        source={require('../../assets/images/fondo-otros.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Logo arriba */}
        <Image
          source={require('../../assets/images/logoindex.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título debajo del logo */}
        <Image
          source={require('../../assets/images/titulo_logo.png')}
          style={styles.title}
          resizeMode="contain"
        />

        {/* Mensaje */}
        <Text style={styles.message}>
          Selecciona una opción del menú inferior
        </Text>
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
    paddingHorizontal: 20,
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
    marginTop: 24,
    paddingHorizontal: 16,
  },
});