// src/features/profile/screens/ProfileScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../favorites/hooks/useFavorites';
import { useProfile } from '../hooks/useProfile';
import { useActivity } from '../../../shared/activity/context/ActivityContext';
import { formatActivityTime } from '../../../shared/activity/models/Activity';
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
  const { profile, updateProfile } = useProfile();
  const { activities } = useActivity();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.username);
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

  const handleAvatarSelect = async (id: string) => {
    await updateProfile({ avatarId: id });
  };

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (trimmed.length > 0) {
      await updateProfile({ username: trimmed });
    }
    setEditingName(false);
  };

  const currentAvatar = avatarOptions.find(a => a.id === profile.avatarId) ?? avatarOptions[0];
  const hasImage = currentAvatar?.image != null;

  const renderAvatar = ({ item }: { item: typeof avatarOptions[0] }) => {
    const isSelected = profile.avatarId === item.id;
    return (
      <Pressable
        style={({ pressed }) => [
          styles.avatarItem,
          isSelected && styles.avatarItemSelected,
          pressed && styles.avatarItemPressed,
        ]}
        onPress={() => handleAvatarSelect(item.id)}
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

  const uniquePokemonViewed = new Set(
    activities
      .filter(a => a.type === 'pokemon_explored' && a.pokemonId)
      .map(a => a.pokemonId)
  ).size;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.background} />
      <Image
        source={require('../../../../assets/images/icon.png')}
        style={[styles.bgPokeball, { top: 50, right: 10, width: 70, height: 70, opacity: 0.06 }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../../../assets/images/pokedex-ui/pasto.png')}
        style={[styles.bgGrass, { bottom: 0 }]}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={22} color="#6B7280" />
        </Pressable>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <Pressable
          style={styles.avatarWrapper}
          onPress={() => setShowAvatarSelector(!showAvatarSelector)}
        >
          <View style={styles.avatarCircle}>
            {hasImage ? (
              <Image source={currentAvatar.image} style={styles.mainAvatarImage} resizeMode="cover" />
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

        {/* Name - editable */}
        {editingName ? (
          <View style={styles.nameEditRow}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              autoFocus
              onBlur={handleSaveName}
              onSubmitEditing={handleSaveName}
              maxLength={30}
            />
            <Pressable onPress={handleSaveName}>
              <Ionicons name="checkmark-circle" size={24} color={colors.green} />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => { setNameInput(profile.username); setEditingName(true); }}>
            <Text style={styles.name}>{profile.username}</Text>
            <Text style={styles.editNameHint}>Toca para editar</Text>
          </Pressable>
        )}

        {/* Badge */}
        <View style={styles.badge}>
          <Image
            source={require('../../../../assets/images/icon.png')}
            style={styles.badgeIcon}
            resizeMode="contain"
          />
          <Text style={styles.badgeText}>Entrenador</Text>
        </View>

        {/* Avatar selector */}
        {showAvatarSelector && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ELIGE TU AVATAR</Text>
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

        {/* Stats */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ESTADISTICAS</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color={colors.red} />
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="eye" size={20} color={colors.blue} />
              <Text style={styles.statNumber}>{uniquePokemonViewed}</Text>
              <Text style={styles.statLabel}>Vistos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="list" size={20} color="#F97316" />
              <Text style={styles.statNumber}>{activities.length}</Text>
              <Text style={styles.statLabel}>Actividades</Text>
            </View>
          </View>
        </View>

        {/* Recent activity */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVIDAD RECIENTE</Text>
          </View>
          {activities.length === 0 ? (
            <View style={styles.emptyActivity}>
              <Ionicons name="time-outline" size={32} color="#D1D5DB" />
              <Text style={styles.emptyActivityText}>Sin actividad aun</Text>
              <Text style={styles.emptyActivitySubtext}>
                Explora Pokemon y agrega favoritos para ver tu actividad aqui.
              </Text>
            </View>
          ) : (
            activities.slice(0, 10).map((activity) => (
              <View key={activity.id} style={styles.activityRow}>
                <Ionicons
                  name={
                    activity.type === 'pokemon_explored' ? 'eye' : 'heart'
                  }
                  size={18}
                  color={activity.type === 'pokemon_explored' ? colors.blue : colors.red}
                />
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.description}</Text>
                </View>
                <Text style={styles.activityTime}>{formatActivityTime(activity.timestamp)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  background: { ...StyleSheet.absoluteFill, backgroundColor: colors.white },
  bgPokeball: { position: 'absolute' },
  bgGrass: { position: 'absolute', left: 0, right: 0, height: 180, opacity: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4 },
  backButton: { padding: 8, borderRadius: 8 },
  backButtonPressed: { backgroundColor: '#E5E7EB' },
  headerSpacer: { width: 38 },
  scrollContent: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 },
  avatarWrapper: { alignItems: 'center', marginBottom: 6, marginTop: 2 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6',
    alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#E5E7EB', overflow: 'hidden',
  },
  mainAvatarImage: { width: 80, height: 80, borderRadius: 40 },
  mainEmptyAvatar: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  editIcon: {
    position: 'absolute', bottom: 2, right: 4, width: 24, height: 24, borderRadius: 12,
    backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 1.5, borderBottomColor: 'rgba(140,150,165,0.35)', elevation: 3,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 2, textAlign: 'center' },
  editNameHint: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginBottom: 4 },
  nameEditRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  nameInput: {
    fontSize: 18, fontWeight: '700', color: '#1E293B', borderBottomWidth: 1,
    borderBottomColor: colors.red, paddingHorizontal: 4, paddingVertical: 2, minWidth: 150,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.redSoft,
    borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4, gap: 4, marginBottom: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1.5, borderBottomColor: 'rgba(160,50,50,0.2)',
  },
  badgeIcon: { width: 14, height: 14 },
  badgeText: { fontSize: 12, fontWeight: '600', color: colors.red },
  sectionCard: {
    backgroundColor: '#EDF0F4', borderRadius: 14, padding: 12, marginBottom: 10, width: '100%',
    borderTopWidth: 1.5, borderTopColor: 'rgba(255,255,255,0.7)',
    borderBottomWidth: 2, borderBottomColor: 'rgba(140,150,165,0.35)', elevation: 4,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#374151', letterSpacing: 1 },
  avatarCarouselContainer: { flexDirection: 'row', alignItems: 'center' },
  arrowButton: { padding: 4, borderRadius: 8 },
  avatarList: { paddingHorizontal: 4 },
  avatarItem: {
    width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2,
    marginHorizontal: AVATAR_GAP / 2, overflow: 'hidden', borderWidth: 2,
    borderColor: 'transparent', backgroundColor: '#F3F4F6',
  },
  avatarItemSelected: { borderColor: colors.red, backgroundColor: colors.redSoft },
  avatarItemPressed: { opacity: 0.7 },
  avatarImage: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
  emptyAvatar: { width: '100%', height: '100%', backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  avatarCheck: {
    position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderRadius: 9,
    backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center',
  },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: colors.red, width: 8, height: 8, borderRadius: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', flex: 1 },
  statDivider: { width: 1, height: 32, backgroundColor: 'rgba(140,150,165,0.3)' },
  statNumber: { fontSize: 22, fontWeight: '700', color: '#1E293B', marginTop: 2 },
  statLabel: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  emptyActivity: { alignItems: 'center', paddingVertical: 20 },
  emptyActivityText: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginTop: 8 },
  emptyActivitySubtext: { fontSize: 12, color: '#9CA3AF', textAlign: 'center', marginTop: 4, lineHeight: 18 },
  activityRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: 'rgba(140,150,165,0.25)',
  },
  activityText: { flex: 1, marginLeft: 10 },
  activityTitle: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  activitySubtitle: { fontSize: 10, color: '#6B7280', marginTop: 1 },
  activityTime: { fontSize: 10, color: '#9CA3AF' },
});
