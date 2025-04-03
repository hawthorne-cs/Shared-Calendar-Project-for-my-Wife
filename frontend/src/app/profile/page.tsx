"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { UserIcon, CalendarIcon, ImageIcon, SettingsIcon } from '@/components/icons'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Alex Taylor',
  email: 'alex.taylor@example.com',
  profileImage: null,
  createdAt: '2023-01-15',
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: true,
      eventReminders: true,
      groupActivity: true
    },
    privacy: {
      shareCalendar: 'friends',
      showEmail: false,
      allowInvites: 'everyone'
    }
  },
  stats: {
    eventsCreated: 45,
    eventsAttended: 138,
    groupsJoined: 7
  }
}

type Tab = 'profile' | 'preferences' | 'activity'

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email
  })
  
  // Handle edit form changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle save profile
  const handleSaveProfile = () => {
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email
    }))
    setIsEditing(false)
  }
  
  return (
    <AppShell>
      <div className="bg-[#36393f] min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-[#2f3136] rounded-lg shadow-lg overflow-hidden">
          {/* Profile header */}
          <div className="bg-[#5865f2] h-32 relative">
            {/* Profile image */}
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-full bg-[#2f3136] border-4 border-[#2f3136] flex items-center justify-center text-white text-3xl font-medium">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
            </div>
            
            {/* Edit profile button */}
            <div className="absolute bottom-4 right-6">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-[#2f3136] text-white rounded-md hover:bg-[#40444b] transition-colors flex items-center"
              >
                <SettingsIcon className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="pt-16 pb-6 px-6">
            {/* User name and details */}
            <div className="mb-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#b9bbbe] mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#b9bbbe] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="profile-image" className="block text-sm font-medium text-[#b9bbbe] mb-1">
                      Profile Image
                    </label>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-[#4f545c] text-white rounded-md hover:bg-[#5d6269] transition-colors flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Upload Image
                      </button>
                      <span className="text-sm text-[#b9bbbe]">No file chosen</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <div className="flex items-center mt-2 text-[#b9bbbe]">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-[#b9bbbe]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm">{user.email}</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Tabs */}
            <div className="border-b border-[#40444b]">
              <nav className="flex space-x-8">
                {[
                  { id: 'profile', label: 'Profile' },
                  { id: 'preferences', label: 'Preferences' },
                  { id: 'activity', label: 'Activity' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${
                      activeTab === tab.id
                        ? 'border-[#5865f2] text-white'
                        : 'border-transparent text-[#b9bbbe] hover:text-white hover:border-[#40444b]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="py-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">About Me</h2>
                    <div className="bg-[#40444b] rounded-md p-4 text-[#dcddde]">
                      <p>No bio set yet.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">Stats</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#40444b] rounded-md p-4">
                        <div className="text-[#5865f2] font-semibold mb-1">{user.stats.eventsCreated}</div>
                        <div className="text-sm text-[#b9bbbe]">Events Created</div>
                      </div>
                      <div className="bg-[#40444b] rounded-md p-4">
                        <div className="text-[#5865f2] font-semibold mb-1">{user.stats.eventsAttended}</div>
                        <div className="text-sm text-[#b9bbbe]">Events Attended</div>
                      </div>
                      <div className="bg-[#40444b] rounded-md p-4">
                        <div className="text-[#5865f2] font-semibold mb-1">{user.stats.groupsJoined}</div>
                        <div className="text-sm text-[#b9bbbe]">Groups Joined</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">Notification Settings</h2>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <div className="text-[#dcddde]">Email Notifications</div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={user.preferences.notifications.email} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="text-[#dcddde]">Push Notifications</div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={user.preferences.notifications.push} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="text-[#dcddde]">Event Reminders</div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={user.preferences.notifications.eventReminders} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="text-[#dcddde]">Group Activity</div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={user.preferences.notifications.groupActivity} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#4f545c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865f2]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-white mb-4">Privacy Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#dcddde] mb-2">Who can see my calendar</label>
                        <select 
                          className="w-full px-4 py-2 rounded-md bg-[#40444b] border border-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                          value={user.preferences.privacy.shareCalendar}
                        >
                          <option value="everyone">Everyone</option>
                          <option value="friends">Friends Only</option>
                          <option value="nobody">Just Me</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
                  <div className="bg-[#40444b] rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <CalendarIcon className="w-12 h-12 text-[#b9bbbe] mb-3" />
                    <p className="text-[#dcddde]">Your activity history will appear here</p>
                    <p className="text-sm text-[#b9bbbe] mt-1">Start creating and joining events to see your activity</p>
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