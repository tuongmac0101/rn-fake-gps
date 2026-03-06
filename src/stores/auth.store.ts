import { authApi, IAuthRes, IPasswordLoginReq } from "~/api/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "./user.store";

const initialState = {
  access_token: "",
  refresh_token: "",
};

export interface IAuthState extends IAuthRes {
  isHydrated: boolean;
}

export interface IAuthAction {
  setHydrated: (v: boolean) => void;
  login: (loginPayload?: IPasswordLoginReq | undefined) => Promise<any>;
  logout: () => Promise<void>;
  reset: () => void;
}

export type AuthStore = IAuthState & IAuthAction;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isHydrated: false,
      setHydrated: (v) => set({ isHydrated: v }),
      login: async (loginPayload) => {
        // const response = await authApi.login(loginPayload);
        return set({
          access_token: "fake-access-token",
          refresh_token: "fake-refresh-token",
        });
      },

      logout: async () => {
        /**
         * clear token and other information
         */
        get().reset();
        useUserStore.getState().reset();
      },
      reset: () => {
        /**
         * Clear token
         */
        set({
          ...initialState,
        });
      },
    }),
    {
      name: "auth-store",
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
