# Portfolio Projects & Case Studies by Deepak Aruldoss

Deepak Aruldoss has engineered over 30+ production projects across AI-Powered E-Commerce & Enterprise ERP suites, Enterprise CRM Systems, Shopware 5 & 6 Extensions, Payment Gateways, Odoo 17 Modules, and Full-Stack Web Applications:

## 0. DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite (Flagship Showcase at `/deep-shop`)
- **Platform**: React 18, TypeScript, Vite, Tailwind CSS, Node.js (v20), Express, Python, FastAPI, ChromaDB, Multi-Tier LLMs (Groq / OpenRouter / Offline Engine)
- **Domain**: AI E-Commerce, RAG Concierge & Enterprise ERP Business Intelligence
- **GitHub Repository**: https://github.com/DeepakAruldoss55/eshop-ai
- **Portfolio Showcase URL**: `/deep-shop` (accessible from the `/projects` page)
- **Role**: Full-Stack & Applied AI Engineer
- **Interactive Demo Video (`deepshop.mp4` — 05:47 HD Walkthrough with 7 Timestamped Chapters)**:
  1. **00:00 — Next-Gen Storefront, Instant Search & Department Filtering**: Showcases the high-conversion React 18 + TypeScript storefront with spotlight hero deals, 6 curated departments, popular tag pills (`#ANC`, `#Flagship`, `#SpatialAudio`), multi-criteria sorting, and dynamic customer profile switching (Deepak, Sara, Shifa).
  2. **00:45 — Admin ERP: Category & Product Master Catalog (`CAT-01` / `PRD-01`)**: Transitions into the 7-module Enterprise Admin ERP, demonstrating full CRUD category taxonomy management and the 15-SKU product master inventory table with automated profit margin percentages, unit cost tracking, and stock level health badges.
  3. **01:35 — Sales Orders & Invoices + Live Carrier Shipment Tracking**: Walks through the transactional Sales Orders & Invoices engine (`ORD-01`) and Logistics & Shipments tracker (`SHP-01`), highlighting itemized tax/shipping breakdowns, fulfillment state transitions (`DELIVERED`, `SHIPPED`, `PROCESSING`), and real-time carrier tracking numbers.
  4. **02:25 — DeepShop AI Concierge — Hybrid Vector Search & Interactive Cards**: Demonstrates the floating storefront AI assistant powered by FastAPI and ChromaDB. Answers natural-language product queries, grounds responses in live stock & warranty policies, and renders interactive product cards (`[SUGGEST_PRODUCT]`) and action triggers (`[ACTION]`) directly inside the chat stream.
  5. **03:06 — AI Store Health Score (`77/100`), Executive KPIs & Action Plan (`AI-01`)**: Reveals the Admin ERP AI Analytics & Statistics Command Center. Synthesizes live financial ledgers to display a 5-pillar Store Health Score (`77/100`), 30-day revenue/EBIT projections, SKU price-anomaly alerts, dead-stock capital lockup warnings, and prioritized strategic recommendations.
  6. **03:55 — Multi-Turn Conversational AI Business Copilot for Merchants**: Demonstrates the stateful Merchant AI Copilot (`ask_advisor`) answering operational queries in real time—extracting full itemized order details (`ORD-2026-0006`), analyzing net profit margins & ROAS (`3.38x`), and generating a 90-day strategic roadmap with clickable follow-up chips.
  7. **04:55 — Operating Expenses Ledger, CRM LTV Segmentation & SKU Velocity**: Concludes with a tour of the Operating Expenses Breakdown (Payroll, Warehouse, Utilities, Logistics), Customer Accounts & CRM Lifetime Value (LTV) segmentation (`VIP Champion`, `Repeat Buyer`), and SKU-level revenue velocity leaderboards.
- **4 Core Technical Architecture Pillars**:
  - **1. Multi-Service Architecture**: Decoupled monorepo orchestrating a React 18 TypeScript client (Port 3000), an Express TypeScript REST backend (Port 5000), and a Python FastAPI AI/RAG microservice (Port 8000).
  - **2. Hybrid RAG & 384-Dim Embedder**: Custom deterministic 384-dimensional hybrid semantic embedding engine (`LightweightSemanticEmbeddingFunction` in `src/embeddings/custom_embedder.py`) combining `[0..63]` 8.0x weighted exact product/SKU ID matching, `[64..191]` unigram & word-bigram hashing, `[192..319]` character 3-gram & 4-gram typo-tolerant subword hashing, and `[320..383]` 15 e-commerce semantic concept clusters, with L2 unit normalization in ChromaDB (`deepshop_knowledge`).
  - **3. Merchant BI & AI Copilot**: 5-Pillar Executive Store Health Score (`0–100`), Automated Anomaly & Capital Lockup Scanner, and Stateful Multi-Turn Copilot with 3-tier LLM failover cascade (Groq Pool → OpenRouter → Offline Deterministic Engine).
  - **4. Domain Repositories & ERP Suite**: Generic TypeScript Repository Layer (`Repository<T>`) with atomic transactional persistence across 7 domain entities (`Categories`, `Products`, `Customers`, `Addresses`, `Orders`, `Shipping`, and `Operating Expenses Ledger`).

