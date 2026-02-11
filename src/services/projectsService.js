// services/projectsService.js
import axiosClient from "../configs/axios";

export const projectsService = {
  getProjects: async (params = {}) => {
    try {
      
      const response = await axiosClient.get('/v1/projects', { params });
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjects service:', error);
      throw error;
    }
  },

  getProjectById: async (id) => {
    try {
      
      const response = await axiosClient.get(`/v1/projects/${id}`);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectById service:', error);
      throw error;
    }
  },

  getProjectsByStatus: async (status) => {
    try {
      
      const response = await axiosClient.get('/v1/projects', {
        params: { status }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsByStatus service:', error);
      throw error;
    }
  },

  searchProjects: async (searchTerm) => {
    try {
      
      const response = await axiosClient.get('/v1/projects/search', {
        params: { q: searchTerm }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in searchProjects service:', error);
      throw error;
    }
  },

  createProject: async (formData) => {
    try {
      
      const response = await axiosClient.post(`/v1/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in createProject service:', error);
      throw error;
    }
  },

  updateProject: async (id, formData) => {
    try {
      
      // DEBUG: Log entries
      

      const response = await axiosClient.put(`/v1/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in updateProject service:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      
      const response = await axiosClient.delete(`/v1/projects/${id}`);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in deleteProject service:', error);
      throw error;
    }
  },

  // Additional utility methods
  getFeaturedProjects: async () => {
    try {
      
      const response = await axiosClient.get('/v1/projects', {
        params: { featured: true }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getFeaturedProjects service:', error);
      throw error;
    }
  },

  getProjectsWithPagination: async (page = 1, limit = 10) => {
    try {
      
      const response = await axiosClient.get('/v1/projects', {
        params: { page, limit }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsWithPagination service:', error);
      throw error;
    }
  },

  // Get projects by type (draft/published)
  getProjectsByType: async (type) => {
    try {
      
      const response = await axiosClient.get('/v1/projects', {
        params: { status: type }
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsByType service:', error);
      throw error;
    }
  }, 
  submitProjectContactForm: async (projectId, formData) => {
    try {
      
      const response = await axiosClient.post(`/v1/projects/${projectId}/contact`, formData);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in submitProjectContactForm service:', error);
      throw error;
    }
  },
};