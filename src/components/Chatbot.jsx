import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const getApiEndpoints = () => {
  if (process.env.REACT_APP_RAG_API_URL) {
    return [process.env.REACT_APP_RAG_API_URL];
  }
  if (typeof window !== "undefined" && window.location.protocol === "https:" && !window.location.hostname.includes("localhost")) {
    // On HTTPS static hosting (e.g. GitHub Pages) with no cloud API URL set
    return [];
  }
  const currentHost = typeof window !== "undefined" && window.location.hostname ? window.location.hostname : "localhost";
  return [
    `http://${currentHost}:8000`,
    "http://127.0.0.1:8000",
    "http://localhost:8000"
  ];
};

// Experience calculator (July 2018 – October 27, 2026)
const getExperience = () => {
  return {
    full: "8 years and 3 months",
    decimal: "8.3 years",
    short: "8y 3m"
  };
};

// Client-side static BOT engine (works 100% without any AI model)
const generateClientResponse = (query, chatHistory = []) => {
  const q = query.toLowerCase().trim();
  const exp = getExperience();
  const lastBotMsg = chatHistory.length > 0 ? (chatHistory[chatHistory.length - 1].content || "").toLowerCase() : "";
  const lastUserMsg = chatHistory.length > 1 ? (chatHistory[chatHistory.length - 2].content || "").toLowerCase() : "";

  // 0. HARMFUL / VULGAR / PROFANITY MODERATION FILTER
  const vulgarPattern = /\b(fuck|fucking|fucker|shit|bitch|asshole|bastard|dick|pussy|cock|cunt|slut|whore|nigger|faggot|porn|nude|kill yourself)\b/i;
  if (vulgarPattern.test(q)) {
    return "I keep our conversation focused on Deepak’s professional portfolio, software engineering work, and technical projects. Let me know if you’d like to know more about his skills, experience, or background!";
  }

  // 1. URGENCY / MOBILE NUMBER STEP 4 (Confirmed urgency)
  const isUrgent = /urgent|emergency|asap|today|right now|immediately|quick call|priority|direct call/.test(q);
  const askedPhoneRecently = /mobile|phone|call|number/.test(lastUserMsg) || /phone number|mobile number/.test(lastBotMsg);

  if (isUrgent && (askedPhoneRecently || /mobile|phone|call|number|contact|reach/.test(q))) {
    return (
      "I’ve noted the urgency. You can reach Deepak directly at:\n\n" +
      "- **Mobile:** **+91 6383331367**\n" +
      "- **Email:** **adeepakplm55@gmail.com**\n" +
      "- **LinkedIn:** **https://www.linkedin.com/in/deepak-aruldoss-40426b218**\n\n" +
      "Feel free to call or drop a quick note with your details!"
    );
  }

  // 2. MOBILE NUMBER REQUEST STEP 3 (Asks for phone/mobile/whatsapp number)
  if (/mobile|phone|contact number|cell|call him|give.*number|share.*number|whatsapp|\+91|6383331367/.test(q)) {
    return (
      "You can reach Deepak directly at:\n\n" +
      "• **Mobile:** **+91 6383331367**\n" +
      "• **Email:** **adeepakplm55@gmail.com**\n\n" +
      "He is responsive over both email and phone for job opportunities, technical architecture consulting, and project collaborations!"
    );
  }

  // 3. DIRECT EMAIL OR VALID REASON SHARED STEP 2
  const isContactInquiryContext = /connect with deepak|discuss with deepak|what you’d like to connect/.test(lastBotMsg);
  const isValidReason = /job|hire|hiring|freelance|project|contract|opportunity|opening|interview|consulting|collaborat|recruiter|hr|offer|role|position/.test(q);

  if (/email|mail|gmail|adeepakplm55/.test(q) || (isValidReason && isContactInquiryContext)) {
    return (
      "You can reach Deepak directly at:\n\n" +
      "• **Email:** **adeepakplm55@gmail.com**\n" +
      "• **Mobile:** **+91 6383331367**\n" +
      "• **LinkedIn:** **https://www.linkedin.com/in/deepak-aruldoss-40426b218**"
    );
  }

  // 3b. PUBLIC PROFESSIONAL PROFILES & RESUME (LinkedIn, GitHub, Portfolio, Socials, Resume)
  if (/facebook|instagram|insta|fb/.test(q)) {
    return (
      "Deepak does not use Facebook or Instagram for professional connections. You can connect with him directly via:\n\n" +
      "• **Email:** **adeepakplm55@gmail.com**\n" +
      "• **Mobile:** **+91 6383331367**\n" +
      "• **LinkedIn:** **https://www.linkedin.com/in/deepak-aruldoss-40426b218**\n" +
      "• **GitHub:** **https://github.com/DeepakAruldoss55**"
    );
  }
  if (/linkedin|linked in/.test(q)) {
    return "You can connect with Deepak on LinkedIn at **https://www.linkedin.com/in/deepak-aruldoss-40426b218**";
  }
  if (/github|git hub|repo|source code/.test(q) && !/deepshop|deep shop|eshop/.test(q)) {
    return (
      "You can explore Deepak's repositories on GitHub:\n\n" +
      "• **Main GitHub Profile:** **https://github.com/DeepakAruldoss55**\n" +
      "• **Flagship DeepShop AI Repo:** **https://github.com/DeepakAruldoss55/eshop-ai**"
    );
  }
  if (/portfolio url|portfolio link|website/.test(q)) {
    return "Deepak's personal portfolio website is **https://deepakaruldoss55.github.io/**";
  }
  if (/resume|cv|download pdf/.test(q)) {
    return (
      "You can download Deepak's 2026 Resume PDF directly from the Hero section download button, or explore his **Professional Journey** and **Technical Arsenal** on the home page!\n\n" +
      "• **Role:** Senior Software Developer (**8.3 years** / **8y 3m** experience)\n" +
      "• **Email:** **adeepakplm55@gmail.com** | **Mobile:** **+91 6383331367**"
    );
  }

  // 4. INITIAL CONTACT INQUIRY STEP 1
  if (/how to contact|how can i reach|want to talk|contact deepak|reach deepak|talk to deepak|get in touch|connect with deepak|contact info|contact detail/.test(q)) {
    return (
      "You can connect with Deepak directly through any of the following channels:\n\n" +
      "• **Email:** **adeepakplm55@gmail.com**\n" +
      "• **Mobile:** **+91 6383331367**\n" +
      "• **LinkedIn:** **https://www.linkedin.com/in/deepak-aruldoss-40426b218**\n" +
      "• **GitHub:** **https://github.com/DeepakAruldoss55**\n\n" +
      "Feel free to share what opportunity or project you’d like to discuss with him!"
    );
  }

  // 5. COMPANY SPECIFIC INTENTS: Apple G Web Technology Pvt Ltd
  if (/apple g|appleg/.test(q)) {
    if (/how many years|how many year|how long|duration|period|tenure|time/.test(q)) {
      return "Deepak worked at **Apple G Web Technology Pvt Ltd** for **3 years and 4 months** (July 2018 – October 2021) as a Software Engineer.";
    }
    if (/skill|tech|stack|language|framework/.test(q)) {
      return (
        "Deepak's skill set at **Apple G Web Technology Pvt Ltd** included:\n\n" +
        "• **Backend:** PHP, Zend Framework, Web Application Development\n" +
        "• **Frontend:** Ext JS, HTML5\n" +
        "• **Databases & APIs:** MySQL, RESTful APIs\n" +
        "• **Environment:** Ubuntu (Linux)"
      );
    }
    if (/role|designation|position|title/.test(q)) {
      return "At **Apple G Web Technology Pvt Ltd**, Deepak worked as a **Software Engineer** (July 2018 – October 2021).";
    }
    if (/responsibilit|work|do|project|achieve|accomplish/.test(q)) {
      return (
        "At **Apple G Web Technology Pvt Ltd** (Jul 2018 – Oct 2021), Deepak's key responsibilities were:\n\n" +
        "• Developed and enhanced client-facing websites and built robust RESTful APIs to support mobile application ecosystems.\n" +
        "• Designed tailored CMS and ERP infrastructures for large-scale manufacturing clients (including the COE Management System and Production ERP).\n" +
        "• Resolved critical production bugs and performance bottlenecks, maintaining high application stability."
      );
    }
    return "Deepak worked at **Apple G Web Technology Pvt Ltd** from **July 2018 to October 2021** (3 years and 4 months) as a **Software Engineer** in Chennai, Tamil Nadu, India.";
  }

  // 6. COMPANY SPECIFIC INTENTS: Novalnet e-Solutions
  if (/novalnet/.test(q)) {
    if (/how many years|how many year|how long|duration|period|tenure|time/.test(q)) {
      return "Deepak worked at **Novalnet e-Solutions** for **1 year and 3 months** (October 2021 – December 2022) as a Software Engineer.";
    }
    if (/skill|tech|stack|language|framework/.test(q)) {
      return (
        "Deepak's skill set at **Novalnet e-Solutions** included:\n\n" +
        "• **E-Commerce & Frameworks:** Shopware 5, Shopware 6, Symfony Framework, Zend, Laravel\n" +
        "• **Frontend & Templating:** Twig, Ext JS, jQuery, JavaScript, Vue.js, React\n" +
        "• **Backend & Database:** Node.js, TypeScript, Doctrine (PHP), OOP, REST APIs, MySQL\n" +
        "• **Environment:** Ubuntu (Linux)"
      );
    }
    if (/role|designation|position|title/.test(q)) {
      return "At **Novalnet e-Solutions**, Deepak worked as a **Software Engineer** (October 2021 – December 2022).";
    }
    if (/responsibilit|work|do|project|achieve|accomplish/.test(q)) {
      return (
        "At **Novalnet e-Solutions** (Oct 2021 – Dec 2022), Deepak's key responsibilities were:\n\n" +
        "• Developed custom e-commerce modules and specialized payment plugins for Shopware 6 and Shopware 5.\n" +
        "• Integrated and configured secure Novalnet payment solutions and customized complex payment workflows.\n" +
        "• Developed an internal **Archive Management System (Archive Portal)** using Node.js, React, and TypeScript with Role-Based Access Control (RBAC)."
      );
    }
    return "Deepak worked at **Novalnet e-Solutions** from **October 2021 to December 2022** (1 year and 3 months) as a **Software Engineer** in Chennai, Tamil Nadu, India.";
  }

  // 7. COMPANY SPECIFIC INTENTS: BrandCrock India Pvt Ltd
  if (/brandcrock|brand crock/.test(q)) {
    if (/how many years|how many year|how long|duration|period|tenure|time|when did.*leave|left/.test(q)) {
      return "Deepak worked at **BrandCrock India Pvt Ltd** for **3 years and 10 months** (**January 2023 – October 2026**) as a Senior Software Developer.";
    }
    if (/skill|tech|stack|language|framework/.test(q)) {
      return (
        "Deepak's skill set at **BrandCrock India Pvt Ltd** included:\n\n" +
        "• **Frontend & Languages:** React.js (Vite), TypeScript, Embedded JavaScript (EJS), JSON\n" +
        "• **Backend & Frameworks:** Node.js, Express.js, Python, FastAPI, PHP, Shopware 6, Odoo 17, REST APIs\n" +
        "• **AI & Emerging Tech:** Generative AI (50%), RAG Pipelines (55%), LLM Integration (35%), Prompt Engineering (50%)\n" +
        "• **Databases & ORM:** MySQL, MongoDB, ChromaDB, Object-Relational Mapping (ORM)\n" +
        "• **Domain & Systems:** Enterprise CRM, E-Commerce Plugins, Payment Gateways (Adyen), POS Systems\n" +
        "• **DevOps & Tools:** Docker, Git, GitHub, Ubuntu (Linux)"
      );
    }
    if (/role|designation|position|title/.test(q)) {
      return "At **BrandCrock India Pvt Ltd**, Deepak worked as a **Senior Software Developer** (January 2023 – October 2026).";
    }
    if (/responsibilit|work|do|project|achieve|accomplish/.test(q)) {
      return (
        "At **BrandCrock India Pvt Ltd** (Jan 2023 – Oct 2026 · **Senior Software Developer**), Deepak's key responsibilities were:\n\n" +
        "• Designed, developed, and maintained scalable backend services using **Node.js and TypeScript** for an enterprise CRM platform.\n" +
        "• Architected and implemented **RESTful APIs** consumed by **React** frontend components and integrated third-party systems.\n" +
        "• Optimized backend performance through code refactoring and query optimization while enforcing clean architecture principles.\n" +
        "• Led the CRM development team, providing technical guidance, conducting code reviews, mentoring developers, and ensuring on-time delivery.\n" +
        "• Built custom **Shopware 6 & 5 plugins** and **Odoo 17** extensions, and won the **Technical Excellence Spot Award (January 2025)**."
      );
    }
    return "Deepak worked at **BrandCrock India Pvt Ltd** from **January 2023 to October 2026** (3 years and 10 months) as a **Senior Software Developer** in Chennai, Tamil Nadu, India.";
  }

  // 8. SPECIFIC PROJECT INTENTS (All 19 Projects including DeepShop)

  // 8-0. DeepShop Flagship Project (`/deep-shop`)
  if (/\b(deepshop|deep shop|eshop|e-shop|ai ecommerce|ai e-commerce|demo video|store health score|business copilot|384-dim|chromadb)\b/.test(q)) {
    if (/chapter|video|timestamp|walkthrough|scene/.test(q)) {
      return (
        "The **DeepShop** interactive walkthrough video (`05:47` HD on **/deep-shop**) features **7 timestamped chapters**:\n\n" +
        "1. **00:00** — Next-Gen Storefront, Instant Search & Department Filtering\n" +
        "2. **00:45** — Admin ERP: Category & Product Master Catalog (`CAT-01` / `PRD-01`)\n" +
        "3. **01:35** — Sales Orders & Invoices + Live Carrier Shipment Tracking\n" +
        "4. **02:25** — DeepShop AI Concierge — Hybrid Vector Search & Interactive Cards\n" +
        "5. **03:06** — AI Store Health Score (**77/100**), Executive KPIs & Action Plan (`AI-01`)\n" +
        "6. **03:55** — Multi-Turn Conversational AI Business Copilot for Merchants\n" +
        "7. **04:55** — Operating Expenses Ledger, CRM LTV Segmentation & SKU Velocity\n\n" +
        "You can watch and jump between chapters on the **/deep-shop** page (accessible from **/projects**)!"
      );
    }
    return (
      "**DeepShop** is Deepak's flagship **AI-Powered E-Commerce & Enterprise ERP Suite** (showcased on **/deep-shop** via the **/projects** page):\n\n" +
      "• **Frontend Storefront & 7-Module Admin ERP:** Built with **React 18 + Vite + TypeScript + Tailwind CSS**, featuring 6 departments, instant tag/search filtering, cart & checkout, Fiscal P&L Statement, Operating Expenses Ledger, and CRM LTV segmentation.\n" +
      "• **Core Commerce Backend:** **Node.js (v20) + Express + TypeScript** engineered with a generic domain repository layer (`Repository<T>`) across 7 domain entities.\n" +
      "• **Customer RAG AI Concierge:** **Python + FastAPI + ChromaDB** powered by a custom **384-dimensional hybrid semantic embedder**, live order/shipment status injection, and interactive in-chat product cards (`[SUGGEST_PRODUCT]`).\n" +
      "• **Merchant BI & Multi-Turn AI Business Copilot:** Computes a 5-pillar **AI Store Health Score (77/100)**, detects SKU price anomalies & dead-stock capital lockup, and provides a stateful Business Copilot with 3-tier LLM failover (Groq → OpenRouter → Offline Deterministic Engine).\n" +
      "• **GitHub Repository:** **https://github.com/DeepakAruldoss55/eshop-ai**"
    );
  }

  // 8-1. Enterprise CRM Infrastructure
  if (/enterprise crm|crm infrastructure|crm platform|crm project/.test(q)) {
    return (
      "**Enterprise CRM Infrastructure** (*Node.js, React* — ERP / Business Logic):\n\n" +
      "Designed, developed, and maintained scalable backend services using **Node.js and TypeScript** for an enterprise CRM platform. Architected secure **RESTful APIs** consumed by **React** frontend components, integrated third-party services, and improved performance through query optimization.\n\n" +
      "• **Key Features:**\n" +
      "  - Scalable Node.js & TypeScript Backend Architecture\n" +
      "  - RESTful API Design & Third-Party System Integration\n" +
      "  - Seamless React Frontend Integration & High Security\n" +
      "  - Code Refactoring, Query Optimization & Code Reviews"
    );
  }

  // 8-2. Customer Discount Request
  if (/customer discount request|discount request|price discount|discount proposal/.test(q)) {
    return (
      "**Customer Discount Request** (*Shopware 6 Plugin* — Ecommerce):\n\n" +
      "Allows registered users to request custom price discounts and quantities for bulk product orders. Merchants can review, approve, or reject proposals from a dedicated backend section, configure per-product min/max order quantities and discount percentage limits, and notify customers upon login.\n\n" +
      "• **Key Features:**\n" +
      "  - User-Created Custom Discounted Prices & Quantities\n" +
      "  - Merchant Proposal Approval & Login Notifications\n" +
      "  - Granular Min/Max Quantity & Discount Limit Controls\n" +
      "  - Bulk Sales Support for Wholesalers & Retailers"
    );
  }

  // 8-3. Customer Membership Offer / Program
  if (/customer membership|membership offer|membership program|silver.*gold.*platinum/.test(q)) {
    return (
      "**Customer Membership Offer** (*Shopware 6 Plugin* — Ecommerce):\n\n" +
      "Categorizes registered users into **Silver, Gold, and Platinum** membership tiers based on cumulative purchase milestones. Automatically upgrades user plans to unlock higher cart discount percentages on subsequent orders, with backend controls for product eligibility and manual plan locking.\n\n" +
      "• **Key Features:**\n" +
      "  - Tiered Silver, Gold & Platinum Loyalty Milestones\n" +
      "  - Automated Plan Upgrades & Next-Order Cart Discounts\n" +
      "  - Backend Product Eligibility & Plan Criteria Control\n" +
      "  - Manual Admin Plan Override, Upgrade & Freeze Locks"
    );
  }

  // 8-4. Ticket System
  if (/ticket system|event ticket|buy ticket|floating ticket/.test(q)) {
    return (
      "**Ticket System** (*Shopware 6 Plugin* — Ecommerce):\n\n" +
      "Provides a dedicated storefront event ticketing system accessible via a floating **Ticket** launcher. Displays scheduled events with live available ticket counts, venue locations, date/time slots, and quantity selectors, integrating with checkout and generating unique ticket IDs (e.g. `Ticket-7836131`) in customer orders.\n\n" +
      "• **Key Features:**\n" +
      "  - Floating Storefront Ticket Launcher & Event Hub\n" +
      "  - Live Available Ticket Inventory, Venue & Time Slots\n" +
      "  - Seamless Cart & Checkout Quantity Integration\n" +
      "  - Automated Unique Ticket ID Generation in Orders"
    );
  }

  // 8-5. Order Status Analytics
  if (/order status analytics|order analytics|doughnut|pie chart/.test(q)) {
    return (
      "**Order Status Analytics** (*Shopware 6 Plugin* — Ecommerce):\n\n" +
      "Renders interactive order analytics directly inside the customer's **Orders** account section. Allows users to toggle dynamically between **Doughnut** and **Pie** charts with hover tooltips to track real-time order counts across **Open, In Progress, Done, and Cancelled** lifecycle stages synced from Shopware Administration.\n\n" +
      "• **Key Features:**\n" +
      "  - Interactive Doughnut & Pie Chart Type Switcher\n" +
      "  - Color-Coded Open, In Progress, Done & Cancelled\n" +
      "  - Hover Tooltips with Exact Per-Status Order Counts\n" +
      "  - Real-Time Sync with Shopware Admin Order Statuses"
    );
  }

  // 8-6. Customer Profile Picture
  if (/customer profile picture|profile picture|profile photo|upload avatar/.test(q)) {
    return (
      "**Customer Profile Picture** (*Shopware 6 Plugin* — Ecommerce):\n\n" +
      "Enables registered customers to personalize their Shopware 6 account by uploading a profile avatar from the **Account Overview** page. Enforces **JPG, JPEG, and PNG** format and **100 KB** size validation, displaying the circular avatar in the account sidebar and syncing with Admin custom fields.\n\n" +
      "• **Key Features:**\n" +
      "  - Account Overview Profile Picture Upload & Update\n" +
      "  - Strict JPG/JPEG/PNG Format & 100 KB Size Validation\n" +
      "  - Persistent Circular Avatar in Customer Sidebar\n" +
      "  - Admin Customer Profile Custom Field Synchronization"
    );
  }

  // 8-7. Credit Points (Loyalty / SuperCoins)
  if (/credit points|supercoin|supercoins|super coin/.test(q)) {
    return (
      "**Credit Points (Loyalty)** (*Shopware 5 Plugin* — Ecommerce):\n\n" +
      "Awards customer loyalty credit points as **SuperCoins** based on order spend or product rules, enabling instant cash discount redemption during checkout on future purchases.\n\n" +
      "• **Key Features:**\n" +
      "  - SuperCoins Loyalty Point Engine\n" +
      "  - Global & Per-Product Point Rules\n" +
      "  - Checkout Cash Discount Redemption\n" +
      "  - Storefront Credit Badges & Banners"
    );
  }

  // 8-8. Adyen Payment Customization
  if (/adyen|automatic capture|partial refund/.test(q)) {
    return (
      "**Adyen Payment Customization** (*Shopware 5* — Ecommerce):\n\n" +
      "Customized the Adyen payment plugin to support automatic capture status upon order confirmation and implemented partial refund capabilities for high-volume transactions.\n\n" +
      "• **Key Features:** Automatic Capture Logic, Partial Refund Workflows, Store-Specific Payment Integration, Optimized Transaction Flow."
    );
  }

  // 8-9. Review Synchronization Engine
  if (/review sync|review synchronization/.test(q)) {
    return (
      "**Review Synchronization Engine** (*Shopware 6* — Ecommerce):\n\n" +
      "Automated cross-shop review synchronization for multi-store networks. Syncs customer feedback in real time when products share identical global identifiers (SKUs).\n\n" +
      "• **Key Features:** Automated Sync Logic, SKU-Based Mapping, Real-time Feedback Consistency, Data Integrity Safeguards."
    );
  }

  // 8-10. Category Discount Plugin
  if (/category discount/.test(q)) {
    return (
      "**Category Discount Plugin** (*Shopware 6* — Ecommerce):\n\n" +
      "Allows admins to configure category-wide discounts (percentage or fixed) that apply dynamically across all mapped products during browsing and checkout, including promotional banner integration.\n\n" +
      "• **Key Features:** Category-Level Logic, Dynamic Price Calculation, Promotional Banner Integration, Bulk Discount Management."
    );
  }

  // 8-11. Site Performance Optimization
  if (/site performance|core web vitals|webp|lazy-loading/.test(q)) {
    return (
      "**Site Performance Optimization** (*Shopware 6* — Ecommerce / Performance):\n\n" +
      "Full-scale frontend optimization to improve SEO and Core Web Vitals, implementing WebP image conversion, Alt-tag orchestration, lazy-loading optimization, and CSS redundancy removal."
    );
  }

  // 8-12. Archive Portal (Cloud Storage & RBAC)
  if (/archive portal|archive management|cloud storage|rbac|google drive/.test(q)) {
    return (
      "**Archive Portal (Cloud Storage)** (*Node.js, React & TypeScript* — Internal Tools):\n\n" +
      "Secure document management system similar to Google Drive. Provides project-isolated file storage with granular Admin/Employee **Role-Based Access Control (RBAC)**, file lifecycle management, and dashboard analytics."
    );
  }

  // 8-13 to 8-16. Odoo 17 Projects
  if (/odoo|geocoding|event module|sponsor allocation/.test(q)) {
    return (
      "Deepak has engineered **4 specialized Odoo 17 Ticket Booking & Enterprise modules**:\n\n" +
      "1. **Custom Backend UI Design:** Bespoke branded Odoo backend theme aligned with client operational workflows.\n" +
      "2. **Custom Frontend Theme:** Mobile-first, high-performance frontend layout, typography, and brand identity overhaul.\n" +
      "3. **Geocoding API Integration:** Leveraged **Google Geocoding API** to dynamically display nearby events within a predefined coordinate radius.\n" +
      "4. **Event Module Extension:** Automated post-booking digital payment links and a sponsor allocation hub to boost event participation."
    );
  }

  // 8-17. COE Management System
  if (/\bcoe\b|controller of examination|exam scheduling|question encoding/.test(q)) {
    return (
      "**COE Management System** (*Zend Framework* — Education):\n\n" +
      "End-to-end institution examination management system covering exam scheduling, automated online fee processing, secure question encoding, digital result analysis, and certificate issuance."
    );
  }

  // 8-18. Enterprise ERP (Production)
  if (/production erp|manufacturing erp|laravel erp/.test(q)) {
    return (
      "**Enterprise ERP (Production)** (*Laravel* — Manufacturing):\n\n" +
      "Enterprise-grade ERP for manufacturing units managing product planning, automated cost estimation, inventory logistics control, and end-to-end shipping/payment workflows."
    );
  }

  // 8b. SHOPWARE PLUGINS OVERVIEW
  if (/shopware|plugin|plugins/.test(q)) {
    return (
      "Deepak is an official **Shopware 6 Certified Developer** and has built numerous Shopware 6 & 5 plugins and customizations:\n\n" +
      "• **Customer Discount Request (SW6):** Custom bulk price/quantity discount proposals with merchant backend approval and login notifications.\n" +
      "• **Customer Membership Offer (SW6):** Silver, Gold & Platinum loyalty tiers with auto plan upgrades, cart discounts, and manual admin freeze locks.\n" +
      "• **Ticket System (SW6):** Floating storefront Ticket launcher, live event inventory & venue cards, checkout integration, and unique order Ticket IDs.\n" +
      "• **Order Status Analytics (SW6):** Interactive Doughnut & Pie chart switcher in the customer Orders page with real-time status counts.\n" +
      "• **Customer Profile Picture (SW6):** Account Overview avatar upload with JPG/JPEG/PNG & 100 KB validation and Admin custom field sync.\n" +
      "• **Credit Points / SuperCoins (SW5):** Loyalty points on spend/products redeemable as cash discounts at checkout.\n" +
      "• **Client & Enterprise Extensions:** Adyen Payment Customization, Review Synchronization Engine, Category Discount Plugin, and Core Web Vitals Optimization."
    );
  }

  // 8c. GENERAL PROJECTS / CASE STUDIES OVERVIEW
  if (/project|projects|case stud|portfolio work|what has he built|built/.test(q)) {
    return (
      "Deepak has delivered **30+ production projects** across AI E-Commerce, Enterprise CRM/ERP, Shopware, and Odoo:\n\n" +
      "• **Flagship AI Showcase:** **DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite** (`/deep-shop` — React 18, Node.js, FastAPI, ChromaDB 384-dim RAG, 77/100 Health Score BI & AI Copilot)\n" +
      "• **Enterprise Systems:** **Enterprise CRM Infrastructure** (Node.js, TypeScript, React) & **Archive Portal Cloud Storage** (Node.js, TypeScript, RBAC)\n" +
      "• **Shopware 6 & 5 Plugins:** Customer Discount Request, Customer Membership Offer, Ticket System, Order Status Analytics, Customer Profile Picture, Credit Points (SuperCoins), Adyen Payment Customization, Review Synchronization Engine, Category Discount, and Site Performance Optimization\n" +
      "• **Odoo 17 & ERP/Education:** Custom Backend/Frontend Themes, Google Geocoding API Integration, Event Module Extension, COE Management System (Zend), and Manufacturing ERP (Laravel)\n\n" +
      "Ask me about any specific project above for full details!"
    );
  }

  // 9a. AI / GENERATIVE AI / RAG / LLM SPECIFIC INTENT
  if (/\b(ai|artificial intelligence|generative ai|genai|rag|llm|llms|prompt engineering|fastapi)\b/.test(q)) {
    return (
      "Deepak has hands-on exposure (**35%–55% proficiency**) in AI-driven technologies and their practical integration into modern web applications (demonstrated in his flagship **DeepShop** ecosystem at **/deep-shop**):\n\n" +
      "• **RAG Pipelines (55%):** Retrieval-Augmented Generation with ChromaDB vector search & custom 384-dim hybrid semantic embeddings\n" +
      "• **Generative AI (50%):** Integrating generative AI capabilities, executive BI synthesis, and AI copilots into web workflows\n" +
      "• **Prompt Engineering (50%):** Structured system prompts, live catalog/ledger grounding, and anti-hallucination guardrails\n" +
      "• **LLM Integration (35%):** Multi-tier cloud & local LLM orchestration (Groq, OpenRouter, Ollama, deterministic failover)\n" +
      "• **Python & FastAPI (70%):** High-performance asynchronous microservices serving AI & RAG pipelines"
    );
  }

  // 9b. GENERAL TECHNICAL SKILLS & STACK
  if (/skill|tech stack|technology|technologies|framework|node|react|typescript|backend|frontend|python|php|database|mysql|mongodb|docker/.test(q)) {
    return (
      `Deepak is a Senior Full Stack Developer with **${exp.decimal}** (${exp.full}) of professional experience:\n\n` +
      "• **Modern Stack & Frameworks:** Node.js with TypeScript (90%), React (Vite) with TypeScript (80%), Express.js (90%), Embedded JavaScript (EJS) (75%)\n" +
      "• **Data & Infrastructure:** MySQL & Relational Databases (90%), MongoDB (NoSQL) (70%), Docker & Containerization (75%), Linux (Ubuntu) & Git (70%)\n" +
      "• **Backend & Ecosystems:** PHP (Symfony/Laravel) (90%), Python & FastAPI (70%), API & System Integration (95%), E-commerce Architecture (92%)\n" +
      "• **AI & Generative Tech:** RAG Pipelines (55%), Generative AI (50%), Prompt Engineering (50%), LLM Integration (35%)"
    );
  }

  // 9c. ECOSYSTEM EXPERTISE / PLATFORMS
  if (/ecosystem|platform|payment gateway|stripe|erp|cms/.test(q)) {
    return (
      "Deepak's **Ecosystem Expertise** spans 6 core enterprise domains:\n\n" +
      "• **E-commerce:** High-performance storefronts, custom Shopware 5/6 plugins, and checkout optimizations\n" +
      "• **ERP Systems:** Custom ERP suites automating manufacturing, inventory, P&L financials, and supply chain logistics\n" +
      "• **CRM Portals:** Secure, data-driven customer relationship platforms with Node.js, TypeScript, and React\n" +
      "• **CMS:** Scalable content management systems for education and enterprise with granular RBAC\n" +
      "• **Payment Gateways:** Customizing **Adyen, Stripe, and Novalnet** modules for global transactions and compliance\n" +
      "• **API Ecosystems:** Engineering RESTful and SOAP API architectures for third-party synchronization"
    );
  }

  // 10. EDUCATION / ACADEMIC FOUNDATION
  if (/education|college|degree|university|school|diploma|academic|study|studied|b\.e|graduate|graduated|erode|nagapattinam|peralam/.test(q)) {
    return (
      "Here is Deepak's **Academic Foundation**:\n\n" +
      "1. **Bachelor of Engineering (B.E.) in Computer Science & Engineering** (2015 – 2018)\n" +
      "   *Government College of Engineering, Erode*\n\n" +
      "2. **Diploma in Computer Science & Engineering** (2012 – 2015)\n" +
      "   *Valivalam Desikar Polytechnic College, Nagapattinam*\n\n" +
      "3. **10th Grade (SSLC)** (Completed in 2012)\n" +
      "   *Government Higher Secondary School, Peralam*"
    );
  }

  // 11. LANGUAGES & LOCATION
  if (/language|speak|english|tamil/.test(q)) {
    return "Deepak is fluent in **English** and **Tamil**.";
  }
  if (/location|where is he|where does he live|city|chennai|based in|country/.test(q)) {
    return "Deepak is based in **Chennai, Tamil Nadu, India**.";
  }

  // 12. EXPERIENCE & COMPANIES
  if (/experience|company|companies|work|career|history|background|first company|journey/.test(q)) {
    if (/first company|1st company/.test(q)) {
      return "Deepak's first company was **Apple G Web Technology Pvt Ltd**, where he started his career as a Software Engineer in July 2018.";
    }
    if (/how many years|total experience|years of experience/.test(q)) {
      return `Deepak has **${exp.decimal}** (${exp.full}) of professional software development experience (July 2018 – October 2026).`;
    }
    return (
      `Deepak has **${exp.full}** (${exp.decimal}) of professional software development experience across 3 companies:\n\n` +
      "1. **BrandCrock India Pvt Ltd** (Jan 2023 – Oct 2026 · 3 yrs 10 mos) — *Senior Software Developer*\n" +
      "   Designed and maintained scalable Node.js & TypeScript backend services and RESTful APIs consumed by React components for an enterprise CRM platform, led the CRM team, and won the Spot Award (Jan 2025).\n\n" +
      "2. **Novalnet e-Solutions** (Oct 2021 – Dec 2022 · 1 yr 3 mos) — *Software Engineer*\n" +
      "   Developed custom Shopware payment plugins, Novalnet gateway integrations, and a Node.js/TypeScript Archive Management System with RBAC.\n\n" +
      "3. **Apple G Web Technology Pvt Ltd** (Jul 2018 – Oct 2021 · 3 yrs 4 mos) — *Software Engineer*\n" +
      "   Built client websites, RESTful APIs for mobile apps, and tailored CMS/ERP infrastructures using PHP, Zend, Ext JS, and MySQL."
    );
  }

  // 13. CERTIFICATIONS & AWARDS
  if (/certif|award|honor|spot award|shopware certified|uptop|ciicp/.test(q)) {
    return (
      "Here are Deepak's key **Certifications & Honors**:\n\n" +
      "• **Technical Excellence - Spot Award Winner (January 2025):** Awarded by BrandCrock India Pvt Ltd for exceptional technical excellence and scalable Node.js & TypeScript backend architecture.\n" +
      "• **Shopware 6 Certified Developer (May 2023):** Validated mastery of Shopware 6 core architecture, plugin systems, template engines, and event-driven logic.\n" +
      "• **UpTop AI/ML Certification (In Progress):** Advancing practical expertise in AI/ML, LLM integration, and RAG pipelines.\n" +
      "• **Canada India Institutional Cooperation Project (CIICP) (March 2015):** Certification in Computer Hardware, Servicing, and Networking."
    );
  }

  // 14. CI/CD & SHELL SCRIPTING CLARIFICATION
  if (/ci\/cd|cicd|devops|pipeline|shell script|bash script/.test(q)) {
    return (
      "Deepak's core strength is focused on **Full Stack & Backend Architecture** (Node.js, TypeScript, React, Express, PHP, Python/FastAPI, and databases). " +
      "While he uses Docker and standard Linux commands comfortably, he does not specialize in dedicated CI/CD DevOps pipelines or advanced shell scripting."
    );
  }

  // 15. GREETINGS & INTRO
  if (/^hi\b|^hello\b|^hey\b|^hai\b|^greetings|^good (morning|afternoon|evening)/.test(q)) {
    return (
      "Hey there! 👋 I’m **Sara**, Deepak’s AI companion.\n\n" +
      "You can ask me anything about:\n" +
      "• **Flagship AI Project:** DeepShop (`/deep-shop`)\n" +
      "• **Case Studies & Plugins:** Enterprise CRM, Customer Discount Request, Membership Offer, Ticket System, Order Status Analytics, Profile Picture & Credit Points\n" +
      "• **Experience & Skills:** 8.3 years across BrandCrock, Novalnet & Apple G\n" +
      "• **Contact Details:** Email (`adeepakplm55@gmail.com`) & Mobile (`+91 6383331367`)"
    );
  }

  // 16. WHO IS DEEPAK / SARA / ABOUT
  if (/who are you|who is sara|what are you/.test(q)) {
    return (
      "I'm **Sara**, the interactive assistant on **Deepak Aruldoss's** portfolio! " +
      "I can answer questions about Deepak's 8.3 years of full-stack engineering experience, his flagship **DeepShop** AI-powered E-Commerce & ERP suite, his Shopware 6/5 plugins, technical skills, certifications, and contact information."
    );
  }

  if (/who is deepak|about deepak|tell me about deepak|summary|profile/.test(q)) {
    return (
      "**Deepak Aruldoss** is a **Senior Full Stack Developer** based in Chennai, India, with **8.3 years (8y 3m)** of experience architecting enterprise web applications, scalable backends, and e-commerce ecosystems:\n\n" +
      "• **Core Stack:** Node.js (90%), TypeScript (90%), Express.js (90%), React (80%), PHP/Symfony/Laravel (90%), Python & FastAPI (70%), MySQL (90%), MongoDB (70%), Docker (75%)\n" +
      "• **AI & RAG Exposure:** RAG Pipelines (55%), Generative AI (50%), Prompt Engineering (50%), LLM Integration (35%)\n" +
      "• **Track Record:** 30+ delivered projects, 10+ global clients, Shopware 6 Certified Developer, and Spot Award Winner (2025)\n" +
      "• **Contact:** **adeepakplm55@gmail.com** | **+91 6383331367**"
    );
  }

  // DEFAULT CONVERSATIONAL RESPONSE
  return (
    "Here is a quick overview of **Deepak Aruldoss's** portfolio — feel free to ask about any specific topic:\n\n" +
    "• **Role & Experience:** Senior Software Developer with **8.3 years (8y 3m)** across **BrandCrock India**, **Novalnet e-Solutions**, and **Apple G Web Technology**\n" +
    "• **Flagship AI Showcase:** **DeepShop** (`/deep-shop`) — React 18, Node.js, FastAPI & ChromaDB 384-dim RAG E-Commerce + 7-Module ERP\n" +
    "• **Featured Projects:** Enterprise CRM Infrastructure, Customer Discount Request, Customer Membership Offer, Ticket System, Order Status Analytics, Customer Profile Picture, Credit Points (SuperCoins), Adyen Payment, Archive Portal & Odoo 17\n" +
    "• **Direct Contact:** **adeepakplm55@gmail.com** | **+91 6383331367**"
  );
};

