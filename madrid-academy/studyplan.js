/* =====================================================================
   STUDY PLAN tab (#studyplan) — mentor Valeria · La historia del español ·
   El español en el mundo (Leaflet, loaded on demand) · Mi plan de estudio.
   Plan state lives in st().plan and merges with cloud saves.
   ===================================================================== */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;
  const G = MA.GUIDE, PL = MA.PLAN;
  const CAL = '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 13h.01"/><path d="M12 13h.01"/><path d="M16 13h.01"/><path d="M8 17h.01"/><path d="M12 17h.01"/><path d="M16 17h.01"/></svg>';
  MA.LUCIDE = Object.assign(MA.LUCIDE || {}, { calendarDays: CAL });

  /* ---------- state ---------- */
  const P = () => { const s = st(); if (!s.plan) s.plan = {}; const p = s.plan; p.start = p.start || S.today(); p.days = p.days || {}; p.cando = p.cando || {}; p.tests = p.tests || []; p.reviewDays = p.reviewDays || [6, 0]; return p; };
  const save = () => { st().plan.t = Date.now(); S.save(true); };
  const m0 = S.merge;
  S.merge = function (a, b) {
    const r = m0.apply(this, arguments); if (!a || !b || !r) return r;
    const pa = a.plan || {}, pb = b.plan || {}; if (!a.plan && !b.plan) return r;
    const newer = (pa.t || 0) >= (pb.t || 0) ? pa : pb, older = newer === pa ? pb : pa;
    const days = Object.assign({}, older.days || {});
    for (const k in newer.days || {}) { const o = days[k], n = newer.days[k]; days[k] = o ? { t: Object.assign({}, o.t, n.t) } : n; }
    const pd = Object.assign({}, older.pd || {});
    for (const k in newer.pd || {}) { const o = pd[k], n = newer.pd[k]; pd[k] = o ? Object.assign({}, o, n, { s: Object.assign({}, o.s, n.s) }) : n; }
    const gr = Object.assign({}, older.gr || {}); for (const k in newer.gr || {}) gr[k] = Math.max(gr[k] || 0, newer.gr[k]);
    r.plan = Object.assign({}, older, newer, { pd, gr, passiveLog: Object.assign({}, older.passiveLog, newer.passiveLog), reflect: Object.assign({}, older.reflect, newer.reflect), days, cando: Object.assign({}, older.cando, newer.cando), tests: [...new Map([...(older.tests || []), ...(newer.tests || [])].map(x => [x.at, x])).values()].sort((x, y) => x.at - y.at) });
    return r;
  };

  /* ---------- helpers ---------- */
  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dowOf = k => new Date(k + 'T12:00:00Z').getUTCDay();
  const isReview = k => P().reviewDays.includes(dowOf(k));
  const tasksFor = k => [...(isReview(k) ? PL.review : PL.study), { id: 'passive', min: 15, title: 'Passive listening (optional)', how: 'A video or podcast from the list below — no pressure, just enjoy it.', opt: true }];
  const log = k => (P().days[k] || { t: {} });
  const doneMin = k => tasksFor(k).filter(t => log(k).t[t.id]).reduce((a, t) => a + t.min, 0);
  const active = k => tasksFor(k).some(t => !t.opt && log(k).t[t.id]);
  const monday = k => { const d = dowOf(k); return S.addDays(k, d === 0 ? -6 : 1 - d); };
  const fmt = k => new Date(k + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
  const ext = (url, txt) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(txt)} ↗</a>`;
  const cityLessons = id => MA.CHAPTERS.filter(c => c.city === id).flatMap(c => c.lessons);
  const streak = () => { let k = S.today(), n = 0; if (!Object.values(log(k).t).some(Boolean)) k = S.addDays(k, -1); while (Object.values(log(k).t).some(Boolean)) { n++; k = S.addDays(k, -1); } return n; };

  /* ---------- sidebar + trail ---------- */
  const t0 = H.trail;
  H.trail = function (name = H.current.name, arg = H.current.arg) { return name === 'studyplan' ? [['Home', '#home'], ['Study Plan', '#studyplan']] : t0(name, arg); };
  if (H.catOf) { const c0 = H.catOf; H.catOf = (name, arg) => name === 'studyplan' ? null : c0(name, arg); }

  /* ---------- 1 · mentor ---------- */
  function mentorSec() {
    const met = H.seen('intro:guide');
    return `<section class="panel mentor-card sp-mentor" id="sp-mentor"><div class="mc-art">${MA.avatarSVG(G.look, { label: G.name })}</div>
      <div class="mc-body"><p class="eyebrow">Meet your mentor · Conoce a tu mentora</p><h2>${esc(G.full)} <span class="muted">· ${G.age}</span></h2><p class="mc-role">${esc(G.role)}</p>
        <div class="sp-bubble"><p class="es">${esc(G.welcome[0])} ${UI.spk(G.welcome[0], 'Listen', G.voice.tts)}</p><p class="muted">${esc(G.welcome[1])}</p></div>
        <dl class="kvd"><dt>Personality</dt><dd>${esc(G.personality)}</dd><dt>Background</dt><dd>${esc(G.background)}</dd><dt>Teaching style</dt><dd>${esc(G.teaching)}</dd></dl>
        <div class="row gap wrap"><button class="btn primary" id="sp-start">${met ? '↻ Replay introduction' : '▶ Start Introduction'}</button><a class="btn ghost" href="#sp-plan" data-jump="sp-plan">Skip to My Study Plan ↓</a></div>
        <p class="tiny muted">The introduction is a scripted dialogue in beginner Spanish, with English.</p></div></section>`;
  }
  function playIntro(view) {
    MA.MENTORS.guide = G; MA.CITY.guide = { id: 'guide', name: 'Madrid Academy', short: 'Madrid Academy', pal: ['#f8eee6', '#ead6c8'] };
    H.scene('guide', G.intro, { key: 'intro:guide', title: 'Welcome to Madrid Academy', reward: 10, onDone: () => { P().introDone = true; save(); const d = document.getElementById('sp-story'); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } });
    delete MA.CITY.guide; // only needed while the scene is built
  }

  /* ---------- 2 · story ---------- */
  function storySec(open) {
    return `<details class="panel sp-sec" id="sp-story" ${open ? 'open' : ''}><summary><span><p class="eyebrow">Part 1</p><h2>The Story of Spanish <span class="muted">— La historia del español</span></h2></span></summary>
      <div class="sp-chs">${MA.SPANISH_STORY.map((c, i) => `<details class="sp-ch" ${i === 0 ? 'open' : ''}><summary><span class="sp-n">${c.n}</span><span><b>${esc(c.title)}</b><small class="es">${esc(c.es)}</small></span></summary>
        <div class="sp-ch-b"><div class="sp-art">${c.art}</div><div>${c.body.map(p => `<p>${p}</p>`).join('')}<h4>Interesting facts</h4><ul class="sp-facts">${c.facts.map(f => `<li>${f}</li>`).join('')}</ul></div></div></details>`).join('')}</div>
      <p class="tiny muted">A short introduction — there is no homework or test here.</p></details>`;
  }

  /* ---------- 3 · world map ---------- */
  let wmap = null;
  function worldSec(open) {
    const byR = r => MA.SPANISH_COUNTRIES.filter(c => c.region === r);
    return `<details class="panel sp-sec" id="sp-world" ${open ? 'open' : ''}><summary><span><p class="eyebrow">Part 2</p><h2>Spanish Around the World <span class="muted">— El español en el mundo</span></h2></span></summary>
      <p class="muted">The <b>20 countries</b> where Spanish is an official language (in some, it shares that status with other languages). Click a country or a name.</p>
      <div class="sp-world"><div class="sp-mapbox"><div id="sp-map" role="region" aria-label="World map of Spanish-speaking countries"></div><p class="muted sp-mapstatus" id="sp-mapstatus">Loading the map…</p></div>
        <div class="panel sp-ccard" id="sp-ccard"><p class="muted">Choose a country.</p></div></div>
      <div class="sp-regions">${MA.SPANISH_REGIONS.map(r => `<div><h4>${esc(r)} <span class="muted tiny">(${byR(r).length})</span></h4><div class="sp-clist">${byR(r).map(c => `<button type="button" data-cc="${c.code}">${c.flag} ${esc(c.name)}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="sp-notes"><p><b>${MA.SPANISH_EXTRA.flag} Puerto Rico:</b> Spanish and English are both official, but it is a U.S. territory, not a sovereign country. <button class="chip" type="button" data-cc="PR">Show</button></p>
        <p><b>Beyond official status:</b> Spanish is widely spoken in many other places — for example the United States, where more than 40 million people speak it at home, even though it is not an official language nationwide.</p>
        <p class="tiny muted">Being an official language does not mean everyone speaks it first. Many of these countries are multilingual, and regions differ a lot.</p></div>
      <p class="tiny muted">Borders: Natural Earth (public domain) via world-atlas. No street map is shown because this app cannot load web map tiles.</p></details>`;
  }
  const ccard = c => `<p class="eyebrow">${esc(c.region)}</p><h3><span class="sp-flag">${c.flag}</span> ${esc(c.name)} <span class="muted es">· ${esc(c.es)}</span></h3>
    <dl class="kvd"><dt>Capital</dt><dd>${esc(c.capital)}</dd><dt>Region</dt><dd>${esc(c.region)}</dd><dt>Spanish here</dt><dd>${esc(c.note)}</dd></dl>`;
  function loadWorld() {
    const js = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s); });
    if (!document.querySelector('link[data-leaflet]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'vendor/leaflet.css'; l.dataset.leaflet = '1'; document.head.appendChild(l); }
    return Promise.all([window.L ? 0 : js('vendor/leaflet.js'), MA.WORLD ? 0 : js('world-map.js')]);
  }
  function buildWorld(view) {
    const el = view.querySelector('#sp-map'), card = view.querySelector('#sp-ccard'); if (!el) return;
    if (wmap) { try { wmap.remove(); } catch (e) { } wmap = null; }
    const L = window.L, all = [...MA.SPANISH_COUNTRIES, MA.SPANISH_EXTRA];
    wmap = L.map(el, { minZoom: 1.5, maxZoom: 7, zoomSnap: 0.5, worldCopyJump: false, maxBounds: [[-70, -200], [85, 200]] });
    wmap.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    wmap.attributionControl.addAttribution('Natural Earth');
    MA.WORLD.base.forEach(p => L.polygon(p, { color: '#d9cbb8', weight: .6, fillColor: '#f1e8db', fillOpacity: 1, interactive: false }).addTo(wmap));
    const lay = {}, dots = {};
    const pick = (code, fly) => {
      const c = all.find(x => x.code === code); if (!c) return; card.innerHTML = ccard(c);
      Object.entries(lay).forEach(([k, l]) => l.setStyle({ fillColor: k === code ? '#b8955a' : (k === 'PR' ? '#ead3a6' : '#d99aa3') }));
      view.querySelectorAll('[data-cc]').forEach(b => b.classList.toggle('on', b.dataset.cc === code));
      if (fly) wmap.flyToBounds(lay[code] ? lay[code].getBounds().pad(1.2) : L.latLng(c.lat, c.lng).toBounds(400000), { duration: .6, maxZoom: 5 });
      if (matchMedia('(max-width: 820px)').matches) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    all.forEach(c => {
      const g = MA.WORLD.sp[c.code]; if (!g) return;
      lay[c.code] = L.polygon(g, { color: c.code === 'PR' ? '#b8955a' : '#b97880', weight: .8, dashArray: c.code === 'PR' ? '3 3' : null, fillColor: c.code === 'PR' ? '#ead3a6' : '#d99aa3', fillOpacity: .9 })
        .bindTooltip(`${c.flag} ${c.name}`, { sticky: true, className: 'mw-tip' }).on('click', () => pick(c.code, false)).addTo(wmap);
      dots[c.code] = L.circleMarker([c.lat, c.lng], { radius: 4, color: '#fff', weight: 1.2, fillColor: c.code === 'PR' ? '#b8955a' : '#8e3b4a', fillOpacity: 1 })
        .bindTooltip(`${c.flag} ${c.name} · ${c.capital}`, { direction: 'top', className: 'mw-tip' }).on('click', () => pick(c.code, false)).addTo(wmap);
    });
    view.querySelectorAll('[data-cc]').forEach(b => b.onclick = () => pick(b.dataset.cc, true));
    const fit = () => wmap.fitBounds([[-56, -118], [44, 12]]);
    wmap.invalidateSize(); fit(); requestAnimationFrame(() => { if (wmap) { wmap.invalidateSize(); fit(); } });
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (wmap && wmap._container === el) wmap.invalidateSize(); else ro.disconnect(); }); ro.observe(el); }
  }
  function mountWorld(view) {
    const d = view.querySelector('#sp-world'), status = view.querySelector('#sp-mapstatus'); if (!d) return;
    // the country list works even before the map loads
    view.querySelectorAll('[data-cc]').forEach(b => b.onclick = () => { const c = [...MA.SPANISH_COUNTRIES, MA.SPANISH_EXTRA].find(x => x.code === b.dataset.cc); view.querySelector('#sp-ccard').innerHTML = ccard(c); });
    let started = false;
    const go = () => { if (started || !d.open) return; started = true;
      loadWorld().then(() => { if (!document.body.contains(d)) return; status.hidden = true; buildWorld(view); })
        .catch(e => { console.error(e); started = false; status.className = 'note'; status.innerHTML = '<b>The map could not load.</b> The map files are part of this app, so please reload the page. The country list below still works.'; }); };
    d.addEventListener('toggle', go); go();
  }

  /* ---------- 4 · my study plan ---------- */
  function taskLink(t, k) {
    const nl = H.nextLesson(), ch = nl && MA.CHAPTERS.find(c => c.id === nl.chapter), city = (ch && ch.city) || (H.currentCity() || {}).id || 'alicante';
    const due = S.due().length;
    switch (t.id) {
      case 'warm': case 'srs': return `<a href="#vocab-review">Review ${due} due card${due === 1 ? '' : 's'} →</a>`;
      case 'lesson': return nl ? `<a href="#lesson-${nl.id}">${esc(nl.title)} · ${esc(MA.CITY[city].name)} →</a>` : '<span class="muted">All lessons done — choose any to revise.</span>';
      case 'practice': return `<a href="#city-${city}-fairytales">Reading</a> · <a href="#city-${city}-idioms">Idioms</a>${city !== 'madrid' ? ` · <a href="#city-${city}-practice">Practice</a>` : ''}`;
      case 'speak': return nl ? `<a href="#lesson-${nl.id}">Use the 🔊 examples in today’s lesson</a>` : '';
      case 'mistakes': return ch ? `<a href="#review-${ch.id}">Chapter review: ${esc(ch.title)} →</a>` : '';
      case 'homework': return ch ? `<a href="#homework-${ch.id}">Homework</a> · <a href="#city-${city}-fairytales">Reading</a>` : '';
      case 'passive': return '<a href="#sp-passive" data-jump="sp-passive">See the list ↓</a>';
    }
    return '';
  }
  /* ---------- realistic roadmap, based on study hours ---------- */
  const HPW = [[3, '3 h / week (about 25 min a day)'], [5, '5 h / week (about 45 min a day)'], [7, '7 h / week (1 hour a day)'], [10, '10 h / week (about 1.5 h a day)']];
  const hpw = () => P().hpw || 5;
  const mo = h => h / (hpw() * 4.345); // hours → months
  const moTxt = h => { const m = mo(h); return m < 1 ? 'under 1 month' : m < 24 ? `month ${Math.max(1, Math.round(m))}` : `about ${(m / 12).toFixed(1).replace('.0', '')} years`; };
  const hoursSoFar = () => { const d = (new Date(S.today() + 'T12:00:00Z') - new Date(P().start + 'T12:00:00Z')) / 864e5; return Math.max(0, Math.round(d / 7 * hpw())); };
  const stageNow = () => { const h = hoursSoFar(); return PL.roadmap.find(r => h >= r.h[0] && h < r.h[1]) || PL.roadmap[PL.roadmap.length - 1]; };
  function roadmapSec() {
    const h = hoursSoFar(), cur = stageNow(), b2 = PL.levels.find(l => l[0] === 'B2');
    return `<section class="panel" id="sp-roadmap"><div class="ph"><h3>Monthly Roadmap</h3><span class="muted tiny">Based on study hours, not a fixed calendar</span></div>
      <div class="row gap wrap sp-rmctl"><label class="tiny">Start date <input type="date" id="sp-start-date" value="${esc(P().start)}"></label>
        <label class="tiny">Active study time <select id="sp-hpw">${HPW.map(([v, l]) => `<option value="${v}" ${hpw() === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
      <p>At <b>${hpw()} hours a week</b>, a strong <b>B2</b> (${b2[1]}–${b2[2]} hours) takes about <b>${Math.round(mo(b2[1]))}–${Math.round(mo(b2[2]))} months</b>. Estimated so far: <b>~${h} hours</b> → you are around <b>${esc(MA.CITY[cur.city].name)}</b> (${esc(cur.cefr)}).</p>
      <div class="sp-levels">${PL.levels.map(([L, a, z]) => `<div class="sp-lv ${L === 'B2' ? 'goal' : ''}"><b>${L}</b><small>${a.toLocaleString('en')}–${z.toLocaleString('en')} h</small><span class="tiny muted">${(x => x[0] === x[1] ? `about ${x[0]} month${x[0] === 1 ? '' : 's'}` : `${x[0]}–${x[1]} months`)([Math.max(1, Math.round(mo(a))), Math.max(1, Math.round(mo(z)))])}</span>${L === 'B2' ? '<span class="tag">Main goal</span>' : ''}</div>`).join('')}</div>
      <div class="sp-road">${PL.roadmap.map(r => { const c = MA.CITY[r.city], ls = cityLessons(r.city), dn = ls.filter(l => S.lessonDone(l.id)).length, now = r === cur, past = h >= r.h[1], ms = c.final ? null : H.cityMilestone(c);
        const m0 = Math.max(1, Math.floor(mo(r.h[0])) + 1), m1 = Math.max(m0, Math.ceil(mo(r.h[1])));
        return `<a class="sp-stop ${now ? 'cur' : ''} ${past ? 'past' : ''}" href="${c.final ? '#madrid' : '#city-' + r.city}"><span class="sp-mo">${c.final ? `From month ${m0} · ongoing` : `Months ${m0}–${m1}`}</span><b>${esc(c.name)}</b><span class="tag">${esc(r.cefr)}</span><small>${r.h[0]}–${r.h[1].toLocaleString('en')}${c.final ? '+' : ''} hours</small><small>${esc(r.focus)}</small>${r.check ? `<small class="sp-chk">✓ ${esc(r.check)}</small>` : ''}<span class="tiny muted">${ls.length ? `${dn}/${ls.length} lessons` : ''}${ms && ms.done ? ' · milestone ✓' : ''}</span></a>`; }).join('')}</div>
      <h4>After B2</h4><ul class="list tiny"><li><b>B2 → C1</b> (Zaragoza → Barcelona, ~600–900 hours): formal writing, register, idioms, long texts, debate. Add 20+ min of authentic listening a day (radio, podcasts, series).</li><li><b>C1 → C2</b> (Madrid, ~900–1,200+ hours): real-life Spanish, nuance, slang and culture. Speaking with real people matters most here.</li><li>Consider an official exam (DELE B2 / C1, or SIELE) when your self-checks say you are ready.</li></ul>
      <p class="note">${esc(PL.honest)}</p></section>`;
  }
  function passiveSec() {
    return `<section class="panel" id="sp-passive"><div class="ph"><h3>Passive Learning</h3><span class="muted tiny">10–20 min a day · optional</span></div>
      <p class="muted">Listen while you commute, cook or relax. Choose things a little above your level, and don’t worry about understanding every word.</p>
      <div class="sp-res">${PL.passive.map(r => `<div class="sp-r"><b>${ext(r.url, r.name)}</b><span class="tag">${esc(r.level)}</span><small>${esc(r.what)}</small><span class="tiny muted">${esc(r.when)}</span></div>`).join('')}</div>
      <p class="tiny"><b>Films & series from Spain</b> (with Spanish subtitles, from about B1): ${PL.films.map(esc).join(' · ')}</p></section>`;
  }
  function cefrSec() {
    const lv = Object.keys(PL.cando), open = stageNow().cefr.replace(/.*→\s*/, '').slice(0, 2);
    return `<section class="panel" id="sp-cefr"><div class="ph"><h3>CEFR Assessments</h3></div>
      <p class="muted tiny">Tick what you can really do. The app’s exams check what you studied; only an official exam (DELE / SIELE) certifies your level.</p>
      <div class="sp-cando">${lv.map(L => { const items = PL.cando[L], got = items.filter((_, i) => (P().cando[L] || {})[i]).length; return `<details ${L === open ? 'open' : ''}><summary><b>${L}</b> <span class="tiny muted">${got}/${items.length}</span></summary>${items.map((t, i) => `<label class="chk"><input type="checkbox" data-cando="${L}:${i}" ${(P().cando[L] || {})[i] ? 'checked' : ''}> ${esc(t)}</label>`).join('')}</details>`; }).join('')}</div>
      <h4>Test results</h4>${P().tests.length ? `<ul class="list">${P().tests.map(t => `<li><b>${esc(t.level)}</b> · ${esc(t.source)} <span class="tiny muted">${H.fmtDate ? H.fmtDate(t.at) : ''}</span></li>`).join('')}</ul>` : '<p class="tiny muted">No results recorded yet.</p>'}
      <form class="row gap wrap" id="sp-testform"><select id="sp-tlevel" aria-label="Level">${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(x => `<option>${x}</option>`).join('')}</select><input id="sp-tsrc" placeholder="Where? e.g. DIALANG, AVE test, DELE" aria-label="Test name"><button class="btn small">Record result</button></form>
      <p class="tiny">Free and official tests: ${PL.assess.map(a => `${ext(a.url, a.name)} <span class="muted">— ${esc(a.what)}</span>`).join('<br>')}</p></section>`;
  }
  function planSec() {
    return `<section id="sp-plan" class="sp-plan"><div class="panel sp-planhead"><p class="eyebrow">Part 3</p><h2>My Study Plan <span class="muted">— Mi plan de estudio</span></h2>
      <ul class="sp-prefs">${PL.prefs.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      <nav class="sp-subnav" aria-label="Study plan sections">${[['sp-roadmap', 'Monthly Roadmap'], ['sp-passive', 'Passive Learning'], ['sp-cefr', 'CEFR Assessments']].map(([id, l]) => `<a class="chip" href="#${id}" data-jump="${id}">${l}</a>`).join('')}</nav></div>
      ${roadmapSec()}${passiveSec()}${cefrSec()}</section>`;
  }

  /* only the plan part is redrawn after a change, so the map and open sections stay as they are */
  function redrawPlan(view) { const box = view.querySelector('#sp-plan'); if (!box) return; box.outerHTML = planSec(); bindPlan(view); }
  function bindPlan(view) {
    const re = () => redrawPlan(view);
    view.querySelectorAll('[data-task]').forEach(cb => cb.onchange = () => { const k = S.today(); const d = P().days[k] = P().days[k] || { t: {} }; d.t[cb.dataset.task] = cb.checked; if (!cb.checked) delete d.t[cb.dataset.task]; save(); if (cb.checked && tasksFor(k).filter(t => !t.opt).every(t => d.t[t.id])) { S.award('plan:' + k, 10, 2, 'Study plan day complete'); UI.toast('¡Muy bien! Today’s plan is complete ✨'); } re(); });
    view.querySelectorAll('[data-cando]').forEach(cb => cb.onchange = () => { const [L, i] = cb.dataset.cando.split(':'); P().cando[L] = P().cando[L] || {}; if (cb.checked) P().cando[L][i] = true; else delete P().cando[L][i]; save(); const sm = cb.closest('details').querySelector('summary .tiny'); if (sm) sm.textContent = Object.keys(P().cando[L]).length + '/' + PL.cando[L].length; });
    const sd = view.querySelector('#sp-start-date'); if (sd) sd.onchange = () => { if (/^\d{4}-\d{2}-\d{2}$/.test(sd.value)) { P().start = sd.value; save(); re(); } };
    const hp = view.querySelector('#sp-hpw'); if (hp) hp.onchange = () => { P().hpw = +hp.value; save(); re(); };
    const rv = view.querySelector('#sp-revdays'); if (rv) rv.onchange = () => { P().reviewDays = rv.value.split(',').map(Number); save(); re(); };
    const tf = view.querySelector('#sp-testform'); if (tf) tf.onsubmit = e => { e.preventDefault(); const src = view.querySelector('#sp-tsrc').value.trim(); if (!src) { UI.toast('Add the test name first.'); return; } P().tests.push({ level: view.querySelector('#sp-tlevel').value, source: src.slice(0, 80), at: Date.now() }); save(); re(); };
  }

  /* ---------- the view ---------- */
  V.studyplan = function () {
    const p = P(), fresh = !p.introDone;
    H.after(view => {
      view.querySelector('#sp-start').onclick = () => playIntro(view);
      view.addEventListener('click', e => { const j = e.target.closest('[data-jump]'); if (!j) return; e.preventDefault(); const el = view.querySelector('#' + j.dataset.jump); if (el) { if (el.tagName === 'DETAILS') el.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
      ['sp-story', 'sp-world'].forEach(id => { const d = view.querySelector('#' + id); if (d) d.addEventListener('toggle', () => { if (!d.open && !P().introDone) { P().introDone = true; save(); } }); });
      bindPlan(view); mountWorld(view);
    });
    return `<div class="panel sp-head"><span class="mw-ic big">${CAL}</span><div><p class="eyebrow">Your learning headquarters</p><h1>Study Plan <span class="muted">— Plan de estudio</span></h1>
        <nav class="sp-subnav" aria-label="Study Plan">${[['sp-mentor', 'Meet Your Mentor'], ['sp-story', 'The Story of Spanish'], ['sp-world', 'Spanish Around the World'], ['sp-plan', 'My Study Plan']].map(([id, l]) => `<a class="chip" href="#${id}" data-jump="${id}">${l}</a>`).join('')}</nav></div></div>
      ${mentorSec()}${storySec(fresh)}${worldSec(fresh)}${planSec()}`;
  };
})();
