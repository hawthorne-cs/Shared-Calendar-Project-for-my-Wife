"use client"

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, UsersIcon, BellIcon, PlusIcon, HashtagIcon } from '@/components/icons'

// Mock data
const upcomingEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-06-10T10:00:00',
    location: 'Conference Room A',
    color: 'bg-[#5865f2]'
  },
  {
    id: '2',
    title: 'Lunch with Alex',
    date: '2023-06-10T12:30:00',
    location: 'Cafe Downtown',
    color: 'bg-[#3ba55c]'
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: '2023-06-12T17:00:00',
    location: 'Office',
    color: 'bg-[#eb459e]'
  },
]

const myCalendars = [
  {
    id: '1',
    name: 'Personal',
    events: 12,
    color: 'bg-[#5865f2]'
  },
  {
    id: '2',
    name: 'Work',
    events: 8,
    color: 'bg-[#3ba55c]'
  },
  {
    id: '3',
    name: 'Family',
    events: 5,
    color: 'bg-[#eb459e]'
  },
]

const myGroups = [
  {
    id: '1',
    name: 'Development Team',
    members: 6,
    avatar: '👨‍💻',
    color: 'bg-[#5865f2]'
  },
  {
    id: '2',
    name: 'Family',
    members: 4,
    avatar: '👨‍👩‍👧‍👦',
    color: 'bg-[#3ba55c]'
  },
  {
    id: '3',
    name: 'Hiking Club',
    members: 12,
    avatar: '🏔️',
    color: 'bg-[#eb459e]'
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
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="h-7 w-1 bg-[#5865f2] rounded-full"></span>
            Welcome back, User!
          </h1>
          <p className="text-[#b9bbbe]">
            Here's what's happening with your calendars
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Upcoming Events */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden">
              <div className="flex items-center border-b border-[#202225] px-4 py-3">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-[#b9bbbe]" />
                  Upcoming Events
                </h2>
                <Link 
                  href="/calendar" 
                  className="ml-auto text-sm text-[#5865f2] hover:underline"
                >
                  View Calendar
                </Link>
              </div>

              <div className="p-4 space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-4 p-4 bg-[#36393f] rounded-md hover:bg-[#40444b] transition-colors duration-200 border border-[#202225]">
                    <div className={`${event.color} w-2 h-full rounded-full flex-shrink-0`}></div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {event.title}
                      </h3>
                      <p className="text-sm text-[#b9bbbe]">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-[#b9bbbe] truncate">
                        {event.location}
                      </p>
                    </div>
                    <button className="w-8 h-8 rounded-md hover:bg-[#4f545c] flex items-center justify-center text-[#b9bbbe] hover:text-white transition-colors">
                      <BellIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                
                <div className="text-center pt-3">
                  <Link
                    href="/event/new"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add New Event
                  </Link>
                </div>
              </div>
            </section>

            <section className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden">
              <div className="flex items-center border-b border-[#202225] px-4 py-3">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-[#b9bbbe]" />
                  My Groups
                </h2>
                <Link 
                  href="/groups" 
                  className="ml-auto text-sm text-[#5865f2] hover:underline"
                >
                  Manage Groups
                </Link>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                {myGroups.map(group => (
                  <Link
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="bg-[#36393f] border border-[#202225] rounded-md p-4 hover:bg-[#40444b] transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${group.color} flex items-center justify-center text-lg shadow-sm`}>
                        {group.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {group.name}
                        </h3>
                        <p className="text-sm text-[#b9bbbe]">
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
            <section className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden">
              <div className="border-b border-[#202225] px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  My Calendars
                </h2>
              </div>

              <div className="p-4 space-y-2">
                {myCalendars.map(calendar => (
                  <Link
                    key={calendar.id}
                    href={`/calendar/${calendar.id}`}
                    className="flex items-center justify-between p-3 bg-[#36393f] rounded-md hover:bg-[#40444b] transition-colors duration-200 border border-[#202225]"
                  >
                    <div className="flex items-center">
                      <div className={`${calendar.color} w-3 h-3 rounded-full mr-3`}></div>
                      <span className="font-medium text-white">
                        {calendar.name}
                      </span>
                    </div>
                    <span className="bg-[#202225] text-[#b9bbbe] text-xs px-2 py-1 rounded-full">
                      {calendar.events} events
                    </span>
                  </Link>
                ))}
                <div className="pt-3">
                  <Link
                    href="/calendar/new"
                    className="inline-flex items-center justify-center w-full px-4 py-2 rounded-md bg-[#3ba55c] text-white hover:bg-[#359951] transition-colors"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create Calendar
                  </Link>
                </div>
              </div>
            </section>

            <section className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden">
              <div className="border-b border-[#202225] px-4 py-3">
                <h2 className="text-lg font-semibold text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="p-2">
                <Link
                  href="/event/new"
                  className="flex items-center px-3 py-2 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors"
                >
                  <CalendarIcon className="w-5 h-5 mr-3 text-[#5865f2]" />
                  <span>New Event</span>
                </Link>
                <Link
                  href="/groups/new"
                  className="flex items-center px-3 py-2 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors"
                >
                  <UsersIcon className="w-5 h-5 mr-3 text-[#3ba55c]" />
                  <span>Create Group</span>
                </Link>
                <Link
                  href="/calendar/import"
                  className="flex items-center px-3 py-2 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors"
                >
                  <HashtagIcon className="w-5 h-5 mr-3 text-[#eb459e]" />
                  <span>Import Calendar</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 