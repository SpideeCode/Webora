export interface Pack {
  id: string;
  name: string;
  tagline: string;
  price: string;
  currency: string;
  period?: string;
  color: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export const packs: Pack[] = [
  {
    id: 'focus',
    name: 'Présence',
    tagline: 'L\'essentiel pour émerger',
    price: '990',
    currency: '€',
    period: 'base',
    color: 'from-accent-cyan to-blue-600',
    features: [
      'Site vitrine haute performance',
      'Design radical & responsive',
      'Optimisation SEO technique',
      'Architecture sécurisée',
      'Suivi post-lancement (1 mois)'
    ],
    cta: 'Lancer mon projet',
    popular: false
  },
  {
    id: 'momentum',
    name: 'Croissance',
    tagline: 'Accélérer la croissance',
    price: '2490',
    currency: '€',
    period: 'base',
    color: 'from-accent-magenta to-purple-600',
    features: [
      'Plateforme Web & SaaS complexe',
      'UX design sur-mesure (Figma)',
      'Production Vidéo publicitaire (x2)',
      'Stratégie de capture de leads',
      'Support prioritaire (3 mois)',
      'Formation à l\'autonomie digitale'
    ],
    cta: 'Propulser mon business',
    popular: true
  },
  {
    id: 'apex',
    name: 'Performance',
    tagline: 'Domination totale',
    price: '4990',
    currency: '€',
    period: 'base',
    color: 'from-accent-purple to-indigo-600',
    features: [
      'Écosystème digital illimité',
      'Intégration Intelligence Artificielle',
      'Production Vidéo & Photo Premium',
      'Growth Hacking & Digital Strategy',
      'Maintenance préventive (6 mois)',
      'Consulting dédié 24/7'
    ],
    cta: 'Atteindre le sommet',
    popular: false
  }
];
