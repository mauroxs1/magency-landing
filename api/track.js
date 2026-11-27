// Recibe eventos anónimos de la web (visitas, clics, tiempo en pantalla, encuesta).
const { readBody, send, clean, geo, device } = require("./_lib/http");
const { putJSON, rid } = require("./_lib/store");

const TYPES = new Set(["view", "leave", "click", "wa", "quiz_start", "quiz_done", "audio", "lang"]);
const dayAR = (ts) => new Date(ts - 3 * 3600e3).toISOString().slice(0, 10);

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { ok: false });
  let b;
  try { b = await readBody(req, 4000); } catch (e) { return send(res, 413, { ok: false }); }
  const t = clean(b.t, 20);
  if (!TYPES.has(t)) return send(res, 400, { ok: false });
  const dev = device(req);
  if (dev === "bot") return send(res, 200, { ok: true });
  const ts = Date.now();
  const ev = {
    ts, t,
    v: clean(b.v, 40), s: clean(b.s, 40),
    label: clean(b.label, 80), plan: clean(b.plan, 60),
    sec: Math.max(0, Math.min(3600, parseInt(b.sec, 10) || 0)),
    lang: clean(b.lang, 4), perfil: clean(b.perfil, 20),
    utm: clean(b.utm, 60), ref: clean(b.ref, 80),
    dev, ...geo(req),
  };
  try {
    await putJSON(`ev/${dayAR(ts)}/${ts}-${rid()}.json`, ev);
  } catch (e) {
    return send(res, 500, { ok: false });
  }
  send(res, 200, { ok: true });
};
