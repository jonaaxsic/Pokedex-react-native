import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

interface FeatureCardProps {
  title: string;
  description: string;
  image: any;
  variant: 'red' | 'blue';
  onPress: () => void;
}

export default function FeatureCard({
  title,
  description,
  image,
  variant,
  onPress,
}: FeatureCardProps) {
  const isRed = variant === 'red';

  return (
    <TouchableOpacity
      style={[styles.card, isRed ? styles.cardRed : styles.cardBlue]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 20,
    paddingRight: 20,
    paddingLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  cardRed: {
    backgroundColor: colors.red,
  },
  cardBlue: {
    backgroundColor: colors.blue,
  },
  image: {
    width: 120,
    height: 100,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
});
