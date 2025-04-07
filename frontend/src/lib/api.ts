// Placeholder API service module
import { Event, Group, Calendar, User, UserSettings, NotificationSettings, PrivacySettings, GroupInvitation } from '@/types';

// --- Mock Data (using imported types) ---

const mockUser: User = {
  id: '1',
  name: 'Alex Taylor',
  email: 'alex.taylor@example.com',
  profileImage: null,
  createdAt: '2023-01-15',
  bio: 'Frontend developer working on shared calendars.',
};

const mockCalendars: Calendar[] = [
  { id: '1', name: 'Personal', color: 'bg-blue-500', isPrimary: true },
  { id: '2', name: 'Work', color: 'bg-green-500' },
  { id: '3', name: 'Family', color: 'bg-purple-500' }
];

// Keep event mocks simple for now
const mockEvents: Event[] = [
  { id: 'ev1', title: 'Team Meeting', date: '2024-07-30', startTime: '10:00', endTime: '11:00', isAllDay: false, calendarId: '2', color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' },
  { id: 'ev2', title: 'Project Deadline', date: '2024-07-31', isAllDay: true, calendarId: '2', color: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' },
  { id: 'ev3', title: 'Doctor Appointment', date: '2024-08-01', startTime: '14:00', endTime: '14:30', isAllDay: false, calendarId: '1', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' },
];

const mockGroups: Group[] = [
  { id: 'g1', name: 'Development Team', avatar: '👨‍💻', members: 6, color: 'bg-[#5865f2]', lastActive: '2 hours ago' },
  { id: 'g2', name: 'Family', avatar: '/images/group-family.jpg', members: 4, color: 'bg-[#3ba55c]', lastActive: '1 day ago' },
  { id: 'g3', name: 'Hiking Club', avatar: '🏔️', members: 12, color: 'bg-[#eb459e]', lastActive: '3 days ago' },
];

const mockSettings: UserSettings = {
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    reminderTime: '30',
    eventUpdates: true,
    groupActivity: true
  },
  privacy: {
    calendarVisibility: 'friends',
    profileVisibility: 'everyone',
    allowInvites: 'everyone',
    showEmail: false
  }
};

// New Mock Data: Group Invitations
const mockInvitations: GroupInvitation[] = [
  {
    id: 'inv1',
    groupName: 'Book Club',
    groupId: 'g4', // Assuming g4 exists or will be created
    inviterName: 'Charlie Brown',
    invitedAt: '2024-07-29',
  },
  {
    id: 'inv2',
    groupName: 'Weekend Warriors',
    groupId: 'g5', // Assuming g5 exists or will be created
    inviterName: 'Lucy van Pelt',
    invitedAt: '2024-07-28',
  },
];

// --- API Functions (Simulated) ---

const simulateDelay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Example: Fetch Events (replace with actual fetch later)
export const getEvents = async (): Promise<Event[]> => {
  console.log("API: Fetching events... (Simulated)");
  await simulateDelay();
  // Simulate potential error
  // if (Math.random() < 0.1) throw new Error("Failed to fetch events");
  console.log("API: Events fetched.");
  return [...mockEvents]; // Return a copy
};

// Example: Create Event (replace with actual fetch later)
export const createEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
  console.log("API: Creating event... (Simulated)", eventData);
  await simulateDelay(1500);
  const newEvent: Event = { 
    ...eventData, 
    id: `ev${Date.now()}`, // Generate simple ID for mock
    // Ensure default values if not provided and required by Event type
    description: eventData.description || null,
    startTime: eventData.isAllDay ? null : eventData.startTime || '00:00', 
    endTime: eventData.isAllDay ? null : eventData.endTime || '00:00',
    location: eventData.location || null,
  };
  mockEvents.push(newEvent); // Add to mock data (for demo purposes)
  console.log("API: Event created.");
  return newEvent;
};

// Example: Fetch Groups
export const getGroups = async (): Promise<Group[]> => {
  console.log("API: Fetching groups... (Simulated)");
  await simulateDelay();
  console.log("API: Groups fetched.");
  return [...mockGroups];
};

// Example: Fetch User Profile/Settings
export const getUser = async (): Promise<User> => {
  console.log("API: Fetching user... (Simulated)");
  await simulateDelay(800);
  console.log("API: User fetched.");
  return {...mockUser};
};

export const getUserSettings = async (): Promise<UserSettings> => {
  console.log("API: Fetching settings... (Simulated)");
  await simulateDelay(900);
  console.log("API: Settings fetched.");
  return JSON.parse(JSON.stringify(mockSettings)); // Deep copy
};

// Example: Update User Profile
export const updateUserProfile = async (profileData: Pick<User, 'name' | 'email' | 'bio'>): Promise<User> => {
  console.log("API: Updating profile... (Simulated)", profileData);
  await simulateDelay(1500);
  mockUser.name = profileData.name;
  mockUser.email = profileData.email;
  mockUser.bio = profileData.bio || null;
  console.log("API: Profile updated.");
  return {...mockUser};
};

// Example: Update Notification Settings
export const updateNotificationSettings = async (settings: NotificationSettings): Promise<UserSettings> => {
  console.log("API: Updating notification settings... (Simulated)", settings);
  await simulateDelay(1200);
  mockSettings.notifications = settings;
  console.log("API: Notification settings updated.");
  return JSON.parse(JSON.stringify(mockSettings));
};

// Update Privacy Settings
export const updatePrivacySettings = async (settings: PrivacySettings): Promise<UserSettings> => {
  console.log("API: Updating privacy settings... (Simulated)", settings);
  await simulateDelay(1100);
  mockSettings.privacy = settings;
  console.log("API: Privacy settings updated.");
  return JSON.parse(JSON.stringify(mockSettings));
};

// Add functions for getCalendars, updatePrivacySettings, updateAccountSettings etc. as needed
export const getCalendars = async (): Promise<Calendar[]> => {
  console.log("API: Fetching calendars... (Simulated)");
  await simulateDelay(600);
  console.log("API: Calendars fetched.");
  return [...mockCalendars];
};

// New Function: Fetch Group Invitations
export const getGroupInvitations = async (): Promise<GroupInvitation[]> => {
  console.log("API: Fetching group invitations... (Simulated)");
  await simulateDelay(700);
  console.log("API: Invitations fetched.");
  // Simulate no invitations sometimes
  // if (Math.random() < 0.3) return []; 
  return [...mockInvitations];
};

// New Function: Respond to Group Invitation (Placeholder)
export const respondToGroupInvitation = async (invitationId: string, action: 'accept' | 'decline'): Promise<boolean> => {
  console.log(`API: Responding to invitation ${invitationId} with ${action}... (Simulated)`);
  await simulateDelay(1000);
  const index = mockInvitations.findIndex(inv => inv.id === invitationId);
  if (index > -1) {
    mockInvitations.splice(index, 1); // Remove invitation on response
    console.log("API: Invitation response processed.");
    // In a real app, you might return the updated group list or user object
    return true; 
  } else {
    console.error("API: Invitation not found.");
    return false;
  }
}; 