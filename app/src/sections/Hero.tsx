import { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headlineRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=1'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-door-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ccc 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative w-full min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="relative z-10 max-w-xl">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-door-dark shadow-soft">
                  <span className="w-2 h-2 bg-door-success rounded-full animate-pulse" />
                  Премиум коллекция 2025
                </span>
              </div>

              <h1
                ref={headlineRef}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-door-black leading-[1.1] tracking-tight mb-6"
              >
                Искусство{' '}
                <span className="relative inline-block">
                  Входа
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C50 2 150 2 198 10"
                      stroke="#1a1a1a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p
                ref={descriptionRef}
                className="text-lg text-door-medium leading-relaxed mb-8"
              >
                Точно инженерная дверная фурнитура, которая превращает пространства в
                незабываемые впечатления. Откройте для себя нашу коллекцию ручек ручной работы,
                где каждая деталь имеет значение.
              </p>

              <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToProducts}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-door-black text-white font-medium rounded-full hover:bg-door-dark transition-all duration-300 shadow-card hover:shadow-elevated"
                >
                  Исследовать коллекцию
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="group inline-flex items-center gap-3 px-6 py-4 bg-white text-door-black font-medium rounded-full hover:bg-door-light transition-all duration-300 shadow-soft">
                  <span className="w-10 h-10 bg-door-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                  </span>
                  Смотреть историю
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-door-border/50">
                <div>
                  <div className="font-display text-3xl font-bold text-door-black">
                    500+
                  </div>
                  <div className="text-sm text-door-medium">
                    Премиум дизайнов
                  </div>
                </div>
                <div className="w-px h-12 bg-door-border" />
                <div>
                  <div className="font-display text-3xl font-bold text-door-black">
                    50K+
                  </div>
                  <div className="text-sm text-door-medium">Довольных клиентов</div>
                </div>
                <div className="w-px h-12 bg-door-border" />
                <div>
                  <div className="font-display text-3xl font-bold text-door-black">
                    15+
                  </div>
                  <div className="text-sm text-door-medium">Лет опыта</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              ref={imageRef}
              className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2"
            >
              <div className="relative h-[500px] lg:h-full overflow-hidden rounded-3xl lg:rounded-none">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-door-light via-door-light/50 to-transparent z-10 lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-door-light via-transparent to-transparent z-10" />

                <img
                  src="/images/hero-handle.jpg"
                  alt="Премиум дверная ручка"
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating badge */}
                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-4 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-card">
                  <div className="w-12 h-12 bg-door-light rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-door-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-door-black">
                      Бестселлер
                    </div>
                    <div className="text-sm text-door-medium">
                      Коллекция Matte Black
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
