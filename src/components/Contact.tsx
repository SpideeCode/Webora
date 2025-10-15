import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = (e) => {
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
          message: formData.message,
        },
        "rzjWjtVn3uyjGFJwm"
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Erreur EmailJS:", error);
          setStatus("error");
        }
      )
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white/40 to-blue-100/20"
    >
      {/* arrière-plan subtil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-100/50 px-4 py-1.5 rounded-full mb-4">
            <span>Contact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prenons contact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment nous pouvons vous aider
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* gauche : infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-lg bg-white/40 border border-white/30 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Nos coordonnées
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <a
                    href="mailto:contact.weboraagency@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact.weboraagency@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Téléphone</h4>
                  <a
                    href="tel:+32488361492"
                    className="text-blue-600 hover:underline"
                  >
                    +32 488 36 14 92
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* droite : formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-lg bg-white/40 border border-white/30 p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Envoyez-nous un message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              {/* Message de confirmation / erreur */}
              {status && (
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    status === "success"
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  } p-3 rounded-lg border ${
                    status === "success"
                      ? "border-green-200"
                      : "border-red-200"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  {status === "success"
                    ? "Message envoyé avec succès !"
                    : "Erreur d’envoi. Réessayez plus tard."}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group disabled:opacity-60"
                >
                  {loading ? "Envoi..." : "Envoyer le message"}
                  {!loading && (
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
