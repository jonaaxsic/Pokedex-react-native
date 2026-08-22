import {
  createActivity,
  trimActivities,
  formatActivityTime,
  Activity,
} from '../src/shared/activity/models/Activity';

describe('Activity model', () => {
  describe('createActivity', () => {
    it('creates an activity with required fields', () => {
      const activity = createActivity('pokemon_explored', 'Title', 'Desc', 25, 'Pikachu');
      expect(activity).toEqual({
        id: expect.any(String),
        type: 'pokemon_explored',
        title: 'Title',
        description: 'Desc',
        timestamp: expect.any(Number),
        pokemonId: 25,
        pokemonName: 'Pikachu',
      });
    });

    it('creates an activity without pokemon info', () => {
      const activity = createActivity('pokemon_favorite', 'Fav', 'Added');
      expect(activity.pokemonId).toBeUndefined();
      expect(activity.pokemonName).toBeUndefined();
    });

    it('generates unique IDs', () => {
      const a1 = createActivity('pokemon_explored', 'A', 'B');
      const a2 = createActivity('pokemon_explored', 'A', 'B');
      expect(a1.id).not.toBe(a2.id);
    });
  });

  describe('trimActivities', () => {
    it('returns up to 20 activities', () => {
      const activities: Activity[] = Array.from({ length: 25 }, (_, i) =>
        createActivity('pokemon_explored', `A${i}`, `D${i}`)
      );
      const trimmed = trimActivities(activities);
      expect(trimmed).toHaveLength(20);
      expect(trimmed[0].title).toBe('A0');
    });

    it('returns all if 20 or fewer', () => {
      const activities: Activity[] = Array.from({ length: 5 }, (_, i) =>
        createActivity('pokemon_explored', `A${i}`, `D${i}`)
      );
      expect(trimActivities(activities)).toHaveLength(5);
    });

    it('returns empty for empty array', () => {
      expect(trimActivities([])).toHaveLength(0);
    });
  });

  describe('formatActivityTime', () => {
    it('returns "ahora mismo" for recent timestamps', () => {
      const now = Date.now();
      expect(formatActivityTime(now)).toBe('ahora mismo');
    });

    it('returns minutes for timestamps within the hour', () => {
      const fiveMinAgo = Date.now() - 5 * 60000;
      expect(formatActivityTime(fiveMinAgo)).toBe('hace 5 min');
    });

    it('returns hours for timestamps within the day', () => {
      const threeHoursAgo = Date.now() - 3 * 3600000;
      expect(formatActivityTime(threeHoursAgo)).toBe('hace 3h');
    });

    it('returns "ayer" for yesterday', () => {
      const yesterday = Date.now() - 86400000;
      expect(formatActivityTime(yesterday)).toBe('ayer');
    });

    it('returns days for older timestamps', () => {
      const threeDaysAgo = Date.now() - 3 * 86400000;
      expect(formatActivityTime(threeDaysAgo)).toBe('hace 3 dias');
    });
  });
});
