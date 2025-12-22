// src/controllers/integration.controller.js
const CrowdFundingService = require('../services/crowdfunding.service');

/**
 * Get External Campaigns
 * GET /api/v1/integration/campaigns?type=trending
 */
exports.getExternalCampaigns = async (req, res) => {
  try {
    const { type } = req.query;
    const data = await CrowdFundingService.getCampaigns(type);
    
    // Handle jika data adalah object dengan property results (pagination)
    const campaigns = Array.isArray(data) ? data : (data.results || data.data || []);
    
    res.status(200).json({
      source: "CrowdFunding Partner - cisitufc.fun",
      total_data: campaigns.length,
      data: campaigns
    });
  } catch (error) {
    console.error("Integration Error:", error);
    res.status(500).json({
      error: "Integration Error",
      message: "Failed to fetch external campaigns"
    });
  }
};

/**
 * Get External Categories
 * GET /api/v1/integration/categories
 */
exports.getExternalCategories = async (req, res) => {
  try {
    const data = await CrowdFundingService.getCategories();
    const categories = Array.isArray(data) ? data : (data.results || data.data || []);
    
    res.status(200).json({
      source: "CrowdFunding Partner - cisitufc.fun",
      total_data: categories.length,
      categories: categories
    });
  } catch (error) {
    console.error("Integration Error:", error);
    res.status(500).json({
      error: "Integration Error",
      message: "Failed to fetch external categories"
    });
  }
};

/**
 * Get External Campaign Detail
 * GET /api/v1/integration/campaigns/:id
 */
exports.getExternalCampaignDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CrowdFundingService.getCampaignDetail(id);
    
    if (!data) {
      return res.status(404).json({
        error: "Not Found",
        message: "Campaign not found"
      });
    }
    
    res.status(200).json({
      source: "CrowdFunding Partner - cisitufc.fun",
      campaign: data
    });
  } catch (error) {
    console.error("Integration Error:", error);
    res.status(500).json({
      error: "Integration Error",
      message: "Failed to fetch campaign detail"
    });
  }
};

/**
 * Get External User Profile (Badges/Donor Status)
 * GET /api/v1/integration/users/:id/profile
 */
exports.getExternalUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CrowdFundingService.getUserProfile(id);
    
    if (!data) {
      return res.status(404).json({
        error: "Not Found",
        message: "User profile not found"
      });
    }
    
    res.status(200).json({
      source: "CrowdFunding Partner - cisitufc.fun",
      profile: data
    });
  } catch (error) {
    console.error("Integration Error:", error);
    res.status(500).json({
      error: "Integration Error",
      message: "Failed to fetch user profile"
    });
  }
};

/**
 * Get External Donations
 * GET /api/v1/integration/donations
 */
exports.getExternalDonations = async (req, res) => {
  try {
    const data = await CrowdFundingService.getDonations();
    const donations = Array.isArray(data) ? data : (data.results || data.data || []);
    
    res.status(200).json({
      source: "CrowdFunding Partner - cisitufc.fun",
      total_data: donations.length,
      donations: donations
    });
  } catch (error) {
    console.error("Integration Error:", error);
    res.status(500).json({
      error: "Integration Error",
      message: "Failed to fetch donations"
    });
  }
};
