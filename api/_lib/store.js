// Almacenamiento cifrado. En producción usa Vercel Blob (privado);
// para pruebas locales, una carpeta (LOCAL_STORE_DIR).
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const KEY = () => {
  const k = process.env.DATA_KEY;
  if (!k) throw new Error("Falta DATA_KEY");
  return Buffer.from(k, "base64");
};

function encrypt(obj) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", KEY(), iv);
  const data = Buffer.concat([c.update(JSON.stringify(obj), "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), data]).toString("base64");
}
function decrypt(txt) {
  const buf = Buffer.from(txt, "base64");
  const d = crypto.createDecipheriv("aes-256-gcm", KEY(), buf.subarray(0, 12));
  d.setAuthTag(buf.subarray(12, 28));
  return JSON.parse(Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8"));
}

const useBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const localDir = () => process.env.LOCAL_STORE_DIR || "/tmp/magency-store";

async function putJSON(p, obj) {
  const body = encrypt(obj);
  if (useBlob()) {
    const { put } = require("@vercel/blob");
    await put(p, body, { access: "private", addRandomSuffix: false, allowOverwrite: true, contentType: "text/plain" });
    return;
  }
  const f = path.join(localDir(), p);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, body);
}

async function getJSON(p) {
  try {
    if (useBlob()) {
      const { get } = require("@vercel/blob");
      const r = await get(p, { access: "private", useCache: false });
      if (!r) return null;
      const txt = await new Response(r.stream).text();
      return decrypt(txt);
    }
    const f = path.join(localDir(), p);
    if (!fs.existsSync(f)) return null;
    return decrypt(fs.readFileSync(f, "utf8"));
  } catch (e) {
    return null;
  }
}

async function listPaths(prefix) {
  if (useBlob()) {
    const { list } = require("@vercel/blob");
    const out = [];
    let cursor;
    do {
      const r = await list({ prefix, cursor, limit: 1000 });
      r.blobs.forEach((b) => out.push(b.pathname));
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
    return out;
  }
  const base = path.join(localDir(), prefix);
  const dir = fs.existsSync(base) && fs.statSync(base).isDirectory() ? base : path.dirname(base);
  if (!fs.existsSync(dir)) return [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.relative(localDir(), path.join(d, e.name))]);
  return walk(dir).filter((p) => p.startsWith(prefix));
}

async function del(paths) {
  if (!paths.length) return;
  if (useBlob()) {
    const { del } = require("@vercel/blob");
    for (let i = 0; i < paths.length; i += 100) await del(paths.slice(i, i + 100));
    return;
  }
  paths.forEach((p) => { try { fs.unlinkSync(path.join(localDir(), p)); } catch (e) {} });
}

const rid = () => crypto.randomBytes(6).toString("hex");

module.exports = { putJSON, getJSON, listPaths, del, rid };
