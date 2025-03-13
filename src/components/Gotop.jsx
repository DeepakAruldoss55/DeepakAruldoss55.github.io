import React, { useState, useEffect } from 'react';

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

        window.addEventListener("scroll", toggleVisibility);
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
            className={`scroll-top d-flex align-items-center justify-content-center ${isVisible ? 'active' : ''}`} 
            style={{ 
                position: 'fixed', 
                bottom: '20px', 
                right: '20px', 
                width: '50px', 
                height: '50px', 
                backgroundColor: '#0563bb', 
                color: 'white', 
                borderRadius: '50%', 
                border: 'none', 
                cursor: 'pointer', 
                display: isVisible ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
        >
            <i className="bi bi-arrow-up-short" style={{ fontSize: '24px' }}></i>
        </button>
    );
};

export default Gotop;
