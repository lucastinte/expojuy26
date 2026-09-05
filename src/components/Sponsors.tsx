import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import { Star, Award, Trophy, Gem } from 'lucide-react';

type Sponsor = {
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver';
  icon: typeof Star;
};

const sponsors: Sponsor[] = [
  { name: 'Banco del NOA', tier: 'Platinum', icon: Trophy },
  { name: 'Energía Andina', tier: 'Platinum', icon: Trophy },
  { name: 'TechJuy', tier: 'Gold', icon: Award },
  { name: 'AeroJujuy', tier: 'Gold', icon: Award },
  { name: 'Constructora del Valle', tier: 'Gold', icon: Award },
  { name: 'Vinos del Norte', tier: 'Silver', icon: Gem },
  { name: 'Minera Puna', tier: 'Silver', icon: Gem },
  { name: 'Hotel Termas', tier: 'Silver', icon: Gem },
  { name: 'Logística Quebrada', tier: 'Silver', icon: Gem },
  { name: 'AgroJujuy', tier: 'Silver', icon: Gem },
  { name: 'Cementos Puna', tier: 'Silver', icon: Gem },
  { name: 'Telecom NOA', tier: 'Silver', icon: Gem },
];

const tierStyles: Record<Sponsor['tier'], { ring: string; badge: string; iconColor: string }> = {
  Platinum: {
    ring: 'hover:border-primary/50',
    badge: 'bg-primary/10 text-primary',
    iconColor: 'text-primary',
  },
  Gold: {
    ring: 'hover:border-secondary/50',
    badge: 'bg-secondary/10 text-secondary',
    iconColor: 'text-secondary',
  },
  Silver: {
    ring: 'hover:border-accent/50',
    badge: 'bg-accent/10 text-accent',
    iconColor: 'text-accent',
  },
};

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative py-28 px-6 lg:px-10 bg-midnight overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Sponsors
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Marcas que impulsan EXPOJUY
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            Las empresas líderes que hacen posible la exposición de negocios
            más importante del NOA.
          </p>
        </Reveal>

        {/* Tier legend */}
        <Reveal direction="up" className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {[
            { tier: 'Platinum', color: '#00C4CC' },
            { tier: 'Gold', color: '#5925A1' },
            { tier: 'Silver', color: '#A87CFA' },
          ].map((t) => (
            <div key={t.tier} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-sm font-semibold text-white/60">{t.tier}</span>
            </div>
          ))}
        </Reveal>

        {/* Sponsor grid */}
        <Stagger
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          stagger={0.08}
        >
          {sponsors.map((sponsor) => {
            const Icon = sponsor.icon;
            const style = tierStyles[sponsor.tier];
            return (
              <StaggerItem key={sponsor.name} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`group relative h-full rounded-2xl p-6 bg-gray-800/40 border border-white/10 ${style.ring} transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* Tier badge */}
                  <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${style.badge}`}>
                    {sponsor.tier}
                  </div>

                  {/* Logo placeholder */}
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className={`w-7 h-7 ${style.iconColor}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {sponsor.name}
                    </h3>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 30px rgba(168,124,250,0.08)' }}
                  />
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* CTA */}
        <Reveal direction="up" className="text-center mt-12">
          <p className="text-white/50 text-sm mb-5">
            ¿Querés ser sponsor de EXPOJUY 2026?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-primary/40 text-primary font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            Quiero ser sponsor
          </a>
        </Reveal>
      </div>
    </section>
  );
}
