import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid3X3, LayoutList, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catalogData from '@/data/products-catalog.json';
import ApolloLogo from '@/components/ApolloLogo';

gsap.registerPlugin(ScrollTrigger);

// Типы
interface GalleryImage {
  src: string;
  alt: string;
  index: number;
}

// Компонент Lightbox для просмотра фото
const Lightbox = ({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: { 
  images: GalleryImage[]; 
  currentIndex: number; 
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button 
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Image */}
      <div className="max-w-[90vw] max-h-[85vh]">
        <img 
          src={currentImage?.src} 
          alt={currentImage?.alt}
          className="max-w-full max-h-[85vh] object-contain"
        />
        <div className="text-center mt-4 text-white/70">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button 
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

// Галерея изображений
const ImageGallery = ({ images, categoryName }: { images: string[]; categoryName: string }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages: GalleryImage[] = useMemo(() => 
    images.map((src, index) => ({
      src,
      alt: `${categoryName} - фото ${index + 1}`,
      index
    })),
    [images, categoryName]
  );

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">В этой категории пока нет фотографий</p>
      </div>
    );
  }

  return (
    <>
      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-door-medium">
          Всего фотографий: <strong>{images.length}</strong>
        </span>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid gap-4 ${
        viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
          : 'grid-cols-1'
      }`}>
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className={`group relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              viewMode === 'list' ? 'flex gap-4 items-center p-4' : 'aspect-square'
            }`}
          >
            <div className={`relative overflow-hidden bg-gray-50 ${
              viewMode === 'list' ? 'w-32 h-32 shrink-0 rounded-lg' : 'w-full h-full'
            }`}>
              <img
                src={img}
                alt={`${categoryName} ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/products/catalog-hero.jpg';
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
            {viewMode === 'list' && (
              <div>
                <p className="font-medium text-door-black">{categoryName}</p>
                <p className="text-sm text-door-medium">Фото {index + 1}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
};

// Главная страница каталога со всеми категориями
const CatalogOverview = ({ onSelectCategory }: { onSelectCategory: (id: string) => void }) => {
  return (
    <div className="py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-door-black mb-4">
          Каталог продукции
        </h1>
        <p className="text-door-medium text-lg">
          {catalogData.totalCategories} категорий • {catalogData.totalImages} фотографий
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {catalogData.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-left"
          >
            {/* Image */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
              {cat.previewImage ? (
                <img
                  src={cat.previewImage}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/products/catalog-hero.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-6xl">{cat.icon}</span>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Count badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {cat.totalImages} фото
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="font-display font-bold text-xl text-door-black group-hover:text-door-accent transition-colors">
                  {cat.name}
                </h3>
              </div>
              <p className="text-sm text-door-medium line-clamp-2">{cat.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Детальная страница категории
const CategoryDetail = ({ 
  categoryId, 
  onBack 
}: { 
  categoryId: string; 
  onBack: () => void;
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const category = useMemo(() => 
    catalogData.categories.find(c => c.id === categoryId),
    [categoryId]
  );

  if (!category) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-gray-500">Категория не найдена</p>
        <button onClick={onBack} className="mt-4 text-door-accent hover:underline">
          Вернуться к каталогу
        </button>
      </div>
    );
  }

  // Получаем изображения для отображения
  const displayImages = useMemo(() => {
    if (activeSubcategory) {
      const sub = category.subcategories.find(s => s.id === activeSubcategory);
      return sub?.images || [];
    }
    return category.allImages;
  }, [category, activeSubcategory]);

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-door-medium hover:text-door-black transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад в каталог
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-door-black">
              {category.name}
            </h1>
            <p className="text-door-medium">{category.description}</p>
          </div>
        </div>
      </div>

      {/* Subcategories filter */}
      {category.hasSubcategories && category.subcategories.length > 0 && (
        <div className="mb-8">
          <h3 className="font-medium text-door-black mb-3">Подкатегории:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSubcategory === null
                  ? 'bg-door-black text-white'
                  : 'bg-gray-100 text-door-dark hover:bg-gray-200'
              }`}
            >
              Все ({category.totalImages})
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSubcategory === sub.id
                    ? 'bg-door-black text-white'
                    : 'bg-gray-100 text-door-dark hover:bg-gray-200'
                }`}
              >
                {sub.displayName} ({sub.totalImages})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      <ImageGallery 
        images={displayImages} 
        categoryName={category.name}
      />
    </div>
  );
};

// Главный компонент страницы
const CatalogPage = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryId]);

  const handleSelectCategory = (id: string) => {
    navigate(`/catalog/${id}`);
  };

  const handleBack = () => {
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen bg-door-light">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-door-border">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ApolloLogo className="h-8 w-auto text-door-black hover:text-door-accent transition-colors" />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-door-dark hover:text-door-black">
                Главная
              </Link>
              <Link to="/catalog" className="text-sm font-medium text-door-black">
                Каталог
              </Link>
              <Link to="/#about" className="text-sm font-medium text-door-dark hover:text-door-black">
                Наша история
              </Link>
              <Link to="/#contact" className="text-sm font-medium text-door-dark hover:text-door-black">
                Контакты
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 min-h-[calc(100vh-200px)]">
        {selectedCategory ? (
          <CategoryDetail 
            categoryId={selectedCategory} 
            onBack={handleBack}
          />
        ) : (
          <CatalogOverview onSelectCategory={handleSelectCategory} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-door-black text-white py-12 border-t border-white/10 mt-auto">
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

export default CatalogPage;
