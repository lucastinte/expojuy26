import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, Building2 } from 'lucide-react';
import { Reveal } from './Reveal';

export default function Contacto() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', company: '', email: '', phone: '', message: '' });
    }, 3500);
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-secondary text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200';

  return (
    <section id="contacto" className="relative py-28 px-6 lg:px-10 bg-midnight overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <Reveal direction="up" className="text-center mb-16">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">
            Contacto
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Hablemos
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
            ¿Tenés dudas o querés participar? Nuestro equipo te responde a la
            brevedad.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <Reveal direction="right" className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'info@expojuy2026.com' },
              { icon: Phone, label: 'Teléfono', value: '+54 388 400-0000' },
              { icon: MapPin, label: 'Sede', value: 'Centro de Exposiciones, San Salvador de Jujuy' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-6 rounded-2xl glass-dark border border-white/10 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          {/* Form */}
          <Reveal direction="up" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl glass-dark border border-white/10 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                {/* Company */}
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <textarea
                required
                placeholder="Contanos en qué podemos ayudarte..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-secondary text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
              />

              {/* Submit */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 hover:bg-primary-light transition-all duration-300 disabled:opacity-60"
                disabled={sent}
              >
                {sent ? (
                  '¡Mensaje enviado! ✓'
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
