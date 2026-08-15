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
import { TYPE_COLORS } from '../constants/typeStyles';

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
            <Ionicons name="close" size={22} color="#FFF" />
          </TouchableOpacity>

          {/* Pokemon ID */}
          <Text style={styles.pokemonId}>{pokemon.id}</Text>

          {/* Pokemon Image */}
          <Image
            source={{ uri: pokemon.image }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />

          {/* Pokemon Name */}
          <Text style={styles.pokemonName}>{pokemon.name}</Text>

          {/* Types */}
          <View style={styles.typesRow}>
            {pokemon.types.map((type) => (
              <View key={type} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoValue}>{pokemon.height}m</Text>
              <Text style={styles.infoLabel}>Altura</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoValue}>{pokemon.weight}kg</Text>
              <Text style={styles.infoLabel}>Peso</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoValue}>{totalStats}</Text>
              <Text style={styles.infoLabel}>Total</Text>
            </View>
          </View>

          {/* Stats */}
          <ScrollView
            style={styles.statsContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Estadisticas</Text>
            {pokemon.stats.map((stat) => (
              <View key={stat.name} style={styles.statRow}>
                <Text style={styles.statName}>{stat.name}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <View style={styles.statBarBg}>
                  <View
                    style={[
                      styles.statBarFill,
                      {
                        width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                        backgroundColor: '#FFF',
                      },
                    ]}
                  />
                </View>
              </View>
            ))}

            {/* Moves */}
            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Movimientos</Text>
            <View style={styles.movesContainer}>
              {pokemon.moves.map((move) => (
                <View key={move.name} style={styles.moveBadge}>
                  <Text style={styles.moveText}>{move.name}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: SCREEN_WIDTH - 48,
    maxHeight: SCREEN_HEIGHT * 0.75,
    borderRadius: 24,
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  pokemonId: {
    position: 'absolute',
    top: 14,
    left: 16,
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  pokemonImage: {
    width: 140,
    height: 140,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  infoLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  statsContainer: {
    width: '100%',
    maxHeight: 200,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statName: {
    width: 80,
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
  },
  statValue: {
    width: 30,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'right',
    marginRight: 8,
  },
  statBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  moveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  moveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
});
