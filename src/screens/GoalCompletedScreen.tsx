import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSound } from '../context/SoundContext';
import { Confetti } from '../components/Animations/Confetti';
import { PengusMascot } from '../components/Mascot/PengusMascot';
import { Sparkles, Share2, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const GoalCompletedScreen: React.FC = () => {
  const { activeDestination, activeGoal, formatCurrency, setCurrentScreen } = useApp();
  const { playCelebrationSound } = useSound();
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <div className="relative min-h-full flex flex-col justify-between p-6 bg-slate-950 text-white overflow-hidden">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Crystal Clear Destination Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeDestination.photoFallbackUrl}
          alt={activeDestination.name}
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center pt-4">
        <div className="inline-flex items-center gap-1.5 glass-pill px-4 py-1.5 text-xs font-black text-emerald-400 mb-3 border border-emerald-400/30">
          <Sparkles className="w-4 h-4" />
          <span>GOAL 100% ACHIEVED</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">You made it.</h1>
        <p className="text-xs font-semibold text-slate-300 mt-1">
          Your dream of visiting {activeDestination.name} is now reality.
        </p>
      </div>

      {/* Mascot with Luggage */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center">
        <PengusMascot
          size="xl"
          emotion="celebrating"
          customQuote={`Pack your luggage! ${activeDestination.name} is waiting for us! 🎉`}
        />
      </div>

      {/* Achievement Stats Box */}
      <div className="relative z-10 glass-card p-4 rounded-3xl border border-white/20 bg-black/40 backdrop-blur-md space-y-2 mb-4 text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Final Summary</span>
        <div className="flex justify-around items-center pt-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">Total Saved</span>
            <span className="text-base font-black text-emerald-400">{formatCurrency(activeGoal.targetAmount)}</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">Destination</span>
            <span className="text-base font-black text-white">{activeDestination.name}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 space-y-2.5">
        <button
          onClick={() => setCurrentScreen('create_goal')}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Compass className="w-4 h-4" />
          <span>Start New Adventure</span>
        </button>

        <button
          onClick={() => alert(`Achievement card copied! Share your ${activeDestination.name} savings milestone with friends!`)}
          className="w-full py-3 px-4 glass-card border border-white/20 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95"
        >
          <Share2 className="w-4 h-4 text-indigo-400" />
          <span>Share Achievement</span>
        </button>
      </div>
    </div>
  );
};
