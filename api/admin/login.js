// Ingreso al panel con PIN. Protecciones:
// - el PIN se valida solo en el servidor, contra un hash (scrypt), nunca viaja en el código de la web
// - 5 intentos fallidos por conexión => bloqueo de 15 minutos
// - 30 intentos fallidos en total por hora => se bloquea el ingreso por 1 hora (frena ataques distribuidos)
// - demora fija en cada fallo
const { readBody, send, ipHash } = require("../_lib/http");
const { getJSON, putJSON } = require("../_lib/store");
const { checkPin, makeToken, cookieHeader } = require("../_lib/auth");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PER_IP = 5, IP_LOCK = 15 * 60e3, GLOBAL = 30, GLOBAL_WIN = 60 * 60e3;

module.exports = async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { ok: false });
  let b;
  try { b = await readBody(req, 500); } catch (e) { return send(res, 413, { ok: false }); }
  const now = Date.now();
  const ipKey = `auth/ip-${ipHash(req)}.json`;
  const ip = (await getJSON(ipKey)) || { fails: 0, until: 0 };
  const glob = (await getJSON("auth/global.json")) || { fails: 0, since: now, until: 0 };
  if (now - glob.since > GLOBAL_WIN) { glob.fails = 0; glob.since = now; }

  if (ip.until > now || glob.until > now) {
    const wait = Math.ceil((Math.max(ip.until, glob.until) - now) / 60e3);
    return send(res, 429, { ok: false, error: "bloqueado", minutos: wait });
  }

  if (checkPin(String(b.pin || ""))) {
    await putJSON(ipKey, { fails: 0, until: 0 });
    return send(res, 200, { ok: true }, { "Set-Cookie": cookieHeader(makeToken()) });
  }

  ip.fails += 1;
  if (ip.fails >= PER_IP) { ip.until = now + IP_LOCK; ip.fails = 0; }
  glob.fails += 1;
  if (glob.fails >= GLOBAL) { glob.until = now + GLOBAL_WIN; glob.fails = 0; glob.since = now; }
  await Promise.all([putJSON(ipKey, ip), putJSON("auth/global.json", glob)]);
  await sleep(900);
  send(res, 401, { ok: false, error: "pin", restantes: ip.until > now ? 0 : PER_IP - ip.fails });
};
