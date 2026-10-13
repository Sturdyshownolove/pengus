import React from 'react';
import { useApp } from '../../context/AppContext';
import { Coffee, ArrowUpRight, Gift, Briefcase, Zap } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { deposits, formatCurrency } = useApp();

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'coffee_skip': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'freelance': return <Briefcase className="w-4 h-4 text-indigo-400" />;
      case 'gift': return <Gift className="w-4 h-4 text-rose-400" />;
      case 'boost': return <Zap className="w-4 h-4 text-emerald-400" />;
      default: return <ArrowUpRight className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="p-4 rounded-3xl space-y-3 bg-black/40 backdrop-blur-md border border-white/20 shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider">Recent Deposits</h3>
        <span className="text-[10px] font-bold text-indigo-300">{deposits.length} transactions</span>
      </div>

      <div className="space-y-2 max-h-44 overflow-y-auto pr-1 no-scrollbar">
        {deposits.slice(0, 5).map(dep => (
          <div
            key={dep.id}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                {getTagIcon(dep.tag)}
              </div>
              <div>
                <p className="text-xs font-extrabold text-white line-clamp-1">{dep.note}</p>
                <span className="text-[10px] font-semibold text-slate-300">{dep.date}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-emerald-400">+ {formatCurrency(dep.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
