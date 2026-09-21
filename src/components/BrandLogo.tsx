import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  inverted?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  inverted = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Clean, minimalist geometric steering / route mark */}
      <div
        className={`${iconSizes[size]} shrink-0 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-sm`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-1/2 h-1/2"
        >
          {/* Steering wheel / compass / navigation hybrid */}
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="M3 12h6" />
          <path d="M15 12h6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold tracking-tight ${textSizes[size]} ${
                inverted ? 'text-slate-900' : 'text-slate-900 dark:text-white'
              }`}
            >
              Sürücü<span className="text-emerald-600 dark:text-emerald-400">Ağı</span>
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            Onaylı Şoför Topluluğu
          </span>
        </div>
      )}
    </div>
  );
};
