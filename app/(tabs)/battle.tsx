import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function BattleScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Battle</Text>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="flash" size={64} color="#F59E0B" />
        </View>
        <Text style={styles.subtitle}>Próximamente</Text>
        <Text style={styles.description}>
          La función de batalla estará disponible en una próxima actualización.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 8, marginBottom: 24 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  subtitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 8 },
  description: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
});
