import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="footer section py-5 mt-5">
            <div className="container">
                <div className="glass-v2 p-5 mb-0" style={{ borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="row g-5">
                        {/* Brand Column */}
                        <div className="col-lg-4 text-center text-lg-start">
                            <Link to="/" className="text-decoration-none">
                                <h2 className="text-gradient fw-900 mb-3" style={{ fontSize: '2.5rem' }}>DA.</h2>
                            </Link>
                            <p className="text-white-50 mb-4" style={{ lineHeight: '1.8' }}>
                                Engineering high-performance, scalable backend ecosystems with a focus on deep technical integration and automation.
                            </p>
                        </div>

                        {/* Navigation Column */}
                        <div className="col-lg-4 text-center">
                            <h4 className="text-white mb-4 fw-bold">Quick Navigation</h4>
                            <div className="footer-links d-flex flex-column gap-3">
                                {[
                                    { name: "About Profile", path: "/#about" },
                                    { name: "Technical Skills", path: "/#skills" },
                                    { name: "Professional Journey", path: "/#resume" },
                                    { name: "Projects Showcase", path: "/projects" }
                                ].map((link, i) => (
                                    <Link key={i} to={link.path} className="text-white-50 text-decoration-none hover-primary transition-smooth">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social Column */}
                        <div className="col-lg-4 text-center text-lg-end">
                            <h4 className="text-white mb-4 fw-bold">Connect</h4>
                            <div className="social-links d-flex justify-content-center justify-content-lg-end gap-3 mb-4">
                                <a href="https://www.facebook.com/share/18az6SS6kn/" target="_blank" rel="noreferrer" title="Facebook" className="glass-v2 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}><i className="bi bi-facebook fs-5"></i></a>
                                <a href="https://www.instagram.com/deepakarul55?igsh=YXFwMXhwczFhY2pl" target="_blank" rel="noreferrer" title="Instagram" className="glass-v2 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}><i className="bi bi-instagram fs-5"></i></a>
                                <a href="https://www.linkedin.com/in/deepak-aruldoss-40426b218" target="_blank" rel="noreferrer" title="LinkedIn" className="glass-v2 p-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}><i className="bi bi-linkedin fs-5"></i></a>
                            </div>
                            <p className="text-white-50 small">Professional Software Architecture</p>
                        </div>
                    </div>

                    <div className="copyright text-center text-white-50 small border-top border-white border-opacity-10 pt-4 mt-5">
                        <span>&copy; {currentYear}</span> <strong className="px-1 text-white">Deepak Aruldoss</strong> <span>• All Rights Reserved.</span>
                    </div>
                </div>
            </div>
            
            <style>{`
                .hover-primary:hover {
                    color: var(--primary) !important;
                    transform: translateX(5px);
                }
                @media (max-width: 991px) {
                    .hover-primary:hover { transform: translateY(-3px); }
                }
            `}</style>
        </footer>
    );
};

export default Footer;