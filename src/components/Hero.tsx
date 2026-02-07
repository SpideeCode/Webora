import { m } from 'framer-motion';
import { Rocket, FileText, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Hero() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - (isMobile ? 20 : 80),
        behavior: isMobile ? 'auto' : 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.1,
        delayChildren: isMobile ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] } as any
    },
  };

  return (
    <section id="hero" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 pt-20 md:pt-0">
      {/* Dynamic Background Aura - Desktop Only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent-magenta/5 rounded-full blur-[60px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[80px]" />
        </div>
      )}

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ transform: !isMobile ? 'translateZ(0)' : 'none' }}
      >
        <m.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-6 md:mb-8 border border-black/10 dark:border-white/10"
        >
          <span className="relative flex h-2 w-2">
            {!isMobile && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-magenta opacity-75"></span>}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-magenta"></span>
          </span>
          <span className="text-[10px] md:text-sm font-medium tracking-wider uppercase text-text-secondary">
            {t('hero.badge')}
          </span>
        </m.div>

        <m.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 md:mb-8 leading-[1.1] tracking-tighter"
        >
          {t('hero.headline_1')} <br />
          <span className="text-gradient bg-gradient-to-r from-accent-magenta via-accent-purple to-accent-cyan">
            {t('hero.headline_2')}
          </span>
        </m.h1>

        <m.p
          variants={itemVariants}
          className="text-base md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4 md:px-0"
        >
          {t('hero.description')}
        </m.p>

        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto group relative px-8 py-4 dark:bg-white dark:text-black bg-black text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t('hero.cta_primary')} <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => scrollToSection('realisations')}
            className="w-full sm:w-auto group px-8 py-4 glass-morphism text-foreground font-bold rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {t('hero.cta_secondary')} <FileText className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </m.div>
      </m.div>

      {/* Scroll Indicator - Desktop Only */}
      {!isMobile && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('realisations')}
        >
          <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-text-secondary to-transparent" />
          <ChevronDown className="w-4 h-4 text-text-secondary animate-bounce" />
        </m.div>
      )}
    </section>
  );
}

