export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    results: string;
    link: string;
}

export const portfolio: PortfolioItem[] = [
    {
        id: 1,
        title: 'Boulangerie Le Pétrin d\'Or',
        category: 'Site web + Réseaux sociaux',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
        description: 'Refonte complète du site web et stratégie social media pour augmenter la visibilité locale.',
        results: '+150% de trafic en 3 mois',
        link: '#'
    },
    {
        id: 2,
        title: 'Salon de coiffure Élégance',
        category: 'Vidéos publicitaires',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        description: 'Série de 5 vidéos promotionnelles pour Instagram et TikTok.',
        results: '+300 nouveaux abonnés',
        link: '#'
    },
    {
        id: 3,
        title: 'Restaurant Le Bistrot',
        category: 'Pack complet',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        description: 'Site web avec réservation en ligne, gestion des réseaux sociaux et vidéos menu.',
        results: '+200% de réservations en ligne',
        link: '#'
    },
    {
        id: 4,
        title: 'Boutique Mode & Style',
        category: 'E-commerce',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
        description: 'Création d\'une boutique en ligne moderne avec intégration paiement sécurisé.',
        results: '€15k de ventes le 1er mois',
        link: '#'
    }
];
