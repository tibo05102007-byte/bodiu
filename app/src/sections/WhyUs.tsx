import { useEffect, useRef, useState } from 'react';
import { Gem, Hammer, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Gem,
    title: 'Премиальные материалы',
    description:
      'Мы используем только лучшие материалы: массивную латунь, бронзу и нержавеющую сталь аэрокосмического класса для вечной красоты и прочности.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Hammer,
    title: 'Ручное качество',
    description:
      'Каждое изделие тщательно создано мастерами с десятилетиями опыта, обеспечивая совершенство в каждой детали.',
    color: 'from-gray-600 to-gray-800',
  },
  {
    icon: ShieldCheck,
    title: 'Пожизненная гарантия',
    description:
      'Мы полностью поддерживаем нашу продукцию с комплексной пожизненной гарантией, даря вам спокойствие на поколения вперед.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Truck,
    title: 'Бесплатная доставка',
    description:
      'Наслаждайтесь бесплатной доставкой по всему миру на заказы от $100. Экспресс-доставка доступна для срочных проектов.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: RefreshCw,
    title: 'Легкий возврат',
    description:
      '30-дневная политика возврата без хлопот на все товары. Не удовлетворены? Мы все исправим, без лишних вопросов.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Headphones,
    title: 'Экспертная поддержка',
    description:
      'Наши специалисты-консультанты всегда готовы помочь вам выбрать идеальную фурнитуру для вашего проекта.',
    color: 'from-rose-500 to-pink-500',
  },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.whyus-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.feature-card',
        { opacity: 0, y: 40, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-door-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <div className="whyus-heading text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">
            Почему выбирают нас
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-door-black tracking-tight mb-6">
            Разница в{' '}
            <span className="relative inline-block">
              деталях
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C25 2 75 2 98 6"
                  stroke="#4a90e2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-door-medium leading-relaxed">
            Узнайте, почему архитекторы, дизайнеры и домовладельцы по всему миру
            доверяют нам свои самые важные проекты.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative p-8 bg-door-light rounded-3xl transition-all duration-500 cursor-pointer ${
                hoveredIndex !== null && hoveredIndex !== index
                  ? 'opacity-50 scale-[0.98]'
                  : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ perspective: '1000px' }}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon */}
              <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:shadow-card transition-shadow duration-500 group-hover:-translate-y-1 group-hover:scale-105 transform">
                <feature.icon className="w-8 h-8 text-door-dark group-hover:text-door-accent transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-door-black mb-3 group-hover:text-door-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-door-medium leading-relaxed">
                {feature.description}
              </p>

              {/* Arrow indicator */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg
                  className="w-6 h-6 text-door-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
