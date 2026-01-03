const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');
const { authenticateToken, optionalAuth } = require('../middleware/auth.middleware');

// PUBLIC GET ROUTES (optional auth - for integration)
// GET /api/v1/groups
router.get('/', optionalAuth, groupController.getGroups);

// GET /api/v1/groups/:id
router.get('/:id', optionalAuth, groupController.getGroupById);

// PROTECTED ROUTES (require authentication)
// POST /api/v1/groups
router.post('/', authenticateToken, groupController.createGroup);

// POST /api/v1/groups/join
router.post('/join', authenticateToken, groupController.joinGroup);

// DELETE /api/v1/groups/:id/members/:userId
router.delete('/:id/members/:userId', authenticateToken, groupController.removeMember);

module.exports = router;