const INITIAL_MESSAGE = {
  role: "bot",
  content:
    "Hi there! 👋 I'm **Sara**.\n\n" +
    "What brings you here today, or how can I help you?"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Auto-focus input when opened or after Sara finishes responding
  useEffect(() => {
    if (isOpen && !isLoading) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  // Prevent background page scrolling when interacting with chat window
  useEffect(() => {
    const el = chatWindowRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e) => {
      const messagesEl = el.querySelector(".chatbot-messages");
      if (!messagesEl) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = messagesEl;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1) ||
        (isScrollingUp && scrollTop <= 0)
      ) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const history = newMessages
      .filter((m) => m.role !== "system")
      .slice(-6)
      .map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content
      }));

    try {
      const endpoints = getApiEndpoints();
      let responseData = null;
      let lastError = null;

      for (const base of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);
          const url = base ? `${base}/api/chat` : "/api/chat";
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: textToSend,
              history: history
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            responseData = await res.json();
            break;
          } else {
            lastError = new Error(`HTTP ${res.status}`);
          }
        } catch (err) {
          lastError = err;
        }
      }

      if (!responseData) {
        throw lastError || new Error("Failed to reach server");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: responseData.reply || "I received an empty response."
        }
      ]);
    } catch (err) {
      // If backend is unavailable (e.g., on static GitHub Pages), generate intelligent client response
      const clientReply = generateClientResponse(textToSend, history);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: clientReply
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Robust Markdown-like formatting helper
  const formatContent = (text) => {
    if (!text) return "";

    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 1 (# ...)
      if (trimmed.startsWith("# ")) {
        return (
          <div key={idx} className="msg-heading h1">
            {trimmed.replace(/^#\s+/, "")}
          </div>
        );
      }
      // Heading 2 (## ...)
      if (trimmed.startsWith("## ")) {
        return (
          <div key={idx} className="msg-heading h2">
            {trimmed.replace(/^##\s+/, "")}
          </div>
        );
      }
      // Heading 3 (### ...)
      if (trimmed.startsWith("### ")) {
        return (
          <div key={idx} className="msg-heading h3">
            {trimmed.replace(/^###\s+/, "")}
          </div>
        );
      }

      // Helper to parse bold, italic, code, and links in inline text
      const parseInline = (str) => {
        const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s)]+)/g;
        const tokens = str.split(regex);

        return tokens.map((tok, pIdx) => {
          if (!tok) return null;
          if (tok.startsWith("**") && tok.endsWith("**") && tok.length >= 4) {
            return <strong key={pIdx}>{tok.slice(2, -2)}</strong>;
          }
          if (tok.startsWith("*") && tok.endsWith("*") && tok.length >= 2) {
            return <em key={pIdx}>{tok.slice(1, -1)}</em>;
          }
          if (tok.startsWith("`") && tok.endsWith("`") && tok.length >= 2) {
            return <code key={pIdx} className="msg-code">{tok.slice(1, -1)}</code>;
          }
          // Markdown link [title](url)
          const linkMatch = tok.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
          if (linkMatch) {
            return (
              <a
                key={pIdx}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="msg-link"
              >
                {linkMatch[1]}
              </a>
            );
          }
          // Raw URL
          if (tok.startsWith("http://") || tok.startsWith("https://")) {
            return (
              <a
                key={pIdx}
                href={tok}
                target="_blank"
                rel="noopener noreferrer"
                className="msg-link"
              >
                {tok}
              </a>
            );
          }
          return tok;
        });
      };

      // Bullet points (- or * or •)
      const bulletMatch = line.match(/^(\s*)([-*•])\s+(.*)$/);
      if (bulletMatch) {
        const indentLevel = Math.floor(bulletMatch[1].length / 2);
        const bulletText = bulletMatch[3];
        return (
          <div
            key={idx}
            className="msg-list-item"
            style={{
              paddingLeft: `${(indentLevel + 1) * 14}px`,
              marginBottom: "4px"
            }}
          >
            <span className="bullet-dot">•</span>
            <span className="bullet-content">{parseInline(bulletText)}</span>
          </div>
        );
      }

      // Empty line spacer
      if (trimmed === "") {
        return <div key={idx} style={{ height: "6px" }} />;
      }

      // Regular paragraph
      return (
        <div key={idx} className="msg-paragraph" style={{ marginBottom: "4px" }}>
          {parseInline(line)}
        </div>
      );
    });
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Launcher Button */}
      <button
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Sara" : "Chat with Sara (AI Assistant)"}
        aria-label="Open Sara AI Assistant"
      >
        <span className="launcher-badge">Sara</span>
        <i className={isOpen ? "bi bi-x-lg" : "bi bi-chat-dots-fill"}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" ref={chatWindowRef}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="avatar-wrapper">
                <i className="bi bi-chat-dots-fill"></i>
                <span className="status-dot"></span>
              </div>
              <div className="header-text">
                <h4>Sara</h4>
                <span className="ai-tag">
                  <i className="bi bi-circle-fill text-success" style={{ fontSize: "6px", marginRight: "4px" }}></i>
                  AI Companion • Ready to chat
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="header-btn"
                onClick={clearChat}
                title="Clear Conversation"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
              <button
                className="header-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.role}`}>
                <div className="msg-bubble">
                  {formatContent(msg.content)}
                </div>
              </div>
            ))}


            {isLoading && (
              <div className="message-row bot">
                <div className="msg-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            className="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
