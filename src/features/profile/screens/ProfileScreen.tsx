// src/features/profile/screens/ProfileScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../favorites/hooks/useFavorites';
import { colors } from '../../../theme/colors';

const AVATAR_SIZE = 60;
const AVATAR_GAP = 14;

const avatarOptions = [
  { id: 'none', image: null, label: 'Sin avatar' },
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
  const { favorites } = useFavorites();
  const [selectedAvatar, setSelectedAvatar] = useState('none');
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

  const currentAvatar = avatarOptions.find(a => a.id === selectedAvatar);
  const hasImage = currentAvatar?.image != null;

  const renderAvatar = ({ item }: { item: typeof avatarOptions[0] }) => {
    const isSelected = selectedAvatar === item.id;
    return (
      <Pressable
        style={({ hovered, pressed }) => [
          styles.avatarItem,
          isSelected && styles.avatarItemSelected,
          hovered && styles.avatarItemHover,
          pressed && styles.avatarItemPressed,
        ]}
        onPress={() => setSelectedAvatar(item.id)}
      >
        {item.image ? (
          <Image source={item.image} style={styles.avatarImage} resizeMode="cover" />
        ) : (
          <View style={styles.emptyAvatar}>
            <Ionicons name="person" size={24} color="#9CA3AF" />
          </View>
        )}
        {isSelected && (
          <View style={styles.avatarCheck}>
            <Ionicons name="checkmark" size={12} color={colors.white} />
          </View>
        )}
      </Pressable>
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
        style={[styles.bgGrass, { bottom: 0 }]}
        resizeMode="cover"
      />

      {/* Header with back button — same height as pokedex */}
      <View style={styles.header}>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.backButton,
            hovered && styles.backButtonHover,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#6B7280" />
        </Pressable>
        <View style={styles.headerSpacer} />
      </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Avatar principal */}
          <Pressable
            style={styles.avatarWrapper}
            onPress={() => setShowAvatarSelector(!showAvatarSelector)}
          >
            <View style={styles.avatarCircle}>
              {hasImage ? (
                <Image
                  source={currentAvatar.image}
                  style={styles.mainAvatarImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.mainEmptyAvatar}>
                  <Ionicons name="person" size={32} color="#9CA3AF" />
                </View>
              )}
            </View>
            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={12} color={colors.red} />
            </View>
          </Pressable>

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
            <Ionicons name="leaf" size={14} color="#22C55E" />
            <Text style={styles.adventureText}>Tu aventura continua</Text>
            <Ionicons name="leaf" size={14} color="#22C55E" />
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
                <Pressable onPress={() => scrollToAvatar('left')} style={styles.arrowButton}>
                  <Ionicons name="chevron-back" size={20} color={colors.red} />
                </Pressable>

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

                <Pressable onPress={() => scrollToAvatar('right')} style={styles.arrowButton}>
                  <Ionicons name="chevron-forward" size={20} color={colors.red} />
                </Pressable>
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
                <Ionicons name="heart" size={20} color={colors.red} />
                <Text style={styles.statNumber}>{favorites.length}</Text>
                <Text style={styles.statLabel}>Favoritos</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="locate" size={20} color={colors.blue} />
                <Text style={styles.statNumber}>1</Text>
                <Text style={styles.statLabel}>Regiones vistas</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="flash" size={20} color="#F97316" />
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

            <Pressable style={({ hovered, pressed }) => [styles.activityRow, hovered && styles.activityRowHover, pressed && styles.activityRowPressed]}>
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
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>

            <Pressable style={({ hovered, pressed }) => [styles.activityRow, hovered && styles.activityRowHover, pressed && styles.activityRowPressed]}>
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
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  backButtonHover: {
    backgroundColor: '#F3F4F6',
  },
  backButtonPressed: {
    backgroundColor: '#E5E7EB',
  },
  headerSpacer: {
    width: 38,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 2,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  mainAvatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  mainEmptyAvatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.7)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(140,150,165,0.35)',
    borderRightWidth: 1.5,
    borderRightColor: 'rgba(140,150,165,0.25)',
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.redSoft,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    marginBottom: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(160,50,50,0.2)',
  },
  badgeIcon: {
    width: 14,
    height: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.red,
  },
  adventureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  adventureText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#EDF0F4',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    width: '100%',
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255,255,255,0.7)',
    borderLeftWidth: 1.5,
    borderLeftColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(140,150,165,0.35)',
    borderRightWidth: 2,
    borderRightColor: 'rgba(140,150,165,0.25)',
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  sectionHeaderIcon: {
    width: 14,
    height: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    letterSpacing: 1,
  },
  avatarCarouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 4,
    borderRadius: 8,
  },
  avatarList: {
    paddingHorizontal: 4,
  },
  avatarItem: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginHorizontal: AVATAR_GAP / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#F3F4F6',
  },
  avatarItemSelected: {
    borderColor: colors.red,
    backgroundColor: colors.redSoft,
  },
  avatarItemHover: {
    opacity: 0.85,
  },
  avatarItemPressed: {
    opacity: 0.7,
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  emptyAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCheck: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: colors.red,
    width: 8,
    height: 8,
    borderRadius: 4,
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
    height: 32,
    backgroundColor: 'rgba(140,150,165,0.3)',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(140,150,165,0.25)',
  },
  activityRowHover: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  activityRowPressed: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  activitySubtitle: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  activityValue: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.red,
    marginTop: 1,
  },
});
