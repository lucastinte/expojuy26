import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type LogoEntry = {
  id?: string;
  name: string;
  tier?: 'Platinum' | 'Gold' | 'Silver';
  category?: string;
  icon: React.ReactNode;
  highlightColor?: string;
};

export type LogoCloudSwapProps = {
  logos: LogoEntry[];
  title?: string;
  subtitle?: string;
  interval?: number;
  stagger?: number;
  className?: string;
};

const WIPE_DURATION = 0.92;
const WIPE_TIMES = [0, 0.4, 1];

const tierStyles: Record<'Platinum' | 'Gold' | 'Silver', {
  border: string;
  badge: string;
  bgGlow: string;
  accentText: string;
}> = {
  Platinum: {
    border: 'border-[#00C4CC]/30 hover:border-[#00C4CC] shadow-[0_0_15px_rgba(0,196,204,0.15)]',
    badge: 'bg-[#00C4CC]/15 text-[#00C4CC] border border-[#00C4CC]/30',
    bgGlow: 'from-[#00C4CC]/10 to-transparent',
    accentText: 'text-[#00C4CC]',
  },
  Gold: {
    border: 'border-[#7B3FC2]/35 hover:border-[#A87CFA] shadow-[0_0_15px_rgba(123,63,194,0.15)]',
    badge: 'bg-[#7B3FC2]/20 text-[#C4A2FF] border border-[#7B3FC2]/40',
    bgGlow: 'from-[#5925A1]/15 to-transparent',
    accentText: 'text-[#C4A2FF]',
  },
  Silver: {
    border: 'border-white/15 hover:border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.05)]',
    badge: 'bg-white/10 text-white/80 border border-white/20',
    bgGlow: 'from-white/5 to-transparent',
    accentText: 'text-white/80',
  },
};

