# Deepak Aruldoss - Personal Portfolio & "Sara" AI RAG Companion 🚀

Welcome to the official repository for **Deepak Aruldoss's** developer portfolio and **Sara AI** — a real-time Generative AI conversational assistant built with **Retrieval-Augmented Generation (RAG)**, **ChromaDB**, and **FastAPI**.

Live URL: **[deepakaruldoss55.github.io](https://deepakaruldoss55.github.io/)**

---

## 🤖 Meet "Sara" — The Portfolio AI Companion

Unlike traditional static FAQ bots or menu trees, **Sara** is a custom RAG-powered digital companion:
- **Zero Hardcoded Replies**: 100% neural generation dynamically grounded in Deepak's profile, technical experience, certifications, and project history.
- **Intelligent Multi-Stage Contact Guardrails**:
  1. *Intent Inquiry*: Enquires about the visitor's purpose before sharing contact details.
  2. *Verified Email Sharing*: Shares email (`adeepakplm55@gmail.com`) only when legitimate job offers, freelance projects, or technical inquiries are identified.
  3. *Mobile Number Safeguard*: Validates urgency before sharing direct mobile contact (`+91 6383331367`).
- **Blazing Fast (< 1.2s)**: Ultra-low latency via Groq cloud inference with automated multi-model failover and optimized prompt token budgets.
- **Offline & CPU Resilient**: Local HuggingFace neural model fallback (`Qwen2.5`) if cloud APIs are ever unreachable.

---

## 🏗️ Architecture & Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend** | React (Vite / CRA), Vanilla CSS | Responsive glassmorphism interface, interactive floating AI chat widget |
| **Backend** | FastAPI (Python 3.10+) | Asynchronous REST endpoints (`/api/chat`, `/api/health`, `/api/suggestions`) |
| **Vector DB** | ChromaDB | Local persistent vector store with `all-MiniLM-L6-v2` embeddings |
| **Inference** | Groq / OpenAI Compatible | Ultra-fast cloud inference with multi-model failover |
| **Local LLM** | Hugging Face Transformers / Ollama | Local quantized Qwen models for offline fallback |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Setup Python virtual environment & backend dependencies
cd rag-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 2. Configure Environment

Create a `.env` file in `rag-backend/`:
```env
LLM_PROVIDER=openai_compatible
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_API_KEY=your_groq_api_key_here
OPENAI_MODEL=qwen/qwen3.8-27b
CHROMA_PERSIST_DIR=./chroma_db
PORT=8000
```

### 3. Ingest Knowledge Base

```bash
cd rag-backend
./venv/bin/python ingest.py
cd ..
```

### 4. Run Full Stack (Frontend + Backend)

```bash
npm run dev
```
> React runs at `http://localhost:3000` & FastAPI runs at `http://localhost:8000`.

---

## 📦 Production Deployment

### Deploying Frontend to GitHub Pages:
```bash
npm run deploy
```
*(Runs `npm run build` and publishes to the `gh-pages` branch).*

---

## 📄 License
MIT © Deepak Aruldoss
