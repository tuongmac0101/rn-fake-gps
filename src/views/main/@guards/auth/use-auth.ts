import { useAuthStore } from "~/stores/auth.store";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "~/stores/user.store";
import { useEffect } from "react";

export const useAuth = () => {
  const nav = useNavigation();
  const { isHydrated } = useAuthStore();
  const isLoggedIn = useAuthStore((state) => !!state.access_token);
  const logoutStore = useAuthStore((state) => state.logout);
  const getUserProfile = useUserStore((state) => state.getUserProfile);
  const isUserLoaded = useUserStore((state) => !!state.id);
  const logout = () => {
    logoutStore();
    nav.reset({ index: 0, routes: [{ name: "LoginView" }] });
  };
  useEffect(() => {
    if (!isHydrated) return;
    if (!isLoggedIn) {
      logout();
      return;
    }
    if (!isUserLoaded) {
      Promise.all([
      ]).catch(() => {
        //logout();
      });
      getUserProfile().catch(() => {
        // logout();
      });
    }
  }, [isHydrated, isLoggedIn, isUserLoaded, getUserProfile, nav, logoutStore]);

  return {
    isLoggedIn,
    isUserLoaded,
  };
};
