import { CheckCircle, ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const benefits = [
  'Visibilidad de marca ante miles de visitantes',
  'Acceso a rondas de negocios internacionales',
  'Networking con líderes de la industria',
  'Espacio personalizado de exhibición',
  'Presencia digital en plataformas oficiales',
  'Certificado de participación oficial',
];

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
