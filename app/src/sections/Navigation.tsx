import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ApolloLogo from '../components/ApolloLogo';

// Иконка VK
const VKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202C4.624 10.857 4 8.673 4 8.2c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.779.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';



  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      if (!scrolled) setIsExpanded(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations for "Dynamic Island"
  useGSAP(() => {
    if (!navRef.current || !containerRef.current) return;

    if (isScrolled && !isExpanded) {
      // Compact Island Mode
      gsap.to(containerRef.current, {
        width: 'auto',
        borderRadius: '9999px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        padding: '0.75rem 1.5rem',
        marginTop: '24px',
        duration: 0.8,
        ease: 'power4.out',
        boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.1)',
      });

      // Hide links in compact mode
      gsap.to('.nav-links', {
        opacity: 0,
        width: 0,
        display: 'none',
        duration: 0.4,
      });

    } else if (isScrolled && isExpanded) {
      // Expanded Island Mode (Hover)
      gsap.to(containerRef.current, {
        width: 'auto', // Allow it to grow
        maxWidth: '90vw',
        borderRadius: '9999px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        padding: '1rem 2rem',
        marginTop: '24px',
        duration: 0.6,
        ease: 'back.out(1.2)',
      });

      gsap.to('.nav-links', {
        display: 'flex',
        opacity: 1,
        width: 'auto',
        duration: 0.4,
        delay: 0.1,
      });
    } else {
      // Default Top State
      gsap.to(containerRef.current, {
        width: '100%',
        borderRadius: '0px',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0px)',
        padding: '1.5rem 2rem', // px-8 py-6
        marginTop: '0px',
        duration: 0.8,
        ease: 'power4.out',
        boxShadow: 'none',
        maxWidth: '100%', // Reset max-width
      });

      gsap.to('.nav-links', {
        display: 'flex',
        opacity: 1,
        width: 'auto',
        duration: 0.4,
      });
    }
  }, [isScrolled, isExpanded]);

  const scrollToSection = (href: string) => {
    // Если не на главной странице и якорь #contact или #about - переходим на главную
    if (!isHomePage && (href === '#contact' || href === '#about')) {
      window.location.href = '/' + href;
      return;
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Главная', href: '/', isPage: true },
    { name: 'Каталог', href: '/catalog', isPage: true },
    { name: 'Наша история', href: '#about', isPage: false },
    { name: 'Контакты', href: '#contact', isPage: false },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div
          ref={containerRef}
          className="flex items-center justify-between gap-8 pointer-events-auto transition-all"
          onMouseEnter={() => isScrolled && setIsExpanded(true)}
          onMouseLeave={() => isScrolled && setIsExpanded(false)}
        >


          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <ApolloLogo className="h-10 w-auto text-door-black hover:text-door-accent transition-colors duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links hidden md:flex items-center gap-6 overflow-hidden">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative text-sm font-medium text-door-dark hover:text-door-black transition-colors duration-300 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm font-medium text-door-dark hover:text-door-black transition-colors duration-300 whitespace-nowrap"
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-3 shrink-0 ${isScrolled && !isExpanded ? '' : 'ml-4'}`}>
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://instagram.com/apollo_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-door-light/50 hover:bg-door-accent hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://vk.link/apollo_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-door-light/50 hover:bg-door-accent hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="VKontakte"
              >
                <VKIcon />
              </a>
            </div>

            <button
              className="md:hidden p-2.5 bg-door-light/50 hover:bg-door-medium/20 rounded-full transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-door-dark" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div
          className="absolute inset-0 bg-door-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-cinematic ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <span className="font-display font-bold text-xl">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  link.isPage ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xl font-medium text-door-dark hover:text-door-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-xl font-medium text-door-dark hover:text-door-black transition-colors"
                    >
                      {link.name}
                    </button>
                  )
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>© 2025 Apollo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
