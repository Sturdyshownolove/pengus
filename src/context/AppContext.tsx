import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Goal, Deposit, UserProfile, Settings, Destination, Currency, Milestone, AppContextType } from '../types';
import { DESTINATIONS, getDestinationById } from '../data/destinations';

export type ScreenType =
  | 'onboarding'
  | 'auth'
  | 'create_goal'
  | 'budget_result'
  | 'dashboard'
  | 'ai_coach'
  | 'milestones'
  | 'notifications'
  | 'completed'
  | 'profile';

const DEFAULT_GOAL: Goal = {
  id: 'goal-japan-2026',
  destinationId: 'japan',
  targetAmount: 85000,
  currentSaved: 34000, // 40% initial progress for immediate blur demo
  travelMonth: 'April',
  travelYear: 2027,
  monthlyTarget: 6071,
  startDate: '2026-01-15',
  isCompleted: false
};

const DEFAULT_DEPOSITS: Deposit[] = [
  { id: 'dep-1', amount: 15000, note: 'Initial savings deposit 🚀', date: '2026-01-15', tag: 'regular' },
  { id: 'dep-2', amount: 10000, note: 'Monthly travel allocation', date: '2026-02-01', tag: 'regular' },
  { id: 'dep-3', amount: 4000, note: 'Skipped coffee & dining out ☕', date: '2026-02-14', tag: 'coffee_skip' },
  { id: 'dep-4', amount: 5000, note: 'Freelance design project bonus 💻', date: '2026-02-28', tag: 'freelance' }
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@pingu.app',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  totalSavedAllTime: 34000,
  streakDays: 14,
  completedTripsCount: 1,
  badges: [
    { id: 'b1', title: 'Sakura Pioneer', icon: '🌸', description: 'Started saving for Japan dream trip', unlockedAt: 'Jan 2026' },
    { id: 'b2', title: '14 Day Saver', icon: '🔥', description: 'Saved 14 days in a row without breaking streak', unlockedAt: 'Feb 2026' },
    { id: 'b3', title: 'Smart Saver', icon: '🤖', description: 'Applied 3 AI Coach recommendations', unlockedAt: 'Feb 2026' },
    { id: 'b4', title: 'Passport Ready', icon: '🛂', description: 'Reached 25% of total travel budget', unlockedAt: 'Jan 2026' }
  ]
};

