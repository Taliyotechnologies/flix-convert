import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState(null);

  // Theme management
  useEffect(() => {
    try {
      // Check for saved theme preference or default to system preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Detect system theme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme);
      }
    } catch (err) {
      console.error('Theme error:', err);
      setTheme('light'); // fallback
    }
  }, []);

  useEffect(() => {
    try {
      // Apply theme to body
      document.body.className = theme;
      localStorage.setItem('theme', theme);
    } catch (err) {
      console.error('Theme application error:', err);
    }
  }, [theme]);

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetchUser(token);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const loginWithGoogle = () => {
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://flix-convert.onrender.com' 
      : 'http://localhost:5000';
    
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    user,
    setUser,
    loading,
    theme,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
    toggleTheme
  };

  // Error boundary for AuthContext
  if (error) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="text-center">
            <h2>Something went wrong</h2>
            <p>Please refresh the page to try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};