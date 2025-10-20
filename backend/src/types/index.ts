import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject extends Document {
  title: {
    fr: string;
    en: string;
    he: string;
  };
  description: {
    fr: string;
    en: string;
    he: string;
  };
  technologies: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Simplified Document types for production use
export type ProjectDocument = IProject & { _id: string; toJSON(): IProject };
export type UserDocument = IUser & { _id: string; toJSON(): IUser };
export type ContactDocument = IContact & { _id: string; toJSON(): IContact };
