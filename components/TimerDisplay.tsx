import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

interface TimerDisplayProps {
  time: string;
}

export default function TimerDisplay({ time }: TimerDisplayProps) {
  const { width: screenWidth } = useWindowDimensions();
  
  // Calculate responsive font size based on screen width
  const fontSize = Math.min(screenWidth * 0.15, 72); // Max 72px, but scale with screen width

  return (
    <View style={styles.container}>
      <Text style={[styles.timerText, { fontSize }]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  timerText: {
    fontWeight: '300',
    color: '#333',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
