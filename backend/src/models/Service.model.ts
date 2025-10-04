import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  price: string;
  duration: string;
  technologies: string[];
  features: string[];
  order: number;
  active: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    icon: {
      type: String,
      default: '🚀',
    },
    price: {
      type: String,
      default: 'Sur devis',
    },
    duration: {
      type: String,
      default: '2-4 semaines',
    },
    technologies: [{
      type: String,
    }],
    features: [{
      type: String,
    }],
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ order: 1 });

const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
