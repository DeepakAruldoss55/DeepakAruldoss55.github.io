import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      id="blog-page"
      className="section d-flex align-items-center justify-content-center"
      style={{
        paddingTop: "140px",
        paddingBottom: "80px",
        minHeight: "85vh"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7 text-center" data-aos="fade-up">
            <div
              className="glass-v2 p-4 p-md-5 rounded-5 position-relative overflow-hidden"
              style={{
                border: "1px solid rgba(56, 189, 248, 0.28)",
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(2, 6, 23, 0.95) 100%)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 45px rgba(56, 189, 248, 0.12)"
              }}
            >
              {/* Radial Glowing Backdrop Aura */}
              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                  width: "360px",
                  height: "360px",
                  background: "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(168, 85, 247, 0.12) 40%, transparent 70%)",
                  filter: "blur(50px)",
                  pointerEvents: "none"
                }}
              />

              <div className="position-relative" style={{ zIndex: 1 }}>
                {/* Floating Animated Icon */}
                <div className="d-inline-flex align-items-center justify-content-center mb-4 blog-coming-soon-icon">
                  <i className="bi bi-rocket-takeoff text-gradient" style={{ fontSize: "3.2rem" }}></i>
                </div>

                {/* Status Pill */}
                <div className="mb-3">
                  <span
                    className="badge rounded-pill px-3 py-2 text-uppercase fw-bold"
                    style={{
                      background: "rgba(56, 189, 248, 0.12)",
                      color: "#38bdf8",
                      border: "1px solid rgba(56, 189, 248, 0.35)",
                      fontSize: "0.78rem",
                      letterSpacing: "1.5px"
                    }}
                  >
                    <i className="bi bi-hourglass-split me-1 text-warning"></i> Under Construction
                  </span>
                </div>

                {/* Main Heading */}
                <h1
                  className="text-white fw-900 mb-3"
                  style={{
                    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em"
                  }}
                >
                  Blog <span className="text-gradient">Coming Soon</span>
                </h1>

                {/* Subtitle / Message */}
                <p
                  className="text-white-50 mx-auto mb-4"
                  style={{
                    maxWidth: "520px",
                    fontSize: "1.1rem",
                    lineHeight: 1.8
                  }}
                >
                  I'm currently crafting technical deep dives, architectural breakdowns, and engineering insights. The blog will be launching here soon!
                </p>

                {/* Quick Navigation Buttons */}
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 pt-2">
                  <Link to="/" className="btn btn-premium px-4 py-3 fw-bold">
                    <i className="bi bi-arrow-left me-2"></i>Back to Home
                  </Link>
                  <Link
                    to="/projects"
                    className="btn glass-v2 text-white px-4 py-3 fw-bold"
                    style={{ border: "1px solid rgba(255, 255, 255, 0.18)" }}
                  >
                    Explore Projects <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .blog-coming-soon-icon {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 35px rgba(56, 189, 248, 0.25);
          animation: floatIcon 3.5s ease-in-out infinite;
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Blog;
