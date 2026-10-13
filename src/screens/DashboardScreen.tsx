import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PengusMascot } from '../components/Mascot/PengusMascot';
import { ProgressRing } from '../components/Dashboard/ProgressRing';
import { ActivityFeed } from '../components/Dashboard/ActivityFeed';
import { AddSavingsModal } from './AddSavingsModal';
import { DestinationParticleCanvas } from '../components/Animations/DestinationParticleCanvas';
import { Plus, Bot, Map, Calendar, Target, Eye, Layers, Shirt, Globe, ChevronDown } from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const {
    activeGoal,
    activeDestination,
    formatCurrency,
    showAddSavingsModal,
    setShowAddSavingsModal,
    setShowWardrobeModal,
    setShowDestinationPickerModal,
    setCurrentScreen,
    setSavingsPercentageForDemo
  } = useApp();

  const [imageError, setImageError] = useState(false);

  const percentSaved = Math.min(100, Math.round((activeGoal.currentSaved / activeGoal.targetAmount) * 100));
  
  // Dynamic Blur Amount (in pixels)
  // 0% saved = 24px blur (heavy blur)
  // 100% saved = 0px blur (crystal clear)
  const blurPx = Math.max(0, Math.round(24 * (1 - percentSaved / 100)));

  const daysRemaining = 412;
  const photoUrl = !imageError ? activeDestination.photoFallbackUrl : 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200';

  return (
    <div className="relative min-h-full h-full flex flex-col justify-between overflow-hidden text-white bg-slate-950 pb-14 select-none">
      {/* FULL-BLEED DESTINATION BACKDROP WITH GUARANTEED BLUR */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* SVG Gaussian Blur Engine for 100% guaranteed blur across all browsers */}
        <svg className="absolute inset-0 w-full h-full object-cover">
          <filter id="svgBlurFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={blurPx / 1.4} />
          </filter>
          <image
            href={photoUrl}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            filter={blurPx > 0 ? "url(#svgBlurFilter)" : "none"}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* CSS Backdrop Blur Overlay Backup */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`
          }}
        />

        <DestinationParticleCanvas type={activeDestination.particleType} className="absolute inset-0" />

        {/* Soft Vignette Overlay so text remains crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85" />
      </div>

      {/* FOREGROUND CONTENT (Unified Glass Layout) */}
      <div className="relative z-10 p-5 flex flex-col justify-between min-h-full space-y-3.5 overflow-y-auto max-h-[88vh] no-scrollbar">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center pt-1 shrink-0">
          <div
            onClick={() => setShowDestinationPickerModal(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md cursor-pointer transition-all active:scale-95 group shadow-lg"
          >
            <span className="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">{activeDestination.flag}</span>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest drop-shadow-sm">{activeDestination.country}</span>
                <ChevronDown className="w-3 h-3 text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
              </div>
              <h2 className="text-xs font-black text-white leading-tight drop-shadow-md">{activeDestination.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWardrobeModal(true)}
              className="glass-pill px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-black text-white hover:bg-white/20 transition-all bg-black/40 border border-white/20 backdrop-blur-md shadow-lg"
            >
              <Shirt className="w-3.5 h-3.5 text-amber-400" />
              <span>Closet</span>
            </button>

            <button
              onClick={() => setCurrentScreen('milestones')}
              className="glass-pill px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-black text-white hover:bg-white/20 transition-all bg-black/40 border border-white/20 backdrop-blur-md shadow-lg"
            >
              <Map className="w-3.5 h-3.5 text-indigo-400" />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Unblur Simulator Floating Bar */}
        <div className="glass-pill p-2.5 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md shadow-xl space-y-1.5 shrink-0">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-200 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>City Unblur Simulator</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/40">
              <Eye className="w-3 h-3" />
              <span>Blur: {blurPx}px ({percentSaved}%)</span>
            </div>
          </div>

          {/* Interactive Percentage Pills */}
          <div className="flex justify-between gap-1.5">
            {[0, 25, 50, 75, 100].map(pct => (
              <button
                key={pct}
                onClick={() => setSavingsPercentageForDemo(pct)}
                className={`flex-1 py-1 rounded-xl text-[10px] font-black transition-all ${
                  percentSaved === pct
                    ? 'bg-indigo-600 text-white shadow-lg border border-indigo-300 scale-105'
                    : 'bg-black/50 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* 100% Completion Victory Banner */}
        {percentSaved >= 100 && (
          <div
            onClick={() => setCurrentScreen('completed')}
            className="p-3 rounded-2xl border border-emerald-400/50 bg-gradient-to-r from-emerald-950/90 to-teal-950/90 backdrop-blur-md shadow-xl flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-all shrink-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">🥳</span>
              <div>
                <h4 className="text-xs font-black text-emerald-300">Goal 100% Achieved!</h4>
                <p className="text-[10px] font-medium text-slate-200">{activeDestination.name} is waiting for you!</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-xl shadow-md shrink-0">
              Victory Screen →
            </span>
          </div>
        )}

        {/* Hero Mascot (Floats Seamlessly on Background) */}
        <div className="py-1 flex justify-center shrink-0">
          <PengusMascot size="lg" />
        </div>

        {/* Seamless Floating Progress Arc (No Opaque Background Box!) */}
        <div className="flex flex-col items-center text-center space-y-3 shrink-0 my-1">
          {/* Glass-Ring Progress Circle */}
          <div className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl">
            <ProgressRing progressPercent={percentSaved} size={155} strokeWidth={10}>
              <div className="text-center">
                <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider block">Saved</span>
                <p className="text-2xl font-black text-white leading-tight drop-shadow-md">
                  {formatCurrency(activeGoal.currentSaved)}
                </p>
                <span className="text-[11px] font-extrabold text-indigo-300 drop-shadow-sm">
                  of {formatCurrency(activeGoal.targetAmount)}
                </span>
              </div>
            </ProgressRing>
          </div>

          {/* Quick Stat Glass Pills (Seamless Integrated Style) */}
          <div className="grid grid-cols-2 gap-2.5 w-full pt-1">
            <div className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-left flex items-center gap-2.5 shadow-lg">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-[9px] font-extrabold text-slate-300 uppercase block">Days Left</span>
                <span className="text-xs font-black text-white">{daysRemaining} Days</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-left flex items-center gap-2.5 shadow-lg">
              <Target className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[9px] font-extrabold text-slate-300 uppercase block">Monthly Goal</span>
                <span className="text-xs font-black text-white">{formatCurrency(activeGoal.monthlyTarget)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Floating Buttons */}
        <div className="grid grid-cols-2 gap-2.5 shrink-0 pt-1">
          <button
            onClick={() => setShowAddSavingsModal(true)}
            className="py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 border border-indigo-400/40"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Savings</span>
          </button>

          <button
            onClick={() => setCurrentScreen('ai_coach')}
            className="py-3.5 px-4 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white font-extrabold text-xs rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Ask Pingu AI</span>
          </button>
        </div>

        {/* Recent Activity Feed (Seamless Glass) */}
        <ActivityFeed />
      </div>

      {/* Modals */}
      {showAddSavingsModal && <AddSavingsModal />}
    </div>
  );
};
