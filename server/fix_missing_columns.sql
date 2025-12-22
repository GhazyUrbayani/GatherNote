-- =====================================================
-- FIX NOTES TABLE - Add missing columns if not exist
-- Run this on production database
-- =====================================================
USE gathernote_db;
-- Add missing columns to notes table if they don't exist
-- MySQL doesn't have IF NOT EXISTS for columns, so use stored procedure
DELIMITER // CREATE PROCEDURE add_column_if_not_exists() BEGIN -- Check and add priority column
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'priority'
) THEN
ALTER TABLE notes
ADD COLUMN priority VARCHAR(50) DEFAULT NULL;
END IF;
-- Check and add progress column
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'progress'
) THEN
ALTER TABLE notes
ADD COLUMN progress INT DEFAULT NULL;
END IF;
-- Check and add is_favorite column
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'is_favorite'
) THEN
ALTER TABLE notes
ADD COLUMN is_favorite BOOLEAN NOT NULL DEFAULT FALSE;
END IF;
-- Check and add note_visibility column
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'note_visibility'
) THEN
ALTER TABLE notes
ADD COLUMN note_visibility ENUM('private', 'public', 'group') DEFAULT 'private';
END IF;
-- Check and add note_status column (if doesn't exist)
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'note_status'
) THEN -- Check if old 'status' column exists
IF EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'notes'
        AND COLUMN_NAME = 'status'
) THEN
ALTER TABLE notes CHANGE status note_status ENUM('UNSTARTED', 'ONGOING', 'ARCHIVED') DEFAULT 'UNSTARTED';
ELSE
ALTER TABLE notes
ADD COLUMN note_status ENUM('UNSTARTED', 'ONGOING', 'ARCHIVED') DEFAULT 'UNSTARTED';
END IF;
END IF;
-- Check and add is_pinned to folders table
IF NOT EXISTS (
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'folders'
        AND COLUMN_NAME = 'is_pinned'
) THEN
ALTER TABLE folders
ADD COLUMN is_pinned BOOLEAN NOT NULL DEFAULT FALSE;
END IF;
END // DELIMITER;
-- Run the procedure
CALL add_column_if_not_exists();
-- Clean up
DROP PROCEDURE IF EXISTS add_column_if_not_exists;
-- Verify the changes
SELECT 'Notes table columns:' AS info;
SHOW COLUMNS
FROM notes;
SELECT 'Folders table columns:' AS info;
SHOW COLUMNS
FROM folders;