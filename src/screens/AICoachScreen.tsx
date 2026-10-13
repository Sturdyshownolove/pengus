import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSound } from '../context/SoundContext';
import { PengusMascot } from '../components/Mascot/PengusMascot';
import { Bot, Sparkles, Send, Lightbulb, TrendingUp, ArrowLeft, Zap, Compass, CheckCircle2 } from 'lucide-react';

export const AICoachScreen: React.FC = () => {
  const { activeDestination, activeGoal, settings, updateSettings, formatCurrency, setCurrentScreen } = useApp();
  const { playPopSound, playCoinSound } = useSound();
  
  const [userQuery, setUserQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'pingu'; text: string; time: string }>>([
    {
      sender: 'pingu',
      text: `Noot noot! I'm ${activeDestination.outfitName}, your AI coach! I'm watching flight deals, budget milestones, and savings momentum for your ${activeDestination.name} dream trip. Ask me anything!`,
      time: 'Just now'
    }
  ]);

  const promptSuggestions = [
    `How can I save ${formatCurrency(500)} extra this week?`,
    `When are flights cheapest to ${activeDestination.country}?`,
    `Analyze my savings streak & speed`
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || userQuery;
    if (!text.trim()) return;

    playPopSound();
    const newMsg = { sender: 'user' as const, text, time: 'Just now' };
    setChatMessages(prev => [...prev, newMsg]);
    setUserQuery('');
    setIsTyping(true);

    // Simulated AI response with Pingu personality
    setTimeout(() => {
      playCoinSound();
      setIsTyping(false);
      let aiResponse = `Great question! Setting aside just ${formatCurrency(150)} a day for ${activeDestination.name} will bring your flight booking date 18 days closer! ✈️`;
      
      if (text.toLowerCase().includes('flight')) {
        aiResponse = `Flight prices for ${activeDestination.country} hit their annual low in shoulder season! Shifting your travel by 5 days saves up to ~${formatCurrency(1800)}! 🎟️`;
      } else if (text.toLowerCase().includes('streak') || text.toLowerCase().includes('speed') || text.toLowerCase().includes('analyze')) {
        aiResponse = `You are currently on a 14-day savings streak! At your current velocity, you'll unlock the ${activeDestination.milestones[2].title} milestone 2 weeks early! 🔥`;
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'pingu' as const, text: aiResponse, time: 'Just now' }
      ]);
    }, 700);
  };

  return (
    <div className="min-h-full h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-950 text-white overflow-hidden pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1 pb-2 shrink-0 z-20">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="p-2 rounded-full glass-card text-white hover:bg-white/20 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 glass-pill px-3 py-1 bg-indigo-950/80 border border-indigo-500/40 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <h2 className="text-xs font-black text-white">Pingu AI Coach Hub</h2>
        </div>

        <div className="w-8" />
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[76vh] pr-1 no-scrollbar pb-2">
        
        {/* HERO MASCOT AI COACH STAGE */}
        <div className="relative glass-card p-4 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl flex flex-col items-center text-center overflow-hidden">
          {/* Subtle Stage Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
          
          <PengusMascot
            size="md"
            showSpeechBubble={false}
            customQuote={`I'm ready to help you reach ${activeDestination.name}!`}
          />

          <div className="mt-2 space-y-0.5 z-10">
            <h3 className="text-sm font-black text-white flex items-center justify-center gap-1.5">
              <span>{activeDestination.outfitName}</span>
              <span className="text-xs">{activeDestination.flag}</span>
            </h3>
            <p className="text-[10px] font-bold text-indigo-300">
              Personal AI Coach for {activeDestination.name}
            </p>
          </div>
        </div>

        {/* VISUAL AI PERSONALITY SWITCHER */}
        <div className="glass-card p-3 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <span>AI Personality Mode</span>
            <span className="text-indigo-400 capitalize bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-500/30">
              {settings.aiPersonality}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'encouraging', label: '💖 Warm', color: 'from-pink-500/20 to-rose-600/20' },
              { id: 'pragmatic', label: '📊 Smart', color: 'from-indigo-500/20 to-blue-600/20' },
              { id: 'witty', label: '⚡ Witty', color: 'from-amber-500/20 to-orange-600/20' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => {
                  playPopSound();
                  updateSettings({ aiPersonality: p.id as any });
                }}
                className={`py-2 px-2 rounded-xl text-[10px] font-black transition-all border ${
                  settings.aiPersonality === p.id
                    ? 'border-indigo-400 bg-indigo-600 text-white shadow-lg scale-105'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROACTIVE ADVICE CARDS WITH HIGH VISUAL IMPACT */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Proactive AI Insights</span>
          </h3>
          
          <div className="glass-card p-3.5 rounded-2xl border-l-4 border-l-emerald-400 border border-slate-800 bg-slate-900/90 shadow-lg space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>Savings Velocity: 14-Day Streak!</span>
              </div>
              <span className="text-[9px] font-extrabold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">+12 Days Ahead</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-300 leading-snug">
              Your consistent deposits put you 12 days ahead of your departure schedule for {activeDestination.name}.
            </p>
          </div>

          <div className="glass-card p-3.5 rounded-2xl border-l-4 border-l-amber-400 border border-slate-800 bg-slate-900/90 shadow-lg space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span>Smart Unblur Tip</span>
              </div>
              <span className="text-[9px] font-extrabold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-500/30">Next Milestone</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-300 leading-snug">
              Deposit an extra {formatCurrency(350)} this week to clear the next city blur level!
            </p>
          </div>
        </div>

        {/* CHAT LOG WITH PINUG MASCOT AVATAR */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chat with {activeDestination.outfitName}</span>
          </h3>

          <div className="space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Pingu Mascot Avatar in Chat */}
                {msg.sender === 'pingu' && (
                  <div className="w-9 h-9 rounded-full bg-slate-900 border border-indigo-500/40 p-0.5 shrink-0 shadow-md">
                    <img
                      src={activeDestination.photoAsset}
                      alt={activeDestination.outfitName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none font-bold shadow-lg border border-indigo-400/30'
                      : 'glass-card border border-indigo-500/30 bg-slate-900/90 text-slate-100 rounded-tl-none font-semibold shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold pl-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                <span>Pingu is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 glass-pill px-3 py-1.5 text-[10px] font-extrabold text-indigo-300 hover:bg-indigo-900/50 border border-indigo-500/40 bg-slate-900/90 shadow-sm"
              >
                💡 {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="pt-2 shrink-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={userQuery}
            onChange={e => setUserQuery(e.target.value)}
            placeholder={`Ask Pingu about ${activeDestination.name}...`}
            className="w-full pl-4 pr-12 py-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-xl"
          />
          <button
            type="submit"
            className="absolute right-2 p-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl shadow-md transition-all active:scale-95 border border-indigo-400/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
