"use client"

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, UsersIcon, BellIcon } from '@/components/icons'

// Mock data
const upcomingEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-06-10T10:00:00',
    location: 'Conference Room A',
    color: 'bg-primary-500'
  },
  {
    id: '2',
    title: 'Lunch with Alex',
    date: '2023-06-10T12:30:00',
    location: 'Cafe Downtown',
    color: 'bg-secondary-500'
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: '2023-06-12T17:00:00',
    location: 'Office',
    color: 'bg-accent-500'
  },
]

const myCalendars = [
  {
    id: '1',
    name: 'Personal',
    events: 12,
    color: 'bg-primary-500'
  },
  {
    id: '2',
    name: 'Work',
    events: 8,
    color: 'bg-secondary-500'
  },
  {
    id: '3',
    name: 'Family',
    events: 5,
    color: 'bg-accent-500'
  },
]

const myGroups = [
  {
    id: '1',
    name: 'Development Team',
    members: 6,
    avatar: '👨‍💻'
  },
  {
    id: '2',
    name: 'Family',
    members: 4,
    avatar: '👨‍👩‍👧‍👦'
  },
  {
    id: '3',
    name: 'Hiking Club',
    members: 12,
    avatar: '🏔️'
  },
]

export default function Dashboard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, User!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your calendars
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            <section className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-primary-500" />
                  Upcoming Events
                </h2>
                <Link 
                  href="/calendar" 
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View Calendar
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-discord-800 rounded-lg hover:bg-gray-100 dark:hover:bg-discord-700 transition-colors duration-200">
                    <div className={`${event.color} w-4 h-full rounded-full flex-shrink-0`}></div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {event.location}
                      </p>
                    </div>
                    <button className="btn-ghost p-2">
                      <BellIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                
                <div className="text-center pt-2">
                  <Link
                    href="/event/new"
                    className="btn-primary inline-block"
                  >
                    Add New Event
                  </Link>
                </div>
              </div>
            </section>

            <section className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-primary-500" />
                  My Groups
                </h2>
                <Link 
                  href="/groups" 
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Manage Groups
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {myGroups.map(group => (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="card p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-lg">
                        {group.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {group.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {group.members} members
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - My Calendars & Quick Links */}
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                My Calendars
              </h2>
              <div className="space-y-3">
                {myCalendars.map(calendar => (
                  <Link
                    key={calendar.id}
                    href={`/calendar/${calendar.id}`}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-discord-800 rounded-lg hover:bg-gray-100 dark:hover:bg-discord-700 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`${calendar.color} w-4 h-4 rounded-full mr-3`}></div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {calendar.name}
                      </span>
                    </div>
                    <span className="bg-gray-200 dark:bg-discord-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                      {calendar.events} events
                    </span>
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    href="/calendar/new"
                    className="btn-secondary w-full text-center"
                  >
                    Create Calendar
                  </Link>
                </div>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Link
                  href="/event/new"
                  className="menu-item bg-gray-50 dark:bg-discord-800"
                >
                  <CalendarIcon className="w-5 h-5 text-primary-500" />
                  <span className="ml-3">New Event</span>
                </Link>
                <Link
                  href="/groups/new"
                  className="menu-item bg-gray-50 dark:bg-discord-800"
                >
                  <UsersIcon className="w-5 h-5 text-primary-500" />
                  <span className="ml-3">Create Group</span>
                </Link>
                <Link
                  href="/calendar/import"
                  className="menu-item bg-gray-50 dark:bg-discord-800"
                >
                  <CalendarIcon className="w-5 h-5 text-primary-500" />
                  <span className="ml-3">Import Calendar</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 