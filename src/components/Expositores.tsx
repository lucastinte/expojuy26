import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Store, Sparkles, Building2 } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import { Marquee } from './ui/marquee';

const benefits = [
  'Visibilidad de marca ante miles de visitantes',
  'Acceso a rondas de negocios internacionales',
  'Networking con líderes de la industria',
  'Espacio personalizado de exhibición',
  'Presencia digital en plataformas oficiales',
  'Certificado de participación oficial',
];

export type Rubro = 'Agro' | 'Minería' | 'Tecnología' | 'Turismo';

export interface Exhibitor {
  name: string;
  rubro: Rubro;
  stand: string;
  categoryDesc: string;
  image: string;
}

const exhibitors: Exhibitor[] = [
  {
    name: 'AgroJujuy S.A.',
    rubro: 'Agro',
    stand: 'A-12',
    categoryDesc: 'Producción & Agroindustria Andina',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Minera Puna',
    rubro: 'Minería',
    stand: 'B-05',
    categoryDesc: 'Litio & Minería Sustentable',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'TechJuy',
    rubro: 'Tecnología',
    stand: 'D-01',
    categoryDesc: 'Software Factory & GovTech',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'AeroJujuy',
    rubro: 'Turismo',
    stand: 'C-02',
    categoryDesc: 'Vuelos & Conectividad Regional',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vinos del Norte',
    rubro: 'Agro',
    stand: 'A-15',
    categoryDesc: 'Bodegas & Vinos de Gran Altura',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Energía Andina',
    rubro: 'Minería',
    stand: 'B-10',
    categoryDesc: 'Parques Solares & Energía Limpia',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Telecom NOA',
    rubro: 'Tecnología',
    stand: 'D-06',
    categoryDesc: 'Redes de Alta Velocidad & 5G',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Hotel Termas',
    rubro: 'Turismo',
    stand: 'C-08',
    categoryDesc: 'Turismo Termal & Hospitalidad',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Frutas del Valle',
    rubro: 'Agro',
    stand: 'A-20',
    categoryDesc: 'Cítricos & Frutihorticultura',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Litio del Norte',
    rubro: 'Minería',
    stand: 'B-18',
    categoryDesc: 'Extracción & Baterías de Litio',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Software del Valle',
    rubro: 'Tecnología',
    stand: 'D-14',
    categoryDesc: 'Inteligencia Artificial & Cloud',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Quebrada Tours',
    rubro: 'Turismo',
    stand: 'C-15',
    categoryDesc: 'Ecoturismo & Paisajes de Altura',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Semillas Puna',
    rubro: 'Agro',
    stand: 'A-28',
    categoryDesc: 'Semillas & Cultivos Andinos',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cementos Puna',
    rubro: 'Minería',
    stand: 'B-22',
    categoryDesc: 'Materiales para Grandes Obras',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Robotica Andina',
    rubro: 'Tecnología',
    stand: 'D-19',
    categoryDesc: 'Automatización & Robótica',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Puna Expediciones',
    rubro: 'Turismo',
    stand: 'C-21',
    categoryDesc: 'Expediciones en Salinas y Puna',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  },
];

const rubros: (Rubro | 'Todos')[] = ['Todos', 'Agro', 'Minería', 'Tecnología', 'Turismo'];

/** Rubros that participate in the auto-cycle (excludes 'Todos') */
const cycleRubros: Rubro[] = ['Agro', 'Minería', 'Tecnología', 'Turismo'];

/** How long (ms) each rubro is shown in the auto-cycle */
const CYCLE_DURATION = 8000;

/** After manual selection, how long (ms) before the auto-cycle resumes */
const RESUME_DELAY = 12000;


const rubroStyles: Record<Rubro, { color: string; badge: string; border: string }> = {
  Agro: {
    color: '#00C4CC',
    badge: 'bg-[#00C4CC]/20 text-[#00C4CC] border-[#00C4CC]/40',
    border: 'group-hover:border-[#00C4CC]/50',
  },
  Minería: {
    color: '#A87CFA',
    badge: 'bg-[#5925A1]/30 text-[#C4A2FF] border-[#7B3FC2]/50',
    border: 'group-hover:border-[#A87CFA]/50',
  },
  Tecnología: {
    color: '#33D4DB',
    badge: 'bg-[#33D4DB]/20 text-[#33D4DB] border-[#33D4DB]/40',
    border: 'group-hover:border-[#33D4DB]/50',
  },
  Turismo: {
    color: '#C4A2FF',
    badge: 'bg-[#C4A2FF]/20 text-[#C4A2FF] border-[#C4A2FF]/40',
    border: 'group-hover:border-[#C4A2FF]/50',
  },
};

const plans = [
  {
    name: 'Stand Bronce',
    price: 'Consultar',
    features: ['Espacio 3x3 m', '1 credencial', 'Inclusión en catálogo', 'Iluminación básica'],
    highlighted: false,
  },
  {
    name: 'Stand Plata',
    price: 'Consultar',
    features: ['Espacio 6x6 m', '4 credenciales', 'Logo en banners', 'Pantalla LED 43"', 'Zona de reuniones'],
    highlighted: true,
  },
  {
    name: 'Stand Oro',
    price: 'Consultar',
    features: ['Espacio 9x9 m', '8 credenciales', 'Branding premium', 'Pantalla LED 65"', 'Stand a medida', 'Ronda VIP'],
    highlighted: false,
  },
];

