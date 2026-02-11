// services/projectsService.js
import axiosClient from "../configs/axios";

export const projectsService = {
  getProjects: async (params = {}) => {
    try {
      console.log('📋 Fetching projects with params:', params);
      
      const response = await axiosClient.get('/v1/projects', { params });
      console.log('✅ Projects fetched successfully');
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjects service:', error);
      throw error;
    }
  },

  getProjectById: async (id) => {
    try {
      console.log(`📋 Fetching project with ID: ${id}`);
      
      const response = await axiosClient.get(`/v1/projects/${id}`);
      console.log('✅ Project fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectById service:', error);
      throw error;
    }
  },

  getProjectsByStatus: async (status) => {
    try {
      console.log(`📋 Fetching projects by status: ${status}`);
      
      const response = await axiosClient.get('/v1/projects', {
        params: { status }
      });
      console.log('✅ Projects by status fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsByStatus service:', error);
      throw error;
    }
  },

  searchProjects: async (searchTerm) => {
    try {
      console.log(`🔍 Searching projects with term: ${searchTerm}`);
      
      const response = await axiosClient.get('/v1/projects/search', {
        params: { q: searchTerm }
      });
      console.log('✅ Projects search completed');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in searchProjects service:', error);
      throw error;
    }
  },

  createProject: async (formData) => {
    try {
      console.log('FormData received in service:', formData);
      
      // DEBUG: Log tất cả entries trong FormData
      for (let [key, value] of formData.entries()) {
        console.log(`Service formData entry: ${key} =`, value);
        
        // Nếu là string data, parse để xem nội dung
        if (key === 'data' && typeof value === 'string') {
          try {
            const parsedData = JSON.parse(value);
            console.log('Parsed data field:', parsedData);
          } catch (e) {
            console.log('Data field (not JSON):', value);
          }
        }
      }

      const response = await axiosClient.post(`/v1/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Project created successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error in createProject service:', error);
      throw error;
    }
  },

  updateProject: async (id, formData) => {
    try {
      console.log('FormData for update:', formData);
      
      // DEBUG: Log entries
      for (let [key, value] of formData.entries()) {
        console.log(`Update formData entry: ${key} =`, value);
      }

      const response = await axiosClient.put(`/v1/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('✅ Project updated successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error in updateProject service:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      console.log(`🗑️ Deleting project with ID: ${id}`);
      
      const response = await axiosClient.delete(`/v1/projects/${id}`);
      console.log('✅ Project deleted successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in deleteProject service:', error);
      throw error;
    }
  },

  // Additional utility methods
  getFeaturedProjects: async () => {
    try {
      console.log('⭐ Fetching featured projects');
      
      const response = await axiosClient.get('/v1/projects', {
        params: { featured: true }
      });
      console.log('✅ Featured projects fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getFeaturedProjects service:', error);
      throw error;
    }
  },

  getProjectsWithPagination: async (page = 1, limit = 10) => {
    try {
      console.log(`📄 Fetching projects page ${page}, limit ${limit}`);
      
      const response = await axiosClient.get('/v1/projects', {
        params: { page, limit }
      });
      console.log('✅ Paginated projects fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsWithPagination service:', error);
      throw error;
    }
  },

  // Get projects by type (draft/published)
  getProjectsByType: async (type) => {
    try {
      console.log(`📋 Fetching projects by type: ${type}`);
      
      const response = await axiosClient.get('/v1/projects', {
        params: { status: type }
      });
      console.log('✅ Projects by type fetched successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in getProjectsByType service:', error);
      throw error;
    }
  }, 
  submitProjectContactForm: async (projectId, formData) => {
    try {
      console.log(`📋 Submitting project contact for ID: ${projectId}`);
      console.log('Form data:', formData);
      
      const response = await axiosClient.post(`/v1/projects/${projectId}/contact`, formData);
      console.log('✅ Project contact form submitted successfully');
      
      return response.data;
    } catch (error) {
      console.error('❌ Error in submitProjectContactForm service:', error);
      throw error;
    }
  },
};