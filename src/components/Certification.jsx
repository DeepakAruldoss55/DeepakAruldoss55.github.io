import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const certifications = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    issuer: "Uptor (LMES) • Cert #AIML1002",
    date: "November 2026",
    badge: "AI & ML",
    accent: "#38bdf8",
    description:
      "Completed Uptor (LMES) AI & ML Certification covering Data Science & ML (Pandas, NumPy, Scikit-learn, Seaborn), Deep Learning (PyTorch, Transformers), Generative AI & LLMs (OpenAI, Prompt Engineering), and Advanced AI (Vector Databases, RAG, Fine-tuning, QLoRA, Agent Systems).",
    image: "/static/media/img/Certificate/Artificial_Intelligence_And_Machine_Learning.jpg",
    alt: "Uptor Artificial Intelligence and Machine Learning Certification"
  },
  {
    id: "shopware-6",
    title: "Shopware 6 Certified Developer",
    issuer: "Shopware AG",
    date: "May 2023",
    badge: "CERTIFIED",
    accent: "#3b82f6",
    description:
      "Successfully mastered Shopware 6 development, covering core architecture, plugin systems, template engines, and event-driven logic. Validated expertise through a rigorous technical examination.",
    image: "/static/media/img/Certificate/Deepak_Aruldoss_shopware.webp",
    alt: "Shopware 6 Certification"
  },
  {
    id: "ciicp",
    title: "Canada India Institutional Cooperation Project",
    issuer: "CIICP",
    date: "March 2015",
    badge: "FOUNDATION",
    accent: "#22d3ee",
    description:
      "CIICP Certification in Computer Hardware, Servicing, and Networking. A foundational validation of expertise in hardware architecture and network infrastructure management.",
    image: "/static/media/img/Certificate/deepak_aruldoss_ciicp.webp",
    alt: "CIICP Certification"
  },
  {
    id: "spot-award",
    title: "Technical Excellence - Spot Award Winner",
    issuer: "BrandCrock India Pvt Ltd",
    date: "January 2025",
    badge: "AWARD WINNER",
    accent: "#a855f7",
    description:
      "Honored for exceptional technical excellence and architectural contributions. Specifically recognized for engineering highly scalable Node.js & TypeScript backends and optimizing production workflows.",
    image: "/static/media/img/Certificate/Deepak_Aruldoss_sport_award.webp",
    alt: "Spot Award 2025"
  }
];

