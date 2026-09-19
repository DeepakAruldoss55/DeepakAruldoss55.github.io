import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const getApiEndpoints = () => {
  if (process.env.REACT_APP_RAG_API_URL) {
    return [process.env.REACT_APP_RAG_API_URL];
  }
  if (typeof window !== "undefined" && window.location.protocol === "https:" && !window.location.hostname.includes("localhost")) {
    // On HTTPS static hosting (e.g. GitHub Pages) with no cloud API URL set
    return [];
  }
  const currentHost = typeof window !== "undefined" && window.location.hostname ? window.location.hostname : "localhost";
  return [
    "", // Relative URL (uses package.json "proxy": "http://127.0.0.1:8000" in CRA dev server)
    `http://${currentHost}:8000`,
    "http://127.0.0.1:8000",
    "http://localhost:8000"
  ];
};

// Dynamic experience calculator
const getExperience = () => {
  const now = new Date();
  const start = new Date(2018, 6); // July 2018
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return {
    full: `${years} years and ${months} months`,
    decimal: `${years}.${months} years`
  };
};

// Client-side intelligent fallback engine for static GitHub Pages hosting
const generateClientResponse = (query, chatHistory = []) => {
  const q = query.toLowerCase().trim();
  const exp = getExperience();
  const lastBotMsg = chatHistory.length > 0 ? (chatHistory[chatHistory.length - 1].content || "").toLowerCase() : "";
  const lastUserMsg = chatHistory.length > 1 ? (chatHistory[chatHistory.length - 2].content || "").toLowerCase() : "";

  // 0. HARMFUL / VULGAR / PROFANITY MODERATION FILTER
  const vulgarPattern = /\b(fuck|fucking|fucker|shit|bitch|asshole|bastard|dick|pussy|cock|cunt|slut|whore|nigger|faggot|porn|nude|kill yourself)\b/i;
  if (vulgarPattern.test(q)) {
    return "I keep our conversation focused on Deepak’s professional portfolio, software engineering work, and technical projects. Let me know if you’d like to know more about his skills, experience, or background!";
  }

  // 1. URGENCY / MOBILE NUMBER STEP 4 (Confirmed urgency)
  const isUrgent = /urgent|emergency|asap|today|right now|immediately|quick call|priority/.test(q);
  const askedPhoneRecently = /mobile|phone|call|number/.test(lastUserMsg) || /phone number|mobile number/.test(lastBotMsg);

  if (isUrgent && (askedPhoneRecently || /mobile|phone|call|number/.test(q))) {
    return (
      "I’ve noted the urgency. You can reach Deepak directly at:\n\n" +
      "- **Mobile:** **+91 6383331367**\n" +
      "- **Email:** **adeepakplm55@gmail.com**\n\n" +
      "Feel free to call or drop a quick note with your details!"
    );
  }

  // 2. MOBILE NUMBER REQUEST STEP 3 (Asks for phone number)
  if (/mobile|phone|contact number|cell|call him|give.*number|share.*number/.test(q)) {
    return (
      "I understand you’d like his phone number. Deepak is most responsive over email at **adeepakplm55@gmail.com**. " +
      "Could you let me know why you need his mobile number, or is this an urgent matter?"
    );
  }

  // 3. VALID REASON SHARED STEP 2 (Job / Freelance / Project / Hiring after contact inquiry)
  const isContactInquiryContext = /connect with deepak|discuss with deepak|what you’d like to connect/.test(lastBotMsg);
  const isValidReason = /job|hire|freelance|project|contract|opportunity|opening|interview|consulting|collaborat/.test(q);

  if (isValidReason && (isContactInquiryContext || /email|mail/.test(q))) {
    return (
      "That sounds great! You can reach Deepak directly via email at **adeepakplm55@gmail.com** with details about the opportunity or project."
    );
  }

  // 4. INITIAL CONTACT INQUIRY STEP 1 (Asking how to contact without purpose)
  if (/how to contact|how can i reach|want to talk|contact deepak|reach deepak|talk to deepak|get in touch/.test(q)) {
    return "I’d be happy to help! Could you please let me know what you’d like to connect with Deepak about?";
  }

  // 5. TECHNICAL SKILLS & STACK
  if (/skill|tech stack|technology|technologies|framework|node|react|typescript|backend|frontend/.test(q)) {
    return (
      `Deepak is a Senior Full Stack Developer & Backend Architect with **${exp.decimal}** of professional experience:\n\n` +
      "• **Core Stack:** Node.js with TypeScript, React (Vite) with TypeScript, Express.js\n" +
      "• **Databases & DevOps:** MySQL, MongoDB, Docker containerization, Linux (Ubuntu)\n" +
      "• **Backend & E-Commerce:** PHP (Symfony, Laravel, Shopware 5 & 6)\n" +
      "• **AI & Emerging Tech:** Actively engineering Retrieval-Augmented Generation (RAG) pipelines, LLMs, and vector databases."
    );
  }

  // 6. EXPERIENCE & COMPANIES
  if (/experience|company|companies|work|career|history|background|first company|novalnet|brandcrock|apple g/.test(q)) {
    if (/first company/.test(q)) {
      return "Deepak's first company was **Apple G Web Technology Pvt Ltd**, where he started his career as a Software Developer in July 2018.";
    }
    return (
      `Deepak has **${exp.full}** of professional software development experience across 3 companies:\n\n` +
      "1. **Brandcrock India Pvt. Ltd** (Jan 2023 – Present) — *Senior Software Developer*\n" +
      "   Leading scalable Node.js/TypeScript microservices architecture and enterprise CRM platform.\n\n" +
      "2. **Novalnet e-Solutions Pvt Ltd** (Oct 2021 – Dec 2022) — *Software Developer*\n" +
      "   Payment gateway integrations and e-commerce payment modules.\n\n" +
      "3. **Apple G Web Technology Pvt Ltd** (Jul 2018 – Oct 2021) — *Software Developer*\n" +
      "   Full-stack web development and RESTful API engineering."
    );
  }

  // 7. CERTIFICATIONS & AWARDS
  if (/certif|award|honor|spot award|shopware certified|uptop/.test(q)) {
    return (
      "Here are Deepak's key certifications & honors:\n\n" +
      "• **Technical Excellence Spot Award (Jan 2025):** Awarded by Brandcrock India for engineering high-performance Node.js/TypeScript microservices.\n" +
      "• **Shopware 6 Certified Developer (May 2023):** Certified mastery of Shopware 6 plugin architecture & Symfony core.\n" +
      "• **UpTop AI/ML Certification (In Progress):** Deepening expertise in AI/ML, LLM application engineering, and RAG systems.\n" +
      "• **CIICP (March 2015):** Computer hardware maintenance & networking setup."
    );
  }

  // 8. SHOPWARE PLUGINS
  if (/shopware|plugin|plugins/.test(q)) {
    return (
      "Deepak is an official **Shopware 6 Certified Developer** and has built multiple store plugins including:\n\n" +
      "• **Customer Discount Request Plugin** (Custom quote negotiations)\n" +
      "• **Customer Membership Program** (Tiered customer loyalty)\n" +
      "• **Ticket System** (In-store support & issue tracking)\n" +
      "• **Order Status Analytics** (Fulfillment & dashboard metrics)"
    );
  }

  // 9. CI/CD & SHELL SCRIPTING CLARIFICATION
  if (/ci\/cd|cicd|devops|pipeline|shell script|bash script/.test(q)) {
    return (
      "Deepak's core strength is focused on **Full Stack & Backend Architecture** (Node.js, TypeScript, React, PHP, databases). " +
      "While he uses Docker and standard Linux server commands comfortably, he does not specialize in dedicated CI/CD DevOps pipelines or advanced shell scripting."
    );
  }

  // 10. GREETINGS & INTRO
  if (/^hi|^hello|^hey|^hai|^greetings|^good (morning|afternoon|evening)/.test(q)) {
    return (
      "Hey there! 👋 I’m **Sara**, Deepak’s AI companion. " +
      "How can I help you today? Feel free to ask me anything about Deepak's projects, technical skills, or experience!"
    );
  }

  // 11. WHO IS DEEPAK / SARA
  if (/who are you|who is sara|what are you/.test(q)) {
    return (
      "I'm **Sara**, an AI companion on Deepak Aruldoss's portfolio! " +
      "I can tell you all about Deepak's software engineering background, full-stack tech stack, Shopware plugins, and recent projects."
    );
  }

  // DEFAULT CONVERSATIONAL RESPONSE
  return (
    "I’m here to help with anything about Deepak's experience, technical stack, or projects! " +
    "Feel free to ask about his work at Brandcrock, skills in Node.js & React, or Shopware plugins."
  );
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

    const history = newMessages
      .filter((m) => m.role !== "system")
      .slice(-6)
      .map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content
      }));

    try {
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
      // If backend is unavailable (e.g., on static GitHub Pages), generate intelligent client response
      const clientReply = generateClientResponse(textToSend, history);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: clientReply
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
