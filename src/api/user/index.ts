import { rootApiConnector } from "~/connectors";
import { IUserInfo } from "./types";
export * from "./types";

class AuthApi {
  public ENDPOINT = {
    USER_PROFILE: "api/mobile/user-profile",
  };
  getUserProfile = async () => {
    return rootApiConnector.get<IUserInfo>(this.ENDPOINT.USER_PROFILE);
  };
}
export const userApi = new AuthApi();
