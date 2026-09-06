import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, X, Sparkles } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

type Noticia = {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
};

const noticias: Noticia[] = [
  {
    id: 1,
    title: 'Rondas de Negocios Internacionales: confirmada la participación del Cono Sur',
    category: 'Comercio Exterior',
    date: '28 de Julio, 2026',
    readTime: '3 min de lectura',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Delegaciones comerciales y cámaras empresariales de Chile, Bolivia, Paraguay y Brasil confirmaron su presencia en las mesas de articulación económica del NOA.',
    content:
      'La edición 2026 de EXPOJUY consolida su perfil internacional con la confirmación de delegaciones oficiales y comitivas empresariales de países vecinos. Se proyectan más de 300 reuniones B2B preagendadas durante los tres días del evento, con foco en minería de litio, agroindustria, servicios basados en el conocimiento y turismo de alta gama.',
  },
  {
    id: 2,
    title: 'Innovación y Minería Sustentable: el pabellón de transición energética',
    category: 'Tecnología & Minería',
    date: '2 de Agosto, 2026',
    readTime: '4 min de lectura',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Más de 40 firmas líderes exhibirán adelantos en tecnología solar, baterías de litio, huella hídrica y robótica aplicada a procesos industriales de alta montaña.',
    content:
      'El nuevo Pabellón Tecnológico reunirá a proveedores de tecnología verde, universidades y centros de I+D de todo el país. Entre los atractivos principales se presentarán prototipos de transporte eléctrico, simuladores inmersivos de operación minera y soluciones de sensorización IoT para monitoreo ambiental en tiempo real.',
  },
  {
    id: 3,
    title: 'Ampliación del predio ferial: nuevo sector gastronómico y paseo cultural',
    category: 'Infraestructura',
    date: '8 de Agosto, 2026',
    readTime: '3 min de lectura',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    excerpt:
      'Se incorporan más de 5.000 m² descubiertos para exhibición de maquinaria pesada, espectáculos en vivo y un espacio gastronómico con cocina regional jujeña.',
    content:
      'Para responder a la gran demanda de expositores y público general, el comité organizador concluyó las obras de ampliación del predio ferial. El espacio sumará un auditorio al aire libre para presentaciones culturales, áreas de descanso sustentables y un polo gastronómico que congregará a cocineros y productores de las cuatro regiones de Jujuy.',
  },
];

export default function Novedades() {
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);

  return (
    <section id="novedades" className="relative py-28 px-6 lg:px-10 bg-[#F8F9FC] overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#5925A1]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00C4CC]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00C4CC] uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-4 h-4 text-[#00C4CC]" />
            Actualidad & Anuncios
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#5925A1] tracking-tight">
            Panel de Novedades
          </h2>
          <p className="mt-5 text-lg text-[#5925A1]/70 max-w-2xl mx-auto">
            Descubrí las últimas noticias, preparativos y anuncios oficiales rumbo a EXPOJUY 2026.
          </p>
        </Reveal>

        {/* Blog Grid (3 Cards) */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((item) => (
            <StaggerItem key={item.id}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(89,37,161,0.06)] hover:shadow-[0_16px_36px_rgba(89,37,161,0.12)] transition-all duration-300 flex flex-col group"
              >
                {/* Card Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#5925A1] shadow-sm backdrop-blur-sm">
                    <Tag className="w-3 h-3 text-[#00C4CC]" />
                    {item.category}
                  </span>

                  {/* Read Time */}
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-7 flex flex-col flex-grow">
                  {/* Meta date */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#00C4CC]" />
                    <span>{item.date}</span>
                  </div>

                  {/* Title in Violeta Oscuro */}
                  <h3 className="text-xl font-bold text-[#5925A1] group-hover:text-[#7B3FC2] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 text-sm text-[#5925A1]/75 leading-relaxed line-clamp-3 flex-grow">
                    {item.excerpt}
                  </p>

                  {/* Card Action Link in Cian */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedNoticia(item)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00C4CC] hover:text-[#00A4AB] group/btn transition-colors"
                    >
                      <span>Leer más</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                    <span className="text-xs font-semibold text-gray-400">EXPOJUY 2026</span>
                  </div>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Modal for Reading Full Article */}
      <AnimatePresence>
        {selectedNoticia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNoticia(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Banner */}
              <div className="relative h-56 w-full shrink-0">
                <img
                  src={selectedNoticia.image}
                  alt={selectedNoticia.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedNoticia(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#00C4CC] text-white mb-2">
                    {selectedNoticia.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedNoticia.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedNoticia.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="text-2xl font-black text-[#5925A1] leading-snug">
                  {selectedNoticia.title}
                </h3>
                <p className="mt-4 text-base text-gray-700 leading-relaxed">
                  {selectedNoticia.content}
                </p>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    Noticia Oficial · EXPOJUY 2026
                  </span>
                  <button
                    onClick={() => setSelectedNoticia(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#5925A1] text-white text-sm font-bold hover:bg-[#7B3FC2] transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
