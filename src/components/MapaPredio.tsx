import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, X, Store, UtensilsCrossed, Info, Wifi, Car, Maximize2 } from 'lucide-react';
import { Reveal } from './Reveal';

type Pavilion = {
  id: string;
  label: string;
  category: string;
  icon: typeof Store;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  exhibitors: number;
};

const pavilions: Pavilion[] = [
  { id: 'A', label: 'Pabellón A', category: 'Negocios', icon: Store, x: 4, y: 8, w: 34, h: 30, color: '#00C4CC', exhibitors: 120 },
  { id: 'B', label: 'Pabellón B', category: 'Industria', icon: Store, x: 42, y: 8, w: 34, h: 30, color: '#5925A1', exhibitors: 95 },
  { id: 'C', label: 'Pabellón C', category: 'Turismo', icon: Store, x: 4, y: 44, w: 34, h: 28, color: '#A87CFA', exhibitors: 70 },
  { id: 'D', label: 'Pabellón D', category: 'Tecnología', icon: Store, x: 42, y: 44, w: 34, h: 28, color: '#00C4CC', exhibitors: 60 },
  { id: 'food', label: 'Patio de Comidas', category: 'Gastronomía', icon: UtensilsCrossed, x: 80, y: 8, w: 16, h: 24, color: '#5925A1', exhibitors: 18 },
  { id: 'info', label: 'Centro de Informes', category: 'Servicios', icon: Info, x: 80, y: 36, w: 16, h: 12, color: '#A87CFA', exhibitors: 4 },
  { id: 'wifi', label: 'Zona WiFi', category: 'Servicios', icon: Wifi, x: 80, y: 52, w: 16, h: 10, color: '#00C4CC', exhibitors: 0 },
  { id: 'park', label: 'Estacionamiento', category: 'Acceso', icon: Car, x: 4, y: 76, w: 92, h: 18, color: '#5925A1', exhibitors: 0 },
];

export default function MapaPredio() {
  const [selected, setSelected] = useState<Pavilion | null>(null);

  return (
    <section id="mapa" className="relative py-28 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Mapa del Predio
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Explorá el predio ferial
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Hacé clic en cada pabellón para ver qué encontrar dentro y cuántos
            expositores lo conforman.
          </p>
        </Reveal>

        {/* Interactive map */}
        <Reveal direction="up">
          <div className="relative rounded-2xl bg-gray-50 border border-gray-100 p-4 sm:p-8">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {[
                { color: '#00C4CC', label: 'Negocios / Tecnología' },
                { color: '#5925A1', label: 'Industria / Servicios' },
                { color: '#A87CFA', label: 'Turismo / Información' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-semibold text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Map canvas */}
            <div className="relative w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 overflow-hidden">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(89,37,161,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(89,37,161,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Entrance marker */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-20 h-1 bg-secondary/30 rounded-b-full" />
                <span className="mt-1 text-[10px] font-bold text-secondary/40 uppercase tracking-wide">
                  Acceso
                </span>
              </div>

              {/* Pavilions */}
              {pavilions.map((p) => {
                const Icon = p.icon;
                const isActive = selected?.id === p.id;
                return (
                  <motion.button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`absolute rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-300 border-2 ${
                      isActive
                        ? 'border-secondary shadow-xl shadow-secondary/20 z-20'
                        : 'border-white/60 shadow-md hover:shadow-lg hover:border-accent/40 z-10'
                    }`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.w}%`,
                      height: `${p.h}%`,
                      background: `linear-gradient(135deg, ${p.color}15, ${p.color}30)`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
                      style={{ color: p.color }}
                      strokeWidth={1.5}
                    />
                    <span
                      className="text-[10px] sm:text-xs font-bold text-center px-1 leading-tight"
                      style={{ color: p.color }}
                    >
                      {p.label}
                    </span>
                    {p.exhibitors > 0 && (
                      <span className="hidden sm:block text-[9px] font-semibold text-gray-400">
                        {p.exhibitors} stands
                      </span>
                    )}
                  </motion.button>
                );
              })}

              {/* Compass */}
              <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full glass border border-gray-200 flex items-center justify-center">
                <span className="text-[10px] font-black text-secondary">N</span>
                <span className="absolute top-0.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-secondary" />
              </div>
            </div>

            {/* Detail card below map (desktop) */}
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex items-center gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div
                    className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${selected.color}15` }}
                  >
                    <selected.icon className="w-7 h-7" style={{ color: selected.color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-secondary">{selected.label}</h4>
                    <p className="text-sm text-gray-500">
                      Categoría: <span className="font-semibold text-gray-700">{selected.category}</span>
                      {selected.exhibitors > 0 && (
                        <>
                          {' · '}
                          <span className="font-semibold text-gray-700">{selected.exhibitors}</span> expositores
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!selected && (
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <MapIcon className="w-4 h-4" />
                <span>Seleccioná un pabellón para ver el detalle</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
