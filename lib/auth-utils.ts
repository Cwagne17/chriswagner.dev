import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';

export interface UserWithGroups {
  username: string;
  userId: string;
  signInDetails?: {
    loginId?: string;
  };
  groups: string[];
}

/**
 * Get current user with their groups
 */
export async function getCurrentUserWithGroups(): Promise<UserWithGroups | null> {
  try {
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    
    // Extract groups from cognito:groups attribute
    const groupsString = attributes['cognito:groups'] || '';
    const groups = groupsString ? groupsString.split(',') : ['USERS']; // Default to USERS group
    
    return {
      username: user.username,
      userId: user.userId,
      signInDetails: user.signInDetails,
      groups
    };
  } catch (error) {
    console.error('Error fetching user with groups:', error);
    return null;
  }
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUserWithGroups();
  return user?.groups.includes('ADMINS') || false;
}

/**
 * Check if current user belongs to a specific group
 */
export async function isInGroup(groupName: string): Promise<boolean> {
  const user = await getCurrentUserWithGroups();
  return user?.groups.includes(groupName) || false;
}

/**
 * Require admin access - throws error if not admin
 */
export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Admin access required');
  }
}
