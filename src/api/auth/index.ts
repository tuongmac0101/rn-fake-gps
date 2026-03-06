import { ssoApiConnector } from "~/connectors";
import { IAuthRes, IPasswordLoginReq } from "./types";
import { getEnvConfig } from "~/@config/env";
export * from "./types";

class AuthApi {
  public ENDPOINT = {
    LOGIN: "connect/token",
  };
  login = (body?: IPasswordLoginReq | undefined) => {
    const { EXPO_PUBLIC_SSO_CLIENT_ID } = getEnvConfig();
    return ssoApiConnector.post<IAuthRes>(this.ENDPOINT.LOGIN, {
      ...body,
      client_id: EXPO_PUBLIC_SSO_CLIENT_ID,
      grant_type: "password",
    });
  };
}
export const authApi = new AuthApi();
