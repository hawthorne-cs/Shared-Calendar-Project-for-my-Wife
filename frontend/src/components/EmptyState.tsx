"use client";

import React from 'react';

interface EmptyStateProps {
  icon?: React.ElementType; // Optional icon component
  title: string;
  message?: string;
  children?: React.ReactNode; // For optional action buttons/links
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  message,
  children,
  className = '',
}: EmptyStateProps) {
  return (
    <div 
      className={`bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#40444b] p-8 text-center shadow-sm ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[#f0f0f0] dark:bg-[#36393f] flex items-center justify-center mx-auto mb-4 border border-[#e6e6e6] dark:border-[#40444b]">
          <Icon className="w-8 h-8 text-[#6b7280] dark:text-[#b9bbbe]" />
        </div>
      )}
      <h3 className="text-[#37352f] dark:text-white text-lg font-semibold mb-2">
        {title}
      </h3>
      {message && (
        <p className="text-[#6b7280] dark:text-[#b9bbbe] mb-4 text-sm">
          {message}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
} 