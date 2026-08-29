/**
 * Question Mart & Cafe - RedemptionHistory Component
 * Displays user's reward redemption history
 */

import React from 'react';
import { useTheme } from '../../context';
import { PointsTransaction } from '../../types';

interface RedemptionHistoryProps {
  transactions: PointsTransaction[];
}

export const RedemptionHistory: React.FC<RedemptionHistoryProps> = ({ transactions }) => {
  const { language } = useTheme();

  const content = {
    en: {
      title: 'Redemption History',
      empty: 'No redemptions yet',
      emptySubtitle: 'Redeem rewards to see your history here.',
      pointsUsed: 'Points Used',
      date: 'Date',
    },
    ar: {
      title: 'سجل الاستبدال',
      empty: 'لا توجد عمليات استبدال بعد',
      emptySubtitle: 'قم باستبدال المكافآت لرؤية سجلك هنا.',
      pointsUsed: 'النقاط المستخدمة',
      date: 'التاريخ',
    },
  };

  const t = content[language];

  if (transactions.length === 0) {
    return (
      <div className="redemption-history redemption-history--empty">
        <div className="redemption-history__empty-icon">📜</div>
        <h3 className="redemption-history__empty-title">{t.empty}</h3>
        <p className="redemption-history__empty-subtitle">{t.emptySubtitle}</p>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="redemption-history">
      <h3 className="redemption-history__title">{t.title}</h3>
      <div className="redemption-history__list">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="redemption-history__item">
            <div className="redemption-history__item-content">
              <span className="redemption-history__description">{transaction.description}</span>
              <span className="redemption-history__date">{formatDate(transaction.createdAt)}</span>
            </div>
            <div className="redemption-history__item-amount">
              <span className="redemption-history__points">-{transaction.amount.toLocaleString()}</span>
              <span className="redemption-history__label">{t.pointsUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
