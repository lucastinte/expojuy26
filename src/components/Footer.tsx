import { Reveal } from './Reveal';
import { Calendar, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

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
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/images/expojuy26_isologotipo.png"
                alt="EXPOJUY 2026"
                className="h-14 w-auto rounded-lg bg-white/95 px-3 py-1.5 shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.nextElementSibling as HTMLElement | undefined;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <span
                className="hidden items-center gap-1 text-2xl font-extrabold"
                style={{ display: 'none' }}
              >
                EXPO<span className="text-primary">JUY</span>
              </span>
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
