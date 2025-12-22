'use client';

import { useState, useEffect } from 'react';
import { X, User, Mail, Camera, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authAPI } from '../lib/api';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: {
    id?: number;
    user_id?: number;
    name: string;
    email: string;
  } | null;
  onProfileUpdate?: () => void;
}

export default function ProfileModal({ isOpen, onClose, userProfile, onProfileUpdate }: ProfileModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  if (!isOpen) return null;

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#FFC107] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {name ? name.substring(0, 2).toUpperCase() : 'JD'}
            </div>
            <button className="absolute bottom-0 right-0 bg-[#FFC107] p-2 rounded-full shadow-lg hover:bg-[#FFC107]/90 transition cursor-pointer">
              <Camera size={16} className="text-[#1E3A8A]" />
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Nama tidak dapat diubah saat ini</p>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah saat ini</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              User ID
            </label>
            <input
              type="text"
              value={userProfile?.user_id || userProfile?.id || ''}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-500 outline-none"
              disabled
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Close
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
