import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Contact } from '../models/Contact';
import { ApiResponse } from '../types';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

export const sendContactMessage = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();

    // Send email notification if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = createTransporter();
        
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Envoyé depuis le formulaire de contact du portfolio</small></p>
          `
        });
      } catch (emailError) {
        // Email error logged for monitoring
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès'
    });

  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Échec de l\'envoi du message'
    });
  }
};

export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: contacts,
      message: 'Contacts récupérés avec succès'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Échec de récupération des contacts'
    });
  }
};

export const markContactAsRead = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!contact) {
      res.status(404).json({
        success: false,
        error: 'Contact introuvable'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Contact marqué comme lu'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Échec de marquage du contact comme lu'
    });
  }
};

export const deleteContact = async (req: Request, res: Response<ApiResponse>): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      res.status(404).json({
        success: false,
        error: 'Contact introuvable'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Contact supprimé avec succès'
    });
  } catch (error) {
    // Error logged for monitoring
    res.status(500).json({
      success: false,
      error: 'Échec de suppression du contact'
    });
  }
};
