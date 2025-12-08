import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FolderCard from '../components/FolderCard';
import CreateFolderModal from '../components/CreateFolderModal';
import OptionModal from '../components/OptionModal'; // Import Modal Opsi
import { Bell, Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  
  // State untuk Option Modal (Menyimpan data kartu mana yang lagi diklik)
  const [optionData, setOptionData] = useState({ 
    isOpen: false, 
    title: '', 
    isPinned: false 
  });

  // --- HANDLERS ---
  const handleFolderClick = (folderName) => {
    // Navigasi ke halaman detail
    const slug = folderName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/folder/${slug}`);
  };

  const handleOpenOption = (title, isPinned = false) => {
    setOptionData({ isOpen: true, title, isPinned });
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] font-sans relative">
      <Sidebar />

      <main className="flex-1 ml-20 p-8 md:p-12 transition-all">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-10">
          <div className="w-1/3 relative">
             <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <Search size={20} />
             </div>
             <input 
               type="text" 
               placeholder="Search..." 
               className="w-full bg-white pl-12 pr-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gn-primary focus:ring-1 focus:ring-gn-primary text-sm shadow-sm transition-all"
             />
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-white rounded-full transition text-gray-500 hover:text-gn-primary">
              <Bell size={22} />
            </button>
            <div className="w-10 h-10 bg-gn-primary rounded-full border-2 border-white shadow-sm cursor-pointer hover:opacity-90 flex items-center justify-center text-white font-bold text-xs">
              AZ
            </div>
          </div>
        </header>

        {/* --- WELCOME BANNER --- */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 mb-10 flex justify-between items-center relative overflow-hidden group">
           <div className="z-10 max-w-lg relative">
              <h1 className="text-3xl font-bold text-gn-primary mb-2">Welcome back, Azzam!</h1>
              <p className="text-gray-500 mb-6 text-sm">
                You have stored <span className="font-bold text-gn-primary">5 topics</span> this week! Keep up the good work.
              </p>
           </div>
           <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gn-soft to-transparent opacity-60 rounded-l-full blur-xl group-hover:opacity-80 transition duration-500"></div>
        </div>

        {/* --- RECENTLY VISITED --- */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-gn-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-gn-primary">Recently Visited</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FolderCard 
              title="My Business Ideas" 
              icon="🚀" 
              desc="A collection of my business ideas and concepts." 
              type="highlight" 
              onClick={() => handleFolderClick("My Business Ideas")}
              onMenuClick={() => handleOpenOption("My Business Ideas", true)}
            />
            <FolderCard 
              title="Uncategorized" 
              icon="📂" 
              desc="Temporary informal notes." 
              onClick={() => handleFolderClick("Uncategorized")}
              onMenuClick={() => handleOpenOption("Uncategorized")}
            />
            <FolderCard 
              title="Data Mining" 
              icon="💻" 
              desc="Notes exploring core concepts." 
              type="highlight" 
              onClick={() => handleFolderClick("Data Mining")}
              onMenuClick={() => handleOpenOption("Data Mining", true)}
            />
            <FolderCard 
              title="Coffee Roastery" 
              icon="☕" 
              desc="PLC system design notes." 
              onClick={() => handleFolderClick("Coffee Roastery")}
              onMenuClick={() => handleOpenOption("Coffee Roastery")}
            />
          </div>
        </section>

        {/* --- YOUR FOLDERS --- */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-xl font-bold text-gn-primary">Your Folders</h2>
                <p className="text-sm text-gray-400 mt-1">Sorted by Most Opened</p>
            </div>
            <button className="text-sm font-semibold text-gn-primary hover:underline hover:text-gn-secondary transition">View All</button>
          </div>

          <div className="bg-gn-soft/40 p-8 rounded-[2.5rem]">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <FolderCard 
                  title="Physics Notes" 
                  icon="⚛️" 
                  desc="Notes for semester 3 physics class." 
                  onClick={() => handleFolderClick("Physics Notes")}
                  onMenuClick={() => handleOpenOption("Physics Notes")}
                />
                
                <FolderCard 
                  title="Project Alpha" 
                  icon="📈" 
                  desc="Collaboration notes for the startup." 
                  onClick={() => handleFolderClick("Project Alpha")}
                  onMenuClick={() => handleOpenOption("Project Alpha")}
                />
                
                {/* Tombol Add New Folder */}
                <button 
                  onClick={() => setIsFolderModalOpen(true)} 
                  className="border-2 border-dashed border-gn-primary/30 rounded-3xl flex flex-col items-center justify-center min-h-[180px] hover:bg-white/60 hover:border-gn-primary transition group text-gn-primary cursor-pointer active:scale-95"
                >
                   <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 group-hover:bg-gn-primary group-hover:text-white transition duration-300 text-gn-primary">
                     <Plus size={24} />
                   </div>
                   <span className="text-sm font-bold">New Folder</span>
                </button>

             </div>
          </div>
        </section>

      </main>

      {/* --- MODALS --- */}
      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)} 
      />

      <OptionModal 
        isOpen={optionData.isOpen}
        title={optionData.title}
        isPinned={optionData.isPinned}
        onClose={() => setOptionData({ ...optionData, isOpen: false })}
      />
      
    </div>
  );
};

export default Dashboard;