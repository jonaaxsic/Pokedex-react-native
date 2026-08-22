import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  Activity,
  ActivityType,
  createActivity,
  trimActivities,
} from '../models/Activity';
import { loadActivities, saveActivities } from '../storage/activityStorage';

interface ActivityContextValue {
  activities: Activity[];
  logActivity: (type: ActivityType, title: string, description: string, pokemonId?: number, pokemonName?: string) => void;
  loading: boolean;
}

export const ActivityContext = createContext<ActivityContextValue | undefined>(undefined);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities()
      .then(setActivities)
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      saveActivities(activities).catch(() => {});
    }
  }, [activities, loading]);

  const logActivity = useCallback(
    (
      type: ActivityType,
      title: string,
      description: string,
      pokemonId?: number,
      pokemonName?: string
    ) => {
      const entry = createActivity(type, title, description, pokemonId, pokemonName);
      setActivities((prev) => trimActivities([entry, ...prev]));
    },
    []
  );

  return (
    <ActivityContext.Provider value={{ activities, logActivity, loading }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider');
  return ctx;
}
