// services/newsletterService.js
import axiosClient from "../configs/axios";

export const newsletterService = {
  subscribe: async (formData) => {
    try {
      
      const response = await axiosClient.post('/v1/newsletter/subscribe', formData);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in newsletter subscription service:', error);
      throw error;
    }
  },

  // Optional: Get all subscribers (for admin)
  getSubscribers: async (params = {}) => {
    try {
      
      const response = await axiosClient.get('/v1/newsletter/subscribers', { params });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getSubscribers service:', error);
      throw error;
    }
  },

  // Optional: Unsubscribe
  unsubscribe: async (email) => {
    try {
      
      const response = await axiosClient.post('/v1/newsletter/unsubscribe', { email });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in unsubscribe service:', error);
      throw error;
    }
  }
};