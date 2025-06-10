
import { envs } from '../../config/envs'; // Ajusta la ruta según tu estructura
import { forgotPasswordEmailTemplate } from '../../config/email-templates'; // Ajusta la ruta
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail', // o otro servicio (Mailgun, SendGrid, etc.)
    auth: {
      user: envs.GMAIL_USER,
      pass: envs.GMAIL_KEY,
    },
  });

  async sendNewPasswordEmail(email: string, newPassword: string) {
    const html = forgotPasswordEmailTemplate(newPassword); // Usa tu template

    await this.transporter.sendMail({
      from: `"MAEKA" <${envs.GMAIL_USER}>`,
      to: email,
      subject: 'Tu nueva contraseña en MAEKA',
      html,
    });
  }
}