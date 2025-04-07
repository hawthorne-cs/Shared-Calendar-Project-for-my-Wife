// General utility functions

/**
 * Checks if a string is a valid absolute URL or a relative path starting with / or ./
 * @param str The string to check.
 * @returns True if the string is a URL or relative path, false otherwise.
 */
export const isUrl = (str: string | null | undefined): boolean => {
  if (!str) return false;
  // Check for common protocols
  if (/^(https?:\/\/|mailto:|tel:)/i.test(str)) {
      try {
          new URL(str); // Try parsing as absolute URL
          return true;
      } catch (_) {
          return false; // Invalid absolute URL format
      }
  }
  // Allow relative paths starting with / or ./
  if (str.startsWith('/') || str.startsWith('./')) {
      return true;
  }
  // Could add more checks here if needed (e.g., for specific image extensions)
  return false;
};

/**
 * Formats a date string into a short month and day format (e.g., "Jul 30").
 * Falls back to the original string if the date is invalid.
 * @param dateString The date string to format.
 * @returns The formatted date string or the original string.
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { 
    return dateString; // Fallback to original string if date is invalid
  }
};

// Helper for merging Tailwind classes conditionally
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add other utility functions here as needed (e.g., debounce, throttle, classNames helper) 