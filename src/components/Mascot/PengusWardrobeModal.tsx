import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useSound } from '../../context/SoundContext';
import { DESTINATIONS, getDestinationById } from '../../data/destinations';
import { X, Sparkles, Check, Lock } from 'lucide-react';

interface CostumeImageProps {
  photoAsset: string;
  alt: string;
  flag: string;
  className?: string;
}

const CostumeImage: React.FC<CostumeImageProps> = ({ photoAsset, alt, flag, className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center text-2xl select-none ${className}`}>
        {flag}
      </div>
    );
  }

  return (
    <img
      src={photoAsset}
      alt={alt}
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
};

export const PengusWardrobeModal: React.FC = () => {
  const {
    equippedOutfitId,
    unlockedOutfits,
    equipOutfit,
    switchDestination,
    setShowWardrobeModal,
    activeGoal,
    activeDestination
  } = useApp();

  const { playWardrobeSound, playPengusSound } = useSound();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const equippedDest = getDestinationById(equippedOutfitId);

  const handleCardClick = (destId: string) => {
    const dest = getDestinationById(destId);
    const isUnlocked = unlockedOutfits.includes(destId);
    if (isUnlocked) {
      equipOutfit(destId);
      playWardrobeSound();
      setToastMessage(null);
    } else {
      switchDestination(destId);
      playWardrobeSound();
      setToastMessage(`Planned trip to ${dest.name}! Unlocked ${dest.outfitName} ✈️`);
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl text-white">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-4 shrink-0">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              Pengus Wardrobe 👕
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Collect regional costumes as your travel savings grow!
            </p>
          </div>
          <button
            onClick={() => setShowWardrobeModal(false)}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close Wardrobe Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Notification Alert */}
        {toastMessage && (
          <div className="mb-3 px-3.5 py-2.5 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-200 text-xs font-bold flex items-center justify-between animate-pop-in shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm">🐧</span>
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-amber-400 hover:text-amber-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Featured Showcase Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/70 via-purple-900/50 to-slate-900 border border-indigo-500/40 p-4 mb-4 shrink-0 shadow-xl">
          <div className="absolute top-3 right-3 bg-indigo-500/20 border border-indigo-400/40 px-2.5 py-1 rounded-full text-[10px] font-black text-indigo-300 flex items-center gap-1 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>EQUIPPED</span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="relative w-20 h-20 rounded-2xl bg-slate-950/70 border border-indigo-400/30 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              <CostumeImage
                photoAsset={equippedDest.photoAsset}
                alt={equippedDest.outfitName}
                flag={equippedDest.flag}
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="flex-1 min-w-0 pr-16">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-base">{equippedDest.flag}</span>
                <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider">{equippedDest.country}</span>
              </div>
              <h3 className="text-base font-black text-white truncate">{equippedDest.outfitName}</h3>
              <p className="text-[11px] text-slate-300 font-medium line-clamp-2 mt-1 leading-snug">
                {equippedDest.description}
              </p>
            </div>
          </div>
        </div>

        {/* Costumes Grid */}
        <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 no-scrollbar flex-1 min-h-0">
          {DESTINATIONS.map((dest) => {
            const isEquipped = dest.id === equippedOutfitId;
            const isUnlocked = unlockedOutfits.includes(dest.id);

            return (
              <div
                key={dest.id}
                onClick={() => handleCardClick(dest.id)}
                className={`relative rounded-2xl p-3 flex flex-col items-center text-center transition-all cursor-pointer border ${
                  isEquipped
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/50'
                    : isUnlocked
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-75 hover:opacity-90'
                }`}
              >
                {/* Image Avatar */}
                <div className="w-16 h-16 rounded-xl bg-slate-950/80 mb-2 overflow-hidden flex items-center justify-center border border-slate-700/60 shrink-0 shadow-inner">
                  <CostumeImage
                    photoAsset={dest.photoAsset}
                    alt={dest.outfitName}
                    flag={dest.flag}
                    className="w-full h-full rounded-xl"
                  />
                </div>

                {/* Outfit Name & Flag */}
                <span className="text-xs font-black text-white truncate max-w-full px-1">
                  {dest.outfitName} {dest.flag}
                </span>

                {/* Status Badge */}
                <div className="mt-2">
                  {isEquipped ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center gap-1 shadow-sm">
                      <Check className="w-3 h-3" /> EQUIPPED
                    </span>
                  ) : isUnlocked ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center gap-1 shadow-sm">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1 hover:text-white hover:border-slate-500 transition-colors">
                      <Lock className="w-3 h-3 text-slate-400" /> Plan Trip
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
