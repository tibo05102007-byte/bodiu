export interface SubCategory {
    id: string;
    name: string;
    image?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    bannerImage: string;
    subcategories?: SubCategory[];
}

export const categories: Category[] = [
    {
        id: 'door_handles',
        name: 'Дверные ручки',
        description: 'Основной элемент дизайна. Широкий выбор ручек для любых типов дверей.',
        bannerImage: '/images/products/alfa-black.jpg',
        subcategories: [
            { id: 'rosette_handles', name: 'Ручки на розетке', image: '/images/products/classic-ab.jpg' },
            { id: 'pull_handles', name: 'Ручки-скобы', image: '/images/products/handle-aluminum-axe.jpg' }
        ]
    },
    {
        id: 'door_hinges',
        name: 'Дверные петли',
        description: 'Надежные и долговечные петли для плавного хода вашей двери.',
        bannerImage: '/images/products/hinge-overlay.jpg',
        subcategories: [
            { id: 'hidden_hinges', name: 'Скрытые петли', image: '/images/products/real/diamond.jpg' },
            { id: 'mortise_hinges', name: 'Врезные петли', image: '/images/products/real/hinge_mortise.jpg' },
            { id: 'spring_hinges', name: 'Пружинные (барные) петли', image: '/images/products/hinge-overlay.jpg' },
            { id: 'overlay_hinges', name: 'Накладные петли («бабочки»)', image: '/images/products/hinge-overlay.jpg' }
        ]
    },
    {
        id: 'locks_and_security',
        name: 'Замки и безопасность',
        description: 'Высокая секретность и надежная защита для вашего дома.',
        bannerImage: '/images/products/cylinder.png',
        subcategories: [
            { id: 'mortise_locks', name: 'Врезные замки и механизмы', image: '/images/products/real/lock_mortise.jpg' },
            { id: 'smart_locks', name: 'Электронные (умные) замки', image: '/images/products/real/smart_lock.jpg' },
            { id: 'cylinders', name: 'Цилиндры для замков / Сердцевины', image: '/images/products/real/cylinder.jpg' },
            { id: 'padlocks', name: 'Навесные замки', image: '/images/products/cylinder.png' }
        ]
    },
    {
        id: 'door_fittings',
        name: 'Дверная фурнитура',
        description: 'Аксессуары и декоративные элементы, завершающие образ.',
        bannerImage: '/images/products/escutcheon.jpg',
        subcategories: [
            { id: 'latches_and_bolts', name: 'Защелки и задвижки', image: '/images/products/latch.jpg' },
            { id: 'wc_and_escutcheons', name: 'Фиксаторы (WC) и накладки', image: '/images/products/wc-kit.jpg' },
            { id: 'door_stops', name: 'Дверные упоры / Ограничители', image: '/images/products/real/stop_black.jpg' },
            { id: 'door_closers', name: 'Доводчики', image: '/images/products/deadbolt.jpg' }
        ]
    },
    {
        id: 'sliding_systems',
        name: 'Раздвижные системы',
        description: 'Экономия пространства и современный стиль.',
        bannerImage: '/images/products/terra-sn.jpg',
    }
];
