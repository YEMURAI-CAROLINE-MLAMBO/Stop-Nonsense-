import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { useState, useEffect } from 'react';

export const useVoiceAssistance = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value) setRecognizedText(e.value[0]);
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const speakReassurance = (responderName: string, minutesAway: number) => {
    const message = `${responderName} is on their way and is about ${minutesAway} minutes away. You are not alone, we are with you.`;
    Tts.speak(message, {
      androidParams: {
        KEY_PARAM_PAN_ID: '0',
        KEY_PARAM_VOLUME: '1',
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const speakArrival = () => {
    Tts.speak("Your responder has arrived outside. They are securing the area now.");
  };

  return {
    speakReassurance,
    speakArrival,
  };
};
