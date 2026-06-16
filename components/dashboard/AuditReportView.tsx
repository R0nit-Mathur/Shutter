'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditReportViewProps {
  report: any;
}

export default function AuditReportView({ report }: AuditReportViewProps) {
  const [activeMainTab, setActiveMainTab] = useState<'perception' | 'issues'>('perception');
  const [activeModelTab, setActiveModelTab] = useState<'all' | 'openai' | 'gemini' | 'claude' | 'perplexity'>('all');
  const [completedRoadmapItems, setCompletedRoadmapItems] = useState<Record<number, boolean>>({});

  const { metadata, overview, modelDetails, issuesAudit } = report;

  const handleToggleRoadmap = (idx: number) => {
    setCompletedRoadmapItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getModelLabel = (id: string) => {
    switch (id) {
      case 'openai': return 'OpenAI GPT-4o';
      case 'gemini': return 'Gemini 3.5 Flash';
      case 'claude': return 'Claude 3.5 Sonnet';
      case 'perplexity': return 'Perplexity Search';
      default: return id;
    }
  };

  const getIssueTitle = (key: string) => {
    switch (key) {
      case 'crawlable': return 'Website Crawlability Probe';
      case 'blockedBots': return 'Robots.txt AI Bot Access';
      case 'googleSearchTop': return 'Google Search Position #1';
      case 'hasDiscussions': return 'Community & Forum Discussions';
      case 'reviewsGreat': return 'Public Review Sentiment';
      case 'schemaDetected': return 'Structured Schema.org Markup';
      case 'faqCoverage': return 'High-Intent FAQ Coverage';
      default: return key;
    }
  };

  // Helper to calculate SVG circular dash for the overall gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const score = overview.overallAeoScore || 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Process & sort issues (Failed first, then High -> Low importance)
  const issuesList = Object.entries(issuesAudit || {}).map(([key, data]: [string, any]) => ({
    key,
    ...data,
    title: getIssueTitle(key)
  }));

  const sortedIssues = [...issuesList].sort((a, b) => {
    // Failed first (status === false)
    if (a.status !== b.status) {
      return a.status ? 1 : -1;
    }
    const importanceMap: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return (importanceMap[b.importance] || 0) - (importanceMap[a.importance] || 0);
  });

  const passedIssuesCount = issuesList.filter(i => i.status).length;
  const totalIssuesCount = issuesList.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Header Metadata Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1.5 block">
            AEO DIAGNOSTIC COMPLETE
          </span>
          <h2 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
            {metadata.productName}
            {metadata.website && (
              <span className="text-xs font-mono font-medium text-text-secondary border border-white/10 px-2.5 py-1 rounded bg-white/[0.02]">
                {metadata.website.replace(/^https?:\/\//i, '')}
              </span>
            )}
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Audited on: {new Date(metadata.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
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

      {/* 2. Top-level Navigation Tabs */}
      <div className="flex gap-4 border-b border-white/[0.05] pb-[1px]">
        <button
          onClick={() => setActiveMainTab('perception')}
          className={`pb-4 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeMainTab === 'perception'
              ? 'border-accent text-accent'
              : 'border-transparent text-text-secondary hover:text-white'
          }`}
        >
          AI Perception ("What AI Thinks")
        </button>
        <button
          onClick={() => setActiveMainTab('issues')}
          className={`pb-4 px-6 text-sm font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeMainTab === 'issues'
              ? 'border-accent text-accent'
              : 'border-transparent text-text-secondary hover:text-white'
          }`}
        >
          Issues Index ("Why LLM is not incorporating them")
          {passedIssuesCount < totalIssuesCount && (
            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
              {totalIssuesCount - passedIssuesCount} Alert
            </span>
          )}
        </button>
      </div>

      {/* 3. Tab Contents */}
      <div className="space-y-8">
        
        {/* AI PERCEPTION TAB */}
        {activeMainTab === 'perception' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top row: Gauge Index & Attribute rankings */}
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
                  {overview.averageAttributes.length === 0 ? (
                    <span className="text-xs text-text-secondary italic block py-4">No attributes ranked.</span>
                  ) : (
                    overview.averageAttributes.map((attr: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-white capitalize">{attr.name}</span>
                          <span className="text-accent">{attr.averageScore}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden relative">
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${attr.averageScore}%` }}
                            transition={{ duration: 1.0, delay: idx * 0.1 }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Direct Competitors */}
                <div className="border-t border-white/[0.05] pt-6 mt-6">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-3 font-semibold">
                    Frequently Compared Competitors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {overview.consolidatedCompetitors.length === 0 ? (
                      <span className="text-xs text-text-secondary italic">None detected.</span>
                    ) : (
                      overview.consolidatedCompetitors.map((comp: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-3.5 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.01] text-white"
                        >
                          {comp}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Framed Questions Card */}
            {metadata.framedQuestions && metadata.framedQuestions.length > 0 && (
              <div className="border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl space-y-4">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                    AUDIT GROUNDING CONTEXT
                  </span>
                  <h4 className="text-lg font-medium text-white">Framed Questions Evaluated</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    The following high-intent questions were generated from your website and used to check LLM references:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metadata.framedQuestions.map((q: string, idx: number) => (
                    <div key={idx} className="p-4 border border-white/[0.04] bg-black/20 rounded-xl flex items-start gap-3">
                      <span className="text-accent font-mono font-bold text-xs mt-0.5">Q{idx + 1}.</span>
                      <p className="text-xs text-white leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Model details section */}
            <div className="border border-white/[0.05] bg-white/[0.01] p-8 rounded-2xl space-y-6">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  MODEL RESPONSES
                </span>
                <h4 className="text-lg font-medium text-white mb-6">Individual Model Analysis</h4>
              </div>

              {/* Model Sub-tabs */}
              <div className="flex border-b border-white/[0.05] gap-2">
                <button
                  onClick={() => setActiveModelTab('all')}
                  className={`pb-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                    activeModelTab === 'all'
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-secondary hover:text-white'
                  }`}
                >
                  Model Matrix
                </button>
                {metadata.modelsAudited.map((modelKey: string) => (
                  <button
                    key={modelKey}
                    onClick={() => setActiveModelTab(modelKey as any)}
                    className={`pb-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                      activeModelTab === modelKey
                        ? 'border-accent text-accent'
                        : 'border-transparent text-text-secondary hover:text-white'
                    }`}
                  >
                    {modelKey}
                  </button>
                ))}
              </div>

              {/* Model contents */}
              <div className="pt-4">
                {activeModelTab === 'all' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.keys(modelDetails).map((key) => {
                      const item = modelDetails[key];
                      const audit = item.rawAudit;
                      if (!audit) return null;
                      return (
                        <div key={key} className="p-5 border border-white/[0.05] bg-black/30 rounded-xl space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                              {getModelLabel(key)}
                            </span>
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                              item.isSimulated ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                            }`}>
                              {item.isSimulated ? 'Simulated' : 'Live'}
                            </span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                              <span className="text-text-secondary">Visibility:</span>
                              <span className="font-semibold text-white">{item.computedMetrics?.visibilityIndex}%</span>
                            </div>
                            <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                              <span className="text-text-secondary">Sentiment:</span>
                              <span className="font-semibold text-white">{audit.sentiment.rawScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Recommendation:</span>
                              <span className="font-semibold text-white">{audit.recommendations.probabilityOfRecommendation}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeModelTab !== 'all' && (() => {
                  const detail = modelDetails[activeModelTab];
                  if (!detail || !detail.rawAudit) {
                    return <span className="text-xs text-text-secondary">No details captured for {activeModelTab}</span>;
                  }
                  const audit = detail.rawAudit;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                      <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl space-y-4">
                        <h5 className="text-xs font-bold text-accent uppercase tracking-widest">Visibility Parameters</h5>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between border-b border-white/[0.02] pb-2">
                            <span className="text-text-secondary">Recognized by Model:</span>
                            <span className={audit.visibility.isKnown ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                              {audit.visibility.isKnown ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-white/[0.02] pb-2">
                            <span className="text-text-secondary">Reference Frequency:</span>
                            <span className="text-white font-mono uppercase">{audit.visibility.referenceFrequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Factual Accuracy Score:</span>
                            <span className="text-white font-bold">{audit.visibility.factualAccuracyScore}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-white/[0.04] bg-black/10 rounded-xl space-y-4">
                        <h5 className="text-xs font-bold text-accent uppercase tracking-widest">Recommendation Parameters</h5>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between border-b border-white/[0.02] pb-2">
                            <span className="text-text-secondary">Recommendation Probability:</span>
                            <span className="text-white font-bold">{audit.recommendations.probabilityOfRecommendation}%</span>
                          </div>
                          <div className="flex justify-between border-b border-white/[0.02] pb-2">
                            <span className="text-text-secondary">Placement Ranking:</span>
                            <span className="text-white font-bold">
                              {audit.recommendations.typicalPlacementRank === 0 ? 'None' : `#${audit.recommendations.typicalPlacementRank}`}
                            </span>
                          </div>
                          <div>
                            <span className="text-text-secondary block mb-1">Common Triggers:</span>
                            <div className="space-y-1">
                              {audit.recommendations.recommendationPrerequisites.map((p: string, i: number) => (
                                <span key={i} className="text-[10px] block font-mono text-zinc-400">↳ "{p}"</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
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
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-white/20'
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
          </div>
        )}

        {/* ISSUES TAB */}
        {activeMainTab === 'issues' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Summary statistics card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block">Passed Audits</span>
                <span className="text-3xl font-light text-white mt-1 block">
                  {passedIssuesCount} <span className="text-xs text-text-secondary">/ {totalIssuesCount}</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block">Urgent Gaps</span>
                <span className="text-3xl font-light text-red-400 mt-1 block">
                  {issuesList.filter(i => !i.status && i.importance === 'high').length}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block">Health Score</span>
                <span className="text-3xl font-light text-accent mt-1 block">
                  {Math.round((passedIssuesCount / totalIssuesCount) * 100)}%
                </span>
              </div>
            </div>

            {/* Sorted Issues Grid list */}
            <div className="space-y-4">
              {sortedIssues.map((issue) => {
                const hasPassed = issue.status;
                const isHighImportance = issue.importance === 'high';
                const isMedImportance = issue.importance === 'medium';

                return (
                  <div
                    key={issue.key}
                    className={`p-6 border rounded-2xl bg-white/[0.01] transition-all flex flex-col md:flex-row justify-between gap-6 items-start md:items-stretch ${
                      hasPassed
                        ? 'border-white/[0.04]'
                        : 'border-red-500/10 hover:border-red-500/20 shadow-lg shadow-red-500/[0.01]'
                    }`}
                  >
                    
                    {/* Status Circle & Text */}
                    <div className="flex gap-4 items-start md:w-3/5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                        hasPassed
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {hasPassed ? '✓' : '×'}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{issue.title}</h4>
                          
                          {/* Importance Badge */}
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono border ${
                            isHighImportance 
                              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                              : isMedImportance
                              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                              : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400'
                          }`}>
                            {issue.importance} Priority
                          </span>

                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                            hasPassed 
                              ? 'bg-green-500/15 text-green-400' 
                              : 'bg-red-500/15 text-red-400'
                          }`}>
                            {hasPassed ? 'PASSED' : 'ACTION REQUIRED'}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed mt-1">{issue.details}</p>
                      </div>
                    </div>

                    {/* Recommendation Card */}
                    <div className="w-full md:w-2/5 p-4 border border-white/[0.03] bg-black/30 rounded-xl flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest mb-1.5 block font-mono">
                        Optimization Guide
                      </span>
                      <p className="text-[11px] text-white/90 leading-relaxed italic">
                        "{issue.recommendation}"
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
