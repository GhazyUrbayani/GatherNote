'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Search, FolderOpen, Users, LogOut, Settings } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="h-screen w-20 bg-[#1E3A8A] flex flex-col items-center py-6 fixed left-0 top-0 text-white z-50 shadow-xl">
      
      {/* Logo */}
      <div 
        className="mb-12 p-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition"
        onClick={() => router.push('/')}
      >
        <div className="w-8 h-8 bg-white rounded-sm"></div> 
      </div>

      {/* Menu Navigasi Utama */}
      <div className="flex flex-col gap-6 flex-1 w-full px-4">
        
        {/* Dashboard */}
        <NavItem 
          icon={<LayoutDashboard size={24} />} 
          active={isActive('/')} 
          onClick={() => router.push('/')} 
          tooltip="Dashboard"
        />

        {/* Search Page */}
        <NavItem 
          icon={<Search size={24} />} 
          active={isActive('/search')} 
          onClick={() => router.push('/search')} 
          tooltip="Search Notes"
        />

        {/* My Folders */}
        <NavItem 
          icon={<FolderOpen size={24} />} 
          active={isActive('/folders')} 
          onClick={() => router.push('/folders')} 
          tooltip="My Folders"
        />

        {/* Groups */}
        <NavItem 
          icon={<Users size={24} />} 
          active={isActive('/groups')} 
          onClick={() => router.push('/groups')} 
          tooltip="Community Groups"
        />

      </div>

      {/* Menu Bawah (Settings & Logout) */}
      <div className="mt-auto flex flex-col gap-6 w-full px-4">
        <NavItem 
          icon={<Settings size={24} />}
          onClick={() => setIsSettingsOpen(true)}
          tooltip="Settings"
        />
        
        <button className="p-3 hover:bg-red-500/80 rounded-xl transition flex justify-center text-white/70 hover:text-white cursor-pointer" title="Logout">
          <LogOut size={24} />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

// Komponen NavItem
interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  tooltip: string;
}

const NavItem = ({ icon, active, onClick, tooltip }: NavItemProps) => (
  <button 
    onClick={onClick}
    title={tooltip}
    className={`p-3 rounded-xl transition flex justify-center cursor-pointer ${
      active 
        ? 'bg-[#FFC107] text-[#1E3A8A] shadow-lg scale-105'
        : 'hover:bg-white/10 text-white/70 hover:text-white'
    }`}
  >
    {icon}
  </button>
);
