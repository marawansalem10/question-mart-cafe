/**
 * Question Mart & Cafe - Loyalty Service
 * API service for loyalty and rewards functionality
 */

import { get, post } from './api';
import { API_ENDPOINTS } from '../constants';
import { Loyalty, Reward, PointsTransaction } from '../types';

/**
 * Get current user's loyalty account
 */
export const getMyLoyalty = async (): Promise<Loyalty> => {
  return get<Loyalty>(API_ENDPOINTS.LOYALTY.ME);
};

/**
 * Get all active rewards
 */
export const getRewards = async (): Promise<Reward[]> => {
  return get<Reward[]>(API_ENDPOINTS.REWARDS.ALL);
};

/**
 * Redeem a reward
 */
export const redeemReward = async (rewardId: string): Promise<Loyalty> => {
  return post<Loyalty>(API_ENDPOINTS.REWARDS.REDEEM(rewardId));
};

/**
 * Get current user's redemption history
 */
export const getMyRewardHistory = async (): Promise<PointsTransaction[]> => {
  return get<PointsTransaction[]>(API_ENDPOINTS.REWARDS.HISTORY);
};
