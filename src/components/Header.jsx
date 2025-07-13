import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Détection de la section active
      const sections = ['home', 'about', 'skills', 'services', 'project', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projets', href: '#project' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-blue-900/90 backdrop-blur-md shadow-sm py-2 border-b border-blue-800' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HC</span>
            </div>
            <span className="text-xl font-bold text-white">
              HenriCanisius
            </span>
          </motion.a>

          {/* Navigation Desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                return (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeSection === sectionId 
                          ? 'text-white bg-blue-700/30' 
                          : 'text-blue-100 hover:text-white hover:bg-blue-800/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                      {activeSection === sectionId && (
                        <motion.span 
                          layoutId="activeSection"
                          className="absolute left-1/4 bottom-0 w-1/2 h-0.5 bg-blue-400"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bouton Mobile */}
          <button
            className="md:hidden text-blue-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4 rounded-lg"
            >
              <ul className="bg-blue-800/90 backdrop-blur-md py-2 space-y-1">
                {navItems.map((item) => {
                  const sectionId = item.href.substring(1);
                  return (
                    <motion.li
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className={`block px-4 py-3 rounded-md mx-2 transition-colors ${
                          activeSection === sectionId
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-blue-100 hover:bg-blue-700/50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;