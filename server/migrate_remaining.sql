-- =====================================================
-- MIGRATE Database Schema - Update bagian yang masih format lama
-- =====================================================
-- IMPORTANT: Backup database dulu!
-- mysqldump -u root -p gathernote_db > backup.sql
USE gathernote_db;
-- STEP 1: Update data dulu sebelum mengubah struktur
-- Convert enum values dari lowercase ke uppercase
UPDATE notes
SET note_status = 'UNSTARTED'
WHERE note_status = 'unstarted';
UPDATE notes
SET note_status = 'ONGOING'
WHERE note_status = 'ongoing';
UPDATE notes
SET note_status = 'ARCHIVED'
WHERE note_status = 'completed'
    OR note_status = 'archived';
-- STEP 2: Ubah struktur kolom
-- 1. UPDATE TABEL NOTES - Ubah note_status jadi status (uppercase enum)
ALTER TABLE notes CHANGE note_status status ENUM('UNSTARTED', 'ONGOING', 'ARCHIVED') DEFAULT 'UNSTARTED';
-- 2. UPDATE TABEL NOTES - Ubah note_visibility jadi visibility
ALTER TABLE notes CHANGE note_visibility visibility ENUM('private', 'public', 'group') DEFAULT 'private';
-- 3. UPDATE TABEL GROUPS - Ubah group_id jadi id
ALTER TABLE groups CHANGE group_id id INT AUTO_INCREMENT;
-- 4. UPDATE TABEL GROUPS - Ubah group_code jadi join_code
ALTER TABLE groups CHANGE group_code join_code VARCHAR(100);
-- 5. UPDATE TABEL GROUPS - Hapus kolom created_by
ALTER TABLE groups DROP COLUMN IF EXISTS created_by;
-- 6. UPDATE TABEL GROUPS - Hapus kolom updated_at
ALTER TABLE groups DROP COLUMN IF EXISTS updated_at;
-- 7. UPDATE TABEL GROUP_MEMBERS - Ubah member_id jadi id
ALTER TABLE group_members CHANGE member_id id INT AUTO_INCREMENT;
-- 8. UPDATE TABEL NOTE_COLLABORATORS - Ubah collaborator_id jadi id
ALTER TABLE note_collaborators CHANGE collaborator_id id INT AUTO_INCREMENT;
-- 9. UPDATE TABEL NOTE_COLLABORATORS - Ubah shared_at jadi added_at
ALTER TABLE note_collaborators CHANGE shared_at added_at DATETIME;
-- Verifikasi hasil migration
SELECT '=== MIGRATION COMPLETE ===' as '';
SELECT 'Notes table:' as '';
SHOW COLUMNS
FROM notes;
SELECT 'Groups table:' as '';
SHOW COLUMNS
FROM groups;
SELECT 'Group Members table:' as '';
SHOW COLUMNS
FROM group_members;
SELECT 'Note Collaborators table:' as '';
SHOW COLUMNS
FROM note_collaborators;