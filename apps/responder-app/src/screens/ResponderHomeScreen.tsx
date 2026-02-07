import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { translations } from '@instant-guard/i18n';

export const ResponderHomeScreen = ({ navigation }: any) => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const t = translations.en;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Responder Dashboard</Text>
        <Text style={styles.status}>
          Status: {isOnDuty ? 'ONLINE' : 'OFFLINE'}
        </Text>
      </View>

      <View style={styles.center}>
        <TouchableOpacity
          style={[styles.dutyButton, isOnDuty ? styles.offDuty : styles.onDuty]}
          onPress={() => setIsOnDuty(!isOnDuty)}
        >
          <Text style={styles.buttonText}>
            {isOnDuty ? 'GO OFF DUTY' : 'GO ON DUTY'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.instruction}>
          {isOnDuty
            ? "You are now visible to dispatch. Stay alert!"
            : "Go on duty to start receiving emergency alerts."}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Jobs Today</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>R0.00</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  status: {
    marginTop: 5,
    color: '#AAA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dutyButton: {
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  onDuty: {
    backgroundColor: '#4CAF50',
  },
  offDuty: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instruction: {
    marginTop: 40,
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#333',
    padding: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  }
});
