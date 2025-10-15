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
    <div className="min-h-screen bg-background-light">
      <Navbar />
      <div className="w-full">
        <div className="w-full">
          <Hero />
        </div>
        <div className="w-full py-16 bg-background-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Services />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Pricing />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Portfolio />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <About />
          </div>
        </div>
        <div className="w-full py-16 bg-background-light">
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
