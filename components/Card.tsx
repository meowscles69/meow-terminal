import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-neu-base dark:bg-neu-dark-base rounded-2xl p-4
        shadow-neu dark:shadow-neu-dark
        transition-all duration-300 ease-in-out
        ${hoverEffect ? 'hover:shadow-neu-sm dark:hover:shadow-neu-dark-sm cursor-pointer transform hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};