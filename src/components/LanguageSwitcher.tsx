import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' }
    ];

    const currentCode = i18n.language ? i18n.language.split('-')[0] : 'fr';
    const currentLanguage = languages.find(l => l.code === currentCode) || languages[0];

    const changeLanguage = async (code: string) => {
        if (code !== 'fr' && !i18n.hasResourceBundle(code, 'translation')) {
            try {
                const resources = await import(`../locales/${code}.json`);
                i18n.addResourceBundle(code, 'translation', resources.default, true, true);
            } catch (error) {
                console.error(`Failed to load locale: ${code}`, error);
            }
        }
        await i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 glass-morphism hover:border-black/30 dark:hover:border-white/30 transition-all group"
            >
                <Globe className="w-3 h-3 text-text-secondary group-hover:text-foreground transition-colors" />
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{currentLanguage.label}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 p-1 rounded-xl glass-morphism border border-white/10 z-20 min-w-[80px]"
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLanguage(lang.code)}
                                className={`w-full px-4 py-2 text-left rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${i18n.language === lang.code
                                    ? 'dark:bg-white dark:text-black bg-black text-white'
                                    : 'text-text-secondary hover:text-foreground hover:bg-white/5'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
