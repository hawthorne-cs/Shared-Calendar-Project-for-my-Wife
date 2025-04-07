"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon, TextIcon } from '@/components/icons'
import { Event, Calendar } from '@/types'
import { createEvent, getCalendars } from '@/lib/api'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/Select"
import { Checkbox } from "@/components/ui/Checkbox"

// Validation messages
const REQUIRED_FIELD_MSG = "This field is required.";
const MAX_LENGTH_MSG = (max: number) => `Must be ${max} characters or less.`;
const DATE_IN_PAST_MSG = "Date cannot be in the past.";

// --- Explicit State Types ---
interface NewEventFormData {
  title: string;
  description: string | null;
  date: string;
  startTime: string | null;
  endTime: string | null;
  isAllDay: boolean;
  location: string | null;
  calendarId: string;
  // Omit recurrence/notification for now
}

interface NewEventFormErrors {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  calendarId?: string;
  description?: string;
  location?: string;
}

// Initial empty state for the form
const initialFormData: NewEventFormData = {
  title: '',
  description: '', // Start as empty string, API expects null maybe?
  date: '',
  startTime: null,
  endTime: null,
  isAllDay: false,
  location: '',
  calendarId: '',
};

export default function NewEventPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const dateFromParams = searchParams.get('date')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [isLoadingCalendars, setIsLoadingCalendars] = useState(true);
  
  const [formData, setFormData] = useState<NewEventFormData>(initialFormData)
  const [errors, setErrors] = useState<NewEventFormErrors>({})
  
  useEffect(() => {
    let isMounted = true;
    setIsLoadingCalendars(true);
    getCalendars()
      .then(data => {
        if (isMounted) {
          setCalendars(data);
          if (data.length > 0 && !formData.calendarId) {
            setFormData(prev => ({ ...prev, calendarId: data[0].id }));
          }
        }
      })
      .catch(err => {
        console.error("Failed to fetch calendars:", err);
        toast.error("Could not load calendars.");
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingCalendars(false);
        }
      });
    return () => { isMounted = false; };
  }, []); // formData removed from deps
  
  useEffect(() => {
    if (dateFromParams) {
      setFormData(prev => ({
        ...prev,
        date: dateFromParams
      }))
    }
  }, [dateFromParams])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => {
      const newStartTime = name === 'isAllDay' && checked ? null : (name === 'startTime' ? value : prev.startTime);
      const newEndTime = name === 'isAllDay' && checked ? null : (name === 'endTime' ? value : prev.endTime);
      
      return {
         ...prev,
         [name]: type === 'checkbox' ? checked : value,
         startTime: name === 'isAllDay' && checked ? null : newStartTime,
         endTime: name === 'isAllDay' && checked ? null : newEndTime,
       };
    });
    
    if (name in errors) {
       setErrors(prev => {
           const newErrors = { ...prev };
           delete newErrors[name as keyof NewEventFormErrors];
           return newErrors;
       });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: NewEventFormErrors = {};
    let isValid = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.title.trim()) {
      newErrors.title = REQUIRED_FIELD_MSG;
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = MAX_LENGTH_MSG(100);
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = REQUIRED_FIELD_MSG;
      isValid = false;
    } else {
      const selectedDate = new Date(formData.date + 'T00:00:00');
      if (selectedDate < today) {
        newErrors.date = DATE_IN_PAST_MSG;
        isValid = false;
      }
    }
    
    if (formData.description && formData.description.length > 200) {
      newErrors.description = `Description must be 200 characters or less.`;
      isValid = false;
    }
    
    if (formData.location && formData.location.length > 200) {
      newErrors.location = `Location must be 200 characters or less.`;
      isValid = false;
    }
    
    if (!formData.calendarId) {
      newErrors.calendarId = "Please select a calendar.";
      isValid = false;
    }

    if (!formData.isAllDay) {
      if (!formData.startTime) {
        newErrors.startTime = "Start time is required.";
        isValid = false;
      }
      if (!formData.endTime) {
        newErrors.endTime = "End time is required.";
        isValid = false;
      }
      if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
         newErrors.endTime = "End time must be after start time.";
         isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    
    const eventPayload: Omit<Event, 'id'> = {
        ...formData,
        description: formData.description?.trim() || null, 
        location: formData.location?.trim() || null,
        startTime: formData.isAllDay ? null : formData.startTime,
        endTime: formData.isAllDay ? null : formData.endTime,
    };
    
    const promise = createEvent(eventPayload);

    toast.promise(promise, {
      loading: 'Creating event...',
      success: () => {
        setIsSubmitting(false);
        router.push('/calendar');
        return 'Event created successfully!';
      },
      error: (err) => {
        setIsSubmitting(false);
        return `Error creating event: ${err instanceof Error ? err.message : 'Unknown error'}`;
      },
    });
  };
  
  const handleCancel = () => {
    router.back()
  }
  
  const handleSelectChange = (value: string, name: keyof NewEventFormData) => {
    setFormData(prev => ({
       ...prev,
       [name]: value,
    }));
    
    if (name in errors) {
       setErrors(prev => {
           const newErrors = { ...prev };
           delete newErrors[name as keyof NewEventFormErrors];
           return newErrors;
       });
    }
  };
  
  if (isLoadingCalendars) {
     return <AppShell><div className="p-6 text-center">Loading form...</div></AppShell>;
  }

  return (
    <AppShell>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#37352f] dark:text-white flex items-center">
            <CalendarIcon className="w-6 h-6 mr-2 text-[#5865f2]" />
            Create New Event
          </h1>
          <p className="text-[#6b7280] dark:text-[#b9bbbe] mt-1">
            Add a new event to your calendar.
          </p>
        </header>
        
        <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#202225] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Team Meeting, Birthday Party"
                value={formData.title}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
                className={errors.title ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
              />
              {errors.title && <p id="title-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.title}</p>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={errors.date ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}
                />
                {errors.date && <p id="date-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.date}</p>}
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime ?? ''}
                  onChange={handleInputChange}
                  disabled={formData.isAllDay}
                  required={!formData.isAllDay}
                  aria-invalid={!!errors.startTime}
                  aria-describedby={errors.startTime ? "startTime-error" : undefined}
                  className={`${formData.isAllDay ? 'opacity-50 cursor-not-allowed' : ''} ${errors.startTime ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                />
                {errors.startTime && <p id="startTime-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.startTime}</p>}
              </div>
              <div className="sm:col-span-1">
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime ?? ''}
                  onChange={handleInputChange}
                  disabled={formData.isAllDay}
                  required={!formData.isAllDay}
                  aria-invalid={!!errors.endTime}
                  aria-describedby={errors.endTime ? "endTime-error" : undefined}
                  className={`${formData.isAllDay ? 'opacity-50 cursor-not-allowed' : ''} ${errors.endTime ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`}
                />
                {errors.endTime && <p id="endTime-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.endTime}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isAllDay"
                name="isAllDay"
                checked={formData.isAllDay}
                onCheckedChange={(checked) => {
                  const simulatedEvent = {
                    target: { name: 'isAllDay', value: checked, type: 'checkbox' }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(simulatedEvent);
                }}
              />
              <Label htmlFor="isAllDay" className="mb-0 cursor-pointer">All Day Event</Label>
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description"
                name="description"
                rows={4}
                placeholder="Add details about the event..."
                value={formData.description ?? ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input 
                id="location"
                name="location"
                type="text"
                placeholder="e.g., Conference Room B, Zoom Link"
                value={formData.location ?? ''}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="calendarId">Calendar</Label>
              <Select
                value={formData.calendarId}
                onValueChange={(value) => handleSelectChange(value, 'calendarId')}
                disabled={isLoadingCalendars || calendars.length === 0}
                name="calendarId"
              >
                 <SelectTrigger 
                    id="calendarId" 
                    className={`mt-1 ${errors.calendarId ? 'border-red-500 dark:border-red-400 focus:ring-red-500' : ''}`} 
                    aria-invalid={!!errors.calendarId}
                    aria-describedby={errors.calendarId ? "calendarId-error" : undefined}
                  >
                    <SelectValue placeholder={isLoadingCalendars ? "Loading calendars..." : (calendars.length === 0 ? "No calendars available" : "Select calendar")} />
                 </SelectTrigger>
                 <SelectContent>
                    {!isLoadingCalendars && calendars.map(cal => (
                       <SelectItem key={cal.id} value={cal.id}>{cal.name}</SelectItem>
                    ))}
                    {isLoadingCalendars && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                 </SelectContent>
              </Select>
              {errors.calendarId && <p id="calendarId-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.calendarId}</p>}
            </div>
            
            <div className="flex justify-end items-center gap-3 pt-4 border-t border-[#e6e6e6] dark:border-[#40444b]">
              <button 
                type="button" 
                onClick={handleCancel}
                className="px-4 py-2 rounded-md text-sm font-medium text-[#6b7280] dark:text-[#b9bbbe] hover:bg-[#f0f0f0] dark:hover:bg-[#40444b] transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" variant="primaryAction" disabled={isSubmitting || isLoadingCalendars}>
                 {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  )
} 