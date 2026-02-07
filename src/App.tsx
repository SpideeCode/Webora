import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load non-critical components
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Methodology = lazy(() => import('./components/Methodology'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Login = lazy(() => import('./components/admin/Login'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));

const PageLoader = () => (
  <div className="fixed inset-0 bg-background z-[999] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-accent-magenta border-t-transparent rounded-full animate-spin" />
  </div>
);

const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent-magenta border-t-transparent rounded-full animate-spin" />
  </div>
);

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <div className="min-h-screen bg-background relative overflow-hidden text-foreground">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <main className="w-full relative z-10">
                  <Hero />
                  <Suspense fallback={<SectionLoader />}>
                    <Services />
                    <Portfolio />
                    <Methodology />
                    <Contact />
                    <Footer />
                  </Suspense>
                </main>
              </>
            } />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            } />
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            } />
          </Routes>
        </div>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
