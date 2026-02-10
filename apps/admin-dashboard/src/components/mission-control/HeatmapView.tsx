import React from 'react';

interface Hotspot {
  lat: number;
  lng: number;
  intensity: number;
  reason: string;
}

interface HeatmapViewProps {
  hotspots: Hotspot[];
  onRefresh: () => void;
}

export const HeatmapView: React.FC<HeatmapViewProps> = ({ hotspots, onRefresh }) => {
  return (
    <div className="lg:col-span-2 card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold uppercase italic">AI Predictive Hotspots</h2>
        <button
          onClick={onRefresh}
          className="px-4 py-1 text-xs border border-[#444] rounded hover:bg-white/10 transition"
        >
          Refresh Analysis
        </button>
      </div>
      <div className="aspect-video bg-black/40 rounded-lg relative overflow-hidden border border-[#333] flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full border-[20px] border-white/5 grid grid-cols-8 grid-rows-8" />
         </div>
         <div className="relative w-full h-full">
            {hotspots.map((spot, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[var(--brand-red)]/40 blur-xl pulse"
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
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-red)]" />
                {spot.reason}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
