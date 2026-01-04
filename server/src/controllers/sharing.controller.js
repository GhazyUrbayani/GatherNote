const db = require('../config/database');
const { notes, users, noteCollaborators, noteShareLinks, folders } = require('../config/schema');
const { isValidEmail, generateCode } = require('../utils/validator.util');
const { eq, and, or, sql } = require('drizzle-orm');
const crypto = require('crypto');

/**
 * Set note visibility
 * POST /api/v1/notes/:id/share
 */
const setVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { visibility } = req.body;

    // Validate visibility
    const validVisibilities = ['PRIVATE', 'PUBLIC', 'GROUP'];
    if (!visibility || !validVisibilities.includes(visibility.toUpperCase())) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Valid visibility values are: private, public, group'
      });
    }

    // Check ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Update visibility
    await db.update(notes)
      .set({ note_visibility: visibility.toUpperCase(), updated_at: new Date() })
      .where(eq(notes.id, parseInt(id)));

    const [updatedNote] = await db.select().from(notes).where(eq(notes.id, parseInt(id)));

    res.json({
      status: 'shared'
    });

  } catch (error) {
    console.error('Set visibility error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to set note visibility'
    });
  }
};

/**
 * Add collaborator to note
 * POST /api/v1/notes/:id/collaborators
 */
const addCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, permission } = req.body;

    // Validate input
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Valid email is required'
      });
    }

    const validPermissions = ['VIEW', 'EDIT'];
    const perm = permission ? permission.toUpperCase() : 'VIEW';
    if (!validPermissions.includes(perm)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Valid permission values are: view, edit'
      });
    }

    // Check note ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Find user by email
    const [collaboratorUser] = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!collaboratorUser) {
      return res.status(404).json({
        error: 'Not found',
        message: 'User with this email not found'
      });
    }

    // Don't allow owner to be added as collaborator
    if (collaboratorUser.id === req.user.userId) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Cannot add yourself as collaborator'
      });
    }

    // Check if already collaborator
    const [existing] = await db.select()
      .from(noteCollaborators)
      .where(and(eq(noteCollaborators.note_id, parseInt(id)), eq(noteCollaborators.user_id, collaboratorUser.id)))
      .limit(1);

    if (existing) {
      // Update permission if already exists
      await db.update(noteCollaborators)
        .set({ permission: perm })
        .where(eq(noteCollaborators.id, existing.id));

      const [updated] = await db.select({
        id: noteCollaborators.id,
        note_id: noteCollaborators.note_id,
        user_id: noteCollaborators.user_id,
        permission: noteCollaborators.permission,
        added_at: noteCollaborators.added_at,
        user: sql`JSON_OBJECT('id', ${users.id}, 'name', ${users.name}, 'email', ${users.email}, 'avatar_url', ${users.avatar_url})`
      })
      .from(noteCollaborators)
      .leftJoin(users, eq(noteCollaborators.user_id, users.id))
      .where(eq(noteCollaborators.id, existing.id));

      return res.json({
        status: 'added',
        collaborator_id: updated.id
      });
    }

    // Add new collaborator
    const [newCollab] = await db.insert(noteCollaborators).values({
      note_id: parseInt(id),
      user_id: collaboratorUser.id,
      permission: perm
    });

    const [collaborator] = await db.select({
      id: noteCollaborators.id,
      note_id: noteCollaborators.note_id,
      user_id: noteCollaborators.user_id,
      permission: noteCollaborators.permission,
      added_at: noteCollaborators.added_at,
      user: sql`JSON_OBJECT('id', ${users.id}, 'name', ${users.name}, 'email', ${users.email}, 'avatar_url', ${users.avatar_url})`
    })
    .from(noteCollaborators)
    .leftJoin(users, eq(noteCollaborators.user_id, users.id))
    .where(eq(noteCollaborators.id, newCollab.insertId));

    res.status(201).json({
      status: 'added',
      collaborator_id: collaborator.id
    });

  } catch (error) {
    console.error('Add collaborator error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to add collaborator'
    });
  }
};

/**
 * Get note collaborators
 * GET /api/v1/notes/:id/collaborators
 */
const getCollaborators = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user has access (owner or collaborator)
    const [noteOwned] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    const [noteCollab] = await db.select()
      .from(noteCollaborators)
      .where(and(eq(noteCollaborators.note_id, parseInt(id)), eq(noteCollaborators.user_id, req.user.userId)))
      .limit(1);

    if (!noteOwned && !noteCollab) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have access'
      });
    }

    // Get collaborators
    const collaborators = await db.select({
      id: noteCollaborators.id,
      note_id: noteCollaborators.note_id,
      user_id: noteCollaborators.user_id,
      permission: noteCollaborators.permission,
      added_at: noteCollaborators.added_at,
      user: sql`JSON_OBJECT('id', ${users.id}, 'name', ${users.name}, 'email', ${users.email}, 'avatar_url', ${users.avatar_url})`
    })
    .from(noteCollaborators)
    .leftJoin(users, eq(noteCollaborators.user_id, users.id))
    .where(eq(noteCollaborators.note_id, parseInt(id)))
    .orderBy(noteCollaborators.added_at);

    res.json({ collaborators });

  } catch (error) {
    console.error('Get collaborators error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to get collaborators'
    });
  }
};

/**
 * Remove collaborator from note
 * DELETE /api/v1/notes/:id/collaborators/:collaboratorId
 */
