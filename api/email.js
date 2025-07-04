
import { applyCors } from '../utils/cors.js';
import { testImapConnection, getWorkingConfig } from '../utils/imapUtils.js';
import {
  TEMP_EMAIL_DOMAIN,
  TEMP_EMAIL_LIFETIME,
  createTempEmail,
  updateEmailMessages
} from '../utils/emailUtils.js';
import cors from '../../lib/cors-middleware';

export default async function handler(req, res) {
  applyCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const tempEmail = createTempEmail();
      return res.status(200).json({
        message: 'Temporary email created',
        email: tempEmail.email,
        expiresIn: tempEmail.expiresIn,
        expirationTime: tempEmail.expirationTime,
        domain: TEMP_EMAIL_DOMAIN
      });
    }

    if (req.method === 'POST') {
      const { emailAddress, messages } = req.body;
      if (!emailAddress || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
      updateEmailMessages(emailAddress, messages);
      return res.status(200).json({ message: 'Messages updated' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
