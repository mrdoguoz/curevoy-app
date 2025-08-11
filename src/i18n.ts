import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dil dosyalarını require ile import et
const tr = require('./locales/tr.json');
const en = require('./locales/en.json');
const ar = require('./locales/ar.json');
const ru = require('./locales/ru.json');
const fr = require('./locales/fr.json');
const de = require('./locales/de.json');
const es = require('./locales/es.json');

const resources = {
  tr: { translation: tr },
  en: { translation: en },
  ar: { translation: ar },
  ru: { translation: ru },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    debug: true, // Debug modunu açtık

    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false, // React Suspense kullanmıyoruz
    },
  });

export default i18n; 