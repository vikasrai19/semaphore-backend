import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }

  async sendEmailVerificationMail(
    toEmailId: string,
    fullName: string,
    userId: string,
  ): Promise<void> {
    const subject: string =
      '🔐 Please Verify Your Email for Semaphore 2K24 Registration';
    const verificationLink: string = `${this.configService.get<string>('EMAIL_VERIFY_HOST')}/verify-email?userId=${userId}`;
    const htmlContent: string = `<h1>Hello ${fullName},</h1> <p>Thank you for showing interest in <strong>Semaphore 2K24</strong> at <strong>NMAMIT, Nitte</strong>!</p> <p>Please confirm your email address by clicking the link below:</p><p><a href="${verificationLink}">Verify Email Address</a></p><p>If you did not register for this event, please ignore this email.</p><h4>Event Details:</h4><p>📅 Event Date: 20th & 21st Nov, 2024</p><p>📍 Location: NMAMIT Campus, Nitte, Karkala</p><p>⏰ Time: 9.00 AM IST to 6.00 PM IST</p>`;

    const mailOptions = {
      from: this.configService.get<string>('GMAIL_USER'),
      to: toEmailId,
      subject,
      text: `Thank you for registering! Please verify your email by clicking the link below:`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email :', error);
      throw error;
    }
  }
}
