import React from 'react';

export const StatsOverview = () => {
  const stats = [
    { label: 'Active Incidents', value: 3, color: '#E53935' },
    { label: 'Avg. Response Time', value: '4m 12s', color: '#4CAF50' },
    { label: 'Responders Online', value: 12, color: '#2196F3' },
    { label: 'Total Incidents Today', value: 45, color: '#FF9800' },
  ];

  return (
    <div style={styles.container}>
      {stats.map((s) => (
        <div key={s.label} style={{ ...styles.card, borderLeft: `5px solid ${s.color}` }}>
          <div style={styles.label}>{s.label}</div>
          <div style={styles.value}>{s.value}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  label: {
    color: '#666',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  value: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};
