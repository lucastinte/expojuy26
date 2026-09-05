import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Expositores from './components/Expositores';
import Cronograma from './components/Cronograma';
import Contacto from './components/Contacto';
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
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
