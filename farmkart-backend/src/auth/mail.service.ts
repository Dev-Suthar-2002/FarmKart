import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
            port: Number(process.env.SMTP_PORT), // e.g., 587
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // your email
                pass: process.env.SMTP_PASS, // your email password or app password
            },
        });
    }

    async sendOtp(email: string, otp: string) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}