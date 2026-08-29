/**
 * Question Mart & Cafe - LoyaltyProgress Component
 * Displays progress toward next membership level
 */

import React from 'react';
import { useTheme } from '../../context';
import { LOYALTY_POINTS, LOYALTY_TIERS } from '../../constants';

interface LoyaltyProgressProps {
  currentPoints: number;
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const LoyaltyProgress: React.FC<LoyaltyProgressProps> = ({
  currentPoints,
  membershipLevel,
}) => {
  const { language } = useTheme();

  const calculateProgress = (): { progress: number; nextLevel: string | null; pointsNeeded: number } => {
    if (membershipLevel === LOYALTY_TIERS.PLATINUM) {
      return { progress: 100, nextLevel: null, pointsNeeded: 0 };
    }

    let nextLevel: string | null = null;
    let pointsNeeded = 0;
    let progress = 0;

    switch (membershipLevel) {
      case LOYALTY_TIERS.BRONZE:
        nextLevel = 'Silver';
        pointsNeeded = LOYALTY_POINTS.SILVER_MIN - currentPoints;
        progress = (currentPoints / LOYALTY_POINTS.SILVER_MIN) * 100;
        break;
      case LOYALTY_TIERS.SILVER:
        nextLevel = 'Gold';
        pointsNeeded = LOYALTY_POINTS.GOLD_MIN - currentPoints;
        progress = ((currentPoints - LOYALTY_POINTS.SILVER_MIN) / (LOYALTY_POINTS.GOLD_MIN - LOYALTY_POINTS.SILVER_MIN)) * 100;
        break;
      case LOYALTY_TIERS.GOLD:
        nextLevel = 'Platinum';
        pointsNeeded = LOYALTY_POINTS.PLATINUM_MIN - currentPoints;
        progress = ((currentPoints - LOYALTY_POINTS.GOLD_MIN) / (LOYALTY_POINTS.PLATINUM_MIN - LOYALTY_POINTS.GOLD_MIN)) * 100;
        break;
    }

    return { progress: Math.min(100, Math.max(0, progress)), nextLevel, pointsNeeded };
  };

  const { progress, nextLevel, pointsNeeded } = calculateProgress();

  const isPlatinum = membershipLevel === LOYALTY_TIERS.PLATINUM;

  const content = {
    en: {
      nextLevel: 'Next Level',
      pointsNeeded: 'points needed',
      highestTier: 'Highest Tier Achieved',
      progressTo: 'Progress to',
    },
    ar: {
      nextLevel: 'المستوى التالي',
      pointsNeeded: 'نقطة مطلوبة',
      highestTier: 'أعلى مستوى محقق',
      progressTo: 'التقدم نحو',
    },
  };

  const t = content[language];

  return (
    <div className="loyalty-progress">
      {!isPlatinum ? (
        <>
          <div className="loyalty-progress__header">
            <span className="loyalty-progress__label">
              {t.progressTo} {nextLevel}
            </span>
            <span className="loyalty-progress__points">
              {pointsNeeded > 0 ? `${pointsNeeded} ${t.pointsNeeded}` : t.highestTier}
            </span>
          </div>
          <div className="loyalty-progress__bar">
            <div
              className="loyalty-progress__fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${progress}% ${t.progressTo} ${nextLevel}`}
            />
          </div>
        </>
      ) : (
        <div className="loyalty-progress__platinum">
          <span className="loyalty-progress__platinum-badge">♛</span>
          <span className="loyalty-progress__platinum-text">{t.highestTier}</span>
        </div>
      )}
    </div>
  );
};
