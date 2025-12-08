import React from 'react';
import { LayoutDashboard, Search, FolderOpen, Users, LogOut, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi cek menu aktif
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-20 bg-gn-primary flex flex-col items-center py-6 fixed left-0 top-0 text-white z-50 shadow-xl">
      
      {/* 1. Logo (Klik balik ke Home) */}
      <div 
        className="mb-12 p-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition"
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 bg-white rounded-sm"></div> 
      </div>

      {/* 2. Menu Navigasi Utama */}
      <div className="flex flex-col gap-6 flex-1 w-full px-4">
        
        {/* A. Dashboard */}
        <NavItem 
          icon={<LayoutDashboard size={24} />} 
          active={isActive('/')} 
          onClick={() => navigate('/')} 
          tooltip="Dashboard"
        />

        {/* B. Search Page */}
        <NavItem 
          icon={<Search size={24} />} 
          active={isActive('/search')} 
          onClick={() => navigate('/search')} 
          tooltip="Search Notes"
        />

        {/* C. My Folders (Arahkan ke Dashboard karena Folders ada di sana) */}
        <NavItem 
          icon={<FolderOpen size={24} />} 
          active={isActive('/folders')} // Aktif jika URL adalah /folders
          onClick={() => navigate('/folders')} // Pindah ke halaman MyFolders
          tooltip="My Folders"
        />

        {/* D. Groups (Hanya SATU icon Users) */}
        <NavItem 
          icon={<Users size={24} />} 
          active={isActive('/groups')} 
          onClick={() => navigate('/groups')} 
          tooltip="Community Groups"
        />

      </div>

      {/* 3. Menu Bawah (Settings & Logout) */}
      <div className="mt-auto flex flex-col gap-6 w-full px-4">
        <NavItem 
          icon={<Settings size={24} />} 
          tooltip="Settings"
        />
        
        <button className="p-3 hover:bg-red-500/80 rounded-xl transition flex justify-center text-white/70 hover:text-white" title="Logout">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

// Komponen Tombol Kecil
const NavItem = ({ icon, active, onClick, tooltip }) => (
  <button 
    onClick={onClick}
    title={tooltip}
    className={`p-3 rounded-xl transition flex justify-center ${
      active 
        ? 'bg-gn-secondary text-gn-primary shadow-lg scale-105' // Style Aktif
        : 'hover:bg-white/10 text-white/70 hover:text-white'    // Style Pasif
    }`}
  >
    {icon}
  </button>
);

export default Sidebar;