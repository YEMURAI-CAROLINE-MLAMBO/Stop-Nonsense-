import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';

export const AlertOverlay = ({ visible, incident, onAccept, onDecline }: any) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.alertTitle}>EMERGENCY ALERT</Text>

          <View style={styles.details}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.address}>{incident.address}</Text>

            <Text style={styles.label}>ACCESS</Text>
            <Text style={styles.access}>{incident.accessMethod}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.decline} onPress={onDecline}>
              <Text style={styles.buttonText}>DECLINE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accept} onPress={onAccept}>
              <Text style={styles.buttonText}>ACCEPT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F44336',
    marginBottom: 20,
  },
  details: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
    marginTop: 15,
  },
  address: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  access: {
    fontSize: 18,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  accept: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  decline: {
    flex: 1,
    backgroundColor: '#EEE',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
});
