import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Expositores from './components/Expositores';
import Cronograma from './components/Cronograma';
import MapaPredio from './components/MapaPredio';
import Novedades from './components/Novedades';
import Sponsors from './components/Sponsors';
import Contacto from './components/Contacto';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Expositores />
        <Cronograma />
        <MapaPredio />
        <Novedades />
        <Sponsors />
        <Contacto />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
