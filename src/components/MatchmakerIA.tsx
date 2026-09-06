import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Compass, MapPin, CheckCircle2, ArrowRight, Clock } from 'lucide-react';

interface RecommendedStand {
  id: string;
  name: string;
  category: string;
  stand: string;
  pavilions: string;
  matchScore: number;
  timeSlot: string;
  reason: string;
}

const TAG_OPTIONS = ['Agro', 'Tecnología', 'Inversores', 'Visita Rápida'] as const;

const MOCK_RECOMMENDATIONS: Record<string, RecommendedStand[]> = {
  default: [
    {
      id: '1',
      name: 'AgroJujuy Tech',
      category: 'Agro & Bioindustria',
      stand: 'A-12',
      pavilions: 'Pabellón Agroindustrial',
      matchScore: 98,
      timeSlot: '10:30 hs',
      reason: 'Innovación en riego inteligente y maquinaria de precisión.',
    },
    {
      id: '2',
      name: 'Puna Lithium & Energy',
      category: 'Tecnología & Minería',
      stand: 'B-05',
      pavilions: 'Nave Central de Tecnología',
      matchScore: 95,
      timeSlot: '11:45 hs',
      reason: 'Sistemas de almacenamiento solar y transición energética.',
    },
    {
      id: '3',
      name: 'Andes Venture Capital',
      category: 'Inversiones & Negocios',
      stand: 'C-18',
      pavilions: 'Espacio B2B Internacional',
      matchScore: 92,
      timeSlot: '14:15 hs',
      reason: 'Rondas de financiamiento y networking con fondos regionales.',
    },
  ],
  Agro: [
    {
      id: 'a1',
      name: 'AgroJujuy Tech',
      category: 'Agroindustria Sustentable',
      stand: 'A-12',
      pavilions: 'Pabellón Agroindustrial',
      matchScore: 99,
      timeSlot: '10:00 hs',
      reason: 'Líder en tecnología satelital para cultivos andinos.',
    },
    {
      id: 'a2',
      name: 'Fertirriego del Norte',
      category: 'Maquinaria & Riego',
      stand: 'A-24',
      pavilions: 'Pabellón Agroindustrial',
      matchScore: 94,
      timeSlot: '11:15 hs',
      reason: 'Automatización hídrica para producción intensiva.',
    },
    {
      id: 'a3',
      name: 'BioValle Andino',
      category: 'Alimentos con Valor Agregado',
      stand: 'A-08',
      pavilions: 'Sector Productores',
      matchScore: 91,
      timeSlot: '12:30 hs',
      reason: 'Certificaciones orgánicas y exportación regional.',
    },
  ],
  Tecnología: [
    {
      id: 't1',
      name: 'Puna Lithium & Energy',
      category: 'Energías Renovables',
      stand: 'B-05',
      pavilions: 'Nave Tecnológica',
      matchScore: 99,
      timeSlot: '10:30 hs',
      reason: 'Baterías de litio de última generación fabricadas en Jujuy.',
    },
    {
      id: 't2',
      name: 'Jujuy Cloud & AI Labs',
      category: 'Software & Inteligencia Artificial',
      stand: 'B-14',
      pavilions: 'Nave Tecnológica',
      matchScore: 96,
      timeSlot: '11:45 hs',
      reason: 'Modelos predictivos para logística y cadena de suministro.',
    },
    {
      id: 't3',
      name: 'DroneScan NOA',
      category: 'Robótica & Automatización',
      stand: 'B-22',
      pavilions: 'Nave Tecnológica',
      matchScore: 93,
      timeSlot: '13:00 hs',
      reason: 'Monitoreo aéreo térmico para infraestructura e industria.',
    },
  ],
  Inversores: [
    {
      id: 'i1',
      name: 'Andes Venture Capital',
      category: 'Fondos de Capital Privado',
      stand: 'C-18',
      pavilions: 'Espacio B2B Internacional',
      matchScore: 98,
      timeSlot: '11:00 hs',
      reason: 'Portafolio activo de inversiones en economía del conocimiento.',
    },
    {
      id: 'i2',
      name: 'Banco de Desarrollo Regional',
      category: 'Financiamiento Productivo',
      stand: 'C-04',
      pavilions: 'Espacio B2B Internacional',
      matchScore: 95,
      timeSlot: '12:15 hs',
      reason: 'Líneas de crédito subsidiadas para exportadores jujeños.',
    },
    {
      id: 'i3',
      name: 'Trade Hub Corredor Bioceánico',
      category: 'Comercio Exterior',
      stand: 'C-10',
      pavilions: 'Espacio B2B Internacional',
      matchScore: 92,
      timeSlot: '15:00 hs',
      reason: 'Oportunidades de integración logística con Chile y Brasil.',
    },
  ],
  'Visita Rápida': [
    {
      id: 'v1',
      name: 'Stand Oficial Gobierno de Jujuy',
      category: 'Punto de Partida & Bienvenida',
      stand: 'A-01',
      pavilions: 'Acceso Central',
      matchScore: 99,
      timeSlot: '10:00 hs',
      reason: 'Visión general de la matriz productiva y planos interactivos.',
    },
    {
      id: 'v2',
      name: 'Plaza de la Innovación 360°',
      category: 'Showcase Dinámico',
      stand: 'B-10',
      pavilions: 'Nave Central',
      matchScore: 96,
      timeSlot: '10:45 hs',
      reason: 'Muestras inmersivas y prototipos destacados en un solo punto.',
    },
    {
      id: 'v3',
      name: 'Espacio Sabores de Jujuy',
      category: 'Gastronomía & Cultura',
      stand: 'G-05',
      pavilions: 'Patio Gastronómico',
      matchScore: 94,
      timeSlot: '11:30 hs',
      reason: 'Cata guiada rápida de productos típicos y descanso.',
    },
  ],
};

