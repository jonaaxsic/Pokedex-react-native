// Jest setup file
global.__DEV__ = true;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  return {
    SafeAreaProvider: ({ children }) => React.createElement('SafeAreaProvider', null, children),
    SafeAreaConsumer: ({ children }) => React.createElement('SafeAreaConsumer', null, typeof children === 'function' ? children({}) : children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    useSafeAreaFrame: () => ({ top: 0, bottom: 0, left: 0, right: 0, width: 375, height: 812 }),
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
}));

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: ({ children }) => null,
}));
