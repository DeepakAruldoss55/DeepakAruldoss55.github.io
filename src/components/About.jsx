import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const About = () => {
  const [experience, setExperience] = useState({ years: 0, months: 0 });

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    const startYear = 2018;
    const startMonth = 7;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let totalYears = currentYear - startYear;
    let totalMonths = currentMonth - startMonth;

    if (totalMonths < 0) {
      totalYears -= 1;
      totalMonths += 12;
    }

    setExperience({ years: totalYears, months: totalMonths });

    if (window.PureCounter) {
      new window.PureCounter();
    }
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About</h2>
        <p>Hardworking and dedicated backend developer with a problem-solving mindset, always striving for efficiency and innovation.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-3">
            <img
              src={`${process.env.PUBLIC_URL}/static/media/img/deepak_aruldoss_about.jpg`}
              className="img-fluid deepak-aruldoss-img"
              alt="Deepak Aruldoss"
            />
          </div>
          <div className="col-lg-8 content">
            <h2>Backend &amp; Web Developer</h2>
            <p className="fst-italic py-3">
              Backend developer with 6+ years of experience in building scalable solutions, solving complex challenges, and optimizing performance. Adaptable and driven by innovation, I thrive in dynamic environments.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Name:</strong> <span>Deepak Aruldoss</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>July 15</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Bachelor of Engineering</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+91 6383331367</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Chennai, Tamil Nadu</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Designation:</strong> <span>Software Developer</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>adeepakplm55@gmail.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.deep-hyperloop.in</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Languages:</strong> <span>Tamil &amp; English</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Hobby:</strong> <span>Learning New Technologies</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-briefcase"></i>
              <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end={experience.years} data-purecounter-duration="2" className="purecounter">{experience.years}y {experience.months}m</span>
              <p>Total Experience</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-journal-richtext"></i>
              <div className="stats-item">
                <span data-purecounter-start="0" data-purecounter-end="30" data-purecounter-duration="2" className="purecounter"></span>
                <p>Projects</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-emoji-smile"></i>
              <div className="stats-item">
                <span data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="2" className="purecounter"></span>
                <p>Happy Clients</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center" data-aos="fade-up" data-aos-delay="500">
              <i className="bi bi-award"></i>
              <div className="stats-item">
                <span data-purecounter-start="0" data-purecounter-end="2" data-purecounter-duration="2" className="purecounter"></span>
                <p>Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
