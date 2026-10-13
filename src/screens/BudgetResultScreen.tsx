import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSound } from '../context/SoundContext';
import { Confetti } from '../components/Animations/Confetti';
import { Sparkles, Calendar, Target, CheckCircle2, ArrowRight, Compass } from 'lucide-react';

export const BudgetResultScreen: React.FC = () => {
  const { activeGoal, activeDestination, setCurrentScreen, formatCurrency } = useApp();
  const { playCelebrationSound } = useSound();
  const [showConfetti, setShowConfetti] = useState(true);

  const monthsRemaining = 14;
  const monthlySavings = activeGoal.monthlyTarget;

  const handleStartJourney = () => {
    playCelebrationSound();
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-900/10 via-slate-900/5 to-slate-900/20 text-slate-900 dark:text-white">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <div className="text-center pt-3">
        <div className="inline-flex items-center gap-1.5 glass-pill px-3 py-1 text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI TRAVEL PLAN READY</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Your {activeDestination.name} Goal
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
          Custom plan crafted by Pingu AI
        </p>
      </div>

      {/* Mascot & Target Card */}
      <div className="my-auto space-y-4">
        {/* Hero Card */}
        <div className="glass-card p-5 rounded-3xl border border-white/60 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-4">
            <img
              src={activeDestination.photoAsset}
              alt={activeDestination.name}
              className="w-24 h-24 object-contain drop-shadow-xl animate-float"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{activeDestination.country} {activeDestination.flag}</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug">{activeDestination.outfitName}</h3>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {formatCurrency(activeGoal.targetAmount)}
              </div>
            </div>
          </div>
        </div>

        {/* Target Metrics Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400">Timeframe</span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100">{monthsRemaining} Months</p>
            </div>
          </div>

          <div className="glass-card p-3.5 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400">Monthly Goal</span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100">{formatCurrency(monthlySavings)}/mo</p>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-indigo-500 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-extrabold text-indigo-600 dark:text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>Pingu AI Strategy</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Saving just {formatCurrency(Math.round(monthlySavings / 30))}/day will fully unlock your dream trip to {activeDestination.name} right in time for travel season!
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleStartJourney}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Start Journey with Pingu</span>
      </button>
    </div>
  );
};
