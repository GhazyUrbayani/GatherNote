# 🗄️ Import Dummy Data ke Database

## Prasyarat

- MySQL client terinstall
- Akses ke database GatherNote
- File `dummy_data.sql` sudah ada

## Cara Import

### Option 1: Via MySQL Command Line

```bash
# Masuk ke direktori server
cd server

# Login ke MySQL
mysql -h 114.122.72.222 -u cisitufcjaya_db -p

# Akan minta password, masukkan: admin

# Pilih database
USE gathernote_db;

# Import file SQL
source dummy_data.sql;

# Atau jika source tidak work, gunakan:
\. dummy_data.sql

# Keluar
exit;
```

### Option 2: Direct Command (One-liner)

```bash
mysql -h 114.122.72.222 -u cisitufcjaya_db -p gathernote_db < dummy_data.sql
# Password: admin
```

### Option 3: Via PowerShell (Windows)

```powershell
# Set password as variable (optional)
$env:MYSQL_PWD = "admin"

# Import
Get-Content dummy_data.sql | mysql -h 114.122.72.222 -u cisitufcjaya_db gathernote_db
```

### Option 4: Via phpMyAdmin (GUI)

1. Buka phpMyAdmin di browser
2. Login dengan kredensial database
3. Pilih database `gathernote_db`
4. Tab "Import"
5. Choose file: `dummy_data.sql`
6. Klik "Go"

---

## Verifikasi Data Berhasil Masuk

```sql
-- Cek jumlah data di setiap tabel
SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
UNION ALL
SELECT 'Folders', COUNT(*) FROM folders
UNION ALL
SELECT 'Notes', COUNT(*) FROM notes
UNION ALL
SELECT 'Groups', COUNT(*) FROM groups
UNION ALL
SELECT 'Group Members', COUNT(*) FROM group_members
UNION ALL
SELECT 'Collaborators', COUNT(*) FROM note_collaborators;
```

**Expected Result:**

```
+-----------------+-------+
| Table_Name      | Total |
+-----------------+-------+
| Users           |     3 |
| Folders         |     6 |
| Notes           |     6 |
| Groups          |     3 |
| Group Members   |     5 |
| Collaborators   |     3 |
+-----------------+-------+
```

---

## Data yang Diimport

### 1. Users (3 pengguna)

- `daffa_student` - daffa@itb.ac.id
- `azzam_mahasiswa` - azzam@itb.ac.id
- `siti_scholar` - siti@itb.ac.id

### 2. Folders (6 folder)

- My Business Ideas (Entrepreneurship)
- Data Mining (Data Science)
- Uncategorized (General)
- Sistem Terdistribusi (TST Course)
- Personal Notes (Life)
- Research Papers (Academic)

### 3. Notes (6 catatan)

1. **Pengenalan Sistem Terdistribusi** - 1500+ karakter (GOOD for AI)
2. **Ide Startup: EduTech Platform** - 1000+ karakter (GOOD for AI)
3. **Decision Tree Algorithm** - 800+ karakter (GOOD for AI)
4. **Todo List Minggu Ini** - 200 karakter (TOO SHORT - will error)
5. **Refleksi Semester 7** - 300 karakter (TOO SHORT - will error)
6. **Konsep Cloud Computing** - 600+ karakter (GOOD for AI)

### 4. Groups (3 grup)

- Study Group TST 2025 (code: TST2025AB)
- Entrepreneur Club ITB (code: ENTRCLUB)
- Data Science Enthusiast (code: DATASCIENCE)

---

## Testing Login dengan Dummy User

**PENTING**: Password di dummy data adalah hash PALSU. Untuk testing, perlu update password dengan hash yang benar.

### Generate Password Hash yang Benar

```bash
cd server

# Jalankan script Node.js untuk generate hash
node -e "console.log(require('bcryptjs').hashSync('password123', 10))"

# Output contoh:
# $2a$10$qR5/iC9X3Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ
```

### Update Password User di Database

```sql
-- Update password untuk azzam_mahasiswa
UPDATE users
SET password_hash = '$2a$10$qR5/iC9X3Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ9Z5qJv3ZJ'
WHERE username = 'azzam_mahasiswa';

-- Sekarang bisa login dengan:
-- Email: azzam@itb.ac.id
-- Password: password123
```

