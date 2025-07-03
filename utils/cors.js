// utils/cors.js

export function applyCors(res) {
  // Allow any origin (you can lock this down to your frontend domain if you like)
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Allow these methods
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  // Allow these headers in requests
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
