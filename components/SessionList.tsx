import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  duration: string;
}

interface SessionListProps {
  sessions: Session[];
}

export default function SessionList({ sessions }: SessionListProps) {
  const renderSession = ({ item }: { item: Session }) => (
    <View style={styles.sessionItem}>
      <Text style={styles.sessionTime}>{item.startTime}</Text>
      <Text style={styles.sessionDuration}>{item.duration}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Sessions</Text>
      {sessions.length === 0 ? (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            No sessions yet. Start your first timer!
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  sessionTime: {
    fontSize: 16,
    color: '#666',
  },
  sessionDuration: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
