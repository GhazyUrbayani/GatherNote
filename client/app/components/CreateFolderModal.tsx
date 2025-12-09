'use client';

import { X } from 'lucide-react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateFolderModal({ isOpen, onClose }: CreateFolderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-[#1E3A8A] transition cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8 text-center">Add New Folder</h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1E3A8A] ml-1">Name</label>
            <input 
              type="text" 
              placeholder="Ex: Business Ideas" 
              className="w-full bg-[#E8F0FE]/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] text-[#1E3A8A] placeholder-gray-400 font-medium"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#1E3A8A] ml-1">Topic</label>
            <input 
              type="text" 
              placeholder="Ex: Entrepreneurship" 
              className="w-full bg-[#E8F0FE]/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFC107] text-[#1E3A8A] placeholder-gray-400 font-medium"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
