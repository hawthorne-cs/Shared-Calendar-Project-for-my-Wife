"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ChevronLeftIcon, PlusIcon, SettingsIcon, UsersIcon, MessageCircleIcon } from '@/components/icons'

// Mock event data
const mockEvent = {
  id: '123',
  title: 'Team Project Planning',
  description: 'Initial planning session for the new project. We\'ll discuss goals, timeline, and assign initial tasks. Please come prepared with ideas and any questions you might have.',
  date: '2023-07-22T14:00:00',
  endDate: '2023-07-22T15:30:00',
  location: 'Conference Room B',
  calendar: {
    id: '1',
    name: 'Work',
    color: '#5865f2'
  },
  organizer: {
    id: '101',
    name: 'Sarah Johnson',
    avatar: 'SJ'
  },
  attendees: [
    {
      id: '101',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      status: 'going'
    },
    {
      id: '102',
      name: 'Mike Thompson',
      avatar: 'MT',
      status: 'going'
    },
    {
      id: '103',
      name: 'Alex Wong',
      avatar: 'AW',
      status: 'maybe'
    },
    {
      id: '104',
      name: 'Emily Chen',
      avatar: 'EC',
      status: 'not_responded'
    }
  ],
  isRecurring: true,
  recurrence: 'weekly',
  reminder: '30 minutes before',
  isAllDay: false,
  created: '2023-07-15T10:32:00'
}

