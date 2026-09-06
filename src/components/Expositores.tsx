import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Store, Sparkles } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

function ExhibitorCard({ exhibitor }: { exhibitor: Exhibitor }) {
  const style = rubroStyles[exhibitor.rubro];
  const isGov = exhibitor.entityType === 'Gobierno';

  return (
    <div className="group relative flex w-[275px] sm:w-[320px] shrink-0 flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5 select-none">
      <div
        className={`relative h-[410px] sm:h-[440px] w-full overflow-hidden rounded-2xl bg-midnight/90 border border-white/15 ${style.border} shadow-2xl transition-all duration-300 group-hover:shadow-[0_12px_30px_rgba(0,196,204,0.15)]`}
      >
        {/* Background Image with grayscale on hover */}
        <img
          alt={exhibitor.name}
          src={exhibitor.image}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80';
          }}
          className="h-full w-full object-cover grayscale brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${style.badge}`}
            >
              {exhibitor.rubro}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md border ${
                isGov
                  ? 'bg-[#A87CFA]/25 text-[#C4A2FF] border-[#A87CFA]/40'
                  : 'bg-[#00C4CC]/20 text-[#33D4DB] border-[#00C4CC]/40'
              }`}
            >
              {exhibitor.entityType}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-midnight/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-semibold shrink-0">
            Stand {exhibitor.stand}
          </span>
        </div>

        {/* Bottom Card details - Person Representative & Entity */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 m-2 sm:m-2.5 rounded-2xl bg-midnight/90 backdrop-blur-xl border border-white/15 group-hover:border-[#00C4CC]/40 transition-all">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-white truncate group-hover:text-primary transition-colors">
              {exhibitor.name}
            </h3>
            <span className="text-primary text-sm shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              →
            </span>
          </div>

          {/* Role and Entity */}
          <div className="mt-1 flex flex-col">
            <span className="text-xs font-semibold text-primary truncate">
              {exhibitor.role}
            </span>
            <span className="text-xs font-medium text-white/80 truncate">
              {exhibitor.entity}
            </span>
          </div>

          {/* Stand presentation description */}
          <p className="text-white/60 text-xs mt-2 line-clamp-2 leading-relaxed">
            {exhibitor.categoryDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

function InteractiveExhibitorCarousel({ items }: { items: Exhibitor[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const pauseAutoScrollRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoScroll = useCallback(() => {
    pauseAutoScrollRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pauseAutoScrollRef.current = false;
    }, 6000);
  }, []);

  // Gentle auto-scroll when idle
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!pauseAutoScrollRef.current && scrollRef.current && !isMouseDown) {
        const el = scrollRef.current;
        el.scrollLeft += delta * 0.035;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isMouseDown]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    pauseAutoScroll();
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    pauseAutoScroll();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  // Duplicate items so that there's always plenty of cards to swipe freely
  const carouselItems = useMemo(() => {
    if (items.length <= 4) {
      return [...items, ...items, ...items];
    }
    return [...items, ...items];
  }, [items]);

  return (
    <div className="relative w-full">
      {/* Outer scroll track */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle gradient edge masks on mobile so cards are completely clear */}
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-4 sm:w-20 bg-gradient-to-r from-midnight via-midnight/60 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-4 sm:w-20 bg-gradient-to-l from-midnight via-midnight/60 to-transparent" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={pauseAutoScroll}
          className={`flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-2 sm:px-6 select-none touch-pan-x cursor-grab [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isMouseDown ? 'cursor-grabbing' : ''
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {carouselItems.map((exhibitor, idx) => (
            <ExhibitorCard key={`${exhibitor.name}-${idx}`} exhibitor={exhibitor} />
          ))}
        </div>
      </div>
    </div>
  );
}

const benefits = [
  'Visibilidad de marca ante miles de visitantes',
  'Acceso a rondas de negocios internacionales',
  'Networking con líderes de la industria',
  'Espacio personalizado de exhibición',
  'Presencia digital en plataformas oficiales',
  'Certificado de participación oficial',
];

export type Rubro = 'Agro' | 'Minería' | 'Tecnología' | 'Turismo';
export type SectorType = 'Empresa' | 'Gobierno';

export interface Exhibitor {
  name: string;             // Nombre del representante (persona)
  role: string;             // Cargo o función
  entity: string;           // Empresa o entidad gubernamental
  entityType: SectorType;   // 'Empresa' | 'Gobierno'
  rubro: Rubro;
  stand: string;
  categoryDesc: string;     // Propuesta o descripción de la presentación
  image: string;
}

