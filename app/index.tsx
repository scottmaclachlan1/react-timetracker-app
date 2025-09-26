import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SessionList from '../components/SessionList';
import TimerControls from '../components/TimerControls';
import TimerDisplay from '../components/TimerDisplay';

export default function Index() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('00:00:00');
  const [sessions, setSessions] = useState([]);

  const handleStart = () => {
    setIsRunning(true);
    // TODO: Implement actual timer logic
  };

  const handleStop = () => {
    setIsRunning(false);
    // TODO: Implement session saving logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TimerDisplay time={time} />
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onStop={handleStop}
        />
        <SessionList sessions={sessions} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
