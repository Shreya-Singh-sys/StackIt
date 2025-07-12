import React, { useState } from 'react';
import { Search, Bell, User, Layers3 } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface NavigationProps {
  onNavigateHome: () => void;
  onNavigateAsk: () => void;
  currentPage: string;
}

export function Navigation({ onNavigateHome, onNavigateAsk, currentPage }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={onNavigateHome}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Layers3 size={28} />
              <span className="text-xl font-bold">StackIt</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {showNotifications && (
                <NotificationDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* Ask Question Button */}
            <button
              onClick={onNavigateAsk}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Ask Question
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=60&h=60&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}