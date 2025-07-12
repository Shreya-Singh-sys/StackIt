import React from 'react';
import { X } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const notifications = [
    {
      id: 1,
      type: 'answer',
      message: 'John Doe answered your question',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      type: 'mention',
      message: 'Jane Smith mentioned you in a comment',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      type: 'vote',
      message: 'Mike Johnson upvoted your answer',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
              notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <p className="text-sm text-slate-900">{notification.message}</p>
            <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-slate-200">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Mark all as read
        </button>
      </div>
    </div>
  );
}