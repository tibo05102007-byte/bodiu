import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: 'Айша Нурланова',
    role: 'Дизайнер интерьера, Алматы',
    text: 'Фурнитура от DoorHandles изменила мой взгляд на детали. Это не просто ручки, это ювелирные украшения для дома. Клиенты в восторге от качества.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Кайрат Сагиев',
    role: 'Архитектор, Астана',
    text: 'Использую их продукцию в премиальных проектах. Надежность механизмов и эстетика на высоте. Отличный сервис и быстрая доставка.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Динара Алиева',
    role: 'Владелица салона, Шымкент',
    text: 'Очень довольна сотрудничеством. Ассортимент позволяет закрыть любые потребности клиентов, от классики до хай-тека.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Руслан Ахметов',
    role: 'Застройщик',
    text: 'Для нашего нового ЖК бизнес-класса выбрали серию Black Edition. Идеальное соотношение цены и качества.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Асель Мадиева',
    role: 'Частный клиент',
    text: 'Ручки просто невероятные! Тактильно приятные, тяжелые, чувствуется качество. Спасибо за помощь в подборе.',
    rating: 5,
  },
];

const Reviews = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite Marquee Logic with Scroll Velocity
      const createMarquee = (element: HTMLDivElement, direction: 1 | -1) => {
        const content = element.children[0];
        const contentClone = content.cloneNode(true);
        element.appendChild(contentClone);

        const width = content.clientWidth;

        let xPos = 0;

        gsap.to({}, {
          duration: 100000,
          onUpdate: () => {
            // Base speed + scroll velocity
            const vel = ScrollTrigger.limitCallbacks ? 0 : (ScrollTrigger as any).velocity || 0;
            const speed = (1 + Math.abs(vel / 500)) * direction;

            xPos -= speed;

            // Wrap around
            if (direction === 1 && xPos <= -width) xPos = 0;
            if (direction === -1 && xPos >= 0) xPos = -width;

            gsap.set(element, { x: xPos });
          }
        });
      };

      if (row1Ref.current) createMarquee(row1Ref.current, 1); // Move Left
      // if (row2Ref.current) createMarquee(row2Ref.current, -1); // Move Right (Disabled for cleaner look, or enable if more reviews)

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-door-black text-white overflow-hidden">
      <div className="container mx-auto px-4 mb-16 text-center">
        <span className="text-door-accent uppercase tracking-widest text-sm font-medium">Отзывы</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-4">Нам Доверяют</h2>
      </div>

      <div className="relative w-full flex flex-col gap-12">
        {/* Row 1 */}
        <div ref={row1Ref} className="flex gap-8 w-max pl-4">
          {/* Content Block (Original) */}
          <div className="flex gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="w-[350px] md:w-[450px] p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm transition-colors hover:bg-white/10">
                <div className="flex text-door-accent mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-door-accent to-door-dark flex items-center justify-center text-white font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-0.5">{review.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
