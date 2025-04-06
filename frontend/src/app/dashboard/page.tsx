"use client"

import { AppShell } from '@/components/app-shell'
import Link from 'next/link'
import { CalendarIcon, MessageCircleIcon, BellIcon, UserIcon, SettingsIcon, UsersIcon, ChevronRightIcon } from '@/components/icons'

// Mock data for events
const upcomingEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: 'Today, 2:00 PM',
    description: 'Weekly team sync to discuss project progress',
    color: 'bg-[#5865f2]',
  },
  {
    id: '2',
    title: 'Lunch with Alex',
    date: 'Tomorrow, 12:30 PM',
    description: 'Catching up over lunch at the new restaurant downtown',
    color: 'bg-[#3ba55c]',
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: 'Jun 15, 11:59 PM',
    description: 'Final submission for the Q2 project',
    color: 'bg-[#eb459e]',
  },
]

// Mock data for groups
const groups = [
  {
    id: '1',
    name: 'Family',
    events: 3,
    color: 'bg-[#5865f2]',
  },
  {
    id: '2',
    name: 'Work Team',
    events: 5,
    color: 'bg-[#3ba55c]',
  },
]

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6">
        {/* Dashboard header - Notion style */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-[#37352f] dark:text-white">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-[#eeeeee] dark:bg-[#2b2d31] rounded-md mr-3">
                🏠
              </span>
              Dashboard
            </h1>
          </div>
          <p className="text-[#6b7280] dark:text-[#b9bbbe] max-w-2xl">
            Welcome to your personal dashboard. View your upcoming events, latest group activities, and quick access to important features.
          </p>
        </header>

        {/* Dashboard content - Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events section */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225] flex justify-between items-center">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#eeeeee] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-2">
                    <CalendarIcon className="w-4 h-4" />
                  </span>
                  Upcoming Events
                </h2>
                <Link href="/calendar" className="text-sm text-[#5865f2] hover:underline flex items-center">
                  View calendar
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="divide-y divide-[#e6e6e6] dark:divide-[#202225]">
                {upcomingEvents.map(event => (
                  <Link 
                    key={event.id} 
                    href={`/event/${event.id}`}
                    className="block p-4 hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                  >
                    <div className="flex items-start">
                      <div className={`${event.color} w-1 self-stretch rounded-full mr-3 flex-shrink-0`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-[#37352f] dark:text-white">{event.title}</h3>
                          <span className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">{event.date}</span>
                        </div>
                        <p className="text-sm text-[#6b7280] dark:text-[#b9bbbe] mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                {upcomingEvents.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-[#6b7280] dark:text-[#b9bbbe]">No upcoming events</p>
                    <Link 
                      href="/event/new" 
                      className="inline-flex items-center mt-2 text-[#5865f2] hover:underline"
                    >
                      Create an event
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Groups section */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225] flex justify-between items-center">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#eeeeee] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-2">
                    <UsersIcon className="w-4 h-4" />
                  </span>
                  My Groups
                </h2>
                <Link href="/groups" className="text-sm text-[#5865f2] hover:underline flex items-center">
                  View all
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="divide-y divide-[#e6e6e6] dark:divide-[#202225]">
                {groups.map(group => (
                  <Link 
                    key={group.id} 
                    href={`/groups/${group.id}`}
                    className="flex items-center justify-between p-4 hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`${group.color} w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-medium mr-3`}>
                        {group.name.slice(0, 1)}
                      </div>
                      <div>
                        <h3 className="font-medium text-[#37352f] dark:text-white">{group.name}</h3>
                        <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe]">{group.events} upcoming events</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-[#6b7280] dark:text-[#b9bbbe]" />
                  </Link>
                ))}
                {groups.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-[#6b7280] dark:text-[#b9bbbe]">No groups yet</p>
                    <Link 
                      href="/groups/new" 
                      className="inline-flex items-center mt-2 text-[#5865f2] hover:underline"
                    >
                      Create a group
                      <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick actions */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Quick Actions</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <Link 
                  href="/event/new" 
                  className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#5865f2] rounded-md text-white mb-2">
                    <CalendarIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">New Event</span>
                </Link>
                <Link 
                  href="/groups/new" 
                  className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#3ba55c] rounded-md text-white mb-2">
                    <UsersIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">New Group</span>
                </Link>
                <Link 
                  href="/messages" 
                  className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#eb459e] rounded-md text-white mb-2">
                    <MessageCircleIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">Messages</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex flex-col items-center justify-center p-4 bg-[#f7f6f3] dark:bg-[#36393f] rounded-lg hover:bg-[#eeeeee] dark:hover:bg-[#40444b] transition-colors text-center"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#faa61a] rounded-md text-white mb-2">
                    <UserIcon className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-medium text-[#37352f] dark:text-white">Profile</span>
                </Link>
              </div>
            </section>

            {/* Activity summary */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Activity Summary</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Events this month</span>
                      <span className="text-sm font-medium text-[#37352f] dark:text-white">8</span>
                    </div>
                    <div className="w-full bg-[#eeeeee] dark:bg-[#202225] rounded-full h-2">
                      <div className="bg-[#5865f2] h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Active groups</span>
                      <span className="text-sm font-medium text-[#37352f] dark:text-white">2/5</span>
                    </div>
                    <div className="w-full bg-[#eeeeee] dark:bg-[#202225] rounded-full h-2">
                      <div className="bg-[#3ba55c] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[#6b7280] dark:text-[#b9bbbe]">Messages</span>
                      <span className="text-sm font-medium text-[#37352f] dark:text-white">12 new</span>
                    </div>
                    <div className="w-full bg-[#eeeeee] dark:bg-[#202225] rounded-full h-2">
                      <div className="bg-[#eb459e] h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shortcuts */}
            <section className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#e6e6e6] dark:border-[#202225]">
                <h2 className="text-lg font-medium text-[#37352f] dark:text-white">Shortcuts</h2>
              </div>
              <div className="divide-y divide-[#e6e6e6] dark:divide-[#202225]">
                <Link 
                  href="/notifications" 
                  className="flex items-center p-3 hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-3">
                    <BellIcon className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-[#37352f] dark:text-white">Notifications</span>
                </Link>
                <Link 
                  href="/settings" 
                  className="flex items-center p-3 hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-[#f7f6f3] dark:bg-[#36393f] text-[#5865f2] rounded-md mr-3">
                    <SettingsIcon className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-[#37352f] dark:text-white">Settings</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 