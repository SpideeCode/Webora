import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="apropos" className="py-32 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-magenta/10 border border-accent-magenta/20 mb-6 font-black text-[10px] text-accent-magenta uppercase tracking-[0.3em]">
              <MapPin className="w-3 h-3" /> {t('about.badge')}
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
              {t('about.title').split(' ')[0]} <br />
              <span className="text-accent-magenta">{t('about.title').split(' ').slice(1).join(' ')}</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              {t('about.subtitle')}
            </p>

            <div className="space-y-6 text-gray-400 text-sm leading-relaxed mb-12">
              <p>
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl glass-morphism border border-white/5">
                <div className="text-2xl font-black text-white mb-1">50+</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('about.stats.projects')}</div>
              </div>
              <div className="p-4 rounded-2xl glass-morphism border border-white/5">
                <div className="text-2xl font-black text-white mb-1">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('about.stats.focus')}</div>
              </div>
              <div className="p-4 rounded-2xl glass-morphism border border-white/5">
                <div className="text-2xl font-black text-white mb-1">Brux</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('about.stats.base')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
            className="relative"
          >
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-square lg:aspect-auto h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Studio Webora"
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-8 left-8 right-8 p-8 glass-morphism rounded-3xl border border-white/10">
                <p className="text-white font-black italic text-lg mb-2 leading-tight">
                  "{t('about.quote')}"
                </p>
                <p className="text-xs text-accent-magenta font-black uppercase tracking-widest">
                  — {t('about.signature')}
                </p>
              </div>
            </div>

            {/* Accent Blur */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-magenta opacity-10 blur-[100px] rounded-full animate-pulse-slow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

