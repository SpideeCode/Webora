import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { packs } from '../data/packs';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t, i18n } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="packs" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-accent-cyan font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            {t('pricing.title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {i18n.language === 'fr'
              ? 'Des structures de prix transparentes pour des résultats exceptionnels.'
              : 'Transparent pricing structures for exceptional results.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packs.map((pack, index) => {
            const localizedName = t(`pricing.items.${pack.id}.name`);
            const localizedTagline = t(`pricing.items.${pack.id}.tagline`);

            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-[40px] glass-morphism border border-white/5 flex flex-col h-full group ${pack.popular ? 'border-accent-magenta/30' : ''
                  }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-magenta text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={12} /> {i18n.language === 'fr' ? 'Recommandé' : 'Recommended'}
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{localizedName}</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{localizedTagline}</p>

                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">{pack.price}</span>
                    <span className="text-xl font-bold text-gray-500">{pack.currency}</span>
                    {pack.period && <span className="text-gray-500 text-sm">/{i18n.language === 'fr' ? 'fixe' : 'flat'}</span>}
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {pack.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${pack.popular ? 'text-accent-magenta' : 'text-accent-cyan'}`} />
                      <span className="text-gray-400 text-sm leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={scrollToContact}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${pack.popular
                    ? 'bg-accent-magenta text-white shadow-lg shadow-accent-magenta/20 hover:scale-[1.02]'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                >
                  {i18n.language === 'fr' ? 'Choisir ce pack' : 'Choose this pack'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Background Glow for popular pack */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-magenta/5 blur-[60px] rounded-full pointer-events-none" />
    </section>
  );
}