function LogoItem({
  logo,
  index,
  isWaving,
  stagger,
  totalCount,
  onDone,
  variant = 'card',
}: {
  logo: LogoEntry;
  index: number;
  isWaving: boolean;
  stagger: number;
  totalCount: number;
  onDone: () => void;
  variant?: 'minimal' | 'card';
}) {
  const tierStyle = logo.tier ? tierStyles[logo.tier] : tierStyles.Silver;

  return (
    <motion.div
      aria-label={logo.name}
      animate={
        isWaving
          ? {
              clipPath: [
                'inset(0 0% 0 0)',
                'inset(0 100% 0 0)',
                'inset(0 0% 0 0)',
              ],
              filter: ['blur(0px)', 'blur(8px)', 'blur(0px)'],
              opacity: [1, 0.2, 1],
            }
          : {
              clipPath: 'inset(0 0% 0 0)',
              filter: 'blur(0px)',
              opacity: 1,
            }
      }
      transition={
        isWaving
          ? {
              clipPath: {
                duration: WIPE_DURATION,
                times: WIPE_TIMES,
                ease: ['easeInOut', 'easeInOut'],
                delay: index * stagger,
              },
              filter: {
                duration: WIPE_DURATION * 0.9,
                times: WIPE_TIMES,
                ease: 'easeInOut',
                delay: index * stagger,
              },
              opacity: {
                duration: WIPE_DURATION * 0.85,
                times: WIPE_TIMES,
                ease: 'easeInOut',
                delay: index * stagger,
              },
            }
          : {
              duration: 0.3,
              ease: 'easeOut',
            }
      }
      onAnimationComplete={() => {
        if (isWaving && index === totalCount - 1) onDone();
      }}
      whileHover={{
        scale: 1.05,
        y: -3,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 350, damping: 22 },
      }}
      className={cn(
        'group relative cursor-pointer transition-all duration-300',
        variant === 'minimal'
          ? 'flex w-24 sm:w-28 shrink-0 flex-col items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10'
          : 'flex flex-col justify-between p-5 rounded-2xl bg-gray-900/60 backdrop-blur-xl border transition-all duration-300',
        variant === 'card' && tierStyle.border
      )}
    >
      {variant === 'card' && (
        <>
          {/* Subtle gradient background highlight */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
              tierStyle.bgGlow
            )}
          />

          {/* Tier badge header */}
          <div className="relative z-10 flex items-center justify-between w-full mb-3">
            <span
              className={cn(
                'text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full',
                tierStyle.badge
              )}
            >
              {logo.tier ?? 'Sponsor'}
            </span>
            {logo.category && (
              <span className="text-[10px] text-white/40 font-medium truncate max-w-[110px]">
                {logo.category}
              </span>
            )}
          </div>
        </>
      )}

      {/* Main icon container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-2">
        <div
          className={cn(
            'flex items-center justify-center rounded-2xl transition-all duration-300',
            variant === 'minimal'
              ? 'h-11 w-11 bg-white/5 group-hover:bg-white/15'
              : 'h-14 w-14 mb-3 bg-white/5 group-hover:bg-white/10 group-hover:scale-110 shadow-inner'
          )}
          style={{
            color: logo.highlightColor || (logo.tier === 'Platinum' ? '#00C4CC' : logo.tier === 'Gold' ? '#C4A2FF' : '#E2E8F0'),
          }}
        >
          {logo.icon}
        </div>

        {/* Sponsor Name */}
        <h4 className="select-none font-bold tracking-tight text-white/90 group-hover:text-white transition-colors text-sm sm:text-base text-center leading-tight">
          {logo.name}
        </h4>
      </div>

      {variant === 'card' && (
        <div className="relative z-10 mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
          <span>Presencia oficial</span>
          <span className="group-hover:translate-x-1 group-hover:text-primary transition-all duration-300">
            →
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function LogoCloudSwap({
  logos,
  title = 'Marcas que impulsan EXPOJUY',
  subtitle = 'Las empresas líderes que hacen posible la exposición más importante del NOA.',
  interval = 4000,
  stagger = 0.08,
  className,
}: LogoCloudSwapProps) {
  const [waving, setWaving] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<'All' | 'Platinum' | 'Gold' | 'Silver'>('All');
  const [viewMode, setViewMode] = React.useState<'card' | 'minimal'>('card');

  // Wave trigger function
  const triggerWave = React.useCallback(() => {
    setWaving(false);
    setTimeout(() => setWaving(true), 20);
  }, []);

  // Interval wave loop
  React.useEffect(() => {
    const id = setInterval(() => {
      setWaving(true);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  // Trigger wave on filter change
  const handleTierChange = (tier: 'All' | 'Platinum' | 'Gold' | 'Silver') => {
    setSelectedTier(tier);
    triggerWave();
  };

  const filteredLogos = React.useMemo(() => {
    if (selectedTier === 'All') return logos;
    return logos.filter((l) => l.tier === selectedTier);
  }, [logos, selectedTier]);

  return (
    <section
      className={cn(
        'relative w-full py-24 px-4 sm:px-6 lg:px-10 overflow-hidden bg-midnight',
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-secondary/25 rounded-full blur-[140px] pointer-events-none" />
      
      {/* 21st.dev subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-semibold tracking-wider text-primary uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Alianzas Estratégicas
          </div>
        </div>

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Controls bar: Tiers filter + Wave trigger & View toggle */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 max-w-5xl mx-auto">
          {/* Tier filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {(['All', 'Platinum', 'Gold', 'Silver'] as const).map((tier) => {
              const isActive = selectedTier === tier;
              const count =
                tier === 'All'
                  ? logos.length
                  : logos.filter((l) => l.tier === tier).length;

              return (
                <button
                  key={tier}
                  onClick={() => handleTierChange(tier)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5',
                    isActive
                      ? 'bg-white text-midnight shadow-md shadow-white/10 font-bold scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-white/5'
                  )}
                >
                  {tier === 'All' ? 'Todos los Sponsors' : tier}
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
                      isActive ? 'bg-midnight/15 text-midnight' : 'bg-white/10 text-white/70'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right side controls: Trigger Wave + View switch */}
          <div className="flex items-center gap-3">
            {/* Trigger wave button */}
            <button
              onClick={triggerWave}
              title="Disparar efecto ola de 21st.dev"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white/80 hover:text-white transition-all duration-200 active:scale-95"
            >
              <span className={cn('w-2 h-2 rounded-full bg-primary', waving && 'animate-ping')} />
              <span>{waving ? 'Efecto ola activo' : 'Repetir ola'}</span>
            </button>

            {/* View mode toggle */}
            <div className="hidden sm:flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-0.5">
              <button
                onClick={() => setViewMode('card')}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  viewMode === 'card'
                    ? 'bg-primary text-midnight font-bold'
                    : 'text-white/60 hover:text-white'
                )}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('minimal')}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  viewMode === 'minimal'
                    ? 'bg-primary text-midnight font-bold'
                    : 'text-white/60 hover:text-white'
                )}
              >
                Cloud 21dev
              </button>
            </div>
          </div>
        </div>

        {/* Logos Container with 21st.dev Wipe Animation */}
        <div className="mx-auto mt-8 max-w-6xl min-h-[300px]">
          <AnimatePresence mode="wait">
            {viewMode === 'minimal' ? (
              <div
                key="minimal"
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-6"
              >
                {filteredLogos.map((logo, i) => (
                  <LogoItem
                    key={logo.id ?? logo.name}
                    logo={logo}
                    index={i}
                    isWaving={waving}
                    stagger={stagger}
                    totalCount={filteredLogos.length}
                    onDone={() => setWaving(false)}
                    variant="minimal"
                  />
                ))}
              </div>
            ) : (
              <div
                key="cards"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-4"
              >
                {filteredLogos.map((logo, i) => (
                  <LogoItem
                    key={logo.id ?? logo.name}
                    logo={logo}
                    index={i}
                    isWaving={waving}
                    stagger={stagger}
                    totalCount={filteredLogos.length}
                    onDone={() => setWaving(false)}
                    variant="card"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action for Sponsors */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:px-8 sm:py-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="text-left">
              <h3 className="text-white font-bold text-base">
                ¿Querés posicionar tu empresa en EXPOJUY 2026?
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                Accedé a paquetes exclusivos de visibilidad, stands preferenciales y rondas B2B.
              </p>
            </div>
            <a
              href="#contacto"
              className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-midnight font-extrabold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Quiero ser sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
