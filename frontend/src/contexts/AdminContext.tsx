import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  isAdmin: boolean;
  avatar?: string;
  preferences: {
    theme: 'dark' | 'light' | 'auto';
    language: 'fr' | 'en' | 'he';
    notifications: boolean;
  };
}

interface AdminContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updatePreferences: (prefs: Partial<User['preferences']>) => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
  refreshToken: async () => {},
  updatePreferences: async () => {},
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/me');
      
      if (response.data.user) {
        setUser(response.data.user);
        applyUserPreferences(response.data.user);
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        
        setUser(response.data.user);
        applyUserPreferences(response.data.user);
        
        toast.success('Connexion réussie!');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur de connexion');
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Déconnexion réussie');
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      if (!refresh) throw new Error('No refresh token');

      const response = await api.post('/auth/refresh', { refreshToken: refresh });
      
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      }
    } catch (error) {
      await logout();
      throw error;
    }
  };

  const updatePreferences = async (prefs: Partial<User['preferences']>) => {
    try {
      const response = await api.put('/auth/preferences', prefs);
      setUser(response.data.user);
      applyUserPreferences(response.data.user);
      toast.success('Préférences mises à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des préférences');
    }
  };

  const applyUserPreferences = (user: User) => {
    // Apply theme
    if (user.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (user.preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
    }

    // Apply language
    localStorage.setItem('language', user.preferences.language);
    // Trigger i18n language change here
  };

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshToken();
            return api(originalRequest);
          } catch (refreshError) {
            await logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminContext.Provider
      value={{
        user,
        isAdmin: user?.isAdmin || user?.role === 'admin' || false,
        isLoading,
        login,
        logout,
        refreshToken,
        updatePreferences,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
