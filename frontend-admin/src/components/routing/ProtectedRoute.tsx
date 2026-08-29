/**
 * Question Mart & Cafe - Admin Protected Route Component
 * Route guard that requires authentication and admin role
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context';
import { LoadingState } from '../common';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingState message="Verifying authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to login if authenticated but not admin
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location, unauthorized: true }} replace />;
  }

  // Allow access if authenticated and admin
  return <>{children}</>;
};
