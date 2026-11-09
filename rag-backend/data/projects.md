# Portfolio Projects & Case Studies by Deepak Aruldoss

Deepak has engineered over 30+ production projects across Enterprise Systems, AI-powered E-commerce & ERP suites, Shopware plugins, and APIs:

### 0. DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite (Flagship Showcase at `/deep-shop`)
- **Platform**: React 18, TypeScript, Vite, Tailwind CSS, Node.js (v20), Express, Python, FastAPI, ChromaDB, Multi-Tier LLMs (Groq / OpenRouter)
- **Domain**: AI E-Commerce, RAG Concierge & Enterprise ERP Business Intelligence
- **GitHub Link**: https://github.com/DeepakAruldoss55/eshop-ai
- **Role**: Full-Stack & Applied AI Engineer
- **Details**:
  - **Customer Storefront (`client/`)**: Responsive React 18 + TypeScript storefront with 6 departments, instant tag/search filtering, product quick-view modal, slide-over cart drawer with free-shipping progress, multi-step checkout pipeline, and live GPS carrier tracking timeline.
  - **Core Commerce & ERP Backend (`server/`)**: Node.js + Express + TypeScript REST API engineered with a generic domain repository pattern (`Repository<T>`) and atomic transactional persistence across 7 core domain entities (`categories`, `products`, `customers`, `customer_addresses`, `orders`, `shipping`, `expenses`).
  - **Customer RAG AI Concierge (`ai-service/`)**: FastAPI + ChromaDB microservice using a custom 384-dimensional hybrid semantic embedder (`LightweightSemanticEmbeddingFunction` with 8.0x exact ID boosting, word bigrams, character 4-gram typo tolerance, and 15 e-commerce concept clusters), live order/shipping cache synchronization, and interactive UI tag extraction (`[SUGGEST_PRODUCT]`, `[ACTION]`).
  - **7-Module Admin ERP & AI Business Copilot**: Features Fiscal P&L Income Statement (`OVW-01`), AI Store Health Score (77/100) & Executive KPIs (`AI-01`), SKU price-anomaly & dead-stock capital lockup detection, CRM LTV buyer segmentation, and a stateful multi-turn AI Business Copilot (`ask_advisor`) backed by a 3-tier LLM failover cascade (Groq Pool → OpenRouter → Offline Deterministic Engine).

### 1. Enterprise CRM Infrastructure
- **Platform**: Node.js, TypeScript, React
- **Domain**: ERP / Business Logic / Enterprise
- **Role**: Senior Architect
- **Details**: Architected and engineered a high-performance, scalable CRM ecosystem powering complex business workflows. Features include high-load distributed architecture, real-time POS engine synchronization, modular RESTful APIs, and React/TypeScript frontend orchestration.

### 2. Customer Discount Request Plugin (Shopware 6)
- **Platform**: Shopware 6 / PHP / Symfony
- **Domain**: E-commerce Storefront & Admin
- **Link**: https://store.shopware.com/en/brand27683468217m/customer-discount-request.html
- **Details**: Enables registered store customers to negotiate price discounts dynamically. Shop owners can review, approve, or reject proposals in real-time with granular controls for minimum/maximum quantities and percentage discounts.

### 3. Customer Membership Program (Shopware 6)
- **Platform**: Shopware 6
- **Domain**: E-commerce Loyalty
- **Link**: https://store.shopware.com/en/brand53235685891m/customer-membership-program.html
- **Details**: Tiered loyalty system (Silver, Gold, Platinum) where users qualify for dynamic cart discounts based on lifetime purchase milestones. Includes admin overrides and automatic tier upgrading.

### 4. Ticket System Plugin (Shopware 6)
- **Platform**: Shopware 6
- **Domain**: E-commerce Event Management
- **Link**: https://store.shopware.com/en/brand11399667561m/ticket-system.html
- **Details**: Complete event ticketing management module allowing admins to create events with scheduled timings and manage real-time inventory for digital ticket sales directly on the digital storefront.

### 5. Order Status Analytics (Shopware 6)
- **Platform**: Shopware 6
- **Link**: https://store.shopware.com/en/brand86225088288m/order-status-analytics.html
- **Details**: Advanced visual lifecycle tracker giving customers transparency over order status (Open, In Progress, Done, Cancelled) to increase trust and satisfaction.

### 6. Customer Profile Picture Module (Shopware 6)
- **Platform**: Shopware 6
- **Link**: https://store.shopware.com/en/brand19607501195m/customer-profile-picture.html
- **Details**: Personalization module supporting secure image uploads (JPG/JPEG/PNG), automated size validation, and account-level image management.

### 7. Credit Points (SuperCoins Loyalty) (Shopware 5)
- **Platform**: Shopware 5
- **Link**: https://store.shopware.com/en/brand29157832267/credit-points.html
- **Details**: Calculates reward points on purchase value that can be redeemed as instant cash discounts during checkout, driving retention and repeat purchases.

### 8. Adyen Payment Customization
- **Platform**: Shopware 5
- **Domain**: Fintech & Payments
- **Details**: Customized the Adyen payment plugin to support automatic capture upon order confirmation and implemented robust partial refund workflows for high-volume transactions.

### 9. Review Synchronization Engine
- **Platform**: Shopware 6
- **Domain**: E-commerce Multi-Store Network
- **Details**: Automated cross-store review synchronization across multi-shop networks when products share identical global SKUs, safeguarding data integrity in real time.

### 10. Category Discount Plugin
- **Platform**: Shopware 6
- **Details**: Dynamic category-wide discount engine applying fixed or percentage discounts across all mapped products with promotional banner integration.

### 11. Site Performance & Core Web Vitals Optimization
- **Platform**: Shopware 6 / Web Performance
- **Details**: Full-scale optimization overhaul including WebP image pipeline, lazy loading, CSS purging, and SEO/accessibility enhancements.

### 12. Archive Portal (Cloud Storage & RBAC)
- **Platform**: Node.js & TypeScript
- **Domain**: Internal Tools / Cloud Drive
- **Details**: Secure document management system similar to Google Drive, featuring project-isolated file storage, role-based access control (RBAC), and analytics dashboards.

### 13. Custom Odoo 17 Backend UI & Frontend Theme
- **Platform**: Odoo 17
- **Domain**: Ticket Booking & Enterprise
- **Details**: Designed bespoke branded UI themes for both backend administration and mobile-first responsive frontend customer experiences.

### 14. Geocoding API & Event Module Extensions
- **Platform**: Odoo 17 / Google Maps API
- **Details**: Radius-based event discovery using Google Geocoding API, post-booking digital payment links, and sponsor allocation workflows.

### 15. COE (Controller of Examinations) Management System
- **Platform**: Zend Framework
- **Domain**: Education Institution
- **Details**: End-to-end exam lifecycle management covering scheduling, online fee payments, question encoding, and automated result generation.

### 16. Enterprise Production ERP
- **Platform**: Laravel / PHP / MySQL
- **Domain**: Manufacturing
- **Details**: Industrial ERP covering production planning, raw material inventory, cost estimation, and automated shipping workflows.
