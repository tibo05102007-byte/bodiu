import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Filter, ChevronDown, Grid3X3, LayoutList, ShoppingCart, Heart, Share2, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
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
    id: 'handles',
    name: 'Ручки',
    description: 'Основной элемент дизайна. Аллюминиевые и цинковые решения.',
    bannerImage: '/images/products/alfa-black.jpg',
    subcategories: [
      { id: 'aluminum', name: 'Аллюминиевые' },
      { id: 'zinc', name: 'Цинковые' }
    ]
  },
  {
    id: 'mechanisms',
    name: 'Дверные механизмы',
    description: 'Надежные механизмы для любых типов дверей.',
    bannerImage: '/images/products/mechanism-magnetic.jpg',
    subcategories: [
      { id: 'magnetic', name: 'Магнитные' },
      { id: 'plastic', name: 'Пластиковые' },
      { id: 'metal', name: 'Металлические' }
    ]
  },
  {
    id: 'cylinders',
    name: 'Цилиндровые механизмы',
    description: 'Высокая секретность и защита.',
    bannerImage: '/images/products/cylinder.png',
  },
  {
    id: 'latches',
    name: 'Защёлки',
    description: 'Плавное и тихое закрывание.',
    bannerImage: '/images/products/latch.jpg',
  },
  {
    id: 'bolts',
    name: 'Задвижки',
    description: 'Дополнительная безопасность.',
    bannerImage: '/images/products/deadbolt.jpg',
  },
  {
    id: 'hinges',
    name: 'Петли',
    description: 'Долговечность и плавный ход.',
    bannerImage: '/images/products/hinge-overlay.jpg',
    subcategories: [
      { id: 'overlay', name: 'Накладные' },
      { id: 'mortise', name: 'Врезные' }
    ]
  },
  {
    id: 'escutcheons',
    name: 'Накладки цилиндровые',
    description: 'Декоративное оформление скважин.',
    bannerImage: '/images/products/escutcheon.jpg',
  },
  {
    id: 'wc_kits',
    name: 'WC комплекты',
    description: 'Удобные фиксаторы для санузлов.',
    bannerImage: '/images/products/wc-kit.jpg',
  },
  {
    id: 'plate_locks',
    name: 'Замки на планке',
    description: 'Классические решения для массивных дверей.',
    bannerImage: '/images/products/mechanism-magnetic.jpg',
  },
  {
    id: 'door_stops',
    name: 'Упоры дверные',
    description: 'Защита стен и дверных полотен.',
    bannerImage: '/images/products/door-stop.jpg',
  },
  {
    id: 'sliding_systems',
    name: 'Раздвижные системы',
    description: 'Экономия пространства и современный стиль.',
    bannerImage: '/images/products/terra-sn.jpg',
  },
  {
    id: 'fittings',
    name: 'Фурнитура',
    description: 'Аксессуары и комплектующие.',
    bannerImage: '/images/products/cube-white.jpg',
  }
];

