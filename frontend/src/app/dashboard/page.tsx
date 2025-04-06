"use client"

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { 
  PlusIcon, 
  UsersIcon, 
  CalendarIcon, 
  ClockIcon, 
  SettingsIcon,
  BellIcon,
  MessageCircleIcon,
  UserIcon
} from '@/components/icons'

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: '1',
    title: 'Team Sync Meeting',
    date: '2024-07-30',
    time: '10:00 AM',
    calendar: 'Work',
    color: 'bg-[#5865f2]'
  },
  {
    id: '2',
    title: 'Project Phoenix Demo',
    date: '2024-07-30',
    time: '02:00 PM',
    calendar: 'Work',
    color: 'bg-[#5865f2]'
  },
  {
    id: '3',
    title: 'Dentist Appointment',
    date: '2024-07-31',
    time: '11:30 AM',
    calendar: 'Personal',
    color: 'bg-[#3ba55c]'
  },
  {
    id: '4',
    title: 'Family Dinner',
    date: '2024-08-02',
    time: '06:00 PM',
    calendar: 'Family',
    color: 'bg-[#eb459e]'
  }
]

// Mock data for groups
const myGroups = [
  { id: '1', name: 'Development Team', members: 6, avatar: '👨‍💻' },
  { id: '2', name: 'Family', members: 4, avatar: '👨‍👩‍👧‍👦' },
  { id: '3', name: 'Hiking Club', members: 12, avatar: '🏔️' },
]

export default function DashboardPage() {
  const [currentDate] = useState(new Date())

  return (
    <AppShell>
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#37352f] dark:text-white mb-1">
            Welcome back, Alex!
          </h1>
          <p className="text-[#6b7280] dark:text-[#b9bbbe]">
            Today is {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Upcoming Events) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#37352f] dark:text-white">Upcoming Events</h2>
                <Link 
                  href="/calendar"
                  className="text-sm font-medium text-[#5865f2] hover:underline"
                >
                  View Calendar
                </Link>
              </div>
              <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] divide-y divide-[#e6e6e6] dark:divide-[#202225]">
                {upcomingEvents.map(event => (
                  <Link 
                    key={event.id}
                    href={`/event/${event.id}`}
                    className="block p-4 hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-[#37352f] dark:text-white">{event.title}</h3>
                        <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full ${event.color}`}></span>
                        <span className="text-[#6b7280] dark:text-[#b9bbbe]">{event.calendar}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {upcomingEvents.length === 0 && (
                  <p className="p-4 text-center text-[#6b7280] dark:text-[#b9bbbe]">No upcoming events.</p>
                )}
              </div>
            </section>

            {/* My Groups */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#37352f] dark:text-white">My Groups</h2>
                <Link 
                  href="/groups"
                  className="text-sm font-medium text-[#5865f2] hover:underline"
                >
                  View All Groups
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {myGroups.map(group => (
                  <Link 
                    key={group.id}
                    href={`/groups/${group.id}`}
                    className="bg-white dark:bg-[#2f3136] rounded-lg p-4 border border-[#e6e6e6] dark:border-[#202225] hover:border-[#5865f2] transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#36393f] dark:bg-[#202225] flex items-center justify-center text-lg mr-2">
                        {group.avatar}
                      </div>
                      <h3 className="font-medium text-[#37352f] dark:text-white truncate">{group.name}</h3>
                    </div>
                    <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">{group.members} members</p>
                  </Link>
                ))}
                {myGroups.length === 0 && (
                  <p className="col-span-full text-center text-[#6b7280] dark:text-[#b9bbbe]">You are not part of any groups.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column (Quick Actions removed) */}
          <div className="space-y-6">
            {/* Create Event Button */}
            <Link 
              href="/event/new"
              className="block w-full px-4 py-3 bg-[#5865f2] text-white text-center rounded-md hover:bg-[#4752c4] transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 inline-block mr-2 -mt-1" />
              Create New Event
            </Link>

            {/* Mini Calendar Placeholder */}
            <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] p-4">
              <h3 className="font-semibold text-[#37352f] dark:text-white mb-3">Calendar Overview</h3>
              <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Mini calendar component would go here.</p>
              {/* Placeholder for a mini calendar component */}
            </div>

            {/* Quick Actions Section Removed */}

          </div>
        </div>
      </div>
    </AppShell>
  )
} 