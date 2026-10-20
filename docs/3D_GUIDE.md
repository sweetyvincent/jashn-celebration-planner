# Jashn — 3D & Procedural Graphics Guide

## 1. Design Vision
"Cinematic Celebration": Warm glows, soft depth-of-field, glassmorphism UI panels over a living festive backdrop.

## 2. Dynamic Atmosphere by Event Type
- **Wedding**:
  - Rotating golden torus / mandap arch silhouette
  - Swirling marigold and rose petals
  - Warm saffron and rose radial aura
- **Birthday**:
  - Multi-tier celebratory cake with oscillating candle flame shader
  - Confetti ribbons and energy bursts
  - Playful marigold and indigo lighting
- **Community Mela**:
  - Terracotta diya bowl and festive flame silhouette
  - Drifting lanterns and star sparkles
  - Emerald and saffron illumination

## 3. Performance & Fallbacks
- Target: 60 FPS desktop / 30+ FPS mobile
- Uses procedural canvas math with zero heavy external GLTF model download bottlenecks
- Hardware-accelerated with instant fallback to "Lite Mode" poster when `prefers-reduced-motion` is enabled or when user toggles Lite Mode.
