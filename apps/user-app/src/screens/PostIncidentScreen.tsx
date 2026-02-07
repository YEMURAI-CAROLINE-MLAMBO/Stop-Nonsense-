import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

export const PostIncidentScreen = ({ navigation }: any) => {
  const [rating, setRating] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Are you safe?</Text>
        <Text style={styles.subtitle}>The responder has marked the incident as resolved.</Text>

        <View style={styles.ratingSection}>
          <Text style={styles.label}>Rate your experience with the responder</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Text style={[styles.star, rating >= s && styles.selectedStar]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.label}>Any additional feedback?</Text>
          <TextInput
            style={styles.input}
            placeholder="Help us improve..."
            multiline
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Submit & Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 30, flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10, marginBottom: 40 },
  ratingSection: { alignItems: 'center', marginBottom: 30 },
  label: { fontSize: 14, color: '#999', marginBottom: 15 },
  stars: { flexDirection: 'row', gap: 10 },
  star: { fontSize: 40, color: '#EEE' },
  selectedStar: { color: '#FFD700' },
  feedbackSection: { marginBottom: 40 },
  input: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});
