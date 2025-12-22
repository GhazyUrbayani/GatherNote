'use client';

import { useState, useEffect } from 'react';
import { X, User, Shield, Bell as BellIcon } from 'lucide-react';
import { userAPI } from '../lib/api';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function SettingsModal({ isOpen, onClose, onUpdate }: SettingsModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [groupUpdates, setGroupUpdates] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load user profile when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.user) {
        setName(response.user.name || '');
        setEmail(response.user.email || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await userAPI.updateProfile(name);
      
      if (response.error) {
        alert('Failed to save settings');
        return;
      }

      alert('Settings saved successfully!');
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl p-8 rounded-[2rem] shadow-2xl relative max-h-[80vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#1E3A8A] transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8">Settings</h2>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-[#1E3A8A]" />
              <h3 className="text-lg font-bold text-gray-800">Profile</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-gray-800"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full bg-gray-100 px-4 py-3 rounded-xl text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <BellIcon size={20} className="text-[#1E3A8A]" />
              <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Email notifications</span>
                <input 
                  type="checkbox" 
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-[#1E3A8A] cursor-pointer" 
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Group updates</span>
                <input 
                  type="checkbox" 
                  checked={groupUpdates}
                  onChange={(e) => setGroupUpdates(e.target.checked)}
                  className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-[#1E3A8A] cursor-pointer" 
                />
              </label>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-[#1E3A8A]" />
              <h3 className="text-lg font-bold text-gray-800">Privacy</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Make profile public</span>
                <input 
                  type="checkbox" 
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="w-5 h-5 text-[#1E3A8A] rounded focus:ring-[#1E3A8A] cursor-pointer" 
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
