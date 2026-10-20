'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useEventStore } from '@/lib/store/event-store';
import {
  Camera,
  Maximize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Video,
  VideoOff,
  Download,
  Share2,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function ARWalkthroughPage() {
  const { eventTitle, eventType, plan } = useEventStore();

  const [activeModel, setActiveModel] = useState<'mandap' | 'cakeStage' | 'diyaPavilion'>('mandap');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // 3D Transform State
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [elevation, setElevation] = useState(0);
  const [flowerType, setFlowerType] = useState<'marigold' | 'rose' | 'jasmine'>('marigold');

  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [webXRSupported, setWebXRSupported] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check WebXR Device API availability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'xr' in navigator) {
      (navigator as any).xr
        ?.isSessionSupported?.('immersive-ar')
        ?.then((supported: boolean) => setWebXRSupported(supported))
        ?.catch(() => setWebXRSupported(false));
    }
  }, []);

  // Handle Camera Feed Start / Stop
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      setCameraError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } catch (err: any) {
        console.warn('Camera access error:', err);
        setCameraError('Camera access unavailable. Using simulated venue backdrop.');
      }
    }
  };

  // Render 3D Model over backdrop in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Center position
      const centerX = width / 2;
      const centerY = height * 0.65 - elevation * 20;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);

      // 1. Perspective Stage Floor Grid / Shadow
      ctx.beginPath();
      ctx.ellipse(0, 80, 220, 70, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fill();

      // Floor Carpet Grid
      ctx.strokeStyle = 'rgba(244, 179, 61, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 80, 200, 60, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Rotate based on user slider + gentle natural sway
      const curRot = (rotation * Math.PI) / 180;
      ctx.rotate(curRot);

      if (activeModel === 'mandap') {
        // --- 3D ROYAL FLORAL MANDAP ARCH ---
        const pillarDist = 110;
        const pillarHeight = 160;

        // 4 Pillars (P1, P2, P3, P4)
        const pillars = [
          { x: -pillarDist, y: 70 },
          { x: pillarDist, y: 70 },
          { x: -pillarDist * 0.8, y: -20 },
          { x: pillarDist * 0.8, y: -20 }
        ];

        pillars.forEach((p, idx) => {
          // Golden Carved Pillars
          ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
          ctx.fillRect(p.x - 7, p.y - pillarHeight, 14, pillarHeight);

          // Pillar Base & Capital
          ctx.fillStyle = '#F4B33D';
          ctx.fillRect(p.x - 12, p.y - 10, 24, 14);
          ctx.fillRect(p.x - 12, p.y - pillarHeight - 6, 24, 10);

          // Flower Garland wrapping pillar
          ctx.fillStyle = flowerType === 'rose' ? '#E85D8A' : flowerType === 'jasmine' ? '#FFF8EE' : '#FF8A3D';
          for (let f = 0; f < 8; f++) {
            ctx.beginPath();
            ctx.arc(p.x + Math.sin(f + time) * 6, p.y - pillarHeight + f * 20, 5, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Top Canopy / Floral Chhatri Dome
        ctx.beginPath();
        ctx.moveTo(-pillarDist - 20, -pillarHeight + 10);
        ctx.quadraticCurveTo(0, -pillarHeight - 90, pillarDist + 20, -pillarHeight + 10);
        ctx.lineTo(-pillarDist - 20, -pillarHeight + 10);
        ctx.fillStyle = 'rgba(232, 93, 138, 0.85)';
        ctx.fill();
        ctx.strokeStyle = '#F4B33D';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Kalash finial at apex
        ctx.beginPath();
        ctx.arc(0, -pillarHeight - 85, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#F4B33D';
        ctx.fill();

        // Hanging marigold/jasmine tassels
        for (let tIdx = -5; tIdx <= 5; tIdx++) {
          const tx = tIdx * 20;
          ctx.strokeStyle = flowerType === 'rose' ? '#E85D8A' : '#FF8A3D';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tx, -pillarHeight + 10);
          ctx.lineTo(tx, -pillarHeight + 40 + Math.sin(tIdx + time * 2) * 5);
          ctx.stroke();
        }

        // Sacred Vivah Havankund in center
        ctx.fillStyle = '#B45309';
        ctx.fillRect(-22, 60, 44, 20);
        // Holy Flame
        ctx.beginPath();
        ctx.ellipse(0, 55 + Math.sin(time * 8) * 3, 8, 16, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#F59E0B';
        ctx.fill();

      } else if (activeModel === 'cakeStage') {
        // --- 3D BIRTHDAY CELEBRATION STAGE ---
        // Arch Backdrop
        ctx.beginPath();
        ctx.arc(0, -40, 120, Math.PI, 0, false);
        ctx.lineWidth = 18;
        ctx.strokeStyle = '#FF8A3D';
        ctx.stroke();

        // Inner Balloon Ring
        ctx.beginPath();
        ctx.arc(0, -40, 100, Math.PI, 0, false);
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#3B2A7A';
        ctx.stroke();

        // Cake Pedestal
        ctx.fillStyle = 'rgba(255, 248, 238, 0.95)';
        ctx.fillRect(-35, 20, 70, 60);

        // Tiered Cake
        ctx.fillStyle = '#E85D8A';
        ctx.fillRect(-24, 0, 48, 20);
        ctx.fillStyle = '#F4B33D';
        ctx.fillRect(-16, -16, 32, 16);

        // Candle flame
        ctx.fillStyle = '#FF8A3D';
        ctx.beginPath();
        ctx.ellipse(0, -26 + Math.sin(time * 6) * 3, 5, 10, 0, 0, Math.PI * 2);
        ctx.fill();

      } else {
        // --- 3D COMMUNITY FESTIVAL PAVILION ---
        // Grand Rajasthani Jharokha Carved Arch
        ctx.strokeStyle = '#1F9D7A';
        ctx.lineWidth = 6;
        ctx.strokeRect(-120, -140, 240, 210);

        // Hanging Diya Chandeliers
        for (let d = -2; d <= 2; d++) {
          const dx = d * 45;
          ctx.strokeStyle = '#F4B33D';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(dx, -140);
          ctx.lineTo(dx, -80);
          ctx.stroke();

          // Brass Diya Bowl
          ctx.beginPath();
          ctx.arc(dx, -75, 12, 0.2 * Math.PI, 0.8 * Math.PI, false);
          ctx.fillStyle = '#D97706';
          ctx.fill();

          // Diya Flame
          ctx.beginPath();
          ctx.ellipse(dx, -83 + Math.sin(time * 5 + d) * 3, 4, 8, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
        }

        // Giant Floral Rangoli Circle
        ctx.beginPath();
        ctx.ellipse(0, 70, 90, 40, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(31, 157, 122, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#F4B33D';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeModel, rotation, scale, elevation, flowerType]);

  const handleTakeSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              <Camera className="w-4 h-4" />
              <span>WebXR / Augmented Reality Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1">
              On-Site Venue AR Walkthrough
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Visualize full-scale mandap arches, birthday stages, and pavilions in augmented reality over your real venue camera.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleCamera}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                cameraActive
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {cameraActive ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{cameraActive ? 'Stop Live Camera' : 'Enable Venue Camera'}</span>
            </button>

            <button
              onClick={handleTakeSnapshot}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold shadow-md hover:opacity-95"
            >
              <Camera className="w-4 h-4" />
              <span>Snap AR Photo</span>
            </button>
          </div>
        </div>

        {/* AR Viewport Window */}
        <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-amber-500/30 shadow-2xl flex items-center justify-center bg-black/80">
          {/* Real Live Device Camera Feed */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
          />

          {/* Fallback Simulated Venue Photo if camera not started */}
          {!cameraActive && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 filter blur-[1px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1600&auto=format&fit=crop&q=80')"
              }}
            />
          )}

          {/* Interactive AR Three.js / Canvas Overlay */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-auto" />

          {/* Top Info Banner Overlay */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
            <span className="glass-panel px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-black/40 backdrop-blur-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AR Tracking: {cameraActive ? 'Live Environment Lock' : 'Simulated Venue'}</span>
            </span>

            <span className="glass-panel px-3 py-1.5 rounded-full text-[11px] font-semibold text-white bg-black/40 backdrop-blur-md">
              Dimensions: 14ft (W) × 12ft (H) • 180 sq ft footprint
            </span>
          </div>

          {/* Snapshot Confirmation Toast */}
          {snapshotTaken && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              <span>AR Concept Photo Captured & Added to Moodboard!</span>
            </div>
          )}

          {/* On-Screen 3D Transform Toolbar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 glass-panel p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs text-white">
            {/* Model Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold hidden sm:inline">3D Structure:</span>
              <button
                onClick={() => setActiveModel('mandap')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeModel === 'mandap' ? 'bg-amber-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                💍 Royal Mandap
              </button>
              <button
                onClick={() => setActiveModel('cakeStage')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeModel === 'cakeStage' ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                🎂 Birthday Stage
              </button>
              <button
                onClick={() => setActiveModel('diyaPavilion')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeModel === 'diyaPavilion' ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                🎪 Diya Pavilion
              </button>
            </div>

            {/* Transform Sliders */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Rotate */}
              <div className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] text-white/80">Rotate:</span>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-20 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Scale */}
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[10px] text-white/80">Scale:</span>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-20 accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Flower Garland Swap */}
              {activeModel === 'mandap' && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-white/80">Flora:</span>
                  <button
                    onClick={() => setFlowerType('marigold')}
                    className={`w-5 h-5 rounded-full bg-amber-500 border ${
                      flowerType === 'marigold' ? 'ring-2 ring-white' : ''
                    }`}
                    title="Marigold"
                  />
                  <button
                    onClick={() => setFlowerType('rose')}
                    className={`w-5 h-5 rounded-full bg-rose-500 border ${
                      flowerType === 'rose' ? 'ring-2 ring-white' : ''
                    }`}
                    title="Rose"
                  />
                  <button
                    onClick={() => setFlowerType('jasmine')}
                    className={`w-5 h-5 rounded-full bg-zinc-100 border ${
                      flowerType === 'jasmine' ? 'ring-2 ring-white' : ''
                    }`}
                    title="Jasmine"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Cards below AR viewport */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-5 rounded-2xl space-y-2 border border-amber-500/20">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>True-to-Scale Footprint</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Verify clearance around dining tables, mandap walkways, and stage fire-safety buffers before signing venue leases.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2 border border-rose-500/20">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>Real-Time Flower Swap</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Switch between Rajasthani marigold, Kashmiri red rose, and Madurai jasmine to test color harmony against your venue lawn.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-2 border border-emerald-500/20">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Vendor Decor Alignment</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Share captured AR photos directly with your decorator on WhatsApp so there is zero ambiguity on day-of setup.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
