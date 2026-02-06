import { motion } from 'framer-motion';
import { Rocket, FileText, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary px-4">
      {/* Dynamic Background Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent-magenta/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[150px] animation-delay-2000 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100 mix-blend-overlay" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-8 border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-magenta opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-magenta"></span>
          </span>
          <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-gray-400">
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter"
        >
          {t('hero.headline_1')} <br />
          <span className="text-gradient bg-gradient-to-r from-accent-magenta via-accent-purple to-accent-cyan">
            {t('hero.headline_2')}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.cta_primary')} <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => scrollToSection('realisations')}
            className="group px-8 py-4 glass-morphism text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {t('hero.cta_secondary')} <FileText className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection('realisations')}
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        <ChevronDown className="w-4 h-4 text-gray-500 animate-bounce" />
      </motion.div>
    </section>
  );
}

