import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';


// Импорт сгенерированного каталога
import catalogData from '@/data/products-catalog.json';

interface Category {
  id: string;
  name: string;
  image: string;
  count: string;
  icon: string;
  totalImages: number;
}

// Функция для получения оптимального превью изображения
function getOptimalPreview(category: typeof catalogData.categories[0]): string {
  // Если есть превью из каталога, используем его
  if (category.previewImage) {
    return category.previewImage;
  }
  
  // Иначе ищем первое доступное изображение
  if (category.allImages && category.allImages.length > 0) {
    // Берём изображение из середины списка (обычно там более качественные фото)
    const midIndex = Math.floor(category.allImages.length / 2);
    return category.allImages[midIndex];
  }
  
  // Fallback на заглушку
  return '/images/products/catalog-hero.jpg';
}

const Products = () => {
  // Генерируем категории из данных каталога
  const categories: Category[] = useMemo(() => {
    return catalogData.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      image: getOptimalPreview(cat),
      count: cat.description || `${cat.totalImages} моделей`,
      icon: cat.icon,
      totalImages: cat.totalImages
    }));
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      id="products"
      className="relative w-full py-20 bg-door-light overflow-hidden flex flex-col justify-center"
    >
      {/* Background Watermark */}
      <div className="absolute top-10 left-0 w-full pointer-events-none opacity-5">
        <h2 className="text-[15vw] font-display font-bold leading-none text-door-dark whitespace-nowrap pl-10">
          КАТАЛОГ
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-12 z-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-door-accent font-medium tracking-wide uppercase text-sm">
              Продукция
            </span>
            <h3 className="font-display text-4xl font-bold text-door-black">
              Категории
            </h3>
            <p className="text-door-medium mt-2">
              {catalogData.totalCategories} категорий • {catalogData.totalImages} товаров
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-door-dark/20 hover:bg-door-dark hover:text-white transition-all"
              onClick={scrollPrev}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12 border-door-dark/20 hover:bg-door-dark hover:text-white transition-all"
              onClick={scrollNext}
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-4 sm:px-6 lg:px-12 xl:px-20 select-none touch-pan-y">
          {categories.map((cat) => (
            <div key={cat.id} className="flex-[0_0_280px] sm:flex-[0_0_320px] min-w-0">
              <Link
                to={`/catalog/${cat.id}`}
                className="relative w-full aspect-[3/4] group block"
              >
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-500 group-hover:shadow-elevated group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="h-2/3 w-full bg-gray-50 relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback если изображение не загрузилось
                        (e.target as HTMLImageElement).src = '/images/products/catalog-hero.jpg';
                      }}
                    />
                    {/* Overlay с количеством фото */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-door-dark">
                      {cat.totalImages} фото
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="h-1/3 p-6 flex flex-col justify-center relative bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <h4 className="font-display font-bold text-xl text-door-black group-hover:text-door-accent transition-colors">
                        {cat.name}
                      </h4>
                    </div>
                    <p className="text-sm text-door-medium line-clamp-2">{cat.count}</p>

                    <div className="absolute bottom-6 right-6 w-10 h-10 bg-door-light rounded-full flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-door-black" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mt-12 z-10">
        <div className="flex justify-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-door-dark text-white rounded-full font-medium hover:bg-door-black transition-colors"
          >
            Смотреть весь каталог
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
