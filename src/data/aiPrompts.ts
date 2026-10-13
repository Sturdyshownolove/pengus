import { AICoachMessage, Destination } from '../types';

export interface BudgetEstimationInput {
  days: number;
  stayStyle: 'budget' | 'boutique' | 'luxury';
  flightTier: 'economy' | 'premium';
  diningStyle: 'casual' | 'balanced' | 'gourmet';
  activityDensity: 'light' | 'moderate' | 'action_packed';
}

export const calculateAIBudget = (destination: Destination, input: BudgetEstimationInput) => {
  const baseBudget = destination.sampleBudgetTL;
  
  // Day multiplier
  const dayFactor = input.days / 7;
  
  // Style multipliers
  const stayMultiplier = input.stayStyle === 'budget' ? 0.75 : input.stayStyle === 'boutique' ? 1.0 : 1.6;
  const flightMultiplier = input.flightTier === 'economy' ? 1.0 : 1.4;
  const diningMultiplier = input.diningStyle === 'casual' ? 0.8 : input.diningStyle === 'balanced' ? 1.0 : 1.5;
  const activityMultiplier = input.activityDensity === 'light' ? 0.85 : input.activityDensity === 'moderate' ? 1.0 : 1.35;

  const flightsCost = Math.round(baseBudget * 0.38 * flightMultiplier);
  const stayCost = Math.round(baseBudget * 0.35 * dayFactor * stayMultiplier);
  const foodCost = Math.round(baseBudget * 0.15 * dayFactor * diningMultiplier);
  const activitiesCost = Math.round(baseBudget * 0.12 * dayFactor * activityMultiplier);

  const total = flightsCost + stayCost + foodCost + activitiesCost;

  return {
    total,
    breakdown: {
      flights: flightsCost,
      stay: stayCost,
      food: foodCost,
      activities: activitiesCost
    }
  };
};

export const getAIPersonalityQuotes = (personality: 'encouraging' | 'pragmatic' | 'witty', percent: number, destinationName: string) => {
  if (percent >= 100) {
    return {
      encouraging: `Noot noot! 🎉 You reached 100% for ${destinationName}! Pack your luggage, we did this together!`,
      pragmatic: `Goal achieved: 100% of target saved for ${destinationName}. Departure greenlighted. Excellent execution!`,
      witty: `Pack the sunscreen and grab my passport! ${destinationName} here we come! You're an absolute legend!`
    }[personality];
  }

  if (percent >= 75) {
    return {
      encouraging: `Almost there, bestie! Only ${100 - Math.round(percent)}% left to unlock ${destinationName}! You are glowing! ✨`,
      pragmatic: `You have reached the 75th percentile for ${destinationName}. Remaining gap is minimal. Maintain current pace.`,
      witty: `I can literally smell the street food in ${destinationName}! Keep those coins coming!`
    }[personality];
  }

  if (percent >= 50) {
    return {
      encouraging: `Halfway milestone reached! 50% of your ${destinationName} dream is in the vault! I'm so proud of you! 💖`,
      pragmatic: `50% benchmark achieved. Your financial trajectory indicates on-time departure.`,
      witty: `50% saved! My outfit for ${destinationName} is halfway zipped up!`
    }[personality];
  }

  if (percent >= 25) {
    return {
      encouraging: `25% unlocked! Look at that destination blur fading! Every single coin counts toward ${destinationName}! 🌸`,
      pragmatic: `Quarterly target milestone cleared. Continuing compound deposits will maximize timeline safety.`,
      witty: `25%! We've upgraded from "someday" to "definitely happening" status!`
    }[personality];
  }

  return {
    encouraging: `Welcome to your ${destinationName} journey! I'm Pingu, your AI coach. Let's make this dream come true! 🐧`,
    pragmatic: `Savings program initialized for ${destinationName}. Small consistent deposits outperform large sporadic ones.`,
    witty: `Step 1: Save money. Step 2: Fly to ${destinationName}. Step 3: Eat all the food. Let's start!`
  }[personality];
};

export const SAMPLE_AI_NOTIFICATIONS: AICoachMessage[] = [
  {
    id: 'msg-1',
    type: 'cheer',
    title: 'Streak Bonus Active! 🔥',
    content: 'You saved 3 weeks in a row! You are 4 days ahead of schedule for your Japan trip.',
    timestamp: '2 hours ago',
    actionLabel: 'View Progress'
  },
  {
    id: 'msg-2',
    type: 'tip',
    title: 'Smart Travel Tip 💡',
    content: 'If you shift your travel date by 6 days, flights to Tokyo drop by ~1,800 TL!',
    timestamp: '1 day ago',
    actionLabel: 'Optimize Dates'
  },
  {
    id: 'msg-3',
    type: 'insight',
    title: 'Coffee Skip Hero ☕',
    content: 'Saving 150 TL today pushes your current milestone blur down by 5%!',
    timestamp: '3 days ago',
    actionLabel: 'Add +150 TL'
  }
];
