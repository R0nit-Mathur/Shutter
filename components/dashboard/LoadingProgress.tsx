'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingProgressProps {
  engines: string[];
}

const PROCESS_STEPS = [
  'Initializing API handshake...',
  'Compiling structural prompt context...',
  'Scrubbing model neural parameters...',
  'Extracting citation references...',
  'Parsing atomic response JSON...'
];

export default function LoadingProgress({ engines }: LoadingProgressProps) {
  const [modelSteps, setModelSteps] = useState<Record<string, { currentStep: number; log: string[] }>>({});
  const [elapsedTime, setElapsedTime] = useState(0);

  // Initialize engine status trackers
  useEffect(() => {
    const initialStatus: Record<string, { currentStep: number; log: string[] }> = {};
    engines.forEach(eng => {
      initialStatus[eng] = { currentStep: 0, log: [PROCESS_STEPS[0]] };
    });
    setModelSteps(initialStatus);
    setElapsedTime(0);

    // Dynamic timer
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [engines]);

  // Simulate progress steps in parallel
  useEffect(() => {
    const intervals = engines.map(eng => {
      // Stagger intervals slightly per model so progress advances non-uniformly
      const delay = 1200 + Math.random() * 1500;
      
      const interval = setInterval(() => {
        setModelSteps(prev => {
          const modelData = prev[eng];
          if (!modelData || modelData.currentStep >= PROCESS_STEPS.length - 1) {
            return prev;
          }
          
          const nextStep = modelData.currentStep + 1;
          const newLog = [...modelData.log, PROCESS_STEPS[nextStep]];
          
          return {
            ...prev,
            [eng]: {
              currentStep: nextStep,
              log: newLog
            }
          };
        });
      }, delay);

      return interval;
    });

    return () => {
      intervals.forEach(int => clearInterval(int));
    };
  }, [engines]);

  const getEngineLabel = (id: string) => {
    switch (id) {
      case 'openai': return 'OpenAI GPT-4o';
      case 'gemini': return 'Gemini 2.5 Flash';
      case 'claude': return 'Claude 3.5 Sonnet';
      case 'perplexity': return 'Perplexity Search';
      default: return id;
    }
  };

  return (
    <div className="space-y-8 bg-white/[0.01] border border-white/[0.05] p-8 rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.05] pb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Diagnostics Active</h3>
          <p className="text-xs text-text-secondary mt-1">Audit execution in progress.</p>
        </div>
        <div className="font-mono text-sm text-accent">
          Elapsed: <span className="font-bold">{elapsedTime}s</span>
        </div>
      </div>

      <div className="space-y-6">
        {engines.map((eng) => {
          const state = modelSteps[eng] || { currentStep: 0, log: [] };
          const progressPercent = Math.round(((state.currentStep + 1) / PROCESS_STEPS.length) * 100);

          return (
            <div key={eng} className="space-y-2 border border-white/[0.03] bg-black/20 p-5 rounded-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white font-mono">{getEngineLabel(eng)}</span>
                <span className="font-mono text-accent">{progressPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Log Shell */}
              <div className="h-14 overflow-hidden flex flex-col justify-end font-mono text-[10px] text-text-secondary">
                {state.log.slice(-2).map((logLine, idx) => (
                  <div key={idx} className={idx === state.log.slice(-2).length - 1 ? 'text-white' : 'opacity-55'}>
                    &gt; {logLine}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-text-secondary leading-relaxed font-mono">
        ⌛ Connecting and crawling active parameters. Scans take 3–8 seconds.
      </div>
    </div>
  );
}
