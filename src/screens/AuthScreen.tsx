import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Zap, ArrowLeft } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('create_goal');
  };

  const handleQuickDemo = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-full h-full flex flex-col justify-between p-5 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between pt-1 shrink-0">
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="p-2 rounded-full glass-card text-white hover:bg-white/20 border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-black text-indigo-400 tracking-wider">PINGU</span>
        <div className="w-8" />
      </div>

      {/* Auth Card */}
      <div className="my-auto py-4 max-w-sm mx-auto w-full space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-white">Welcome Back</h2>
          <p className="text-xs text-slate-300 font-medium">
            Sign in to continue your travel savings goal with Pingu
          </p>
        </div>

        {/* Demo Fast Track Button */}
        <button
          onClick={handleQuickDemo}
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 border border-emerald-400/30"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Instant Investor & Demo Access</span>
        </button>

        <div className="relative my-3 flex items-center justify-center">
          <div className="border-t border-slate-800 w-full"></div>
          <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400 border border-slate-800 rounded-full">or email</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex.rivera@pingu.app"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-black text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95 mt-1 border border-indigo-400/30"
          >
            Continue with Email
          </button>
        </form>

        {/* Google Sign In */}
        <button
          onClick={handleQuickDemo}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.05.01 12s.45 3.8 1.26 5.42l4.01-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <p className="text-center text-[10px] font-semibold text-slate-400 pb-1">
        By continuing you agree to Pingu Terms of Service
      </p>
    </div>
  );
};
