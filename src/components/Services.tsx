import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();

  const categories = [
    { id: 'All', label: t('services.categories.all') },
    { id: 'Web & SaaS', label: t('services.categories.web_saas') },
    { id: 'Content Production', label: t('services.categories.content') },
    { id: 'Strategy & AI', label: t('services.categories.strategy_ai') }
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <section id="services" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            {t('services.badge')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('services.title')}
          </p>
        </motion.div>

        {/* Filtering */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all border ${activeCategory === cat.id
                ? 'bg-white text-black border-white'
                : 'text-gray-500 border-white/10 hover:border-white/30'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const features = t(`services.items.${service.id}.features`, { returnObjects: true }) as string[];

              return (
                <motion.div
                  layout
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="group relative glass-morphism p-8 rounded-[32px] overflow-hidden border border-white/5 flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="text-white w-6 h-6" />
                  </div>

                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-magenta/20 transition-colors">
                    <Icon className="w-7 h-7 text-white group-hover:text-accent-magenta transition-colors" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-accent-magenta transition-colors">
                    {t(`services.items.${service.id}.title`)}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 mb-auto">
                    {t(`services.items.${service.id}.description`)}
                  </p>

                  <div className="pt-6 border-t border-white/5 space-y-3">
                    {Array.isArray(features) && features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Plus className="w-3 h-3 text-accent-cyan" />
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

