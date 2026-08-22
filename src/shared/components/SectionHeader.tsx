import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  title: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ title, icon }: Props) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10,
  },
  title: { fontSize: 12, fontWeight: '700', color: '#374151', letterSpacing: 1 },
});
