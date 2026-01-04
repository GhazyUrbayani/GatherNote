-- Migration: Create note_share_links table
-- Run this SQL on your database
CREATE TABLE IF NOT EXISTS note_share_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT NOT NULL,
    share_token VARCHAR(64) NOT NULL UNIQUE,
    permission VARCHAR(50) NOT NULL DEFAULT 'view',
    expires_at DATETIME DEFAULT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_share_token (share_token),
    INDEX idx_note_id (note_id)
);