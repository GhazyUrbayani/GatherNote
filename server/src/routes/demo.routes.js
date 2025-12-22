const express = require('express');
const router = express.Router();

/**
 * DEMO/DUMMY DATA ENDPOINTS - NO AUTHENTICATION REQUIRED
 * Access directly at /api/v1/demo/folders, /api/v1/demo/users, etc.
 */

// ==================== DUMMY USERS ====================
router.get('/users', (req, res) => {
  res.json({
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        avatar_url: "https://i.pravatar.cc/150?img=1",
        created_at: "2025-12-01T08:00:00.000Z"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        avatar_url: "https://i.pravatar.cc/150?img=2",
        created_at: "2025-12-05T10:30:00.000Z"
      },
      {
        id: 3,
        name: "Ahmad Rizki",
        email: "ahmad.rizki@example.com",
        avatar_url: "https://i.pravatar.cc/150?img=3",
        created_at: "2025-12-10T14:15:00.000Z"
      }
    ]
  });
});

router.get('/users/me', (req, res) => {
  res.json({
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar_url: "https://i.pravatar.cc/150?img=1",
      created_at: "2025-12-01T08:00:00.000Z"
    }
  });
});

// ==================== DUMMY FOLDERS ====================
router.get('/folders', (req, res) => {
  res.json({
    folders: [
      {
        id: 1,
        owner_id: 1,
        name: "Entrepreneurship",
        description: "Business ideas and startup notes",
        color: "#1E3A8A",
        icon: "💡",
        is_pinned: true,
        created_at: "2025-12-01T08:00:00.000Z",
        _count: 5
      },
      {
        id: 2,
        owner_id: 1,
        name: "Machine Learning",
        description: "AI and ML study materials",
        color: "#059669",
        icon: "🤖",
        is_pinned: true,
        created_at: "2025-12-05T10:30:00.000Z",
        _count: 8
      },
      {
        id: 3,
        owner_id: 1,
        name: "Web Development",
        description: "Frontend and backend tutorials",
        color: "#7C3AED",
        icon: "💻",
        is_pinned: false,
        created_at: "2025-12-10T14:15:00.000Z",
        _count: 12
      },
      {
        id: 4,
        owner_id: 1,
        name: "Personal",
        description: "Personal notes and thoughts",
        color: "#DC2626",
        icon: "📝",
        is_pinned: false,
        created_at: "2025-12-15T09:00:00.000Z",
        _count: 3
      }
    ]
  });
});

router.get('/folders/pinned', (req, res) => {
  res.json({
    folders: [
      {
        id: 1,
        owner_id: 1,
        name: "Entrepreneurship",
        description: "Business ideas and startup notes",
        color: "#1E3A8A",
        icon: "💡",
        is_pinned: true,
        created_at: "2025-12-01T08:00:00.000Z",
        _count: 5
      },
      {
        id: 2,
        owner_id: 1,
        name: "Machine Learning",
        description: "AI and ML study materials",
        color: "#059669",
        icon: "🤖",
        is_pinned: true,
        created_at: "2025-12-05T10:30:00.000Z",
        _count: 8
      }
    ]
  });
});

router.get('/folders/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    folder: {
      id: parseInt(id),
      owner_id: 1,
      name: "Entrepreneurship",
      description: "Business ideas and startup notes",
      color: "#1E3A8A",
      icon: "💡",
      is_pinned: true,
      created_at: "2025-12-01T08:00:00.000Z",
      notes: [
        {
          id: 1,
          folder_id: parseInt(id),
          owner_id: 1,
          title: "Startup Ideas 2025",
          content: "# Startup Ideas\n\n1. AI-powered note taking\n2. Smart calendar app\n3. Collaborative workspace",
          status: "IN_PROGRESS",
          visibility: "PRIVATE",
          created_at: "2025-12-01T08:30:00.000Z",
          updated_at: "2025-12-20T15:00:00.000Z"
        },
        {
          id: 2,
          folder_id: parseInt(id),
          owner_id: 1,
          title: "Business Model Canvas",
          content: "# Business Model Canvas\n\n## Value Proposition\n- Easy note organization\n- AI summaries",
          status: "COMPLETED",
          visibility: "PRIVATE",
          created_at: "2025-12-02T09:00:00.000Z",
          updated_at: "2025-12-18T11:30:00.000Z"
        }
      ]
    }
  });
});

