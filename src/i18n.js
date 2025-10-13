import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from './locales/en'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    detection: {
      // thứ tự phát hiện ngôn ngữ
      order: ["path", "navigator", "localStorage", "cookie"],
      lookupFromPathIndex: 0, // lấy từ segment đầu tiên của URL (/vi, /en)
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
