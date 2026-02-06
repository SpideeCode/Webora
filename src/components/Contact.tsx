import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import SmartFunnel from "./SmartFunnel";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32 bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-magenta opacity-5 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-cyan opacity-5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-magenta/10 border border-accent-magenta/20 mb-6 font-black text-[10px] text-accent-magenta uppercase tracking-[0.3em]"
          >
            {t('contact.badge')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            {t('contact.title').split('?')[0]} <br />
            <span className="text-accent-cyan">PROJET ?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('contact.description')}
          </motion.p>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* Funnel Side - Now on TOP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-1 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent order-1"
          >
            <div className="bg-primary p-6 md:p-12 rounded-[39px] glass-card">
              <SmartFunnel />
            </div>
          </motion.div>

          {/* Info Side - Now at BOTTOM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2"
          >
            <div className="p-8 md:p-10 rounded-[40px] glass-card flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Canal Direct</h4>
                  <a href="mailto:contact.weboraagency@gmail.com" className="group flex items-center gap-4 text-gray-300 hover:text-white transition-all justify-center md:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-magenta/20 group-hover:text-accent-magenta transition-all">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">contact.weboraagency@gmail.com</span>
                  </a>
                </div>

                <div>
                  <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Siège</h4>
                  <div className="flex items-center gap-4 text-gray-300 justify-center md:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Bruxelles, Belgique</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6">
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-accent-magenta hover:scale-110 transition-all border border-white/5">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-accent-cyan hover:scale-110 transition-all border border-white/5">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
                    <Globe size={18} />
                  </a>
                </div>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] italic max-w-[200px] leading-relaxed">
                  "Nous forgeons des empires digitaux."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
