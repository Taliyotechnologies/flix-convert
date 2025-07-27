// User types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

// Authentication types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Tool types
export interface Tool {
  id: string;
  name: string;
  description: string;
  supportedFormats: string[];
}

export interface UploadResponse {
  message: string;
  filename: string;
  originalName: string;
  size: number;
}

export interface ConversionRequest {
  filename: string;
  targetFormat: string;
}

export interface ConversionResponse {
  message: string;
  convertedFile: string;
}

// Company types
export interface CompanyInfo {
  name: string;
  description: string;
  founded: string;
  services: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'file' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Theme types
export type Theme = 'light' | 'dark';

// Navigation types
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

// File types
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

// Error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
} 