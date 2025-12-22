// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7004/api/v1';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Common headers with auth
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// ==================== AUTH API ====================
export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token && data.user) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id.toString());
      localStorage.setItem('userName', data.user.name);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
  }
};

// ==================== FOLDER API ====================
export const folderAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getById: async (folderId: number) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  create: async (name: string, description: string) => {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, description })
    });
    return response.json();
  },

  update: async (folderId: number, data: { name?: string, description?: string, is_pinned?: boolean }) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  delete: async (folderId: number) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.json();
  },

  togglePin: async (folderId: number, isPinned: boolean) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ is_pinned: isPinned })
    });
    return response.json();
  }
};

// ==================== NOTE API ====================
export const noteAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getById: async (noteId: number) => {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getByFolder: async (folderId: number) => {
    const response = await fetch(`${API_BASE_URL}/folders/${folderId}/notes`, {
      headers: getHeaders()
    });
    return response.json();
  },

  create: async (folderId: number, title: string, content: string, status: string = 'unstarted') => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ folder_id: folderId, title, content, status })
    });
    return response.json();
  },

  update: async (noteId: number, title: string, content: string, status?: string) => {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ title, content, status })
    });
    return response.json();
  },

  delete: async (noteId: number) => {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.json();
  }
};

// ==================== GROUP API ====================
export const groupAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/groups`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getById: async (groupId: number) => {
    const response = await fetch(`${API_BASE_URL}/groups/${groupId}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  create: async (name: string, description: string) => {
    const response = await fetch(`${API_BASE_URL}/groups`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, description })
    });
    return response.json();
  },

  join: async (groupCode: string) => {
    const response = await fetch(`${API_BASE_URL}/groups/join`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ group_code: groupCode })
    });
    return response.json();
  },

  leave: async (groupId: number) => {
    const response = await fetch(`${API_BASE_URL}/groups/${groupId}/leave`, {
      method: 'POST',
      headers: getHeaders()
    });
    return response.json();
  }
};

// ==================== SEARCH API ====================
export const searchAPI = {
  searchNotes: async (query: string) => {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`, {
      headers: getHeaders()
    });
    return response.json();
  }
};

// ==================== AI API ====================
export const aiAPI = {
  summarizeNote: async (content: string, language: string = 'id') => {
    const response = await fetch(`${API_BASE_URL}/ai/summarize`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ content, language })
    });
    return response.json();
  }
};

// ==================== USER API ====================
export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: getHeaders()
    });
    return response.json();
  },

  updateProfile: async (name: string, avatar_url?: string) => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ name, avatar_url })
    });
    return response.json();

  }
};

// ==================== INTEGRATION API (External CrowdFunding) ====================
export const integrationAPI = {
  // Get campaigns from external CrowdFunding API
  getCampaigns: async (type?: string) => {
    const query = type ? `?type=${type}` : '';
    const response = await fetch(`${API_BASE_URL}/integration/campaigns${query}`);
    return response.json();
  },

  // Get campaign detail
  getCampaignDetail: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/integration/campaigns/${id}`);
    return response.json();
  },

  // Get categories from external API
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/integration/categories`);
    return response.json();
  },

  // Get user profile/badges from external API
  getUserProfile: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/integration/users/${userId}/profile`);
    return response.json();
  },

  // Get donations from external API
  getDonations: async () => {
    const response = await fetch(`${API_BASE_URL}/integration/donations`);
    return response.json();
  }
};
