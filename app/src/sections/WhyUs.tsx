import { useEffect, useRef } from 'react';
import { Gem, Hammer, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const features = [
  {
    icon: Gem,
    title: 'Премиальные материалы',
    description: 'Массивная латунь, бронза и сталь для вечной красоты.',
    color: 'bg-amber-100',
    accent: 'text-amber-600',
    rotation: -15
  },
  {
    icon: Hammer,
    title: 'Ручное качество',
    description: 'Создано мастерами с десятилетиями опыта.',
    color: 'bg-gray-100',
    accent: 'text-gray-800',
    rotation: 0
  },
  {
    icon: ShieldCheck,
    title: 'Пожизненная гарантия',
    description: 'Мы гарантируем качество на поколения вперед.',
    color: 'bg-emerald-100',
    accent: 'text-emerald-600',
    rotation: 15
  },
];

const WhyUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Orbit Rotation on Scroll
    tl.fromTo(orbitRef.current,
      { rotate: -5 },
      { rotate: 5, ease: 'none' }
    );

    // Icon Draw Animation (Entrance)
    gsap.fromTo('.feature-icon path, .feature-icon polyline, .feature-icon line, .feature-icon circle',
      { strokeDasharray: 100, strokeDashoffset: 100 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="why-us" className="relative w-full py-32 bg-white overflow-hidden">

      <div className="container mx-auto px-4 text-center mb-20 relative z-10">
        <span className="text-sm font-medium text-door-accent uppercase tracking-wider mb-4 block">
          Почему выбирают нас
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-door-black mb-6">
          Разница в <span className="italic font-serif text-door-medium">Деталях</span>
        </h2>
      </div>

      {/* Orbit Container */}
      <div className="relative w-full h-[600px] flex justify-center overflow-hidden">
        {/* Virtual pivot point far below */}
        <div
          ref={orbitRef}
          className="absolute top-[100px] w-[2000px] h-[2000px] flex justify-center items-start origin-center transition-transform"
          style={{ transformOrigin: '50% 2000px' }} // Pivot point
        >
          {/* Cards distributed on the arc */}
          {features.map((feature, i) => (
            <div
              key={i}
              className="absolute top-0 w-[350px] p-8 bg-white rounded-3xl shadow-elevated border border-gray-100 group hover:-translate-y-4 transition-transform duration-300"
              style={{
                left: '50%',
                marginLeft: '-175px', // Center the card
                transform: `rotate(${feature.rotation}deg) translateY(0px)`,
                transformOrigin: '50% 2000px' // Same pivot for distribution
              }}
            >
              {/* Correct counter-rotation for content if needed, but for orbit effect we usually keep it aligned to radius or upright. Design says "arranged in a gentle arc". */}

              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 ${feature.accent} feature-icon`} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold font-display text-door-black mb-3">{feature.title}</h3>
              <p className="text-door-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default WhyUs;
