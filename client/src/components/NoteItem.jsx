import React from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';

const NoteItem = ({ title, date, author }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-0 hover:bg-gn-soft/30 transition cursor-pointer group">
      <div className="flex items-center gap-4">
        {/* Ikon Dokumen */}
        <div className="p-2 bg-gn-soft text-gn-primary rounded-lg group-hover:bg-gn-primary group-hover:text-white transition">
          <FileText size={20} />
        </div>
        
        {/* Info Note */}
        <div>
          <h4 className="font-bold text-gn-primary text-sm">{title}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <span>{date}</span>
            <span>•</span>
            <span>By {author || 'Me'}</span>
          </div>
        </div>
      </div>

      {/* Tombol Opsi */}
      <button className="text-gray-300 hover:text-gn-primary p-2">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default NoteItem;