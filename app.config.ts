import "tsx/cjs";
import { ExpoConfig, ConfigContext } from "@expo/config";
import { generateAppByEnv } from "~/@config";
import { EAppEnv } from "~/@config/constants";

/**
 * jsonConfig: config from app.json
 */
export default ({ config: jsonConfig = {} }: ConfigContext): ExpoConfig => {
  const APP_ENV = process.env.APP_ENV || EAppEnv.development;
  return {
    ...(generateAppByEnv(APP_ENV) as ExpoConfig),
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    jsEngine: "hermes", // faster build
    plugins: ["expo-font", "expo-localization"],
  };
};
