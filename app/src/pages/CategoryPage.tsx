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
  // --- 1. ДВЕРНЫЕ РУЧКИ ---
  // Ручки на розетке
  { id: 101, name: 'Ручка Ажур Apollo', category: 'door_handles', subcategory: 'rosette_handles', brand: 'Apollo', image: '/images/products/real/azhur.png', colors: ['Бронза'], inStock: true },
  { id: 102, name: 'Apollo Black Series', category: 'door_handles', subcategory: 'rosette_handles', brand: 'Apollo', image: '/images/products/real/apollo_black.jpg', colors: ['Черный'], inStock: true, isBestseller: true },
  { id: 103, name: 'Ручка Status Gold', category: 'door_handles', subcategory: 'rosette_handles', brand: 'Status', image: '/images/products/real/status_gold.jpg', colors: ['Золото'], inStock: true, isNew: true },

  // Ручки-скобы
  { id: 110, name: 'Ручка-скоба H-075 FG', category: 'door_handles', subcategory: 'pull_handles', brand: 'Apollo', image: '/images/products/real/h075.jpg', colors: ['Хром'], inStock: true },

  // --- 2. ДВЕРНЫЕ ПЕТЛИ ---
  { id: 501, name: 'Врезная петля Apollo Premium', category: 'door_hinges', subcategory: 'mortise_hinges', brand: 'Apollo', image: '/images/products/real/hinge_mortise.jpg', colors: ['Хром'], inStock: true },
  { id: 503, name: 'Скрытая петля Diamond', category: 'door_hinges', subcategory: 'hidden_hinges', brand: 'Neon', image: '/images/products/real/diamond.jpg', colors: ['Серебро'], inStock: true },

  // --- 3. ЗАМКИ И БЕЗОПАСНОСТЬ ---
  { id: 201, name: 'Врезной замок Status Secure', category: 'locks_and_security', subcategory: 'mortise_locks', brand: 'Status', image: '/images/products/real/lock_mortise.jpg', colors: ['Сталь'], inStock: true, description: 'Высочайшая надежность и долговечность.' },
  { id: 202, name: 'Магнитный замок CX', category: 'locks_and_security', subcategory: 'mortise_locks', brand: 'Apollo', image: '/images/products/real/cx.jpg', colors: ['Серебро'], inStock: true, description: 'Бесшумный магнитный язычок.' },
  { id: 301, name: 'Цилиндр Apollo Security', category: 'locks_and_security', subcategory: 'cylinders', brand: 'Apollo', image: '/images/products/real/cylinder.jpg', colors: ['Серебро'], inStock: true },
  { id: 1201, name: 'Электронный дверной замок', category: 'locks_and_security', subcategory: 'padlocks', brand: 'Apollo', image: '/images/products/real/smart_lock.jpg', colors: ['Черный'], inStock: true, isNew: true },

  // --- 4. ДВЕРНАЯ ФУРНИТУРА ---
  { id: 401, name: 'Защелка CY-03S', category: 'door_fittings', subcategory: 'latches_and_bolts', brand: 'Apollo', image: '/images/products/real/cy03s.jpg', colors: ['Серебро'], inStock: true },
  { id: 901, name: 'Стоппер Apollo Black', category: 'door_fittings', subcategory: 'door_stops', brand: 'Status', image: '/images/products/real/stop_black.jpg', colors: ['Черный'], inStock: true },

  // --- 5. РАЗДВИЖНЫЕ СИСТЕМЫ ---
  { id: 1001, name: 'Комплект раздвижной', category: 'sliding_systems', brand: 'Neon', image: '/images/products/real/sliding.jpg', colors: ['Серебро'], inStock: true },
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
