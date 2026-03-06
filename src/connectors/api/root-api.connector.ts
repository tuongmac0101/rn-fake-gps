import { createHttpClient } from "~/@core/network";
import { handlerError } from "./helper";
import { getEnvConfig } from "~/@config/env";
import { useAuthStore } from "~/stores/auth.store";

interface IBaseResponse<T> {
  data: T;
  status?: string;
  error_message?: string;
  message?: string;
  error_detail?: any;
}

export const rootApiConnector = createHttpClient({
  baseURL: getEnvConfig().EXPO_PUBLIC_ROOT_API_BASE_URL,
  timeout: 2 * 60 * 1000,
  beforeRequest: (config) => {
    const { access_token } = useAuthStore.getState();
    config.headers.set("Authorization", `Bearer ${access_token}`);

    // Let axios automatically set Content-Type based on data type
    // - For JSON: axios sets 'application/json'
    // - For FormData: axios sets 'multipart/form-data' with boundary

    return config;
  },
  handleError: (err) => {
    return handlerError(err);
  },
  handleResponse: async (res: any) => {
    if (res?.data?.data) {
      return res.data?.data;
    }
    return res.data;
  },
});
