export const getEnvConfig = () => {
  return {
    EXPO_PUBLIC_ROOT_API_BASE_URL: process.env.EXPO_PUBLIC_ROOT_API_BASE_URL,
    EXPO_PUBLIC_SSO_API_BASE_URL: process.env.EXPO_PUBLIC_SSO_API_BASE_URL,
    EXPO_PUBLIC_SSO_CLIENT_ID: process.env.EXPO_PUBLIC_SSO_CLIENT_ID,
  };
};
