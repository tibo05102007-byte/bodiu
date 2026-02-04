import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    // Image Mask Reveal
    tl.fromTo(imageRef.current,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.5, ease: 'power4.out' }
    );

    // Text Reveal (Staggered)
    tl.fromTo('.about-text-line',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=1.0'
    );

    // Parallax Effect
    gsap.to(textRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 lg:py-40 bg-white overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative">
        {/* Background Typography */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[15vw] font-display font-bold leading-none">PRECISION</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Text Block (Top Left - Floating) */}
          <div ref={textRef} className="lg:col-span-5 relative z-20 pt-12 lg:pt-0">
            <span className="about-text-line inline-block text-sm font-medium text-door-accent uppercase tracking-wider mb-4">
              Наша история
            </span>
            <h2 className="about-text-line font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-door-black leading-[1.1] mb-8">
              Выкованные в <br />
              <span className="ml-12 italic font-serif text-door-dark/70">Точности</span>
            </h2>
            <div className="space-y-6 text-lg text-door-dark/80 leading-relaxed max-w-md">
              <p className="about-text-line">
                Мы верим, что дверная ручка — это первое рукопожатие дома. Это момент, когда архитектура становится осязаемой.
              </p>
              <p className="about-text-line">
                С 2009 года мы объединяем промышленную точность с ремесленной душой, создавая фурнитуру, которая не просто открывает двери, но и открывает новые ощущения от пространства.
              </p>
            </div>

            <div className="about-text-line mt-12">
              <a href="#philosophy" className="group inline-flex items-center gap-2 text-door-black font-semibold border-b border-door-black pb-1 hover:text-door-accent hover:border-door-accent transition-colors duration-300">
                Наша философия
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Image Block (Bottom right - Anchored) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
            >
              <img
                src="/images/modern-minimalist.jpg"
                alt="Process"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1549411984-48d886f7b9bd?q=80&w=2574&auto=format&fit=crop' }}
                className="w-full h-full object-cover"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 max-w-xs shadow-elevated hidden sm:block">
                <p className="font-display font-bold text-3xl text-door-black mb-1">15+</p>
                <p className="text-sm text-door-medium uppercase tracking-wide">Лет совершенства</p>
              </div>
            </div>

            {/* Decorative Offset Image (Parallax layer potentially) */}
            <div className="hidden lg:block absolute -bottom-20 -left-20 w-64 h-64 bg-door-light -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
