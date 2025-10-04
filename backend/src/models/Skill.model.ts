import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'marketing' | 'other';
  icon: string;
  description?: string;
  order: number;
  updatedAt: Date;
  createdAt: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'tools', 'marketing', 'other'],
      required: true,
    },
    icon: {
      type: String,
      default: '⚡',
    },
    description: {
      type: String,
      maxlength: 200,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour tri par ordre
skillSchema.index({ order: 1 });

const Skill = mongoose.model<ISkill>('Skill', skillSchema);

export default Skill;
