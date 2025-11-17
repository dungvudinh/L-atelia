import axiosClient from "../configs/axios";

const bookingService = {
    // Lấy tất cả bookings
    getAllBookings: async (params = {}) => {
        try {
            const response = await axiosClient.get('/v1/bookings', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    },

    // Lấy bookings theo property ID
    getBookingsByPropertyId: async (propertyId) => {
        try {
            const response = await axiosClient.get(`/v1/bookings/property/${propertyId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching bookings for property ${propertyId}:`, error);
            throw error;
        }
    },

    // Lấy bookings theo khoảng thời gian
    getBookingsByDateRange: async (checkIn, checkOut) => {
        try {
            const response = await axiosClient.get('/v1/bookings/date-range', {
                params: { checkIn, checkOut }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching bookings by date range:', error);
            throw error;
        }
    },

    // Tạo booking mới
    createBooking: async (bookingData) => {
        try {
            const response = await axiosClient.post('/v1/bookings', bookingData);
            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    // Cập nhật booking
    updateBooking: async (id, bookingData) => {
        try {
            const response = await axiosClient.put(`/v1/bookings/${id}`, bookingData);
            return response.data;
        } catch (error) {
            console.error(`Error updating booking ${id}:`, error);
            throw error;
        }
    },

    // Hủy booking
    cancelBooking: async (id) => {
        try {
            const response = await axiosClient.patch(`/v1/bookings/${id}/cancel`);
            return response.data;
        } catch (error) {
            console.error(`Error canceling booking ${id}:`, error);
            throw error;
        }
    }
};

export default bookingService;