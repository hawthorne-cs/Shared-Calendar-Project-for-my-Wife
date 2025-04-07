"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AppShell } from '@/components/app-shell'
import { EmptyState } from '@/components/EmptyState'
import { MiniCalendar } from '@/components/MiniCalendar'
import { QuickActions } from '@/components/QuickActions'
import { PendingInvitations } from '@/components/PendingInvitations'
import { 
  PlusIcon, 
  UsersIcon, 
  CalendarIcon,
  ClockIcon, 
  ChevronRightIcon,
} from '@/components/icons'
import { Event, Group, GroupInvitation } from '@/types'
import { getEvents, getGroups, getGroupInvitations } from '@/lib/api'
import { isUrl } from '@/lib/utils'
import toast from 'react-hot-toast'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription
} from '@/components/ui/Card'

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

// Skeleton Component for Event Card
const EventSkeleton = () => (
  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className="space-y-1.5">
        <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
    <div className="flex items-center gap-1">
      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

// Skeleton Component for Group Card
const GroupSkeleton = () => (
  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md bg-gray-300 dark:bg-gray-600"></div>
      <div className="space-y-1.5">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
    <div className="w-5 h-5 rounded bg-gray-300 dark:bg-gray-600"></div>
  </div>
);

export default function DashboardPage() {
  const [currentDate] = useState(new Date())
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingGroups, setIsLoadingGroups] = useState(true);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [invitations, setInvitations] = useState<GroupInvitation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function (memoized with useCallback)
  const fetchData = useCallback(async (isMountedRef: { current: boolean }) => {
    setError(null);
    // Reset loading states only if it's a manual refresh perhaps? Or always start loading?
    setIsLoadingEvents(true);
    setIsLoadingGroups(true);
    setIsLoadingInvitations(true);
    try {
      // Fetch all data in parallel
      const [eventsData, groupsData, invitationsData] = await Promise.all([
        getEvents(),
        getGroups(),
        getGroupInvitations()
      ]);
      
      if (isMountedRef.current) {
        setEvents(eventsData);
        setGroups(groupsData);
        setInvitations(invitationsData);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      if (isMountedRef.current) {
        setError("Couldn't load dashboard data. Please try refreshing.");
        toast.error("Failed to load dashboard data."); // Show toast error
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoadingEvents(false);
        setIsLoadingGroups(false);
        setIsLoadingInvitations(false);
      }
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    const isMountedRef = { current: true };
    fetchData(isMountedRef);
    return () => { isMountedRef.current = false; };
  }, [fetchData]);

  // Handler to refetch data when an invitation is updated
  const handleInvitationUpdate = useCallback(() => {
    const isMountedRef = { current: true };
    // Re-fetch all data for simplicity, or just invitations if preferred
    fetchData(isMountedRef);
  }, [fetchData]);

  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Combined loading state for the whole page might be too simple now
  // const isLoading = isLoadingEvents || isLoadingGroups || isLoadingInvitations;

  return (
    <AppShell>
      <div className="p-4 sm:p-6">
        {/* Welcome Header */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#37352f] dark:text-white mb-1">Welcome back!</h1>
          <p className="text-[#6b7280] dark:text-[#b9bbbe]">{formattedDate}</p>
        </header>

        {/* Display general error message if any fetch fails */}
        {error && (
          <div className="mb-6 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-center gap-3">
            <span>{error}</span>
             {/* Optionally add a retry button here */}
          </div>
        )}

        {/* Main Content Grid */} 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Upcoming Events Section - Use Card component */} 
          <Card className="md:col-span-1 lg:col-span-2 min-h-[250px] flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                 <CalendarIcon className="w-5 h-5 text-[#5865f2]" />
                 Upcoming Events
              </CardTitle>
              <Link href="/calendar" className="text-sm font-medium text-[#5865f2] hover:underline">
                View Calendar
              </Link>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {isLoadingEvents ? (
                <div className="space-y-3">
                  <EventSkeleton />
                  <EventSkeleton />
                  <EventSkeleton />
                </div>
              ) : events.length > 0 ? (
                 <div className="space-y-3">
                  {events.map(event => (
                    <Link href={`/event/${event.id}`} key={event.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#2f3136] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] border border-[#e6e6e6] dark:border-[#40444b] rounded-md transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 rounded-full ${event.color ? event.color.split(' ')[0] : 'bg-gray-400'}`}></div>
                        <div>
                          <p className="font-medium text-[#37352f] dark:text-white text-sm group-hover:text-[#5865f2] dark:group-hover:text-[#c2c8fc]">{event.title}</p>
                          <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe]">
                            {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                          </p>
                        </div>
                      </div>
                      {!event.isAllDay && event.startTime && (
                        <div className="flex items-center gap-1 text-sm text-[#6b7280] dark:text-[#b9bbbe]">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {event.startTime}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                 <EmptyState 
                  icon={CalendarIcon}
                  title="No events scheduled"
                  message="Your schedule looks clear."
                  className="flex-grow flex flex-col justify-center border-none shadow-none bg-transparent dark:bg-transparent p-0"
                >
                   <Link 
                      href="/event/new"
                      className="inline-flex items-center px-3 py-1.5 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors text-sm font-medium shadow-sm mt-3"
                    >
                      <PlusIcon className="w-4 h-4 mr-1.5 -ml-0.5" />
                      Schedule Event
                    </Link>
                </EmptyState>
              )}
            </CardContent>
          </Card>

          {/* Right Column */} 
          <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Mini Calendar & Quick Actions - Wrap in Card */} 
              <div className="lg:col-span-1 flex flex-col gap-4 md:gap-6">
                  <Card>
                      <CardContent className="p-0">
                        <MiniCalendar />
                      </CardContent>
                  </Card>
                  <Card>
                      <CardContent className="p-0">
                        <QuickActions />
                      </CardContent>
                  </Card>
              </div>

              {/* Groups & Invitations */} 
              <div className="lg:col-span-1 flex flex-col gap-4 md:gap-6">
                  {/* Your Groups Section - Use Card component */} 
                  <Card className="min-h-[200px] flex flex-col">
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <UsersIcon className="w-5 h-5 text-[#5865f2]" />
                        Your Groups
                      </CardTitle>
                      <Link href="/groups" className="text-sm font-medium text-[#5865f2] hover:underline">
                        View All
                      </Link>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      {isLoadingGroups ? (
                         <div className="space-y-3">
                            <GroupSkeleton />
                            <GroupSkeleton />
                            <GroupSkeleton />
                          </div>
                      ) : groups.length > 0 ? (
                        <div className="space-y-3">
                          {groups.slice(0, 3).map(group => (
                            <Link href={`/groups/${group.id}`} key={group.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#2f3136] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] border border-[#e6e6e6] dark:border-[#40444b] rounded-md transition-colors group">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-md ${group.color || 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center text-lg shadow-sm shrink-0 overflow-hidden`}>
                                  {group.avatar && isUrl(group.avatar) ? (
                                    <img src={group.avatar} alt={`${group.name} avatar`} className="w-full h-full object-cover" />
                                  ) : (
                                    group.avatar || group.name?.charAt(0) || 'G'
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-[#37352f] dark:text-white text-sm group-hover:text-[#5865f2] dark:group-hover:text-[#c2c8fc]">{group.name}</p>
                                  {group.members && <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe]">{group.members} members</p>}
                                </div>
                              </div>
                              <ChevronRightIcon className="w-5 h-5 text-[#6b7280] dark:text-[#b9bbbe] group-hover:text-[#5865f2] dark:group-hover:text-[#c2c8fc]" />
                            </Link>
                          ))}
                          {groups.length > 3 && (
                            <Link href="/groups" className="mt-2 block text-center text-sm font-medium text-[#5865f2] hover:underline">
                                View All Groups ({groups.length})
                            </Link>
                          )}
                        </div>
                      ) : (
                        <EmptyState 
                          icon={UsersIcon}
                          title="No groups yet"
                          message="Create or join a group to start sharing."
                          className="flex-grow flex flex-col justify-center border-none shadow-none bg-transparent dark:bg-transparent p-0"
                        >
                           <Link 
                              href="/groups/new"
                              className="inline-flex items-center px-3 py-1.5 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors text-sm font-medium shadow-sm mt-3"
                            >
                              <PlusIcon className="w-4 h-4 mr-1.5 -ml-0.5" />
                              Create Group
                            </Link>
                        </EmptyState>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Pending Invitations Section - Wrap in Card */} 
                   <Card>
                       <CardContent className="p-0">
                          <PendingInvitations 
                              invitations={invitations}
                              isLoading={isLoadingInvitations}
                              onInvitationUpdate={handleInvitationUpdate}
                          />
                       </CardContent>
                   </Card>
              </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
} 