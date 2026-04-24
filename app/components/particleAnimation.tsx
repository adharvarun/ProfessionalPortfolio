"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
};

export default function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  const GRID_SPACING = 12;
  const RADIUS = 80;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = 300);

    particles.current = [];
    for (let y = 0; y < height; y += GRID_SPACING) {
      for (let x = 0; x < width; x += GRID_SPACING) {
        particles.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (RADIUS - dist) / RADIUS;

          const targetX = p.baseX - Math.cos(angle) * force * 40;
          const targetY = p.baseY - Math.sin(angle) * force * 40;

          gsap.to(p, {
            x: targetX,
            y: targetY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(p, {
            x: p.baseX,
            y: p.baseY,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = 300;

      particles.current = [];
      for (let y = 0; y < height; y += GRID_SPACING) {
        for (let x = 0; x < width; x += GRID_SPACING) {
          particles.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-75"
    />
  );
}