const products: Product[] = [
  // --- РУЧКИ (Handles) ---
  // Aluminum (~5k - 8k KZT)
  { id: 101, name: 'Axe Aluminum Black', category: 'handles', subcategory: 'aluminum', price: 7450, image: '/images/products/handle-aluminum-axe.jpg', colors: ['#000000'], inStock: true },
  { id: 102, name: 'Blade Aluminum Satin', category: 'handles', subcategory: 'aluminum', price: 7950, image: '/images/products/handle-aluminum-blade.jpg', colors: ['#c0c0c0'], inStock: true, isBestseller: true },

  // Zinc (~9k - 18k KZT)
  { id: 103, name: 'Alfa Zinc Black', category: 'handles', subcategory: 'zinc', price: 9450, image: '/images/products/alfa-black.jpg', colors: ['#000000'], inStock: true, isNew: true },
  { id: 104, name: 'Classic Zinc Antique', category: 'handles', subcategory: 'zinc', price: 13950, image: '/images/products/classic-ab.jpg', colors: ['#8b7355'], inStock: true },
  { id: 105, name: 'Cube Zinc White', category: 'handles', subcategory: 'zinc', price: 9950, image: '/images/products/cube-white.jpg', colors: ['#ffffff'], inStock: true },
  { id: 106, name: 'Elita Zinc Bronze', category: 'handles', subcategory: 'zinc', price: 17450, image: '/images/products/elita-br.jpg', colors: ['#cd7f32'], inStock: true },
  { id: 107, name: 'Fina Zinc Gold', category: 'handles', subcategory: 'zinc', price: 15950, image: '/images/products/fina-ab.jpg', colors: ['#d4af37'], inStock: true },
  { id: 108, name: 'Modena Zinc Black', category: 'handles', subcategory: 'zinc', price: 11450, image: '/images/products/modena-black.jpg', colors: ['#000000'], inStock: true },

  // --- ДВЕРНЫЕ МЕХАНИЗМЫ ---
  // Magnetic
  { id: 201, name: 'Магнитный замок Silent M', category: 'mechanisms', subcategory: 'magnetic', price: 2750, image: '/images/products/mechanism-magnetic.jpg', colors: ['#1a1a1a'], inStock: true, description: 'Бесшумный магнитный язычок.' },

  // Metal
  { id: 202, name: 'Механизм металлический 100', category: 'mechanisms', subcategory: 'metal', price: 1750, image: '/images/products/mechanism-metal.png', colors: ['#c0c0c0'], inStock: true },

  // Plastic (Placeholder)
  { id: 203, name: 'Механизм композитный', category: 'mechanisms', subcategory: 'plastic', price: 1250, image: '/images/products/mechanism-magnetic.jpg', colors: ['#ffffff'], inStock: true },

  // --- ЦИЛИНДРОВЫЕ МЕХАНИЗМЫ ---
  { id: 301, name: 'Цилиндр 60мм Никель', category: 'cylinders', price: 2000, image: '/images/products/cylinder.png', colors: ['#c0c0c0'], inStock: true },
  { id: 302, name: 'Цилиндр 70мм Ключ/Вертушка', category: 'cylinders', price: 2750, image: '/images/products/cylinder.png', colors: ['#d4af37'], inStock: true },

  // --- ЗАЩЕЛКИ ---
  { id: 401, name: 'Защелка 45мм', category: 'latches', price: 750, image: '/images/products/latch.jpg', colors: ['#c0c0c0'], inStock: true },

  // --- ЗАДВИЖКИ ---
  { id: 451, name: 'Задвижка ригель', category: 'bolts', price: 1250, image: '/images/products/deadbolt.jpg', colors: ['#8b4513'], inStock: true },

  // --- ПЕТЛИ ---
  // Overlay
  { id: 501, name: 'Петля бабочка 100мм', category: 'hinges', subcategory: 'overlay', price: 600, image: '/images/products/hinge-overlay.jpg', colors: ['#c0c0c0'], inStock: true },

  // Mortise
  { id: 502, name: 'Петля врезная подшипник', category: 'hinges', subcategory: 'mortise', price: 900, image: '/images/products/hinge-overlay.jpg', colors: ['#d4af37'], inStock: true },

  // --- НАКЛАДКИ ЦИЛИНДРОВЫЕ ---
  { id: 601, name: 'Накладка квадратная', category: 'escutcheons', price: 1000, image: '/images/products/escutcheon.jpg', colors: ['#c0c0c0'], inStock: true },

  // --- WC КОМПЛЕКТЫ ---
  { id: 701, name: 'WC фиксатор Квадрат', category: 'wc_kits', price: 2250, image: '/images/products/wc-kit.jpg', colors: ['#000000'], inStock: true },

  // --- ЗАМКИ НА ПЛАНКЕ ---
  { id: 801, name: 'Замок на планке Classic', category: 'plate_locks', price: 4500, image: '/images/products/mechanism-magnetic.jpg', colors: ['#d4af37'], inStock: true },

  // --- УПОРЫ ДВЕРНЫЕ ---
  { id: 901, name: 'Упор дверной напольный', category: 'door_stops', price: 600, image: '/images/products/door-stop.jpg', colors: ['#c0c0c0'], inStock: true },

  // --- РАЗДВИЖНЫЕ СИСТЕМЫ ---
  { id: 1001, name: 'Комплект раздвижной', category: 'sliding_systems', price: 15450, image: '/images/products/terra-sn.jpg', colors: ['#c0c0c0'], inStock: true },

  // --- ФУРНИТУРА ---
  { id: 1101, name: 'Шаблон для врезки', category: 'fittings', price: 5000, image: '/images/products/cube-white.jpg', colors: ['orange'], inStock: true }
];

const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('handles');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSubCategory(null);
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

  const filteredProducts = products.filter(p => {
    if (p.category !== activeCategory) return false;
    if (activeSubCategory && p.subcategory !== activeSubCategory) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
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
              <div className="w-10 h-10 bg-door-black rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-tight text-door-black">
                DOORHANDLES
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sm font-medium text-door-dark hover:text-door-black">Главная</a>
              <button className="text-sm font-medium text-door-black">Каталог</button>
              <a href="/#about" className="text-sm font-medium text-door-dark hover:text-door-black">О нас</a>
              <a href="/#contact" className="text-sm font-medium text-door-dark hover:text-door-black">Контакты</a>
            </nav>
            <button className="relative p-2 hover:bg-door-light rounded-full">
              <ShoppingCart className="w-5 h-5 text-door-dark" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-door-black text-white text-xs font-medium rounded-full flex items-center justify-center">
                {products.length}
              </span>
            </button>
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

      {/* Products Grid */}
      <section ref={productsRef} className="py-12 bg-white min-h-[500px]">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">

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
                <option value="price-asc">Сначала дешевые</option>
                <option value="price-desc">Сначала дороги</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {sortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
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

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold">{product.price} ₸</span>
                      <button className="w-10 h-10 rounded-full bg-door-black text-white flex items-center justify-center hover:bg-door-accent transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-400">В этой категории пока нет товаров</p>
              <button onClick={() => { setActiveSubCategory(null) }} className="mt-4 text-door-accent hover:underline">
                Сбросить фильтры
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-door-black text-white py-12 border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-door-black font-bold">D</div>
              <span className="font-bold text-lg">DOORHANDLES</span>
            </div>
            <p className="text-white/50 text-sm">© 2025 Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
