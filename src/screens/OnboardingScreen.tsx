import React from 'react';
import { useApp } from '../context/AppContext';
import { PengusMascot } from '../components/Mascot/PengusMascot';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="relative min-h-full h-full flex flex-col justify-between p-6 bg-slate-950 text-white overflow-hidden">
      {/* Blurred Destination Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200"
          alt="Destination Preview"
          className="w-full h-full object-cover opacity-30 scale-110"
          style={{ filter: 'blur(16px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 min-h-full h-full flex flex-col justify-between">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center pt-3 pb-2 shrink-0">
          <div className="glass-pill px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-black text-indigo-300 bg-slate-900/90 border border-indigo-500/40 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pingu AI Coach</span>
          </div>
          <button
            onClick={() => setCurrentScreen('auth')}
            className="text-xs font-extrabold text-slate-300 hover:text-white transition-colors py-1.5 px-3 rounded-xl bg-slate-900/60 border border-slate-700/60"
          >
            Sign In
          </button>
        </div>

        {/* Hero Mascot Section */}
        <div className="my-auto py-2 flex flex-col items-center text-center space-y-4">
          <PengusMascot
            size="lg"
            customQuote="Hello traveler! Ready to save for your dream vacation?"
          />

          <div className="space-y-2 max-w-xs px-2">
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight">
              Save for the journey you've always dreamed of.
            </h1>
            <p className="text-xs font-semibold text-slate-300 leading-relaxed">
              Your emotional AI travel savings coach. Visual destination unlocks, custom outfits & smart budgeting.
            </p>
          </div>

          {/* Feature Badges - Spacious Stacked List */}
          <div className="w-full max-w-xs space-y-2 pt-1 text-left">
            <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">12 Cultural Destinations</h4>
                <p className="text-[10px] font-medium text-slate-400">Pingu changes outfits for every city!</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">AI Travel Budget Engine</h4>
                <p className="text-[10px] font-medium text-slate-400">Calculates flight, stay & daily expenses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA Section */}
        <div className="space-y-2 pt-2 shrink-0 pb-3">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-black text-xs rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all active:scale-95 border border-indigo-400/40"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Get Started & Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[10px] font-bold text-slate-400">
            No bank credentials required • 100% Free Demo
          </p>
        </div>
      </div>
    </div>
  );
};
