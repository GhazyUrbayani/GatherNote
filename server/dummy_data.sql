-- =====================================================
-- GatherNote Dummy Data SQL
-- Database: MySQL/MariaDB
-- Purpose: Test data untuk integrasi FE-BE
-- =====================================================
-- 1. USERS - Data Pengguna Dummy
INSERT INTO users (
        user_id,
        username,
        email,
        password_hash,
        created_at,
        updated_at
    )
VALUES (
        1,
        'daffa_student',
        'daffa@itb.ac.id',
        '$2a$10$X5qJv3ZJ9Z5qJv3ZJ9Z5qu1J9Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3Z',
        NOW(),
        NOW()
    ),
    (
        2,
        'azzam_mahasiswa',
        'azzam@itb.ac.id',
        '$2a$10$Y6rKw4AL0A6rKw4AL0A6rv2K0A6rKw4AL0A6rKw4AL0A6rKw4A',
        NOW(),
        NOW()
    ),
    (
        3,
        'siti_scholar',
        'siti@itb.ac.id',
        '$2a$10$Z7sLx5BM1B7sLx5BM1B7sw3L1B7sLx5BM1B7sLx5BM1B7sLx5B',
        NOW(),
        NOW()
    );
-- 2. FOLDERS - Folder Organisasi Catatan
INSERT INTO folders (
        folder_id,
        user_id,
        name,
        topic,
        created_at,
        updated_at
    )
VALUES (
        1,
        1,
        'My Business Ideas',
        'Entrepreneurship',
        NOW(),
        NOW()
    ),
    (
        2,
        1,
        'Data Mining',
        'Data Science',
        NOW(),
        NOW()
    ),
    (3, 1, 'Uncategorized', 'General', NOW(), NOW()),
    (
        4,
        2,
        'Sistem Terdistribusi',
        'TST Course',
        NOW(),
        NOW()
    ),
    (5, 2, 'Personal Notes', 'Life', NOW(), NOW()),
    (
        6,
        3,
        'Research Papers',
        'Academic',
        NOW(),
        NOW()
    );
-- 3. NOTES - Catatan dengan Konten Panjang untuk AI Summarizer
INSERT INTO notes (
        note_id,
        folder_id,
        user_id,
        title,
        content,
        status,
        created_at,
        updated_at
    )
