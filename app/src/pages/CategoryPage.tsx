import { useEffect, useRef, useState } from 'react';
import { Grid3X3, LayoutList } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ApolloLogo from '../components/ApolloLogo';

gsap.registerPlugin(ScrollTrigger);

interface Product {
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
}

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  subcategories?: SubCategory[];
}

const categories: Category[] = [
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

const products: Product[] = [
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

const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('door_handles');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  // Filters State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSubCategory(null);
    setSelectedBrands([]);
    setSelectedColors([]);
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-pill',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const currentCategoryData = categories.find(c => c.id === activeCategory);

  // Collect available filters for current category
  const availableBrands = Array.from(new Set(products.filter(p => p.category === activeCategory).map(p => p.brand)));
  const availableColors = Array.from(new Set(products.filter(p => p.category === activeCategory).flatMap(p => p.colors)));

  const filteredProducts = products.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeSubCategory && p.subcategory !== activeSubCategory) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (selectedColors.length > 0 && !p.colors.some(c => selectedColors.includes(c))) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0;
    }
  });

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-door-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <ApolloLogo className="h-8 w-auto text-door-black hover:text-door-accent transition-colors" />
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-door-dark hover:text-door-black">Главная</a>
              <button className="text-sm font-medium text-door-black">Каталог</button>
              <a href="/#about" className="text-sm font-medium text-door-dark hover:text-door-black">Наша история</a>
              <a href="/#contact" className="text-sm font-medium text-door-dark hover:text-door-black">Контакты</a>
            </nav>

          </div>
        </div>
      </header>

      {/* Banner - WELCOME IMAGE FIXED */}
      <section className="relative h-[300px] lg:h-[400px] overflow-hidden bg-door-black">
        <div className="absolute inset-0 opacity-100">
          <img
            src="/images/catalog-hero.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-door-black via-transparent to-transparent opacity-80" />

        <div className="relative h-full flex flex-col justify-end pb-12 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
            {currentCategoryData?.name}
          </h1>
          <p className="text-white/80 max-w-xl text-lg">
            {currentCategoryData?.description}
          </p>
        </div>
      </section>

      {/* Categories Filter (12 Items) */}
      <section className="sticky top-[73px] z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm py-4">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 sm:gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setViewMode('grid'); scrollToProducts(); }}
                className={`
                           category-pill px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                           ${activeCategory === cat.id
                    ? 'bg-door-black text-white shadow-md scale-105'
                    : 'bg-door-light text-door-dark hover:bg-gray-200'}
                        `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        {currentCategoryData?.subcategories && (
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mt-4 border-t border-gray-100 pt-3">
            <div className="flex gap-3 items-center text-sm">
              <span className="text-door-medium mr-2">Фильтр:</span>
              <button
                onClick={() => setActiveSubCategory(null)}
                className={`px-3 py-1 rounded-md transition-colors ${activeSubCategory === null ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
              >
                Все
              </button>
              {currentCategoryData.subcategories.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubCategory(sub.id)}
                  className={`px-3 py-1 rounded-md transition-colors ${activeSubCategory === sub.id ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Content Area */}
      <section ref={productsRef} className="py-12 bg-white min-h-[500px]">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
              {/* Brands Filter */}
              {availableBrands.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-lg mb-4 text-door-black border-b border-gray-100 pb-2">Бренд</h3>
                  <div className="flex flex-col gap-3">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 group-hover:border-door-accent transition-colors">
                          <input
                            type="checkbox"
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                            checked={selectedBrands.includes(brand)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBrands(prev => [...prev, brand]);
                              } else {
                                setSelectedBrands(prev => prev.filter(b => b !== brand));
                              }
                            }}
                          />
                          {selectedBrands.includes(brand) && (
                            <div className="w-3 h-3 bg-door-accent rounded-sm" />
                          )}
                        </div>
                        <span className="text-sm text-door-dark group-hover:text-door-black transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Filter */}
              {availableColors.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-lg mb-4 text-door-black border-b border-gray-100 pb-2">Цвет</h3>
                  <div className="flex flex-col gap-3">
                    {availableColors.map(color => (
                      <label key={color} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 group-hover:border-door-accent transition-colors">
                          <input
                            type="checkbox"
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                            checked={selectedColors.includes(color)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedColors(prev => [...prev, color]);
                              } else {
                                setSelectedColors(prev => prev.filter(c => c !== color));
                              }
                            }}
                          />
                          {selectedColors.includes(color) && (
                            <div className="w-3 h-3 bg-door-accent rounded-sm" />
                          )}
                        </div>
                        <span className="text-sm text-door-dark group-hover:text-door-black transition-colors">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Products Grid Content */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-door-medium">
                  Найдено: {sortedProducts.length}
                </span>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}><Grid3X3 className="w-4 h-4" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}><LayoutList className="w-4 h-4" /></button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-100 border-none rounded-lg text-sm px-3 py-2 cursor-pointer focus:ring-0"
                  >
                    <option value="popular">Популярные</option>
                    <option value="newest">Новинки</option>
                  </select>
                </div>
              </div>

              {/* Grid */}
              {sortedProducts.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`group relative bg-door-light rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${viewMode === 'list' ? 'flex gap-6 items-center' : ''
                        }`}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Image */}
                      <div className={`relative overflow-hidden bg-white p-6 ${viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'aspect-[4/5]'
                        }`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full object-contain transition-all duration-700 ${hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                            }`}
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && <span className="px-2 py-1 bg-door-accent text-white text-[10px] font-bold uppercase rounded">New</span>}
                          {product.isBestseller && <span className="px-2 py-1 bg-door-black text-white text-[10px] font-bold uppercase rounded">Hit</span>}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-1">
                        <div className="text-xs text-door-medium uppercase tracking-wider mb-1">
                          {categories.find(c => c.id === product.category)?.name}
                          {product.subcategory && ` / ${categories.find(c => c.id === product.category)?.subcategories?.find(s => s.id === product.subcategory)?.name}`}
                        </div>
                        <h3 className="font-display font-bold text-lg text-door-black mb-2">{product.name}</h3>
                        {product.description && viewMode === 'list' && <p className="text-sm text-gray-500 mb-4">{product.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-xl text-gray-400">В этой категории пока нет товаров</p>
                  <button onClick={() => { setActiveSubCategory(null); setSelectedBrands([]); setSelectedColors([]); }} className="mt-4 text-door-accent hover:underline">
                    Сбросить фильтры
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-door-black text-white py-12 border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <ApolloLogo className="h-6 w-auto text-white" />
            </div>
            <p className="text-white/50 text-sm">© 2025 Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
