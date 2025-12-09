# Client Folder - Dual Framework Setup

## ✅ Fixed: Next.js Conflict Error

**Error sebelumnya:**

```
Error: > `pages` and `app` directories should be under the same folder
```

**Solusi:** Folder `src/` (React Vite) di-rename menjadi `react-vite/` untuk menghindari konflik dengan Next.js.

---

## 📁 Current Structure

```
client/
├── app/                    # ✅ Next.js App Router (TypeScript)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── react-vite/             # ✅ React + Vite Components (JavaScript)
│   ├── components/         # 10 React components
│   ├── pages/              # 6 React pages
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/                 # Static assets
├── index.html              # Vite entry (updated path)
├── package.json            # Next.js config
├── next.config.ts
└── tsconfig.json
```

---

## 🚀 How to Run

### Option 1: Next.js (Currently Active)

```bash
cd client
npm run dev
# Opens at http://localhost:3000
```

### Option 2: React + Vite (Need Setup)

1. Create `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  build: {
    outDir: "dist-vite",
  },
  server: {
    port: 5173,
  },
});
```

2. Install Vite:

```bash
npm install -D vite @vitejs/plugin-react
npm install react-router-dom lucide-react
```

3. Add script to `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "dev:vite": "vite",
  "build:vite": "vite build"
}
```

4. Run:

```bash
npm run dev:vite
# Opens at http://localhost:5173
```

---

## 📝 Components Overview

### React Vite Components (`react-vite/components/`)

1. `Sidebar.jsx` - Main navigation sidebar
2. `CreateNoteModal.jsx` - Modal for creating notes
3. `CreateFolderModal.jsx` - Modal for creating folders
4. `CreateGroupModal.jsx` - Modal for creating groups
5. `JoinGroupModal.jsx` - Modal for joining groups
6. `FolderCard.jsx` - Folder display card
7. `GroupCard.jsx` - Group display card
8. `NoteItem.jsx` - Note list item
9. `OptionModal.jsx` - Options/settings modal
10. `SearchNoteCard.jsx` - Search result card

### React Vite Pages (`react-vite/pages/`)

1. `Dashboard.jsx` - Main dashboard
2. `MyFolders.jsx` - Folders list page
3. `FolderDetail.jsx` - Single folder view
4. `NoteEditor.jsx` - Note editing page
5. `GroupList.jsx` - Groups list page
6. `SearchPage.jsx` - Search results page

---

## ⚙️ Next Steps (Choose One)

### A. Continue with Next.js (Recommended)

- Migrate React components to Next.js
- Convert `.jsx` to `.tsx`
- Use Next.js App Router
- Delete `react-vite/` and `index.html`

### B. Switch to React + Vite

- Setup Vite config (see above)
- Delete `app/`, `next.config.ts`, `tsconfig.json`
- Use React Router
- Keep `react-vite/` and `index.html`

### C. Keep Both (Development)

- Run Next.js on port 3000
- Run Vite on port 5173
- Choose later which to use

---

## 🔗 Backend Integration

Both frameworks can connect to the same backend:

```
Server: http://localhost:3001/api/v1
```

Use `fetch` or `axios` to call API endpoints from either framework.

---

Last Updated: December 9, 2025
