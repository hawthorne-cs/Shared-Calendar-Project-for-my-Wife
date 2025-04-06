"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  MessageCircleIcon, 
  BellIcon, 
  SettingsIcon, 
  LogOutIcon, 
  MoonIcon, 
  SunIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PlusIcon,
  SearchIcon
} from './icons'
import { useTheme } from '@/context/ThemeContext'

// AppShell component
interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  match?: (pathname: string) => boolean; // Optional more specific matching function
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', icon: HomeIcon, label: 'Dashboard', match: (p) => p === '/dashboard' },
  { href: '/calendar', icon: CalendarIcon, label: 'Calendar', match: (p) => p.startsWith('/calendar') || p.startsWith('/event') }, // Match calendar and event pages
  { href: '/groups', icon: UsersIcon, label: 'Groups', match: (p) => p.startsWith('/groups') },
  { href: '/messages', icon: MessageCircleIcon, label: 'Messages', match: (p) => p.startsWith('/messages') }, // Added Messages here
];

const accountNavItems: NavItem[] = [
  { href: '/settings', icon: SettingsIcon, label: 'Settings' },
];

// Define page metadata (for header)
const pageMetadata: { [key: string]: { title: string; icon: React.ElementType } } = {
  '/dashboard': { title: 'Dashboard', icon: HomeIcon },
  '/calendar': { title: 'Calendar', icon: CalendarIcon },
  '/event/new': { title: 'New Event', icon: PlusIcon },
  // Dynamic route for event detail - handled separately
  '/groups': { title: 'Groups', icon: UsersIcon },
  '/groups/new': { title: 'New Group', icon: PlusIcon },
  // Dynamic route for group detail - handled separately
  '/profile': { title: 'Profile', icon: UsersIcon }, // Kept for header title, though not in sidebar nav
  '/settings': { title: 'Settings', icon: SettingsIcon },
  '/messages': { title: 'Messages', icon: MessageCircleIcon },
  '/notifications': { title: 'Notifications', icon: BellIcon },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Determine current page title and icon for the header
  let currentPageTitle = 'App';
  let CurrentPageIcon: React.ElementType | null = null;

  // Handle dynamic routes like /event/[id] or /groups/[id]
  if (pathname.startsWith('/event/') && pathname !== '/event/new') {
    currentPageTitle = 'Event Details'; // Placeholder, could fetch event title
    CurrentPageIcon = CalendarIcon;
  } else if (pathname.startsWith('/groups/') && pathname !== '/groups/new') {
    currentPageTitle = 'Group Details'; // Placeholder, could fetch group name
    CurrentPageIcon = UsersIcon;
  } else if (pageMetadata[pathname]) {
    currentPageTitle = pageMetadata[pathname].title;
    CurrentPageIcon = pageMetadata[pathname].icon;
  } else {
    // Fallback for unmatched paths
    const matchedMainItem = mainNavItems.find(item => item.match ? item.match(pathname) : pathname.startsWith(item.href));
    if (matchedMainItem) {
      currentPageTitle = matchedMainItem.label;
      CurrentPageIcon = matchedMainItem.icon;
    }
  }

  return (
    <div className={`flex h-screen bg-white dark:bg-[#202225]`}>
      {/* Collapsible Sidebar */}
      <aside 
        className={`relative flex flex-col bg-white dark:bg-[#2f3136] transition-all duration-300 ease-in-out border-r border-[#e6e6e6] dark:border-[#202225] ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b border-[#e6e6e6] dark:border-[#202225] flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <span className="text-2xl">🗓️</span>
            {isSidebarOpen && <span className="text-lg font-semibold text-[#37352f] dark:text-white whitespace-nowrap">CJ's CALENDARS</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Main Navigation */}
          <div>
            {isSidebarOpen && <h3 className="text-xs font-semibold text-[#6b7280] dark:text-[#8e9297] uppercase mb-2 px-2">Menu</h3>}
            <ul className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = item.match ? item.match(pathname) : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      title={item.label}
                      className={`flex items-center rounded-md transition-colors duration-150 px-3 ${isSidebarOpen ? 'py-2' : 'py-3 justify-center'} ${
                        isActive
                          ? 'bg-[#f0f0f0] dark:bg-[#40444b] text-[#37352f] dark:text-white'
                          : 'text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0`} />
                      {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Account Navigation */}
          <div>
            {isSidebarOpen && <h3 className="text-xs font-semibold text-[#6b7280] dark:text-[#8e9297] uppercase mb-2 px-2">Account</h3>}
            <ul className="space-y-1">
              {accountNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      title={item.label}
                      className={`flex items-center rounded-md transition-colors duration-150 px-3 ${isSidebarOpen ? 'py-2' : 'py-3 justify-center'} ${
                        isActive
                          ? 'bg-[#f0f0f0] dark:bg-[#40444b] text-[#37352f] dark:text-white'
                          : 'text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f7f6f3] dark:hover:bg-[#36393f] hover:text-[#37352f] dark:hover:text-white'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'} flex-shrink-0`} />
                      {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer & Toggle */}
        <div className="p-4 border-t border-[#e6e6e6] dark:border-[#202225] mt-auto">
          {/* User profile preview - simplified */}
          {isSidebarOpen && (
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm font-medium text-white mr-2">
                U
              </div>
              <div className="text-sm overflow-hidden">
                <p className="font-medium text-[#37352f] dark:text-white truncate">Username</p>
                <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe] truncate">user@example.com</p>
              </div>
            </div>
          )}
          <div className={`flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center`}>
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="p-2 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b]"
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>

            {/* Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
              className="p-2 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b]"
            >
              {isSidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-[#2f3136] border-b border-[#e6e6e6] dark:border-[#202225] flex items-center justify-between px-6 flex-shrink-0">
          {/* Page Title & Icon */}
          <div className="flex items-center gap-3">
            {CurrentPageIcon && <CurrentPageIcon className="w-5 h-5 text-[#6b7280] dark:text-[#b9bbbe]" />}
            <h1 className="text-lg font-medium text-[#37352f] dark:text-white whitespace-nowrap">{currentPageTitle}</h1>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search - Simplified Placeholder */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280] dark:text-[#b9bbbe]" />
              <input 
                type="search" 
                placeholder="Search..." 
                className="pl-9 pr-3 py-1.5 w-48 bg-[#f0f0f0] dark:bg-[#202225] text-[#37352f] dark:text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#5865f2] border border-transparent dark:border-[#202225] placeholder-[#6b7280] dark:placeholder-[#b9bbbe]"
              />
            </div>

            <Link 
              href="/event/new"
              className="px-3 py-1.5 bg-[#5865f2] text-white rounded-md hover:bg-[#4752c4] transition-colors flex items-center text-sm"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              New Event
            </Link>

            {/* Notification Icon */}
            <Link href="/notifications" className="p-2 rounded-full text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] relative">
              <BellIcon className="w-5 h-5" />
            </Link>

            {/* User Profile Dropdown Placeholder */}
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm font-medium text-white cursor-pointer">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-[#202225]">
          {children}
        </main>
      </div>
    </div>
  );
} 