/**
 * Question Mart & Cafe - MembershipBadge Component
 * Displays membership level badge
 */

import React from 'react';
import { useTheme } from '../../context';

interface MembershipBadgeProps {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const MembershipBadge: React.FC<MembershipBadgeProps> = ({ level }) => {
  const { language } = useTheme();

  const levelNames = {
    en: {
      bronze: 'Bronze',
      silver: 'Silver',
      gold: 'Gold',
      platinum: 'Platinum',
    },
    ar: {
      bronze: 'برونزي',
      silver: 'فضي',
      gold: 'ذهبي',
      platinum: 'بلاتيني',
    },
  };

  const levelIcons = {
    bronze: '◇',
    silver: '◆',
    gold: '★',
    platinum: '♛',
  };

  const name = levelNames[language][level];
  const icon = levelIcons[level];

  return (
    <div className={`membership-badge membership-badge--${level}`}>
      <span className="membership-badge__icon">{icon}</span>
      <span className="membership-badge__name">{name}</span>
    </div>
  );
};
