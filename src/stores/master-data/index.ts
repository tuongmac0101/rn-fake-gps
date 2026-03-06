import { create } from "zustand";

const initialState = {
};

type UserState = typeof initialState;

interface UserAction {
  reset: () => void;
}

export const useMasterDataStore = create<UserState & UserAction>()(
  (set, get) => ({
    ...initialState,
    reset: () => set({ ...initialState }),
  })
);
