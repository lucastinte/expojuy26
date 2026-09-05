import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const benefits = [
  'Visibilidad de marca ante miles de visitantes',
  'Acceso a rondas de negocios internacionales',
  'Networking con líderes de la industria',
  'Espacio personalizado de exhibición',
  'Presencia digital en plataformas oficiales',
  'Certificado de participación oficial',
];

type Rubro = 'Agro' | 'Minería' | 'Tecnología' | 'Turismo';

const exhibitors: { name: string; rubro: Rubro; stand: string }[] = [
  { name: 'AgroJujuy S.A.', rubro: 'Agro', stand: 'A-12' },
  { name: 'Vinos del Norte', rubro: 'Agro', stand: 'A-15' },
  { name: 'Frutas del Valle', rubro: 'Agro', stand: 'A-20' },
  { name: 'Semillas Puna', rubro: 'Agro', stand: 'A-28' },
  { name: 'Minera Puna', rubro: 'Minería', stand: 'B-05' },
  { name: 'Energía Andina', rubro: 'Minería', stand: 'B-10' },
  { name: 'Litio del Norte', rubro: 'Minería', stand: 'B-18' },
  { name: 'Cementos Puna', rubro: 'Minería', stand: 'B-22' },
  { name: 'TechJuy', rubro: 'Tecnología', stand: 'D-01' },
  { name: 'Telecom NOA', rubro: 'Tecnología', stand: 'D-06' },
  { name: 'Software del Valle', rubro: 'Tecnología', stand: 'D-14' },
  { name: 'Robotica Andina', rubro: 'Tecnología', stand: 'D-19' },
  { name: 'AeroJujuy', rubro: 'Turismo', stand: 'C-02' },
  { name: 'Hotel Termas', rubro: 'Turismo', stand: 'C-08' },
  { name: 'Quebrada Tours', rubro: 'Turismo', stand: 'C-15' },
  { name: 'Puna Expediciones', rubro: 'Turismo', stand: 'C-21' },
];

const rubros: (Rubro | 'Todos')[] = ['Todos', 'Agro', 'Minería', 'Tecnología', 'Turismo'];

const rubroColors: Record<Rubro, string> = {
  'Agro': '#00C4CC',
  'Minería': '#5925A1',
  'Tecnología': '#A87CFA',
  'Turismo': '#33D4DB',
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
  const [search, setSearch] = useState('');
  const [activeRubro, setActiveRubro] = useState<Rubro | 'Todos'>('Todos');

  const filtered = useMemo(() => {
    return exhibitors.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchesRubro = activeRubro === 'Todos' || ex.rubro === activeRubro;
      return matchesSearch && matchesRubro;
    });
  }, [search, activeRubro]);

  return (
    <section id="expositores" className="relative py-28 px-6 lg:px-10 bg-midnight overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Expositores
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Formá parte de la exposición
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            Sumate a la exposición de negocios más influyente del NOA y conectá
            tu marca con el mundo.
          </p>
        </Reveal>

        {/* Benefits grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20" stagger={0.1}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit} direction="up">
              <div className="flex items-center gap-3 p-4 rounded-xl glass-dark border border-white/10 hover:border-primary/30 transition-colors duration-300">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/80 text-sm font-medium">{benefit}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Search & Filter bar */}
        <Reveal direction="up" className="mb-10">
          <div className="flex flex-col gap-5">
            {/* Section label */}
            <div className="flex items-center gap-2 text-white/50">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold uppercase tracking-[0.15em]">
                Directorio de expositores
              </span>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar expositor por nombre..."
                className="w-full pl-12 pr-12 py-4 rounded-xl glass-dark border border-white/10 text-white text-sm font-medium placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3">
              {rubros.map((rubro) => {
                const isActive = activeRubro === rubro;
                const color = rubro === 'Todos' ? '#00C4CC' : rubroColors[rubro as Rubro];
                return (
                  <button
                    key={rubro}
                    onClick={() => setActiveRubro(rubro)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'glass-dark text-white/60 border-white/10 hover:text-white hover:border-white/30'
                    }`}
                    style={isActive ? {
                      backgroundColor: color,
                      borderColor: color,
                      boxShadow: `0 8px 24px ${color}40`,
                    } : undefined}
                  >
                    {rubro}
                  </button>
                );
              })}
            </div>

            {/* Results count */}
            <p className="text-sm text-white/40 font-medium">
              {filtered.length} {filtered.length === 1 ? 'expositor' : 'expositores'} encontrados
            </p>
          </div>
        </Reveal>

        {/* Exhibitor directory */}
        <div className="mb-20">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <AnimatePresence>
                  {filtered.map((ex) => (
                    <motion.div
                      key={ex.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-5 rounded-xl glass-dark border border-white/10 hover:border-primary/30 transition-colors duration-300"
                    >
                      <div
                        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm"
                        style={{ backgroundColor: `${rubroColors[ex.rubro]}30`, color: rubroColors[ex.rubro] }}
                      >
                        {ex.rubro.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm truncate">{ex.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide"
                            style={{ backgroundColor: `${rubroColors[ex.rubro]}20`, color: rubroColors[ex.rubro] }}
                          >
                            {ex.rubro}
                          </span>
                          <span className="text-white/40 text-xs font-medium">Stand {ex.stand}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <Search className="w-10 h-10 text-white/20 mb-4" />
                <p className="text-white/50 text-sm font-medium">
                  No se encontraron expositores con esos criterios.
                </p>
                <button
                  onClick={() => { setSearch(''); setActiveRubro('Todos'); }}
                  className="mt-4 text-primary text-sm font-bold hover:text-primary-light transition-colors"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Plans */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name} direction="up">
              <div
                className={`relative h-full rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary/20 to-transparent border-2 border-primary/50 shadow-2xl shadow-primary/20'
                    : 'glass-dark border border-white/10 hover:border-accent/30'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide shadow-lg shadow-primary/40">
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
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/30'
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
    </section>
  );
}
