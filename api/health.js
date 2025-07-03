
import { applyCors } from '../utils/cors.js';

export default function handler(req, res) {
  applyCors(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Actual health check
  res.status(200).json({ status: 'ok' });
}
