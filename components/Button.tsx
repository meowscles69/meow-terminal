import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '',
  disabled,
  ...props 
}) => {
  // Base neumorphic shape
  const baseStyles = "font-bold rounded-full transition-all active:shadow-neu-pressed dark:active:shadow-neu-dark-pressed flex items-center justify-center gap-2 focus:outline-none select-none";
  
  const variants = {
    // Primary: Colored text, extruded
    primary: "bg-neu-base dark:bg-neu-dark-base text-momo-500 shadow-neu dark:shadow-neu-dark hover:text-momo-600", 
    // Secondary: Grey text, extruded
    secondary: "bg-neu-base dark:bg-neu-dark-base text-neu-text dark:text-neu-dark-text shadow-neu dark:shadow-neu-dark hover:text-neu-muted dark:hover:text-neu-dark-muted",
    // Danger: Red text
    danger: "bg-neu-base dark:bg-neu-dark-base text-red-500 shadow-neu dark:shadow-neu-dark hover:text-red-600",
    // Success: Green text
    success: "bg-neu-base dark:bg-neu-dark-base text-green-500 shadow-neu dark:shadow-neu-dark hover:text-green-600",
    // Outline: Pressed look
    outline: "bg-neu-base dark:bg-neu-dark-base text-momo-500 shadow-neu-pressed dark:shadow-neu-dark-pressed hover:shadow-neu dark:hover:shadow-neu-dark"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};