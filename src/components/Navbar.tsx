import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const navLinks = [
    { id: 'services', label: t('nav.expertises') },
    { id: 'realisations', label: t('nav.portfolio') },
    { id: 'methodology', label: t('nav.approach') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? 'py-4 px-4 md:px-8'
      : 'py-6 px-4 md:px-8'
      }`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-full px-6 py-3 ${isScrolled ? 'glass-morphism shadow-glass' : 'bg-transparent'
        }`}>
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <img
              src="/img/logo-transparent-svg.svg"
              alt="Webora"
              width="32"
              height="32"
              className="h-8 w-auto brightness-200"
            />
            <span className="text-xl font-black text-white tracking-widest uppercase">
              Webora
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-4 border-l border-white/10 pl-8">
              <LanguageSwitcher />
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all"
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-primary/98 backdrop-blur-2xl pt-24 px-8 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-3xl font-black text-white hover:text-accent-magenta transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-[1px] w-full bg-white/10 my-4" />
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl"
              >
                {t('nav.cta')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

