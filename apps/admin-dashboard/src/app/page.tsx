'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { HeatmapView } from '../components/mission-control/HeatmapView';
import { AccessIntelligence } from '../components/mission-control/AccessIntelligence';
import { StatCard } from '../components/mission-control/StatCard';

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
      incidentId: `demo-${Math.floor(Math.random() * 1000)}`,
      address: '15 Alice Lane, Sandton',
      contactType: 'Gate Guard'
    });
  };

  return (
    <div className="min-h-screen p-8 brand-gradient">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-5xl font-black glitch-text italic text-white mb-2">
            Instant<span className="text-[var(--brand-red)]">Guard</span>
          </h1>
          <p className="text-[var(--text-secondary)] uppercase tracking-widest text-sm">
            AI Mission Control // South Africa
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${systemStatus === 'Active' ? 'bg-green-500 pulse' : 'bg-yellow-500'}`} />
          <span className="font-mono text-sm uppercase tracking-tighter">{systemStatus}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <HeatmapView
          hotspots={hotspots}
          onRefresh={() => socket?.emit('getPredictiveHotspots')}
        />
        <AccessIntelligence
          logs={accessLogs}
          onSimulate={triggerSimulation}
        />
      </main>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Avg. Response Time" value="4:12" unit="min" borderColor="var(--brand-yellow)" />
        <StatCard label="On-Duty Units" value="24" borderColor="#22c55e" />
        <StatCard label="AI Coverage" value="98.2%" borderColor="var(--brand-blue)" />
        <StatCard label="Incidents Resolved" value="1,402" borderColor="#ef4444" />
      </section>

      <footer className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-[0.2em] text-white/20">
        Proprietary AI Engine // InstantGuard Platform v0.1.0-alpha
      </footer>
    </div>
  );
}
