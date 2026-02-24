export interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
    subcategory?: string;
    brand: string;
    colors: string[];
    inStock: boolean;
    isNew?: boolean;
    isBestseller?: boolean;
    isSale?: boolean;
    description?: string;
    price?: number;
}

export const products: Product[] = [
    {
        "id": 2000,
        "name": "WC-CYL",
        "category": "door_fittings",
        "subcategory": "wc_and_escutcheons",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-wc-cyl-hrom-2000.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2001,
        "name": "ВРЕЗНЫЕ ПЕТЛИ",
        "category": "door_hinges",
        "subcategory": "mortise_hinges",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-vreznye-petli-hrom-2001.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2002,
        "name": "ЗАМКИ",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Status",
        "image": "/images/products/auto/status-zamki-hrom-2002.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2003,
        "name": "Магнитные межкомнатные замки",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-magnitnye-mezhkomnatnye-zamki-hrom-2003.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2004,
        "name": "apolinho",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-apolinho-hrom-2004.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2005,
        "name": "CX",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-cx-hrom-2005.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2006,
        "name": "MG",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-mg-hrom-2006.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2007,
        "name": "МЕХАНИЧЕСКИЙ",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-mehanicheskij-hrom-2007.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2008,
        "name": "навесы бабочки аполлот",
        "category": "door_hinges",
        "subcategory": "overlay_hinges",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-navesy-babochki-apollot-hrom-2008.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2009,
        "name": "Навесы",
        "category": "door_hinges",
        "subcategory": "overlay_hinges",
        "brand": "Status",
        "image": "/images/products/auto/status-navesy-hrom-2009.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2010,
        "name": "ДОВОДЧИКИ ДВЕРНЫЕ",
        "category": "door_fittings",
        "subcategory": "door_closers",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-dovodchiki-dvernye-hrom-2010.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2011,
        "name": "ЗАДВИЖКА",
        "category": "door_fittings",
        "subcategory": "latches_and_bolts",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-zadvizhka-hrom-2011.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2012,
        "name": "ЗАДВИЖКА",
        "category": "door_fittings",
        "subcategory": "latches_and_bolts",
        "brand": "Status",
        "image": "/images/products/auto/status-zadvizhka-hrom-2012.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2013,
        "name": "ЗАМКИ",
        "category": "locks_and_security",
        "subcategory": "mortise_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-zamki-hrom-2013.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2014,
        "name": "CY-03S",
        "category": "door_fittings",
        "subcategory": "latches_and_bolts",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-cy-03s-hrom-2014.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2015,
        "name": "Защелка",
        "category": "door_fittings",
        "subcategory": "latches_and_bolts",
        "brand": "Status",
        "image": "/images/products/auto/2015_D-45 MSN.JPG",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2016,
        "name": "МАГНИТНЫЕ ЗАЩЕЛКИ",
        "category": "door_fittings",
        "subcategory": "latches_and_bolts",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-magnitnye-zashchelki-hrom-2016.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2017,
        "name": "НАКЛАДКИ",
        "category": "door_fittings",
        "subcategory": "wc_and_escutcheons",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-nakladki-hrom-2017.jpeg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2018,
        "name": "ПРУЖИННАЯ ПЕТЛЯ",
        "category": "door_hinges",
        "subcategory": "spring_hinges",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-pruzhinnaya-petlya-hrom-2018.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2019,
        "name": "Для раздвижных дверей",
        "category": "sliding_systems",
        "subcategory": "",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-dlya-razdvizhnyh-dverej-hrom-2019.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2020,
        "name": "Ручка Neon Model",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Neon",
        "image": "/images/products/auto/neon-ruchka-neon-model-hrom-2020.jpeg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2021,
        "name": "Ручка АЖУР",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-azhur-hrom-2021.png",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2022,
        "name": "Ручка БЕЛЫЕ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-belye-belyj-2022.jpg",
        "colors": [
            "Белый"
        ],
        "inStock": true
    },
    {
        "id": 2023,
        "name": "Ручка БРОНЗА",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-bronza-bronza-2023.jpg",
        "colors": [
            "Бронза"
        ],
        "inStock": true
    },
    {
        "id": 2024,
        "name": "Ручка графит",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Status",
        "image": "/images/products/auto/status-ruchka-grafit-grafit-2024.jpg",
        "colors": [
            "Графит"
        ],
        "inStock": true
    },
    {
        "id": 2025,
        "name": "Ручка ЗОЛОТО",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-zoloto-zoloto-2025.jpg",
        "colors": [
            "Золото"
        ],
        "inStock": true
    },
    {
        "id": 2026,
        "name": "Ручка Золото",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Status",
        "image": "/images/products/auto/status-ruchka-zoloto-zoloto-2026.jpg",
        "colors": [
            "Золото"
        ],
        "inStock": true
    },
    {
        "id": 2027,
        "name": "Ручка МАТОВЫЙ ХРОМ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-matovyj-hrom-hrom-2027.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2028,
        "name": "Ручка МАТОВЫЙ ЧЕРНЫЙ НИКЕЛЬ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-matovyj-chernyj-nikel-chernyj-2028.jpg",
        "colors": [
            "Черный"
        ],
        "inStock": true
    },
    {
        "id": 2029,
        "name": "Ручка серебро",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-serebro-hrom-2029.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2030,
        "name": "Ручка серебро",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Status",
        "image": "/images/products/auto/status-ruchka-serebro-hrom-2030.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2031,
        "name": "Ручка (1)",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Status",
        "image": "/images/products/auto/status-ruchka-1-hrom-2031.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2032,
        "name": "Ручка Французское золото",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-frantsuzskoe-zoloto-zoloto-2032.jpg",
        "colors": [
            "Золото"
        ],
        "inStock": true
    },
    {
        "id": 2033,
        "name": "Ручка ХРОМ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-hrom-hrom-2033.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2034,
        "name": "Ручка ЧЕРНЫЕ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-chernye-chernyj-2034.jpg",
        "colors": [
            "Черный"
        ],
        "inStock": true
    },
    {
        "id": 2035,
        "name": "Ручка ЧЕРНЫЕ",
        "category": "door_handles",
        "subcategory": "rosette_handles",
        "brand": "Status",
        "image": "/images/products/auto/status-ruchka-chernye-chernyj-2035.jpg",
        "colors": [
            "Черный"
        ],
        "inStock": true
    },
    {
        "id": 2036,
        "name": "Ручка Ручки скобы",
        "category": "door_handles",
        "subcategory": "pull_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-ruchka-ruchki-skoby-hrom-2036.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2037,
        "name": "СЕРДЕЦЕВИНЫ",
        "category": "locks_and_security",
        "subcategory": "cylinders",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-serdetseviny-hrom-2037.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2038,
        "name": "Ручка СКОБЫ ДЛЯ ДВЕРНЫХ РУЧЕК",
        "category": "door_handles",
        "subcategory": "pull_handles",
        "brand": "Apollo",
        "image": "/images/products/auto/2038_H-075 FG.JPG",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2039,
        "name": "DIAMOND",
        "category": "door_hinges",
        "subcategory": "hidden_hinges",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-diamond-hrom-2039.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2040,
        "name": "секрет петли",
        "category": "door_hinges",
        "subcategory": "hidden_hinges",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-sekret-petli-hrom-2040.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2041,
        "name": "СТИРАЛКА",
        "category": "door_fittings",
        "subcategory": "door_stops",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-stiralka-hrom-2041.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2042,
        "name": "СТОППЕР",
        "category": "door_fittings",
        "subcategory": "door_stops",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-stopper-hrom-2042.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2043,
        "name": "СТОППЕРЫ АПОЛЛО",
        "category": "door_fittings",
        "subcategory": "door_stops",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-stoppery-apollo-hrom-2043.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2044,
        "name": "ШПИНГАЛЕТ",
        "category": "door_fittings",
        "subcategory": "door_stops",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-shpingalet-hrom-2044.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2045,
        "name": "РОЛИКОВЫЙ ФИКСАТОР",
        "category": "door_fittings",
        "subcategory": "wc_and_escutcheons",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-rolikovyj-fiksator-hrom-2045.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2046,
        "name": "Шариковый фиксатор",
        "category": "door_fittings",
        "subcategory": "wc_and_escutcheons",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-sharikovyj-fiksator-hrom-2046.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    },
    {
        "id": 2047,
        "name": "ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ",
        "category": "locks_and_security",
        "subcategory": "smart_locks",
        "brand": "Apollo",
        "image": "/images/products/auto/apollo-elektronnye-dvernye-zamki-hrom-2047.jpg",
        "colors": [
            "Хром"
        ],
        "inStock": true
    }
];
