import { sendEmail } from './nodemailer.utils';
import { SendMailOptions } from 'nodemailer';

// This map will store the OTPs in memory for verification
const otps = new Map<string, { code: string; expiresAt: number }>();

/**
 * Generates an OTP, stores it in memory, and sends it to the user's email.
 * @param email The email address to send the OTP to.
 */
export async function generateOtp(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryMinutes = Number(process.env.OTP_EXPIRY_MINUTES || 10);
  const expiresAt = Date.now() + expiryMinutes * 60_000;
  otps.set(email, { code, expiresAt });

  const mailOptions: SendMailOptions = {
    from: process.env.BREVO_SENDER_EMAIL,
    to: email,
    subject: "Your Note-App OTP",
    html: `
      <h1>Note App OTP</h1>
      <p>Your one-time password is: <strong>${code}</strong></p>
      <p>This code will expire in ${expiryMinutes} minutes.</p>
    `,
  };

  await sendEmail(mailOptions);

  return code;
}

/**
 * Verifies an OTP against the stored one.
 * @param email The user's email.
 * @param code The OTP entered by the user.
 */
export function verifyOtp(email: string, code: string) {
  const record = otps.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otps.delete(email);
    return false;
  }
  if (record.code !== code) return false;

  otps.delete(email);
  return true;
}
