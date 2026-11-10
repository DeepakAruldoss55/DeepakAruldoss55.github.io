import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="hero" className="hero">
      <div className="container" data-aos="fade-up">
        <div className="row align-items-center g-5">
          <div className="col-lg-7 text-start">
            <h1 className="text-gradient mb-4" style={{ fontSize: 'calc(2.5rem + 4vw)', lineHeight: 1.1 }}>
              Senior Full Stack <br /> Developer
            </h1>
            <p className="hero-subtitle mb-4">
              Engineering high-performance, scalable web systems with React, Node.js, and TypeScript, along with hands-on exposure to integrating AI-driven capabilities into modern web applications.
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
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="hero-visual glass-v2 p-5 text-center floating-element position-relative"
              style={{ borderRadius: '40px', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <div className="profile-blob-hover-wrap mx-auto mb-4" style={{ width: '300px', height: '300px' }}>
                <div
                  className="profile-blob mx-auto"
                  style={{
                    width: '300px',
                    height: '300px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    animation: 'morph 8s infinite ease-in-out',
                    overflow: 'hidden',
                    border: '8px solid rgba(255,255,255,0.1)',
                    position: 'relative'
                  }}
                >
                  <div className="blob-shimmer"></div>
                  <img
                    src={`${process.env.PUBLIC_URL}/static/media/img/5651978.webp`}
                    alt="Deepak"
                    className="profile-blob-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <h3 className="text-white mb-1 hero-name-title">Deepak Aruldoss</h3>
              <p className="small mb-0 fw-medium hero-role-subtitle" style={{ color: '#cbd5e1' }}>Senior Software Developer</p>
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

        .hero-visual {
          overflow: hidden;
          transition: border-color 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(59, 130, 246, 0.2),
            rgba(139, 92, 246, 0.08) 45%,
            transparent 75%
          );
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 0;
        }

        .hero-visual:hover {
          border-color: rgba(59, 130, 246, 0.5) !important;
          box-shadow: 0 20px 55px rgba(0, 0, 0, 0.6), 0 0 35px rgba(59, 130, 246, 0.25);
        }

        .hero-visual:hover::before {
          opacity: 1;
        }

        .profile-blob-hover-wrap {
          position: relative;
          z-index: 2;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual:hover .profile-blob-hover-wrap {
          transform: translateY(-6px) scale(1.04);
        }

        .profile-blob {
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          transition: border-color 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual:hover .profile-blob {
          border-color: rgba(96, 165, 250, 0.45) !important;
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.55),
                      0 0 75px rgba(139, 92, 246, 0.35);
        }

        .profile-blob-img {
          transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual:hover .profile-blob-img {
          transform: scale(1.12) rotate(3deg);
          filter: saturate(1.25) brightness(1.08);
        }

        .blob-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 25%,
            rgba(255, 255, 255, 0.22) 50%,
            transparent 75%
          );
          transform: translateX(-120%);
          z-index: 3;
          pointer-events: none;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual:hover .blob-shimmer {
          transform: translateX(120%);
        }

        .hero-name-title,
        .hero-role-subtitle {
          position: relative;
          z-index: 2;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-visual:hover .hero-name-title {
          transform: translateY(-2px);
          text-shadow: 0 0 16px rgba(59, 130, 246, 0.45);
        }

        .hero-visual:hover .hero-role-subtitle {
          color: #93c5fd !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;