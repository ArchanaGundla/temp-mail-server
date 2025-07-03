export function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://temp-mail-olive-ten.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
