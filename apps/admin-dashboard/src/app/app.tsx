import React, { useState } from 'react';
import { StatsOverview } from '../components/StatsOverview';
import { SupportTicketList } from '../components/SupportTicketList';
import { ResponderManagement } from '../components/ResponderManagement';
import { InsightsView } from '../components/InsightsView';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.left}>
          <h1 style={styles.title}>InstantGuard Admin</h1>
          <nav style={styles.nav}>
            <button onClick={() => setActiveTab('dashboard')} style={{...styles.navBtn, color: activeTab === 'dashboard' ? '#FFF' : '#AAA'}}>Dashboard</button>
            <button onClick={() => setActiveTab('responders')} style={{...styles.navBtn, color: activeTab === 'responders' ? '#FFF' : '#AAA'}}>Responders</button>
            <button onClick={() => setActiveTab('insights')} style={{...styles.navBtn, color: activeTab === 'insights' ? '#FFF' : '#AAA'}}>Insights</button>
            <button onClick={() => setActiveTab('support')} style={{...styles.navBtn, color: activeTab === 'support' ? '#FFF' : '#AAA'}}>Support</button>
          </nav>
        </div>
        <div style={styles.user}>System Administrator</div>
      </header>

      <main style={styles.main}>
        {activeTab === 'dashboard' && (
          <>
            <StatsOverview />
            <div style={styles.contentGrid}>
              <section style={styles.section}>
                <h2>Live Incident Map</h2>
                <div style={styles.mapPlaceholder}>
                  Interactive Map showing Johannesburg (Sandton/Fourways)
                  <br />
                  [3 Active Incidents | 12 Responders]
                </div>
              </section>

              <section style={styles.section}>
                <h2>Recent Incidents</h2>
                <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IG-982</td>
                  <td>John D.</td>
                  <td>12 Rivonia Rd</td>
                  <td><span style={styles.badge}>En Route</span></td>
                  <td>14:02</td>
                </tr>
                <tr>
                  <td>IG-981</td>
                  <td>Sarah M.</td>
                  <td>45 William Nicol Dr</td>
                  <td><span style={{ ...styles.badge, backgroundColor: '#4CAF50' }}>Resolved</span></td>
                  <td>13:45</td>
                </tr>
              </tbody>
                </table>
              </section>
            </div>
          </>
        )}

        {activeTab === 'responders' && <ResponderManagement />}
        {activeTab === 'insights' && <InsightsView />}
        {activeTab === 'support' && <SupportTicketList />}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: '#F5F7F9',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#000',
    color: '#FFF',
    padding: '10px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { display: 'flex', alignItems: 'center', gap: '40px' },
  nav: { display: 'flex', gap: '20px' },
  navBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' },
  title: { margin: 0, fontSize: '20px' },
  main: { padding: '40px' },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '30px',
  },
  section: {
    backgroundColor: '#FFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  mapPlaceholder: {
    height: '400px',
    backgroundColor: '#EEE',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#888',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  badge: {
    backgroundColor: '#FF9800',
    color: '#FFF',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  }
};

export default App;
