'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CreateGroupModal from '../components/CreateGroupModal';
import JoinGroupModal from '../components/JoinGroupModal';

export default function GroupsPage() {
  const router = useRouter();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] = useState(false);

  const groups = [
    { id: 1, name: 'Study Group Alpha', members: 12, icon: '📚', color: 'bg-green-100' },
    { id: 2, name: 'Project Team Beta', members: 8, icon: '💼', color: 'bg-blue-100' },
    { id: 3, name: 'Research Lab', members: 15, icon: '🔬', color: 'bg-purple-100' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 md:p-12">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-[#1E3A8A] hover:text-[#1E3A8A]/70 mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A8A]">Community Groups</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsJoinGroupModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#1E3A8A] rounded-full hover:bg-gray-50 transition shadow-md border border-[#1E3A8A] cursor-pointer"
            >
              <span className="font-medium">Join Group</span>
            </button>
            <button 
              onClick={() => setIsCreateGroupModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
            >
              <Plus size={18} />
              <span className="font-medium">Create Group</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => router.push(`/group/${group.id}`)}
              className={`${group.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200`}
            >
              <div className="text-4xl mb-4">{group.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{group.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{group.members} members</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen} 
        onClose={() => setIsCreateGroupModalOpen(false)} 
      />
      <JoinGroupModal 
        isOpen={isJoinGroupModalOpen} 
        onClose={() => setIsJoinGroupModalOpen(false)} 
      />
    </div>
  );
}
