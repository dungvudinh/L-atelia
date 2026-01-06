import axios from 'axios'
import { API_ROOT } from '../utils/constants'
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const API_BASE_URL= 'https://l-atelia-api-yct5.onrender.com'
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials:true, 
  headers: {
    'Content-Type': 'application/json'
  }
})

// ✅ Response Interceptor (Global Error Handling)
axiosClient.interceptors.response.use(
  (config) => {
    // tu dong gui token khi can
    const token = localStorage.getItem('accessToken')
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  // (response) => response.data, // Automatically return only the data
  async (error) => {
    if (error.response) {
        // Handle unauthorized or expired token
        if (error.response.status === 401) {
          console.warn("Unauthorized — you may need to refresh the token.");
          // Optionally redirect to login or refresh token here
        }
      }
      return Promise.reject(error);
  }
)


export default axiosClient