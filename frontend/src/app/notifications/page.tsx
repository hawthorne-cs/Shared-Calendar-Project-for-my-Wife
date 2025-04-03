"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { BellIcon, CalendarIcon, UsersIcon, ChevronRightIcon } from '@/components/icons'

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'event_invite',
    title: 'Team Monthly Meeting',
    message: 'Sarah Johnson invited you to a team meeting',
    time: '2 hours ago',
    read: false,
    actionable: true,
    metadata: {
      eventId: '123',
      date: '2023-07-15T10:00:00',
      organizer: 'Sarah Johnson'
    }
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Doctor Appointment',
    message: 'Reminder: You have an appointment in 2 days',
    time: '5 hours ago',
    read: true,
    actionable: false,
    metadata: {
      eventId: '124',
      date: '2023-07-18T14:30:00'
    }
  },
  {
    id: '3',
    type: 'group_activity',
    title: 'Project Deadline Update',
    message: 'Mike Thompson updated the project deadline',
    time: 'Yesterday',
    read: false,
    actionable: true,
    metadata: {
      groupId: '456',
      userId: '789',
      eventId: '125'
    }
  },
  {
    id: '4',
    type: 'event_update',
    title: 'Meeting Rescheduled',
    message: 'The weekly standup has been moved to 2:00 PM',
    time: '2 days ago',
    read: true,
    actionable: false,
    metadata: {
      eventId: '126',
      previousDate: '2023-07-14T10:00:00',
      newDate: '2023-07-14T14:00:00'
    }
  },
  {
    id: '5',
    type: 'event_reminder',
    title: 'Birthday Party',
    message: 'Alex\'s birthday party is tomorrow at 7 PM',
    time: '2 days ago',
    read: true,
    actionable: true,
    metadata: {
      eventId: '127',
      date: '2023-07-16T19:00:00',
      location: 'Bowling Alley'
    }
  }
]

type FilterType = 'all' | 'unread' | 'invites' | 'reminders' | 'updates'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<FilterType>('all')
  
  // Filter notifications based on current filter
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read
      case 'invites':
        return notification.type === 'event_invite'
      case 'reminders':
        return notification.type === 'reminder' || notification.type === 'event_reminder'
      case 'updates':
        return notification.type === 'event_update' || notification.type === 'group_activity'
      default:
        return true
    }
  })
  
  // Handle marking a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ))
  }
  
  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }
  
  // Handle deleting a notification
  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event_invite':
      case 'event_update':
      case 'event_reminder':
        return <CalendarIcon className="w-6 h-6 text-[#5865f2]" />
      case 'group_activity':
        return <UsersIcon className="w-6 h-6 text-[#5865f2]" />
      case 'reminder':
        return <BellIcon className="w-6 h-6 text-[#5865f2]" />
      default:
        return <BellIcon className="w-6 h-6 text-[#5865f2]" />
    }
  }

  return (
    <AppShell>
      <div className="p-6 bg-[#36393f] text-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-[#b9bbbe]">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 text-sm bg-[#4f545c] hover:bg-[#5d6269] rounded-md transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>
        
        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['all', 'unread', 'invites', 'reminders', 'updates'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as FilterType)}
              className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
                filter === filterType 
                  ? 'bg-[#5865f2] text-white' 
                  : 'bg-[#2f3136] text-[#b9bbbe] hover:bg-[#40444b]'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Notifications list */}
        <div className="space-y-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-md flex items-start ${
                  notification.read 
                    ? 'bg-[#2f3136]' 
                    : 'bg-[#393c43] border-l-4 border-[#5865f2]'
                }`}
              >
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <span className="text-xs text-[#b9bbbe]">{notification.time}</span>
                  </div>
                  <p className="text-[#b9bbbe] mt-1">{notification.message}</p>
                  
                  {notification.actionable && (
                    <div className="flex space-x-2 mt-3">
                      <button className="px-3 py-1 bg-[#5865f2] text-white text-sm rounded-md hover:bg-[#4752c4] transition-colors">
                        View Details
                      </button>
                      {notification.type === 'event_invite' && (
                        <>
                          <button className="px-3 py-1 bg-[#3ba55c] text-white text-sm rounded-md hover:bg-[#359951] transition-colors">
                            Accept
                          </button>
                          <button className="px-3 py-1 bg-[#ed4245] text-white text-sm rounded-md hover:bg-[#d93235] transition-colors">
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-1 ml-2">
                  {!notification.read && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-1 hover:bg-[#40444b] rounded-md"
                      title="Mark as read"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b9bbbe]">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(notification.id)}
                    className="p-1 hover:bg-[#40444b] rounded-md"
                    title="Delete notification"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b9bbbe]">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-[#2f3136] rounded-md">
              <div className="w-20 h-20 rounded-full bg-[#202225] flex items-center justify-center mb-4">
                <BellIcon className="w-10 h-10 text-[#b9bbbe]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-[#b9bbbe] max-w-md">
                {filter === 'all' 
                  ? "You don't have any notifications yet" 
                  : `No ${filter} notifications found`}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
} 