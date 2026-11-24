/* GoodNews – logika aplikacji (bez zależności, bez kroku budowania). */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const main = $("#main");
  const FONT_STEPS = [0.85, 1, 1.15, 1.3, 1.5, 1.75];
  const FONT_LABELS = ["Mała", "Standardowa", "Duża", "Większa", "Bardzo duża", "Największa"];
  const TEO_MINUTES = 10;

  /* ---------- ustawienia ---------- */
  const DEFAULTS = { theme: "auto", fontStep: 1, wake: false, track: "teo" };
  let settings = Object.assign({}, DEFAULTS);
  try { Object.assign(settings, JSON.parse(localStorage.getItem("goodnews.settings") || "{}")); } catch (e) {}

  function saveSettings() {
    try { localStorage.setItem("goodnews.settings", JSON.stringify(settings)); } catch (e) {}
  }

  function applySettings() {
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.theme);
    root.style.setProperty("--fs", FONT_STEPS[settings.fontStep] || 1);
    const dark = settings.theme === "dark" ||
      (settings.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#141210" : "#f6f1e7");
  }
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", applySettings);
  applySettings();

  /* ---------- nie wygaszaj ekranu ---------- */
  let wakeLock = null;
  async function updateWakeLock() {
    try {
      if (settings.wake && "wakeLock" in navigator && document.visibilityState === "visible") {
        if (!wakeLock) {
          wakeLock = await navigator.wakeLock.request("screen");
          wakeLock.addEventListener("release", () => { wakeLock = null; });
        }
      } else if (wakeLock) {
        await wakeLock.release(); wakeLock = null;
      }
    } catch (e) { wakeLock = null; }
  }
  document.addEventListener("visibilitychange", updateWakeLock);
  updateWakeLock();

  /* ---------- pomocnicze ---------- */
  function toast(msg, actionLabel, action) {
    const t = $("#toast");
    t.innerHTML = "";
    t.append(msg);
    if (actionLabel) {
      const b = document.createElement("button");
      b.textContent = actionLabel;
      b.onclick = () => { t.hidden = true; action && action(); };
      t.append(b);
    }
    t.hidden = false;
    clearTimeout(toast._t);
    if (!actionLabel) toast._t = setTimeout(() => (t.hidden = true), 3500);
  }

  function enableSwipe(el, onLeft, onRight) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? onLeft : onRight)();
    }, { passive: true });
  }

  const ICONS = {
    laws: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2" opacity=".45"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2" opacity=".45"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2" opacity=".45"/></svg>',
    four: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.4-7-10a4.2 4.2 0 017.5-2.6l-.5.6.5-.6A4.2 4.2 0 0119 11c0 5.6-7 10-7 10z"/></svg>',
    teo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.2 9.4a2.9 2.9 0 115 1.9c-.8.8-2.2 1.2-2.2 2.7"/><circle cx="12" cy="17" r=".6" fill="currentColor"/></svg>'
  };
  const LOGO = '<svg class="logo" viewBox="0 0 512 512" aria-hidden="true"><rect width="512" height="512" rx="112" fill="#b24a14"/><path d="M256 150 v-70 M226 104 h60" stroke="#fff" stroke-width="22" stroke-linecap="round" fill="none"/><path d="M256 196 C206 168 146 166 100 184 v206 c46 -18 106 -16 156 12 c50 -28 110 -30 156 -12 V184 c-46 -18 -106 -16 -156 12 z" fill="#fff"/><path d="M256 196 v206" stroke="#b24a14" stroke-width="12"/></svg>';

  /* ---------- widoki ---------- */
  let cleanup = null;

  function setChrome(title, { back = null, extra = null } = {}) {
    $("#pageTitle").textContent = title;
    document.title = title === "GoodNews" ? "GoodNews – niezbędnik ewangelisty" : title + " · GoodNews";
    const b = $("#backBtn");
    b.hidden = !back;
    b.onclick = back ? () => { location.hash = back; } : null;
    const ex = $("#topbarExtra");
    ex.innerHTML = "";
    if (extra) ex.append(extra);
    $("#settingsBtn").hidden = location.hash.startsWith("#/settings");
  }

  /* --- ekran główny --- */
  function viewHome() {
    setChrome("GoodNews");
    main.innerHTML = `
      <section class="hero">
        ${LOGO}
        <h2>GoodNews</h2>
        <p>Niezbędnik ewangelisty – narzędzia pomocne w rozmowie o Dobrej Nowinie. Działa bez internetu.</p>
      </section>
      <nav class="cards" aria-label="Książeczki">
        <a class="card" href="#/four-laws">
          <span class="card-num">${ICONS.laws}</span>
          <h3>Cztery Prawa Duchowego Życia</h3>
          <p>Klasyczna prezentacja ewangelii krok po kroku, z modlitwą przyjęcia Chrystusa.</p>
          <span class="tag">${LAWS_SLIDES.length} ekranów</span>
        </a>
        <a class="card" href="#/thefour">
          <span class="card-num">${ICONS.four}</span>
          <h3>The Four</h3>
          <p>Cztery krótkie punkty: Bóg cię kocha, grzech, Jezus, twoja decyzja.</p>
          <span class="tag">4 punkty</span>
        </a>
        <a class="card" href="#/teotest">
          <span class="card-num">${ICONS.teo}</span>
          <h3>Teotest</h3>
          <p>${TEOTEST_INTRO.lead} 10 minut i 10 pytań, a wieczność, by żyć z odpowiedzią.</p>
          <span class="tag">10 pytań</span>
        </a>
      </nav>
      <p class="footnote"><span class="offline-badge" id="netBadge"></span></p>`;
    const badge = $("#netBadge");
    const upd = () => {
      badge.classList.toggle("off", !navigator.onLine);
      badge.textContent = navigator.onLine ? "Gotowa do pracy offline" : "Tryb offline – wszystko działa";
    };
    upd();
    window.addEventListener("online", upd); window.addEventListener("offline", upd);
    cleanup = () => { window.removeEventListener("online", upd); window.removeEventListener("offline", upd); };
  }

  /* --- Cztery Prawa --- */
  function lawsIndexFromParam(p) {
    if (!p) return 0;
    if (p.startsWith("page-")) {
      const n = parseInt(p.slice(5), 10);
      const i = LAWS_SLIDES.findIndex(s => s.page === n);
      return i < 0 ? 0 : i;
    }
    const n = parseInt(p, 10);
    return isNaN(n) ? 0 : Math.min(Math.max(n - 1, 0), LAWS_SLIDES.length - 1);
  }

  function viewLaws(param) {
    const idx = lawsIndexFromParam(param);
    const slide = LAWS_SLIDES[idx];
    setChrome("Cztery Prawa", { back: "#/" });
    const html = slide.html.replace(/\{\{(\w+)\}\}/g, (_, k) => LAWS_SVG[k] || "");
    const dots = LAWS_SLIDES.map((s, i) =>
      `<button type="button" data-i="${i}" class="${i < idx ? "done" : ""}" ${i === idx ? 'aria-current="step"' : ""} aria-label="Ekran ${i + 1} z ${LAWS_SLIDES.length}"></button>`).join("");
    const last = idx === LAWS_SLIDES.length - 1;
    main.innerHTML = `
      <div class="progress" role="group" aria-label="Postęp">${dots}</div>
      <article class="slide ${slide.big ? "has-big" : ""}" id="slide">
        ${slide.big ? `<span class="big" aria-hidden="true">${slide.big}</span>` : ""}
        ${html}
        ${slide.page ? `<span class="page-no" aria-label="Strona ${slide.page}">${slide.page}</span>` : ""}
      </article>
      <div class="pager">
        <a class="btn" id="prev" href="#/four-laws/${idx}" ${idx === 0 ? 'aria-disabled="true"' : ""}>← Wstecz</a>
        <span class="count">${idx + 1} / ${LAWS_SLIDES.length}</span>
        ${last
          ? `<a class="btn primary" href="#/">Zakończ</a>`
          : `<a class="btn primary" id="next" href="#/four-laws/${idx + 2}">Dalej →</a>`}
      </div>`;
    const go = i => { if (i >= 0 && i < LAWS_SLIDES.length) location.hash = "#/four-laws/" + (i + 1); };
    main.querySelectorAll(".progress button").forEach(b => b.onclick = () => go(+b.dataset.i));
    enableSwipe($("#slide"), () => go(idx + 1), () => go(idx - 1));
    const onKey = e => {
      if (e.key === "ArrowRight") go(idx + 1);
      else if (e.key === "ArrowLeft") go(idx - 1);
    };
    document.addEventListener("keydown", onKey);
    cleanup = () => document.removeEventListener("keydown", onKey);
    window.scrollTo(0, 0);
  }

  /* --- The Four --- */
  function viewFour() {
    setChrome("The Four", { back: "#/" });
    const cards = THEFOUR.map((c, i) => `
      <article class="four-card">
        <span class="num" aria-hidden="true">${i + 1}</span>
        <h2>${c.title}</h2>
        <p>${c.text}</p>
        ${c.verses.map(v => `<blockquote class="verse">${v.text} <cite>(${v.ref})</cite></blockquote>`).join("")}
      </article>`).join("");
    main.innerHTML = `
      ${cards}
      <a class="ext-link" href="${THEFOUR_URL}" target="_blank" rel="noopener">
        <span><strong>Zobacz więcej na thefour.com</strong><small>Otwiera stronę zewnętrzną – wymaga internetu</small></span>
        <span aria-hidden="true">↗</span>
      </a>`;
    window.scrollTo(0, 0);
  }

  /* --- Teotest --- */
  const timer = { running: false, endAt: 0, left: TEO_MINUTES * 60000 };
  let tickId = null;

  function fmt(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  }

  function timerButton() {
    const btn = document.createElement("button");
    btn.className = "timer"; btn.type = "button";
    const paint = () => {
      const left = timer.running ? timer.endAt - Date.now() : timer.left;
      btn.textContent = fmt(left);
      btn.classList.toggle("running", timer.running);
      btn.classList.toggle("over", left <= 0);
      btn.setAttribute("aria-label", "Stoper 10 minut: " + fmt(left) + (timer.running ? ", działa. Dotknij, aby wstrzymać." : ". Dotknij, aby uruchomić. Przytrzymaj, aby wyzerować."));
    };
    let longPressed = false;
    btn.onclick = () => {
      if (longPressed) { longPressed = false; return; }
      if (timer.running) { timer.left = timer.endAt - Date.now(); timer.running = false; }
      else {
        if (timer.left <= 0) timer.left = TEO_MINUTES * 60000;
        timer.endAt = Date.now() + timer.left; timer.running = true;
      }
      paint();
    };
    let hold;
    const reset = () => { timer.running = false; timer.left = TEO_MINUTES * 60000; paint(); toast("Stoper wyzerowany"); };
    btn.addEventListener("pointerdown", () => { longPressed = false; hold = setTimeout(() => { hold = null; longPressed = true; reset(); }, 700); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(ev => btn.addEventListener(ev, () => clearTimeout(hold)));
    btn.addEventListener("contextmenu", e => e.preventDefault());
    paint();
    tickId = setInterval(paint, 500);
    return btn;
  }

  function viewTeo(param) {
    if (tickId) { clearInterval(tickId); tickId = null; }
    const q = param ? Math.min(Math.max(parseInt(param, 10) || 1, 1), TEOTEST.length) : 0;

    if (!q) {
      setChrome("Teotest", { back: "#/" });
      main.innerHTML = `
        <section class="teo-intro">
          <h2>${TEOTEST_INTRO.title}</h2>
          <div class="lead">${TEOTEST_INTRO.lead}</div>
          <p>${TEOTEST_INTRO.sub}</p>
          <div class="actions">
            <a class="btn primary" href="#/teotest/1">Zaczynamy – pytanie 1</a>
          </div>
        </section>
        <details class="help" open>
          <summary>Jak korzystać</summary>
          <p>Zadaj pierwsze pytanie. Jeśli rozmówca wierzy w Boga – prowadź ścieżką <strong>Teo</strong>, jeśli nie – ścieżką <strong>Ateo</strong>. Przełączać ścieżkę możesz w każdej chwili. W prawym górnym rogu jest stoper na 10 minut (dotknij: start/pauza, przytrzymaj: zerowanie). Pod każdym pytaniem znajdziesz podpowiedź dla prowadzącego.</p>
        </details>`;
      cleanup = null;
      return;
    }

    setChrome("Pytanie " + q + " / " + TEOTEST.length, { back: q === 1 ? "#/teotest" : "#/teotest/" + (q - 1), extra: timerButton() });
    const track = settings.track === "ateo" ? "ateo" : "teo";
    const item = TEOTEST[q - 1][track];
    const chips = TEOTEST.map((_, i) =>
      `<a class="chip" href="#/teotest/${i + 1}" ${i + 1 === q ? 'aria-current="step"' : ""} aria-label="Pytanie ${i + 1}">${i + 1}</a>`).join("");
    const last = q === TEOTEST.length;
    main.innerHTML = `
      <div class="chips" role="navigation" aria-label="Pytania">${chips}</div>
      <div class="seg" role="group" aria-label="Ścieżka rozmowy">
        <button type="button" data-track="teo" aria-pressed="${track === "teo"}">Teo – wierzy</button>
        <button type="button" data-track="ateo" aria-pressed="${track === "ateo"}">Ateo – nie wierzy</button>
      </div>
      <article class="question-card" id="qcard">
        <div class="qno" aria-hidden="true">${q}</div>
        <p class="qtext">${item.s1}<em>${item.s2}</em>${item.s3}</p>
      </article>
      <details class="help">
        <summary>Podpowiedź dla prowadzącego</summary>
        <p>${item.help}</p>
      </details>
      <div class="pager">
        <a class="btn" href="#/teotest/${q - 1}" ${q === 1 ? 'aria-disabled="true"' : ""}>← Wstecz</a>
        <span class="count">${q} / ${TEOTEST.length}</span>
        ${last
          ? `<a class="btn primary" href="#/four-laws">Cztery Prawa →</a>`
          : `<a class="btn primary" href="#/teotest/${q + 1}">Dalej →</a>`}
      </div>`;
    main.querySelectorAll(".seg button").forEach(b => b.onclick = () => {
      settings.track = b.dataset.track; saveSettings();
      route();
    });
    const go = n => { if (n >= 1 && n <= TEOTEST.length) location.hash = "#/teotest/" + n; };
    enableSwipe($("#qcard"), () => go(q + 1), () => go(q - 1));
    const onKey = e => {
      if (e.key === "ArrowRight") go(q + 1);
      else if (e.key === "ArrowLeft") go(q - 1);
    };
    document.addEventListener("keydown", onKey);
    cleanup = () => { document.removeEventListener("keydown", onKey); };
    window.scrollTo(0, 0);
  }

  /* --- Ustawienia --- */
  let installEvent = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvent = e; if (location.hash.startsWith("#/settings")) viewSettings(); });
  window.addEventListener("appinstalled", () => { installEvent = null; toast("Aplikacja zainstalowana"); });

  function isStandalone() {
    return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  }

  function viewSettings() {
    setChrome("Ustawienia", { back: "#/" });
    const themes = [["auto", "Auto"], ["light", "Jasny"], ["dark", "Ciemny"]];
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    main.innerHTML = `
      <section class="group">
        <h2>Motyw</h2>
        <div class="seg3" role="group" aria-label="Motyw">
          ${themes.map(([v, l]) => `<button type="button" class="opt" data-theme="${v}" aria-pressed="${settings.theme === v}"><span class="sw ${v}"></span>${l}</button>`).join("")}
        </div>
        <p class="hint">„Auto” dopasowuje się do ustawień urządzenia.</p>
      </section>

      <section class="group">
        <h2>Wielkość czcionki: <span id="fsLabel">${FONT_LABELS[settings.fontStep]}</span></h2>
        <div class="range-row">
          <span class="a-small" aria-hidden="true">A</span>
          <input type="range" id="fs" min="0" max="${FONT_STEPS.length - 1}" step="1" value="${settings.fontStep}" aria-label="Wielkość czcionki">
          <span class="a-big" aria-hidden="true">A</span>
        </div>
        <div class="preview">„Tak bowiem Bóg umiłował świat, że Syna swego jednorodzonego dał…” (Jan 3,16)</div>
      </section>

      <section class="group">
        <div class="switch-row">
          <div>
            <h2 style="margin:0">Nie wygaszaj ekranu</h2>
            <p class="hint" style="margin:.2rem 0 0">Ekran zostaje włączony podczas rozmowy.${"wakeLock" in navigator ? "" : " (Ta przeglądarka tego nie obsługuje.)"}</p>
          </div>
          <label class="switch"><input type="checkbox" id="wake" ${settings.wake ? "checked" : ""} ${"wakeLock" in navigator ? "" : "disabled"} aria-label="Nie wygaszaj ekranu"><span></span></label>
        </div>
      </section>

      <section class="group">
        <h2>Instalacja i tryb offline</h2>
        <p class="hint" style="margin-top:0" id="offlineState"></p>
        ${isStandalone()
          ? `<p class="hint">Aplikacja jest zainstalowana na tym urządzeniu.</p>`
          : installEvent
            ? `<p><button type="button" class="btn primary" id="install">Zainstaluj aplikację</button></p>`
            : ios
              ? `<p class="hint">Na iPhonie/iPadzie: dotknij <strong>Udostępnij</strong> → <strong>Dodaj do ekranu początkowego</strong>.</p>`
              : `<p class="hint">Aby zainstalować, użyj opcji „Zainstaluj aplikację” / „Dodaj do ekranu głównego” w menu przeglądarki.</p>`}
        <p><button type="button" class="btn" id="refresh">Sprawdź aktualizacje</button></p>
      </section>

      <p class="footnote">GoodNews · wersja ${window.GOODNEWS_VERSION || "1.0.0"}</p>`;

    main.querySelectorAll("[data-theme]").forEach(b => b.onclick = () => {
      settings.theme = b.dataset.theme; saveSettings(); applySettings();
      main.querySelectorAll("[data-theme]").forEach(x => x.setAttribute("aria-pressed", x === b));
    });
    const fs = $("#fs");
    fs.oninput = () => {
      settings.fontStep = +fs.value; saveSettings(); applySettings();
      $("#fsLabel").textContent = FONT_LABELS[settings.fontStep];
    };
    $("#wake")?.addEventListener("change", e => { settings.wake = e.target.checked; saveSettings(); updateWakeLock(); });
    $("#install")?.addEventListener("click", async () => {
      if (!installEvent) return;
      installEvent.prompt();
      await installEvent.userChoice.catch(() => {});
      installEvent = null; viewSettings();
    });
    $("#refresh").onclick = async () => {
      if (!("serviceWorker" in navigator)) return toast("Ta przeglądarka nie obsługuje trybu offline.");
      if (!navigator.onLine) return toast("Brak internetu – aktualizacja możliwa po połączeniu.");
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (!reg) return toast("Tryb offline jeszcze się nie uruchomił – odśwież stronę.");
        await reg.update();
        toast(reg.waiting || reg.installing ? "Znaleziono nową wersję." : "Masz najnowszą wersję.");
      } catch (e) { toast("Nie udało się sprawdzić aktualizacji."); }
    };
    const off = $("#offlineState");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        off.textContent = reg && reg.active
          ? "Wszystkie treści są zapisane na urządzeniu – aplikacja działa bez internetu."
          : "Pierwsze uruchomienie z internetem zapisze treści na urządzeniu.";
      });
    } else off.textContent = "Ta przeglądarka nie obsługuje trybu offline.";
    cleanup = null;
    window.scrollTo(0, 0);
  }

  /* ---------- router ---------- */
  function route() {
    if (cleanup) { cleanup(); cleanup = null; }
    if (tickId && !location.hash.startsWith("#/teotest/")) { clearInterval(tickId); tickId = null; }
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    const [name, param] = parts;
    switch (name) {
      case "four-laws": viewLaws(param); break;
      case "thefour": viewFour(); break;
      case "teotest": viewTeo(param); break;
      case "settings": viewSettings(); break;
      default: viewHome();
    }
    $("#settingsBtn").hidden = name === "settings";
  }
  window.addEventListener("hashchange", () => { route(); main.focus({ preventScroll: true }); });
  route();

  /* ---------- Service Worker (tryb offline) ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(reg => {
        const announce = w => toast("Dostępna nowa wersja.", "Odśwież", () => w.postMessage({ type: "SKIP_WAITING" }));
        if (reg.waiting && navigator.serviceWorker.controller) announce(reg.waiting);
        reg.addEventListener("updatefound", () => {
          const w = reg.installing;
          w && w.addEventListener("statechange", () => {
            if (w.state === "installed" && navigator.serviceWorker.controller) announce(w);
          });
        });
      }).catch(() => {});
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloaded) return; reloaded = true; location.reload();
      });
    });
  }
})();
