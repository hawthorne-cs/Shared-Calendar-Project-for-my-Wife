"use client"

import { useTheme } from "@/components/theme-provider"
import { MoonIcon, SunIcon } from "@/components/icons"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="menu-item">
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
      <span className="ml-3">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
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