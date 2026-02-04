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
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <main className="relative z-10 bg-white mb-[100vh] sm:mb-[600px] lg:mb-[500px]">
        {/* Helper helper class to adjust margin bottom dynamically via JS in Footer or manually set approximate height */}
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
