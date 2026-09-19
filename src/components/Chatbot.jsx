import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const getApiEndpoints = () => {
  if (process.env.REACT_APP_RAG_API_URL) {
    return [process.env.REACT_APP_RAG_API_URL];
  }
  const currentHost = typeof window !== "undefined" && window.location.hostname ? window.location.hostname : "localhost";
  return [
    "", // Relative URL (uses package.json "proxy": "http://127.0.0.1:8000" in CRA dev server)
    `http://${currentHost}:8000`,
    "http://127.0.0.1:8000",
    "http://localhost:8000"
  ];
};

const INITIAL_MESSAGE = {
  role: "bot",
  content:
    "Hi there! 👋 I'm **Sara**.\n\n" +
    "What brings you here today, or how can I help you?"
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Prevent background page scrolling when interacting with chat window
  useEffect(() => {
    const el = chatWindowRef.current;
    if (!el || !isOpen) return;

    const handleWheel = (e) => {
      const messagesEl = el.querySelector(".chatbot-messages");
      if (!messagesEl) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = messagesEl;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1) ||
        (isScrollingUp && scrollTop <= 0)
      ) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build history for context
      const history = newMessages
        .filter((m) => m.role !== "system")
        .slice(-6)
        .map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content
        }));

      const endpoints = getApiEndpoints();
      let responseData = null;
      let lastError = null;

      for (const base of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);
          const url = base ? `${base}/api/chat` : "/api/chat";
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: textToSend,
              history: history
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (res.ok) {
            responseData = await res.json();
            break;
          } else {
            lastError = new Error(`HTTP ${res.status}`);
          }
        } catch (err) {
          lastError = err;
        }
      }

      if (!responseData) {
        throw lastError || new Error("Failed to reach server");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: responseData.reply || "I received an empty response."
        }
      ]);
    } catch (err) {
      console.warn("RAG Backend fetch error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "⚠️ *Unable to reach the assistant service right now.*\n\n" +
            "Please feel free to explore the portfolio sections or connect with Deepak directly at **adeepakplm55@gmail.com**!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Robust Markdown-like formatting helper
  const formatContent = (text) => {
    if (!text) return "";

    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      // Heading 1 (# ...)
      if (trimmed.startsWith("# ")) {
        return (
          <div key={idx} className="msg-heading h1">
            {trimmed.replace(/^#\s+/, "")}
          </div>
        );
      }
      // Heading 2 (## ...)
      if (trimmed.startsWith("## ")) {
        return (
          <div key={idx} className="msg-heading h2">
            {trimmed.replace(/^##\s+/, "")}
          </div>
        );
      }
      // Heading 3 (### ...)
      if (trimmed.startsWith("### ")) {
        return (
          <div key={idx} className="msg-heading h3">
            {trimmed.replace(/^###\s+/, "")}
          </div>
        );
      }

      // Helper to parse bold, italic, code, and links in inline text
      const parseInline = (str) => {
        const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s)]+)/g;
        const tokens = str.split(regex);

        return tokens.map((tok, pIdx) => {
          if (!tok) return null;
          if (tok.startsWith("**") && tok.endsWith("**") && tok.length >= 4) {
            return <strong key={pIdx}>{tok.slice(2, -2)}</strong>;
          }
          if (tok.startsWith("*") && tok.endsWith("*") && tok.length >= 2) {
            return <em key={pIdx}>{tok.slice(1, -1)}</em>;
          }
          if (tok.startsWith("`") && tok.endsWith("`") && tok.length >= 2) {
            return <code key={pIdx} className="msg-code">{tok.slice(1, -1)}</code>;
          }
          // Markdown link [title](url)
          const linkMatch = tok.match(/^\[(.*?)\]\((https?:\/\/.*?)\)$/);
          if (linkMatch) {
            return (
              <a
                key={pIdx}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="msg-link"
              >
                {linkMatch[1]}
              </a>
            );
          }
          // Raw URL
          if (tok.startsWith("http://") || tok.startsWith("https://")) {
            return (
              <a
                key={pIdx}
                href={tok}
                target="_blank"
                rel="noopener noreferrer"
                className="msg-link"
              >
                {tok}
              </a>
            );
          }
          return tok;
        });
      };

      // Bullet points (- or * or •)
      const bulletMatch = line.match(/^(\s*)([-*•])\s+(.*)$/);
      if (bulletMatch) {
        const indentLevel = Math.floor(bulletMatch[1].length / 2);
        const bulletText = bulletMatch[3];
        return (
          <div
            key={idx}
            className="msg-list-item"
            style={{
              paddingLeft: `${(indentLevel + 1) * 14}px`,
              marginBottom: "4px"
            }}
          >
            <span className="bullet-dot">•</span>
            <span className="bullet-content">{parseInline(bulletText)}</span>
          </div>
        );
      }

      // Empty line spacer
      if (trimmed === "") {
        return <div key={idx} style={{ height: "6px" }} />;
      }

      // Regular paragraph
      return (
        <div key={idx} className="msg-paragraph" style={{ marginBottom: "4px" }}>
          {parseInline(line)}
        </div>
      );
    });
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Launcher Button */}
      <button
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close Sara" : "Chat with Sara (AI Assistant)"}
        aria-label="Open Sara AI Assistant"
      >
        <span className="launcher-badge">Sara</span>
        <i className={isOpen ? "bi bi-x-lg" : "bi bi-chat-dots-fill"}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" ref={chatWindowRef}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="avatar-wrapper">
                <i className="bi bi-chat-dots-fill"></i>
                <span className="status-dot"></span>
              </div>
              <div className="header-text">
                <h4>Sara</h4>
                <span className="ai-tag">
                  <i className="bi bi-circle-fill text-success" style={{ fontSize: "6px", marginRight: "4px" }}></i>
                  AI Companion • Ready to chat
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button
                className="header-btn"
                onClick={clearChat}
                title="Clear Conversation"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
              <button
                className="header-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-row ${msg.role}`}>
                <div className="msg-bubble">
                  {formatContent(msg.content)}
                </div>
              </div>
            ))}


            {isLoading && (
              <div className="message-row bot">
                <div className="msg-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            className="chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
