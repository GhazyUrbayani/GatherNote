'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CreateFolderModal from '../components/CreateFolderModal';

export default function FoldersPage() {
  const router = useRouter();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const folders = [
    { id: 1, name: 'My Business Ideas', topic: 'Entrepreneurship', noteCount: 17, color: 'bg-blue-100', icon: '💡', isPinned: true },
    { id: 2, name: 'Data Mining', topic: 'Data Science', noteCount: 12, color: 'bg-green-100', icon: '📊', isPinned: false },
    { id: 3, name: 'Uncategorized', topic: 'General', noteCount: 8, color: 'bg-gray-100', icon: '📝', isPinned: false },
    { id: 4, name: 'Personal Notes', topic: 'Life', noteCount: 5, color: 'bg-purple-100', icon: '🎯', isPinned: false },
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
          <h1 className="text-3xl font-bold text-[#1E3A8A]">My Folders</h1>
          <button 
            onClick={() => setIsFolderModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
          >
            <Plus size={18} />
            <span className="font-medium">New Folder</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => router.push(`/folder/${folder.id}`)}
              className={`${folder.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 relative`}
            >
              {folder.isPinned && (
                <div className="absolute top-4 right-4">
                  <span className="text-yellow-500 text-xl">📌</span>
                </div>
              )}
              <div className="text-4xl mb-4">{folder.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{folder.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{folder.topic}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{folder.noteCount} notes</span>
                <span className="text-[#1E3A8A] font-medium">View →</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)} 
      />
    </div>
  );
}
