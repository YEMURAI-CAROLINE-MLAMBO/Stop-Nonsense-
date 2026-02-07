import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { translations } from '@instant-guard/i18n';

export const OnboardingScreen = ({ navigation }: any) => {
  const t = translations.en;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Setup InstantGuard</Text>
        <Text style={styles.description}>
          To provide the fastest response, we need a few details about your property.
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Where do you live?</Text>
          <View style={styles.inputPlaceholder}>
            <Text style={styles.placeholderText}>Search Address (Google Maps)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Access Method</Text>
          <Text style={styles.subLabel}>How will responders enter your property?</Text>
          {['I will open remotely', 'Guard on duty', 'Open street', 'Intercom required'].map((method) => (
            <TouchableOpacity key={method} style={styles.option}>
              <Text>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.nextButtonText}>Complete Setup</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          By continuing, you agree to our POPIA-compliant Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  inputPlaceholder: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 15,
    borderRadius: 8,
  },
  placeholderText: {
    color: '#AAA',
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 8,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  }
});
