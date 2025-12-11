# 🚀 GatherNote - Quick Start Guide

## 📋 Prerequisites Checklist

Sebelum memulai, pastikan sudah install:

- ✅ Node.js v18+ (`node --version`)
- ✅ npm v9+ (`npm --version`)
- ✅ MySQL Client (`mysql --version`)
- ✅ Git (`git --version`)

---

## 🎯 Setup Backend (Server)

```bash
# 1. Masuk ke folder server
cd server

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Edit .env dan isi:
# - DATABASE_URL (sudah ada)
# - JWT_SECRET (sudah ada)
# - GEMINI_API_KEY (dapatkan dari https://makersuite.google.com/app/apikey)

# 5. Push schema ke database (Drizzle migration)
npm run db:push

# 6. Import dummy data (via Remote DB di aaPanel)
mysql -h 127.0.0.1 -P 13306 -u root -p gathernote_db < dummy_data.sql
# Password: admin

# 7. Jalankan server
npm run dev

# ✅ Backend ready di http://localhost:3001
```

---

## 🎨 Setup Frontend (Client)

```bash
# 1. Masuk ke folder client
cd client

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Edit .env.local (default sudah OK):
# NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# 5. Jalankan development server
npm run dev

# ✅ Frontend ready di http://localhost:3000
```

---

## 🧪 Testing

### 1. Test Backend API (Postman)

```bash
# Import Postman collection
# File: server/GatherNote_API.postman_collection.json

# Set environment variable:
base_url = http://localhost:3001/api/v1

# Test endpoints:
1. POST /auth/register - Register user baru
2. POST /auth/login - Login (dapat token)
3. GET /folders - Get all folders (butuh token)
4. POST /ai/summarize - Test AI Summarizer
```

### 2. Test Frontend

```
1. Buka browser: http://localhost:3000
2. Login dengan dummy user:
   - Email: azzam@itb.ac.id
   - Password: password123

3. Explore features:
   ✅ Dashboard with folders
   ✅ Create new folder
   ✅ View notes in folder
   ✅ Open note editor
   ✅ Test AI Summarizer
```

### 3. Test AI Summarizer

```
1. Login → Dashboard
2. Klik folder "Sistem Terdistribusi"
3. Klik note "Pengenalan Sistem Terdistribusi"
4. Klik tombol "✨ Summarize"
5. Tunggu 3-5 detik
6. Summary muncul di side panel (kanan)
```

---

## 📁 Project Structure

```
GatherNote/
├── client/                  # Frontend (Next.js)
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── lib/           # API service (api.ts)
│   │   ├── note/[id]/     # Note editor dengan AI
│   │   └── page.tsx       # Dashboard
│   ├── .env.local         # Environment variables
│   └── package.json
│
├── server/                 # Backend (Express.js)
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   │   ├── ai.controller.js      # ⭐ AI Summarizer
│   │   │   ├── auth.controller.js
│   │   │   ├── folder.controller.js
│   │   │   └── note.controller.js
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── index.js       # Main server file
│   ├── .env              # Environment variables
│   ├── dummy_data.sql    # ⭐ Test data
│   └── package.json
│
├── INTEGRATION_GUIDE.md   # ⭐ Dokumentasi lengkap integrasi
└── README.md             # This file
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=114.122.72.222
DB_PORT=3306
DB_DATABASE=gathernote_db
DB_USERNAME=cisitufcjaya_db
DB_PASSWORD=admin

# Server
PORT=3001

# JWT
JWT_SECRET="rahasia_negara_gathernote_123"

# AI (PENTING!)
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## 🎓 Fitur Utama

### 1. ✅ Authentication

- Register user baru
- Login dengan JWT
- Protected routes

### 2. 📁 Folder Management

- Create, read, update, delete folders
- Organize notes by topic
- Pin/unpin folders

### 3. 📝 Note Editor

- Rich text editor
- Auto-save (TODO)
- Markdown support

### 4. ⭐ AI Smart Summarizer (NEW!)

- Ringkas catatan panjang jadi bullet points
- Powered by Google Gemini AI
- Bahasa Indonesia & English support
- Side panel display dengan UI menarik

### 5. 👥 Groups & Collaboration

- Create study groups
- Join with group code
- Share notes with collaborators

### 6. 🔍 Search

- Search notes by content
- Real-time search results

---

## 🐛 Troubleshooting

### Backend tidak jalan

```bash
# Cek port 3001 sudah dipakai
netstat -ano | findstr :3001

# Kill process jika perlu (Windows)
taskkill /PID <PID> /F

# Atau ganti PORT di .env
PORT=3002
```

### Frontend tidak connect ke Backend

```bash
# Cek CORS di server/src/index.js
app.use(cors({
  origin: 'http://localhost:3000'
}));

# Cek .env.local di client
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### AI Summarizer Error 503

```bash
# Cek GEMINI_API_KEY di server/.env
# Dapatkan key dari: https://makersuite.google.com/app/apikey

# Test API key:
curl -X POST "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

### Database connection error

```bash
# Test koneksi MySQL
mysql -h 114.122.72.222 -u cisitufcjaya_db -p
# Password: admin

# Jika gagal, cek:
1. Koneksi internet
2. Firewall tidak block port 3306
3. IP sudah di-whitelist
```

---

## 📚 Dokumentasi Lengkap

1. **INTEGRATION_GUIDE.md** - Dokumentasi integrasi FE-BE + AI
2. **server/IMPORT_DATA_GUIDE.md** - Cara import dummy data
3. **server/API_TESTING.md** - API testing dengan Postman
4. **client/README.md** - Frontend documentation

---

## 🚀 Deployment (Production)

### Backend (dengan Cloudflare Tunnel)

```bash
# Install Cloudflare Tunnel
# Windows: Download dari cloudflare.com/products/tunnel

# Login
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create gathernote

# Route traffic
cloudflared tunnel route dns gathernote api.gathernote.com

# Run tunnel
cloudflared tunnel run gathernote

# Server tetap jalan di STB port 3001
# Accessible via: https://api.gathernote.com
```

### Frontend (Vercel)

```bash
# Push ke GitHub
git add .
git commit -m "feat: integrate AI summarizer"
git push origin main

# Deploy di Vercel:
1. Import GitHub repo
2. Set environment:
   NEXT_PUBLIC_API_URL=https://api.gathernote.com/api/v1
3. Deploy

# Done! App live di: https://gathernote.vercel.app
```

---

## 👥 Team

- **Backend Developer**: Ghazy (Express.js + Drizzle ORM)
- **Frontend Developer**: Ghazy (Next.js + React)
- **AI Integration**: Ghazy (Google Gemini API)
- **Database**: MySQL Remote Server

---

## 📝 License

MIT License - Dibuat untuk Tugas TST (Teknologi Sistem Terintegrasi)

---

## 🎉 Selamat Mencoba!

Jika ada pertanyaan atau issue, buka GitHub Issues atau hubungi developer.

**Happy Coding! 🚀**
