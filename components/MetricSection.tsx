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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center lg:text-left flex flex-col justify-between p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl"
    >
      <div>
        <div className="text-6xl sm:text-7xl font-light font-sans tracking-tight text-white mb-4">
          {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
          <span className="text-accent ml-1 font-serif italic">{suffix}</span>
        </div>
        <h4 className="text-lg font-medium text-white mb-2">{label}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function MetricSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-32 px-6 border-t border-white/[0.05] bg-brand-bg relative overflow-hidden">
      {/* Decorative backlights */}
      <div className="pointer-events-none absolute -bottom-80 left-1/3 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3 block">
            MEASURED RESULTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Auditable gains in AI rankings.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Data points gathered across 12,000 audited domains optimizing content specifically for model parameters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MetricCounter
            value={73}
            suffix="%"
            label="Visibility Increase"
            description="Average increase in positive brand mentions across target OpenAI & Claude search queries within 90 days."
          />
          <MetricCounter
            value={4.3}
            decimals={1}
            suffix="x"
            label="Citation Growth"
            description="Multiplication of direct backlink citations from Perplexity answers, driving high-intent organic traffic."
          />
          <MetricCounter
            value={58}
            suffix="%"
            label="Appearence Rate"
            description="Boost in placement frequencies inside competitive product recommendation listings and comparisons."
          />
        </div>
      </div>
    </section>
  );
}
