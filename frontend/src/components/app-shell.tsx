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
  ImageIcon
} from "@/components/icons"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme } = useTheme()

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
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-discord-900">
      {/* Sidebar */}
      <aside 
        className={`sidebar flex flex-col border-r border-gray-200 dark:border-discord-800 ${
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-discord-800">
          {!sidebarCollapsed && (
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                CJ's Calendars
              </span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`menu-item ${
                    pathname === item.href ? "menu-item-active" : ""
                  }`}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-3 border-t border-gray-200 dark:border-discord-800">
          <ul className="space-y-2">
            {bottomNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`menu-item ${
                    pathname === item.href ? "menu-item-active" : ""
                  }`}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
            {!sidebarCollapsed && (
              <li>
                <ThemeToggle />
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
} 