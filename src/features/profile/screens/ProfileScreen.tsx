// src/features/profile/screens/ProfileScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../favorites/hooks/useFavorites';
import { colors } from '../../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AVATAR_SIZE = 52;
const AVATAR_GAP = 16;

const avatarOptions = [
  { id: 'trainer-red', image: require('../../../../assets/images/avatars/trainer-red.png'), label: 'Ash' },
  { id: 'trainer-brown', image: require('../../../../assets/images/avatars/trainer-brown.png'), label: 'May' },
  { id: 'pikachu', image: require('../../../../assets/images/avatars/pikachu.png'), label: 'Pikachu' },
  { id: 'squartle', image: require('../../../../assets/images/avatars/squartle.png'), label: 'Squirtle' },
  { id: 'bulbasaur', image: require('../../../../assets/images/avatars/bulbasaur.png'), label: 'Bulbasaur' },
  { id: 'trainer-blue', image: require('../../../../assets/images/avatars/trainer-blue.png'), label: 'Blue' },
  { id: 'misty', image: require('../../../../assets/images/avatars/misty.png'), label: 'Misty' },
  { id: 'brcok', image: require('../../../../assets/images/avatars/brcok.png'), label: 'Brock' },
  { id: 'enefermera-joy', image: require('../../../../assets/images/avatars/enefermera-joy.png'), label: 'Joy' },
  { id: 'charizard', image: require('../../../../assets/images/avatars/charizard.png'), label: 'Charizard' },
  { id: 'giovani', image: require('../../../../assets/images/avatars/giovani.png'), label: 'Giovanni' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();
  const [selectedAvatar, setSelectedAvatar] = useState('pikachu');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (AVATAR_SIZE + AVATAR_GAP));
    setCurrentPage(index);
  };

  const scrollToAvatar = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? Math.max(0, currentPage - 1)
      : Math.min(avatarOptions.length - 1, currentPage + 1);
    setCurrentPage(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  const renderAvatar = ({ item }: { item: typeof avatarOptions[0] }) => {
    const isSelected = selectedAvatar === item.id;
    return (
      <TouchableOpacity
        style={[styles.avatarItem, isSelected && styles.avatarItemSelected]}
        onPress={() => setSelectedAvatar(item.id)}
        activeOpacity={0.7}
      >
        <Image source={item.image} style={styles.avatarImage} resizeMode="cover" />
        {isSelected && (
          <View style={styles.avatarCheck}>
            <Ionicons name="checkmark" size={14} color={colors.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background decorative elements */}
      <View style={styles.background} />
      <Image
        source={require('../../../../assets/images/icon.png')}
        style={[styles.bgPokeball, { top: 50, right: 10, width: 70, height: 70, opacity: 0.06 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../../../assets/images/icon.png')}
        style={[styles.bgPokeball, { top: 180, left: -20, width: 90, height: 90, opacity: 0.04 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../../../assets/images/pokedex-ui/pasto.png')}
        style={[styles.bgGrass, { bottom: 60 + insets.bottom }]}
        resizeMode="cover"
      />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Avatar principal */}
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => setShowAvatarSelector(!showAvatarSelector)}
            activeOpacity={0.7}
          >
            <View style={styles.avatarCircle}>
              <Image
                source={avatarOptions.find(a => a.id === selectedAvatar)?.image || require('../../../../assets/images/avatars/pikachu.png')}
                style={styles.mainAvatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={14} color={colors.red} />
            </View>
          </TouchableOpacity>

          {/* Name */}
          <Text style={styles.name}>Entrenador Pokemon</Text>

          {/* Badge "Entrenador" */}
          <View style={styles.badge}>
            <Image
              source={require('../../../../assets/images/icon.png')}
              style={styles.badgeIcon}
              resizeMode="contain"
            />
            <Text style={styles.badgeText}>Entrenador</Text>
          </View>

          {/* "Tu aventura continua" */}
          <View style={styles.adventureRow}>
            <Ionicons name="leaf" size={16} color="#22C55E" />
            <Text style={styles.adventureText}>Tu aventura continua</Text>
            <Ionicons name="leaf" size={16} color="#22C55E" />
          </View>

          {/* Avatar selector section */}
          {showAvatarSelector && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Image
                  source={require('../../../../assets/images/icon.png')}
                  style={styles.sectionHeaderIcon}
                  resizeMode="contain"
                />
                <Text style={styles.sectionTitle}>ELIGE TU AVATAR</Text>
                <Image
                  source={require('../../../../assets/images/icon.png')}
                  style={styles.sectionHeaderIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.avatarCarouselContainer}>
                <TouchableOpacity onPress={() => scrollToAvatar('left')} style={styles.arrowButton}>
                  <Ionicons name="chevron-back" size={24} color={colors.red} />
                </TouchableOpacity>

                <FlatList
                  ref={flatListRef}
                  data={avatarOptions}
                  renderItem={renderAvatar}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.avatarList}
                  onMomentumScrollEnd={handleScroll}
                  snapToInterval={AVATAR_SIZE + AVATAR_GAP}
                  decelerationRate="fast"
                />

                <TouchableOpacity onPress={() => scrollToAvatar('right')} style={styles.arrowButton}>
                  <Ionicons name="chevron-forward" size={24} color={colors.red} />
                </TouchableOpacity>
              </View>

              {/* Dots indicator */}
              <View style={styles.dotsContainer}>
                {avatarOptions.map((_, index) => (
                  <View
                    key={index}
                    style={[styles.dot, currentPage === index && styles.dotActive]}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Stats section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Image
                source={require('../../../../assets/images/icon.png')}
                style={styles.sectionHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>ESTADISTICAS</Text>
              <Image
                source={require('../../../../assets/images/icon.png')}
                style={styles.sectionHeaderIcon}
                resizeMode="contain"
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={24} color={colors.red} />
                <Text style={styles.statNumber}>{favorites.length}</Text>
                <Text style={styles.statLabel}>Favoritos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="locate" size={24} color={colors.blue} />
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Regiones vistas</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="flash" size={24} color="#F97316" />
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Batallas</Text>
              </View>
            </View>
          </View>

          {/* Actividad reciente */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Image
                source={require('../../../../assets/images/icon.png')}
                style={styles.sectionHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>ACTIVIDAD RECIENTE</Text>
            </View>

            <TouchableOpacity style={styles.activityRow}>
              <Image
                source={require('../../../../assets/images/pokedex-ui/pokedex-device.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Pokedex</Text>
                <Text style={styles.activitySubtitle}>Region explorada</Text>
                <Text style={styles.activityValue}>Kanto</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.activityRow}>
              <Image
                source={require('../../../../assets/images/pokedex-ui/battle-stadium.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
              <View style={styles.activityText}>
                <Text style={styles.activityTitle}>Batallas</Text>
                <Text style={styles.activitySubtitle}>Ultima batalla</Text>
                <Text style={styles.activityValue}>Sin registros</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    height: 120,
    opacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  mainAvatarImage: {
    width: '100%',
    height: '100%',
  },
  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.redSoft,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 6,
    marginBottom: 8,
  },
  badgeIcon: {
    width: 16,
    height: 16,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.red,
  },
  adventureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  adventureText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionHeaderIcon: {
    width: 16,
    height: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },
  avatarCarouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 4,
  },
  avatarList: {
    paddingHorizontal: 8,
  },
  avatarItem: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginHorizontal: AVATAR_GAP / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarItemSelected: {
    borderColor: colors.red,
    backgroundColor: colors.redSoft,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarCheck: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: colors.red,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  activitySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  activityValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.red,
    marginTop: 2,
  },
});
