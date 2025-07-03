import { applyCors } from '../utils/cors.js';

export default function handler(req, res) {
  applyCors(res);
  if (req.method === 'OPTIONS') {
    // Preflight request
    return res.status(200).end();
  }
  res.status(200).json({ status: 'ok' });
}
