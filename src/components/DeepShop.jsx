import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const VIDEO_CHAPTERS = [
  {
    id: "ch-storefront",
    time: 0,
    timeLabel: "00:00",
    durationLabel: "45s",
    badge: "Storefront UX",
    title: "Next-Gen Storefront, Instant Search & Department Filtering",
    description:
      "Showcases the high-conversion React 18 + TypeScript storefront with spotlight hero deals, 6 curated departments, popular tag pills (#ANC, #Flagship, #SpatialAudio), multi-criteria sorting, and customer profile switching.",
    highlights: [
      "Real-time search & tag filtering across 15 flagship SKUs",
      "Dynamic customer context switcher (Deepak, Sara, Sharvin)",
      "Responsive Tailwind CSS glassmorphic product cards"
    ]
  },
  {
    id: "ch-admin-crud",
    time: 45,
    timeLabel: "00:45",
    durationLabel: "45s",
    badge: "Admin ERP (CAT-01 / PRD-01)",
    title: "Enterprise ERP — Category & Product Master CRUD",
    description:
      "Demonstrates the Admin ERP Catalog & Inventory suite where administrators manage department classifications, create or edit product SKUs, adjust warehouse stock levels, and persist changes atomically with real-time transactional integrity.",
    highlights: [
      "Generic domain repository layer with ACID-like atomic persistence",
      "Department SKU counter & stock valuation metrics",
      "Instant zero-reload synchronization with the customer storefront"
    ]
  },
  {
    id: "ch-checkout",
    time: 90,
    timeLabel: "01:30",
    durationLabel: "55s",
    badge: "Checkout & Logistics",
    title: "Live Storefront Sync, Quick-View Specs & Checkout Pipeline",
    description:
      "Walks through inspecting live-updated products on the storefront, opening the rich specifications modal, managing the slide-over cart drawer with free-shipping progress, completing multi-step checkout, and viewing live GPS carrier checkpoints.",
    highlights: [
      "Automatic warehouse stock decrement on order placement",
      "Slide-over CartDrawer with $200 free-priority-shipping goal",
      "End-to-end carrier tracking timeline (TRK-DPS-*)"
    ]
  },
  {
    id: "ch-rag-concierge",
    time: 145,
    timeLabel: "02:25",
    durationLabel: "41s",
    badge: "Customer RAG AI",
    title: "DeepShop AI Concierge — Hybrid Vector Search & Interactive Cards",
    description:
      "Demonstrates the floating storefront AI assistant powered by FastAPI and ChromaDB. Answers natural-language product queries ('I need a phone', 'I need a laptop'), grounds responses in live stock & warranty policies, and renders interactive product cards directly inside the chat stream.",
    highlights: [
      "384-dim custom hybrid semantic & concept-cluster embeddings",
      "Dynamic UI tag extraction ([SUGGEST_PRODUCT] & [ACTION])",
      "Live customer order & cart injection with anti-repetition guardrails"
    ]
  },
  {
    id: "ch-ai-analytics",
    time: 186,
    timeLabel: "03:06",
    durationLabel: "49s",
    badge: "Merchant BI (AI-01)",
    title: "AI Store Health Score (77/100), Executive KPIs & Action Plan",
    description:
      "Reveals the Admin ERP AI Analytics & Statistics Command Center. Synthesizes live financial ledgers to display a 5-pillar Store Health Score dial (77/100), 30-day revenue forecast, break-even order gap, dead-stock capital lockup ($68,457), and confidence-scored AI Action Plans.",
    highlights: [
      "100% ledger-synchronized Gross Revenue, Expenses & Net EBIT",
      "Automated SKU price-anomaly & low-stock alert generation",
      "Prioritized AI Action Cards with confidence ratings (91%–98%)"
    ]
  },
  {
    id: "ch-copilot",
    time: 235,
    timeLabel: "03:55",
    durationLabel: "60s",
    badge: "AI Business Copilot",
    title: "Multi-Turn Conversational AI Business Copilot for Merchants",
    description:
      "Demonstrates the stateful Merchant AI Copilot answering operational queries in real time—extracting full itemized pending orders, customer phone/email, home/work shipping addresses in Chennai, payment methods, and actionable strategies to liquidate unsold warehouse stock.",
    highlights: [
      "Stateful multi-turn topic continuation (lastTopic & history)",
      "Instant drill-down into Pending, In-Transit & Delivered orders",
      "Dynamic contextual follow-up suggestion chips"
    ]
  },
  {
    id: "ch-erp-ledger",
    time: 295,
    timeLabel: "04:55",
    durationLabel: "52s",
    badge: "Financials & CRM",
    title: "Operating Expenses Ledger, CRM LTV Segmentation & SKU Velocity",
    description:
      "Concludes with a tour of the Operating Expenses Breakdown (Payroll, Warehouse, Utilities, Logistics), Customer Accounts (CRM) buying behavior segmentation (VIP Buyer, One-Time Buyer, Inactive Account), and the AI Product Performance comparison table.",
    highlights: [
      "Category-level expense burn ratios & voucher status tracking",
      "CRM churn-risk & repeat-buyer LTV segmentation",
      "SKU sell-through rate & automated restock recommendations"
    ]
  }
];

const SCREENSHOT_GALLERY = [
  {
    src: "/static/media/deep-shop/storefront-hero.jpg",
    badge: "Customer Storefront",
    title: "Flagship Storefront & Curated Departments",
    caption:
      "Vite + React 18 + TypeScript storefront featuring spotlight deals, instant search, department navigation, and live customer profile switching.",
    jumpTime: 0
  },
  {
    src: "/static/media/deep-shop/rag-concierge.jpg",
    badge: "Customer AI Concierge",
    title: "ChromaDB RAG Assistant with Interactive Product Cards",
    caption:
      "Semantic product discovery that grounds answers in live inventory and renders clickable product cards ([SUGGEST_PRODUCT]) directly inside the chat widget.",
    jumpTime: 145
  },
  {
    src: "/static/media/deep-shop/ai-analytics-dashboard.jpg",
    badge: "Admin ERP • AI-01",
    title: "AI Store Health Score (77/100) & Executive BI Dashboard",
    caption:
      "Real-time statistical intelligence synthesizing Gross Sales, Net EBIT, 30-day revenue forecasts, prioritized AI Action Plans, and the AI Business Copilot.",
    jumpTime: 186
  },
  {
    src: "/static/media/deep-shop/erp-expenses-crm.jpg",
    badge: "Financial & CRM Intelligence",
    title: "Expense Burn Breakdown, CRM LTV & SKU Performance",
    caption:
      "Granular operating expense distribution, customer LTV segmentation (VIP, One-Time, Inactive), and SKU-level sell-through diagnostics.",
    jumpTime: 295
  }
];

const AI_TELEMETRY_LOGS = [
  {
    stage: "EMBEDDER",
    color: "#22d3ee",
    text: "Projected query into 384-Dim L2 space (8.0× ID boost + 15 domain clusters)"
  },
  {
    stage: "CHROMADB",
    color: "#3b82f6",
    text: "Retrieved top-6 semantic vector chunks from deepshop_knowledge (sim: 0.94)"
  },
  {
    stage: "LIVE-SYNC",
    color: "#a855f7",
    text: "Synchronized dynamic inventory stock & active carrier checkpoint TRK-DPS-*"
  },
  {
    stage: "GROQ-LPU",
    color: "#10b981",
    text: "Streaming grounded response + hydrating [SUGGEST_PRODUCT] UI cards"
  },
  {
    stage: "BI-ENGINE",
    color: "#f59e0b",
    text: "Computed 5-pillar Store Health Score (77/100) & 30-day EBIT forecast"
  }
];

