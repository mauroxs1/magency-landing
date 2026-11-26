(function () {
  "use strict";
  var C = window.CONFIG, T = window.I18N, Q = window.QUIZ;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var PLANS = {
    inicio: { name: "M Pack Inicio", ars: 299000, once: true, from: false },
    esencial: { name: "M Esencial", ars: 250000, from: false },
    profesional: { name: "M Profesional", ars: 370000, from: true },
    premium: { name: "M Premium", ars: 700000, from: true },
    gestion: { name: "M Sistema de Gestión", ars: 80000, from: true },
    landing: { name: "M Landing", ars: 60000, from: true }
  };

  /* ---------- idioma ---------- */
  var ES = {};
  $$("[data-i18n]").forEach(function (el) { ES[el.dataset.i18n] = el.textContent; });
  $$("[data-i18n-html]").forEach(function (el) { ES[el.dataset.i18nHtml] = el.innerHTML; });

  function pickLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && /^(es|en|pt)$/.test(q)) return q;
    try { var s = localStorage.getItem("magency-lang"); if (s) return s; } catch (e) {}
    var n = (navigator.language || "es").slice(0, 2);
    return n === "pt" ? "pt" : n === "en" ? "en" : "es";
  }
  var lang = pickLang();

  /* ---------- precios ---------- */
  function usd(ars, foreign) {
    var v = ars / C.arsPorUsd * (foreign ? 1 + C.recargoExterior : 1);
    return Math.ceil(v / 5) * 5;
  }
  function fmtArs(n) { return "$" + n.toLocaleString("es-AR"); }
  function fmtUsd(n) { return "USD " + n.toLocaleString("en-US"); }
  function priceText(ars) { return lang === "es" ? fmtArs(ars) : fmtUsd(usd(ars, true)); }

  function renderPrices() {
    $$("[data-price]").forEach(function (el) { el.textContent = priceText(+el.dataset.price); });
    $$("[data-usd]").forEach(function (el) {
      el.textContent = lang === "es" ? "≈ " + fmtUsd(usd(+el.dataset.usd, false)) : "";
      el.hidden = lang !== "es";
    });
  }

  /* ---------- WhatsApp ---------- */
  function wa(text) { return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text); }
  function msgFor(key) {
    var q = Q[lang];
    if (key.indexOf("plan:") === 0) return q.msgPlan.replace("{plan}", key.slice(5));
    if (key === "help") return q.msgHelp;
    return q.msgGeneral;
  }
  function renderWa() { $$("a.wa").forEach(function (a) { a.href = wa(msgFor(a.dataset.msg || "general")); }); }

  function applyLang(l) {
    lang = l;
    try { localStorage.setItem("magency-lang", l); } catch (e) {}
    document.documentElement.lang = l === "pt" ? "pt-PT" : l;
    var d = l === "es" ? ES : T[l];
    $$("[data-i18n]").forEach(function (el) { var v = d[el.dataset.i18n]; if (v != null) el.textContent = v; });
    $$("[data-i18n-html]").forEach(function (el) { var v = d[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    var min = $("[data-i18n='hero.t2']");
    if (min && l !== "es") min.textContent = d["hero.t2"].replace("{min}", priceText(60000));
    $$(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === l)); });
    var fab = $(".fab"); if (fab) fab.dataset.label = l === "es" ? "Hablá con Mauro" : T[l].fab;
    renderPrices(); renderWa(); renderQuiz();
  }
  $$(".lang button").forEach(function (b) { b.addEventListener("click", function () { applyLang(b.dataset.lang); }); });


  /* ---------- encuesta primero ---------- */
  var KEY = "magency-open";
  function isOpen() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
  function openSite(target) {
    var wasGated = document.body.classList.contains("gated");
    document.body.classList.remove("gated");
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
    if (wasGated) $$("main > section:not(.hero), footer").forEach(function (el) { el.classList.add("reveal"); });
    if (target) { var el = $(target); if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); }
  }
  if (isOpen() || new URLSearchParams(location.search).get("perfil")) document.body.classList.remove("gated");
  $("#skip").addEventListener("click", function () { openSite("#caminos"); });
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var h = a.getAttribute("href");
      if (document.body.classList.contains("gated") && h !== "#top" && h !== "#encuesta") { e.preventDefault(); openSite(h); }
    });
  });

  /* ---------- encuesta ---------- */
  var answers = [], body = $("#quiz-body"), dots = $$(".steps i");

  function recommend(a) {
    var stage = a[0], pain = a[1], budget = a[2], main, extras = [];
    if (stage === "arranco") { main = "inicio"; extras.push("landing"); }
    else if (stage === "vendo") { main = budget === "no" ? "esencial" : "profesional"; }
    else { main = (budget === "fuerte" || pain === "tiempo") ? "premium" : "profesional"; }
    if (pain === "numeros") extras.push("gestion");
    return { main: main, extras: extras };
  }

  function renderQuiz() {
    var q = Q[lang], step = answers.length;
    dots.forEach(function (d, i) { d.classList.toggle("on", i < Math.min(step + 1, 3)); });
    if (step < 3) {
      var item = q.q[step], html = '<p class="q-count">' + q.count.replace("{n}", step + 1) + '</p><p class="q-title">' + item.t + '</p><div class="opts">';
      Object.keys(item.o).forEach(function (k, i) {
        html += '<button type="button" class="opt" data-k="' + k + '"><b>' + String.fromCharCode(65 + i) + "</b>" + item.o[k] + "</button>";
      });
      html += "</div>" + (step ? '<button type="button" class="q-back">' + q.back + "</button>" : "");
      body.innerHTML = html;
      $$(".opt", body).forEach(function (b) { b.addEventListener("click", function () { answers.push(b.dataset.k); renderQuiz(); }); });
    } else {
      var r = recommend(answers), p = PLANS[r.main];
      var names = [p.name].concat(r.extras.map(function (x) { return PLANS[x].name; })).join(" + ");
      var why = q.why[r.main] + r.extras.map(function (x) { return " " + q.why[x]; }).join("");
      var per = p.once ? (lang === "es" ? ES["p.once"] : T[lang]["p.once"]) : (lang === "es" ? ES["p.month"] : T[lang]["p.month"]);
      var from = p.from ? (lang === "es" ? ES["p.from"] : T[lang]["p.from"]) + " " : "";
      var a = answers.map(function (k, i) { return q.q[i].o[k]; });
      var text = q.msgQuiz.replace("{a1}", a[0]).replace("{a2}", a[1]).replace("{a3}", a[2]).replace("{plan}", names);
      body.innerHTML = '<div class="result"><small>' + q.resultTitle + "</small><h3>" + p.name + "</h3>" +
        r.extras.map(function (x) { return '<div class="plus">' + q.plus.replace("{x}", PLANS[x].name) + "</div>"; }).join("") +
        "<p>" + why + '</p><div class="price">' + from + priceText(p.ars) + " <span>" + per + "</span></div>" +
        '<a class="btn btn-v" target="_blank" rel="noopener" href="' + wa(text) + '">' + q.cta + "</a>" +
        '<button type="button" class="q-back">' + q.restart + '</button><a class="q-back" href="#planes" style="display:block;text-align:center">' + q.seeAll + "</a></div>";
      openSite();
    }
    var back = $(".q-back", body);
    if (back) back.addEventListener("click", function () { if (answers.length >= 3) answers = []; else answers.pop(); renderQuiz(); });
  }

  /* ---------- links de campaña: ?perfil=inicio|crecer|escalar|gestion ---------- */
  var MAP = { inicio: "#plan-inicio", crecer: "#plan-profesional", escalar: "#plan-premium", gestion: "#svc-gestion" };
  function applyProfile() {
    var p = new URLSearchParams(location.search).get("perfil");
    if (!p || !MAP[p]) return;
    var card = $(MAP[p]), path = $('[data-path="' + p + '"]');
    if (path) path.classList.add("hl");
    if (card) { card.classList.add("hl"); setTimeout(function () { card.scrollIntoView({ block: "center" }); }, 200); }
  }

  /* ---------- header ---------- */
  var header = $("header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 8); }, { passive: true });


  /* ---------- testimonios en audio ---------- */
  var current = null;
  $$(".voice").forEach(function (card) {
    var wave = $(".wave", card), btn = $(".play", card), time = $(".vtime", card), bars = [];
    for (var i = 0; i < 40; i++) {
      var b = document.createElement("i");
      b.style.height = (30 + Math.round(60 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)))) + "%";
      wave.appendChild(b); bars.push(b);
    }
    var audio = new Audio(card.dataset.audio); audio.preload = "metadata";
    var playIco = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>';
    var pauseIco = '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
    function fmt(t) { t = Math.max(0, Math.round(t)); return Math.floor(t / 60) + ":" + ("0" + (t % 60)).slice(-2); }
    audio.addEventListener("timeupdate", function () {
      var p = audio.duration ? audio.currentTime / audio.duration : 0;
      bars.forEach(function (b, i) { b.classList.toggle("on", i / bars.length < p); });
      time.textContent = fmt((audio.duration || 0) - audio.currentTime);
    });
    audio.addEventListener("ended", function () { btn.innerHTML = playIco; bars.forEach(function (b) { b.classList.remove("on"); }); });
    btn.addEventListener("click", function () {
      if (current && current !== audio) { current.pause(); }
      if (audio.paused) { audio.play(); btn.innerHTML = pauseIco; current = audio;
        $$(".voice .play").forEach(function (o) { if (o !== btn) o.innerHTML = playIco; });
      } else { audio.pause(); btn.innerHTML = playIco; }
    });
  });

  applyLang(lang);
  applyProfile();
})();
