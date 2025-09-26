import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SessionList from '../components/SessionList';
import TimerControls from '../components/TimerControls';
import TimerDisplay from '../components/TimerDisplay';
import { useTimer } from '../hooks/useTimer';

export default function Index() {
  const { isRunning, isPaused, formattedTime, sessions, start, pause, stop } =
    useTimer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TimerDisplay time={formattedTime} />
        <TimerControls
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={start}
          onPause={pause}
          onStop={stop}
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
