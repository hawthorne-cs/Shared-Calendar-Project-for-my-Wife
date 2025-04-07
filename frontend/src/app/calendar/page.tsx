"use client"

import { useState, useEffect } from 'react'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/icons'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'

// Mock data for events (structure example)
interface CalendarEvent {
  id: string;
  title: string;
  color?: string; // Optional color for styling
}

// Updated Mock event data structure & retrieval
const mockEventsByDate: { [date: string]: CalendarEvent[] } = {
  '2023-06-10': [
    { id: '1', title: 'Team Meeting', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' },
    { id: '2', title: 'Lunch with Alex', color: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' }
  ],
  '2023-06-12': [
    { id: '3', title: 'Project Deadline', color: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' }
  ],
   '2023-06-15': [
    { id: '4', title: 'Doctor Appointment', color: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' }
  ],
  '2023-06-20': [
    { id: '5', title: 'Birthday Party', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' }
  ]
}

// Helper function to generate calendar days (Improved)
const generateCalendarDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];

  // Days from previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const day = daysInPrevMonth - firstDayOfMonth + 1 + i;
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString().split('T')[0];
    days.push({ day: day, date: date, isCurrentMonth: false, events: mockEventsByDate[dateString] || [] });
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    days.push({ day: day, date: date, isCurrentMonth: true, events: mockEventsByDate[dateString] || [] });
  }

  // Days from next month to fill the grid (usually up to 6 weeks total)
  const totalDays = days.length;
  const remainingDays = (7 - (totalDays % 7)) % 7; 
  for (let i = 1; i <= remainingDays; i++) {
     const date = new Date(year, month + 1, i);
     const dateString = date.toISOString().split('T')[0];
    days.push({ day: i, date: date, isCurrentMonth: false, events: mockEventsByDate[dateString] || [] });
  }

  return days;
};


export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  // const [view, setView] = useState<'month' | 'week' | 'day'>('month') // View state not used currently
  const [isLoading, setIsLoading] = useState(true)
  
  // Generate calendar data based on current date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [calendarDays, setCalendarDays] = useState(() => generateCalendarDays(year, month));
  
  // Update calendar days and simulate loading when month changes
  useEffect(() => {
    setIsLoading(true)
    // Simulate fetch/generation delay
    const timer = setTimeout(() => {
      setCalendarDays(generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth()));
      setIsLoading(false)
    }, 500) // Shorter delay for calendar interaction
    return () => clearTimeout(timer)
  }, [currentDate])
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <AppShell>
      <div className="p-6">
        {/* Calendar Header */}
         <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-[#37352f] dark:text-white">Calendar</h2>
            {/* Month Navigation */} 
            <div className="flex items-center gap-1 sm:gap-2 bg-white dark:bg-[#2f3136] border border-[#e6e6e6] dark:border-[#40444b] rounded-md p-1 shadow-sm">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1))}
                className="p-1.5 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <span className="text-base sm:text-lg font-medium text-[#37352f] dark:text-white px-2 whitespace-nowrap w-32 text-center">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1))}
                className="p-1.5 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] transition-colors"
                aria-label="Next month"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Add Event Button */}
          <Link 
            href="/event/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors text-sm font-medium shadow-sm"
          >
            <PlusIcon className="w-4 h-4 mr-1 -ml-1" />
            Add Event
          </Link>
        </div>

        {/* Calendar Grid - Use Card component */} 
        <Card className="overflow-hidden relative min-h-[500px] sm:min-h-[600px]">
           {/* Remove padding from CardContent as grid has its own structure */} 
           <CardContent className="p-0">
                {/* Loading Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 dark:bg-[#2f3136]/80 flex justify-center items-center z-10 transition-opacity duration-300">
                      {/* Loading Spinner */}
                      <svg className="animate-spin h-8 w-8 text-[#6b7280] dark:text-[#b9bbbe]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  </div>
                )}
                
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 border-b border-[#e6e6e6] dark:border-[#40444b] bg-gray-50 dark:bg-[#202225]">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-[#6b7280] dark:text-[#8e9297] uppercase tracking-wider"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days Grid */} 
                <div className={`grid grid-cols-7 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  {calendarDays.map((day, index) => (
                    // Day Cell Container - Remove Card-like styles from here
                    <div
                      key={day.date ? day.date.toISOString() : `empty-${index}`}
                      className={`relative min-h-[100px] sm:min-h-[120px] p-1.5 sm:p-2 border-r border-b border-[#e6e6e6] dark:border-[#40444b] flex flex-col group ${
                        index % 7 === 6 ? 'border-r-0' : ''
                      } ${day.isCurrentMonth ? 'bg-white dark:bg-[#2f3136]' : 'bg-gray-50/50 dark:bg-[#202225]/50'}`}
                    >
                      {/* Day Header */}
                      <div className="flex justify-between items-center mb-1">
                        {/* Day Number */}
                        <span className={`text-xs sm:text-sm font-medium ${ day.isCurrentMonth ? 'text-[#37352f] dark:text-white' : 'text-gray-400 dark:text-gray-600' }`}>
                          {day.day}
                        </span>
                        {/* Add Event Button (only for valid dates) */}
                        {day.date && (
                            <Link 
                              href={`/event/new?date=${day.date.toISOString().split('T')[0]}`}
                              className="w-5 h-5 rounded-md bg-transparent dark:bg-transparent hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0"
                              aria-label={`Add event on ${day.date.toLocaleDateString()}`}
                            >
                              <PlusIcon className="w-4 h-4" />
                            </Link>
                        )}
                      </div>

                      {/* Event List */}
                      <div className="space-y-1 flex-grow overflow-y-auto text-[11px] sm:text-xs">
                        {day.events.map((event) => (
                          <Link
                            key={event.id}
                            href={`/event/${event.id}`}
                            className={`block px-1.5 py-0.5 rounded font-medium ${event.color || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:opacity-80 transition-opacity truncate`}
                            title={event.title}
                          >
                            {event.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
           </CardContent>
        </Card>
      </div>
    </AppShell>
  )
} 