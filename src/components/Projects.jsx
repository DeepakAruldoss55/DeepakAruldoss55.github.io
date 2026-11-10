import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const projects = [
  {
    title: "Enterprise CRM Infrastructure",
    platform: "Node.js, React",
    domain: "ERP / Business Logic",
    type: "Senior Architect",
    description: `Architected and engineered a high-performance, scalable CRM ecosystem powering complex business workflows. Focused on modular backend services, real-time monitoring, and seamless cross-platform data synchronization.`,
    keyFeatures: [
      "High-load Distributed Architecture",
      "Real-time Logic & POS Engine Integration",
      "Scalable RESTful API Ecosystem",
      "React/TypeScript Frontend Orchestration"
    ]
  },
  {
    title: "Customer Discount Request",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Allows registered users to negotiate price discounts dynamically. Shop owners can approve/reject proposals with real-time notifications. Features granular backend controls for min/max quantity and percentage limits.`,
    link: "https://store.shopware.com/en/brand27683468217m/customer-discount-request.html",
  },
  {
    title: "Customer Membership Program",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Tiered loyalty system (Silver, Gold, Platinum) where users qualify for dynamic cart discounts based on lifetime purchase milestones. Includes admin manual overrides and automated level upgrades.`,
    link: "https://store.shopware.com/en/brand53235685891m/customer-membership-program.html"
  },
  {
    title: "Ticket System",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Event management and ticketing infrastructure. Allows creating events with start/end times and managing real-time inventory for ticket sales on the digital storefront.`,
    link: "https://store.shopware.com/en/brand11399667561m/ticket-system.html"
  },
  {
    title: "Order Status Analytics",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Advanced visualization of order progress. Provides customers with transparent views of lifecycle stages (Open, In Progress, Done, Cancelled) to foster trust and saturation.`,
    link: "https://store.shopware.com/en/brand86225088288m/order-status-analytics.html"
  },
  {
    title: "Customer Profile Picture",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `User-facing upload module for profile personalization. Supports JPG/JPEG/PNG with automated size validation and account-level image management.`,
    link: "https://store.shopware.com/en/brand19607501195m/customer-profile-picture.html"
  },
  {
    title: "Credit Points (Loyalty)",
    platform: "Shopware 5",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Calculates and awards credit points as SuperCoins' based on purchase value. Points are redeemable as cash discounts for future orders, driving customer retention.`,
    link: "https://store.shopware.com/en/brand29157832267/credit-points.html"
  },
  {
    title: "Adyen Payment Customization",
    platform: "Shopware 5",
    domain: "Ecommerce",
    type: "Client",
    description: `Customized the Adyen payment plugin to support automatic capture status upon order confirmation and implemented partial refund capabilities for high-volume transactions.`,
    keyFeatures: [
      "Automatic Capture Logic",
      "Partial Refund Workflows",
      "Store-Specific Payment Integration",
      "Optimized Transaction Flow"
    ]
  },
  {
    title: "Review Synchronization Engine",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Client",
    description: `Automated cross-shop review synchronization for multi-store networks. Syncs feedback in real-time when products share identical global identifiers (SKUs).`,
    keyFeatures: [
      "Automated Sync Logic",
      "SKU-Based Mapping",
      "Real-time Feedback Consistency",
      "Data Integrity Safeguards"
    ]
  },
  {
    title: "Category Discount Plugin",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Client",
    description: `Admins can set category-wide discounts (percentage/fixed) that apply dynamically across all mapped products during browsing and checkout.Includes promotional banner integration.`,
    keyFeatures: [
      "Category-Level Logic",
      "Dynamic Price Calculation",
      "Promotional Banner Integration",
      "Bulk Discount Management"
    ]
  },
  {
    title: "Site Performance Optimization",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Performance",
    description: `Full-scale frontend optimization to improve SEO and Core Web Vitals. Implemented WebP image conversion, Alt-tag orchestration, and clean CSS syntax.`,
    keyFeatures: [
      "WebP Image Orchestration",
      "SEO/Accessibility Overhaul",
      "CSS Redundancy Removal",
      "Lazy-loading Optimization"
    ]
  },
  {
    title: "Archive Portal (Cloud Storage)",
    platform: "Node.js & TypeScript",
    domain: "Internal Tools",
    type: "System",
    description: `Secure document management system similar to Google Drive. Provides project-isolated file storage with granular Role-Based Access Control (RBAC).`,
    keyFeatures: [
      "Admin/Employee RBAC",
      "Project-Isolated Access",
      "File Lifecycle Management",
      "Dashboard Analytics"
    ]
  },
  {
    title: "Custom Backend UI Design",
    platform: "Odoo 17",
    domain: "Ticket Booking",
    type: "Client",
    description: `Designed and implemented a bespoke Odoo backend theme. Replaced the default interface with a custom, branded UI aligned with client operational workflows.`,
    keyFeatures: [
      "Bespoke Interface Design",
      "Optimized User Workflows",
      "Custom Branding Integration",
      "Responsive Layout Overhaul"
    ]
  },
  {
    title: "Custom Frontend Theme",
    platform: "Odoo 17",
    domain: "Ticket Booking",
    type: "Client",
    description: `Tailored frontend experience for Odoo 17 including custom layouts, fonts, and branding elements. Engineered for high performance and mobile-first responsiveness.`,
    keyFeatures: [
      "Brand Identity Alignment",
      "Mobile-First Performance",
      "Iterative UX Refinement",
      "Optimized Asset Loading"
    ]
  },
  {
    title: "Geocoding API Integration",
    platform: "Odoo 17",
    domain: "Ticket Booking",
    type: "Client",
    description: `Leveraged Google Geocoding API to dynamically display nearby events within a predefined radius based on the end-user's real-time coordinate data.`,
    keyFeatures: [
      "Radius-Based Event Discovery",
      "Google API Orchestration",
      "Dynamic Search Refinement",
      "Integrated Booking Workflow"
    ]
  },
  {
    title: "Event Module Extension",
    platform: "Odoo 17",
    domain: "Ticket Booking",
    type: "Client",
    description: `Engineered advanced automation for Odoo events, including digital payment links post-booking and a sponsor allocation system for targeted participation boosting.`,
    keyFeatures: [
      "Automated Payment Logic",
      "Sponsor Allocation Hub",
      "Modern Visual Redesign",
      "Integrated Ticket Lifecycle"
    ]
  },
  {
    title: "COE Management System",
    platform: "Zend Framework",
    domain: "Education",
    type: "Product",
    description: `End-to-end institution management system covering exam scheduling, online fee processing, question encoding, and automated result analysis.`,
    keyFeatures: [
      "Automated Fee Processing",
      "Secure Question Encoding",
      "Digital Result Analysis",
      "Certificate Issuance Hub"
    ]
  },
  {
    title: "Enterprise ERP ERP (Production)",
    platform: "Laravel",
    domain: "Manufacturing",
    type: "Client",
    description: `Enterprise-grade ERP for production units. Manages product planning, cost estimation, inventory logistics, and end-to-end shipping workflows.`,
    keyFeatures: [
      "Automated Cost Estimation",
      "Inventory Logistics Control",
      "Shipping & Payment Automation",
      "Workflow Streamlining"
    ]
  }
];

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });
  }, []);

  return (
    <section id="projects" className="section" style={{ paddingTop: "130px" }}>
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Portfolio Case Studies</h2>
        <p className="section-subtitle">Showcasing engineered solutions across e-commerce, ERP, and API-driven architectures.</p>
      </div>

      <div className="container">
        {/* Featured Flagship DeepShop AI Banner */}
        <div
          className="glass-v2 p-4 p-lg-5 mb-5 rounded-5 position-relative overflow-hidden"
          data-aos="fade-up"
          style={{
            border: "1px solid rgba(59, 130, 246, 0.4)",
            background: "radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.2), rgba(15, 23, 42, 0.85) 65%)"
          }}
        >
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge rounded-pill px-3 py-2 text-info" style={{ background: "rgba(34, 211, 238, 0.12)", border: "1px solid rgba(34, 211, 238, 0.35)" }}>
                  <i className="bi bi-stars me-1"></i> Featured Flagship Showcase
                </span>
                <span className="badge rounded-pill px-3 py-2 text-white" style={{ background: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.4)" }}>
                  React 18 • Node.js • FastAPI • ChromaDB
                </span>
              </div>
              <h3 className="text-white fw-bold mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
                DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite
              </h3>
              <p className="text-white-50 mb-4" style={{ fontSize: "1.02rem", lineHeight: 1.75 }}>
                Explore the dedicated engineering showcase featuring a full 5:47 interactive video walkthrough, 7 timestamped chapters, a 384-dimensional ChromaDB Customer RAG Concierge, an Executive Store Health Score (77/100) BI Engine, a Multi-Turn AI Business Copilot, and a 7-module Enterprise ERP suite.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/deep-shop" className="btn btn-premium px-4 py-3 rounded-4 d-inline-flex align-items-center gap-2">
                  <i className="bi bi-play-circle-fill fs-5"></i> Open Dedicated Demo Page
                </Link>
                <a
                  href="https://github.com/DeepakAruldoss55/eshop-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold d-inline-flex align-items-center gap-2"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)" }}
                >
                  <i className="bi bi-github fs-5"></i> GitHub Repository
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <Link to="/deep-shop" className="d-block text-decoration-none position-relative rounded-4 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <img
                  src={`${process.env.PUBLIC_URL}/static/media/deep-shop/ai-analytics-dashboard.jpg`}
                  alt="DeepShop AI Analytics & ERP Suite"
                  className="img-fluid w-100"
                  style={{ maxHeight: "260px", objectFit: "cover", objectPosition: "top" }}
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "rgba(59, 130, 246, 0.9)",
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)"
                  }}
                >
                  <i className="bi bi-play-fill text-white fs-2 ms-1"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-lg-6 col-xl-4">
              <div className="project-card glass-v2 h-100 p-5 d-flex flex-column" data-aos="zoom-in-up" data-aos-delay={index * 150} style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="info-badges d-flex flex-wrap gap-2 justify-content-between align-items-center mb-4">
                  <span className="badge glass-v2 text-primary px-3 py-2" style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.1)' }}>
                    {project.platform}
                  </span>
                  <span className="text-primary small fw-bold" style={{ whiteSpace: 'nowrap' }}>#{project.domain}</span>
                </div>

                <h3 className="text-white mb-3 fw-bold" style={{ fontSize: '1.4rem' }}>{project.title}</h3>

                <div className="flex-grow-1">
                  <p className="text-white small mb-0" style={{ opacity: 0.9, lineHeight: '1.7', minHeight: '4.5rem' }}>
                    {project.description}
                  </p>

                  {project.keyFeatures && (
                    <div className="mt-4">
                      <ul className="list-unstyled mb-0">
                        {project.keyFeatures.map((f, i) => (
                          <li key={i} className="text-white-50 small mb-1" style={{ letterSpacing: '0.3px' }}>
                            <i className="bi bi-circle-fill text-primary me-2" style={{ fontSize: '6px', verticalAlign: 'middle' }}></i>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {project.internalLink && (
                  <div className="mt-auto pt-5 d-flex flex-column gap-2">
                    <Link to={project.internalLink} className="btn btn-premium w-100 py-3 rounded-3" style={{ fontSize: '0.9rem' }}>
                      {project.ctaLabel || "Watch Demo"} <i className="bi bi-play-circle-fill ms-2"></i>
                    </Link>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn glass-v2 text-white w-100 py-2 rounded-3 fw-bold"
                        style={{ fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.18)' }}
                      >
                        <i className="bi bi-github me-2"></i>View Source on GitHub
                      </a>
                    )}
                  </div>
                )}

                {project.link && (
                  <div className="mt-auto pt-5">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-premium w-100 py-3 rounded-3" style={{ fontSize: '0.9rem' }}>
                      Case Study <i className="bi bi-box-arrow-up-right ms-2"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