// ==================== DUMMY NOTES ====================
router.get('/notes', (req, res) => {
  res.json({
    notes: [
      {
        id: 1,
        folder_id: 1,
        owner_id: 1,
        title: "Startup Ideas 2025",
        content: "# Startup Ideas\n\n1. AI-powered note taking\n2. Smart calendar app\n3. Collaborative workspace",
        status: "IN_PROGRESS",
        visibility: "PRIVATE",
        created_at: "2025-12-01T08:30:00.000Z",
        updated_at: "2025-12-20T15:00:00.000Z"
      },
      {
        id: 2,
        folder_id: 1,
        owner_id: 1,
        title: "Business Model Canvas",
        content: "# Business Model Canvas\n\n## Value Proposition\n- Easy note organization\n- AI summaries",
        status: "COMPLETED",
        visibility: "PRIVATE",
        created_at: "2025-12-02T09:00:00.000Z",
        updated_at: "2025-12-18T11:30:00.000Z"
      },
      {
        id: 3,
        folder_id: 2,
        owner_id: 1,
        title: "Neural Networks Basics",
        content: "# Neural Networks\n\n## Introduction\nNeural networks are computing systems inspired by biological neural networks.",
        status: "IN_PROGRESS",
        visibility: "PUBLIC",
        created_at: "2025-12-05T11:00:00.000Z",
        updated_at: "2025-12-19T14:00:00.000Z"
      },
      {
        id: 4,
        folder_id: 3,
        owner_id: 1,
        title: "React Best Practices",
        content: "# React Best Practices\n\n1. Use functional components\n2. Implement proper state management\n3. Optimize with useMemo and useCallback",
        status: "UNSTARTED",
        visibility: "SHARED",
        created_at: "2025-12-10T15:00:00.000Z",
        updated_at: "2025-12-10T15:00:00.000Z"
      }
    ]
  });
});

router.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    note: {
      id: parseInt(id),
      folder_id: 1,
      owner_id: 1,
      title: "Startup Ideas 2025",
      content: "# Startup Ideas\n\n## Tech Startups\n1. AI-powered note taking app\n2. Smart calendar with ML predictions\n3. Collaborative workspace for remote teams\n\n## Key Features\n- Real-time collaboration\n- AI summaries\n- Cross-platform sync\n\n## Next Steps\n- [ ] Market research\n- [ ] MVP development\n- [ ] User testing",
      status: "IN_PROGRESS",
      visibility: "PRIVATE",
      created_at: "2025-12-01T08:30:00.000Z",
      updated_at: "2025-12-20T15:00:00.000Z"
    }
  });
});

// ==================== DUMMY GROUPS ====================
router.get('/groups', (req, res) => {
  res.json({
    groups: [
      {
        id: 1,
        name: "TST Study Group",
        description: "Kelompok belajar Teknologi Sistem Terintegrasi",
        join_code: "TST2025X",
        created_at: "2025-12-01T08:00:00.000Z",
        _count: 15,
        my_role: "ADMIN"
      },
      {
        id: 2,
        name: "Web Dev Indonesia",
        description: "Komunitas developer web Indonesia",
        join_code: "WEBDEV99",
        created_at: "2025-12-05T10:00:00.000Z",
        _count: 128,
        my_role: "MEMBER"
      },
      {
        id: 3,
        name: "AI Research Team",
        description: "Tim riset kecerdasan buatan",
        join_code: "AIRSRCH1",
        created_at: "2025-12-10T14:00:00.000Z",
        _count: 8,
        my_role: "MEMBER"
      }
    ]
  });
});

router.get('/groups/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    group: {
      id: parseInt(id),
      name: "TST Study Group",
      description: "Kelompok belajar Teknologi Sistem Terintegrasi",
      join_code: "TST2025X",
      created_at: "2025-12-01T08:00:00.000Z",
      my_role: "ADMIN",
      members: [
        {
          id: 1,
          user_id: 1,
          role: "ADMIN",
          joined_at: "2025-12-01T08:00:00.000Z",
          user: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            avatar_url: "https://i.pravatar.cc/150?img=1"
          }
        },
        {
          id: 2,
          user_id: 2,
          role: "MEMBER",
          joined_at: "2025-12-02T09:00:00.000Z",
          user: {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            avatar_url: "https://i.pravatar.cc/150?img=2"
          }
        },
        {
          id: 3,
          user_id: 3,
          role: "MEMBER",
          joined_at: "2025-12-03T10:00:00.000Z",
          user: {
            id: 3,
            name: "Ahmad Rizki",
            email: "ahmad.rizki@example.com",
            avatar_url: "https://i.pravatar.cc/150?img=3"
          }
        }
      ]
    }
  });
});

