"""
RAG Engine for Deepak Aruldoss's Portfolio.
Real Generative AI pipeline utilizing ChromaDB semantic retrieval and Neural Language Models (Groq / OpenRouter / Ollama / Local Qwen).
Zero hardcoded static FAQs - 100% Neural Generation grounded on profile data.
"""

import os
import requests
from typing import List, Dict, Any, Optional, cast
import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv

ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(ENV_PATH)

raw_chroma_dir = os.getenv("CHROMA_PERSIST_DIR", "chroma_db")
CHROMA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), raw_chroma_dir)) if not os.path.isabs(raw_chroma_dir) else raw_chroma_dir
COLLECTION_NAME = "deepak_portfolio"

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "openai_compatible")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")

OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.groq.com/openai/v1")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "qwen/qwen3.8-27b")

from datetime import datetime

def calculate_experience() -> Dict[str, Any]:
    now = datetime.now()
    start_year = 2018
    start_month = 7  # July 2018
    
    years = now.year - start_year
    months = now.month - start_month
    
    if months < 0:
        years -= 1
        months += 12
        
    return {
        "years": years,
        "months": months,
        "short": f"{years}y {months}m",
        "decimal": f"{years}.{months} years",
        "full": f"{years} years and {months} months",
        "current_date": now.strftime("%B %Y")
    }

