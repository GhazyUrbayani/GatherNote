-- =====================================================
-- UPDATE Password untuk User Dummy
-- Hash Password: password123
-- =====================================================
UPDATE users
SET password_hash = '$2b$10$WpHn/2IYT7PsXOk1W7sBfOJg4sypHdsJ78lbLTiRmMyviwCn/v7OG'
WHERE email IN (
        'daffa@itb.ac.id',
        'azzam@itb.ac.id',
        'siti@itb.ac.id'
    );
-- Verifikasi hasil (gunakan nama kolom lama untuk kompatibilitas)
SELECT user_id,
    username,
    email,
    LEFT(password_hash, 20) as password_preview
FROM users
WHERE email IN (
        'daffa@itb.ac.id',
        'azzam@itb.ac.id',
        'siti@itb.ac.id'
    );