const AI_NEURAL_NODES = [
  {
    step: "01",
    title: "Natural Language Intent",
    subtitle: "Storefront Chat & Merchant Prompt",
    icon: "bi-chat-dots-fill",
    color: "#22d3ee",
    metric: "Regex + Context"
  },
  {
    step: "02",
    title: "384-Dim Hybrid Embedder",
    subtitle: "Bigrams + 4-Grams + 15 Clusters",
    icon: "bi-bezier2",
    color: "#3b82f6",
    metric: "8.0× ID Salience"
  },
  {
    step: "03",
    title: "ChromaDB Vector Store",
    subtitle: "Real-Time Dynamic Chunk Sync",
    icon: "bi-database-fill-gear",
    color: "#8b5cf6",
    metric: "38 Live Chunks"
  },
  {
    step: "04",
    title: "3-Tier LLM Failover Pool",
    subtitle: "Groq LPU → OpenRouter → Offline",
    icon: "bi-cpu-fill",
    color: "#ec4899",
    metric: "100% Uptime SLA"
  },
  {
    step: "05",
    title: "Generative UI & BI Action",
    subtitle: "Product Cards & Executive KPIs",
    icon: "bi-stars",
    color: "#10b981",
    metric: "77/100 Health Dial"
  }
];

const ARCHITECTURE_TABS = [
  {
    id: "arch-overview",
    label: "1. Multi-Service Architecture",
    icon: "bi-diagram-3-fill",
    title: "Three-Tier Full-Stack & Dual-AI Microservice Ecosystem",
    subtitle:
      "Engineered as a decoupled, production-grade monorepo orchestrating a React 18 TypeScript client, an Express TypeScript REST backend, and a Python FastAPI AI/RAG microservice.",
    metrics: [
      { label: "Frontend Client", value: "React 18 + Vite + TS", detail: "Port 3000 • Tailwind CSS v3" },
      { label: "Core Commerce API", value: "Node.js v20 + Express", detail: "Port 5000 • Domain Repositories" },
      { label: "AI & RAG Microservice", value: "FastAPI + ChromaDB", detail: "Port 8000 • Pydantic v2" },
      { label: "LLM Resilience", value: "3-Tier Auto-Failover", detail: "Groq Pool → OpenRouter → Offline Engine" }
    ],
    codeTitle: "System Communication & Pipeline Topology",
    codeDiagram: `┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     FRONTEND APPLICATION (Vite + React 18 + TypeScript)                │
│   • Customer Storefront (App.tsx, CartDrawer, CheckoutModal, OrderHistoryModal)        │
│   • Storefront AI Widget (ChatWidget.tsx)   • Enterprise ERP Suite (AdminDashboard)    │
└───────────────────┬───────────────────────────────────────┬────────────────────────────┘
                    │ REST /api/* (Port 5000)               │ REST /api/ai/* (Port 8000)
                    ▼                                       ▼
┌───────────────────────────────────────────┐ ┌──────────────────────────────────────────┐
│    COMMERCE & ERP SERVER (Node + Express) │ │   DEEPSHOP AI SERVICE (Python FastAPI)   │
│ • Modular Controllers & Domain Routes     │ │ • Pipeline 1: Customer RAG Concierge     │
│ • Generic Repository<T> Data Access Layer │ │ • Pipeline 2: Merchant BI & KPI Engine   │
│ • Atomic Transactional Persistence Engine │ │ • Pipeline 3: Multi-Turn AI Copilot      │
│ • Real-Time Stock Decrement on Checkout   │ │ • 384-Dim Hybrid Semantic Embedder       │
└───────────────────┬───────────────────────┘ └─────────────┬────────────────────────────┘
                    │                                       │
                    ▼                                       ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│           SHARED OPERATIONAL DATA STORE & PERSISTENT VECTOR INDEX                      │
│   • 7 Domain Entities: Categories, Products, Customers, Addresses, Orders, Shipping,   │
│     and Operating Expenses Ledger                                                      │
│   • ChromaDB PersistentClient: deepshop_knowledge collection (38 indexed chunks)       │
└────────────────────────────────────────────────────────────────────────────────────────┘`,
    points: [
      {
        heading: "Multi-Tier Cloud LLM Failover Cascade (src/llm/llm_client.py)",
        body: "Maintains persistent HTTP connection pooling (requests.Session) with low-temperature sampling (0.3) and automatically cascades across Tier 1 Groq Cloud models (qwen/qwen3.8-27b → llama-3.3-70b-versatile → openai/gpt-oss-120b → openai/gpt-oss-20b → groq/compound-mini), Tier 2 OpenRouter (qwen-2.5-7b-instruct), and Tier 3 Deterministic Context Responder for 100% uptime even offline."
      },
      {
        heading: "Unified Monorepo Workspace Coordinator",
        body: "Single-command orchestration (npm run dev) concurrently bootstraps the Express TypeScript backend, Vite React frontend, and Python FastAPI virtual environment with automated ChromaDB lifespan indexing."
      }
    ]
  },
  {
    id: "arch-rag",
    label: "2. Hybrid RAG & 384-Dim Embedder",
    icon: "bi-cpu-fill",
    title: "Custom 384-Dimensional Hybrid Semantic Embedder & Live RAG Retriever",
    subtitle:
      "Purpose-built e-commerce vector retrieval engine combining exact identifier boosting, lexical bigrams, character 4-gram typo tolerance, and real-time transactional cache synchronization.",
    metrics: [
      { label: "Vector Dimension", value: "384-Dim L2-Normalized", detail: "LightweightSemanticEmbeddingFunction" },
      { label: "ID Salience Boost", value: "8.0× Weighting", detail: "Exact match for ORD-*, TRK-*, prod_*" },
      { label: "Domain Clusters", value: "15 Concept Dimensions", detail: "Audio, Laptop, Drone, Warranty, Shipping..." },
      { label: "Cache Consistency", value: "Zero-Stale Guarantee", detail: "_refresh_dynamic_chunks() live sync" }
    ],
    codeTitle: "Customer RAG Execution Pipeline (POST /api/chat)",
    codeDiagram: `[Shopper Message in ChatWidget.tsx] ──► POST /api/chat (FastAPI Pydantic ChatRequest)
   │
   ├─► 1. Regex Entity Detection (ORD-YYYY-XXXX / TRK-DPS-XXXXXXX)
   │      • Queries live Order & Shipment repositories directly
   │      • Injects [LIVE DATABASE UPDATE] override block into system context
   │
   ├─► 2. Hybrid ChromaDB Vector Query (src/retrieval/retriever.py)
   │      • Projects query into 384-dim space via LightweightSemanticEmbeddingFunction:
   │        - Exact ID tokens (weight: 8.0) & Header/Title salience (weight: 5.0)
   │        - Word bigrams (weight: 3.5) & Character 4-grams for typo resilience (weight: 0.6)
   │        - 15 E-Commerce Domain Concept Clusters (weight: 6.0 – 9.0)
   │      • Executes _refresh_dynamic_chunks() to synchronize vector chunks with live state
   │
   ├─► 3. Grounded System Prompt Assembly (src/prompts/prompt_templates.py)
   │      • Injects activeCustomer profile, live cartItems, store_policies.md & anti-repetition rules
   │
   └─► 4. LLM Generation & UI Tag Parsing (src/utils/helpers.py)
          • Extracts [SUGGEST_PRODUCT: prod_xxx] ──► Hydrates full interactive ProductCard in chat
          • Extracts [ACTION: track_order | view_cart] ──► Renders one-click modal trigger button`,
    points: [
      {
        heading: "Real-Time Order & Shipment Synchronization",
        body: "When an administrator updates an order status in the ERP (PROCESSING → SHIPPED → ON THE WAY → DELIVERED), the RAG retriever bypasses static vector cache and injects the live checkpoint directly from the transactional data store."
      },
      {
        heading: "Interactive Generative UI Tags",
        body: "Instead of returning plain text walls, the assistant emits structured control tokens ([SUGGEST_PRODUCT] and [ACTION]) that the React client transforms into rich product cards with pricing, ratings, and direct 'Open Order Tracker' buttons."
      }
    ]
  },
  {
    id: "arch-bi",
    label: "3. Merchant BI & AI Copilot",
    icon: "bi-graph-up-arrow",
    title: "Statistical Business Intelligence Engine & Stateful Merchant Copilot",
    subtitle:
      "Synchronizes 100% with the Admin ERP's P&L ledger to compute executive KPIs, detect catalog anomalies, segment buyer LTV, and conduct multi-turn operational dialogues.",
    metrics: [
      { label: "Store Health Score", value: "0–100 Composite Dial", detail: "5 weighted operational & financial pillars" },
      { label: "Anomaly Detection", value: "SKU Price & Dead-Stock", detail: "Flags pricing errors & locked warehouse capital" },
      { label: "Financial Sync", value: "100% P&L Ledger Match", detail: "Excludes cancelled orders; tracks EBIT & COGS" },
      { label: "Copilot Memory", value: "Stateful Multi-Turn", detail: "Topic continuation via lastTopic & history" }
    ],
    codeTitle: "Merchant Analytics & Copilot Engine (src/analytics/engine.py)",
    codeDiagram: `[Admin Opens AI Analytics (GET /api/analytics/overview) OR Asks Copilot (POST /api/analytics/ask)]
   │
   ├─► 1. Live Multi-Ledger Aggregation (src/ingestion/loader.py)
   │      • Concurrently aggregates Orders, Products, Categories,
   │        Customers, Operating Expenses, and Carrier Shipments
   │
   ├─► 2. Synchronized P&L & Break-Even Diagnostics
   │      • Filters active (non-cancelled) orders ──► Computes Gross Sales, Net Subtotal, AOV
   │      • Aggregates Paid + Scheduled Expense Vouchers across 6 cost centers
   │      • Computes Net Operating Profit (EBIT), Operating Margin %, 30-Day Revenue Forecast,
   │        and exact Additional Orders Needed for Break-Even: ceil(RevenueGap / AOV)
   │
   ├─► 3. SKU Intelligence & Capital Lockup Scanner
   │      • Detects severe pricing anomalies (e.g., flagship SKU priced far below category median)
   │      • Calculates Dead-Stock Capital Lockup ($68,457 across 0-sale SKUs) & restock alerts
   │
   └─► 4. Multi-Turn Conversational AI Business Copilot (ask_advisor)
          • Resolves intent & topic continuation (pending_orders, transit_orders, delivered_orders,
            financial, inventory, crm, growth_plan)
          • Outputs itemized order breakdowns with customer phone/email, full delivery address,
            carrier tracking, and dynamic follow-up suggestion chips`,
    points: [
      {
        heading: "5-Pillar Composite Store Health Score",
        body: "Evaluates Revenue Performance (25 pts), Profit Resilience (22 pts), Catalog Active Ratio (20 pts), Dispatch & Fulfillment Rate (15 pts), and Customer Conversion (15 pts) into an executive 0–100 health gauge."
      },
      {
        heading: "CRM Buyer Lifetime Value (LTV) & Churn Segmentation",
        body: "Automatically classifies registered accounts into actionable segments (VIP Buyer, One-Time Buyer, Inactive Account) based on spend share, order frequency, and recency, generating targeted retention campaigns."
      }
    ]
  },
  {
    id: "arch-storage",
    label: "4. Domain Repositories & ERP Suite",
    icon: "bi-hdd-network-fill",
    title: "Generic Domain Repository Architecture & 7-Module Enterprise ERP Suite",
    subtitle:
      "Demonstrates clean domain-driven TypeScript architecture across server and client, delivering atomic transactional integrity and modular ERP orchestration.",
    metrics: [
      { label: "Data Access Layer", value: "Generic Repository<T>", detail: "Strongly-typed domain CRUD abstraction" },
      { label: "Domain Entities", value: "7 Core Store Ledgers", detail: "Categories, Products, Orders, Expenses, CRM..." },
      { label: "ERP Modules", value: "7 Enterprise Views", detail: "OVW-01, AI-01, CAT-01, PRD-01, ORD-01, CRM-01, FIN-01" },
      { label: "Transaction Safety", value: "Atomic Write Pipeline", detail: "Zero race-condition inventory & ledger updates" }
    ],
    codeTitle: "Enterprise Domain Repository & 7-Module ERP Map",
    codeDiagram: `// Generic Type-Safe Domain Repository Layer (server/src/models/)
export class Repository<T extends { id: string }> {
  async findAll(): Promise<T[]> { ... }
  async findById(id: string): Promise<T | null> { ... }
  async create(entity: T): Promise<T> { ... }
  async update(id: string, updates: Partial<T>): Promise<T | null> { ... }
  async saveAtomic(entities: T[]): Promise<void> { ... } // Crash-safe atomic commit
}

// 7 Enterprise Admin ERP Modules (client/src/components/admin/)
├── [OVW-01] AdminOverview.tsx       ──► Fiscal P&L Income Statement, Debit/Credit Ledger & Margins
├── [AI-01]  AdminAIAnalytics.tsx    ──► AI Health Score, KPI Cards, Action Plan & Business Copilot
├── [CAT-01] AdminCategoriesTable.tsx──► Department Master CRUD, Slug Keys & Assigned SKU Counts
├── [PRD-01] AdminProductsTable.tsx  ──► Product Master CRUD, Stock Valuation & Price Controls
├── [ORD-01] AdminOrdersTable.tsx    ──► Sales Orders, Status Workflow & Live Carrier Dispatch
├── [CRM-01] AdminCustomersTable.tsx ──► Buyer Directory, Address Book & Lifetime Spend History
└── [FIN-01] AdminExpensesTable.tsx  ──► Operating Expense Vouchers, Cost Centers & Recurring Terms`,
    points: [
      {
        heading: "Crash-Safe Atomic Transactions",
        body: "Every catalog update, expense voucher posting, or checkout stock deduction executes through a strongly-typed repository layer with atomic commit semantics to guarantee data integrity."
      },
      {
        heading: "Complete End-to-End Business Lifecycle",
        body: "Bridges B2C storefront shopping and B2B back-office ERP accounting—every customer order placed on the storefront immediately updates inventory stock, carrier tracking logs, P&L gross revenue, and AI Copilot analytics."
      }
    ]
  }
];

