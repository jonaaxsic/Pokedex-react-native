import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={48} color="#D1D5DB" />
      <Text style={styles.message}>{message ?? 'Algo salio mal'}</Text>
      {onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  message: { marginTop: 12, fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  button: {
    marginTop: 16, backgroundColor: colors.red, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20,
  },
  buttonText: { color: colors.white, fontWeight: '600' },
});
