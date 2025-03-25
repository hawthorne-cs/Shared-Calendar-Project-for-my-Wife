"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon } from '@/components/icons'

// Mock calendar data
const myCalendars = [
  { id: '1', name: 'Personal', color: 'bg-primary-500' },
  { id: '2', name: 'Work', color: 'bg-secondary-500' },
  { id: '3', name: 'Family', color: 'bg-accent-500' }
]

interface EventFormData {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  calendarId: string
  isAllDay: boolean
  isRecurring: boolean
  recurringType: 'daily' | 'weekly' | 'monthly' | 'yearly'
  notificationTime: '5min' | '15min' | '30min' | '1hour' | '1day'
}

export default function NewEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    calendarId: myCalendars[0].id,
    isAllDay: false,
    isRecurring: false,
    recurringType: 'weekly',
    notificationTime: '15min'
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting event:', formData)
    
    // Here you would typically make an API call to save the event
    // For now, we'll just redirect back to the calendar
    
    router.push('/calendar')
  }
  
  const handleCancel = () => {
    router.back()
  }
  
  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <CalendarIcon className="w-6 h-6 mr-2 text-primary-500" />
            Create New Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Add a new event to your calendar
          </p>
        </header>
        
        <div className="card p-6 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input"
                placeholder="Add title"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input min-h-[100px]"
                placeholder="Add description"
              />
            </div>
            
            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              
              <div className="flex items-center mt-6 md:mt-0">
                <input
                  type="checkbox"
                  id="isAllDay"
                  name="isAllDay"
                  checked={formData.isAllDay}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  All day event
                </label>
              </div>
            </div>
            
            {/* Time selection (only if not all day) */}
            {!formData.isAllDay && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Time *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
              </div>
            )}
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input"
                placeholder="Add location"
              />
            </div>
            
            {/* Calendar Selection */}
            <div>
              <label htmlFor="calendarId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Calendar *
              </label>
              <select
                id="calendarId"
                name="calendarId"
                value={formData.calendarId}
                onChange={handleInputChange}
                className="input"
                required
              >
                {myCalendars.map(calendar => (
                  <option key={calendar.id} value={calendar.id}>
                    {calendar.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Recurring Event */}
            <div className="bg-gray-50 dark:bg-discord-800 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="isRecurring"
                  name="isRecurring"
                  checked={formData.isRecurring}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="isRecurring" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recurring Event
                </label>
              </div>
              
              {formData.isRecurring && (
                <div className="mt-2">
                  <label htmlFor="recurringType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Repeat
                  </label>
                  <select
                    id="recurringType"
                    name="recurringType"
                    value={formData.recurringType}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
            </div>
            
            {/* Notification */}
            <div>
              <label htmlFor="notificationTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notification
              </label>
              <select
                id="notificationTime"
                name="notificationTime"
                value={formData.notificationTime}
                onChange={handleInputChange}
                className="input"
              >
                <option value="5min">5 minutes before</option>
                <option value="15min">15 minutes before</option>
                <option value="30min">30 minutes before</option>
                <option value="1hour">1 hour before</option>
                <option value="1day">1 day before</option>
              </select>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-discord-700">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  )
} 