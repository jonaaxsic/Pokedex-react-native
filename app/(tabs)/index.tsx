import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
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
        style={[styles.bgGrass, { bottom: -25 }]}
        resizeMode="cover"
      />

      {/* Exit button — same height as pokedex back button */}
      <View style={[styles.exitButtonContainer, { top: insets.top + 20 }]}>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.exitButton,
            hovered && styles.exitButtonHover,
            pressed && styles.exitButtonPressed,
          ]}
          onPress={() => setExitModalVisible(true)}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            {/* Door frame */}
            <Path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke={colors.white}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrow */}
            <Path
              d="M16 17l5-5-5-5"
              stroke={colors.white}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Line into door */}
            <Path
              d="M21 12H9"
              stroke={colors.white}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Title - mismas dimensiones/ubicacion que el index */}
        <Image
          source={require('../../assets/images/pokedex-ui/new-title.png')}
          style={[styles.title, { width: width * 0.99 }]}
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
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.35)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(120,20,20,0.55)',
  },
  exitButtonHover: {
    backgroundColor: '#DC2626',
  },
  exitButtonPressed: {
    backgroundColor: '#B91C1C',
    borderTopWidth: 1,
    borderBottomWidth: 1.5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: -36,
    marginBottom: 4,
  },
  title: {
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
