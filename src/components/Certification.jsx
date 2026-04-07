import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const certifications = [
  {
    title: "Shopware 6 Certified Developer",
    date: "May 2023",
    description: "Successfully mastered Shopware 6 development, covering core architecture, plugin systems, template engines, and event-driven logic. Validated expertise through a rigorous technical examination.",
    image: "/static/media/img/Certificate/Deepak_Aruldoss_shopware.webp",
    alt: "Shopware 6 Certification"
  },
  {
    title: "Technical Excellence - Spot Award Winner",
    date: "January 2025",
    description: "Honored for exceptional technical leadership and architectural contributions. Specifically recognized for engineering highly scalable Node.js & TypeScript backends and optimizing production workflows.",
    image: "/static/media/img/Certificate/Deepak_Aruldoss_sport_award.webp",
    alt: "Spot Award 2025"
  },
  {
    title: "Canada India Institutional Cooperation Project",
    date: "March 2015",
    description: "CIICP Certification in Computer Hardware, Servicing, and Networking. A foundational validation of expertise in hardware architecture and network infrastructure management.",
    image: "/static/media/img/Certificate/deepak_aruldoss_ciicp.webp",
    alt: "CIICP Certification"
  }
];

const Certification = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    new Swiper(".cert-swiper", {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });
  }, []);

  return (
    <section id="certifications" className="certifications section py-5">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Professional Certifications</h2>
        <p className="section-subtitle">A record of specialized expertise and industry-standard technical validation.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="200">
        <div className="cert-swiper swiper glass-v2 p-4 p-md-5 rounded-5" style={{ overflow: 'hidden' }}>
          <div className="swiper-wrapper">
            {certifications.map((cert, index) => (
              <div key={index} className="swiper-slide">
                <div className="certification-item py-2">
                  <div className="row gy-5 align-items-center">
                    <div className="col-lg-7">
                      <div className="certification-content px-lg-4">
                        <div className="badge glass-v2 text-primary px-3 py-2 mb-4" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                          VALIDATED EXPERTISE
                        </div>
                        <h3 className="text-white mb-3 fw-bold" style={{ fontSize: '2.2rem', lineHeight: '1.2' }}>{cert.title}</h3>
                        <p className="text-white-50 mb-4 lead" style={{ lineHeight: '1.8' }}>
                          <i className="bi bi-quote quote-icon-left text-primary me-2"></i>
                          {cert.description}
                          <i className="bi bi-quote quote-icon-right text-primary ms-2"></i>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <div className="p-2 rounded-circle bg-primary-subtle">
                            <i className="bi bi-calendar-check text-primary"></i>
                          </div>
                          <h4 className="text-primary mb-0 fw-600">{cert.date}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 text-center">
                      <div className="cert-image-container position-relative">
                        <div className="cert-glow"></div>
                        <img 
                          src={`${process.env.PUBLIC_URL}${cert.image}`} 
                          className="img-fluid certification-img rounded-3 shadow-lg" 
                          alt={cert.alt} 
                          style={{ transition: 'transform 0.5s ease', cursor: 'zoom-in' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination mt-5 position-relative"></div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
