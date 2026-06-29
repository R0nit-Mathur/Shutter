'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScanInputForm from './ScanInputForm';
import LoadingProgress from './LoadingProgress';
import AuditReportView from './AuditReportView';
import ApiKeysPanel from './ApiKeysPanel';

export default function AeoDashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [pendingResult, setPendingResult] = useState<any>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const [isKeysOpen, setIsKeysOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Load scan history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem('shutter_scan_history');
      if (storedHistory) {
        try {
          setHistory(JSON.parse(storedHistory));
        } catch (e) {
          console.error('Failed to parse scan history:', e);
        }
      }
    }
  }, []);

  const handleRunScan = async (data: { 
    website: string; 
    name: string; 
    description: string; 
    competitors: string; 
    engines: string[]; 
  }) => {
    setIsScanning(true);
    setIsReady(false);
    setPendingResult(null);
    setScanResult(null);
    setActiveEngines(data.engines);

    try {
      // Gather keys from localStorage to forward in headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (typeof window !== 'undefined') {
        const oKey = localStorage.getItem('shutter_openai_key');
        const gKey = localStorage.getItem('shutter_gemini_key');
        const cKey = localStorage.getItem('shutter_anthropic_key');
        const pKey = localStorage.getItem('shutter_perplexity_key');

        if (oKey) headers['x-openai-key'] = oKey;
        if (gKey) headers['x-gemini-key'] = gKey;
        if (cKey) headers['x-anthropic-key'] = cKey;
        if (pKey) headers['x-perplexity-key'] = pKey;
      }

      const response = await fetch('/api/aeo', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          website: data.website,
          name: data.name,
          description: data.description,
          competitors: data.competitors,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Diagnostic scan request failed.');
      }

      const result = await response.json();
      setPendingResult(result);
      
      // Add result to history log
      const updatedHistory = [result, ...history.filter(h => h.metadata?.timestamp !== result.metadata?.timestamp)].slice(0, 10);
      setHistory(updatedHistory);
      if (typeof window !== 'undefined') {
        localStorage.setItem('shutter_scan_history', JSON.stringify(updatedHistory));
      }

      // Trigger transition sequence inside LoadingProgress
      setIsReady(true);

    } catch (error: any) {
      console.error(error);
      alert(`❌ Diagnostic Scan Failed: ${error.message || error}`);
      setIsScanning(false);
    }
  };

  const handleRevealComplete = () => {
    // Unmount loading HUD, mount final report and trigger fade-out white transition
    setScanResult(pendingResult);
    setIsScanning(false);
    setIsReady(false);
    setIsRevealing(true);
  };

  const handleSelectHistory = (pastResult: any) => {
    setScanResult(pastResult);
  };

  const handleClearHistory = () => {
    if (confirm('Clear all cached scan records?')) {
      setHistory([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shutter_scan_history');
      }
    }
  };

  const handleResetForm = () => {
    setScanResult(null);
    setPendingResult(null);
  };

  return (
    <div className="w-full h-full flex overflow-hidden relative">
      
      {/* 1. Left Console Sidebar */}
      <aside className="w-[320px] shrink-0 border-r border-white/[0.05] bg-white/[0.01] p-6 flex flex-col justify-between h-full overflow-y-auto">
        <div>
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              AI Visibility Console
            </span>
            <button
              onClick={() => setIsKeysOpen(true)}
              className="text-[10px] text-accent font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              ⚙ Keys Setup
            </button>
          </div>

          {/* History Logs */}
          <div className="space-y-4">
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">
              Recent Scans
            </span>
            {history.length === 0 ? (
              <span className="text-xs text-text-secondary italic block py-4">
                No past scans recorded.
              </span>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                {history.map((pastScan, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectHistory(pastScan)}
                    className={`w-full text-left text-xs font-medium p-3 rounded-xl border transition-all cursor-pointer block truncate ${
                      scanResult?.metadata?.timestamp === pastScan.metadata?.timestamp
                        ? 'border-accent/40 bg-accent/5 text-accent'
                        : 'border-white/[0.03] text-text-secondary hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className="font-semibold block truncate">{pastScan.metadata?.productName || 'Unnamed'}</span>
                    <span className="text-[10px] text-text-secondary opacity-65 block truncate mt-1">
                      {pastScan.metadata?.website ? pastScan.metadata.website.replace(/^https?:\/\//i, '') : 'No url'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Settings / Actions */}
        <div className="border-t border-white/[0.05] pt-6 mt-6 flex flex-col gap-3">
          {scanResult && !isScanning && (
            <button
              onClick={handleResetForm}
              className="w-full py-3 bg-white text-brand-bg hover:bg-white/90 font-semibold text-xs rounded-xl text-center transition-all cursor-pointer"
            >
              + New Audit
            </button>
          )}
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="w-full py-3 border border-white/10 hover:bg-white/5 text-text-secondary hover:text-white font-semibold text-[10px] rounded-xl text-center transition-all cursor-pointer"
            >
              Clear History
            </button>
          )}
        </div>
      </aside>

      {/* 2. Right Workspace Content (Scan execution outputs) */}
      <main className="flex-grow h-full overflow-y-auto p-8 bg-black/10">
        {scanResult ? (
          <AuditReportView report={scanResult} />
        ) : (
          <div className="max-w-4xl mx-auto py-12">
            <ScanInputForm onSubmit={handleRunScan} isLoading={isScanning} />
          </div>
        )}
      </main>

      {/* Full screen Temporal Loom overlay */}
      {isScanning && (
        <LoadingProgress 
          engines={activeEngines} 
          isReady={isReady} 
          onRevealComplete={handleRevealComplete}
        />
      )}

      {/* White circle reveal zoom transition overlay */}
      {isRevealing && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onAnimationComplete={() => setIsRevealing(false)}
          className="fixed inset-0 bg-white z-[60] pointer-events-none"
        />
      )}

    </div>
  );
}
