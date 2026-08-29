/**
 * Question Mart & Cafe - ErrorState Component
 * Displays error state with retry option
 */

import React from 'react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <div className="error-state__icon">⚠️</div>
      <h3 className="error-state__title">Something went wrong</h3>
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button className="error-state__retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
