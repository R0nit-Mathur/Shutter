'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface MetricItemProps {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
  description: string;
}

function MetricCounter({ value, decimals = 0, suffix, label, description }: MetricItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1.8; // seconds
    const totalSteps = duration * 60;
    const stepTime = 1000 / 60;
    const stepValue = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-left flex flex-col justify-between p-8 border border-card-border bg-card-bg rounded-3xl relative shadow-sm transition-colors duration-300"
    >
      <div>
        <div className="text-6xl font-bold tracking-tight text-text-primary mb-4 font-mono">
          {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
          <span className="text-accent ml-1 font-bold">{suffix}</span>
        </div>
        <h4 className="text-xs font-semibold text-text-primary tracking-wide font-mono uppercase mb-2">{label}</h4>
        <p className="text-xs text-text-secondary leading-relaxed font-normal">{description}</p>
      </div>
    </motion.div>
  );
}

export default function MetricSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-32 px-6 border-t border-card-border bg-bg-secondary relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20 space-y-3"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-3 block">
            02 / Verification
          </span>
          <h2 className="text-4xl font-bold text-text-primary tracking-tight mb-4">
            Citations verified through structure.
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed font-normal max-w-md mx-auto">
            Signals compiled across verified integrations, showing how alignment influences LLM recommendation weights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCounter
            value={73}
            suffix="%"
            label="Verified Citation Rate"
            description="Citations secured in comparison prompts across OpenAI and Claude directories within ninety days."
          />
          <MetricCounter
            value={4.3}
            decimals={1}
            suffix="x"
            label="Resource Proximity"
            description="Closeness rating inside Perplexity vector space, ensuring direct links are extracted in place of competitors."
          />
          <MetricCounter
            value={58}
            suffix="%"
            label="Recommendation Frequency"
            description="Placement frequency inside multi-entity comparison summaries and PM query results."
          />
        </div>
      </div>
    </section>
  );
}
