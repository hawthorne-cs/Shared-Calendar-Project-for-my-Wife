"use client"

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/app-shell'
import { SettingsIcon, BellIcon, MoonIcon, SunIcon, UserIcon, LogOutIcon, CalendarIcon, ImageIcon } from '@/components/icons'
import { useTheme } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { User, UserSettings, NotificationSettings, PrivacySettings } from '@/types'
import { getUser, getUserSettings, updateUserProfile, updateNotificationSettings, updatePrivacySettings } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/Select"

type SettingsCategory = 'profile' | 'appearance' | 'notifications' | 'privacy' | 'account'

// Constants for basic validation messages
const REQUIRED_FIELD_MSG = "This field is required.";
const INVALID_EMAIL_MSG = "Please enter a valid email address.";

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('profile')
  
  // State for fetched data
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', email: '', bio: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  // State for settings subsections (initialized after fetch)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false); // Loading state for saving
  const [isSavingPrivacy, setIsSavingPrivacy] = useState(false); // Loading state for saving
  
  // Fetch initial user and settings data
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoadingData(true);
      setError(null);
      try {
        const [userData, settingsData] = await Promise.all([
          getUser(),
          getUserSettings()
        ]);
        if (isMounted) {
          setUser(userData);
          setSettings(settingsData);
          // Initialize form states with fetched data
          setEditForm({ name: userData.name, email: userData.email, bio: userData.bio || '' });
          setNotificationSettings(settingsData.notifications);
          setPrivacySettings(settingsData.privacy);
        }
      } catch (err) {
        console.error("Failed to load settings data:", err);
        if (isMounted) {
          setError("Could not load your settings. Please try again.");
          toast.error("Failed to load settings.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  // Reset edit form when cancelling or when user data changes externally
  useEffect(() => {
    if (!isEditingProfile && user) {
        setEditForm({ name: user.name, email: user.email, bio: user.bio || '' });
        setFormErrors({ name: '', email: '' });
        setIsSavingProfile(false); 
    }
  }, [isEditingProfile, user]);
  
  // Update local settings state (for immediate UI feedback)
  const handleSettingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    settingType: 'notification' | 'privacy'
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newState = type === 'checkbox' ? checked : value;

    if (settingType === 'notification' && notificationSettings) {
      setNotificationSettings(prev => prev ? { ...prev, [name]: newState } : null);
    } else if (settingType === 'privacy' && privacySettings) {
      setPrivacySettings(prev => prev ? { ...prev, [name]: newState } : null);
    }
  };
  
  // Separate toggle handler for checkboxes
  const handleToggleChange = (
    name: keyof NotificationSettings | keyof PrivacySettings,
    settingType: 'notification' | 'privacy'
  ) => {
     if (settingType === 'notification' && notificationSettings) {
      setNotificationSettings(prev => prev ? { ...prev, [name]: !prev[name as keyof NotificationSettings] } : null);
    } else if (settingType === 'privacy' && privacySettings) {
      setPrivacySettings(prev => prev ? { ...prev, [name]: !prev[name as keyof PrivacySettings] } : null);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
    if (name === 'name' || name === 'email') { // Only clear errors for fields that have them
      if (formErrors[name as keyof typeof formErrors]) {
          setFormErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  }

  // Validate Profile Form
  const validateProfileForm = (): boolean => {
      let errors = { name: '', email: '' };
      let isValid = true;

      if (!editForm.name.trim()) {
          errors.name = REQUIRED_FIELD_MSG;
          isValid = false;
      }

      if (!editForm.email.trim()) {
          errors.email = REQUIRED_FIELD_MSG;
          isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(editForm.email)) { // Simple email regex
          errors.email = INVALID_EMAIL_MSG;
          isValid = false;
      }

      setFormErrors(errors);
      return isValid;
  };
  
  // Handle save profile using API
  const handleSaveProfile = () => {
    if (!validateProfileForm()) return;
    setIsSavingProfile(true);
    const promise = updateUserProfile({ name: editForm.name, email: editForm.email, bio: editForm.bio });

    toast.promise(promise, {
      loading: 'Saving profile...',
      success: (updatedUser) => {
        setUser(updatedUser); // Update local user state
        setIsEditingProfile(false);
        setIsSavingProfile(false);
        return 'Profile updated successfully!';
      },
      error: (err) => {
        setIsSavingProfile(false);
        return `Error updating profile: ${err instanceof Error ? err.message : 'Unknown error'}`;
      },
    });
  }
  
  // Save Notification Settings using API
  const saveNotificationSettings = () => {
    if (!notificationSettings) return;
    setIsSavingNotifications(true);
    const promise = updateNotificationSettings(notificationSettings);
    
    toast.promise(promise, {
       loading: 'Saving notification settings...',
       success: (updatedSettings) => {
         setSettings(updatedSettings); // Update overall settings state
         setNotificationSettings(updatedSettings.notifications); // Resync local state
         setIsSavingNotifications(false);
         return 'Notification settings saved!';
       },
       error: (err) => {
         setIsSavingNotifications(false);
         return `Error saving settings: ${err instanceof Error ? err.message : 'Unknown error'}`;
       }
    });
  }

  // Save Privacy Settings using API
  const savePrivacySettings = () => {
    if (!privacySettings) return;
    setIsSavingPrivacy(true);
    const promise = updatePrivacySettings(privacySettings);
    
    toast.promise(promise, {
       loading: 'Saving privacy settings...',
       success: (updatedSettings) => {
         setSettings(updatedSettings); // Update overall settings state
         setPrivacySettings(updatedSettings.privacy); // Resync local state
         setIsSavingPrivacy(false);
         return 'Privacy settings saved!';
       },
       error: (err) => {
         setIsSavingPrivacy(false);
         return `Error saving settings: ${err instanceof Error ? err.message : 'Unknown error'}`;
       }
    });
  }
  
  // Handle Logout Simulation
  const handleLogout = () => {
    // Simulate logout process
    toast('Logging out...', { // Use a neutral toast
      icon: '👋',
      duration: 1500 // Short duration before redirect
    })
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push('/login')
    }, 1500) 
  }
  
  // Updated sidebar items - removed href from profile
  const sidebarNavItems = [
    { id: 'profile', label: 'My Profile', icon: <UserIcon className="w-5 h-5" /> }, 
    { id: 'appearance', label: 'Appearance', icon: <MoonIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy & Safety', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
    { id: 'account', label: 'My Account', icon: <UserIcon className="w-5 h-5" /> }
  ];

  // --- Helper Functions ---
  const formatDateString = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      // Basic check if the string looks like a valid date format parsable by Date constructor
      // This is not foolproof but prevents common errors.
      if (isNaN(Date.parse(dateString))) { 
          return 'Invalid Date';
      }
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };
  
  // Helper to handle Select component changes
  const handleSelectChange = (
    value: string, 
    name: keyof NotificationSettings | keyof PrivacySettings, 
    settingType: 'notification' | 'privacy'
  ) => {
     // Simulate the event object structure expected by handleSettingChange
     const simulatedEvent = {
       target: { name, value, type: 'select' }
     } as unknown as React.ChangeEvent<HTMLSelectElement>; // Type assertion needed
     handleSettingChange(simulatedEvent, settingType);
  };
  
  // --- Render Logic ---
  // Render loading state or error for the whole page
  if (isLoadingData) {
    return <AppShell><div className="p-6 text-center"><p>Loading settings...</p></div></AppShell>;
  }
  if (error || !user || !settings || !notificationSettings || !privacySettings) {
    return <AppShell><div className="p-6 text-center text-red-600"><p>{error || "Failed to load settings data."}</p></div></AppShell>;
  }

  return (
    <AppShell>
      <div className="flex h-full">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#f7f6f3] dark:bg-[#202225] p-4 flex flex-col border-r border-[#e6e6e6] dark:border-[#1a1b1e]">
          <h2 className="text-sm font-semibold uppercase text-[#6b7280] dark:text-[#b9bbbe] mb-4 px-2">User Settings</h2>
          <nav className="flex-1 space-y-1">
            {sidebarNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id as SettingsCategory)}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${ 
                  activeCategory === item.id 
                    ? 'bg-[#e6e6e6] dark:bg-[#40444b] text-[#37352f] dark:text-white' 
                    : 'text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#e6e6e6] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white'
                 }`}
                aria-current={activeCategory === item.id ? 'page' : undefined}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Separator */}
          <div className="pt-2 mt-2 border-t border-[#e6e6e6] dark:border-[#40444b]"></div>
          
          {/* Logout Button - Use destructiveGhost variant */}
          <Button 
            onClick={handleLogout} 
            variant="destructiveGhost"
            className="w-full justify-start mt-auto"
          >
            <LogOutIcon className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </aside>

        {/* Settings Content Area */}
        <main className="flex-1 bg-white dark:bg-[#2f3136] rounded-lg p-6 sm:p-8 border border-[#e6e6e6] dark:border-[#202225] min-w-0 min-h-[600px] shadow-sm m-4">

          {/* My Profile Content */}
          {activeCategory === 'profile' && (
            <section role="region" aria-labelledby="profile-heading">
              <div className="flex justify-between items-center mb-6">
                <h2 id="profile-heading" className="text-xl font-semibold text-[#37352f] dark:text-white">My Profile</h2>
                {!isEditingProfile && (
                  <Button onClick={() => setIsEditingProfile(true)} variant="secondary" size="sm">
                    Edit Profile
                  </Button>
                )}
              </div>
              
              {isEditingProfile ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        type="text"
                        value={editForm.name}
                        onChange={handleEditChange}
                        required
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        // Add error class conditionally
                        className={formErrors.name ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                      />
                      {formErrors.name && <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        required
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        // Add error class conditionally
                        className={formErrors.email ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                      />
                      {formErrors.email && <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{formErrors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editForm.bio}
                        onChange={handleEditChange}
                        rows={4}
                        placeholder="Tell us a little about yourself..."
                        maxLength={200}
                        // No error state needed for optional bio yet
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{editForm.bio?.length || 0}/200 characters</p>
                    </div>
                    <div>
                      <Label htmlFor="profileImage">Profile Image</Label>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="w-16 h-16 rounded-full bg-[#e6e6e6] dark:bg-[#40444b] flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-500">
                           {user.profileImage ? (
                             <img src={user.profileImage} alt="Current profile" className="w-full h-full object-cover" />
                           ) : (
                             <UserIcon className="w-8 h-8 text-[#6b7280] dark:text-[#b9bbbe]" />
                           )} 
                        </div>
                         <Button type="button" variant="outline" size="sm">
                           <ImageIcon className="w-4 h-4 mr-2" /> Upload Image
                         </Button>
                         <span className="text-xs text-[#6b7280] dark:text-[#b9bbbe]">JPG, PNG, GIF up to 5MB</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#e6e6e6] dark:border-[#40444b]">
                      <Button type="button" variant="secondary" onClick={() => setIsEditingProfile(false)} disabled={isSavingProfile}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="primaryAction" disabled={isSavingProfile}>
                        {isSavingProfile ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                // Profile View Mode
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#e6e6e6] dark:bg-[#40444b] flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-500">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={`${user.name}'s profile`} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-10 h-10 text-[#6b7280] dark:text-[#b9bbbe]" />
                        )} 
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#37352f] dark:text-white">{user.name}</h3>
                        <p className="text-[#6b7280] dark:text-[#b9bbbe]">{user.email}</p>
                        <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mt-1">Member since {formatDateString(user.createdAt)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#e6e6e6] dark:border-[#40444b] pt-6">
                        <h3 className="text-base font-semibold text-[#37352f] dark:text-white mb-3">About Me</h3>
                        <div className="bg-[#f7f6f3] dark:bg-[#2f3136] rounded-md p-4 text-[#6b7280] dark:text-[#b9bbbe] min-h-[60px] border border-[#e6e6e6] dark:border-[#40444b]">
                          <p className={!user.bio ? 'italic text-gray-500 dark:text-gray-400' : 'whitespace-pre-wrap'}>
                            {user.bio || 'No bio set yet. Edit profile to add.'}
                          </p> 
                        </div>
                    </div>

                    <div className="border-t border-[#e6e6e6] dark:border-[#40444b] pt-6">
                       <h3 className="text-base font-semibold text-[#37352f] dark:text-white mb-3">Account Details</h3>
                       <dl className="space-y-2 text-sm">
                         <div className="flex">
                           <dt className="w-24 font-medium text-[#6b7280] dark:text-[#b9bbbe]">User ID:</dt>
                           <dd className="text-[#37352f] dark:text-white font-mono text-xs bg-[#f0f0f0] dark:bg-[#202225] px-1.5 py-0.5 rounded">{user.id}</dd>
                         </div>
                         {/* Add other details like last login etc. if available */}
                       </dl>
                    </div>
                </div>
              )}
            </section>
          )}

          {/* Appearance Content */}
          {activeCategory === 'appearance' && (
            <section role="region" aria-labelledby="appearance-heading">
              <h2 id="appearance-heading" className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Appearance</h2>
              <div className="space-y-4">
                 <div>
                   <Label>Theme</Label>
                   <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-2">Choose how CJ's Calendars looks to you.</p>
                   <div className="flex gap-4">
                      {['light', 'dark'].map(t => (
                        <Button
                          key={t}
                          variant={theme === t ? 'primaryAction' : 'outline'} 
                          onClick={() => setTheme(t as 'light' | 'dark')}
                          className="capitalize flex-1 flex items-center justify-center gap-2"
                          // Apply consistent size
                          size="default" 
                        >
                          {t === 'light' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                          {t}
                        </Button>
                      ))}
                   </div>
                 </div>
                 {/* Add Font Size, Message Display options later */}
              </div>
            </section>
          )}
          
          {/* Notifications Content - Use Select component */} 
          {activeCategory === 'notifications' && (
             <section role="region" aria-labelledby="notifications-heading">
                <h2 id="notifications-heading" className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Notifications</h2>
                <div className="space-y-6">
                  {/* Email Notifications */} 
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium mb-0">Email Notifications</Label> 
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Receive emails for important updates.</p>
                    </div>
                     {/* Use Switch Component */} 
                     <Switch 
                        id="emailNotifications" 
                        name="emailNotifications" // Name might not be needed if using onCheckedChange
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange({ target: { name: 'emailNotifications', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'notification')}
                        aria-labelledby="emailNotifications-label" // Link to label if Label doesn't wrap
                    />
                  </div>
                  {/* Push Notifications */} 
                  <div className="flex items-center justify-between">
                     <div>
                      <Label htmlFor="pushNotifications" className="font-medium mb-0">Push Notifications</Label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Receive push notifications on your devices.</p>
                    </div>
                     <Switch 
                        id="pushNotifications" 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange({ target: { name: 'pushNotifications', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'notification')}
                        aria-labelledby="pushNotifications-label"
                    />
                  </div>
                  {/* Event Reminders */} 
                  <div className="flex items-center justify-between">
                     <div>
                      <Label htmlFor="eventReminders" className="font-medium mb-0">Event Reminders</Label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Get reminded before your events start.</p>
                    </div>
                     <Switch 
                        id="eventReminders" 
                        checked={notificationSettings.eventReminders}
                        onCheckedChange={(checked) => handleSettingChange({ target: { name: 'eventReminders', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'notification')}
                        aria-labelledby="eventReminders-label"
                    />
                  </div>
                  {/* Reminder Time Select - Remains standard select for now */} 
                   <div>
                    <Label htmlFor="reminderTime">Event Reminder Time</Label>
                    {/* Use Select Component */}
                    <Select
                      value={notificationSettings.reminderTime}
                      onValueChange={(value) => handleSelectChange(value, 'reminderTime', 'notification')}
                      disabled={!notificationSettings.eventReminders}
                      name="reminderTime"
                    >
                      <SelectTrigger id="reminderTime" disabled={!notificationSettings.eventReminders} className="mt-1">
                        <SelectValue placeholder="Select reminder time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes before</SelectItem>
                        <SelectItem value="15">15 minutes before</SelectItem>
                        <SelectItem value="30">30 minutes before</SelectItem>
                        <SelectItem value="60">1 hour before</SelectItem>
                        <SelectItem value="1440">1 day before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Event Updates */} 
                   <div className="flex items-center justify-between">
                     <div>
                      <Label htmlFor="eventUpdates" className="font-medium mb-0">Event Updates</Label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Notify me when events are updated or cancelled.</p>
                    </div>
                     <Switch 
                        id="eventUpdates" 
                        checked={notificationSettings.eventUpdates}
                        onCheckedChange={(checked) => handleSettingChange({ target: { name: 'eventUpdates', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'notification')}
                        aria-labelledby="eventUpdates-label"
                    />
                  </div>
                  {/* Group Activity */} 
                  <div className="flex items-center justify-between">
                     <div>
                      <Label htmlFor="groupActivity" className="font-medium mb-0">Group Activity</Label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Notify me about new group members or posts.</p>
                    </div>
                     <Switch 
                        id="groupActivity" 
                        checked={notificationSettings.groupActivity}
                        onCheckedChange={(checked) => handleSettingChange({ target: { name: 'groupActivity', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'notification')}
                        aria-labelledby="groupActivity-label"
                    />
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#e6e6e6] dark:border-[#40444b] flex justify-end">
                    <Button onClick={saveNotificationSettings} variant="primaryAction" disabled={isSavingNotifications}>
                      {isSavingNotifications ? 'Saving...' : 'Save Notification Settings'}
                    </Button>
                </div>
            </section>
          )}

          {/* Privacy & Safety Content - Use Select component */} 
          {activeCategory === 'privacy' && (
            <section role="region" aria-labelledby="privacy-heading">
               <h2 id="privacy-heading" className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Privacy & Safety</h2>
               <div className="space-y-6">
                  <div>
                    <Label htmlFor="calendarVisibility">Default Calendar Visibility</Label>
                    <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-1">Control who can see your personal calendar by default.</p>
                    <Select 
                       value={privacySettings.calendarVisibility}
                       onValueChange={(value) => handleSelectChange(value, 'calendarVisibility', 'privacy')}
                       name="calendarVisibility"
                    >
                      <SelectTrigger id="calendarVisibility" className="mt-1">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private (Only You)</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div>
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-1">Control who can see your profile details.</p>
                    <Select 
                       value={privacySettings.profileVisibility}
                       onValueChange={(value) => handleSelectChange(value, 'profileVisibility', 'privacy')}
                       name="profileVisibility"
                    >
                      <SelectTrigger id="profileVisibility" className="mt-1">
                         <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private (Only You)</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="allowInvites">Allow Group Invites From</Label>
                    <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-1">Control who can send you group invitations.</p>
                    <Select 
                       value={privacySettings.allowInvites}
                       onValueChange={(value) => handleSelectChange(value, 'allowInvites', 'privacy')}
                       name="allowInvites"
                    >
                      <SelectTrigger id="allowInvites" className="mt-1">
                         <SelectValue placeholder="Select who can invite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="noone">No One</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="everyone">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Show Email */} 
                  <div className="flex items-center justify-between">
                     <div>
                      <Label htmlFor="showEmail" className="font-medium mb-0">Show Email on Profile</Label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Allow others to see your email address on your profile.</p>
                    </div>
                     {/* Use Switch Component */}
                     <Switch 
                       id="showEmail" 
                       checked={privacySettings.showEmail}
                       onCheckedChange={(checked) => handleSettingChange({ target: { name: 'showEmail', value: checked, type: 'checkbox' } } as unknown as React.ChangeEvent<HTMLInputElement>, 'privacy')}
                       aria-labelledby="showEmail-label"
                     />
                  </div>
               </div>
                <div className="mt-6 pt-4 border-t border-[#e6e6e6] dark:border-[#40444b] flex justify-end">
                    <Button onClick={savePrivacySettings} variant="primaryAction" disabled={isSavingPrivacy}>
                      {isSavingPrivacy ? 'Saving...' : 'Save Privacy Settings'}
                    </Button>
                </div>
            </section>
          )}
          
          {/* My Account Content */} 
          {activeCategory === 'account' && (
             <section role="region" aria-labelledby="account-heading">
                 <h2 id="account-heading" className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">My Account</h2>
                 <p className="text-[#6b7280] dark:text-[#b9bbbe] mb-4">Manage your account details and security.</p>
                 {/* Add options like Change Password, Two-Factor Auth later */}
                 <div className="space-y-4">
                    {/* Example: Link to password change */}
                    <div>
                       <Button variant="outline" size="sm">Change Password</Button>
                    </div>
                 </div>
                 <div className="mt-8 pt-6 border-t border-red-300 dark:border-red-700">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">Danger Zone</h3>
                    <Button variant="destructive">Delete Account</Button>
                    <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mt-2">Permanently delete your account and all associated data. This action cannot be undone.</p>
                 </div>
             </section>
          )}

        </main>
      </div>
    </AppShell>
  )
} 