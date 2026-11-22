/* =====================================================================
   READING LIBRARY — 75 readings, book-like reader, tap-any-word dictionary,
   personal Word Book, reading progress. No quizzes, no scores.
   Each city's «Reading» card lists its readings. Routes: #rd-<id> (reader) · #rwords (word book)
   ===================================================================== */
(function () {
  const { U, S, UI, H } = MA; const V = MA.VIEWS; const RX = MA.RX;
  const esc = U.esc, st = () => S.state;

  /* ---------- the full 75-reading curriculum ---------- */
  const C = (city, level, list) => list.map(([id, title, en]) => ({ id, city, level, title, en }));
  MA.RCURR = [
    ...C('alicante', 'A1', [['caperucita', 'Caperucita Roja', 'Little Red Riding Hood'], ['cerditos', 'Los tres cerditos', 'The Three Little Pigs'], ['patitofeo', 'El patito feo', 'The Ugly Duckling'], ['gatobotas', 'El gato con botas', 'Puss in Boots'], ['cenicienta', 'Cenicienta', 'Cinderella']]),
    ...C('laspalmas', 'A1–A2', [['blancanieves-r', 'Blancanieves', 'Snow White'], ['belladurmiente', 'La Bella Durmiente', 'Sleeping Beauty'], ['hanselgretel', 'Hansel y Gretel', 'Hansel and Gretel'], ['principerana', 'El príncipe rana', 'The Frog Prince'], ['jack', 'Jack y las habichuelas mágicas', 'Jack and the Beanstalk']]),
    ...C('palma', 'A2', [['rapunzel', 'Rapunzel', 'Rapunzel'], ['bellabestia', 'La Bella y la Bestia', 'Beauty and the Beast'], ['sirenita-r', 'La sirenita', 'The Little Mermaid'], ['rumpelstiltskin', 'Rumpelstiltskin', 'Rumpelstiltskin'], ['trajeemperador', 'El traje nuevo del emperador', "The Emperor's New Clothes"]]),
    ...C('murcia', 'B1', [['mu-vida', 'La vida cotidiana en España', 'Daily Life in Spain'], ['mu-educacion', 'El sistema educativo español', 'The Spanish Education System'], ['mu-amistad', 'La importancia de la amistad', 'The Importance of Friendship'], ['mu-salud', 'Hábitos para llevar una vida saludable', 'Healthy Lifestyle Habits'], ['mu-viaje', 'Mi primer viaje al extranjero', 'My First Trip Abroad'], ['mu-trabajador', 'Un día en la vida de un trabajador español', 'A Day in the Life of a Spanish Worker'], ['mu-fiestas', 'Las fiestas tradicionales de España', 'Traditional Spanish Festivals'], ['mu-tecnologia', 'La tecnología en nuestra vida diaria', 'Technology in Everyday Life'], ['mu-blog', 'Un blog sobre experiencias personales', 'A Personal Experience Blog'], ['mu-gastronomia', 'La gastronomía española', 'Spanish Food Culture']]),
    ...C('malaga', 'B1–B2', [['ma-redes', 'Las redes sociales y los jóvenes', 'Social Media and Young People'], ['ma-turismo', 'El impacto del turismo en las ciudades', 'The Impact of Tourism on Cities'], ['ma-medioambiente', 'Los problemas medioambientales actuales', 'Current Environmental Problems'], ['ma-teletrabajo', 'Las ventajas y desventajas del teletrabajo', 'Advantages and Disadvantages of Remote Work'], ['ma-relaciones', 'Las relaciones personales en la era digital', 'Relationships in the Digital Age'], ['ma-culturas', 'Las diferencias culturales entre países', 'Cultural Differences Between Countries'], ['ma-ciudad', 'Vivir en una ciudad grande o en un pueblo', 'Living in a Big City vs. a Small Town'], ['ma-consumismo', 'El consumismo y nuestros hábitos de compra', 'Consumerism and Shopping Habits'], ['ma-entrevista', 'Entrevista a una persona emprendedora', 'Interview with an Entrepreneur'], ['ma-noticia', 'Una noticia sobre la sociedad española', 'A News-Style Report About Spanish Society']]),
    ...C('sevilla', 'B2', [['se-vivienda', 'La crisis de la vivienda y el precio del alquiler', 'Housing Crisis and Rental Prices'], ['se-ia', 'La inteligencia artificial y el futuro del trabajo', 'Artificial Intelligence and the Future of Work'], ['se-clima', 'El cambio climático y sus consecuencias', 'Climate Change and Its Consequences'], ['se-desempleo', 'El desempleo juvenil en España', 'Youth Unemployment in Spain'], ['se-salud', 'La salud mental en la sociedad moderna', 'Mental Health in Modern Society'], ['se-universidad', 'La educación universitaria: ¿vale la pena?', 'Is University Education Worth It?'], ['se-inmigracion', 'La inmigración y la integración cultural', 'Immigration and Cultural Integration'], ['se-moda', 'La moda rápida y la sostenibilidad', 'Fast Fashion and Sustainability'], ['se-identidad', 'La identidad cultural en un mundo globalizado', 'Cultural Identity in a Globalized World'], ['se-opinion', 'Artículo de opinión: ¿La tecnología nos hace más felices?', 'Does Technology Make Us Happier?']]),
    ...C('zaragoza', 'C1', [['sh-bohemia', 'Escándalo en Bohemia', 'A Scandal in Bohemia'], ['sh-pelirrojos', 'La liga de los pelirrojos', 'The Red-Headed League'], ['sh-banda', 'La banda de lunares', 'The Speckled Band'], ['sh-carbunclo', 'El carbunclo azul', 'The Blue Carbuncle'], ['sh-hayas', 'Las hayas cobrizas', 'The Copper Beeches']]),
    ...C('valencia', 'C1', [['sh-plata', 'Estrella de Plata', 'Silver Blaze'], ['sh-musgrave', 'El ritual de los Musgrave', 'The Musgrave Ritual'], ['sh-tratado', 'El tratado naval', 'The Naval Treaty'], ['sh-final', 'El problema final', 'The Final Problem'], ['sh-casavacia', 'La casa vacía', 'The Empty House']]),
    ...C('barcelona', 'C1–C2', [['sh-escarlata', 'Estudio en escarlata', 'A Study in Scarlet'], ['sh-cuatro', 'El signo de los cuatro', 'The Sign of the Four'], ['sh-baskerville', 'El sabueso de los Baskerville', 'The Hound of the Baskervilles'], ['sh-valle', 'El valle del miedo', 'The Valley of Fear'], ['sh-planos', 'Los planos del Bruce-Partington', 'The Bruce-Partington Plans']])
  ];
  const THEME = { alicante: 'Cuentos de hadas', laspalmas: 'Cuentos de hadas', palma: 'Cuentos de hadas', murcia: 'Vida cotidiana y cultura', malaga: 'Sociedad moderna y estilo de vida', sevilla: 'Temas actuales y pensamiento crítico', zaragoza: 'Sherlock Holmes · primeros casos', valencia: 'Sherlock Holmes · casos célebres', barcelona: 'Sherlock Holmes · las cuatro novelas' };
  MA.RTHEME = THEME;
  const text = id => (MA.RLIB || []).find(r => r.id === id);
  const cur = id => MA.RCURR.find(r => r.id === id);
  const built = id => !!text(id);
  const wc = r => (RX.clean(r.text).match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) || []).length;

  /* ---------- VOCAB from the rest of the app as a back-up dictionary (single words only) ---------- */
  let vocabLoaded = false;
  function loadVocab() {
    if (vocabLoaded) return; vocabLoaded = true;
    const lines = []; const F = RX.build(); const has = w => RX.L.has(w) || F.has(w);
    (MA.VOCAB || []).forEach(v => {
      String(v.es || '').replace(/[¿?¡!.]/g, '').split(/\s+\/\s+/).forEach(alt => {
        alt = alt.trim().replace(/\s*\(.*?\)\s*/g, ''); let m;
        const en = String(v.en || '').replace(/\|/g, '/');
        if ((m = /^(el|la|los|las)\s+([a-záéíóúüñ]+)$/i.exec(alt))) { const g = m[1].toLowerCase(); const w = m[2].toLowerCase(); if (has(w)) return; lines.push(`${w}|${g === 'el' ? 'nm' : g === 'la' ? 'nf' : 'npl'}|${en}`); return; }
        if ((m = /^el\/la\s+([a-záéíóúüñ]+)$/i.exec(alt))) { const w = m[1].toLowerCase(); if (!has(w)) lines.push(`${w}|nmf|${en}`); return; }
        if ((m = /^([a-záéíóúüñ]+)o\/a$/i.exec(alt))) { const w = m[1].toLowerCase() + 'o'; if (!has(w)) lines.push(`${w}|adj|${en}`); return; }
        if ((m = /^([a-záéíóúüñ]+)\/a$/i.exec(alt))) { const w = m[1].toLowerCase(); if (!RX.L.has(w)) lines.push(`${w}|adj|${en}`); return; }
        if (/^[a-záéíóúüñ]+$/i.test(alt)) {
          const w = alt.toLowerCase(); if (has(w)) return;
          if (v.pos === 'verb' && /(ar|er|ir|ír)(se)?$/.test(w)) lines.push(`${w}|vinf|${en}`);
          else if (v.pos === 'adjective') lines.push(`${w}|adj|${en}`);
          else if (v.pos === 'adverb') lines.push(`${w}|adv|${en}`);
          else if (v.pos === 'noun') lines.push(`${w}|${/a$|ión$|dad$/.test(w) ? 'nf' : 'nm'}|${en}`);
          else if (v.pos !== 'expression' && v.pos !== 'word') lines.push(`${w}|${({ preposition: 'prep', connector: 'conj', interjection: 'int', number: 'num', pronoun: 'pron' })[v.pos] || 'adv'}|${en}`);
        }
      });
    });
    RX.add(lines.join('\n'), 'vocab');
  }
  RX.POSN.vinf = 'verb (infinitive)';

  /* ---------- preparing a reading: tokens, analyses, phrases ---------- */
  const ART = new Set(['la', 'lo', 'las', 'los']);
  const DET = new Set('varios varias algunos algunas ciertos ciertas muchos muchas pocos pocas todas todos estas estos esas esos el un una unos unas mi tu su mis tus sus nuestros nuestras vuestros vuestras este esta estos estas ese esa esos esas aquel aquella del al cada otro otra otros otras nuestro nuestra vuestro vuestra mucho mucha muchos muchas primer tercer buen gran ningún algún sin'.split(' '));
  const PRN = new Set('yo tú me te se nos os le les no ya nunca también'.split(' '));
  const PREP = new Set('a de en con por para sin hasta desde entre sobre hacia contra'.split(' '));
  const HAB = new Set('he has ha hemos habéis han había habías habíamos habíais habían hube hubo haya hayas hayamos hayan hubiera hubieras hubieran habría habrá habrían'.split(' '));
  const DEG = new Set('muy tan más menos bastante demasiado algo'.split(' '));
  const COP = new Set('es son era eran fue fueron está están estaba estaban estoy estás estamos sea sean parece parecen parecía'.split(' '));
  const RPP = { me: 0, te: 1, se: [2, 5], nos: 3, os: 4 };
  const CLOSED = new Set(['pronoun', 'article', 'preposition', 'conjunction', 'determiner', 'possessive', 'demonstrative', 'relative pronoun', 'question word', 'interjection', 'number', 'verb form']);
  const TR = { pres: 6, pret: 6, impf: 6, fut: 5, cond: 5, inf: 4, pp: 3, ger: 3, subj: 2, isubj: 2, imp: 1 };
  const cache = {};
  RX.prepare = function (r) {
    if (cache[r.id]) return cache[r.id];
    loadVocab(); RX.build();
    const paras = RX.parse(r.text);
    const words = []; // flat list of word tokens
    paras.forEach((p, pi) => { let gap = true; p.forEach((tk, k) => { if (tk.w) { tk.pi = pi; tk.gap = gap; tk.cap = /^[A-ZÁÉÍÓÚÑ]/.test(tk.t); words.push(tk); gap = false; } else if (/[^\s]/.test(tk.t)) gap = true; }); });
    // sentence start flags (for proper-noun detection)
    paras.forEach(p => { let start = true; p.forEach(tk => { if (tk.w) { tk.sstart = start; start = false; } else if (/[.!?…:»—«"]/.test(tk.t)) start = true; }); });
    words.forEach((tk, i) => {
      const next = words[i + 1] && words[i + 1].pi === tk.pi ? words[i + 1].w : null;
      let a = RX.analyze(tk.w, { lemma: tk.lem, next });
      if (!tk.lem && a.length > 1 && !ART.has(tk.w) && !/^fu(e|i|imos|iste|isteis|eron)$/.test(tk.w)) { // pick the most likely reading from the neighbours
        const prev = words[i - 1] && words[i - 1].pi === tk.pi && !tk.gap ? words[i - 1].w : null;
        const pa0 = prev && words[i - 1].a && words[i - 1].a[0], pnoun = pa0 && /noun/.test(pa0.pos) && !/proper/.test(pa0.pos), deg = prev && DEG.has(prev), cop = prev && COP.has(prev), det = prev && DET.has(prev), prn = prev && PRN.has(prev), pre = prev && PREP.has(prev), hab = prev && HAB.has(prev), nxDet = next && !words[i + 1].gap && /^(el|la|los|las|un|una|unos|unas|al|mi|su|sus|mis)$/.test(next);
        const sc = x => { let v = x.pos === 'verb' ? (TR[x.t] != null ? TR[x.t] : 4) : (CLOSED.has(x.pos) ? 7 : 5) + (x.isLemma || /noun/.test(x.pos) ? 1.5 : 0); if (deg) v += /adjective|adverb/.test(x.pos) ? 4 : x.pos === 'verb' ? -4 : 0; if (cop && /adjective/.test(x.pos)) v += 3; if (pnoun && /adjective/.test(x.pos)) v += 1.5; if (x.pos === 'verb' && prn && RPP[prev] != null && x.ps && x.ps.length && ![].concat(RPP[prev]).some(q => x.ps.includes(q))) v -= 6; if (x.src === 'vocab') v -= 3; if (det) v += x.pos === 'verb' ? -10 : 10; if (prn && x.pos === 'verb') v += 5; if (pre && x.pos !== 'verb') v += 3; if (pre && x.t === 'inf') v += 6; if (hab && x.t === 'pp') v += 12; if (nxDet && x.pos === 'verb' && !['subj', 'isubj', 'imp', 'pp'].includes(x.t)) v += 1; return v; };
        a = a.map((x, k) => [x, sc(x), k]).sort((p, q) => q[1] - p[1] || p[2] - q[2]).map(z => z[0]);
      }
      if (!tk.lem && /^fu/.test(tk.w) && words[i - 1] && /^(se|me|te|nos|os)$/.test(words[i - 1].w)) a.sort((x, y) => (y.lemma === 'ir') - (x.lemma === 'ir'));
      // reflexive verbs: «se despierta», «me llamo», «escóndete»
      const RP = { me: 0, te: 1, se: [2, 5], nos: 3, os: 4 };
      const pw = words[i - 1] && words[i - 1].pi === tk.pi ? words[i - 1].w : null;
      if (!tk.lem && a[0] && a[0].pos === 'verb') {
        const x = a[0]; const ps = x.ps && x.ps.length ? x.ps : (typeof x.p === 'number' ? [x.p] : []);
        const before = pw && RP[pw] != null && (x.t === 'inf' || x.t === 'ger' || [].concat(RP[pw]).some(q => ps.includes(q)));
        const c1 = x.clitic && x.clitic.split(' + ')[0];
        const attached = c1 && (x.t === 'imp' ? (c1 === 'te' && ps.includes(1)) || (c1 === 'os' && ps.includes(4)) : c1 === 'se');
        if (before || attached) { const rf = RX.reflexive(x); if (rf) a = [rf, ...a]; }
      }
      // commands at the start of a line of dialogue: «—Mira…», «—Lleva esta cesta»
      const dlg = RX.prepare._dlg(paras[tk.pi]);
      if (!tk.lem && a.length > 1 && a[0].pos === 'verb' && a[0].t === 'pres' && (a[0].ps || []).includes(2) && dlg && (tk.sstart || /^(pero|y|ahora|por favor)$/.test(pw || '') && words[i - 1].sstart)) {
        const k = a.findIndex(y => y.t === 'imp' && y.lemma === a[0].lemma); if (k > 0) a = [a[k], ...a.filter((_, j) => j !== k)];
      }
      if (!tk.lem && ART.has(tk.w) && a.length > 1) { // article or object pronoun? look at the next word
        const nx = words[i + 1] ? RX.analyze(words[i + 1].w, { lemma: words[i + 1].lem }) : [];
        const verbish = nx.length && nx[0].pos === 'verb' && !nx.some(x => /noun|adjective|adverb/.test(x.pos));
        a.sort((x, y) => ((y.pos === (verbish ? 'pronoun' : 'article')) - (x.pos === (verbish ? 'pronoun' : 'article'))));
      }
      if (!a.length && tk.cap && !tk.sstart) a = [{ lemma: tk.t, pos: 'proper noun', en: 'a name (person or place)', note: 'Names are not translated.', form: tk.w, isLemma: true, src: 'name' }];
      tk.a = a; tk.lemmas = [...new Set(a.map(x => x.lemma))];
    });
    const marks = RX.findPhrases(words);
    words.forEach((tk, i) => { if (marks[i]) { tk.ph = marks[i].ph; tk.phStart = marks[i].start; } });
    return (cache[r.id] = { paras, words });
  };
  RX.prepare._dlg = p => p && p.length && /^\s*[—«]/.test(p[0].t || '');
  RX.check = function (ids) { // developer check: every word must have a meaning
    const miss = {}, amb = {};
    (MA.RLIB || []).filter(r => !ids || ids.includes(r.id)).forEach(r => { delete cache[r.id]; const { words } = RX.prepare(r); words.forEach(tk => { if (!tk.a.length) (miss[tk.w] = miss[tk.w] || []).push(r.id); else if (!tk.lem && new Set(tk.a.map(x => x.lemma + x.pos)).size > 1) { const k = tk.w + ' → ' + tk.a[0].lemma + ' (' + (tk.a[0].t || tk.a[0].pos) + ')'; const sn = r.text.replace(/\s+/g, ' '); const ctx = (RX.prepare(r).paras[tk.pi].map(t => t.t).join('').match(new RegExp('[^.!?—]*\\b' + tk.t + '\\b[^.!?—]*')) || [''])[0].trim().slice(0, 70); (amb[k] = amb[k] || []).push(ctx); } }); });
    return { miss, amb };
  };

  /* ---------- progress & word book (local + cloud through the app state) ---------- */
  const prog = () => (st().rlib = st().rlib || {});
  const book = () => (st().rwords = st().rwords || {});
  const P = id => prog()[id] || {};
  const setP = (id, patch, immediate) => { prog()[id] = Object.assign({}, P(id), patch, { t: Date.now() }); S.save(immediate); };
  const m0 = S.merge;
  S.merge = function (a, b) {
    const m = m0(a, b); if (!a || !b) return m;
    ['rlib', 'rwords'].forEach(k => { const x = a[k] || {}, y = b[k] || {}; const out = {}; new Set([...Object.keys(x), ...Object.keys(y)]).forEach(id => { const p = x[id], q = y[id]; out[id] = !p ? q : !q ? p : ((p.t || 0) >= (q.t || 0) ? p : q); }); m[k] = out; });
    return m;
  };
  const savedWords = () => Object.values(book()).filter(w => !w.del);
  const isSaved = w => { const e = book()[w]; return !!(e && !e.del); };
  const status = id => { const p = P(id); return !built(id) ? 'soon' : p.done ? 'done' : p.opened ? 'started' : 'new'; };
  RX.status = status;

  /* ---------- small helpers ---------- */
  const lvlOf = c => MA.CITY[c].stage;
  const STG = [['beginner', 'Beginner', 'A1–A2', 'Fairy tales · Cuentos de hadas'], ['intermediate', 'Intermediate', 'B1–B2', 'Real-life reading · Lecturas de la vida real'], ['advanced', 'Advanced', 'C1–C2', 'Advanced reading · Lecturas avanzadas']];
  const pill = s => ({ done: '<span class="pill ok">✓ Completed</span>', started: '<span class="pill cur">In progress</span>', new: '<span class="pill">Not started</span>', soon: '<span class="pill off">Coming soon</span>' })[s];
  const row = r => { const s = status(r.id); const t = text(r.id); const p = P(r.id);
    return `<a class="rrow ${s}" href="${s === 'soon' ? 'javascript:void 0' : '#rd-' + r.id}" ${s === 'soon' ? 'aria-disabled="true"' : ''}><span class="rrow-t"><b class="es">${esc(r.title)}</b><small>${esc(r.en)}</small></span><span class="rrow-m"><span class="tag">${esc(r.level)}</span>${t ? `<small>${wc(t)} words · ~${Math.max(2, Math.round(wc(t) / 120))} min</small>` : ''}${s === 'started' && p.pos ? `<small>${Math.round(p.pos * 100)}% read</small>` : ''}${pill(s)}</span></a>`; };
  H.readingList = (city) => MA.RCURR.filter(r => r.city === city);

  /* ---------- READER ---------- */
  V.rd = function (id) {
    const r = text(id), c0 = cur(id); if (!r || !c0) return V.rlib();
    const { paras } = RX.prepare(r);
    if (!P(id).opened) setP(id, { opened: Date.now() }); else { prog()[id].opened = Date.now(); }
    let fs = 1.18; try { fs = +localStorage.getItem('ma-rfs') || 1.18; } catch (e) { }
    const c = MA.CITY[r.city]; const p = P(id);
    const body = paras.map((pa, pi) => `<p class="rp">${pa.map(tk => tk.w ? `<span class="rw${tk.ph ? ' rph' : ''}${isSaved(tk.w) ? ' sv' : ''}" data-i="${tk.i}">${esc(tk.t)}</span>` : esc(tk.t)).join('')}</p>`).join('');
    H.after(view => {
      const page = view.querySelector('.rpage'); page.style.setProperty('--rfs', fs + 'rem');
      view.querySelectorAll('[data-rfs]').forEach(b => b.onclick = () => { fs = U.clamp(fs + +b.dataset.rfs, 0.95, 1.7); page.style.setProperty('--rfs', fs + 'rem'); try { localStorage.setItem('ma-rfs', fs); } catch (e) { } });
      page.addEventListener('click', e => { const w = e.target.closest('.rw'); if (w) { e.stopPropagation(); H.rpop(r, +w.dataset.i, w); } });
      const markBtns = view.querySelectorAll('[data-rdone]');
      const paint = () => { const d = P(id).done; markBtns.forEach(b => { b.textContent = d ? '✓ Completed — mark as unread' : '✓ Mark as completed'; b.classList.toggle('primary', !d); b.classList.toggle('ghost', d); }); };
      markBtns.forEach(b => b.onclick = () => { const d = !P(id).done; setP(id, { done: d, doneAt: d ? Date.now() : null }, true); if (d) { S.award('rlib:' + id, 15, 5, 'Reading'); UI.toast('✓ Reading completed'); } paint(); });
      paint();
      // remember position
      const pos0 = P(id).pos; if (pos0 && pos0 > 0.03 && pos0 < 0.97) setTimeout(() => { const top = page.getBoundingClientRect().top + window.scrollY; window.scrollTo(0, top + (page.offsetHeight - innerHeight * 0.4) * pos0); UI.toast('Continuing where you stopped'); }, 60);
      let tm = null; const onScroll = () => { if (!document.body.contains(page)) { window.removeEventListener('scroll', onScroll); return; } clearTimeout(tm); tm = setTimeout(() => { const rc = page.getBoundingClientRect(); const f = U.clamp((-rc.top + innerHeight * 0.4) / Math.max(1, rc.height), 0, 1); if (Math.abs((P(id).pos || 0) - f) > 0.02) { prog()[id] = Object.assign({}, P(id), { pos: Math.round(f * 100) / 100, t: Date.now() }); S.save(); } }, 700); };
      window.addEventListener('scroll', onScroll, { passive: true });
    });
    const list = MA.RCURR.filter(x => x.city === r.city);
    return `<article class="rbook">
      <header class="rbook-head"><p class="eyebrow">${esc(c.name)} · ${esc(THEME[r.city])}</p><h1 class="es">${esc(r.title)}</h1><p class="muted rsub">${esc(r.en)}</p>
        <div class="row gap wrap center">${r.type && r.type !== 'Cuento de hadas' ? `<span class="tag">${esc(r.type)}</span>` : ''}<span class="tag">${esc(r.level)}</span><span class="tag">${wc(r)} words</span><span class="tag">~${Math.max(2, Math.round(wc(r) / 120))} min</span>${p.done ? '<span class="pill ok">✓ Completed</span>' : ''}</div>
        <div class="rtools row gap wrap center"><button class="btn small ghost" data-rfs="-0.08" aria-label="Smaller text">A−</button><button class="btn small ghost" data-rfs="0.08" aria-label="Bigger text">A+</button><a class="btn small ghost" href="#city-${r.city}-fairytales">← ${esc(c.short || c.name)} readings</a><a class="btn small ghost" href="#rwords">📒 Word Book</a></div>
        ${r.note ? `<p class="tiny muted center"><i>${esc(r.note)}</i></p>` : ''}<p class="tiny muted center">Tap any word for its meaning. <span class="rph-demo">Underlined</span> words are part of an expression.</p></header>
      <div class="rpage es">${body}</div>
      <footer class="rbook-foot"><p class="fin">— Fin —</p><button class="btn" data-rdone>✓ Mark as completed</button>
        <p class="tiny muted">${list.indexOf(cur(id)) + 1} of ${list.length} in ${esc(c.name)}</p></footer></article>`;
  };

  /* ---------- word popup ---------- */
  const close = () => { const p = U.$('#rpop'); if (p) p.remove(); U.$$('.rw.on').forEach(x => x.classList.remove('on')); document.removeEventListener('click', outside, true); document.removeEventListener('keydown', onKey); };
  const outside = e => { if (!e.target.closest('#rpop') && !e.target.closest('.rw')) close(); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  const sentenceOf = (r, tk) => { // the sentence that contains the word, word highlighted
    const pa = RX.prepare(r).paras[tk.pi]; const parts = []; let cur2 = []; let hit = -1;
    pa.forEach(t => { cur2.push(t); if (t === tk) hit = parts.length; if (!t.w && /[.!?…]/.test(t.t)) { parts.push(cur2); cur2 = []; } });
    if (cur2.length) parts.push(cur2);
    const s = parts[hit] || pa;
    return { html: s.map(t => t === tk ? `<mark>${esc(t.t)}</mark>` : esc(t.t)).join('').trim(), plain: s.map(t => t.t).join('').replace(/^[\s—»]+/, '').trim() };
  };
  const enLine = a => a.enForm && (!a.isLemma || a.pos !== 'verb') ? a.enForm : a.en;
  H.rpop = function (r, i, el) {
    close();
    const { words } = RX.prepare(r); const tk = words.find(w => w.i === i); if (!tk) return;
    el.classList.add('on');
    const a = tk.a[0], rest = tk.a.slice(1);
    const ph = tk.ph; const sent = sentenceOf(r, tk);
    const phWords = ph ? words.filter(w => w.phStart === tk.phStart).map(w => w.t).join(' ') : '';
    const lemmaLabel = ph ? (ph.note && /^[a-záéíóúñ ]+$/i.test(ph.key) ? '' : '') : '';
    const block = x => `<div class="rp-a">${!x.isLemma && x.lemma !== tk.w ? `<p class="rp-base">Base form: <b class="es">${esc(x.lemma)}</b>${x.pos === 'verb' ? ` <span class="muted">(${esc(x.en.split(';')[0])})</span>` : ''}</p>` : ''}
      <p class="rp-en">${esc(enLine(x))}</p>
      <p class="chips"><span class="tag">${esc(x.gender ? x.gender + ' noun' : x.pos)}</span>${x.gram ? `<span class="tag">${esc(x.gram)}</span>` : ''}${x.clitic ? `<span class="tag">+ ${esc(x.clitic)} attached</span>` : ''}</p>
      ${x.note ? `<p class="tiny rp-note">${esc(x.note)}</p>` : ''}${x.refl ? `<p class="tiny rp-note">Reflexive: ${esc(x.refl)}</p>` : ''}${x.src === 'vocab' ? '<p class="tiny muted">From the app’s vocabulary lists.</p>' : ''}</div>`;
    const saved = isSaved(tk.w);
    const html = `<div id="rpop" role="dialog" aria-label="Word: ${esc(tk.t)}"><button class="rp-x" aria-label="Close">×</button>
      <p class="rp-w"><b class="es">${esc(tk.t)}</b> ${UI.spk(tk.w)} <span class="ipa">/${esc(U.autoIPA(tk.w))}/</span></p>
      ${ph ? `<div class="rp-ph"><small>Expression</small><p><b class="es">${esc(phWords)}</b> = ${esc(ph.en)}</p>${ph.note ? `<p class="tiny muted">${esc(ph.note)}</p>` : ''}</div>` : ''}
      ${a ? block(a) + (rest.length ? `<details class="rp-more"><summary>Other possible meaning${rest.length > 1 ? 's' : ''} (${rest.length})</summary>${rest.map(block).join('')}</details>` : '') : `<div class="rp-a"><p class="warn-box">This word is not in the built-in dictionary, so no meaning is shown here. Please check an external dictionary.</p></div>`}
      <div class="rp-ctx"><small>In this sentence</small><p class="es">${sent.html}</p></div>
      <div class="rp-ai"></div>
      <div class="row gap wrap"><button class="btn small ${saved ? 'ghost' : 'primary'}" id="rp-save">${saved ? '★ In your Word Book' : '☆ Save word'}</button>${MA.AI.ok() ? '<button class="btn small ghost" id="rp-ai">✨ Explain in context</button>' : ''}<a class="btn small ghost" target="_blank" rel="noopener" href="https://www.wordreference.com/es/en/translation.asp?spen=${encodeURIComponent(tk.w)}">WordReference ↗</a></div></div>`;
    document.body.insertAdjacentHTML('beforeend', html);
    const pop = U.$('#rpop');
    // position: under the word on wide screens, bottom sheet on phones
    if (innerWidth > 700) { const rc = el.getBoundingClientRect(); const w = 360; let left = rc.left + window.scrollX + rc.width / 2 - w / 2; left = U.clamp(left, 12, document.documentElement.clientWidth - w - 12); pop.style.left = left + 'px'; pop.style.width = w + 'px'; const below = rc.bottom + window.scrollY + 8; pop.style.top = below + 'px'; requestAnimationFrame(() => { if (rc.bottom + pop.offsetHeight + 16 > innerHeight && rc.top > pop.offsetHeight + 16) pop.style.top = (rc.top + window.scrollY - pop.offsetHeight - 8) + 'px'; }); }
    else pop.classList.add('sheet');
    pop.querySelector('.rp-x').onclick = close;
    setTimeout(() => { document.addEventListener('click', outside, true); document.addEventListener('keydown', onKey); }, 0);
    pop.querySelector('#rp-save').onclick = e => {
      const b = e.currentTarget; if (isSaved(tk.w)) { location.hash = '#rwords'; close(); return; }
      const c = cur(r.id); const x = a || {};
      book()[tk.w] = { w: tk.w, shown: tk.t, lemma: x.lemma || tk.w, en: a ? enLine(x) : '(no meaning in the dictionary)', pos: x.gender ? x.gender + ' noun' : x.pos || '', gram: x.gram || '', phrase: ph ? phWords + ' = ' + ph.en : '', sent: sent.plain, rid: r.id, rtitle: r.title, level: c.level, city: r.city, t: Date.now() };
      S.save(true); b.textContent = '★ In your Word Book'; b.classList.remove('primary'); b.classList.add('ghost');
      U.$$('.rpage .rw').forEach(s => { const t = words.find(w => w.i === +s.dataset.i); if (t && t.w === tk.w) s.classList.add('sv'); });
      UI.toast('★ Saved to your Word Book');
    };
    const ai = pop.querySelector('#rp-ai'); if (ai) ai.onclick = async () => {
      ai.disabled = true; const slot = pop.querySelector('.rp-ai'); slot.innerHTML = '<p class="tiny muted">Asking Claude…</p>';
      try {
        const res = await MA.AI.json(`A learner (${r.level}) is reading a Spanish text from Spain and tapped the word "${tk.t}" in this sentence: "${sent.plain}". Explain in simple English what the word means HERE. If you are not sure, say so. Return ONLY JSON: {"meaning_here":"", "base_form":"", "grammar":"short", "note":"one short sentence, optional"}`, { modelTier: 'quick' });
        slot.innerHTML = `<div class="aifb"><span class="pill ai">Claude · AI</span><p><b>${esc(res.meaning_here)}</b></p><p class="tiny muted">${esc(res.base_form)} · ${esc(res.grammar)}</p>${res.note ? `<p class="tiny">${esc(res.note)}</p>` : ''}</div>`;
      } catch (e) { slot.innerHTML = `<p class="warn-box tiny">AI is not available right now (${esc(e.code || 'error')}).</p>`; }
    };
  };
  window.addEventListener('hashchange', close);

  /* ---------- WORD BOOK ---------- */
  V.rwords = function (arg) {
    const by = arg === 'level' ? 'level' : 'reading';
    const all = savedWords().sort((x, y) => y.t - x.t);
    H.after(view => {
      const q = view.querySelector('#rw-q');
      q && (q.oninput = () => { const v = U.norm(q.value); view.querySelectorAll('.rwitem').forEach(li => li.hidden = v && !U.norm(li.dataset.k).includes(v)); });
      view.addEventListener('click', e => { const d = e.target.closest('[data-rwdel]'); if (!d) return; const k = d.dataset.rwdel; book()[k] = Object.assign({}, book()[k], { del: Date.now(), t: Date.now() }); S.save(true); d.closest('.rwitem').remove(); UI.toast('Word removed'); const n = view.querySelector('#rw-n'); if (n) n.textContent = savedWords().length; });
    });
    const groups = {};
    all.forEach(w => { const k = by === 'level' ? (MA.CITY[w.city] ? MA.STAGES[lvlOf(w.city)].name + ' · ' + w.level : w.level) : w.rid; (groups[k] = groups[k] || []).push(w); });
    const head = k => by === 'level' ? esc(k) : `<a href="#rd-${k}" class="es">${esc((cur(k) || {}).title || k)}</a> <small class="muted">${esc((cur(k) || {}).level || '')} · ${esc(MA.CITY[(cur(k) || {}).city] ? MA.CITY[cur(k).city].name : '')}</small>`;
    const item = w => `<li class="rwitem" data-k="${esc(w.w + ' ' + w.lemma + ' ' + w.en)}"><div><p><b class="es">${esc(w.shown || w.w)}</b> ${UI.spk(w.w)} <span class="muted">— ${esc(w.en)}</span></p><p class="tiny muted">${w.lemma && w.lemma !== w.w ? `base form: <span class="es">${esc(w.lemma)}</span> · ` : ''}${esc(w.pos)}${w.gram ? ' · ' + esc(w.gram) : ''}</p>${w.phrase ? `<p class="tiny">Expression: <span class="es">${esc(w.phrase)}</span></p>` : ''}<p class="tiny es rw-sent">«${esc(w.sent)}»</p></div><button class="btn small ghost" data-rwdel="${esc(w.w)}" aria-label="Delete ${esc(w.w)}">Delete</button></li>`;
    return `<div class="panel"><p class="eyebrow">Reading Library</p><h1>My Word Book</h1><p class="muted">Words you saved while reading, with the sentence where you found them. <b id="rw-n">${all.length}</b> words.</p>
      <div class="row gap wrap"><div class="tabs"><a class="tab ${by === 'reading' ? 'on' : ''}" href="#rwords">By reading</a><a class="tab ${by === 'level' ? 'on' : ''}" href="#rwords-level">By level</a></div><input id="rw-q" class="input" type="search" placeholder="Search your words…" aria-label="Search saved words"></div></div>
      ${all.length ? Object.keys(groups).map(k => `<div class="panel"><h3>${head(k)}</h3><ul class="rwlist">${groups[k].map(item).join('')}</ul></div>`).join('') : '<div class="panel"><p class="muted">No saved words yet. Open a reading in any city (city › Reading), tap a word and press «Save word».</p></div>'}
      <p class="tiny muted">Saved in this browser${S.cloud === 'off' ? ' only' : ' and synced to your account'}. This list is separate from the Vocabulary flashcards.</p>`;
  };

  /* ---------- navigation: breadcrumbs, previous / next, category, sidebar ---------- */
  const t0 = H.trail;
  H.trail = function (name = H.current.name, arg = H.current.arg) {
    const home = ['Home', '#home'];
    if (name === 'rwords') return [home, ['My Word Book', '#rwords']];
    if (name === 'rd') { const r = cur(arg); if (!r) return [home]; return [...t0('city', r.city + '-fairytales'), [r.title, '#rd-' + arg]]; }
    if (name === 'read') { const r = MA.READINGS.find(x => x.id === arg); if (r) return [...t0('city', r.city + '-fairytales'), [r.title, '#read-' + arg]]; }
    return t0(name, arg);
  };
  const s0 = H.seq;
  H.seq = function (name = H.current.name, arg = H.current.arg) {
    if (name === 'rd') { const r = cur(arg); if (!r) return {}; const list = MA.RCURR.filter(x => built(x.id) && x.city === r.city); const i = list.indexOf(r); const f = x => x && [x.title, '#rd-' + x.id]; return { prev: f(list[i - 1]), next: f(list[i + 1]) }; }
    return s0(name, arg);
  };
  if (H.catOf) { const c0 = H.catOf; H.catOf = (name, arg) => ['rlib', 'rd', 'rwords'].includes(name) ? 'reading' : c0(name, arg); }
  /* ---------- one place per city: the «Reading» card (replaces Fairy Tales) ---------- */
  // old fairy-tale versions that repeat a reading → removed (their progress moves to the new reading)
  const DUP = { caperucita: 'caperucita', cerditos: 'cerditos', cenicienta: 'cenicienta', gatobotas: 'gatobotas', blancanieves: 'blancanieves-r', bellaybestia: 'bellabestia', sirenita: 'sirenita-r' };
  MA.OLD_STORY_GLOSS = {};
  MA.STORIES = MA.STORIES.filter(x => { if (DUP[x.id]) { Object.assign(MA.OLD_STORY_GLOSS, x.gloss || {}); return false; } return true; });
  const gg0 = H.globalGloss; H.globalGloss = () => Object.assign({}, MA.OLD_STORY_GLOSS, gg0());
  const mig0 = H.migrate;
  H.migrate = function () {
    const r = mig0 ? mig0.apply(this, arguments) : undefined;
    Object.entries(DUP).forEach(([o, n]) => { const old = (st().stories || {})[o]; if (old && old.read && !P(n).done) prog()[n] = Object.assign({}, P(n), { opened: P(n).opened || old.read, done: true, doneAt: old.read, t: Date.now() }); });
    return r;
  };
  const story0 = V.story;
  V.story = function (id) { if (DUP[id]) { setTimeout(() => location.replace('#rd-' + DUP[id]), 0); return '<div class="panel"><p class="muted">Opening…</p></div>'; } return story0(id); };

  H.catName = (f => k => k === 'fairytales' ? 'Reading' : f(k))(H.catName);
  H.cityTales = function (c, sub, head) {
    const list = MA.RCURR.filter(r => r.city === c.id), tales = MA.STORIES.filter(x => x.city === c.id), old = MA.READINGS.filter(r => r.city === c.id);
    const legend = s => { const r = st().stories[s.id] || {}; return `<a class="rrow ${r.read ? 'done' : ''}" href="#story-${s.id}"><span class="rrow-t"><b class="es">${esc(s.title)}</b><small>${esc(s.en)}</small></span><span class="rrow-m"><span class="tag">${esc(s.level)}</span><small>with English translation</small>${r.read ? pill('done') : pill('new')}</span></a>`; };
    const short = r => { const d = (st().readings[r.id] || {}).done; return `<a class="rrow ${d ? 'done' : ''}" href="#read-${r.id}"><span class="rrow-t"><b class="es">${esc(r.title)}</b><small>${esc(r.en)} · ${esc(r.type)}</small></span><span class="rrow-m"><span class="tag">${esc(r.level)}</span>${pill(d ? 'done' : 'new')}</span></a>`; };
    return head + `<div class="panel"><p class="muted">${esc(THEME[c.id])} · ${esc(list[0] ? list[0].level : c.level)}. Read for pleasure — tap any word to see what it means. No questions, no tests.</p>
      <a class="btn small ghost" href="#rwords">📒 My Word Book (${savedWords().length})</a></div>
      ${list.length ? `<div class="panel rcity"><div class="row"><h3>Readings <small class="muted">${list.length}</small></h3><small class="muted">${list.filter(r => P(r.id).done).length}/${list.length} completed</small></div><div class="rlist">${list.map(row).join('')}</div></div>` : ''}
      ${tales.length ? `<div class="panel rcity"><h3>Legend</h3><div class="rlist">${tales.map(legend).join('')}</div></div>` : ''}
      ${old.length ? `<div class="panel rcity"><h3>Short texts</h3><div class="rlist">${old.map(short).join('')}</div></div>` : ''}`;
  };
  const cats0 = H.cats;
  H.cats = function (c) {
    const out = cats0.apply(this, arguments);
    const list = MA.RCURR.filter(r => r.city === c.id && built(r.id)), tales = MA.STORIES.filter(x => x.city === c.id), old = MA.READINGS.filter(r => r.city === c.id);
    const n = list.length + tales.length + old.length, d = list.filter(r => P(r.id).done).length + tales.filter(x => (st().stories[x.id] || {}).read).length + old.filter(r => (st().readings[r.id] || {}).done).length;
    const ft = out.find(x => x.key === 'fairytales');
    if (ft) Object.assign(ft, { name: 'Reading', desc: 'Stories and articles for your level. Tap any word for its meaning and save words to your Word Book. No quizzes.', n, unit: n === 1 ? 'reading' : 'readings', p: n ? d / n : null, pText: `${d}/${n} completed` });
    const pr = out.find(x => x.key === 'practice'); // short texts moved out of Practice
    if (pr && old.length) { const m = /^(\d+)\/(\d+)/.exec(pr.pText || ''); if (m) { const od = old.filter(r => (st().readings[r.id] || {}).done).length; const dd = +m[1] - od, nn = +m[2] - old.length; pr.n = nn; pr.p = nn ? dd / nn : null; pr.pText = `${dd}/${nn} tried`; } pr.desc = 'Three skills: Listening, Speaking and Writing.'; }
    return out;
  };
  // Practice keeps Listening, Speaking and Writing; its old Reading tab now opens the city's Reading card
  const cp0 = H.cityPractice;
  H.cityPractice = function (c, sub, head) {
    if (sub === 'reading') { setTimeout(() => location.replace(`#city-${c.id}-fairytales`), 0); return head; }
    return cp0.apply(this, arguments).replace(/<a role="tab"[^>]*href="#city-[a-z]+-practice-reading"[^>]*>[\s\S]*?<\/a>/, '');
  };
  // the old separate library page now opens the current city's Reading
  V.rlib = function () { const c = H.currentCity ? H.currentCity() : MA.CITY.alicante; setTimeout(() => location.replace(`#city-${(c && !c.final ? c : MA.CITY.alicante).id}-fairytales`), 0); return ''; };
})();
