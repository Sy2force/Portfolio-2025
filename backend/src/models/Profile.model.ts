import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
  userId: string;
  name: string;
  title: string;
  bio: string;
  longBio: string;
  avatar: string;
  coverImage: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  availability: 'available' | 'busy' | 'unavailable';
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
  };
  languages: string[];
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
  hoursWorked: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Full Stack Developer',
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    longBio: {
      type: String,
      maxlength: 2000,
    },
    avatar: {
      type: String,
      default: '/default-avatar.png',
    },
    coverImage: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
      default: 'Paris, France',
    },
    headline: {
      type: String,
      default: 'Creating Digital Experiences',
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available',
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      dribbble: String,
      behance: String,
    },
    languages: [{
      type: String,
    }],
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    completedProjects: {
      type: Number,
      default: 0,
    },
    happyClients: {
      type: Number,
      default: 0,
    },
    hoursWorked: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// Update lastUpdated on save
profileSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

const Profile = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;
