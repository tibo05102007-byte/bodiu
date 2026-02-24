import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: number;
  name: string;
  image: string;
  count?: string;
}

const categories: Category[] = [
  { id: 1, name: 'Ручки', image: '/images/products/alfa-black.jpg', count: '120+ моделей' },
  { id: 2, name: 'Дверные механизмы', image: '/images/products/mechanism-magnetic.jpg', count: 'Магнитные, Пластик, Металл' },
  { id: 3, name: 'Цилиндровые мех.', image: '/images/products/cylinder.png', count: 'Все размеры' },
  { id: 4, name: 'Защёлки', image: '/images/products/latch.jpg', count: 'Надежная фиксация' },
  { id: 5, name: 'Задвижки', image: '/images/products/deadbolt.jpg', count: 'Дополнительная защита' },
  { id: 6, name: 'Петли', image: '/images/products/hinge-overlay.jpg', count: 'Накладные и Врезные' },
  { id: 7, name: 'Накладки', image: '/images/products/escutcheon.jpg', count: 'Декоративные элементы' },
  { id: 8, name: 'WC комплекты', image: '/images/products/wc-kit.jpg', count: 'Для санузлов' },
  { id: 9, name: 'Замки на планке', image: '/images/products/mechanism-magnetic.jpg', count: 'Классика' },
  { id: 10, name: 'Упоры дверные', image: '/images/products/door-stop.jpg', count: 'Защита стен' },
  { id: 11, name: 'Раздвижные системы', image: '/images/products/terra-sn.jpg', count: 'Экономия пространства' },
  { id: 12, name: 'Фурнитура', image: '/images/products/cube-white.jpg', count: 'Аксессуары' },
];

const Products = () => {
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
            <span className="text-door-accent font-medium tracking-wide uppercase text-sm">Продукция</span>
            <h3 className="font-display text-4xl font-bold text-door-black">Категории</h3>
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
                to="/catalog"
                className="relative w-full aspect-[3/4] group block"
              >
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-soft transition-all duration-500 group-hover:shadow-elevated group-hover:-translate-y-2">
                  <div className="h-2/3 w-full p-6 bg-gray-50 flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="h-1/3 p-6 flex flex-col justify-center relative bg-white">
                    <h4 className="font-display font-bold text-xl text-door-black mb-1 group-hover:text-door-accent transition-colors">{cat.name}</h4>
                    <p className="text-sm text-door-medium">{cat.count}</p>

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
    </section>
  );
};

export default Products;
