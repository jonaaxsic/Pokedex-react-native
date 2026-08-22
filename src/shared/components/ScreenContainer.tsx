import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

interface Props {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  padded?: boolean;
}

export default function ScreenContainer({ children, edges = ['top'], padded = true }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container} edges={edges}>
      <View style={[styles.content, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1 },
  padded: { paddingHorizontal: 16 },
});