function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const style = rubroStyles[exhibitor.rubro];

  return (
    <div className="group relative flex w-72 sm:w-80 shrink-0 flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1">
      <div
        className={`relative h-96 w-full overflow-hidden rounded-2xl bg-midnight/90 border border-white/10 ${style.border} shadow-xl transition-all duration-300`}
      >
        {/* Background Image with grayscale on hover */}
        <img
          alt={exhibitor.name}
          src={exhibitor.image}
          loading="lazy"
          className="h-full w-full object-cover grayscale brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${style.badge}`}
          >
            {exhibitor.rubro}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-semibold">
            Stand {exhibitor.stand}
          </span>
        </div>

        {/* Bottom Card details */}
        <div className="absolute bottom-0 inset-x-0 p-4 m-2 rounded-xl bg-midnight/85 backdrop-blur-xl border border-white/10 group-hover:border-white/25 transition-colors">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base text-white truncate group-hover:text-primary transition-colors">
              {exhibitor.name}
            </h3>
            <span className="text-primary text-sm shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              →
            </span>
          </div>
          <p className="text-white/60 text-xs mt-1 truncate">
            {exhibitor.categoryDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Expositores() {
  // 'Todos' means full dual-row marquee; a Rubro means single filtered marquee
  const [activeRubro, setActiveRubro] = useState<Rubro | 'Todos'>('Agro');

  // Track whether we are in auto-cycle mode or manual override
  const [isCycling, setIsCycling] = useState(true);

  // Cycle index (only used when isCycling === true)
  const [cycleIndex, setCycleIndex] = useState(0);

  // Ref for the resume-after-manual timer
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref for the auto-cycle interval
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Auto-cycle effect ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isCycling || activeRubro === 'Todos') return;

    cycleTimerRef.current = setInterval(() => {
      setCycleIndex((prev) => {
        const next = (prev + 1) % cycleRubros.length;
        setActiveRubro(cycleRubros[next]);
        return next;
      });
    }, CYCLE_DURATION);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    };
  }, [isCycling, activeRubro === 'Todos']);

  // ─── Manual selection handler ─────────────────────────────────────────────
  const handleManualSelect = useCallback((rubro: Rubro | 'Todos') => {
    // Stop auto-cycle
    setIsCycling(false);
    if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    setActiveRubro(rubro);

    // If 'Todos' is chosen, do not resume auto-cycle until user picks something else
    if (rubro === 'Todos') return;

    // Update cycle index so the resume starts from the right position
    const idx = cycleRubros.indexOf(rubro);
    if (idx !== -1) setCycleIndex(idx);

    // Schedule resume
    resumeTimerRef.current = setTimeout(() => {
      setIsCycling(true);
    }, RESUME_DELAY);
  }, []);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // ─── Derived lists ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (activeRubro === 'Todos') return exhibitors;
    return exhibitors.filter((ex) => ex.rubro === activeRubro);
  }, [activeRubro]);

  const row1 = useMemo(() => filtered.slice(0, Math.ceil(filtered.length / 2)), [filtered]);
  const row2 = useMemo(() => filtered.slice(Math.ceil(filtered.length / 2)), [filtered]);

  return (
    <section id="expositores" className="relative py-28 px-4 sm:px-6 lg:px-10 bg-midnight overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-12 max-w-3xl mx-auto">
          {/* Top category badge - centered on its own line */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
              <Store className="w-4 h-4" />
              Directorio de Expositores
            </span>
          </div>

          {/* Clean Main Title */}
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Marcas &amp; Expositores <span className="text-gradient-cyan">2026</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            Descubrí las empresas que formarán parte de la edición 2026. Deslizá sobre las tarjetas
            o pausá el cursor para explorar cada stand.
          </p>
        </Reveal>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {rubros.map((rubro) => {
            const isActive = activeRubro === rubro;
            const count =
              rubro === 'Todos'
                ? exhibitors.length
                : exhibitors.filter((e) => e.rubro === rubro).length;

            return (
              <button
                key={rubro}
                onClick={() => handleManualSelect(rubro)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${isActive
                  ? 'bg-white text-midnight border-white shadow-lg shadow-white/10 scale-105'
                  : 'glass-dark text-white/60 border-white/10 hover:text-white hover:border-white/30'
                  }`}
              >
                <span>{rubro === 'Todos' ? 'Todos los rubros' : rubro}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-midnight/15 text-midnight' : 'bg-white/10 text-white/70'
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-cycle progress indicator (hidden when Todos or manual/static) */}
        {activeRubro !== 'Todos' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {cycleRubros.map((rubro, i) => {
              const isThis = activeRubro === rubro;
              const style = rubroStyles[rubro];
              return (
                <button
                  key={rubro}
                  onClick={() => handleManualSelect(rubro)}
                  title={rubro}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  {/* Dot */}
                  <motion.div
                    animate={{
                      scale: isThis ? 1 : 0.7,
                      opacity: isThis ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: isThis ? style.color : '#ffffff40' }}
                  />
                  {/* Label */}
                  <motion.span
                    animate={{ opacity: isThis ? 1 : 0.35 }}
                    className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: isThis ? style.color : 'rgba(255,255,255,0.4)' }}
                  >
                    {rubro}
                  </motion.span>
                  {/* Progress bar */}
                  {isThis && isCycling && (
                    <motion.div
                      className="h-0.5 rounded-full overflow-hidden"
                      style={{ width: 48, backgroundColor: `${style.color}30` }}
                    >
                      <motion.div
                        key={`progress-${rubro}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: CYCLE_DURATION / 1000, ease: 'linear' }}
                        style={{ height: '100%', backgroundColor: style.color }}
                      />
                    </motion.div>
                  )}
                  {isThis && !isCycling && (
                    <div
                      className="h-0.5 rounded-full"
                      style={{ width: 48, backgroundColor: style.color }}
                    />
                  )}
                  {!isThis && (
                    <div className="h-0.5 rounded-full" style={{ width: 48, backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  )}
                </button>
              );
            })}

            {/* Resume indicator */}
            {!isCycling && (
              <span className="ml-4 text-[10px] text-white/30 font-medium italic">
                auto-ciclo pausado
              </span>
            )}
          </div>
        )}

        {/* Marquee Showcase with Fade Gradients */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right gradient fades seamlessly into midnight */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 sm:w-36 bg-gradient-to-r from-midnight via-midnight/80 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 sm:w-36 bg-gradient-to-l from-midnight via-midnight/80 to-transparent" />

          <AnimatePresence mode="wait">
            {activeRubro === 'Todos' ? (
              /* Dual-row marquee for all exhibitors */
              <motion.div
                key="todos"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                {/* Row 1 - Left to right */}
                <Marquee className="[--gap:1.5rem] [--duration:45s]" pauseOnHover>
                  {row1.map((exhibitor) => (
                    <ExhibitorCard key={exhibitor.name} exhibitor={exhibitor} />
                  ))}
                </Marquee>

                {/* Row 2 - Reverse */}
                <Marquee className="[--gap:1.5rem] [--duration:45s]" reverse pauseOnHover>
                  {row2.map((exhibitor) => (
                    <ExhibitorCard key={exhibitor.name} exhibitor={exhibitor} />
                  ))}
                </Marquee>
              </motion.div>
            ) : (
              /* Single marquee for active rubro */
              <motion.div
                key={activeRubro}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <Marquee className="[--gap:1.5rem] [--duration:30s]" pauseOnHover>
                  {filtered.map((exhibitor) => (
                    <ExhibitorCard key={exhibitor.name} exhibitor={exhibitor} />
                  ))}
                </Marquee>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 21st.dev Testimonial / Highlight Quote */}
        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <div className="p-8 sm:p-10 rounded-3xl glass-dark border border-white/10 shadow-2xl relative">
            <Sparkles className="w-6 h-6 text-primary absolute top-6 right-6 opacity-60" />
            <p className="mb-8 font-medium text-lg sm:text-xl text-white/90 leading-relaxed italic">
              "Estar en EXPOJUY significó un salto cuantitativo para nuestros acuerdos comerciales.
              En solo 4 días mantuvimos más de 50 reuniones B2B y cerramos alianzas estratégicas para
              todo el Norte Grande."
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/40 shadow-lg">
                <img
                  alt="Ing. Roberto Morales"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-base">
                  Ing. Roberto Morales
                </p>
                <p className="text-primary text-xs sm:text-sm font-medium">
                  Director Comercial · Energía Andina / Expositor Oficial
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Exhibit / Commercial Section */}
        <div className="mt-28">
          <Reveal direction="up" className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
              Sumate como expositor
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Beneficios para tu empresa
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto">
              Potenciá tu visibilidad y generá conexiones estratégicas con los principales actores del sector.
            </p>
          </Reveal>

          {/* Benefits grid */}
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20" stagger={0.08}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit} direction="up">
                <div className="flex items-center gap-3 p-4 rounded-xl glass-dark border border-white/10 hover:border-primary/30 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{benefit}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Plans Section */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">
              Opciones de Stands
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Elegí el espacio para tu marca
            </h3>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
            {plans.map((plan) => (
              <StaggerItem key={plan.name} direction="up">
                <div
                  className={`relative h-full rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                    ? 'bg-gradient-to-b from-primary/20 to-transparent border-2 border-primary/50 shadow-2xl shadow-primary/20'
                    : 'glass-dark border border-white/10 hover:border-accent/30'
                    }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-midnight text-xs font-extrabold uppercase tracking-wide shadow-lg shadow-primary/40">
                      Más elegido
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-3xl font-black text-primary mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#acreditarse"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${plan.highlighted
                      ? 'bg-primary text-midnight hover:bg-primary-light shadow-lg shadow-primary/30 font-extrabold'
                      : 'border border-white/20 text-white hover:border-primary hover:text-primary'
                      }`}
                  >
                    Quiero exponer
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

