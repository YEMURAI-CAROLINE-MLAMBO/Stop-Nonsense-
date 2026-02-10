import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export const App = () => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [aiStatus, setAiStatus] = useState('Standby');

  const toggleDuty = () => {
    setIsOnDuty(!isOnDuty);
    setAiStatus(isOnDuty ? 'Standby' : 'AI Optimal Route Analysis Active');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>RESPONDER<Text style={{color: '#E0040B'}}>HUB</Text></Text>
          <View style={styles.aiBadge}>
             <Text style={styles.aiBadgeText}>AI PATHFINDING: {isOnDuty ? 'LIVE' : 'OFF'}</Text>
          </View>
        </View>

        <View style={styles.main}>
          {!isOnDuty ? (
            <View style={styles.offDutyContainer}>
               <Text style={styles.offDutyText}>YOU ARE CURRENTLY OFF-DUTY</Text>
               <Text style={styles.offDutySubtext}>Toggle 'On-Duty' to receive AI-optimized dispatches.</Text>
            </View>
          ) : (
            <ScrollView style={styles.activeDutyContainer}>
               <View style={styles.statusCard}>
                  <Text style={styles.cardLabel}>AI STRATEGY</Text>
                  <Text style={styles.cardValue}>Predictive positioning at Sandton Sector 4</Text>
               </View>
               <View style={[styles.statusCard, { borderColor: '#E0040B' }]}>
                  <Text style={styles.cardLabel}>CURRENT STATUS</Text>
                  <Text style={styles.cardValue}>Awaiting Panic Signal...</Text>
               </View>
            </ScrollView>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.aiStatusText}>{aiStatus}</Text>
          <TouchableOpacity
            style={[styles.dutyButton, isOnDuty ? styles.dutyOn : styles.dutyOff]}
            onPress={toggleDuty}
          >
            <Text style={styles.dutyButtonText}>
              {isOnDuty ? 'GO OFF-DUTY' : 'GO ON-DUTY'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
  },
  aiBadge: {
    backgroundColor: 'rgba(224, 4, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(224, 4, 11, 0.3)',
  },
  aiBadgeText: {
    color: '#E0040B',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  offDutyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offDutyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offDutySubtext: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
  activeDutyContainer: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  aiStatusText: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  dutyButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  dutyOff: {
    backgroundColor: '#E0040B',
  },
  dutyOn: {
    backgroundColor: '#333',
  },
  dutyButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default App;
