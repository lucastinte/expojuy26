import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden bg-midnight"
    >
      {/* Parallax background layers */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-dark via-midnight to-midnight" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-primary/30 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <TextEffect
            per="word"
            as="span"
            preset="blur"
            delay={0.3}
            className="text-xs sm:text-sm font-semibold text-white/90"
          >
            La exposición de negocios más importante del NOA
          </TextEffect>
        </motion.div>

        {/* Main Brand Logo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col items-center"
        >
          {/* Ambient Glow backdrop */}
          <div className="absolute inset-0 -inset-y-6 bg-gradient-to-tr from-primary/25 via-accent/20 to-secondary/30 rounded-3xl blur-3xl -z-10 pointer-events-none" />

          {/* Accessible H1 for SEO */}
          <h1 className="sr-only">EXPOJUY 2026 - Conectando Países · Creando Oportunidades</h1>

          <img
            src="/assets/images/expojuy26_white.png"
            alt="EXPOJUY - Conectando Países · Creando Oportunidades"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[480px] h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,212,255,0.25)]"
          />

          {/* 2026 Year Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 px-6 py-1 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-accent/20 border border-primary/40 backdrop-blur-md shadow-lg shadow-primary/20"
          >
            <span className="text-lg sm:text-xl font-black tracking-widest text-white">
              EDICIÓN <span className="text-primary">2026</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-6 text-white/70"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            Agosto 2026
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            Centro de Exposiciones, San Salvador de Jujuy
          </span>
        </motion.div>

        {/* CTA */}
        <motion.a
          href="#acreditarse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-primary text-white text-base sm:text-lg font-bold shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:bg-primary-light transition-all duration-300"
        >
          Acreditarse ahora
          <ArrowRight className="w-5 h-5" />
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