// ==================== DUMMY SEARCH ====================
router.get('/search', (req, res) => {
  const { q } = req.query;
  res.json({
    query: q || "startup",
    results: {
      notes: [
        {
          id: 1,
          title: "Startup Ideas 2025",
          content: "# Startup Ideas...",
          folder_id: 1,
          folder_name: "Entrepreneurship"
        },
        {
          id: 2,
          title: "Business Model Canvas",
          content: "# Business Model...",
          folder_id: 1,
          folder_name: "Entrepreneurship"
        }
      ],
      folders: [
        {
          id: 1,
          name: "Entrepreneurship",
          description: "Business ideas and startup notes"
        }
      ]
    }
  });
});

// ==================== DUMMY AI SUMMARY ====================
router.get('/ai/summarize/:noteId', (req, res) => {
  res.json({
    noteId: parseInt(req.params.noteId),
    summary: "Catatan ini membahas ide-ide startup untuk tahun 2025, termasuk aplikasi pencatatan berbasis AI, kalender pintar dengan prediksi ML, dan workspace kolaboratif untuk tim remote. Fitur utama yang direncanakan meliputi kolaborasi real-time, ringkasan AI, dan sinkronisasi lintas platform. Langkah selanjutnya adalah riset pasar, pengembangan MVP, dan uji coba pengguna."
  });
});

// ==================== DUMMY SHARING ====================
router.get('/sharing/shared-with-me', (req, res) => {
  res.json({
    notes: [
      {
        id: 5,
        title: "Project Timeline Q1 2026",
        content: "# Project Timeline\n\n## January\n- Kickoff meeting\n- Requirements gathering",
        owner: {
          id: 2,
          name: "Jane Smith",
          avatar_url: "https://i.pravatar.cc/150?img=2"
        },
        permission: "VIEW",
        shared_at: "2025-12-15T09:00:00.000Z"
      },
      {
        id: 6,
        title: "API Documentation Draft",
        content: "# API Documentation\n\n## Endpoints\n- GET /api/v1/users\n- POST /api/v1/auth/login",
        owner: {
          id: 3,
          name: "Ahmad Rizki",
          avatar_url: "https://i.pravatar.cc/150?img=3"
        },
        permission: "EDIT",
        shared_at: "2025-12-18T11:30:00.000Z"
      }
    ]
  });
});

// ==================== ROOT DEMO INFO ====================
router.get('/', (req, res) => {
  res.json({
    message: "GatherNote Demo API - Dummy Data Endpoints",
    description: "These endpoints return dummy/sample data without authentication",
    endpoints: {
      users: {
        "GET /api/v1/demo/users": "Get all dummy users",
        "GET /api/v1/demo/users/me": "Get current user profile (dummy)"
      },
      folders: {
        "GET /api/v1/demo/folders": "Get all dummy folders",
        "GET /api/v1/demo/folders/pinned": "Get pinned folders (dummy)",
        "GET /api/v1/demo/folders/:id": "Get folder by ID with notes (dummy)"
      },
      notes: {
        "GET /api/v1/demo/notes": "Get all dummy notes",
        "GET /api/v1/demo/notes/:id": "Get note by ID (dummy)"
      },
      groups: {
        "GET /api/v1/demo/groups": "Get all dummy groups",
        "GET /api/v1/demo/groups/:id": "Get group by ID with members (dummy)"
      },
      search: {
        "GET /api/v1/demo/search?q=query": "Search dummy data"
      },
      ai: {
        "GET /api/v1/demo/ai/summarize/:noteId": "Get AI summary (dummy)"
      },
      sharing: {
        "GET /api/v1/demo/sharing/shared-with-me": "Get shared notes (dummy)"
      }
    }
  });
});

module.exports = router;
