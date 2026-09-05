import React from 'react';
import { Language } from '../data/translations';

interface FlagIconProps {
  code: Language;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FlagIcon: React.FC<FlagIconProps> = ({ 
  code, 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-3',
    md: 'w-5 h-3.5',
    lg: 'w-6 h-4.5',
  };

  const baseClasses = `${sizeClasses[size]} inline-block rounded-xs overflow-hidden shadow-xs shrink-0 border border-black/10 align-middle ${className}`;

  switch (code) {
    case 'ru':
      return (
        <span className={baseClasses} title="Русский" aria-label="Россия">
          <svg viewBox="0 0 640 480" className="w-full h-full block">
            <g fillRule="evenodd" strokeWidth="1pt">
              <path fill="#ffffff" d="M0 0h640v160H0z" />
              <path fill="#0039a6" d="M0 160h640v160H0z" />
              <path fill="#d52b1e" d="M0 320h640v160H0z" />
            </g>
          </svg>
        </span>
      );

    case 'en':
      return (
        <span className={baseClasses} title="English" aria-label="United Kingdom">
          <svg viewBox="0 0 640 480" className="w-full h-full block">
            <path fill="#012169" d="M0 0h640v480H0z" />
            <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z" />
            <path fill="#C8102E" d="m424 288 216 160v32h-40L380 300l44-12zm-208-96L0 32V0h40l220 160-44 32zM640 0v16L418 181l44 15 178-132V0zM0 480v-16l222-165-44-15L0 416v64z" />
            <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
            <path fill="#C8102E" d="M266 0h108v480H266zM0 186h640v108H0z" />
          </svg>
        </span>
      );

    case 'kz':
      return (
        <span className={baseClasses} title="Қазақша" aria-label="Қазақстан">
          <svg viewBox="0 0 640 320" className="w-full h-full block">
            <rect width="640" height="320" fill="#00afca" />
            {/* Sun in center */}
            <circle cx="340" cy="140" r="42" fill="#fed141" />
            {/* Eagle silhouette */}
            <path
              d="M340 196 c-38-6-72-18-98-34 32 3 66 11 98 22 32-11 66-19 98-22-26 16-60 28-98 34z"
              fill="#fed141"
            />
            {/* Hoist ornament strip */}
            <path
              d="M20 30 q20 30 0 60 q20 30 0 60 q20 30 0 60 q20 30 0 60"
              stroke="#fed141"
              strokeWidth="12"
              fill="none"
            />
          </svg>
        </span>
      );

    case 'es':
      return (
        <span className={baseClasses} title="Español" aria-label="España">
          <svg viewBox="0 0 640 480" className="w-full h-full block">
            <path fill="#c60b1e" d="M0 0h640v480H0z" />
            <path fill="#ffc400" d="M0 120h640v240H0z" />
            {/* Simplified emblem badge */}
            <g transform="translate(140, 180)">
              <rect x="0" y="0" width="40" height="50" rx="6" fill="#c60b1e" />
              <rect x="5" y="5" width="30" height="40" rx="4" fill="#ffc400" />
              <circle cx="20" cy="25" r="8" fill="#c60b1e" />
            </g>
          </svg>
        </span>
      );

    default:
      return null;
  }
};
