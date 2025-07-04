import cors from '../../lib/cors-middleware';

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://temp-mail-olive-ten.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  res.status(200).json({ status: "ok" });
}
