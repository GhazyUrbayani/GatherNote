import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import GroupCard from '../components/GroupCard';
import CreateGroupModal from '../components/CreateGroupModal'; // Kita buat di langkah 3
import JoinGroupModal from '../components/JoinGroupModal';     // Kita buat di langkah 4
import { Search, Plus, LogIn } from 'lucide-react';

const GroupList = () => {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isJoinOpen, setJoinOpen] = useState(false);

  // Dummy Data Grup (Sesuai Desain Hal 85)
  const groups = [
    { id: 1, name: "Data Mining A", description: "Diskusi tugas besar kelompok 9", members: 5, status: "ongoing" },
    { id: 2, name: "Physics 101 Study", description: "Persiapan UAS Fisika Dasar Semester 1", members: 12, status: "done" },
    { id: 3, name: "Startup Project", description: "Brainstorming ide bisnis kopi.", members: 4, status: "ongoing" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] font-sans relative">
      <Sidebar />

      <main className="flex-1 ml-20 p-8 md:p-12">
        
        {/* Header: Judul & Tombol Aksi */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gn-primary">Group List</h1>
          
          <div className="flex gap-3">
            {/* Tombol Join Group */}
            <button 
              onClick={() => setJoinOpen(true)}
              className="flex items-center gap-2 bg-white border border-gn-primary text-gn-primary px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              <LogIn size={20} />
              Join Group
            </button>

            {/* Tombol Create Group */}
            <button 
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 bg-gn-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-gn-primary/90 transition shadow-lg shadow-gn-primary/20"
            >
              <Plus size={20} />
              Create Group
            </button>
          </div>
        </div>

        {/* Search Bar Besar */}
        <div className="relative mb-8">
           <div className="absolute top-1/2 left-6 -translate-y-1/2 text-gray-400">
              <Search size={24} />
           </div>
           <input 
             type="text" 
             placeholder="Search Up Groups..." 
             className="w-full bg-white pl-16 pr-6 py-5 rounded-2xl border border-gray-200 focus:outline-none focus:border-gn-primary focus:ring-2 focus:ring-gn-soft text-lg shadow-sm transition-all"
           />
        </div>

        {/* Daftar Grup */}
        <div className="flex flex-col gap-4">
          {groups.map(group => (
            <GroupCard key={group.id} {...group} />
          ))}
        </div>

      </main>

      {/* Render Modals */}
      <CreateGroupModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
      <JoinGroupModal isOpen={isJoinOpen} onClose={() => setJoinOpen(false)} />

    </div>
  );
};

export default GroupList;