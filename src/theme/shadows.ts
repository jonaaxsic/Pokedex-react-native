import { StyleSheet } from 'react-native';

export const shadows = {
  sm: StyleSheet.create({
    shadow: {
      elevation: 2,
      boxShadow: '0px 1px 3px rgba(0,0,0,0.08)',
    },
  }).shadow,
  md: StyleSheet.create({
    shadow: {
      elevation: 4,
      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    },
  }).shadow,
  lg: StyleSheet.create({
    shadow: {
      elevation: 6,
      boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
    },
  }).shadow,
} as const;
