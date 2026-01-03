const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth.middleware');

// PUBLIC GET ROUTES (optional auth - for integration)
// GET /api/v1/notes?sort=newest&status=ongoing
router.get('/', optionalAuth, noteController.getNotes);

// GET /api/v1/notes/:id
router.get('/:id', optionalAuth, noteController.getNoteById);

// PROTECTED ROUTES (require authentication)
// POST /api/v1/notes
router.post('/', authenticateToken, noteController.createNote);

// PUT /api/v1/notes/:id
router.put('/:id', authenticateToken, noteController.updateNote);

// DELETE /api/v1/notes/:id
router.delete('/:id', authenticateToken, noteController.deleteNote);

// PATCH /api/v1/notes/:id/pin
router.patch('/:id/pin', authenticateToken, noteController.togglePin);

// PATCH /api/v1/notes/:id/move
router.patch('/:id/move', authenticateToken, noteController.moveNote);

module.exports = router;
