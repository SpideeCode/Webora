export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    problem: string;
    solution: string;
    results: string;
    link: string;
}

export const portfolio: PortfolioItem[] = [
    {
        id: 1,
        title: 'Tapzy',
        category: 'SaaS Restaurant & Menu 3D/AR',
        image: '/img/portfolio/tapzy.png',
        description: 'Solution complète de digitalisation pour la restauration moderne.',
        problem: 'Les restaurateurs peinent à gérer les pics d\'affluence et à proposer une expérience de menu attractive tout en gérant les paiements rapidement.',
        solution: 'Une plateforme SaaS intégrant QR Code, menus en Réalité Augmentée et un système de paiement instantané à table.',
        results: '+40% de rotation de table & menus 3D immersifs',
        link: 'https://tapzy-landing.vercel.app'
    },
    {
        id: 2,
        title: 'AKR Group',
        category: 'Courtage en Charges Domestiques',
        image: '/img/portfolio/akr-group.png',
        description: 'Machine à leads pour courtier en énergie et télécom.',
        problem: 'AKR Group avait besoin d\'une présence web capable de transformer des visiteurs curieux en prospects hautement qualifiés.',
        solution: 'Design stratégique orienté conversion avec des tunnels de capture de données optimisés et un copy-writing persuasif.',
        results: 'Taux de conversion multiplié par 3',
        link: 'https://akr-group.vercel.app'
    },
    {
        id: 3,
        title: 'ZArchitecture',
        category: 'Portfolio Architecture',
        image: '/img/portfolio/zarchitecture.png',
        description: 'Vitrine artistique minimaliste pour de futurs architectes.',
        problem: 'Comment présenter des plans et visuels complexes sans surcharger l\'interface et en gardant une élégance académique ?',
        solution: 'Développement d\'un portfolio minimaliste "Visuel-First" avec une navigation fluide et des galeries plein écran.',
        results: 'Identité visuelle premium & intuitive',
        link: 'https://www.zarchitecture.be'
    },
    {
        id: 4,
        title: 'LMB Scouts 2025',
        category: 'Association',
        image: '/img/portfolio/scouts2025.png',
        description: 'Plateforme communautaire et d\'engagement pour la jeunesse.',
        problem: 'Nécessité de centraliser les informations, les inscriptions et l\'engagement pour une grande organisation scoute.',
        solution: 'Une interface dynamique facilitant l\'accès aux ressources et renforçant le sentiment d\'appartenance à la communauté.',
        results: 'Centralisation & Engagement accru',
        link: 'https://scouts2025.vercel.app'
    }
];
