// services/mediaService.js
import axiosClient from "../configs/axios";

const mediaService = {
  // Lấy tất cả media với pagination và filtering
  getAllMedia: async (params = {}) => {
    try {
      const response = await axiosClient.get('/v1/media', { 
        params: {
          page: 1,
          limit: 100,
          sort: 'createdAt:desc',
          ...params
        }
      });
      console.log('media response', response)
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  },

  // Lấy media theo ID
  getMediaById: async (id) => {
    try {
      const response = await axiosClient.get(`/v1/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching media ${id}:`, error);
      throw error;
    }
  },

  // Lấy media theo category
  getMediaByCategory: async (category, params = {}) => {
    try {
      const response = await axiosClient.get('/v1/media', {
        params: { 
          category,
          status: 'published',
          limit: 4,
          ...params 
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching media by category:', error);
      throw error;
    }
  },

  // Lấy tất cả media published
  getAllPublishedMedia: async (params = {}) => {
    try {
      const response = await axiosClient.get('/v1/media', {
        params: { 
          status: 'published',
          limit: 100,
          sort: 'createdAt:desc',
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching published media:', error);
      throw error;
    }
  },

  // Tạo media mới
  createMedia: async (mediaData) => {
    try {
      const response = await axiosClient.post('/v1/media', mediaData);
      return response.data;
    } catch (error) {
      console.error('Error creating media:', error);
      throw error;
    }
  },

  // Cập nhật media
  updateMedia: async (id, mediaData) => {
    try {
      const response = await axiosClient.put(`/v1/media/${id}`, mediaData);
      return response.data;
    } catch (error) {
      console.error(`Error updating media ${id}:`, error);
      throw error;
    }
  },

  // Xóa media
  deleteMedia: async (id) => {
    try {
      const response = await axiosClient.delete(`/v1/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting media ${id}:`, error);
      throw error;
    }
  },

  // Upload featured image
  uploadFeaturedImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosClient.post('/v1/media/upload-featured-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading featured image:', error);
      throw error;
    }
  },

  // Delete featured image
  deleteFeaturedImage: async (imageUrl) => {
    try {
      const response = await axiosClient.delete('/v1/media/delete-featured-image', {
        data: { imageUrl }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting featured image:', error);
      throw error;
    }
  },

  // Bulk delete media
  bulkDeleteMedia: async (ids) => {
    try {
      const response = await axiosClient.post('/v1/media/bulk-delete', { ids });
      return response.data;
    } catch (error) {
      console.error('Error bulk deleting media:', error);
      throw error;
    }
  }
};

export default mediaService;