---

## 1. Enterprise CRM Infrastructure
- **Platform**: Node.js, TypeScript, React
- **Domain**: ERP / Business Logic
- **Type**: Senior Architect
- **Description**: Designed, developed, and maintained scalable backend services using Node.js and TypeScript for an enterprise CRM platform. Architected secure RESTful APIs consumed by React frontend components, integrated third-party services, and improved performance through query optimization.
- **Key Features**:
  - Scalable Node.js & TypeScript Backend Architecture
  - RESTful API Design & Third-Party System Integration
  - Seamless React Frontend Integration & High Security
  - Code Refactoring, Query Optimization & Code Reviews

## 2. Customer Discount Request (Shopware 6 Plugin)
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Allows registered users to request custom price discounts and quantities for bulk product orders. Merchants can review, approve, or reject proposals from a dedicated backend section, configure per-product min/max order quantities and discount percentage limits, and notify customers upon login.
- **Key Features**:
  - User-Created Custom Discounted Prices & Quantities
  - Merchant Proposal Approval & Login Notifications
  - Granular Min/Max Quantity & Discount Limit Controls
  - Bulk Sales Support for Wholesalers & Retailers

## 3. Customer Membership Offer (Shopware 6 Plugin)
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Categorizes registered users into Silver, Gold, and Platinum membership tiers based on cumulative purchase milestones. Automatically upgrades user plans to unlock higher cart discount percentages on subsequent orders, with backend controls for product eligibility and manual plan locking.
- **Key Features**:
  - Tiered Silver, Gold & Platinum Loyalty Milestones
  - Automated Plan Upgrades & Next-Order Cart Discounts
  - Backend Product Eligibility & Plan Criteria Control
  - Manual Admin Plan Override, Upgrade & Freeze Locks

## 4. Ticket System (Shopware 6 Plugin)
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Provides a dedicated storefront event ticketing system accessible via a floating Ticket launcher. Displays scheduled events with live available ticket counts, venue locations, date/time slots, and quantity selectors, integrating with checkout and generating unique ticket IDs in customer orders.
- **Key Features**:
  - Floating Storefront Ticket Launcher & Event Hub
  - Live Available Ticket Inventory, Venue & Time Slots
  - Seamless Cart & Checkout Quantity Integration
  - Automated Unique Ticket ID Generation in Orders

## 5. Order Status Analytics (Shopware 6 Plugin)
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Renders interactive order analytics directly inside the customer's Orders account section. Allows users to toggle dynamically between Doughnut and Pie charts with hover tooltips to track real-time order counts across Open, In Progress, Done, and Cancelled lifecycle stages synced from admin.
- **Key Features**:
  - Interactive Doughnut & Pie Chart Type Switcher
  - Color-Coded Open, In Progress, Done & Cancelled
  - Hover Tooltips with Exact Per-Status Order Counts
  - Real-Time Sync with Shopware Admin Order Statuses

## 6. Customer Profile Picture (Shopware 6 Plugin)
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Enables registered customers to personalize their Shopware 6 account by uploading a profile avatar from the Account Overview page. Enforces JPG, JPEG, and PNG format and 100 KB size validation, displaying the circular avatar in the account sidebar and syncing with Admin custom fields.
- **Key Features**:
  - Account Overview Profile Picture Upload & Update
  - Strict JPG/JPEG/PNG Format & 100 KB Size Validation
  - Persistent Circular Avatar in Customer Sidebar
  - Admin Customer Profile Custom Field Synchronization

## 7. Credit Points (Loyalty) (Shopware 5 Plugin)
- **Platform**: Shopware 5
- **Domain**: Ecommerce
- **Type**: Plugin
- **Description**: Awards customer loyalty credit points as SuperCoins based on order spend or product rules, enabling instant cash discount redemption during checkout on future purchases.
- **Key Features**:
  - SuperCoins Loyalty Point Engine
  - Global & Per-Product Point Rules
  - Checkout Cash Discount Redemption
  - Storefront Credit Badges & Banners

## 8. Adyen Payment Customization
- **Platform**: Shopware 5
- **Domain**: Ecommerce
- **Type**: Client
- **Description**: Customized the Adyen payment plugin to support automatic capture status upon order confirmation and implemented partial refund capabilities for high-volume transactions.
- **Key Features**:
  - Automatic Capture Logic
  - Partial Refund Workflows
  - Store-Specific Payment Integration
  - Optimized Transaction Flow

