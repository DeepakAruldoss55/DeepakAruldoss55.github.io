# npm rebuild
# npm run dev

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

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Configure AI Service URL (Optional)

The FastAPI + ChromaDB RAG AI service has been split into the standalone **`portfolio-ai`** repository ([DeepakAruldoss55/portfolio-ai](https://github.com/DeepakAruldoss55/portfolio-ai)) so it can be hosted independently (e.g., on Instabox).

- In local development, the chatbot automatically connects to `http://localhost:8000` if `portfolio-ai` is running locally.
- For production (GitHub Pages), set the GitHub Actions repository variable `REACT_APP_RAG_API_URL` to your deployed `portfolio-ai` HTTPS URL (e.g., `https://8000-<your-box>.instabox.tech`).
- If the remote AI service is unreachable, the chat widget automatically falls back to its built-in client-side assistant.

### 3. Run Frontend

```bash
npm run dev
```
> React runs at `http://localhost:3000`.

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
