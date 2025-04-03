"use client"

import { useState } from 'react'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@/components/icons'

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
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="h-7 w-1 bg-[#5865f2] rounded-full"></span>
              Calendar
            </h1>
            <p className="text-[#b9bbbe]">
              Manage your events and schedules
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex bg-[#202225] p-1 rounded-md">
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  view === 'month'
                    ? 'bg-[#36393f] text-white'
                    : 'text-[#b9bbbe] hover:text-white'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  view === 'week'
                    ? 'bg-[#36393f] text-white'
                    : 'text-[#b9bbbe] hover:text-white'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('day')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  view === 'day'
                    ? 'bg-[#36393f] text-white'
                    : 'text-[#b9bbbe] hover:text-white'
                }`}
              >
                Day
              </button>
            </div>
            
            <button 
              onClick={goToToday}
              className="px-4 py-1.5 bg-[#3ba55c] text-white rounded-md hover:bg-[#359951] transition-colors"
            >
              Today
            </button>
          </div>
        </header>
        
        <div className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden">
          {/* Calendar header */}
          <div className="flex items-center justify-between p-4 border-b border-[#202225]">
            <h2 className="text-xl font-semibold text-white">
              {monthName} {year}
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={previousMonth}
                className="p-2 rounded-md bg-[#202225] text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 rounded-md bg-[#202225] text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div 
                  key={day} 
                  className="py-2 text-center text-sm font-medium text-[#b9bbbe]"
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {monthData.map((day, index) => (
                <div 
                  key={index} 
                  className={`min-h-[100px] relative rounded-md p-2 border ${
                    day.day === 0
                      ? 'bg-[#202225] border-[#202225]'
                      : day.date?.toDateString() === new Date().toDateString()
                        ? 'bg-[#36393f] border-[#5865f2]'
                        : 'bg-[#36393f] border-[#202225] hover:border-[#3ba55c] transition-colors'
                  }`}
                >
                  {day.day > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span 
                          className={`text-sm ${
                            day.date?.toDateString() === new Date().toDateString()
                              ? 'text-white font-semibold'
                              : 'text-[#b9bbbe]'
                          }`}
                        >
                          {day.day}
                        </span>
                        <button className="w-5 h-5 rounded-full bg-[#36393f] border border-[#202225] flex items-center justify-center text-[#b9bbbe] hover:text-white hover:bg-[#40444b] hover:border-[#b9bbbe] transition-colors">
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-[80px]">
                        {day.events.map(event => (
                          <div 
                            key={event.id}
                            className={`${event.color} px-2 py-1 rounded text-white text-xs font-medium truncate shadow-sm`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 