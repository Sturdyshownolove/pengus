import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export const IOSFrameContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useApp();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const isFrameActive = settings.deviceFrameEnabled;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-6 select-none overflow-x-hidden">
      {/* Floating Toggle Controls Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 glass-pill px-4 py-2 border border-white/20 shadow-2xl backdrop-blur-md bg-slate-900/90 text-white">
        <button
          onClick={() => updateSettings({ deviceFrameEnabled: !isFrameActive })}
          className="flex items-center gap-2 text-xs font-black text-white hover:text-indigo-300 transition-colors"
        >
          {isFrameActive ? <Monitor className="w-4 h-4 text-indigo-400" /> : <Smartphone className="w-4 h-4 text-indigo-400" />}
          <span>{isFrameActive ? 'Switch to Full Screen View' : 'Switch to iOS Phone Frame'}</span>
        </button>
      </div>

      {/* Main App Container */}
      {isFrameActive ? (
        /* iPhone 15 Pro Chassis */
        <div className="relative w-[390px] h-[844px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/10 overflow-hidden flex flex-col justify-between shrink-0">
          {/* iOS Status Bar */}
          <div className="relative z-40 px-7 pt-3.5 pb-2 flex justify-between items-center text-white text-xs font-black pointer-events-none shrink-0 bg-slate-950/80 backdrop-blur-md">
            <span>{currentTime || '09:41'}</span>

            {/* Dynamic Island Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-7 bg-black rounded-full flex items-center justify-between px-2.5 border border-slate-800 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              <div className="w-2 h-2 rounded-full bg-indigo-900/60" />
            </div>

            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="relative flex-1 w-full overflow-hidden bg-slate-950 flex flex-col justify-between">
            {children}
          </div>

          {/* iOS Home Bar Indicator */}
          <div className="relative z-40 py-2 flex justify-center items-center pointer-events-none bg-slate-950 backdrop-blur-md shrink-0">
            <div className="w-32 h-1 bg-white/60 rounded-full" />
          </div>
        </div>
      ) : (
        /* Full Screen Responsive Frame */
        <div className="w-full max-w-md h-[100vh] sm:h-[844px] bg-slate-950 sm:rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col justify-between border border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
};
