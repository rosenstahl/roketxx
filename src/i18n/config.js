import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importiere die Übersetzungsdateien
import commonDE from '../locales/de/common.json';
import commonEN from '../locales/en/common.json';
import commonTR from '../locales/tr/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      de: {
        common: commonDE
      },
      en: {
        common: commonEN
      },
      tr: {
        common: commonTR
      }
    },
  });

export default i18n;