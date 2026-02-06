import { Globe, Video, Brain, Code2, Camera, BarChart3 } from 'lucide-react';

export interface Service {
  id: string;
  icon: any;
  title: string;
  category: 'Web & SaaS' | 'Content Production' | 'Strategy & AI';
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'website',
    icon: Globe,
    category: 'Web & SaaS',
    title: 'High-Performance Websites',
    description: 'Sites vitrines et e-commerce ultra-rapides, conçus pour la conversion et l\'excellence visuelle.',
    features: [
      'Design avant-gardiste',
      'Optimisation SEO technique',
      'Expérience Mobile standard-plus',
      'Hébergement Cloud Premium'
    ]
  },
  {
    id: 'saas',
    icon: Code2,
    category: 'Web & SaaS',
    title: 'SaaS & Custom Apps',
    description: 'Développement d\'applications métiers et plateformes SaaS complexes, de l\'idéation au déploiement.',
    features: [
      'Architecture évolutive',
      'Interfaces UX complexes',
      'Intégrations API & Paiement',
      'Sécurité Grade-A'
    ]
  },
  {
    id: 'video',
    icon: Video,
    category: 'Content Production',
    title: 'Cinematic Video',
    description: 'Production vidéo haut de gamme pour capturer l\'essence de votre marque et engager votre audience.',
    features: [
      'Storytelling de marque',
      'Qualité 4K/Cinématique',
      'Montage dynamique & VFX',
      'Formats Réseaux Sociaux'
    ]
  },
  {
    id: 'photo',
    icon: Camera,
    category: 'Content Production',
    title: 'Professional Media',
    description: 'Photographie et création de contenu visuel qui sublime votre identité de marque.',
    features: [
      'Shootings Produits/Équipe',
      'Direction Artistique',
      'Retouche Haute Déf',
      'Banque d\'Images Propriétaire'
    ]
  },
  {
    id: 'ai',
    icon: Brain,
    category: 'Strategy & AI',
    title: 'AI Integration',
    description: 'Implémentation d\'outils d\'IA générative pour automatiser vos processus et doper votre croissance.',
    features: [
      'Chatbots intelligents',
      'Automatisation de workflows',
      'Analyse de données IA',
      'Consulting Transformation'
    ]
  },
  {
    id: 'strategy',
    icon: BarChart3,
    category: 'Strategy & AI',
    title: 'Digital Strategy',
    description: 'Accompagnement stratégique complet pour dominer votre marché et maximiser votre ROI.',
    features: [
      'Audit & Analyse Marché',
      'Growth Hacking',
      'Gestion Campagnes Ads',
      'Optimisation de Conversion'
    ]
  }
];
