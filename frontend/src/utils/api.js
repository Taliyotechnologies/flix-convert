import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API request helper (axios)
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    url: `${API_BASE_URL}${endpoint}`,
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    data: options.body ? JSON.parse(options.body) : undefined,
    ...options,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || error.response.data.details || 'API request failed');
    }
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  // Signup
  signup: async (userData) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      data: userData,
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  // Login
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      data: credentials,
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  // Logout
  logout: () => {
    removeAuthToken();
  },

  // Forgot Password
  forgotPassword: async (email) => {
    return await apiRequest('/auth/forgot-password', {
      method: 'POST',
      data: { email },
    });
  },

  // Reset Password
  resetPassword: async (token, password) => {
    return await apiRequest('/auth/reset-password', {
      method: 'POST',
      data: { token, password },
    });
  },
};

// File upload and compression APIs (with progress)
export const compressionAPI = {
  // Image compression
  compressImage: async (file, onProgress) => {
    const token = getAuthToken && getAuthToken();
    const formData = new FormData();
    formData.append('image', file);
    const url = `${API_BASE_URL}/api/compress/image`;
    const config = {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              onProgress(percent);
            }
          }
        : undefined,
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || `Image compression failed (status: ${error.response.status})`);
      }
      throw error;
    }
  },

  // Video compression
  compressVideo: async (file, onProgress) => {
    const token = getAuthToken && getAuthToken();
    const formData = new FormData();
    formData.append('video', file);
    const url = `${API_BASE_URL}/api/compress/video`;
    const config = {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              onProgress(percent);
            }
          }
        : undefined,
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || `Video compression failed (status: ${error.response.status})`);
      }
      throw error;
    }
  },

  // Audio compression
  compressAudio: async (file, onProgress) => {
    const token = getAuthToken && getAuthToken();
    const formData = new FormData();
    formData.append('audio', file);
    const url = `${API_BASE_URL}/api/compress/audio`;
    const config = {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              onProgress(percent);
            }
          }
        : undefined,
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || `Audio compression failed (status: ${error.response.status})`);
      }
      throw error;
    }
  },

  // PDF compression
  compressPDF: async (file, onProgress) => {
    const token = getAuthToken && getAuthToken();
    const formData = new FormData();
    formData.append('pdf', file);
    const url = `${API_BASE_URL}/api/compress/pdf`;
    const config = {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      onUploadProgress: onProgress
        ? (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              onProgress(percent);
            }
          }
        : undefined,
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || `PDF compression failed (status: ${error.response.status})`);
      }
      throw error;
    }
  },
};

// File management APIs
export const fileAPI = {
  // Download file
  downloadFile: (filename) => {
    const token = getAuthToken();
    return `${API_BASE_URL}/files/download/${filename}?token=${token}`;
  },

  // Get file info
  getFileInfo: async (fileId) => {
    return await apiRequest(`/files/info/${fileId}`);
  },

  // Delete file
  deleteFile: async (fileId) => {
    return await apiRequest(`/files/delete/${fileId}`, {
      method: 'DELETE',
    });
  },
};

// Contact form APIs
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    return await apiRequest('/contact/submit', {
      method: 'POST',
      data: contactData,
    });
  },
};

// Utility functions
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatCompressionRatio = (ratio) => {
  return `${ratio}% smaller`;
}; 