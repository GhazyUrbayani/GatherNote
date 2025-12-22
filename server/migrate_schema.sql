-- =====================================================
-- MIGRATE Database Schema dari Struktur Lama ke Baru
-- =====================================================
-- IMPORTANT: Backup database dulu sebelum menjalankan!
-- mysqldump -u root -p gathernote_db > backup_before_migration.sql

USE gathernote_db;

-- 1. UPDATE TABEL USERS
ALTER TABLE users CHANGE user_id id INT AUTO_INCREMENT;
ALTER TABLE users CHANGE username name VARCHAR(255);
ALTER TABLE users DROP COLUMN IF EXISTS updated_at;

-- 2. UPDATE TABEL FOLDERS
ALTER TABLE folders CHANGE folder_id id INT AUTO_INCREMENT;
ALTER TABLE folders CHANGE user_id owner_id INT;
ALTER TABLE folders CHANGE topic description TEXT;
ALTER TABLE folders DROP COLUMN IF EXISTS updated_at;

-- 3. UPDATE TABEL NOTES
ALTER TABLE notes CHANGE note_id id INT AUTO_INCREMENT;
ALTER TABLE notes CHANGE user_id owner_id INT;
-- Update ENUM jika perlu (sesuaikan dengan nilai yang ada)
ALTER TABLE notes CHANGE note_status status ENUM('UNSTARTED','ONGOING','ARCHIVED') DEFAULT 'UNSTARTED';

-- 4. UPDATE TABEL GROUPS
ALTER TABLE groups CHANGE group_id id INT AUTO_INCREMENT;
ALTER TABLE groups CHANGE group_code join_code VARCHAR(100);
ALTER TABLE groups DROP COLUMN IF EXISTS created_by;
ALTER TABLE groups DROP COLUMN IF EXISTS updated_at;

-- 5. UPDATE TABEL GROUP_MEMBERS
ALTER TABLE group_members CHANGE member_id id INT AUTO_INCREMENT;

-- 6. UPDATE TABEL NOTE_COLLABORATORS
ALTER TABLE note_collaborators CHANGE collaborator_id id INT AUTO_INCREMENT;
ALTER TABLE note_collaborators CHANGE shared_at added_at DATETIME;

-- Verifikasi struktur tabel setelah migrasi
SHOW COLUMNS FROM users;
SHOW COLUMNS FROM folders;
SHOW COLUMNS FROM notes;
SHOW COLUMNS FROM groups;
SHOW COLUMNS FROM group_members;
SHOW COLUMNS FROM note_collaborators;
