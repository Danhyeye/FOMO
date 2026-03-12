import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '@/locales/en.json'
import viTranslations from '@/locales/vi.json'

const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || 'vi'
  }
  return 'vi'
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslations,
        },
        vi: {
          translation: viTranslations,
        },
      },
      lng: getInitialLanguage(),
      fallbackLng: 'vi',
      interpolation: {
        escapeValue: false,
      },
    })
}

export default i18n
