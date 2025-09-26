import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Session {
  id: string;
  startTime: string;
  endTime?: string;
  duration: string;
}

const SESSIONS_KEY = 'timer_sessions';

export const sessionStorage = {
  // Save sessions to AsyncStorage
  async saveSessions(sessions: Session[]): Promise<void> {
    try {
      const jsonSessions = JSON.stringify(sessions);
      await AsyncStorage.setItem(SESSIONS_KEY, jsonSessions);
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  },

  // Load sessions from AsyncStorage
  async loadSessions(): Promise<Session[]> {
    try {
      const jsonSessions = await AsyncStorage.getItem(SESSIONS_KEY);
      if (jsonSessions) {
        return JSON.parse(jsonSessions);
      }
      return [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  },

  // Add a new session
  async addSession(session: Session): Promise<void> {
    try {
      const existingSessions = await this.loadSessions();
      const updatedSessions = [session, ...existingSessions];
      await this.saveSessions(updatedSessions);
    } catch (error) {
      console.error('Error adding session:', error);
    }
  },

  // Clear all sessions
  async clearSessions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SESSIONS_KEY);
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  },

  // Get sessions as JSON string
  async getSessionsAsJSON(): Promise<string> {
    try {
      const sessions = await this.loadSessions();
      return JSON.stringify(sessions, null, 2);
    } catch (error) {
      console.error('Error getting sessions as JSON:', error);
      return '[]';
    }
  },
};
