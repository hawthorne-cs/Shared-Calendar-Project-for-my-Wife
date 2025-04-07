'use client'

import * as React from "react"
import { cn } from "@/lib/utils"

// Base Card component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        // Add our specific base styles
        "bg-white dark:bg-[#2f3136] border-[#e6e6e6] dark:border-[#40444b]",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

// Card Header - Standardized padding
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Default padding p-4, reduced bottom padding
      className={cn("flex flex-col space-y-1.5 p-4 pb-2", className)} 
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// Card Title (use within CardHeader)
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight text-[#37352f] dark:text-white", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// Card Description (use within CardHeader)
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground dark:text-[#b9bbbe]", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// Card Content - Standardized padding
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      // Default padding p-4, reduced top padding (assumes header is often present)
      className={cn("p-4 pt-2", className)} 
      {...props} 
    />
  )
)
CardContent.displayName = "CardContent"

// Card Footer - Standardized padding
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // Default padding p-4, reduced top padding
      className={cn("flex items-center p-4 pt-2", className)} 
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } 