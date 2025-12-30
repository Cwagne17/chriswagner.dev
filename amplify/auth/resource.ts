import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    webAuthn: true,
    externalProviders: {
      google: {
        // Use Amplify Backend secret helper so the values are stored in SSM and resolved at deploy-time
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
      },
      callbackUrls: [
        'http://localhost:3000/auth/callback',
        'https://chriswagner.dev/auth/callback'
      ],
      logoutUrls: [
        'http://localhost:3000/',
        'https://chriswagner.dev/'
      ]
    }
  },
  // Ensure a general USERS group exists and avoid automated admin invites.
  groups: ["USERS", "ADMINS"],
  // Remove automatic admin invite messaging to prevent accidental creation of admin accounts.
  // Admin accounts should be created intentionally via the console or an invite process.
});
