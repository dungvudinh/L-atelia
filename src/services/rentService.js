import axiosClient from "../configs/axios";

const rentService = {
    // Lấy tất cả properties for rent
    getAllRentProperties: async (params = {}) => {
        try {
            const response = await axiosClient.get('/v1/rent', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching rent properties:', error);
            throw error;
        }
    },

    // Lấy property for rent theo ID
    getRentPropertyById: async (id) => {
        try {
            const response = await axiosClient.get(`/v1/rent/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching rent property ${id}:`, error);
            throw error;
        }
    },

    // Tìm kiếm properties for rent
    searchRentProperties: async (searchParams) => {
        try {
            const response = await axiosClient.get('/v1/rent/search', { params: searchParams });
            return response.data;
        } catch (error) {
            console.error('Error searching rent properties:', error);
            throw error;
        }
    }
};

export default rentService;