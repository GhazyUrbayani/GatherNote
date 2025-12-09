'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const searchResults = [
    { id: 1, title: 'Meeting Notes', snippet: 'Important discussion about project timeline...', date: '2 days ago' },
    { id: 2, title: 'Research Ideas', snippet: 'Ideas for data mining research paper...', date: '1 week ago' },
  ];

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

        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8">Search Notes</h1>

        <div className="relative mb-8">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
            <SearchIcon size={20} />
          </div>
          <input
            type="text"
            placeholder="Search your notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] text-base shadow-sm cursor-text"
          />
        </div>

        <div className="space-y-4">
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => router.push(`/note/${result.id}`)}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">{result.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{result.snippet}</p>
              <span className="text-xs text-gray-400">{result.date}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
