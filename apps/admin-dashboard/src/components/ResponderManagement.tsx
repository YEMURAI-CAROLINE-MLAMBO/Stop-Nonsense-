import React, { useState } from 'react';

export const ResponderManagement = () => {
  const [responders, setResponders] = useState([
    { id: '1', name: 'Sipho K.', psira: '1234567', status: 'VETTED' },
    { id: '2', name: 'Bonga N.', psira: '7654321', status: 'PENDING' },
  ]);

  return (
    <div style={styles.container}>
      <h2>Responder Management</h2>
      <div style={styles.grid}>
        {responders.map(r => (
          <div key={r.id} style={styles.card}>
            <h3>{r.name}</h3>
            <p>PSIRA: {r.psira}</p>
            <div style={{...styles.status, color: r.status === 'PENDING' ? '#F44336' : '#4CAF50'}}>
              {r.status}
            </div>
            {r.status === 'PENDING' && (
              <button style={styles.approveBtn}>Approve & Activate</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  status: { fontWeight: 'bold', margin: '10px 0' },
  approveBtn: { backgroundColor: '#000', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', width: '100%' }
};