const TECH_STACK_GROUPS = [
  {
    category: "Frontend Storefront & ERP UI",
    icon: "bi-window-stack",
    color: "#3b82f6",
    items: [
      "React 18.3 (Functional Hooks & Memoized Pipelines)",
      "TypeScript 5 (Strict Domain Interfaces)",
      "Vite Build & Proxy Orchestration",
      "Tailwind CSS v3 (Custom Glassmorphic Design Tokens)",
      "Lucide React Iconography"
    ]
  },
  {
    category: "Core Commerce & ERP Backend",
    icon: "bi-hdd-rack",
    color: "#8b5cf6",
    items: [
      "Node.js (v20+) & Express.js REST Architecture",
      "TypeScript (tsx Runtime & Strict Type Safety)",
      "Generic Type-Safe Domain Repository Layer",
      "7 Domain Controllers & Modular Express Routers",
      "Real-Time Inventory & Carrier Tracking Engine"
    ]
  },
  {
    category: "AI, RAG & Analytics Microservice",
    icon: "bi-stars",
    color: "#22d3ee",
    items: [
      "Python 3.10+ & FastAPI (Asynchronous Uvicorn ASGI)",
      "Pydantic v2 Schema Validation",
      "ChromaDB PersistentClient Vector Database",
      "Custom 384-Dim Hybrid Semantic & Concept Embedder",
      "Multi-Tier LLM Client (Groq Pool + OpenRouter + Offline Fallback)"
    ]
  }
];

