/**
 * Question Mart & Cafe - Admin Sidebar Component
 * Navigation sidebar for admin dashboard
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/loyalty', label: 'Loyalty', icon: '⭐', disabled: true },
  { path: '/rewards', label: 'Rewards', icon: '🎁', disabled: true },
  { path: '/users', label: 'Users', icon: '👥', disabled: true },
  { path: '/products', label: 'Products', icon: '☕', disabled: true },
  { path: '/categories', label: 'Categories', icon: '📁', disabled: true },
  { path: '/orders', label: 'Orders', icon: '📋', disabled: true },
  { path: '/reservations', label: 'Reservations', icon: '📅', disabled: true },
  { path: '/reviews', label: 'Reviews', icon: '⭐', disabled: true },
  { path: '/branches', label: 'Branches', icon: '🏪', disabled: true },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-stone-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-stone-700">
        <h1 className="text-xl font-bold text-amber-400">Question Mart</h1>
        <p className="text-sm text-stone-400">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <div className="flex items-center px-4 py-3 text-stone-500 cursor-not-allowed">
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                  <span className="ml-auto text-xs bg-stone-800 px-2 py-1 rounded">Soon</span>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-amber-700 text-white'
                        : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-stone-700">
        <p className="text-xs text-stone-500 text-center">
          © 2024 Question Mart & Cafe
        </p>
      </div>
    </aside>
  );
};
