import { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ApolloLogo from '../components/ApolloLogo';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Dynamic Footer Height Adjustment for "Curtain Reveal"
    const updateMargin = () => {
      const footerHeight = sectionRef.current?.offsetHeight;
      const main = document.querySelector('main');
      if (main && footerHeight) {
        main.style.marginBottom = `${footerHeight}px`;
      }
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);

    return () => window.removeEventListener('resize', updateMargin);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax-like reveal effect happens naturally due to fixed position
      // We can add some internal animations triggered when it comes into view

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'main', // Trigger when main ends
          start: 'bottom bottom',
          end: '+=100%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo(
        '.footer-content-stagger > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };



  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/apollo_handle', label: 'Instagram' },
    { 
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202C4.624 10.857 4 8.673 4 8.2c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
        </svg>
      ), 
      href: 'https://vk.link/apollo_handle', 
      label: 'VKontakte' 
    },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="fixed bottom-0 left-0 w-full bg-door-black text-white overflow-hidden -z-10"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Newsletter Section */}
      <div className="footer-content-stagger border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Оставайтесь в{' '}
                <span className="text-door-accent">курсе</span>
              </h3>
              <p className="text-white/60 text-lg max-w-md">
                Подпишитесь, чтобы получать эксклюзивные предложения, дизайнерское
                вдохновение и первыми узнавать о новых коллекциях.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите ваш email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-door-accent transition-colors duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isSubscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-door-black hover:bg-door-accent hover:text-white'
                    }`}
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-5 h-5" />
                      Подписано!
                    </>
                  ) : (
                    <>
                      Подписаться
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content-stagger w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 justify-between">
          {/* Brand Column */}
          <div className="mb-8 lg:mb-0">

            <div className="flex items-center gap-2 mb-6">
              <ApolloLogo className="h-12 w-auto text-white" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Премиум дверная фурнитура, созданная с точностью и страстью.
              Преображаем пространства с 2009 года.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-door-accent transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right flex flex-col md:items-end">
            <h4 className="font-display font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:narmetov.r41@gmail.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm md:justify-end"
                >
                  <Mail className="w-4 h-4 text-door-accent order-first md:order-last" />
                  narmetov.r41@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+77074209510"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm md:justify-end"
                >
                  <Phone className="w-4 h-4 text-door-accent order-first md:order-last" />
                  +7 707 420 9510
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/77074209510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-green-400 transition-colors duration-300 text-sm md:justify-end"
                >
                  <MessageCircle className="w-4 h-4 text-green-400 order-first md:order-last" />
                  WhatsApp
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm md:justify-end">
                  <MapPin className="w-4 h-4 text-door-accent flex-shrink-0 mt-0.5 order-first md:order-last" />
                  <span>
                    Алматы
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="https://wa.me/77074209510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-white hover:text-green-600 transition-all duration-300 shadow-md md:ml-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  Написать в WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Apollo. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Условия использования
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white text-sm transition-colors duration-300"
            >
              Политика cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
