import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  duration: string;
}

interface SessionListProps {
  sessions: Session[];
  onClearSessions: () => Promise<void>;
}

export default function SessionList({ sessions, onClearSessions }: SessionListProps) {
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

  const handleClearSessions = () => {
    Alert.alert(
      'Clear All Sessions',
      'Are you sure you want to delete all saved sessions? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await onClearSessions();
          },
        },
      ]
    );
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
      <View style={styles.header}>
        <Text style={styles.title}>Recent Sessions</Text>
        {sessions.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSessions}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
