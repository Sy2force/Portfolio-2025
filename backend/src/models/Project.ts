import mongoose, { Schema, Document } from 'mongoose';

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

const ProjectSchema = new Schema<IProject>({
  title: {
    fr: {
      type: String,
      required: true,
      trim: true
    },
    en: {
      type: String,
      required: true,
      trim: true
    },
    he: {
      type: String,
      required: true,
      trim: true
    }
  },
  description: {
    fr: {
      type: String,
      required: true,
      trim: true
    },
    en: {
      type: String,
      required: true,
      trim: true
    },
    he: {
      type: String,
      required: true,
      trim: true
    }
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'GitHub URL must be a valid URL'
    }
  },
  liveUrl: {
    type: String,
    trim: true,
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

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
