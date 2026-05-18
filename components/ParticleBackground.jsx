"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground({
  color = "79, 195, 247",
  count = 45,
  maxDist = 130,
  speed = 0.35,
  fps = 30,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) return undefined;

    let animationFrame = 0;
    let lastFrameTime = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    const frameInterval = 1000 / Math.max(1, fps);
    const parent = canvas.parentElement;

    const resizeCanvas = () => {
      width = Math.max(1, Math.round(window.innerWidth));
      height = Math.max(1, Math.round(window.innerHeight));
      canvas.width = width;
      canvas.height = height;
      particles = createParticles(count, width, height, speed);
    };

    const draw = (timestamp) => {
      animationFrame = window.requestAnimationFrame(draw);

      if (timestamp - lastFrameTime < frameInterval) {
        return;
      }

      lastFrameTime = timestamp;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x += width;
        if (particle.x > width) particle.x -= width;
        if (particle.y < 0) particle.y += height;
        if (particle.y > height) particle.y -= height;
      }

      for (let i = 0; i < particles.length; i += 1) {
        const first = particles[i];

        for (let j = i + 1; j < particles.length; j += 1) {
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDist) {
            const alpha = (1 - distance / maxDist) * 0.18;
            context.strokeStyle = `rgba(${color}, ${alpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }

        context.fillStyle = `rgba(${color}, 0.38)`;
        context.beginPath();
        context.arc(first.x, first.y, first.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const start = () => {
      if (animationFrame || document.hidden || reduceMotionQuery.matches) return;
      lastFrameTime = 0;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    const handleMotionPreferenceChange = () => {
      if (reduceMotionQuery.matches) {
        stop();
        context.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (parent) resizeObserver.observe(parent);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionPreferenceChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [color, count, maxDist, speed, fps]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

function createParticles(count, width, height, speed) {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = speed * (0.55 + Math.random() * 0.9);

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      radius: 1 + Math.random() * 1.6,
    };
  });
}
