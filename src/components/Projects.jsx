import React, { useEffect } from "react";
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
    <section id="projects" className="section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: '3.5rem' }}>Portfolio Case Studies</h2>
        <p className="section-subtitle">Showcasing engineered solutions across e-commerce, ERP, and API-driven architectures.</p>
      </div>

      <div className="container">
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
