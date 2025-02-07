import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import translationEN from "./locales/english/translation.json";
import translationFR from "./locales/french/translation.json";
import translationDE from "./locales/german/translation.json";
import translationIT from "./locales/italian/translation.json";

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  de: { translation: translationDE },
  it: { translation: translationIT },
};

// Initialize i18n
i18n 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    fallbackLng: "en",
  });

export default i18n;
