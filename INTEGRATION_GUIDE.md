# GatherNote - Integrasi Frontend & Backend + AI Summarizer

## 🎯 Yang Sudah Dikerjakan

### 1. Backend Integration (Server)

#### ✅ AI Controller & Routes

- **File**: `src/controllers/ai.controller.js`

  - Implementasi Google Gemini AI untuk Smart Summarizer
  - Validasi konten minimal 50 karakter
  - Prompt engineering untuk hasil ringkasan berkualitas
  - Error handling untuk AI service downtime

- **File**: `src/routes/ai.routes.js`

  - Route: `POST /api/v1/ai/summarize`
  - Protected dengan JWT authentication
  - Request body: `{ content, language }`
  - Response: `{ status, data: { summary, original_length, ai_model, timestamp } }`

- **File**: `src/index.js`
  - Tambah import `aiRoutes`
  - Register route: `app.use('/api/v1/ai', aiRoutes)`

#### ✅ Environment Configuration

- **File**: `.env`
  - Tambah `GEMINI_API_KEY` untuk Google AI
  - Instruksi cara mendapatkan API key: https://makersuite.google.com/app/apikey

#### ✅ Dependencies

- Package: `@google/generative-ai`
- Installed via: `npm install @google/generative-ai`

---

### 2. Frontend Integration (Client)

#### ✅ API Service Layer

- **File**: `app/lib/api.ts`
  - Complete API wrapper untuk semua endpoints
  - Authentication handling (JWT token di localStorage)
  - Modular structure dengan 7 API modules:
    - `authAPI`: Register, Login, Logout
    - `folderAPI`: CRUD folders
    - `noteAPI`: CRUD notes
    - `groupAPI`: Create, join, leave groups
    - `searchAPI`: Search notes
    - `aiAPI`: **Smart Summarizer**
    - `userAPI`: Profile management

#### ✅ Note Editor dengan AI Summarizer

- **File**: `app/note/[id]/page.tsx`
  - Tombol **"✨ Summarize"** dengan gradient gold
  - State management untuk loading & summary display
  - Side panel untuk menampilkan ringkasan AI
  - Loading animation saat AI processing
  - Error handling user-friendly

**Fitur Tombol Summarize:**