const Certification = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxCert, setLightboxCert] = useState(null);
  const activeCert = certifications[activeIndex];

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  // Lock body scroll and allow ESC key to close when modal is open
  useEffect(() => {
    if (!lightboxCert) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxCert]);

  return (
    <section id="certifications" className="certifications section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="text-gradient fw-900" style={{ fontSize: "2.5rem" }}>
          Professional Certifications
        </h2>
        <p className="section-subtitle">
          A record of specialized expertise and industry-standard technical validation.
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="150">
        <div
          className="glass-v2 rounded-5 p-3 p-md-4 p-lg-5"
          style={{ border: "1px solid rgba(255, 255, 255, 0.12)" }}
        >
          <div className="row g-4 g-lg-5 align-items-stretch">
            {/* Left: Complete Credential Index (All 4 Always Visible) */}
            <div className="col-lg-5 d-flex flex-column justify-content-center">
              <div className="cert-index-list d-flex flex-column">
                {certifications.map((cert, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`cert-index-row text-start w-100 border-0 bg-transparent px-3 py-3 position-relative ${
                        isActive ? "is-active" : ""
                      }`}
                      style={{
                        borderBottom:
                          index < certifications.length - 1
                            ? "1px solid rgba(255, 255, 255, 0.08)"
                            : "none"
                      }}
                    >
                      <span
                        className="cert-active-bar"
                        style={{
                          background: cert.accent,
                          opacity: isActive ? 1 : 0,
                          boxShadow: isActive ? `0 0 14px ${cert.accent}` : "none"
                        }}
                      />
                      <div className="d-flex align-items-start gap-3 ps-2">
                        <span
                          className="font-monospace fw-bold mt-1 flex-shrink-0"
                          style={{
                            fontSize: "0.85rem",
                            color: isActive ? cert.accent : "#64748b"
                          }}
                        >
                          0{index + 1}
                        </span>
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
                            <span
                              className="text-uppercase fw-bold"
                              style={{
                                fontSize: "0.68rem",
                                letterSpacing: "1px",
                                color: isActive ? cert.accent : "#94a3b8"
                              }}
                            >
                              {cert.badge}
                            </span>
                            <span className="text-white-50" style={{ fontSize: "0.75rem" }}>
                              {cert.date}
                            </span>
                          </div>
                          <h4
                            className="mb-1 fw-bold"
                            style={{
                              fontSize: "1.05rem",
                              lineHeight: 1.3,
                              color: isActive ? "#ffffff" : "#cbd5e1"
                            }}
                          >
                            {cert.title}
                          </h4>
                          <span className="text-white-50 d-block" style={{ fontSize: "0.8rem" }}>
                            {cert.issuer}
                          </span>
                        </div>
                        <i
                          className={`bi bi-arrow-right mt-1 flex-shrink-0 ${
                            isActive ? "opacity-100" : "opacity-25"
                          }`}
                          style={{ color: isActive ? cert.accent : "#94a3b8" }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Live Credential Spotlight */}
            <div className="col-lg-7">
              <div
                className="h-100 d-flex flex-column justify-content-between rounded-4 p-3 p-md-4 position-relative overflow-hidden"
                style={{
                  background: "rgba(2, 6, 23, 0.55)",
                  border: `1px solid ${activeCert.accent}40`
                }}
              >
                <div
                  className="position-relative rounded-3 overflow-hidden d-flex align-items-center justify-content-center p-3 mb-4"
                  onClick={() => setLightboxCert(activeCert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxCert(activeCert);
                    }
                  }}
                  aria-label={`Inspect ${activeCert.title}`}
                  style={{
                    minHeight: "260px",
                    background: "rgba(15, 23, 42, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    cursor: "zoom-in"
                  }}
                >
                  <div
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{
                      width: "80%",
                      height: "80%",
                      background: `radial-gradient(circle, ${activeCert.accent}33 0%, transparent 70%)`,
                      filter: "blur(30px)",
                      pointerEvents: "none"
                    }}
                  />
                  <img
                    key={activeCert.id}
                    src={`${process.env.PUBLIC_URL}${activeCert.image}`}
                    alt={activeCert.alt}
                    className="img-fluid rounded-3 shadow-lg cert-spotlight-img"
                    style={{
                      maxHeight: "270px",
                      width: "auto",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 1
                    }}
                  />
                  <span
                    className="badge rounded-pill px-3 py-1 position-absolute"
                    style={{
                      bottom: "12px",
                      right: "12px",
                      zIndex: 2,
                      background: "rgba(15, 23, 42, 0.88)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      color: "#e2e8f0",
                      fontSize: "0.72rem"
                    }}
                  >
                    <i className="bi bi-arrows-fullscreen me-1"></i> Full View
                  </span>
                </div>

                <div>
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                    <h3 className="text-white fw-bold mb-0" style={{ fontSize: "1.35rem" }}>
                      {activeCert.title}
                    </h3>
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        background: `${activeCert.accent}1f`,
                        color: activeCert.accent,
                        border: `1px solid ${activeCert.accent}4d`,
                        fontSize: "0.75rem"
                      }}
                    >
                      <i className="bi bi-calendar-check me-1"></i>
                      {activeCert.date}
                    </span>
                  </div>
                  <p className="text-white-50 mb-0" style={{ lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {activeCert.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Certificate Lightbox Rendered to Root DOM via Portal */}
      {lightboxCert &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="cert-lightbox-overlay"
            onClick={() => setLightboxCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxCert.title} preview`}
          >
            <div
              className="cert-lightbox-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="cert-lightbox-header">
                <div className="d-flex flex-column pe-2" style={{ minWidth: 0 }}>
                  <h4 className="text-white fw-bold mb-1 text-truncate" style={{ fontSize: "1.2rem" }}>
                    {lightboxCert.title}
                  </h4>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span
                      className="badge px-2 py-1"
                      style={{
                        background: "rgba(56, 189, 248, 0.15)",
                        color: "#38bdf8",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        fontSize: "0.72rem"
                      }}
                    >
                      {lightboxCert.badge}
                    </span>
                    <span className="text-white-50 small">
                      {lightboxCert.issuer} • {lightboxCert.date}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="cert-lightbox-close"
                  onClick={() => setLightboxCert(null)}
                  aria-label="Close certificate preview"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="cert-lightbox-body">
                <img
                  src={`${process.env.PUBLIC_URL}${lightboxCert.image}`}
                  alt={lightboxCert.alt}
                  className="cert-lightbox-img"
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      <style>{`
        .cert-index-row {
          cursor: pointer;
          border-radius: 14px;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .cert-index-row:hover {
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .cert-index-row.is-active {
          background: rgba(59, 130, 246, 0.08) !important;
        }
        .cert-active-bar {
          position: absolute;
          left: 0;
          top: 14%;
          bottom: 14%;
          width: 3px;
          border-radius: 4px;
          transition: opacity 0.25s ease;
        }
        .cert-spotlight-img {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          animation: certFadeIn 0.35s ease-out;
        }
        .cert-spotlight-img:hover {
          transform: scale(1.03);
        }
        @keyframes certFadeIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Lightbox Portal Styles */
        .cert-lightbox-overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 120000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(2, 6, 23, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          animation: certOverlayFade 0.2s ease-out;
        }
        .cert-lightbox-dialog {
          width: 100%;
          max-width: 920px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 20px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.15);
          overflow: hidden;
          animation: certDialogZoom 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cert-lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 22px;
          background: rgba(15, 23, 42, 0.85);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }
        .cert-lightbox-close {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .cert-lightbox-close:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ef4444;
          transform: scale(1.05);
        }
        .cert-lightbox-body {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(2, 6, 23, 0.55);
          overflow: hidden;
        }
        .cert-lightbox-img {
          max-width: 100%;
          max-height: calc(88vh - 110px);
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }
        @keyframes certOverlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes certDialogZoom {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Certification;
