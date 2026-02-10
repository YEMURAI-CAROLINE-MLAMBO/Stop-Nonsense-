import React from 'react';

interface AccessLog {
  sender: string;
  text: string;
}

interface AccessIntelligenceProps {
  logs: AccessLog[];
  onSimulate: () => void;
}

export const AccessIntelligence: React.FC<AccessIntelligenceProps> = ({ logs, onSimulate }) => {
  return (
    <div className="card flex flex-col h-full">
      <h2 className="text-xl font-bold uppercase italic mb-6">AI Access Intelligence</h2>
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-30">
             <span className="text-4xl mb-4">📡</span>
             <p className="text-center text-sm italic">
                Scanning for dispatch signals...
             </p>
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} className={`p-3 rounded-lg text-sm transition-all duration-500 animate-in slide-in-from-right-2 ${
            log.sender === 'AI Agent'
              ? 'bg-[var(--brand-blue)]/20 border-l-2 border-[var(--brand-blue)]'
              : 'bg-white/5 border-l-2 border-[#555]'
          }`}>
            <span className="block text-[10px] uppercase font-bold mb-1 text-[var(--text-secondary)]">{log.sender}</span>
            {log.text}
          </div>
        ))}
      </div>
      <button
        onClick={onSimulate}
        className="w-full py-4 bg-[var(--brand-red)] hover:bg-red-700 text-white font-bold uppercase italic tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/20"
      >
        Simulate Panic Trigger
      </button>
    </div>
  );
};
