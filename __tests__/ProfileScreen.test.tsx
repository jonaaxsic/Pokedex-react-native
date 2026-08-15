import React from 'react';
import TestRenderer from 'react-test-renderer';
import { FavoritesContext } from '../src/features/favorites/context/FavoritesContext';
import ProfileScreen from '../src/features/profile/screens/ProfileScreen';

// Mock expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const mockFavoritesValue = {
  favorites: ['#1', '#25', '#150'],
  isFavorite: jest.fn(),
  toggleFavorite: jest.fn(),
  loading: false,
};

describe('ProfileScreen', () => {
  it('renders without crashing', () => {
    const tree = TestRenderer.create(
      <FavoritesContext.Provider value={mockFavoritesValue}>
        <ProfileScreen />
      </FavoritesContext.Provider>
    );
    expect(tree).toBeDefined();
  });

  it('matches snapshot with 3 favorites', () => {
    const tree = TestRenderer.create(
      <FavoritesContext.Provider value={mockFavoritesValue}>
        <ProfileScreen />
      </FavoritesContext.Provider>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with different number of favorites', () => {
    const newFavoritesValue = {
      ...mockFavoritesValue,
      favorites: ['#1', '#2', '#3', '#4', '#5'],
    };
    
    // Just verify it renders without throwing
    expect(() => {
      TestRenderer.create(
        <FavoritesContext.Provider value={newFavoritesValue}>
          <ProfileScreen />
        </FavoritesContext.Provider>
      );
    }).not.toThrow();
  });
});
