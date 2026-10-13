import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useSound } from '../../context/SoundContext';
import { EmotionState } from '../../types';
import { getAIPersonalityQuotes } from '../../data/aiPrompts';
import { getDestinationById } from '../../data/destinations';
import { Sparkles, Heart } from 'lucide-react';

interface PengusMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  interactive?: boolean;
  customQuote?: string;
  emotion?: EmotionState;
}

export const PengusMascot: React.FC<PengusMascotProps> = ({
  size = 'md',
  showSpeechBubble = true,
  interactive = true,
  customQuote,
  emotion
}) => {
  const { activeDestination, activeGoal, settings, equippedOutfitId } = useApp();
  const { playPengusSound } = useSound();
  const [isTapped, setIsTapped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const outfitDest = getDestinationById(equippedOutfitId || activeGoal.destinationId);

  const percentSaved = Math.min(100, Math.round((activeGoal.currentSaved / activeGoal.targetAmount) * 100));

  const currentEmotion: EmotionState = emotion || (
    percentSaved >= 100 ? 'celebrating' :
    percentSaved >= 60 ? 'excited' :
    percentSaved >= 25 ? 'happy' : 'motivating'
  );

  const quote = customQuote || getAIPersonalityQuotes(settings.aiPersonality, percentSaved, activeDestination.name);

  const handleTap = () => {
    if (!interactive) return;
    setIsTapped(true);
    playPengusSound();
    setTimeout(() => setIsTapped(false), 800);
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }[size];

  return (
    <div className="relative flex flex-col items-center justify-center select-none max-w-full">
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div className="mb-2.5 relative max-w-[260px] w-full transition-all duration-300 animate-pop-in z-20">
          <div className="bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xl border border-slate-700/80 flex items-start gap-2 backdrop-blur-md">
            <span className="text-sm shrink-0 mt-0.5">
              {currentEmotion === 'celebrating' ? '🥳' : currentEmotion === 'excited' ? '⚡' : currentEmotion === 'happy' ? '💖' : '🐧'}
            </span>
            <p className="leading-snug text-[11px] font-extrabold text-slate-100">{quote}</p>
          </div>
          <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-700 rotate-45 mx-auto -mt-1 shadow-sm"></div>
        </div>
      )}

      {/* Mascot Container */}
      <div
        onClick={handleTap}
        className={`relative cursor-pointer transition-transform duration-300 flex items-center justify-center ${
          isTapped ? 'scale-110 -rotate-3' : 'hover:scale-105 animate-bounce-slow'
        }`}
      >
        {/* Glow Aura */}
        <div className="absolute inset-0 bg-indigo-500/25 rounded-full blur-xl animate-pulse-glow -z-10" />

        {/* Costume Badge */}
        <div className="absolute -top-1 -right-1 bg-slate-900/90 border border-indigo-400/40 shadow-md rounded-full px-2.5 py-0.5 text-[9px] font-black text-indigo-300 flex items-center gap-1 z-10 backdrop-blur-sm">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          {outfitDest.outfitName}
        </div>

        {/* Mascot Photo Asset */}
        {!imageError ? (
          <img
            src={outfitDest.photoAsset}
            alt={`Pingu in ${outfitDest.outfitName}`}
            onError={() => setImageError(true)}
            className={`${sizeClasses} object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] rounded-2xl pointer-events-none transition-all duration-300`}
          />
        ) : (
          /* SVG Fallback Penguin */
          <div className={`${sizeClasses} bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-full flex flex-col items-center justify-center p-2 shadow-xl border-2 border-white/80`}>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center gap-1.5 mb-1">
              <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            </div>
            <div className="w-4 h-2 bg-amber-400 rounded-b-full"></div>
            <div className="mt-1 text-[9px] font-bold text-white text-center">{outfitDest.outfitName}</div>
          </div>
        )}

        {/* Tap heart effect */}
        {isTapped && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 animate-ping text-rose-500">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
        )}
      </div>
    </div>
  );
};
