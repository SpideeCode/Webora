import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { packs } from '../data/packs';

export default function Pricing() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packs" className="py-24 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Packs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez la formule qui correspond à vos ambitions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-300 ${
                pack.popular ? 'md:-mt-4 md:scale-105 border-4 border-emerald-500' : 'border-2 border-gray-100'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {pack.name}
                </h3>
                <p className="text-gray-600 mb-6">{pack.tagline}</p>

                <div className="flex items-end justify-center gap-2 mb-2">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${pack.color} bg-clip-text text-transparent`}>
                    {pack.price}
                  </span>
                  <span className="text-2xl text-gray-600 mb-2">{pack.currency}</span>
                </div>
                <p className="text-sm text-gray-500">{pack.period}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {pack.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pack.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                  pack.popular
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {pack.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600"
        >
          Tous nos packs sont personnalisables selon vos besoins. Contactez-nous pour un devis sur-mesure.
        </motion.p>
      </div>
    </section>
  );
}
