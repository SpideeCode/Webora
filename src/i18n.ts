import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18n
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false
        },
        resources: {} // Start empty
    });

// Helper to load resources dynamically
const loadResources = async () => {
    const lang = i18n.language ? i18n.language.split('-')[0] : 'fr';
    try {
        const resources = await import(`./locales/${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', resources.default, true, true);
    } catch (e) {
        console.error(`Failed to load locale: ${lang}`, e);
        // Fallback to FR if current fails
        const frResources = await import('./locales/fr.json');
        i18n.addResourceBundle('fr', 'translation', frResources.default, true, true);
    }
};

// Start loading current language
loadResources();

// Handle language changes
i18n.on('languageChanged', (lang) => {
    const shortLang = lang.split('-')[0];
    if (!i18n.hasResourceBundle(shortLang, 'translation')) {
        loadResources();
    }
});

export default i18n;
