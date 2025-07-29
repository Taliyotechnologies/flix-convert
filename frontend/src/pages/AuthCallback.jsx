import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components.css';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'true' && token) {
      // Store token
      localStorage.setItem('token', token);
      
      // Fetch user data
      fetchUserData(token);
    } else {
      // Handle error
      console.error('Authentication failed:', error);
      navigate('/login?error=Authentication failed');
    }
  }, [searchParams, navigate, setUser]);

  const fetchUserData = async (token) => {
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
        navigate('/tools');
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      localStorage.removeItem('token');
      navigate('/login?error=Failed to authenticate');
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="text-center">
          <div className="spinner"></div>
          <h2>Authenticating...</h2>
          <p>Please wait while we complete your authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback; 