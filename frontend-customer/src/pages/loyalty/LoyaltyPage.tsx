/**
 * Question Mart & Cafe - LoyaltyPage Component
 * Customer loyalty page with membership, rewards, and redemption history
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { useTheme } from '../../context';
import { Loyalty, Reward, PointsTransaction } from '../../types';
import { getMyLoyalty, getRewards, redeemReward, getMyRewardHistory } from '../../services/loyaltyService';
import {
  LoyaltyProgress,
  QRCodeDisplay,
  MembershipBadge,
  PointsBalance,
  RewardGrid,
  RewardRedemptionModal,
  RedemptionHistory,
  EmptyState,
  LoadingState,
  ErrorState,
} from '../../components/loyalty';
import './LoyaltyPage.css';

export const LoyaltyPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { language } = useTheme();

  const [loyalty, setLoyalty] = useState<Loyalty | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [history, setHistory] = useState<PointsTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const content = {
    en: {
      title: 'Loyalty Program',
      subtitle: 'Earn points with every purchase and redeem exclusive rewards',
      loading: 'Loading your loyalty information...',
      error: 'Failed to load loyalty information',
      retry: 'Try Again',
      rewardsTitle: 'Available Rewards',
      rewardsEmpty: 'No rewards available at the moment',
      rewardsEmptySubtitle: 'Check back soon for new rewards!',
      historyTitle: 'Your Redemption History',
      loginRequired: 'Please log in to view your loyalty information',
      loginButton: 'Log In',
    },
    ar: {
      title: 'برنامج الولاء',
      subtitle: 'اكسب النقاط مع كل عملية شراء واستبدل المكافآت الحصرية',
      loading: 'جاري تحميل معلومات الولاء...',
      error: 'فشل في تحميل معلومات الولاء',
      retry: 'حاول مرة أخرى',
      rewardsTitle: 'المكافآت المتاحة',
      rewardsEmpty: 'لا توجد مكافآت متاحة حالياً',
      rewardsEmptySubtitle: 'عد قريباً لمكافآت جديدة!',
      historyTitle: 'سجل الاستبدال الخاص بك',
      loginRequired: 'يرجى تسجيل الدخول لعرض معلومات الولاء',
      loginButton: 'تسجيل الدخول',
    },
  };

  const t = content[language];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLoyaltyData();
    }
  }, [isAuthenticated]);

  const fetchLoyaltyData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [loyaltyData, rewardsData, historyData] = await Promise.all([
        getMyLoyalty(),
        getRewards(),
        getMyRewardHistory(),
      ]);

      setLoyalty(loyaltyData);
      setRewards(rewardsData);
      setHistory(historyData);
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemClick = (rewardId: string) => {
    const reward = rewards.find((r) => r._id === rewardId);
    if (reward) {
      setSelectedReward(reward);
      setShowModal(true);
    }
  };

  const handleRedeemConfirm = async () => {
    if (!selectedReward || !loyalty) return;

    setIsRedeeming(true);
    try {
      const updatedLoyalty = await redeemReward(selectedReward._id);
      setLoyalty(updatedLoyalty);
      setShowModal(false);
      setSelectedReward(null);

      // Refresh history after redemption
      const updatedHistory = await getMyRewardHistory();
      setHistory(updatedHistory);
    } catch (err: any) {
      setError(err.message || 'Failed to redeem reward');
    } finally {
      setIsRedeeming(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedReward(null);
  };

  if (authLoading || isLoading) {
    return (
      <div className="page page--loyalty">
        <div className="container">
          <LoadingState message={t.loading} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="page page--loyalty">
        <div className="container">
          <EmptyState
            icon="🔒"
            title={t.loginRequired}
            action={{
              label: t.loginButton,
              onClick: () => navigate('/login'),
            }}
          />
        </div>
      </div>
    );
  }

  if (error && !loyalty) {
    return (
      <div className="page page--loyalty">
        <div className="container">
          <ErrorState message={error} onRetry={fetchLoyaltyData} />
        </div>
      </div>
    );
  }

  return (
    <div className="page page--loyalty">
      <div className="container">
        {/* Page Header */}
        <div className="loyalty-page__header">
          <h1 className="loyalty-page__title">{t.title}</h1>
          <p className="loyalty-page__subtitle">{t.subtitle}</p>
        </div>

        {loyalty && (
          <>
            {/* Membership Overview */}
            <div className="loyalty-page__overview">
              <div className="loyalty-page__membership">
                <MembershipBadge level={loyalty.membershipLevel} />
                <PointsBalance points={loyalty.points} />
              </div>
              <LoyaltyProgress
                currentPoints={loyalty.points}
                membershipLevel={loyalty.membershipLevel}
              />
            </div>

            {/* QR Code */}
            <QRCodeDisplay qrCode={loyalty.qrCode} />

            {/* Rewards Section */}
            <div className="loyalty-page__section">
              <h2 className="loyalty-page__section-title">{t.rewardsTitle}</h2>
              {rewards.length > 0 ? (
                <RewardGrid
                  rewards={rewards}
                  userPoints={loyalty.points}
                  onRedeem={handleRedeemClick}
                  isRedeeming={isRedeeming}
                />
              ) : (
                <EmptyState
                  icon="🎁"
                  title={t.rewardsEmpty}
                  subtitle={t.rewardsEmptySubtitle}
                />
              )}
            </div>

            {/* Redemption History */}
            <div className="loyalty-page__section">
              <RedemptionHistory transactions={history} />
            </div>
          </>
        )}
      </div>

      {/* Redemption Modal */}
      {selectedReward && loyalty && (
        <RewardRedemptionModal
          isOpen={showModal}
          reward={selectedReward}
          userPoints={loyalty.points}
          onConfirm={handleRedeemConfirm}
          onCancel={handleModalClose}
          isRedeeming={isRedeeming}
        />
      )}
    </div>
  );
};
