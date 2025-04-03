"use client"

import { useState } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { 
  UsersIcon, 
  PlusIcon, 
  CalendarIcon, 
  MessageCircleIcon, 
  SettingsIcon,
  ChevronRightIcon
} from '@/components/icons'

// Mock data for groups
const myGroups = [
  {
    id: '1',
    name: 'Development Team',
    description: 'Working on the new product features',
    members: 6,
    avatar: '👨‍💻',
    color: 'bg-[#5865f2]',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Family',
    description: 'Family events and gatherings',
    members: 4,
    avatar: '👨‍👩‍👧‍👦',
    color: 'bg-[#3ba55c]',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Hiking Club',
    description: 'Planning weekend hikes and outdoor activities',
    members: 12,
    avatar: '🏔️',
    color: 'bg-[#eb459e]',
    lastActive: '3 days ago'
  },
  {
    id: '4',
    name: 'Book Club',
    description: 'Monthly book discussions and recommendations',
    members: 8,
    avatar: '📚',
    color: 'bg-[#faa61a]',
    lastActive: '1 week ago'
  }
]

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter groups based on search query
  const filteredGroups = myGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="h-7 w-1 bg-[#5865f2] rounded-full"></span>
            My Groups
          </h1>
          <p className="text-[#b9bbbe]">
            Manage your groups and team calendars
          </p>
        </header>

        {/* Actions row */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 bg-[#202225] border border-[#36393f] rounded-md text-white placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
            />
            <div className="absolute left-3 top-2.5 text-[#b9bbbe]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Create Group Button */}
          <Link
            href="/groups/new"
            className="inline-flex items-center px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create New Group
          </Link>
        </div>

        {/* Groups list */}
        <div className="grid grid-cols-1 gap-4">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <div 
                key={group.id}
                className="bg-[#2f3136] rounded-lg border border-[#202225] overflow-hidden hover:border-[#5865f2] transition-colors"
              >
                <div className="p-4 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${group.color} flex items-center justify-center text-xl shadow-sm shrink-0`}>
                    {group.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{group.name}</h3>
                        <p className="text-[#b9bbbe] text-sm">{group.description}</p>
                      </div>
                      <Link 
                        href={`/groups/${group.id}`}
                        className="p-2 rounded-md bg-[#36393f] hover:bg-[#40444b] text-[#b9bbbe] hover:text-white transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </Link>
                    </div>
                    
                    <div className="flex items-center mt-3 text-sm text-[#b9bbbe]">
                      <div className="flex items-center mr-4">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        {group.members} members
                      </div>
                      <div className="flex items-center mr-4">
                        <div className="w-2 h-2 rounded-full bg-[#3ba55c] mr-1"></div>
                        Active {group.lastActive}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[#202225] px-4 py-2 bg-[#36393f] flex justify-between">
                  <div className="flex space-x-2">
                    <Link 
                      href={`/groups/${group.id}/calendar`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors text-sm"
                    >
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Calendar
                    </Link>
                    <Link 
                      href={`/groups/${group.id}/chat`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors text-sm"
                    >
                      <MessageCircleIcon className="w-4 h-4 mr-1" />
                      Chat
                    </Link>
                  </div>
                  <Link 
                    href={`/groups/${group.id}/settings`}
                    className="inline-flex items-center px-3 py-1 rounded-md text-[#b9bbbe] hover:bg-[#40444b] hover:text-white transition-colors text-sm"
                  >
                    <SettingsIcon className="w-4 h-4 mr-1" />
                    Settings
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#2f3136] rounded-lg border border-[#202225] p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#36393f] flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-[#b9bbbe]" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">No groups found</h3>
              <p className="text-[#b9bbbe] mb-4">
                {searchQuery 
                  ? `No groups match "${searchQuery}"`
                  : "You haven't created or joined any groups yet"}
              </p>
              <Link
                href="/groups/new"
                className="inline-flex items-center px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Your First Group
              </Link>
            </div>
          )}
        </div>

        {/* Invitations section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Group Invitations</h2>
          
          <div className="bg-[#2f3136] rounded-lg border border-[#202225] p-6 text-center">
            <p className="text-[#b9bbbe] mb-2">You don't have any pending invitations</p>
            <p className="text-sm text-[#72767d]">
              When someone invites you to a group, it will appear here
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
} 