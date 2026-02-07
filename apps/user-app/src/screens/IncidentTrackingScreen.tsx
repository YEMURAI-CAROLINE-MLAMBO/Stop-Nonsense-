import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useVoiceAssistance } from '@instant-guard/voice';

export const IncidentTrackingScreen = ({ route }: any) => {
  const { speakReassurance } = useVoiceAssistance();
  const { incidentId } = route?.params || { incidentId: 'TEST-123' };

  useEffect(() => {
    // Simulate receiving responder info after dispatch
    setTimeout(() => {
      speakReassurance('Sipho', 4);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Real-time Map tracking Responder...</Text>
      </View>
      <View style={styles.statusBox}>
        <Text style={styles.statusTitle}>Help is on the way!</Text>
        <Text style={styles.statusDesc}>Responder is approximately 4 minutes away.</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '60%' }]} />
        </View>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>INCIDENT ID</Text>
        <Text style={styles.value}>{incidentId}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  mapPlaceholder: { flex: 1, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' },
  mapText: { color: '#888', fontWeight: 'bold' },
  statusBox: { padding: 25, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, elevation: 10 },
  statusTitle: { fontSize: 22, fontWeight: 'bold', color: '#E53935' },
  statusDesc: { fontSize: 16, color: '#666', marginTop: 5 },
  progressBar: { height: 6, backgroundColor: '#EEE', borderRadius: 3, marginTop: 20, overflow: 'hidden' },
  progress: { height: '100%', backgroundColor: '#E53935' },
  infoBox: { padding: 25, borderTopWidth: 1, borderTopColor: '#EEE' },
  label: { fontSize: 12, color: '#AAA', fontWeight: 'bold' },
  value: { fontSize: 16, fontWeight: '600', marginTop: 5 }
});
