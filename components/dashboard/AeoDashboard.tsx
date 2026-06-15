'use client';

import { useState, useEffect } from 'react';
import ScanInputForm from './ScanInputForm';
import LoadingProgress from './LoadingProgress';
import AuditReportView from './AuditReportView';
import ApiKeysPanel from './ApiKeysPanel';

export default function AeoDashboard() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const [isKeysOpen, setIsKeysOpen] = useState(false);

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

  const handleRunScan = async (data: { name: string; category: string; description: string; engines: string[] }) => {
    setIsScanning(true);
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
          name: data.name,
          category: data.category,
          description: data.description,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Diagnostic scan request failed.');
      }

      const result = await response.json();
      setScanResult(result);

      // Append results to cache log history
      const updatedHistory = [result, ...history.filter(h => h.metadata.timestamp !== result.metadata.timestamp)].slice(0, 10);
      setHistory(updatedHistory);
      if (typeof window !== 'undefined') {
        localStorage.setItem('shutter_scan_history', JSON.stringify(updatedHistory));
      }

    } catch (error: any) {
      console.error(error);
      alert(`❌ Diagnostic Scan Failed: ${error.message || error}`);
    } finally {
      setIsScanning(false);
    }
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
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Console Panel (Scans list & Keys triggers) */}
        <div className="lg:col-span-3 flex flex-col justify-between border border-white/[0.05] bg-white/[0.01] rounded-2xl p-6 min-h-[300px] lg:min-h-0">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
              <span className="text-xs font-bold text-white uppercase tracking-widest">
                AEO Console
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
                      <span className="font-semibold block truncate">{pastScan.metadata.productName}</span>
                      <span className="text-[10px] text-text-secondary opacity-65 block truncate mt-1">
                        {pastScan.metadata.productCategory}
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
        </div>

        {/* Right Dashboard Area (Scan execution outputs) */}
        <div className="lg:col-span-9 flex flex-col justify-start">
          {isScanning ? (
            <LoadingProgress engines={activeEngines} />
          ) : scanResult ? (
            <AuditReportView report={scanResult} />
          ) : (
            <ScanInputForm onSubmit={handleRunScan} isLoading={isScanning} />
          )}
        </div>

      </div>

      {/* Slide-out API settings drawer */}
      <ApiKeysPanel isOpen={isKeysOpen} onClose={() => setIsKeysOpen(false)} />
    </div>
  );
}
