import { createHttpClient, EHttpHeaders, EMediaType } from "~/@core/network";
import { getEnvConfig } from "~/@config/env";
import { useAuthStore } from "~/stores/auth.store";

import { HttpStatusCode, AxiosError } from "axios";
import { ApiException } from "~/@core/dto";

const handerError = (error?: any): ApiException => {
  if (!error) {
    return new ApiException("Unknown", HttpStatusCode.InternalServerError);
  }
  if (!error.isAxiosError) {
    if (error.message) {
      return new ApiException(
        error.message,
        HttpStatusCode.InternalServerError
      );
    }
    return new ApiException("Unknown", HttpStatusCode.InternalServerError);
  }
  let { response, message = "Unknown" } = error as AxiosError<any>;

  let type = "DEFAULT";
  let businessCode = -1;
  if (response) {
    const { data = {}, status = HttpStatusCode.InternalServerError } = response;
    message = data?.error_description || data?.error;
    type = data?.type;
    businessCode = data?.businessCode;
    return new ApiException(message, status, data, type, businessCode);
  }
  return new ApiException(message, HttpStatusCode.InternalServerError);
};

export const ssoApiConnector = createHttpClient({
  baseURL: getEnvConfig().EXPO_PUBLIC_SSO_API_BASE_URL,
  timeout: 2 * 60 * 1000,
  beforeRequest: (config) => {
    config.headers.set(
      EHttpHeaders.CONTENT_TYPE,
      EMediaType.APPLICATION_FORM_URLENCODED
    );
    config.headers.set(EHttpHeaders.ACCEPT, "*/*");
    return config;
  },
  handleError: (err) => {
    return handerError(err);
  },
  handleResponse: async (res) => {
    return res.data;
  },
});
