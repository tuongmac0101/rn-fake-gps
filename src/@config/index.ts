import { ExpoConfig } from "expo/config";
import {
  BASE_PACKAGE_ID,
  EAppEnv,
  OWNER,
  PROJECT_ID,
  APP_NAME,
  APP_SLUG,
  APP_SCHEME,
} from "./constants";

export const generateAppByEnv = (appEnv: EAppEnv): ExpoConfig => {
  const generateCustomConfig = () => {
    switch (appEnv) {
      case EAppEnv.development:
        return {
          name: `${APP_NAME} DEV`,
          packageId: `${BASE_PACKAGE_ID}.dev`,
          scheme: `${APP_SCHEME}-dev`,
        };
      case EAppEnv.preview:
        return {
          name: `${APP_NAME} PREVIEW`,
          packageId: `${BASE_PACKAGE_ID}.preview`,
          scheme: `${APP_SCHEME}-preview`,
        };
      case EAppEnv.production:
        return {
          name: APP_NAME,
          packageId: BASE_PACKAGE_ID,
          scheme: APP_SCHEME,
        };
      case EAppEnv.release:
        return {
          name: APP_NAME,
          packageId: BASE_PACKAGE_ID,
          scheme: APP_SCHEME,
        };
      default:
        throw new Error(`Unknown app env: ${appEnv}`);
    }
  };
  const { name, packageId, scheme } = generateCustomConfig();
  return {
    name,
    slug: APP_SLUG,
    scheme,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: packageId,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription:
          "Ứng dụng cần quyền truy cập camera để chụp ảnh dán mẫu đơn hàng | thu hồi",
        NSPhotoLibraryUsageDescription:
          "Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh dán mẫu đơn hàng | thu hồi",
        NSPhotoLibraryAddUsageDescription:
          "Ứng dụng cần quyền lưu ảnh vào thư viện ảnh để lưu ảnh dán mẫu đơn hàng | thu hồi",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: packageId,
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.READ_MEDIA_IMAGES",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: PROJECT_ID,
      },
    },
    owner: OWNER,
    runtimeVersion: "1.0.0",
    updates: {
      url: `https://u.expo.dev/${PROJECT_ID}`,
    },
  };
};
