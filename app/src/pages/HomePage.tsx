import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Products from '../sections/Products';
import About from '../sections/About';
import WhyUs from '../sections/WhyUs';
import Reviews from '../sections/Reviews';
import FAQ from '../sections/FAQ';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Products />
        <About />
        <WhyUs />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
