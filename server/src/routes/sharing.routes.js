const express = require('express');
const router = express.Router();
const sharingController = require('../controllers/sharing.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// All sharing routes require authentication (applied per-route, not globally)
// POST /api/v1/notes/:id/share
router.post('/:id/share', authenticateToken, sharingController.setVisibility);

// POST /api/v1/notes/:id/collaborators
router.post('/:id/collaborators', authenticateToken, sharingController.addCollaborator);

// GET /api/v1/notes/:id/collaborators
router.get('/:id/collaborators', authenticateToken, sharingController.getCollaborators);

// DELETE /api/v1/notes/:id/collaborators/:collaboratorId
router.delete('/:id/collaborators/:collaboratorId', authenticateToken, sharingController.removeCollaborator);

module.exports = router;