const DEFAULT_SETTINGS: Settings = {
  currency: 'TL',
  currencySymbol: '₺',
  language: 'en',
  darkMode: false,
  notificationsEnabled: true,
  aiPersonality: 'encouraging',
  deviceFrameEnabled: true
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('onboarding');
  const [activeGoal, setActiveGoal] = useState<Goal>(() => {
    const saved = localStorage.getItem('pengus_goal');
    return saved ? JSON.parse(saved) : DEFAULT_GOAL;
  });
  const [deposits, setDeposits] = useState<Deposit[]>(() => {
    const saved = localStorage.getItem('pengus_deposits');
    return saved ? JSON.parse(saved) : DEFAULT_DEPOSITS;
  });
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('pengus_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [showAddSavingsModal, setShowAddSavingsModal] = useState(false);
  const [showAICoachModal, setShowAICoachModal] = useState(false);
  const [equippedOutfitId, setEquippedOutfitId] = useState<string>(() => {
    return localStorage.getItem('pengus_equipped_outfit') || activeGoal.destinationId;
  });
  const [showWardrobeModal, setShowWardrobeModal] = useState(false);
  const [showDestinationPickerModal, setShowDestinationPickerModal] = useState(false);
  const [celebrationMilestone, setCelebrationMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    localStorage.setItem('pengus_goal', JSON.stringify(activeGoal));
  }, [activeGoal]);

  useEffect(() => {
    localStorage.setItem('pengus_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('pengus_settings', JSON.stringify(settings));
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const activeDestination = getDestinationById(activeGoal.destinationId);

  const [unlockedOutfits, setUnlockedOutfits] = useState<string[]>(() => {
    const saved = localStorage.getItem('pengus_unlocked_outfits');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [activeGoal.destinationId || 'japan'];
  });

  useEffect(() => {
    if (!unlockedOutfits.includes(activeGoal.destinationId)) {
      setUnlockedOutfits(prev => {
        const updated = Array.from(new Set([...prev, activeGoal.destinationId]));
        localStorage.setItem('pengus_unlocked_outfits', JSON.stringify(updated));
        return updated;
      });
    }
  }, [activeGoal.destinationId]);

  const equipOutfit = (outfitId: string) => {
    setEquippedOutfitId(outfitId);
    localStorage.setItem('pengus_equipped_outfit', outfitId);
  };

  const switchDestination = (destinationId: string) => {
    const dest = getDestinationById(destinationId);
    setActiveGoal(prev => ({
      ...prev,
      destinationId: dest.id,
      targetAmount: dest.sampleBudgetTL,
      currentSaved: Math.round(dest.sampleBudgetTL * 0.4),
      isCompleted: false
    }));
    setEquippedOutfitId(dest.id);
    localStorage.setItem('pengus_equipped_outfit', dest.id);
    setUnlockedOutfits(prev => {
      const updated = Array.from(new Set([...prev, dest.id]));
      localStorage.setItem('pengus_unlocked_outfits', JSON.stringify(updated));
      return updated;
    });
  };

  const convertToTL = (amount: number): number => {
    const { currency } = settings;
    if (currency === 'USD') return Math.round(amount * 34);
    if (currency === 'EUR') return Math.round(amount * 37);
    if (currency === 'GBP') return Math.round(amount * 43);
    return Math.round(amount);
  };

  const convertFromTL = (amount: number): number => {
    const { currency } = settings;
    if (currency === 'USD') return Math.round(amount / 34);
    if (currency === 'EUR') return Math.round(amount / 37);
    if (currency === 'GBP') return Math.round(amount / 43);
    return Math.round(amount);
  };

  const addSavings = (amountInActiveCurrency: number, note?: string) => {
    const amountTL = convertToTL(amountInActiveCurrency);

    const newDeposit: Deposit = {
      id: `dep-${Date.now()}`,
      amount: amountInActiveCurrency,
      note: note || 'Quick Savings Deposit ✨',
      date: new Date().toISOString().split('T')[0],
      tag: 'regular'
    };

    setDeposits(prev => [newDeposit, ...prev]);

    setActiveGoal(prev => {
      const newSaved = Math.min(prev.targetAmount, prev.currentSaved + amountTL);
      const isCompleted = newSaved >= prev.targetAmount;
      return {
        ...prev,
        currentSaved: newSaved,
        isCompleted
      };
    });

    setUserProfile(prev => ({
      ...prev,
      totalSavedAllTime: prev.totalSavedAllTime + amountTL,
      streakDays: prev.streakDays + 1
    }));
  };

  const createNewGoal = (goalData: Partial<Goal>) => {
    const destinationId = goalData.destinationId || 'japan';
    const dest = getDestinationById(destinationId);
    const targetAmount = goalData.targetAmount || dest.sampleBudgetTL;

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      destinationId,
      targetAmount,
      currentSaved: goalData.currentSaved || 0,
      travelMonth: goalData.travelMonth || 'April',
      travelYear: goalData.travelYear || 2027,
      monthlyTarget: Math.round(targetAmount / 12),
      startDate: new Date().toISOString().split('T')[0],
      isCompleted: false
    };

    setActiveGoal(newGoal);
    setDeposits([]);
    setCurrentScreen('dashboard');
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.currency) {
        const symbolMap: Record<Currency, string> = { TL: '₺', USD: '$', EUR: '€', GBP: '£' };
        updated.currencySymbol = symbolMap[newSettings.currency];
      }
      return updated;
    });
  };

  const formatCurrency = (amount: number) => {
    const { currency, currencySymbol } = settings;
    let convertedAmount = amount;
    if (currency === 'USD') convertedAmount = Math.round(amount / 34);
    if (currency === 'EUR') convertedAmount = Math.round(amount / 37);
    if (currency === 'GBP') convertedAmount = Math.round(amount / 43);

    return `${currencySymbol}${convertedAmount.toLocaleString('en-US')}`;
  };

  const resetProgressForDemo = () => {
    setActiveGoal(DEFAULT_GOAL);
    setDeposits(DEFAULT_DEPOSITS);
  };

  const setSavingsPercentageForDemo = (percent: number) => {
    const target = activeGoal.targetAmount;
    const newSaved = Math.round((percent / 100) * target);
    setActiveGoal(prev => ({
      ...prev,
      currentSaved: newSaved,
      isCompleted: percent >= 100
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeGoal,
        activeDestination,
        deposits,
        userProfile,
        settings,
        showAddSavingsModal,
        setShowAddSavingsModal,
        showAICoachModal,
        setShowAICoachModal,
        addSavings,
        createNewGoal,
        updateSettings,
        formatCurrency,
        convertToTL,
        convertFromTL,
        resetProgressForDemo,
        setSavingsPercentageForDemo,
        equippedOutfitId,
        unlockedOutfits,
        equipOutfit,
        showWardrobeModal,
        setShowWardrobeModal,
        celebrationMilestone,
        setCelebrationMilestone,
        showDestinationPickerModal,
        setShowDestinationPickerModal,
        switchDestination
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