class PortfolioRAGEngine:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=CHROMA_DIR)
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        self._local_pipe = None

    def get_collection(self):
        """Loads the ChromaDB collection containing indexed data."""
        try:
            return self.client.get_collection(
                name=COLLECTION_NAME,
                embedding_function=cast(Any, self.embedding_fn)
            )
        except Exception as e:
            print(f"[!] ChromaDB collection error: {e}")
            return None

    def retrieve(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        """Performs vector semantic search against the knowledge store."""
        collection = self.get_collection()
        if not collection:
            return []

        try:
            results = collection.query(
                query_texts=[query],
                n_results=top_k,
                include=["documents", "metadatas", "distances"]
            )
        except Exception as e:
            print(f"[!] Retrieval error: {e}")
            return []

        retrieved: List[Dict[str, Any]] = []
        if results is not None:
            documents_list = results.get("documents")
            if documents_list is not None and len(documents_list) > 0:
                docs = documents_list[0]
                metadatas_list = results.get("metadatas")
                metas = metadatas_list[0] if metadatas_list and len(metadatas_list) > 0 else [{}] * len(docs)
                for doc, meta in zip(docs, metas):
                    retrieved.append({
                        "content": doc,
                        "metadata": meta
                    })

        return retrieved

    def _get_local_pipeline(self):
        """Lazy-loads the local Qwen neural model on CPU."""
        if self._local_pipe is None:
            print("[*] Initializing local neural model (Qwen/Qwen2.5-0.5B-Instruct)...")
            from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
            import torch
            model_id = "Qwen/Qwen2.5-0.5B-Instruct"
            tokenizer = AutoTokenizer.from_pretrained(model_id)
            model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.float32)
            self._local_pipe = pipeline(
                "text-generation",
                model=model,
                tokenizer=tokenizer,
                max_new_tokens=120,
                do_sample=True,
                temperature=0.7
            )
            print("[✓] Local neural model ready.")
        return self._local_pipe

    def _call_local_qwen(self, prompt: str, system_prompt: str) -> str:
        """Generates response using the local HuggingFace Qwen model."""
        pipe = self._get_local_pipeline()
        # Keep prompt concise for fast CPU generation
        compact_system = (
            "You are Sara, AI companion on Deepak Aruldoss's portfolio. Tone: friendly, warm, concise. "
            "Deepak is a Senior Software Developer (Node.js, TypeScript, React, PHP). "
            "Never share contact info initially: ask their reason first. "
            "If valid reason (job/project), share email adeepakplm55@gmail.com. "
            "Only share mobile +91 6383331367 if explicitly urgent."
        )
        messages = [
            {"role": "system", "content": compact_system},
            {"role": "user", "content": prompt}
        ]
        out = pipe(messages)
        return out[0]["generated_text"][-1]["content"].strip()

    def _call_ollama(self, prompt: str, system_prompt: str) -> str:
        """Invokes local Ollama inference service."""
        url = f"{OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "system": system_prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "top_p": 0.9
            }
        }
        res = requests.post(url, json=payload, timeout=15)
        if res.status_code == 200:
            return res.json().get("response", "").strip()
        raise RuntimeError(f"Ollama error: HTTP {res.status_code} - {res.text}")

    def _call_openai_compatible(self, prompt: str, system_prompt: str, history: Optional[List[Dict[str, str]]] = None) -> str:
        """Invokes OpenAI-compatible Cloud LLM with automated multi-model fallback."""
        url = f"{OPENAI_BASE_URL.rstrip('/')}/chat/completions"
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }
        
        messages = [{"role": "system", "content": system_prompt}]
        if history:
            for h in history[-4:]:
                role = "assistant" if h.get("role") in ["assistant", "bot"] else "user"
                content = h.get("content", "").strip()
                if content:
                    messages.append({"role": role, "content": content})
                
        # Only append prompt if it isn't already the last message in history
        if not messages or messages[-1].get("content") != prompt:
            messages.append({"role": "user", "content": prompt})

        # List of candidate models for automated failover if primary hits rate limits (429)
        candidate_models = [OPENAI_MODEL]
        alternative_models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "groq/compound-mini", "qwen/qwen3.8-27b"]
        for alt in alternative_models:
            if alt not in candidate_models:
                candidate_models.append(alt)

        last_error = None
        for model_name in candidate_models:
            try:
                payload = {
                    "model": model_name,
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 400
                }
                res = requests.post(url, json=payload, headers=headers, timeout=8)
                if res.status_code == 200:
                    data = res.json()
                    choices = data.get("choices", [])
                    if choices and "message" in choices[0]:
                        content = choices[0]["message"].get("content", "").strip()
                        if content:
                            return content
                else:
                    print(f"[!] Cloud LLM error ({model_name}) HTTP {res.status_code}: {res.text[:120]}")
                    last_error = f"HTTP {res.status_code}"
            except Exception as e:
                print(f"[!] Cloud LLM exception ({model_name}): {e}")
                last_error = str(e)

        raise RuntimeError(f"All cloud LLM models failed. Last error: {last_error}")

    def answer_query(self, query: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        """
        Main RAG Pipeline:
        1. Retrieve accurate grounded knowledge chunks from ChromaDB.
        2. Feed knowledge into Neural LLM with strict grounding & conversational persona.
        3. Dynamically generate real-time, human-like response.
        """
        retrieved_chunks = self.retrieve(query, top_k=3)
        context_text = "\n\n---\n\n".join([c["content"] for c in retrieved_chunks])
        exp_info = calculate_experience()

        system_prompt = (
            "You are Sara, an intelligent, friendly, and highly engaging AI companion on Deepak Aruldoss's portfolio website.\n\n"
            "CORE MOTIVE & CONVERSATIONAL STYLE:\n"
            "- YOU HANDLE THE CONVERSATION DIRECTLY: You are knowledgeable about everything related to Deepak's career, technical skills, projects, and background. Answer questions directly, smoothly, and thoroughly yourself.\n"
            "- DO NOT PROACTIVELY ASK TO CONNECT WITH DEEPAK: Never prompt or ask the user if they want to connect, reach out, or get in touch with Deepak (e.g. never say 'let me know if you want to connect with Deepak' or 'I can help connect you with Deepak'). Simply answer their questions or chat naturally.\n"
            "- NATURAL & CASUAL: Keep your tone warm, friendly, concise, and natural—like a real person chatting. Respond directly to what the user says or asks.\n"
            "- NO MULTIPLE-CHOICE OR MENU LISTS: NEVER ask robotic categorical questions or enumerate menu options.\n"
            "STRICT CONTACT & ENQUIRY PROTOCOL (MANDATORY):\n"
            "- NEVER SHARE CONTACT DETAILS INITIALLY: If a user asks 'how to contact deepak', 'how can I reach deepak', or similar initial contact questions, do NOT share any email or phone number. First, politely ask their reason/purpose (e.g. 'I’d be happy to help! Could you please share what you’d like to connect with Deepak about?').\n"
            "- STAGE 2 (VALID REASON PROVIDED): If the user shares a valid purpose (e.g. job offer, freelancing, project proposal, consulting, or hiring), share ONLY his email: **adeepakplm55@gmail.com**. Do NOT share his phone/mobile number at this stage.\n"
            "- STAGE 3 (MOBILE NUMBER REQUESTED): If the user specifically asks for his mobile/phone number, do NOT share it right away. First enquire why they need his mobile and suggest connecting via email (e.g. 'Deepak is most responsive over email at **adeepakplm55@gmail.com**. Could you let me know why you need his phone number, or is this an urgent matter?').\n"
            "- STAGE 4 (URGENT NEED CONFIRMED): If the user explicitly confirms urgency (e.g. 'it is urgent', 'need urgent call', 'emergency hiring', 'quick interview'), ONLY THEN share his mobile number: **+91 6383331367** (along with email **adeepakplm55@gmail.com**).\n"
            "- GENERAL CHAT: In all other conversations (greetings, asking about skills, work, experience), do NOT offer or bring up connecting with Deepak. Handle everything yourself.\n\n"
            "DYNAMIC REAL-TIME EXPERIENCE:\n"
            f"- Career start date: July 2018.\n"
            f"- Current Date: {exp_info['current_date']}.\n"
            f"- Total Experience: Exactly {exp_info['decimal']} ({exp_info['full']} / {exp_info['short']}).\n"
            f"- When asked about total experience or years of experience, state directly that Deepak has {exp_info['decimal']} ({exp_info['full']}) of professional experience since July 2018.\n\n"
            "CAREER & COMPANY TIMELINE:\n"
            "1. **First Company (Starting Role)**: **Apple G Web Technology Pvt Ltd** (July 2018 – October 2021) as Software Developer.\n"
            "2. **Second Company**: **Novalnet e-Solutions Pvt Ltd** (October 2021 – December 2022) as Software Developer.\n"
            "3. **Third & Current Company**: **Brandcrock India Pvt. Ltd** (January 2023 – Present) as Senior Software Developer.\n"
            "- When asked about Deepak's first company, state Apple G Web Technology Pvt Ltd (started July 2018).\n\n"
            "TECHNICAL SKILLS & ARSENAL:\n"
            "1. **Modern Stack & Frameworks**: Node.js with TypeScript, React (Vite) with TypeScript, Express.js, Embedded JavaScript (EJS).\n"
            "2. **Data & Infrastructure**: MySQL & Relational Databases, MongoDB, Docker & Containerization, Linux (Ubuntu).\n"
            "3. **Backend & Ecosystems**: PHP (Symfony/Laravel/Shopware), Python, API & System Integration, E-commerce Architecture.\n"
            "4. **Emerging Tech & Active Learning**: Actively learning and experimenting with **AI/ML & Generative AI** (RAG architectures, LLM prompt engineering, vector databases, and AI assistants).\n\n"
            "CERTIFICATIONS & HONORS:\n"
            "1. **Shopware 6 Certified Developer** (May 2023): Deep architectural mastery of Shopware 6 plugin lifecycle, event subscribers, template engine, and core Symfony framework components.\n"
            "2. **Technical Excellence - Spot Award Winner** (January 2025 by Brandcrock India Pvt. Ltd): Honored for outstanding technical leadership, engineering highly scalable Node.js & TypeScript microservices, and optimizing enterprise CRM backend architecture.\n"
            "3. **UpTop AI/ML Certification** (**Ongoing / Currently In Progress**): Actively undergoing professional certification in Artificial Intelligence, Machine Learning, LLMs, and Generative AI application engineering.\n"
            "4. **Canada India Institutional Cooperation Project (CIICP)** (March 2015): Computer hardware maintenance and basic network setup during polytechnic studies.\n\n"
            "SKILL BOUNDARIES & CLARIFICATIONS (IMPORTANT):\n"
            "- **CI/CD**: Deepak is **not** experienced in CI/CD pipelines or dedicated DevOps workflows. If asked about CI/CD, clarify politely and honestly that his core strength is in Full Stack & Backend development (Node.js, TypeScript, React, Express, PHP, databases), not CI/CD pipeline management.\n"
            "- **Shell Scripting**: Deepak has only basic/low-level knowledge of everyday Linux terminal commands, but does not specialize in advanced shell scripting.\n\n"
            "KNOWLEDGE BASE:\n"
            f"{context_text}"
        )

        user_prompt = query

        reply = ""
        sources = [c["metadata"].get("source", "portfolio") for c in retrieved_chunks]

        # 1. Try Cloud LLM (Groq / OpenRouter / OpenAI) if key configured
        if OPENAI_API_KEY:
            try:
                reply = self._call_openai_compatible(user_prompt, system_prompt, history=history)
            except Exception as e:
                print(f"[!] Cloud LLM error: {e}")

        # 2. Try Ollama if running
        if not reply and LLM_PROVIDER == "ollama":
            try:
                reply = self._call_ollama(user_prompt, system_prompt)
            except Exception as e:
                print(f"[!] Ollama connection error: {e}")

        # 3. Use local Neural Model (Qwen/Qwen2.5-0.5B)
        if not reply:
            try:
                reply = self._call_local_qwen(user_prompt, system_prompt)
            except Exception as e:
                print(f"[!] Local Qwen error: {e}")
                reply = (
                    "Hi! Great to meet you 😊 I'm Sara, Deepak's AI companion. "
                    "Feel free to ask me anything about Deepak's experience, full-stack projects, tech stack, or background!"
                )

        return {
            "reply": reply,
            "sources": list(set(sources))
        }

# Global singleton engine instance
rag_engine = PortfolioRAGEngine()
