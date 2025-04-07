"use client";

import React from 'react';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'date' | 'time' | 'textarea' | 'select' | 'checkbox';
  value?: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select type
  checked?: boolean; // For checkbox type
  className?: string; // Allow additional classes
  rows?: number; // For textarea
  disabled?: boolean;
}

export function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  options,
  checked,
  className = '',
  rows = 4,
  disabled = false,
}: FormFieldProps) {
  
  // Base styling classes (similar to what was in NewEventPage)
  const inputBaseClass = "block w-full px-3 py-2 rounded-md shadow-sm text-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865f2] focus:ring-offset-white dark:focus:ring-offset-[#2f3136] disabled:opacity-50 disabled:cursor-not-allowed";
  const inputNormalClass = "bg-white dark:bg-[#40444b] border-gray-300 dark:border-[#202225] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";
  const inputErrorClass = "border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400";
  const checkboxClass = "h-4 w-4 text-[#5865f2] rounded border-gray-300 dark:border-gray-600 focus:ring-[#5865f2] bg-transparent dark:bg-transparent disabled:opacity-50";

  const commonProps = {
    id,
    name,
    onChange,
    required: required && type !== 'checkbox',
    placeholder,
    disabled,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: `${inputBaseClass} ${error ? inputErrorClass : inputNormalClass} ${className}`
  };

  const renderInput = () => {
    const elementClassName = `${inputBaseClass} ${error ? inputErrorClass : inputNormalClass} ${className}`;
    
    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            value={value as string | undefined}
            rows={rows}
            className={elementClassName}
          />
        );
      case 'select':
        return (
          <select {...commonProps} value={value as string | undefined} className={elementClassName}>
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
       case 'checkbox':
         // Checkbox has different structure and styling, handle separately
         return null; // Will be rendered outside this switch
      default: // Handles text, date, time, etc.
        return (
          <input
            {...commonProps}
            type={type}
            value={value as string | number | undefined}
            className={elementClassName}
          />
        );
    }
  };
  
  if (type === 'checkbox') {
    return (
      <div className={`flex items-center ${className}`}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={checkboxClass}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} className="ml-2 block text-sm text-[#37352f] dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {/* Error message for checkbox might be placed differently depending on layout */}
        {error && <p id={`${id}-error`} className="ml-2 text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}> {/* Apply container class if needed */}
      <label htmlFor={id} className="block text-sm font-medium text-[#37352f] dark:text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
} 