import React from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_AI_NOTIFICATIONS } from '../data/aiPrompts';
import { Bell, Flame, Lightbulb, ArrowLeft } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="p-2 rounded-full glass-card text-white hover:bg-white/20 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">AI NOTIFICATIONS</span>
        <div className="w-8" />
      </div>

      {/* Activity Log */}
      <div className="space-y-3 my-auto max-h-[75vh] overflow-y-auto pr-1 no-scrollbar">
        {SAMPLE_AI_NOTIFICATIONS.map(msg => (
          <div
            key={msg.id}
            className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-2 hover:border-indigo-500/50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {msg.type === 'cheer' ? (
                  <Flame className="w-4 h-4 text-orange-400" />
                ) : (
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                )}
                <h4 className="text-xs font-black text-white">{msg.title}</h4>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">{msg.timestamp}</span>
            </div>

            <p className="text-[11px] font-medium text-slate-300 leading-relaxed">
              {msg.content}
            </p>

            {msg.actionLabel && (
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="text-[10px] font-extrabold text-indigo-400 hover:underline pt-1 block"
              >
                {msg.actionLabel} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