const exhibitors: Exhibitor[] = [
  // ─── AGRO ───────────────────────────────────────────────────────────────
  {
    name: 'Ing. Carlos Morales',
    role: 'Director de Producción Andina',
    entity: 'AgroJujuy S.A.',
    entityType: 'Empresa',
    rubro: 'Agro',
    stand: 'A-12',
    categoryDesc: 'Biotecnología en cultivos de altura y tecnificación de riego por goteo.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lic. Sofía Calvetti',
    role: 'Secretaria de Desarrollo Productivo',
    entity: 'Min. de Desarrollo Económico y Producción',
    entityType: 'Gobierno',
    rubro: 'Agro',
    stand: 'A-15',
    categoryDesc: 'Fomento a cooperativas agrícolas y financiamiento para bodegas de altura.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ing. Fernando Zamar',
    role: 'Gerente General de Operaciones',
    entity: 'Frutas del Valle & Cooperativas NOA',
    entityType: 'Empresa',
    rubro: 'Agro',
    stand: 'A-20',
    categoryDesc: 'Cadena de frío y exportación de cítricos y hortalizas a mercados globales.',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dr. Marcelo Echenique',
    role: 'Coordinador de Investigación Genética',
    entity: 'INTA Jujuy & Semillas Andinas',
    entityType: 'Gobierno',
    rubro: 'Agro',
    stand: 'A-28',
    categoryDesc: 'Rescate genético de quínoa, maíces nativos y cultivares resistentes a sequía.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
  },

  // ─── MINERÍA ────────────────────────────────────────────────────────────
  {
    name: 'Dra. Lucía Valenzuela',
    role: 'Gerente de Sustentabilidad y Ambiente',
    entity: 'Minera Puna & Litio S.A.',
    entityType: 'Empresa',
    rubro: 'Minería',
    stand: 'B-05',
    categoryDesc: 'Extracción responsable de litio y programas de desarrollo comunitario.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ing. Martín Guemes',
    role: 'Secretario de Minería e Hidrocarburos',
    entity: 'Gobierno de la Provincia de Jujuy',
    entityType: 'Gobierno',
    rubro: 'Minería',
    stand: 'B-10',
    categoryDesc: 'Régimen de promoción minera, sustentabilidad ambiental y mapa geológico 2026.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ing. Gastón Carrillo',
    role: 'VP de Industrialización y Energía',
    entity: 'Litio del Norte Corp.',
    entityType: 'Empresa',
    rubro: 'Minería',
    stand: 'B-18',
    categoryDesc: 'Fabricación local de celdas de litio y almacenamiento para microrredes solares.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lic. Daniela Aramayo',
    role: 'Directora de Obras & Infraestructura',
    entity: 'Cementos Puna Industrial',
    entityType: 'Empresa',
    rubro: 'Minería',
    stand: 'B-22',
    categoryDesc: 'Soluciones en hormigón de alta resistencia para campamentos y rutas mineras.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  },

  // ─── TECNOLOGÍA ─────────────────────────────────────────────────────────
  {
    name: 'Ing. Lucas Benítez',
    role: 'Secretario de Modernización del Estado',
    entity: 'Gobierno de Jujuy - GovTech',
    entityType: 'Gobierno',
    rubro: 'Tecnología',
    stand: 'D-01',
    categoryDesc: 'Plataforma digital unificada, identidad ciudadana y servicios públicos online.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lic. Ramiro Saravia',
    role: 'Director de Conectividad y Redes 5G',
    entity: 'Telecom NOA Solutions',
    entityType: 'Empresa',
    rubro: 'Tecnología',
    stand: 'D-06',
    categoryDesc: 'Despliegue de fibra óptica en alta montaña y enlaces satelitales corporativos.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Dra. Florencia Luque',
    role: 'Directora del Polo Tecnológico Jujuy',
    entity: 'Agencia de Ciencia y Tecnología',
    entityType: 'Gobierno',
    rubro: 'Tecnología',
    stand: 'D-14',
    categoryDesc: 'Incubación de startups jujeñas, talento tech y modelos de IA aplicada.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Ing. Gabriel Alurralde',
    role: 'Fundador & CTO',
    entity: 'Robótica Andina & Telemetría',
    entityType: 'Empresa',
    rubro: 'Tecnología',
    stand: 'D-19',
    categoryDesc: 'Vehículos no tripulados e inspección automatizada para la industria del NOA.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  },

  // ─── TURISMO ────────────────────────────────────────────────────────────
  {
    name: 'Lic. Mariana Tejerina',
    role: 'Ministra de Cultura y Turismo',
    entity: 'Gobierno de la Provincia de Jujuy',
    entityType: 'Gobierno',
    rubro: 'Turismo',
    stand: 'C-02',
    categoryDesc: 'Estrategia Tren Solar de la Quebrada, conectividad aérea e identidad jujeña.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lic. Patricia Snopek',
    role: 'Presidenta de la Cámara Hotelera',
    entity: 'Hotel Termas de Reyes & Resorts',
    entityType: 'Empresa',
    rubro: 'Turismo',
    stand: 'C-08',
    categoryDesc: 'Turismo de bienestar termal, hotelería boutique y turismo de congresos.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Guía Javier Mamaní',
    role: 'Director de Turismo Comunitario',
    entity: 'Quebrada Tours & Experiencias',
    entityType: 'Empresa',
    rubro: 'Turismo',
    stand: 'C-15',
    categoryDesc: 'Rutas vivenciales en comunidades de Purmamarca, Tilcara y Hornocal.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lic. Valeria Ramos',
    role: 'Coordinadora del Ente Norte Turismo',
    entity: 'Secretaría de Promoción Turística',
    entityType: 'Gobierno',
    rubro: 'Turismo',
    stand: 'C-21',
    categoryDesc: 'Promoción turística integrada del Corredor Bioceánico y Salinas Grandes.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  },
];

const rubros: Rubro[] = ['Agro', 'Minería', 'Tecnología', 'Turismo'];

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
            Conocé a los líderes del sector productivo, empresarial y gubernamental que representan el desarrollo de la región.
          </p>
        </Reveal>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {rubros.map((rubro) => {
            const isActive = activeRubro === rubro;
            const count = exhibitors.filter((e) => e.rubro === rubro).length;

            return (
              <button
                key={rubro}
                onClick={() => handleManualSelect(rubro)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${isActive
                  ? 'bg-white text-midnight border-white shadow-lg shadow-white/10 scale-105'
                  : 'glass-dark text-white/60 border-white/10 hover:text-white hover:border-white/30'
                  }`}
              >
                <span>{rubro}</span>
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
          </div>
        )}

        {/* Interactive Carousel with Speed Navigation and Touch Swipe */}
        <div className="relative w-full py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRubro}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <InteractiveExhibitorCarousel items={filtered} />
            </motion.div>
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

