/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        babelrc: false,
        configFile: './babel.config.js',
      },
    ],
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|expo|@expo|@testing-library|react-native-reanimated|react-native-safe-area-context|@react-native-async-storage|@expo/vector-icons|expo-router|expo-status-bar|react-native-worklets|react-native-screens|react-native-web|@react-native/js-polyfills))',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/web-build/'],
  verbose: true,
};
