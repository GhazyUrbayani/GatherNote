const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folder.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth.middleware');

// PUBLIC GET ROUTES (optional auth - for integration)
// GET /api/v1/folders
router.get('/', optionalAuth, folderController.getFolders);

// GET /api/v1/folders/pinned
router.get('/pinned', optionalAuth, folderController.getPinnedFolders);

// GET /api/v1/folders/:id
router.get('/:id', optionalAuth, folderController.getFolderById);

// PROTECTED ROUTES (require authentication)
// POST /api/v1/folders
router.post('/', authenticateToken, folderController.createFolder);

// PUT /api/v1/folders/:id
router.put('/:id', authenticateToken, folderController.updateFolder);

// DELETE /api/v1/folders/:id
router.delete('/:id', authenticateToken, folderController.deleteFolder);

module.exports = router;
