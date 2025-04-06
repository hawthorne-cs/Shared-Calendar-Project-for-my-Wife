"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { 
  CalendarIcon, 
  UserIcon, 
  UsersIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  BellIcon,
  MessageCircleIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
  GlobeIcon,
  ImageIcon,
  PlusIcon,
  HashtagIcon
} from "@/components/icons"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [channelSectionExpanded, setChannelSectionExpanded] = useState(true)
  const { theme } = useTheme()

  // Mock data for workspaces
  const workspaces = [
    { id: "personal", name: "Personal", icon: <CalendarIcon className="w-5 h-5" />, color: "bg-blue-500" },
    { id: "work", name: "Work", icon: <UsersIcon className="w-5 h-5" />, color: "bg-green-500" },
    { id: "family", name: "Family", icon: <HomeIcon className="w-5 h-5" />, color: "bg-purple-500" },
    { id: "friends", name: "Friends", icon: <GlobeIcon className="w-5 h-5" />, color: "bg-yellow-500" },
  ]

  // Mock spaces data (replaces channels)
  const spaces = [
    { id: "calendar", name: "Calendar", icon: <CalendarIcon className="w-4 h-4" /> },
    { id: "events", name: "Events", icon: <HashtagIcon className="w-4 h-4" /> },
    { id: "planning", name: "Planning", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "notes", name: "Notes", icon: <HashtagIcon className="w-4 h-4" /> },
  ]

  const mainNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <CalendarIcon className="w-5 h-5" />,
    },
    {
      name: "Groups",
      href: "/groups",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: <MessageCircleIcon className="w-5 h-5" />,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <BellIcon className="w-5 h-5" />,
    },
  ]

  const bottomNavItems = [
    {
      name: "Profile",
      href: "/profile",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f6f3] dark:bg-[#2f3136]">
      {/* Workspaces sidebar - Notion style */}
      <aside className="w-[72px] bg-[#f7f6f3] dark:bg-[#202225] flex flex-col items-center py-6 space-y-5 border-r border-[#e6e6e6] dark:border-[#1e1f22]">
        {/* Home button */}
        <Link 
          href="/dashboard" 
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#eeeeee] dark:hover:bg-[#36393f] ${
            pathname === "/dashboard" ? "bg-[#eeeeee] text-black dark:bg-[#5865f2] dark:text-white" : "text-[#37352f] dark:text-gray-300"
          }`}
        >
          <HomeIcon className="w-5 h-5" />
        </Link>

        <div className="w-8 h-0.5 bg-[#e6e6e6] dark:bg-[#36393f] rounded-full"></div>

        {/* Workspace icons - Notion style */}
        {workspaces.map((workspace) => (
          <Link 
            key={workspace.id}
            href={`/workspace/${workspace.id}`}
            className="group relative"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#eeeeee] dark:hover:bg-[#36393f] ${
              pathname === `/workspace/${workspace.id}` 
                ? "bg-[#eeeeee] dark:bg-[#36393f]" 
                : "bg-white dark:bg-[#2b2d31]"
            } shadow-sm border border-[#e6e6e6] dark:border-[#1e1f22] text-[#37352f] dark:text-white`}>
              {workspace.icon}
            </div>
            {/* Workspace tooltip */}
            <div className="absolute left-full ml-2 py-1 px-2 bg-[#37352f] dark:bg-[#111214] text-white rounded shadow-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {workspace.name}
            </div>
          </Link>
        ))}

        {/* Add workspace button */}
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-[#2b2d31] text-[#37352f] dark:text-[#3ba55d] hover:bg-[#eeeeee] dark:hover:bg-[#36393f] transition-all duration-200 shadow-sm border border-[#e6e6e6] dark:border-[#1e1f22]">
          <PlusIcon className="w-5 h-5" />
        </button>
      </aside>

      {/* Sidebar - Notion style */}
      <aside 
        className={`flex flex-col bg-[#fbfbfa] dark:bg-[#2f3136] ${
          sidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        } transition-all duration-300 overflow-hidden border-r border-[#e6e6e6] dark:border-[#1e1f22]`}
      >
        {/* Workspace header */}
        <div className="h-14 px-4 flex items-center border-b border-[#e6e6e6] dark:border-[#222529]">
          <h2 className="font-medium text-[#37352f] dark:text-white flex items-center">
            <span className="w-6 h-6 rounded flex items-center justify-center bg-[#5865f2] text-white mr-2">
              C
            </span>
            Calendar Workspace
          </h2>
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="ml-auto text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar - Notion style */}
        <div className="px-2 py-3">
          <div className="h-9 px-3 bg-[#eeeeee] dark:bg-[#202225] flex items-center rounded-md">
            <svg className="w-4 h-4 text-[#6b7280] dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-0 w-full px-2 text-sm text-[#37352f] dark:text-white focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pt-3 px-2">
          {/* Quick actions */}
          <div className="mb-5">
            <Link
              href="/event/new"
              className="h-9 w-full px-3 mb-1 flex items-center rounded-md text-[#37352f] dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#393c43] transition-colors text-sm"
            >
              <PlusIcon className="w-4 h-4 mr-2 text-[#5865f2]" />
              New Event
            </Link>
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`h-9 w-full px-3 mb-1 flex items-center rounded-md group ${
                  pathname === item.href 
                    ? "bg-[#eeeeee] dark:bg-[#393c43] text-black dark:text-white font-medium" 
                    : "text-[#6b7280] dark:text-gray-400 hover:bg-[#eeeeee] dark:hover:bg-[#393c43] hover:text-[#37352f] dark:hover:text-white"
                }`}
              >
                <span className={`w-4 h-4 mr-2 ${pathname === item.href ? "text-[#5865f2]" : "text-[#6b7280] dark:text-gray-400"}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Spaces section - Notion style */}
          <div className="mb-2">
            <button 
              onClick={() => setChannelSectionExpanded(!channelSectionExpanded)}
              className="flex items-center w-full px-3 py-1 text-xs font-medium text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200"
            >
              <ChevronRightIcon className={`w-3 h-3 mr-1 transition-transform ${channelSectionExpanded ? 'rotate-90' : ''}`} />
              SPACES
            </button>
          </div>

          {/* Spaces list - Notion style */}
          {channelSectionExpanded && (
            <div className="mt-1 space-y-1 pl-3">
              {spaces.map((space) => (
                <Link
                  key={space.id}
                  href={`/space/${space.id}`}
                  className={`flex items-center px-3 py-1.5 rounded-md group ${
                    pathname === `/space/${space.id}` 
                      ? "bg-[#eeeeee] dark:bg-[#393c43] text-black dark:text-white" 
                      : "text-[#6b7280] dark:text-gray-400 hover:bg-[#eeeeee] dark:hover:bg-[#393c43] hover:text-[#37352f] dark:hover:text-white"
                  }`}
                >
                  <span className={`w-4 h-4 mr-2 ${pathname === `/space/${space.id}` ? "text-[#5865f2]" : "text-[#6b7280] dark:text-gray-400"}`}>
                    {space.icon}
                  </span>
                  <span className="text-sm">{space.name}</span>
                </Link>
              ))}
              <Link
                href="/spaces/new"
                className="flex items-center px-3 py-1.5 rounded-md text-[#6b7280] dark:text-gray-400 hover:bg-[#eeeeee] dark:hover:bg-[#393c43] hover:text-[#37352f] dark:hover:text-white"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">Add a page</span>
              </Link>
            </div>
          )}
        </div>

        {/* User profile area - Notion style */}
        <div className="h-14 p-2 px-4 border-t border-[#e6e6e6] dark:border-[#222529] flex items-center">
          <Link href="/profile" className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-[#5865f2] flex items-center justify-center text-white">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="ml-2">
              <div className="text-[#37352f] dark:text-white text-sm font-medium leading-tight">User</div>
              <div className="text-[#6b7280] dark:text-[#b9bbbe] text-xs leading-tight">Online</div>
            </div>
          </Link>
          
          <div className="ml-auto flex space-x-1">
            <Link 
              href="/settings" 
              className="w-8 h-8 rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#36393f] flex items-center justify-center text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200"
            >
              <SettingsIcon className="w-5 h-5" />
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#36393f]">
        {/* Collapsed sidebar toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute left-[72px] top-3 z-10 w-6 h-12 bg-[#fbfbfa] dark:bg-[#2f3136] text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200 rounded-r flex items-center justify-center border border-l-0 border-[#e6e6e6] dark:border-[#1e1f22]"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
        
        {/* Page header - Notion style */}
        <div className="h-14 px-4 flex items-center border-b border-[#e6e6e6] dark:border-[#222529]">
          <h2 className="font-medium text-[#37352f] dark:text-white flex items-center">
            {/* Page icon based on the path */}
            <span className="w-6 h-6 rounded-md flex items-center justify-center bg-[#eeeeee] dark:bg-[#2b2d31] text-[#5865f2] mr-2">
              {pathname.includes('/calendar') && <CalendarIcon className="w-4 h-4" />}
              {pathname.includes('/dashboard') && <HomeIcon className="w-4 h-4" />}
              {pathname.includes('/messages') && <MessageCircleIcon className="w-4 h-4" />}
              {pathname.includes('/groups') && <UsersIcon className="w-4 h-4" />}
              {pathname.includes('/profile') && <UserIcon className="w-4 h-4" />}
              {pathname.includes('/settings') && <SettingsIcon className="w-4 h-4" />}
              {pathname.includes('/notifications') && <BellIcon className="w-4 h-4" />}
              {pathname.includes('/event') && <HashtagIcon className="w-4 h-4" />}
              {!pathname.includes('/calendar') && 
                !pathname.includes('/dashboard') && 
                !pathname.includes('/messages') && 
                !pathname.includes('/groups') && 
                !pathname.includes('/profile') && 
                !pathname.includes('/settings') && 
                !pathname.includes('/notifications') && 
                !pathname.includes('/event') && 
                <HashtagIcon className="w-4 h-4" />
              }
            </span>
            {pathname.split('/').pop() || 'dashboard'}
          </h2>
          
          {/* Right side actions */}
          <div className="ml-auto flex items-center space-x-3">
            <Link
              href="/event/new"
              className="px-3 h-8 bg-[#f7f6f3] dark:bg-[#5865f2] text-[#37352f] dark:text-white rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#4752c4] transition-colors flex items-center text-sm"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              New
            </Link>
            <Link
              href="/notifications"
              className="relative w-8 h-8 rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#36393f] flex items-center justify-center text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#eb5757] rounded-full"></span>
            </Link>
            <Link
              href="/messages" 
              className="w-8 h-8 rounded-md hover:bg-[#eeeeee] dark:hover:bg-[#36393f] flex items-center justify-center text-[#6b7280] dark:text-gray-400 hover:text-[#37352f] dark:hover:text-gray-200"
            >
              <MessageCircleIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto bg-[#fbfbfa] dark:bg-[#36393f]">
          <div className="p-4 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 