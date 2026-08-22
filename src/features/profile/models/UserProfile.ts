export interface UserProfile {
  username: string;
  avatarId: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  username: 'Entrenador Pokemon',
  avatarId: 'none',
};
