import React, { useState, useEffect } from 'react';
import './Gotop.css';

const Gotop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className={`scroll-top-btn ${isVisible ? 'visible' : ''}`}
            aria-label="Back to top"
            title="Back to top"
        >
            <i className="bi bi-arrow-up-short"></i>
        </button>
    );
};

export default Gotop;
