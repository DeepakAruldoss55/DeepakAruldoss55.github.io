import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Route-aware interactive canvas background with mobile GPU/CPU optimization:
 * - "/"         : Rotating Hexagonal Prism Constellation with Magnetic Cursor Laser Tethers
 * - "/projects" : Architectural PCB Circuit-Trace Network with Stepped 90°/45° Cursor Locks
 * - "/deep-shop": Handled by DeepShop.jsx's dedicated AI Synaptic Neural Mesh
 */
const InteractiveBackground = () => {
  const { pathname } = useLocation();
  const canvasRef = useRef(null);

  const isDeepShop = pathname === "/deep-shop" || pathname === "/deepshop";

  useEffect(() => {
    if (isDeepShop) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile =
      width < 768 ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches);

    // Pause heavy canvas drawing while actively scrolling on mobile
    let isScrolling = false;
    let scrollTimeout = null;

    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 140);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile =
        width < 768 ||
        (typeof window.matchMedia === "function" &&
          window.matchMedia("(pointer: coarse)").matches);
    };

    const mouse = {
      x: -9999,
      y: -9999,
      smoothX: -9999,
      smoothY: -9999,
      active: false
    };

    const ripples = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) {
        mouse.smoothX = e.clientX;
        mouse.smoothY = e.clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        if (!mouse.active) {
          mouse.smoothX = mouse.x;
          mouse.smoothY = mouse.y;
          mouse.active = true;
        }
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleClick = (e) => {
      if (ripples.length < 3) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 6,
          maxRadius: isMobile ? 110 : 190,
          alpha: 0.65
        });
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    const mode = pathname === "/projects" ? "projects-circuit" : "home-constellation";

    // Helper: draw regular polygon (hexagon / diamond)
    const drawPolygon = (cx, cy, radius, sides, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * Math.PI * 2) / sides;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    // Helper: draw architectural stepped circuit trace between two points
    const drawCircuitTrace = (x1, y1, x2, y2, strokeColor, jointColor, pulseT) => {
      const midX = x1 + (x2 - x1) * 0.55;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(midX, y1);
      ctx.lineTo(midX, y2);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.1;
      ctx.stroke();

      if (!isMobile) {
        ctx.beginPath();
        ctx.arc(midX, y1, 2, 0, Math.PI * 2);
        ctx.arc(midX, y2, 2, 0, Math.PI * 2);
        ctx.fillStyle = jointColor;
        ctx.fill();
      }

      if (pulseT !== null) {
        let px = x1;
        let py = y1;
        if (pulseT < 0.4) {
          const t = pulseT / 0.4;
          px = x1 + (midX - x1) * t;
          py = y1;
        } else if (pulseT < 0.7) {
          const t = (pulseT - 0.4) / 0.3;
          px = midX;
          py = y1 + (y2 - y1) * t;
        } else {
          const t = (pulseT - 0.7) / 0.3;
          px = midX + (x2 - midX) * t;
          py = y2;
        }
        ctx.fillStyle = "#34d399";
        ctx.fillRect(px - 2.2, py - 2.2, 4.4, 4.4);
      }
    };

    // Significantly fewer nodes on mobile so O(N^2) loop is ~25x lighter
    const nodeCount = isMobile
      ? 11
      : Math.min(42, Math.max(24, Math.floor(width / 38)));

    const homePalette = ["#8b5cf6", "#6366f1", "#3b82f6", "#f59e0b", "#ec4899"];
    const projectsPalette = ["#10b981", "#06b6d4", "#3b82f6", "#34d399"];

    const nodes = Array.from({ length: nodeCount }, (_, idx) => {
      const palette = mode === "projects-circuit" ? projectsPalette : homePalette;
      const speedScale = isMobile ? 0.35 : 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale,
        size: mode === "projects-circuit" ? 3.4 + (idx % 3) : 3.2 + (idx % 3) * 1.2,
        sides: idx % 2 === 0 ? 6 : 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: palette[idx % palette.length],
        phase: Math.random() * Math.PI * 2
      };
    });

    let tick = 0;
    let lastFrameTime = 0;

    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);

      if (document.hidden || isScrolling) return;

      // Throttle frame rate on mobile to ~26 FPS to save battery & GPU
      const minFrameGap = isMobile ? 38 : 16;
      if (timestamp - lastFrameTime < minFrameGap) return;
      lastFrameTime = timestamp;

      tick += isMobile ? 0.035 : 0.022;
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        mouse.smoothX += (mouse.x - mouse.smoothX) * 0.2;
        mouse.smoothY += (mouse.y - mouse.smoothY) * 0.2;
      }

      // Draw click ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4.2;
        rip.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle =
          mode === "projects-circuit"
            ? `rgba(16, 185, 129, ${rip.alpha})`
            : `rgba(139, 92, 246, ${rip.alpha})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        if (rip.radius >= rip.maxRadius || rip.alpha < 0.02) {
          ripples.splice(r, 1);
        }
      }

      const maxLinkDist = isMobile ? 115 : 150;
      const maxLinkDistSq = maxLinkDist * maxLinkDist;
      const maxCursorDist = isMobile ? 160 : 230;
      const maxCursorDistSq = maxCursorDist * maxCursorDist;

      if (mode === "home-constellation") {
        // ====================================================================
        // MODE 1 ("/"): HEXAGONAL PRISM CONSTELLATION & MAGNETIC CURSOR TETHERS
        // ====================================================================
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          n.rotation += n.rotSpeed;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Inter-node constellation links (using squared distance first to avoid Math.sqrt)
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxLinkDistSq) {
              const alpha = (1 - distSq / maxLinkDistSq) * 0.18;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }

          // Magnetic cursor connection
          if (mouse.active) {
            const mdx = mouse.smoothX - n.x;
            const mdy = mouse.smoothY - n.y;
            const mDistSq = mdx * mdx + mdy * mdy;

            if (mDistSq < maxCursorDistSq) {
              const mDist = Math.sqrt(mDistSq);
              if (mDist > 45) {
                n.x += (mdx / mDist) * 0.2;
                n.y += (mdy / mDist) * 0.2;
              }

              const alpha = (1 - mDist / maxCursorDist) * 0.65;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouse.smoothX, mouse.smoothY);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 1.25;
              ctx.stroke();

              // Animated spark sliding from node toward cursor
              const sparkT = (tick * 0.9 + (i % 5) * 0.2) % 1;
              const sx = n.x + mdx * sparkT;
              const sy = n.y + mdy * sparkT;
              ctx.beginPath();
              ctx.arc(sx, sy, 2, 0, Math.PI * 2);
              ctx.fillStyle = "#f59e0b";
              ctx.fill();
            }
          }

          // Draw rotating hexagon/diamond prism node
          if (!isMobile) {
            const glowScale = 1 + 0.22 * Math.sin(tick * 2 + n.phase);
            drawPolygon(n.x, n.y, n.size * 2 * glowScale, n.sides, n.rotation);
            ctx.strokeStyle = "rgba(139, 92, 246, 0.22)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          drawPolygon(n.x, n.y, n.size, n.sides, n.rotation);
          ctx.fillStyle = n.color;
          ctx.fill();
        }

        // Draw magnetic orbital reticle at cursor
        if (mouse.active && !isMobile) {
          ctx.save();
          ctx.translate(mouse.smoothX, mouse.smoothY);
          ctx.rotate(tick * 0.8);
          drawPolygon(0, 0, 16, 6, 0);
          ctx.strokeStyle = "rgba(168, 85, 247, 0.55)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.rotate(-tick * 1.6);
          drawPolygon(0, 0, 8, 4, 0);
          ctx.strokeStyle = "rgba(245, 158, 11, 0.7)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }
      } else {
        // ====================================================================
        // MODE 2 ("/projects"): ARCHITECTURAL PCB CIRCUIT TRACE NETWORK
        // ====================================================================
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          // Stepped PCB circuit traces between nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const m = nodes[j];
            const dx = n.x - m.x;
            const dy = n.y - m.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < maxLinkDistSq) {
              const alpha = (1 - distSq / maxLinkDistSq) * 0.16;
              drawCircuitTrace(
                n.x,
                n.y,
                m.x,
                m.y,
                `rgba(16, 185, 129, ${alpha})`,
                `rgba(6, 182, 212, ${alpha * 1.4})`,
                null
              );
            }
          }

          // Stepped circuit lock to mouse cursor
          if (mouse.active) {
            const mdx = mouse.smoothX - n.x;
            const mdy = mouse.smoothY - n.y;
            const mDistSq = mdx * mdx + mdy * mdy;
            if (mDistSq < maxCursorDistSq) {
              const alpha = (1 - mDistSq / maxCursorDistSq) * 0.58;
              const pulseT = (tick * 0.75 + i * 0.15) % 1;
              drawCircuitTrace(
                n.x,
                n.y,
                mouse.smoothX,
                mouse.smoothY,
                `rgba(6, 182, 212, ${alpha})`,
                `rgba(16, 185, 129, ${alpha * 1.3})`,
                pulseT
              );
            }
          }

          // Draw hollow architectural microchip square + center dot
          const s = n.size;
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(n.x - s, n.y - s, s * 2, s * 2);

          ctx.fillStyle = "#fff";
          ctx.fillRect(n.x - 1.2, n.y - 1.2, 2.4, 2.4);
        }

        // Draw architectural crosshair HUD around mouse pointer on desktop
        if (mouse.active && !isMobile) {
          const cx = mouse.smoothX;
          const cy = mouse.smoothY;
          const r = 14;
          ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
          ctx.lineWidth = 1.4;

          ctx.beginPath();
          ctx.moveTo(cx - r, cy - r + 5);
          ctx.lineTo(cx - r, cy - r);
          ctx.lineTo(cx - r + 5, cy - r);

          ctx.moveTo(cx + r - 5, cy - r);
          ctx.lineTo(cx + r, cy - r);
          ctx.lineTo(cx + r, cy - r + 5);

          ctx.moveTo(cx - r, cy + r - 5);
          ctx.lineTo(cx - r, cy + r);
          ctx.lineTo(cx - r + 5, cy + r);

          ctx.moveTo(cx + r - 5, cy + r);
          ctx.lineTo(cx + r, cy + r);
          ctx.lineTo(cx + r, cy + r - 5);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#06b6d4";
          ctx.fill();
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("click", handleClick);
    };
  }, [pathname, isDeepShop]);

  if (isDeepShop) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
};

export default InteractiveBackground;
