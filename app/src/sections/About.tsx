import { useEffect, useRef } from 'react';
import { Award, Users, Globe, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        '.about-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, value: '25+', label: 'Дизайн наград' },
    { icon: Users, value: '50K+', label: 'Довольных клиентов' },
    { icon: Globe, value: '40+', label: 'Стран' },
    { icon: Sparkles, value: '100%', label: 'Ручная работа' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-door-light overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="about-content order-2 lg:order-1">
            <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">
              О нас
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-door-black tracking-tight mb-6">
              Выкованы в{' '}
              <span className="relative inline-block">
                точности
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 150 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C40 2 110 2 148 6"
                    stroke="#4a90e2"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-lg text-door-medium leading-relaxed mb-6">
              Более 15 лет мы создаем дверную фурнитуру, которая выходит за рамки
              простой функциональности. Каждое изделие в нашей коллекции — это
              воплощение веры в то, что мельчайшие детали могут преобразить
              целое пространство.
            </p>

            <p className="text-lg text-door-medium leading-relaxed mb-8">
              Наши мастера-кожевники сочетают традиционные техники с современными
              инновациями, работая с премиальными материалами: массивной латунью,
              бронзой и нержавеющей стелью аэрокосмического класса. Каждая ручка
              тщательно разработана, спроектирована и обработана вручную в нашей
              мастерской.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-6 py-3 bg-door-black text-white font-medium rounded-full hover:bg-door-dark transition-colors duration-300">
                Наша философия
              </button>
              <button className="px-6 py-3 bg-white text-door-black font-medium rounded-full hover:bg-door-border transition-colors duration-300 border border-door-border">
                Смотреть нашу историю
              </button>
            </div>

            {/* Stats */}
            <div className="about-stats grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-3 shadow-soft">
                    <stat.icon className="w-6 h-6 text-door-accent" />
                  </div>
                  <div className="font-display text-2xl font-bold text-door-black">
                    {stat.value}
                  </div>
                  <div className="text-sm text-door-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-elevated"
            >
              <div className="aspect-[4/3] lg:aspect-[3/4]">
                <img
                  src="/images/black-brass-handle.jpg"
                  alt="Премиум дверная ручка мастерство"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-card">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-door-accent/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-door-accent"
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
                      Награжденный дизайн
                    </div>
                    <div className="text-sm text-door-medium">
                      Red Dot Design Award 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
