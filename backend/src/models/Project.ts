import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types';

const ProjectSchema = new Schema<IProject>({
  title: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    he: { type: String, required: true }
  },
  description: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
    he: { type: String, required: true }
  },
  technologies: [{
    type: String,
    required: true
  }],
  images: [{
    type: String
  }],
  githubUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'GitHub URL must be a valid URL'
    }
  },
  liveUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Live URL must be a valid URL'
    }
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better performance
ProjectSchema.index({ featured: -1, createdAt: -1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
