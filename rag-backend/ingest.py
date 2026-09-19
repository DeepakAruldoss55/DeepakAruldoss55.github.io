"""
Ingestion script for Deepak Aruldoss's Portfolio RAG.
Reads structured markdown files in `data/`, splits into semantic chunks,
generates embeddings, and stores them in a persistent ChromaDB vector collection.
"""

import os
import re
from typing import List, Dict, Union, cast, Any
import chromadb
from chromadb.utils import embedding_functions

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
raw_chroma_dir = os.getenv("CHROMA_PERSIST_DIR", "chroma_db")
CHROMA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), raw_chroma_dir)) if not os.path.isabs(raw_chroma_dir) else raw_chroma_dir
COLLECTION_NAME = "deepak_portfolio"

def chunk_markdown_text(text: str, filename: str = "") -> List[Dict[str, str]]:
    """Splits markdown into logical, topic-focused chunks with headings and doc title included."""
    text_clean = text.strip()
    if not text_clean:
        return []

    # Check for document main title (# ...)
    doc_title = ""
    first_heading = re.search(r'^#\s+(.+)$', text_clean, re.MULTILINE)
    if first_heading:
        doc_title = first_heading.group(1).strip()

    chunks: List[Dict[str, str]] = []
    
    # Always include the full document for comprehensive context
    chunks.append({
        "title": doc_title or filename,
        "content": text_clean
    })

    # Also split by ## or ### sections if multiple sections exist
    sections = re.split(r'\n(?=#{2,3}\s)', text_clean)
    if len(sections) > 1:
        for sec in sections:
            sec_clean = sec.strip()
            if not sec_clean.startswith("##"):
                continue
            
            heading_match = re.search(r'^(#{2,3})\s+(.+)$', sec_clean, re.MULTILINE)
            section_title = heading_match.group(2).strip() if heading_match else doc_title
            
            chunk_content = f"# {doc_title}\n\n{sec_clean}" if doc_title else sec_clean
            chunks.append({
                "title": section_title,
                "content": chunk_content
            })

    return chunks

def ingest_data() -> None:
    print(f"[*] Initializing ChromaDB vector store at: {CHROMA_DIR}")
    client = chromadb.PersistentClient(path=CHROMA_DIR)
    
    # Use standard sentence-transformers embedding function
    embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    
    # Reset or create collection
    try:
        client.delete_collection(name=COLLECTION_NAME)
        print(f"[*] Cleared existing collection: {COLLECTION_NAME}")
    except Exception:
        pass

    collection = client.create_collection(
        name=COLLECTION_NAME,
        embedding_function=cast(Any, embedding_fn),
        metadata={"description": "Deepak Aruldoss Portfolio Knowledge Base"}
    )

    documents: List[str] = []
    metadatas: List[Dict[str, Union[str, int, float, bool]]] = []
    ids: List[str] = []

    print(f"[*] Reading knowledge documents from: {DATA_DIR}")
    doc_id = 0

    for filename in sorted(os.listdir(DATA_DIR)):
        if not filename.endswith(".md"):
            continue
        
        filepath = os.path.join(DATA_DIR, filename)
        category = filename.replace(".md", "")
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        chunks = chunk_markdown_text(content, filename=filename)
        print(f"  -> File: {filename} ({len(chunks)} chunks created)")

        for chunk_idx, chunk in enumerate(chunks):
            documents.append(chunk["content"])
            metadatas.append({
                "source": filename,
                "category": category,
                "title": chunk["title"],
                "chunk_index": chunk_idx
            })
            ids.append(f"doc_{doc_id}")
            doc_id += 1

    # Insert into vector store
    collection.add(
        documents=documents,
        metadatas=cast(Any, metadatas),
        ids=ids
    )

    print(f"[✓] Successfully ingested {len(documents)} chunks into ChromaDB '{COLLECTION_NAME}'.")

if __name__ == "__main__":
    ingest_data()
