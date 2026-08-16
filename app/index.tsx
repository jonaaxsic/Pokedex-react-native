import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { colors } from '../src/theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Background white */}
      <View style={styles.background} />

      {/* Top content: title + banner + subtitle */}
      <View style={styles.topContent}>
        <Image
          source={require('../assets/images/pokedex-ui/new-title.png')}
          style={[styles.title, { width: width * 0.88 }]}
          resizeMode="contain"
        />

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

        <Text style={styles.subtitle}>Explora el mundo Pokemon</Text>
        <Text style={styles.description}>
          Descubre, captura y conoce a todos los Pokemon.
        </Text>
      </View>

      {/* Bottom section: pokeball sits on the separator curve */}
      <View style={styles.bottomSection}>
        {/* Separator as background - curve at bottom */}
        <Image
          source={require('../assets/images/pokedex-ui/separator-red.png')}
          style={styles.separator}
          resizeMode="contain"
        />
        {/* Pokeball positioned just above the curve */}
        <Image
          source={require('../assets/images/pokedex-ui/pokeball-grass.png')}
          style={[styles.pokeballGrass, { width: width * 0.62 }]}
          resizeMode="contain"
        />
        {/* COMENZAR button on the curve */}
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
  topContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 12,
  },
  title: {
    height: 180,
    marginBottom: 12,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16,
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
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 260,
  },
  pokeballGrass: {
    marginBottom: -30,
    zIndex: 1,
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
    zIndex: 2,
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
    zIndex: 2,
    marginBottom: 40,
  },
});
