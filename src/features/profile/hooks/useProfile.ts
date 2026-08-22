import { useState, useEffect, useCallback } from 'react';
import { UserProfile, DEFAULT_PROFILE } from '../models/UserProfile';
import { loadProfile, saveProfile } from '../storage/profileStorage';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile()
      .then(setProfile)
      .catch(() => setProfile(DEFAULT_PROFILE))
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    const next = { ...profile, ...updates };
    setProfile(next);
    await saveProfile(next);
  }, [profile]);

  return { profile, loading, updateProfile };
}
