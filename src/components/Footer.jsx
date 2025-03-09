import React, { useEffect } from 'react';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="footer position-relative light-background">
            <div className="container">
                <h3 className="sitename">Deepak Aruldoss</h3>
                <p>Connect with me on social media.</p>
                <div className="social-links d-flex justify-content-center">
                    <a href="https://www.facebook.com/share/18az6SS6kn/" target="_blank"><i className="bi bi-facebook"></i></a>
                    <a href="https://www.instagram.com/deepakarul55?igsh=YXFwMXhwczFhY2pl" target="_blank"><i className="bi bi-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/deepak-aruldoss-40426b218?utm_source=share&utm_campaign=share_via&utm_content=profile" target="_blank"><i className="bi bi-linkedin"></i></a>
                </div>
                <div className="container">
                    <div className="copyright">
                        <span>Copyright &copy; {currentYear}</span> <strong className="px-1 sitename">Deepak Aruldoss</strong> <span>All Rights Reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;