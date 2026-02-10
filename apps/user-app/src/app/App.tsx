import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { PanicButton } from '@instant-guard/ui';

export const App = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceWaveform] = useState(new Animated.Value(1));

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(voiceWaveform, { toValue: 1.5, duration: 500, useNativeDriver: true }),
          Animated.timing(voiceWaveform, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      voiceWaveform.stopAnimation();
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>INSTANT<Text style={{color: '#E0040B'}}>GUARD</Text></Text>
          <Text style={styles.subtitle}>AI PROTECT ACTIVE</Text>
        </View>

        <View style={styles.main}>
          <PanicButton
            onTrigger={() => console.log('Panic Triggered!')}
            countdownSeconds={8}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.voiceToggle, isVoiceActive && styles.voiceActive]}
            onPress={toggleVoice}
          >
            <View style={styles.voiceIconContainer}>
               {isVoiceActive && (
                 <Animated.View
                   style={[
                     styles.voicePulse,
                     { transform: [{ scale: voiceWaveform }] }
                   ]}
                 />
               )}
               <Text style={styles.voiceEmoji}>{isVoiceActive ? '🎙️' : '🔇'}</Text>
            </View>
            <Text style={styles.voiceText}>
              {isVoiceActive ? 'AI VOICE LISTENING' : 'ACTIVATE VOICE COMMAND'}
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
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    fontStyle: 'italic',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 4,
    marginTop: 4,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  voiceToggle: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  voiceActive: {
    borderColor: '#E0040B',
    backgroundColor: '#2A0A0A',
  },
  voiceIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  voicePulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(224, 4, 11, 0.3)',
  },
  voiceEmoji: {
    fontSize: 24,
  },
  voiceText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default App;
