import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const projects = [
  {
    title: "Customer Discount Request",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Customer Discount Request plugin for Shopware 6 allows registered users to request a price discount for large number of products. Users can choose the quantity and the discount percentage for the preferred product. Shop owners or merchants can approve or reject a discount proposal for the product. After multiple requests from users, merchants can accept a proposal. Upon accepting users will be notified when they login to the online shop. Each product can be configured from the shop backend to receive a price discount request. The products which receive a price request are listed under a separate section in the shop backend. Merchants can define the product minimum order quantity, maximum order quantity, minimum discount percentage and maximum discount percentage.`,
    link: "https://store.shopware.com/en/brand27683468217m/customer-discount-request.html",
  },
  {
    title: "Customer Membership Program",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Customer Membership Offer plugin for Shopware 6 allows you to categorize registered users under silver, gold and platinum plans. The shop admin can define the minimum purchase amount for each plan. After users’ overall purchase amount reach or exceed the amount mentioned, they qualify to avail discount on the cart value based on the discount percentage configured in the shop backend. The offers are applicable only the next order placed by users. The membership plans can be made valid only for chosen products and buying only those will be considered for the plans. The purchase amount keeps increasing during every purchase and the membership level upgrades as per the defined. Hence, the discount percentage increases as the users keep shop from the online shop. Additionally, the shop admin could edit or change the membership plan manually from the shop backend. Also, the shop admin can freeze or lock a membership plan for any user so that it doesn’t automatically upgrade when the purchase amount increases.`,
    link: "https://store.shopware.com/en/brand53235685891m/customer-membership-program.html"
  },
  {
    title: "Ticket System",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `The Ticket System plugin allows you to create and manage events, sell tickets to those events. Users can choose the number of tickets they want and purchase them.The shop admin can set the start time and end time of the ticket availability.They can set the price of one ticket and the total number of tickets available to purchase.Once tickets get sold, the count will decrease in accordance the number sold.`,
    link: "https://store.shopware.com/en/brand11399667561m/ticket-system.html"
  },
  {
    title: "Order Status Analytics",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Order Status Analytics plugin adds detailed insights and visuals to the order page. Customers can easily see the current status of their overall orders, whether they are open, in progress, done, and cancelled. This transparency empowers customers by giving them a clear view of the progress of their purchases. Such features enhance the customer experience by fostering trust and satisfaction, critical elements in modern e-commerce interactions.`,
    link: "https://store.shopware.com/en/brand86225088288m/order-status-analytics.html"
  },
  {
    title: "Customer Profile Picture",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Customer Profile Picture plugin for Shopware 6 allows users to change their profile picture in the Shopware online shop. Once the plugin is enabled, the shop front-end shows an option (a button) to upload profile picture under My Account. Upon clicking the option, the users can upload their profile picture without exceeding the size limit of 100 KB. The file types accepted are JPG, JPEG and PNG formats. This option allows to update a new profile picture or change the profile picture by updating the existing one. The profile picture can also be a photo or an avatar or a logo, in the above mentioned formats.`,
    link: "https://store.shopware.com/en/brand19607501195m/customer-profile-picture.html"
  },
  {
    title: "Credit Points",
    platform: "Shopware 5",
    domain: "Ecommerce",
    type: "Plugin",
    description: `Credit Points plugin allows to offer credit points based on the end-user’s purchases made in merchant online shop. These credit points can be added as SuperCoins to the end-user’s account in merchant shop. The SuperCoins can later be redeemed as cash discount for the upcoming orders. Credit points can be assigned to each product which meets the minmum product cost. When an end-user completes a purchase the points for the products in that order will be added as SuperCoins.`,
    link: "https://store.shopware.com/en/brand29157832267/credit-points.html"
  },
  {
    title: "Adyen Payment Module Customization",
    platform: "Shopware 5",
    domain: "Ecommerce",
    type: "Client",
    description: `As part of this project, I customized the Adyen payment plugin to meet the specific requirements of the client. This involved a comprehensive approach to enhance payment functionalities on their eCommerce platform, ensuring seamless transaction processing and improved customer experience.`,
    keyFeatures: [
      "Automatic Capture Status: Implemented automatic capture of payments once an order is confirmed.",
      "Partial Refunds: Developed functionality to allow partial refunds for flexible order adjustments.",
      "Store Payment Methods: Integrated various store-specific payment methods.",
      "Enhanced Payment Flow: Optimized the payment flow for faster, error-free transactions.",
      "Client-Specific Customizations: Addressed unique client requirements for better operational alignment."
    ]
  },
  {
    title: "Product Review Synchronization Plugin",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Client",
    description: `Developed a custom plugin to automate the synchronization of product reviews across multiple shops within the client network. This ensures consistent and accurate display of customer feedback across stores when the products share the same identifier.`,
    keyFeatures: [
      "Automated Synchronization: Enabled seamless transfer of customer reviews from one shop to another, minimizing manual effort.",
      "Product Match Logic: Implemented a system to synchronize reviews only when the product numbers (SKUs) match, ensuring accurate mapping.",
      "Real-Time Updates: Configured the plugin to synchronize reviews in near real-time, ensuring up-to-date feedback visibility across all relevant stores.",
      "Conflict Handling: Added safeguards to avoid duplicate reviews and maintain data integrity during synchronization.",
      "Scalable Solution: Designed the plugin to handle synchronization for large volumes of reviews across multiple shops, ensuring reliability under varying loads."
    ]
  },
  {
    title: "Category Discount Plugin Development",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Client",
    description: `Developed a custom plugin to streamline discount management for specific product categories. The plugin enables admins to configure category-wide discounts, which are automatically applied to all products mapped to those categories.`,
    keyFeatures: [
      "Allows setting discounts at the category level, either as a percentage or fixed amount.",
      "Automatically applies discounts to all products mapped to the specified categories.",
      "Ensures the configured discount is applied dynamically to product prices during browsing and checkout.",
      "Added the ability to display promotional banners highlighting active category discounts, improving customer awareness.",
      "Showcases discounted prices in product listings, product detail pages, and order confirmation emails for clear communication with customers.",
      "Simplifies the process of applying promotions, eliminating the need for manual discount updates on individual products."
    ]
  },
  {
    title: "Site Optimization",
    platform: "Shopware 6",
    domain: "Ecommerce",
    type: "Client",
    description: `Optimized the client website to enhance performance, improve user experience, and adhere to SEO best practices.`,
    keyFeatures: [
      "Converted product images to the WebP format to reduce file size and improve load times without compromising quality.",
      "Optimized other multimedia elements to enhance overall site performance.",
      "Added 'Alt' attributes to all images to improve accessibility and SEO rankings.",
      "Removed lazy-loading styles for smoother rendering of critical visual elements.",
      "Eliminated redundant and unnecessary CSS syntax, reducing file size and improving load speed."
    ]
},
{
  title: "Archive Portal",
  platform: "Node.js",
  domain: "Internal Drive",
  type: "Internal Project",
  description: `This project allows users to store uploaded files, and they can view, download, and delete files based on their user role. It is similar to Google Drive. I introduced Admin and Employee roles by default. The Employee role can access files based on the assigned projects. I have implemented the following modules.`,
  keyFeatures: [
    "Dashboard module: This module helps to display the overall data for Admin and Employee roles.",
    "Projects module: This module helps to create the projects. This module only visible for Admin role.",
    "Roles Module: This module helps to create the roles. This module only visible for Admin role.",
    "Users Module: This module helps to create the users and project access privilege. This module only visible for Admin role.",
    "Files Upload Module: This module helps to create group, upload, view, download and delete the files. This module visible for Admin and Employee role based on the project access privilege.",
    "Profile Module: This module helps to display the user information. This module visible for Admin and Employee role."
  ]
},
{
    title: "Custom Backend Theme Development",
    platform: "Odoo 17",
    domain: "Ticket Booking",
    type: "Client",
    description: `Designed and implemented a fully customized backend theme for Odoo, tailored to meet the specific requirements of a client who wanted to replace the default Odoo interface.`,
    keyFeatures: [
      "Requirement Analysis: Understood the client’s design preferences, user workflow, and specific functional needs.",
      "Theme Design: Developed a visually appealing and user-friendly interface, ensuring the layout, color scheme, and elements aligned with the client’s branding.",
      "Customization: Modified Odoo’s default backend structure to integrate custom templates, styles, and components.",
      "Testing and Feedback: Conducted thorough testing to ensure the theme was responsive, intuitive, and met the client's expectations. Incorporated feedback for iterative improvements.",
      "Deployment: Successfully deployed the theme with seamless integration into the client’s existing Odoo system."
    ]
},
{
  title: "Custom Frontend Theme Development",
  platform: "Odoo 17",
  domain: "Ticket Booking",
  type: "Client",
  description: `Created a fully customized frontend theme for Odoo 17, designed to meet the unique needs and aesthetic preferences of a client.`,
  keyFeatures: [
    "Client Collaboration: Worked closely with the client to gather detailed insights into their brand identity, visual preferences, and functional requirements for the website.",
    "Custom Design Implementation: Developed a tailored theme with custom layouts, fonts, and color schemes to align perfectly with the client’s branding. Incorporated bespoke design elements to enhance the user experience.",
    "Integration of Features: Implemented responsive and interactive components to ensure the theme provided a seamless experience across all devices.",
    "Optimization: Enhanced performance through optimized code and efficient asset loading for faster page speeds and better usability.",
    "Quality Assurance: Performed comprehensive testing to ensure compatibility across browsers and devices, addressing any bugs or inconsistencies.",
    "Deployment and Support: Deployed the theme to the client’s production environment and provided post-deployment support for fine-tuning and updates."
  ],
  link: "https://mfs.brandcrock.com"
},
{
  title: "Geocoding API Integration for Nearby Events",
  platform: "Odoo 17",
  domain: "Ticket Booking",
  type: "Client",
  description: `Developed a specialized module for Odoo 17 that utilizes the Google Geocoding API to enhance the user experience by dynamically displaying nearby events.`,
  keyFeatures: [
    "Location-Based Event Display: Implemented functionality to fetch the end user’s current location and display events within a predefined radius, ensuring relevance and convenience.",
    "Integration with Google Geocoding API: Leveraged the Google Geocoding API to accurately translate user coordinates into actionable location data for event filtering.",
    "Dynamic Filtering: Enabled real-time filtering of events based on the user’s location, offering a personalized and intuitive interface.",
    "Ticket Booking System: Integrated a seamless ticket booking feature that allows users to book tickets directly after viewing events, streamlining the process from discovery to booking.",
    "Responsive Design: Ensured the module’s compatibility with various devices, providing a consistent and user-friendly experience across platforms.",
    "Optimized Performance: Focused on optimizing API calls and data handling to maintain performance and reduce latency.",
    "Testing and Deployment: Conducted rigorous testing to ensure reliability and accuracy in location-based event recommendations, followed by successful deployment in the client’s Odoo environment."
  ]
},
{
  title: "Event Module Customization",
  platform: "Odoo 17",
  domain: "Ticket Booking",
  type: "Client",
  description: `Extended and customized the existing Odoo 17 event module to meet specific client requirements, enhancing its functionality and user experience.`,
  keyFeatures: [
    "Custom Page Design: Redesigned the event page to provide a modern, visually appealing, and user-friendly layout. The new design ensures improved navigation and aligns with the client’s branding.",
    "Automated Payment Integration: Developed functionality to automatically generate and send a payment link to customers immediately after completing a ticket booking. This streamlined the payment process, improving efficiency and user satisfaction.",
    "Sponsor Ticket Implementation: Introduced a unique feature that allows sponsors to purchase and allocate tickets for specific events, enabling targeted promotional activities and boosting event participation.",
    "Enhanced User Experience: Focused on creating a seamless end-to-end experience for both event organizers and attendees, ensuring ease of use and reliability.",
    "Testing and Optimization: Conducted extensive testing to ensure the module’s functionality, performance, and compatibility with other Odoo features."
  ],
  link: "https://mfs.brandcrock.com/appointment"
},
{
  title: "Controller of Examinations System",
  platform: "Zend Framework",
  domain: "Content Management System",
  type: "Product",
  description: `A comprehensive web application designed to manage all aspects of the COE cell in an educational institution. It covers exam scheduling, online fee payments, question encoding, online examinations, evaluation, result analysis, and certificate issuance. The system streamlines academic processes for both employees and students.`,
  keyFeatures: [
    "Exam Scheduling: Enables administrators to create and manage examination timetables efficiently.",
    "Online Fee Payments: Integrated secure payment gateway for students to pay examination fees online.",
    "Question Encoding: Implements a system to encode and store exam questions securely.",
    "Online Examinations: Provides an interface for conducting exams online with automated invigilation options.",
    "Evaluation & Result Analysis: Automates the grading process and generates detailed performance reports.",
    "Certificate Issuance: Generates digital and physical certificates for students upon successful completion of exams."
  ]
},
{
  title: "Production Unit",
  platform: "Laravel Framework",
  domain: "Enterprise Resource Planning",
  type: "Client",
  description: `A web-based Enterprise Resource Planning (ERP) software developed to collect, store, manage, and interpret data from various business activities within an organization. It streamlines internal processes, leading to better operational efficiency and improved business outcomes.`,
  keyFeatures: [
    "Product Planning: Helps in strategizing product development, forecasting demand, and resource allocation.",
    "Cost Estimation: Provides automated cost estimation for manufacturing and service delivery.",
    "Manufacturing/Service Delivery: Manages production workflows, job scheduling, and service fulfillment.",
    "Marketing and Sales: Integrates CRM functionalities for customer relationship management and sales tracking.",
    "Inventory Management: Tracks stock levels, orders, and supply chain logistics.",
    "Shipping and Payment: Automates shipment processing and payment collection to ensure smooth transactions.",
    "Systematic Business Process: Enhances internal workflows, ensuring seamless collaboration and efficiency."
  ]
}];

const Projects = () => {
useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);
    return (
      <section id="projects" className="projects-section">
        <div className="projects-container">
        <div class="container section-title aos-init aos-animate" data-aos="fade-up">
          <h2>Projects</h2>
        </div>
          <div className="projects-grid" data-aos="fade-up" data-aos-delay="100">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-details">
                  <strong>Platform:</strong> {project.platform} |{" "}
                  <strong>Domain:</strong> {project.domain} |{" "}
                  <strong>Type:</strong> {project.type}
                </p>
                <p className="project-description">{project.description}</p>
  
                {project.keyFeatures && (
                  <ul className="project-key-features">
                    {project.keyFeatures.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                )}
  
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Projects;
