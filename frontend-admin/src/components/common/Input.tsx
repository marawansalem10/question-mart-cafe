/**
 * Question Mart & Cafe - Admin Input Component
 * Reusable input component with label and error states
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseStyles = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-stone-300';
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1 text-sm font-medium text-stone-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-stone-500">{helperText}</p>
      )}
    </div>
  );
};
