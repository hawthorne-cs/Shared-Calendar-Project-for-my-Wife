// Define basic types for expected API data structures

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  createdAt?: string; // Or Date
  bio?: string | null; // Added bio field
  // Add other user fields as needed
}

export interface Calendar {
  id: string;
  name: string;
  color: string; // e.g., hex code or Tailwind class
  ownerId?: string;
  isPrimary?: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string; // Consider using Date type if consistency is ensured
  startTime?: string | null; // Allow null for all-day events
  endTime?: string | null;   // Allow null for all-day events
  isAllDay: boolean;
  description?: string | null;
  location?: string | null;
  calendarId: string; // ID of the calendar it belongs to
  color?: string; // Optional color override
  // Add recurrence info later if needed
  isRecurring?: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  // Add notification info later if needed
  notificationTime?: '' | '5' | '15' | '30' | '60' | '1day'; 
}

// Type specifically for the New Event form state
export interface NewEventFormState {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  calendarId: string;
  isAllDay: boolean;
  // UI/Form specific fields not directly part of the core Event model (yet)
  isRecurring: boolean;
  recurringType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  notificationTime: '5min' | '15min' | '30min' | '1hour' | '1day' | ''; // Allow empty for default/no selection
}

// Simplified group structure for now
export interface Group {
  id: string;
  name: string;
  description?: string;
  avatar?: string | null; // Can be emoji or URL
  members: number;
  color?: string; // Optional theme color
  lastActive?: string; // e.g., "2 hours ago"
}

// New Type: Group Invitation
export interface GroupInvitation {
  id: string;
  groupName: string;
  groupId: string;
  inviterName: string;
  invitedAt: string; // ISO date string or formatted string
}

// Example for Settings data structure
export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  eventReminders: boolean;
  reminderTime: string; // e.g., '15', '30', '60'
  eventUpdates: boolean;
  groupActivity: boolean;
}

export interface PrivacySettings {
  calendarVisibility: 'friends' | 'everyone' | 'nobody';
  profileVisibility: 'friends' | 'everyone' | 'nobody'; // Added example
  allowInvites: 'friends' | 'everyone' | 'nobody';
  showEmail: boolean;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  // Add other settings categories as needed
} 