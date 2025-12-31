import { fetchAuthSession } from "aws-amplify/auth";
import { AuthGroups } from "./auth-groups";

export async function getUserGroups(): Promise<string[]> {
  const session = await fetchAuthSession({ forceRefresh: true });
  const groups = (session.tokens?.accessToken.payload['cognito:groups'] || []) as string[];
  return groups;
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(required: boolean = false): Promise<boolean> {
  const isAdmin = await isInGroup(AuthGroups.ADMINS);
  if (required && !isAdmin) {
    throw new Error('Admin access required');
  }
  return isAdmin;
}

/**
 * Check if current user belongs to a specific group
 */
export async function isInGroup(groupName: AuthGroups): Promise<boolean> {
  const groups = await getUserGroups();
  return groups.includes(groupName);
}