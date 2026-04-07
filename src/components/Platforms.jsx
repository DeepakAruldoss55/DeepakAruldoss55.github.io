import React from 'react';

const platformsData = [
  {
    title: "E-commerce",
    icon: "bi bi-cart-check",
    description: "Architecting high-performance, scalable e-commerce solutions with complex payment integrations and secure checkout optimizations."
  },
  {
    title: "ERP Systems",
    icon: "bi bi-database-check",
    description: "Developing robust custom ERP ecosystems to automate manufacturing workflows, inventory management, and supply chain logistics."
  },
  {
    title: "CRM Portals",
    icon: "bi bi-shield-lock",
    description: "Building secure, data-driven customer relationship portals with real-time monitoring and advanced reporting modules."
  },
  {
    title: "CMS",
    icon: "bi bi-file-earmark-code",
    description: "Designing scalable content management systems for education and enterprise, featuring granular user role privileges."
  },
  {
    title: "Payment Gateway",
    icon: "bi bi-credit-card-2-front",
    description: "Customizing Adyen, Stripe, and Novalnet payment modules for seamless global transactions and financial compliance."
  },
  {
    title: "API Ecosystems",
    icon: "bi bi-cpu",
    description: "Engineering RESTful and SOAP API architectures for seamless data synchronization across third-party services."
  }
];

const Platforms = () => {
  return (
    <section id="platforms" className="platforms section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Ecosystem Expertise</h2>
        <p className="section-subtitle">Specialized technical solutions across diverse enterprise platforms and automation layers.</p>
      </div>
      <div className="container">
        <div className="row g-4">
          {platformsData.map((platform, idx) => (
            <div key={idx} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 150}>
              <div className="platform-card glass-v2 h-100 p-5 text-center" style={{ borderRadius: '32px' }}>
                <div 
                  className="icon-box mx-auto mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'rgba(59,130,246,0.1)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(59,130,246,0.2)'
                  }}
                >
                  <i className={`${platform.icon} text-gradient fs-1`}></i>
                </div>
                <h3 className="text-white mb-3 fw-bold">{platform.title}</h3>
                <p className="text-white small mb-0" style={{ lineHeight: '1.7', opacity: 0.9 }}>{platform.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;