---

## Troubleshooting

### Error: "Access denied for user"

**Problem**: Username atau password salah
**Solution**:

```bash
# Cek kredensial di .env
cat .env | grep DB_

# Pastikan:
DB_USERNAME=cisitufcjaya_db
DB_PASSWORD=admin
```

### Error: "Can't connect to MySQL server"

**Problem**: Database server tidak bisa diakses
**Solution**:

1. Cek koneksi internet
2. Ping server: `ping 114.122.72.222`
3. Cek firewall tidak block port 3306

### Error: "Table 'users' doesn't exist"

**Problem**: Schema belum dibuat
**Solution**:

```bash
# Jalankan Drizzle migration dulu
cd server
npm run db:push

# Baru import dummy data
mysql -h 114.122.72.222 -u cisitufcjaya_db -p gathernote_db < dummy_data.sql
```

### Error: "Duplicate entry for key 'PRIMARY'"

**Problem**: Data sudah ada di database
**Solution**:

```sql
-- Hapus data lama dulu
DELETE FROM note_collaborators;
DELETE FROM group_members;
DELETE FROM notes;
DELETE FROM folders;
DELETE FROM groups;
DELETE FROM users;

-- Reset AUTO_INCREMENT
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE folders AUTO_INCREMENT = 1;
ALTER TABLE notes AUTO_INCREMENT = 1;
ALTER TABLE groups AUTO_INCREMENT = 1;
ALTER TABLE group_members AUTO_INCREMENT = 1;
ALTER TABLE note_collaborators AUTO_INCREMENT = 1;

-- Import ulang
source dummy_data.sql;
```

---

## Quick Start Script

Buat file `import_data.sh` (Linux/Mac):

```bash
#!/bin/bash
echo "🗄️  Importing GatherNote Dummy Data..."

mysql -h 114.122.72.222 -u cisitufcjaya_db -padmin gathernote_db < dummy_data.sql

if [ $? -eq 0 ]; then
    echo "✅ Data berhasil diimport!"
    echo "📊 Verifikasi jumlah data:"
    mysql -h 114.122.72.222 -u cisitufcjaya_db -padmin gathernote_db -e "
        SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
        UNION ALL SELECT 'Folders', COUNT(*) FROM folders
        UNION ALL SELECT 'Notes', COUNT(*) FROM notes;
    "
else
    echo "❌ Import gagal!"
    exit 1
fi
```

Jalankan:

```bash
chmod +x import_data.sh
./import_data.sh
```

Atau PowerShell script `import_data.ps1` (Windows):

```powershell
Write-Host "🗄️  Importing GatherNote Dummy Data..." -ForegroundColor Cyan

$env:MYSQL_PWD = "admin"
Get-Content dummy_data.sql | mysql -h 114.122.72.222 -u cisitufcjaya_db gathernote_db

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Data berhasil diimport!" -ForegroundColor Green
    Write-Host "📊 Verifikasi jumlah data:" -ForegroundColor Yellow

    $query = @"
SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
UNION ALL SELECT 'Folders', COUNT(*) FROM folders
UNION ALL SELECT 'Notes', COUNT(*) FROM notes;
"@

    $query | mysql -h 114.122.72.222 -u cisitufcjaya_db gathernote_db
} else {
    Write-Host "❌ Import gagal!" -ForegroundColor Red
    exit 1
}
```

Jalankan:

```powershell
.\import_data.ps1
```

---

## Setelah Import Berhasil

1. **Test Login di Frontend**:

   - URL: http://localhost:3000
   - Email: `azzam@itb.ac.id`
   - Password: `password123` (setelah update hash)

2. **Test API dengan Postman**:

   - Import: `GatherNote_API.postman_collection.json`
   - Environment variable: `base_url = http://localhost:3001/api/v1`

3. **Test AI Summarizer**:
   - Login → Buka Note "Pengenalan Sistem Terdistribusi"
   - Klik tombol "✨ Summarize"
   - Tunggu 3-5 detik → Summary muncul di side panel

---

**Done! 🎉 Database siap digunakan untuk testing!**
