export interface SubCategory {
    id: string;
    name: string;
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
            { id: 'rosette_handles', name: 'Ручки на розетке' },
            { id: 'pull_handles', name: 'Ручки-скобы' }
        ]
    },
    {
        id: 'door_hinges',
        name: 'Дверные петли',
        description: 'Надежные и долговечные петли для плавного хода вашей двери.',
        bannerImage: '/images/products/hinge-overlay.jpg',
        subcategories: [
            { id: 'hidden_hinges', name: 'Скрытые петли' },
            { id: 'mortise_hinges', name: 'Врезные петли' },
            { id: 'spring_hinges', name: 'Пружинные (барные) петли' },
            { id: 'overlay_hinges', name: 'Накладные петли («бабочки»)' }
        ]
    },
    {
        id: 'locks_and_security',
        name: 'Замки и безопасность',
        description: 'Высокая секретность и надежная защита для вашего дома.',
        bannerImage: '/images/products/cylinder.png',
        subcategories: [
            { id: 'mortise_locks', name: 'Врезные замки и механизмы' },
            { id: 'smart_locks', name: 'Электронные (умные) замки' },
            { id: 'cylinders', name: 'Цилиндры для замков / Сердцевины' },
            { id: 'padlocks', name: 'Навесные замки' }
        ]
    },
    {
        id: 'door_fittings',
        name: 'Дверная фурнитура',
        description: 'Аксессуары и декоративные элементы, завершающие образ.',
        bannerImage: '/images/products/escutcheon.jpg',
        subcategories: [
            { id: 'latches_and_bolts', name: 'Защелки и задвижки' },
            { id: 'wc_and_escutcheons', name: 'Фиксаторы (WC) и накладки' },
            { id: 'door_stops', name: 'Дверные упоры / Ограничители' },
            { id: 'door_closers', name: 'Доводчики' }
        ]
    },
    {
        id: 'sliding_systems',
        name: 'Раздвижные системы',
        description: 'Экономия пространства и современный стиль.',
        bannerImage: '/images/products/terra-sn.jpg',
    }
];
