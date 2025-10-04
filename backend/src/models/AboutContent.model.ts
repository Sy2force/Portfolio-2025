import mongoose, { Document, Schema } from 'mongoose';

export interface IAboutContent extends Document {
  name: string;
  bio: string;
  longBio: string;
  profileImage: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
  };
  languages: string[];
  interests: string[];
  updatedAt: Date;
  createdAt: Date;
}

const aboutContentSchema = new Schema<IAboutContent>(
  {
    name: {
      type: String,
      required: true,
      default: 'Shay Acoca',
    },
    bio: {
      type: String,
      required: true,
      maxlength: 500,
    },
    longBio: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    profileImage: {
      type: String,
      default: '/images/profile.jpg',
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
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      dribbble: String,
    },
    languages: [{
      type: String,
    }],
    interests: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

const AboutContent = mongoose.model<IAboutContent>('AboutContent', aboutContentSchema);

export default AboutContent;
