"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { SettingsIcon, BellIcon, MoonIcon, SunIcon, UserIcon } from '@/components/icons'
import { useTheme } from '@/context/ThemeContext'

type SettingsCategory = 'appearance' | 'notifications' | 'privacy' | 'account'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('appearance')
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
  
  const toggleSetting = (setting: keyof typeof notificationSettings | keyof typeof privacySettings, type: 'notification' | 'privacy') => {
    if (type === 'notification') {
      setNotificationSettings(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof notificationSettings]
      }))
    } else {
      setPrivacySettings(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof privacySettings]
      }))
    }
  }
  
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
  
  const saveSettings = () => {
    console.log('Saving settings:', {
      theme,
      notificationSettings,
      privacySettings
    })
    
    alert('Settings saved successfully!')
  }
  
  return (
    <AppShell>
      <div className="bg-white dark:bg-[#36393f] min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 bg-[#f7f6f3] dark:bg-[#2f3136] rounded-lg p-4 border border-[#e6e6e6] dark:border-[#202225]">
              <h2 className="text-[#37352f] dark:text-white font-semibold mb-4 px-2 flex items-center">
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
                        ? 'bg-[#e6e6e6] dark:bg-[#393c43] text-[#37352f] dark:text-white'
                        : 'text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#e6e6e6] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white'
                    }`}
                  >
                    <span className="mr-3 text-[#6b7280] dark:text-[#b9bbbe]">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="flex-1 bg-white dark:bg-[#2f3136] rounded-lg p-6 border border-[#e6e6e6] dark:border-[#202225]">
              {activeCategory === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[#37352f] dark:text-white font-medium mb-2">Theme</h3>
                      <p className="text-[#6b7280] dark:text-[#b9bbbe] text-sm mb-4">Choose how Calendar looks for you.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 rounded-lg border transition-colors ${
                            theme === 'dark' 
                              ? 'bg-[#5865f2] text-white border-[#5865f2]' 
                              : 'bg-[#f0f0f0] dark:bg-[#36393f] text-[#37352f] dark:text-[#dcddde] border-[#e6e6e6] dark:border-[#40444b] hover:bg-[#e6e6e6] dark:hover:bg-[#40444b]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <MoonIcon className="w-8 h-8" />
                          </div>
                          <div className="font-medium">Dark</div>
                        </button>
                        
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 rounded-lg border transition-colors ${
                            theme === 'light' 
                              ? 'bg-[#5865f2] text-white border-[#5865f2]' 
                              : 'bg-[#f0f0f0] dark:bg-[#36393f] text-[#37352f] dark:text-[#dcddde] border-[#e6e6e6] dark:border-[#40444b] hover:bg-[#e6e6e6] dark:hover:bg-[#40444b]'
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <SunIcon className="w-8 h-8" />
                          </div>
                          <div className="font-medium">Light</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b border-[#e6e6e6] dark:border-[#40444b]">
                        <div>
                          <div className="text-[#37352f] dark:text-white">Email Notifications</div>
                          <div className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Receive email notifications about events and updates</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.emailNotifications}
                            onChange={() => toggleSetting('emailNotifications', 'notification')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#e6e6e6] dark:bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b border-[#e6e6e6] dark:border-[#40444b]">
                        <div>
                          <div className="text-[#37352f] dark:text-white">Push Notifications</div>
                          <div className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Receive notifications in your browser</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.pushNotifications}
                            onChange={() => toggleSetting('pushNotifications', 'notification')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#e6e6e6] dark:bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-b border-[#e6e6e6] dark:border-[#40444b]">
                        <div>
                          <div className="text-[#37352f] dark:text-white">Event Reminders</div>
                          <div className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Get reminded before your events start</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.eventReminders}
                            onChange={() => toggleSetting('eventReminders', 'notification')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#e6e6e6] dark:bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      
                      {notificationSettings.eventReminders && (
                        <div className="ml-6 pt-4">
                          <label className="block text-[#37352f] dark:text-white mb-2">Reminder Time</label>
                          <select 
                            name="reminderTime"
                            value={notificationSettings.reminderTime}
                            onChange={(e) => handleSelectChange(e, 'notification')}
                            className="w-full px-4 py-2 rounded-md bg-[#f0f0f0] dark:bg-[#40444b] border border-[#e6e6e6] dark:border-[#202225] text-[#37352f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
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

                      <div className="flex items-center justify-between py-2 border-b border-[#e6e6e6] dark:border-[#40444b]">
                        <div>
                          <div className="text-[#37352f] dark:text-white">Group Activity</div>
                          <div className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Notifications for new messages or events in your groups</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.groupActivity}
                            onChange={() => toggleSetting('groupActivity', 'notification')} 
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-[#e6e6e6] dark:bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={saveSettings}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                      >
                        Save Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'privacy' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">Privacy & Safety</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[#37352f] dark:text-white mb-2">Calendar Visibility</label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-3">Control who can see your personal calendar events.</p>
                      <select 
                        name="calendarVisibility"
                        value={privacySettings.calendarVisibility}
                        onChange={(e) => handleSelectChange(e, 'privacy')}
                        className="w-full px-4 py-2 rounded-md bg-[#f0f0f0] dark:bg-[#40444b] border border-[#e6e6e6] dark:border-[#202225] text-[#37352f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="nobody">Nobody (Just Me)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#37352f] dark:text-white mb-2">Allow Group Invites From</label>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mb-3">Control who can send you invitations to join groups.</p>
                      <select 
                        name="allowInvites"
                        value={privacySettings.allowInvites}
                        onChange={(e) => handleSelectChange(e, 'privacy')}
                        className="w-full px-4 py-2 rounded-md bg-[#f0f0f0] dark:bg-[#40444b] border border-[#e6e6e6] dark:border-[#202225] text-[#37352f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="nobody">Nobody</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-b border-[#e6e6e6] dark:border-[#40444b]">
                      <div>
                        <div className="text-[#37352f] dark:text-white">Show Email on Profile</div>
                        <div className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Allow others to see your email address on your profile</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={privacySettings.showEmail}
                          onChange={() => toggleSetting('showEmail', 'privacy')} 
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-[#e6e6e6] dark:bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                      </label>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={saveSettings}
                        className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                      >
                        Save Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeCategory === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-[#37352f] dark:text-white mb-6">My Account</h2>
                  <div className="space-y-6">
                    <div className="bg-[#f0f0f0] dark:bg-[#40444b] p-4 rounded-md border border-[#e6e6e6] dark:border-[#202225]">
                      <h3 className="text-lg font-medium text-[#37352f] dark:text-white mb-2">Account Information</h3>
                      <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Manage your account details and security.</p>
                    </div>
                    
                    <button className="px-4 py-2 bg-[#f0f0f0] dark:bg-[#4f545c] text-[#37352f] dark:text-white rounded-md hover:bg-[#e6e6e6] dark:hover:bg-[#5d6269] transition-colors border border-[#e6e6e6] dark:border-[#202225]">
                      Change Password
                    </button>

                    <button className="px-4 py-2 bg-[#ed4245] text-white rounded-md hover:bg-[#c03537] transition-colors">
                      Delete Account
                    </button>
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