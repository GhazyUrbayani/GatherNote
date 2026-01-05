const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth.middleware');

// PROTECTED ROUTES (require authentication) - MUST BE BEFORE /:id
// GET /api/v1/users/me
router.get('/me', authenticateToken, userController.getProfile);

// PUT /api/v1/users/me
router.put('/me', authenticateToken, userController.updateProfile);

// PUBLIC GET ROUTES (optional auth - for integration)
// GET /api/v1/users - List all users (public for integration)
router.get('/', optionalAuth, userController.getAllUsers);

// GET /api/v1/users/:id - Get user by ID (public for integration)
router.get('/:id', optionalAuth, userController.getUserById);

module.exports = router;