import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

import './App.css';

function App() {
  return (
    <Router>
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
      </div>
    </Router>
  );
}

export default App;
