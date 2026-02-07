import React from 'react';

export const InsightsView = () => {
  return (
    <div style={styles.container}>
      <h2>Advanced Insights & Heatmaps</h2>
      <div style={styles.grid}>
        <div style={styles.chartPlaceholder}>
          <h3>Incident Density (Heatmap)</h3>
          <div style={styles.box}>[Map Visualization: High density in Sandton CBD]</div>
        </div>
        <div style={styles.chartPlaceholder}>
          <h3>Response Time Trends</h3>
          <div style={styles.box}>[Line Chart: Improving by 15% WoW]</div>
        </div>
        <div style={styles.chartPlaceholder}>
          <h3>Responder Utilization</h3>
          <div style={styles.box}>[Bar Chart: Peak demand between 18:00 - 22:00]</div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: '30px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
  chartPlaceholder: { backgroundColor: '#FFF', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  box: { height: '200px', backgroundColor: '#F9F9F9', border: '1px dashed #DDD', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }
};
