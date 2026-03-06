import { HttpStatusCode, AxiosError } from "axios";
import { ApiException } from "~/@core/dto";

export const handlerError = (error?: any): ApiException => {
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

    if (data.message) {
      message = data.message;
    }
    if (data.type) {
      type = data.type;
    }
    if (data.businessCode) {
      businessCode = data.businessCode;
    }

    return new ApiException(message, status, data, type, businessCode);
  }
  return new ApiException(message, HttpStatusCode.InternalServerError);
};
