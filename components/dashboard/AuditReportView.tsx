'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuditReportViewProps {
  report: any;
}

export default function AuditReportView({ report }: AuditReportViewProps) {
  const [activeTechTab, setActiveTechTab] = useState<'perception' | 'issues' | 'swot'>('perception');
  const [activeModelTab, setActiveModelTab] = useState<'all' | 'openai' | 'gemini' | 'claude' | 'perplexity'>('all');
  const [completedPriorities, setCompletedPriorities] = useState<Record<number, boolean>>({});

  const { metadata, overview, modelDetails, issuesAudit } = report;

  const handleTogglePriority = (idx: number) => {
    setCompletedPriorities(prev => ({
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

  // SVG Circular Gauge variables
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const score = overview.overallAeoScore || 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Process issues
  const issuesList = Object.entries(issuesAudit || {}).map(([key, data]: [string, any]) => ({
    key,
    ...data,
    title: getIssueTitle(key)
  }));

  const failedIssues = issuesList.filter(i => !i.status);
  const passedIssuesCount = issuesList.filter(i => i.status).length;
  const totalIssuesCount = issuesList.length;

  // Compile Dynamic Main Problems based on failed issues
  const mainProblemsList = failedIssues.map(i => i.details);
  const mainProblemText = mainProblemsList.length > 0 
    ? mainProblemsList.slice(0, 2).join(' Furthermore, ') 
    : 'No critical structural blocks detected. Model visibility is primarily throttled by organic search citation weights.';

  // Compile Dynamic Biggest Opportunities
  const opportunitiesList = overview.swotAnalysis?.opportunities || [];
  const biggestOpportunityText = opportunitiesList.length > 0
    ? opportunitiesList[0] + ' Additionally, we recommend targeting high-intent RAG semantic vectors.'
    : 'Deploy schema.org markups across all product documentation to allow models to parse raw feature mappings accurately.';

  // Compile Expected Outcome
  const expectedOutcomeText = failedIssues.length > 0
    ? `Eliminating structural blocks (robots.txt access and missing schema properties) is projected to increase citation reference velocity by +18% to +25% across OpenAI & Claude summaries within 60 days.`
    : `Enhancing forum mentions and structured Q&A sheets is projected to improve model recommendation probability for target queries by +12% in 30 days.`;

  // Top 5 Priorities Matrix (Dynamic mapping of failed items followed by roadmap entries)
  const priorityItems: { task: string; impact: 'High' | 'Medium' | 'Low'; effort: 'Quick' | 'Medium' | 'Hard' }[] = [];
  
  // Fill from failed issues
  failedIssues.forEach((issue) => {
    priorityItems.push({
      task: `Fix structural error: ${issue.title} (${issue.recommendation})`,
      impact: issue.importance === 'high' ? 'High' : 'Medium',
      effort: 'Quick'
    });
  });

  // Fill remainder from actionableRoadmap
  if (overview.actionableRoadmap && overview.actionableRoadmap.length > 0) {
    overview.actionableRoadmap.forEach((item: any) => {
      if (priorityItems.length < 5) {
        priorityItems.push({
          task: item.details,
          impact: item.sourceModel === 'documentation' ? 'High' : 'Medium',
          effort: item.sourceModel === 'web-mentions' ? 'Hard' : 'Medium'
        });
      }
    });
  }

  // Final fallback to make exactly 5 items if necessary
  while (priorityItems.length < 5) {
    priorityItems.push({
      task: 'Standardize Schema.org JSON-LD markups on landing pages',
      impact: 'High',
      effort: 'Quick'
    });
  }

  const sortedIssues = [...issuesList].sort((a, b) => {
    if (a.status !== b.status) return a.status ? 1 : -1;
    const importanceMap: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return (importanceMap[b.importance] || 0) - (importanceMap[a.importance] || 0);
  });

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case 'Quick': return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500';
      default: return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[150px] bg-[radial-gradient(circle_at_top_right,rgba(79,140,255,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1.5 block">
            AI VISIBILITY PLATFORM DIAGNOSTIC
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
            Scan completed on: {new Date(metadata.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded border font-semibold bg-green-500/10 border-green-500/30 text-green-400 uppercase tracking-wider">
            Diagnostics: Live
          </span>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY BLOCK */}
      <div className="space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block">
          Executive Summary
        </span>

        {/* Dial gauge + Primary metrics row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Gauge Widget */}
          <div className="lg:col-span-4 border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl flex flex-col justify-between items-center text-center">
            <div className="w-full text-left">
              <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-0.5">
                Composite Score
              </span>
              <h4 className="text-sm font-semibold text-white">AI Visibility Index</h4>
            </div>

            <div className="relative w-36 h-36 flex items-center justify-center my-4">
              <svg className="w-full h-full -rotate-90">
                <circle cx="72" cy="72" r={radius} className="stroke-white/[0.03]" strokeWidth="8" fill="transparent" />
                <motion.circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-accent"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-light text-white tracking-tight">{score}</span>
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest mt-0.5">
                  VISIBILITY
                </span>
              </div>
            </div>

            <div className="w-full border-t border-white/[0.05] pt-4 text-left flex justify-between items-center text-xs">
              <span className="text-text-secondary">Scan Health Rate:</span>
              <span className="font-semibold text-white">{Math.round((passedIssuesCount / totalIssuesCount) * 100)}%</span>
            </div>
          </div>

          {/* Metrics summary cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  Mention Standing
                </span>
                <h4 className="text-base font-semibold text-white mb-3">Average Visibility Index</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Calculates your recommendation frequency across comparative models for primary prompts.
                </p>
              </div>
              <div className="text-3xl font-light text-white mt-4">
                {overview.averageVisibilityIndex}%
              </div>
            </div>

            <div className="p-6 border border-white/[0.05] bg-white/[0.01] rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  Sentiment Value
                </span>
                <h4 className="text-base font-semibold text-white mb-3">Model Sentiment Index</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Evaluates brand attribute context (positive vs. negative adjectives) computed inside response paths.
                </p>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-3xl font-light text-white">{overview.averageSentimentScore}%</span>
                <span className="text-xs text-accent font-bold uppercase tracking-wider font-mono">
                  ({overview.overallSentimentLabel})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Problems / Opportunities / Outcome row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Problems */}
          <div className="p-6 border border-red-500/10 bg-red-500/[0.01] rounded-2xl flex flex-col justify-between min-h-[180px]">
            <div>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-2 font-mono">
                Main Problems
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {mainProblemText}
              </p>
            </div>
            <span className="text-[9px] text-red-400 font-semibold block mt-4 uppercase">
              Action Required
            </span>
          </div>

          {/* Biggest Opportunities */}
          <div className="p-6 border border-green-500/10 bg-green-500/[0.01] rounded-2xl flex flex-col justify-between min-h-[180px]">
            <div>
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider block mb-2 font-mono">
                Biggest Opportunities
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {biggestOpportunityText}
              </p>
            </div>
            <span className="text-[9px] text-green-400 font-semibold block mt-4 uppercase">
              High Potential Gain
            </span>
          </div>

          {/* Expected Outcome */}
          <div className="p-6 border border-accent/20 bg-accent/[0.01] rounded-2xl flex flex-col justify-between min-h-[180px]">
            <div>
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider block mb-2 font-mono">
                Expected Outcome
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {expectedOutcomeText}
              </p>
            </div>
            <span className="text-[9px] text-accent font-semibold block mt-4 uppercase">
              Projected ROI
            </span>
          </div>
        </div>

        {/* Top 5 Priorities Action Plan */}
        <div className="border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-0.5">
                Tactical checklist
              </span>
              <h4 className="text-base font-semibold text-white">Top 5 Priority Action Items</h4>
            </div>
            <span className="text-[10px] font-mono text-text-secondary">
              Click items to complete
            </span>
          </div>

          <div className="space-y-3">
            {priorityItems.map((item, idx) => {
              const isChecked = !!completedPriorities[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleTogglePriority(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                    isChecked
                      ? 'border-green-500/20 bg-green-500/[0.01] opacity-50'
                      : 'border-white/[0.04] bg-black/20 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox circle */}
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-white/20'
                    }`}>
                      {isChecked && (
                        <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="3.5" fill="none">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs text-white leading-relaxed font-medium ${isChecked ? 'line-through text-zinc-500' : ''}`}>
                      <span className="text-accent font-mono mr-2">0{idx + 1}.</span>
                      {item.task}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getImpactBadge(item.impact)}`}>
                      Impact: {item.impact}
                    </span>
                    <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getEffortBadge(item.effort)}`}>
                      Effort: {item.effort}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* TECHNICAL DETAILS TABS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/[0.05] pb-[1px]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block">
            Technical Details & Diagnostic Logs
          </span>

          <div className="flex gap-2">
            {([
              { id: 'perception', label: 'Model Perception' },
              { id: 'issues', label: 'Issues Index' },
              { id: 'swot', label: 'SWOT Quadrants' }
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTechTab(tab.id)}
                className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTechTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content panel */}
        <div className="space-y-6">
          
          {/* perception Tab */}
          {activeTechTab === 'perception' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
              
              {/* Radar attributes */}
              <div className="lg:col-span-7 border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                    Semantic Vectors
                  </span>
                  <h4 className="text-sm font-semibold text-white mb-6">Attribute Perception Rankings</h4>
                </div>

                <div className="space-y-5">
                  {overview.averageAttributes?.length === 0 ? (
                    <span className="text-xs text-text-secondary italic block py-4">No attributes ranked.</span>
                  ) : (
                    overview.averageAttributes?.map((attr: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-white capitalize">{attr.name}</span>
                          <span className="text-accent">{attr.averageScore}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden relative">
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${attr.averageScore}%` }}
                            transition={{ duration: 1.0, delay: idx * 0.08 }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-white/[0.05] pt-6 mt-6">
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-3 font-semibold font-mono">
                    Compared Competitors
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {overview.consolidatedCompetitors?.length === 0 ? (
                      <span className="text-xs text-text-secondary italic">None detected.</span>
                    ) : (
                      overview.consolidatedCompetitors?.map((comp: string, i: number) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.01] text-zinc-300 font-mono">
                          {comp}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Engine matrix breakdown */}
              <div className="lg:col-span-5 border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl space-y-4">
                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                  Engine Matrix
                </span>
                <h4 className="text-sm font-semibold text-white mb-4">Model Performance Matrix</h4>
                
                <div className="space-y-3">
                  {Object.keys(modelDetails).map((key) => {
                    const item = modelDetails[key];
                    const audit = item.rawAudit;
                    if (!audit) return null;
                    return (
                      <div key={key} className="p-4 border border-white/[0.04] bg-black/40 rounded-xl space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold uppercase text-white">
                            {getModelLabel(key)}
                          </span>
                          <span className="text-[9px] font-bold text-accent uppercase tracking-wider font-mono">
                            Vis: {item.computedMetrics?.visibilityIndex}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-text-secondary">
                          <span>Sentiment: {audit.sentiment?.rawScore}% ({audit.sentiment?.label || 'Neutral'})</span>
                          <span>Recommends: {audit.recommendations?.probabilityOfRecommendation}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* issues Tab */}
          {activeTechTab === 'issues' && (
            <div className="space-y-4 animate-fadeIn">
              {sortedIssues.map((issue) => {
                const hasPassed = issue.status;
                const isHigh = issue.importance === 'high';
                const isMed = issue.importance === 'medium';

                return (
                  <div
                    key={issue.key}
                    className={`p-5 border rounded-xl bg-white/[0.01] transition-all flex flex-col md:flex-row justify-between gap-4 items-start md:items-center ${
                      hasPassed
                        ? 'border-white/[0.04]'
                        : 'border-red-500/10 hover:border-red-500/20'
                    }`}
                  >
                    <div className="flex gap-4 items-start md:w-3/5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        hasPassed ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {hasPassed ? '✓' : '×'}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <h5 className="font-semibold text-white">{issue.title}</h5>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono border ${
                            isHigh ? 'bg-red-500/10 border-red-500/30 text-red-400' : isMed ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400'
                          }`}>
                            {issue.importance}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{issue.details}</p>
                      </div>
                    </div>

                    <div className="w-full md:w-2/5 p-3 border border-white/[0.03] bg-black/40 rounded-xl">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1 font-mono">
                        Optimization Guide
                      </span>
                      <p className="text-[10px] text-white leading-relaxed italic">
                        "{issue.recommendation}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SWOT Quadrants Tab */}
          {activeTechTab === 'swot' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border border-white/[0.04] bg-green-500/[0.01] rounded-xl">
                  <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    S / Strengths
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
                    {overview.swotAnalysis?.strengths.map((str: string, i: number) => <li key={i} className="leading-relaxed">{str}</li>)}
                  </ul>
                </div>

                <div className="p-5 border border-white/[0.04] bg-red-500/[0.01] rounded-xl">
                  <h5 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    W / Weaknesses
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
                    {overview.swotAnalysis?.weaknesses.map((str: string, i: number) => <li key={i} className="leading-relaxed">{str}</li>)}
                  </ul>
                </div>

                <div className="p-5 border border-white/[0.04] bg-accent/[0.01] rounded-xl">
                  <h5 className="text-xs font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    O / Opportunities
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
                    {overview.swotAnalysis?.opportunities.map((str: string, i: number) => <li key={i} className="leading-relaxed">{str}</li>)}
                  </ul>
                </div>

                <div className="p-5 border border-white/[0.04] bg-yellow-500/[0.01] rounded-xl">
                  <h5 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    T / Threats
                  </h5>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside">
                    {overview.swotAnalysis?.threats.map((str: string, i: number) => <li key={i} className="leading-relaxed">{str}</li>)}
                  </ul>
                </div>
              </div>

              {/* Framed Questions Evaluated */}
              {metadata.framedQuestions && metadata.framedQuestions.length > 0 && (
                <div className="border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl space-y-3">
                  <h5 className="text-xs font-bold text-white uppercase tracking-widest">Grounding Prompts Evaluated</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metadata.framedQuestions.map((q: string, idx: number) => (
                      <div key={idx} className="p-3 bg-black/40 border border-white/[0.03] rounded-lg text-xs leading-relaxed text-zinc-300">
                        <span className="text-accent font-mono font-bold mr-2">Q{idx + 1}.</span>
                        "{q}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
