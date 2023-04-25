import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const getCurrentHost =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "LINK TO PROD";

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['en', 'de'],
    fallbackLng: "de",
    lng: "de",
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    detection: {
      order: ['cookie', 'htmlTag', 'path', 'localStorage'],
      caches: ['localStorage', "cookie"],
    },
    react: { useSuspense: false },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  });

export default i18n;
