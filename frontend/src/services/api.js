import axios from 'axios'

const API_BASE_URL = 'https://flix-convert.onrender.com/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  createUser: (data) => api.post('/auth/admin/create-user', data),
}

// Compression API
export const compressAPI = {
  image: (formData) => api.post('/compress/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  video: (formData) => api.post('/compress/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  audio: (formData) => api.post('/compress/audio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  pdf: (formData) => api.post('/compress/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

// Conversion API
export const convertAPI = {
  image: (formData) => api.post('/convert/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  video: (formData) => api.post('/convert/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  audio: (formData) => api.post('/convert/audio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  pdf: (formData) => api.post('/convert/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

// Admin API
export const adminAPI = {
  dashboard: () => api.get('/admin/dashboard'),
  files: (page = 1, limit = 20) => api.get(`/admin/files?page=${page}&limit=${limit}`),
  fileDetails: (id) => api.get(`/admin/files/${id}`),
  downloadFile: (id) => api.get(`/admin/files/${id}/download`, { responseType: 'blob' }),
  deleteFile: (id) => api.delete(`/admin/files/${id}`),
  users: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
}

// Utility functions
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getFileIcon = (fileType) => {
  const icons = {
    image: '🖼️',
    video: '🎥',
    audio: '🎵',
    pdf: '📄',
  }
  return icons[fileType] || '📁'
}

export const getSupportedFormats = (fileType) => {
  const formats = {
    image: ['jpeg', 'jpg', 'png', 'webp', 'avif'],
    video: ['mp4', 'avi', 'mov', 'webm'],
    audio: ['mp3', 'aac', 'ogg', 'wav', 'flac'],
    pdf: ['pdf'],
  }
  return formats[fileType] || []
}

export default api 