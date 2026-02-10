import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  borderColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, unit, borderColor }) => {
  return (
    <div className="card p-4 flex flex-col justify-center border-l-4" style={{ borderColor }}>
      <span className="text-[10px] uppercase text-[var(--text-secondary)]">{label}</span>
      <span className="text-3xl font-black italic">
        {value} {unit && <small className="text-xs uppercase opacity-50">{unit}</small>}
      </span>
    </div>
  );
};
