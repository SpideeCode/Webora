import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Methodology = lazy(() => import('./components/Methodology'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./components/admin/Login'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));

// Initial loading fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-primary z-[999] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-accent-magenta border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-primary relative overflow-hidden">
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
