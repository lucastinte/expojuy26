import { Reveal } from './Reveal';
import { Calendar, MapPin, Mail, Phone, ArrowRight, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  {
    title: 'Evento',
    links: [
      { label: 'Inicio', href: '#inicio' },
      { label: 'Expositores', href: '#expositores' },
      { label: 'Cronograma', href: '#cronograma' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
  {
    title: 'Participar',
    links: [
      { label: 'Acreditarse', href: '#acreditarse' },
      { label: 'Ser expositor', href: '#expositores' },
      { label: 'Rondas de negocios', href: '#expositores' },
      { label: 'Prensa', href: '#contacto' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary-dark text-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Acreditarse CTA band */}
      <div id="acreditarse" className="relative py-16 px-6 lg:px-10 border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <Reveal direction="up" className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            ¿Listo para ser parte de EXPOJUY 2026?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Acreditaciones y reservas de stands abiertas ahora mismo.
          </p>
          <a
            href="#contacto"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Completar formulario
            <ArrowRight className="w-5 h-5" />
          </a>
        </Reveal>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src="/assets/images/expojuy_isotipo.png"
                alt="EXPOJUY 2026"
                className="h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,196,204,0.35)]"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md">
              La exposición de negocios más importante del NOA. Conectando
              países y creando oportunidades para el desarrollo económico,
              turístico e industrial de la región.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:info@expojuy2026.com" className="flex items-center gap-2 text-white/60 text-sm hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> info@expojuy2026.com
              </a>
              <a href="tel:+543884000000" className="flex items-center gap-2 text-white/60 text-sm hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +54 388 400-0000
              </a>
              <p className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" /> San Salvador de Jujuy, Argentina
              </p>
            </div>

            {/* Redes Sociales */}
            <div className="mt-8 pt-6 border-t border-white/10 max-w-sm">
              <span className="block text-xs font-bold uppercase tracking-widest text-primary mb-3">
                Redes Sociales
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white hover:text-[#A87CFA] transition-colors duration-300 inline-flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white hover:text-[#A87CFA] transition-colors duration-300 inline-flex items-center justify-center"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="text-white hover:text-[#A87CFA] transition-colors duration-300 inline-flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-primary mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-medium">
            © 2026 EXPOJUY. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>12 — 14 de Agosto, 2026 · Jujuy, Argentina</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
