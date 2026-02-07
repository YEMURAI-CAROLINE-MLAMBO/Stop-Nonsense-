import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export const JobTrackingScreen = ({ route, navigation }: any) => {
  const { incident } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Response</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Navigation to: {incident.address}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>USER ADDRESS</Text>
        <Text style={styles.value}>{incident.address}</Text>

        <Text style={styles.label}>ACCESS INFO</Text>
        <Text style={styles.value}>{incident.accessMethod}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.arrivedButton}>
          <Text style={styles.buttonText}>I HAVE ARRIVED (ON-SITE)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resolvedButton}>
          <Text style={styles.buttonText}>INCIDENT RESOLVED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#888',
  },
  info: {
    padding: 25,
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
    marginTop: 20,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  actions: {
    padding: 20,
    gap: 15,
  },
  arrivedButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  resolvedButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
