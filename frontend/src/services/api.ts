import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/auth/refresh', { refreshToken });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// API Service
export const apiService = {
  // Auth
  auth: {
    login: (data: { email: string; password: string; totp?: string }) =>
      api.post('/auth/login', data),
    register: (data: { email: string; password: string; name: string }) =>
      api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    refreshToken: (refreshToken: string) =>
      api.post('/auth/refresh', { refreshToken }),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data: any) => api.put('/auth/profile', data),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      api.put('/auth/password', data),
    setup2FA: () => api.post('/auth/2fa/setup'),
    verify2FA: (token: string) => api.post('/auth/2fa/verify', { token }),
    disable2FA: (password: string) => api.post('/auth/2fa/disable', { password }),
  },

  // Projects
  projects: {
    getAll: (params?: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
      featured?: boolean;
      status?: string;
    }) => api.get('/projects', { params }),
    getBySlug: (slug: string) => api.get(`/projects/${slug}`),
    getFeatured: (limit?: number) => 
      api.get('/projects/featured/list', { params: { limit } }),
    like: (id: string, like: boolean = true) =>
      api.post(`/projects/${id}/like`, { like }),
    create: (data: FormData) =>
      api.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    update: (id: string, data: FormData) =>
      api.put(`/projects/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    delete: (id: string) => api.delete(`/projects/${id}`),
    reorder: (projects: { id: string; order: number }[]) =>
      api.put('/projects/reorder/bulk', { projects }),
  },

  // Contact
  contact: {
    submit: (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
      phone?: string;
      company?: string;
      budget?: string;
      projectType?: string;
    }) => api.post('/contact/submit', data),
    getAll: (params?: {
      page?: number;
      limit?: number;
      status?: string;
      priority?: string;
      isSpam?: boolean;
      search?: string;
    }) => api.get('/contact', { params }),
    getById: (id: string) => api.get(`/contact/${id}`),
    getStats: () => api.get('/contact/stats'),
    updateStatus: (id: string, status: string) =>
      api.patch(`/contact/${id}/status`, { status }),
    reply: (id: string, data: { subject: string; message: string }) =>
      api.post(`/contact/${id}/reply`, data),
    toggleSpam: (id: string) => api.patch(`/contact/${id}/spam`),
    updateNotes: (id: string, notes: string) =>
      api.patch(`/contact/${id}/notes`, { notes }),
    delete: (id: string) => api.delete(`/contact/${id}`),
  },

  // Admin
  admin: {
    getDashboard: () => api.get('/admin/dashboard'),
    getHealth: () => api.get('/admin/health'),
    backup: () => api.post('/admin/backup'),
    clearCache: (pattern?: string) =>
      api.post('/admin/cache/clear', { pattern }),
    getAnalytics: (params?: { startDate?: string; endDate?: string }) =>
      api.get('/admin/analytics', { params }),
  },

  // Analytics
  analytics: {
    trackPageview: (data: { page: string; referrer?: string; duration?: number }) =>
      api.post('/analytics/pageview', data),
    trackEvent: (data: {
      category: string;
      action: string;
      label?: string;
      value?: number;
    }) => api.post('/analytics/event', data),
    getVisitors: () => api.get('/analytics/visitors'),
    getFunnel: () => api.get('/analytics/funnel'),
    getPerformance: () => api.get('/analytics/performance'),
  },

  // Upload
  upload: {
    image: (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      return api.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    images: (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));
      return api.post('/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    document: (file: File) => {
      const formData = new FormData();
      formData.append('document', file);
      return api.post('/upload/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    delete: (filename: string) => api.delete(`/upload/${filename}`),
    list: () => api.get('/upload/list'),
  },
};

export default api
export { api };
