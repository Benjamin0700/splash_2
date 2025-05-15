import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Token mavjud bo'lsa tekshirib ko'ramiz
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      // API manzilni o'zingizning API'ingizga moslashtiring
      const response = await axios.get('https://marsgoup-1.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCurrentUser(response.data);
    } catch (err) {
      localStorage.removeItem('userToken');
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullname, gmail, password) => {
    setError('');
    try {
      const response = await axios.post('https://marsgoup-1.onrender.com/api/users', {
        fullname,
        gmail,
        password
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi');
      throw err;
    }
  };

  const login = async (gmail, password) => {
    setError('');
    try {
      // Get all users first
      const response = await axios.get('https://marsgoup-1.onrender.com/api/users');
      
      // Find the user with matching gmail and password
      const user = response.data.find(
        user => user.gmail === gmail && user.password === password
      );
      
      if (user) {
        // Since we don't have a real token system, create a simple token
        // In a real app, this should come from your authentication server
        const token = btoa(`${user._id}:${Date.now()}`);
        
        localStorage.setItem('userToken', token);
        setCurrentUser(user);
        return user;
      } else {
        setError('Email yoki parol noto\'g\'ri');
        throw new Error('Email yoki parol noto\'g\'ri');
      }
    } catch (err) {
      setError('Email yoki parol noto\'g\'ri');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;