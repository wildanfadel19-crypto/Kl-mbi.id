'use client';

import React from 'react';

interface KlambiLogoProps {
  variant?: 'full' | 'icon-only' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function KlambiLogo({
  variant = 'full',
  size = 'md',
  className = '',
}: KlambiLogoProps) {
  // Dimensions based on size
  const iconSizes = {
    sm: 24,
    md: 36,
    lg: 48,
    xl: 72,
  };

  const currentIconSize = iconSizes[size];

  // Infinity Icon SVG Component
  const InfinityIcon = (
    <svg
      width={currentIconSize}
      height={currentIconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient
          id="klambiInfinityGrad"
          x1="10"
          y1="20"
          x2="90"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <path
        d="M32 35C21.5066 35 13 41.7157 13 50C13 58.2843 21.5066 65 32 65C43 65 51 54 50 50C49 46 57 35 68 35C78.4934 35 87 41.7157 87 50C87 58.2843 78.4934 65 68 65C57 65 49 54 50 50C51 46 43 35 32 35Z"
        stroke="url(#klambiInfinityGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {InfinityIcon}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        {InfinityIcon}
        <div className="flex items-center text-center">
          <span className="text-2xl font-extrabold text-[#1A2B5C] tracking-tight">
            Klámbi
          </span>
          <span className="text-2xl font-bold text-[#3B82F6] tracking-tight">
            .id
          </span>
        </div>
      </div>
    );
  }

  // Horizontal Full Logo (default)
  const fontClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {InfinityIcon}
      <div className={`flex items-center font-sans ${fontClasses[size]}`}>
        <span className="font-extrabold text-[#1A2B5C] tracking-tight">
          Klámbi
        </span>
        <span className="font-bold text-[#3B82F6] tracking-tight">
          .id
        </span>
      </div>
    </div>
  );
}
