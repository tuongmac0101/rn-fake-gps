import { useTranslation } from "react-i18next";
import { languageConfig } from ".";
import { useCallback, useEffect, useState } from "react";

export const useLanguageConfig = () => {
  const { i18n } = useTranslation();
  const [currentLanguageConfig, setCurrentLanguageConfig] = useState(
    languageConfig.languages[
      languageConfig.defaultLanguage as keyof typeof languageConfig.languages
    ]
  );

  const getCurrentLanguageConfig = useCallback(() => {
    const keyLang = Object.keys(languageConfig.languages).includes(
      i18n.language
    )
      ? i18n.language
      : languageConfig.defaultLanguage;
    setCurrentLanguageConfig((languageConfig as any).languages[keyLang]);
  }, [i18n.language]);

  useEffect(() => {
    getCurrentLanguageConfig();
  }, [getCurrentLanguageConfig]);

  return {
    language: i18n.language,
    languageList: Object.keys(languageConfig.languages),
    currentLanguageConfig,
  };
};
