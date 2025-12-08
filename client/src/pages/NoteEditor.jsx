import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, MoreVertical, Bold, Italic, Underline, List, AlignLeft, Image as ImageIcon, Save } from 'lucide-react';

const NoteEditor = () => {
  const navigate = useNavigate();
  const { noteId } = useParams(); // Mengambil ID dari URL
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");

  console.log("Membuka folder dengan ID:", noteId);

  return (
    <div className="flex flex-col h-screen bg-[#F5F8FF] font-sans">
      
      {/* --- 1. HEADER (Navigation & Title) --- */}
      <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
            className="p-2 hover:bg-gray-100 rounded-full text-gn-primary transition"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Title Input */}
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold text-gn-primary bg-transparent focus:outline-none focus:border-b-2 focus:border-gn-secondary w-full max-w-md px-2"
          />
          
          {/* Indikator Status Simpan */}
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Save size={12} /> Saved
          </span>
        </div>

        {/* Action Buttons (Share & Profile) */}
        <div className="flex items-center gap-4">
          {/* Collaborators Avatar Group (Dummy) */}
          <div className="flex -space-x-2 mr-4">
             <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
             <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
          </div>

          <button className="flex items-center gap-2 bg-gn-primary/10 text-gn-primary px-4 py-2 rounded-lg hover:bg-gn-primary/20 transition font-semibold text-sm">
            <Share2 size={18} />
            Share
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gn-primary">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      {/* --- 2. TOOLBAR --- */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 overflow-x-auto">
        <ToolButton icon={<Bold size={18} />} />
        <ToolButton icon={<Italic size={18} />} />
        <ToolButton icon={<Underline size={18} />} />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <ToolButton icon={<AlignLeft size={18} />} />
        <ToolButton icon={<List size={18} />} />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <ToolButton icon={<ImageIcon size={18} />} />
        
        <select className="ml-auto bg-gray-50 border border-gray-200 text-sm rounded-md px-2 py-1 text-gray-600 focus:outline-none">
            <option>Paragraph</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
        </select>
      </div>

      {/* --- 3. EDITOR AREA (Kertas Putih) --- */}
      <main className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="bg-white w-full max-w-4xl min-h-[800px] shadow-sm rounded-xl p-12 relative">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your amazing notes here..."
                className="w-full h-full resize-none outline-none text-gray-700 leading-relaxed text-lg placeholder-gray-300"
            />
        </div>
      </main>

    </div>
  );
};

// Komponen Kecil untuk Tombol Toolbar
const ToolButton = ({ icon }) => (
    <button className="p-2 text-gray-500 hover:bg-gn-soft hover:text-gn-primary rounded-md transition">
        {icon}
    </button>
);

export default NoteEditor;