import React from 'react';
import { X } from 'lucide-react';

const CreateFolderModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Jika tidak open, jangan tampilkan apa-apa

  return (
    // 1. Overlay Hitam Transparan (Backdrop)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      
      {/* 2. Kotak Modal Putih */}
      <div className="bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-2xl relative animate-fade-in-up">
        
        {/* Tombol Close (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gn-primary transition"
        >
          <X size={24} />
        </button>

        {/* Header Modal */}
        <h2 className="text-2xl font-bold text-gn-primary mb-8 text-center">Add New Folder</h2>

        {/* Form Input */}
        <form className="flex flex-col gap-6">
          
          {/* Input: Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gn-primary ml-1">Name</label>
            <input 
              type="text" 
              placeholder="Ex: Business Ideas" 
              className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary placeholder-gray-400 font-medium"
            />
          </div>

          {/* Input: Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gn-primary ml-1">Topic</label>
            <input 
              type="text" 
              placeholder="Ex: Entrepreneurship" 
              className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary placeholder-gray-400 font-medium"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="button" // Nanti diganti submit kalau sudah ada backend
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gn-primary text-white font-bold hover:bg-gn-primary/90 transition shadow-lg shadow-gn-primary/30"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;