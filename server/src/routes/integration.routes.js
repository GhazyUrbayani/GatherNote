// src/routes/integration.routes.js
const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integration.controller');

/**
 * External API Integration Routes
 * Prefix: /api/v1/integration
 * 
 * These endpoints fetch data from external CrowdFunding API (cisitufc.fun)
 * NO AUTHENTICATION REQUIRED - Public endpoints
 */

// GET /api/v1/integration/campaigns?type=trending|new|urgent|popular
router.get('/campaigns', integrationController.getExternalCampaigns);

// GET /api/v1/integration/campaigns/:id
router.get('/campaigns/:id', integrationController.getExternalCampaignDetail);

// GET /api/v1/integration/categories
router.get('/categories', integrationController.getExternalCategories);

// GET /api/v1/integration/users/:id/profile
router.get('/users/:id/profile', integrationController.getExternalUserProfile);

// GET /api/v1/integration/donations
router.get('/donations', integrationController.getExternalDonations);

module.exports = router;
