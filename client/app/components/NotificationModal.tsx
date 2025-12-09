'use client';

import { X, Bell as BellIcon, Clock } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  if (!isOpen) return null;

  const notifications = [
    { id: 1, title: 'New member joined Study Group', time: '2 minutes ago', read: false },
    { id: 2, title: 'John Doe commented on your note', time: '1 hour ago', read: false },
    { id: 3, title: 'Your folder was shared successfully', time: '3 hours ago', read: true },
    { id: 4, title: 'Weekly summary available', time: '1 day ago', read: true },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-[2rem] shadow-2xl relative max-h-[70vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#1E3A8A] transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <BellIcon size={24} className="text-[#1E3A8A]" />
          <h2 className="text-2xl font-bold text-[#1E3A8A]">Notifications</h2>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition cursor-pointer hover:bg-gray-50 ${
                notif.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm flex-1 ${notif.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                  {notif.title}
                </p>
                {!notif.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <Clock size={12} />
                <span>{notif.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl text-[#1E3A8A] font-medium hover:bg-gray-100 transition cursor-pointer"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
