'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { searchAPI } from '../lib/api';

interface SearchResult {
  id: number;
  title: string;
  content: string;
  created_at: string;
  folder_name?: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500); // Debounce 500ms

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setSearched(false);
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await searchAPI.searchNotes(searchQuery);
      
      if (response.notes) {
        setSearchResults(response.notes);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching notes:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getSnippet = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
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
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Searching...
            </div>
          ) : !searched ? (
            <div className="text-center py-12 text-gray-500">
              Masukkan kata kunci untuk mencari catatan Anda
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Tidak ada hasil untuk "{searchQuery}"
            </div>
          ) : (
            searchResults.map((result) => (
              <div
                key={result.id}
                onClick={() => router.push(`/note/${result.id}`)}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{result.title}</h3>
                  {result.folder_name && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {result.folder_name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{getSnippet(result.content)}</p>
                <span className="text-xs text-gray-400">{formatDate(result.created_at)}</span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
