import React, { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from "aos";

const Resume = () => {
    
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>Deepak Aruldoss</h4>
              <p>
                <em>
                  Software Backend Developer with over 6 years of experience in CMS, ERP, and E-commerce solutions.
                  Specialized in Shopware 5 & 6, Odoo ERP, and API integrations.
                </em>
              </p>
              <ul>
                <li>Chennai, TamilNadu, India.</li>
                <li>(+91) 6383331367</li>
                <li>adeepakplm55@gmail.com</li>
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item" data-aos="fade-up" data-aos-delay="200">
              <h4>Bachelor of Engineering</h4>
              <h5>2015 - 2018</h5>
              <p>Computer Science & Engineering</p>
              <p><em>Government College of Engineering, Erode</em></p>
            </div>

            <div className="resume-item" data-aos="fade-up" data-aos-delay="300">
              <h4>Diploma</h4>
              <h5>2012 - 2015</h5>
              <p>Computer Science & Engineering</p>
              <p><em>Valivalam Desikar Polytechnic College, Nagapattinam</em></p>
            </div>

            <div className="resume-item" data-aos="fade-up" data-aos-delay="400">
              <h4>10th Grade</h4>
              <h5>Completed in 2012</h5>
              <p><em>Government Higher Secondary School, Peralam.</em></p>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Professional Experience</h3>

            <div className="resume-item" data-aos="fade-up" data-aos-delay="300">
              <h4>Senior Software Developer</h4>
              <h5>Jan 2023 - Present</h5>
              <p><em>Brandcrock India Pvt. Ltd, Chennai</em></p>
              <ul>
                <li>Developed and customized Shopware 5 & 6 extensions, optimized site performance, and resolved critical bugs.</li>
                <li>Worked on Odoo 17 and Node.js projects, including CRM monitoring, POS systems, and internal tools.</li>
              </ul>
            </div>

            <div className="resume-item" data-aos="fade-up" data-aos-delay="400">
              <h4>Software Developer</h4>
              <h5>Oct 2021 - Dec 2022</h5>
              <p><em>Novalnet e-Solutions Pvt Ltd, Chennai</em></p>
              <ul>
                <li>Developed custom modules in Shopware 5, fixed critical bugs, and provided ongoing client support.</li>
              </ul>
            </div>

            <div className="resume-item" data-aos="fade-up" data-aos-delay="500">
              <h4>Software Developer</h4>
              <h5>Jul 2018 - Oct 2021</h5>
              <p><em>Apple G Web Technology Pvt Ltd, Chennai</em></p>
              <ul>
                <li>Developed tailored CMS projects and implemented ERP solutions to meet client needs.</li>
                <li>Optimized application performance and implemented new requirements.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
