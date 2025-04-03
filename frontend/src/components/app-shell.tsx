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

  // Mock data for servers/workspaces
  const servers = [
    { id: "personal", name: "Personal", icon: <CalendarIcon className="w-5 h-5" />, color: "bg-blue-500" },
    { id: "work", name: "Work", icon: <UsersIcon className="w-5 h-5" />, color: "bg-green-500" },
    { id: "family", name: "Family", icon: <HomeIcon className="w-5 h-5" />, color: "bg-purple-500" },
    { id: "friends", name: "Friends", icon: <GlobeIcon className="w-5 h-5" />, color: "bg-yellow-500" },
  ]

  // Mock channels data
  const channels = [
    { id: "general", name: "general", type: "text" },
    { id: "events", name: "events", type: "text" },
    { id: "planning", name: "planning", type: "text" },
    { id: "calendar-sync", name: "calendar-sync", type: "text" },
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
      name: "My Groups",
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
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#2f3136]">
      {/* Servers sidebar - Discord style */}
      <aside className="w-[72px] bg-[#202225] flex flex-col items-center py-3 space-y-2">
        {/* Home button */}
        <Link 
          href="/dashboard" 
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:rounded-xl ${
            pathname === "/dashboard" ? "bg-[#5865f2] text-white" : "bg-[#36393f] text-gray-300 hover:bg-[#5865f2] hover:text-white"
          }`}
        >
          <HomeIcon className="w-6 h-6" />
        </Link>

        <div className="w-8 h-0.5 bg-[#36393f] rounded-full my-1"></div>

        {/* Server icons */}
        {servers.map((server) => (
          <Link 
            key={server.id}
            href={`/server/${server.id}`}
            className={`group relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:rounded-xl ${server.color} text-white`}
          >
            {/* Server indicator */}
            <div className={`absolute left-0 w-1 rounded-r-full h-0 group-hover:h-5 transition-all ${
              pathname === `/server/${server.id}` ? "h-10 bg-white" : "bg-white"
            }`}></div>
            {server.icon}
          </Link>
        ))}

        {/* Add server button */}
        <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#36393f] text-[#3ba55d] hover:bg-[#3ba55d] hover:text-white transition-all duration-200 hover:rounded-xl">
          <PlusIcon className="w-6 h-6" />
        </button>
      </aside>

      {/* Channels sidebar */}
      <aside 
        className={`flex flex-col bg-[#2f3136] ${
          sidebarCollapsed ? "w-0 opacity-0" : "w-60 opacity-100"
        } transition-all duration-300 overflow-hidden`}
      >
        {/* Server header */}
        <div className="h-12 px-4 flex items-center border-b border-[#222529] shadow-sm">
          <h2 className="font-bold text-white">CJ's Calendars</h2>
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="ml-auto text-gray-400 hover:text-gray-200"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto pt-4">
          {/* Channel category */}
          <div className="px-4 mb-1">
            <button 
              onClick={() => setChannelSectionExpanded(!channelSectionExpanded)}
              className="flex items-center w-full text-xs font-semibold text-gray-400 hover:text-gray-200"
            >
              <ChevronRightIcon className={`w-3 h-3 mr-1 transition-transform ${channelSectionExpanded ? 'rotate-90' : ''}`} />
              CHANNELS
            </button>
          </div>

          {/* Channel list */}
          {channelSectionExpanded && (
            <div className="mt-1 space-y-0.5">
              {channels.map((channel) => (
                <Link
                  key={channel.id}
                  href={`/channel/${channel.id}`}
                  className={`flex items-center px-2 py-1 mx-2 rounded group ${
                    pathname === `/channel/${channel.id}` 
                      ? "bg-[#393c43] text-white" 
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#393c43]"
                  }`}
                >
                  <HashtagIcon className="w-5 h-5 mr-1.5 text-gray-400 group-hover:text-gray-300" />
                  <span className="text-sm">{channel.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Navigation Links */}
          <div className="mt-4 px-4">
            <h3 className="text-xs font-semibold text-gray-400 mb-1">NAVIGATION</h3>
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-2 py-1.5 my-0.5 rounded group ${
                  pathname === item.href 
                    ? "bg-[#393c43] text-white" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#393c43]"
                }`}
              >
                <span className="w-5 h-5 mr-1.5 text-gray-400 group-hover:text-gray-300">
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User profile area */}
        <div className="h-[52px] p-2 bg-[#292b2f] flex items-center">
          <div className="flex items-center flex-1">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#3ba55d] border-2 border-[#292b2f]"></div>
            </div>
            <div className="ml-2">
              <div className="text-white text-sm font-medium leading-tight">User</div>
              <div className="text-[#b9bbbe] text-xs leading-tight">Online</div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button className="w-8 h-8 rounded-md hover:bg-[#36393f] flex items-center justify-center text-gray-400 hover:text-gray-200">
              <SettingsIcon className="w-5 h-5" />
            </button>
            <ThemeToggle compact />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#36393f]">
        {/* Collapsed sidebar toggle */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute left-[72px] top-3 z-10 w-6 h-12 bg-[#2f3136] text-gray-400 hover:text-gray-200 rounded-r flex items-center justify-center"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
        
        {/* Channel/page header */}
        <div className="h-12 px-4 flex items-center border-b border-[#222529] shadow-sm">
          <HashtagIcon className="w-5 h-5 mr-2 text-gray-400" />
          <h2 className="font-semibold text-white">{pathname.split('/').pop() || 'dashboard'}</h2>
        </div>
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 