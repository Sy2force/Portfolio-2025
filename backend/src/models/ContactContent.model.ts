import mongoose, { Document, Schema } from 'mongoose';

export interface IContactContent extends Document {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  availability: string;
  responseTime: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  successMessage: string;
  errorMessage: string;
  updatedAt: Date;
  createdAt: Date;
}

const contactContentSchema = new Schema<IContactContent>(
  {
    title: {
      type: String,
      default: 'Contactez-moi',
    },
    description: {
      type: String,
      default: 'N\'hésitez pas à me contacter pour discuter de vos projets',
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    availability: {
      type: String,
      default: 'Disponible pour de nouveaux projets',
    },
    responseTime: {
      type: String,
      default: 'Réponse sous 24-48h',
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
    successMessage: {
      type: String,
      default: 'Merci ! Votre message a été envoyé avec succès.',
    },
    errorMessage: {
      type: String,
      default: 'Une erreur est survenue. Veuillez réessayer.',
    },
  },
  {
    timestamps: true,
  }
);

const ContactContent = mongoose.model<IContactContent>('ContactContent', contactContentSchema);

export default ContactContent;
