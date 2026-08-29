/**
 * Question Mart & Cafe - PointsBalance Component
 * Displays current points balance
 */

import React from 'react';
import { useTheme } from '../../context';

interface PointsBalanceProps {
  points: number;
}

export const PointsBalance: React.FC<PointsBalanceProps> = ({ points }) => {
  const { language } = useTheme();

  const content = {
    en: {
      label: 'Points Balance',
    },
    ar: {
      label: 'رصيد النقاط',
    },
  };

  const t = content[language];

  return (
    <div className="points-balance">
      <span className="points-balance__label">{t.label}</span>
      <span className="points-balance__value">{points.toLocaleString()}</span>
    </div>
  );
};
