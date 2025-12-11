const express = require('express');
const router = express.Router();
const { summarizeNote } = require('../controllers/ai.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * @route POST /api/v1/ai/summarize
 * @desc Smart Note Summarizer - Meringkas catatan menggunakan AI
 * @access Private (Requires JWT Token)
 */
router.post('/summarize', authenticateToken, summarizeNote);

module.exports = router;
