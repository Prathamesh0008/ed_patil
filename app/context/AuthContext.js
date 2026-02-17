'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('edpharma_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 🔥 LOGIN FUNCTION (backend connected)
  const login = async (emailOrPhone, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, error: data.error };
      }

      // Save token
      localStorage.setItem('edpharma_token', data.token);
      localStorage.setItem('edpharma_user', JSON.stringify(data.user));

      setUser(data.user);

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/account');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edpharma_user');
    localStorage.removeItem('edpharma_token');
    router.push('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
