import React, { createContext, useContext } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';
import { useComingSoon } from '../../src/shared/context/ComingSoonContext';

const HoverContext = createContext(false);

function useTabHover() {
  return useContext(HoverContext);
}

function NeoTabButton({
  children,
  onPress,
  accessibilityState,
}: {
  children: React.ReactNode;
  onPress?: (e: any) => void;
  accessibilityState?: { selected?: boolean };
}) {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.tabItem,
        focused && styles.tabItemFocused,
        hovered && styles.tabItemHover,
        pressed && styles.tabItemPressed,
      ]}
      accessibilityState={accessibilityState}
    >
      {({ hovered }) => (
        <HoverContext.Provider value={hovered}>
          <View style={styles.tabContent}>{children}</View>
        </HoverContext.Provider>
      )}
    </Pressable>
  );
}

function TabIcon({
  focused,
  activeIcon,
  inactiveIcon,
}: {
  focused: boolean;
  activeIcon: keyof typeof Ionicons.glyphMap;
  inactiveIcon: keyof typeof Ionicons.glyphMap;
}) {
  const hovered = useTabHover();
  const color = hovered ? colors.red : focused ? colors.red : '#9CA3AF';
  return (
    <Ionicons
      name={focused ? activeIcon : inactiveIcon}
      size={22}
      color={color}
    />
  );
}

function TabLabel({ focused, label }: { focused: boolean; label: string }) {
  const hovered = useTabHover();
  const color = hovered ? colors.red : focused ? colors.red : '#9CA3AF';
  return <Text style={[styles.tabLabel, { color }]}>{label}</Text>;
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { show } = useComingSoon();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
        tabBarButton: (props) => (
          <NeoTabButton
            onPress={props.onPress}
            accessibilityState={props.accessibilityState}
          >
            <View style={styles.tabContent}>{props.children}</View>
          </NeoTabButton>
        ),
        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 8,
          height: 64 + insets.bottom,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
          elevation: 8,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarLabel: ({ focused, children }) => (
          <TabLabel focused={focused} label={String(children)} />
        ),
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeIcon="home" inactiveIcon="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeIcon="heart" inactiveIcon="heart-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeIcon="person" inactiveIcon="person-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name="proximamente"
        options={{
          title: 'Proximamente',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} activeIcon="hourglass" inactiveIcon="hourglass-outline" />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            show();
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabItemFocused: {
    backgroundColor: colors.redSoft,
  },
  tabItemHover: {
    backgroundColor: '#F3F4F6',
  },
  tabItemPressed: {
    backgroundColor: '#E5E7EB',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});