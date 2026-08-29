/**
 * Question Mart & Cafe - RewardCard Component
 * Displays a single reward with redemption option
 */

import React from 'react';
import { useTheme } from '../../context';
import { Reward } from '../../types';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (rewardId: string) => void;
  isRedeeming?: boolean;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  reward,
  userPoints,
  onRedeem,
  isRedeeming = false,
}) => {
  const { language } = useTheme();

  const canRedeem = userPoints >= reward.pointsRequired && !isRedeeming;

  const content = {
    en: {
      pointsRequired: 'Points Required',
      redeem: 'Redeem',
      insufficient: 'Insufficient Points',
      needMore: 'You need',
      morePoints: 'more points',
    },
    ar: {
      pointsRequired: 'النقاط المطلوبة',
      redeem: 'استبدال',
      insufficient: 'نقاط غير كافية',
      needMore: 'تحتاج',
      morePoints: 'نقاط إضافية',
    },
  };

  const t = content[language];
  const rewardName = reward.name[language];
  const rewardDescription = reward.description?.[language];

  const pointsNeeded = reward.pointsRequired - userPoints;

  return (
    <div className="reward-card">
      {reward.image && (
        <div className="reward-card__image">
          <img src={reward.image} alt={rewardName} />
        </div>
      )}
      <div className="reward-card__content">
        <h4 className="reward-card__name">{rewardName}</h4>
        {rewardDescription && (
          <p className="reward-card__description">{rewardDescription}</p>
        )}
        <div className="reward-card__footer">
          <span className="reward-card__points">
            {reward.pointsRequired.toLocaleString()} {t.pointsRequired}
          </span>
          {canRedeem ? (
            <button
              className="reward-card__redeem"
              onClick={() => onRedeem(reward._id)}
              disabled={isRedeeming}
            >
              {isRedeeming ? '...' : t.redeem}
            </button>
          ) : (
            <span className="reward-card__insufficient">
              {pointsNeeded > 0 && (
                <>
                  {t.needMore} {pointsNeeded.toLocaleString()} {t.morePoints}
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
