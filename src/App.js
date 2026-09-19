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
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gotop from './components/Gotop';
import Projects from './components/Projects';
import Chatbot from './components/Chatbot';

import './App.css';

// Global Scroll to Hash Handler
const ScrollToHash = () => {
  const { hash } = useLocation();

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
  }, [hash]);

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
        
        <Navbar />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Skills />
            <Resume />
            <Certification />
            <Platforms />
            <Contact />
          </>} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer />
        <Gotop />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
