// Sesión del administrador: cookie firmada con HMAC, httpOnly, 8 horas.
const crypto = require("crypto");
const COOKIE = "mg_admin";
const TTL = 8 * 60 * 60 * 1000;

const sign = (payload) => crypto.createHmac("sha256", process.env.SESSION_SECRET).update(payload).digest("base64url");

function makeToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + TTL, n: crypto.randomBytes(8).toString("hex") })).toString("base64url");
  return payload + "." + sign(payload);
}

function verifyToken(tok) {
  if (!tok || !process.env.SESSION_SECRET) return false;
  const [payload, sig] = tok.split(".");
  if (!payload || !sig) return false;
  const good = sign(payload);
  if (good.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(good), Buffer.from(sig))) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now(); } catch (e) { return false; }
}

function readCookie(req) {
  const m = String(req.headers.cookie || "").match(new RegExp("(?:^|; )" + COOKIE + "=([^;]+)"));
  return m ? m[1] : null;
}

const isAdmin = (req) => verifyToken(readCookie(req));

function cookieHeader(tok, clear) {
  const secure = process.env.LOCAL_STORE_DIR ? "" : "; Secure";
  return clear
    ? `${COOKIE}=; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=0${secure}`
    : `${COOKIE}=${tok}; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=${TTL / 1000}${secure}`;
}

function checkPin(pin) {
  const salt = process.env.ADMIN_PIN_SALT, hash = process.env.ADMIN_PIN_HASH;
  if (!salt || !hash || typeof pin !== "string" || !/^\d{4,12}$/.test(pin)) return false;
  const got = crypto.scryptSync(pin, salt, 32);
  const want = Buffer.from(hash, "hex");
  return want.length === got.length && crypto.timingSafeEqual(got, want);
}

module.exports = { makeToken, isAdmin, cookieHeader, checkPin };
