'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Hotspot {
  lat: number;
  lng: number;
  intensity: number;
  reason: string;
}

interface AccessLog {
  sender: string;
  text: string;
}

export default function MissionControl() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [systemStatus, setSystemStatus] = useState('Standby');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setSystemStatus('Active');
      newSocket.emit('getPredictiveHotspots');
    });

    newSocket.on('predictiveHotspotsUpdate', (data: Hotspot[]) => {
      setHotspots(data);
    });

    newSocket.on('accessCoordinationUpdate', (data: { log: AccessLog[] }) => {
      setAccessLogs(prev => [...data.log, ...prev].slice(0, 10));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const triggerSimulation = () => {
    socket?.emit('coordinateAccess', {
      incidentId: 'demo-123',
      address: '15 Alice Lane, Sandton',
      contactType: 'Gate Guard'
    });
  };

  return (
    <div className="min-h-screen p-8 rb-gradient">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-black glitch-text italic text-white mb-2">
            Instant<span className="text-[var(--rb-red)]">Guard</span>
          </h1>
          <p className="text-[var(--text-secondary)] uppercase tracking-widest text-sm">
            AI Mission Control // South Africa
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${systemStatus === 'Active' ? 'bg-green-500 pulse' : 'bg-yellow-500'}`} />
          <span className="font-mono text-sm">{systemStatus}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Predictive Heatmap Visual */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold uppercase italic">AI Predictive Hotspots</h2>
            <button
              onClick={() => socket?.emit('getPredictiveHotspots')}
              className="px-4 py-1 text-xs border border-[#444] rounded hover:bg-white/10 transition"
            >
              Refresh Analysis
            </button>
          </div>
          <div className="aspect-video bg-black/40 rounded-lg relative overflow-hidden border border-[#333] flex items-center justify-center">
             {/* Mock Map Representation */}
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full border-[20px] border-white/5 grid grid-cols-8 grid-rows-8" />
             </div>
             <div className="relative w-full h-full">
                {hotspots.map((spot, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-[var(--rb-red)]/40 blur-xl pulse"
                    style={{
                      left: `${(spot.lng - 28.04) * 2000}%`,
                      top: `${(spot.lat + 26.12) * 2000}%`,
                      width: `${spot.intensity * 200}px`,
                      height: `${spot.intensity * 200}px`,
                    }}
                  />
                ))}
             </div>
             <div className="absolute bottom-4 left-4 z-10">
                {hotspots.map((spot, i) => (
                  <div key={i} className="text-[10px] text-white/60 mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rb-red)]" />
                    {spot.reason}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* AI Access Coordination Logs */}
        <div className="card flex flex-col">
          <h2 className="text-xl font-bold uppercase italic mb-6">AI Access Intelligence</h2>
          <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
            {accessLogs.length === 0 && (
              <p className="text-center text-[var(--text-secondary)] text-sm italic mt-20">
                Waiting for dispatch signal...
              </p>
            )}
            {accessLogs.map((log, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${log.sender === 'AI Agent' ? 'bg-[var(--rb-blue)]/20 border-l-2 border-[var(--rb-blue)]' : 'bg-white/5 border-l-2 border-[#555]'}`}>
                <span className="block text-[10px] uppercase font-bold mb-1 text-[var(--text-secondary)]">{log.sender}</span>
                {log.text}
              </div>
            ))}
          </div>
          <button
            onClick={triggerSimulation}
            className="w-full py-4 bg-[var(--rb-red)] hover:bg-red-700 text-white font-bold uppercase italic tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/20"
          >
            Simulate Panic Trigger
          </button>
        </div>

        {/* Secondary Insights Section */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 flex flex-col justify-center border-l-4 border-[var(--rb-yellow)]">
            <span className="text-[10px] uppercase text-[var(--text-secondary)]">Avg. Response Time</span>
            <span className="text-3xl font-black italic">4:12 <small className="text-xs uppercase opacity-50">min</small></span>
          </div>
          <div className="card p-4 flex flex-col justify-center border-l-4 border-green-500">
            <span className="text-[10px] uppercase text-[var(--text-secondary)]">On-Duty Units</span>
            <span className="text-3xl font-black italic">24</span>
          </div>
          <div className="card p-4 flex flex-col justify-center border-l-4 border-[var(--rb-blue)]">
            <span className="text-[10px] uppercase text-[var(--text-secondary)]">AI Coverage</span>
            <span className="text-3xl font-black italic">98.2%</span>
          </div>
          <div className="card p-4 flex flex-col justify-center border-l-4 border-red-500">
            <span className="text-[10px] uppercase text-[var(--text-secondary)]">Incidents Resolved</span>
            <span className="text-3xl font-black italic">1,402</span>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-white/20">
        Proprietary AI Engine // InstantGuard Platform v0.1.0-alpha
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
