import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-light">
      {/* Fond subtil avec des motifs géométriques */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PC9zdmc+')]" />
      </div>
      
      {/* Effets de lumière subtils */}
      <div className="absolute inset-0 overflow-hidden opacity-3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white text-primary-900 rounded-full text-sm font-medium border border-neutral-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-900" />
            <span>Agence digitale d'excellence</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-neutral-800 mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Donnez vie à votre
            <br />
            <span className="text-primary-900">
              présence digitale
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Nous créons des expériences digitales sur mesure pour les commerces locaux qui veulent se démarquer et attirer plus de clients.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2 group"
            >
              Commencer mon projet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#realisations"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-neutral-800 rounded-xl font-medium text-lg border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
            >
              Nos réalisations
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-neutral-600 max-w-2xl mx-auto"
          >
            {[
              { text: 'Design sur mesure', icon: '✨' },
              { text: 'Développement performant', icon: '⚡' },
              { text: 'Support réactif', icon: '💬' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-6 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all hover:border-neutral-200">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-neutral-800">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="w-full absolute bottom-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-8 h-12 border-2 border-neutral-300 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
