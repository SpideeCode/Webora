import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { ExternalLink, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <section id="realisations" className="py-32 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            {t('portfolio.title')}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </motion.div>

        <div className="space-y-32">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              {/* Image / 3D Mockup Side */}
              <div className="flex-1 w-full group cursor-pointer perspective-1000">
                <motion.div
                  whileHover={{ rotateY: index % 2 === 0 ? 5 : -5, rotateX: 2, scale: 1.02 }}
                  className="relative aspect-[16/10] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 ease-out"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />

                  {/* Overlay Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-6 right-6 w-14 h-14 glass-morphism rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    <ExternalLink className="text-white w-6 h-6" />
                  </a>
                </motion.div>
              </div>

              {/* Narrative Side */}
              <div className="flex-1 space-y-8">
                <div>
                  <span className="text-accent-magenta font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                    {t(`portfolio.items.${project.id}.category`)}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black text-white leading-none">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Problem */}
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <AlertCircle className="text-red-500 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{t('portfolio.challenge')}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(`portfolio.items.${project.id}.problem`)}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Lightbulb className="text-blue-500 w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{t('portfolio.approach')}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(`portfolio.items.${project.id}.solution`)}</p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center">
                      <CheckCircle2 className="text-accent-cyan w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{t('portfolio.impact')}</h4>
                      <p className="text-accent-cyan font-bold text-lg">{t(`portfolio.items.${project.id}.results`)}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest border-b-2 border-accent-magenta pb-2 hover:gap-4 transition-all"
                  >
                    {t('portfolio.cta')} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-full h-full bg-aura-gradient opacity-20 -z-0 pointer-events-none" />
    </section>
  );
}

