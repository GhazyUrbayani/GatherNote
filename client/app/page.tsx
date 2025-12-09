'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Plus, Search, MoreVertical } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CreateFolderModal from './components/CreateFolderModal';
import NotificationModal from './components/NotificationModal';
import ProfileModal from './components/ProfileModal';
import OptionModal from './components/OptionModal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [optionData, setOptionData] = useState({ isOpen: false, title: '', isPinned: false });
  const router = useRouter();

  // Sample data
  const folders = [
    { id: 1, name: 'My Business Ideas', topic: 'Entrepreneurship', noteCount: 17, color: 'bg-blue-100', icon: '💡', isPinned: true },
    { id: 2, name: 'Data Mining', topic: 'Data Science', noteCount: 12, color: 'bg-green-100', icon: '📊', isPinned: false },
    { id: 3, name: 'Uncategorized', topic: 'General', noteCount: 8, color: 'bg-gray-100', icon: '📝', isPinned: false },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-20 p-8 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="w-1/3 relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-12 pr-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] text-sm shadow-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => setIsNotifModalOpen(true)}
              className="relative p-3 bg-white rounded-full hover:bg-gray-50 transition shadow-sm cursor-pointer"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div 
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
              <span className="font-semibold text-gray-800">John Doe</span>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10 flex justify-between items-center relative overflow-hidden group">
           <div className="z-10 max-w-lg relative">
              <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">Welcome back, John!</h1>
              <p className="text-gray-500 mb-6 text-sm">
                You have stored <span className="font-bold text-[#1E3A8A]">5 topics</span> this week! Keep up the good work.
              </p>
           </div>
           <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#F5F8FF] to-transparent opacity-60 rounded-l-full blur-xl group-hover:opacity-80 transition duration-500"></div>
        </div>

        {/* Recently Visited Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#1E3A8A] rounded-full"></div>
              <h2 className="text-xl font-bold text-[#1E3A8A]">Recently Visited</h2>
            </div>
            <button 
              onClick={() => setIsFolderModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition shadow-lg shadow-[#1E3A8A]/30 cursor-pointer"
            >
              <Plus size={18} />
              <span className="font-medium">Add Folder</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`${folder.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 relative group`}
              >
                {folder.isPinned && (
                  <div className="absolute top-4 right-12">
                    <span className="text-yellow-500 text-xl">📌</span>
                  </div>
                )}
                
                {/* Menu Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionData({ isOpen: true, title: folder.name, isPinned: folder.isPinned });
                  }}
                  className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <MoreVertical size={18} className="text-gray-600" />
                </button>

                <div 
                  onClick={() => router.push(`/folder/${folder.id}`)}
                  className="cursor-pointer"
                >
                  <div className="text-4xl mb-4">{folder.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{folder.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{folder.topic}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{folder.noteCount} notes</span>
                    <button className="text-[#1E3A8A] hover:text-[#1E3A8A]/70 font-medium">View →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      <CreateFolderModal isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} />
      <NotificationModal isOpen={isNotifModalOpen} onClose={() => setIsNotifModalOpen(false)} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <OptionModal 
        isOpen={optionData.isOpen} 
        onClose={() => setOptionData({ isOpen: false, title: '', isPinned: false })} 
        title={optionData.title}
        isPinned={optionData.isPinned}
      />
    </div>
  );
}
