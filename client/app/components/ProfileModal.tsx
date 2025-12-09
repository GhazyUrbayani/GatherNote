'use client';

import { X, User, Mail, Camera } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  if (!isOpen) return null;

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
              JD
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
              defaultValue="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} />
              Email
            </label>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue="I love taking notes and organizing my ideas!"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20 outline-none transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button className="flex-1 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-medium hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
