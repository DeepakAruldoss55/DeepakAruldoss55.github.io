import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Certification from './components/Certification';
import Platforms from './components/Platforms';
import Footer from './components/Footer';
import Gotop from './components/Gotop';
import Projects from './components/Projects';
import DeepShop from './components/DeepShop';
import Chatbot from './components/Chatbot';
import InteractiveBackground from './components/InteractiveBackground';

import './App.css';

// Global Scroll to Hash Handler
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Small timeout to ensure the DOM is ready
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="App">
        {/* Global Aurora Background */}
        <div className="aurora-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="noise-overlay"></div>
        </div>

        {/* Route-Specific Interactive Mouse-Connected Canvas Animation */}
        <InteractiveBackground />
        
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Skills />
            <Resume />
            <Certification />
            <Platforms />
          </>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/deep-shop" element={<DeepShop />} />
          <Route path="/deepshop" element={<DeepShop />} />
        </Routes>
        <Footer />
        <Gotop />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
