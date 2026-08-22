import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
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
    <Pressable
      style={({ hovered, pressed }) => [
        styles.card,
        isRed ? styles.cardRed : styles.cardBlue,
        hovered && (isRed ? styles.cardRedHover : styles.cardBlueHover),
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 28,
    paddingVertical: 14,
    paddingRight: 20,
    paddingLeft: 8,
    borderTopWidth: 2,
    borderTopColor: 'rgba(255,255,255,0.45)',
    borderBottomWidth: 3,
    overflow: 'hidden',
  },
  cardRed: {
    backgroundColor: colors.red,
    borderBottomColor: 'rgba(120,20,20,0.65)',
  },
  cardBlue: {
    backgroundColor: colors.blue,
    borderBottomColor: 'rgba(20,40,120,0.65)',
  },
  cardRedHover: {
    backgroundColor: colors.redDark,
    transform: [{ translateY: -2 }],
  },
  cardBlueHover: {
    backgroundColor: '#1D4ED8',
    transform: [{ translateY: -2 }],
  },
  cardPressed: {
    transform: [{ translateY: 2 }],
  },
  image: {
    width: 100,
    height: 84,
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
