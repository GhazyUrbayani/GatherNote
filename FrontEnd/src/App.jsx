import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FolderDetail from './pages/FolderDetail';
import NoteEditor from './pages/NoteEditor';
import SearchPage from './pages/SearchPage';
import GroupList from './pages/GroupList';
import MyFolders from './pages/MyFolders'; // 1. Import ini

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/folders" element={<MyFolders />} /> {/* 2. Tambahkan Route ini */}
      <Route path="/folder/:folderId" element={<FolderDetail />} />
      <Route path="/note/:noteId" element={<NoteEditor />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/groups" element={<GroupList />} />
    </Routes>
  );
}

export default App;