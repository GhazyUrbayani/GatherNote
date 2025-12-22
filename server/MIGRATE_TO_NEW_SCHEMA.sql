-- =====================================================
-- MIGRATE Database Schema dari Struktur Lama ke Baru
-- Script ini aman dijalankan berkali-kali
-- =====================================================
-- IMPORTANT: Backup database dulu sebelum menjalankan!
-- mysqldump -u root -p gathernote_db > backup.sql
USE gathernote_db;
-- Tampilkan struktur tabel saat ini
SELECT 'Current Users table structure:' as '';
SHOW COLUMNS
FROM users;
SELECT 'Current Folders table structure:' as '';
SHOW COLUMNS
FROM folders;
SELECT 'Current Notes table structure:' as '';
SHOW COLUMNS
FROM notes;
SELECT 'Current Groups table structure:' as '';
SHOW COLUMNS
FROM groups;
-- =====================================================
-- CATATAN: Setelah melihat output di atas, 
-- uncomment dan jalankan query yang sesuai di bawah ini
-- =====================================================
-- 1. UPDATE TABEL USERS (uncomment jika kolom masih user_id dan username)
-- ALTER TABLE users CHANGE user_id id INT AUTO_INCREMENT;
-- ALTER TABLE users CHANGE username name VARCHAR(255);
-- ALTER TABLE users DROP COLUMN IF EXISTS updated_at;
-- 2. UPDATE TABEL FOLDERS (uncomment jika kolom masih folder_id dan user_id)
-- ALTER TABLE folders CHANGE folder_id id INT AUTO_INCREMENT;
-- ALTER TABLE folders CHANGE user_id owner_id INT;
-- ALTER TABLE folders DROP COLUMN IF EXISTS updated_at;
-- 3. UPDATE TABEL NOTES (uncomment jika kolom masih note_id dan user_id)
-- ALTER TABLE notes CHANGE note_id id INT AUTO_INCREMENT;
-- ALTER TABLE notes CHANGE user_id owner_id INT;
-- ALTER TABLE notes CHANGE note_status status ENUM('UNSTARTED','ONGOING','ARCHIVED') DEFAULT 'UNSTARTED';
-- 4. UPDATE TABEL GROUPS (uncomment jika kolom masih group_id)
-- ALTER TABLE groups CHANGE group_id id INT AUTO_INCREMENT;
-- ALTER TABLE groups DROP COLUMN IF EXISTS created_by;
-- ALTER TABLE groups DROP COLUMN IF EXISTS updated_at;
-- 5. UPDATE TABEL GROUP_MEMBERS (uncomment jika kolom masih member_id)
-- ALTER TABLE group_members CHANGE member_id id INT AUTO_INCREMENT;
-- 6. UPDATE TABEL NOTE_COLLABORATORS (uncomment jika kolom masih collaborator_id)
-- ALTER TABLE note_collaborators CHANGE collaborator_id id INT AUTO_INCREMENT;
-- ALTER TABLE note_collaborators CHANGE shared_at added_at DATETIME;