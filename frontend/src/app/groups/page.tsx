"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { EmptyState } from '@/components/EmptyState'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter
} from '@/components/ui/Card'
import { 
  UsersIcon, 
  PlusIcon, 
  CalendarIcon, 
  MessageCircleIcon, 
  SettingsIcon,
  ChevronRightIcon,
  SearchIcon
} from '@/components/icons'
import { Group } from '@/types'
import { getGroups } from '@/lib/api'
import { isUrl } from '@/lib/utils'
import toast from 'react-hot-toast'

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

// Skeleton Component for Group Card
const GroupCardSkeleton = () => (
  <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#40444b] overflow-hidden shadow-sm animate-pulse">
    <div className="p-4 flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0"></div>
      <div className="flex-1 min-w-0">
        <div className="h-5 w-3/5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
        <div className="flex items-center gap-x-4 gap-y-1">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-5 h-5 rounded-md bg-gray-200 dark:bg-gray-700 shrink-0 ml-2"></div>
    </div>
    <div className="border-t border-[#e6e6e6] dark:border-[#40444b] px-4 py-3 bg-[#f7f6f3] dark:bg-[#202225] flex justify-between items-center">
      <div className="flex space-x-2">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<Group[]>([])
  const [error, setError] = useState<string | null>(null);
  
  // Fetch data on mount
  useEffect(() => {
    let isMounted = true;
    const fetchGroups = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const groupsData = await getGroups();
        if (isMounted) {
          setGroups(groupsData);
        }
      } catch (err) {
        console.error("Failed to fetch groups:", err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
          setError(`Couldn't load groups: ${errorMessage}. Please try refreshing.`);
          toast.error("Failed to load groups.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGroups();
    
    return () => { isMounted = false; };
  }, []);

  // Filter groups based on search query
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#37352f] dark:text-white mb-2 flex items-center gap-2">
            <span className="h-7 w-1 bg-[#5865f2] rounded-full"></span>
            My Groups
          </h1>
          <p className="text-[#6b7280] dark:text-[#b9bbbe]">
            Manage your groups and team calendars
          </p>
        </header>

        {/* Actions row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] dark:text-[#b9bbbe]">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 bg-[#f0f0f0] dark:bg-[#202225] border border-[#e6e6e6] dark:border-[#40444b] rounded-md text-[#37352f] dark:text-white placeholder-[#6b7280] dark:placeholder-[#72767d] focus:outline-none focus:ring-2 focus:ring-[#5865f2] text-sm shadow-sm"
            />
          </div>

          {/* Create Group Button */}
          <Link
            href="/groups/new"
            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors text-sm font-medium shadow-sm"
          >
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
            Create New Group
          </Link>
        </div>

        {/* Error Display */}
        {error && !isLoading && (
          <div className="mb-6 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
            <span>{error}</span>
          </div>
        )}

        {/* Conditional Rendering based on loading state */}
        {isLoading ? (
          <div className="space-y-4">
            <GroupCardSkeleton />
            <GroupCardSkeleton />
            <GroupCardSkeleton />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGroups.length > 0 ? (
              filteredGroups.map(group => (
                <Card key={group.id} className="overflow-hidden hover:border-[#5865f2] dark:hover:border-[#5865f2] transition-colors">
                  <CardContent className="p-4 flex flex-col sm:flex-row items-start gap-4 pb-0">
                    <div className={`w-12 h-12 rounded-lg ${group.color || 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center text-xl shadow-sm shrink-0 overflow-hidden`}>
                      {group.avatar && isUrl(group.avatar) ? (
                        <img src={group.avatar} alt={`${group.name} avatar`} className="w-full h-full object-cover" />
                      ) : (
                        group.avatar || group.name?.charAt(0) || 'G'
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base sm:text-lg">{group.name}</CardTitle>
                          {group.description && <CardDescription className="mt-1 line-clamp-2">{group.description}</CardDescription>}
                        </div>
                      </div>
                      
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-[#6b7280] dark:text-[#b9bbbe]">
                        {group.members && (
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                            {group.members} members
                          </div>
                        )}
                        {group.lastActive && (
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                            Active {group.lastActive}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-[#f7f6f3] dark:bg-[#202225] py-2 px-4 justify-between border-t border-[#e6e6e6] dark:border-[#40444b]">
                    <div className="flex space-x-1 sm:space-x-2">
                      <Link 
                        href={`/groups/${group.id}/calendar`}
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#e6e6e6] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Calendar
                      </Link>
                      <Link 
                        href={`/groups/${group.id}/chat`}
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#e6e6e6] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white transition-colors text-xs sm:text-sm"
                      >
                        <MessageCircleIcon className="w-4 h-4 mr-1" />
                        Chat
                      </Link>
                    </div>
                    <Link 
                      href={`/groups/${group.id}/settings`}
                      className="inline-flex items-center px-2 sm:px-3 py-1 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#e6e6e6] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      <SettingsIcon className="w-4 h-4 mr-1" />
                      Settings
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <EmptyState
                icon={UsersIcon}
                title={searchQuery ? "No groups found" : "No groups created yet"}
                message={searchQuery 
                  ? `Your search for "${searchQuery}" did not match any groups.`
                  : "Get started by creating your first group."}
              >
                <Link
                  href="/groups/new"
                  className="inline-flex items-center px-4 py-2 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors text-sm font-medium shadow-sm"
                >
                  <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
                  {searchQuery ? "Create New Group" : "Create Your First Group"}
                </Link>
              </EmptyState>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
