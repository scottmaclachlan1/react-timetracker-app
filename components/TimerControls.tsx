import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onStop,
}: TimerControlsProps) {
  const getButtonText = () => {
    if (!isRunning && !isPaused) return 'Start';
    if (isPaused) return 'Resume';
    return 'Pause';
  };

  const getButtonColor = () => {
    if (!isRunning && !isPaused) return styles.startButton;
    if (isPaused) return styles.resumeButton;
    return styles.pauseButton;
  };

  const handleMainButtonPress = () => {
    if (!isRunning && !isPaused) {
      onStart();
    } else if (isPaused) {
      onStart();
    } else {
      onPause();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, getButtonColor()]}
        onPress={handleMainButtonPress}
      >
        <Text style={styles.buttonText}>{getButtonText()}</Text>
      </TouchableOpacity>

      {(isRunning || isPaused) && (
        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={onStop}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resumeButton: {
    backgroundColor: '#2196F3',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
