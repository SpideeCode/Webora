import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à booster votre présence digitale ? Parlons de votre projet !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="jean@exemple.fr"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                  placeholder="Parlez-nous de votre projet..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                Envoyer le message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Autres moyens de nous contacter
              </h3>

              <div className="space-y-6">
                <a
                  href="https://wa.me/33612345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-700">
                      WhatsApp
                    </div>
                    <div className="text-sm text-gray-600">
                      Discuter directement avec nous
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+33612345678"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-700">
                      Téléphone
                    </div>
                    <div className="text-sm text-gray-600">
                      06 12 34 56 78
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:contact@localboost.fr"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-700">
                      Email
                    </div>
                    <div className="text-sm text-gray-600">
                      contact@localboost.fr
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">
                Réserver un appel découverte
              </h3>
              <p className="mb-6 text-emerald-50">
                Scannez ce QR code pour prendre rendez-vous directement dans notre agenda
              </p>
              <div className="bg-white p-6 rounded-xl inline-block">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://calendly.com/localboost"
                  alt="QR Code pour réserver"
                  className="w-48 h-48"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
