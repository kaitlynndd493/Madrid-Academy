/* MADRID ACADEMY — Grammar Library (A1–C2): engine, hub, lesson pages, review, progress */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;
  const G = MA.GRAM = MA.GRAM || { cats: {}, lessons: {}, order: [] };
  const CATS = [['beginner', 'Beginner', 'A1–A2'], ['intermediate', 'Intermediate', 'B1–B2'], ['advanced', 'Advanced', 'C1–C2']];
  G.CATS = CATS;

  /* ---------- authoring helpers (used by the data files) ---------- */
  const A = MA.GA = {
    mc: (q, o, a, ex, skill = 'grammar') => ({ t: 'mc', q, o, a, ex, skill }),
    fl: (q, a, ex) => ({ t: 'fill', q, a: [].concat(a), ex, skill: 'grammar' }),
    bd: (w, a, en, ex) => ({ t: 'order', w, a: [].concat(a), en, ex, skill: 'writing' }),
    tr: (en, a, ex) => ({ t: 'tr', en, a: [].concat(a), ex, skill: 'writing' }),
    fx: (q, a, ex) => ({ t: 'fix', q, a: [].concat(a), ex, skill: 'grammar' })
  };
  G.unit = function (cat, id, title, en, lessons) {
    const c = G.cats[cat] = G.cats[cat] || []; let u = c.find(x => x.id === id); if (!u) { u = { id, title, en, cat, lessons: [] }; c.push(u); }
    lessons.forEach(l => { l.unit = id; l.cat = cat; u.lessons.push(l.id); G.lessons[l.id] = l; G.order.push(l.id); });
  };

  /* ---------- progress (saved in the same state as the rest of the app: localStorage + cloud) ---------- */
  const gp = () => (st().grammar = st().grammar || {});
  G.done = id => !!(gp()[id] && gp()[id].done);
  G.mark = (id, patch) => { const p = gp(); p[id] = Object.assign({ done: false, best: 0, t: 0 }, p[id] || {}, patch, { t: Date.now() }); S.save(true); };
  const m0 = S.merge;
  S.merge = function (a, b) {
    const m = m0(a, b); if (!a || !b) return m;
    const ga = a.grammar || {}, gb = b.grammar || {}; const out = {};
    new Set([...Object.keys(ga), ...Object.keys(gb)]).forEach(k => { const x = ga[k] || {}, y = gb[k] || {}; out[k] = { done: !!(x.done || y.done), best: Math.max(x.best || 0, y.best || 0), t: Math.max(x.t || 0, y.t || 0) }; });
    m.grammar = out; return m;
  };
  const catLessons = cat => (G.cats[cat] || []).flatMap(u => u.lessons);
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;

  /* ---------- rendering helpers ---------- */
  const tbl = ([title, head, rows, esCols = [1]]) => `<div class="tbl-wrap"><table class="tbl"><caption>${esc(title)}</caption><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, k) => `<td class="${esCols.includes(k) ? 'es' : ''}">${esc(c)}${esCols.includes(k) && c && !/^[-–—✗❌]/.test(c) ? ' ' + UI.spk(String(c).split(' / ')[0].replace(/[()…*]/g, '')) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  G.tbl = tbl;
  const levelOf = cat => CATS.find(c => c[0] === cat);

  /* ---------- hub ---------- */
  V.grammarlib = function (arg) {
    const cat = CATS.find(c => c[0] === arg) ? arg : 'beginner';
    const all = G.order.length, doneAll = G.order.filter(G.done).length;
    H.after(view => {
      view.querySelectorAll('[data-unitall]').forEach(b => b.onclick = () => { const open = b.dataset.unitall === 'open'; view.querySelectorAll('details.gunit').forEach(d => d.open = open); });
    });
    const tabs = CATS.map(([k, n, lv]) => { const ls = catLessons(k); const d = ls.filter(G.done).length; return `<a class="gtab ${k === cat ? 'on' : ''}" href="#grammarlib-${k}"><b>${n}</b><small>${lv} · ${ls.length ? `${d}/${ls.length} done` : 'coming soon'}</small>${ls.length ? UI.bar(d / ls.length) : ''}</a>`; }).join('');
    const units = G.cats[cat] || [];
    const body = units.length ? units.map((u, i) => {
      const d = u.lessons.filter(G.done).length;
      return `<details class="panel gunit" ${i === 0 || d < u.lessons.length && u.lessons.some(G.done) ? 'open' : ''}><summary><div><p class="eyebrow">Unit ${i + 1}</p><h3>${esc(u.title)}</h3><p class="tiny muted">${esc(u.en || '')}</p></div><div class="gu-prog"><small>${d}/${u.lessons.length}</small>${UI.bar(d / u.lessons.length)}</div></summary>
        <ol class="glist">${u.lessons.map((id, k) => { const l = G.lessons[id]; const p = gp()[id]; return `<li><a class="glrow ${G.done(id) ? 'done' : ''}" href="#gl-${id}"><span class="gl-n">${G.done(id) ? '✓' : k + 1}</span><span class="gl-t"><b>${esc(l.title)}</b><small>${esc(l.level)} · ${esc(l.sub || '')}</small></span>${p && p.best ? `<span class="pill">Quiz best ${p.best}%</span>` : ''}<span class="gl-go">›</span></a></li>`; }).join('')}</ol></details>`;
    }).join('') : `<div class="panel center"><span class="pill soon">Coming soon</span><h3>${esc(levelOf(cat)[1])} grammar is being written</h3><p class="muted">This category will be added in the next phase. Beginner lessons are ready now.</p></div>`;
    return `<div class="panel ghero"><p class="eyebrow">Grammar Library · A1 → C2</p><h1>Spanish Grammar Master Curriculum</h1>
      <p class="muted">Every rule from first nouns to C2 nuance, with tables, examples with audio, common mistakes, practice and a quiz. Explanations in English; examples and practice in Spanish.</p>
      <div class="stats3"><div><b>${doneAll}</b><small>lessons completed</small></div><div><b>${all}</b><small>lessons available</small></div><div><b>${pct(doneAll, all)}%</b><small>of the library</small></div></div>
      <div class="row gap wrap"><a class="btn primary" href="#greview">↻ Grammar review</a><button class="btn ghost" data-unitall="open">Expand all units</button><button class="btn ghost" data-unitall="close">Collapse all</button></div></div>
      <div class="gtabs">${tabs}</div>${body}`;
  };

  /* ---------- lesson page ---------- */
  V.gl = function (id) {
    const l = G.lessons[id]; if (!l) return `<div class="panel"><h2>Lesson not found</h2><a class="btn" href="#grammarlib">Grammar Library</a></div>`;
    const u = (G.cats[l.cat] || []).find(x => x.id === l.unit); const ui = (G.cats[l.cat] || []).indexOf(u) + 1;
    const p = gp()[id] || {};
    H.after(view => {
      const prac = view.querySelector('#g-prac'), quiz = view.querySelector('#g-quiz');
      view.querySelector('#g-prac-start').onclick = e => { e.target.remove(); UI.runExercises(prac, l.practice, { mode: 'lesson', src: 'grammar:' + id, onDone: res => { const ok = res.filter(r => r && r.correct).length, obj = res.filter(r => r && r.objective).length; prac.innerHTML = `<div class="result"><h3>Practice finished: ${ok}/${obj}</h3><p class="muted">Now try the quiz to complete the lesson.</p><button class="btn" id="g-prac-again">Practise again</button></div>`; prac.querySelector('#g-prac-again').onclick = () => H.render(); } }); };
      view.querySelector('#g-quiz-start').onclick = e => { e.target.remove(); runQuiz(quiz, l.quiz, score => { G.mark(id, { best: Math.max(p.best || 0, score), done: (gp()[id] || {}).done || score >= 70 }); if (score >= 70) S.award('gram:' + id, 20, 5, 'Grammar lesson: ' + l.title); }); };
      const mk = view.querySelector('#g-mark'); if (mk) mk.onclick = () => { const d = !G.done(id); G.mark(id, { done: d }); if (d) S.award('gram:' + id, 20, 5, 'Grammar lesson: ' + l.title); UI.toast(d ? '✓ Lesson marked as completed' : 'Marked as not completed'); H.render(); };
    });
    const see = (l.see || []).filter(x => MA.LESSONS[x]).map(x => `<a class="pill" href="#lesson-${x}">${esc(MA.LESSONS[x].title)}</a>`).join(' ');
    return `<div class="panel ghero"><p class="eyebrow">${esc(levelOf(l.cat)[1])}${l.city && MA.CITY[l.city] ? ' · ' + esc(MA.CITY[l.city].short || MA.CITY[l.city].name) : ''} · Unit ${ui}: ${esc(u ? u.title : '')} · ${esc(l.level)}</p><h1>${esc(l.title)}</h1>${l.sub ? `<p class="muted">${esc(l.sub)}</p>` : ''}
        <div class="row gap wrap">${G.done(id) ? '<span class="pill ok">✓ Completed</span>' : ''}${p.best ? `<span class="pill">Quiz best ${p.best}%</span>` : ''}<button class="btn small ${G.done(id) ? 'ghost' : ''}" id="g-mark">${G.done(id) ? 'Mark as not completed' : '✓ Mark as completed'}</button></div>
        <nav class="gtoc"><a href="#g-s-learn" onclick="document.getElementById('g-s-learn').scrollIntoView({behavior:'smooth'});return false">Learn</a><a href="#g-s-ex" onclick="document.getElementById('g-s-ex').scrollIntoView({behavior:'smooth'});return false">Examples</a><a href="#g-s-mis" onclick="document.getElementById('g-s-mis').scrollIntoView({behavior:'smooth'});return false">Mistakes</a><a href="#g-s-prac" onclick="document.getElementById('g-s-prac').scrollIntoView({behavior:'smooth'});return false">Practice</a><a href="#g-s-quiz" onclick="document.getElementById('g-s-quiz').scrollIntoView({behavior:'smooth'});return false">Quiz</a></nav></div>
      <div class="panel lesson-intro" id="g-s-learn"><h3>1 · Explanation</h3>${l.explain}
        ${(l.tables || []).map(tbl).join('')}
        ${(l.rules || []).length ? `<h4>Rules & sentence structure</h4><ul class="grules">${l.rules.map(([s, e]) => `<li><span class="es gstruct">${esc(s)}</span><span>${esc(e)}</span></li>`).join('')}</ul>` : ''}${l.extra || ''}</div>
      <div class="panel" id="g-s-ex"><h3>2 · Examples</h3><ul class="gex">${l.examples.map(([es, en, note]) => `<li><span class="es">${esc(es)}</span> ${UI.spk(es)}<span class="muted">${esc(en)}</span>${note ? `<small class="tiny">${esc(note)}</small>` : ''}</li>`).join('')}</ul></div>
      <div class="panel" id="g-s-mis"><h3>3 · Common mistakes</h3><ul class="mistakes">${l.mistakes.map(([w, r, why]) => `<li>❌ <s>${esc(w)}</s> → ✅ <b>${esc(r)}</b>${why ? ` <span class="muted">${esc(why)}</span>` : ''}</li>`).join('')}</ul>${l.tip ? `<p class="note">💡 ${esc(l.tip)}</p>` : ''}${see ? `<p class="tiny">See it in the story: ${see}</p>` : ''}</div>
      <div class="panel" id="g-s-prac"><h3>4 · Practice</h3><p class="muted tiny">Multiple choice, fill in the blank, sentence building and translation. You get an explanation after each answer. Use the accent buttons for á é í ó ú ñ ü ¿ ¡.</p><div id="g-prac"></div><button class="btn primary" id="g-prac-start">Start practice (${l.practice.length})</button></div>
      <div class="panel" id="g-s-quiz"><h3>5 · Quiz</h3><p class="muted tiny">${l.quiz.length} questions with instant feedback. Score 70% or more to complete the lesson.</p><div id="g-quiz"></div><button class="btn primary" id="g-quiz-start">Start quiz</button></div>`;
  };

  /* quiz with instant feedback and an explanation for every answer */
  function runQuiz(root, items, onScore) {
    let i = 0, ok = 0;
    const show = () => {
      if (i >= items.length) { const score = Math.round(ok / items.length * 100); onScore(score); root.innerHTML = `<div class="result"><h3>${score >= 70 ? '🎉' : '📘'} Score: ${ok}/${items.length} (${score}%)</h3><p>${score >= 70 ? 'Lesson completed! It now appears in your Grammar review.' : 'Review the explanation and mistakes above, then try again.'}</p><div class="row gap"><button class="btn" id="gq-again">Try again</button><a class="btn primary" href="${G.backHref(H.current.arg)}">Back to the grammar page</a></div></div>`; root.querySelector('#gq-again').onclick = () => { i = 0; ok = 0; show(); }; return; }
      const it = items[i];
      root.innerHTML = `<div class="ex-progress">${items.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'cur' : ''}"></span>`).join('')}</div><div class="ex-card"><p class="q">${esc(it.q)}</p><div class="opts">${it.o.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><div class="ex-fb" aria-live="polite"></div><div class="ex-foot"></div></div>`;
      root.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k, right = k === it.a; if (right) ok++;
        root.querySelectorAll('.opt').forEach((x, j) => { x.disabled = true; if (j === it.a) x.classList.add('right'); else if (j === k) x.classList.add('wrong'); });
        S.record('grammar', right, right ? null : { src: 'grammar-quiz', prompt: it.q, expected: it.o[it.a], given: it.o[k] });
        root.querySelector('.ex-fb').innerHTML = `<div class="${right ? 'fb-ok' : 'fb-no'}"><b>${right ? '✓ Correct!' : '✗ Not quite.'}</b> ${right ? '' : `Answer: <span class="es">${esc(it.o[it.a])}</span>`}${it.ex ? `<div class="muted">${esc(it.ex)}</div>` : ''}</div>`;
        root.querySelector('.ex-foot').innerHTML = `<button class="btn primary">${i < items.length - 1 ? 'Next →' : 'See score'}</button>`;
        const nb = root.querySelector('.ex-foot button'); nb.onclick = () => { i++; show(); }; nb.focus();
      });
    };
    show();
  }
  G.runQuiz = runQuiz;

  /* ---------- review ---------- */
  V.greview = function () {
    const done = G.order.filter(G.done);
    H.after(view => {
      const b = view.querySelector('#gr-start'); if (!b) return;
      b.onclick = () => { const pool = U.shuffle(done.flatMap(id => G.lessons[id].quiz.map(q => Object.assign({}, q, { q: `[${G.lessons[id].title}] ${q.q}` })))).slice(0, 12); b.remove(); runQuiz(view.querySelector('#gr-quiz'), pool, score => { if (score >= 70) S.award('gramreview:' + S.today(), 15, 5, 'Grammar review'); }); };
    });
    if (!done.length) return `<div class="panel center"><h2>Grammar review</h2><p>Complete a lesson (quiz 70%+ or “Mark as completed”) and it will appear here for review.</p><a class="btn primary" href="#grammarlib">Open the Grammar Library</a></div>`;
    return `<div class="panel"><p class="eyebrow">Grammar review</p><h1>Review what you have completed</h1><p class="muted">A mixed quiz of up to 12 questions from your ${done.length} completed lesson${done.length > 1 ? 's' : ''}. Reviewing once a day earns XP.</p><div id="gr-quiz"></div><button class="btn primary" id="gr-start">Start mixed review</button></div>
      ${CATS.map(([k, n]) => { const ls = done.filter(id => G.lessons[id].cat === k); return ls.length ? `<div class="panel"><h3>${n}</h3><ol class="glist">${ls.map(id => { const l = G.lessons[id]; return `<li><a class="glrow done" href="#gl-${id}"><span class="gl-n">✓</span><span class="gl-t"><b>${esc(l.title)}</b><small>${esc(l.level)} · quiz best ${(gp()[id] || {}).best || 0}%</small></span><span class="gl-go">›</span></a></li>`; }).join('')}</ol></div>` : ''; }).join('')}`;
  };


  /* ---------- placement in the cities of each stage (lessons split evenly, in curriculum order) ---------- */
  G.assign = function (cat, cities) {
    const ids = catLessons(cat), n = cities.length, per = Math.ceil(ids.length / n);
    ids.forEach((id, i) => { G.lessons[id].city = cities[Math.min(n - 1, Math.floor(i / per))]; });
  };
  G.cityLessons = city => G.order.filter(id => G.lessons[id].city === city);
  G.backHref = id => { const l = G.lessons[id]; return l && l.city ? `#city-${l.city}-grammar` : '#grammarlib'; };
  const cg = H.cityGrammar;
  H.cityGrammar = function (c, sub, head) {
    const ids = G.cityLessons(c.id);
    let h = cg(c, sub, head);
    if (!ids.length) return h;
    if (!H.cityContent(c).ch.length) h = head; // city without story chapters: show only the course
    const d = ids.filter(G.done).length; const cat = G.lessons[ids[0]].cat; const units = G.cats[cat];
    const groups = []; ids.forEach(id => { const l = G.lessons[id]; let g = groups[groups.length - 1]; if (!g || g.unit !== l.unit) groups.push(g = { unit: l.unit, ids: [] }); g.ids.push(id); });
    const cityName = x => MA.CITY[x] ? (MA.CITY[x].short || MA.CITY[x].name) : x;
    const course = `<div class="panel ghero" id="grammar-course"><p class="eyebrow">${esc(levelOf(cat)[1])} grammar course · ${esc(levelOf(cat)[2])}</p><h2>Grammar course in ${esc(c.short || c.name)}</h2>
      <p class="muted">${ids.length} lessons from the ${esc(levelOf(cat)[1])} curriculum. Each lesson: explanation, tables, examples with audio, common mistakes, practice and a quiz (70% completes it).</p>
      <div class="row gap wrap"><span class="muted">${d}/${ids.length} completed</span><a class="btn small" href="#greview">↻ Grammar review</a></div>${UI.bar(d / ids.length)}</div>
      ${groups.map(g => { const u = units.find(x => x.id === g.unit); const ui = units.indexOf(u) + 1; const first = u.lessons[0], last = u.lessons[u.lessons.length - 1]; const fromCity = G.lessons[first].city, toCity = G.lessons[last].city;
        const cont = fromCity !== c.id ? ` <span class="pill">continued from ${esc(cityName(fromCity))}</span>` : ''; const next = toCity !== c.id ? ` <span class="pill">continues in ${esc(cityName(toCity))}</span>` : '';
        const dd = g.ids.filter(G.done).length;
        return `<details class="panel gunit" open><summary><div><p class="eyebrow">Unit ${ui}${cont}${next}</p><h3>${esc(u.title)}</h3><p class="tiny muted">${esc(u.en || '')}</p></div><div class="gu-prog"><small>${dd}/${g.ids.length}</small>${UI.bar(dd / g.ids.length)}</div></summary>
          <ol class="glist">${g.ids.map(id => { const l = G.lessons[id]; const p = gp()[id]; const n = u.lessons.indexOf(id) + 1; return `<li><a class="glrow ${G.done(id) ? 'done' : ''}" href="#gl-${id}"><span class="gl-n">${G.done(id) ? '✓' : n}</span><span class="gl-t"><b>${esc(l.title)}</b><small>${esc(l.level)} · ${esc(l.sub || '')}</small></span>${p && p.best ? `<span class="pill">Quiz best ${p.best}%</span>` : ''}<span class="gl-go">›</span></a></li>`; }).join('')}</ol></details>`; }).join('')}`;
    return h + course;
  };
  const cats0 = H.cats;
  H.cats = function (c) {
    const list = cats0(c); const ids = G.cityLessons(c.id); if (!ids.length) return list;
    return list.map(x => { if (x.key !== 'grammar') return x; const k = H.cityContent(c); const ld = k.lessons.filter(l => S.lessonDone(l.id)).length; const gd = ids.filter(G.done).length; const n = k.lessons.length + ids.length;
      return Object.assign({}, x, { n, p: n ? (ld + gd) / n : null, pText: `${ld + gd}/${n} completed · ${ids.length} in the grammar course` }); });
  };

  /* ---------- navigation: breadcrumbs, previous/next, catOf ---------- */
  const t0 = H.trail;
  H.trail = function (name = H.current.name, arg = H.current.arg) {
    const home = ['Home', '#home'], lib = ['Grammar Library', '#grammarlib'];
    if (name === 'grammarlib') { const c = CATS.find(x => x[0] === arg); return c ? [home, lib, [c[1], '#grammarlib-' + c[0]]] : [home, lib]; }
    if (name === 'greview') return [home, ['Grammar review', '#greview']];
    if (name === 'gl') { const l = G.lessons[arg]; if (!l) return [home, lib]; if (l.city && MA.CITY[l.city]) return [...t0('city', l.city + '-grammar'), [l.title, '#gl-' + arg]]; const c = levelOf(l.cat); return [home, lib, [c[1], '#grammarlib-' + c[0]], [l.title, '#gl-' + arg]]; }
    return t0(name, arg);
  };
  const s0 = H.seq;
  H.seq = function (name = H.current.name, arg = H.current.arg) {
    if (name === 'gl') { const l = G.lessons[arg]; const list = l && l.city ? G.cityLessons(l.city) : G.order; const i = list.indexOf(arg); if (i < 0) return {}; const f = id => id && [G.lessons[id].title, '#gl-' + id]; return { prev: f(list[i - 1]), next: f(list[i + 1]) }; }
    if (false) { const i = G.order.indexOf(arg); if (i < 0) return {}; const f = id => id && [G.lessons[id].title, '#gl-' + id]; return { prev: f(G.order[i - 1]), next: f(G.order[i + 1]) }; }
    return s0(name, arg);
  };
  if (H.catOf) { const c0 = H.catOf; H.catOf = (name, arg) => ['grammarlib', 'gl', 'greview'].includes(name) ? 'grammar' : c0(name, arg); }
})();
