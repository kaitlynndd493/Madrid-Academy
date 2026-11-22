/* MADRID ACADEMY — learning screens, social, RPG and settings + boot */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;

  /* ---------- VOCABULARY MUSEUM ---------- */
  const CATS = [['all', 'All'], ['saved', '★ My book'], ['greetings', 'Greetings'], ['people', 'People'], ['introductions', 'Introductions'], ['nationalities', 'Nationalities'], ['sounds', 'Sounds of Spain'], ['cafe', 'Café'], ['numbers', 'Numbers'], ['ordering', 'Ordering'], ['market', 'Market'], ['museum', 'Museum'], ['custom', 'From stories']];
  V.vocab = function (cat) {
    cat = cat || 'all';
    const all = MA.VOCAB.map(v => v.id).concat(Object.keys(st().custom));
    let ids = cat === 'all' ? MA.VOCAB.map(v => v.id) : cat === 'saved' ? Object.keys(st().vocab) : cat === 'custom' ? Object.keys(st().custom) : MA.VOCAB.filter(v => v.cat === cat).map(v => v.id);
    ids = ids.filter(id => S.word(id));
    H.after(view => { const q = view.querySelector('#vq'); q.oninput = () => { const t = U.deacc(U.norm(q.value)); view.querySelectorAll('.vgrid .vcard').forEach(c => { const w = S.word(c.dataset.word); c.hidden = t && !U.deacc(U.norm(w.es + ' ' + w.en)).includes(t); }); }; });
    return `<div class="panel"><p class="eyebrow">Alicante · A0–A1 · Vocabulary</p><h1>Vocabulary library</h1>
      <div class="stats3"><div><b>${Object.keys(st().vocab).length}</b><small>in your book</small></div><div><b>${S.due().length}</b><small>due for review</small></div><div><b>${S.mastered()}</b><small>mastered (7+ day interval)</small></div></div>
      <div class="row gap wrap"><a class="btn primary" href="#vocab-review">Review due cards (spaced repetition)</a></div>
      <h4>Practice games</h4><div class="games">${H.GAMES.map(g => `<a class="game" href="#game-${g[0]}"><span>${g[2]}</span><b>${esc(g[1])}</b><small>${esc(g[3])}</small></a>`).join('')}</div></div>
      <div class="panel"><div class="chips filter">${CATS.map(([k, l]) => `<a class="chip ${k === cat ? 'on' : ''}" href="#city-alicante-vocabulary-${k}">${l}</a>`).join('')}</div>
      <input type="text" id="vq" placeholder="Search Spanish or English…" aria-label="Search words">
      <div class="vgrid">${ids.map(H.vcard).join('') || '<p class="muted">No words here yet.</p>'}</div>
      <p class="tiny muted">Concrete words show stylized, pre-drawn 3D-style illustrations (vector art, not live 3D models). Abstract words use symbolic art or a letter card.</p></div>`;
  };
  V['vocab-review'] = function () {
    const due = S.due(); let queue = U.shuffle(due).slice(0, 20); let done = 0;
    if (!Object.keys(st().vocab).length) return `<div class="panel center"><h2>Your vocabulary book is empty</h2><p>Complete a lesson or save words with ☆ to start spaced-repetition reviews.</p><a class="btn primary" href="#academy">Go to lessons</a></div>`;
    if (!queue.length) { const nextDue = Math.min(...Object.values(st().vocab).map(v => v.due)); return `<div class="panel center"><h2>¡Todo al día! Nothing to review.</h2><p>Next card is due ${H.fmtDate(nextDue)}.</p><div class="row gap center"><a class="btn" href="#game-mc">Play a quiz instead</a><a class="btn ghost" href="#vocab">Back to the museum</a></div></div>`; }
    H.after(view => {
      const box = view.querySelector('#srs');
      const show = () => {
        if (!queue.length) {
          if (done >= 5) S.award('srs:' + S.today(), 15, 5, 'Vocabulary review');
          box.innerHTML = `<div class="result"><h2>Review finished</h2><p>You reviewed ${done} cards. ${done >= 5 ? '' : 'Review at least 5 cards in a day for XP.'}</p><a class="btn primary" href="#vocab">Back to the museum</a></div>`; return;
        }
        const id = queue[0], w = S.word(id), c = st().vocab[id];
        box.innerHTML = `<p class="muted">${queue.length} left</p><div class="srs-card"><div class="vc-ill">${w.img && MA.hasIllustration(w.img) ? MA.illustration(w.img) : ''}</div><h2 class="es">${esc(w.es)} ${UI.spk(w.es)}</h2><div class="srs-back" hidden><p class="en">${esc(w.en)}</p><p class="ipa">/${esc(w.ipa || U.autoIPA(w.es))}/</p>${w.ex ? `<p class="es">${esc(w.ex)}</p><p class="muted">${esc(w.exEn || '')}</p>` : ''}</div>
          <button class="btn primary" id="flip">Show meaning</button><div class="grades" hidden>${[['Again', '< 10 min'], ['Hard', ''], ['Good', ''], ['Easy', '']].map((g, q) => `<button class="btn ${q === 0 ? 'danger' : q === 2 ? 'primary' : ''}" data-q="${q}">${g[0]}<small>${q === 0 ? g[1] : preview(c, q)}</small></button>`).join('')}</div></div>`;
        box.querySelector('#flip').onclick = () => { box.querySelector('.srs-back').hidden = false; box.querySelector('.grades').hidden = false; box.querySelector('#flip').remove(); box.querySelector('[data-q="2"]').focus(); };
        box.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { const q = +b.dataset.q; S.grade(id, q); done++; queue.shift(); if (q === 0) queue.push(id); show(); });
      };
      const preview = (c, q) => { const reps = c.reps + 1; const iv = reps === 1 ? (q === 1 ? 1 : q === 3 ? 3 : 1) : reps === 2 ? (q === 1 ? 2 : q === 3 ? 6 : 3) : Math.round(c.interval * c.ease * (q === 1 ? 0.8 : q === 3 ? 1.3 : 1)); return iv + 'd'; };
      show();
    });
    return `<div class="panel"><h1>Spaced repetition review</h1><p class="muted">Say the meaning in your head, then flip. Be honest: the schedule adapts to your answer.</p><div id="srs"></div></div>`;
  };

  /* ---------- GAMES (generated from real vocabulary) ---------- */
  H.GAMES = [['mc', 'Meaning quiz', '❓', 'Choose the English meaning'], ['match', 'Matching', '🧩', 'Pair Spanish and English'], ['spell', 'Spelling', '✍️', 'Hear it, write it'], ['listen', 'Listening ID', '👂', 'Pick the word you hear'], ['build', 'Sentence builder', '🧱', 'Order example sentences'], ['grammar', 'Timed grammar', '⏱️', '60 seconds of verb forms'], ['prices', 'Market prices', '💶', 'Understand prices in euros']];
  const pool = () => { const known = new Set(Object.keys(st().vocab).filter(id => MA.V[id])); const base = known.size >= 8 ? [...known].map(id => MA.V[id]) : MA.VOCAB.filter(v => ['greetings', 'cafe', 'nationalities', 'sounds'].includes(v.cat)); return base; };
  const NUM = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
  const TENS = { 10: 'diez', 20: 'veinte', 30: 'treinta', 40: 'cuarenta', 50: 'cincuenta' };
  const priceSay = (e, c) => `${e === 1 ? 'un euro' : NUM[e] + ' euros'}${c ? ' con ' + TENS[c] : ''}`;
  const priceTxt = (e, c) => `${e},${String(c).padStart(2, '0')} €`;
  H.genGame = function (g) {
    const P = U.shuffle(pool());
    const opts = (right, field, n = 3) => U.shuffle([right, ...U.shuffle(P.filter(x => x[field] !== right[field])).slice(0, n)]);
    if (g === 'mc') return P.slice(0, 8).map(w => { const o = opts(w, 'en'); return { t: 'mc', q: `What does “${w.es}” mean?`, o: o.map(x => x.en), a: o.indexOf(w), skill: 'vocab' }; });
    if (g === 'listen') return P.slice(0, 8).map(w => { const o = opts(w, 'es'); return { t: 'listen', say: w.es.replace(/…/g, ''), o: o.map(x => x.es), a: o.indexOf(w), skill: 'listening' }; });
    if (g === 'spell') return P.filter(w => !/[¿…\/]/.test(w.es)).slice(0, 8).map(w => ({ t: 'fill', q: `${w.en}  →  ___`, a: [w.es], skill: 'vocab', hint: 'Press 🔊 on the card first if you need it', ex: `${w.es} /${w.ipa}/` }));
    if (g === 'match') return [0, 1].map(k => ({ t: 'match', p: P.slice(k * 5, k * 5 + 5).map(w => [w.es, w.en]), skill: 'vocab' }));
    if (g === 'build') return P.filter(w => w.ex && w.ex.split(' ').length >= 3 && w.ex.split(' ').length <= 7 && !w.ex.includes('—') && !w.ex.includes('/')).slice(0, 6).map(w => ({ t: 'order', w: w.ex.replace(/[¿¡.?!,]/g, '').split(' '), a: [w.ex], en: w.exEn, skill: 'grammar' }));
    if (g === 'prices') return Array.from({ length: 8 }, () => { const e = 1 + Math.floor(Math.random() * 19), c = [0, 10, 20, 30, 40, 50][Math.floor(Math.random() * 6)]; const right = priceTxt(e, c); const o = new Set([right]); while (o.size < 4) { const e2 = U.clamp(e + [-1, 1, 10, -10, 2][Math.floor(Math.random() * 5)], 1, 20), c2 = [0, 10, 20, 30, 40, 50][Math.floor(Math.random() * 6)]; o.add(priceTxt(e2, c2)); } const arr = U.shuffle([...o]); return { t: 'listen', say: 'Son ' + priceSay(e, c), o: arr, a: arr.indexOf(right), skill: 'listening' }; });
    return [];
  };
  V.game = function (g) {
    const meta = H.GAMES.find(x => x[0] === g); if (!meta) return V.vocab();
    if (g === 'grammar') return H.timedGrammar();
    const items = H.genGame(g);
    if (!items.length) return `<div class="panel"><p>Not enough words for this game yet. Save more words first.</p><a class="btn" href="#vocab">Back</a></div>`;
    H.after(view => UI.runExercises(view.querySelector('#gbox'), items, {
      mode: 'lesson', src: 'game:' + g, onDone: res => {
        const sc = Math.round(100 * res.reduce((a, r) => a + (r ? r.score : 0), 0) / items.length);
        S.award('game:' + g + ':' + S.today(), 10, 5, 'Mini-game');
        view.querySelector('#gbox').innerHTML = `<div class="result"><div class="score-ring" style="--p:${sc}"><span>${sc}%</span></div><h3>${esc(meta[1])} complete</h3><p class="muted">Mini-game XP is given once per game per day.</p><div class="row gap center"><button class="btn primary" id="again">Play again</button><a class="btn ghost" href="#vocab">Museum</a></div></div>`;
        view.querySelector('#again').onclick = () => H.render();
      }
    }));
    return `<div class="panel"><h1>${meta[2]} ${esc(meta[1])}</h1><p class="muted">${esc(meta[3])}. Uses ${Object.keys(st().vocab).length >= 8 ? 'words from your vocabulary book' : 'core A1 words (save 8+ words to use your own)'}.</p><div id="gbox"></div></div>`;
  };
  H.timedGrammar = function () {
    const VERBS = { ser: ['soy', 'eres', 'es', 'somos', 'sois', 'son'], tomar: ['tomo', 'tomas', 'toma', 'tomamos', 'tomáis', 'toman'] };
    const PR = [['yo', 0], ['tú', 1], ['él', 2], ['ella', 2], ['usted', 2], ['nosotros', 3], ['nosotras', 3], ['vosotros', 4], ['vosotras', 4], ['ellos', 5], ['ellas', 5], ['ustedes', 5]];
    H.after(view => {
      const box = view.querySelector('#tg'); let score = 0, n = 0, end = 0, timer;
      const q = () => {
        const verb = Math.random() < 0.6 ? 'ser' : 'tomar'; const [p, k] = PR[Math.floor(Math.random() * PR.length)];
        const right = VERBS[verb][k]; const o = U.shuffle([...new Set([right, ...U.shuffle(VERBS[verb]).slice(0, 4)])].slice(0, 4)); if (!o.includes(right)) o[0] = right;
        const oo = U.shuffle(o);
        box.querySelector('.tg-q').innerHTML = `<p class="big es">${p} + <b>${verb}</b></p><div class="opts">${oo.map(x => `<button class="opt">${x}</button>`).join('')}</div>`;
        box.querySelectorAll('.opt').forEach(b => b.onclick = () => { n++; const ok = b.textContent === right; if (ok) score++; S.record('grammar', ok, ok ? null : { src: 'game:grammar', prompt: p + ' + ' + verb, expected: right, given: b.textContent }); b.classList.add(ok ? 'right' : 'wrong'); setTimeout(q, ok ? 150 : 600); });
      };
      view.querySelector('#tg-start').onclick = e => {
        e.target.remove(); end = Date.now() + 60000; box.innerHTML = '<div class="tg-time"></div><div class="tg-q"></div>'; q();
        timer = setInterval(() => { const left = Math.max(0, Math.ceil((end - Date.now()) / 1000)); const t = box.querySelector('.tg-time'); if (t) t.textContent = `⏱ ${left}s · ${score}/${n}`; if (left <= 0) { clearInterval(timer); S.save(); S.award('game:grammar:' + S.today(), 10, 5, 'Timed grammar'); box.innerHTML = `<div class="result"><h2>${score} correct out of ${n}</h2><p>${U.pct(score, n)}% accuracy</p><button class="btn primary" id="tg-again">Play again</button></div>`; box.querySelector('#tg-again').onclick = () => H.render(); } }, 250);
      };
    });
    return `<div class="panel"><h1>⏱️ Timed grammar</h1><p>Choose the correct form of <b>ser</b> or <b>tomar</b> as fast as you can. Includes vosotros forms.</p><button class="btn primary big" id="tg-start">Start · 60 seconds</button><div id="tg"></div></div>`;
  };

  /* ---------- GRAMMAR & WRITING ---------- */
  H.WRITING = [
    { id: 'w-intro', city: 'alicante', level: 'A1', title: 'Introduce yourself', prompt: 'Write 4–5 sentences introducing yourself: name, nationality, city, what you study, and one thing you like about Alicante.', sample: 'Me llamo Sofía. Soy canadiense, de Vancouver. Soy estudiante de español en la Academia Costa Blanca. Me gusta mucho la playa del Postiguet.', minWords: 18, rubric: ['Name and nationality', 'Correct forms of ser', 'Feminine agreement where needed', 'Spelling and accents'] },
    { id: 'w-email', city: 'alicante', level: 'A1', title: 'Email to the academy', prompt: 'Write a short email to the Academia Costa Blanca. Greet them, introduce yourself, and ask what time the A1 class starts. End with “Un saludo”.', sample: 'Hola:\nMe llamo Sofía y soy estudiante nueva. Soy canadiense.\n¿A qué hora empieza la clase de A1?\nUn saludo,\nSofía', minWords: 18, rubric: ['Greeting and closing', 'Introduces herself', 'Asks the question with ¿…?', 'Polite tone'] },
    { id: 'w-postcard', city: 'alicante', level: 'A1', title: 'Postcard from Alicante', prompt: 'Write a postcard to a friend: you are in Alicante, the city is beautiful, you are a student, and you have a café con leche every morning.', sample: '¡Hola, Ana! Estoy en Alicante. La ciudad es preciosa. Soy estudiante en una academia. Cada mañana tomo un café con leche. ¡Un beso!', minWords: 20, rubric: ['All four ideas included', 'Correct tomar form', 'Correct articles', 'Natural greeting and goodbye'] },
    { id: 'w-cafe', city: 'alicante', level: 'A1', title: 'Café dialogue', prompt: 'Write a 6-line dialogue at a café in Alicante between you and Javi. Order, answer “¿Algo más?”, and pay.', sample: '—¡Buenas! ¿Qué te pongo?\n—¿Me pones un cortado, por favor?\n—¿Algo más?\n—Sí, un cruasán.\n—Son tres euros con diez.\n—Gracias, hasta luego.', minWords: 20, rubric: ['Ordering expression', 'Articles un/una correct', 'Price expression', 'Polite words'] },
    { id: 'w-story', city: 'alicante', level: 'A1', title: 'Story challenge: a new ending', prompt: 'Write a new ending for Caperucita Roja in 4–5 simple sentences. Use: el lobo, la abuela, de repente, al final.', sample: 'De repente, la abuela abre la puerta. El lobo tiene miedo. La abuela dice: «¡Fuera!». Al final, el lobo es vegetariano y vive en el Retiro.', minWords: 20, rubric: ['Uses the four expressions', 'Present tense verbs', 'Clear story order', 'Spelling and accents'] }
  ];
  V.grammar = function () {
    const gl = Object.values(MA.LESSONS).filter(l => l.table || l.mistakes);
    return `<div class="panel"><p class="eyebrow">Gramática y escritura</p><h1>Grammar & Writing Academy</h1><p class="muted">Explanations are in English, examples in European Spanish.</p></div>
      <div class="panel"><h3>Grammar lessons</h3><ul class="list">${gl.map(l => `<li><span><b class="es">${esc(l.title)}</b> · ${esc(l.en)}${l.table ? ` <span class="tag">${esc(l.table.title.split('—')[0].trim())}</span>` : ''}</span><a class="btn small ${S.lessonDone(l.id) ? 'ghost' : 'primary'}" href="#lesson-${l.id}">${S.lessonDone(l.id) ? 'Revisit' : 'Start'}</a></li>`).join('')}</ul>
      <h4>Drills</h4><div class="row gap wrap"><a class="btn" href="#game-grammar">⏱️ Timed verb forms</a><a class="btn" href="#game-build">🧱 Sentence builder</a></div></div>
      <div class="panel"><h3>Writing Studio</h3><p class="muted">${MA.AI.ok() ? 'Get AI feedback from Claude on grammar, vocabulary, word order and naturalness — or grade yourself with a rubric.' : 'AI feedback is not available on this page right now. You can still write and grade yourself with the rubric and sample answer.'}</p>
      <div class="acts">${H.WRITING.map(w => { const r = st().writings[w.id]; return `<a class="panel act" href="#write-${w.id}"><span><b>${esc(w.title)}</b><small>${r ? `done · ${Math.round(r.score * 100)}% (${r.method === 'ai' ? 'AI' : 'self'})` : 'A1'}</small></span><span>→</span></a>`; }).join('')}<a class="panel act" href="#journal"><span><b>My Spanish journal</b><small>free writing</small></span><span>→</span></a></div></div>`;
  };
  V.write = function (id) {
    const w = H.WRITING.find(x => x.id === id); if (!w) return V.grammar();
    H.after(view => UI.R.write(w, view.querySelector('#wbox'), res => {
      st().writings[id] = { t: Date.now(), score: res.score, method: res.method, text: res.given.slice(0, 1500) }; S.save(true);
      S.award('write:' + id, 20, 10, 'Writing task');
    }, { exam: false }));
    return `<div class="panel"><h1>${esc(w.title)}</h1><div id="wbox" class="ex-card"></div></div>`;
  };
  V.journal = function () {
    H.after(view => {
      view.querySelector('#j-save').onclick = () => { const t = view.querySelector('#j-text').value.trim(); if (!t) return; st().journal.unshift({ id: U.uid(), t: Date.now(), text: t.slice(0, 3000) }); S.save(true); S.award('journal:' + S.today(), 10, 5, 'Journal entry'); H.render(); };
      view.querySelectorAll('[data-jfb]').forEach(b => b.onclick = async () => {
        const e = st().journal.find(x => x.id === b.dataset.jfb); b.disabled = true; b.textContent = 'Reading…';
        try { const fb = await MA.AI.writingFeedback('Free journal entry about the learner’s day', e.text); b.closest('li').insertAdjacentHTML('beforeend', UI.feedbackHTML(fb)); b.remove(); }
        catch (er) { b.textContent = 'AI unavailable'; }
      });
    });
    return `<div class="panel"><h1>Mi diario · Spanish journal</h1><p class="muted">Write a few sentences about your day. Short and simple is perfect.</p>
      <textarea id="j-text" rows="5" placeholder="Hoy…"></textarea>${UI.accentBar()}<button class="btn primary" id="j-save">Save entry</button></div>
      <div class="panel"><ul class="journal">${st().journal.map(e => `<li><small class="muted">${H.fmtDate(e.t)}</small><p class="es pre">${esc(e.text)}</p>${MA.AI.ok() ? `<button class="btn small ghost" data-jfb="${e.id}">✨ AI feedback</button>` : ''}</li>`).join('') || '<li class="muted">No entries yet.</li>'}</ul></div>`;
  };

  /* ---------- INTERACTIVE READER (shared by stories + radio) ---------- */
  H.tokenize = function (s, phrases = {}) {
    const keys = Object.keys(phrases).sort((a, b) => b.length - a.length); const low = s.toLowerCase(); const out = []; let i = 0; const L = /[a-záéíóúüñ]/i;
    while (i < s.length) {
      let m = null;
      if (i === 0 || !L.test(s[i - 1])) for (const k of keys) if (low.startsWith(k, i) && !L.test(s[i + k.length] || ' ')) { m = k; break; }
      if (m) { out.push({ t: s.substr(i, m.length), p: m }); i += m.length; continue; }
      const w = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/.exec(s.slice(i));
      if (w) { out.push({ t: w[0], w: w[0].toLowerCase() }); i += w[0].length; } else { out.push({ t: s[i] }); i++; }
    }
    return out;
  };
  H.savedForms = () => { const set = new Set(); Object.keys(st().vocab).forEach(id => { const w = S.word(id); if (w) set.add(U.norm(w.es)); }); return set; };
  H.renderTokens = (s, phrases, si, saved) => H.tokenize(s, phrases).map(tk => tk.p ? `<button class="w ph ${saved.has(tk.p) ? 'saved' : ''}" data-p="${esc(tk.p)}" data-s="${si}">${esc(tk.t)}</button>` : tk.w ? `<button class="w ${saved.has(tk.w) ? 'saved' : ''}" data-lw="${esc(tk.w)}" data-s="${si}">${esc(tk.t)}</button>` : esc(tk.t)).join('');
  H.globalGloss = () => { const g = {}; MA.STORIES.forEach(s => Object.assign(g, s.gloss)); return g; };
  H.lookup = function ({ word, phrase, sentence, sentenceEn, gloss, phrases, source }) {
    const key = phrase || word;
    const ent = phrase ? phrases[phrase] : (gloss && gloss[word]) || H.globalGloss()[word];
    const vocab = MA.VOCAB.find(v => U.norm(v.es) === key || U.norm(v.es.split(' / ')[0]) === key || U.norm(v.es.split(' / ')[1] || '') === key);
    const ipa = vocab && vocab.ipa && !vocab.ipa.includes('/') ? vocab.ipa : key.split(' ').map(U.autoIPA).join(' ');
    const id = vocab ? vocab.id : 'x:' + key; const saved = !!st().vocab[id];
    UI.modal(`<div class="lookup"><p class="eyebrow">${phrase ? 'Expression' : 'Word'} · ${esc(source || '')}</p>
      <h2 class="es">${esc(key)} ${UI.spk(key)}</h2>
      ${ent || vocab ? `<p class="en">${esc((ent && ent.en) || vocab.en)}</p>` : `<p class="muted">This word is not in the built-in glossary yet.</p>`}
      <p><span class="ipa">/${esc(ipa)}/</span> <span class="tiny muted">IPA · Castilian${vocab && vocab.ipa ? '' : ' · rule-based'}</span></p>
      <p class="chips">${ent && ent.pos ? `<span class="tag">${esc(ent.pos)}</span>` : vocab ? `<span class="tag">${esc(vocab.pos)}</span>` : ''}${ent && ent.gram ? `<span class="tag">${esc(ent.gram)}</span>` : ''}${vocab && vocab.gender ? `<span class="tag">${esc(vocab.gender)}</span>` : ''}</p>
      <h5>In this sentence</h5><p class="es">${esc(sentence)}</p>${sentenceEn ? `<p class="muted">${esc(sentenceEn)}</p>` : ''}${ent && ent.ctx ? `<p class="note">${esc(ent.ctx)}</p>` : ''}
      ${vocab && vocab.ex ? `<h5>Another example</h5><p class="es">${esc(vocab.ex)} ${UI.spk(vocab.ex)}</p><p class="muted">${esc(vocab.exEn)}</p>` : ''}
      <div class="ai-slot"></div>
      <div class="row gap wrap"><button class="btn ${saved ? 'ghost' : 'primary'}" id="lk-save">${saved ? '★ Saved' : '☆ Save to vocabulary book'}</button>${MA.AI.ok() ? '<button class="btn ghost" id="lk-ai">✨ Explain in context (Claude)</button>' : ''}</div></div>`, c => {
      c.querySelector('#lk-save').onclick = () => {
        if (st().vocab[id]) return;
        S.saveWord(id, vocab ? null : { id, es: key, en: (ent && ent.en) || '(see note)', ipa, pos: (ent && ent.pos) || '', ex: sentence, exEn: sentenceEn || '', cat: 'custom', note: ent && (ent.ctx || ent.gram) || '' });
        UI.toast('★ Saved — it will appear in your reviews'); c.querySelector('#lk-save').textContent = '★ Saved'; U.$$('#view .w').forEach(b => { if ((b.dataset.lw || b.dataset.p) === key) b.classList.add('saved'); });
      };
      const ai = c.querySelector('#lk-ai'); if (ai) ai.onclick = async () => {
        ai.disabled = true; c.querySelector('.ai-slot').innerHTML = '<p class="muted">Asking Claude…</p>';
        try {
          const r = await MA.AI.json(`Explain the Spanish ${phrase ? 'expression' : 'word'} "${key}" as used in this sentence from European Spanish: "${sentence}". Learner level A1, explanation in simple English. Return ONLY JSON: {"meaning_here":"", "lemma":"dictionary form", "grammar":"short grammar info", "usage":"1-2 short sentences on how it is used", "example_es":"another simple example (Spain Spanish)", "example_en":""}`, { modelTier: 'quick' });
          c.querySelector('.ai-slot').innerHTML = `<div class="aifb"><span class="pill ai">Claude</span><p><b>${esc(r.meaning_here)}</b> · <span class="muted">${esc(r.lemma)} — ${esc(r.grammar)}</span></p><p>${esc(r.usage)}</p><p class="es">${esc(r.example_es)} ${UI.spk(r.example_es)}</p><p class="muted">${esc(r.example_en)}</p></div>`;
        } catch (e) { c.querySelector('.ai-slot').innerHTML = `<p class="warn-box">AI unavailable (${esc(e.code || 'error')}).</p>`; }
      };
    });
  };

  /* ---------- FAIRY TALE LIBRARY ---------- */
  V.library = function () {
    if (!H.placeUnlocked('biblioteca')) return H.lockedScreen('Biblioteca Encantada', 'The Enchanted Library opens after lesson 1.2.', ['#lesson-c1l2', 'Go to lesson 1.2']);
    return `<div class="panel scene-head">${MA.sceneSVG('biblioteca')}<div class="scene-title"><p class="eyebrow">Biblioteca Encantada</p><h1>Fairy Tale Library</h1></div><div class="scene-npc">${H.portrait(MA.NPCS.rosario.look, 'lg')}<span>Doña Rosario</span></div></div>
      <div class="shelf">${MA.STORIES.map(s => { const un = S.unlocked(s.unlock); const r = st().stories[s.id] || {}; return `<a class="panel book ${un ? '' : 'locked'}" href="${un ? '#story-' + s.id : '#library'}"><span class="spine">${un ? '📖' : '🔒'}</span><b class="es">${esc(s.title)}</b><small>${esc(s.en)} · ${s.level}</small><small>${un ? (r.read ? `✓ read${r.quiz != null ? ` · quiz ${r.quiz}%` : ''}` : `${s.sentences.length} sentences`) : 'Unlocks after lesson 2.1'}</small></a>`; }).join('')}
      <div class="panel book locked"><span class="spine">📕</span><b class="es">Cenicienta</b><small>Cinderella · A2</small><small>planned</small></div><div class="panel book locked"><span class="spine">📗</span><b class="es">El gato con botas</b><small>Puss in Boots · A2</small><small>planned</small></div><div class="panel book locked"><span class="spine">📘</span><b class="es">Blancanieves</b><small>Snow White · B1</small><small>planned</small></div></div>
      <p class="tiny muted">All stories are original simplified adaptations of public-domain tales.</p>`;
  };
  V.story = function (id) {
    const s = MA.STORIES.find(x => x.id === id); if (!s) return V.library();
    const saved = H.savedForms(); let fs = 1.15; try { fs = +localStorage.getItem('ma-fs') || 1.15; } catch (e) { }
    H.after(view => {
      const txt = view.querySelector('.story-text'); txt.style.fontSize = fs + 'rem';
      view.querySelectorAll('[data-fs]').forEach(b => b.onclick = () => { fs = U.clamp(fs + +b.dataset.fs, 0.9, 1.8); txt.style.fontSize = fs + 'rem'; try { localStorage.setItem('ma-fs', fs); } catch (e) { } });
      view.querySelector('#tr-all').onchange = e => txt.classList.toggle('show-tr', e.target.checked);
      txt.addEventListener('click', e => {
        const tb = e.target.closest('[data-tr]'); if (tb) { tb.closest('.sent').classList.toggle('open'); return; }
        const b = e.target.closest('.w'); if (!b) return; const si = +b.dataset.s;
        H.lookup({ word: b.dataset.lw, phrase: b.dataset.p, sentence: s.sentences[si][0], sentenceEn: s.sentences[si][1], gloss: s.gloss, phrases: s.phrases, source: s.title });
      });
      const play = view.querySelector('#narrate'), stop = view.querySelector('#stopn');
      play.onclick = async () => {
        play.disabled = true; stop.disabled = false;
        await MA.Audio.speakLines(s.sentences.map(x => ({ text: x[0], voice: 'airy' })), i => { view.querySelectorAll('.sent').forEach((el, k) => el.classList.toggle('reading', k === i)); const el = view.querySelectorAll('.sent')[i]; el && el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
        view.querySelectorAll('.sent').forEach(el => el.classList.remove('reading')); play.disabled = false; stop.disabled = true;
      };
      stop.onclick = () => { MA.Audio.stopLines(); play.disabled = false; stop.disabled = true; };
      view.querySelector('#finish').onclick = () => { st().stories[id] = Object.assign(st().stories[id] || {}, { read: Date.now() }); S.save(true); S.award('story:' + id, 25, 10, 'Story read'); H.render(); };
      if (view.querySelector('#quiz')) view.querySelector('#quiz').onclick = e => {
        e.target.remove(); const items = s.quiz.map(q => ({ t: 'mc', q: q.q, o: q.o, a: q.a, skill: 'reading' }));
        UI.runExercises(view.querySelector('#qbox'), items, { mode: 'lesson', src: 'story:' + id, onDone: res => { const p = Math.round(100 * res.reduce((a, r) => a + (r ? r.score : 0), 0) / items.length); st().stories[id] = Object.assign(st().stories[id] || {}, { quiz: Math.max(p, (st().stories[id] || {}).quiz || 0) }); S.save(true); if (p >= 75) S.award('storyquiz:' + id, 20, 10, 'Reading quiz'); view.querySelector('#qbox').innerHTML = `<div class="result"><h3>Reading comprehension: ${p}%</h3><p>${p >= 75 ? '¡Muy bien!' : 'Score 75% or more for the reward. Try again any time.'}</p></div>`; } });
      };
    });
    const r = st().stories[id] || {};
    return `<div class="panel reader-head"><p class="eyebrow">${s.level} · original adaptation</p><h1 class="es">${esc(s.title)}</h1><p class="muted">${esc(s.en)} · Tap any word or <span class="ph-demo">highlighted expression</span> for its meaning.</p>
      <div class="reader-tools row gap wrap"><button class="btn small" id="narrate">▶ Narrate</button><button class="btn small ghost" id="stopn" disabled>■ Stop</button>
      <span class="sep"></span><button class="btn small ghost" data-fs="-0.1" aria-label="Smaller text">A−</button><button class="btn small ghost" data-fs="0.1" aria-label="Larger text">A+</button>
      <label class="chk"><input type="checkbox" id="tr-all"> English translation</label></div>
      <p class="tiny muted">Narration: ${esc(MA.Audio.label())}.</p></div>
      <div class="panel story-text">${s.sentences.map((x, i) => `<p class="sent"><span class="es">${H.renderTokens(x[0], s.phrases, i, saved)}</span> <button class="trbtn" data-tr="${i}" aria-label="Translate sentence ${i + 1}">EN</button><span class="tr">${esc(x[1])}</span></p>`).join('')}</div>
      <div class="panel row gap wrap"><button class="btn ${r.read ? 'ghost' : 'primary'}" id="finish">${r.read ? '✓ Finished reading' : 'I finished reading (+25 XP)'}</button></div>`;
  };

  /* ---------- MADRID RADIO ---------- */
  V.radio = function (id) {
    if (id) return H.episode(id);
    return `<div class="panel scene-head">${MA.sceneSVG('radio')}<div class="scene-title"><p class="eyebrow">101.3 FM · en español de España</p><h1>Madrid Radio</h1></div></div>
      <div class="panel"><p><b>Honest note:</b> episodes are scripted for this game and played with <b>text-to-speech</b> (${esc(MA.Audio.label())}). They are not recorded human podcasts. ${MA.Audio.source() ? '' : '<span class="bad">No audio source is available here, so you can read the transcripts.</span>'}</p></div>
      <div class="acts">${MA.RADIO.map(e => { const un = S.unlocked(e.unlock); const r = st().radio[e.id] || {}; return `<a class="panel act ${un ? '' : 'locked'}" href="${un ? '#radio-' + e.id : '#radio'}"><span><b class="es">${esc(e.title)}</b><small>${esc(e.type)} · ${e.level} · ${un ? esc(e.desc) : 'Unlocks after lesson 2.1'}${r.quiz != null ? ` · quiz ${r.quiz}%` : ''}</small></span><span>${un ? '▶' : '🔒'}</span></a>`; }).join('')}
      <div class="panel act locked"><span><b>Debates, interviews, news (B1–C2)</b><small>planned for higher levels</small></span><span>🔒</span></div></div>`;
  };
  H.episode = function (id) {
    const e = MA.RADIO.find(x => x.id === id); if (!e) return V.radio();
    let rate = st().profile.rate || 1; const saved = H.savedForms();
    H.after(view => {
      const lines = view.querySelectorAll('.rline'); const play = view.querySelector('#rplay'), pause = view.querySelector('#rpause'), stop = view.querySelector('#rstop');
      let playing = false, paused = false;
      const hl = i => { lines.forEach((l, k) => l.classList.toggle('reading', k === i)); lines[i] && lines[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
      const run = async (from = 0) => { playing = true; paused = false; play.disabled = true; pause.disabled = false; stop.disabled = false; await MA.Audio.speakLines(e.lines.slice(from).map(l => ({ text: l[1], voice: e.voices[l[0]] })), i => hl(i + from), rate); playing = false; play.disabled = false; pause.disabled = true; stop.disabled = true; lines.forEach(l => l.classList.remove('reading')); };
      play.onclick = () => run(0);
      pause.onclick = () => { if (!playing) return; if (paused) { MA.Audio.resume(); pause.textContent = '❚❚ Pause'; } else { MA.Audio.pause(); pause.textContent = '▶ Resume'; } paused = !paused; };
      stop.onclick = () => { MA.Audio.stopLines(); };
      view.querySelector('#rrate').onchange = ev => { rate = +ev.target.value; try { MA.Audio.tts && MA.Audio.tts.setRate(rate); } catch (x) { } };
      view.querySelector('#rtr').onchange = ev => view.querySelector('.transcript').classList.toggle('show-tr', ev.target.checked);
      view.querySelector('.transcript').addEventListener('click', ev => {
        const rp = ev.target.closest('[data-replay]'); if (rp) { MA.Audio.speak(e.lines[+rp.dataset.replay][1], { voice: e.voices[e.lines[+rp.dataset.replay][0]], rate }); hl(+rp.dataset.replay); return; }
        const b = ev.target.closest('.w'); if (!b) return; const li = e.lines[+b.dataset.s];
        H.lookup({ word: b.dataset.lw, sentence: li[1], sentenceEn: li[2], gloss: H.globalGloss(), phrases: {}, source: 'Madrid Radio' });
      });
      view.querySelector('#rquiz').onclick = ev => {
        ev.target.remove();
        const items = e.quiz.map(q => ({ t: 'mc', q: q.q, o: q.o, a: q.a, skill: 'listening' })).concat(e.dictation.map(d => ({ t: 'listen-dict', say: d, skill: 'listening' })));
        UI.runExercises(view.querySelector('#rq'), items, { mode: 'lesson', src: 'radio:' + id, onDone: res => { const p = Math.round(100 * res.reduce((a, r) => a + (r ? r.score : 0), 0) / items.length); st().radio[id] = { done: Date.now(), quiz: Math.max(p, (st().radio[id] || {}).quiz || 0) }; S.save(true); if (p >= 70) S.award('radio:' + id, 25, 10, 'Radio episode'); view.querySelector('#rq').innerHTML = `<div class="result"><h3>Listening score: ${p}%</h3><p>${p >= 70 ? '¡Genial!' : 'Score 70% or more for the reward.'}</p></div>`; } });
      };
    });
    return `<div class="panel"><p class="eyebrow">${esc(e.type)} · ${e.level}</p><h1 class="es">${esc(e.title)}</h1><p class="muted">${esc(e.desc)}</p>
      <div class="player"><button class="btn primary" id="rplay">▶ Play</button><button class="btn ghost" id="rpause" disabled>❚❚ Pause</button><button class="btn ghost" id="rstop" disabled>■ Stop</button>
      <label>Speed <select id="rrate">${[0.75, 0.9, 1, 1.15, 1.3].map(r => `<option value="${r}" ${r === rate ? 'selected' : ''}>${r}×</option>`).join('')}</select></label><label class="chk"><input type="checkbox" id="rtr"> English</label></div>
      <p class="tiny muted">Audio: ${esc(MA.Audio.label())}. Line highlighting follows the speech. Tap 🔁 to replay a line; tap any word to look it up.</p></div>
      <div class="panel transcript">${e.lines.map((l, i) => `<div class="rline"><b class="who">${esc(e.names[l[0]])}</b><span class="es">${H.renderTokens(l[1], {}, i, saved)}</span> <button class="trbtn" data-replay="${i}" aria-label="Replay line">🔁</button><span class="tr">${esc(l[2])}</span></div>`).join('')}</div>
      <div class="panel"><button class="btn primary" id="rquiz">Comprehension questions + dictation</button><div id="rq"></div></div>`;
  };
  UI.R['listen-dict'] = (it, body, done, ctx) => {
    body.innerHTML = `<p class="q">Dictation: listen and write exactly what you hear.</p><button class="btn big-spk" data-say="${esc(it.say)}">🔊 Play</button>${MA.Audio.source() ? '' : `<p class="warn-box">No audio here. Sentence: ${esc(it.say)}</p>`}<input type="text" id="dct" aria-label="Dictation">${UI.accentBar()}<button class="btn primary" id="chk">Check</button><div class="diff"></div>`;
    body.querySelector('#chk').onclick = () => {
      const g = body.querySelector('#dct').value; const tw = U.norm(it.say).split(' '), gw = U.norm(g).split(' ');
      let ok = 0; const diff = tw.map((w, k) => { const hit = U.deacc(gw[k] || '') === U.deacc(w); if (hit) ok++; return `<span class="${hit ? 'good' : 'bad'}">${esc(w)}</span>`; }).join(' ');
      body.querySelector('.diff').innerHTML = `<p>${diff}</p>`; body.querySelector('#chk').disabled = true;
      done({ objective: true, correct: ok === tw.length, score: ok / tw.length, given: g, expected: it.say });
    };
  };

  /* ---------- SPEAKING CAFÉ & AI CHAT ---------- */
  V.speak = function () {
    const list = Object.entries(MA.NPCS).filter(([k, n]) => n.style);
    return `<div class="panel scene-head">${MA.sceneSVG('cafe')}<div class="scene-title"><p class="eyebrow">Habla con Madrid</p><h1>Speaking Café</h1></div></div>
      <div class="panel"><div class="status-row">${UI.status(MA.AI.ok(), 'AI conversation: on (Claude)', MA.AI.checked ? 'AI conversation: unavailable here' : 'AI: checking…')} ${UI.status(MA.Mic.ok(), 'Microphone: dictation available', 'Microphone: unavailable — type instead')} ${UI.status(!!MA.Audio.source(), 'Voice replies: ' + (MA.Audio.source() === 'claude' ? 'Claude voice' : 'browser voice'), 'Voice replies: off')} <span class="pill off">Pronunciation scoring: not available</span></div>
      <p class="tiny muted">Characters are played by Claude. Dictation turns your speech into text; corrections judge your <b>language</b>, not your pronunciation. Phoneme-level pronunciation scoring needs a dedicated service (see About).</p></div>
      <div class="npcs">${list.map(([k, n]) => { const un = n.place === 'any' || H.placeUnlocked(n.place); const loc = MA.LOCATIONS.find(l => l.id === n.place); return `<a class="panel npc ${un ? '' : 'locked'}" href="${un ? '#chat-' + k : '#speak'}">${H.portrait(n.look, 'md')}<span><b>${esc(n.name)}</b><small>${esc(n.role)}</small><small>${un ? esc(n.topics.join(' · ')) : '🔒 ' + esc(loc ? loc.unlockText : '')}</small></span></a>`; }).join('')}</div>`;
  };
  V.chat = function (id) {
    const n = MA.NPCS[id]; if (!n || !n.style) return V.speak();
    if (!(n.place === 'any' || H.placeUnlocked(n.place))) return H.lockedScreen(n.name, 'Unlock their location on the map first.', ['#map', 'Open the map']);
    const log = (st().chats[id] = st().chats[id] || { msgs: [] }).msgs;
    if (!log.length) log.push({ r: 'npc', es: n.greet, t: Date.now() });
    let showEn = false;
    const bubble = (m, k) => m.r === 'npc' ? `<div class="msg npc">${H.portrait(n.look, 'xs')}<div><p class="es">${esc(m.es)} ${UI.spk(m.es, 'Hear', id === 'lucia' ? 'airy' : (n.look.male ? 'glassy' : 'rounded'))}</p>${m.en ? `<p class="tr">${esc(m.en)}</p>` : ''}${(m.words || []).length ? `<p class="tiny">${m.words.map(w => `<span class="tag">${esc(w.es)} = ${esc(w.en)}</span>`).join(' ')}</p>` : ''}</div></div>`
      : `<div class="msg me"><div><p class="es">${esc(m.es)}</p>${m.corr ? `<div class="corr"><b>✎ ${esc(m.corr)}</b>${m.expl ? `<br><span>${esc(m.expl)}</span>` : ''}</div>` : m.checked ? '<div class="corr ok">✓ Correct</div>' : ''}${m.nat ? `<div class="nat">💬 More natural: <span class="es">${esc(m.nat)}</span></div>` : ''}</div></div>`;
    H.after(view => {
      const box = view.querySelector('.msgs'), inp = view.querySelector('#say'), send = view.querySelector('#send');
      const draw = () => { box.innerHTML = log.map(bubble).join(''); box.classList.toggle('show-tr', showEn); box.scrollTop = box.scrollHeight; };
      draw();
      view.querySelector('#en').onchange = e => { showEn = e.target.checked; draw(); };
      view.querySelector('#autosp').onchange = e => { st().profile.autoSpeak = e.target.checked; S.save(); };
      const go = async () => {
        const text = inp.value.trim(); if (!text) return;
        if (!MA.AI.ok()) { UI.toast('AI conversation is unavailable on this page. Try the scripted Quests instead.', 'warn'); return; }
        inp.value = ''; send.disabled = true; log.push({ r: 'me', es: text, t: Date.now() }); draw();
        box.insertAdjacentHTML('beforeend', `<div class="msg npc typing">${H.portrait(n.look, 'xs')}<div><p>…</p></div></div>`); box.scrollTop = box.scrollHeight;
        const hist = log.slice(-14).map(m => (m.r === 'npc' ? n.name : 'Learner') + ': ' + m.es).join('\n');
        try {
          const r = await MA.AI.json(`You are ${n.name}, ${n.role}, in Madrid, in the language-learning game "Madrid Academy". Personality and speaking style: ${n.style} Usual topics: ${n.topics.join(', ')}.
${MA.AI.learnerSummary()}
Rules: Reply ONLY in European Spanish from Spain (use vosotros, Spain vocabulary). The learner is A1: use short sentences (max 2–3), very common words, present tense. Stay in character and friendly. End with one simple question to keep the conversation going. If the learner writes English, reply in simple Spanish and encourage them to try in Spanish.${n.companion ? ' You are also their study companion: if they ask about grammar or homework, give a short explanation in simple English inside "reply_en" and a hint, but do not just give homework answers.' : ''}
Check the learner's LAST message for real errors (ignore missing ¿¡, capital letters and small punctuation).
Conversation:
${hist}
Return ONLY JSON: {"reply_es": "", "reply_en": "English translation of reply_es", "has_errors": true|false, "corrected": "corrected version of the learner's last message, or empty", "explanation": "very short simple-English explanation, or empty", "natural": "a more natural Madrid way to say the learner's last message, or empty if already natural", "new_words": [{"es": "", "en": ""}]}`);
          const me = log[log.length - 1]; me.checked = true;
          if (r.has_errors && r.corrected) { me.corr = r.corrected; me.expl = r.explanation; }
          if (r.natural && U.norm(r.natural) !== U.norm(text) && U.norm(r.natural) !== U.norm(r.corrected || '')) me.nat = r.natural;
          log.push({ r: 'npc', es: r.reply_es || '…', en: r.reply_en || '', words: (r.new_words || []).slice(0, 3), t: Date.now() });
          st().chats[id].msgs = log.slice(-40);
          S.record('chat', !r.has_errors); S.record('speaking', !r.has_errors, r.has_errors ? { src: 'chat:' + id, prompt: 'Conversation with ' + n.name, expected: r.corrected, given: text } : null);
          const today = S.today(); const ct = st().chats[id].days = st().chats[id].days || {}; ct[today] = (ct[today] || 0) + 1;
          const todaysMissions = Object.keys(st().ledger).filter(k => k.startsWith('speak:' + today)).length;
          if (ct[today] >= 4 && todaysMissions < 3) S.award('speak:' + today + ':' + id, 40, 15, 'Speaking mission');
          S.save(); draw();
          if (st().profile.autoSpeak && MA.Audio.source()) MA.Audio.speak(r.reply_es, { voice: id === 'lucia' ? 'airy' : (n.look.male ? 'glassy' : 'rounded') });
        } catch (e) {
          log.pop(); inp.value = text; draw();
          UI.toast(e.code === 'rate_limited' ? 'Too many messages — wait a moment and try again.' : 'The character could not answer (' + esc(e.code || e.message || 'error') + ').', 'warn');
        }
        send.disabled = false; inp.focus();
      };
      send.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go(); } };
      const mic = view.querySelector('#mic');
      if (mic) { let base = '', on = false; mic.onclick = () => { if (on) { MA.Mic.stop(); return; } base = inp.value ? inp.value + ' ' : ''; MA.Mic.start(p => inp.value = base + p, f => { base += f + ' '; inp.value = base.trim(); }, s => { on = s === 'listening'; mic.classList.toggle('on', on); mic.textContent = on ? '⏹' : '🎙️'; }); }; }
      view.querySelector('#clear').onclick = () => { st().chats[id].msgs = [{ r: 'npc', es: n.greet, t: Date.now() }]; S.save(); H.render(); };
    });
    return `<div class="chat-wrap"><div class="panel chat-side">${H.portrait(n.look, 'lg')}<h2>${esc(n.name)}</h2><p class="muted">${esc(n.role)}</p><p class="tiny">Topics: ${esc(n.topics.join(', '))}</p>
      <label class="chk"><input type="checkbox" id="en"> Show English</label><label class="chk"><input type="checkbox" id="autosp" ${st().profile.autoSpeak ? 'checked' : ''}> Speak replies aloud</label>
      <button class="btn small ghost" id="clear">New conversation</button>
      <p class="tiny muted">Speaking mission: send 4 messages today for +40 XP (max 3 characters per day).</p></div>
      <div class="panel chat-main"><div class="msgs" aria-live="polite"></div>
      ${MA.AI.ok() ? '' : `<p class="warn-box">AI conversation is not available on this page (it needs Claude in this artifact${MA.AI.denied ? ' — permission was declined' : ''}). Practise scripted dialogues in <a href="#quests">Quests</a> and lesson 1.3 instead.</p>`}
      <div class="say-row">${MA.Mic.ok() ? '<button class="btn mic" id="mic" aria-label="Speak (dictation)">🎙️</button>' : ''}<input type="text" id="say" placeholder="Escribe o habla en español…" aria-label="Your message"><button class="btn primary" id="send">Send</button></div>${UI.accentBar()}</div></div>`;
  };

  /* ---------- QUESTS ---------- */
  V.quests = function () {
    return `<div class="panel"><p class="eyebrow">Diario de misiones</p><h1>Quest Journal</h1><p class="muted">The main story grows with your Spanish. Rewards never require purchases.</p></div>
      <div class="quests">${MA.QUESTS.map((q, i) => { const done = S.questDone(q.id), un = !q.locked && S.unlocked(q.unlock); return `<a class="panel quest ${done ? 'done' : un ? 'avail' : 'locked'}" href="${un || done ? '#quest-' + q.id : '#quests'}"><span class="qn">${done ? '✓' : un ? '!' : '🔒'}</span><span><b>Quest ${i + 1}: ${esc(q.title)}</b><small>${esc(q.en)}</small><small>${un || done ? `Reward: ${q.reward.xp} XP · ${q.reward.coins} 🪙${q.reward.item ? ' · ' + esc(H.itemName(q.reward.item)) : ''}` : esc(q.unlockText)}</small></span></a>`; }).join('')}</div>`;
  };
  H.itemName = id => { for (const g in MA.WARDROBE) { const f = MA.WARDROBE[g].find(x => x[0] === id); if (f) return f[1]; } return id; };
  const NATS = ['canadiense', 'espanola', 'espanol', 'inglesa', 'ingles', 'francesa', 'frances', 'italiana', 'italiano', 'japonesa', 'japones', 'vietnamita', 'china', 'chino', 'coreana', 'coreano', 'estadounidense', 'americana', 'americano', 'mexicana', 'mexicano', 'alemana', 'aleman', 'brasilena', 'australiana', 'india', 'filipina', 'portuguesa', 'colombiana', 'argentina'];
  const MASC = { espanol: 'española', ingles: 'inglesa', frances: 'francesa', italiano: 'italiana', japones: 'japonesa', chino: 'china', coreano: 'coreana', americano: 'americana', mexicano: 'mexicana', aleman: 'alemana' };
  H.CHECKS = {
    name: g => { const n = U.deacc(U.norm(g)); const m = /\b(me llamo|soy|mi nombre es)\s+(\S+)/.exec(n); return m ? { ok: true } : { ok: false, tip: 'Try: “Me llamo …” + your name.' }; },
    origin: g => { const n = U.deacc(U.norm(g)); const hit = /\b(soy de|vengo de)\b/.test(n) || NATS.some(x => new RegExp('\\b' + x + '\\b').test(n)); if (!hit) return { ok: false, tip: 'Try: “Soy de Vancouver.” or “Soy canadiense.”' }; const masc = Object.keys(MASC).find(x => new RegExp('\\bsoy ' + x + '\\b').test(n)); return { ok: true, note: masc && !(st().avatar.male) ? `Tip: as a woman you say “soy ${MASC[masc]}”.` : '' }; },
    order: g => { const n = U.deacc(U.norm(g)); const verb = /\b(me pones|ponme|queria|quiero|para mi|me das|un|una)\b/.test(n); const item = /\b(cafe|te|agua|zumo|cortado|leche|cana|tostada|cruasan|tortilla|bocadillo|infusion)\b/.test(n); if (!item) return { ok: false, tip: 'Name a drink or food: un café, un té, un zumo de naranja…' }; if (!verb) return { ok: false, tip: 'Use an ordering phrase: “¿Me pones…?” or “Quería…”.' }; return { ok: true, note: /por favor/.test(n) ? '' : 'Tip: add “por favor” to sound friendly.' }; }
  };
  V.quest = function (id) {
    const q = MA.QUESTS.find(x => x.id === id); if (!q || q.locked) return V.quests();
    if (!S.unlocked(q.unlock) && !S.questDone(id)) return H.lockedScreen(q.title, q.unlockText, ['#quests', 'Quest Journal']);
    const npc = MA.NPCS[q.npc]; const place = id === 'q1' ? 'academia' : 'cafe';
    H.after(view => {
      let step = 0; const box = view.querySelector('.vn-box'), ans = view.querySelector('.vn-answer');
      const show = () => {
        const s = q.steps[step];
        if (!s) return finish();
        box.innerHTML = `<div class="nameplate">${esc(npc.name)}</div><p class="es vn-line">${esc(s.say)} ${UI.spk(s.say, 'Hear', npc.look.male ? 'glassy' : 'rounded')}</p><details class="vn-tr"><summary>English</summary>${esc(s.tr)}</details>`;
        if (st().profile.autoSpeak && MA.Audio.source()) MA.Audio.speak(s.say, { voice: npc.look.male ? 'glassy' : 'rounded' });
        if (!s.ask) { ans.innerHTML = `<button class="btn primary" id="vn-next">Continue ▸</button>`; ans.querySelector('#vn-next').onclick = () => { step++; show(); }; return; }
        if (s.ask.type === 'mc') {
          ans.innerHTML = `${s.ask.q ? `<p class="q">${esc(s.ask.q)}</p>` : ''}<div class="opts">${s.ask.o.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><div class="vn-fb"></div>`;
          ans.querySelectorAll('.opt').forEach(b => b.onclick = () => {
            const ok = +b.dataset.k === s.ask.a; S.record(s.listen ? 'listening' : 'speaking', ok, ok ? null : { src: 'quest:' + id, prompt: s.say, expected: s.ask.o[s.ask.a], given: b.textContent });
            if (ok) { b.classList.add('right'); ans.querySelector('.vn-fb').innerHTML = `<p class="good">✓ ¡Perfecto!</p>`; setTimeout(() => { step++; show(); }, 700); }
            else { b.classList.add('wrong'); b.disabled = true; ans.querySelector('.vn-fb').innerHTML = `<p class="bad">✗ Try again. ${esc(s.ask.ex || '')}</p>`; }
          });
        } else {
          ans.innerHTML = `<div class="say-row">${MA.Mic.ok() ? '<button class="btn mic" id="qmic">🎙️</button>' : ''}<input type="text" id="qin" placeholder="${esc(s.ask.hint)}" aria-label="Your answer"><button class="btn primary" id="qgo">Answer</button></div>${UI.accentBar()}<div class="vn-fb"></div>`;
          const inp = ans.querySelector('#qin'); setTimeout(() => inp.focus(), 50);
          const go = () => { const r = H.CHECKS[s.ask.check](inp.value); S.record('speaking', r.ok, r.ok ? null : { src: 'quest:' + id, prompt: s.say, expected: s.ask.hint, given: inp.value }); if (r.ok) { ans.querySelector('.vn-fb').innerHTML = `<p class="good">✓ ¡Muy bien!</p>${r.note ? `<p class="note">${esc(r.note)}</p>` : ''}`; ans.querySelector('#qgo').disabled = true; setTimeout(() => { step++; show(); }, r.note ? 2200 : 900); } else ans.querySelector('.vn-fb').innerHTML = `<p class="bad">${esc(r.tip)}</p>`; };
          ans.querySelector('#qgo').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
          const mic = ans.querySelector('#qmic'); if (mic) mic.onclick = () => MA.Mic.start(p => inp.value = p, f => inp.value = f, s2 => mic.classList.toggle('on', s2 === 'listening'));
        }
      };
      const finish = () => {
        const first = !S.questDone(id);
        st().quests[id] = { status: 'done', t: Date.now() };
        if (q.reward.item) st().owned['acc:' + q.reward.item] = true;
        S.save(true); S.award('quest:' + id, q.reward.xp, q.reward.coins, 'Quest complete');
        const newly = MA.LOCATIONS.filter(l => l.unlock && l.unlock.quest === id && S.unlocked(l.unlock));
        box.innerHTML = `<div class="nameplate">Quest complete</div><h2>✦ ${esc(q.title)} ✦</h2><p>${first ? `Rewards: ${q.reward.xp} XP · ${q.reward.coins} 🪙${q.reward.item ? ' · new accessory: ' + esc(H.itemName(q.reward.item)) : ''}` : 'Replay complete (rewards are only given once).'}</p>${newly.map(l => `<p class="good">📍 New location unlocked: <b>${esc(l.name)}</b></p>`).join('')}`;
        ans.innerHTML = `<div class="row gap wrap"><a class="btn primary" href="#quests">Quest Journal</a>${newly[0] ? `<a class="btn" href="#place-${newly[0].id}">Visit ${esc(newly[0].name)}</a>` : ''}${q.reward.item ? '<a class="btn ghost" href="#wardrobe">Wardrobe</a>' : ''}</div>`;
      };
      show();
    });
    return `<div class="vn"><div class="vn-stage">${MA.sceneSVG(place)}<div class="vn-npc">${MA.avatarSVG(npc.look)}</div><div class="vn-me">${MA.avatarSVG(H.me())}</div><div class="vn-title"><small>Quest</small><b>${esc(q.title)}</b></div></div>
      <div class="panel vn-box"></div><div class="panel vn-answer"></div></div>`;
  };

  /* ---------- PASSPORT & ACHIEVEMENTS ---------- */
  H.ACH = [
    ['📘', 'Primera lección', 'Complete your first lesson', () => Object.values(st().lessons).some(l => l.done)],
    ['🏅', '¡Hola, Alicante!', 'Pass the Chapter 1 exam', () => S.examPassed('c1')],
    ['☕', 'Cliente habitual', 'Pass the Chapter 2 exam', () => S.examPassed('c2')],
    ['⭐', 'Coleccionista', 'Save 10 words', () => Object.keys(st().vocab).length >= 10],
    ['💎', 'Gran coleccionista', 'Save 40 words', () => Object.keys(st().vocab).length >= 40],
    ['🧠', 'Memoria de elefante', 'Master 5 words (7+ day interval)', () => S.mastered() >= 5],
    ['📖', 'Lectora', 'Finish a fairy tale', () => Object.values(st().stories).some(s => s.read)],
    ['📻', 'Oyente', 'Finish a radio episode', () => Object.keys(st().radio).length >= 1],
    ['💬', 'Primera conversación', 'Complete a speaking mission', () => Object.keys(st().ledger).some(k => k.startsWith('speak:'))],
    ['🏛️', 'Bienvenida', 'Finish Quest 1', () => S.questDone('q1')],
    ['🥐', '¡Un café, por favor!', 'Finish Quest 2', () => S.questDone('q2')],
    ['🏠', 'Deberes hechos', 'Complete a homework assignment', () => Object.values(st().homework).some(h => h.completed)],
    ['✒️', 'Escritora', 'Complete a writing task', () => Object.keys(st().writings).length >= 1]
  ];
  V.passport = function () {
    const a = st().attendance, days = Object.keys(a).sort().reverse();
    const ms = [];
    MA.CHAPTERS.forEach(c => { const e = (st().exams[c.id] || []).find(x => x.passed); if (e) ms.push(['A1 · Ch ' + c.num, c.title, e.t]); });
    MA.QUESTS.forEach(q => { if (S.questDone(q.id)) ms.push(['Quest', q.title, st().quests[q.id].t]); });
    MA.LOCATIONS.forEach(l => { if (l.unlock && S.unlocked(l.unlock) && !st().profile.explore) ms.push(['Location', l.name, 0]); });
    return `<div class="passport">
      <div class="panel pp-id"><div class="pp-cover"><small>UNIÓN EUROPEA · REINO DE ESPAÑA</small><b>PASAPORTE DE ESPAÑOL</b><small>Academia Madrid</small></div>
        <div class="pp-page">${H.portrait(H.me(), 'lg')}<dl><dt>Nombre / Name</dt><dd>${esc(st().profile.name)}</dd><dt>Estudiante desde</dt><dd>${H.fmtDate(st().profile.createdAt)}</dd><dt>Nivel MCER (assessed)</dt><dd>${S.cefr().passedChapters ? `A1 in progress · ${S.cefr().passedChapters}/${S.cefr().plannedA1} chapters mastered` : 'Not yet assessed'}</dd><dt>XP total</dt><dd>${S.xp()}</dd><dt>Ciudad actual</dt><dd>${esc(H.currentCity().name)}</dd></dl></div></div>
      <div class="panel"><h3>Stats</h3><div class="stats3"><div><b>${Object.keys(st().arrivals).length}</b><small>cities reached</small></div><div><b>${Object.values(st().lessons).filter(l => l.done).length}</b><small>lessons</small></div><div><b>${MA.CHAPTERS.filter(c => S.examPassed(c.id)).length}</b><small>exams passed</small></div><div><b>${S.mastered()}</b><small>words mastered</small></div><div><b>${MA.LOCATIONS.filter(l => S.unlocked(l.unlock)).length}/${MA.LOCATIONS.length}</b><small>locations</small></div><div><b>${S.coins()}</b><small>coins</small></div></div></div>
      <div class="panel"><h3>Travel stamps</h3><div class="stamps">${MA.CITIES.filter(c => st().arrivals[c.id]).map((c, i) => `<span class="stamp s${i % 4}" title="${esc(c.name)}">${esc((c.short || c.name).toUpperCase())}<small>${new Date(st().arrivals[c.id]).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</small></span>`).join('') || '<p class="muted">No stamps yet.</p>'}</div><p class="tiny muted">A new stamp appears when you travel to a new city.</p></div>
      <div class="panel"><h3>Milestones</h3>${ms.length ? `<div class="stamps">${ms.map(m => `<span class="stamp big gold"><small>${esc(m[0])}</small>${esc(m[1])}${m[2] ? `<small>${H.fmtDate(m[2])}</small>` : ''}</span>`).join('')}</div>` : '<p class="muted">Pass exams, finish quests and unlock places to collect milestone stamps.</p>'}</div>
      <div class="panel"><h3>Achievements</h3><div class="ach">${H.ACH.map(x => { const ok = x[3](); return `<div class="badge ${ok ? 'on' : ''}"><span>${ok ? x[0] : '🔒'}</span><b>${esc(x[1])}</b><small>${esc(x[2])}</small></div>`; }).join('')}</div></div></div>`;
  };

  /* ---------- PROGRESS ANALYTICS ---------- */
  V.progress = function () {
    const today = S.today();
    const report = days => { const from = S.addDays(today, -days + 1); const ds = Object.keys(st().attendance).filter(d => d >= from).length; let min = 0; for (let i = 0; i < days; i++) min += S.minutes(S.addDays(today, -i)); const ls = Object.values(st().lessons).filter(l => S.dayKey(l.t || 0) >= from).length; const ws = Object.values(st().vocab).filter(v => S.dayKey(v.saved) >= from).length; const sk = S.skillStats(days); let c = 0, n = 0; for (const k in sk) if (k !== 'chat') { c += sk[k].c; n += sk[k].n; } return { ds, min, ls, ws, acc: n ? U.pct(c, n) : null, n }; };
    const w = report(7), m = report(30);
    const bars = Array.from({ length: 14 }, (_, i) => { const d = S.addDays(today, -13 + i); return { d, v: S.minutes(d) }; });
    const max = Math.max(60, ...bars.map(b => b.v));
    const chart = `<svg viewBox="0 0 560 200" class="chart" role="img" aria-label="Study minutes for the last 14 days"><line x1="30" y1="170" x2="550" y2="170" class="axis"/>${[0, 30, 60].filter(v => v <= max).map(v => `<line x1="30" x2="550" y1="${170 - 150 * v / max}" y2="${170 - 150 * v / max}" class="grid"/><text x="24" y="${174 - 150 * v / max}" text-anchor="end" class="lbl">${v}</text>`).join('')}<line x1="30" x2="550" y1="${170 - 150 * 45 / max}" y2="${170 - 150 * 45 / max}" class="goal"/><text x="548" y="${166 - 150 * 45 / max}" text-anchor="end" class="lbl">goal 45′</text>
      ${bars.map((b, i) => { const x = 40 + i * 36.5, h = 150 * b.v / max; return `<rect x="${x}" y="${170 - h}" width="24" height="${Math.max(h, b.v ? 2 : 0)}" rx="4" class="${b.d === today ? 'bar-now' : 'bar'}"><title>${b.d}: ${b.v} min</title></rect>${b.v ? `<text x="${x + 12}" y="${164 - h}" text-anchor="middle" class="lbl">${b.v}</text>` : ''}<text x="${x + 12}" y="188" text-anchor="middle" class="lbl">${b.d.slice(8)}</text>`; }).join('')}</svg>`;
    const sk = S.skillStats(30); const skills = ['vocab', 'grammar', 'listening', 'reading', 'writing', 'speaking'];
    const srs = sk.srs || { c: 0, n: 0 };
    const weak = skills.filter(k => sk[k] && sk[k].n >= 4 && sk[k].c / sk[k].n < 0.7);
    const recFor = k => ({ vocab: ['#vocab-review', 'Vocabulary review'], grammar: ['#game-grammar', 'Timed grammar + lesson 1.2'], listening: ['#game-listen', 'Listening ID game'], reading: ['#library', 'Fairy tale library'], writing: ['#grammar', 'Writing Studio'], speaking: ['#chat-lucia', 'Talk with Lucía'] })[k];
    const exams = []; MA.CHAPTERS.forEach(c => (st().exams[c.id] || []).forEach(e => exams.push(Object.assign({ c }, e)))); exams.sort((a, b) => b.t - a.t);
    return `<div class="panel"><p class="eyebrow">Tu progreso</p><h1>Progress Dashboard</h1><p class="muted">All numbers come from your real answers and activity. Nothing is estimated from XP.</p></div>
      <div class="two"><div class="panel"><h3>This week</h3><ul class="kv"><li>Study time<b>${w.min} min</b></li><li>Lessons completed<b>${w.ls}</b></li><li>Words saved<b>${w.ws}</b></li><li>Accuracy<b>${w.acc == null ? '—' : w.acc + '%'}</b></li></ul></div>
      <div class="panel"><h3>Last 30 days</h3><ul class="kv"><li>Study time<b>${m.min} min</b></li><li>Lessons completed<b>${m.ls}</b></li><li>Words saved<b>${m.ws}</b></li><li>Accuracy<b>${m.acc == null ? '—' : m.acc + '%'}</b> <small class="muted">${m.n} answers</small></li></ul></div></div>
      <div class="panel"><h3>Study minutes · last 14 days</h3><div class="chart-wrap">${chart}</div></div>
      <div class="panel"><h3>Accuracy by skill · 30 days</h3><ul class="skillbars">${skills.map(k => { const v = sk[k]; return `<li><span>${UI.skillName(k)}</span>${v && v.n >= 3 ? `${UI.bar(v.c / v.n, v.c / v.n < 0.7 ? 'warn' : '')}<b>${U.pct(v.c, v.n)}%</b><small>${v.n} answers</small>` : '<em class="muted">not enough data yet</em>'}</li>`; }).join('')}<li><span>Vocabulary retention</span>${srs.n >= 3 ? `${UI.bar(srs.c / srs.n)}<b>${U.pct(srs.c, srs.n)}%</b><small>${srs.n} reviews remembered</small>` : '<em class="muted">review cards to measure retention</em>'}</li></ul></div>
      <div class="two"><div class="panel"><h3>Weak areas & recommendations</h3>${weak.length ? `<ul>${weak.map(k => `<li><b>${UI.skillName(k)}</b> (${U.pct(sk[k].c, sk[k].n)}%) → <a href="${recFor(k)[0]}">${recFor(k)[1]}</a></li>`).join('')}</ul>` : '<p class="muted">No weak areas detected (needs at least 4 answers per skill below 70%).</p>'}
        <h4>Recent mistakes</h4>${st().mistakes.length ? `<ul class="myerr">${st().mistakes.slice(0, 8).map(x => `<li><span class="tag">${UI.skillName(x.skill)}</span> <span class="muted">${esc(x.prompt)}</span><br><s>${esc(x.given)}</s> → <b>${esc(x.expected)}</b></li>`).join('')}</ul>` : '<p class="muted">None yet.</p>'}</div>
      <div class="panel"><h3>Exam & CEFR assessment history</h3>${exams.length ? `<table class="tbl"><thead><tr><th>Date</th><th>Exam</th><th>Score</th><th>Result</th></tr></thead><tbody>${exams.map(e => `<tr><td>${H.fmtDate(e.t)}</td><td>A1 · Ch ${e.c.num}</td><td>${e.overall}%</td><td>${e.passed ? '<span class="pill ok">passed</span>' : '<span class="pill">not yet</span>'}</td></tr>`).join('')}</tbody></table>` : '<p class="muted">No exams taken yet.</p>'}
        <p class="tiny muted">A CEFR level is only awarded after the level exam at the end of all its chapters. Chapter exams show progress inside A1.</p></div></div>`;
  };
  V.calendar = function (ym) {
    ym = ym && /^\d{4}-\d{2}$/.test(ym) ? ym : S.today().slice(0, 7);
    const [y, m] = ym.split('-').map(Number); const prev = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, '0')}`, next = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
    return `<div class="panel"><h1>Study calendar</h1><div class="row gap"><a class="btn small ghost" href="#calendar-${prev}">← ${prev}</a><a class="btn small ghost" href="#calendar-${next}">${next} →</a></div>${H.monthGrid(ym)}<p class="tiny muted">Shaded days = days you studied · ′ = minutes studied.</p></div>`;
  };
  V.expressions = function () {
    return `<div class="panel scene-head">${MA.sceneSVG('retiro')}<div class="scene-title"><p class="eyebrow">Parque del Retiro</p><h1>Everyday Madrid expressions</h1></div></div><div class="panel"><ul class="exprs">${MA.EXPRESSIONS.map(e => `<li><b class="es">${esc(e[0])}</b> ${UI.spk(e[0])}<span>${esc(e[1])}</span><small class="muted">${esc(e[2])}</small></li>`).join('')}</ul></div>`;
  };
  V['prado-write'] = function () {
    if (!H.placeUnlocked('prado')) return H.lockedScreen('Museo del Prado', 'Pass the Chapter 2 exam to visit the Prado.', ['#exams', 'Exams']);
    const task = { id: 'w-prado', prompt: 'Describe Las Meninas in 4–5 simple sentences: who is there, colours, and what you like.', sample: 'En el cuadro hay una niña pequeña. Es una princesa. Hay un pintor y un perro grande. Los colores son oscuros, pero la niña tiene un vestido blanco. Me gusta mucho la luz.', minWords: 20, rubric: ['Uses hay to say who is there', 'Uses es / son with adjectives', 'Adjectives agree (blanco/blanca)', 'Gives an opinion (me gusta)'] };
    H.after(view => UI.R.write(task, view.querySelector('#pbox'), res => { st().writings['w-prado'] = { t: Date.now(), score: res.score, method: res.method, text: res.given.slice(0, 1500) }; S.save(true); S.award('write:w-prado', 25, 10, 'Prado writing'); }, { exam: false }));
    return `<div class="panel scene-head">${MA.sceneSVG('prado')}<div class="scene-title"><p class="eyebrow">Museo del Prado</p><h1>Describe a painting</h1></div><div class="scene-npc">${H.portrait(MA.NPCS.andres.look, 'lg')}<span>Andrés</span></div></div>
      <div class="two"><div class="panel"><h3>Las Meninas · Velázquez, 1656</h3><p>In the centre stands the young <b>Infanta Margarita</b> in a wide pale dress. Two maids of honour (<i>las meninas</i>) are next to her. On the left, the painter <b>Velázquez</b> stands with his brush in front of a huge canvas. A large dog lies at the front. In a mirror at the back you can see the king and queen. The room is dark; the light comes from the right.</p>
        <h4>Useful words</h4><div class="vgrid small">${['cuadro', 'libertad'].map(H.vcard).join('')}</div><ul class="exprs"><li><b class="es">el pintor</b> the painter</li><li><b class="es">la princesa / la infanta</b> the princess</li><li><b class="es">el espejo</b> the mirror</li><li><b class="es">la luz</b> the light</li><li><b class="es">oscuro / claro</b> dark / light</li><li><b class="es">en el centro / a la izquierda</b> in the centre / on the left</li></ul></div>
      <div class="panel"><div id="pbox" class="ex-card"></div></div></div>`;
  };

  /* ---------- WARDROBE ---------- */
  H.wardrobeControls = function (creating) {
    const a = st().avatar, W = MA.WARDROBE;
    const owned = (g, id, price) => price === 0 || price === undefined || st().owned[g + ':' + id];
    const grp = (g, title, list, kind) => `<fieldset class="wgroup"><legend>${title}</legend><div class="wopts">${list.map(([id, label, price]) => {
      const isOn = g === 'acc' ? (a.acc || []).includes(id) : a[g] === id; const has = g === 'acc' ? (price === 'quest' ? st().owned['acc:' + id] : (price === 0 || st().owned['acc:' + id])) : owned(g, id, price);
      if (creating && !has) return '';
      const lockTxt = price === 'quest' ? 'Quest reward' : `${price} 🪙`;
      return kind === 'swatch' ? `<button class="sw ${isOn ? 'on' : ''}" data-g="${g}" data-v="${id}" style="background:${id}" title="${esc(label)}" aria-label="${esc(label)}" aria-pressed="${isOn}"></button>`
        : `<button class="wopt ${isOn ? 'on' : ''} ${has ? '' : 'lockd'}" data-g="${g}" data-v="${id}" data-price="${price}" aria-pressed="${isOn}">${esc(label)}${has ? '' : `<small>${lockTxt}</small>`}</button>`;
    }).join('')}</div></fieldset>`;
    return grp('hair', 'Hairstyle', W.hair) + grp('hairColor', 'Hair colour', W.hairColor, 'swatch') + grp('skin', 'Skin tone', W.skin, 'swatch') + grp('eyes', 'Eye colour', W.eyes, 'swatch') + grp('outfit', 'Outfit', W.outfit) + grp('shoes', 'Shoes', W.shoes) + grp('acc', 'Accessories', W.acc);
  };
  H.bindWardrobe = function (view, creating) {
    view.querySelectorAll('[data-g]').forEach(b => b.onclick = () => {
      const g = b.dataset.g, v = b.dataset.v, a = st().avatar;
      if (b.classList.contains('lockd')) {
        const price = b.dataset.price;
        if (price === 'quest') { UI.toast('Earn this item by completing a quest.'); return; }
        if (S.coins() < +price) { UI.toast(`You need ${price} 🪙 (you have ${S.coins()}). Earn coins by learning!`, 'warn'); return; }
        UI.confirm(`Buy “${H.itemName(v)}” for ${price} 🪙?`, 'Buy', () => { st().spent['buy:' + g + ':' + v] = { coins: +price, t: Date.now() }; st().owned[g + ':' + v] = true; if (g === 'acc') a.acc = [...new Set([...(a.acc || []), v])]; else a[g] = v; st().avatarAt = Date.now(); S.save(true); UI.toast('New item! ✨'); H.render(); });
        return;
      }
      if (g === 'acc') { const s = new Set(a.acc || []); s.has(v) ? s.delete(v) : s.add(v); a.acc = [...s]; } else a[g] = v;
      st().avatarAt = Date.now(); S.save(true); H.render();
    });
    const begin = view.querySelector('#begin');
    if (begin) {
      const nm = view.querySelector('#nm'); nm.oninput = () => { st().profile.name = nm.value.trim().slice(0, 24); try { localStorage.setItem('madrid-academy-v1', JSON.stringify(st())); } catch (e) { } };
      begin.onclick = () => { if (!nm.value.trim()) { nm.focus(); UI.toast('Please enter your name.', 'warn'); return; } st().profile.name = nm.value.trim().slice(0, 24); st().profile.onboarded = true; st().profile.createdAt = Date.now(); st().avatarAt = st().profileAt = Date.now(); S.save(true); location.hash = '#home'; H.render(); };
    }
  };
  V.wardrobe = function () {
    H.after(view => H.bindWardrobe(view, false));
    return `<div class="panel"><p class="eyebrow">Armario</p><h1>Avatar Wardrobe</h1><p class="muted">Changes appear in your profile, dialogues, quests and passport. You have ${S.coins()} 🪙 — coins are earned by learning only.</p></div>
      <div class="wardrobe-grid"><div class="panel avatar-stage">${MA.avatarSVG(H.me())}<div class="row gap center">${H.portrait(H.me(), 'md')}<button class="btn small ghost" id="reset-av">Reset to default look</button></div></div><div class="panel">${H.wardrobeControls(false)}</div></div>`;
  };
  document.addEventListener('click', e => { if (e.target.id === 'reset-av') { st().avatar = Object.assign({}, MA.DEFAULT_AVATAR); st().avatarAt = Date.now(); S.save(true); H.render(); } });

  /* ---------- SETTINGS ---------- */
  V.preferences = function () {
    const p = st().profile; let tzs = []; try { tzs = Intl.supportedValuesOf('timeZone'); } catch (e) { tzs = ['Europe/Madrid', 'America/Vancouver', 'America/Toronto', 'America/New_York', 'Europe/London', 'Asia/Ho_Chi_Minh', 'Asia/Tokyo', 'Australia/Sydney', 'UTC']; }
    if (!tzs.includes(p.tz)) tzs.unshift(p.tz);
    H.after(view => {
      const bind = (id, fn) => { const el = view.querySelector(id); el && (el.onchange = () => { fn(el); st().profileAt = Date.now(); S.save(true); H.render(); }); };
      bind('#p-name', el => p.name = el.value.trim().slice(0, 24) || p.name);
      bind('#p-tz', el => p.tz = el.value);
      bind('#p-th', el => p.threshold = U.clamp(+el.value || 80, 50, 100));
      bind('#p-voice', el => p.voiceMode = el.value);
      bind('#p-rate', el => p.rate = +el.value);
      bind('#p-auto', el => p.autoSpeak = el.checked);
      bind('#p-explore', el => p.explore = el.checked);
      view.querySelector('#p-test').onclick = () => MA.Audio.speak('Hola, bienvenida a Madrid. Gracias, zapatos, ciudad.');
      view.querySelector('#p-export').onclick = async () => { const data = JSON.stringify(st()); const dl = window.claude && await window.claude.use('downloads'); if (dl) { try { await dl.save({ filename: 'madrid-academy-progress.json', data }); return; } catch (e) { } } try { await navigator.clipboard.writeText(data); UI.toast('Progress JSON copied to clipboard.'); } catch (e) { UI.toast('Export failed.', 'warn'); } };
      view.querySelector('#p-import').onclick = () => UI.modal(`<h3>Import progress</h3><p class="muted">Paste a progress JSON exported from Madrid Academy. It will be merged with your current progress (nothing is lost).</p><textarea id="imp" rows="6"></textarea><button class="btn primary" id="imp-go">Merge</button>`, c => c.querySelector('#imp-go').onclick = () => { try { const o = JSON.parse(c.querySelector('#imp').value); S.state = S.merge(S.state, o); S.save(true); UI.closeModal(); UI.toast('Imported and merged.'); H.render(); } catch (e) { UI.toast('That is not valid progress JSON.', 'warn'); } });
      view.querySelector('#p-reset').onclick = () => UI.confirm('Reset ALL progress on this account? This cannot be undone.', 'Reset everything', () => { const keepTz = p.tz; S.state = JSON.parse(JSON.stringify(Object.assign({}, S.state, { ledger: {}, spent: {}, owned: {}, attendance: {}, lessons: {}, exams: {}, homework: {}, vocab: {}, custom: {}, mistakes: [], quests: {}, stories: {}, radio: {}, study: {}, answers: {}, journal: [], writings: {}, chats: {} }))); S.state.profile = Object.assign({}, S.state.profile, { onboarded: false, tz: keepTz }); S.state.avatar = Object.assign({}, MA.DEFAULT_AVATAR); S.state.updatedAt = Date.now() + 1; S.lastRemote = ''; S.save(true); location.hash = '#home'; H.render(); });
      view.querySelector('#p-sync').onclick = () => { S.cloud = 'connecting'; S.emit(); S.initCloud(); };
    });
    const audioSrc = MA.Audio.source();
    return `<div class="panel"><p class="eyebrow">Ajustes</p><h1>Settings</h1></div>
      <div class="two"><div class="panel form"><h3>Profile</h3>
        <label for="p-name">Name</label><input type="text" id="p-name" value="${esc(p.name)}">
        <label for="p-tz">Timezone (for daily goals and study minutes)</label><select id="p-tz">${tzs.map(t => `<option ${t === p.tz ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>
        <label for="p-th">Exam pass mark (%)</label><input type="number" id="p-th" min="50" max="100" value="${p.threshold || 80}">
        <label class="chk"><input type="checkbox" id="p-explore" ${p.explore ? 'checked' : ''}> Explore mode — unlock all locations, stories and exams for previewing (XP rules stay the same)</label></div>
      <div class="panel form"><h3>Audio</h3>
        <label for="p-voice">Voice source</label><select id="p-voice"><option value="auto" ${p.voiceMode === 'auto' ? 'selected' : ''}>Automatic (Claude voice, else browser)</option><option value="browser" ${p.voiceMode === 'browser' ? 'selected' : ''}>Browser Spanish (es-ES) voice</option><option value="off" ${p.voiceMode === 'off' ? 'selected' : ''}>Off</option></select>
        <label for="p-rate">Speech speed</label><select id="p-rate">${[0.75, 0.9, 1, 1.15].map(r => `<option value="${r}" ${r === p.rate ? 'selected' : ''}>${r}×</option>`).join('')}</select>
        <label class="chk"><input type="checkbox" id="p-auto" ${p.autoSpeak ? 'checked' : ''}> Speak character lines aloud automatically</label>
        <p>Now using: <b>${esc(MA.Audio.label())}</b></p><button class="btn small" id="p-test">🔊 Test voice</button>
        <p class="tiny muted">Claude voice guesses pronunciation from text marked as es-ES. Browser voices depend on your device; look for a voice from Spain (es-ES).</p></div></div>
      <div class="panel"><h3>Services & honest status</h3><table class="tbl"><tbody>
        <tr><td>Cloud save & sync</td><td>${UI.status(S.cloud === 'synced', 'Connected', S.cloud === 'connecting' ? 'Connecting…' : S.cloud === 'error' ? 'Problem' : 'Off')}</td><td class="tiny">${S.cloud === 'synced' ? `Saved to your private storage on claude.ai. Signed in as you, so it syncs on any device where you open this artifact.${S.lastSync ? ' Last sync ' + new Date(S.lastSync).toLocaleTimeString() + '.' : ''}` : S.cloud === 'error' ? esc(S.cloudErr || '') + ' Progress is kept on this device and will sync when the connection returns.' : 'Cloud storage is not available in this view (not signed in, or opened outside claude.ai). Progress is saved in this browser only.'} <button class="btn small ghost" id="p-sync">Retry</button></td></tr>
        <tr><td>AI characters & writing feedback</td><td>${UI.status(MA.AI.ok(), 'On', MA.AI.checked ? 'Unavailable' : 'Checking…')}</td><td class="tiny">Uses Claude through this artifact (the first use asks for your permission).</td></tr>
        <tr><td>Speech audio</td><td>${UI.status(!!audioSrc, audioSrc === 'claude' ? 'Claude voice' : 'Browser voice', 'Unavailable')}</td><td class="tiny">Text-to-speech, not recorded audio.</td></tr>
        <tr><td>Microphone (dictation)</td><td>${UI.status(MA.Mic.ok(), 'Available', 'Unavailable')}</td><td class="tiny">Speech-to-text in Chromium browsers and the desktop app. Language detection is handled by the platform.</td></tr>
        <tr><td>Pronunciation assessment</td><td>${UI.status(false, '', 'Not available')}</td><td class="tiny">Phoneme-level scoring needs a service such as Azure Speech Pronunciation Assessment behind a server. See About.</td></tr>
      </tbody></table></div>
      <div class="panel"><h3>Your data</h3><div class="row gap wrap"><button class="btn" id="p-export">Export progress (JSON)</button><button class="btn ghost" id="p-import">Import / merge</button><button class="btn danger" id="p-reset">Reset all progress</button></div></div>`;
  };

  /* ---------- ABOUT ---------- */
  V.about = function () {
    const row = (f, s, n) => `<tr><td>${f}</td><td><span class="pill ${s === 'Working' ? 'ok' : s === 'Partial' ? '' : 'off'}">${s}</span></td><td class="tiny">${n}</td></tr>`;
    return `<div class="panel"><p class="eyebrow">About</p><h1>How Madrid Academy works</h1>
      <p>This is a single-page app hosted as a Claude artifact. Instead of React + Supabase (which needs a build step and your own Supabase project), it uses what this hosting already provides — so it works with no setup:</p>
      <ul><li><b>Accounts:</b> your claude.ai sign-in identifies you. No separate email sign-up, password reset or Google login is needed — and none is offered, because they would be fake here.</li>
      <li><b>Database:</b> the artifact’s private per-user storage (only you can read your row). Every save also goes to this browser, and the two are merged safely, so refreshes and lost connections don’t lose progress.</li>
      <li><b>AI & speech:</b> Claude for conversations and corrections; Claude voice or your browser’s es-ES voice for audio; platform dictation for the microphone. No API keys live in the page.</li></ul></div>
      <div class="panel"><h3>Feature status</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Feature</th><th>Status</th><th>Notes</th></tr></thead><tbody>
      ${row('Character creation & wardrobe', 'Working', 'Illustrated layered vector character; 6 hairstyles, 8 hair colours, 7 skin tones, 7 eye colours, 5 outfits, 4 shoes, 6 accessories. Saved with its own timestamp so it never reverts.')}
      ${row('XP, coins, anti-farming', 'Working', 'XP comes from a ledger of one-time keys, so reloading or replaying cannot repeat rewards.')}
      ${row('A1 Chapter 1 & 2 (7 lessons)', 'Working', 'Lessons, vocabulary, grammar tables, exercises, review, exam, homework + answer keys.')}
      ${row('A1 chapters 3–8, A2–C2', 'Not yet', 'Curriculum map and engine ready; content still to be written.')}
      ${row('Spaced repetition', 'Working', 'SM-2 style scheduling with Again/Hard/Good/Easy.')}
      ${row('Fairy tales with tap-to-translate', 'Working', '2 fully glossed stories with multiword expressions; 3 more planned.')}
      ${row('Madrid Radio', 'Partial', '2 scripted episodes with TTS, line highlighting, speed, quiz and dictation. No recorded audio.')}
      ${row('AI characters & writing feedback', 'Working', 'When Claude is available in the page; text fallback always works.')}
      ${row('Pronunciation scoring', 'Not yet', 'Needs an external pronunciation-assessment service and a server endpoint.')}
      ${row('3D vocabulary art', 'Partial', '17 pre-drawn 3D-style vector illustrations; not real-time 3D models.')}
      ${row('Quests', 'Partial', 'Quests 1–2 playable; 3–7 wait for later chapters.')}
      </tbody></table></div></div>
      <div class="panel"><h3>Continuation plan</h3><ol><li>Write A1 chapters 3–8 (estar/hay & directions, family, routines, shopping, time) + Quests 3–4 + A1 level exam.</li><li>A2 block with preterite/imperfect, 3 more stories, 4 radio episodes.</li><li>Optional: real pronunciation scoring through a server (Azure Speech Pronunciation Assessment) and recorded audio.</li><li>B1–C2 content and advanced speaking scenarios.</li></ol>
      <p class="tiny muted">Cost: nothing extra to run here. AI and voice features use your Claude plan’s usage.</p></div>`;
  };

})();
