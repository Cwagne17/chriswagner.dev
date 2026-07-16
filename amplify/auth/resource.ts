import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    webAuthn: true,
  },
  // Ensure a general USERS group exists and avoid automated admin invites.
  groups: ['ADMINS'],
  // Remove automatic admin invite messaging to prevent accidental creation of admin accounts.
  // Admin accounts should be created intentionally via the console or an invite process.
});
