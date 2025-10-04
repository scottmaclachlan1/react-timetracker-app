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
  const formatSessionDate = (dateTimeString: string): string => {
    try {
      const date = new Date(dateTimeString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return dateTimeString;
      }
      return (
        date.toLocaleDateString() +
        ' ' +
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    } catch (error) {
      return dateTimeString;
    }
  };

  const renderSession = ({ item }: { item: Session }) => (
    <View style={styles.sessionItem}>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionDate}>
          {formatSessionDate(item.startTime)}
        </Text>
        {item.endTime && (
          <Text style={styles.sessionEndTime}>
            Ended: {formatSessionDate(item.endTime)}
          </Text>
        )}
      </View>
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
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  sessionInfo: {
    flex: 1,
    marginRight: 12,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  sessionEndTime: {
    fontSize: 14,
    color: '#666',
  },
  sessionDuration: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    textAlign: 'right',
    minWidth: 80,
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
