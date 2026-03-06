import { userApi, IUserInfo } from "~/api/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NSUser } from "~/common/enums";

const initialState: IUserInfo = {
  id: "",
  user_name: "",
  name: "",
  surname: "",
  phone_number: "",
  first_login: false,
  is_authenticated: false,
  phone_number_verified: false,
  email: "",
  email_verified: false,
  tenant_id: "",
  role: "",
  auth_role: "",
  permissions: [],
  client_id: "",
  language_code: "",
  status: NSUser.EStatus.INACTIVE,
  logo: "",
  access_owners: [],
};

type UserState = IUserInfo;

interface UserAction {
  getUserProfile: () => Promise<any>;
  reset: () => void;
}

export const useUserStore = create<UserState & UserAction>()((set) => ({
  ...initialState,
  reset: () => set({ ...initialState }),
  getUserProfile: async () => {
    // const response = await userApi.getUserProfile();
    // console.log("response getUserProfile", JSON.stringify(response, null, 2));
    return set({
      id: "fake-user-id",
      user_name: "gpsfake.sale@gmail.com",
      name: "Fake",
      surname: "User",
      email: "gpsfake.sale@gmail.com",
      // ...response,
    });
  },
}));
