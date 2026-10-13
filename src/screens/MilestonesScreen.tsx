import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Lock, Sparkles, MapPin, ArrowLeft } from 'lucide-react';

export const MilestonesScreen: React.FC = () => {
  const { activeDestination, activeGoal, formatCurrency, setCurrentScreen } = useApp();
  const percentSaved = Math.min(100, Math.round((activeGoal.currentSaved / activeGoal.targetAmount) * 100));

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
        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">JOURNEY ROADMAP</span>
        <div className="w-8" />
      </div>

      {/* Overview Banner */}
      <div className="glass-card p-4 rounded-3xl border border-indigo-800/60 bg-slate-900/90 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={activeDestination.photoAsset}
            alt={activeDestination.name}
            className="w-12 h-12 object-contain drop-shadow-md"
          />
          <div>
            <h3 className="text-sm font-black text-white">{activeDestination.name}</h3>
            <span className="text-[11px] font-extrabold text-indigo-400">{percentSaved}% Unlocked</span>
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen('completed')}
          className="glass-pill px-3 py-1.5 text-[10px] font-bold text-slate-300 hover:bg-white/20 border border-white/20"
        >
          Preview 100%
        </button>
      </div>

      {/* Timeline Roadmap */}
      <div className="space-y-4 overflow-y-auto max-h-[68vh] pr-1 no-scrollbar relative pl-4">
        {/* Timeline Path Line */}
        <div className="absolute left-[27px] top-4 bottom-6 w-1 bg-slate-800 -z-0" />

        {activeDestination.milestones.map((m, idx) => {
          const isUnlocked = percentSaved >= m.percent;
          return (
            <div key={idx} className="relative flex items-start gap-4 z-10">
              {/* Status Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isUnlocked
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {isUnlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
              </div>

              {/* Milestone Card */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'glass-card border-emerald-900/60 bg-slate-900/90 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">
                    {m.percent}% Milestone ({formatCurrency(Math.round((m.percent / 100) * activeGoal.targetAmount))})
                  </span>
                  <span className="text-base">{m.icon}</span>
                </div>
                <h4 className="text-xs font-black text-white">{m.title}</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
