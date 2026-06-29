'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import frames from '@/app/bg-frames.json';

export default function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [phase, setPhase] = useState(0);

  const scrollDown = () => {
    const demoSec = document.getElementById('demo');
    if (demoSec) {
      demoSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Monitor Scroll Progress of the 300vh Hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform background overlay opacity & blur based on progress
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1.0], [0.55, 0.55, 0.2]);
  const blurValue = useTransform(scrollYProgress, [0, 0.8, 1.0], [1.5, 1.5, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0.9, 1.0], [1.0, 0.85]);

  // Preload frames asynchronously
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = frames.map((frameName, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/asset/bg/${frameName}`;
          img.onload = () => {
            loadedCount++;
            setLoadPercentage(Math.round((loadedCount / frames.length) * 100));
            preloadedImages[index] = img;
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            resolve();
          };
        });
      });

      await Promise.all(promises);
      imagesRef.current = preloadedImages;
      setAllLoaded(true);
    };

    loadImages();
  }, []);

  // Set Canvas dimensions and draw initial frame when loaded
  useEffect(() => {
    if (!allLoaded || !canvasRef.current) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Handle high DPI (Retina) screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Draw active frame immediately on resize
      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.min(frames.length - 1, Math.floor(currentProgress * frames.length));
      drawFrame(frameIndex, width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [allLoaded]);

  // Canvas drawing handler
  const drawFrame = (index: number, width: number, height: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Clear previous drawing
    ctx.clearRect(0, 0, width, height);

    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    // Cover Aspect Ratio
    if (imgRatio > canvasRatio) {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Bind scrolling scrollYProgress to frame indices and text phases
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!allLoaded || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Fetch window size dynamically to bypass state closures
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Determine current video frame index
    const frameIndex = Math.min(imagesRef.current.length - 1, Math.floor(latest * imagesRef.current.length));
    
    // Draw on animation frame for optimal 60fps performance
    requestAnimationFrame(() => {
      drawFrame(frameIndex, width, height);
    });

    // Map scroll progress to text phases
    let newPhase = 0;
    if (latest < 0.2) newPhase = 0;
    else if (latest < 0.4) newPhase = 1;
    else if (latest < 0.6) newPhase = 2;
    else if (latest < 0.8) newPhase = 3;
    else newPhase = 4;

    if (newPhase !== phase) {
      setPhase(newPhase);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-brand-bg">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-10">
        
        {/* Sleek Loading Screen */}
        <AnimatePresence>
          {!allLoaded && (
            <motion.div
              key="loader"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-brand-bg z-50 px-6"
            >
              <h2 className="text-3xl font-light tracking-[0.3em] text-white font-sans mb-8">
                SHUTTER
              </h2>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mb-3">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-accent"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
              <span className="text-xs tracking-wider text-text-secondary">
                ALIGNING OBSERVATORY DOME — {loadPercentage}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pinned Canvas */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: canvasOpacity }}
        />

        {/* Dynamic Dark Vignette & Readability Treatment */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_40%,rgba(5,7,10,0.85)_100%]"
          style={{
            backgroundColor: overlayOpacity.get()
              ? `rgba(5, 7, 10, ${overlayOpacity.get()})`
              : 'rgba(5, 7, 10, 0.55)',
            backdropFilter: blurValue.get()
              ? `blur(${blurValue.get()}px)`
              : 'blur(1.5px)',
          }}
        />

        {/* Scrolling Narrative Text Overlays */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center select-none pointer-events-none">
          <div className="w-full max-w-4xl min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div
                  key="phase0"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center pointer-events-auto"
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full animate-fadeIn">
                    AI Visibility Platform
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-[1.1] max-w-3xl">
                    Become Visible <br /> Inside AI.
                  </h1>
                  <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed mb-8">
                    Shutter helps companies get discovered in ChatGPT, Claude, Gemini and Perplexity—not just Google.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                      href="/login"
                      className="w-56 py-3.5 bg-white text-brand-bg hover:bg-neutral-200 font-semibold rounded-full text-center transition-all duration-200 hover:shadow-lg hover:shadow-white/5 cursor-pointer text-sm font-sans"
                    >
                      Get Free AI Visibility Audit
                    </Link>
                    <button
                      onClick={scrollDown}
                      className="w-56 py-3.5 border border-white/20 text-white hover:bg-white/5 font-semibold rounded-full text-center transition-all duration-200 cursor-pointer text-sm font-sans"
                    >
                      Watch Demo
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === 1 && (
                <motion.div
                  key="phase1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">
                    The paradigm shift
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-6 leading-[1.1] max-w-3xl">
                    Are you visible <br /> inside AI?
                  </h2>
                  <p className="text-base text-text-secondary max-w-xl leading-relaxed">
                    Traditional search index engines crawled keyword strings to rank pages. Today, AI assistants synthesize search recommendations, and you must optimize for how models perceive.
                  </p>
                </motion.div>
              )}

              {phase === 2 && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-4 leading-[1.1]">
                    Search finds pages.
                  </h2>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-serif italic text-accent mb-6 leading-[1.1]">
                    AI finds meaning.
                  </h2>
                  <p className="text-base text-text-secondary max-w-xl leading-relaxed">
                    If AI doesn't mention your brand when formulating summaries or recommending lists, you don't exist in the conversation.
                  </p>
                </motion.div>
              )}

              {phase === 3 && (
                <motion.div
                  key="phase3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-6 leading-[1.1] max-w-3xl">
                    Become Discoverable Inside AI
                  </h2>
                  <p className="text-base text-text-secondary max-w-xl leading-relaxed">
                    Optimize your brand footprint across vector databases, structured schemas, and direct citation sources.
                  </p>
                </motion.div>
              )}

              {phase === 4 && (
                <motion.div
                  key="phase4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center pointer-events-auto"
                >
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white mb-8 leading-[1.1]">
                    Own Your AI Presence
                  </h2>
                  <p className="text-base text-text-secondary max-w-md leading-relaxed mb-8">
                    Start auditing your citation index, attribute associations, and competitive recommendations today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                      href="/login"
                      className="w-56 py-3.5 bg-white text-brand-bg hover:bg-neutral-200 font-semibold rounded-full text-center transition-all duration-200 hover:shadow-lg hover:shadow-white/5 cursor-pointer text-sm font-sans"
                    >
                      Get Free Visibility Audit
                    </Link>
                    <button
                      onClick={scrollDown}
                      className="w-56 py-3.5 border border-white/20 text-white hover:bg-white/5 font-semibold rounded-full text-center transition-all duration-200 cursor-pointer text-sm font-sans"
                    >
                      Watch Demo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
