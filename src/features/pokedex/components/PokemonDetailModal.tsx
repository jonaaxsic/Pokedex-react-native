import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pokemon } from '../../../core/models/Pokemon';
import { TYPE_COLORS, TYPE_TEXT_COLORS } from '../constants/typeStyles';

interface Props {
  pokemon: Pokemon | null;
  visible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PokemonDetailModal({ pokemon, visible, onClose }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && pokemon) {
      scaleAnim.setValue(0.3);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 9,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, pokemon]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  if (!pokemon) return null;

  const mainType = pokemon.types[0];
  const bgColor = TYPE_COLORS[mainType] ?? '#A8A29E';
  const textColor = TYPE_TEXT_COLORS[mainType] ?? '#FFFFFF';

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.value, 0);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: bgColor,
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={20} color={textColor} />
          </TouchableOpacity>

          {/* Pokemon ID */}
          <Text style={[styles.pokemonId, { color: textColor }]}>{pokemon.id}</Text>

          {/* Pokemon Image - mas compacto */}
          <Image
            source={{ uri: pokemon.image }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />

          {/* Pokemon Name + Types en la misma zona */}
          <Text style={[styles.pokemonName, { color: textColor }]}>{pokemon.name}</Text>
          <View style={styles.typesRow}>
            {pokemon.types.map((type) => (
              <View key={type} style={styles.typeBadge}>
                <Text style={[styles.typeText, { color: textColor }]}>{type}</Text>
              </View>
            ))}
          </View>

          {/* Info Row - compacto */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: textColor }]}>{pokemon.height}m</Text>
              <Text style={[styles.infoLabel, { color: textColor }]}>Altura</Text>
            </View>
            <View style={[styles.infoDivider, { backgroundColor: textColor }]} />
            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: textColor }]}>{pokemon.weight}kg</Text>
              <Text style={[styles.infoLabel, { color: textColor }]}>Peso</Text>
            </View>
            <View style={[styles.infoDivider, { backgroundColor: textColor }]} />
            <View style={styles.infoItem}>
              <Text style={[styles.infoValue, { color: textColor }]}>{totalStats}</Text>
              <Text style={[styles.infoLabel, { color: textColor }]}>Total</Text>
            </View>
          </View>

          {/* Stats - grid 2x3 sin scroll */}
          <View style={styles.statsGrid}>
            {pokemon.stats.map((stat) => (
              <View key={stat.name} style={styles.statItem}>
                <Text style={[styles.statValue, { color: textColor }]}>{stat.value}</Text>
                <View style={[styles.statBarBg, { backgroundColor: textColor }]}>
                  <View
                    style={[
                      styles.statBarFill,
                      {
                        width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                        backgroundColor: textColor,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.statName, { color: textColor }]}>{stat.name}</Text>
              </View>
            ))}
          </View>

          {/* Moves - compacto, max 2 filas */}
          <View style={styles.movesSection}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Movimientos</Text>
            <View style={styles.movesContainer}>
              {pokemon.moves.slice(0, 10).map((move) => (
                <View key={move.name} style={styles.moveBadge}>
                  <Text style={[styles.moveText, { color: textColor }]}>{move.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    maxHeight: SCREEN_HEIGHT * 0.8,
    borderRadius: 20,
    paddingTop: 36,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pokemonId: {
    position: 'absolute',
    top: 12,
    left: 14,
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.6,
  },
  pokemonImage: {
    width: 110,
    height: 110,
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  typesRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  typeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoDivider: {
    width: 1,
    height: 24,
    opacity: 0.25,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  infoLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginTop: 1,
  },
  // Stats en grid 2x3 - sin scroll
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  statItem: {
    width: '48%',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 3,
  },
  statBarBg: {
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    opacity: 0.25,
    marginBottom: 2,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
    opacity: 1,
  },
  statName: {
    fontSize: 10,
    fontWeight: '500',
    opacity: 0.8,
  },
  // Moves compactos
  movesSection: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
  },
  moveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  moveText: {
    fontSize: 10,
    fontWeight: '500',
  },
});
