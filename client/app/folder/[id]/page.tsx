'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, MoreVertical } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

export default function FolderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const folderId = params.id;

  const notes = [
    { id: 1, title: 'Meeting Notes - Q4 Planning', date: '2 days ago', status: 'ongoing' },
    { id: 2, title: 'Project Roadmap', date: '1 week ago', status: 'completed' },
    { id: 3, title: 'Budget Analysis', date: '3 days ago', status: 'unstarted' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'unstarted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 md:p-12">
        <button 
          onClick={() => router.push('/folders')}
          className="flex items-center gap-2 text-[#1E3A8A] hover:text-[#1E3A8A]/70 mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Folders</span>
        </button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">My Business Ideas</h1>
            <p className="text-gray-600">Folder #{folderId} • 17 notes</p>
          </div>
          <button 
            onClick={() => router.push(`/note/new-${folderId}`)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition shadow-lg cursor-pointer"
          >
            <Plus size={18} />
            <span className="font-medium">New Note</span>
          </button>
        </div>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => router.push(`/note/${note.id}`)}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{note.title}</h3>
                <span className="text-sm text-gray-500">{note.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(note.status)}`}>
                  {note.status}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                  <MoreVertical size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
