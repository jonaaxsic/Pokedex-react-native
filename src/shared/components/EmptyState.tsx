import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
}

export default function EmptyState({ icon, title, message }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color="#D1D5DB" />
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  title: { marginTop: 12, fontSize: 16, fontWeight: '600', color: colors.text, textAlign: 'center' },
  message: { marginTop: 4, fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
});
