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
        "image": "/images/products/auto/2000_IMG_2819.JPG",
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
        "image": "/images/products/auto/2001_IMG_5139.JPG",
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
        "image": "/images/products/auto/2002_IMG_1361 — копия.JPG",
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
        "image": "/images/products/auto/2003_IMG_7840.JPG",
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
        "image": "/images/products/auto/2004_IMG_6540.JPG",
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
        "image": "/images/products/auto/2005_IMG_0070.JPG",
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
        "image": "/images/products/auto/2006_IMG_0311.JPG",
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
        "image": "/images/products/auto/2007_IMG_0072.JPG",
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
        "image": "/images/products/auto/2008_IMG_0908.JPG",
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
        "image": "/images/products/auto/2009_IMG_0366.JPG",
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
        "image": "/images/products/auto/2010_IMG_0373.JPG",
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
        "image": "/images/products/auto/2011_IMG_4348.JPG",
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
        "image": "/images/products/auto/2012_D-45 MSN.JPG",
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
        "image": "/images/products/auto/2013_IMG_4237.JPG",
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
        "image": "/images/products/auto/2014_IMG_4350.JPG",
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
        "image": "/images/products/auto/2016_IMG_1372.JPG",
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
        "image": "/images/products/auto/2017_2025-07-14 17-50-35 (1).JPEG",
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
        "image": "/images/products/auto/2018_IMG_4853.JPG",
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
        "image": "/images/products/auto/2019_IMG_7004.JPG",
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
        "image": "/images/products/auto/2020_2025-07-14 18-17-27 (1).JPEG",
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
        "image": "/images/products/auto/2021_IMG_1752.PNG",
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
        "image": "/images/products/auto/2022_IMG_0906.JPG",
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
        "image": "/images/products/auto/2023_IMG_1239.JPG",
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
        "image": "/images/products/auto/2024_IMG_1668.JPG",
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
        "image": "/images/products/auto/2025_IMG_0204.JPG",
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
        "image": "/images/products/auto/2026_IMG_0351.JPG",
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
        "image": "/images/products/auto/2027_IMG_3752.JPG",
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
        "image": "/images/products/auto/2028_IMG_0202.JPG",
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
        "image": "/images/products/auto/2029_IMG_0203.JPG",
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
        "image": "/images/products/auto/2030_IMG_0360.JPG",
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
        "image": "/images/products/auto/2031_Alba Mbn.JPG",
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
        "image": "/images/products/auto/2032_IMG_0205.JPG",
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
        "image": "/images/products/auto/2033_IMG_1661.JPG",
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
        "image": "/images/products/auto/2034_IMG_0210.JPG",
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
        "image": "/images/products/auto/2035_IMG_0313.JPG",
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
        "image": "/images/products/auto/2036_H-075 FG.JPG",
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
        "image": "/images/products/auto/2037_IMG_4883.JPG",
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
        "image": "/images/products/auto/2039_IMG_0068.JPG",
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
        "image": "/images/products/auto/2040_IMG_7706.JPG",
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
        "image": "/images/products/auto/2041_IMG_2762.JPG",
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
        "image": "/images/products/auto/2042_IMG_2014.JPG",
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
        "image": "/images/products/auto/2043_DOOR STOP BLACK.JPG",
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
        "image": "/images/products/auto/2044_IMG_1367.JPG",
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
        "image": "/images/products/auto/2045_IMG_3592.JPG",
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
        "image": "/images/products/auto/2046_IMG_1374.JPG",
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
        "image": "/images/products/auto/2047_IMG_4253.JPG",
        "colors": [
            "Хром"
        ],
        "inStock": true
    }
];
