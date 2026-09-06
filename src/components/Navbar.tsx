import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  isAi?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Mi Ruta IA', href: '#matchmaker-ia', isAi: true },
  { label: 'Expositores', href: '#expositores' },
  { label: 'Cronograma', href: '#cronograma' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'glass-dark border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
        }`}
    >
      <nav className="relative max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center shrink-0 group">
          <img
            src="/assets/images/expojuy_isotipo.png"
            alt="EXPOJUY 2026"
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(0,196,204,0.35)]"
          />
        </a>

        {/* Desktop links - centered mathematically on the page axis */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.isAi ? (
                <a
                  href={link.href}
                  className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#A87CFA]/20 via-[#A87CFA]/10 to-[#00C4CC]/20 border border-[#A87CFA]/40 shadow-[0_0_15px_rgba(168,124,250,0.25)] hover:shadow-[0_0_20px_rgba(0,196,204,0.45)] hover:border-[#00C4CC]/60 hover:scale-105 active:scale-95 transition-all duration-300 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00C4CC] group-hover:rotate-12 transition-transform" />
                  <span>{link.label}</span>
                </a>
              ) : (
                <a
                  href={link.href}
                  className="relative text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#acreditarse"
          className="hidden md:inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Participar
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden glass-dark border-t border-white/10"
          >
            <ul className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.isAi ? (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-base font-semibold text-white/90 hover:text-primary transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="text-white group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                        IA
                      </span>
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-base font-semibold text-white/80 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <a
                  href="#acreditarse"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30"
                >
                  Participar
                  <ChevronRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
