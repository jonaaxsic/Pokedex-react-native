import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const sizes = {
  screen: { width, height },
  card: {
    width: (width - 16 * 2 - 12) / 2,
  },
  avatar: {
    small: 40,
    medium: 60,
    large: 80,
  },
  touchTarget: 44,
} as const;
