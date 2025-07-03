import { testImapConnection, getWorkingConfig } from '../utils/imapUtils.js';
import {
  TEMP_EMAIL_DOMAIN,
  TEMP_EMAIL_LIFETIME,
  createTempEmail,
  updateEmailMessages
} from '../utils/emailUtils.js';
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await testImapConnection();
    const config = getWorkingConfig();

    res.status(200).json({
      message: "Backend ready",
      config,
      domain: TEMP_EMAIL_DOMAIN,
      lifetime: TEMP_EMAIL_LIFETIME / 60000
    });

  } catch (err) {
    console.error("❌ Error in /api/email.js:", err);
    res.status(500).json({ error: "Server crashed", details: err.message });
  }
}
