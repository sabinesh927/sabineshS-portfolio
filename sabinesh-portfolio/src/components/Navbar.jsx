import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home',       href: '#home'          },
  { label: 'About',      href: '#about'         },
  { label: 'Skills',     href: '#skills'        },
  { label: 'Experience', href: '#internship'    },
  { label: 'Resume',     href: '#resume'        },
  { label: 'Contact',    href: '#contact'       },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/10 py-3' : 'py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 gradient-text font-bold text-lg sm:text-xl flex-shrink-0"
        >
          <Zap size={18} className="text-indigo-400" />
          Sabinesh S
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-indigo-400 text-sm font-medium transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/30 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — slides down, no x overflow */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-400 hover:text-indigo-400 font-medium transition-colors text-sm py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium text-center"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
