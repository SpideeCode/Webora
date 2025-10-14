import { motion } from 'framer-motion';
import { Heart, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-24 bg-gradient-to-br from-white via-emerald-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              À propos de LocalBoost
            </h2>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Nous aidons les commerces à franchir le pas du digital
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Fondée par deux jeunes entrepreneurs passionnés par le digital et le commerce local,
              LocalBoost est née d'un constat simple : trop de commerces de proximité excellent dans leur métier
              mais peinent à se faire connaître en ligne.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Notre mission est de démocratiser l'accès au digital pour tous les commerçants, artisans et
              petites entreprises. Nous croyons que chaque commerce local mérite une présence en ligne
              professionnelle et accessible.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2ans</div>
                <div className="text-sm text-gray-600">D'expérience</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Équipe LocalBoost"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
              <p className="text-gray-900 font-semibold mb-2">
                "Notre passion : voir nos clients réussir"
              </p>
              <p className="text-sm text-gray-600">
                — L'équipe LocalBoost
              </p>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
