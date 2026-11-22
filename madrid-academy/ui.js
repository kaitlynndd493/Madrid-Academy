/* MADRID ACADEMY — UI helpers and the exercise engine */
(function () {
  const { U, S } = MA; const { esc } = U;
  const UI = MA.UI = {};

  UI.toast = function (html, kind = '') {
    const box = U.$('#toasts'); if (!box) return;
    const t = document.createElement('div'); t.className = 'toast ' + kind; t.innerHTML = html; t.setAttribute('role', 'status');
    box.appendChild(t); setTimeout(() => t.classList.add('out'), 3600); setTimeout(() => t.remove(), 4200);
  };
  UI.modal = function (html, onMount) {
    const m = U.$('#modal'); m.innerHTML = `<div class="modal-back" data-close="1"></div><div class="modal-card" role="dialog" aria-modal="true"><button class="x" data-close="1" aria-label="Close">×</button>${html}</div>`;
    m.classList.add('open'); const card = m.querySelector('.modal-card');
    onMount && onMount(card); setTimeout(() => (card.querySelector('button:not(.x), input, textarea') || card).focus && (card.querySelector('button:not(.x), input, textarea') || card).focus(), 30);
    return card;
  };
  UI.closeModal = () => { const m = U.$('#modal'); m.classList.remove('open'); m.innerHTML = ''; };
  UI.confirm = function (msg, yes, onYes) {
    UI.modal(`<h3>${msg}</h3><div class="row gap"><button class="btn danger" id="cf-yes">${yes}</button><button class="btn ghost" data-close="1">Cancel</button></div>`, c => c.querySelector('#cf-yes').onclick = () => { UI.closeModal(); onYes(); });
  };
  UI.spk = (text, label = 'Listen', voice) => `<button class="spk" data-say="${esc(text)}"${voice ? ` data-voice="${voice}"` : ''} aria-label="${esc(label)}: ${esc(text)}" title="Play audio">🔊</button>`;
  UI.accentBar = () => `<div class="accents" aria-label="Insert Spanish characters">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(c => `<button type="button" data-ins="${c}" tabindex="-1">${c}</button>`).join('')}</div>`;
  UI.bar = (v, cls = '') => `<div class="bar ${cls}" role="progressbar" aria-valuenow="${Math.round(v * 100)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${U.clamp(v, 0, 1) * 100}%"></span></div>`;
  UI.status = (ok, onText, offText) => `<span class="pill ${ok ? 'ok' : 'off'}">${ok ? onText : offText}</span>`;

  let lastInput = null;
  document.addEventListener('focusin', e => { if (e.target.matches('input[type=text], textarea')) lastInput = e.target; });
  document.addEventListener('mousedown', e => { if (e.target.closest('[data-ins]')) e.preventDefault(); });
  document.addEventListener('click', e => {
    const ins = e.target.closest('[data-ins]');
    if (ins && lastInput) { const c = ins.dataset.ins; const s = lastInput.selectionStart ?? lastInput.value.length; lastInput.value = lastInput.value.slice(0, s) + c + lastInput.value.slice(lastInput.selectionEnd ?? s); lastInput.focus(); lastInput.selectionStart = lastInput.selectionEnd = s + 1; lastInput.dispatchEvent(new Event('input', { bubbles: true })); return; }
    const say = e.target.closest('[data-say]');
    if (say) { e.preventDefault(); say.classList.add('playing'); MA.Audio.speak(say.dataset.say, { voice: say.dataset.voice }).finally(() => say.classList.remove('playing')); return; }
    if (e.target.closest('[data-close]')) { UI.closeModal(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && U.$('#modal.open')) UI.closeModal(); });

  /* ---------- AI feedback rendering ---------- */
  UI.feedbackHTML = function (fb) {
    if (!fb) return '';
    const errs = (fb.errors || []).map(x => `<li><span class="tag">${esc(x.type)}</span> <s>${esc(x.original)}</s> → <b>${esc(x.correction)}</b><br><span class="muted">${esc(x.explanation)}</span></li>`).join('');
    return `<div class="aifb"><div class="aifb-h"><span class="pill ai">AI feedback · Claude</span> <b>${fb.score ?? '?'}/4</b></div>
      <p>${esc(fb.summary || '')}</p>${fb.praise ? `<p class="good">✓ ${esc(fb.praise)}</p>` : ''}
      ${errs ? `<h5>Corrections</h5><ul class="errs">${errs}</ul>` : '<p class="good">No errors found.</p>'}
      ${fb.corrected_text ? `<h5>Corrected</h5><p class="es">${esc(fb.corrected_text)}</p>` : ''}
      ${fb.natural_version ? `<h5>More natural (Madrid)</h5><p class="es">${esc(fb.natural_version)} ${UI.spk(fb.natural_version)}</p>` : ''}
      ${(fb.alternatives || []).length ? `<h5>Also correct</h5><ul>${fb.alternatives.map(a => `<li class="es">${esc(a)}</li>`).join('')}</ul>` : ''}
      <p class="tiny muted">AI feedback can be wrong. It is one teacher’s opinion, not the only correct answer.</p></div>`;
  };

  /* ---------- EXERCISE ENGINE ---------- */
  // opts: {mode:'lesson'|'exam', src, onDone(results)}
  UI.runExercises = function (root, items, opts = {}) {
    const exam = opts.mode === 'exam';
    let i = 0; const results = [];
    const next = () => { i++; i < items.length ? show() : finish(); };
    function show() {
      const it = items[i];
      root.innerHTML = `<div class="ex-progress">${items.map((_, k) => `<span class="${k < i ? 'done' : k === i ? 'cur' : ''}"></span>`).join('')}</div>
        <div class="ex-card" data-type="${it.t}"><div class="ex-meta"><span class="tag">${skillName(it.skill)}</span><span class="muted">${i + 1} / ${items.length}</span></div><div class="ex-body"></div><div class="ex-fb" aria-live="polite"></div><div class="ex-foot"></div></div>`;
      const body = root.querySelector('.ex-body'), fb = root.querySelector('.ex-fb'), foot = root.querySelector('.ex-foot');
      const done = res => {
        res.skill = it.skill; results[i] = res;
        if (res.objective) S.record(it.skill, res.correct, res.correct ? null : { src: opts.src, prompt: it.q || it.en || it.say || it.prompt || '', expected: res.expected || '', given: res.given || '' });
        S.save();
        if (exam) {
          fb.innerHTML = `<p class="muted">Answer saved.</p>`;
        } else if (res.objective) {
          fb.innerHTML = `<div class="${res.correct ? 'fb-ok' : 'fb-no'}"><b>${res.correct ? (res.accent ? '✓ Correct — but check the accents.' : '✓ ¡Muy bien!') : '✗ Not quite.'}</b>
          ${res.expected ? `<div>Answer: <span class="es">${esc(res.expected)}</span> ${UI.spk(res.expected)}</div>` : ''}${it.ex ? `<div class="muted">${esc(it.ex)}</div>` : ''}</div>`;
        }
        foot.innerHTML = `<button class="btn primary" id="ex-next">${i < items.length - 1 ? 'Next →' : exam ? 'Finish exam' : 'Finish'}</button>`;
        const nb = foot.querySelector('#ex-next'); nb.onclick = next; nb.focus();
      };
      (R[it.t] || R.mc)(it, body, done, { exam, foot, fb });
    }
    function finish() { opts.onDone && opts.onDone(results); }
    show();
  };
  const skillName = s => ({ vocab: 'Vocabulary', grammar: 'Grammar', listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking' })[s] || s;
  UI.skillName = skillName;

  const R = {};
  R.mc = (it, body, done, ctx) => {
    const order = it.o.map((o, k) => k);
    body.innerHTML = `${it.text ? `<div class="readbox es">${esc(it.text)}</div>` : ''}<p class="q">${esc(it.q || '')}</p><div class="opts">${order.map(k => `<button class="opt" data-k="${k}">${esc(it.o[k])}</button>`).join('')}</div>`;
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (body.dataset.locked) return; body.dataset.locked = 1;
      const k = +b.dataset.k, ok = k === it.a;
      body.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (!ctx.exam && +x.dataset.k === it.a) x.classList.add('right'); });
      b.classList.add(ctx.exam ? 'chosen' : ok ? 'right' : 'wrong');
      done({ objective: true, correct: ok, score: ok ? 1 : 0, given: it.o[k], expected: it.o[it.a] });
    });
  };
  R.read = R.mc;
  R.listen = (it, body, done, ctx) => {
    const src = MA.Audio.source();
    body.innerHTML = `<p class="q">Listen and choose what you hear.</p><div class="listen-row"><button class="btn big-spk" data-say="${esc(it.say)}">🔊 Play</button><button class="btn ghost small" id="slow">🐢 Slower</button></div>
      ${src ? '' : `<p class="warn-box">Audio is unavailable here, so the text is shown: <b class="es">${esc(it.say)}</b></p>`}<div class="opts">${it.o.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;
    const slow = body.querySelector('#slow'); slow.onclick = e => { e.stopPropagation(); MA.Audio.speak(it.say, { rate: 0.7 }); };
    body.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (body.dataset.locked) return; body.dataset.locked = 1;
      const k = +b.dataset.k, ok = k === it.a;
      body.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (!ctx.exam && +x.dataset.k === it.a) x.classList.add('right'); });
      b.classList.add(ctx.exam ? 'chosen' : ok ? 'right' : 'wrong');
      done({ objective: true, correct: ok, score: ok ? 1 : 0, given: it.o[k], expected: ctx.exam ? it.o[it.a] : it.say });
    });
  };
  const textTask = (label, it, body, done, ctx) => {
    body.innerHTML = `<p class="q">${label}</p><div class="es prompt">${esc(it.q || it.en)}</div>
      <input type="text" id="ans" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="Type in Spanish…">${UI.accentBar()}
      <div class="row gap"><button class="btn primary" id="chk">${ctx.exam ? 'Submit answer' : 'Check'}</button>${it.hint ? `<span class="muted">Hint: ${esc(it.hint)}</span>` : ''}</div><div class="ai-slot"></div>`;
    const inp = body.querySelector('#ans'), chk = body.querySelector('#chk'), slot = body.querySelector('.ai-slot');
    const go = () => {
      const g = inp.value.trim(); if (!g) { inp.focus(); return; }
      const m = U.matchAnswer(g, it.a); inp.disabled = true; chk.disabled = true;
      const res = { objective: true, correct: m.ok, accent: m.ok && !m.exact && m.accent, score: m.ok ? 1 : 0, given: g, expected: it.a[0].replace(/^./, c => c.toUpperCase()) };
      if (!m.ok && it.t === 'tr' && MA.AI.ok() && ctx.exam) {
        slot.innerHTML = '<p class="muted">Checking your translation with Claude…</p>';
        MA.AI.checkTranslation(it.en, g, it.a).then(r => { if (r.acceptable) { res.correct = true; res.score = 1; res.method = 'ai'; } }).catch(() => { }).finally(() => { slot.innerHTML = ''; done(res); });
        return;
      }
      if (!m.ok && it.t === 'tr' && MA.AI.ok()) {
        slot.innerHTML = `<div class="row gap"><span class="muted">Your answer is different from our model answers. It may still be correct.</span><button class="btn ghost small" id="askai">Ask Claude to check it</button></div>`;
        slot.querySelector('#askai').onclick = async (ev) => {
          ev.target.disabled = true; ev.target.textContent = 'Checking…';
          try {
            const r = await MA.AI.checkTranslation(it.en, g, it.a);
            if (r.acceptable) { res.correct = true; res.score = 1; res.method = 'ai'; }
            slot.innerHTML = `<div class="aifb"><span class="pill ai">AI check</span> <b>${r.acceptable ? 'Acceptable ✓' : 'Not quite'}</b><p>${esc(r.explanation || '')}</p>${r.corrected ? `<p class="es">${esc(r.corrected)}</p>` : ''}</div>`;
          } catch (e) { slot.innerHTML = `<p class="warn-box">AI check failed (${esc(e.code || e.message || 'error')}). Your answer was marked by the model answers only.</p>`; }
          done(res);
        };
        {
          ctx.fb.innerHTML = `<div class="fb-no"><b>✗ Not matching the model answer.</b><div>Model: <span class="es">${esc(res.expected)}</span> ${UI.spk(res.expected)}</div></div>`;
          ctx.foot.innerHTML = `<button class="btn primary" id="skipai">Continue</button>`; ctx.foot.querySelector('#skipai').onclick = () => done(res);
        }
        return;
      }
      done(res);
    };
    chk.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; setTimeout(() => inp.focus(), 20);
  };
  R.fill = (it, body, done, ctx) => textTask('Fill in the blank.', it, body, done, ctx);
  R.fix = (it, body, done, ctx) => textTask('This sentence has a mistake. Write it correctly.', it, body, done, ctx);
  R.tr = (it, body, done, ctx) => textTask('Translate into Spanish.', it, body, done, ctx);
  R.order = (it, body, done, ctx) => {
    let picked = []; const pool = U.shuffle(it.w.map((w, k) => ({ w, k })));
    const draw = () => {
      body.innerHTML = `<p class="q">Put the words in order.${it.en ? ` <span class="muted">(${esc(it.en)})</span>` : ''}</p>
        <div class="tiles built" aria-label="Your sentence">${picked.map((p, n) => `<button class="tile on" data-n="${n}">${esc(p.w)}</button>`).join('') || '<span class="muted">Tap the words below…</span>'}</div>
        <div class="tiles">${pool.map(p => picked.includes(p) ? `<span class="tile ghost">${esc(p.w)}</span>` : `<button class="tile" data-k="${p.k}">${esc(p.w)}</button>`).join('')}</div>
        <div class="row gap"><button class="btn primary" id="chk" ${picked.length ? '' : 'disabled'}>${ctx.exam ? 'Submit answer' : 'Check'}</button><button class="btn ghost" id="rst">Reset</button></div>`;
      body.querySelectorAll('.tile[data-k]').forEach(b => b.onclick = () => { picked.push(pool.find(p => p.k === +b.dataset.k)); draw(); });
      body.querySelectorAll('.tile[data-n]').forEach(b => b.onclick = () => { picked.splice(+b.dataset.n, 1); draw(); });
      body.querySelector('#rst').onclick = () => { picked = []; draw(); };
      body.querySelector('#chk').onclick = () => {
        const g = picked.map(p => p.w).join(' '); const m = U.matchAnswer(g, it.a);
        body.querySelectorAll('button').forEach(b => b.disabled = true);
        done({ objective: true, correct: m.ok, score: m.ok ? 1 : 0, given: g, expected: it.a[0].replace(/^./, c => c.toUpperCase()) });
      };
    };
    draw();
  };
  R.match = (it, body, done, ctx) => {
    const left = U.shuffle(it.p.map((p, k) => ({ t: p[0], k }))), right = U.shuffle(it.p.map((p, k) => ({ t: p[1], k })));
    let sel = null, matched = new Set(), errors = 0;
    body.innerHTML = `<p class="q">Match the pairs.</p><div class="match"><div class="col">${left.map(l => `<button class="mt" data-side="l" data-k="${l.k}">${esc(l.t)}</button>`).join('')}</div><div class="col">${right.map(r => `<button class="mt" data-side="r" data-k="${r.k}">${esc(r.t)}</button>`).join('')}</div></div><p class="muted tiny" id="merr"></p>`;
    body.querySelectorAll('.mt').forEach(b => b.onclick = () => {
      if (matched.has(+b.dataset.k) && b.classList.contains('right')) return;
      if (!sel || sel.dataset.side === b.dataset.side) { body.querySelectorAll('.mt.sel').forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel'); if (b.dataset.side === 'l') MA.Audio.source() && MA.Audio.speak(b.textContent); return; }
      if (sel.dataset.k === b.dataset.k) { [sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('right'); x.disabled = true; }); matched.add(+b.dataset.k); }
      else { errors++; [sel, b].forEach(x => { x.classList.add('wrong'); setTimeout(() => x.classList.remove('wrong', 'sel'), 500); }); body.querySelector('#merr').textContent = `Mistakes: ${errors}`; }
      sel = null;
      if (matched.size === it.p.length) { const score = Math.max(0, (it.p.length - errors) / it.p.length); done({ objective: true, correct: errors === 0, score, given: `${errors} mismatches`, expected: '' }); }
    });
  };
  R.write = (it, body, done, ctx) => {
    body.innerHTML = `<p class="q">${esc(it.prompt)}</p><textarea id="wr" rows="6" aria-label="Your text" placeholder="Escribe aquí…"></textarea>${UI.accentBar()}<p class="tiny muted" id="wc">0 words · aim for ${it.minWords || 10}+</p>
      <details class="sample"><summary>Show a sample answer</summary><p class="es pre">${esc(it.sample)}</p></details>
      <div class="row gap wrap"><button class="btn primary" id="ai" ${MA.AI.ok() ? '' : 'disabled'}>✨ Get AI feedback</button><button class="btn ghost" id="self">Self-assess with the rubric</button>${MA.AI.ok() ? '' : '<span class="pill off">AI not available here — use the rubric</span>'}</div><div class="slot"></div>`;
    const ta = body.querySelector('#wr'), slot = body.querySelector('.slot');
    ta.oninput = () => body.querySelector('#wc').textContent = `${(ta.value.match(/\S+/g) || []).length} words · aim for ${it.minWords || 10}+`;
    body.querySelector('#ai').onclick = async ev => {
      if (!ta.value.trim()) { ta.focus(); return; }
      ev.target.disabled = true; slot.innerHTML = '<p class="muted">Claude is reading your text…</p>';
      try { const fb = await MA.AI.writingFeedback(it.prompt, ta.value, it.level || 'A1'); slot.innerHTML = UI.feedbackHTML(fb); ta.disabled = true; body.querySelector('#self').disabled = true; done({ objective: false, score: U.clamp((+fb.score || 0) / 4, 0, 1), method: 'ai', given: ta.value }); S.record('writing', (+fb.score || 0) >= 3); }
      catch (e) { ev.target.disabled = false; slot.innerHTML = `<p class="warn-box">AI feedback failed (${esc(e.code || e.message || 'error')}). Use the rubric instead.</p>`; }
    };
    body.querySelector('#self').onclick = () => {
      if (!ta.value.trim()) { ta.focus(); return; }
      UI.rubric(slot, it.rubric || ['Task completed', 'Grammar mostly correct', 'Vocabulary appropriate', 'Spelling and accents'], score => { ta.disabled = true; done({ objective: false, score, method: 'self', given: ta.value }); S.record('writing', score >= 0.75); });
    };
  };
  UI.rubric = function (slot, rubric, cb) {
    slot.innerHTML = `<div class="rubric"><p><b>Self-assessment rubric.</b> Compare with the sample answer and tick what is true.</p>${rubric.map((r, k) => `<label class="chk"><input type="checkbox" data-r="${k}"> ${esc(r)}</label>`).join('')}<button class="btn primary small" id="rb">Save self-assessment</button><p class="tiny muted">Self-assessed scores are marked as self-assessed in your progress.</p></div>`;
    slot.querySelector('#rb').onclick = () => { const n = slot.querySelectorAll('input:checked').length; slot.querySelector('#rb').disabled = true; cb(n / rubric.length); };
  };
  R.speak = (it, body, done, ctx) => {
    const micOK = MA.Mic.ok();
    body.innerHTML = `<p class="q">${esc(it.prompt)}</p>
      <div class="row gap wrap">${micOK ? '<button class="btn mic" id="mic">🎙️ Start speaking</button>' : '<span class="pill off">Microphone not available here — type what you would say</span>'}${UI.spk(it.sample, 'Hear a model answer')}<span class="tiny muted">Hear a model</span></div>
      <textarea id="tx" rows="3" aria-label="Transcript of what you said" placeholder="${micOK ? 'Your words appear here (you can edit them)…' : 'Type what you would say…'}"></textarea>${UI.accentBar()}
      <p class="tiny muted">${micOK ? 'Speech is turned into text by the platform’s dictation. This checks your <b>words</b>, not your pronunciation — there is no pronunciation score.' : ''}</p>
      <details class="sample"><summary>Show a sample answer</summary><p class="es">${esc(it.sample)}</p></details>
      <div class="row gap"><button class="btn primary" id="chk">${ctx.exam ? 'Submit answer' : 'Check my answer'}</button></div><div class="slot"></div>`;
    const tx = body.querySelector('#tx'), slot = body.querySelector('.slot');
    if (micOK) {
      const mic = body.querySelector('#mic'); let base = '', on = false;
      mic.onclick = () => {
        if (on) { MA.Mic.stop(); return; }
        base = tx.value ? tx.value + ' ' : '';
        MA.Mic.start(p => { tx.value = base + p; }, f => { base += f + ' '; tx.value = base; },
          (s) => { on = s === 'listening'; mic.classList.toggle('on', on); mic.textContent = on ? '⏹ Stop' : '🎙️ Start speaking'; });
      };
    }
    body.querySelector('#chk').onclick = async ev => {
      const g = tx.value.trim(); if (!g) { tx.focus(); return; }
      ev.target.disabled = true; if (MA.Mic.ok()) MA.Mic.stop();
      const nd = U.deacc(U.norm(g)); const hits = (it.target || []).filter(t => nd.includes(U.deacc(U.norm(t))));
      const base = (it.target || []).length ? hits.length / it.target.length : 1;
      let html = `<div class="${base >= 1 ? 'fb-ok' : 'fb-no'}"><b>Key phrases used: ${hits.length}/${(it.target || []).length}</b> ${(it.target || []).map(t => `<span class="tag ${hits.includes(t) ? 'ok' : ''}">${esc(t)}</span>`).join(' ')}</div>`;
      slot.innerHTML = html + (MA.AI.ok() ? '<p class="muted">Claude is checking your language…</p>' : '');
      let score = base, method = 'auto';
      if (MA.AI.ok()) {
        try { const fb = await MA.AI.writingFeedback('Spoken answer (transcribed by dictation; ignore punctuation and capital letters): ' + it.prompt, g); slot.innerHTML = html + UI.feedbackHTML(fb) + '<p class="tiny muted">This is language feedback on the transcript, not a measurement of pronunciation.</p>'; score = (base + U.clamp((+fb.score || 0) / 4, 0, 1)) / 2; method = 'ai'; }
        catch (e) { slot.innerHTML = html + `<p class="warn-box">AI feedback failed (${esc(e.code || 'error')}).</p>`; }
      }
      S.record('speaking', score >= 0.75);
      done({ objective: false, score, method, given: g });
    };
  };
  UI.R = R;
})();
