import React, { useEffect, useRef, useState } from 'react';

interface ParticleSwarmCanvasProps {
  particleCount?: number;
  interactive?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  alpha: number;
  seed: number;
}

export const ParticleSwarmCanvas: React.FC<ParticleSwarmCanvasProps> = ({
  particleCount = 2200,
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCount] = useState<number>(particleCount);
  const mousePos = useRef<{ x: number; y: number; active: boolean; prevX: number; prevY: number }>({
    x: -9999,
    y: -9999,
    active: false,
    prevX: 0,
    prevY: 0
  });

  // Track scroll velocity for kinetic scroll reaction
  const scrollTracker = useRef<{ lastY: number; velocity: number }>({
    lastY: 0,
    velocity: 0
  });

  useEffect(() => {
    let lastTime = performance.now();
    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const deltaY = currentY - scrollTracker.current.lastY;
      const deltaT = Math.max(1, now - lastTime);

      // Dampened velocity
      scrollTracker.current.velocity = (deltaY / deltaT) * 16;
      scrollTracker.current.lastY = currentY;
      lastTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const centerX = width * 0.78;
    const centerY = height * 0.45;
    const particles: Particle[] = [];

    for (let i = 0; i < activeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 1.8) * Math.min(width, height) * 0.42;
      const x = centerX + Math.cos(theta) * dist;
      const y = centerY + Math.sin(theta) * dist * 0.65;

      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseRadius: Math.random() < 0.88 ? (Math.random() * 1.1 + 0.5) : (Math.random() * 1.6 + 1.2),
        alpha: Math.random() * 0.75 + 0.25,
        seed: Math.random() * 1000
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Gradually decay scroll velocity
      const scrollV = scrollTracker.current.velocity;
      scrollTracker.current.velocity *= 0.92;

      const targetX = mousePos.current.active ? mousePos.current.x : centerX + Math.sin(time * 0.5) * 120;
      const targetY = mousePos.current.active ? mousePos.current.y : centerY + Math.cos(time * 0.7) * 80;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gravitational pull toward current focal target
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq) + 0.1;

        const pullForce = Math.min(0.00045, 0.45 / (distSq + 2000));
        const tangentForce = 0.00028;

        const tx = -dy / dist;
        const ty = dx / dist;

        if (dist > 35) {
          p.vx += (dx * pullForce) + (tx * tangentForce * 20);
          p.vy += (dy * pullForce) + (ty * tangentForce * 20);
        } else {
          p.vx -= (dx / dist) * 0.08;
          p.vy -= (dy / dist) * 0.08;
        }

        // Ambient quantum curl drift
        const curl = Math.sin(time + p.seed) * 0.04;
        p.vx += Math.cos(p.seed) * 0.02 + curl;
        p.vy += Math.sin(p.seed) * 0.02 - curl * 0.5;

        // Kinetic response to scrolling!
        if (Math.abs(scrollV) > 0.01) {
          p.vy -= scrollV * 0.04;
          // Organic vortex dispersion on scroll
          p.vx += Math.sin(p.seed * 2) * scrollV * 0.015;
        }

        // Fluid friction damping
        p.vx *= 0.945;
        p.vy *= 0.945;

        p.x += p.vx;
        p.y += p.vy;

        // Soft screen boundary wrap
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const proximityRatio = Math.max(0, 1 - dist / 500);
        const dynamicAlpha = Math.min(1, p.alpha * (0.6 + proximityRatio * 0.7));

        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current.x = e.clientX - rect.left;
    mousePos.current.y = e.clientY - rect.top;
    mousePos.current.active = true;
  };

  const handleMouseEnter = () => {
    mousePos.current.active = true;
  };

  const handleMouseLeave = () => {
    mousePos.current.active = false;
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};
