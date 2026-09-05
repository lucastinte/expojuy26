import { Reveal, Stagger, StaggerItem } from './Reveal';
import { Clock } from 'lucide-react';

const days = [
  {
    day: 'Día 1',
    date: '12 Agosto',
    title: 'Apertura & Ronda de Negocios',
    events: [
      { time: '09:00', text: 'Apertura oficial y corte de cinta' },
      { time: '10:00', text: 'Ronda de negocios B2B — Sesión 1' },
      { time: '14:00', text: 'Panel: Inversión en el NOA' },
      { time: '17:00', text: 'Networking cóctel de bienvenida' },
    ],
  },
  {
    day: 'Día 2',
    date: '13 Agosto',
    title: 'Turismo & Cultura',
    events: [
      { time: '09:30', text: 'Presentación de destinos turísticos' },
      { time: '11:00', text: 'Workshop: Marketing turístico digital' },
      { time: '15:00', text: 'Showroom gastronómico regional' },
      { time: '18:00', text: 'Folklore en vivo — Patio central' },
    ],
  },
  {
    day: 'Día 3',
    date: '14 Agosto',
    title: 'Industria & Tecnología',
    events: [
      { time: '09:00', text: 'Keynote: Industria 4.0 en Argentina' },
      { time: '11:30', text: 'Demo de innovaciones tecnológicas' },
      { time: '14:30', text: 'Ronda de negocios B2B — Sesión 2' },
      { time: '16:00', text: 'Cierre y entrega de reconocimientos' },
    ],
  },
];

export default function Cronograma() {
  return (
    <section id="cronograma" className="relative py-28 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Cronograma
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Tres días de pura actividad
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Un programa diseñado para maximizar conexiones, conocimiento y
            oportunidades de negocio.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6" stagger={0.15}>
          {days.map((d) => (
            <StaggerItem key={d.day} direction="up">
              <div className="h-full rounded-2xl bg-gray-50 border border-gray-100 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden">
                {/* Day header */}
                <div className="p-6 bg-gradient-to-br from-secondary to-secondary-dark">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-primary">{d.day}</span>
                    <span className="text-sm font-semibold text-white/60">{d.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{d.title}</h3>
                </div>

                {/* Events */}
                <ul className="p-6 space-y-4">
                  {d.events.map((e) => (
                    <li key={e.time} className="flex items-start gap-3 group">
                      <div className="flex items-center gap-1.5 shrink-0 text-primary font-bold text-sm w-14">
                        <Clock className="w-3.5 h-3.5" />
                        {e.time}
                      </div>
                      <span className="text-gray-600 text-sm leading-relaxed group-hover:text-secondary transition-colors">
                        {e.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
