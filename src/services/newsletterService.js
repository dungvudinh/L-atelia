// services/newsletterService.js
import axiosClient from "../configs/axios";

export const newsletterService = {
  subscribe: async (formData) => {
    try {
      console.log('📋 Subscribing to newsletter:', formData);
      
      const response = await axiosClient.post('/v1/newsletter/subscribe', formData);
      console.log('✅ Newsletter subscription successful');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in newsletter subscription service:', error);
      throw error;
    }
  },

  // Optional: Get all subscribers (for admin)
  getSubscribers: async (params = {}) => {
    try {
      console.log('📋 Fetching newsletter subscribers');
      
      const response = await axiosClient.get('/v1/newsletter/subscribers', { params });
      console.log('✅ Newsletter subscribers fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getSubscribers service:', error);
      throw error;
    }
  },

  // Optional: Unsubscribe
  unsubscribe: async (email) => {
    try {
      console.log(`📋 Unsubscribing: ${email}`);
      
      const response = await axiosClient.post('/v1/newsletter/unsubscribe', { email });
      console.log('✅ Unsubscription successful');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in unsubscribe service:', error);
      throw error;
    }
  }
};