'use client';

import { Pin, Trash2, X } from 'lucide-react';

interface OptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isPinned?: boolean;
}

export default function OptionModal({ isOpen, onClose, title, isPinned = false }: OptionModalProps) {
  if (!isOpen) return null;

  return (
    // Overlay transparan
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[1px]" 
      onClick={onClose}
    >
      {/* Kotak Menu */}
      <div 
        className="bg-white w-80 p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 border border-gray-100" 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1E3A8A] truncate max-w-[200px] text-lg">{title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-[#1E3A8A] transition cursor-pointer"
            >
                <X size={20}/>
            </button>
        </div>

        {/* List Aksi */}
        <div className="flex flex-col gap-3">
            {/* Tombol PIN */}
            <button 
                onClick={() => { 
                  alert(`Changed Pin status for: ${title}`); 
                  onClose(); 
                }}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-[#F5F8FF] transition text-[#1E3A8A] font-bold text-left cursor-pointer"
            >
                <Pin size={20} className={isPinned ? "fill-[#1E3A8A]" : ""} />
                {isPinned ? "Unpin Folder" : "Pin Folder"}
            </button>

            {/* Tombol DELETE */}
            <button 
                onClick={() => { 
                  if (confirm(`Are you sure you want to delete "${title}"?`)) {
                    alert(`Folder deleted: ${title}`); 
                    onClose();
                  }
                }}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-red-50 transition text-red-500 font-bold text-left cursor-pointer"
            >
                <Trash2 size={20} />
                Delete Folder
            </button>
        </div>

      </div>
    </div>
  );
}
