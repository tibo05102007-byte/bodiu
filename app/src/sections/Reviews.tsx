import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Нуркен Тулебаев',
    role: 'Дизайнер интерьеров',
    company: 'Astana Design',
    content:
      'Качество и мастерство этих дверных ручек не имеют аналогов. Они стали фирменным элементом в моих роскошных проектах в Алматы и Нур-Султане.',
    rating: 5,
    avatar: 'НТ',
  },
  {
    id: 2,
    name: 'Сакен Куанышбаев',
    role: 'Архитектор',
    company: 'Qazaq Stroy',
    content:
      'Каждая деталь говорит о точности и заботе. Мои клиенты всегда замечают разницу, которую эти ручки вносят в их пространства. Рекомендую всем!',
    rating: 5,
    avatar: 'СК',
  },
  {
    id: 3,
    name: 'Айгуль Нурланова',
    role: 'Домовладелица',
    company: 'Шымкент',
    content:
      'Я была скептически настроена к более дорогой дверной фурнитуре, но эти ручки стоят каждого тенге. Они выглядят потрясающе в моем новом доме.',
    rating: 5,
    avatar: 'АН',
  },
  {
    id: 4,
    name: 'Ерлан Сагинтаев',
    role: 'Подрядчик',
    company: 'Elite Construction',
    content:
      'Как подрядчик, я работал со многими брендами фурнитуры. Впервые вижу такое последовательное качество по всей линейке Apollo. Отличный выбор!',
    rating: 5,
    avatar: 'ЕС',
  },
  {
    id: 5,
    name: 'Гульнара Ибраева',
    role: 'Дизайн-директор',
    company: 'KazDesign Studio',
    content:
      'Коллекция матового черного просто изысканная. Отделка безупречная, ощущение приятное. Настоящая роскошная фурнитура для наших проектов.',
    rating: 5,
    avatar: 'ГИ',
  },
  {
    id: 6,
    name: 'Бауыржан Омаров',
    role: 'Застройщик',
    company: 'Omarov Group',
    content:
      'Мы указываем эти ручки для всех наших премиальных объектов в Астане. Гарантия и поддержка дают нам полную уверенность в выборе.',
    rating: 5,
    avatar: 'БО',
  },
  {
    id: 7,
    name: 'Дана Сулейменова',
    role: 'Инженер-проектировщик',
    company: 'Qazaq Project',
    content:
      'Отличное соотношение цены и качества. Клиенты всегда довольны. Особенно популярны защелки и комплекты для межкомнатных дверей.',
    rating: 5,
    avatar: 'ДС',
  },
  {
    id: 8,
    name: 'Марат Жумабаев',
    role: 'Владелец салона дверей',
    company: 'Door Master Kazakhstan',
    content:
      'Сотрудничаем с Apollo уже 3 года. Продукция всегда на высоте, доставка в срок. Наши покупатели ценят европейское качество по доступной цене.',
    rating: 5,
    avatar: 'МЖ',
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex-shrink-0 w-[400px] p-6 bg-white rounded-2xl shadow-soft hover:shadow-card transition-shadow duration-300 mx-3">
    {/* Quote icon */}
    <div className="mb-4">
      <Quote className="w-8 h-8 text-door-accent/30" />
    </div>

    {/* Rating */}
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: review.rating }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
        />
      ))}
    </div>

    {/* Content */}
    <p className="text-door-dark leading-relaxed mb-6 line-clamp-4">
      "{review.content}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-door-accent to-door-dark rounded-full flex items-center justify-center text-white font-semibold">
        {review.avatar}
      </div>
      <div>
        <div className="font-semibold text-door-black">{review.name}</div>
        <div className="text-sm text-door-medium">
          {review.role}, {review.company}
        </div>
      </div>
    </div>
  </div>
);

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reviews-heading',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1Reviews = reviews.slice(0, 4);
  const row2Reviews = reviews.slice(4, 8);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-door-light overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-door-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full">
        {/* Header */}
        <div className="reviews-heading text-center max-w-3xl mx-auto mb-16 px-4 sm:px-6">
          <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">
            Отзывы
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-door-black tracking-tight mb-6">
            Что говорят наши{' '}
            <span className="relative inline-block">
              клиенты
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C30 2 90 2 118 6"
                  stroke="#d4af37"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-door-medium leading-relaxed">
            Узнайте, что говорят архитекторы, дизайнеры и домовладельцы из Казахстана о нашей
            премиум дверной фурнитуре Apollo.
          </p>
        </div>

        {/* Marquee Row 1 - Moving Left */}
        <div className="mb-6 overflow-hidden">
          <div
            ref={row1Ref}
            className="flex animate-marquee hover:pause-animation"
            style={{ width: 'max-content' }}
          >
            {/* Duplicate reviews for seamless loop */}
            {[...row1Reviews, ...row1Reviews, ...row1Reviews, ...row1Reviews].map(
              (review, index) => (
                <ReviewCard key={`row1-${index}`} review={review} />
              )
            )}
          </div>
        </div>

        {/* Marquee Row 2 - Moving Right */}
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex animate-marquee-reverse hover:pause-animation"
            style={{ width: 'max-content' }}
          >
            {/* Duplicate reviews for seamless loop */}
            {[...row2Reviews, ...row2Reviews, ...row2Reviews, ...row2Reviews].map(
              (review, index) => (
                <ReviewCard key={`row2-${index}`} review={review} />
              )
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 px-4">
          <div className="flex items-center gap-2 text-door-medium">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L20.5 12.5L32 14L23 22L25.5 33.5L16 27.5L6.5 33.5L9 22L0 14L12 12L16 2Z" />
            </svg>
            <span className="font-semibold text-door-black">4.9/5</span>
            <span className="text-sm">Средняя оценка</span>
          </div>
          <div className="w-px h-8 bg-door-border" />
          <div className="flex items-center gap-2 text-door-medium">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zm7-16H12a1 1 0 010-2h11a1 1 0 010 2z" />
            </svg>
            <span className="font-semibold text-door-black">5000+</span>
            <span className="text-sm">Довольных клиентов</span>
          </div>
          <div className="w-px h-8 bg-door-border" />
          <div className="flex items-center gap-2 text-door-medium">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 0L20 12L32 14L23 22L25.5 34L16 28L6.5 34L9 22L0 14L12 12L16 0Z" />
            </svg>
            <span className="font-semibold text-door-black">По всему</span>
            <span className="text-sm">Казахстану</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
