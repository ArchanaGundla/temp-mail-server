const TEMP_EMAIL_DOMAIN = 'trueelement.in';
const TEMP_EMAIL_LIFETIME = 600000;

const tempEmails = new Map();

// Generate random email address
function generateRandomEmail() {
  const prefix = Math.random().toString(36).substring(2, 10);
  return `${prefix}@${TEMP_EMAIL_DOMAIN}`;
}

// Cleanup expired emails
function cleanupExpiredEmails() {
  const now = Date.now();
  for (const [email, data] of tempEmails.entries()) {
    if (data.expiration < now) {
      tempEmails.delete(email);
      console.log(`🗑️  Removed expired email: ${email}`);
    }
  }
}

// Create new temp email
function createTempEmail() {
  cleanupExpiredEmails();
  const emailAddr = generateRandomEmail();
  const expirationTime = Date.now() + TEMP_EMAIL_LIFETIME;

  tempEmails.set(emailAddr, {
    expiration: expirationTime,
    messages: []
  });

  setTimeout(() => {
    if (tempEmails.has(emailAddr)) {
      tempEmails.delete(emailAddr);
      console.log(`🗑️  Auto-removed: ${emailAddr}`);
    }
  }, TEMP_EMAIL_LIFETIME);

  return {
    email: emailAddr,
    expiresIn: `${TEMP_EMAIL_LIFETIME / 60000} minutes`,
    expirationTime: new Date(expirationTime)
  };
}

function isValidTempEmail(emailAddress) {
  cleanupExpiredEmails();
  return tempEmails.has(emailAddress);
}

function updateEmailMessages(emailAddress, messages) {
  if (tempEmails.has(emailAddress)) {
    tempEmails.get(emailAddress).messages = messages;
  }
}

function getActiveTempEmails() {
  return Array.from(tempEmails.keys());
}

// ✅ ESM Export
export {
  TEMP_EMAIL_DOMAIN,
  TEMP_EMAIL_LIFETIME,
  generateRandomEmail,
  cleanupExpiredEmails,
  createTempEmail,
  isValidTempEmail,
  updateEmailMessages,
  getActiveTempEmails
};
