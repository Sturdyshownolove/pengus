import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS } from '../data/destinations';
import { calculateAIBudget, BudgetEstimationInput } from '../data/aiPrompts';
import { Destination } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Calendar, Calculator, Check } from 'lucide-react';

export const CreateGoalScreen: React.FC = () => {
  const { createNewGoal, setCurrentScreen, formatCurrency } = useApp();

  const [selectedDestination, setSelectedDestination] = useState<Destination>(DESTINATIONS[0]);
  const [travelMonth, setTravelMonth] = useState('April');
  const [travelYear, setTravelYear] = useState(2027);
  const [budgetType, setBudgetType] = useState<'know' | 'unknown'>('know');
  const [directBudget, setDirectBudget] = useState(selectedDestination.sampleBudgetTL.toString());

  // AI Wizard State
  const [aiInputs, setAiInputs] = useState<BudgetEstimationInput>({
    days: 10,
    stayStyle: 'boutique',
    flightTier: 'economy',
    diningStyle: 'balanced',
    activityDensity: 'moderate'
  });

  const [showAIWizardModal, setShowAIWizardModal] = useState(false);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const calculatedAIBudget = calculateAIBudget(selectedDestination, aiInputs);

  const handleNext = () => {
    const finalBudget = budgetType === 'know' ? parseFloat(directBudget) || selectedDestination.sampleBudgetTL : calculatedAIBudget.total;

    createNewGoal({
      destinationId: selectedDestination.id,
      targetAmount: finalBudget,
      travelMonth,
      travelYear
    });

    setCurrentScreen('budget_result');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="p-2 rounded-full glass-card text-white hover:bg-white/20 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">CREATE DREAM TRIP</span>
        <div className="w-8" />
      </div>

      <div className="space-y-5 overflow-y-auto max-h-[75vh] pr-1 no-scrollbar">
        {/* Section 1: Destination Selection */}
        <div>
          <h2 className="text-lg font-black text-white">Where is your dream destination?</h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">Pingu will change into a custom costume for each city!</p>

          <div className="grid grid-cols-2 gap-2.5 mt-3">
            {DESTINATIONS.map(dest => {
              const isSelected = selectedDestination.id === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => {
                    setSelectedDestination(dest);
                    setDirectBudget(dest.sampleBudgetTL.toString());
                  }}
                  className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-950/60 shadow-lg'
                      : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-1.5">
                    <img
                      src={dest.photoAsset}
                      alt={dest.name}
                      className="w-10 h-10 object-contain drop-shadow-md"
                    />
                    <div>
                      <span className="text-[9px] font-extrabold text-indigo-300 uppercase tracking-wider">{dest.country}</span>
                      <h4 className="text-xs font-black text-white leading-tight">{dest.name}</h4>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{dest.landmark}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Travel Month & Year */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white">When do you plan to travel?</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={travelMonth}
              onChange={e => setTravelMonth(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              value={travelYear}
              onChange={e => setTravelYear(parseInt(e.target.value))}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
            </select>
          </div>
        </div>

        {/* Section 3: Budget Decision */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white">What is your total target budget?</h3>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setBudgetType('know')}
              className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                budgetType === 'know'
                  ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400'
              }`}
            >
              I know my budget
            </button>

            <button
              onClick={() => {
                setBudgetType('unknown');
                setShowAIWizardModal(true);
              }}
              className={`p-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                budgetType === 'unknown'
                  ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Estimate</span>
            </button>
          </div>

          {budgetType === 'know' ? (
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-indigo-400">₺</span>
              <input
                type="number"
                value={directBudget}
                onChange={e => setDirectBudget(e.target.value)}
                placeholder="85000"
                className="w-full pl-9 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-black text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          ) : (
            <div className="p-3.5 bg-indigo-950/50 border border-indigo-800/60 rounded-2xl flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-400" />
                <span>AI Estimated Target:</span>
              </div>
              <span className="text-sm font-black text-indigo-300">
                {formatCurrency(calculatedAIBudget.total)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* AI Estimator Modal */}
      {showAIWizardModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-sm w-full p-5 rounded-3xl space-y-4 animate-pop-in border border-slate-700 bg-slate-900 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white">AI Travel Budget Estimator</h3>
              </div>
              <button onClick={() => setShowAIWizardModal(false)} className="text-xs font-bold text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Trip Duration:</span>
                  <span className="text-indigo-400">{aiInputs.days} Days</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="21"
                  value={aiInputs.days}
                  onChange={e => setAiInputs({ ...aiInputs, days: parseInt(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-300">Accommodation Style:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['budget', 'boutique', 'luxury'] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => setAiInputs({ ...aiInputs, stayStyle: style })}
                      className={`p-2 rounded-xl text-[10px] font-extrabold capitalize border ${
                        aiInputs.stayStyle === style ? 'border-indigo-500 bg-indigo-950 text-indigo-300' : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Calculated Breakdown</span>
                <div className="flex justify-between text-[11px]">
                  <span>Flights & Stay:</span>
                  <span className="font-bold text-white">{formatCurrency(calculatedAIBudget.breakdown.flights + calculatedAIBudget.breakdown.stay)}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Food & Excursions:</span>
                  <span className="font-bold text-white">{formatCurrency(calculatedAIBudget.breakdown.food + calculatedAIBudget.breakdown.activities)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAIWizardModal(false)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md"
            >
              Use AI Estimated Budget ({formatCurrency(calculatedAIBudget.total)})
            </button>
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleNext}
        className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-black text-xs rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 mt-3 border border-indigo-400/30"
      >
        <span>Calculate Journey Plan</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
