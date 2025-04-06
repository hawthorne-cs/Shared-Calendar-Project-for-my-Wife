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
        {/* Calendar header - Notion style */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-[#37352f] dark:text-white">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-[#eeeeee] dark:bg-[#2b2d31] text-[#5865f2] rounded-md mr-3">
                <CalendarIcon className="w-5 h-5" />
              </span>
              Calendar
            </h1>
            
            <div className="flex space-x-2">
              <Link 
                href="/event/new"
                className="px-3 h-8 bg-[#f7f6f3] dark:bg-[#5865f2] text-[#37352f] dark:text-white rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#4752c4] transition-colors flex items-center text-sm"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                New Event
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-[#37352f] dark:text-white mr-2">
                {monthName} {year}
              </h2>
              <div className="flex border border-[#e6e6e6] dark:border-[#202225] rounded-md overflow-hidden">
                <button 
                  onClick={previousMonth}
                  className="p-1.5 bg-white dark:bg-[#2b2d31] text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors border-r border-[#e6e6e6] dark:border-[#202225]"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-1.5 bg-white dark:bg-[#2b2d31] text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex bg-white dark:bg-[#2b2d31] border border-[#e6e6e6] dark:border-[#202225] rounded-md overflow-hidden">
                {['month', 'week', 'day'].map((viewType) => (
                  <button 
                    key={viewType}
                    onClick={() => setView(viewType as 'month' | 'week' | 'day')}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      view === viewType
                        ? 'bg-[#f7f6f3] dark:bg-[#36393f] text-[#37352f] dark:text-white'
                        : 'text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white'
                    } ${viewType !== 'day' ? 'border-r border-[#e6e6e6] dark:border-[#202225]' : ''}`}
                  >
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={goToToday}
                className="px-4 py-1.5 text-sm bg-[#f7f6f3] dark:bg-[#3ba55c] text-[#37352f] dark:text-white rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#359951] transition-colors border border-[#e6e6e6] dark:border-transparent"
              >
                Today
              </button>
            </div>
          </div>
        </header>
        
        {/* Calendar content - Notion inspired */}
        <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] overflow-hidden shadow-sm">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-[#f7f6f3] dark:bg-[#2b2d31] border-b border-[#e6e6e6] dark:border-[#202225]">
            {dayNames.map(day => (
              <div 
                key={day} 
                className="py-2 text-center text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe]"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days - Notion inspired */}
          <div className="grid grid-cols-7 divide-x divide-y divide-[#e6e6e6] dark:divide-[#202225]">
            {monthData.map((day, index) => (
              <div 
                key={index} 
                className={`min-h-[110px] relative p-2 ${
                  day.day === 0
                    ? 'bg-[#f7f6f3] dark:bg-[#202225]'
                    : day.date?.toDateString() === new Date().toDateString()
                      ? 'bg-[#f8f8f7] dark:bg-[#36393f]'
                      : 'bg-white dark:bg-[#2f3136] hover:bg-[#f8f8f7] dark:hover:bg-[#36393f] transition-colors'
                }`}
              >
                {day.day > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span 
                        className={`text-sm ${
                          day.date?.toDateString() === new Date().toDateString()
                            ? 'font-medium text-[#37352f] dark:text-white'
                            : 'text-[#6b7280] dark:text-[#b9bbbe]'
                        }`}
                      >
                        {day.day}
                      </span>
                      <Link 
                        href={day.date ? `/event/new?date=${day.date.toISOString().split('T')[0]}` : '#'}
                        className="w-5 h-5 rounded-md bg-transparent flex items-center justify-center text-transparent hover:text-[#6b7280] dark:hover:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#2b2d31] transition-colors group"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px]">
                      {day.events.map(event => (
                        <Link 
                          key={event.id}
                          href={`/event/${event.id}`}
                          className={`${event.color} opacity-90 hover:opacity-100 px-2 py-1 rounded text-white text-xs truncate shadow-sm block transition-all`}
                        >
                          {event.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
} 