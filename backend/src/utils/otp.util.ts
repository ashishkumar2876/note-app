const otps = new Map<string, { code: string; expiresAt: number }>();

export function generateOtp(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiryMinutes = Number(process.env.OTP_EXPIRY_MINUTES || 10);
  const expiresAt = Date.now() + expiryMinutes * 60_000;
  otps.set(email, { code, expiresAt });

  console.log(`[OTP] for ${email}: ${code} (expires in ${expiryMinutes} min)`);

  return code;
}

export function verifyOtp(email: string, code: string) {
  const record = otps.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) { otps.delete(email); return false; }
  if (record.code !== code) return false;

  otps.delete(email);
  return true;
}