VALUES (
        1,
        4,
        2,
        'Pengenalan Sistem Terdistribusi',
        '# Sistem Terdistribusi

Sistem terdistribusi adalah sistem di mana komponen-komponen perangkat keras atau perangkat lunak yang terletak pada komputer yang terhubung jaringan berkomunikasi dan mengkoordinasikan tindakan mereka hanya dengan mengirimkan pesan.

## Karakteristik Utama

1. **Transparansi**: Pengguna tidak menyadari bahwa sistem terdiri dari beberapa komponen yang terpisah secara fisik.
   - Transparansi akses: Cara mengakses resource lokal dan remote sama
   - Transparansi lokasi: User tidak perlu tahu di mana resource berada
   - Transparansi migrasi: Resource dapat dipindahkan tanpa mengubah cara akses

2. **Skalabilitas**: Kemampuan sistem untuk tetap efektif ketika jumlah pengguna atau resource bertambah.
   - Skalabilitas ukuran: Dapat menambah user dan resource
   - Skalabilitas geografis: Dapat tersebar di area yang luas
   - Skalabilitas administratif: Mudah dikelola walaupun besar

3. **Keandalan (Reliability)**: Sistem dapat terus beroperasi meskipun ada komponen yang gagal.
   - Fault tolerance: Sistem tetap berfungsi walau ada kegagalan
   - High availability: Sistem selalu tersedia untuk digunakan
   - Recoverability: Dapat pulih dari kegagalan

## Contoh Implementasi
- Google Drive (File Storage Distributed)
- WhatsApp (Messaging Distributed System)
- Netflix (Video Streaming dengan CDN)

## Tantangan
- Sinkronisasi data antar node
- Network latency dan bandwidth
- Security dan privacy dalam sistem terbuka',
        'completed',
        NOW(),
        NOW()
    ),
    (
        2,
        1,
        1,
        'Ide Startup: EduTech Platform',
        '# Konsep Startup EduTech

## Problem Statement
Mahasiswa Indonesia kesulitan mengakses materi kuliah berkualitas dan terstruktur. Banyak yang mengandalkan PPT dosen yang tidak lengkap atau video YouTube yang random.

## Solution
Platform e-learning berbasis AI yang:
1. Mengumpulkan catatan kuliah dari mahasiswa terbaik
2. AI otomatis menyusun materi dari berbagai sumber
3. Personalisasi learning path sesuai kemampuan user
4. Gamifikasi untuk meningkatkan engagement

## Target Market
- Mahasiswa S1 di universitas tier 2-3
- Usia 18-22 tahun
- Tertarik belajar online tapi butuh struktur

## Revenue Model
- Freemium: Basic content gratis
- Premium: Rp 99k/bulan untuk akses penuh
- B2B: Jual lisensi ke kampus

## Kompetitor
- Ruangguru (fokus SMA)
- Coursera (terlalu mahal)
- YouTube (tidak terstruktur)

## Unique Selling Point
AI yang bisa "mengerti" gaya belajar mahasiswa Indonesia dan konten dibuat oleh mahasiswa untuk mahasiswa.

## Next Steps
1. Buat MVP dengan 3 mata kuliah
2. Test ke 100 mahasiswa ITB
3. Improve based on feedback
4. Pitch ke investor',
        'ongoing',
        NOW(),
        NOW()
    ),
    (
        3,
        2,
        1,
        'Catatan Kuliah: Decision Tree Algorithm',
        '# Decision Tree - Machine Learning

Decision Tree adalah salah satu algoritma supervised learning yang populer untuk klasifikasi dan regresi.

## Cara Kerja
1. Algoritma memilih atribut terbaik untuk memisahkan data
2. Membuat node dengan atribut tersebut
3. Membagi data berdasarkan nilai atribut
4. Ulangi proses untuk setiap subset data

## Kriteria Pemilihan Atribut
- **Information Gain**: Mengukur penurunan entropy
- **Gini Index**: Mengukur ketidakmurnian data
- **Gain Ratio**: Information gain yang dinormalisasi

## Contoh Kasus
Klasifikasi apakah seseorang akan membeli laptop:
- Atribut: Gaji, Usia, Status Pekerjaan
- Target: Beli (Yes/No)

## Kelebihan
- Mudah dipahami dan divisualisasikan
- Tidak perlu normalisasi data
- Bisa handle data numerik dan kategorikal

## Kekurangan
- Mudah overfitting
- Tidak stabil (perubahan kecil data bisa ubah tree)
- Bias terhadap atribut dengan banyak nilai

## Cara Mengatasi Overfitting
- Pruning (memotong cabang yang tidak penting)
- Set minimum samples per leaf
- Limit maximum depth',
        'completed',
        NOW(),
        NOW()
    ),
    (
        4,
        3,
        1,
        'Todo List Minggu Ini',
        '# Task Week 12

## Academic
- [ ] Selesaikan tugas TST tentang Cloudflare Tunnel
- [ ] Baca paper untuk mata kuliah Riset Operasi
- [ ] Prepare presentation Entrepreneurship

## Personal
- [ ] Olahraga minimal 3x seminggu
- [ ] Meeting dengan tim startup
- [ ] Belanja bulanan

## Deadline Penting
- 15 Des: Submit laporan TST
- 18 Des: Presentasi RO
- 20 Des: Pitch startup competition',
        'ongoing',
        NOW(),
        NOW()
    ),
    (
        5,
        5,
        2,
        'Refleksi Semester 7',
        '# Semester 7 Reflection

Semester ini cukup berat karena ambil 24 SKS. Tapi banyak pelajaran yang didapat:

1. Time management is everything
2. Collaboration > Competition
3. Ask for help when stuck
4. Self-care is not selfish

Mata kuliah favorit: Sistem Terdistribusi karena dosennya asik dan materinya applicable.

Target semester depan: IPK 3.7+',
        'unstarted',
        NOW(),
        NOW()
    ),
    (
        6,
        4,
        2,
        'Konsep Cloud Computing',
        '# Cloud Computing Fundamentals

Cloud computing adalah delivery of computing services over the internet.

## Service Models
1. IaaS (Infrastructure as a Service): Virtual machines, storage
2. PaaS (Platform as a Service): Development platform
3. SaaS (Software as a Service): Ready-to-use applications

## Deployment Models
- Public Cloud: Available to general public
- Private Cloud: Used by single organization
- Hybrid Cloud: Combination of public and private

## Keuntungan
- Cost savings (pay as you go)
- Scalability
- Global reach
- High availability

## Provider Utama
- AWS (Amazon Web Services)
- Google Cloud Platform
- Microsoft Azure',
        'completed',
        NOW(),
        NOW()
    );
