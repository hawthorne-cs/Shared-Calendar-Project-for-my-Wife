"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { SettingsIcon, BellIcon, MoonIcon, SunIcon, UserIcon } from '@/components/icons'

type SettingsCategory = 'appearance' | 'notifications' | 'privacy' | 'account'

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('appearance')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    reminderTime: '30',
    eventUpdates: true,
    groupActivity: true
  })
  const [privacySettings, setPrivacySettings] = useState({
    calendarVisibility: 'friends',
    profileVisibility: 'everyone',
    allowInvites: 'everyone',
    showEmail: false
  })
  
  // Toggle function for checkbox settings
  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }
  
  // Handle dropdown changes
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, settingType: 'notification' | 'privacy') => {
    const { name, value } = e.target
    
    if (settingType === 'notification') {
      setNotificationSettings(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setPrivacySettings(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  // Save settings
  const saveSettings = () => {
    console.log('Saving settings:', {
      theme,
      notificationSettings,
      privacySettings
    })
    
    // Here you would normally make an API call to save the settings
    alert('Settings saved successfully!')
  }
  
  return (
    <AppShell>
      <div className="bg-[#36393f] min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#2f3136] rounded-lg p-4">
              <h2 className="text-white font-semibold mb-4 px-2 flex items-center">
                <SettingsIcon className="w-5 h-5 mr-2" />
                User Settings
              </h2>
              
              <nav className="space-y-1">
                {[
                  { id: 'appearance', label: 'Appearance', icon: <MoonIcon className="w-5 h-5" /> },
                  { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
                  { id: 'privacy', label: 'Privacy & Safety', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> },
                  { id: 'account', label: 'My Account', icon: <UserIcon className="w-5 h-5" /> }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as SettingsCategory)}
                    className={`flex items-center w-full px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === category.id
                        ? 'bg-[#393c43] text-white'
                        : 'text-[#b9bbbe] hover:bg-[#36393f] hover:text-white'
                    }`}
                  >
                    <span className="mr-3 text-[#b9bbbe]">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Main content */}
            <div className="flex-1 bg-[#2f3136] rounded-lg p-6">
              {/* Appearance Settings */}
              {activeCategory === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-2">Theme</h3>
                      <p className="text-[#b9bbbe] text-sm mb-4">Choose how Calendar looks for you.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 rounded-lg transition-colors ${
                            theme === 'dark' 
                              ? 'bg-[#5865f2] text-white' 
                              : 'bg-[#36393f] text-[#dcddde] hover:bg-[#40444b]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <MoonIcon className="w-8 h-8" />
                          </div>
                          <div className="font-medium">Dark</div>
                        </button>
                        
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 rounded-lg transition-colors ${
                            theme === 'light' 
                              ? 'bg-[#5865f2] text-white' 
                              : 'bg-[#36393f] text-[#dcddde] hover:bg-[#40444b]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <SunIcon className="w-8 h-8" />
                          </div>
                          <div className="font-medium">Light</div>
                        </button>
                        
                        <button
                          onClick={() => setTheme('system')}
                          className={`p-4 rounded-lg transition-colors ${
                            theme === 'system' 
                              ? 'bg-[#5865f2] text-white' 
                              : 'bg-[#36393f] text-[#dcddde] hover:bg-[#40444b]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <div className="w-8 h-8 flex">
                              <div className="w-1/2 flex items-center justify-center border-r border-[#dcddde]">
                                <MoonIcon className="w-4 h-4" />
                              </div>
                              <div className="w-1/2 flex items-center justify-center">
                                <SunIcon className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">Sync with System</div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={saveSettings}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeCategory === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <div className="text-white">Email Notifications</div>
                          <div className="text-sm text-[#b9bbbe]">Receive email notifications about events and updates</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.emailNotifications}
                            onChange={() => toggleSetting('emailNotifications')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <div className="text-white">Push Notifications</div>
                          <div className="text-sm text-[#b9bbbe]">Receive notifications in your browser</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.pushNotifications}
                            onChange={() => toggleSetting('pushNotifications')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <div className="text-white">Event Reminders</div>
                          <div className="text-sm text-[#b9bbbe]">Get reminded before your events start</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.eventReminders}
                            onChange={() => toggleSetting('eventReminders')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      {notificationSettings.eventReminders && (
                        <div className="ml-6 bg-[#36393f] p-4 rounded-md">
                          <label className="block text-white mb-2">Reminder Time</label>
                          <select 
                            name="reminderTime"
                            value={notificationSettings.reminderTime}
                            onChange={(e) => handleSelectChange(e, 'notification')}
                            className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                          >
                            <option value="10">10 minutes before</option>
                            <option value="15">15 minutes before</option>
                            <option value="30">30 minutes before</option>
                            <option value="60">1 hour before</option>
                            <option value="120">2 hours before</option>
                            <option value="1440">1 day before</option>
                          </select>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={saveSettings}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeCategory === 'privacy' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Privacy & Safety</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white mb-2">Who can see my calendar</label>
                      <select 
                        name="calendarVisibility"
                        value={privacySettings.calendarVisibility}
                        onChange={(e) => handleSelectChange(e, 'privacy')}
                        className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="nobody">Just Me</option>
                      </select>
                      <p className="mt-1 text-sm text-[#b9bbbe]">Choose who can view your calendar events</p>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Who can invite me to events</label>
                      <select 
                        name="allowInvites"
                        value={privacySettings.allowInvites}
                        onChange={(e) => handleSelectChange(e, 'privacy')}
                        className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="nobody">Nobody</option>
                      </select>
                      <p className="mt-1 text-sm text-[#b9bbbe]">Control who can send you event invitations</p>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={saveSettings}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Account Settings */}
              {activeCategory === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">My Account</h2>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center p-4 bg-[#36393f] rounded-lg">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <div className="w-16 h-16 rounded-full bg-[#5865f2] flex items-center justify-center text-white text-2xl font-medium">
                          A
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-white font-medium">Alex Taylor</h3>
                        <p className="text-[#b9bbbe]">alex.taylor@example.com</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <a href="/profile" className="px-4 py-2 bg-[#4f545c] text-white rounded-md hover:bg-[#5d6269] transition-colors inline-block">
                          Edit Profile
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-medium mb-4">Account Management</h3>
                      
                      <div className="space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-[#36393f] hover:bg-[#40444b] rounded-md text-white transition-colors">
                          Change Password
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-[#36393f] hover:bg-[#40444b] rounded-md text-white transition-colors">
                          Two-Factor Authentication
                        </button>
                        <button className="w-full text-left px-4 py-3 bg-[#36393f] hover:bg-[#40444b] rounded-md text-white transition-colors">
                          Connected Accounts
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#40444b] pt-6 mt-6">
                      <h3 className="text-red-400 font-medium mb-4">Danger Zone</h3>
                      
                      <div className="space-y-2">
                        <button className="w-full text-left px-4 py-3 bg-[#36393f] hover:bg-[#432f30] text-[#ed4245] rounded-md transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 