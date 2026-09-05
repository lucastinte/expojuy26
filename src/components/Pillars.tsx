import { Briefcase, Map, Factory } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const pillars = [
  {
    icon: Briefcase,
    title: 'Negocios',
    description:
      'Rondas de negocios internacionales, reuniones B2B y oportunidades de inversión con empresas de toda la región.',
    stats: '+500 empresas',
    color: 'primary',
  },
  {
    icon: Map,
    title: 'Turismo',
    description:
      'Descubrí el potencial turístico de Jujuy y el NOA. Promoción de destinos, operadores y experiencias únicas.',
    stats: '+50 destinos',
    color: 'accent',
  },
  {
    icon: Factory,
    title: 'Industria',
    description:
      'Innovación, tecnología y producción. Mostrario industrial de la región con proveedores y soluciones.',
    stats: '+200 expositores',
    color: 'secondary',
  },
];

export default function Pillars() {
  return (
    <section className="relative py-28 px-6 lg:px-10 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-midnight/5 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Tres pilares
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Un evento, infinitas oportunidades
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            EXPOJUY 2026 reúne a los sectores clave de la economía regional en un
            solo espacio para potenciar el crecimiento y la conectividad.
          </p>
        </Reveal>

        {/* Cards grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.title} direction="up">
                <div className="group relative h-full rounded-2xl p-8 bg-white border-2 border-gray-100 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-secondary" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-secondary mb-3">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Stat badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-bold">
                    {pillar.stats}
                  </div>

                  {/* Hover glow border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/40 transition-all duration-500 pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    boxShadow: '0 0 30px rgba(168, 124, 250, 0.15)',
                  }} />
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
