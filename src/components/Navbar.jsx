import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileNavVisible(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <header 
      ref={headerRef} 
      id="header" 
      className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileNavVisible ? "mobile-active" : ""}`}
      style={{
        background: isScrolled ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="logo d-flex align-items-center">
        <Link to="/" className="text-gradient fw-900" style={{ fontSize: '1.8rem', textDecoration: 'none', letterSpacing: '-1px' }}>
          DA.
        </Link>
      </div>

      <div className={`header-toggle d-lg-none`} onClick={toggleMobileMenu}>
        <i className={`bi ${isMobileNavVisible ? "bi-x-lg" : "bi-list"}`}></i>
      </div>
      
      <nav id="navmenu" className={`navmenu ${isMobileNavVisible ? 'mobile-show' : ''}`}>
        <ul className="d-flex align-items-center gap-2 mb-0">
          {location.pathname === "/" ? (
            <>
              <li><a href="#hero" className="nav-link active">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#resume" className="nav-link">Journey</a></li>
              <li><a href="#platforms" className="nav-link">Expertise</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </>
          ) : (
            <li>
              <Link to="/" className="nav-link btn glass-v2 px-4 py-2" style={{ borderRadius: '12px' }}>
                <i className="bi bi-arrow-left me-2"></i>Back Home
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <style>{`
        .nav-link {
          color: var(--text-dim) !important;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 10px 20px !important;
          transition: var(--transition-smooth);
        }
        .nav-link:hover, .nav-link.active {
          color: #fff !important;
          text-shadow: 0 0 15px rgba(59,130,246,0.5);
        }
        @media (max-width: 991px) {
          .navmenu {
            position: fixed;
            top: 100px;
            right: 5%;
            left: 5%;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px;
            padding: 20px;
            display: none;
            z-index: 1000;
          }
          .navmenu.mobile-show {
            display: block;
            animation: slideDown 0.4s ease-out;
          }
          .navmenu ul {
            flex-direction: column;
            align-items: center !important;
            gap: 10px !important;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
