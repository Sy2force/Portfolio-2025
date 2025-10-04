import mongoose, { Document, Schema } from 'mongoose';

export interface IHomeContent extends Document {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  ctaText: string;
  ctaLink: string;
  stats: {
    yearsExperience: number;
    completedProjects: number;
    happyClients: number;
    linesOfCode: number;
  };
  updatedAt: Date;
  createdAt: Date;
}

const homeContentSchema = new Schema<IHomeContent>(
  {
    title: {
      type: String,
      required: true,
      default: 'Portfolio Full-Stack 2025',
    },
    subtitle: {
      type: String,
      required: true,
      default: 'Développeur Full-Stack & Digital Marketer',
    },
    description: {
      type: String,
      required: true,
      default: 'Créateur d\'expériences numériques innovantes',
    },
    heroImage: {
      type: String,
      default: '/images/hero-bg.jpg',
    },
    ctaText: {
      type: String,
      default: 'Voir mes projets',
    },
    ctaLink: {
      type: String,
      default: '/projects',
    },
    stats: {
      yearsExperience: {
        type: Number,
        default: 5,
      },
      completedProjects: {
        type: Number,
        default: 50,
      },
      happyClients: {
        type: Number,
        default: 30,
      },
      linesOfCode: {
        type: Number,
        default: 500000,
      },
    },
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.model<IHomeContent>('HomeContent', homeContentSchema);

export default HomeContent;
