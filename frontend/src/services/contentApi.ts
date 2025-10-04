import api from './api';

// ============= HOME CONTENT =============
export const getHomeContent = async () => {
  const response = await api.get('/content/home');
  return response.data;
};

export const updateHomeContent = async (data: any) => {
  const response = await api.put('/content/home', data);
  return response.data;
};

// ============= ABOUT CONTENT =============
export const getAboutContent = async () => {
  const response = await api.get('/content/about');
  return response.data;
};

export const updateAboutContent = async (data: any) => {
  const response = await api.put('/content/about', data);
  return response.data;
};

// ============= SKILLS =============
export const getAllSkills = async () => {
  const response = await api.get('/content/skills');
  return response.data;
};

export const createSkill = async (data: any) => {
  const response = await api.post('/content/skills', data);
  return response.data;
};

export const updateSkill = async (id: string, data: any) => {
  const response = await api.put(`/content/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id: string) => {
  const response = await api.delete(`/content/skills/${id}`);
  return response.data;
};

// ============= SERVICES =============
export const getAllServices = async () => {
  const response = await api.get('/content/services');
  return response.data;
};

export const createService = async (data: any) => {
  const response = await api.post('/content/services', data);
  return response.data;
};

export const updateService = async (id: string, data: any) => {
  const response = await api.put(`/content/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id: string) => {
  const response = await api.delete(`/content/services/${id}`);
  return response.data;
};

// ============= CV CONTENT =============
export const getCVContent = async () => {
  const response = await api.get('/content/cv');
  return response.data;
};

export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append('cv', file);
  const response = await api.post('/content/cv/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCVContent = async (data: any) => {
  const response = await api.put('/content/cv', data);
  return response.data;
};

// ============= CONTACT CONTENT =============
export const getContactContent = async () => {
  const response = await api.get('/content/contact');
  return response.data;
};

export const updateContactContent = async (data: any) => {
  const response = await api.put('/content/contact', data);
  return response.data;
};
