import React from 'react';
import { Star, Eye, User, PlusCircle } from 'lucide-react';

const SearchNoteCard = ({ title, author, rating, reviews, status, views, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition mb-4">
      {/* 1. Header Kartu (Biru Muda) */}
      <div className="bg-gn-secondary/30 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Avatar Penulis */}
          <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white overflow-hidden">
             {/* Placeholder Image */}
             <img src={`https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} />
          </div>
          <div>
            <h3 className="font-bold text-gn-primary text-lg leading-tight">{title}</h3>
            <p className="text-xs text-gray-500">by {author}</p>
          </div>
        </div>
        
        {/* Status Tag (Done/Ongoing) */}
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
          status === 'Done' 
            ? 'bg-green-100 text-green-700 border-green-200' 
            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
        }`}>
          {status}
        </span>
      </div>

      {/* 2. Body Kartu (Putih) */}
      <div className="p-4 flex justify-between items-center">
        {/* Rating & Views */}
        <div className="flex gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-gn-primary">{rating}</span>
            <span className="text-xs">({reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span className="font-bold text-gn-primary">{views}</span>
          </div>
        </div>

        {/* Tombol Add/Save */}
        <button 
          onClick={onClick}
          className="flex items-center gap-2 text-gn-primary hover:bg-gn-soft px-4 py-2 rounded-lg transition text-sm font-bold"
        >
          <PlusCircle size={18} />
          Save
        </button>
      </div>
    </div>
  );
};

export default SearchNoteCard;