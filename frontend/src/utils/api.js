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

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  // Signup
  signup: async (userData) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
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
      body: JSON.stringify(credentials),
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
      body: JSON.stringify({ email }),
    });
  },

  // Reset Password
  resetPassword: async (token, password) => {
    return await apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },
};

// File upload and compression APIs
export const compressionAPI = {
  // Image compression with conditional auth
  compressImage: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('image', file);

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/image`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('Image compression failed:', error);
      throw error;
    }
  },

  // Video compression
  compressVideo: async (file) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append('video', file);

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/compress/video`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('Video compression failed:', error);
      throw error;
    }
  },

  // PDF compression
  compressPDF: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('pdf', file);

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/compress/pdf`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('PDF compression failed:', error);
      throw error;
    }
  },

  // Audio compression
  compressAudio: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('audio', file);

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/compress/audio`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('Audio compression failed:', error);
      throw error;
    }
  },

  // Get compression history
  getHistory: async (fileType) => {
    return await apiRequest(`/compress/${fileType}/history`);
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
      body: JSON.stringify(contactData),
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