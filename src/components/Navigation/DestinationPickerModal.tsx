import React from 'react';
import { useApp } from '../../context/AppContext';
import { useSound } from '../../context/SoundContext';
import { DESTINATIONS } from '../../data/destinations';
import { X, Check, MapPin, Sparkles } from 'lucide-react';

export const DestinationPickerModal: React.FC = () => {
  const {
    activeDestination,
    switchDestination,
    showDestinationPickerModal,
    setShowDestinationPickerModal,
    formatCurrency
  } = useApp();

  const { playWardrobeSound, playPopSound } = useSound();

  if (!showDestinationPickerModal) return null;

  const handleSelect = (id: string) => {
    playWardrobeSound();
    switchDestination(id);
    setShowDestinationPickerModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl text-white space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Select Dream Destination</h3>
              <p className="text-[10px] font-semibold text-slate-400">Pingu will dress up for your chosen country!</p>
            </div>
          </div>
          <button
            onClick={() => {
              playPopSound();
              setShowDestinationPickerModal(false);
            }}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Selection Banner */}
        <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeDestination.flag}</span>
            <div>
              <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block">ACTIVE DESTINATION</span>
              <h4 className="text-xs font-black text-white">{activeDestination.name} ({activeDestination.country})</h4>
              <p className="text-[10px] font-semibold text-slate-300">Outfit: {activeDestination.outfitName}</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 shrink-0">
            Selected
          </span>
        </div>

        {/* Destination List Grid */}
        <div className="grid grid-cols-2 gap-2.5 overflow-y-auto pr-1 flex-1 no-scrollbar">
          {DESTINATIONS.map(dest => {
            const isSelected = activeDestination.id === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => handleSelect(dest.id)}
                className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-950/80 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md z-10">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl shrink-0">{dest.flag}</span>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-wider block truncate">
                      {dest.country}
                    </span>
                    <h4 className="text-xs font-black text-white leading-tight truncate">{dest.name}</h4>
                  </div>
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{dest.outfitName}</span>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 block truncate">
                    Budget: {formatCurrency(dest.sampleBudgetTL)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DestinationPickerModal;
