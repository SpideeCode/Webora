import { m } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Suspense, lazy } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

const SmartFunnel = lazy(() => import("./SmartFunnel"));

const FunnelLoader = () => (
  <div className="flex items-center justify-center p-12">
    <div className="w-8 h-8 border-2 border-accent-magenta border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Contact() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Background elements - Desktop Only */}
      {!isMobile && (
        <>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-magenta opacity-5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-cyan opacity-5 blur-[120px] rounded-full" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <m.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-magenta/10 border border-accent-magenta/20 mb-6 font-black text-[10px] text-accent-magenta uppercase tracking-[0.3em]"
          >
            {t('contact.badge')}
          </m.div>
          <m.h2
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.1 }}
            className="text-4xl md:text-7xl font-black text-foreground mb-6 uppercase tracking-tighter"
          >
            {t('contact.title').split('?')[0]} <br />
            <span className="text-accent-cyan">PROJET ?</span>
          </m.h2>
          <m.p
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.2 }}
            className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('contact.description')}
          </m.p>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* Funnel Side - Now on TOP */}
          <m.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-1 rounded-[40px] bg-gradient-to-br from-foreground/10 to-transparent order-1"
          >
            <div className="bg-background p-6 md:p-12 rounded-[39px] glass-card">
              <Suspense fallback={<FunnelLoader />}>
                <SmartFunnel />
              </Suspense>
            </div>
          </m.div>

          {/* Info Side - Now at BOTTOM */}
          <m.div
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0 : 0.1 }}
            className="order-2"
          >
            <div className="p-8 md:p-10 rounded-[40px] glass-card flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div>
                  <h4 className="text-foreground font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Canal Direct</h4>
                  <a href="mailto:contact.weboraagency@gmail.com" className="group flex items-center gap-4 text-text-secondary hover:text-foreground transition-all justify-center md:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-accent-magenta/20 group-hover:text-accent-magenta transition-all">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">contact.weboraagency@gmail.com</span>
                  </a>
                </div>

                <div>
                  <h4 className="text-foreground font-black uppercase tracking-widest text-[10px] mb-4 opacity-30">Siège</h4>
                  <div className="flex items-center gap-4 text-text-secondary justify-center md:justify-start">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Bruxelles, Belgique</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-6">
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground hover:bg-accent-magenta hover:dark:text-black hover:text-white hover:scale-110 transition-all border border-foreground/5">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground hover:bg-accent-cyan hover:dark:text-black hover:text-white hover:scale-110 transition-all border border-foreground/5">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground hover:dark:bg-white/10 hover:bg-black/10 hover:scale-110 transition-all border border-foreground/5">
                    <Globe size={18} />
                  </a>
                </div>

              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
