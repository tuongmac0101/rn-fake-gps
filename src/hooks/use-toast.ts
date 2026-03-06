import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const duration = 2000;

export interface IToastParams {
  message: string;
  title?: string;
  shouldTranslate?: boolean;
}

export const useToast = () => {
  const { t } = useTranslation();
  const success = ({
    message,
    title = "",
    shouldTranslate = false,
  }: IToastParams) => {
    const messageToShow = shouldTranslate ? t(message) : message;
    const titleToShow = shouldTranslate && title ? t(title) : title;
    Toast.show({
      autoHide: true,
      visibilityTime: duration,
      type: "success",
      ...(titleToShow && { text1: titleToShow }),
      text2: messageToShow,
    });
  };

  const error = ({
    message,
    title = "",
    shouldTranslate = false,
  }: IToastParams) => {
    const messageToShow = shouldTranslate ? t(message) : message;
    const titleToShow = shouldTranslate && title ? t(title) : title;
    Toast.show({
      autoHide: true,
      visibilityTime: duration,
      type: "error",
      ...(titleToShow && { text1: titleToShow }),
      text2: messageToShow,
    });
  };

  const info = ({
    message,
    title = "",
    shouldTranslate = false,
  }: IToastParams) => {
    const messageToShow = shouldTranslate ? t(message) : message;
    const titleToShow = shouldTranslate && title ? t(title) : title;
    Toast.show({
      autoHide: true,
      visibilityTime: duration,
      type: "info",
      ...(titleToShow && { text1: titleToShow }),
      text2: messageToShow,
    });
  };

  const warning = ({
    message,
    title = "",
    shouldTranslate = false,
  }: IToastParams) => {
    const messageToShow = shouldTranslate ? t(message) : message;
    const titleToShow = shouldTranslate && title ? t(title) : title;
    Toast.show({
      autoHide: true,
      visibilityTime: duration,
      type: "info",
      ...(titleToShow && { text1: titleToShow }),
      text2: messageToShow,
    });
  };

  const handlerError = (error: any) => {
    const messageToShow =
      error?.errors?.error_message ||
      error?.message ||
      t("common.error.unknown");

    Toast.show({
      autoHide: true,
      visibilityTime: duration,
      type: "error",
      text2: messageToShow,
    });
  };

  return {
    success,
    error,
    info,
    warning,
    handlerError,
  };
};
