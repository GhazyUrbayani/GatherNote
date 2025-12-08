import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FolderCard from '../components/FolderCard';
import CreateFolderModal from '../components/CreateFolderModal';
import { Bell, Plus, Search, Filter } from 'lucide-react';

const MyFolders = () => {
  const navigate = useNavigate();
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  // Handler navigasi ke detail
  const handleFolderClick = (folderName) => {
    const slug = folderName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/folder/${slug}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] font-sans relative">
      <Sidebar />

      <main className="flex-1 ml-20 p-8 md:p-12">
        
        {/* --- HEADER (Sama seperti Dashboard) --- */}
        <header className="flex justify-between items-center mb-10">
          <div className="w-1/3 relative">
             <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
                <Search size={20} />
             </div>
             <input 
               type="text" 
               placeholder="Search your folders..." 
               className="w-full bg-white pl-12 pr-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gn-primary text-sm shadow-sm"
             />
          </div>
          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-white rounded-full transition text-gray-500 hover:text-gn-primary">
              <Bell size={22} />
            </button>
            <div className="w-10 h-10 bg-gn-primary rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs">
              AZ
            </div>
          </div>
        </header>

        {/* --- TITLE SECTION --- */}
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gn-primary">Your Folders</h1>
                <p className="text-gray-500 mt-1">Manage and organize all your collections</p>
            </div>
            
            {/* Tombol Filter Sederhana */}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gn-primary hover:border-gn-primary transition text-sm font-semibold">
                <Filter size={18} />
                Filter / Sort
            </button>
        </div>

        {/* --- FOLDER GRID --- */}
        {/* Desain Halaman 71: Langsung Grid Folder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Tombol Add New Folder (Paling Kiri Atas agar mudah diakses) */}
            <button 
                onClick={() => setIsFolderModalOpen(true)} 
                className="border-2 border-dashed border-gn-primary/30 rounded-3xl flex flex-col items-center justify-center min-h-[180px] hover:bg-white/60 hover:border-gn-primary transition group text-gn-primary cursor-pointer active:scale-95 bg-gn-soft/20"
            >
                <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 group-hover:bg-gn-primary group-hover:text-white transition duration-300 text-gn-primary">
                    <Plus size={24} />
                </div>
                <span className="text-sm font-bold">New Folder</span>
            </button>

            {/* Daftar Folder */}
            <FolderCard 
                title="My Business Ideas" 
                icon="🚀" 
                desc="Business concepts & startup plans." 
                type="highlight"
                onClick={() => handleFolderClick("My Business Ideas")}
            />
            
            <FolderCard 
                title="Uncategorized" 
                icon="📂" 
                desc="Temporary notes." 
                onClick={() => handleFolderClick("Uncategorized")}
            />
            
            <FolderCard 
                title="Data Mining" 
                icon="💻" 
                desc="Core concepts & algorithms." 
                type="highlight"
                onClick={() => handleFolderClick("Data Mining")}
            />
            
            <FolderCard 
                title="Coffee Roastery" 
                icon="☕" 
                desc="PLC system design." 
                onClick={() => handleFolderClick("Coffee Roastery")}
            />

            <FolderCard 
                title="Physics Notes" 
                icon="⚛️" 
                desc="Semester 3 materials." 
                onClick={() => handleFolderClick("Physics Notes")}
            />

            <FolderCard 
                title="Project Alpha" 
                icon="📈" 
                desc="Collaboration notes." 
                onClick={() => handleFolderClick("Project Alpha")}
            />
        </div>

      </main>

      {/* Modal */}
      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)} 
      />
    </div>
  );
};

export default MyFolders;