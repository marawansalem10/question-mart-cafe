/**
 * Question Mart & Cafe - Admin Header Component
 * Top header bar for admin dashboard
 */

import React from 'react';
import { useAuth } from '../context';
import { Button } from '../components/common';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-stone-800">Dashboard</h2>
          <p className="text-sm text-stone-500">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="text-right">
            <p className="text-sm font-medium text-stone-800">{user?.name}</p>
            <p className="text-xs text-stone-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>

          {/* Logout Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
