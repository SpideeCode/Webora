import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Methodology from './components/Methodology';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-primary relative overflow-hidden grid-gradient-bg">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <main className="w-full relative z-10">
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Methodology />
              <Contact />
            </main>
            <Footer />
          </>
        } />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
