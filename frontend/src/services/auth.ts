import apiService from './api';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

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

class AuthService {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', data);
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', data);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Save user data to localStorage
  saveUserData(user: User, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

export const authService = new AuthService();
export default authService; 