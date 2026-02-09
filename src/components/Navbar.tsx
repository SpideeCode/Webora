import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Navbar() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
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
    if (isMobile) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 20,
          behavior: 'auto'
        });
      }
    } else {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'realisations', label: 'Portfolio' },
    { id: 'methodology', label: 'Méthodologie' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${!isMobile ? 'transition-all duration-500' : ''} ${isScrolled
      ? 'py-4 px-4 md:px-8'
      : 'py-6 px-4 md:px-8'
      }`}>
      <div className={`max-w-7xl mx-auto rounded-full px-6 py-3 ${!isMobile ? 'transition-all duration-500' : ''} ${isScrolled ? 'glass-morphism shadow-glass' : 'bg-transparent'
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
              className="h-8 w-auto dark:brightness-200"
            />
            <span className="text-xl font-black text-foreground tracking-widest uppercase">
              Webora
            </span>
          </button>


          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs uppercase tracking-[0.2em] font-bold text-text-secondary hover:text-accent-cyan transition-colors"
                style={{ fontSize: '11px' }} // Slightly smaller for better fit
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Controls - Right */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-4 border-l border-white/10 dark:border-white/10 border-black/10 pl-8">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2 dark:bg-white dark:text-black bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all"
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : '100%' }}
            transition={isMobile ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl pt-24 px-8 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-foreground"
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-3xl font-black text-foreground hover:text-accent-magenta transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-[1px] w-full bg-foreground/10 my-4" />
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-5 dark:bg-white dark:text-black bg-black text-white font-black uppercase tracking-widest rounded-2xl"
              >
                {t('nav.cta')}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
