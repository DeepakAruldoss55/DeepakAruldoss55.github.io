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
    durationLabel: "50s",
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
    time: 195,
    timeLabel: "03:15",
    durationLabel: "40s",
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
    jumpTime: 195
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

const DeepShop = () => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
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
    <section id="deep-shop-showcase" className="section" style={{ paddingTop: "96px" }}>
      <div className="container">
        {/* Top Breadcrumb & Navigation Pill */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3" data-aos="fade-down">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link
              to="/projects"
              className="btn glass-v2 text-white px-3 py-2 rounded-pill small fw-bold text-decoration-none"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <i className="bi bi-arrow-left me-2 text-primary"></i>All Case Studies
            </Link>
            <span className="badge rounded-pill px-3 py-2" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              <i className="bi bi-stars me-1"></i> Flagship AI + Full-Stack Architecture
            </span>
            <span className="badge rounded-pill px-3 py-2" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd" }}>
              React 18 • Node.js • FastAPI • ChromaDB
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <a
              href="#video-demo"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <i className="bi bi-play-circle-fill text-primary me-1"></i> Demo Video
            </a>
            <a
              href="#system-architecture"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <i className="bi bi-diagram-3-fill text-info me-1"></i> Architecture
            </a>
            <a
              href="https://github.com/DeepakAruldoss55/eshop-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm glass-v2 text-white px-3 py-2 rounded-pill small fw-semibold"
              style={{ border: "1px solid rgba(59,130,246,0.4)", background: "rgba(59,130,246,0.15)" }}
            >
              <i className="bi bi-github me-1"></i> GitHub Repo
            </a>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div
          className="glass-v2 p-4 p-md-5 mb-5 position-relative overflow-hidden"
          data-aos="fade-up"
          style={{
            borderRadius: "36px",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            background:
              "radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.18), rgba(15, 23, 42, 0.85) 60%)"
          }}
        >
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(34, 211, 238, 0.1)", border: "1px solid rgba(34, 211, 238, 0.3)" }}>
                <span className="spinner-grow spinner-grow-sm text-info" style={{ width: "8px", height: "8px" }}></span>
                <span className="text-info small fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>
                  Next-Level Full-Stack & Applied AI Engineering Showcase
                </span>
              </div>

              <h1 className="text-gradient fw-900 mb-3" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", lineHeight: 1.1 }}>
                DeepShop — AI-Powered E-Commerce & Enterprise ERP Suite
              </h1>

              <p className="text-white mb-4" style={{ fontSize: "1.1rem", opacity: 0.92, lineHeight: 1.75 }}>
                An end-to-end, production-grade commercial ecosystem uniting a{" "}
                <strong className="text-info">React 18 + TypeScript Storefront</strong>, a{" "}
                <strong className="text-primary">Domain-Driven Node.js/Express Microservice</strong>, a{" "}
                <strong style={{ color: "#c4b5fd" }}>7-Module Enterprise Admin ERP</strong>, and a{" "}
                <strong className="text-info">Dual-Engine FastAPI + ChromaDB AI Microservice</strong>{" "}
                featuring a Customer RAG Shopping Concierge and a Multi-Turn Merchant Business Copilot.
              </p>

              <div className="d-flex flex-wrap gap-3 align-items-center">
                <button
                  type="button"
                  onClick={() => seekToSeconds(0)}
                  className="btn btn-premium px-4 py-3 rounded-4 d-inline-flex align-items-center gap-2"
                  style={{ fontSize: "1rem" }}
                >
                  <i className="bi bi-play-fill fs-5"></i> Watch Full Walkthrough (05:47)
                </button>
                <button
                  type="button"
                  onClick={() => seekToSeconds(145)}
                  className="btn glass-v2 text-white px-4 py-3 rounded-4 fw-bold"
                  style={{ border: "1px solid rgba(34, 211, 238, 0.4)", background: "rgba(34, 211, 238, 0.08)" }}
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

            {/* Key Architectural Pillars Summary Box */}
            <div className="col-lg-4">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "rgba(2, 6, 23, 0.65)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-layers-half text-primary"></i> Core System Metrics
                </h5>
                <div className="row g-3">
                  {[
                    { value: "3 Services", label: "React • Express • FastAPI", icon: "bi-boxes" },
                    { value: "384-Dim", label: "Hybrid Vector Embeddings", icon: "bi-bezier2" },
                    { value: "3-Tier LLM", label: "Groq • OpenRouter • Offline", icon: "bi-shield-check" },
                    { value: "7 Modules", label: "Full ERP, P&L & CRM Suite", icon: "bi-bar-chart-steps" }
                  ].map((stat, idx) => (
                    <div key={idx} className="col-6">
                      <div
                        className="p-3 rounded-3 h-100"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)"
                        }}
                      >
                        <i className={`bi ${stat.icon} text-info d-block mb-1 fs-5`}></i>
                        <div className="text-white fw-bold" style={{ fontSize: "1.05rem" }}>
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

        {/* Interactive Video Player + Timestamped Chapter Navigator */}
        <div id="video-demo" ref={videoContainerRef} className="mb-5" data-aos="fade-up">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
            <div>
              <span className="text-primary fw-bold text-uppercase small d-block mb-1" style={{ letterSpacing: "1.5px" }}>
                Interactive Product & Engineering Walkthrough
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
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
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
                className="glass-v2 p-3 p-md-4 h-100 d-flex flex-column"
                style={{
                  borderRadius: "28px",
                  border: "1px solid rgba(59, 130, 246, 0.35)",
                  boxShadow: "0 25px 70px rgba(0, 0, 0, 0.65)"
                }}
              >
                {/* Video Window Top Bar */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-white border-opacity-10">
                  <div className="d-flex align-items-center gap-2">
                    <span className="d-inline-block rounded-circle bg-danger" style={{ width: "10px", height: "10px" }}></span>
                    <span className="d-inline-block rounded-circle bg-warning" style={{ width: "10px", height: "10px" }}></span>
                    <span className="d-inline-block rounded-circle bg-success" style={{ width: "10px", height: "10px" }}></span>
                    <span className="text-white-50 small ms-2 font-monospace">
                      deepshop.mp4 • 1080p Full HD
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 px-3 py-1 rounded-pill">
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
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
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
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(59, 130, 246, 0.25)"
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
                      <span
                        key={i}
                        className="badge rounded-pill px-3 py-2 fw-normal text-white"
                        style={{
                          background: "rgba(59, 130, 246, 0.12)",
                          border: "1px solid rgba(59, 130, 246, 0.25)",
                          fontSize: "0.78rem",
                          textTransform: "none",
                          letterSpacing: "0.2px"
                        }}
                      >
                        <i className="bi bi-check2-circle text-info me-1"></i>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Chapter Playlist Column */}
            <div className={isTheaterMode ? "col-12" : "col-lg-4"}>
              <div
                className="glass-v2 p-4 h-100 d-flex flex-column"
                style={{
                  borderRadius: "28px",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-white border-opacity-10">
                  <div>
                    <h4 className="text-white fw-bold mb-0" style={{ fontSize: "1.2rem" }}>
                      <i className="bi bi-collection-play-fill text-primary me-2"></i>
                      Demo Chapters
                    </h4>
                    <span className="text-white-50 small">
                      Click any timestamp to jump directly to that feature
                    </span>
                  </div>
                  <span className="badge bg-white bg-opacity-10 text-white rounded-pill px-3 py-2">
                    7 Scenes
                  </span>
                </div>

                <div
                  className="d-flex flex-column gap-2 overflow-auto pe-1"
                  style={{ maxHeight: isTheaterMode ? "420px" : "600px" }}
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
                            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.2))"
                            : "rgba(255, 255, 255, 0.03)",
                          border: isActive
                            ? "1px solid rgba(59, 130, 246, 0.6)"
                            : "1px solid rgba(255, 255, 255, 0.07)",
                          cursor: "pointer"
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span
                            className="badge rounded-pill px-2 py-1 font-monospace"
                            style={{
                              background: isActive ? "#3b82f6" : "rgba(255,255,255,0.08)",
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
                Interface & Module Snapshots
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
                  className="glass-v2 p-3 rounded-4 h-100 d-flex flex-column"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="position-relative rounded-3 overflow-hidden mb-3"
                    style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)" }}
                    onClick={() => setSelectedScreenshot(shot)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}${shot.src}`}
                      alt={shot.title}
                      className="img-fluid w-100"
                      style={{ height: "250px", objectFit: "cover", objectPosition: "top" }}
                    />
                    <div
                      className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill small fw-bold text-white"
                      style={{
                        background: "rgba(15, 23, 42, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(59, 130, 246, 0.4)"
                      }}
                    >
                      {shot.badge}
                    </div>
                    <div
                      className="position-absolute bottom-0 end-0 m-3 px-3 py-1 rounded-pill small fw-bold text-white"
                      style={{
                        background: "rgba(59, 130, 246, 0.9)"
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
            <span className="text-primary fw-bold text-uppercase small d-block mb-2" style={{ letterSpacing: "1.5px" }}>
              Under The Hood • Technical Blueprint
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
                  className="btn px-4 py-3 rounded-4 fw-bold d-flex align-items-center gap-2 transition-smooth"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, var(--primary), var(--secondary))"
                      : "rgba(30, 41, 59, 0.55)",
                    color: "#fff",
                    border: active
                      ? "1px solid rgba(255,255,255,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: active ? "0 10px 30px rgba(59, 130, 246, 0.35)" : "none"
                  }}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Architecture Tab Content Card */}
          <div
            className="glass-v2 p-4 p-lg-5"
            style={{
              borderRadius: "32px",
              border: "1px solid rgba(59, 130, 246, 0.25)"
            }}
          >
            <div className="mb-4">
              <h3 className="text-white fw-bold mb-2" style={{ fontSize: "1.75rem" }}>
                {currentArch.title}
              </h3>
              <p className="text-white-50 mb-0" style={{ fontSize: "1.05rem" }}>
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
                      background: "rgba(2, 6, 23, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
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
              className="p-3 p-md-4 rounded-4 mb-4"
              style={{
                background: "#020617",
                border: "1px solid rgba(59, 130, 246, 0.3)"
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-white border-opacity-10">
                <span className="text-info small fw-bold font-monospace">
                  <i className="bi bi-terminal-fill me-2"></i>
                  {currentArch.codeTitle}
                </span>
                <span className="badge bg-primary bg-opacity-25 text-primary small">
                  Production Pipeline
                </span>
              </div>
              <pre
                className="mb-0 text-white font-monospace"
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  overflowX: "auto",
                  color: "#e2e8f0"
                }}
              >
                {currentArch.codeDiagram}
              </pre>
            </div>

            {/* Key Engineering Highlights */}
            <div className="row g-4">
              {currentArch.points.map((pt, idx) => (
                <div key={idx} className="col-md-6">
                  <div
                    className="p-4 rounded-4 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    <h5 className="text-white fw-bold mb-2 d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-primary"></i>
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
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: `${grp.color}22`,
                        border: `1px solid ${grp.color}55`
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
                        <i className="bi bi-chevron-right text-primary mt-1" style={{ fontSize: "0.75rem" }}></i>
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
          className="glass-v2 p-4 p-md-5 text-center rounded-5"
          data-aos="zoom-in"
          style={{
            border: "1px solid rgba(59, 130, 246, 0.3)",
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.12))"
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
              style={{ border: "1px solid rgba(59, 130, 246, 0.4)", background: "rgba(59, 130, 246, 0.12)" }}
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
            style={{ maxWidth: "1100px", width: "100%", border: "1px solid rgba(59,130,246,0.4)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="badge bg-primary me-2">{selectedScreenshot.badge}</span>
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
    </section>
  );
};

export default DeepShop;
