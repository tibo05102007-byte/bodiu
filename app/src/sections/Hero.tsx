import { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LiquidDistortion from '../components/LiquidDistortion';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Text Reveal
    tl.fromTo(headlineRef.current,
      { y: 100, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
      { y: 0, opacity: 1, clipPath: 'polygon(0 100%, 100% 100%, 100% 0%, 0 0%)', duration: 1.2, ease: 'power4.out' }
    )
      .fromTo(descriptionRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.8'
      )
      .fromTo(imageContainerRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' },
        '-=1.2'
      );

  }, { scope: heroRef });

  const scrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-door-light overflow-hidden flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ccc 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center h-full">

          {/* Content (Left 60%) */}
          <div className="lg:col-span-7 pt-20 lg:pt-0">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-door-dark shadow-soft">
                <span className="w-2 h-2 bg-door-success rounded-full animate-pulse" />
                Премиум коллекция 2025
              </span>
            </div>

            <h1 ref={headlineRef} className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-door-black leading-[0.95] tracking-tight mb-8">
              Искусство <br />
              <span className="italic font-serif text-door-dark/80">Входа</span>
            </h1>

            <p ref={descriptionRef} className="text-xl text-door-dark max-w-lg leading-relaxed mb-10">
              Точно инженерная дверная фурнитура, которая превращает пространства в незабываемые впечатления.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-door-black text-white font-medium rounded-full hover:bg-door-dark transition-all duration-300 shadow-card hover:shadow-elevated"
              >
                Исследовать
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group inline-flex items-center gap-3 px-6 py-4 bg-white text-door-black font-medium rounded-full hover:bg-door-light transition-all duration-300 shadow-soft">
                <span className="w-10 h-10 bg-door-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                </span>
                Видео
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Container with S-Curve and Liquid Effect */}
      <div
        ref={imageContainerRef}
        className="absolute top-0 right-0 w-full lg:w-[45%] h-[50vh] lg:h-full z-10 lg:z-10"
        style={{
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)', // Simplified S-curve via polygon
        }}
      >
        <div className="w-full h-full relative">
          {/* Fallback Image */}
          <img src="/images/hero-handle.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover -z-10" />

          {/* WebGL Overlay */}
          <div className="absolute inset-0 w-full h-full hidden lg:block">
            <LiquidDistortion imageSrc="/images/hero-handle.jpg" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
