export type ActivityType =
  | 'pokemon_explored'
  | 'pokemon_favorite';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: number;
  pokemonId?: number;
  pokemonName?: string;
}

const MAX_ACTIVITIES = 20;

export function createActivity(
  type: ActivityType,
  title: string,
  description: string,
  pokemonId?: number,
  pokemonName?: string
): Activity {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title,
    description,
    timestamp: Date.now(),
    pokemonId,
    pokemonName,
  };
}

export function trimActivities(activities: Activity[]): Activity[] {
  return activities.slice(0, MAX_ACTIVITIES);
}

export function formatActivityTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'ahora mismo';
  if (minutes < 60) return `hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'ayer';
  return `hace ${days} dias`;
}
