import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SoundProvider } from './context/SoundContext';
import { IOSFrameContainer } from './components/Navigation/iOSFrameContainer';
import { GlassTabBar } from './components/Navigation/GlassTabBar';
import { MilestoneCelebrationModal } from './components/Animations/MilestoneCelebrationModal';
import { PengusWardrobeModal } from './components/Mascot/PengusWardrobeModal';
import { DestinationPickerModal } from './components/Navigation/DestinationPickerModal';

import { OnboardingScreen } from './screens/OnboardingScreen';
import { AuthScreen } from './screens/AuthScreen';
import { CreateGoalScreen } from './screens/CreateGoalScreen';
import { BudgetResultScreen } from './screens/BudgetResultScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AICoachScreen } from './screens/AICoachScreen';
import { MilestonesScreen } from './screens/MilestonesScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { GoalCompletedScreen } from './screens/GoalCompletedScreen';
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen';

const MainScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'onboarding':
      return <OnboardingScreen />;
    case 'auth':
      return <AuthScreen />;
    case 'create_goal':
      return <CreateGoalScreen />;
    case 'budget_result':
      return <BudgetResultScreen />;
    case 'dashboard':
      return <DashboardScreen />;
    case 'ai_coach':
      return <AICoachScreen />;
    case 'milestones':
      return <MilestonesScreen />;
    case 'notifications':
      return <NotificationsScreen />;
    case 'completed':
      return <GoalCompletedScreen />;
    case 'profile':
      return <ProfileSettingsScreen />;
    default:
      return <DashboardScreen />;
  }
};

export const AppContent: React.FC = () => {
  const { showWardrobeModal, showDestinationPickerModal, celebrationMilestone } = useApp();

  return (
    <IOSFrameContainer>
      <MainScreenRouter />
      <GlassTabBar />
      {showWardrobeModal && <PengusWardrobeModal />}
      {showDestinationPickerModal && <DestinationPickerModal />}
      {celebrationMilestone && <MilestoneCelebrationModal />}
    </IOSFrameContainer>
  );
};

export default function App() {
  return (
    <AppProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </AppProvider>
  );
}
