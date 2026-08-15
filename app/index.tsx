import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { colors } from '../src/theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background white - no image, clean */}
      <View style={styles.background} />

      {/* Content */}
      <View style={styles.content}>
        {/* Pokemon title */}
        <Image
          source={require('../assets/images/pokedex-ui/new-title.png')}
          style={[styles.title, { width: width * 0.65 }]}
          resizeMode="contain"
        />

        {/* Pokeball banner "POKEDEX" */}
        <View style={styles.banner}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.bannerIcon}
            resizeMode="contain"
          />
          <Text style={styles.bannerText}>POKEDEX</Text>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.bannerIcon}
            resizeMode="contain"
          />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Explora el mundo Pokemon</Text>
        <Text style={styles.description}>
          Descubre, captura y conoce a todos los Pokemon.
        </Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Pokeball on grass */}
        <Image
          source={require('../assets/images/pokedex-ui/pokeball-grass.png')}
          style={[styles.pokeballGrass, { width: width * 0.65, height: width * 0.55 }]}
          resizeMode="contain"
        />
      </View>

      {/* Red separator at bottom */}
      <Image
        source={require('../assets/images/pokedex-ui/separator-red.png')}
        style={styles.separator}
        resizeMode="cover"
      />

      {/* COMENZAR button over the separator curve */}
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>COMENZAR</Text>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.bottomText}>Tu aventura comienza aqui</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    height: 90,
    marginBottom: 8,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    gap: 8,
  },
  bannerIcon: {
    width: 22,
    height: 22,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  spacer: {
    flex: 1,
  },
  pokeballGrass: {
    marginBottom: 0,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    width: '100%',
  },
  buttonArea: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    gap: 10,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.red,
    letterSpacing: 1,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  bottomText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '500',
  },
});
