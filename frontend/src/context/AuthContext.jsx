import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check if user is logged in (token in localStorage)
    async function fetchUser() {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await authAPI.getCurrentUser();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    authAPI.logout(); // Remove token from localStorage
    setUser(null);
  };
  const updateUser = (userData) => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 