-- 4. GROUPS - Komunitas Belajar
INSERT INTO groups (
        group_id,
        name,
        description,
        group_code,
        created_by,
        created_at,
        updated_at
    )
VALUES (
        1,
        'Study Group TST 2025',
        'Grup belajar mata kuliah Teknologi Sistem Terintegrasi',
        'TST2025AB',
        2,
        NOW(),
        NOW()
    ),
    (
        2,
        'Entrepreneur Club ITB',
        'Komunitas mahasiswa yang tertarik dengan startup',
        'ENTRCLUB',
        1,
        NOW(),
        NOW()
    ),
    (
        3,
        'Data Science Enthusiast',
        'Belajar bareng tentang ML, AI, dan Data Mining',
        'DATASCIENCE',
        1,
        NOW(),
        NOW()
    );
-- 5. GROUP MEMBERS - Anggota Grup
INSERT INTO group_members (member_id, group_id, user_id, role, joined_at)
VALUES (1, 1, 2, 'admin', NOW()),
    (2, 1, 3, 'member', NOW()),
    (3, 2, 1, 'admin', NOW()),
    (4, 2, 2, 'member', NOW()),
    (5, 3, 1, 'admin', NOW());
-- 6. NOTE COLLABORATORS - Kolaborasi Catatan
INSERT INTO note_collaborators (
        collaborator_id,
        note_id,
        user_id,
        permission,
        shared_at
    )
VALUES (1, 1, 3, 'view', NOW()),
    (2, 2, 2, 'edit', NOW()),
    (3, 3, 2, 'view', NOW());
-- =====================================================
-- VERIFICATION QUERIES (untuk cek data sudah masuk)
-- =====================================================
-- Cek jumlah data
-- SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
-- UNION ALL
-- SELECT 'Folders', COUNT(*) FROM folders
-- UNION ALL
-- SELECT 'Notes', COUNT(*) FROM notes
-- UNION ALL
-- SELECT 'Groups', COUNT(*) FROM groups
-- UNION ALL
-- SELECT 'Group Members', COUNT(*) FROM group_members
-- UNION ALL
-- SELECT 'Collaborators', COUNT(*) FROM note_collaborators;
-- =====================================================
-- NOTES UNTUK DEVELOPER
-- =====================================================
-- 1. Password hash di atas adalah dummy, di production gunakan bcrypt yang benar
-- 2. Sesuaikan AUTO_INCREMENT jika database sudah punya data
-- 3. Test AI Summarizer dengan note_id 1, 2, 3, 6 (konten panjang)
-- 4. Note 4 dan 5 terlalu pendek untuk di-summarize (will return error 400)