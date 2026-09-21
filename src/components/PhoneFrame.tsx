import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isFrameMode?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, isFrameMode = true }) => {
  if (!isFrameMode) {
    return (
      <div className="w-full min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-start bg-neutral-100 dark:bg-[#0c0d12] py-4 px-2 sm:px-4">
        <div className="w-full max-w-[440px] bg-white dark:bg-[#12141c] border border-black/[0.06] dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-xl min-h-[840px] flex flex-col relative">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4 md:py-6">
      {/* Precision Engineered Minimalist Mobile Chassis */}
      <div
        id="mobile-app-viewport"
        className="relative w-full max-w-[396px] h-[830px] max-h-[calc(100vh-4.5rem)] bg-white dark:bg-[#11131a] rounded-[46px] ring-1 ring-black/[0.08] dark:ring-white/[0.1] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.75)] flex flex-col overflow-hidden transition-all"
      >
        {/* Dynamic Island & Status Bar */}
        <div className="w-full h-11 px-7 shrink-0 flex items-center justify-between text-xs font-semibold text-neutral-800 dark:text-neutral-200 z-30 select-none bg-inherit">
          <span className="text-[13px] font-semibold tracking-tight">09:41</span>

          {/* Minimalist Dynamic Island Pill */}
          <div className="w-24 h-6 bg-black dark:bg-black/90 rounded-full flex items-center justify-between px-2.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#181a20] ring-1 ring-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-1 ml-0.5">
              <span className="text-[10px] font-mono font-medium">98%</span>
              <Battery className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
            </div>
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-white dark:bg-[#11131a]">
          {children}
        </div>

        {/* Minimal iOS Home Indicator */}
        <div className="w-full h-4 shrink-0 flex items-center justify-center bg-white dark:bg-[#11131a] z-30">
          <div className="w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
