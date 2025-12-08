import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';

const GroupCard = ({ name, description, members, status }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer flex justify-between items-center group">
      
      {/* Kiri: Avatar & Info */}
      <div className="flex items-center gap-4">
        {/* Avatar Grup (Placeholder Warna-warni) */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold ${
          status === 'done' ? 'bg-blue-500' : 'bg-orange-400'
        }`}>
          {name.charAt(0)}
        </div>

        <div>
          <h3 className="font-bold text-gn-primary text-lg">{name}</h3>
          <p className="text-gray-500 text-sm max-w-md line-clamp-1">{description}</p>
          
          {/* Member Count Badge */}
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <Users size={12} />
            <span>{members} Members</span>
          </div>
        </div>
      </div>

      {/* Kanan: Status & Opsi */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
            status === 'done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {status}
          </span>
        </div>
        <button className="p-2 text-gray-300 hover:text-gn-primary">
          <MoreHorizontal size={20} />
        </button>
      </div>

    </div>
  );
};

export default GroupCard;