- Icon: Sparkles ✨ (animasi spin saat loading)
- Warna: Gradient orange-gold (#FFC107 → #FF9800)
- Disabled state saat loading
- Alert jika konten < 50 karakter

**AI Summary Panel:**

- Slide dari kanan dengan border gold
- Markdown formatting untuk bullet points
- Close button (X) untuk menutup panel
- "Powered by Google Gemini AI" badge

---

### 3. Dummy Data untuk Testing

#### ✅ SQL File

- **File**: `server/dummy_data.sql`
- **Isi**:
  - 3 Users (Daffa, Azzam, Siti)
  - 6 Folders (Business Ideas, Data Mining, TST, dll)
  - 6 Notes dengan konten panjang untuk AI Summarizer:
    1. **"Pengenalan Sistem Terdistribusi"** - 500+ kata tentang TST
    2. **"Ide Startup: EduTech Platform"** - Business plan lengkap
    3. **"Decision Tree Algorithm"** - Catatan kuliah ML
    4. **"Todo List"** - Konten pendek (akan error 400)
    5. **"Refleksi Semester 7"** - Personal notes
    6. **"Konsep Cloud Computing"** - Cloud fundamentals
  - 3 Groups (Study Group TST, Entrepreneur Club, Data Science)
  - 5 Group Members
  - 3 Note Collaborators

**Cara Import Dummy Data:**

```bash
# Masuk ke MySQL
mysql -h 114.122.72.222 -u cisitufcjaya_db -p gathernote_db

# Import data
source dummy_data.sql

# Verifikasi
SELECT 'Users' as Table_Name, COUNT(*) as Total FROM users
UNION ALL
SELECT 'Folders', COUNT(*) FROM folders
UNION ALL
SELECT 'Notes', COUNT(*) FROM notes;
```

---

## 🚀 Cara Menjalankan

### Backend (Server)

```bash
cd server

# Install dependencies (jika belum)
npm install

# Set Gemini API Key di .env
# GEMINI_API_KEY="YOUR_API_KEY_HERE"

# Import dummy data ke database
mysql -h 114.122.72.222 -u cisitufcjaya_db -p gathernote_db < dummy_data.sql

# Jalankan server
npm run dev
```

### Frontend (Client)

```bash
cd client

# Install dependencies (jika belum)
npm install

# Jalankan development server
npm run dev
```

---

## 🧪 Testing AI Summarizer

### Test Flow:

1. **Login** dengan dummy user:

   - Email: `azzam@itb.ac.id`
   - Password: `password` (sesuaikan dengan hash di dummy data)

2. **Buka Note** dari database:

   - Pilih note dengan konten panjang (note_id: 1, 2, 3, atau 6)
   - Example: "Pengenalan Sistem Terdistribusi"

3. **Klik Tombol "✨ Summarize"**:
   - AI akan memproses (loading 3-5 detik)
   - Summary panel muncul di sebelah kanan
   - Hasil: Bullet points terstruktur dalam Bahasa Indonesia

### Expected Result:

```json
{
  "status": "success",
  "data": {
    "summary": "### Ringkasan Materi:\n- **Sistem Terdistribusi**: ...",
    "original_length": 1543,
    "ai_model": "gemini-pro",
    "timestamp": "2025-12-11T..."
  }
}
```

### Test Error Handling:

- **Konten < 50 karakter**: Alert "Konten terlalu pendek"
- **No GEMINI_API_KEY**: Error 503 "Layanan AI sedang error"
- **No auth token**: Error 401 "Unauthorized"

---

## 📊 Arsitektur Integrasi (TST Concept)

```
┌─────────────┐
│   Browser   │ (React/Next.js)
│  (Client)   │
└──────┬──────┘
       │ HTTP Request
       │ POST /api/v1/ai/summarize
       ▼
┌─────────────────┐
│  Cloudflare     │ (Optional Tunnel)
│    Tunnel       │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│   Node.js Server    │ (Express.js di STB)
│   (Backend/STB)     │
│                     │
│  ┌───────────────┐  │
│  │ Auth Middleware│  │ 1. Validate JWT
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │ AI Controller │  │ 2. Prompt Engineering
│  └───────┬───────┘  │
│          │          │
└──────────┼──────────┘
           │ API Call
           ▼
    ┌─────────────┐
    │ Google AI   │ (Gemini Pro)
    │   Cloud     │
    └─────────────┘
```

**Pola Design Pattern:**

- **API Gateway**: Backend sebagai proxy aman ke external AI
- **Service Orchestration**: Koordinasi antara Auth → AI → Response
- **Prompt Engineering**: Instruksi AI terstruktur untuk hasil konsisten

---

## 🔑 Security Features

1. **JWT Authentication**:

   - Semua AI endpoint protected
   - Token di localStorage (client-side)
   - Bearer token di Authorization header

2. **Input Validation**:

   - Min 50 karakter untuk summarize
   - Sanitasi content sebelum dikirim ke AI

3. **Error Masking**:

   - Internal error tidak expose ke client
   - Generic message: "Layanan AI sedang sibuk"

4. **Rate Limiting** (TODO):
   - Belum implementasi, bisa tambahkan `express-rate-limit`
   - Limit: 10 requests per user per minute

---

## 📝 Notes untuk Developer

1. **GEMINI_API_KEY**:

   - Harus didapat dari Google AI Studio
   - Free tier: 60 requests/minute
   - Jangan commit ke git (.env sudah di .gitignore)

2. **Password Hash**:

   - Dummy data pakai hash palsu
   - Production: gunakan bcrypt yang benar
   - Script: `node -e "console.log(require('bcryptjs').hashSync('password', 10))"`

3. **CORS Configuration**:

   - Backend: `cors({ origin: 'http://localhost:3000' })`
   - Production: sesuaikan dengan domain frontend

4. **Database Connection**:
   - Remote DB: 114.122.72.222
   - Pastikan IP whitelisted di hosting

---

## 🎓 Relevansi Mata Kuliah TST

**Konsep yang Didemonstrasikan:**

1. **Sistem Terdistribusi**:

   - Client (Browser) ≠ Server (STB) ≠ AI Service (Google Cloud)
   - Komponen tersebar, berkomunikasi via HTTP/JSON

2. **API Gateway Pattern**:

   - Backend = Middleware antara user dan external service
   - Keamanan (JWT), logging (morgan), error handling

3. **Cloudflare Tunnel**:

   - Tembus NAT tanpa port forwarding
   - STB di rumah bisa diakses public

4. **Prompt Engineering**:

   - Instruksi AI terstruktur untuk output konsisten
   - Bahasa Indonesia akademis, format Markdown

5. **RESTful API Design**:
   - HTTP methods (GET, POST, PUT, DELETE)
   - Status codes (200, 400, 401, 503)
   - JSON request/response body

---

## ✅ Checklist Implementasi

- [x] Install @google/generative-ai di backend
- [x] Buat AI controller (summarizeNote function)
- [x] Buat AI routes (POST /ai/summarize)
- [x] Tambah route di index.js
- [x] Tambah GEMINI_API_KEY di .env
- [x] Buat dummy data SQL (6 notes dengan konten panjang)
- [x] Buat API service layer di frontend (api.ts)
- [x] Tambah tombol Summarize di Note Editor
- [x] Buat AI Summary Panel (side panel dengan close button)
- [x] Loading state & error handling
- [x] Dokumentasi lengkap

---

## 📞 Troubleshooting

**Problem**: Tombol Summarize tidak muncul

- **Solution**: Cek apakah import `Sparkles` dari lucide-react sudah benar

**Problem**: Error 401 Unauthorized

- **Solution**: Login dulu, pastikan token tersimpan di localStorage

**Problem**: Error 503 AI Service Error

- **Solution**:
  1. Cek GEMINI_API_KEY di .env backend
  2. Pastikan API key valid
  3. Cek quota Google AI (60 req/min)

**Problem**: Summary tidak muncul / loading terus

- **Solution**:
  1. Buka Network tab di DevTools
  2. Cek response dari /api/v1/ai/summarize
  3. Pastikan backend running di port 3001

**Problem**: Dummy data tidak masuk

- **Solution**:

  ```bash
  # Cek koneksi DB
  mysql -h 114.122.72.222 -u cisitufcjaya_db -p

  # Cek existing data
  USE gathernote_db;
  SELECT COUNT(*) FROM users;

  # Jika 0, import ulang
  source dummy_data.sql;
  ```

---

## 🚀 Next Steps (Enhancement Ideas)

1. **Auto-save Note** (setiap 10 detik)
2. **Real-time Collaboration** (WebSocket)
3. **Export Summary** (PDF/Markdown download)
4. **Multi-language Support** (English AI summary)
5. **Summary History** (simpan ke database)
6. **Voice-to-Text** (Web Speech API)
7. **AI Flashcard Generator** (dari summary)

---

**Selesai! 🎉 Integrasi FE-BE sudah lengkap dengan AI Summarizer!**
