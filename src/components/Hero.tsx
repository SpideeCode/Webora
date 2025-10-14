import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Fond subtil avec des motifs géométriques */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PC9zdmc+')]" />
      </div>
      
      {/* Effets de lumière subtils */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-1/3 -right-1/3 w-full h-full bg-gradient-radial from-primary-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/3 w-full h-full bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl" />
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
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium border border-neutral-200/50 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>Agence digitale d'excellence</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Donnez vie à votre
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              présence digitale
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Nous concevons des expériences numériques sur mesure qui transforment votre entreprise locale en une marque remarquable.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-neutral-900 text-white rounded-xl font-medium text-lg transition-all duration-300 flex items-center gap-2 group hover:bg-neutral-800 shadow-lg hover:shadow-xl hover:shadow-primary-500/10"
            >
              Discutons de votre projet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-neutral-900 rounded-xl font-medium text-lg border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-sm"
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
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-neutral-800">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
            className="w-1.5 h-1.5 bg-neutral-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
