'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot' // Use Slot for composition
import { cva, type VariantProps } from 'class-variance-authority' // For handling variants

// Removed local cn helper
// Removed twMerge import (now handled by cn in utils)
import { cn } from '@/lib/utils' // Import cn from utils

// Define button variants using cva
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        primaryAction: 'bg-[#5865f2] text-white hover:bg-[#4752c4] shadow-sm',
        // New variants for invite actions
        accept: 'bg-green-100 dark:bg-green-700 hover:bg-green-200 dark:hover:bg-green-600 text-green-700 dark:text-green-100',
        decline: 'bg-red-100 dark:bg-red-600 hover:bg-red-200 dark:hover:bg-red-500 text-red-700 dark:text-red-100',
        // New variant for destructive ghost button (like logout)
        destructiveGhost: "hover:bg-destructive/10 text-destructive dark:text-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300",
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        // Adjusted icon size to be more flexible, matching p-1.5 roughly
        icon: 'h-7 w-7 p-1.5', // Use for invite buttons
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Define Button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // Prop from Slot for composition
}

// Button component implementation
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Uses cn from utils
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants } // Export Button and variants definition 