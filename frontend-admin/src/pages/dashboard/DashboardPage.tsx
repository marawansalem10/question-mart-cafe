/**
 * Question Mart & Cafe - Admin Dashboard Page
 * Placeholder dashboard page for admin dashboard
 */

import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 mb-6">Dashboard</h1>
      
      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏗️</div>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">
            Dashboard Under Construction
          </h2>
          <p className="text-stone-500">
            The admin dashboard is being built. Statistics and analytics will appear here.
          </p>
        </div>
      </div>

      {/* Coming Soon Modules */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Loyalty Management', icon: '⭐', description: 'Manage customer loyalty accounts and points' },
          { name: 'Rewards Management', icon: '🎁', description: 'Create and manage reward offerings' },
          { name: 'User Management', icon: '👥', description: 'View and manage customer accounts' },
          { name: 'Product Management', icon: '☕', description: 'Manage menu items and pricing' },
          { name: 'Order Management', icon: '📋', description: 'Process and track orders' },
          { name: 'Reservation Management', icon: '📅', description: 'Manage table reservations' },
        ].map((module) => (
          <div key={module.name} className="bg-white rounded-lg shadow p-6 border border-stone-200">
            <div className="text-3xl mb-3">{module.icon}</div>
            <h3 className="font-semibold text-stone-800 mb-2">{module.name}</h3>
            <p className="text-sm text-stone-500">{module.description}</p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
