# GatherNote 📝

<!-- HEADER -->
<div align="center">

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Poppins+Code&size=24&pause=1000&color=00BFFF&center=true&vCenter=true&width=600&lines=GatherNote+—+Collaborative+Note-Taking;Next.js+%2B+TypeScript+%2B+Express.js;Real-time+Collaboration+%26+Smart+Search" alt="Typing SVG">
  </a>

  <br /><br />

  <p>
    <em>
      A full-stack collaborative note-taking platform where you can organize, share, and collaborate on notes in real-time — with group workspaces, smart search, and folder management.
    </em>
  </p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge" />

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Overview](#-api-overview)
- [Contributing](#-contributing)
- [License](#-license)

---

## About

GatherNote is a full-stack note-taking web application designed for **individual productivity** and **group collaboration**. Users can organize notes into folders, share them publicly or within groups, and collaborate in real-time with fine-grained permission controls.

---

## ✨ Features

- 🔐 **Authentication** — JWT-based login & registration
- 👤 **User Profiles** — Profile management with avatar support
- 📁 **Folder Organization** — Create, pin, and color-code folders
- 📝 **Note Management** — Full CRUD with status tracking (`UNSTARTED`, `ONGOING`, `ARCHIVED`) and priority levels
- 🔍 **Advanced Search** — Full-text search with autocomplete suggestions across notes
- 👥 **Group Collaboration** — Create groups, invite via join code, manage members
- 🔗 **Note Sharing** — Set visibility (`PRIVATE`, `PUBLIC`, `GROUP`) and add collaborators with `VIEW` or `EDIT` permissions
- 🛡️ **Security** — bcrypt hashing, Helmet.js headers, CORS, Prisma SQL injection protection

---

## 🛠 Tech Stack

<div align="center">

  <table>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
    </tr>
    <tr>
      <td><b>Frontend</b></td>
      <td>Next.js 15, TypeScript, Tailwind CSS</td>
    </tr>
    <tr>
      <td><b>Backend</b></td>
      <td>Express.js, Node.js, JWT</td>
    </tr>
    <tr>
      <td><b>Database</b></td>
      <td>MySQL 8+, Prisma ORM, Drizzle Config</td>
    </tr>
    <tr>
      <td><b>Security</b></td>
      <td>bcrypt, Helmet.js, CORS, Input Validation</td>
    </tr>
    <tr>
      <td><b>Dev Tools</b></td>
      <td>Postman, Prisma Studio, ESLint</td>
    </tr>
  </table>

</div>

---

## 📁 Project Structure


```
RamadanBiz-AI/
├── src/
│   ├── app/
│   │   ├── api/chat/
│   │   │   └── route.ts              # Agentic loop + HuggingFace LLM
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Chat UI (markdown, bubbles, animasi)
│   └── lib/
│       ├── ai/
│       │   └── system-prompt.ts      # Persona & instruksi AI (Ramadan UMKM)
│       └── mayar/
│           ├── tool-definitions.ts   # 16 Mayar tools (Anthropic SDK format)
│           ├── tool-executor.ts      # Mayar MCP caller (mode live)
│           ├── mock-data.ts          # 🎭 Data sintetis realistis (demo mode)
│           └── mock-executor.ts      # 🎭 16 mock tools handler (demo mode)
├── .gitignore
├── next.config.mjs
├── package.json
└── tsconfig.json
```


---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MySQL v8+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/GhazyUrbayani/GatherNote.git
cd GatherNote
```

### 2. Setup the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
DATABASE_URL="mysql://username:password@localhost:3306/gathernote_db"
PORT=3001
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
```

Initialize the database:

```bash
npm run db:generate
npm run db:push
```

Run the server:

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

> Server runs on `http://localhost:3001`

### 3. Setup the Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

> Client runs on `http://localhost:3000`

---

## 📚 API Overview

Base URL: `http://localhost:3001/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login & get JWT |
| `GET` | `/users/me` | Get own profile |
| `GET` | `/notes` | Get all notes |
| `POST` | `/notes` | Create note |
| `PUT` | `/notes/:id` | Update note |
| `DELETE` | `/notes/:id` | Delete note |
| `GET` | `/folders` | Get all folders |
| `POST` | `/groups` | Create group |
| `POST` | `/groups/join` | Join group via code |
| `GET` | `/search?q=...` | Full-text search |
| `POST` | `/notes/:id/share` | Set note visibility |
| `POST` | `/notes/:id/collaborators` | Add collaborator |

> 📮 Full API docs: import `server/GatherNote_API.postman_collection.json` into Postman.

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">
  <strong>Built with ❤️ by <a href="https://github.com/GhazyUrbayani">GhazyUrbayani</a> & GatherNote Team 🚀</strong>
</div>
