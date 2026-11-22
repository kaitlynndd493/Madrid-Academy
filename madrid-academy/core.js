/* MADRID ACADEMY — core: utilities, state, cloud sync, audio, AI, dictation, exercise engine */
window.MA = window.MA || {};
(function () {
  const U = MA.U = {};
  U.$ = (s, r = document) => r.querySelector(s);
  U.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  U.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  U.norm = s => String(s || '').toLowerCase().replace(/[¿¡.,!?;:"'«»()—\-…]/g, ' ').replace(/\s+/g, ' ').trim();
  U.deacc = s => String(s || '').replace(/ñ/g, '\u0001').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'ñ');
  U.shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  U.pct = (c, n) => n ? Math.round(100 * c / n) : 0;
  U.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  U.uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  U.matchAnswer = (given, answers) => {
    const g = U.norm(given), gd = U.deacc(g);
    if (!g) return { ok: false };
    for (const a of answers) {
      const n = U.norm(a);
      if (n === g) return { ok: true, exact: true, model: a };
    }
    for (const a of answers) {
      if (U.deacc(U.norm(a)) === gd) return { ok: true, exact: false, model: a, accent: answers.some(x => /[áéíóúü]/.test(x)) };
    }
    return { ok: false };
  };

  /* ---------- Castilian rule-based IPA (approximate, for words without a hand-written entry) ---------- */
  U.autoIPA = function (word) {
    let w = word.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
    if (!w) return '';
    const V = 'aeiouáéíóúü', strongAcc = 'áéíóú'; const isFront = ch => !!ch && 'eéií'.includes(ch);
    // syllabify (orthographic)
    const isV = c => !!c && V.includes(c);
    const insep = ['pr', 'br', 'tr', 'dr', 'cr', 'gr', 'fr', 'pl', 'bl', 'cl', 'gl', 'fl', 'ch', 'll', 'rr', 'qu', 'gu'];
    // nuclei: group vowels, split strong-strong (a,e,o + a,e,o) and accented weak
    const units = [];
    for (let i = 0; i < w.length; i++) {
      if ((w[i] === 'c' && w[i + 1] === 'h') || (w[i] === 'l' && w[i + 1] === 'l') || (w[i] === 'r' && w[i + 1] === 'r')) { units.push(w[i] + w[i + 1]); i++; }
      else units.push(w[i]);
    }
    const strong = c => 'aeoáéó'.includes(c) || 'íú'.includes(c);
    const syl = []; let cur = '';
    const vowelIdx = units.map(u => isV(u));
    // build syllables
    let i = 0; const out = [];
    while (i < units.length) {
      let onset = '';
      while (i < units.length && !vowelIdx[i]) { onset += units[i]; i++; }
      let nuc = '';
      while (i < units.length && vowelIdx[i]) {
        const c = units[i];
        if (nuc && strong(nuc[nuc.length - 1]) && strong(c)) break;
        nuc += c; i++;
      }
      // consonants until next vowel
      let j = i, cons = [];
      while (j < units.length && !vowelIdx[j]) { cons.push(units[j]); j++; }
      let coda = '';
      if (j >= units.length) { coda = cons.join(''); i = j; }
      else if (cons.length === 1) { coda = ''; }
      else if (cons.length >= 2) {
        const last2 = cons.slice(-2).join('');
        const take = insep.includes(last2) && cons.length >= 2 ? cons.length - 2 : cons.length - 1;
        coda = cons.slice(0, take).join(''); i += take;
      }
      out.push(onset + nuc + coda);
      if (!nuc) break;
    }
    if (out.length === 0) return '';
    // fix: leading consonant-only syllable merges
    // stress
    let stress = out.findIndex(s => [...s].some(c => strongAcc.includes(c)));
    if (stress < 0) stress = /[aeiouns]$/.test(w) ? Math.max(0, out.length - 2) : out.length - 1;
    const map = (s, prevChar, nextChar, atStart) => {
      let r = '';
      for (let k = 0; k < s.length; k++) {
        const c = s[k], n = s[k + 1] || nextChar || '', p = k ? s[k - 1] : prevChar;
        const two = c + n;
        if (two === 'ch') { r += 't͡ʃ'; k++; continue; }
        if (two === 'll') { r += 'ʝ'; k++; continue; }
        if (two === 'rr') { r += 'r'; k++; continue; }
        if (two === 'qu') { r += 'k'; k++; continue; }
        if (c === 'g' && n === 'u' && isFront(s[k + 2] || '')) { r += (atStart && k === 0) || p === 'n' ? 'ɡ' : 'ɣ'; k++; continue; }
        if (c === 'g' && n === 'ü') { r += 'ɣw'; k++; continue; }
        switch (c) {
          case 'á': r += 'a'; break; case 'é': r += 'e'; break; case 'í': r += 'i'; break; case 'ó': r += 'o'; break; case 'ú': case 'ü': r += 'u'; break;
          case 'i': r += (isV(n) || (p && 'aeoáéó'.includes(p))) ? 'j' : 'i'; break;
          case 'u': r += isV(n) ? 'w' : (p && isV(p) && p !== 'i' ? 'w' : 'u'); break;
          case 'c': r += isFront(n) ? 'θ' : 'k'; break;
          case 'z': r += 'θ'; break;
          case 'j': r += 'x'; break;
          case 'g': r += isFront(n) ? 'x' : ((atStart && k === 0) || p === 'n' ? 'ɡ' : 'ɣ'); break;
          case 'h': break;
          case 'ñ': r += 'ɲ'; break;
          case 'y': r += isV(n) ? 'ʝ' : (p && isV(p) ? 'j' : 'i'); break;
          case 'v': case 'b': r += ((atStart && k === 0) || p === 'm' || p === 'n') ? 'b' : 'β'; break;
          case 'd': r += ((atStart && k === 0) || p === 'n' || p === 'l') ? 'd' : 'ð'; break;
          case 'r': r += ((atStart && k === 0) || p === 'n' || p === 'l' || p === 's') ? 'r' : 'ɾ'; break;
          case 'x': r += 'ks'; break;
          case 'n': r += (n === 'g' || n === 'c' && !isFront(s[k + 2] || '') || n === 'k' || n === 'q') ? 'ŋ' : (n === 'b' || n === 'v' || n === 'p') ? 'm' : 'n'; break;
          default: r += c;
        }
      }
      return r;
    };
    let ipa = '';
    out.forEach((s, idx) => {
      const prev = idx ? out[idx - 1].slice(-1) : '';
      const next = out[idx + 1] ? out[idx + 1][0] : '';
      const m = map(s, prev, next, idx === 0);
      ipa += (idx === stress && out.length > 1 ? 'ˈ' : '') + m;
    });
    return ipa;
  };

  /* ---------- STATE ---------- */
  const DEF = () => ({
    v: 1, updatedAt: 0,
    profile: { name: '', tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Madrid'), createdAt: Date.now(), showTr: true, threshold: 80, voiceMode: 'auto', rate: 1, autoSpeak: true, explore: false, onboarded: false },
    avatar: Object.assign({}, MA.DEFAULT_AVATAR),
    ledger: {}, spent: {}, owned: {}, attendance: {}, lessons: {}, exams: {}, homework: {}, vocab: {}, custom: {},
    mistakes: [], quests: {}, stories: {}, radio: {}, study: {}, answers: {}, journal: [], writings: {}, chats: {}, arrivals: {}, readings: {}, idioms: {}, dialogs: {}
  });
  const S = MA.S = { state: DEF(), cloud: 'connecting', ref: null, listeners: [], lastRemote: '' };
  const LS_KEY = 'madrid-academy-v1';
  S.onChange = fn => S.listeners.push(fn);
  S.emit = () => S.listeners.forEach(f => { try { f(); } catch (e) { console.error(e); } });

  function mergeMax(a = {}, b = {}) { const r = Object.assign({}, a); for (const k in b) { if (!(k in r)) r[k] = b[k]; } return r; }
  S.merge = function (a, b) {
    if (!b) return a; if (!a) return b;
    const newer = (a.updatedAt || 0) >= (b.updatedAt || 0) ? a : b, older = newer === a ? b : a;
    const m = JSON.parse(JSON.stringify(Object.assign(DEF(), newer)));
    ['ledger', 'spent', 'owned', 'attendance', 'quests', 'homework', 'custom', 'writings', 'arrivals', 'readings', 'idioms', 'dialogs'].forEach(k => m[k] = mergeMax(m[k], older[k]));
    m.lessons = Object.assign({}, older.lessons || {}, m.lessons);
    for (const id in older.lessons || {}) { const o = older.lessons[id], n = m.lessons[id]; if (n && o) m.lessons[id] = { done: n.done || o.done, best: Math.max(n.best || 0, o.best || 0), attempts: Math.max(n.attempts || 0, o.attempts || 0), t: Math.max(n.t || 0, o.t || 0) }; }
    m.exams = Object.assign({}, older.exams || {}, m.exams);
    for (const id in older.exams || {}) { const all = [...(m.exams[id] || []), ...(older.exams[id] || [])]; const seen = new Set(); m.exams[id] = all.filter(x => !seen.has(x.t) && seen.add(x.t)).sort((x, y) => x.t - y.t); }
    m.vocab = Object.assign({}, older.vocab || {}, m.vocab);
    for (const id in older.vocab || {}) { const o = older.vocab[id], n = m.vocab[id]; if (n && o && (o.last || 0) > (n.last || 0)) m.vocab[id] = o; }
    ['stories', 'radio'].forEach(k => { m[k] = Object.assign({}, older[k] || {}, m[k]); });
    ['study', 'answers'].forEach(k => {
      const o = older[k] || {};
      for (const day in o) { m[k][day] = m[k][day] || {}; for (const f in o[day]) { const ov = o[day][f], nv = m[k][day][f]; if (typeof ov === 'number') m[k][day][f] = Math.max(nv || 0, ov); else if (ov && typeof ov === 'object') m[k][day][f] = (!nv || (ov.n || 0) > (nv.n || 0)) ? ov : nv; } }
    });
    const mk = new Set(); m.mistakes = [...(m.mistakes || []), ...(older.mistakes || [])].filter(x => { const k = x.k + x.t; return !mk.has(k) && mk.add(k); }).sort((x, y) => y.t - x.t).slice(0, 150);
    const jk = new Set(); m.journal = [...(m.journal || []), ...(older.journal || [])].filter(x => !jk.has(x.id) && jk.add(x.id)).sort((x, y) => y.t - x.t);
    m.profile.onboarded = !!(a.profile?.onboarded || b.profile?.onboarded);
    // appearance and settings keep their own timestamps, so an older copy of the app open elsewhere cannot overwrite them
    const av = (a.avatarAt || 0) >= (b.avatarAt || 0) ? a : b; m.avatar = JSON.parse(JSON.stringify(av.avatar || m.avatar)); m.avatarAt = av.avatarAt || 0;
    const pf = (a.profileAt || 0) >= (b.profileAt || 0) ? a : b; if (pf.profileAt) { m.profile = Object.assign({}, m.profile, JSON.parse(JSON.stringify(pf.profile))); m.profile.onboarded = !!(a.profile?.onboarded || b.profile?.onboarded); m.profileAt = pf.profileAt; }
    // check-in system removed: never bring back attendance or check-in rewards from older copies
    m.attendance = {}; Object.keys(m.ledger).forEach(k => { if (k.startsWith('checkin:') || k.startsWith('daily:checkin:')) delete m.ledger[k]; });
    m.v = Math.max(a.v || 1, b.v || 1);
    return m;
  };

  S.loadLocal = function () {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) S.state = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { S.localBroken = true; }
  };
  let saveTimer = null, writing = false, pending = false;
  S.save = function (immediate) {
    S.state.updatedAt = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(S.state)); } catch (e) { }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(S.pushCloud, immediate ? 50 : 1200);
    S.emit();
  };
  S.pushCloud = async function () {
    if (!S.ref) return;
    if (writing) { pending = true; return; }
    writing = true;
    const json = JSON.stringify(S.state);
    try { await S.ref.set({ json, updatedAt: S.state.updatedAt }); S.lastRemote = json; S.cloud = 'synced'; S.lastSync = Date.now(); }
    catch (e) { console.warn('cloud save failed', e); S.cloud = 'error'; S.cloudErr = e && (e.message || e.code) || 'write refused'; }
    writing = false; S.emit();
    if (pending) { pending = false; S.pushCloud(); }
  };
  const docData = snap => { if (!snap) return null; if (typeof snap.data === 'function') return snap.data(); if (snap.exists === false) return null; return snap; };
  S.applyRemote = function (d) {
    if (!d || !d.json || d.json === S.lastRemote) return;
    let remote; try { remote = JSON.parse(d.json); } catch (e) { return; }
    S.lastRemote = d.json;
    const merged = S.merge(S.state, remote);
    const changed = JSON.stringify(merged) !== JSON.stringify(S.state);
    S.state = merged;
    try { localStorage.setItem(LS_KEY, JSON.stringify(S.state)); } catch (e) { }
    if (JSON.stringify(merged) !== d.json) setTimeout(S.pushCloud, 400);
    if (changed) S.emit();
  };
  S.initCloud = async function () {
    const use = window.claude && window.claude.use;
    if (!use) { S.cloud = 'off'; S.emit(); return; }
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) { S.cloud = 'off'; S.emit(); return; }
      const id = await user.id();
      if (!id) { S.cloud = 'off'; S.emit(); return; }
      S.ref = db.collection('data/users/' + id).doc('state');
      let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; S.cloud = 'error'; S.cloudErr = 'Cloud did not answer in 10 s — working on this device; will retry.'; S.emit(); }, 10000);
      try {
        const snap = await S.ref.get();
        clearTimeout(timer);
        const d = docData(snap);
        if (d && d.json) S.applyRemote(d); else S.pushCloud();
        S.cloud = 'synced'; S.lastSync = Date.now();
      } catch (e) { clearTimeout(timer); S.cloud = 'error'; S.cloudErr = e && (e.message || e.code) || 'read failed'; }
      try { S.ref.onSnapshot(snap => { S.applyRemote(docData(snap)); }, err => { console.warn(err); }); } catch (e) { }
      S.emit();
    } catch (e) { S.cloud = 'off'; S.emit(); }
  };

  /* ---------- derived values ---------- */
  const st = () => S.state;
  S.xp = () => Object.values(st().ledger).reduce((a, x) => a + (x.xp || 0), 0);
  S.coins = () => Object.values(st().ledger).reduce((a, x) => a + (x.coins || 0), 0) - Object.values(st().spent).reduce((a, x) => a + (x.coins || 0), 0);
  S.level = () => { const xp = S.xp(); let lv = 1, need = 100, acc = 0; while (xp >= acc + need) { acc += need; lv++; need = Math.round(need * 1.25); } return { lv, into: xp - acc, need }; };
  S.dayKey = (ts = Date.now()) => { try { return new Intl.DateTimeFormat('en-CA', { timeZone: st().profile.tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ts)); } catch (e) { return new Date(ts).toISOString().slice(0, 10); } };
  S.today = () => S.dayKey();
  S.checkedIn = () => true; // check-in removed
  S.addDays = (key, n) => { const d = new Date(key + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  S.streak = () => { const a = st().attendance; let k = S.today(); if (!a[k]) k = S.addDays(k, -1); let n = 0; while (a[k]) { n++; k = S.addDays(k, -1); } return n; };
  S.bestStreak = () => { const days = Object.keys(st().attendance).sort(); let best = 0, run = 0, prev = null; days.forEach(d => { run = prev && S.addDays(prev, 1) === d ? run + 1 : 1; best = Math.max(best, run); prev = d; }); return best; };
  S.award = function (key, xp, coins = 0, label = '') {
    if (st().ledger[key]) return false;
    st().ledger[key] = { xp, coins, t: Date.now(), label };
    S.save();
    MA.UI && MA.UI.toast(`<b>+${xp} XP</b>${coins ? ` · +${coins} 🪙` : ''}${label ? ` · ${U.esc(label)}` : ''}`, 'xp');
    return true;
  };
  S.earned = key => !!st().ledger[key];
  S.lessonDone = id => !!(st().lessons[id] && st().lessons[id].done);
  S.chapterLessonsDone = c => c.lessons.every(l => S.lessonDone(l.id));
  S.examPassed = cid => (st().exams[cid] || []).some(x => x.passed);
  S.questDone = id => !!(st().quests[id] && st().quests[id].status === 'done');
  S.unlocked = function (u) {
    if (!u || st().profile.explore) return true;
    if (u.quest && !S.questDone(u.quest)) return false;
    if (u.lesson && !S.lessonDone(u.lesson)) return false;
    if (u.exam && !S.examPassed(u.exam)) return false;
    if (u.chapter) return false;
    return true;
  };
  S.record = function (skill, ok, mistake) {
    const d = S.today(); const a = st().answers[d] = st().answers[d] || {};
    const r = a[skill] = a[skill] || { c: 0, n: 0 }; r.n++; if (ok) r.c++;
    if (!ok && mistake) { st().mistakes.unshift(Object.assign({ t: Date.now(), skill, k: U.uid() }, mistake)); st().mistakes = st().mistakes.slice(0, 150); }
  };
  S.skillStats = function (days = 30) {
    const cutoff = S.addDays(S.today(), -days + 1); const r = {};
    for (const d in st().answers) { if (d < cutoff) continue; for (const k in st().answers[d]) { r[k] = r[k] || { c: 0, n: 0 }; r[k].c += st().answers[d][k].c; r[k].n += st().answers[d][k].n; } }
    return r;
  };
  S.minutes = (day) => { const s = st().study[day] || {}; return Math.round(Object.values(s).reduce((a, b) => a + b, 0) / 60); };
  S.cefr = function () {
    const passed = MA.CHAPTERS.filter(c => S.examPassed(c.id));
    const lvl = MA.LEVELS[0];
    return { working: 'A1', assessed: null, passedChapters: passed.length, plannedA1: lvl.plannedChapters.length };
  };

  /* ---------- SPACED REPETITION (SM-2 style) ---------- */
  const DAY = 86400000;
  S.saveWord = function (id, entry) {
    if (entry) st().custom[id] = entry;
    if (!st().vocab[id]) { st().vocab[id] = { saved: Date.now(), ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now(), last: Date.now() }; S.save(); return true; }
    return false;
  };
  S.unsaveWord = function (id) { delete st().vocab[id]; S.save(); };
  S.word = id => MA.V[id] || st().custom[id];
  S.due = () => Object.entries(st().vocab).filter(([id, v]) => v.due <= Date.now() && S.word(id)).map(([id]) => id);
  S.grade = function (id, q) { // q: 0 again, 1 hard, 2 good, 3 easy
    const c = st().vocab[id]; if (!c) return;
    if (q === 0) { c.reps = 0; c.lapses++; c.ease = Math.max(1.3, c.ease - 0.2); c.interval = 0; c.due = Date.now() + 10 * 60000; }
    else {
      c.reps++;
      if (c.reps === 1) c.interval = q === 1 ? 1 : q === 3 ? 3 : 1;
      else if (c.reps === 2) c.interval = q === 1 ? 2 : q === 3 ? 6 : 3;
      else c.interval = Math.round(c.interval * c.ease * (q === 1 ? 0.8 : q === 3 ? 1.3 : 1));
      c.ease = U.clamp(c.ease + (q === 3 ? 0.15 : q === 1 ? -0.15 : 0), 1.3, 3);
      c.due = Date.now() + c.interval * DAY;
    }
    c.last = Date.now();
    S.record('srs', q >= 2);
    S.save();
  };
  S.mastered = () => Object.values(st().vocab).filter(v => v.interval >= 7).length;

  /* ---------- AUDIO (Claude voice → browser es-ES voice → unavailable) ---------- */
  const A = MA.Audio = { tts: null, ttsChecked: false, lineCb: null, stateCb: null, speaking: false };
  A.init = async function () {
    try { if (window.claude && window.claude.use) A.tts = await window.claude.use('tts'); } catch (e) { A.tts = null; }
    A.ttsChecked = true;
    if (A.tts) {
      try { A.tts.onLine(({ id }) => A.lineCb && A.lineCb(id)); A.tts.onState(({ state }) => { A.speaking = state === 'speaking'; A.stateCb && A.stateCb(state); }); } catch (e) { }
    }
    S.emit();
  };
  A.voices = () => { try { return speechSynthesis.getVoices(); } catch (e) { return []; } };
  A.browserVoice = () => { const v = A.voices(); return v.find(x => x.lang === 'es-ES') || v.find(x => /^es[-_]ES/i.test(x.lang)) || v.find(x => /^es/i.test(x.lang)) || null; };
  A.hasBrowser = () => 'speechSynthesis' in window && !!A.browserVoice();
  A.source = () => { const m = st().profile.voiceMode; if (m === 'off') return null; if (m !== 'browser' && A.tts) return 'claude'; if (A.hasBrowser()) return 'browser'; if (m === 'browser' && A.tts) return 'claude'; return null; };
  A.label = () => ({ claude: 'Claude voice (text-to-speech)', browser: 'Browser Spanish voice: ' + (A.browserVoice() || {}).name, null: 'No audio available' })[A.source()];
  A.stop = () => { try { A.tts && A.tts.stop(); } catch (e) { } try { speechSynthesis.cancel(); } catch (e) { } A.speaking = false; };
  A.speak = function (text, opts = {}) {
    const src = A.source(); const rate = opts.rate || st().profile.rate || 1;
    if (!src) { MA.UI.toast('Audio is unavailable here. Read the text instead (see Settings → Audio).', 'warn'); return Promise.resolve(false); }
    if (src === 'claude') {
      return A.tts.speak(text, { language: 'es-ES', voice: opts.voice || 'airy', rate }).then(() => true).catch(e => {
        if (e && e.code === 'not_granted') { A.tts = null; S.emit(); }
        if (A.hasBrowser()) return A.browserSpeak(text, rate);
        MA.UI.toast('Could not play audio (' + (e && e.code || 'error') + ').', 'warn'); return false;
      });
    }
    return A.browserSpeak(text, rate);
  };
  A.browserSpeak = function (text, rate) {
    return new Promise(res => {
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; const v = A.browserVoice(); if (v) u.voice = v; u.rate = rate || 1;
        u.onend = () => res(true); u.onerror = () => res(false); speechSynthesis.speak(u);
      } catch (e) { res(false); }
    });
  };
  // lines: [{text, voice}] ; onLine(index)
  A.speakLines = async function (lines, onLine, rate) {
    const src = A.source(); rate = rate || st().profile.rate || 1;
    if (!src) { MA.UI.toast('Audio is unavailable here.', 'warn'); return false; }
    A.stop();
    if (src === 'claude') {
      A.lineCb = id => onLine && onLine(+id);
      try { await A.tts.speak(lines.map((l, i) => ({ text: l.text, voice: l.voice || 'airy', language: 'es-ES', rate, id: String(i) }))); return true; }
      catch (e) { if (e && (e.code === 'viewer_stopped' || e.code === 'stopped')) return false; if (!A.hasBrowser()) return false; }
    }
    A.cancelLines = false;
    for (let i = 0; i < lines.length; i++) {
      if (A.cancelLines) break;
      onLine && onLine(i);
      const ok = await A.browserSpeak(lines[i].text, rate);
      if (!ok) break;
    }
    return true;
  };
  A.stopLines = () => { A.cancelLines = true; A.stop(); };
  A.pause = () => { try { if (A.source() === 'claude') A.tts.pause(); else speechSynthesis.pause(); } catch (e) { } };
  A.resume = () => { try { if (A.source() === 'claude') A.tts.resume(); else speechSynthesis.resume(); } catch (e) { } };
  try { speechSynthesis.onvoiceschanged = () => S.emit(); } catch (e) { }

  /* ---------- AI (Claude via the page's sample capability) ---------- */
  const AI = MA.AI = { s: null, checked: false, denied: false };
  AI.init = async function () { try { if (window.claude && window.claude.use) AI.s = await window.claude.use('sample'); } catch (e) { AI.s = null; } AI.checked = true; S.emit(); };
  AI.ok = () => !!AI.s && !AI.denied;
  AI.json = async function (input, opts = {}) {
    if (!AI.ok()) throw { code: 'unavailable', message: 'AI is not available on this page.' };
    try { return await AI.s.json(input, Object.assign({ modelTier: 'default', cache: false }, opts)); }
    catch (e) {
      if (e && e.code === 'not_granted') { AI.denied = true; S.emit(); }
      throw e;
    }
  };
  AI.learnerSummary = function () {
    const s = st(); const done = Object.keys(s.lessons).filter(k => s.lessons[k].done);
    const stats = S.skillStats(30); const weak = Object.entries(stats).filter(([k, v]) => v.n >= 4 && v.c / v.n < 0.7).map(([k]) => k);
    return `Learner: ${s.profile.name || 'the student'}, a young woman studying Spanish in Madrid. Working stage: A1 beginner, based on completed content (not a certified level). Completed lessons: ${done.map(id => MA.LESSONS[id] ? MA.LESSONS[id].title : id).join(', ') || 'none yet'}. Chapter exams passed: ${MA.CHAPTERS.filter(c => S.examPassed(c.id)).map(c => c.title).join(', ') || 'none'}. Weak skills: ${weak.join(', ') || 'none detected yet'}. Recent mistakes: ${s.mistakes.slice(0, 5).map(m => `"${m.given || ''}" (expected "${m.expected || ''}")`).join('; ') || 'none'}. Saved words: ${Object.keys(s.vocab).length}.`;
  };
  AI.writingFeedback = function (prompt, text, level = 'A1') {
    return AI.json(`You are a kind, precise Spanish teacher (European Spanish, Spain). Evaluate a ${level} learner's writing. Explanations in simple English.
Task: ${prompt}
Learner's text:
"""${text}"""
Return ONLY JSON: {"score": integer 0-4 (0 = not attempted, 4 = task done with very few errors for ${level}), "summary": "1-2 short sentences", "errors": [{"type": "grammar|vocabulary|word order|spelling|naturalness", "original": "...", "correction": "...", "explanation": "short, simple English"}], "corrected_text": "the learner's text with minimal corrections", "natural_version": "how a person from Madrid might say it, still at ${level}", "alternatives": ["another acceptable way to say one sentence"], "praise": "one specific thing done well"}
Do not invent errors. Many different correct answers are possible; accept any correct Spanish.`);
  };
  AI.checkTranslation = function (en, given, models) {
    return AI.json(`A learner of European Spanish (A1) translated this English sentence into Spanish.
English: "${en}"
Learner: "${given}"
Reference answers (others may also be correct): ${models.map(m => `"${m}"`).join(', ')}
Decide if the learner's Spanish is correct and natural enough for A1 (ignore missing ¿¡ and capital letters; accents count as small errors). Return ONLY JSON: {"acceptable": true|false, "corrected": "corrected version", "explanation": "1-2 short sentences in simple English"}`, { modelTier: 'quick' });
  };

  /* ---------- DICTATION ---------- */
  const M = MA.Mic = { d: null, checked: false, denied: false, partial: null, final: null, state: null };
  M.init = async function () {
    try { if (window.claude && window.claude.use) M.d = await window.claude.use('dictation'); } catch (e) { M.d = null; }
    M.checked = true;
    if (M.d) { try { M.d.onPartial(({ text }) => M.partial && M.partial(text)); M.d.onFinal(({ text }) => M.final && M.final(text)); M.d.onState(({ state, reason }) => M.state && M.state(state, reason)); } catch (e) { } }
    S.emit();
  };
  M.ok = () => !!M.d && !M.denied;
  M.start = function (onPartial, onFinal, onState) {
    M.partial = onPartial; M.final = onFinal; M.state = onState;
    return M.d.start().catch(e => {
      if (e && e.code === 'not_granted') { M.denied = true; MA.UI.toast('Microphone permission was declined. You can type your answer instead.', 'warn'); S.emit(); }
      else MA.UI.toast('Could not start the microphone (' + (e && e.code || 'error') + '). Type instead.', 'warn');
      onState && onState('idle', 'error');
    });
  };
  M.stop = () => { try { return M.d && Promise.resolve(M.d.stop()).catch(() => { }); } catch (e) { } };
})();
