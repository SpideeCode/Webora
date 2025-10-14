import { motion } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { ExternalLink, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  return (
    <section id="realisations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez comment nous avons aidé des commerces locaux à transformer leur présence digitale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolio.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="inline-block w-fit px-4 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full mb-3">
                    {project.category}
                  </span>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <TrendingUp className="w-5 h-5" />
                    <span>{project.results}</span>
                  </div>

                  <a
                    href={project.link}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/30"
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
