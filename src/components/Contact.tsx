import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, XCircle, MapPin, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Website",
    budget: "1k-5k",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        "service_q2wzt76",
        "template_pa1epp7",
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        },
        "rzjWjtVn3uyjGFJwm"
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", projectType: "Website", budget: "1k-5k", message: "" });
        },
        (error) => {
          console.error("Erreur EmailJS:", error);
          setStatus("error");
        }
      )
      .finally(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left Side: Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <span className="text-accent-cyan font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
              {t('contact.badge')}
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
              {t('contact.title', { interpolation: { escapeValue: false } }).split('?')[0]} <br />
              <span className="text-accent-magenta">{t('contact.title').includes('?') ? 'Ignition ?' : 'Ignition'}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              {t('contact.description')}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent-cyan/30 transition-all">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Transmission</span>
                  <a href="mailto:contact.weboraagency@gmail.com" className="text-white font-bold hover:text-accent-cyan transition-colors">contact.weboraagency@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 glass-morphism rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-accent-cyan/30 transition-all">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Base</span>
                  <span className="text-white font-bold">Bruxelles, Belgique</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="#" className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center border border-white/5 hover:bg-white/10 transition-all">
                <Linkedin className="text-white w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center border border-white/5 hover:bg-white/10 transition-all">
                <Instagram className="text-white w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 glass-morphism rounded-[48px] border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">{t('contact.labels.name')}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.name')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-magenta/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">{t('contact.labels.email')}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.email')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-magenta/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">{t('contact.labels.type')}</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-magenta/50 transition-all appearance-none"
                  >
                    <option value="Website" className="bg-primary">{i18n.language === 'fr' ? 'Site Web Premium' : 'Premium Website'}</option>
                    <option value="SaaS" className="bg-primary">{i18n.language === 'fr' ? 'Application SaaS' : 'SaaS Application'}</option>
                    <option value="Video" className="bg-primary">{i18n.language === 'fr' ? 'Production Vidéo' : 'Video Production'}</option>
                    <option value="AI" className="bg-primary">{i18n.language === 'fr' ? 'Intégration IA' : 'AI Integration'}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">{t('contact.labels.budget')}</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-magenta/50 transition-all appearance-none"
                  >
                    <option value="1k-3k" className="bg-primary">1,000€ - 3,000€</option>
                    <option value="3k-10k" className="bg-primary">3,000€ - 10,000€</option>
                    <option value="10k+" className="bg-primary">10,000€ +</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">{t('contact.labels.message')}</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholders.message')}
                  className="w-full bg-white/5 border border-white/10 rounded-[32px] px-6 py-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-magenta/50 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-6 bg-white text-black rounded-[32px] font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? t('contact.sending') : (
                  <>{t('contact.submit')} <Send className="w-4 h-4" /></>
                )}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <CheckCircle className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest text-center w-full">{t('contact.success')}</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
                  >
                    <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-red-500 text-xs font-bold uppercase tracking-widest text-center w-full">{t('contact.error')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

