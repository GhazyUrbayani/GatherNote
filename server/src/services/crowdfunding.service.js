// src/services/crowdfunding.service.js
const API_URL = "http://cisitufc.fun";

class CrowdFundingService {
  
  /**
   * Mengambil daftar kampanye (bisa filter)
   * @param {string} filterType - 'trending', 'new', 'urgent'
   */
  static async getCampaigns(filterType = 'newest') {
    try {
      const queryMap = {
        'trending': '?sort=popular',
        'new': '?sort=newest',
        'urgent': '?sort=ending_soon',
        'popular': '?sort=popular'
      };
      
      const query = queryMap[filterType] || '';
      const response = await fetch(`${API_URL}/api/campaigns/${query}`);
      
      if (!response.ok) throw new Error("Gagal fetch ke CrowdFunding");
      
      return await response.json();
    } catch (error) {
      console.error("External API Error (getCampaigns):", error.message);
      return [];
    }
  }

  /**
   * Mengambil List Kategori
   */
  static async getCategories() {
    try {
      const response = await fetch(`${API_URL}/api/categories/`);
      if (!response.ok) throw new Error("Gagal fetch categories");
      return await response.json();
    } catch (error) {
      console.error("External API Error (getCategories):", error.message);
      return [];
    }
  }

  /**
   * Mengambil Detail satu Kampanye
   * @param {number} id - Campaign ID
   */
  static async getCampaignDetail(id) {
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${id}/`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error("Gagal fetch campaign detail");
      return await response.json();
    } catch (error) {
      console.error("External API Error (getCampaignDetail):", error.message);
      return null;
    }
  }

  /**
   * Mengambil Profile User dari CrowdFunding
   * @param {number} userId - User ID
   */
  static async getUserProfile(userId) {
    try {
      const response = await fetch(`${API_URL}/api/user/profile/${userId}/`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error("Gagal fetch user profile");
      return await response.json();
    } catch (error) {
      console.error("External API Error (getUserProfile):", error.message);
      return null;
    }
  }

  /**
   * Mengambil semua donations
   */
  static async getDonations() {
    try {
      const response = await fetch(`${API_URL}/api/donations/`);
      if (!response.ok) throw new Error("Gagal fetch donations");
      return await response.json();
    } catch (error) {
      console.error("External API Error (getDonations):", error.message);
      return [];
    }
  }
}

module.exports = CrowdFundingService;
