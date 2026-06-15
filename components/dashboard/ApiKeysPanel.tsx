'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeysPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeysPanel({ isOpen, onClose }: ApiKeysPanelProps) {
  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [perplexityKey, setPerplexityKey] = useState('');

  const [showOpenai, setShowOpenai] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [showPerplexity, setShowPerplexity] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load keys from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOpenaiKey(localStorage.getItem('shutter_openai_key') || '');
      setGeminiKey(localStorage.getItem('shutter_gemini_key') || '');
      setAnthropicKey(localStorage.getItem('shutter_anthropic_key') || '');
      setPerplexityKey(localStorage.getItem('shutter_perplexity_key') || '');
    }
  }, [isOpen]);

  const handleSave = () => {
    setIsSaving(true);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('shutter_openai_key', openaiKey.trim());
      localStorage.setItem('shutter_gemini_key', geminiKey.trim());
      localStorage.setItem('shutter_anthropic_key', anthropicKey.trim());
      localStorage.setItem('shutter_perplexity_key', perplexityKey.trim());
    }

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 500);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all local API keys?')) {
      setOpenaiKey('');
      setGeminiKey('');
      setAnthropicKey('');
      setPerplexityKey('');
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shutter_openai_key');
        localStorage.removeItem('shutter_gemini_key');
        localStorage.removeItem('shutter_anthropic_key');
        localStorage.removeItem('shutter_perplexity_key');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-bg border-l border-white/[0.08] shadow-2xl z-50 p-8 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white">API Configurations</h3>
                  <p className="text-xs text-text-secondary mt-1">Configure your custom LLM API keys.</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Notice */}
              <div className="p-4 border border-accent/20 bg-accent/5 rounded-xl mb-6 text-xs text-zinc-300 leading-relaxed">
                💡 **Host Override Mode**: If you leave these keys blank, Shutter will automatically query using the host server's default keys. Enter your own keys to bypass rate limits or use custom accounts.
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* OpenAI */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">OpenAI API Key</label>
                    <button
                      onClick={() => setShowOpenai(!showOpenai)}
                      className="text-[10px] text-accent font-semibold hover:underline cursor-pointer"
                    >
                      {showOpenai ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <input
                    type={showOpenai ? 'text' : 'password'}
                    placeholder="sk-proj-..."
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
                  />
                </div>

                {/* Gemini */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">Gemini API Key</label>
                    <button
                      onClick={() => setShowGemini(!showGemini)}
                      className="text-[10px] text-accent font-semibold hover:underline cursor-pointer"
                    >
                      {showGemini ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <input
                    type={showGemini ? 'text' : 'password'}
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
                  />
                </div>

                {/* Anthropic (Claude) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">Anthropic Claude Key</label>
                    <button
                      onClick={() => setShowAnthropic(!showAnthropic)}
                      className="text-[10px] text-accent font-semibold hover:underline cursor-pointer"
                    >
                      {showAnthropic ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <input
                    type={showAnthropic ? 'text' : 'password'}
                    placeholder="sk-ant-..."
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
                  />
                </div>

                {/* Perplexity */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">Perplexity API Key</label>
                    <button
                      onClick={() => setShowPerplexity(!showPerplexity)}
                      className="text-[10px] text-accent font-semibold hover:underline cursor-pointer"
                    >
                      {showPerplexity ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <input
                    type={showPerplexity ? 'text' : 'password'}
                    placeholder="pplx-..."
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-accent text-sm rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="border-t border-white/[0.05] pt-6 flex flex-col gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3.5 bg-white text-brand-bg hover:bg-white/90 disabled:opacity-50 text-sm font-semibold rounded-xl text-center transition-all duration-200 cursor-pointer"
              >
                {isSaving ? 'Saving...' : saveSuccess ? '✓ Saved Keys' : 'Save Configurations'}
              </button>
              <button
                onClick={handleClear}
                className="w-full py-3.5 border border-white/10 hover:bg-white/5 text-xs font-semibold rounded-xl text-center text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                Clear All Keys
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
