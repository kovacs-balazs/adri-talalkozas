"use client";

import { useEffect, useRef } from "react";

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];

    const createExplosion = (x: number, y: number) => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          alpha: 1,
        });
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, 3, 3);

        if (p.alpha <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(loop);
    };

    loop();

    // első burst
    createExplosion(canvas.width / 2, canvas.height / 2);

    const interval = setInterval(() => {
      createExplosion(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}