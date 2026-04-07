import React, { useEffect } from 'react';
import "aos/dist/aos.css";
import AOS from "aos";

const Resume = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });
  }, []);

  return (
    <section id="resume" className="resume section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Professional Journey</h2>
        <p className="section-subtitle">A chronological record of engineering excellence and academic foundation.</p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            {/* Experience Section */}
            <div className="resume-section-header mb-5" data-aos="fade-up">
              <h3 className="text-white d-flex align-items-center mb-4" style={{ fontSize: '2.2rem' }}>
                <i className="bi bi-briefcase text-primary me-3 fs-1"></i> Professional Career
              </h3>
            </div>

            <div className="resume-timeline-v3">
              {[
                {
                  title: "Senior Software Developer",
                  company: "Brandcrock India Pvt. Ltd",
                  location: "Chennai, India",
                  date: "Jan 2023 - Present",
                  color: "var(--primary)",
                  points: [
                    "Designed, developed, and maintained scalable backend services using Node.js, React with TypeScript for an enterprise CRM platform.",
                    "Architected and implemented RESTful APIs to support core CRM features and complex third-party integrations.",
                    "Engineered backend APIs consumed by React frontend components, ensuring seamless integration and high performance.",
                    "Integrated diverse third-party systems and external services, prioritizing reliability, security, and performance.",
                    "Optimized backend performance through strategic code refactoring, query optimization, and advanced caching.",
                    "Improved overall code quality and maintainability by enforcing Industry best practices and clean architecture principles.",
                    "Actively mentored the CRM development team, providing technical guidance and conducting rigorous code reviews.",
                    "Ensured high standards of security, scalability, and performance across the entire application ecosystem."
                  ]
                },
                {
                  title: "Software Developer",
                  company: "Novalnet e-Solutions Pvt Ltd",
                  location: "Chennai, India",
                  date: "Oct 2021 - Dec 2022",
                  color: "var(--secondary)",
                  points: [
                    "Developed custom e-commerce modules and specialized payment plugins, adhering to global development standards.",
                    "Integrated and configured secure payment solutions (Novalnet), ensuring reliable transaction processing.",
                    "Customized and maintained complex payment workflows to meet stringent business requirements and financial compliance.",
                    "Developed an internal Archive Management System using Node.js and TypeScript with Role-Based Access Control (RBAC).",
                    "Collaborated with cross-functional teams to deliver reliable e-commerce solutions and automated internal platforms."
                  ]
                },
                {
                  title: "Software Developer",
                  company: "Apple G Web Technology Pvt Ltd",
                  location: "Chennai, India",
                  date: "Jul 2018 - Oct 2021",
                  color: "#00d2ff",
                  points: [
                    "Developed and enhanced client-facing websites and built robust RESTful APIs to support mobile application ecosystems.",
                    "Designed and implemented tailored CMS and ERP infrastructures for large-scale manufacturing clients.",
                    "Resolved critical production bugs and performance bottlenecks, ensuring high application stability and reliability.",
                    "Analyzed complex business and technical requirements to deliver effective, scalable software solutions for diverse clients."
                  ]
                }
              ].map((item, i) => (
                <div key={i} className="resume-card-v3 glass-v2 mb-5 p-5 position-relative hover-glow" data-aos="fade-up" data-aos-delay={i * 150}>
                  <div className="card-accent" style={{ background: item.color }}></div>
                  <div className="row align-items-start">
                    <div className="col-md-4 mb-4 mb-md-0">
                      <h4 className="text-white fw-900 mb-1" style={{ fontSize: '1.6rem' }}>{item.title}</h4>
                      <p className="text-gradient fw-bold mb-3">{item.company}</p>
                      <span className="badge-v3 mb-2">{item.date}</span>
                      <p className="text-white-50 small"><i className="bi bi-geo-alt me-2"></i>{item.location}</p>
                    </div>
                    <div className="col-md-8 border-start-md ps-md-5" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                      <ul className="resume-list-v3 list-unstyled">
                        {item.points.map((p, pIdx) => (
                          <li key={pIdx} className="mb-3 text-white-50 small d-flex align-items-start">
                            <i className="bi bi-patch-check text-primary me-3 mt-1"></i>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="resume-section-header mt-5 mb-5" data-aos="fade-up">
              <h3 className="text-white d-flex align-items-center mb-4" style={{ fontSize: '2.2rem' }}>
                <i className="bi bi-mortarboard text-primary me-3 fs-1"></i> Academic Foundation
              </h3>
            </div>

            <div className="row g-4">
              {[
                { title: "Bachelor of Engineering", date: "2015 - 2018", desc: "Computer Science & Engineering", inst: "Government College of Engineering, Erode" },
                { title: "Diploma in Computers", date: "2012 - 2015", desc: "Computer Science & Engineering", inst: "Valivalam Desikar Polytechnic College, Nagapattinam" },
                { title: "10th Grade (SSLC)", date: "Completed in 2012", desc: "General Academic", inst: "Government Higher Secondary School, Peralam" }
              ].map((item, i) => (
                <div key={i} className="col-md-4" data-aos="zoom-in-up" data-aos-delay={i * 100}>
                  <div className="education-card-v3 glass-v2 p-4 h-100 text-center">
                    <div className="edu-icon mb-3"><i className="bi bi-book text-primary fs-3"></i></div>
                    <h5 className="text-white fw-bold mb-2">{item.title}</h5>
                    <p className="text-primary small fw-bold mb-3">{item.date}</p>
                    <p className="text-white-70 x-small mb-1">{item.desc}</p>
                    <p className="text-white-50 xx-small"><em>{item.inst}</em></p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .resume-card-v3 {
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 30px;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .card-accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
        }
        .badge-v3 {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 12px;
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
        }
        .border-start-md {
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 768px) {
          .border-start-md { border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; }
        }
        .education-card-v3 {
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
        }
        .xx-small { font-size: 0.75rem; }
        .x-small { font-size: 0.85rem; }
      `}</style>
    </section>
  );
};

export default Resume;
