'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pin, PinOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
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

export default function PinnedPage() {
  const router = useRouter();
  const [pinnedFolders, setPinnedFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchPinnedFolders();
  }, [router]);

  const fetchPinnedFolders = async () => {
    try {
      setLoading(true);
      const response = await folderAPI.getPinned();
      
      if (response.error) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        router.push('/login');
        return;
      }

      if (response.folders) {
        setPinnedFolders(response.folders);
      }
    } catch (error) {
      console.error('Error fetching pinned folders:', error);
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleUnpin = async (e: React.MouseEvent, folderId: number) => {
    e.stopPropagation();
    try {
      await folderAPI.togglePin(folderId, false);
      // Remove from list
      setPinnedFolders(prev => prev.filter(f => f.id !== folderId));
    } catch (error) {
      console.error('Error unpinning folder:', error);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Pin size={28} className="text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#1E3A8A]">Pinned Folders</h1>
              <p className="text-gray-500 text-sm mt-1">Quick access to your important folders</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <span className="text-[#1E3A8A] font-semibold">{pinnedFolders.length}</span>
            <span className="text-gray-500 ml-1">pinned</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E3A8A]"></div>
          </div>
        ) : pinnedFolders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pinned Folders</h3>
            <p className="text-gray-500 mb-6">
              Pin your important folders for quick access!
            </p>
            <button
              onClick={() => router.push('/folders')}
              className="px-6 py-2.5 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
            >
              Go to My Folders
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedFolders.map((folder, index) => (
              <div
                key={folder.id}
                onClick={() => router.push(`/folder/${folder.id}`)}
                className={`${getFolderColor(index)} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 relative group`}
              >
                {/* Unpin button */}
                <button
                  onClick={(e) => handleUnpin(e, folder.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                  title="Unpin folder"
                >
                  <PinOff size={16} className="text-red-500" />
                </button>

                {/* Pin indicator */}
                <div className="absolute top-4 right-4 group-hover:opacity-0 transition-opacity">
                  <span className="text-yellow-500 text-xl">📌</span>
                </div>

                <div className="text-4xl mb-4">{folder.icon || getFolderIcon(folder.description)}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{folder.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{folder.description || 'No description'}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{folder._count || 0} notes</span>
                  <span className="text-gray-400 text-xs">{formatDate(folder.created_at)}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200/50">
                  <span className="text-[#1E3A8A] font-medium text-sm flex items-center gap-1">
                    Open folder →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
