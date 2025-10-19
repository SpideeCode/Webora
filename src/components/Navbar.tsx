import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Fermer le menu mobile immédiatement
    setIsMobileMenuOpen(false);
    
    // Attendre la fin de l'animation de fermeture du menu avant de faire défiler
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Calculer la position en tenant compte de la hauteur de la navbar
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Faire défiler jusqu'à la position calculée
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 300); // Temps correspondant à la durée de l'animation de fermeture du menu
  };

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'packs', label: 'Packs' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'apropos', label: 'À propos' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-2 shadow-glass' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/img/logo-transparent-svg.svg" 
              alt="Webora " 
              className="h-12 w-auto"
            />
            <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-900'} hidden sm:block ml-2`}>
              Webora
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-medium transition-colors hover:text-blue-700 ${
                  isScrolled ? 'text-gray-700' : 'text-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 bg-gradient-to-r from-button-primary-from to-button-primary-to text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:bg-gradient-to-r hover:from-button-primary-hover.from hover:to-button-primary-hover.to"
            >
              Devis gratuit
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50/50 hover:text-blue-700 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 mt-4"
              >
                Devis gratuit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
