export type EmotionState = 'motivating' | 'happy' | 'excited' | 'celebrating';

export type Currency = 'TL' | 'USD' | 'EUR' | 'GBP';

export type ParticleType = 'sakura' | 'snow' | 'gold_sparkles' | 'bubbles' | 'confetti' | 'warm_glow';

export interface Milestone {
  percent: number;
  title: string;
  description: string;
  icon: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  photoAsset: string;
  photoFallbackUrl: string;
  landmark: string;
  accentColor: string;
  bgGradient: string;
  sampleBudgetTL: number;
  description: string;
  outfitName: string;
  milestones: Milestone[];
  particleType: ParticleType;
}

export interface Deposit {
  id: string;
  amount: number;
  note?: string;
  date: string;
  tag: 'regular' | 'boost' | 'freelance' | 'coffee_skip' | 'gift';
}

export interface Goal {
  id: string;
  destinationId: string;
  targetAmount: number;
  currentSaved: number;
  travelMonth: string;
  travelYear: number;
  monthlyTarget: number;
  startDate: string;
  isCompleted: boolean;
  notes?: string;
}

export interface AICoachMessage {
  id: string;
  type: 'tip' | 'warning' | 'cheer' | 'insight';
  title: string;
  content: string;
  timestamp: string;
  actionLabel?: string;
}

export interface UserBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  totalSavedAllTime: number;
  streakDays: number;
  completedTripsCount: number;
  badges: UserBadge[];
}

export interface Settings {
  currency: Currency;
  currencySymbol: string;
  language: 'en' | 'tr';
  darkMode: boolean;
  notificationsEnabled: boolean;
  aiPersonality: 'encouraging' | 'pragmatic' | 'witty';
  deviceFrameEnabled: boolean;
}

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

export interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  activeGoal: Goal;
  activeDestination: Destination;
  deposits: Deposit[];
  userProfile: UserProfile;
  settings: Settings;
  showAddSavingsModal: boolean;
  setShowAddSavingsModal: (show: boolean) => void;
  showAICoachModal: boolean;
  setShowAICoachModal: (show: boolean) => void;
  addSavings: (amount: number, note?: string) => void;
  createNewGoal: (goal: Partial<Goal>) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
  formatCurrency: (amount: number) => string;
  convertToTL: (amount: number) => number;
  convertFromTL: (amount: number) => number;
  resetProgressForDemo: () => void;
  setSavingsPercentageForDemo: (percent: number) => void;
  equippedOutfitId: string;
  unlockedOutfits: string[];
  equipOutfit: (outfitId: string) => void;
  showWardrobeModal: boolean;
  setShowWardrobeModal: (show: boolean) => void;
  celebrationMilestone: Milestone | null;
  setCelebrationMilestone: (milestone: Milestone | null) => void;
  showDestinationPickerModal: boolean;
  setShowDestinationPickerModal: (show: boolean) => void;
  switchDestination: (destinationId: string) => void;
}
