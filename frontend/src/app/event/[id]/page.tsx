"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import Link from 'next/link'
import { 
  CalendarIcon, 
  MessageCircleIcon, 
  BellIcon, 
  UsersIcon, 
  ChevronLeftIcon, 
  ClockIcon,
  MapPinIcon,
  TrashIcon,
  PencilIcon
} from '@/components/icons'

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
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
  }
  
  return (
    <AppShell>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Event Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#37352f] dark:text-white mb-2">{event.title}</h1>
              <div className="flex items-center gap-4 text-[#6b7280] dark:text-[#b9bbbe]">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    {event.location}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#f0f0f0] dark:bg-[#36393f] text-[#37352f] dark:text-white rounded-md hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] transition-colors">
                Edit
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-[#ed4245] text-white rounded-md hover:bg-[#c03537] transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] overflow-hidden">
            {/* Description */}
            <div className="p-6 border-b border-[#e6e6e6] dark:border-[#202225]">
              <h2 className="text-lg font-semibold text-[#37352f] dark:text-white mb-4">Description</h2>
              <p className="text-[#6b7280] dark:text-[#b9bbbe] whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Participants */}
            <div className="p-6 border-b border-[#e6e6e6] dark:border-[#202225]">
              <h2 className="text-lg font-semibold text-[#37352f] dark:text-white mb-4">Participants</h2>
              <div className="flex flex-wrap gap-2">
                {event.attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f0f0] dark:bg-[#36393f] rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#5865f2] flex items-center justify-center text-sm font-medium text-white">
                      {attendee.name.charAt(0)}
                    </div>
                    <span className="text-sm text-[#37352f] dark:text-white">{attendee.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-[#37352f] dark:text-white mb-4">Additional Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#6b7280] dark:text-[#b9bbbe]" />
                  <span className="text-[#6b7280] dark:text-[#b9bbbe]">
                    {event.calendar} Calendar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 