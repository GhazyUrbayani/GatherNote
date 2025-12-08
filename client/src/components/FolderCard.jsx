import React from 'react';
import { MoreVertical } from 'lucide-react';

const FolderCard = ({ title, desc, icon, type = "default", onClick, onMenuClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full flex flex-col relative"
    >
      {/* Header Kartu */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${type === 'highlight' ? 'bg-blue-100 text-blue-600' : 'bg-gn-soft text-gn-primary'}`}>
          <span className="text-2xl">{icon || '📁'}</span> 
        </div>
        
        {/* Tombol Menu (Titik Tiga) */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // PENTING: Mencegah klik tembus ke kartu utama
            onMenuClick && onMenuClick(e);
          }}
          className="text-gray-300 hover:text-gn-primary hover:bg-gray-100 p-2 rounded-full transition z-10"
        >
          <MoreVertical size={20} />
        </button>
      </div>
      
      {/* Judul & Deskripsi */}
      <h3 className="font-bold text-gn-primary text-lg mb-2 leading-tight group-hover:text-blue-600 transition">
        {title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-1">
        {desc || "No description provided for this folder."}
      </p>

      {/* Footer Kartu */}
      <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-auto">
        <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white ring-1 ring-gray-100"></div>
        <span className="text-[10px] font-medium text-gray-400">Owner</span>
      </div>
    </div>
  );
};

export default FolderCard;