## 9. Review Synchronization Engine
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Client
- **Description**: Automated cross-shop review synchronization for multi-store networks. Syncs feedback in real-time when products share identical global identifiers (SKUs).
- **Key Features**:
  - Automated Sync Logic
  - SKU-Based Mapping
  - Real-time Feedback Consistency
  - Data Integrity Safeguards

## 10. Category Discount Plugin
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Client
- **Description**: Admins can set category-wide discounts (percentage/fixed) that apply dynamically across all mapped products during browsing and checkout. Includes promotional banner integration.
- **Key Features**:
  - Category-Level Logic
  - Dynamic Price Calculation
  - Promotional Banner Integration
  - Bulk Discount Management

## 11. Site Performance Optimization
- **Platform**: Shopware 6
- **Domain**: Ecommerce
- **Type**: Performance
- **Description**: Full-scale frontend optimization to improve SEO and Core Web Vitals. Implemented WebP image conversion, Alt-tag orchestration, and clean CSS syntax.
- **Key Features**:
  - WebP Image Orchestration
  - SEO/Accessibility Overhaul
  - CSS Redundancy Removal
  - Lazy-loading Optimization

## 12. Archive Portal (Cloud Storage)
- **Platform**: Node.js & TypeScript (with React)
- **Domain**: Internal Tools
- **Type**: System
- **Description**: Secure document management system similar to Google Drive. Provides project-isolated file storage with granular Role-Based Access Control (RBAC).
- **Key Features**:
  - Admin/Employee RBAC
  - Project-Isolated Access
  - File Lifecycle Management
  - Dashboard Analytics

## 13. Custom Backend UI Design
- **Platform**: Odoo 17
- **Domain**: Ticket Booking
- **Type**: Client
- **Description**: Designed and implemented a bespoke Odoo backend theme. Replaced the default interface with a custom, branded UI aligned with client operational workflows.
- **Key Features**:
  - Bespoke Interface Design
  - Optimized User Workflows
  - Custom Branding Integration
  - Responsive Layout Overhaul

## 14. Custom Frontend Theme
- **Platform**: Odoo 17
- **Domain**: Ticket Booking
- **Type**: Client
- **Description**: Tailored frontend experience for Odoo 17 including custom layouts, fonts, and branding elements. Engineered for high performance and mobile-first responsiveness.
- **Key Features**:
  - Brand Identity Alignment
  - Mobile-First Performance
  - Iterative UX Refinement
  - Optimized Asset Loading

## 15. Geocoding API Integration
- **Platform**: Odoo 17
- **Domain**: Ticket Booking
- **Type**: Client
- **Description**: Leveraged Google Geocoding API to dynamically display nearby events within a predefined radius based on the end-user's real-time coordinate data.
- **Key Features**:
  - Radius-Based Event Discovery
  - Google API Orchestration
  - Dynamic Search Refinement
  - Integrated Booking Workflow

## 16. Event Module Extension
- **Platform**: Odoo 17
- **Domain**: Ticket Booking
- **Type**: Client
- **Description**: Engineered advanced automation for Odoo events, including digital payment links post-booking and a sponsor allocation system for targeted participation boosting.
- **Key Features**:
  - Automated Payment Logic
  - Sponsor Allocation Hub
  - Modern Visual Redesign
  - Integrated Ticket Lifecycle

## 17. COE Management System
- **Platform**: Zend Framework
- **Domain**: Education
- **Type**: Product
- **Description**: End-to-end institution management system covering exam scheduling, online fee processing, question encoding, and automated result analysis.
- **Key Features**:
  - Automated Fee Processing
  - Secure Question Encoding
  - Digital Result Analysis
  - Certificate Issuance Hub

## 18. Enterprise ERP (Production)
- **Platform**: Laravel
- **Domain**: Manufacturing
- **Type**: Client
- **Description**: Enterprise-grade ERP for production units. Manages product planning, cost estimation, inventory logistics, and end-to-end shipping workflows.
- **Key Features**:
  - Automated Cost Estimation
  - Inventory Logistics Control
  - Shipping & Payment Automation
  - Workflow Streamlining

---

## Ecosystem Expertise & Platforms
1. **E-commerce**: Architecting high-performance, scalable e-commerce solutions with complex payment integrations and secure checkout optimizations.
2. **ERP Systems**: Developing robust custom ERP ecosystems to automate manufacturing workflows, inventory management, and supply chain logistics.
3. **CRM Portals**: Building secure, data-driven customer relationship portals with real-time monitoring and advanced reporting modules.
4. **CMS**: Designing scalable content management systems for education and enterprise, featuring granular user role privileges.
5. **Payment Gateway**: Customizing Adyen, Stripe, and Novalnet payment modules for seamless global transactions and financial compliance.
6. **API Ecosystems**: Engineering RESTful and SOAP API architectures for seamless data synchronization across third-party services.
