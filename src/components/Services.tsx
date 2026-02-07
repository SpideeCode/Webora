import { m, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Services() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const categories = [
    { id: 'All', label: t('services.categories.all') },
    { id: 'Web & SaaS', label: t('services.categories.web_saas') },
    { id: 'Content Production', label: t('services.categories.content') },
    { id: 'Strategy & AI', label: t('services.categories.strategy_ai') }
  ];

  // No filtering - all services shown as requested

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0 : 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: isMobile ? 0 : 0.3 } }
  };

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            {t('services.badge')}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('services.title')}
          </p>
        </m.div>

        {/* Filtering */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border text-text-secondary border-black/5 dark:border-white/5 hover:text-accent-cyan hover:border-accent-cyan/50 cursor-default"
            >
              {cat.label}
            </div>
          ))}
        </div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout" initial={!isMobile}>
            {services.map((service) => {
              const Icon = service.icon;
              const features = t(`services.items.${service.id}.features`, { returnObjects: true }) as string[];

              return (
                <m.div
                  layout={!isMobile}
                  key={service.id}
                  variants={cardVariants}
                  whileHover={isMobile ? {} : { y: -5 }}
                  className="group relative glass-card p-8 overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-foreground w-6 h-6" />
                  </div>

                  <div className="w-14 h-14 bg-accent-cyan/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-cyan/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent-cyan group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-accent-cyan transition-colors">
                    {t(`services.items.${service.id}.title`)}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed mb-8 mb-auto">
                    {t(`services.items.${service.id}.description`)}
                  </p>

                  <div className="pt-6 border-t border-foreground/5 space-y-3">
                    {Array.isArray(features) && features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Plus className="w-3 h-3 text-accent-cyan" />
                        <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">{f}</span>
                      </div>
                    ))}
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}
