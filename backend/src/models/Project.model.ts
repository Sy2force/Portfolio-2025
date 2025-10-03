import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
  year: number;
  client?: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'planned';
  views: number;
  likes: number;
  order: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  incrementViews(): Promise<any>;
  toggleLike(increment: boolean): Promise<any>;
}

export interface IProjectModel extends Model<IProject> {
  getFeatured(limit?: number): Promise<IProject[]>;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    longDescription: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    image: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    technologies: [{
      type: String,
      required: true,
    }],
    category: {
      type: String,
      required: true,
      enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Data & AI', 'FinTech', 'E-commerce', 'Media', 'Productivity', 'Other'],
      index: true,
    },
    github: {
      type: String,
      default: null,
    },
    demo: {
      type: String,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    client: {
      type: String,
      default: null,
    },
    duration: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for performance
projectSchema.index({ title: 'text', description: 'text', longDescription: 'text' });
projectSchema.index({ isPublished: 1, featured: 1, order: -1 });
projectSchema.index({ category: 1, year: -1 });
projectSchema.index({ createdAt: -1 });

// Generate slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  // Set publishedAt date
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Static method to get featured projects
projectSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ isPublished: true, featured: true })
    .sort({ order: -1, createdAt: -1 })
    .limit(limit);
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function(category: string, limit = 10) {
  return this.find({ isPublished: true, category })
    .sort({ order: -1, year: -1, createdAt: -1 })
    .limit(limit);
};

// Instance method to increment views
projectSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
projectSchema.methods.toggleLike = async function(increment: boolean) {
  this.likes += increment ? 1 : -1;
  return this.save();
};

// Add missing instance methods
projectSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

projectSchema.methods.toggleLike = async function(increment: boolean) {
  this.likes += increment ? 1 : -1;
  return this.save();
};

// Add missing static methods
projectSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ isPublished: true, featured: true })
    .sort({ order: -1, createdAt: -1 })
    .limit(limit);
};

const Project = mongoose.model<IProject, IProjectModel>('Project', projectSchema);

export default Project;
