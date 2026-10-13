import React from 'react';
import { useApp } from '../../context/AppContext';
import { useSound } from '../../context/SoundContext';
import DestinationParticleCanvas from './DestinationParticleCanvas';

export const MilestoneCelebrationModal: React.FC = () => {
  const { celebrationMilestone, setCelebrationMilestone, setCurrentScreen } = useApp();
  const { playCelebrationSound } = useSound();

  if (!celebrationMilestone) return null;

  const is100Percent = celebrationMilestone.percent >= 100;

  const handleClose = () => {
    setCelebrationMilestone(null);
    playCelebrationSound();
    if (is100Percent) {
      setCurrentScreen('completed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="absolute inset-0 pointer-events-none">
        <DestinationParticleCanvas type="confetti" />
      </div>

      <div className="relative z-20 bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl flex flex-col items-center gap-4">
        {/* Milestone Icon Pill */}
        <div className="text-5xl bg-amber-500/20 p-4 rounded-full border border-amber-400/40 animate-bounce">
          {celebrationMilestone.icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-amber-400 tracking-wide">
          {is100Percent ? 'Goal Fully Achieved! 🎉' : 'Milestone Unlocked! 🎉'}
        </h2>

        {/* Subtitle */}
        <h3 className="text-lg font-bold text-white leading-snug">
          {celebrationMilestone.title}
        </h3>

        {/* Description */}
        <p className="text-xs font-medium text-slate-300 leading-relaxed">
          {celebrationMilestone.description}
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClose}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-95 mt-2 flex items-center justify-center gap-2"
        >
          <span>{is100Percent ? 'View Victory Screen! 🥳' : 'Keep Saving! 🚀'}</span>
        </button>
      </div>
    </div>
  );
};

export default MilestoneCelebrationModal;
