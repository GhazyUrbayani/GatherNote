import React from 'react';
import { Pin, Trash2, X } from 'lucide-react';

const OptionModal = ({ isOpen, onClose, title, isPinned }) => {
  if (!isOpen) return null;

  return (
    // Overlay transparan
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-[1px]" 
      onClick={onClose}
    >
      {/* Kotak Menu */}
      <div 
        className="bg-white w-80 p-6 rounded-2xl shadow-2xl animate-fade-in border border-gray-100" 
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik isinya
      >
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gn-primary truncate max-w-[200px] text-lg">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gn-primary transition">
                <X size={20}/>
            </button>
        </div>

        {/* List Aksi */}
        <div className="flex flex-col gap-3">
            {/* Tombol PIN */}
            <button 
                onClick={() => { alert(`Changed Pin status for: ${title}`); onClose(); }}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-gn-soft transition text-gn-primary font-bold text-left"
            >
                <Pin size={20} className={isPinned ? "fill-gn-primary" : ""} />
                {isPinned ? "Unpin Folder" : "Pin Folder"}
            </button>

            {/* Tombol DELETE */}
            <button 
                onClick={() => { alert(`Folder deleted: ${title}`); onClose(); }}
                className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-red-50 transition text-red-500 font-bold text-left"
            >
                <Trash2 size={20} />
                Delete Folder
            </button>
        </div>

      </div>
    </div>
  );
};

export default OptionModal;