import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { PanicButton } from '@instant-guard/ui';
import { translations } from '@instant-guard/i18n';
import { useVoiceAssistance } from '@instant-guard/voice';
import { useEffect } from 'react';

export const HomeScreen = ({ navigation }: any) => {
  const { startListening, recognizedText } = useVoiceAssistance();
  const [isDispatching, setIsDispatching] = useState(false);
  const t = translations.en; // Mocking translation for now

  const handlePanic = () => {
    setIsDispatching(true);
    startListening();
    // In a real app, this triggers the Socket.io event 'triggerPanic'
    setTimeout(() => {
      navigation.navigate('IncidentTracking', { incidentId: 'IG-' + Math.floor(Math.random() * 1000) });
    }, 2000);
  };

  useEffect(() => {
    if (recognizedText.toLowerCase().includes('help')) {
      handlePanic();
    }
  }, [recognizedText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.welcome}</Text>
        <Text style={styles.reassurance}>{t.reassurance_msg}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <PanicButton onTrigger={handlePanic} countdownSeconds={8} />
      </View>

      <View style={styles.footerNav}>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Support')}>
          <Text style={styles.navText}>Support</Text>
        </TouchableOpacity>
      </View>

      {isDispatching && (
        <View style={styles.statusOverlay}>
          <Text style={styles.statusText}>{t.dispatching}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reassurance: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusOverlay: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E53935',
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  navText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  }
});
