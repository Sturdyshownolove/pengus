import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSound } from '../context/SoundContext';
import { FlyingCoins } from '../components/Animations/FlyingCoins';
import { Plus, Coffee, Briefcase, Sparkles, X, Check } from 'lucide-react';

export const AddSavingsModal: React.FC = () => {
  const { setShowAddSavingsModal, addSavings, formatCurrency, convertToTL, activeDestination, activeGoal, setCelebrationMilestone, settings, setCurrentScreen } = useApp();
  const { playCoinSound, playPopSound, playCelebrationSound } = useSound();

  const [amountInput, setAmountInput] = useState('1000');
  const [note, setNote] = useState('');
  const [selectedPresetTag, setSelectedPresetTag] = useState<'regular' | 'coffee_skip' | 'freelance'>('regular');
  const [animatingCoins, setAnimatingCoins] = useState(false);

  const presets = [500, 1000, 2500, 5000];

  const handleAddPreset = (val: number) => {
    playPopSound();
    setAmountInput(val.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountInput);
    if (!val || val <= 0) return;

    const valTL = convertToTL(val);
    const prevPercent = Math.floor((activeGoal.currentSaved / activeGoal.targetAmount) * 100);
    const newSavedTL = Math.min(activeGoal.targetAmount, activeGoal.currentSaved + valTL);
    const newPercent = Math.floor((newSavedTL / activeGoal.targetAmount) * 100);

    const reachedMilestones = activeDestination.milestones.filter(
      milestone => milestone.percent > prevPercent && milestone.percent <= newPercent
    );

    const highestMilestone = reachedMilestones.length > 0 ? reachedMilestones[reachedMilestones.length - 1] : null;

    if (highestMilestone) {
      setCelebrationMilestone(highestMilestone);
      playCelebrationSound();
    } else {
      playCoinSound();
    }

    setAnimatingCoins(true);

    let defaultNote = note;
    if (!defaultNote) {
      if (selectedPresetTag === 'coffee_skip') defaultNote = 'Skipped takeout coffee ☕';
      else if (selectedPresetTag === 'freelance') defaultNote = 'Freelance earnings deposit 💻';
      else defaultNote = `Saved for ${activeDestination.name} ✨`;
    }

    addSavings(val, defaultNote);

    setTimeout(() => {
      setShowAddSavingsModal(false);
      if (newPercent >= 100 && !highestMilestone) {
        setCurrentScreen('completed');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <FlyingCoins active={animatingCoins} />

      <div className="glass-card w-full max-w-sm p-6 rounded-t-3xl sm:rounded-3xl border border-white/60 dark:border-white/10 shadow-2xl space-y-5 animate-pop-in">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">Add Savings</h3>
              <p className="text-[10px] font-semibold text-slate-400">Target: {activeDestination.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddSavingsModal(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Display / Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Enter Amount ({settings.currency})</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-indigo-500">{settings.currencySymbol}</span>
              <input
                type="number"
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                placeholder="1000"
                autoFocus
                className="w-full pl-10 pr-4 py-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-2xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-4 gap-2">
            {presets.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => handleAddPreset(p)}
                className={`py-2 px-1 rounded-xl text-xs font-black border transition-all ${
                  amountInput === p.toString()
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                }`}
              >
                +{p}
              </button>
            ))}
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Optional Note</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="e.g. Skipped takeout coffee, bonus pay..."
              className="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Shortcut Tags */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedPresetTag('coffee_skip');
                setNote('Skipped coffee ☕');
                setAmountInput('150');
              }}
              className="flex-1 py-2 px-2 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Coffee (+150)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedPresetTag('freelance');
                setNote('Side hustle bonus 💻');
                setAmountInput('2000');
              }}
              className="flex-1 py-2 px-2 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold flex items-center justify-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Side Hustle (+2k)</span>
            </button>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 mt-2"
          >
            <Check className="w-5 h-5" />
            <span>Deposit & Unblur {activeDestination.name}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
