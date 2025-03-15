import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="hero section light-background">
      <img src={`${process.env.PUBLIC_URL}/static/media/img/5651978.webp`} alt="/"></img>

      <div className="container" data-aos="zoom-out">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h2 data-aos="slide-left" data-aos-delay="100">Deepak Aruldoss</h2>
            <p className="my-designation" data-aos="slide-right" data-aos-delay="200">I'm <span className="typed">Senior Software Developer</span></p>
            <div className="social-links" data-aos="slide-left" data-aos-delay="300">
              <a href="https://www.linkedin.com/in/deepak-aruldoss-40426b218" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
              <a href="https://wa.me/6383331367?text=Hi%20Deepak%2C%20I%20would%20like%20to%20connect!" target="_blank" rel="noreferrer"><i className="bi bi-whatsapp"></i></a>
              <a href="https://github.com/DeepakAruldoss55" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
              <a href={`${process.env.PUBLIC_URL}/static/media/resume/Deepak_Aruldoss_2025.pdf`} target="_blank" rel="noreferrer"><i className="bi bi-download"></i></a>
            </div>
            <div className="col-md-12 pt-4 aos-init aos-animate">
              <Link to="/projects" className="btn btn-primary btn-lg btn-custom">See Projects</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
