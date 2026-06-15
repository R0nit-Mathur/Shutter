'use client';

import { useState } from 'react';

interface ScanInputFormProps {
  onSubmit: (data: { name: string; category: string; description: string; engines: string[] }) => void;
  isLoading: boolean;
}

const ENGINE_OPTIONS = [
  { id: 'openai', label: 'OpenAI GPT-4o' },
  { id: 'gemini', label: 'Gemini 2.5 Flash' },
  { id: 'claude', label: 'Claude 3.5 Sonnet' },
  { id: 'perplexity', label: 'Perplexity Search' }
];

const PRESET_BRANDS = [
  { name: 'Linear', category: 'Project Management Software', desc: 'A fast keyboard-first task manager for engineering teams.' },
  { name: 'Supabase', category: 'Developer Database Platform', desc: 'An open-source Firebase alternative utilizing PostgreSQL.' },
  { name: 'HubSpot', category: 'B2B Sales CRM', desc: 'A user-friendly pipeline management and marketing automation platform.' }
];

export default function ScanInputForm({ onSubmit, isLoading }: ScanInputFormProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEngines, setSelectedEngines] = useState<string[]>(['openai', 'gemini', 'claude', 'perplexity']);

  const handleToggleEngine = (id: string) => {
    setSelectedEngines(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const applyPreset = (preset: typeof PRESET_BRANDS[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setDescription(preset.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) {
      alert('Please fill out both the Brand Name and Category fields.');
      return;
    }
    if (selectedEngines.length === 0) {
      alert('Please select at least one AI engine to scan.');
      return;
    }
    onSubmit({
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      engines: selectedEngines
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.01] border border-white/[0.05] p-8 rounded-2xl">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Audit Launchpad</h3>
        <p className="text-xs text-text-secondary">Run multi-model AEO audits against LLM parameter indexes.</p>
      </div>

      {/* Preset Badges */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
          Quick Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_BRANDS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.01] hover:border-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              + {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Name & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">Brand / Product Name</label>
            <input
              type="text"
              placeholder="e.g. Linear"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full bg-brand-bg border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">Industry Category</label>
            <input
              type="text"
              placeholder="e.g. Project Management"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isLoading}
              className="w-full bg-brand-bg border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider block">Short Description (Optional)</label>
          <textarea
            placeholder="A brief overview of features, target audience, and positioning..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            rows={3}
            className="w-full bg-brand-bg border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Engine Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-white uppercase tracking-wider block">
            Target AI Search Engines
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ENGINE_OPTIONS.map((engine) => {
              const isChecked = selectedEngines.includes(engine.id);
              return (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => handleToggleEngine(engine.id)}
                  disabled={isLoading}
                  className={`text-center py-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'border-white/[0.08] bg-brand-bg text-text-secondary hover:text-white hover:border-white/20'
                  }`}
                >
                  {engine.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-white text-brand-bg hover:bg-white/95 disabled:opacity-50 font-semibold text-sm rounded-xl text-center transition-all duration-200 hover:shadow-xl hover:shadow-white/5 cursor-pointer"
      >
        {isLoading ? 'Scanning AI Engine Indexes...' : 'Run Diagnostics Scan'}
      </button>
    </form>
  );
}
