'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CreateGroupModal from '../components/CreateGroupModal';
import JoinGroupModal from '../components/JoinGroupModal';
import { groupAPI } from '../lib/api';

interface Group {
  group_id: number;
  name: string;
  description: string;
  group_code: string;
  created_at: string;
  member_count?: number;
}

export default function GroupsPage() {
  const router = useRouter();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchGroups();
  }, [router]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await groupAPI.getAll();
      
      if (response.error) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (response.data) {
        setGroups(response.data);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGroupColor = (index: number) => {
    const colors = ['bg-green-100', 'bg-blue-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100'];
    return colors[index % colors.length];
  };

  const getGroupIcon = (name: string) => {
    if (name.toLowerCase().includes('study')) return '📚';
    if (name.toLowerCase().includes('project')) return '💼';
    if (name.toLowerCase().includes('research')) return '🔬';
    if (name.toLowerCase().includes('team')) return '👥';
    return '👨‍👩‍👧‍👦';
  };

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
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Loading groups...
            </div>
          ) : groups.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada group. Klik "Create Group" atau "Join Group" untuk memulai!
            </div>
          ) : (
            groups.map((group, index) => (
              <div
                key={group.group_id}
                onClick={() => router.push(`/group/${group.group_id}`)}
                className={`${getGroupColor(index)} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200`}
              >
                <div className="text-4xl mb-4">{getGroupIcon(group.name)}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>{group.member_count || 0} members</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{group.group_code}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <CreateGroupModal 
        isOpen={isCreateGroupModalOpen} 
        onClose={() => {
          setIsCreateGroupModalOpen(false);
          fetchGroups();
        }} 
      />
      <JoinGroupModal 
        isOpen={isJoinGroupModalOpen} 
        onClose={() => {
          setIsJoinGroupModalOpen(false);
          fetchGroups();
        }} 
      />
    </div>
  );
}
