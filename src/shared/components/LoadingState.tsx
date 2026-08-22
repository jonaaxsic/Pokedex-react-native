import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  message?: string;
}

export default function LoadingState({ message }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.red} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  message: { marginTop: 12, fontSize: 14, color: colors.textMuted },
});
