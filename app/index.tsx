import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo */}
      <Image
        source={require('../assets/images/fondoprincipal.png')}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Contenido */}
      <View style={styles.content}>
        {/* Título arriba */}
        <Image
          source={require('../assets/images/titulo_logo.png')}
          style={styles.title}
          resizeMode="contain"
        />

        {/* Logo debajo del título */}
        <Image
          source={require('../assets/images/logoindex.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Espaciador flexible para empujar el botón hacia abajo */}
        <View style={styles.spacer} />

        {/* Botón Entrar */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  title: {
    width: 280,
    height: 80,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  spacer: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#EF4444',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});