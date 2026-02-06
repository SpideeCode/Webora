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
        title: 'Tapzy',
        category: 'SaaS Restaurant & Menu 3D/AR',
        image: '/img/portfolio/tapzy.png',
        description: 'Solution complète : commande et paiement à table via QR code, menu digital avec plats en 3D/AR, et gestion des commandes cuisine.',
        results: 'Digitalisation & Expérience Client',
        link: 'https://tapzy-landing.vercel.app'
    },
    {
        id: 2,
        title: 'AKR Group',
        category: 'Courtage en Charges Domestiques',
        image: '/img/portfolio/akr-group.png',
        description: 'Site web stratégique pour courtier, conçu spécifiquement pour la génération de leads qualifiés et l\'optimisation de la conversion.',
        results: 'Génération de leads qualifiés',
        link: 'https://akr-group.vercel.app'
    },
    {
        id: 3,
        title: 'ZArchitecture',
        category: 'Portfolio Architecture',
        image: '/img/portfolio/zarchitecture.png',
        description: 'Portfolio numérique mettant en valeur les projets d\'étudiantes en Master Architecte. Design épuré laissant la place aux visuels.',
        results: 'Mise en valeur visuelle',
        link: 'https://www.zarchitecture.be'
    },
    {
        id: 4,
        title: 'LMB Scouts 2025',
        category: 'Association',
        image: '/img/portfolio/scouts2025.png',
        description: 'Plateforme officielle pour les Scouts Musulmans de Belgique (2025). Centralisation des informations et outils d\'engagement.',
        results: 'Communication & Engagement',
        link: 'https://scouts2025.vercel.app'
    }
];