export default function EventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [event, setEvent] = useState(mockEvent)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [attendeeStatus, setAttendeeStatus] = useState<'going' | 'maybe' | 'not_going'>('going')

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  // Calculate event duration
  const getDuration = () => {
    const start = new Date(event.date)
    const end = new Date(event.endDate)
    const diff = Math.abs(end.getTime() - start.getTime())
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0 && minutes > 0) {
      return `${hours} hr ${minutes} min`
    } else if (hours > 0) {
      return `${hours} hr`
    } else {
      return `${minutes} min`
    }
  }

  // Handle event deletion
  const handleDeleteEvent = () => {
    console.log('Deleting event:', event.id)
    // Here you would normally make an API call to delete the event
    router.push('/calendar')
  }

  // Handle attendance status change
  const handleAttendanceChange = (status: 'going' | 'maybe' | 'not_going') => {
    setAttendeeStatus(status)
    // Here you would normally make an API call to update the attendance status
  }

  return (
    <AppShell>
      <div className="bg-[#36393f] min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              href="/calendar" 
              className="inline-flex items-center text-[#b9bbbe] hover:text-white transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back to Calendar
            </Link>
          </div>
          
          <div className="bg-[#2f3136] rounded-lg shadow-lg overflow-hidden">
            {/* Event header */}
            <div className="p-6 border-b border-[#202225]">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{event.title}</h1>
                  <div className="flex items-center text-[#b9bbbe]">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: event.calendar.color }}
                    ></div>
                    <span>{event.calendar.name}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => router.push(`/event/edit/${event.id}`)}
                    className="px-3 py-1 bg-[#4f545c] text-white rounded-md hover:bg-[#5d6269] transition-colors flex items-center"
                  >
                    <SettingsIcon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowConfirmDelete(true)}
                    className="px-3 py-1 bg-[#ed4245] text-white rounded-md hover:bg-[#d93235] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            
            {/* Event details */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Main details */}
                <div className="flex-1">
                  {/* Date and time */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white mb-3">
                      <CalendarIcon className="w-5 h-5 inline-block mr-2 text-[#b9bbbe]" />
                      Date & Time
                    </h2>
                    <div className="bg-[#36393f] rounded-md p-4 text-white">
                      <div className="mb-2">{formatDate(event.date)}</div>
                      {!event.isAllDay && (
                        <div className="flex items-center text-[#b9bbbe]">
                          <span>{formatTime(event.date)} - {formatTime(event.endDate)}</span>
                          <span className="mx-2">•</span>
                          <span>{getDuration()}</span>
                        </div>
                      )}
                      {event.isRecurring && (
                        <div className="mt-3 text-[#b9bbbe] flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                          </svg>
                          Repeats {event.recurrence}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-[#b9bbbe]">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Location
                    </h2>
                    <div className="bg-[#36393f] rounded-md p-4 text-white">
                      {event.location || 'No location specified'}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 text-[#b9bbbe]">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                      Description
                    </h2>
                    <div className="bg-[#36393f] rounded-md p-4 text-white">
                      <p className="whitespace-pre-wrap">{event.description || 'No description provided'}</p>
                    </div>
                  </div>
                  
                  {/* Organizer */}
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">
                      <UsersIcon className="w-5 h-5 inline-block mr-2 text-[#b9bbbe]" />
                      Organizer
                    </h2>
                    <div className="bg-[#36393f] rounded-md p-4 text-white">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-medium mr-3">
                          {event.organizer.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{event.organizer.name}</div>
                          <div className="text-sm text-[#b9bbbe]">Created on {new Date(event.created).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="md:w-64">
                  {/* Your RSVP */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white mb-3">Your RSVP</h2>
                    <div className="bg-[#36393f] rounded-md p-4">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAttendanceChange('going')}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            attendeeStatus === 'going'
                              ? 'bg-[#3ba55c] text-white'
                              : 'bg-[#2f3136] text-[#b9bbbe] hover:bg-[#40444b] hover:text-white'
                          }`}
                        >
                          Going
                        </button>
                        <button
                          onClick={() => handleAttendanceChange('maybe')}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            attendeeStatus === 'maybe'
                              ? 'bg-[#faa61a] text-white'
                              : 'bg-[#2f3136] text-[#b9bbbe] hover:bg-[#40444b] hover:text-white'
                          }`}
                        >
                          Maybe
                        </button>
                        <button
                          onClick={() => handleAttendanceChange('not_going')}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            attendeeStatus === 'not_going'
                              ? 'bg-[#ed4245] text-white'
                              : 'bg-[#2f3136] text-[#b9bbbe] hover:bg-[#40444b] hover:text-white'
                          }`}
                        >
                          Not Going
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Attendees */}
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-white mb-3">
                      <UsersIcon className="w-5 h-5 inline-block mr-2 text-[#b9bbbe]" />
                      Attendees ({event.attendees.length})
                    </h2>
                    <div className="bg-[#36393f] rounded-md p-4">
                      <div className="space-y-3">
                        {event.attendees.map((attendee) => (
                          <div key={attendee.id} className="flex items-center">
                            <div className="relative mr-3">
                              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-medium">
                                {attendee.avatar}
                              </div>
                              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#36393f] ${
                                attendee.status === 'going' 
                                  ? 'bg-[#3ba55c]' 
                                  : attendee.status === 'maybe' 
                                    ? 'bg-[#faa61a]' 
                                    : 'bg-[#747f8d]'
                              }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white">{attendee.name}</div>
                              <div className="text-xs text-[#b9bbbe]">
                                {attendee.status === 'going' && 'Going'}
                                {attendee.status === 'maybe' && 'Maybe'}
                                {attendee.status === 'not_going' && 'Not Going'}
                                {attendee.status === 'not_responded' && 'No Response'}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <button className="w-full mt-3 flex items-center justify-center px-4 py-2 bg-[#4f545c] text-white rounded-md hover:bg-[#5d6269] transition-colors">
                          <PlusIcon className="w-4 h-4 mr-2" />
                          Invite More
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div>
                    <h2 className="text-lg font-medium text-white mb-3">Quick Actions</h2>
                    <div className="space-y-2">
                      <button className="w-full flex items-center px-4 py-2 bg-[#36393f] text-[#b9bbbe] rounded-md hover:bg-[#40444b] hover:text-white transition-colors">
                        <MessageCircleIcon className="w-4 h-4 mr-2" />
                        Message Organizer
                      </button>
                      <button className="w-full flex items-center px-4 py-2 bg-[#36393f] text-[#b9bbbe] rounded-md hover:bg-[#40444b] hover:text-white transition-colors">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Add to My Calendar
                      </button>
                      <button className="w-full flex items-center px-4 py-2 bg-[#36393f] text-[#b9bbbe] rounded-md hover:bg-[#40444b] hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        Share Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delete confirmation modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#36393f] rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-white mb-4">Delete Event</h3>
              <p className="text-[#dcddde] mb-6">
                Are you sure you want to delete this event? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 bg-[#4f545c] text-white rounded-md hover:bg-[#5d6269] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-[#ed4245] text-white rounded-md hover:bg-[#d93235] transition-colors"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
} 