import React from 'react';
import { X } from 'lucide-react';

const CreateNoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gn-primary">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gn-primary mb-8 text-center">Add New Notes</h2>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gn-primary ml-1">Note Name</label>
            <input type="text" placeholder="Enter note title..." className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gn-primary ml-1">Select Folder</label>
            <select className="w-full bg-gn-soft/50 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gn-secondary text-gn-primary appearance-none cursor-pointer">
              <option>Uncategorized</option>
              <option>My Business Ideas</option>
              <option>Data Mining</option>
            </select>
          </div>

          <button onClick={onClose} className="mt-4 w-full py-4 rounded-xl bg-gn-primary text-white font-bold hover:bg-gn-primary/90 shadow-lg shadow-gn-primary/30">
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;