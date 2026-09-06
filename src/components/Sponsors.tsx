import React from 'react';
import LogoCloudSwap, { LogoEntry } from './ui/LogoCloudSwap';
import {
  Landmark,
  Zap,
  Cpu,
  Plane,
  Building2,
  Wine,
  Mountain,
  Hotel,
  Truck,
  Sprout,
  Boxes,
  Radio,
} from 'lucide-react';

const sponsorsData: LogoEntry[] = [
  {
    name: 'Banco del NOA',
    tier: 'Platinum',
    category: 'Banca y Finanzas',
    highlightColor: '#00C4CC',
    icon: <Landmark className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Energía Andina',
    tier: 'Platinum',
    category: 'Energía y Litio',
    highlightColor: '#00C4CC',
    icon: <Zap className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'TechJuy',
    tier: 'Gold',
    category: 'Tecnología & I+D',
    highlightColor: '#C4A2FF',
    icon: <Cpu className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'AeroJujuy',
    tier: 'Gold',
    category: 'Conectividad Aérea',
    highlightColor: '#C4A2FF',
    icon: <Plane className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Constructora del Valle',
    tier: 'Gold',
    category: 'Infraestructura',
    highlightColor: '#C4A2FF',
    icon: <Building2 className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Vinos del Norte',
    tier: 'Silver',
    category: 'Bodegas de Altura',
    highlightColor: '#E2E8F0',
    icon: <Wine className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Minera Puna',
    tier: 'Silver',
    category: 'Minería Sustentable',
    highlightColor: '#E2E8F0',
    icon: <Mountain className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Hotel Termas',
    tier: 'Silver',
    category: 'Turismo & Hospitalidad',
    highlightColor: '#E2E8F0',
    icon: <Hotel className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Logística Quebrada',
    tier: 'Silver',
    category: 'Transporte & Carga',
    highlightColor: '#E2E8F0',
    icon: <Truck className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'AgroJujuy',
    tier: 'Silver',
    category: 'Agroindustria',
    highlightColor: '#E2E8F0',
    icon: <Sprout className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Cementos Puna',
    tier: 'Silver',
    category: 'Materiales Industriales',
    highlightColor: '#E2E8F0',
    icon: <Boxes className="w-7 h-7" strokeWidth={1.75} />,
  },
  {
    name: 'Telecom NOA',
    tier: 'Silver',
    category: 'Telecomunicaciones',
    highlightColor: '#E2E8F0',
    icon: <Radio className="w-7 h-7" strokeWidth={1.75} />,
  },
];

export default function Sponsors() {
  return (
    <div id="sponsors">
      <LogoCloudSwap
        logos={sponsorsData}
        title="Marcas que impulsan EXPOJUY"
        subtitle="Las empresas y corporaciones líderes que hacen posible el mayor encuentro multisectorial del Norte Argentino."
        interval={4200}
        stagger={0.09}
      />
    </div>
  );
}
