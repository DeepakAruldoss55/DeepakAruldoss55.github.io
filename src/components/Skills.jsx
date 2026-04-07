import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";

const skillData = [
  {
    category: "Modern Stack & Frameworks",
    skills: [
      { name: "Node.js with TypeScript", level: 90 },
      { name: "React (Vite) with TypeScript", level: 80 },
      { name: "Express.js", level: 90 },
      { name: "Embedded JavaScript (EJS)", level: 75 },
    ]
  },
  {
    category: "Data & Infrastructure",
    skills: [
      { name: "MySQL & Relational Databases", level: 90 },
      { name: "MongoDB (NoSQL)", level: 70 },
      { name: "Docker & Containerization", level: 75 },
      { name: "Linux (Ubuntu)", level: 70 },
    ]
  },
  {
    category: "Backend & Ecosystems",
    skills: [
      { name: "PHP (Symfony/Laravel)", level: 90 },
      { name: "Python", level: 70 },
      { name: "API & System Integration", level: 95 },
      { name: "E-commerce Architecture", level: 92 },
    ]
  }
];

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={skillsRef} id="skills" className="skills section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Technical Arsenal</h2>
        <p className="section-subtitle">A high-performance stack optimized for scalability, security, and enterprise efficiency.</p>
      </div>

      <div className="container">
        <div className="row g-5">
          {skillData.map((group, idx) => (
            <div key={idx} className="col-lg-4" data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="skill-group glass-v2 card-v2 p-5 h-100" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 className="mb-5 text-gradient" style={{ fontSize: '1.8rem' }}>{group.category}</h4>
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item mb-5" data-aos="fade-left" data-aos-delay={idx * 200 + sIdx * 100}>
                    <div className="skill-header d-flex justify-content-between mb-3">
                      <span className="fw-bold text-white small text-uppercase" style={{ letterSpacing: '1px' }}>{skill.name}</span>
                      <span className="text-primary fw-bold" style={{ textShadow: '0 0 10px rgba(59,130,246,0.3)' }}>{skill.level}%</span>
                    </div>
                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transition: 'width 2s cubic-bezier(0.25, 1, 0.5, 1)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
