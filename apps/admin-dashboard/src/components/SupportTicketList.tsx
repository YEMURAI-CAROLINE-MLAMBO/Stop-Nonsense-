import React, { useState } from 'react';

export const SupportTicketList = () => {
  const [tickets, setTickets] = useState([
    { id: '1', user: 'Thabo M.', subject: 'Payment Issue', status: 'OPEN', date: '10m ago' },
    { id: '2', user: 'Lerato S.', subject: 'False Alarm', status: 'IN_PROGRESS', date: '1h ago' },
  ]);

  return (
    <div style={styles.container}>
      <h2>Active Support Tickets</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>{t.user}</td>
              <td>{t.subject}</td>
              <td><span style={{...styles.badge, backgroundColor: t.status === 'OPEN' ? '#E53935' : '#2196F3'}}>{t.status}</span></td>
              <td>{t.date}</td>
              <td><button style={styles.btn}>Reply</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { marginTop: '30px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFF', borderRadius: '8px', overflow: 'hidden' },
  badge: { color: '#FFF', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  btn: { padding: '5px 15px', borderRadius: '4px', border: '1px solid #DDD', cursor: 'pointer' }
};
