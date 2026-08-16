import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import FeatureCard from '../../src/features/pokedex/components/FeatureCard';
import ExitAppModal from '../../src/shared/components/ExitAppModal';
import { useComingSoon } from '../../src/shared/context/ComingSoonContext';

export default function HomeTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { show } = useComingSoon();
  const [exitModalVisible, setExitModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background */}
      <View style={styles.background} />

      {/* Decorative pokeballs in background */}
      <Image
        source={require('../../assets/images/pokedex-ui/icon.png')}
        style={[styles.bgPokeball, { top: 40, right: 20, width: 60, height: 60, opacity: 0.06 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/pokedex-ui/icon.png')}
        style={[styles.bgPokeball, { top: 160, left: -10, width: 80, height: 80, opacity: 0.04 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/pokedex-ui/icon.png')}
        style={[styles.bgPokeball, { bottom: 180, right: -20, width: 100, height: 100, opacity: 0.05 }]}
        resizeMode="contain"
      />

      {/* Leaves decoration - pasto completo */}
      <Image
        source={require('../../assets/images/pokedex-ui/pasto.png')}
        style={[styles.bgGrass, { bottom: 0 }]}
        resizeMode="cover"
      />

      {/* Exit button */}
      <View style={[styles.exitButtonContainer, { top: insets.top + 8 }]}>
        <View style={styles.exitButton}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={colors.red}
            onPress={() => setExitModalVisible(true)}
          />
        </View>
      </View>

      <View style={styles.content}>
        {/* Title - AGRANDADO, primero */}
        <Image
          source={require('../../assets/images/pokedex-ui/new-title.png')}
          style={styles.title}
          resizeMode="contain"
        />

        {/* Logo pokeball - mas pequeno, despues */}
        <Image
          source={require('../../assets/images/pokedex-ui/logoindex.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Welcome message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeIcon}>🔴</Text>
          <Text style={styles.welcomeText}>Bienvenido Entrenador!</Text>
          <Text style={styles.welcomeIcon}>🔴</Text>
        </View>
        <Text style={styles.welcomeSubtitle}>
          Explora, descubre y conviertete{'\n'}en el mejor entrenador.
        </Text>

        {/* Feature Cards */}
        <View style={styles.cardsContainer}>
          <FeatureCard
            title="POKEDEX"
            description="Explora y conoce todos los Pokemon."
            image={require('../../assets/images/pokedex-ui/pokedex-device.png')}
            variant="red"
            onPress={() => router.push('/pokedex' as any)}
          />
          <FeatureCard
            title="BATTLE"
            description="Enfrentate a otros entrenadores."
            image={require('../../assets/images/pokedex-ui/battle-stadium.png')}
            variant="blue"
            onPress={show}
          />
        </View>

        {/* Bottom message */}
        <View style={styles.bottomMessage}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={styles.bottomMessageIcon}
            resizeMode="contain"
          />
          <Text style={styles.bottomMessageText}>Tu aventura comienza aqui</Text>
        </View>
      </View>

      <ExitAppModal
        visible={exitModalVisible}
        onClose={() => setExitModalVisible(false)}
      />
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
  bgPokeball: {
    position: 'absolute',
  },
  bgGrass: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 180,
    opacity: 1,
  },
  exitButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.redSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 4,
  },
  title: {
    width: 300,
    height: 100,
    marginBottom: 16,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  welcomeIcon: {
    fontSize: 14,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  bottomMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bottomMessageIcon: {
    width: 18,
    height: 18,
  },
  bottomMessageText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
