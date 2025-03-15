import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Certification = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    new Swiper(".swiper", {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <section id="certifications" className="certifications section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Certifications</h2>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="swiper">
          <div className="swiper-wrapper">
            {/* certification 1 */}
            <div className="swiper-slide">
              <div className="certification-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="certification-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        Shopware 6 development, from setup to plugins, templates, and events, and earn certification with a final exam.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>Shopware 6 Certified Developer</h3>
                      <h4>May 2023</h4>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img src={`${process.env.PUBLIC_URL}/static/media/img/Certificate/Deepak_Aruldoss_shopware.webp`} className="img-fluid certification-img" alt="" />
                  </div>
                </div>
              </div>
            </div>

            {/* certification 2 */}
            <div className="swiper-slide">
              <div className="certification-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="certification-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        CIICP Certification in Computer Hardware, Servicing, and Networking Pro.
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>Canada India Institutional Cooperation Project</h3>
                      <h4>March 2015</h4>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img src={`${process.env.PUBLIC_URL}/static/media/img/Certificate/deepak_aruldoss_ciicp.webp`} className="img-fluid certification-img" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
