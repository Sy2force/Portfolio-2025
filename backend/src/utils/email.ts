import nodemailer from 'nodemailer';
import { logger } from '../server';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: any;
  attachments?: any[];
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const templates: Record<string, (data: any) => { html: string; text: string }> = {
  welcome: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue ${data.name} ! 🎉</h1>
            </div>
            <div class="content">
              <h2>Votre compte a été créé avec succès</h2>
              <p>Merci de nous avoir rejoint. Vous pouvez maintenant accéder à toutes les fonctionnalités de notre plateforme.</p>
              <a href="${process.env.CLIENT_URL}/login" class="button">Se connecter</a>
            </div>
            <div class="footer">
              <p>© 2024 Portfolio. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Bienvenue ${data.name}! Votre compte a été créé avec succès.`,
  }),

  newContact: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #00d9ff; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .priority { display: inline-block; padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; }
            .high { background: #ff4444; }
            .medium { background: #ffaa00; }
            .low { background: #00aa00; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 Nouveau message de contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Priorité:</span>
                <span class="priority ${data.priority}">${data.priority.toUpperCase()}</span>
              </div>
              <div class="field">
                <span class="label">De:</span> ${data.name} (${data.email})
              </div>
              <div class="field">
                <span class="label">Sujet:</span> ${data.subject}
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <p>${data.message}</p>
              </div>
              <p><a href="${process.env.CLIENT_URL}/admin/contacts">Voir dans le dashboard</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Nouveau contact de ${data.name}: ${data.subject}`,
  }),

  contactConfirmation: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00d9ff 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .timeline { margin: 20px 0; padding: 20px; background: white; border-radius: 5px; }
            .step { display: flex; align-items: center; margin: 10px 0; }
            .step-number { width: 30px; height: 30px; background: #00d9ff; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message bien reçu ! ✉️</h1>
            </div>
            <div class="content">
              <p>Bonjour ${data.name},</p>
              <p>Merci pour votre message. Je l'ai bien reçu et je vous répondrai dans les plus brefs délais (généralement sous 24h).</p>
              
              <div class="timeline">
                <h3>Prochaines étapes :</h3>
                <div class="step">
                  <div class="step-number">1</div>
                  <span>Analyse de votre demande</span>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <span>Réponse personnalisée sous 24h</span>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <span>Discussion de votre projet</span>
                </div>
              </div>
              
              <p>En attendant, n'hésitez pas à consulter mon portfolio pour découvrir mes derniers projets.</p>
            </div>
            <div class="footer">
              <p>© 2024 Portfolio. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Bonjour ${data.name}, Merci pour votre message. Je vous répondrai dans les plus brefs délais.`,
  }),

  reply: (data: any) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00d9ff 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Réponse à votre message 💬</h1>
            </div>
            <div class="content">
              <p>Bonjour ${data.name},</p>
              <div class="message">
                ${data.message}
              </div>
              <p>Cordialement,<br>John Doe</p>
            </div>
            <div class="footer">
              <p>© 2024 Portfolio. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: data.message,
  }),
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const template = templates[options.template];
    if (!template) {
      throw new Error(`Template ${options.template} not found`);
    }

    const emailContent = template(options.data);

    const mailOptions = {
      from: `"Portfolio" <${process.env.SMTP_FROM || 'noreply@portfolio.com'}>`,
      to: options.to,
      subject: options.subject,
      ...emailContent,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error) {
    logger.error('Email sending error:', error);
    throw error;
  }
};

// Verify email configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration error:', error);
    return false;
  }
};
