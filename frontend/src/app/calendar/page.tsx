"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/icons'
import Link from 'next/link'

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-06-10',
    color: 'bg-[#5865f2]'
  },
  {
    id: '2',
    title: 'Lunch with Alex',
    date: '2023-06-10',
    color: 'bg-[#3ba55c]'
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: '2023-06-12',
    color: 'bg-[#eb459e]'
  },
  {
    id: '4',
    title: 'Doctor Appointment',
    date: '2023-06-15',
    color: 'bg-[#faa61a]'
  },
  {
    id: '5',
    title: 'Birthday Party',
    date: '2023-06-20',
    color: 'bg-[#ed4245]'
  }
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  
  // Helper functions for calendar rendering
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }
  
  const getMonthData = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: 0, date: null, events: [] })
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split('T')[0]
      const events = mockEvents.filter(event => event.date === dateString)
      days.push({ day, date, events })
    }
    
    return days
  }
  
  const monthData = getMonthData()
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()
  
  const previousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }
  
  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }
  
  const goToToday = () => {
    setCurrentDate(new Date())
  }
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <AppShell>
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-[#37352f] dark:text-white">Calendar</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="p-2 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b]"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium text-[#37352f] dark:text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="p-2 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b]"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <Link 
            href="/event/new"
            className="px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors flex items-center"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Event
          </Link>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-[#e6e6e6] dark:border-[#202225]">
            {dayNames.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {monthData.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-[#e6e6e6] dark:border-[#202225] ${
                  index % 7 === 6 ? 'border-r-0' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${
                    day.date?.toDateString() === new Date().toDateString()
                      ? 'text-[#37352f] dark:text-white'
                      : 'text-[#6b7280] dark:text-[#b9bbbe]'
                  }`}>
                    {day.day > 0 ? day.day : day.date?.getDate()}
                  </span>
                  <Link 
                    href={day.date ? `/event/new?date=${day.date.toISOString().split('T')[0]}` : '#'}
                    className="w-5 h-5 rounded-full bg-[#f0f0f0] dark:bg-[#36393f] border border-[#e6e6e6] dark:border-[#202225] flex items-center justify-center text-[#6b7280] dark:text-[#b9bbbe] hover:text-[#37352f] dark:hover:text-white hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] hover:border-[#b9bbbe] transition-colors"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </Link>
                </div>

                {/* Events for the day */}
                <div className="space-y-1">
                  {day.events.map((event) => (
                    <Link
                      key={event.id}
                      href={`/event/${event.id}`}
                      className="block p-1.5 rounded text-xs font-medium bg-[#f0f0f0] dark:bg-[#36393f] text-[#37352f] dark:text-white hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] transition-colors truncate"
                    >
                      {event.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
} 