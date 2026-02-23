import outputs from "@/amplify_outputs.json";

export const validateAuthConfig = () => {
  const requiredFields = [
    'user_pool_id',
    'aws_region',
    'user_pool_client_id',
    'identity_pool_id'
  ];

  const missing = requiredFields.filter(field => !outputs.auth[field as keyof typeof outputs.auth]);

  if (missing.length > 0) {
    console.error('Missing required auth configuration:', missing);
    return false;
  }

  return true;
};

export const authConfig = outputs.auth;
