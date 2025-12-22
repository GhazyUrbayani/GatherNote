'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, Heart, Users, Target, RefreshCw, ExternalLink } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { integrationAPI } from '../lib/api';

interface Campaign {
  id: number;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  image?: string;
  category?: string;
  creator?: string;
  end_date?: string;
  status?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

export default function CrowdFundingPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('trending');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [campaignsRes, categoriesRes] = await Promise.all([
        integrationAPI.getCampaigns(activeFilter),
        integrationAPI.getCategories()
      ]);

      if (campaignsRes.data) {
        setCampaigns(campaignsRes.data);
      }
      
      if (categoriesRes.categories) {
        setCategories(categoriesRes.categories);
      }
    } catch (err) {
      console.error('Error fetching crowdfunding data:', err);
      setError('Failed to load data from CrowdFunding API');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FF]">
      <Sidebar />
      
      <main className="flex-1 ml-20 p-8 md:p-12">
        {/* Header */}
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-[#1E3A8A] hover:text-[#1E3A8A]/70 mb-6 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Title Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A] flex items-center gap-3">
              <Heart className="text-red-500" />
              CrowdFunding Projects
            </h1>
            <p className="text-gray-500 mt-2">
              Data from external API: <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">cisitufc.fun</span>
            </p>
          </div>
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-full hover:bg-[#1E3A8A]/90 transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { key: 'trending', label: 'Trending', icon: TrendingUp },
            { key: 'new', label: 'Newest', icon: RefreshCw },
            { key: 'urgent', label: 'Ending Soon', icon: Target },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition cursor-pointer ${
                activeFilter === key
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            <p className="font-medium">⚠️ {error}</p>
            <p className="text-sm mt-1">Please check if the external API is available.</p>
          </div>
        )}

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#1E3A8A] rounded-full"></span>
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-[#F5F8FF] transition cursor-pointer"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading Skeleton
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : campaigns.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Heart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No campaigns found</p>
              <p className="text-sm text-gray-400 mt-2">
                The external API might be unavailable or returned empty data.
              </p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                {/* Campaign Image */}
                <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                  {campaign.image ? (
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Heart size={48} className="text-white/50" />
                    </div>
                  )}
                  {campaign.category && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-xs font-medium text-gray-700 rounded-full">
                      {campaign.category}
                    </span>
                  )}
                </div>

                {/* Campaign Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{campaign.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {campaign.description || 'No description available'}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(calculateProgress(campaign.current_amount || 0, campaign.target_amount || 1))} transition-all duration-500`}
                        style={{ width: `${calculateProgress(campaign.current_amount || 0, campaign.target_amount || 1)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-[#1E3A8A]">
                        {formatCurrency(campaign.current_amount || 0)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        of {formatCurrency(campaign.target_amount || 0)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {calculateProgress(campaign.current_amount || 0, campaign.target_amount || 1).toFixed(0)}%
                      </p>
                      <p className="text-gray-400 text-xs">funded</p>
                    </div>
                  </div>

                  {/* Creator & Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    {campaign.creator && (
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{campaign.creator}</span>
                      </div>
                    )}
                    <a
                      href={`http://cisitufc.fun/campaigns/${campaign.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#1E3A8A] hover:underline"
                    >
                      View <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* API Info Footer */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3">🔗 API Integration Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Source API:</p>
              <code className="text-[#1E3A8A] bg-gray-50 px-2 py-1 rounded">http://cisitufc.fun</code>
            </div>
            <div>
              <p className="text-gray-500">Endpoints Used:</p>
              <ul className="text-gray-600 list-disc list-inside">
                <li><code>/api/campaigns/</code></li>
                <li><code>/api/categories/</code></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
