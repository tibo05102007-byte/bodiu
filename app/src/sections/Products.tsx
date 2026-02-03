import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Nordic Minimal',
    price: 189,
    image: '/images/minimalist-handle.png',
    category: 'Современные',
    colors: ['#1a1a1a', '#c0c0c0', '#d4af37'],
    isNew: true,
  },
  {
    id: 2,
    name: 'Premium Brass',
    price: 249,
    image: '/images/brass-handle.jpg',
    category: 'Классические',
    colors: ['#d4af37', '#8b7355', '#1a1a1a'],
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Matte Black Pro',
    price: 159,
    image: '/images/premium-handle.jpg',
    category: 'Индустриальные',
    colors: ['#1a1a1a', '#666666', '#ffffff'],
    isBestseller: true,
  },
  {
    id: 4,
    name: 'Scandinavian Touch',
    price: 199,
    image: '/images/scandinavian-handle.jpg',
    category: 'Скандинавские',
    colors: ['#c0c0c0', '#1a1a1a', '#f5f5f5'],
  },
  {
    id: 5,
    name: 'Luxury Gold',
    price: 349,
    image: '/images/luxury-handle.jpg',
    category: 'Премиум',
    colors: ['#d4af37', '#1a1a1a', '#ffffff'],
    isNew: true,
  },
  {
    id: 6,
    name: 'Smart Touch',
    price: 449,
    image: '/images/smart-handle.jpg',
    category: 'Умные',
    colors: ['#1a1a1a', '#4a90e2', '#c0c0c0'],
    isNew: true,
  },
  {
    id: 7,
    name: 'Designer Elite',
    price: 279,
    image: '/images/designer-handle.jpg',
    category: 'Дизайнерские',
    colors: ['#1a1a1a', '#d4af37', '#c0c0c0'],
  },
  {
    id: 8,
    name: 'Modern Classic',
    price: 219,
    image: '/images/modern-minimalist.jpg',
    category: 'Современные',
    colors: ['#666666', '#1a1a1a', '#ffffff'],
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const categories = ['Все', 'Современные', 'Классические', 'Индустриальные', 'Скандинавские', 'Премиум', 'Умные', 'Дизайнерские'];

  const filteredProducts = activeFilter === 'Все'
    ? products
    : products.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.product-card-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-door-light/50 whitespace-nowrap select-none">
          DOORHANDLES
        </div>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="products-heading flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-2 block">
              Наша коллекция
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-door-black tracking-tight">
              Отобрано для <span className="text-door-medium">совершенства</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-door-black text-white'
                    : 'bg-door-light text-door-dark hover:bg-door-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Controls */}
        <div className="hidden lg:flex items-center justify-end gap-2 mb-6">
          <button
            onClick={() => scroll('left')}
            className="p-3 bg-door-light hover:bg-door-border rounded-full transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-door-dark" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 bg-door-black hover:bg-door-dark text-white rounded-full transition-colors duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div
          ref={scrollContainerRef}
          className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto hide-scrollbar pb-4"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card-item group relative bg-door-light rounded-2xl overflow-hidden card-hover"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-door-accent text-white text-xs font-medium rounded-full">
                    Новинка
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 bg-door-black text-white text-xs font-medium rounded-full">
                    Бестселлер
                  </span>
                )}
              </div>

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Quick Add Button */}
                <button
                  className={`absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-card hover:bg-door-black hover:text-white transition-all duration-300 ${
                    hoveredProduct === product.id
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-door-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-display font-semibold text-door-black mt-1 mb-2 group-hover:text-door-accent transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Color Swatches */}
                <div className="flex items-center gap-1 mb-3">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xl text-door-black">
                    ${product.price}
                  </span>
                  <button className="text-sm font-medium text-door-accent hover:text-door-black transition-colors duration-300">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/catalog"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-door-light hover:bg-door-black hover:text-white font-medium rounded-full transition-all duration-300"
          >
            Смотреть все товары
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
