/**
 * Question Mart & Cafe - RewardGrid Component
 * Grid layout for rewards
 */

import React from 'react';
import { Reward } from '../../types';
import { RewardCard } from './RewardCard';

interface RewardGridProps {
  rewards: Reward[];
  userPoints: number;
  onRedeem: (rewardId: string) => void;
  isRedeeming?: boolean;
}

export const RewardGrid: React.FC<RewardGridProps> = ({
  rewards,
  userPoints,
  onRedeem,
  isRedeeming = false,
}) => {
  if (rewards.length === 0) {
    return null;
  }

  return (
    <div className="reward-grid">
      {rewards.map((reward) => (
        <RewardCard
          key={reward._id}
          reward={reward}
          userPoints={userPoints}
          onRedeem={onRedeem}
          isRedeeming={isRedeeming}
        />
      ))}
    </div>
  );
};
