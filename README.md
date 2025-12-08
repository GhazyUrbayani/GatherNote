# 📝 GatherNote

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active_Development-success?style=for-the-badge&logo=git&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

**Platform Kolaborasi Catatan & Manajemen Pengetahuan yang Modern, Cepat, dan Aman.**

[Fitur Utama](#-fitur-unggulan) • [Teknologi](#-teknologi-yang-digunakan) • [Struktur Proyek](#-struktur-proyek) • [Instalasi](#-panduan-instalasi--menjalankan)

</div>

---

## 📖 Tentang Proyek

**GatherNote** adalah aplikasi manajemen catatan berbasis web yang memungkinkan pengguna untuk membuat, mengorganisir folder, berkolaborasi dalam grup, dan berbagi ide secara *real-time*. Dibangun dengan arsitektur *monorepo* yang memisahkan *frontend* modern berbasis React/Next.js dan *backend* RESTful API yang tangguh.

---

## 🛠️ Teknologi yang Digunakan

### **Frontend (`client/`)**
<p align="left">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
</p>

### **Backend (`server/`)**
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img src="https://img.shields.io/badge/Bcrypt-5C4EE5?style=for-the-badge&logo=auth0&logoColor=white">
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white">
</p>

---

## 📂 Struktur Proyek

Berikut adalah struktur direktori lengkap berdasarkan kode sumber saat ini:

```text
GatherNote/
├── 🌐 client/                  # Frontend Application (React + Vite)
│   ├── 📂 app/                 # App config & layouts
│   │   ├── 📄 layout.tsx       # Root layout
│   │   ├── 📄 page.tsx         # Main page entry
│   │   └── 📄 globals.css      # Global styles
│   ├── 📂 public/              # Static assets (svgs, icons)
│   │   ├── 📄 vite.svg
│   │   └── 📄 next.svg
│   ├── 📂 src/                 # Source Code Frontend
│   │   ├── 📂 components/      # Reusable UI Components
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   ├── 📄 NoteItem.jsx
│   │   │   ├── 📄 GroupCard.jsx
│   │   │   ├── 📄 FolderCard.jsx
│   │   │   └── 📄 [Modals: CreateNote, CreateGroup, etc.]
│   │   ├── 📂 pages/           # Application Views
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 NoteEditor.jsx
│   │   │   ├── 📄 SearchPage.jsx
│   │   │   ├── 📄 MyFolders.jsx
│   │   │   └── 📄 GroupList.jsx
│   │   ├── 📄 App.jsx          # Main App Component
│   │   └── 📄 main.jsx         # Entry point
│   ├── 📄 next.config.ts       # Next.js configuration
│   ├── 📄 postcss.config.mjs   # PostCSS configuration
│   ├── 📄 tailwind.config.js   # Tailwind configuration
│   ├── 📄 tsconfig.json        # TypeScript configuration
│   └── 📄 package.json         # Dependencies for client
│
└── 🛠️ server/                  # Backend API (Express + Drizzle)
    ├── 📂 src/
    │   ├── 📂 config/          # Configuration files
    │   │   ├── 📄 database.js  # DB Connection setup
    │   │   └── 📄 schema.js    # Drizzle schema & migrations
    │   ├── 📂 controllers/     # Route Logic Handlers
    │   │   ├── 📄 auth.controller.js
    │   │   ├── 📄 folder.controller.js
    │   │   ├── 📄 note.controller.js
    │   │   └── 📄 [More controllers...]
    │   ├── 📂 middleware/      # Custom Middlewares
    │   │   └── 📄 auth.middleware.js # JWT Verification
    │   ├── 📂 routes/          # API Route Definitions
    │   │   ├── 📄 auth.routes.js
    │   │   ├── 📄 folder.routes.js
    │   │   ├── 📄 note.routes.js
    │   │   └── 📄 [More routes...]
    │   ├── 📂 utils/           # Utility functions
    │   │   ├── 📄 jwt.util.js
    │   │   ├── 📄 password.util.js
    │   │   └── 📄 validator.util.js
    │   └── 📄 index.js         # Server Entry Point
    ├── 📄 drizzle.config.js    # ORM Config
    ├── 📄 package.json         # Server Dependencies
    └── 📄 GatherNote_API...json# Postman Collection for Testing
```

## 🌟 Fitur Unggulan
- 🔐 Autentikasi Aman: Sistem registrasi dan login menggunakan JWT & enkripsi password.
- 📝 Note Editor: Editor teks kaya fitur untuk membuat catatan.
- 📂 Sistem Folder: Organisasi catatan yang rapi dengan struktur folder.
- 👥 Grup & Kolaborasi: Fitur grup untuk berbagi catatan dengan tim.
- 🔍 Pencarian Cepat: Temukan catatan berdasarkan judul atau isi.
- 🌓 Responsive UI: Antarmuka modern yang responsif dibangun dengan Tailwind CSS.

## 🚀 Panduan Instalasi & Menjalankan
Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di lingkungan lokal Anda.

### Prasyarat
- Node.js (v18 atau lebih baru)
- PostgreSQL Database
- NPM atau Yarn

### 1. Konfigurasi Backend (Server)

Masuk ke direktori server dan instal dependensi:

```Bash
cd server
npm install
```
Buat file .env di dalam folder server/ dan isi konfigurasi database Anda:

```
DATABASE_URL="postgres://user:password@host:port/db_name"
JWT_SECRET="rahasia_super_aman"
PORT=3000
Jalankan server (mode development):
```

```Bash
npm run dev
(Server akan berjalan di http://localhost:3000)
```

### 2. Konfigurasi Frontend (Client)
Buka terminal baru, masuk ke direktori client, dan instal dependensi:

``` Bash
cd client
npm install
```

Jalankan aplikasi frontend:

```Bash
npm run dev
```
Buka browser dan kunjungi alamat yang muncul di terminal (biasanya http://localhost:5173 atau http://localhost:3001 tergantung konfigurasi).

## 🧪 Pengujian API
Untuk menguji backend API tanpa frontend, Anda dapat menggunakan koleksi Postman yang telah disediakan.

- Buka aplikasi Postman.
- Klik Import.
- Pilih file server/GatherNote_API.postman_collection.json.
- Anda sekarang memiliki akses ke seluruh endpoint API yang tersedia untuk pengujian.

## 🤝 Kontribusi
Kami sangat menghargai kontribusi dari komunitas!

- Fork proyek ini.

- Buat Branch fitur baru (git checkout -b fitur/NamaFitur).

- Commit perubahan Anda (git commit -m 'Menambahkan fitur keren').

- Push ke branch tersebut (git push origin fitur/NamaFitur).

- Buat Pull Request.

---

<p align="center"> <b>Dibuat dengan ❤️ oleh Tim GatherNote</b> </p>
