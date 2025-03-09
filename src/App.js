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
import Projects from './components/Projects';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
