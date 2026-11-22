/* =====================================================================
   MADRID — «Real World» (slang + natural Spanish) and «Explore Madrid» (map).
   Data lives in madrid-data.js (MA.SLANG, MA.NATURAL, MA.SIGHTS) and
   madrid-barrios.js (MA.BARRIOS, loaded with the map). Leaflet is loaded
   only when Explore Madrid opens (vendor/leaflet.js + vendor/leaflet.css).
   ===================================================================== */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U;
  const st = () => S.state;
  const ICON = {
    notebook: '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>',
    map: '<svg class="lu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>'
  };
  MA.LUCIDE = Object.assign(MA.LUCIDE || {}, ICON);

  /* ---------- navigation helpers ---------- */
  const madridT = [['Home', '#home'], ['Madrid', '#madrid']];
  const t0 = H.trail;
  H.trail = function (name = H.current.name, arg = H.current.arg) {
    if (name === 'mentor' && arg === 'madrid') return [...madridT, ['Ask ' + MA.MENTORS.madrid.name, '#mentor-madrid']];
    if (name === 'realworld') { const t = [...madridT, ['Real World', '#realworld']]; if (arg === 'slang') t.push(['Madrid Slang', '#realworld-slang']); if (arg === 'natural') t.push(['Natural Spanish', '#realworld-natural']); return t; }
    return t0(name, arg);
  };
  if (H.catOf) { const c0 = H.catOf; H.catOf = (name, arg) => ['realworld', 'explore'].includes(name) ? null : c0(name, arg); }
  const back = `<p class="mw-back"><a class="btn ghost" href="#madrid">← Back to Madrid</a></p>`;

  /* ---------- one reusable expandable card (slang + natural) ---------- */
  const key = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const fold = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const saved = id => !!st().vocab[id];
  // item: { id, title, sub, tag, rows:[[label, html]], save:{es,en,ex,exEn,note}, search }
  H.rwCard = function (it) {
    return `<details class="panel rwc" data-q="${esc(fold(it.search))}">
      <summary><span class="rwc-h"><b class="es">${esc(it.title)}</b>${it.sub ? `<span class="rwc-sub">${esc(it.sub)}</span>` : ''}</span><span class="tag">${esc(it.tag)}</span></summary>
      <div class="rwc-b">${it.rows.map(([l, h]) => `<div class="rwc-r"><span class="rwc-l">${esc(l)}</span><div>${h}</div></div>`).join('')}
        <p class="rwc-act"><button class="btn small" data-rwsave="${esc(it.id)}">${saved(it.id) ? '★ Saved — remove' : '☆ Save to Vocabulary'}</button></p></div></details>`;
  };
  const ex = (es, en) => `<span class="es">${esc(es)}</span> ${UI.spk(es)}<br><span class="muted">${esc(en)}</span>`;
  const slangItem = s => ({ id: 'rw-' + key(s.es), title: s.es, sub: '', tag: s.reg, search: [s.es, s.en, s.ex, s.exEn, s.use].join(' '),
    rows: [['Meaning', `<b>${esc(s.en)}</b> ${UI.spk(s.es.replace(/\s*\/\s*/g, ', '))}`], ['Example', ex(s.ex, s.exEn)], ['Formality', esc(s.reg)], ['How to use', esc(s.use)], ['Where', esc(s.where)]],
    save: { es: s.es, en: s.en, ex: s.ex, exEn: s.exEn, note: s.reg + ' · ' + s.use } });
  const natItem = n => ({ id: 'rw-' + key(n.nat), title: n.nat, sub: 'instead of: ' + n.std, tag: n.en, search: [n.std, n.nat, n.en, n.ex, n.exEn, n.diff].join(' '),
    rows: [['Standard', `<span class="es">${esc(n.std)}</span> ${UI.spk(n.std)}`], ['Natural', `<b class="es">${esc(n.nat)}</b> ${UI.spk(n.nat)}`], ['Meaning', esc(n.en)], ['Difference', esc(n.diff)], ['Example', ex(n.ex, n.exEn)], ['Formality / context', esc(n.ctx)]],
    save: { es: n.nat, en: n.en, ex: n.ex, exEn: n.exEn, note: 'Natural for «' + n.std + '». ' + n.ctx } });
  const LISTS = { slang: () => MA.SLANG.map(slangItem), natural: () => MA.NATURAL.map(natItem) };

  function mountList(view, items) {
    const box = view.querySelector('#rwlist'), q = view.querySelector('#rwq'), cnt = view.querySelector('#rwcount');
    const all = [...box.querySelectorAll('.rwc')];
    const filter = () => { const t = fold(q.value.trim()); let n = 0; all.forEach(d => { const ok = !t || d.dataset.q.includes(t); d.hidden = !ok; if (ok) n++; }); cnt.textContent = t ? `${n} of ${all.length} shown` : `${all.length} expressions`; view.querySelector('#rwnone').hidden = n > 0; };
    q.addEventListener('input', filter); filter();
    box.addEventListener('click', e => {
      const b = e.target.closest('[data-rwsave]'); if (!b) return;
      const id = b.dataset.rwsave, it = items.find(x => x.id === id); if (!it) return;
      if (saved(id)) { S.unsaveWord(id); UI.toast('Removed from your vocabulary book'); }
      else { S.saveWord(id, { id, es: it.save.es, en: it.save.en, ipa: '', pos: 'expression', ex: it.save.ex, exEn: it.save.exEn, cat: 'custom', note: it.save.note }); UI.toast('★ Saved to your vocabulary book'); }
      view.querySelectorAll(`[data-rwsave="${CSS.escape(id)}"]`).forEach(x => x.textContent = saved(id) ? '★ Saved — remove' : '☆ Save to Vocabulary');
    });
  }

  V.realworld = function (arg) {
    if (arg === 'slang' || arg === 'natural') {
      const items = LISTS[arg](), slang = arg === 'slang';
      H.after(view => mountList(view, items));
      return `<div class="panel mw-head"><span class="mw-ic big">${ICON.notebook}</span><div><p class="eyebrow">Real World · Madrid</p>
          <h1>${slang ? 'Madrid Slang <span class="muted">— Jerga madrileña</span>' : 'Natural Spanish <span class="muted">— Español natural</span>'}</h1>
          <p class="muted">${slang ? 'How people in Madrid and the rest of Spain talk informally. Each card says how informal it is and where it is used.' : 'Textbook Spanish next to what people often say in Spain. The standard form is never wrong — the natural one changes the tone, the intensity or the register.'}</p></div></div>
        <div class="panel rw-tools"><input type="text" id="rwq" placeholder="Search in Spanish or English…" aria-label="Search expressions" autocomplete="off"><small id="rwcount" class="muted"></small>
          <a class="chip" href="#realworld-${slang ? 'natural' : 'slang'}">${slang ? 'Natural Spanish →' : 'Madrid Slang →'}</a></div>
        <div id="rwlist" class="rw-list">${items.map(H.rwCard).join('')}</div><p id="rwnone" class="panel muted" hidden>No expressions match your search.</p>${back}`;
    }
    return `<div class="panel mw-head"><span class="mw-ic big">${ICON.notebook}</span><div><p class="eyebrow">Madrid · Final destination</p><h1>Real World</h1>
        <p class="muted">Spanish the way people really speak it in Madrid and the rest of Spain. Open a card to see the meaning, an example and when to use it.</p></div></div>
      <div class="mw-entry">
        <a class="panel mw-tile" href="#realworld-slang"><span class="mw-ic">💬</span><span><b>Madrid Slang</b><small>Jerga madrileña · ${MA.SLANG.length} expressions</small></span></a>
        <a class="panel mw-tile" href="#realworld-natural"><span class="mw-ic">🗣️</span><span><b>Natural Spanish</b><small>Español natural · ${MA.NATURAL.length} comparisons</small></span></a></div>${back}`;
  };

  /* ---------- Explore Madrid: Leaflet, loaded on demand ---------- */
  let leafletP = null, map = null;
  function loadLeaflet() {
    if (window.L && MA.BARRIOS) return Promise.resolve();
    if (leafletP) return leafletP;
    const css = new Promise(res => { if (document.querySelector('link[data-leaflet]')) return res(); const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'vendor/leaflet.css'; l.dataset.leaflet = '1'; l.onload = l.onerror = res; document.head.appendChild(l); });
    const js = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s); });
    leafletP = Promise.all([css, window.L ? 0 : js('vendor/leaflet.js'), MA.BARRIOS ? 0 : js('madrid-barrios.js')]).catch(e => { leafletP = null; throw e; });
    return leafletP;
  }
  const gmaps = s => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.es + ', Madrid');
  /* photos: MA.SIGHT_PHOTOS[id] = { src, alt, credit } from madrid-photos.js (optional, loaded with the map) */
  function loadPhotos() {
    if (MA.SIGHT_PHOTOS || loadPhotos.p) return loadPhotos.p || Promise.resolve();
    loadPhotos.p = new Promise(res => { const sc = document.createElement('script'); sc.src = 'madrid-photos.js'; sc.onload = sc.onerror = () => res(); document.head.appendChild(sc); });
    return loadPhotos.p;
  }
  const photoFallback = s => `<div class="mw-ph-fb" role="img" aria-label="No photo available for ${esc(s.es)}"><span class="mw-ic">${ICON.map}</span><span><b>${esc(s.es)}</b><small>Photo not available — open Google Maps to see photos.</small></span></div>`;
  function photo(s) {
    const ph = (MA.SIGHT_PHOTOS || {})[s.id];
    return `<figure class="mw-photo">${ph ? `<img src="${ph.src}" alt="${esc(ph.alt)}" loading="lazy" decoding="async" width="960" height="540">` : photoFallback(s)}${ph && ph.credit ? `<figcaption>${ph.credit}</figcaption>` : ''}</figure>`;
  }
  function infoCard(s, i) {
    return `${photo(s)}<div class="mw-card-b"><p class="eyebrow">${i + 1} · ${esc(s.en)}</p><h2 class="es">${esc(s.es)} ${UI.spk(s.es)}</h2><p class="mw-en">${esc(s.en)}</p>
      <h4>History</h4><p>${esc(s.hist)}</p><h4>Why visit</h4><p>${esc(s.why)}</p>
      <p class="mw-links"><a class="btn small" href="${gmaps(s)}" target="_blank" rel="noopener">Google Maps directions ↗</a></p></div>`;
  }
  const keep = { sel: -1, view: null }; // survives re-renders of the Madrid page
  function buildMap(view) {
    const el = view.querySelector('#mwmap'); if (!el) return;
    if (map) { try { map.remove(); } catch (e) { } map = null; }
    const L = window.L;
    map = L.map(el, { zoomControl: true, minZoom: 12, maxZoom: 18, zoomSnap: 0.25, maxBounds: [[40.37, -3.78], [40.47, -3.62]], maxBoundsViscosity: 0.8 });
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    MA.BARRIOS.forEach(b => L.polygon(b.p, { color: '#b8955a', weight: 1.2, opacity: .9, fillColor: '#f4eadc', fillOpacity: .55 }).bindTooltip(b.n, { sticky: true, className: 'mw-tip' }).addTo(map));
    map.attributionControl.addAttribution('Neighbourhood borders: Ayuntamiento de Madrid open data, via <a href="https://github.com/codeforgermany/click_that_hood" target="_blank" rel="noopener">click_that_hood</a>');
    const card = view.querySelector('#mwcard'), btns = view.querySelectorAll('[data-sight]');
    const markers = MA.SIGHTS.map((s, i) => {
      const m = L.marker([s.lat, s.lng], { title: s.es + ' — ' + s.en, keyboard: true, icon: L.divIcon({ className: 'mw-pin', html: `<span><i>${i + 1}</i></span>`, iconSize: [30, 30], iconAnchor: [15, 30] }) }).addTo(map);
      m.bindTooltip(s.es, { direction: 'top', offset: [0, -28], className: 'mw-tip' });
      m.on('click', () => pick(i, false, true));
      return m;
    });
    function pick(i, fly, scroll) {
      const s = MA.SIGHTS[i]; keep.sel = i; card.innerHTML = infoCard(s, i);
      const img = card.querySelector('.mw-photo img');
      if (img) img.addEventListener('error', () => { const f = img.closest('.mw-photo'); f.innerHTML = photoFallback(s); }, { once: true });
      markers.forEach((m, j) => m.getElement() && m.getElement().classList.toggle('on', j === i));
      btns.forEach((b, j) => b.classList.toggle('on', j === i));
      if (fly) map.flyTo([s.lat, s.lng], Math.max(map.getZoom(), 16), { duration: .6 });
      if (scroll && matchMedia('(max-width: 820px)').matches) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    btns.forEach((b, i) => b.onclick = () => pick(i, true, true));
    const fit = () => map.fitBounds(L.latLngBounds(MA.SIGHTS.map(s => [s.lat, s.lng])).pad(.12));
    view.querySelector('#mwfit').onclick = () => { keep.view = null; fit(); };
    const restore = () => keep.view ? map.setView(keep.view[0], keep.view[1], { animate: false }) : fit();
    map.invalidateSize(); restore();
    requestAnimationFrame(() => { if (map && map._container === el) { map.invalidateSize(); restore(); map.on('moveend', () => { keep.view = [map.getCenter(), map.getZoom()]; }); } });
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (map && map._container === el) map.invalidateSize(); else ro.disconnect(); }); ro.observe(el); }
    if (keep.sel >= 0) pick(keep.sel, false, false);
  }
  function exploreSection() {
    H.after(view => {
      const status = view.querySelector('#mwstatus');
      Promise.all([loadLeaflet(), loadPhotos()]).then(() => { if (!document.body.contains(view.querySelector('#mwmap'))) return; status.hidden = true; buildMap(view); })
        .catch(e => { console.error(e); status.innerHTML = '<b>The map could not load.</b> Please reload the page. The list of places still works.'; status.className = 'note'; });
      // the list works even before / without the map
      view.querySelectorAll('[data-sight]').forEach((b, i) => { if (!b.onclick) b.onclick = () => { view.querySelector('#mwcard').innerHTML = infoCard(MA.SIGHTS[i], i); }; });
    });
    return `<section class="mw-sec" id="explore-madrid"><div class="mw-sec-h"><span class="mw-ic">${ICON.map}</span><div><h2>Explore Madrid <span class="muted">— Explora Madrid</span></h2>
        <p class="muted">Six famous places at their real locations. Tap a pin or a name to see a picture and read about it.</p></div></div>
      <div class="mw-explore">
        <div class="panel mw-mapbox"><div id="mwmap" role="region" aria-label="Map of central Madrid"></div><p id="mwstatus" class="muted mw-status">Loading the map…</p>
          <div class="mw-under"><button class="chip" id="mwfit" type="button">Show all six</button><span class="tiny muted">Lines = Madrid’s neighbourhood borders (city open data, simplified). Pins use checked coordinates. Streets aren’t shown — use the Google Maps link.</span></div>
          <ol class="mw-list">${MA.SIGHTS.map((s, i) => `<li><button type="button" data-sight="${i}"><span class="mw-n">${i + 1}</span><span><b class="es">${esc(s.es)}</b><small>${esc(s.en)}</small></span></button></li>`).join('')}</ol></div>
        <div class="panel mw-card" id="mwcard"><div class="mw-card-b"><p class="muted">Choose a place on the map or in the list.</p></div></div>
      </div></section>`;
  }

  H.exploreSection = exploreSection; // used by the Madrid city page (madrid-city.js)
  // old links to the separate page go to the Madrid page
  V.explore = function () { setTimeout(() => location.replace('#madrid'), 0); return '<div class="panel"><p class="muted">Opening Madrid…</p></div>'; };
})();
