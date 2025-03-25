"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-06-10',
    color: 'bg-primary-500'
  },
  {
    id: '2',
    title: 'Lunch with Alex',
    date: '2023-06-10',
    color: 'bg-secondary-500'
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: '2023-06-12',
    color: 'bg-accent-500'
  },
  {
    id: '4',
    title: 'Doctor Appointment',
    date: '2023-06-15',
    color: 'bg-primary-500'
  },
  {
    id: '5',
    title: 'Birthday Party',
    date: '2023-06-20',
    color: 'bg-secondary-500'
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
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-primary-500" />
              Calendar
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your events and schedules
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex space-x-2">
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-md ${
                  view === 'month'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-discord-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md ${
                  view === 'week'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-discord-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md ${
                  view === 'day'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-discord-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Day
              </button>
            </div>
            
            <button 
              onClick={goToToday}
              className="px-3 py-1 bg-secondary-500 text-white rounded-md"
            >
              Today
            </button>
          </div>
        </header>
        
        <div className="card p-6">
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {monthName} {year}
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={previousMonth}
                className="p-2 rounded-full bg-gray-100 dark:bg-discord-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-discord-700"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-full bg-gray-100 dark:bg-discord-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-discord-700"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map(day => (
              <div 
                key={day} 
                className="py-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1 border-t border-gray-200 dark:border-discord-800 pt-1">
            {monthData.map((day, index) => (
              <div 
                key={index} 
                className={`min-h-[100px] relative border rounded-lg p-1 ${
                  day.day === 0
                    ? 'bg-gray-50 dark:bg-discord-950 border-gray-200 dark:border-discord-800'
                    : 'bg-white dark:bg-discord-900 border-gray-200 dark:border-discord-800'
                }`}
              >
                {day.day > 0 && (
                  <>
                    <div className="text-right mb-1">
                      <span 
                        className={`inline-block w-6 h-6 rounded-full text-center text-sm ${
                          day.date?.toDateString() === new Date().toDateString()
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {day.day}
                      </span>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px]">
                      {day.events.map(event => (
                        <div 
                          key={event.id}
                          className={`${event.color} px-2 py-1 rounded-md text-white text-xs truncate`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                    <button className="absolute bottom-1 right-1 w-5 h-5 bg-gray-200 dark:bg-discord-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 text-xs">
                      +
                    </button>
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