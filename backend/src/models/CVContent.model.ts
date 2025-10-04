import mongoose, { Document, Schema } from 'mongoose';

export interface ICVContent extends Document {
  pdfUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  experiences: Array<{
    title: string;
    company: string;
    location: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    year: number;
    description: string;
  }>;
  certifications: string[];
  updatedAt: Date;
  createdAt: Date;
}

const cvContentSchema = new Schema<ICVContent>(
  {
    pdfUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    experiences: [{
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: String,
      startDate: { type: Date, required: true },
      endDate: Date,
      current: { type: Boolean, default: false },
      description: String,
    }],
    education: [{
      degree: { type: String, required: true },
      school: { type: String, required: true },
      location: String,
      year: { type: Number, required: true },
      description: String,
    }],
    certifications: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

const CVContent = mongoose.model<ICVContent>('CVContent', cvContentSchema);

export default CVContent;
