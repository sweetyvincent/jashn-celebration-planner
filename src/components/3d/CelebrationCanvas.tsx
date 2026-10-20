'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EventType } from '@/types/event';

interface CelebrationCanvasProps {
  eventType?: EventType;
  interactive?: boolean;
  intensity?: 'ambient' | 'celebration' | 'hero';
  className?: string;
}

export function CelebrationCanvas({
  eventType = 'wedding',
  interactive = true,
  intensity = 'hero',
  className = ''
}: CelebrationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [liteMode, setLiteMode] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMotionReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (liteMode || motionReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      vRot: number;
      opacity: number;
      type: 'petal' | 'confetti' | 'sparkle' | 'lantern';
      pulse: number;
    }

    const particles: Particle[] = [];
    const count = intensity === 'hero' ? 65 : intensity === 'celebration' ? 100 : 35;

    const colorsByEvent: Record<EventType, string[]> = {
      wedding: ['#F4B33D', '#E85D8A', '#FF8A3D', '#FFF8EE', '#D4AF37'],
      birthday: ['#FF8A3D', '#3B2A7A', '#1F9D7A', '#F4B33D', '#E85D8A'],
      community: ['#1F9D7A', '#F4B33D', '#FF8A3D', '#FFF8EE', '#E85D8A']
    };

    const palette = colorsByEvent[eventType] || colorsByEvent.wedding;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 8 + 3,
        color: palette[Math.floor(Math.random() * palette.length)],
        vx: (Math.random() - 0.5) * 1.2,
        vy: eventType === 'birthday' ? Math.random() * 1.5 + 0.5 : -(Math.random() * 0.8 + 0.3),
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.6 + 0.25,
        type:
          eventType === 'wedding'
            ? Math.random() > 0.3 ? 'petal' : 'lantern'
            : eventType === 'birthday'
            ? 'confetti'
            : Math.random() > 0.4 ? 'lantern' : 'sparkle',
        pulse: Math.random() * Math.PI
      });
    }

    // Mouse Parallax
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw central celebratory aura based on event type
      const grad = ctx.createRadialGradient(
        width / 2 + (mouseX - width / 2) * 0.05,
        height / 2 + (mouseY - height / 2) * 0.05,
        20,
        width / 2,
        height / 2,
        width * 0.45
      );

      if (eventType === 'wedding') {
        grad.addColorStop(0, 'rgba(244, 179, 61, 0.14)');
        grad.addColorStop(0.5, 'rgba(232, 93, 138, 0.08)');
        grad.addColorStop(1, 'rgba(43, 20, 66, 0)');
      } else if (eventType === 'birthday') {
        grad.addColorStop(0, 'rgba(255, 138, 61, 0.16)');
        grad.addColorStop(0.5, 'rgba(59, 42, 122, 0.08)');
        grad.addColorStop(1, 'rgba(43, 20, 66, 0)');
      } else {
        grad.addColorStop(0, 'rgba(31, 157, 122, 0.15)');
        grad.addColorStop(0.5, 'rgba(244, 179, 61, 0.08)');
        grad.addColorStop(1, 'rgba(43, 20, 66, 0)');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render 3D geometric centerpiece
      ctx.save();
      ctx.translate(width / 2, height * 0.45);

      if (eventType === 'wedding') {
        // Rotating Golden Torus / Mandap Arch Silhouette
        ctx.rotate(time * 0.15);
        ctx.strokeStyle = 'rgba(244, 179, 61, 0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.25) {
          const r = 140 + Math.sin(a * 4 + time) * 12;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * (r * 0.45);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner glowing ring
        ctx.beginPath();
        ctx.arc(0, 0, 85, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(232, 93, 138, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (eventType === 'birthday') {
        // Multi-tier cake outline with candle flame oscillation
        ctx.strokeStyle = 'rgba(255, 138, 61, 0.35)';
        ctx.lineWidth = 2.5;

        // Base tier
        ctx.strokeRect(-90, 40, 180, 50);
        // Middle tier
        ctx.strokeRect(-65, 0, 130, 40);
        // Top tier
        ctx.strokeRect(-40, -30, 80, 30);

        // Candle & Flame
        ctx.fillStyle = 'rgba(255, 248, 238, 0.8)';
        ctx.fillRect(-4, -50, 8, 20);

        // Animated Flame
        const flameOffset = Math.sin(time * 6) * 3;
        ctx.beginPath();
        ctx.ellipse(0 + flameOffset, -62, 7, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 179, 61, 0.85)';
        ctx.fill();
      } else {
        // Community Festive Diya / Pavilion Motif
        ctx.strokeStyle = 'rgba(31, 157, 122, 0.35)';
        ctx.lineWidth = 2;

        ctx.beginPath();
        // Diya bowl shape
        ctx.arc(0, 20, 80, 0.15 * Math.PI, 0.85 * Math.PI, false);
        ctx.stroke();

        // Diya Flame
        ctx.beginPath();
        ctx.ellipse(0, -10 + Math.sin(time * 5) * 4, 14, 26, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 179, 61, 0.75)';
        ctx.fill();
      }

      ctx.restore();

      // Render floating particles
      for (const p of particles) {
        p.x += p.vx + Math.sin(time + p.pulse) * 0.4;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around boundaries
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'petal') {
          // Curving rose/marigold petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 1.8, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'confetti') {
          // Festive rectangular confetti ribbon
          ctx.fillRect(-p.radius, -p.radius * 0.5, p.radius * 2, p.radius);
        } else if (p.type === 'lantern') {
          // Floating paper lantern / diya glow
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 1.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255, 248, 238, 0.8)';
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sparkle star
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [eventType, intensity, interactive, liteMode, motionReduced]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 3D Canvas */}
      {!liteMode && !motionReduced ? (
        <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
      ) : (
        // Reduced motion / Lite mode poster fallback
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B1442]/5 via-amber-500/5 to-rose-500/5">
          <div className="text-center p-6 glass-panel rounded-2xl max-w-sm">
            <span className="text-4xl">
              {eventType === 'wedding' ? '💍' : eventType === 'birthday' ? '🎂' : '🎪'}
            </span>
            <div className="font-semibold text-sm mt-2 text-[var(--text-primary)]">
              {eventType === 'wedding'
                ? 'Royal Celebration Atmosphere'
                : eventType === 'birthday'
                ? 'Jungle Quest Atmosphere'
                : 'Diwali Harmony Atmosphere'}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              Lite visual mode active (Zero GPU load)
            </div>
          </div>
        </div>
      )}

      {/* Lite Mode Toggle in corner */}
      <button
        onClick={() => setLiteMode(!liteMode)}
        title="Toggle Lite 3D / Low Power Mode"
        className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-md text-[10px] font-medium bg-black/20 dark:bg-white/10 hover:bg-black/40 text-[var(--text-primary)] backdrop-blur-md transition-all border border-white/10"
      >
        {liteMode ? '✨ Enable 3D Effects' : '🍃 Lite Mode'}
      </button>
    </div>
  );
}
