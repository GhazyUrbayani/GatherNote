import React from 'react';
import { X } from 'lucide-react';

const JoinGroupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gn-primary">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gn-primary mb-6 text-center">Join Group</h2>

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Code (e.g. A8X9)" 
              className="flex-1 bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary font-bold text-center tracking-widest uppercase" 
            />
            <button onClick={onClose} className="bg-gn-secondary text-gn-primary px-6 rounded-xl font-bold hover:bg-gn-secondary/80 transition">
              Join
            </button>
          </div>
          
          <p className="text-xs text-center text-gray-400 mt-2">
            Ask your friend for the unique group token.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;