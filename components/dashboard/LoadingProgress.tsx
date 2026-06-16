'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingProgressProps {
  engines: string[];
  isReady: boolean;
  onRevealComplete: () => void;
}

const STATUS_MESSAGES = [
  'Preparing Analysis',
  'Discovering Website Structure',
  'Scanning Search Results',
  'Checking AI Visibility',
  'Building Citation Network',
  'Mapping Competitors',
  'Generating Report',
  'Report Ready'
];

const STRAND_COLORS = [
  'rgba(16, 185, 129, ',  // emerald green
  'rgba(6, 182, 212, ',   // electric cyan
  'rgba(245, 158, 11, ',  // molten amber
  'rgba(139, 92, 246, ',  // violet plasma
  'rgba(234, 179, 8, ',   // gold
  'rgba(6, 182, 212, '    // electric cyan
];

export default function LoadingProgress({ engines, isReady, onRevealComplete }: LoadingProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statusIdx, setStatusIdx] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  // Status message rotation
  useEffect(() => {
    // Increment through status indicators
    const timer = setInterval(() => {
      setStatusIdx(prev => {
        // If report is not ready, don't show the last status ("Report Ready")
        if (isReady) {
          if (prev < STATUS_MESSAGES.length - 1) return prev + 1;
          return prev;
        } else {
          if (prev < STATUS_MESSAGES.length - 2) return prev + 1;
          return prev;
        }
      });
    }, 2500);

    const elapsedTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(elapsedTimer);
    };
  }, [isReady]);

  // When report is ready, skip to "Report Ready" status and trigger zoomout after delay
  useEffect(() => {
    if (isReady) {
      setStatusIdx(STATUS_MESSAGES.length - 1); // "Report Ready"
      
      const delay = setTimeout(() => {
        setIsZooming(true);
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [isReady]);

  // Trigger reveal callback once zoom out completes
  useEffect(() => {
    if (isZooming) {
      const callbackTimer = setTimeout(() => {
        onRevealComplete();
      }, 1200); // match duration of zoom scale animation
      return () => clearTimeout(callbackTimer);
    }
  }, [isZooming, onRevealComplete]);

  // Temporal Loom Canvas animation loop (full viewport)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const pulses = [
      { progress: 0, speed: 0.007, colorIdx: 0, delay: 0 },
      { progress: 0, speed: 0.008, colorIdx: 1, delay: 30 },
      { progress: 0, speed: 0.006, colorIdx: 2, delay: 60 },
      { progress: 0, speed: 0.007, colorIdx: 3, delay: 15 },
      { progress: 0, speed: 0.009, colorIdx: 4, delay: 45 },
      { progress: 0, speed: 0.006, colorIdx: 5, delay: 75 }
    ];

    const nodePulses: Array<{ radius: number; opacity: number; colorIdx: number }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.02;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerY = height / 2;
      const centerX = width / 2;
      const helixRadius = Math.min(height * 0.16, 80);

      ctx.fillStyle = '#05070A';
      ctx.fillRect(0, 0, width, height);

      // Synthesis center node background atmosphere
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      grad.addColorStop(0, 'rgba(79, 140, 255, 0.12)');
      grad.addColorStop(1, 'rgba(5, 7, 10, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.fill();

      // Render radial waves from synthesis node
      for (let i = nodePulses.length - 1; i >= 0; i--) {
        const p = nodePulses[i];
        p.radius += 2.0;
        p.opacity -= 0.015;

        if (p.opacity <= 0) {
          nodePulses.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = STRAND_COLORS[p.colorIdx] + `${p.opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, p.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw 6 strands spanning from left/right edges to the center node
      const segmentsCount = 120;
      const strandsCount = 6;

      for (let s = 0; s < strandsCount; s++) {
        const isLeft = s < 3;
        const strandIdx = s % 3;
        
        // Start Y positions spread widely along the screen borders
        const startY = centerY + (strandIdx - 1) * (height * 0.28);
        
        const pulse = pulses[s];
        if (pulse.delay > 0) {
          pulse.delay--;
        } else {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1.0) {
            pulse.progress = 0;
            pulse.colorIdx = Math.floor(Math.random() * STRAND_COLORS.length);
            pulse.delay = Math.floor(Math.random() * 60);
            
            nodePulses.push({
              radius: 6,
              opacity: 0.9,
              colorIdx: pulse.colorIdx
            });
          }
        }

        ctx.lineCap = 'round';

        // Render sections segment by segment
        for (let i = 0; i < segmentsCount; i++) {
          const t1 = i / segmentsCount;
          const t2 = (i + 1) / segmentsCount;

          // Compute horizontal paths (stretching from edges to center)
          const x1 = isLeft ? t1 * centerX : width - t1 * centerX;
          const x2 = isLeft ? t2 * centerX : width - t2 * centerX;

          // Double helix twisting formulas
          const amp1 = helixRadius * (1 - t1);
          const amp2 = helixRadius * (1 - t2);

          const phaseOffset = (strandIdx * Math.PI * 2) / 3;
          const rotationDirection = isLeft ? 1 : -1;
          const freqMultiplier = 4.0 + t1 * 2.0;

          const angle1 = t1 * freqMultiplier * Math.PI * 2 * rotationDirection + time * 1.4 + phaseOffset;
          const angle2 = t2 * freqMultiplier * Math.PI * 2 * rotationDirection + time * 1.4 + phaseOffset;

          const yBase1 = startY + (centerY - startY) * Math.pow(t1, 1.3);
          const yBase2 = startY + (centerY - startY) * Math.pow(t2, 1.3);

          const y1 = yBase1 + amp1 * Math.sin(angle1);
          const y2 = yBase2 + amp2 * Math.sin(angle2);

          const zDepth = Math.cos(angle1);
          const isBehind = zDepth < 0;

          const distToPulse1 = Math.abs(t1 - pulse.progress);
          const pulseRange = 0.18;
          
          let color = 'rgba(255, 255, 255, 0.08)';
          let glowColor = 'rgba(255, 255, 255, 0)';
          let intensity = 0;

          if (distToPulse1 < pulseRange) {
            intensity = 1.0 - (distToPulse1 / pulseRange);
            intensity = Math.pow(intensity, 2);
            color = STRAND_COLORS[pulse.colorIdx] + `${0.12 + intensity * 0.88})`;
            glowColor = STRAND_COLORS[pulse.colorIdx] + `${intensity * 0.4})`;
          } else {
            color = `rgba(255, 255, 255, ${isBehind ? 0.05 : 0.12})`;
          }

          const baseWidth = isBehind ? 1.0 : 2.5;
          const depthMultiplier = 0.6 + (zDepth + 1) * 0.4;
          const lineWidth = baseWidth * depthMultiplier + intensity * 2.0;

          if (intensity > 0) {
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = lineWidth * 4;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }

          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // Draw Center Node (Intelligence Synthesis Core)
      const isPulseActive = nodePulses.length > 0;
      const nodePulsePulse = isPulseActive ? Math.sin(time * 6) * 4 : 0;
      const nodeRadius = 10 + nodePulsePulse;

      ctx.shadowBlur = 25 + (isPulseActive ? 15 : 0);
      ctx.shadowColor = '#4F8CFF';

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(centerX, centerY, nodeRadius - 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(79, 140, 255, 0.9)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nodeRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#05070A] flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,140,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      {/* Loom Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Floating Status Messages HUD (positioned at bottom center) */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center z-10">
        <div className="h-6 overflow-hidden flex items-center justify-center mb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={STATUS_MESSAGES[statusIdx]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm font-semibold tracking-widest text-white font-mono"
            >
              {STATUS_MESSAGES[statusIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 text-[9px] text-text-secondary font-mono tracking-[0.2em] uppercase">
          <span>AEO Diagnostic Running</span>
          <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
          <span className="text-accent font-semibold ml-2">{elapsedTime}s elapsed</span>
        </div>
      </div>

      {/* Zoom reveal white circle overlay */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 300, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed w-6 h-6 rounded-full bg-white z-50 pointer-events-none"
            style={{ left: 'calc(50vw - 12px)', top: 'calc(50vh - 12px)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
