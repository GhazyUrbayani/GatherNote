'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, MoreVertical, Bold, Italic, Underline, List, AlignLeft, Image as ImageIcon, Save, Sparkles } from 'lucide-react';
import { aiAPI } from '../../lib/api';

export default function NoteEditor() {
  const router = useRouter();
  const params = useParams();
  
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  console.log("Editing note:", params.id);

  const handleSummarize = async () => {
    if (content.length < 50) {
      alert("Konten terlalu pendek untuk diringkas (minimal 50 karakter)");
      return;
    }

    setIsLoading(true);
    setShowSummary(true);
    setSummary("");

    try {
      const response = await aiAPI.summarizeNote(content, 'id');
      
      if (response.status === 'success') {
        setSummary(response.data.summary);
      } else {
        alert(response.message || "Gagal meringkas catatan");
        setShowSummary(false);
      }
    } catch (error) {
      console.error("Summarize error:", error);
      alert("Terjadi kesalahan saat meringkas catatan");
      setShowSummary(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F8FF]">
      
      {/* HEADER (Navigation & Title) */}
      <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full text-[#1E3A8A] transition cursor-pointer"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Title Input */}
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-bold text-[#1E3A8A] bg-transparent focus:outline-none focus:border-b-2 focus:border-[#FFC107] w-full max-w-md px-2"
          />
          
          {/* Save Status Indicator */}
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Save size={12} /> Saved
          </span>
        </div>

        {/* Action Buttons (Share & More) */}
        <div className="flex items-center gap-4">
          {/* Collaborators Avatar Group */}
          <div className="flex -space-x-2 mr-4">
             <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
             <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
          </div>

          <button 
            onClick={handleSummarize}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FFC107] to-[#FF9800] text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={18} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? 'Summarizing...' : '✨ Summarize'}
          </button>

          <button className="flex items-center gap-2 bg-[#1E3A8A]/10 text-[#1E3A8A] px-4 py-2 rounded-lg hover:bg-[#1E3A8A]/20 transition font-semibold text-sm cursor-pointer">
            <Share2 size={18} />
            Share
          </button>
          
          <button className="p-2 text-gray-400 hover:text-[#1E3A8A] cursor-pointer">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex items-center gap-2 overflow-x-auto">
        <ToolButton icon={<Bold size={18} />} />
        <ToolButton icon={<Italic size={18} />} />
        <ToolButton icon={<Underline size={18} />} />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <ToolButton icon={<AlignLeft size={18} />} />
        <ToolButton icon={<List size={18} />} />
        <div className="w-px h-6 bg-gray-300 mx-2"></div>
        <ToolButton icon={<ImageIcon size={18} />} />
        
        <select className="ml-auto bg-gray-50 border border-gray-200 text-sm rounded-md px-2 py-1 text-gray-600 focus:outline-none cursor-pointer">
            <option>Paragraph</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
        </select>
      </div>

      {/* EDITOR AREA (White Paper) */}
      <main className="flex-1 overflow-y-auto p-8 flex justify-center gap-6">
        <div className="bg-white w-full max-w-4xl min-h-[800px] shadow-sm rounded-xl p-12 relative">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your amazing notes here..."
                className="w-full h-full resize-none outline-none text-gray-700 leading-relaxed text-lg placeholder-gray-300"
            />
        </div>

        {/* AI SUMMARY PANEL */}
        {showSummary && (
          <div className="bg-gradient-to-br from-[#FFC107]/10 to-[#FF9800]/10 w-full max-w-md min-h-[800px] shadow-lg rounded-xl p-8 border-2 border-[#FFC107]/30 relative">
            <button 
              onClick={() => setShowSummary(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="text-[#FFC107]" />
              <h3 className="text-xl font-bold text-[#1E3A8A]">AI Summary</h3>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Sparkles size={48} className="text-[#FFC107] animate-spin" />
                <p className="text-gray-600">AI sedang meringkas catatan Anda...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br/>') }}
                />
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Sparkles size={12} className="text-[#FFC107]" />
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

// Tool Button Component
const ToolButton = ({ icon }: { icon: React.ReactNode }) => (
    <button className="p-2 text-gray-500 hover:bg-[#F5F8FF] hover:text-[#1E3A8A] rounded-md transition cursor-pointer">
        {icon}
    </button>
);
