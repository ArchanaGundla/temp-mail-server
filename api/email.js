import { testImapConnection, getWorkingConfig } from '../utils/imapUtils.js';
import { TEMP_EMAIL_DOMAIN, TEMP_EMAIL_LIFETIME } from '../utils/emailUtils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log(`\n🚀 Starting TempMail Serverless Function...`);
    console.log(`📧 Domain: ${TEMP_EMAIL_DOMAIN}`);
    console.log(`⏰ Email lifetime: ${TEMP_EMAIL_LIFETIME / 60000} minutes`);

    await testImapConnection();
    const workingConfig = getWorkingConfig();

    res.status(200).json({
      message: 'TempMail backend initialized',
      imap: workingConfig,
      domain: TEMP_EMAIL_DOMAIN,
    });

  } catch (err) {
    res.status(500).json({
      error: 'IMAP connection failed',
      details: err.message,
    });
  }
}
