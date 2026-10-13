import React from 'react';
import { useApp } from '../context/AppContext';
import { useSound } from '../context/SoundContext';
import { Currency } from '../types';
import { User, Moon, Sun, DollarSign, Volume2, VolumeX, RefreshCw, Flame, ArrowLeft } from 'lucide-react';

export const ProfileSettingsScreen: React.FC = () => {
  const { userProfile, settings, updateSettings, formatCurrency, resetProgressForDemo, setCurrentScreen } = useApp();
  const { soundEnabled, setSoundEnabled } = useSound();

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'TL', label: 'Turkish Lira', symbol: '₺' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' }
  ];

  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="p-2 rounded-full glass-card text-white hover:bg-white/20 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider">PROFILE & SETTINGS</span>
        <div className="w-8" />
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[75vh] pr-1 no-scrollbar">
        {/* Profile Card */}
        <div className="glass-card p-4 rounded-3xl border border-slate-800 bg-slate-900/90 flex items-center gap-3.5">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-13 h-13 rounded-full object-cover border-2 border-indigo-500 shadow-md"
          />
          <div>
            <h3 className="text-base font-black text-white">{userProfile.name}</h3>
            <p className="text-[11px] font-medium text-slate-400">{userProfile.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="glass-pill px-2.5 py-0.5 text-[10px] font-extrabold text-orange-400 flex items-center gap-1 bg-orange-950/40 border border-orange-500/30">
                <Flame className="w-3 h-3 fill-orange-400" />
                {userProfile.streakDays} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="glass-card p-3.5 rounded-2xl border border-slate-800 bg-slate-900/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Saved</span>
            <p className="text-sm font-black text-emerald-400 mt-0.5">
              {formatCurrency(userProfile.totalSavedAllTime)}
            </p>
          </div>

          <div className="glass-card p-3.5 rounded-2xl border border-slate-800 bg-slate-900/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Trips Completed</span>
            <p className="text-sm font-black text-indigo-400 mt-0.5">
              {userProfile.completedTripsCount} Destination
            </p>
          </div>
        </div>

        {/* Badges Collection */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Achievements</h3>
            <span className="text-[10px] font-bold text-indigo-400">{userProfile.badges.length} Unlocked</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {userProfile.badges.map(b => (
              <div key={b.id} className="glass-card p-3 rounded-2xl flex items-center gap-2.5 border border-slate-800 bg-slate-900/90">
                <span className="text-xl shrink-0">{b.icon}</span>
                <div>
                  <h4 className="text-[11px] font-black text-slate-200">{b.title}</h4>
                  <p className="text-[9px] font-medium text-slate-400 line-clamp-1">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Controls */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Preferences</h3>

          {/* Sound FX */}
          <div className="glass-card p-3.5 rounded-2xl flex items-center justify-between border border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span className="text-xs font-bold text-slate-200">Audio Sound Effects</span>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-11 h-6 rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Currency Selector */}
          <div className="glass-card p-3.5 rounded-2xl space-y-2 border border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Display Currency</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {currencies.map(c => (
                <button
                  key={c.code}
                  onClick={() => updateSettings({ currency: c.code })}
                  className={`p-2 rounded-xl text-xs font-extrabold flex items-center justify-between border transition-all ${
                    settings.currency === c.code
                      ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="text-sm font-black">{c.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              if (confirm('Reset demo state to initial Japan savings goal?')) {
                resetProgressForDemo();
                setCurrentScreen('dashboard');
              }
            }}
            className="w-full py-3 px-4 glass-card border border-rose-900/60 bg-rose-950/30 text-rose-400 text-xs font-extrabold rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-950/50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
