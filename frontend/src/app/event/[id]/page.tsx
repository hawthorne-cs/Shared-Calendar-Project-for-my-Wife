"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import Link from 'next/link'
import { CalendarIcon, MessageCircleIcon, BellIcon, UsersIcon, ChevronLeftIcon, SettingsIcon } from '@/components/icons'

// Mock event data
const mockEvent = {
  id: '123',
  title: 'Team Planning Session',
  description: 'Quarterly planning session to discuss goals, targets, and project roadmaps for the upcoming months. All team members should come prepared with their department updates and suggestions.',
  date: '2023-06-15',
  startTime: '10:00 AM',
  endTime: '12:00 PM',
  location: 'Conference Room A, 4th Floor',
  calendar: 'Work',
  calendarColor: 'bg-[#5865f2]',
  attendees: [
    { id: '1', name: 'Jane Cooper', avatar: '/avatars/jane.png', status: 'going' },
    { id: '2', name: 'Wade Warren', avatar: '/avatars/wade.png', status: 'going' },
    { id: '3', name: 'Esther Howard', avatar: '/avatars/esther.png', status: 'maybe' },
    { id: '4', name: 'Cameron Williamson', avatar: '/avatars/cameron.png', status: 'invited' },
  ],
  createdBy: 'Alex Johnson',
}

export default function EventPage({ params }: { params: { id: string } }) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Simulate event data fetching with the provided ID
  const event = mockEvent
  
  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate deletion with a timeout
    setTimeout(() => {
      // In a real app, we would make an API call here
      window.location.href = '/calendar'
    }, 1000)
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  return (
    <AppShell>
      <div className="p-6">
        {/* Event header - Notion style */}
        <header className="mb-8">
          <Link 
            href="/calendar" 
            className="inline-flex items-center text-[#6b7280] dark:text-[#b9bbbe] hover:text-[#37352f] dark:hover:text-white mb-4 group transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1" />
            <span>Back to calendar</span>
          </Link>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#37352f] dark:text-white mb-2">{event.title}</h1>
              <div className="flex items-center">
                <span className={`${event.calendarColor} h-2 w-2 rounded-full mr-2`}></span>
                <span className="text-[#6b7280] dark:text-[#b9bbbe]">{event.calendar} Calendar</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Link 
                href={`/event/${event.id}/edit`}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-white dark:bg-[#36393f] text-[#37352f] dark:text-white rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#2f3136] transition-colors border border-[#e6e6e6] dark:border-[#202225]"
              >
                <SettingsIcon className="w-4 h-4 mr-1" />
                Edit
              </Link>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-white dark:bg-[#36393f] text-[#ef4444] rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#2f3136] transition-colors border border-[#e6e6e6] dark:border-[#202225] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 mr-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </header>
        
        {/* Event content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event details */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Event Details</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-4">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe] mb-1">Date</h3>
                      <p className="text-[#37352f] dark:text-white">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe] mb-1">Time</h3>
                      <p className="text-[#37352f] dark:text-white">{event.startTime} - {event.endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-5 h-5" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe] mb-1">Location</h3>
                      <p className="text-[#37352f] dark:text-white">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-4">
                      <UsersIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe] mb-2">Attendees</h3>
                      <div className="space-y-2">
                        {event.attendees.map(attendee => (
                          <div key={attendee.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#e6e6e6] dark:bg-[#36393f] text-center flex items-center justify-center text-sm font-medium text-[#37352f] dark:text-white mr-2">
                                {attendee.name.charAt(0)}
                              </div>
                              <span className="text-[#37352f] dark:text-white">{attendee.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              attendee.status === 'going' 
                                ? 'bg-[#ecfdf5] dark:bg-[#16251a] text-[#059669] dark:text-[#34d399]' 
                                : attendee.status === 'maybe' 
                                  ? 'bg-[#fffbeb] dark:bg-[#292116] text-[#d97706] dark:text-[#fbbf24]' 
                                  : 'bg-[#f3f4f6] dark:bg-[#202225] text-[#6b7280] dark:text-[#b9bbbe]'
                            }`}>
                              {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Description */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Description</h2>
              </div>
              <div className="p-6">
                <p className="text-[#37352f] dark:text-white whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick actions */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Quick Actions</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#5865f2] rounded-md text-white mb-2">
                    <BellIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">Set Reminder</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#eb459e] rounded-md text-white mb-2">
                    <MessageCircleIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">Chat</span>
                </button>
              </div>
            </section>
            
            {/* Created by */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Created By</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#e6e6e6] dark:bg-[#36393f] text-center flex items-center justify-center text-sm font-medium text-[#37352f] dark:text-white mr-3">
                    {event.createdBy.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#37352f] dark:text-white">{event.createdBy}</h3>
                    <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe]">Event Organizer</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 