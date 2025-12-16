'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CreateFolderModal from '../components/CreateFolderModal';
import { folderAPI } from '../lib/api';

interface Folder {
  id: number;
  owner_id: number;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  is_pinned: boolean;
  created_at: string;
  _count: number;
}

export default function FoldersPage() {
  const router = useRouter();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchFolders();
  }, [router]);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await folderAPI.getAll();
      
      if (response.error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        router.push('/login');
        return;
      }

      if (response.folders) {
        setFolders(response.folders);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const getFolderColor = (index: number) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100'];
    return colors[index % colors.length];
  };

  const getFolderIcon = (description: string | null) => {
    if (!description) return '📁';
    const desc = description.toLowerCase();
    const icons: { [key: string]: string } = {
      'entrepreneurship': '💡',
      'entrepreneur': '💡',
      'business': '💼',
      'data science': '📊',
      'data': '📊',
      'general': '📝',
      'technology': '💻',
      'tech': '💻',
      'course': '📚',
      'tst': '🌐',
      'academic': '🎓',
      'research': '🔬',
      'personal': '🎯',
      'life': '🌟',
    };
    
    for (const [key, icon] of Object.entries(icons)) {
      if (desc.includes(key)) return icon;
    }
    return '📁';
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
          {loading ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Loading folders...
            </div>
          ) : folders.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Belum ada folder. Klik "New Folder" untuk membuat folder pertama Anda!
            </div>
          ) : (
            folders.map((folder, index) => (
              <div
                key={folder.id}
                onClick={() => router.push(`/folder/${folder.id}`)}
                className={`${getFolderColor(index)} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 relative`}
              >
                {folder.is_pinned && (
                  <div className="absolute top-4 right-4">
                    <span className="text-yellow-500 text-xl">📌</span>
                  </div>
                )}
                <div className="text-4xl mb-4">{folder.icon || getFolderIcon(folder.description)}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{folder.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{folder.description || 'No description'}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{folder._count || 0} notes</span>
                  <span className="text-[#1E3A8A] font-medium">View →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => {
          setIsFolderModalOpen(false);
          fetchFolders(); // Refresh data setelah membuat folder baru
        }} 
      />
    </div>
  );
}
