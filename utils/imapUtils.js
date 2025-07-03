import Imap from 'imap';
import { simpleParser } from 'mailparser';

const IMAP_CONFIGS = [
  {
    user: 'support@trueelement.in',
    password: 'trueelement@12',
    host: 'imap.trueelement.in',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false,
      servername: 'imap.trueelement.in'
    },
    connTimeout: 60000,
    authTimeout: 30000,
    keepalive: false
  },
  {
    user: 'support@trueelement.in',
    password: 'trueelement@12',
    host: 'imap.trueelement.in',
    port: 143,
    tls: false,
    tlsOptions: {
      rejectUnauthorized: false,
      servername: 'imap.trueelement.in'
    },
    connTimeout: 60000,
    authTimeout: 30000,
    keepalive: false
  }
];

let WORKING_CONFIG = null;

function testImapConnection() {
  return new Promise((resolve, reject) => {
    let configIndex = 0;

    function tryNextConfig() {
      if (configIndex >= IMAP_CONFIGS.length) {
        reject(new Error('All IMAP configurations failed'));
        return;
      }

      const config = IMAP_CONFIGS[configIndex];
      console.log(`\n=== Testing IMAP Config ${configIndex + 1} ===`);
      console.log(`Host: ${config.host}:${config.port}`);
      console.log(`TLS: ${config.tls}`);
      console.log(`User: ${config.user}`);

      const imap = new Imap(config);

      imap.once('ready', () => {
        console.log(`✅ IMAP connection successful with config ${configIndex + 1}`);
        WORKING_CONFIG = config;
        imap.end();
        resolve(true);
      });

      imap.once('error', (err) => {
        console.error(`❌ IMAP config ${configIndex + 1} failed:`, err.message);
        configIndex++;
        setTimeout(tryNextConfig, 2000);
      });

      console.log(`Attempting to connect...`);
      imap.connect();
    }

    tryNextConfig();
  });
}

function getWorkingConfig() {
  return WORKING_CONFIG;
}

// Export the functions (ESM syntax)
export {
  testImapConnection,
  getWorkingConfig
};
