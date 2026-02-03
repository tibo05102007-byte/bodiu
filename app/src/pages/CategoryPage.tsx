import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Filter, ChevronDown, Grid3X3, LayoutList, ShoppingCart, Heart, Share2 } from 'lucide-react';
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
  colors: string[];
  material?: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  productCount: number;
}

// Здесь будут твои категории - пока placeholder
const categories: Category[] = [
  {
    id: 'ruchki',
    name: 'Дверные ручки',
    description: 'Премиальные дверные ручки из латуни, нержавеющей стали и алюминия',
    bannerImage: '/images/hero-handle.jpg',
    productCount: 0,
  },
  {
    id: 'zashchelki',
    name: 'Защелки',
    description: 'Надежные защелки для межкомнатных дверей',
    bannerImage: '/images/black-brass-handle.jpg',
    productCount: 0,
  },
  {
    id: 'zadvizhki',
    name: 'Задвижки',
    description: 'Задвижки различных размеров и конфигураций',
    bannerImage: '/images/premium-handle.jpg',
    productCount: 0,
  },
  {
    id: 'petli',
    name: 'Петли',
    description: 'Петли для дверей любого веса и размера',
    bannerImage: '/images/brass-handle.jpg',
    productCount: 0,
  },
  {
    id: 'nakladki',
    name: 'Накладки цилиндровые',
    description: 'Декоративные накладки для цилиндров',
    bannerImage: '/images/luxury-handle.jpg',
    productCount: 0,
  },
  {
    id: 'wc',
    name: 'WC комплекты',
    description: 'Комплекты для санузлов',
    bannerImage: '/images/designer-handle.jpg',
    productCount: 0,
  },
  {
    id: 'upory',
    name: 'Упоры дверные',
    description: 'Упоры для защиты стен и дверей',
    bannerImage: '/images/minimalist-handle.png',
    productCount: 0,
  },
  {
    id: 'razdvizhnye',
    name: 'Раздвижные системы',
    description: 'Системы для раздвижных дверей',
    bannerImage: '/images/modern-minimalist.jpg',
    productCount: 0,
  },
];

// Здесь будут твои товары - пока placeholder
const products: Product[] = [
  // Товары будут добавлены по мере получения данных
];

const CategoryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.category-banner',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.category-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.categories-grid',
            start: 'top 85%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
              <a href="#products" className="text-sm font-medium text-door-black">Каталог</a>
              <a href="#about" className="text-sm font-medium text-door-dark hover:text-door-black">О нас</a>
              <a href="#contact" className="text-sm font-medium text-door-dark hover:text-door-black">Контакты</a>
            </nav>
            <button className="relative p-2 hover:bg-door-light rounded-full">
              <ShoppingCart className="w-5 h-5 text-door-dark" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-door-black text-white text-xs font-medium rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="category-banner relative h-[400px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-handle.jpg" 
            alt="Каталог" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-door-black/80 via-door-black/50 to-transparent" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
            <div className="max-w-2xl">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                На главную
              </a>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Каталог
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Выберите категорию дверной фурнитуры или просмотрите все товары
              </p>
              <button 
                onClick={scrollToProducts}
                className="px-8 py-4 bg-white text-door-black font-medium rounded-full hover:bg-door-light transition-colors"
              >
                Смотреть товары
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24 bg-door-light">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-door-black mb-8">
            Категории
          </h2>
          <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setActiveCategory(category.id);
                  scrollToProducts();
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.bannerImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-door-black group-hover:text-door-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-door-medium mt-1 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-door-accent mt-3">
                    {category.productCount} товаров
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-door-border">
            <div className="flex items-center gap-4">
              <h2 className="font-display text-2xl font-bold text-door-black">
                {activeCategory === 'all' ? 'Все товары' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="text-door-medium">
                ({sortedProducts.length} товаров)
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-door-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 bg-door-light rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-door-accent"
                >
                  <option value="popular">По популярности</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="newest">Сначала новые</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-door-light rounded-lg hover:bg-door-border transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Фильтры</span>
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          {sortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group relative bg-door-light rounded-2xl overflow-hidden transition-all duration-300 ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-white ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[4/5]'
                  }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-door-accent text-white text-xs font-medium rounded-full">
                          Новинка
                        </span>
                      )}
                      {product.isSale && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          Скидка
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="px-2 py-1 bg-door-black text-white text-xs font-medium rounded-full">
                          Хит
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${
                      hoveredProduct === product.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-4'
                    }`}>
                      <button className="p-2 bg-white rounded-full shadow-card hover:bg-door-black hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-card hover:bg-door-black hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1">
                    <span className="text-xs text-door-medium uppercase tracking-wider">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    <h3 className="font-display font-semibold text-door-black mt-1 mb-2 group-hover:text-door-accent transition-colors">
                      {product.name}
                    </h3>
                    
                    {product.description && viewMode === 'list' && (
                      <p className="text-sm text-door-medium mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Colors */}
                    <div className="flex items-center gap-1 mb-3">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xl text-door-black">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-door-medium line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>
                      <button className="p-3 bg-door-black text-white rounded-full hover:bg-door-accent transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>

                    {!product.inStock && (
                      <span className="text-sm text-red-500 mt-2 block">
                        Нет в наличии
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-door-light rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-door-medium" />
              </div>
              <h3 className="font-display text-xl font-semibold text-door-black mb-2">
                Товары скоро появятся
              </h3>
              <p className="text-door-medium max-w-md mx-auto mb-6">
                Мы готовим для вас лучшие предложения. Загляните позже или свяжитесь с нами для консультации.
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-door-black text-white rounded-full hover:bg-door-dark transition-colors"
              >
                Связаться с нами
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-door-black text-white py-12">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-door-black font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display font-semibold text-lg">DOORHANDLES</span>
            </div>
            <p className="text-white/60 text-sm">
              © 2025 DOORHANDLES. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <a href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                Главная
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
