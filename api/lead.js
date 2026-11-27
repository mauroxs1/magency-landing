// Guarda el nombre y email que deja una persona al terminar la encuesta.
const { readBody, send, clean, geo, device } = require("./_lib/http");
const { putJSON, rid } = require("./_lib/store");

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { ok: false });
  let b;
  try { b = await readBody(req, 4000); } catch (e) { return send(res, 413, { ok: false }); }
  if (b.website) return send(res, 200, { ok: true }); // trampa para bots
  const name = clean(b.name, 80), email = clean(b.email, 254).toLowerCase();
  if (name.length < 2 || !EMAIL.test(email)) return send(res, 400, { ok: false, error: "datos" });
  const ts = Date.now();
  const answers = Array.isArray(b.answers) ? b.answers.slice(0, 3).map((a) => clean(a, 80)) : [];
  const lead = {
    ts, name, email,
    consent: b.consent === true,
    plan: clean(b.plan, 80), answers,
    lang: clean(b.lang, 4), v: clean(b.v, 40),
    perfil: clean(b.perfil, 20), utm: clean(b.utm, 60),
    dev: device(req), ...geo(req),
  };
  try {
    await putJSON(`lead/${ts}-${rid()}.json`, lead);
  } catch (e) {
    return send(res, 500, { ok: false });
  }
  send(res, 200, { ok: true });
};
