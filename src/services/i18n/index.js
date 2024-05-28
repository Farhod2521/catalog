import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {config} from "@/config";
import storage from "../storage";

i18n

    // Enables the i18next backend
    .use(Backend)

    // Enable automatic language detection
    .use(LanguageDetector)

    // Enables the hook initialization module
    .use(initReactI18next)
    .init({
        lng: storage.get('i18nextLng') || config.DEFAULT_APP_LANG,
        fallbackLng: storage.get('i18nextLng') || config.DEFAULT_APP_LANG,
        backend: {
            /* translation file path */
            loadPath: `${config.API_URL}translations/?lang={{lng}}`,
            addPath: `${config.API_URL}translations/`,
        },
        debug: false,
        keySeparator: false,
        saveMissing: true,
        react: {
            useSuspense: false,
            wait: true
        },
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    })

export default i18n
