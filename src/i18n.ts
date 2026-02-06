import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';

// Initialize i18n
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        },
        resources: {
            fr: { translation: fr }
        }
    });

// Helper to load other resources dynamically
const loadResources = async () => {
    const lang = i18n.language ? i18n.language.split('-')[0] : 'fr';
    if (lang === 'fr') return; // Already loaded

    try {
        const resources = await import(`./locales/${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', resources.default, true, true);
    } catch (e) {
        console.error(`Failed to load locale: ${lang}`, e);
    }
};

// Start loading current language if it's not FR
loadResources();

// Handle language changes
i18n.on('languageChanged', (lang) => {
    const shortLang = lang.split('-')[0];
    if (shortLang !== 'fr' && !i18n.hasResourceBundle(shortLang, 'translation')) {
        loadResources();
    }
});

export default i18n;
