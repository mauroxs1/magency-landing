// Métricas y contactos para el panel. Requiere sesión de administrador.
// ?days=7|30|90   ·   ?format=csv  (descarga de contactos)
const { send } = require("../_lib/http");
const { isAdmin } = require("../_lib/auth");
const { getJSON, putJSON, listPaths, del } = require("../_lib/store");

const dayAR = (ts) => new Date(ts - 3 * 3600e3).toISOString().slice(0, 10);

async function eventsForDay(day, today) {
  const agg = (await getJSON(`agg/${day}.json`)) || [];
  const raw = (await listPaths(`ev/${day}/`)).filter((p) => p.endsWith(".json"));
  if (!raw.length) return agg;
  const fresh = (await Promise.all(raw.map((p) => getJSON(p)))).filter(Boolean);
  const all = agg.concat(fresh);
  if (day < today) { // días cerrados: se compactan en un solo archivo para que el panel cargue rápido
    await putJSON(`agg/${day}.json`, all);
    await del(raw);
  }
  return all;
}

const inc = (o, k, n = 1) => { if (k) o[k] = (o[k] || 0) + n; };
const top = (o, n = 10) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);

module.exports = async (req, res) => {
  if (!isAdmin(req)) return send(res, 401, { ok: false });
  const url = new URL(req.url, "http://x");
  const days = Math.min(365, Math.max(1, parseInt(url.searchParams.get("days"), 10) || 30));
  const now = Date.now(), today = dayAR(now);
  const dayList = [...Array(days)].map((_, i) => dayAR(now - (days - 1 - i) * 86400e3));
  const from = new Date(dayList[0] + "T03:00:00Z").getTime();

  const leadPaths = (await listPaths("lead/")).filter((p) => p.endsWith(".json"));
  const leads = (await Promise.all(leadPaths.map((p) => getJSON(p)))).filter((l) => l && l.ts >= from).sort((a, b) => b.ts - a.ts);

  if (url.searchParams.get("format") === "csv") {
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [["fecha", "nombre", "email", "acepta_emails", "plan_recomendado", "etapa", "dificultad", "presupuesto", "idioma", "ciudad", "pais"]]
      .concat(leads.map((l) => [new Date(l.ts - 3 * 3600e3).toISOString().replace("T", " ").slice(0, 16), l.name, l.email, l.consent ? "si" : "no", l.plan, ...(l.answers.concat(["", "", ""]).slice(0, 3)), l.lang, l.city, l.country]));
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="magency-contactos-${today}.csv"`);
    res.setHeader("Cache-Control", "no-store");
    return res.end("﻿" + rows.map((r) => r.map(esc).join(",")).join("\n"));
  }

  const evs = (await Promise.all(dayList.map((d) => eventsForDay(d, today)))).flat();

  const byDay = Object.fromEntries(dayList.map((d) => [d, { views: 0, visitors: new Set(), wa: 0 }]));
  const visitors = new Set(), sessions = new Set(), quizStart = new Set(), waVisitors = new Set();
  const sessSec = {}, buttons = {}, plans = {}, sources = {}, devices = {}, langs = {}, cities = {};
  let views = 0, quizDone = 0, wa = 0, audio = 0;
  const waList = [];

  for (const e of evs) {
    const d = dayAR(e.ts);
    if (e.t === "view") {
      views++; visitors.add(e.v); sessions.add(e.s);
      if (byDay[d]) { byDay[d].views++; byDay[d].visitors.add(e.v); }
      inc(sources, e.perfil ? `campaña: ${e.perfil}` : e.utm ? `utm: ${e.utm}` : e.ref ? e.ref : "directo");
      inc(devices, e.dev); inc(langs, e.lang); inc(cities, e.city ? `${e.city}${e.country ? ", " + e.country : ""}` : e.country);
    } else if (e.t === "leave") {
      sessSec[e.s] = Math.max(sessSec[e.s] || 0, e.sec);
    } else if (e.t === "click") {
      inc(buttons, e.label);
    } else if (e.t === "wa") {
      wa++; waVisitors.add(e.v); inc(buttons, "WhatsApp · " + e.label);
      if (byDay[d]) byDay[d].wa++;
      waList.push(e);
    } else if (e.t === "quiz_start") {
      quizStart.add(e.s);
    } else if (e.t === "quiz_done") {
      quizDone++; inc(plans, e.plan);
    } else if (e.t === "audio") {
      audio++; inc(buttons, "Audio · " + e.label);
    }
  }

  const secs = Object.values(sessSec).filter((s) => s > 0);
  const nameByV = {};
  leads.slice().reverse().forEach((l) => { if (l.v) nameByV[l.v] = l.name; });

  send(res, 200, {
    ok: true, days, generated: now,
    kpis: {
      views, visitors: visitors.size, sessions: sessions.size,
      avgSeconds: secs.length ? Math.round(secs.reduce((a, b) => a + b, 0) / secs.length) : 0,
      quizStarted: quizStart.size, quizDone, leads: leads.length, leadsConsent: leads.filter((l) => l.consent).length,
      waClicks: wa, waVisitors: waVisitors.size,
      waRate: visitors.size ? Math.round((waVisitors.size / visitors.size) * 1000) / 10 : 0,
      audioPlays: audio,
    },
    byDay: dayList.map((d) => ({ day: d, views: byDay[d].views, visitors: byDay[d].visitors.size, wa: byDay[d].wa })),
    buttons: top(buttons, 12), plans: top(plans), sources: top(sources), devices: top(devices), langs: top(langs), cities: top(cities, 8),
    waList: waList.sort((a, b) => b.ts - a.ts).slice(0, 60).map((e) => ({ ts: e.ts, label: e.label, plan: e.plan, city: e.city, dev: e.dev, name: nameByV[e.v] || "" })),
    leads: leads.map((l) => ({ ts: l.ts, name: l.name, email: l.email, consent: l.consent, plan: l.plan, answers: l.answers, lang: l.lang, city: l.city })),
  });
};
