import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="container" data-aos="fade-up">
        <div className="row align-items-center g-5">
          <div className="col-lg-7 text-start">
            <h1 className="text-gradient mb-4" style={{ fontSize: 'calc(2.5rem + 4vw)', lineHeight: 1.1 }}>
              Senior Full Stack <br /> Engineer
            </h1>
            <p className="hero-subtitle mb-5">
              Engineering high-performance, scalable web systems with React, Node.js, and TypeScript. Focused on architectural excellence, performance optimization, and modern user experiences.
            </p>
            <div className="d-flex flex-wrap gap-4 align-items-center">
              <Link to="/projects" className="btn btn-premium px-5 py-4">
                Explore Projects <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <div className="social-links d-flex gap-3">
                <a href="https://www.linkedin.com/in/deepak-aruldoss-40426b218" target="_blank" rel="noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/DeepakAruldoss55" target="_blank" rel="noreferrer">
                  <i className="bi bi-github"></i>
                </a>
                <a href={`${process.env.PUBLIC_URL}/static/media/resume/Deepak_Aruldoss_2026.pdf`} target="_blank" rel="noreferrer">
                  <i className="bi bi-download"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <div className="hero-visual glass-v2 p-5 text-center floating-element" style={{ borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div
                className="profile-blob mx-auto mb-4"
                style={{
                  width: '300px',
                  height: '300px',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  animation: 'morph 8s infinite ease-in-out',
                  overflow: 'hidden',
                  border: '8px solid rgba(255,255,255,0.1)'
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/static/media/img/5651978.webp`}
                  alt="Deepak"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-white mb-1">Deepak Aruldoss</h3>
              <p className="text-muted small">Senior Software Developer @ India</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;