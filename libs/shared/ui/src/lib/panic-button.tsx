import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Vibration } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

interface PanicButtonProps {
  onTrigger: () => void;
  countdownSeconds: number;
}

export const PanicButton: React.FC<PanicButtonProps> = ({ onTrigger, countdownSeconds }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    setIsPressing(true);
    ReactNativeHapticFeedback.trigger("impactHeavy", options);

    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, // 2 seconds to trigger
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        ReactNativeHapticFeedback.trigger("notificationSuccess", options);
        onTrigger();
      }
    });
  };

  const handlePressOut = () => {
    setIsPressing(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed
        ]}
      >
        <Animated.View style={[styles.progressOverlay, { width: progressWidth }]} />
        <Text style={styles.text}>
          {isPressing ? 'HOLDING...' : 'PANIC'}
        </Text>
      </Pressable>
      <Text style={styles.subtext}>
        Press and hold for 2 seconds to call for help.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
  progressOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtext: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});
