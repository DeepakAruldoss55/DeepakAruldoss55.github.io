import React, { useEffect, useState } from "react";
import AOS from "aos";

const About = () => {
  const [experience, setExperience] = useState({ years: 0, months: 0 });

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });

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
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Personal Profile</h2>
        <p className="section-subtitle">Strategic Full Stack Developer with a focus on engineering excellence and scalable enterprise architecture.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="200">
        <div className="glass-v2 card-v2" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-5 text-center">
              <div className="profile-img-container p-3 glass-v2 mx-auto" style={{ border: 'none', background: 'rgba(255,255,255,0.05)', boxSizing: 'content-box', maxWidth: '400px', borderRadius: '40px' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/static/media/img/deepak_aruldoss_about.jpeg`}
                  className="img-fluid"
                  alt="Deepak Aruldoss"
                  style={{ borderRadius: '32px', width: '100%', border: '4px solid rgba(255,255,255,0.05)' }}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <h3 className="glow-text text-gradient mb-4" style={{ fontSize: '2.5rem' }}>Expertise & Strategy</h3>
              <p className="description mb-4 lead" style={{ color: '#fff', opacity: 1, fontWeight: 500 }}>
                Architecting enterprise-scale applications with {experience.years}+ years of expertise in Node.js, React, and TypeScript. Focused on high-performance backend ecosystems and modern UI development.
              </p>
              
              <div className="info-grid row g-4 mt-2">
                {[
                  { icon: "person", label: "Name", val: "Deepak Aruldoss" },
                  { icon: "envelope", label: "Email", val: "adeepakplm55@gmail.com" },
                  { icon: "award", label: "Degree", val: "B.E. Computer Science" },
                  { icon: "geo-alt", label: "Location", val: "Chennai, India" }
                ].map((item, i) => (
                  <div key={i} className="col-md-6" data-aos="fade-up" data-aos-delay={300 + (i * 100)}>
                    <div className="d-flex align-items-center p-3 glass-v2 hover-glow" style={{ background: 'rgba(0,0,0,0.2)', border: 'none', borderRadius: '16px' }}>
                       <i className={`bi bi-${item.icon} text-primary fs-4 me-3`}></i>
                        <div className="text-start">
                           <span className="text-white-50 small d-block mb-1">{item.label}</span>
                           <span className="text-white fw-bold" style={{ letterSpacing: '0.5px' }}>{item.val}</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 glass-v2" style={{ background: 'rgba(59,130,246,0.05)', border: 'none', borderRadius: '20px' }}>
                <p className="mb-0" style={{ fontStyle: 'italic', color: '#fff' }}>
                  "I thrive in environments that challenge technical boundaries, continuously improving processes and leveraging the latest technologies to deliver high-quality backend ecosystems."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row g-4 text-center">
          {[
            { icon: "briefcase", count: `${experience.years}y ${experience.months}m`, label: "Pure Experience" },
            { icon: "journal-richtext", count: "30+", label: "Success Projects" },
            { icon: "emoji-smile", count: "10+", label: "Global Clients" },
            { icon: "award", count: "Spot Award", label: "Winner (2025)" }
          ].map((stat, i) => (
            <div key={i} className="col-lg-3 col-6" data-aos="zoom-in-up" data-aos-delay={500 + (i * 150)}>
               <div className="stat-card glass-v2 p-4 h-100 floating-element" style={{ animationDelay: `${i * 0.5}s` }}>
                  <i className={`bi bi-${stat.icon} text-gradient fs-1 mb-3 d-block`}></i>
                  <h3 className="fw-bold text-white mb-2" style={{ fontSize: '2.2rem' }}>{stat.count}</h3>
                  <p className="text-white-50 small mb-0 text-uppercase fw-600" style={{ letterSpacing: '1px' }}>{stat.label}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
