# 🔧 Konfigurasi Database Updated

## ⚙️ Database Configuration (aaPanel Remote DB)

Berdasarkan setup di aaPanel, konfigurasi database telah diupdate:

### Database Credentials:

- **Host**: `127.0.0.1` (localhost via Remote DB)
- **Port**: `13306` (custom port dari aaPanel)
- **Database**: `gathernote_db`
- **Username**: `root`
- **Password**: `admin`

### Cara Menggunakan Remote DB di aaPanel:

1. **Pastikan MySQL Service Running**:

   - Buka aaPanel → Docker → mysql_serve
   - Status harus "Running" (hijau)
   - Port: 13306 (sudah diexpose)

2. **Test Koneksi**:

   ```bash
   # Via command line
   mysql -h 127.0.0.1 -P 13306 -u root -p
   # Password: admin

   # Test show databases
   mysql -h 127.0.0.1 -P 13306 -u root -padmin -e "SHOW DATABASES;"
   ```

3. **Import Dummy Data**:

   ```powershell
   # Windows PowerShell
   cd server
   .\import_dummy_data.ps1
   ```

   Atau manual:

   ```bash
   mysql -h 127.0.0.1 -P 13306 -u root -p gathernote_db < dummy_data.sql
   # Password: admin
   ```

### Updated Files:

1. **server/.env**:

   ```env
   DB_HOST=127.0.0.1
   DB_PORT=13306
   DB_USERNAME=root
   DB_PASSWORD=admin
   ```

2. **server/import_dummy_data.ps1**: Updated untuk port 13306
3. **server/import_dummy_data.sh**: Updated untuk port 13306
4. **QUICK_START.md**: Updated dokumentasi

### Troubleshooting:

**Error: Can't connect to MySQL server on '127.0.0.1:13306' (10061)**

**Solusi**:

1. Pastikan Docker mysql_serve container **Running**
2. Cek di aaPanel → Docker → mysql_serve → Details
3. Pastikan port 13306 terexpose
4. Restart container jika perlu:
   ```
   aaPanel → Docker → mysql_serve → Restart
   ```

**Error: Access denied for user 'root'@'127.0.0.1'**

**Solusi**:

1. Cek password di aaPanel → Docker → mysql_serve → Details
2. Database root password: `admin` (sesuai gambar)
3. Update .env jika password berbeda

### Next Steps:

1. ✅ Konfigurasi database sudah diupdate
2. ⏳ Pastikan MySQL container running di aaPanel
3. ⏳ Import dummy data via script
4. ⏳ Test backend connection: `npm run dev`
5. ⏳ Verify data: Login ke database dan check tables

### Architecture (Updated):

```
Backend (Node.js)
    ↓
127.0.0.1:13306 (Docker MySQL)
    ↓
mysql_serve container (aaPanel)
    ↓
Volume: /www/dk_project/dk_app/mysql/mysql_serve
```

Semua konfigurasi sudah disesuaikan dengan setup di STB/aaPanel! 🎉