const removeCollaborator = async (req, res) => {
  try {
    const { id, collaboratorId } = req.params;

    // Check note ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Find and delete collaborator
    const [collaborator] = await db.select()
      .from(noteCollaborators)
      .where(and(eq(noteCollaborators.note_id, parseInt(id)), eq(noteCollaborators.user_id, parseInt(collaboratorId))))
      .limit(1);

    if (!collaborator) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Collaborator not found'
      });
    }

    await db.delete(noteCollaborators).where(eq(noteCollaborators.id, collaborator.id));

    res.json({
      status: 'revoked'
    });

  } catch (error) {
    console.error('Remove collaborator error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to remove collaborator'
    });
  }
};

/**
 * Generate share link for note
 * POST /api/v1/notes/:id/share-link
 */
const generateShareLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission, expires_in_days } = req.body;

    // Check note ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Validate permission
    const validPermissions = ['VIEW', 'EDIT'];
    const perm = permission ? permission.toUpperCase() : 'VIEW';
    if (!validPermissions.includes(perm)) {
      return res.status(400).json({
        error: 'Validation error',
        message: 'Valid permission values are: view, edit'
      });
    }

    // Generate unique share token
    const shareToken = crypto.randomBytes(32).toString('hex');

    // Calculate expiration date
    let expiresAt = null;
    if (expires_in_days && expires_in_days > 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expires_in_days));
    }

    // Create share link
    const [newLink] = await db.insert(noteShareLinks).values({
      note_id: parseInt(id),
      share_token: shareToken,
      permission: perm,
      expires_at: expiresAt,
      created_by: req.user.userId
    });

    const [shareLink] = await db.select()
      .from(noteShareLinks)
      .where(eq(noteShareLinks.id, newLink.insertId));

    res.status(201).json({
      share_token: shareLink.share_token,
      permission: shareLink.permission,
      expires_at: shareLink.expires_at,
      share_url: `/api/v1/sharing/${shareLink.share_token}`,
      created_at: shareLink.created_at
    });

  } catch (error) {
    console.error('Generate share link error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to generate share link'
    });
  }
};

/**
 * Get note by share token (PUBLIC - NO AUTH REQUIRED)
 * GET /api/v1/sharing/:shareToken
 */
const getNoteByShareToken = async (req, res) => {
  try {
    const { shareToken } = req.params;

    // Find share link
    const [shareLink] = await db.select()
      .from(noteShareLinks)
      .where(and(
        eq(noteShareLinks.share_token, shareToken),
        eq(noteShareLinks.is_active, true)
      ))
      .limit(1);

    if (!shareLink) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Share link not found or has been revoked'
      });
    }

    // Check if expired
    if (shareLink.expires_at && new Date(shareLink.expires_at) < new Date()) {
      return res.status(410).json({
        error: 'Expired',
        message: 'This share link has expired'
      });
    }

    // Get note with details
    const [note] = await db.select({
      id: notes.id,
      title: notes.title,
      content: notes.content,
      status: notes.note_status,
      priority: notes.priority,
      progress: notes.progress,
      visibility: notes.note_visibility,
      created_at: notes.created_at,
      updated_at: notes.updated_at,
      owner: sql`JSON_OBJECT('id', ${users.id}, 'name', ${users.name}, 'avatar_url', ${users.avatar_url})`,
      folder: sql`JSON_OBJECT('id', ${folders.id}, 'name', ${folders.name}, 'color', ${folders.color}, 'icon', ${folders.icon})`
    })
    .from(notes)
    .leftJoin(users, eq(notes.owner_id, users.id))
    .leftJoin(folders, eq(notes.folder_id, folders.id))
    .where(eq(notes.id, shareLink.note_id))
    .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found'
      });
    }

    res.json({
      note,
      share_info: {
        permission: shareLink.permission,
        expires_at: shareLink.expires_at
      }
    });

  } catch (error) {
    console.error('Get note by share token error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to get shared note'
    });
  }
};

/**
 * Get all share links for a note
 * GET /api/v1/notes/:id/share-links
 */
const getShareLinks = async (req, res) => {
  try {
    const { id } = req.params;

    // Check note ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Get all active share links
    const links = await db.select({
      id: noteShareLinks.id,
      share_token: noteShareLinks.share_token,
      permission: noteShareLinks.permission,
      expires_at: noteShareLinks.expires_at,
      is_active: noteShareLinks.is_active,
      created_at: noteShareLinks.created_at
    })
    .from(noteShareLinks)
    .where(eq(noteShareLinks.note_id, parseInt(id)));

    res.json({ share_links: links });

  } catch (error) {
    console.error('Get share links error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to get share links'
    });
  }
};

/**
 * Revoke share link
 * DELETE /api/v1/notes/:id/share-links/:linkId
 */
const revokeShareLink = async (req, res) => {
  try {
    const { id, linkId } = req.params;

    // Check note ownership
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, parseInt(id)), eq(notes.owner_id, req.user.userId)))
      .limit(1);

    if (!note) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Note not found or you do not have permission'
      });
    }

    // Find and deactivate share link
    const [link] = await db.select()
      .from(noteShareLinks)
      .where(and(
        eq(noteShareLinks.id, parseInt(linkId)),
        eq(noteShareLinks.note_id, parseInt(id))
      ))
      .limit(1);

    if (!link) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Share link not found'
      });
    }

    await db.update(noteShareLinks)
      .set({ is_active: false })
      .where(eq(noteShareLinks.id, parseInt(linkId)));

    res.json({
      status: 'revoked'
    });

  } catch (error) {
    console.error('Revoke share link error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to revoke share link'
    });
  }
};

module.exports = {
  setVisibility,
  addCollaborator,
  getCollaborators,
  removeCollaborator,
  generateShareLink,
  getNoteByShareToken,
  getShareLinks,
  revokeShareLink
};
