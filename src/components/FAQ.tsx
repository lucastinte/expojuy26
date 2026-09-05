import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

const faqs = [
  {
    question: '¿Cuándo y dónde se realiza EXPOJUY 2026?',
    answer:
      'La exposición se lleva a cabo del 12 al 14 de agosto de 2026 en el Centro de Exposiciones de San Salvador de Jujuy. El horario de visita es de 9:00 a 19:00 hs cada día.',
  },
  {
    question: '¿Cómo puedo acreditar mi empresa como expositora?',
    answer:
      'Podés acreditar tu empresa completando el formulario de la sección "Acreditarse" o contactándote directamente a info@expojuy2026.com. Nuestro equipo te enviará las opciones de stands disponibles y los planes correspondientes.',
  },
  {
    question: '¿Cuáles son los rubros que participan en la feria?',
    answer:
      'EXPOJUY 2026 abarca cuatro rubros principales: Agro, Minería, Tecnología y Turismo. Cada rubro cuenta con su propio pabellón y zonas de exhibición especializadas dentro del predio.',
  },
  {
    question: '¿La entrada para visitantes tiene costo?',
    answer:
      'El ingreso a la exposición es gratuito con acreditación previa. Podés registrarte online a través del botón "Acreditarse" en la parte superior de esta página.',
  },
  {
    question: '¿Hay rondas de negocios B2B?',
    answer:
      'Sí. Se realizan rondas de negocios B2B programadas durante los días 1 y 3 del evento. Los expositores con stand Plata y Oro tienen acceso prioritario a las rondas VIP con empresas internacionales.',
  },
  {
    question: '¿Puedo reservar un stand personalizado?',
    answer:
      'Por supuesto. El plan Stand Oro incluye diseño y construcción a medida según las necesidades de tu marca. Para proyectos especiales, contactanos con anticipación para coordinar los detalles.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 px-6 lg:px-10 bg-white overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight">
            Resolvemos tus dudas
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Todo lo que necesitás saber para participar de EXPOJUY 2026.
          </p>
        </Reveal>

        {/* Accordion */}
        <Stagger className="space-y-4" stagger={0.08}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={faq.question} direction="up">
                <div
                  className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-primary/30 bg-primary/5 shadow-lg shadow-primary/5'
                      : 'border-gray-100 bg-white hover:border-accent/30'
                  }`}
                >
                  {/* Question button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span
                      className={`text-base font-bold transition-colors duration-300 ${
                        isOpen ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? 'bg-primary text-white'
                          : 'bg-gray-50 text-secondary'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Contact prompt */}
        <Reveal direction="up" className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            ¿No encontrás tu respuesta?{' '}
            <a
              href="#contacto"
              className="text-primary font-bold hover:text-primary-light transition-colors"
            >
              Contactanos directamente
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
