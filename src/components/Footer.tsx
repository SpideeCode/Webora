import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">LocalBoost</h3>
            <p className="text-sm leading-relaxed">
              Votre partenaire digital pour propulser votre commerce local vers le succès en ligne.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Création de sites web
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Gestion réseaux sociaux
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Vidéos publicitaires
                </a>
              </li>
              <li>
                <a href="#packs" className="hover:text-emerald-400 transition-colors">
                  Nos packs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#apropos" className="hover:text-emerald-400 transition-colors">
                  Notre histoire
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-emerald-400 transition-colors">
                  Nos réalisations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {currentYear} LocalBoost. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
