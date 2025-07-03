import { testImapConnection, getWorkingConfig } from '../utils/imapUtils.js';
import {
  TEMP_EMAIL_DOMAIN,
  TEMP_EMAIL_LIFETIME,
  createTempEmail,
  updateEmailMessages
} from '../utils/emailUtils.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Just return a new temporary email
      const tempEmail = createTempEmail();
      return res.status(200).json({
        message: "Temporary email created successfully.",
        email: tempEmail.email,
        expiresIn: tempEmail.expiresIn,
        expirationTime: tempEmail.expirationTime,
        domain: TEMP_EMAIL_DOMAIN
      });
    }

    if (req.method === 'POST') {
      const { emailAddress, messages } = req.body;

      if (!emailAddress || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      updateEmailMessages(emailAddress, messages);
      return res.status(200).json({ message: "Messages updated for email" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("💥 API error:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
