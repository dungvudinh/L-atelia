// File: src/utils/axiosClient.js (LATELIA CLIENT)
import axios from 'axios';

class AdaptiveAxiosClient {
  constructor() {
    this.baseURL = 'https://l-atelia-api-yct5.onrender.com';
    this.strategies = this.setupStrategies();
    this.currentStrategy = 'normal';
  }

  setupStrategies() {
    return [
      {
        name: 'normal',
        priority: 100,
        config: { withCredentials: true },
        shouldTry: () => true
      },
      {
        name: 'no-credentials', 
        priority: 90,
        config: { withCredentials: false },
        shouldTry: () => true
      },
      {
        name: 'jsonp',
        priority: 50,
        config: { adapter: this.jsonpAdapter },
        shouldTry: (config) => config.method?.toLowerCase() === 'get'
      }
    ];
  }

  // JSONP adapter cho GET requests
  jsonpAdapter(config) {
    return new Promise((resolve, reject) => {
      const callbackName = `jsonp_${Date.now()}`;
      const script = document.createElement('script');
      
      // Build URL với callback parameter
      const url = new URL(config.url, config.baseURL);
      url.searchParams.set('callback', callbackName);
      
      // Setup callback
      window[callbackName] = (data) => {
        delete window[callbackName];
        document.head.removeChild(script);
        resolve({
          data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        });
      };
      
      // Error handling
      script.onerror = () => {
        delete window[callbackName];
        document.head.removeChild(script);
        reject(new Error('JSONP request failed'));
      };
      
      script.src = url.toString();
      document.head.appendChild(script);
    });
  }

  async request(config) {
    const strategies = [...this.strategies].sort((a, b) => b.priority - a.priority);
    
    for (const strategy of strategies) {
      if (!strategy.shouldTry(config)) continue;
      
      try {
        console.log(`🔄 Trying strategy: ${strategy.name}`);
        
        const axiosInstance = axios.create({
          baseURL: this.baseURL,
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Version': '1.0.0',
            'X-Strategy': strategy.name
          },
          ...strategy.config
        });
        
        // Add token if exists
        axiosInstance.interceptors.request.use(reqConfig => {
          const token = localStorage.getItem('accessToken');
          if (token) {
            reqConfig.headers.Authorization = `Bearer ${token}`;
          }
          return reqConfig;
        });
        
        const response = await axiosInstance(config);
        this.currentStrategy = strategy.name;
        
        // Log success
        if (strategy.name !== 'normal') {
          console.log(`✅ Using fallback strategy: ${strategy.name}`);
        }
        
        return response;
      } catch (error) {
        console.warn(`❌ Strategy ${strategy.name} failed:`, error.message);
        continue;
      }
    }
    
    throw new Error('All request strategies failed');
  }
}

// Singleton instance
const adaptiveClient = new AdaptiveAxiosClient();

// Backward compatibility: vẫn export axiosClient như cũ
export const axiosClient = {
  // Ghi đè các phương thức axios
  get: (url, config) => adaptiveClient.request({ ...config, method: 'get', url }),
  post: (url, data, config) => adaptiveClient.request({ ...config, method: 'post', url, data }),
  put: (url, data, config) => adaptiveClient.request({ ...config, method: 'put', url, data }),
  delete: (url, config) => adaptiveClient.request({ ...config, method: 'delete', url }),
  
  // Giữ nguyên interceptors cho các component đang dùng
  interceptors: {
    request: {
      use: (onFulfilled, onRejected) => {
        // Store interceptors để dùng sau
        adaptiveClient.requestInterceptors = { onFulfilled, onRejected };
      }
    },
    response: {
      use: (onFulfilled, onRejected) => {
        adaptiveClient.responseInterceptors = { onFulfilled, onRejected };
      }
    }
  }
};

// Export mặc định để import dễ dàng
export default axiosClient;