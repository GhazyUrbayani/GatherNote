-- =====================================================
-- CHECK Database Schema - Cek struktur database saat ini
-- =====================================================
USE gathernote_db;
-- Cek struktur semua tabel
SELECT 'Users table:' as info;
SHOW COLUMNS
FROM users;
SELECT 'Folders table:' as info;
SHOW COLUMNS
FROM folders;
SELECT 'Notes table:' as info;
SHOW COLUMNS
FROM notes;
SELECT 'Groups table:' as info;
SHOW COLUMNS
FROM groups;
SELECT 'Group Members table:' as info;
SHOW COLUMNS
FROM group_members;
SELECT 'Note Collaborators table:' as info;
SHOW COLUMNS
FROM note_collaborators;
-- Cek sample data
SELECT 'Sample user:' as info;
SELECT *
FROM users
LIMIT 1;