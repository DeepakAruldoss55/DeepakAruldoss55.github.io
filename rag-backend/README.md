# Deepak Aruldoss - Portfolio RAG Chatbot Backend

This backend powers the AI chatbot on Deepak Aruldoss's portfolio website using **RAG (Retrieval-Augmented Generation)** with the **Qwen** model.

## Architecture

1. **Knowledge Base (`data/`)**: Markdown files containing Deepak's bio, skills, experience, projects, certifications, and FAQs.
2. **Vector Store (`ChromaDB`)**: High-performance local vector database storing embeddings generated with `sentence-transformers/all-MiniLM-L6-v2`.
3. **Inference (Qwen)**:
   - **Local**: Ollama running `qwen2.5:1.5b` / `qwen2.5:3b` / `qwen2.5:7b`.
   - **Cloud**: Any OpenAI-compatible API (OpenRouter, Groq, DashScope, Hugging Face).
   - **Offline Mock Mode**: Automatic fallback context extraction when LLM server is starting up.
4. **API (`FastAPI`)**: Exposes `/api/chat` and `/api/suggestions`.

---

## 🚀 Quick Setup & Run

### 1. Set Up Python Virtual Environment
```bash
cd rag-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Ingest Knowledge Base
```bash
python3 ingest.py
```

### 3. Run Qwen locally with Ollama (Optional / Recommended)
If you have [Ollama](https://ollama.com/) installed:
```bash
ollama run qwen2.5:1.5b
```

### 4. Start the FastAPI Server
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 📡 API Endpoints

- `GET /api/health` - Check backend and ChromaDB status.
- `GET /api/suggestions` - Fetch quick prompt starter chips for the UI.
- `POST /api/chat` - Send user message and chat history to receive RAG-grounded response.
  ```json
  {
    "message": "What projects has Deepak built?",
    "history": []
  }
  ```
