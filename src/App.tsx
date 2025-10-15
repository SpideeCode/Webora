import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background-light relative overflow-hidden">
      {/* Éléments géométriques d'arrière-plan */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        {/* Lignes diagonales subtiles */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8fafc_1px,transparent_1px),linear-gradient(180deg,#f8fafc_1px,transparent_1px)] bg-[size:40px_40px] opacity-5"></div>
        
        {/* Points de grille subtils */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f61a_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      <Navbar />
      <div className="w-full relative z-10">
        <div className="w-full">
          <Hero />
        </div>
        <div className="w-full py-16 bg-background-light/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Services />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Pricing />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Portfolio />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <About />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
