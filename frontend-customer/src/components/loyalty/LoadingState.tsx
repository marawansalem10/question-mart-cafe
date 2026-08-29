/**
 * Question Mart & Cafe - LoadingState Component
 * Displays loading state with skeleton
 */

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  return (
    <div className="loading-state">
      <div className="loading-state__spinner"></div>
      {message && <p className="loading-state__message">{message}</p>}
    </div>
  );
};
