const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth.middleware');

// PUBLIC GET ROUTES (optional auth - for integration)
// GET /api/v1/users - List all users (public for integration)
router.get('/', optionalAuth, userController.getAllUsers);

// PROTECTED ROUTES (require authentication)
// GET /api/v1/users/me
router.get('/me', authenticateToken, userController.getProfile);

// PUT /api/v1/users/me
router.put('/me', authenticateToken, userController.updateProfile);

module.exports = router;