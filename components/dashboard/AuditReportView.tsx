'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AuditReportViewProps {
  report: any;
}

export default function AuditReportView({ report }: AuditReportViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'openai' | 'gemini' | 'claude' | 'perplexity'>('overview');
  const [completedRoadmapItems, setCompletedRoadmapItems] = useState<Record<number, boolean>>({});

  const { metadata, overview, modelDetails } = report;

  const handleToggleRoadmap = (idx: number) => {
    setCompletedRoadmapItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getModelLabel = (id: string) => {
    switch (id) {
      case 'openai': return 'OpenAI GPT-4o';
      case 'gemini': return 'Gemini 2.5 Flash';
      case 'claude': return 'Claude 3.5 Sonnet';
      case 'perplexity': return 'Perplexity Search';
      default: return id;
    }
  };

  // Helper to calculate SVG circular dash for the overall gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const score = overview.overallAeoScore || 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Metadata Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1.5 block">
            AUDIT REPORT COMPLETE
          </span>
          <h2 className="text-3xl font-light text-white tracking-tight">
            {metadata.productName}
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Category: <span className="text-white font-medium">{metadata.productCategory}</span> • Audited: {new Date(metadata.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {metadata.activeHostKeys && Object.entries(metadata.activeHostKeys).map(([key, isActive]) => (
            <span
              key={key}
              className={`text-[9px] font-mono px-2.5 py-1 rounded border font-semibold uppercase tracking-wider ${
                isActive
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
              }`}
            >
              {key}: {isActive ? 'Live' : 'Simulated'}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Main Tab Buttons */}
      <div className="flex border-b border-white/[0.05]">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-4 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'border-accent text-accent'
              : 'border-transparent text-text-secondary hover:text-white'
          }`}
        >
          Aggregated Overview
        </button>
        {metadata.modelsAudited.map((modelKey: string) => (
          <button
            key={modelKey}
            onClick={() => setActiveTab(modelKey as any)}
            className={`py-4 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer capitalize ${
              activeTab === modelKey
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-white'
            }`}
          >
            {modelKey}
          </button>
        ))}
      </div>

      {/* 3. Tab Content */}
      <div className="space-y-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Top row: Gauge Index & Attribute SVG Bar list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Dial Gauge */}
              <div className="lg:col-span-5 border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl flex flex-col justify-between items-center text-center">
                <div className="w-full text-left">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                    AI OPTIMIZATION STANDING
                  </span>
                  <h4 className="text-lg font-medium text-white">Compound AEO Score</h4>
                </div>

                <div className="relative w-40 h-40 flex items-center justify-center my-6">
                  {/* Background Circle */}
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      className="stroke-white/[0.03]"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="80"
                      cy="80"
                      r={radius}
                      className="stroke-accent"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-light text-white tracking-tight">{score}</span>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">
                      INDEX
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full border-t border-white/[0.05] pt-6 text-left">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest block">
                      VISIBILITY INDEX
                    </span>
                    <span className="text-2xl font-light text-white mt-1 block">
                      {overview.averageVisibilityIndex}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest block">
                      SENTIMENT SCORE
                    </span>
                    <span className="text-2xl font-light text-white mt-1 block">
                      {overview.averageSentimentScore}%
                      <span className="text-xs text-accent uppercase tracking-wider font-semibold ml-1.5 font-mono">
                        ({overview.overallSentimentLabel})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Attributes perceptions */}
              <div className="lg:col-span-7 border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                    LATENT ASSOCIATIONS
                  </span>
                  <h4 className="text-lg font-medium text-white mb-6">Attribute Perception Rankings</h4>
                </div>

                <div className="space-y-6">
                  {overview.averageAttributes.map((attr: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-white capitalize">{attr.name}</span>
                        <span className="text-accent">{attr.averageScore}%</span>
                      </div>
                      {/* Bar indicator */}
                      <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden relative">
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: `${attr.averageScore}%` }}
                          transition={{ duration: 1.0, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Competitors */}
                <div className="border-t border-white/[0.05] pt-6 mt-6">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-3 font-semibold">
                    Frequently Compared Competitors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {overview.consolidatedCompetitors.map((comp: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-3.5 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.01] text-white"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Unified SWOT Analysis Grid */}
            <div className="border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl space-y-6">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  TACTICAL BLUEPRINT
                </span>
                <h4 className="text-lg font-medium text-white">Synthesized SWOT Analysis</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl">
                  <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Strengths (Pros)
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-3 list-disc list-inside">
                    {overview.swotAnalysis.strengths.slice(0, 4).map((str: string, i: number) => (
                      <li key={i} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl">
                  <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Weaknesses (Cons)
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-3 list-disc list-inside">
                    {overview.swotAnalysis.weaknesses.slice(0, 4).map((str: string, i: number) => (
                      <li key={i} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl">
                  <h5 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Opportunities (AEO Actions)
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-3 list-disc list-inside">
                    {overview.swotAnalysis.opportunities.slice(0, 4).map((str: string, i: number) => (
                      <li key={i} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl">
                  <h5 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Threats (Risks & Competitors)
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-3 list-disc list-inside">
                    {overview.swotAnalysis.threats.slice(0, 4).map((str: string, i: number) => (
                      <li key={i} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Actionable Recommendations Roadmap Checklist */}
            <div className="border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl space-y-6">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  IMPROVEMENT TRACKER
                </span>
                <h4 className="text-lg font-medium text-white">Interactive AEO Action Roadmap</h4>
              </div>

              <div className="space-y-4">
                {overview.actionableRoadmap.map((item: any, idx: number) => {
                  const isChecked = !!completedRoadmapItems[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleRoadmap(idx)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                        isChecked
                          ? 'border-green-500/20 bg-green-500/[0.01] opacity-60'
                          : 'border-white/[0.05] hover:border-white/20 bg-black/10'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isChecked
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-white/20'
                      }`}>
                        {isChecked && (
                          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="3" fill="none">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            item.sourceModel === 'documentation'
                              ? 'bg-blue-500/10 text-blue-400'
                              : item.sourceModel === 'web-mentions'
                              ? 'bg-purple-500/10 text-purple-400'
                              : 'bg-zinc-500/10 text-zinc-400'
                          }`}>
                            {item.sourceModel}
                          </span>
                        </div>
                        <p className={`text-xs text-white leading-relaxed ${isChecked ? 'line-through text-zinc-500' : ''}`}>
                          {item.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* INDIVIDUAL MODEL BREAKDOWN TABS */}
        {activeTab !== 'overview' && (() => {
          const detail = modelDetails[activeTab];
          if (!detail || !detail.rawAudit) {
            return (
              <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl text-center text-text-secondary">
                No audit data collected for {getModelLabel(activeTab)}.
              </div>
            );
          }

          const audit = detail.rawAudit;
          const isSimulated = detail.isSimulated;

          return (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Row 1: Visibility Metrics & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Visibility Box */}
                <div className="lg:col-span-6 p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-accent uppercase tracking-widest block mb-1.5 font-bold">
                      {isSimulated ? 'SIMULATED RESPONSE' : 'LIVE API METRICS'}
                    </span>
                    <h4 className="text-lg font-medium text-white mb-6">Model Visibility Analysis</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-white/[0.03]">
                      <span className="text-text-secondary font-medium">Brand Recognition State:</span>
                      <span className={`font-semibold ${audit.visibility.isKnown ? 'text-green-400' : 'text-red-400'}`}>
                        {audit.visibility.isKnown ? 'Recognized' : 'Not Recognized'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-white/[0.03]">
                      <span className="text-text-secondary font-medium">Reference Dataset Frequency:</span>
                      <span className="font-mono uppercase text-white font-semibold">{audit.visibility.referenceFrequency}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary font-medium">Factual Information Confidence:</span>
                      <span className="font-semibold text-white">{audit.visibility.factualAccuracyScore}%</span>
                    </div>
                  </div>

                  {/* SVG compound Visibility Indicator */}
                  <div className="pt-6 border-t border-white/[0.05]">
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span>Derived Visibility Index</span>
                      <span className="text-accent">{detail.computedMetrics?.visibilityIndex}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden relative">
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${detail.computedMetrics?.visibilityIndex}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recommendations Placement Box */}
                <div className="lg:col-span-6 p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1.5">
                      RAG RETRIEVAL OUTCOMES
                    </span>
                    <h4 className="text-lg font-medium text-white mb-6">Recommendation Parameters</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-white/[0.03]">
                      <span className="text-text-secondary font-medium">Likelihood to Recommend:</span>
                      <span className="font-semibold text-white">{audit.recommendations.probabilityOfRecommendation}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-white/[0.03]">
                      <span className="text-text-secondary font-medium">Category Recommendation Placement Rank:</span>
                      <span className="font-semibold text-white">
                        {audit.recommendations.typicalPlacementRank === 0 
                          ? 'Not Recommended' 
                          : `#${audit.recommendations.typicalPlacementRank} in Category List`}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block mb-1">Recommendation Triggers:</span>
                      <div className="space-y-1">
                        {audit.recommendations.recommendationPrerequisites.map((prereq: string, idx: number) => (
                          <span key={idx} className="text-[10px] block font-mono text-zinc-400 bg-white/[0.02] p-2 rounded">
                            ↳ "{prereq}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Row 2: Pros vs. Cons (Sentiment Analysis) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                    <h4 className="text-lg font-medium text-white">Positive Associations (Pros)</h4>
                    <span className="text-2xl font-light text-green-400">{audit.sentiment.rawScore}%</span>
                  </div>
                  <div className="space-y-4">
                    {audit.sentiment.pros.map((pro: any, idx: number) => (
                      <div key={idx} className="p-4 border border-white/[0.03] bg-black/10 rounded-xl flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 text-[10px] mt-0.5">✓</span>
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                            {pro.category}
                          </span>
                          <p className="text-xs text-white leading-relaxed mt-2">{pro.point}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons */}
                <div className="p-8 border border-white/[0.05] bg-white/[0.01] rounded-2xl space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/[0.05]">
                    <h4 className="text-lg font-medium text-white">Vulnerabilities (Cons)</h4>
                    <span className="text-2xl font-light text-red-400">{(100 - audit.sentiment.rawScore)}%</span>
                  </div>
                  <div className="space-y-4">
                    {audit.sentiment.cons.map((con: any, idx: number) => (
                      <div key={idx} className="p-4 border border-white/[0.03] bg-black/10 rounded-xl flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 text-[10px] mt-0.5">!</span>
                        <div>
                          <span className="text-[9px] font-mono uppercase bg-red-500/10 text-red-400 px-2 py-0.5 rounded">
                            {con.category}
                          </span>
                          <p className="text-xs text-white leading-relaxed mt-2">{con.point}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Perplexity Citations Sources (Perplexity Only) */}
              {activeTab === 'perplexity' && detail.citations && detail.citations.length > 0 && (
                <div className="p-8 border border-white/[0.05] bg-[#0A0E14] rounded-2xl space-y-4 shadow-xl">
                  <div>
                    <span className="text-[10px] text-accent uppercase tracking-widest block mb-1 font-bold">
                      CITATIONS & DATA SOURCES
                    </span>
                    <h4 className="text-lg font-medium text-white">Indexed Web References</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detail.citations.map((url: string, idx: number) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs p-3 rounded-lg border border-white/[0.05] bg-white/[0.01] text-accent hover:text-white hover:border-accent transition-all truncate block"
                      >
                        ↳ {url}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

      </div>
    </div>
  );
}
