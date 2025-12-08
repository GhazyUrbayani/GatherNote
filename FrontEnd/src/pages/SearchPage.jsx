import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchNoteCard from '../components/SearchNoteCard';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('Relevance');

  // Dummy Data (Sesuai Desain Hal 76)
  const searchResults = [
    { id: 1, title: "Data Mining Fundamentals", author: "Dr. Stone", rating: 4.8, reviews: 1823, status: "Done", views: "12k" },
    { id: 2, title: "Introduction to Machine Learning", author: "Andrew N.", rating: 4.9, reviews: 5402, status: "Ongoing", views: "45k" },
    { id: 3, title: "User Experience Design Patterns", author: "Sarah D.", rating: 4.5, reviews: 890, status: "Done", views: "5k" },
    { id: 4, title: "React JS for Beginners", author: "Code Master", rating: 4.7, reviews: 2100, status: "Done", views: "20k" },
    { id: 5, title: "Advanced Calculus II", author: "Math Wiz", rating: 4.2, reviews: 120, status: "Ongoing", views: "1.2k" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F8FF] font-sans">
      <Sidebar />

      <main className="flex-1 ml-20 p-8 md:p-12">
        {/* --- Header Search --- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gn-primary mb-6">Search Notes</h1>
          
          {/* Search Bar Besar */}
          <div className="relative mb-6">
             <div className="absolute top-1/2 left-6 -translate-y-1/2 text-gray-400">
                <Search size={24} />
             </div>
             <input 
               type="text" 
               placeholder="What do you want to learn today?" 
               className="w-full bg-white pl-16 pr-6 py-5 rounded-2xl border border-gray-200 focus:outline-none focus:border-gn-primary focus:ring-2 focus:ring-gn-soft text-lg shadow-sm transition-all"
             />
             <button className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-gn-primary text-white rounded-xl hover:bg-gn-primary/90 transition">
                <Filter size={20} />
             </button>
          </div>

          {/* Sort Tabs (Relevance, Newest, Views) */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-1">
            <span className="text-gray-400 font-medium mr-2">Sort by:</span>
            {['Relevance', 'Newest', 'Views'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-t-xl font-bold text-sm transition-all relative top-[1px] ${
                  activeTab === tab 
                    ? 'bg-white border border-gray-200 border-b-white text-gn-primary' 
                    : 'text-gray-400 hover:text-gn-primary'
                }`}
              >
                {tab}
              </button>
            ))}
            
            {/* Tombol Toggle Order (Asc/Desc) */}
            <button className="ml-auto p-2 text-gn-primary hover:bg-gn-soft rounded-lg">
                <ArrowUpDown size={18} />
            </button>
          </div>
        </div>

        {/* --- Search Results List --- */}
        <div className="space-y-4">
           {searchResults.map((note) => (
             <SearchNoteCard 
               key={note.id}
               {...note} // Mengoper semua data note sebagai props
               onClick={() => alert(`Saving "${note.title}" to your library...`)} // Placeholder aksi save
             />
           ))}
        </div>

        {/* Pagination Simple */}
        <div className="flex justify-center mt-10 gap-2">
            <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-50 text-gray-600">Previous</button>
            <button className="px-4 py-2 rounded-lg bg-gn-primary text-white font-bold">1</button>
            <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-50 text-gray-600">2</button>
            <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-50 text-gray-600">Next</button>
        </div>

      </main>
    </div>
  );
};

export default SearchPage;