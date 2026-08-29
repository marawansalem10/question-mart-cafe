/**
 * Question Mart & Cafe - RewardRedemptionModal Component
 * Modal for confirming reward redemption
 */

import React from 'react';
import { useTheme } from '../../context';
import { Reward } from '../../types';

interface RewardRedemptionModalProps {
  isOpen: boolean;
  reward: Reward | null;
  userPoints: number;
  onConfirm: () => void;
  onCancel: () => void;
  isRedeeming?: boolean;
}

export const RewardRedemptionModal: React.FC<RewardRedemptionModalProps> = ({
  isOpen,
  reward,
  userPoints,
  onConfirm,
  onCancel,
  isRedeeming = false,
}) => {
  const { language } = useTheme();

  if (!isOpen || !reward) return null;

  const canRedeem = userPoints >= reward.pointsRequired;
  const pointsNeeded = reward.pointsRequired - userPoints;

  const content = {
    en: {
      title: 'Redeem Reward',
      confirm: 'Confirm Redemption',
      cancel: 'Cancel',
      insufficient: 'Insufficient Points',
      needMore: 'You need',
      morePoints: 'more points to redeem this reward.',
      currentPoints: 'Your Points',
      requiredPoints: 'Required Points',
      afterRedemption: 'Points After Redemption',
    },
    ar: {
      title: 'استبدال المكافأة',
      confirm: 'تأكيد الاستبدال',
      cancel: 'إلغاء',
      insufficient: 'نقاط غير كافية',
      needMore: 'تحتاج',
      morePoints: 'نقاط إضافية لاستبدال هذه المكافأة.',
      currentPoints: 'نقاطك الحالية',
      requiredPoints: 'النقاط المطلوبة',
      afterRedemption: 'النقاط بعد الاستبدال',
    },
  };

  const t = content[language];
  const rewardName = reward.name[language];
  const rewardDescription = reward.description?.[language];

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal modal--redemption" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{t.title}</h2>
          <button className="modal__close" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal__body">
          {reward.image && (
            <div className="redemption-modal__image">
              <img src={reward.image} alt={rewardName} />
            </div>
          )}
          <h3 className="redemption-modal__name">{rewardName}</h3>
          {rewardDescription && (
            <p className="redemption-modal__description">{rewardDescription}</p>
          )}
          <div className="redemption-modal__points">
            <div className="redemption-modal__points-row">
              <span className="redemption-modal__points-label">{t.currentPoints}:</span>
              <span className="redemption-modal__points-value">{userPoints.toLocaleString()}</span>
            </div>
            <div className="redemption-modal__points-row">
              <span className="redemption-modal__points-label">{t.requiredPoints}:</span>
              <span className="redemption-modal__points-value">{reward.pointsRequired.toLocaleString()}</span>
            </div>
            {canRedeem && (
              <div className="redemption-modal__points-row redemption-modal__points-row--highlight">
                <span className="redemption-modal__points-label">{t.afterRedemption}:</span>
                <span className="redemption-modal__points-value">
                  {(userPoints - reward.pointsRequired).toLocaleString()}
                </span>
              </div>
            )}
          </div>
          {!canRedeem && (
            <div className="redemption-modal__error">
              <strong>{t.insufficient}</strong>
              <p>
                {t.needMore} {pointsNeeded.toLocaleString()} {t.morePoints}
              </p>
            </div>
          )}
        </div>
        <div className="modal__footer">
          <button className="btn btn--secondary" onClick={onCancel} disabled={isRedeeming}>
            {t.cancel}
          </button>
          <button
            className="btn btn--primary"
            onClick={onConfirm}
            disabled={!canRedeem || isRedeeming}
          >
            {isRedeeming ? '...' : t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
