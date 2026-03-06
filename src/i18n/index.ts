import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import vi from "./locales/vi";

const resources = {
  en,
  vi,
};
export const languageConfig = {
  defaultLanguage: "vi",
  languages: {
    vi: {
      label: "Vietnamese",
      icon: "🇻🇳",
    },
    en: {
      label: "English",
      icon: "🇺🇸",
    },
  },
};
const pipeResources = (resources: any) =>
  Object.fromEntries(
    Object.entries(resources).map(([lang, value]) => [
      lang,
      { ...(value as any), translation: value },
    ])
  );

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: languageConfig.defaultLanguage,
  resources: pipeResources(resources),
  fallbackLng: languageConfig.defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export const setupI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: languageConfig.defaultLanguage,
    resources: pipeResources(resources),
    fallbackLng: languageConfig.defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
