import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Главная', href: '/', isPage: true },
    { name: 'Каталог', href: '/catalog', isPage: true },
    { name: 'О нас', href: '#about', isPage: false },
    { name: 'Контакты', href: '#contact', isPage: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${
          isScrolled || !isHomePage
            ? 'py-3 bg-white/90 backdrop-blur-lg shadow-soft'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-door-black rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-display font-bold text-lg">D</span>
              </div>
              <span className="font-display font-semibold text-lg tracking-tight text-door-black">
                DOORHANDLES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isPage ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="relative text-sm font-medium text-door-dark hover:text-door-black transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-door-black transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-sm font-medium text-door-dark hover:text-door-black transition-colors duration-300 group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-door-black transition-all duration-300 group-hover:w-full" />
                  </button>
                )
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button className="relative p-2 hover:bg-door-light rounded-full transition-colors duration-300">
                <ShoppingBag className="w-5 h-5 text-door-dark" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-door-black text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 hover:bg-door-light rounded-full transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-door-dark" />
                ) : (
                  <Menu className="w-6 h-6 text-door-dark" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-door-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-elevated transform transition-transform duration-500 ease-cinematic ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-door-dark hover:text-door-black py-3 border-b border-door-border transition-colors duration-300"
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-door-dark hover:text-door-black py-3 border-b border-door-border transition-colors duration-300"
              >
                Каталог
              </Link>
              <button
                onClick={() => scrollToSection('#about')}
                className="text-left text-lg font-medium text-door-dark hover:text-door-black py-3 border-b border-door-border transition-colors duration-300"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="text-left text-lg font-medium text-door-dark hover:text-door-black py-3 border-b border-door-border transition-colors duration-300"
              >
                Контакты
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
