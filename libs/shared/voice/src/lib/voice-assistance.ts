import Tts from 'react-native-tts';

export const useVoiceAssistance = () => {
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
