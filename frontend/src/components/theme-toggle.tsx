"use client"

import { useTheme } from "@/components/theme-provider"
import { MoonIcon, SunIcon } from "@/components/icons"

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (compact) {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-8 h-8 rounded-md hover:bg-[#36393f] flex items-center justify-center text-gray-400 hover:text-gray-200"
        title={theme === "dark" ? "Light Mode" : "Dark Mode"}
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <div className="menu-item">
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
      <span className="ml-3">
        {theme === "dark" ? "Light Mode" : "Dark Mode"} - CJ's Calendars
      </span>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="ml-auto p-1 rounded-full bg-gray-200 dark:bg-discord-800 
                   hover:bg-gray-300 dark:hover:bg-discord-700 
                   transition-colors duration-200"
      >
        <div
          className={`w-4 h-4 rounded-full ${
            theme === "dark" 
              ? "bg-white translate-x-0" 
              : "bg-primary-500 translate-x-4"
          } transform transition-all duration-200`}
        />
      </button>
    </div>
  )
} 