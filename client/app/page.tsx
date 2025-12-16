'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Plus, Search, MoreVertical } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CreateFolderModal from './components/CreateFolderModal';
import NotificationModal from './components/NotificationModal';
import ProfileModal from './components/ProfileModal';
import OptionModal from './components/OptionModal';
import { folderAPI, userAPI } from './lib/api';

interface Folder {
  folder_id: number;
  name: string;
  topic: string;
  created_at: string;
  updated_at: string;
  noteCount?: number;
}

interface UserProfile {
  user_id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [optionData, setOptionData] = useState({ isOpen: false, title: '', isPinned: false });
  const [folders, setFolders] = useState<Folder[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch data dari API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile dan folders secara paralel
      const [profileRes, foldersRes] = await Promise.all([
        userAPI.getProfile(),
        folderAPI.getAll()
      ]);

      if (profileRes.error) {
        // Token invalid atau expired
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      setUserProfile(profileRes.data);
      
      if (foldersRes.data) {
        // Ambil hanya 3 folder terakhir untuk "Recently Visited"
        setFolders(foldersRes.data.slice(-3).reverse());
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFolderColor = (index: number) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100'];
    return colors[index % colors.length];
  };

  const getFolderIcon = (topic: string) => {
    const icons: { [key: string]: string } = {
      'entrepreneurship': '💡',
      'data science': '📊',
      'general': '📝',
      'technology': '💻',
      'business': '💼',
    };
    return icons[topic.toLowerCase()] || '📁';
  };

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
              <span className="font-semibold text-gray-800">
                {loading ? '...' : userProfile?.name || 'User'}
              </span>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10 flex justify-between items-center relative overflow-hidden group">
           <div className="z-10 max-w-lg relative">
              <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">
                Welcome back, {loading ? '...' : userProfile?.name || 'User'}!
              </h1>
              <p className="text-gray-500 mb-6 text-sm">
                You have stored <span className="font-bold text-[#1E3A8A]">{folders.length} folders</span> recently! Keep up the good work.
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
            {loading ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Loading folders...
              </div>
            ) : folders.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                Belum ada folder. Klik "Add Folder" untuk membuat folder pertama Anda!
              </div>
            ) : (
              folders.map((folder, index) => (
                <div
                  key={folder.folder_id}
                  className={`${getFolderColor(index)} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 relative group`}
                >
                  {/* Menu Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOptionData({ isOpen: true, title: folder.name, isPinned: false });
                    }}
                    className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>

                  <div 
                    onClick={() => router.push(`/folder/${folder.folder_id}`)}
                    className="cursor-pointer"
                  >
                    <div className="text-4xl mb-4">{getFolderIcon(folder.topic)}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{folder.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{folder.topic}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{folder.noteCount || 0} notes</span>
                      <button className="text-[#1E3A8A] hover:text-[#1E3A8A]/70 font-medium">View →</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => {
          setIsFolderModalOpen(false);
          fetchData(); // Refresh data setelah membuat folder baru
        }} 
      />
      <NotificationModal isOpen={isNotifModalOpen} onClose={() => setIsNotifModalOpen(false)} />
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onProfileUpdate={fetchData}
      />
      <OptionModal 
        isOpen={optionData.isOpen} 
        onClose={() => setOptionData({ isOpen: false, title: '', isPinned: false })} 
        title={optionData.title}
        isPinned={optionData.isPinned}
      />
    </div>
  );
}
