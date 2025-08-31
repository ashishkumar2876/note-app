import dotenv from "dotenv";
dotenv.config();

import nodemailer, { SendMailOptions } from 'nodemailer';

// Create a Nodemailer transporter using Brevo's SMTP server
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: parseInt(process.env.BREVO_SMTP_PORT as string),
  secure: false, // Use SSL with port 465, but we'll use STARTTLS on 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendEmail = async (mailOptions: SendMailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};