// Isolated sub-component so the 2.4s telemetry ticker never re-renders the main DeepShop page
const AiTelemetryBar = () => {
  const [telemetryIdx, setTelemetryIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        setTelemetryIdx((prev) => (prev + 1) % AI_TELEMETRY_LOGS.length);
      }
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const currentLog = AI_TELEMETRY_LOGS[telemetryIdx];

  return (
    <div
      className="p-3 rounded-4 mb-4 d-flex align-items-center justify-content-between gap-3"
      style={{
        background: "rgba(2, 6, 23, 0.82)",
        border: "1px solid rgba(34, 211, 238, 0.3)",
        boxShadow: "inset 0 0 20px rgba(34, 211, 238, 0.08)"
      }}
    >
      <div className="d-flex align-items-center gap-2 overflow-hidden">
        <span
          className="badge font-monospace px-2 py-1 flex-shrink-0"
          style={{
            background: `${currentLog.color}22`,
            border: `1px solid ${currentLog.color}`,
            color: currentLog.color,
            fontSize: "0.72rem"
          }}
        >
          <i className="bi bi-lightning-charge-fill me-1"></i>
          {currentLog.stage}
        </span>
        <span
          key={telemetryIdx}
          className="text-white small font-monospace text-truncate ai-log-fade"
          style={{ fontSize: "0.82rem" }}
        >
          {currentLog.text}
        </span>
      </div>

      <div className="d-none d-sm-flex align-items-end gap-1 flex-shrink-0" style={{ height: "18px" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
          <span
            key={bar}
            className="ai-wave-bar"
            style={{ animationDelay: `${bar * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
};

// Isolated sub-component so the 5-stage pipeline animation never re-renders the main DeepShop page
const AiPipelineFlow = () => {
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) {
        setActivePipelineStep((prev) => (prev + 1) % AI_NEURAL_NODES.length);
      }
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5" data-aos="fade-up" data-aos-delay="100">
      <div
        className="glass-v2 p-3 p-md-4 rounded-4 position-relative overflow-hidden"
        style={{
          border: "1px solid rgba(59, 130, 246, 0.28)",
          background: "rgba(2, 6, 23, 0.72)"
        }}
      >
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-broadcast-pin text-info fs-5"></i>
            <span className="text-white fw-bold small text-uppercase" style={{ letterSpacing: "1.2px" }}>
              Live Autonomous RAG & Merchant Intelligence Signal Flow
            </span>
          </div>
          <span className="text-info small font-monospace">
            Active Stage: 0{activePipelineStep + 1} / 05 • Real-Time Vector & Ledger Grounding
          </span>
        </div>

        <div className="row g-3 position-relative">
          {AI_NEURAL_NODES.map((node, idx) => {
            const isActiveNode = idx === activePipelineStep;
            return (
              <div key={node.step} className="col-md-6 col-xl">
                <div
                  onClick={() => setActivePipelineStep(idx)}
                  className="p-3 rounded-4 h-100 position-relative transition-smooth"
                  style={{
                    cursor: "pointer",
                    background: isActiveNode
                      ? `linear-gradient(135deg, ${node.color}22, rgba(15, 23, 42, 0.9))`
                      : "rgba(255, 255, 255, 0.025)",
                    border: isActiveNode
                      ? `1px solid ${node.color}`
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isActiveNode ? `0 0 25px ${node.color}33` : "none",
                    transform: isActiveNode ? "translateY(-3px)" : "none"
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="badge rounded-pill font-monospace"
                      style={{
                        background: `${node.color}22`,
                        color: node.color,
                        border: `1px solid ${node.color}55`,
                        fontSize: "0.7rem"
                      }}
                    >
                      STAGE {node.step}
                    </span>
                    <i
                      className={`bi ${node.icon} fs-5`}
                      style={{
                        color: node.color,
                        filter: isActiveNode ? `drop-shadow(0 0 8px ${node.color})` : "none"
                      }}
                    ></i>
                  </div>
                  <h6 className="text-white fw-bold mb-1" style={{ fontSize: "0.95rem" }}>
                    {node.title}
                  </h6>
                  <p className="text-white-50 mb-2" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
                    {node.subtitle}
                  </p>
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top border-white border-opacity-10">
                    <span className="font-monospace" style={{ fontSize: "0.7rem", color: node.color }}>
                      {node.metric}
                    </span>
                    {isActiveNode && (
                      <span className="d-inline-flex align-items-center gap-1 text-info font-monospace" style={{ fontSize: "0.68rem" }}>
                        <span className="ai-pulse-dot" /> ACTIVE
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DeepShop = () => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const neuralCanvasRef = useRef(null);
  const chaptersListRef = useRef(null);
  const [activeChapterId, setActiveChapterId] = useState(VIDEO_CHAPTERS[0].id);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(347);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [activeArchTab, setActiveArchTab] = useState(ARCHITECTURE_TABS[0].id);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Seamless scroll-chaining from Demo Chapters list to page when reaching top/bottom boundary
  useEffect(() => {
    const el = chaptersListRef.current;
    if (!el) return undefined;

    let lastTouchY = 0;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;

      const atTop = el.scrollTop <= 1;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
        if (e.cancelable) e.preventDefault();
        window.scrollBy({ top: deltaY, left: 0, behavior: "auto" });
      }
    };

    const handleWheel = (e) => {
      const deltaY = e.deltaY;
      const atTop = el.scrollTop <= 1;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;

      if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
        if (e.cancelable) e.preventDefault();
        window.scrollBy({ top: deltaY, left: 0, behavior: "auto" });
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Interactive AI Neural Network Synaptic Canvas Animation (Mobile GPU/CPU Optimized)
  useEffect(() => {
    const canvas = neuralCanvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile =
      width < 768 ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches);

    let isScrolling = false;
    let scrollTimeout = null;

    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 140);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile =
        width < 768 ||
        (typeof window.matchMedia === "function" &&
          window.matchMedia("(pointer: coarse)").matches);
    };

    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });

    const palette = ["#22d3ee", "#3b82f6", "#8b5cf6", "#38bdf8"];
    const nodeCount = isMobile
      ? 11
      : Math.min(44, Math.max(24, Math.floor(width / 38)));
    const speedScale = isMobile ? 0.4 : 0.6;

    const nodes = Array.from({ length: nodeCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speedScale,
      vy: (Math.random() - 0.5) * speedScale,
      radius: 1.8 + (idx % 3) * 0.8,
      color: palette[idx % palette.length],
      pulseOffset: Math.random() * Math.PI * 2
    }));

    const packetCount = isMobile ? 4 : 12;
    const packets = Array.from({ length: packetCount }, () => ({
      fromIdx: Math.floor(Math.random() * nodeCount),
      toIdx: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: 0.012 + Math.random() * 0.014
    }));

    let tick = 0;
    let lastFrameTime = 0;

    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);

      if (document.hidden || isScrolling) return;

      const minFrameGap = isMobile ? 38 : 16;
      if (timestamp - lastFrameTime < minFrameGap) return;
      lastFrameTime = timestamp;

      tick += isMobile ? 0.04 : 0.03;
      ctx.clearRect(0, 0, width, height);

      const maxLinkDist = isMobile ? 120 : 160;
      const maxLinkDistSq = maxLinkDist * maxLinkDist;
      const maxCursorDist = isMobile ? 155 : 210;
      const maxCursorDistSq = maxCursorDist * maxCursorDist;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxLinkDistSq) {
            const alpha = (1 - distSq / maxLinkDistSq) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < maxCursorDistSq) {
          const alpha = (1 - mDistSq / maxCursorDistSq) * 0.45;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        if (!isMobile) {
          const pulse = 0.65 + 0.35 * Math.sin(tick + n.pulseOffset);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.5 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(34, 211, 238, 0.08)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      for (let p of packets) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.fromIdx = p.toIdx;
          p.toIdx = Math.floor(Math.random() * nodes.length);
          p.progress = 0;
        }
        const a = nodes[p.fromIdx];
        const b = nodes[p.toIdx];
        if (a && b) {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 75000) {
            const px = a.x + dx * p.progress;
            const py = a.y + dy * p.progress;
            ctx.beginPath();
            ctx.arc(px, py, 2.3, 0, Math.PI * 2);
            ctx.fillStyle = "#22d3ee";
            ctx.fill();
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const t = vid.currentTime;
    setCurrentTime(t);

    // Find current chapter
    let current = VIDEO_CHAPTERS[0].id;
    for (const ch of VIDEO_CHAPTERS) {
      if (t >= ch.time) {
        current = ch.id;
      }
    }
    if (current !== activeChapterId) {
      setActiveChapterId(current);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekToChapter = (chapter) => {
    setActiveChapterId(chapter.id);
    if (videoRef.current) {
      videoRef.current.currentTime = chapter.time;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      videoContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const seekToSeconds = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      videoContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const formatTime = (sec) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  };

  const activeChapter =
    VIDEO_CHAPTERS.find((c) => c.id === activeChapterId) || VIDEO_CHAPTERS[0];
  const currentArch =
    ARCHITECTURE_TABS.find((t) => t.id === activeArchTab) || ARCHITECTURE_TABS[0];

  return (
    <section
      id="deep-shop-showcase"
      className="section position-relative"
      style={{ paddingTop: "110px", overflowX: "clip" }}
    >
      {/* Interactive AI Synaptic Neural Network Background Canvas */}
      <canvas
        ref={neuralCanvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.85
        }}
      />

      {/* Holographic Cyber Grid & Ambient Neural Glow */}
      <div className="ai-cyber-grid-overlay" />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Top Breadcrumb & AI Telemetry Status Pill */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4" data-aos="fade-down">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link
              to="/projects"
              className="btn glass-v2 text-white px-3 py-2 rounded-pill small fw-bold text-decoration-none"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <i className="bi bi-arrow-left me-2 text-info"></i>Back to Case Studies
            </Link>
            <span
              className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
              style={{
                background: "rgba(34, 211, 238, 0.12)",
                border: "1px solid rgba(34, 211, 238, 0.45)",
                color: "#67e8f9",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.2)"
              }}
            >
              <span className="ai-pulse-dot" />
              <i className="bi bi-cpu-fill"></i> Applied AI + RAG Microservice Architecture
            </span>
            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#c4b5fd"
              }}
            >
              React 18 • Node.js • FastAPI • ChromaDB
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a
              href="#video-demo"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(34,211,238,0.25)" }}
            >
              <i className="bi bi-play-circle-fill text-info me-1"></i> Demo Video
            </a>
            <a
              href="#system-architecture"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(139,92,246,0.3)" }}
            >
              <i className="bi bi-diagram-3-fill text-primary me-1"></i> AI Blueprint
            </a>
            <a
              href="https://github.com/DeepakAruldoss55/eshop-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(59,130,246,0.45)", background: "rgba(59,130,246,0.18)" }}
            >
              <i className="bi bi-github me-1"></i> GitHub Repo
            </a>
          </div>
        </div>

        {/* AI Holographic Hero Banner Card */}
        <div
          className="ai-hero-card glass-v2 p-4 p-md-5 mb-4 position-relative overflow-hidden"
          data-aos="fade-up"
          style={{
            borderRadius: "36px",
            border: "1px solid rgba(34, 211, 238, 0.35)",
            background:
              "radial-gradient(circle at 88% 15%, rgba(34, 211, 238, 0.16), rgba(59, 130, 246, 0.12) 40%, rgba(2, 6, 23, 0.9) 80%)"
          }}
        >
          {/* Animated Laser Scanline Sweep */}
          <div className="ai-scanline-beam" />

          <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-7">
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
                style={{
                  background: "rgba(34, 211, 238, 0.12)",
                  border: "1px solid rgba(34, 211, 238, 0.4)",
                  boxShadow: "0 0 25px rgba(34, 211, 238, 0.2)"
                }}
              >
                <span className="spinner-grow spinner-grow-sm text-info" style={{ width: "8px", height: "8px" }}></span>
                <span className="text-info small fw-bold text-uppercase" style={{ letterSpacing: "1.2px", fontSize: "0.75rem" }}>
                  Autonomous RAG Concierge • Executive BI Engine • Multi-Turn AI Copilot
                </span>
              </div>

              <h1 className="text-gradient fw-900 mb-3" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.4rem)", lineHeight: 1.1 }}>
                DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite
              </h1>

              <p className="text-white mb-4" style={{ fontSize: "1.06rem", opacity: 0.92, lineHeight: 1.75 }}>
                An end-to-end, AI-native commercial ecosystem uniting a{" "}
                <strong className="text-info">React 18 + TypeScript Storefront</strong>, a{" "}
                <strong className="text-primary">Domain-Driven Node.js/Express Microservice</strong>, a{" "}
                <strong style={{ color: "#c4b5fd" }}>7-Module Enterprise Admin ERP</strong>, and a{" "}
                <strong className="text-info">Dual-Engine FastAPI + ChromaDB AI Microservice</strong>{" "}
                featuring a 384-Dimensional Hybrid RAG Shopping Concierge and a Stateful Merchant Business Copilot.
              </p>

              {/* Live Animated AI Telemetry Stream Bar */}
              <AiTelemetryBar />

              <div className="d-flex flex-wrap gap-3 align-items-center">
                <button
                  type="button"
                  onClick={() => seekToSeconds(0)}
                  className="btn btn-premium px-4 py-3 rounded-4 d-inline-flex align-items-center gap-2"
                  style={{ fontSize: "0.98rem" }}
                >
                  <i className="bi bi-play-fill fs-5"></i> Watch Full Walkthrough (05:47)
                </button>
                <button
                  type="button"
                  onClick={() => seekToSeconds(145)}
                  className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold"
                  style={{
                    border: "1px solid rgba(34, 211, 238, 0.45)",
                    background: "rgba(34, 211, 238, 0.1)",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.15)"
                  }}
                >
                  <i className="bi bi-robot text-info me-2"></i>Jump to AI RAG & Copilot Demo
                </button>
                <a
                  href="https://github.com/DeepakAruldoss55/eshop-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold d-inline-flex align-items-center gap-2"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.2)", background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <i className="bi bi-github fs-5"></i> View Source Code
                </a>
              </div>
            </div>

            {/* Right Column: Animated AI Neural Reactor Core + Metrics */}
            <div className="col-lg-5">
              <div
                className="p-4 rounded-4 position-relative overflow-hidden"
                style={{
                  background: "rgba(2, 6, 23, 0.78)",
                  border: "1px solid rgba(34, 211, 238, 0.28)",
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)"
                }}
              >
                {/* Animated Holographic AI Core Reactor */}
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom border-white border-opacity-10">
                  <div className="d-flex align-items-center gap-3">
                    <div className="ai-orbital-core">
                      <div className="ai-ring ai-ring-outer" />
                      <div className="ai-ring ai-ring-middle" />
                      <div className="ai-ring ai-ring-inner" />
                      <div className="ai-core-center">
                        <i className="bi bi-cpu-fill text-info fs-4"></i>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="ai-pulse-dot" />
                        <span className="text-info fw-bold small text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.72rem" }}>
                          Neural Core Online
                        </span>
                      </div>
                      <h5 className="text-white fw-bold mb-0" style={{ fontSize: "1.15rem" }}>
                        Dual-Pipeline AI Engine
                      </h5>
                      <span className="text-white-50 font-monospace" style={{ fontSize: "0.75rem" }}>
                        FastAPI • ChromaDB • Groq LPU
                      </span>
                    </div>
                  </div>
                  <div className="text-end d-none d-sm-block">
                    <span className="badge rounded-pill px-3 py-2 font-monospace" style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34d399" }}>
                      77/100 BI Health
                    </span>
                  </div>
                </div>

                <div className="row g-3">
                  {[
                    { value: "384-Dim", label: "Hybrid Vector Embeddings", icon: "bi-bezier2", color: "#22d3ee" },
                    { value: "3-Tier LLM", label: "Groq • OpenRouter • Offline", icon: "bi-cpu-fill", color: "#3b82f6" },
                    { value: "3 Services", label: "React • Express • FastAPI", icon: "bi-boxes", color: "#8b5cf6" },
                    { value: "7 Modules", label: "Full ERP, P&L & CRM Suite", icon: "bi-bar-chart-steps", color: "#10b981" }
                  ].map((stat, idx) => (
                    <div key={idx} className="col-6">
                      <div
                        className="p-3 rounded-3 h-100 ai-metric-tile position-relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${stat.color}33`
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <i className={`bi ${stat.icon} fs-5`} style={{ color: stat.color }}></i>
                          <span className="font-monospace text-white-50" style={{ fontSize: "0.65rem" }}>
                            AI-0{idx + 1}
                          </span>
                        </div>
                        <div className="text-white fw-bold" style={{ fontSize: "1.08rem" }}>
                          {stat.value}
                        </div>
                        <div className="text-white-50" style={{ fontSize: "0.75rem" }}>
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Animated 5-Stage AI Neural Execution Pipeline */}
        <AiPipelineFlow />

        {/* Interactive Video Player + Timestamped Chapter Navigator */}
        <div id="video-demo" ref={videoContainerRef} className="mb-5" data-aos="fade-up">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <div>
              <span className="text-info fw-bold text-uppercase small d-block mb-1" style={{ letterSpacing: "1.5px" }}>
                <i className="bi bi-stars me-1"></i> Interactive Product & AI Engineering Walkthrough
              </span>
              <h2 className="text-white fw-bold mb-0" style={{ fontSize: "2.2rem" }}>
                Live System Demo Video & Scene Chapters
              </h2>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="d-flex align-items-center gap-1 p-1 rounded-pill glass-v2" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-white-50 small px-2">Speed:</span>
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleSpeedChange(rate)}
                    className={`btn btn-sm rounded-pill px-2 py-1 fw-bold ${
                      playbackRate === rate ? "btn-primary text-white" : "text-white-50"
                    }`}
                    style={{ fontSize: "0.78rem" }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill fw-semibold"
                style={{ border: "1px solid rgba(34,211,238,0.3)" }}
              >
                <i className={`bi ${isTheaterMode ? "bi-fullscreen-exit" : "bi-aspect-ratio"} me-2 text-info`}></i>
                {isTheaterMode ? "Standard View" : "Theater Mode"}
              </button>
            </div>
          </div>

          <div className="row g-4">
            {/* Video Column */}
            <div className={isTheaterMode ? "col-12" : "col-lg-8"}>
              <div
                className="glass-v2 p-3 p-md-4 h-100 d-flex flex-column position-relative overflow-hidden"
                style={{
                  borderRadius: "28px",
                  border: "1px solid rgba(34, 211, 238, 0.35)",
                  boxShadow: "0 25px 70px rgba(0, 0, 0, 0.65), 0 0 35px rgba(34, 211, 238, 0.12)"
                }}
              >
                {/* Video Window Top Bar */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-white border-opacity-10">
                  <div className="d-flex align-items-center gap-2">
                    <span className="d-inline-block rounded-circle bg-danger" style={{ width: "10px", height: "10px" }}></span>
                    <span className="d-inline-block rounded-circle bg-warning" style={{ width: "10px", height: "10px" }}></span>
                    <span className="d-inline-block rounded-circle bg-success" style={{ width: "10px", height: "10px" }}></span>
                    <span className="text-white-50 small ms-2 font-monospace">
                      deepshop.mp4 • 1080p AI Demo Stream
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-1 rounded-pill d-inline-flex align-items-center gap-2">
                      <span className="ai-pulse-dot" />
                      Now Showing: {activeChapter.badge}
                    </span>
                    <span className="text-white-50 small font-monospace">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* HTML5 Video Player */}
                <div
                  className="position-relative rounded-4 overflow-hidden bg-black"
                  style={{ border: "1px solid rgba(34,211,238,0.2)" }}
                >
                  <video
                    ref={videoRef}
                    src={`${process.env.PUBLIC_URL}/static/media/deep-shop/deepshop.mp4`}
                    poster={`${process.env.PUBLIC_URL}/static/media/deep-shop/storefront-hero.jpg`}
                    controls
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    style={{
                      width: "100%",
                      maxHeight: isTheaterMode ? "78vh" : "520px",
                      display: "block",
                      objectFit: "contain",
                      backgroundColor: "#020617"
                    }}
                  >
                    Your browser does not support the HTML5 video tag.
                  </video>
                </div>

                {/* Active Chapter Details Bar Under Video */}
                <div
                  className="mt-3 p-3 p-md-4 rounded-4"
                  style={{
                    background: "rgba(15, 23, 42, 0.78)",
                    border: "1px solid rgba(34, 211, 238, 0.25)"
                  }}
                >
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="btn btn-sm btn-primary rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "36px", height: "36px" }}
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} fs-5`}></i>
                      </button>
                      <div>
                        <span className="text-info small fw-bold text-uppercase d-block" style={{ fontSize: "0.72rem", letterSpacing: "1px" }}>
                          Active Scene ({activeChapter.timeLabel}) • {activeChapter.badge}
                        </span>
                        <h4 className="text-white fw-bold mb-0" style={{ fontSize: "1.15rem" }}>
                          {activeChapter.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <p className="text-white-50 small mb-3" style={{ lineHeight: 1.65 }}>
                    {activeChapter.description}
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    {activeChapter.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="d-inline-flex align-items-start gap-2 px-3 py-2 rounded-3 text-white text-start"
                        style={{
                          background: "rgba(34, 211, 238, 0.1)",
                          border: "1px solid rgba(34, 211, 238, 0.28)",
                          fontSize: "0.78rem",
                          lineHeight: 1.45,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          maxWidth: "100%"
                        }}
                      >
                        <i className="bi bi-check2-circle text-info flex-shrink-0 mt-1"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Chapter Playlist Column */}
            <div className={isTheaterMode ? "col-12" : "col-lg-4"}>
              <div
                className="glass-v2 p-3 p-sm-4 h-100 d-flex flex-column"
                style={{
                  borderRadius: "28px",
                  border: "1px solid rgba(59, 130, 246, 0.25)"
                }}
              >
                <div className="d-flex justify-content-between align-items-start align-items-sm-center gap-2 mb-3 pb-2 border-bottom border-white border-opacity-10">
                  <div>
                    <h4 className="text-white fw-bold mb-1" style={{ fontSize: "1.2rem" }}>
                      <i className="bi bi-collection-play-fill text-info me-2"></i>
                      Demo Chapters
                    </h4>
                    <span className="text-white-50 small d-block" style={{ lineHeight: 1.35 }}>
                      Click any timestamp to jump directly to that feature
                    </span>
                  </div>
                  <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 rounded-pill px-3 py-2 flex-shrink-0">
                    7 Scenes
                  </span>
                </div>

                <div
                  ref={chaptersListRef}
                  className="d-flex flex-column gap-2 overflow-auto pe-1"
                  style={{
                    maxHeight: isTheaterMode ? "420px" : "600px",
                    overscrollBehaviorY: "auto",
                    WebkitOverflowScrolling: "touch"
                  }}
                >
                  {VIDEO_CHAPTERS.map((ch, idx) => {
                    const isActive = ch.id === activeChapterId;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => seekToChapter(ch)}
                        className="text-start p-3 rounded-4 transition-smooth w-100"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, rgba(34, 211, 238, 0.22), rgba(139, 92, 246, 0.22))"
                            : "rgba(255, 255, 255, 0.03)",
                          border: isActive
                            ? "1px solid rgba(34, 211, 238, 0.65)"
                            : "1px solid rgba(255, 255, 255, 0.07)",
                          boxShadow: isActive ? "0 0 20px rgba(34, 211, 238, 0.2)" : "none",
                          cursor: "pointer"
                        }}
                      >
                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-1">
                          <span
                            className="badge rounded-pill px-2 py-1 font-monospace"
                            style={{
                              background: isActive ? "#0ea5e9" : "rgba(255,255,255,0.08)",
                              color: "#fff",
                              fontSize: "0.72rem"
                            }}
                          >
                            <i className={`bi ${isActive ? "bi-volume-up-fill" : "bi-play-fill"} me-1`}></i>
                            {ch.timeLabel}
                          </span>
                          <span className="text-info small fw-semibold" style={{ fontSize: "0.75rem" }}>
                            {ch.badge}
                          </span>
                        </div>
                        <div className="text-white fw-bold small mb-1">
                          {idx + 1}. {ch.title}
                        </div>
                        <div
                          className="text-white-50"
                          style={{
                            fontSize: "0.76rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          {ch.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Resolution Interface Gallery */}
        <div className="mb-5 pt-3" data-aos="fade-up">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-2">
            <div>
              <span className="text-info fw-bold text-uppercase small d-block mb-1" style={{ letterSpacing: "1.5px" }}>
                <i className="bi bi-cpu me-1"></i> Interface & AI Module Snapshots
              </span>
              <h2 className="text-white fw-bold mb-0" style={{ fontSize: "2.2rem" }}>
                Four Core Pillars in Action
              </h2>
            </div>
            <span className="text-white-50 small">
              Click any snapshot to inspect full-screen or jump to its video timestamp
            </span>
          </div>

          <div className="row g-4">
            {SCREENSHOT_GALLERY.map((shot, i) => (
              <div key={i} className="col-md-6" data-aos="zoom-in-up" data-aos-delay={i * 100}>
                <div
                  className="glass-v2 p-3 rounded-4 h-100 d-flex flex-column ai-snapshot-card"
                  style={{ border: "1px solid rgba(34, 211, 238, 0.2)" }}
                >
                  <div
                    className="position-relative rounded-3 overflow-hidden mb-3"
                    style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)" }}
                    onClick={() => setSelectedScreenshot(shot)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}${shot.src}`}
                      alt={shot.title}
                      className="img-fluid w-100 ai-snapshot-img"
                      style={{ height: "250px", objectFit: "cover", objectPosition: "top" }}
                    />
                    <div
                      className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill small fw-bold text-white"
                      style={{
                        background: "rgba(15, 23, 42, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(34, 211, 238, 0.45)"
                      }}
                    >
                      {shot.badge}
                    </div>
                    <div
                      className="position-absolute bottom-0 end-0 m-3 px-3 py-1 rounded-pill small fw-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #0ea5e9, #6366f1)"
                      }}
                    >
                      <i className="bi bi-arrows-fullscreen me-1"></i> Enlarge
                    </div>
                  </div>

                  <h4 className="text-white fw-bold mb-2" style={{ fontSize: "1.2rem" }}>
                    {shot.title}
                  </h4>
                  <p className="text-white-50 small flex-grow-1 mb-3" style={{ lineHeight: 1.65 }}>
                    {shot.caption}
                  </p>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-white border-opacity-10">
                    <button
                      type="button"
                      onClick={() => seekToSeconds(shot.jumpTime)}
                      className="btn btn-sm text-info fw-bold p-0"
                    >
                      <i className="bi bi-play-circle-fill me-1"></i> Watch in Video ({formatTime(shot.jumpTime)})
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedScreenshot(shot)}
                      className="btn btn-sm text-white-50 p-0"
                    >
                      Inspect UI <i className="bi bi-arrow-up-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep-Dive System Architecture & Execution Pipelines */}
        <div id="system-architecture" className="mb-5 pt-4" data-aos="fade-up">
          <div className="text-center mb-5">
            <span className="text-info fw-bold text-uppercase small d-block mb-2" style={{ letterSpacing: "1.5px" }}>
              <i className="bi bi-diagram-3-fill me-1"></i> Under The Hood • AI & Microservice Blueprint
            </span>
            <h2 className="text-gradient fw-900 mb-3" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              System Architecture & Pipeline Execution Flows
            </h2>
            <p className="section-subtitle">
              Explore how the React 18 Storefront, Express Domain Repository Layer, ChromaDB Hybrid Vector Store, and Merchant BI Copilot operate in concert.
            </p>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {ARCHITECTURE_TABS.map((tab) => {
              const active = tab.id === activeArchTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveArchTab(tab.id)}
                  className="btn px-4 py-3 rounded-4 fw-bold d-flex align-items-center justify-content-center gap-2 transition-smooth ai-arch-tab-btn"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
                      : "rgba(30, 41, 59, 0.55)",
                    color: "#fff",
                    border: active
                      ? "1px solid rgba(34, 211, 238, 0.6)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: active ? "0 10px 30px rgba(34, 211, 238, 0.3)" : "none"
                  }}
                >
                  <i className={`bi ${tab.icon} flex-shrink-0`}></i>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Architecture Tab Content Card */}
          <div
            className="glass-v2 p-3 p-sm-4 p-lg-5 position-relative overflow-hidden"
            style={{
              borderRadius: "32px",
              border: "1px solid rgba(34, 211, 238, 0.3)"
            }}
          >
            <div className="mb-4">
              <h3 className="text-white fw-bold mb-2" style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)" }}>
                {currentArch.title}
              </h3>
              <p className="text-white-50 mb-0" style={{ fontSize: "1rem" }}>
                {currentArch.subtitle}
              </p>
            </div>

            {/* 4 Key Metrics Strip */}
            <div className="row g-3 mb-4">
              {currentArch.metrics.map((m, idx) => (
                <div key={idx} className="col-sm-6 col-lg-3">
                  <div
                    className="p-3 rounded-4 h-100"
                    style={{
                      background: "rgba(2, 6, 23, 0.65)",
                      border: "1px solid rgba(34, 211, 238, 0.18)"
                    }}
                  >
                    <span className="text-info small fw-bold text-uppercase d-block mb-1" style={{ fontSize: "0.72rem", letterSpacing: "0.8px" }}>
                      {m.label}
                    </span>
                    <div className="text-white fw-bold mb-1" style={{ fontSize: "1.1rem" }}>
                      {m.value}
                    </div>
                    <span className="text-white-50 small" style={{ fontSize: "0.78rem" }}>
                      {m.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline / Architecture Diagram Block */}
            <div
              className="p-3 p-md-4 rounded-4 mb-4 position-relative overflow-hidden"
              style={{
                background: "#020617",
                border: "1px solid rgba(34, 211, 238, 0.35)",
                boxShadow: "inset 0 0 30px rgba(34, 211, 238, 0.06)"
              }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom border-white border-opacity-10">
                <span className="text-info small fw-bold font-monospace d-flex align-items-center gap-2">
                  <span className="ai-pulse-dot flex-shrink-0" />
                  <i className="bi bi-terminal-fill flex-shrink-0"></i>
                  <span className="text-break">{currentArch.codeTitle}</span>
                </span>
                <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 small font-monospace flex-shrink-0">
                  AI Production Pipeline
                </span>
              </div>
              <div className="ai-diagram-scroll">
                <pre
                  className="mb-0 text-white font-monospace text-start ai-diagram-pre"
                  style={{
                    lineHeight: 1.55,
                    color: "#e2e8f0"
                  }}
                >
                  {currentArch.codeDiagram}
                </pre>
              </div>
            </div>

            {/* Key Engineering Highlights */}
            <div className="row g-4">
              {currentArch.points.map((pt, idx) => (
                <div key={idx} className="col-md-6">
                  <div
                    className="p-4 rounded-4 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(34, 211, 238, 0.15)"
                    }}
                  >
                    <h5 className="text-white fw-bold mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-info"></i>
                      {pt.heading}
                    </h5>
                    <p className="text-white-50 small mb-0" style={{ lineHeight: 1.7 }}>
                      {pt.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Technology Stack Breakdown */}
        <div className="mb-5 pt-2" data-aos="fade-up">
          <div className="text-center mb-4">
            <h3 className="text-white fw-bold mb-2" style={{ fontSize: "2rem" }}>
              End-to-End Technology Stack
            </h3>
            <p className="text-white-50">
              Built with modern full-stack TypeScript and Python AI microservices
            </p>
          </div>

          <div className="row g-4">
            {TECH_STACK_GROUPS.map((grp, idx) => (
              <div key={idx} className="col-lg-4" data-aos="fade-up" data-aos-delay={idx * 150}>
                <div
                  className="glass-v2 p-4 rounded-4 h-100"
                  style={{ border: `1px solid ${grp.color}44` }}
                >
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: `${grp.color}22`,
                        border: `1px solid ${grp.color}55`,
                        boxShadow: `0 0 20px ${grp.color}33`
                      }}
                    >
                      <i className={`bi ${grp.icon} fs-4`} style={{ color: grp.color }}></i>
                    </div>
                    <h4 className="text-white fw-bold mb-0" style={{ fontSize: "1.2rem" }}>
                      {grp.category}
                    </h4>
                  </div>

                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {grp.items.map((item, i) => (
                      <li key={i} className="text-white-50 small d-flex align-items-start gap-2">
                        <i className="bi bi-chevron-right text-info mt-1" style={{ fontSize: "0.75rem" }}></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className="glass-v2 p-4 p-md-5 text-center rounded-5 position-relative overflow-hidden"
          data-aos="zoom-in"
          style={{
            border: "1px solid rgba(34, 211, 238, 0.35)",
            background:
              "linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.12))"
          }}
        >
          <h3 className="text-white fw-bold mb-2" style={{ fontSize: "1.8rem" }}>
            Explore More Enterprise & E-Commerce Case Studies
          </h3>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: "640px" }}>
            From high-load Node.js/TypeScript CRM infrastructures and Shopware 6 plugins to AI-integrated RAG systems, discover all 18+ production projects in my portfolio.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a
              href="https://github.com/DeepakAruldoss55/eshop-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-premium px-4 py-3 rounded-4 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-github fs-5"></i> Explore GitHub Repository
            </a>
            <Link
              to="/projects"
              className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold"
              style={{ border: "1px solid rgba(34, 211, 238, 0.45)", background: "rgba(34, 211, 238, 0.12)" }}
            >
              <i className="bi bi-grid-fill me-2"></i> View All Portfolio Projects
            </Link>
            <Link
              to="/"
              className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <i className="bi bi-house-door-fill me-2"></i> Back to Portfolio Home
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Screenshots */}
      {selectedScreenshot && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            zIndex: 2000,
            background: "rgba(2, 6, 23, 0.88)",
            backdropFilter: "blur(12px)"
          }}
          onClick={() => setSelectedScreenshot(null)}
        >
          <div
            className="glass-v2 p-3 p-md-4 rounded-4 position-relative"
            style={{ maxWidth: "1100px", width: "100%", border: "1px solid rgba(34,211,238,0.45)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="badge bg-info text-dark fw-bold me-2">{selectedScreenshot.badge}</span>
                <strong className="text-white">{selectedScreenshot.title}</strong>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScreenshot(null)}
                className="btn btn-sm btn-outline-light rounded-circle"
                style={{ width: "34px", height: "34px" }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}${selectedScreenshot.src}`}
              alt={selectedScreenshot.title}
              className="img-fluid rounded-3 w-100 mb-3"
              style={{ maxHeight: "72vh", objectFit: "contain", background: "#020617" }}
            />
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
              <p className="text-white-50 small mb-0">{selectedScreenshot.caption}</p>
              <button
                type="button"
                onClick={() => {
                  const t = selectedScreenshot.jumpTime;
                  setSelectedScreenshot(null);
                  seekToSeconds(t);
                }}
                className="btn btn-sm btn-primary rounded-pill px-3 py-2 fw-bold"
              >
                <i className="bi bi-play-fill me-1"></i> Jump to Video Scene ({formatTime(selectedScreenshot.jumpTime)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Animations & Holographic Keyframes */}
      <style>{`
        .ai-cyber-grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 620px;
          background-image:
            linear-gradient(to right, rgba(34, 211, 238, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at 50% 20%, rgba(0, 0, 0, 0.9) 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 20%, rgba(0, 0, 0, 0.9) 20%, transparent 75%);
          pointer-events: none;
          z-index: 1;
        }

        .ai-scanline-beam {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 110px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(34, 211, 238, 0.06),
            rgba(34, 211, 238, 0.18),
            rgba(34, 211, 238, 0.06),
            transparent
          );
          transform: translateY(-120%);
          will-change: transform;
          animation: aiScanSweep 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes aiScanSweep {
          0% { transform: translateY(-120%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(520%); opacity: 0; }
        }

        @media (max-width: 768px) {
          .ai-scanline-beam {
            display: none;
          }
          .ai-ring-outer,
          .ai-ring-middle,
          .ai-ring-inner,
          .ai-core-center {
            animation-duration: 18s !important;
          }
        }

        .ai-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 12px #22d3ee;
          display: inline-block;
          animation: aiDotPulse 1.6s infinite ease-in-out;
        }

        @keyframes aiDotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.45); opacity: 0.45; }
        }

        .ai-orbital-core {
          position: relative;
          width: 74px;
          height: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ai-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .ai-ring-outer {
          width: 74px;
          height: 74px;
          border: 1.5px dashed rgba(34, 211, 238, 0.55);
          animation: aiSpinClockwise 12s linear infinite;
        }

        .ai-ring-middle {
          width: 56px;
          height: 56px;
          border: 1.5px solid transparent;
          border-top-color: #3b82f6;
          border-bottom-color: #8b5cf6;
          animation: aiSpinCounter 7s linear infinite;
        }

        .ai-ring-inner {
          width: 40px;
          height: 40px;
          border: 1.5px dotted rgba(168, 85, 247, 0.7);
          animation: aiSpinClockwise 5s linear infinite;
        }

        .ai-core-center {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.35), rgba(15, 23, 42, 0.9));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
          animation: aiCoreBreath 2.5s ease-in-out infinite;
        }

        @keyframes aiSpinClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes aiSpinCounter {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes aiCoreBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 0 18px rgba(34, 211, 238, 0.45); }
          50% { transform: scale(1.12); box-shadow: 0 0 28px rgba(34, 211, 238, 0.85); }
        }

        .ai-wave-bar {
          width: 3px;
          height: 6px;
          border-radius: 2px;
          background: linear-gradient(to top, #3b82f6, #22d3ee);
          animation: aiWaveBounce 1.1s ease-in-out infinite;
        }

        @keyframes aiWaveBounce {
          0%, 100% { height: 5px; opacity: 0.45; }
          50% { height: 18px; opacity: 1; }
        }

        .ai-log-fade {
          animation: aiLogSlideIn 0.35s ease-out;
        }

        @keyframes aiLogSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ai-metric-tile {
          transition: all 0.35s ease;
        }

        .ai-metric-tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(34, 211, 238, 0.18);
          border-color: rgba(34, 211, 238, 0.55) !important;
        }

        .ai-snapshot-card:hover .ai-snapshot-img {
          transform: scale(1.03);
        }

        .ai-snapshot-img {
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .ai-diagram-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          text-align: center;
        }

        .ai-diagram-pre {
          display: inline-block;
          font-size: 0.84rem;
        }

        @media (max-width: 991px) {
          .ai-diagram-scroll {
            text-align: left;
          }
          .ai-diagram-pre {
            display: block;
            font-size: 0.72rem;
          }
        }

        @media (max-width: 767px) {
          .ai-arch-tab-btn {
            width: 100%;
          }
          .ai-diagram-pre {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </section>
  );
};

export default DeepShop;
