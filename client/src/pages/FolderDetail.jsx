import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Untuk navigasi
import Sidebar from '../components/Sidebar';
import NoteItem from '../components/NoteItem';
import CreateNoteModal from '../components/CreateNoteModal'; // Modal Create Note
import { Bell, ArrowLeft, Plus, Settings, Trash2 } from 'lucide-react';

const FolderDetail = () => {
  const navigate = useNavigate();
  const { folderId } = useParams(); // Menangkap ID folder dari URL (opsional nanti)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  console.log("Membuka folder dengan ID:", folderId);
  // Data Dummy Catatan (Sesuai Desain Hal 72)
  const notes = [
    { id: 1, title: "Subscription-Based Productivity Tool", date: "12 Oct 2023", author: "Me" },
    { id: 2, title: "AI-Assisted Learning Platform", date: "10 Oct 2023", author: "Me" },
    { id: 3, title: "Eco-Friendly Packaging Startup", date: "05 Oct 2023", author: "Me" },
    { id: 4, title: "Mobile App for Local Marketplace", date: "01 Oct 2023", author: "Me" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] font-sans relative">
      <Sidebar />

      <main className="flex-1 ml-20 p-8 md:p-12">
        
        {/* HEADER: Back Button & Search */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gn-primary transition">
              <ArrowLeft size={20} />
            </button>
            {/* Search bar kecil */}
            <input type="text" placeholder="Search in folder..." className="bg-white px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gn-primary text-sm shadow-sm w-64"/>
          </div>
          
          <div className="flex items-center gap-5">
            <button><Bell size={22} className="text-gray-600" /></button>
            <div className="w-10 h-10 bg-gn-primary rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        {/* FOLDER INFO CARD (Desain Hal 72 & 102) */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
           {/* Hiasan Background */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-gn-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

           <div className="relative z-10">
             <div className="flex justify-between items-start">
               <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🚀</span>
                    <h1 className="text-3xl font-bold text-gn-primary">My Business Ideas</h1>
                 </div>
                 <p className="text-gray-500 max-w-2xl mt-2">
                   A collection of my business ideas, concepts, and early-stage opportunities for future ventures.
                 </p>
               </div>
               
               {/* Folder Actions */}
               <div className="flex gap-2">
                 <button className="p-2 text-gray-400 hover:text-gn-primary"><Settings size={20}/></button>
                 <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={20}/></button>
               </div>
             </div>

             {/* Stats Bar */}
             <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100">
               <div>
                 <span className="block text-xl font-bold text-gn-primary">{notes.length}</span>
                 <span className="text-xs text-gray-400">Notes</span>
               </div>
               <div>
                 <span className="block text-xl font-bold text-gn-primary">12</span>
                 <span className="text-xs text-gray-400">Contributors</span>
               </div>
               <div className="ml-auto">
                 <button 
                    onClick={() => setIsNoteModalOpen(true)}
                    className="flex items-center gap-2 bg-gn-primary text-white px-5 py-3 rounded-xl hover:bg-gn-primary/90 transition shadow-lg shadow-gn-primary/20"
                 >
                   <Plus size={18} />
                   <span className="font-semibold text-sm">New Note</span>
                 </button>
               </div>
             </div>
           </div>
        </div>

        {/* NOTES LIST */}
        <section>
          <h3 className="text-lg font-bold text-gn-primary mb-4 ml-2">All Notes</h3>
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            {notes.map(note => (
              // Bungkus NoteItem dengan div yang memiliki onClick
              <div key={note.id} onClick={() => navigate(`/note/${note.id}`)}> 
                <NoteItem 
                  title={note.title} 
                  date={note.date} 
                  author={note.author} 
                />
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Render Modal Create Note */}
      <CreateNoteModal 
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
      />

    </div>
  );
};

export default FolderDetail;