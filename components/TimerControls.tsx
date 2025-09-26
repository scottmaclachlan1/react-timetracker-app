import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isRunning,
  onStart,
  onStop,
}: TimerControlsProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isRunning ? styles.stopButton : styles.startButton,
      ]}
      onPress={isRunning ? onStop : onStart}
    >
      <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