export default function MatchmakerIA() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedStand[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      if (!searchQuery) {
        setSearchQuery(`Interés en ${tag}`);
      }
    }
  };

  const handleGenerateRoute = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      let results = MOCK_RECOMMENDATIONS.default;
      if (selectedTag && MOCK_RECOMMENDATIONS[selectedTag]) {
        results = MOCK_RECOMMENDATIONS[selectedTag];
      } else if (searchQuery.toLowerCase().includes('agro')) {
        results = MOCK_RECOMMENDATIONS.Agro;
      } else if (searchQuery.toLowerCase().includes('tec') || searchQuery.toLowerCase().includes('ia')) {
        results = MOCK_RECOMMENDATIONS.Tecnología;
      } else if (searchQuery.toLowerCase().includes('inver') || searchQuery.toLowerCase().includes('plata')) {
        results = MOCK_RECOMMENDATIONS.Inversores;
      } else if (searchQuery.toLowerCase().includes('ráp') || searchQuery.toLowerCase().includes('rap')) {
        results = MOCK_RECOMMENDATIONS['Visita Rápida'];
      }

      setRecommendations(results);
      setIsGenerating(false);
      setHasGenerated(true);
    }, 450);
  };

  return (
    <section id="matchmaker-ia" className="relative py-20 px-4 sm:px-6 lg:px-10 bg-white overflow-hidden scroll-mt-24">
      {/* Decorative subtle background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A87CFA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00C4CC]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Card Container */}
        <div
          className="relative rounded-3xl p-6 sm:p-10 lg:p-12 text-white overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: '#1A0B2E',
            boxShadow: '0 0 50px -10px rgba(168, 124, 250, 0.35), 0 20px 40px -15px rgba(26, 11, 46, 0.7)',
            border: '1px solid rgba(168, 124, 250, 0.4)',
          }}
        >
          {/* Subtle inner gradient glows */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, #A87CFA 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, #00C4CC 0%, transparent 70%)' }}
          />

          {/* Header section */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A87CFA]/15 border border-[#A87CFA]/30 text-[#A87CFA] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#00C4CC] animate-pulse" />
              <span>Matchmaker con Inteligencia Artificial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Descubrí tu recorrido ideal con IA
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-gray-300/90 leading-relaxed max-w-2xl mx-auto">
              Ingresá lo que buscás o seleccioná un perfil temático. Nuestra IA organizará las paradas más estratégicas para que aproveches al máximo tu visita.
            </p>
          </div>

          {/* Form & Tag Elements */}
          <form onSubmit={handleGenerateRoute} className="relative z-10 max-w-2xl mx-auto">
            {/* Search Input Bar */}
            <div className="relative mb-5 group">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#00C4CC] transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué te interesa ver? (ej. litio, energías limpias, maquinaria, startups...)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-400 text-sm sm:text-base outline-none focus:border-[#00C4CC] focus:ring-2 focus:ring-[#00C4CC]/30 backdrop-blur-md transition-all shadow-inner"
              />
            </div>

            {/* 4 Tag Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-medium mr-1 hidden sm:inline-block">
                Sugerencias:
              </span>
              {TAG_OPTIONS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#A87CFA] text-white border-[#A87CFA] shadow-[0_0_15px_rgba(168,124,250,0.5)] scale-105'
                        : 'bg-white/5 border-white/15 text-gray-300 hover:text-white hover:border-[#A87CFA] hover:bg-[#A87CFA]/20 hover:shadow-[0_0_12px_rgba(168,124,250,0.35)]'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>

            {/* Action Button: Vibrant Cyan (#00C4CC) */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isGenerating}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base tracking-wide text-[#1A0B2E] transition-all duration-300 cursor-pointer shadow-lg active:scale-95 disabled:opacity-75"
                style={{
                  backgroundColor: '#00C4CC',
                  boxShadow: '0 0 25px rgba(0, 196, 204, 0.45)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 196, 204, 0.75)';
                  e.currentTarget.style.backgroundColor = '#33D4DB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 196, 204, 0.45)';
                  e.currentTarget.style.backgroundColor = '#00C4CC';
                }}
              >
                {isGenerating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-[#1A0B2E] border-t-transparent rounded-full animate-spin" />
                    <span>Calculando ruta óptima...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
                    <span>Generar mi ruta</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Result Simulation: Framer Motion slide-down container */}
          <AnimatePresence>
            {hasGenerated && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 mt-10 pt-8 border-t border-white/10"
              >
                {/* Result header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C4CC] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00C4CC]" />
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Stands Recomendados
                    </h3>
                  </div>

                  <span className="text-xs sm:text-sm font-medium text-[#A87CFA] bg-[#A87CFA]/10 border border-[#A87CFA]/20 px-3 py-1 rounded-full">
                    3 paradas sugeridas • Tiempo est.: 2h 30m
                  </span>
                </div>

                {/* 3 Small Recommendation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {recommendations.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="group/card relative rounded-2xl p-5 bg-white/[0.04] border border-white/10 hover:border-[#A87CFA]/50 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                    >
                      {/* Top badge row */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#00C4CC]/20 text-[#00C4CC] border border-[#00C4CC]/30">
                            <MapPin className="w-3 h-3" />
                            Stand {item.stand}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.matchScore}% Match
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white group-hover/card:text-[#00C4CC] transition-colors mb-1">
                          {item.name}
                        </h4>

                        <p className="text-xs text-[#A87CFA] font-medium mb-2.5">
                          {item.category}
                        </p>

                        <p className="text-xs text-gray-300/80 leading-relaxed mb-4">
                          {item.reason}
                        </p>
                      </div>

                      {/* Card footer details */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#00C4CC]" />
                          {item.timeSlot}
                        </span>
                        <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
                          {item.pavilions}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
