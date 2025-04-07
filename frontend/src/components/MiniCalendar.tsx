'use client'

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface MiniCalendarProps {
  initialDate?: Date;
  // Add event dates later if needed: eventDates?: string[]; 
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ initialDate = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
  };

  const changeMonth = (delta: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const numDays = daysInMonth(year, month);
  const startingDay = firstDayOfMonth(year, month);
  
  const daysArray: number[] = Array.from({ length: numDays }, (_, i) => i + 1);
  const leadingBlanks: null[] = Array.from({ length: startingDay }, () => null);
  
  const totalSlots: (number | null)[] = [...leadingBlanks, ...daysArray];

  // Calculate trailing blanks to fill the grid (optional, for visual consistency)
  const trailingBlanksCount = (7 - (totalSlots.length % 7)) % 7;
  const trailingBlanks: null[] = Array.from({ length: trailingBlanksCount }, () => null);
  const calendarGrid: (number | null)[] = [...totalSlots, ...trailingBlanks];

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#40444b] shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-[#37352f] dark:text-white">
          {monthName} {year}
        </h3>
        <div className="flex space-x-1">
          <button
            onClick={() => changeMonth(-1)}
            className="p-1 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-1 rounded-md text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] transition-colors"
            aria-label="Next month"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#6b7280] dark:text-[#b9bbbe] mb-2">
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => {
          const currentDate = day ? new Date(year, month, day) : null;
          const isToday = currentDate?.getTime() === today.getTime();
          
          return (
            <div
              key={index}
              className={`h-7 w-full flex items-center justify-center rounded-md text-xs 
                ${day ? 'text-[#37352f] dark:text-white' : 'text-transparent'}
                ${isToday ? 'bg-[#5865f2] text-white font-semibold' : 
                  day ? 'hover:bg-[#f0f0f0] dark:hover:bg-[#40444b]' : ''
                }
                transition-colors cursor-default` // Add cursor-pointer later if days become clickable
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { MiniCalendar }; 