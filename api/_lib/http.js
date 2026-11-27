const crypto = require("crypto");

async function readBody(req, max = 8000) {
  if (req.body !== undefined && req.body !== null && typeof req.body !== "string" && !Buffer.isBuffer(req.body)) return req.body;
  let raw = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString("utf8") : null;
  if (raw === null) {
    raw = await new Promise((resolve, reject) => {
      let d = "";
      req.on("data", (c) => { d += c; if (d.length > max) { reject(new Error("too large")); req.destroy(); } });
      req.on("end", () => resolve(d));
      req.on("error", reject);
    });
  }
  if (raw.length > max) throw new Error("too large");
  try { return JSON.parse(raw || "{}"); } catch (e) { return {}; }
}

function send(res, code, obj, headers = {}) {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(obj));
}

const clean = (v, n = 120) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, "").trim().slice(0, n) : "");

function ipHash(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").split(",")[0].trim();
  return crypto.createHmac("sha256", process.env.SESSION_SECRET || "x").update(ip).digest("hex").slice(0, 24);
}

function geo(req) {
  const dec = (v) => { try { return decodeURIComponent(v || ""); } catch (e) { return ""; } };
  return { country: clean(req.headers["x-vercel-ip-country"], 4), city: clean(dec(req.headers["x-vercel-ip-city"]), 60) };
}

function device(req) {
  const ua = String(req.headers["user-agent"] || "");
  if (/bot|crawl|spider|preview|facebookexternalhit|whatsapp/i.test(ua)) return "bot";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "celular";
  return "computadora";
}

module.exports = { readBody, send, clean, ipHash, geo, device };
