"""
FastAPI Server for Deepak Aruldoss's Portfolio RAG Chatbot.
Provides endpoints for conversational query processing, suggestions, and healthchecks.
"""

import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_engine import rag_engine

app = FastAPI(
    title="Deepak Aruldoss Portfolio RAG API",
    description="RAG-powered conversational API using Qwen and ChromaDB",
    version="1.0.0"
)

# Enable CORS for React frontend (localhost, 127.0.0.1, LAN IPs)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    sources: List[str]

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Deepak Aruldoss Portfolio RAG Chatbot API",
        "endpoints": {
            "chat": "POST /api/chat",
            "suggestions": "GET /api/suggestions",
            "health": "GET /api/health"
        }
    }

@app.get("/api/health")
def health_check():
    coll = rag_engine.get_collection()
    return {
        "status": "healthy",
        "chunks_indexed": coll.count() if coll else 0
    }

@app.get("/api/suggestions")
def get_suggestions():
    return {
        "suggestions": [
            "What are Deepak's core technical skills?",
            "Tell me about his experience at Brandcrock",
            "What Shopware plugins has Deepak developed?",
            "What awards or certifications does Deepak have?",
            "How can I contact or hire Deepak?"
        ]
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    try:
        result = rag_engine.answer_query(
            query=req.message.strip(),
            history=[msg.dict() for msg in req.history] if req.history else []
        )
        return ChatResponse(
            reply=result["reply"],
            sources=result["sources"]
        )
    except Exception as e:
        print(f"[!] Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process chat: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
