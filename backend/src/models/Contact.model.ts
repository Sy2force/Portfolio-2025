import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  projectType?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  isSpam: boolean;
  repliedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  markAsRead(): Promise<any>;
  markAsReplied(): Promise<any>;
  toggleSpam(): Promise<any>;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    phone: {
      type: String,
      default: null,
    },
    company: {
      type: String,
      default: null,
    },
    budget: {
      type: String,
      enum: ['< 5k€', '5k-10k€', '10k-25k€', '25k-50k€', '> 50k€', 'Not specified'],
      default: 'Not specified',
    },
    projectType: {
      type: String,
      enum: ['Website', 'Mobile App', 'Web App', 'E-commerce', 'Consulting', 'Other'],
      default: 'Other',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      index: true,
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: 'website',
    },
    isSpam: {
      type: Boolean,
      default: false,
      index: true,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
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
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1, priority: -1, createdAt: -1 });
contactSchema.index({ email: 1, createdAt: -1 });

// Static method to get unread messages count
contactSchema.statics.getUnreadCount = function() {
  return this.countDocuments({ status: 'new', isSpam: false });
};

// Static method to get messages by status
contactSchema.statics.getByStatus = function(status: string, limit = 20) {
  return this.find({ status, isSpam: false })
    .sort({ priority: -1, createdAt: -1 })
    .limit(limit);
};

// Instance method to mark as read
contactSchema.methods.markAsRead = async function() {
  if (this.status === 'new') {
    this.status = 'read';
    return this.save();
  }
  return this;
};

// Instance method to mark as replied
contactSchema.methods.markAsReplied = async function() {
  this.status = 'replied';
  this.repliedAt = new Date();
  return this.save();
};

// Instance method to toggle spam
contactSchema.methods.toggleSpam = async function() {
  this.isSpam = !this.isSpam;
  return this.save();
};

// Add missing instance methods
contactSchema.methods.markAsRead = async function() {
  if (this.status === 'new') {
    this.status = 'read';
    return this.save();
  }
  return this;
};

contactSchema.methods.markAsReplied = async function() {
  this.status = 'replied';
  this.repliedAt = new Date();
  return this.save();
};

contactSchema.methods.toggleSpam = async function() {
  this.isSpam = !this.isSpam;
  return this.save();
};

const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
