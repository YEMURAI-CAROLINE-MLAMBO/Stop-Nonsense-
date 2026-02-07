import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

export const SupportScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>How can we help?</Text>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Report a False Alarm</Text>
          <Text style={styles.cardDesc}>If you accidentally triggered a panic signal.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Account & Billing</Text>
          <Text style={styles.cardDesc}>Questions about your payment or profile.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Contacts</Text>
          <Text style={styles.cardDesc}>Manage who gets notified in an emergency.</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.supportInfo}>InstantGuard Support is available 24/7.</Text>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText}>Chat with an Agent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardDesc: { fontSize: 14, color: '#666', marginTop: 5 },
  footer: { marginTop: 40, alignItems: 'center' },
  supportInfo: { color: '#999', marginBottom: 20 },
  chatButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  chatButtonText: { color: '#FFF', fontWeight: 'bold' }
});
