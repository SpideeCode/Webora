import { Linkedin, Instagram, Twitter, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    expertises: [
      { name: t('footer.links.web'), href: '#services' },
      { name: t('footer.links.saas'), href: '#services' },
      { name: t('footer.links.video'), href: '#services' },
      { name: t('footer.links.ai'), href: '#services' },
    ],
    agence: [
      { name: t('footer.links.approach'), href: '#methodology' },
      { name: t('footer.links.case_studies'), href: '#realisations' },
      { name: t('footer.links.studio'), href: '#apropos' },
      { name: t('footer.links.contact'), href: '#contact' },
    ],
    contact: [
      { icon: Mail, text: 'contact.weboraagency@gmail.com', href: 'mailto:contact.weboraagency@gmail.com' },
      { icon: MapPin, text: 'Bruxelles, Belgique', href: '#' },
    ]
  };

  return (
    <footer className="bg-primary pt-32 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/img/logo-transparent-svg.svg"
                alt="Webora"
                className="h-8 w-auto brightness-200"
              />
              <span className="text-2xl font-black text-white tracking-widest uppercase">Webora</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              {t('hero.description')}
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: 'https://www.instagram.com/webora.da/' },
                { icon: Twitter, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-morphism rounded-xl flex items-center justify-center border border-white/5 hover:border-accent-magenta/50 hover:bg-white/5 transition-all group"
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{t('footer.expertises')}</h4>
            <ul className="space-y-4">
              {footerLinks.expertises.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors font-medium">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{t('footer.agency')}</h4>
            <ul className="space-y-4">
              {footerLinks.agence.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors font-medium">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">{t('footer.base')}</h4>
            <ul className="space-y-6">
              {footerLinks.contact.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 glass-morphism rounded-lg flex items-center justify-center border border-white/5">
                    <item.icon className="w-3 h-3 text-accent-cyan" />
                  </div>
                  <a href={item.href} className="text-gray-500 hover:text-white text-sm transition-colors font-medium leading-tight">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-widest italic">
                {t('footer.developed_by')} <a href="https://webora-da.be" target="_blank" className="text-white hover:text-accent-magenta transition-colors">webora-da.be</a>
              </p>
              <a href="/admin/dashboard" className="text-[10px] text-gray-700 hover:text-white transition-colors uppercase font-black tracking-widest">
                Accès Admin
              </a>
            </div>

            <div className="flex gap-8">
              {['Confidentialité', 'Mentions Légales', 'Cookies'].map((text, i) => (
                <a key={i} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">
                  {text === 'Confidentialité' && i18n.language === 'en' ? 'Privacy' : text}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-accent-cyan transition-colors"
            >
              {i18n.language === 'fr' ? 'Retour au sommet' : 'Back to top'} <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
}

