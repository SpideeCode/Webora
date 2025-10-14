import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { packs } from '../data/packs';

export default function Pricing() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packs" className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/20 via-white/10 to-blue-50/20">
      {/* Effet de fond subtil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWRmMmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PC9zdmc+')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-100/50 px-4 py-1.5 rounded-full mb-4">
            <span>Nos Packs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Des formules adaptées
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez la formule qui correspond à vos besoins
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass p-8 rounded-2xl shadow-glass hover:shadow-glass-lg transition-all duration-300 backdrop-blur-sm ${
                pack.popular ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="glass px-6 py-2 rounded-full text-sm font-semibold shadow-glass flex items-center gap-2 backdrop-blur-sm bg-white/80">
                    <Sparkles className="w-4 h-4" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pack.title}
                </h3>
                <p className="text-gray-600">{pack.description}</p>
                
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {pack.price} {pack.currency}
                  </span>
                  {pack.period && (
                    <span className="text-gray-600">/{pack.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                  pack.popular
                    ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                    : 'bg-white/80 text-gray-900 hover:bg-white/90 shadow-glass hover:shadow-glass-lg'
                }`}
              >
                Choisir ce pack
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
