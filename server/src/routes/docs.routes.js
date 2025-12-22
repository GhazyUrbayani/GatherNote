const express = require('express');
const router = express.Router();

/**
 * API Documentation - Shows all endpoint responses without authentication
 * GET /api/v1/docs
 */

const apiDocumentation = {
  info: {
    title: "GatherNote API",
    version: "1.0.0",
    description: "API Documentation for GatherNote Application",
    baseUrl: "/api/v1"
  },

  // ==================== AUTH ENDPOINTS ====================
  auth: {
    register: {
      endpoint: "POST /api/v1/auth/register",
      description: "Register a new user account",
      request: {
        body: {
          name: "string (required)",
          email: "string (required)",
          password: "string (required, min 6 characters)"
        }
      },
      responses: {
        201: {
          message: "User registered successfully",
          user: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            created_at: "2025-12-22T10:00:00.000Z"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        400: {
          error: "Validation error",
          message: "Email already registered"
        },
        500: {
          error: "Server error",
          message: "Failed to register user"
        }
      }
    },
    login: {
      endpoint: "POST /api/v1/auth/login",
      description: "Login to existing account",
      request: {
        body: {
          email: "string (required)",
          password: "string (required)"
        }
      },
      responses: {
        200: {
          message: "Login successful",
          user: {
            id: 1,
            name: "John Doe",
            email: "john@example.com"
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        },
        401: {
          error: "Authentication failed",
          message: "Invalid email or password"
        },
        500: {
          error: "Server error",
          message: "Failed to login"
        }
      }
    }
  },

  // ==================== USER ENDPOINTS ====================
  users: {
    getProfile: {
      endpoint: "GET /api/v1/users/me",
      description: "Get current user profile",
      authentication: "Bearer Token (required)",
      responses: {
        200: {
          user: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            avatar_url: "https://example.com/avatar.jpg",
            created_at: "2025-12-22T10:00:00.000Z"
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "User not found"
        }
      }
    },
    updateProfile: {
      endpoint: "PUT /api/v1/users/me",
      description: "Update current user profile",
      authentication: "Bearer Token (required)",
      request: {
        body: {
          name: "string (optional)",
          avatar_url: "string (optional)"
        }
      },
      responses: {
        200: {
          message: "Profile updated successfully",
          user: {
            id: 1,
            name: "John Doe Updated",
            email: "john@example.com",
            avatar_url: "https://example.com/new-avatar.jpg"
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    }
  },

  // ==================== FOLDER ENDPOINTS ====================
  folders: {
    getAll: {
      endpoint: "GET /api/v1/folders",
      description: "Get all folders for current user",
      authentication: "Bearer Token (required)",
      responses: {
        200: {
          folders: [
            {
              id: 1,
              owner_id: 1,
              name: "My Notes",
              description: "Personal notes folder",
              color: "#1E3A8A",
              icon: "📁",
              is_pinned: true,
              created_at: "2025-12-22T10:00:00.000Z",
              _count: 5
            }
          ]
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    getById: {
      endpoint: "GET /api/v1/folders/:id",
      description: "Get folder details with notes",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (folder ID)"
      },
      responses: {
        200: {
          folder: {
            id: 1,
            owner_id: 1,
            name: "My Notes",
            description: "Personal notes folder",
            color: "#1E3A8A",
            icon: "📁",
            is_pinned: true,
            created_at: "2025-12-22T10:00:00.000Z",
            notes: [
              {
                id: 1,
                folder_id: 1,
                owner_id: 1,
                title: "Meeting Notes",
                content: "# Meeting Notes\n\nDiscussion points...",
                status: "IN_PROGRESS",
                visibility: "PRIVATE",
                created_at: "2025-12-22T10:00:00.000Z",
                updated_at: "2025-12-22T11:00:00.000Z"
              }
            ]
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Folder not found"
        }
      }
    },
    create: {
      endpoint: "POST /api/v1/folders",
      description: "Create a new folder",
      authentication: "Bearer Token (required)",
      request: {
        body: {
          name: "string (required)",
          description: "string (optional)",
          color: "string (optional)",
          icon: "string (optional)"
        }
      },
      responses: {
        201: {
          message: "Folder created successfully",
          folder: {
            id: 1,
            owner_id: 1,
            name: "New Folder",
            description: "Folder description",
            color: "#1E3A8A",
            icon: "📁",
            is_pinned: false,
            created_at: "2025-12-22T10:00:00.000Z"
          }
        },
        400: {
          error: "Validation error",
          message: "Folder name is required"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    update: {
      endpoint: "PUT /api/v1/folders/:id",
      description: "Update folder details",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (folder ID)"
      },
      request: {
        body: {
          name: "string (optional)",
          description: "string (optional)",
          color: "string (optional)",
          icon: "string (optional)",
          is_pinned: "boolean (optional)"
        }
      },
      responses: {
        200: {
          message: "Folder updated successfully",
          folder: {
            id: 1,
            owner_id: 1,
            name: "Updated Folder",
            description: "Updated description",
            is_pinned: true
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Folder not found"
        }
      }
    },
    delete: {
      endpoint: "DELETE /api/v1/folders/:id",
      description: "Delete a folder",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (folder ID)"
      },
      responses: {
        200: {
          message: "Folder deleted successfully"
        },
        400: {
          error: "Validation error",
          message: "Cannot delete folder with notes. Please move or delete notes first."
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Folder not found"
        }
      }
    }
  },

  // ==================== NOTE ENDPOINTS ====================
  notes: {
    getAll: {
      endpoint: "GET /api/v1/notes",
      description: "Get all notes for current user",
      authentication: "Bearer Token (required)",
      responses: {
        200: {
          notes: [
            {
              id: 1,
              folder_id: 1,
              owner_id: 1,
              title: "Meeting Notes",
              content: "# Meeting Notes\n\nDiscussion points...",
              status: "IN_PROGRESS",
              visibility: "PRIVATE",
              created_at: "2025-12-22T10:00:00.000Z",
              updated_at: "2025-12-22T11:00:00.000Z"
            }
          ]
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    getById: {
      endpoint: "GET /api/v1/notes/:id",
      description: "Get note details",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (note ID)"
      },
      responses: {
        200: {
          note: {
            id: 1,
            folder_id: 1,
            owner_id: 1,
            title: "Meeting Notes",
            content: "# Meeting Notes\n\nDiscussion points...",
            status: "IN_PROGRESS",
            visibility: "PRIVATE",
            created_at: "2025-12-22T10:00:00.000Z",
            updated_at: "2025-12-22T11:00:00.000Z"
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        403: {
          error: "Forbidden",
          message: "You do not have access to this note"
        },
        404: {
          error: "Not found",
          message: "Note not found"
        }
      }
    },
    getByFolder: {
      endpoint: "GET /api/v1/folders/:folderId/notes",
      description: "Get all notes in a folder",
      authentication: "Bearer Token (required)",
      parameters: {
        folderId: "number (folder ID)"
      },
      responses: {
        200: {
          notes: [
            {
              id: 1,
              folder_id: 1,
              owner_id: 1,
              title: "Meeting Notes",
              content: "# Meeting Notes",
              status: "IN_PROGRESS",
              visibility: "PRIVATE"
            }
          ]
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    create: {
      endpoint: "POST /api/v1/notes",
      description: "Create a new note",
      authentication: "Bearer Token (required)",
      request: {
        body: {
          folder_id: "number (required)",
          title: "string (required)",
          content: "string (optional)",
          status: "string (optional) - UNSTARTED, IN_PROGRESS, COMPLETED",
          visibility: "string (optional) - PRIVATE, PUBLIC, SHARED"
        }
      },
      responses: {
        201: {
          message: "Note created successfully",
          note: {
            id: 1,
            folder_id: 1,
            owner_id: 1,
            title: "New Note",
            content: "",
            status: "UNSTARTED",
            visibility: "PRIVATE",
            created_at: "2025-12-22T10:00:00.000Z"
          }
        },
        400: {
          error: "Validation error",
          message: "Title is required"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    update: {
      endpoint: "PUT /api/v1/notes/:id",
      description: "Update note details",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (note ID)"
      },
      request: {
        body: {
          title: "string (optional)",
          content: "string (optional)",
          status: "string (optional) - UNSTARTED, IN_PROGRESS, COMPLETED",
          visibility: "string (optional) - PRIVATE, PUBLIC, SHARED"
        }
      },
      responses: {
        200: {
          message: "Note updated successfully",
          note: {
            id: 1,
            title: "Updated Note",
            content: "Updated content...",
            status: "COMPLETED",
            updated_at: "2025-12-22T12:00:00.000Z"
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Note not found"
        }
      }
    },
    delete: {
      endpoint: "DELETE /api/v1/notes/:id",
      description: "Delete a note",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (note ID)"
      },
      responses: {
        200: {
          message: "Note deleted successfully"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Note not found"
        }
      }
    }
  },

  // ==================== GROUP ENDPOINTS ====================
  groups: {
    getAll: {
      endpoint: "GET /api/v1/groups",
      description: "Get all groups user is a member of",
      authentication: "Bearer Token (required)",
      responses: {
        200: {
          groups: [
            {
              id: 1,
              name: "Study Group",
              description: "Group for studying together",
              join_code: "ABC12345",
              created_at: "2025-12-22T10:00:00.000Z",
              _count: 5,
              my_role: "ADMIN"
            }
          ]
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    getById: {
      endpoint: "GET /api/v1/groups/:id",
      description: "Get group details with members",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (group ID)"
      },
      responses: {
        200: {
          group: {
            id: 1,
            name: "Study Group",
            description: "Group for studying together",
            join_code: "ABC12345",
            created_at: "2025-12-22T10:00:00.000Z",
            my_role: "ADMIN",
            members: [
              {
                id: 1,
                user_id: 1,
                role: "ADMIN",
                joined_at: "2025-12-22T10:00:00.000Z",
                user: {
                  id: 1,
                  name: "John Doe",
                  email: "john@example.com"
                }
              }
            ]
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        403: {
          error: "Forbidden",
          message: "You are not a member of this group"
        },
        404: {
          error: "Not found",
          message: "Group not found"
        }
      }
    },
    create: {
      endpoint: "POST /api/v1/groups",
      description: "Create a new group",
      authentication: "Bearer Token (required)",
      request: {
        body: {
          name: "string (required)",
          description: "string (optional)"
        }
      },
      responses: {
        201: {
          message: "Group created successfully",
          group: {
            id: 1,
            name: "New Group",
            description: "Group description",
            join_code: "XYZ98765",
            created_at: "2025-12-22T10:00:00.000Z"
          }
        },
        400: {
          error: "Validation error",
          message: "Group name is required"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    },
    join: {
      endpoint: "POST /api/v1/groups/join",
      description: "Join a group using join code",
      authentication: "Bearer Token (required)",
      request: {
        body: {
          join_code: "string (required)"
        }
      },
      responses: {
        200: {
          message: "Joined group successfully",
          group: {
            id: 1,
            name: "Study Group",
            description: "Group description"
          }
        },
        400: {
          error: "Validation error",
          message: "Already a member of this group"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Invalid join code"
        }
      }
    },
    leave: {
      endpoint: "POST /api/v1/groups/:id/leave",
      description: "Leave a group",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (group ID)"
      },
      responses: {
        200: {
          message: "Left group successfully"
        },
        400: {
          error: "Validation error",
          message: "Admin cannot leave. Transfer ownership first."
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "You are not a member of this group"
        }
      }
    },
    update: {
      endpoint: "PUT /api/v1/groups/:id",
      description: "Update group details (Admin only)",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (group ID)"
      },
      request: {
        body: {
          name: "string (optional)",
          description: "string (optional)"
        }
      },
      responses: {
        200: {
          message: "Group updated successfully",
          group: {
            id: 1,
            name: "Updated Group Name",
            description: "Updated description"
          }
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        403: {
          error: "Forbidden",
          message: "Only admin can update group"
        }
      }
    },
    delete: {
      endpoint: "DELETE /api/v1/groups/:id",
      description: "Delete a group (Admin only)",
      authentication: "Bearer Token (required)",
      parameters: {
        id: "number (group ID)"
      },
      responses: {
        200: {
          message: "Group deleted successfully"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        403: {
          error: "Forbidden",
          message: "Only admin can delete group"
        }
      }
    }
  },

  // ==================== AI ENDPOINTS ====================
  ai: {
    summarize: {
      endpoint: "POST /api/v1/ai/summarize/:noteId",
      description: "Generate AI summary for a note",
      authentication: "Bearer Token (required)",
      parameters: {
        noteId: "number (note ID)"
      },
      responses: {
        200: {
          summary: "This note discusses the key points from the meeting including project timeline, assigned tasks, and next steps..."
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Note not found"
        },
        500: {
          error: "AI error",
          message: "Failed to generate summary"
        }
      }
    }
  },

  // ==================== SEARCH ENDPOINTS ====================
  search: {
    search: {
      endpoint: "GET /api/v1/search",
      description: "Search notes and folders",
      authentication: "Bearer Token (required)",
      query: {
        q: "string (required) - search query",
        type: "string (optional) - 'notes', 'folders', or 'all'"
      },
      responses: {
        200: {
          results: {
            notes: [
              {
                id: 1,
                title: "Meeting Notes",
                content: "Content preview...",
                folder_id: 1
              }
            ],
            folders: [
              {
                id: 1,
                name: "Work",
                description: "Work related notes"
              }
            ]
          }
        },
        400: {
          error: "Validation error",
          message: "Search query is required"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    }
  },

  // ==================== SHARING ENDPOINTS ====================
  sharing: {
    shareNote: {
      endpoint: "POST /api/v1/sharing/notes/:noteId/share",
      description: "Share a note with another user",
      authentication: "Bearer Token (required)",
      parameters: {
        noteId: "number (note ID)"
      },
      request: {
        body: {
          user_id: "number (required) - user to share with",
          permission: "string (optional) - 'VIEW' or 'EDIT'"
        }
      },
      responses: {
        200: {
          message: "Note shared successfully"
        },
        400: {
          error: "Validation error",
          message: "Already shared with this user"
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        },
        404: {
          error: "Not found",
          message: "Note not found"
        }
      }
    },
    getSharedNotes: {
      endpoint: "GET /api/v1/sharing/shared-with-me",
      description: "Get all notes shared with current user",
      authentication: "Bearer Token (required)",
      responses: {
        200: {
          notes: [
            {
              id: 1,
              title: "Shared Note",
              content: "Content...",
              owner: {
                id: 2,
                name: "Jane Doe"
              },
              permission: "VIEW",
              shared_at: "2025-12-22T10:00:00.000Z"
            }
          ]
        },
        401: {
          error: "Access denied",
          message: "No token provided"
        }
      }
    }
  }
};

// Main documentation endpoint
router.get('/', (req, res) => {
  res.json(apiDocumentation);
});

// Get specific endpoint documentation
router.get('/:category', (req, res) => {
  const { category } = req.params;
  
  if (apiDocumentation[category]) {
    res.json({
      category: category,
      endpoints: apiDocumentation[category]
    });
  } else {
    res.status(404).json({
      error: "Not found",
      message: `Documentation for '${category}' not found`,
      availableCategories: Object.keys(apiDocumentation).filter(k => k !== 'info')
    });
  }
});

// Get specific endpoint detail
router.get('/:category/:endpoint', (req, res) => {
  const { category, endpoint } = req.params;
  
  if (apiDocumentation[category] && apiDocumentation[category][endpoint]) {
    res.json(apiDocumentation[category][endpoint]);
  } else {
    res.status(404).json({
      error: "Not found",
      message: `Endpoint '${endpoint}' in category '${category}' not found`
    });
  }
});

module.exports = router;
