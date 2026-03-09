import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Eye, MessageCircle, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

// Популярные товары (берем из реальных категорий)
const bestsellers = [
  {
    id: 1,
    name: 'Ручка Apollo CY-03S',
    category: 'APOLLO',
    image: '/images/products/РУЧКИ/APOLLO/ЗОЛОТО apollo/IMG_0211.JPG',
    badge: 'Бестселлер',
    badgeColor: 'bg-door-accent',
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Ручка Apollo Diamond',
    category: 'APOLLO',
    image: '/images/products/РУЧКИ/APOLLO/ЗОЛОТО apollo/IMG_0204.JPG',
    badge: 'Премиум',
    badgeColor: 'bg-amber-500',
    rating: 5.0,
    reviews: 86,
  },
  {
    id: 3,
    name: 'Статус H-075 FG',
    category: 'Статус',
    image: '/images/products/РУЧКИ/Статус/Золото Статус/IMG_0351.JPG',
    badge: 'Акция',
    badgeColor: 'bg-red-500',
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 4,
    name: 'Скрытая петля Diamond',
    category: 'Скрытые петли',
    image: '/images/products/СКРЫТАЯ ПЕТЛЯ/DIAMOND APOLLO/IMG_0068.JPG',
    badge: 'Новинка',
    badgeColor: 'bg-green-500',
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 5,
    name: 'Магнитный замок CX',
    category: 'Дверные механизмы',
    image: '/images/products/ДВЕРНЫЕ МЕХАНИЗМЫ/МАГНИТНЫЙ ВРЕЗНОЙ ЗАМОК/CX/IMG_0070.JPG',
    badge: 'Хит',
    badgeColor: 'bg-door-accent',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 6,
    name: 'Электронный замок Smart',
    category: 'Электронные замки',
    image: '/images/products/ЭЛЕКТРОННЫЕ ДВЕРНЫЕ ЗАМКИ/IMG_4253.JPG',
    badge: 'Smart',
    badgeColor: 'bg-purple-500',
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 7,
    name: 'Цилиндр Apollo Premium',
    category: 'Цилиндры',
    image: '/images/products/СЕРДЕЦЕВИНЫ/IMG_4883.JPG',
    badge: null,
    badgeColor: '',
    rating: 4.9,
    reviews: 94,
  },
  {
    id: 8,
    name: 'Доводчик D-45',
    category: 'Доводчики',
    image: '/images/products/ДОВОДЧИКИ ДВЕРНЫЕ/IMG_0373.JPG',
    badge: 'Акция',
    badgeColor: 'bg-red-500',
    rating: 4.6,
    reviews: 312,
  },
];

// Lightbox компонент
const Lightbox = ({ 
  image, 
  title,
  onClose 
}: { 
  image: string; 
  title: string;
  onClose: () => void;
}) => {
  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  });

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <div 
        className="max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image} 
          alt={title}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <p className="text-center mt-4 text-white/80 text-lg">{title}</p>
      </div>
    </div>
  );
};

const Bestsellers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  useGSAP(() => {
    // Анимация появления карточек
    gsap.fromTo('.bestseller-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="bestsellers" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-door-accent font-medium tracking-wide uppercase text-sm mb-2 block">
              Топ продаж
            </span>
            <h2 className="font-display text-4xl font-bold text-door-black">
              Популярные товары
            </h2>
            <p className="text-door-medium mt-2 max-w-lg">
              Самые продаваемые модели этого месяца. Проверено тысячами клиентов.
            </p>
          </div>
          <Link 
            to="/catalog"
            className="group inline-flex items-center gap-2 text-door-black font-semibold hover:text-door-accent transition-colors"
          >
            Все товары
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <div 
              key={product.id}
              className="bestseller-card group relative bg-door-light rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/products/catalog-hero.jpg';
                  }}
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                    {product.badge}
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedImage(product.image);
                      setSelectedTitle(product.name);
                      setLightboxOpen(true);
                    }}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-door-accent hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-door-medium uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="font-display font-bold text-lg text-door-black mb-2 group-hover:text-door-accent transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-door-medium">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Order Button */}
                <a
                  href={`https://wa.me/77074209510?text=Здравствуйте! Интересует товар: ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Заказать
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-door-black text-white rounded-full font-medium hover:bg-door-dark transition-all duration-300 shadow-card hover:shadow-elevated"
          >
            Смотреть все {bestsellers.length}+ товаров
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          image={selectedImage}
          title={selectedTitle}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};

export default Bestsellers;
