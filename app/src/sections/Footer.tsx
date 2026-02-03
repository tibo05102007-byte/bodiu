import { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Check,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
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

  const footerLinks = {
    products: [
      { name: 'Современная коллекция', href: '#' },
      { name: 'Классическая коллекция', href: '#' },
      { name: 'Умные ручки', href: '#' },
      { name: 'Премиум серия', href: '#' },
      { name: 'Новинки', href: '#' },
    ],
    company: [
      { name: 'О нас', href: '#about' },
      { name: 'Наша история', href: '#' },
      { name: 'Карьера', href: '#' },
      { name: 'Пресса', href: '#' },
      { name: 'Блог', href: '#' },
    ],
    support: [
      { name: 'Связаться с нами', href: '#contact' },
      { name: 'Вопросы и ответы', href: '#' },
      { name: 'Информация о доставке', href: '#' },
      { name: 'Возвраты', href: '#' },
      { name: 'Гарантия', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-door-black text-white overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Newsletter Section */}
      <div className="footer-content border-b border-white/10">
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
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubscribed
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

      {/* Main Footer Content */}
      <div className="footer-content w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-door-black font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-tight">
                DOORHANDLES
              </span>
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

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Товары</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Поддержка</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@doorhandles.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm"
                >
                  <Mail className="w-4 h-4 text-door-accent" />
                  hello@doorhandles.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 text-sm"
                >
                  <Phone className="w-4 h-4 text-door-accent" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-door-accent flex-shrink-0 mt-0.5" />
                  <span>
                    123 Дизайн Дистрикт
                    <br />
                    Нью-Йорк, NY 10001
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 DOORHANDLES. Все права защищены.
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
