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
    const htmlContent: string = `<h1>Hello ${fullName},</h1> <p>Thank you for showing interest in <strong>Semaphore 2K24</strong> at <strong>NMAMIT, Nitte</strong>!</p> <p>Please confirm your email address by clicking the link below:</p><p><a href="${verificationLink}">Verify Email Address</a></p><p>If you did not register for this event, please ignore this email.</p><h4>Event Details:</h4><p>📅 Event Date: 19th & 20th Nov, 2024</p><p>📍 Location: NMAMIT Campus, Nitte, Karkala</p><p>⏰ Time: 9.00 AM IST to 6.00 PM IST</p><h4>Steps for Registration:</h4><ol><li>Verify your email using the link provided.</li><li>Log in to the website using your email and password.</li><li>Once logged in, go to the Registration Menu and enter the name and phone number of the participants.</li><li>Proceed to the payment step, scan the QR code, and provide payment details including Account Holder Name, Phone Number, UPI ID, and Transaction ID. Confirm the details.</li>
    <li>After the payment is verified, a confirmation email will be sent to this email.</li></ol><p><strong>Note:</strong> Registration of the team is completed only after the payment is received successfully.</p><p>With warm regards,<br>The Semaphore Team<br>Semaphore 2K24</p>`;

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

  async sendPaymentAcceptedEmail(
    toEmailId: string,
    fullName: string,
  ): Promise<void> {
    const subject = `Your Registration for Semaphore 2K24 is Confirmed!`;
    const htmlContent = `<h1>Hello ${fullName},</h1> <p>Congratulations! We have successfully received your payment for <strong>Semaphore 2K24</strong> at <strong>NMAMIT, Nitte</strong> and your application is now confirmed.</p><p>We’re thrilled to welcome you to this exciting event. <h4>Event Details:</h4><p>📅 <strong>Event Date:</strong> 19th & 20th Nov, 2024</p><p>📍 <strong>Location:</strong> NMAMIT Campus, Nitte, Karkala</p><p>⏰ <strong>Time:</strong> 9:00 AM IST to 6:00 PM IST</p><p>If you have any questions or require further assistance, feel free to reply to this email.</p><p>Thank you once again for registering, and we look forward to seeing you at <strong>Semaphore 2K24</strong>!</p><p>Warm regards,</p><p><strong>The Semaphore 2K24 Team</strong><br>NMAMIT, Nitte</p>`;
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

  async sendPaymentRejectedEmail(
    toEmailId: string,
    fullName: string,
    remarks: string,
  ): Promise<void> {
    const subject = `Action Required: Payment Issue for Semaphore 2K24 Registration`;
    const htmlContent = `<h1>Hello ${fullName},</h1> <p>We regret to inform you that there was an issue with the payment for <strong>Semaphore 2K24</strong> at <strong>NMAMIT, Nitte</strong>, and your registration could not be confirmed at this time.</p><p><strong>Reason for Rejection:</strong> ${remarks}</p><p>Please review the payment details and make a new payment to complete your registration. We would love to see you at Semaphore 2K24 and don’t want you to miss out on the exciting sessions, activities, and networking opportunities!</p><h4>Event Details:</h4><p>📅 <strong>Event Date:</strong> 19th & 20th Nov, 2024</p><p>📍 <strong>Location:</strong> NMAMIT Campus, Nitte, Karkala</p><p>⏰ <strong>Time:</strong> 9:00 AM IST to 6:00 PM IST</p><h4>To Complete Your Registration:</h4><ol><li>Verify your payment information.</li><li>Submit a new payment with accurate details.</li><li>Ensure all necessary details, including UPI ID and Transaction ID, are correct.</li></ol><p>If you have any questions or require further assistance, please feel free to reply to this email.</p><p>Thank you for your interest in <strong>Semaphore 2K24</strong>, and we look forward to your successful registration.</p><p>Warm regards,</p><p><strong>The Semaphore 2K24 Team</strong><br>NMAMIT, Nitte</p>`;
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
