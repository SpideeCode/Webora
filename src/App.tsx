import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import Methodology from './components/Methodology';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden">
      <Navbar />
      <main className="w-full relative z-10">
        <Hero />
        <Services />
        <Pricing />
        <Portfolio />
        <Methodology />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
