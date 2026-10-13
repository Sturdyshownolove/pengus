import React from 'react';
import { useApp, ScreenType } from '../../context/AppContext';
import { useSound } from '../../context/SoundContext';
import { Home, Bot, Map, Bell, User } from 'lucide-react';

export const GlassTabBar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();
  const { playPopSound } = useSound();

  const tabs: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'ai_coach', label: 'AI Coach', icon: <Bot className="w-4 h-4" /> },
    { id: 'milestones', label: 'Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
  ];

  if (['onboarding', 'auth', 'create_goal', 'budget_result', 'completed'].includes(currentScreen)) {
    return null;
  }

  const handleTabClick = (tabId: ScreenType) => {
    playPopSound();
    setCurrentScreen(tabId);
  };

  return (
    <div className="absolute bottom-3 left-3 right-3 z-40">
      <div className="glass-card px-2 py-1.5 rounded-full border border-white/60 dark:border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-around bg-white/80 dark:bg-slate-900/85">
        {tabs.map(tab => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative py-1 px-2.5 rounded-full flex flex-col items-center gap-0.5 transition-all duration-300 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-black scale-105'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold'
              }`}
            >
              {tab.icon}
              <span className="text-[9px] tracking-tight">{tab.label}</span>
              {isActive && (
                <div className="absolute -bottom-0.5 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pop-in" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
