import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCommon from './locales/en/common.json';
import enHeader from './locales/en/header.json';
import enLanding from './locales/en/landing.json'

import viCommon from './locales/vi/common.json';
import viHeader from './locales/vi/header.json';
import viLanding from './locales/vi/landing.json';
const resources = {
  en:{
    common:enCommon,
    header:enHeader,
    landing:enLanding
  }, 
  vi:{
    common:viCommon, 
    header:viHeader,
    landing:viLanding
  }
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug:false, 
    ns:['common', 'header', 'landing'], 
    defaultNS:'common', 
    detection: {
      // thứ tự phát hiện ngôn ngữ
      order: ["path", "navigator", "localStorage", "cookie"],
      lookupFromPathIndex: 0, // lấy từ segment đầu tiên của URL (/vi, /en)
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
