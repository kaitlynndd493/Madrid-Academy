/* MADRID ACADEMY — router, shell and core screens */
(function () {
  const { U, S, UI } = MA; const { esc } = U; const st = () => S.state;
  const V = MA.VIEWS = {}; const H = MA.H = {};
  let mounts = [];
  H.after = fn => mounts.push(fn);
  H.current = { name: 'home', arg: '' };

  H.NAV = [
    ['home', 'Home', '🏠'], ['map', 'Madrid Map', '🗺️'], ['academy', 'Academia Madrid', '🏛️'], ['vocab', 'Vocabulary Museum', '🖼️'],
    ['grammar', 'Grammar & Writing', '✒️'], ['library', 'Fairy Tale Library', '📚'], ['radio', 'Madrid Radio', '📻'], ['speak', 'Speaking Café', '☕'],
    ['quests', 'Quest Journal', '📜'], ['exams', 'Homework & Exams', '📝'], ['passport', 'Spanish Passport', '🛂'], ['progress', 'Progress', '📈'],
    ['wardrobe', 'Avatar Wardrobe', '👗'], ['preferences', 'Settings', '⚙️']
  ];
  const CAT = { home: 'review', vocab: 'vocab', 'vocab-review': 'review', game: 'vocab', grammar: 'grammar', write: 'grammar', library: 'reading', story: 'reading', radio: 'listening', speak: 'speaking', chat: 'speaking', quest: 'speaking', review: 'review', exam: 'review', homework: 'grammar', 'prado-write': 'grammar', journal: 'grammar', expressions: 'vocab' };
  H.catOf = (name, arg) => name === 'lesson' && MA.LESSONS[arg] ? ({ vocab: 'vocab', grammar: 'grammar', speaking: 'speaking', listening: 'listening' })[MA.LESSONS[arg].skill] : CAT[name];

  /* ---------- helpers ---------- */
  H.portrait = (look, cls = '') => `<div class="portrait ${cls}">${MA.avatarSVG(look, { portrait: true })}</div>`;
  H.me = () => Object.assign({}, st().avatar);
  H.greeting = () => { let h = 12; try { h = +new Intl.DateTimeFormat('en-GB', { timeZone: st().profile.tz, hour: 'numeric', hour12: false }).format(new Date()); } catch (e) { } return h < 14 ? '¡Buenos días' : h < 21 ? '¡Buenas tardes' : '¡Buenas noches'; };
  H.dateES = (ts = Date.now()) => { try { return new Intl.DateTimeFormat('es-ES', { timeZone: st().profile.tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(ts)); } catch (e) { return new Date(ts).toDateString(); } };
  H.fmtDate = ts => new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  H.motto = () => { const d = S.today(); const n = d.split('-').reduce((a, b) => a + +b, 0); return MA.MOTTOS[n % MA.MOTTOS.length]; };
  H.vcard = id => { const w = S.word(id); if (!w) return ''; const saved = !!st().vocab[id]; return `<button class="vcard ${saved ? 'saved' : ''}" data-word="${esc(id)}"><div class="vc-ill">${w.img && MA.hasIllustration(w.img) ? MA.illustration(w.img) : `<span class="mono">${esc(w.es.replace(/[¿¡]/g, '').replace(/^(el\/la|el|la|los|las)\s+/i, '')[0].toUpperCase())}</span>`}</div><div class="vc-es">${esc(w.es)}</div><div class="vc-en">${esc(w.en)}</div>${saved ? '<span class="vc-saved" title="In your vocabulary book">★</span>' : ''}</button>`; };
  H.nextLesson = () => { for (const c of MA.CHAPTERS) for (const l of c.lessons) if (!S.lessonDone(l.id)) return l; return null; };
  H.currentChapter = () => MA.CHAPTERS.find(c => !S.examPassed(c.id)) || MA.CHAPTERS[MA.CHAPTERS.length - 1];
  H.placeUnlocked = id => { const p = MA.LOCATIONS.find(x => x.id === id); return !p || S.unlocked(p.unlock); };
  H.actHref = a => '#' + a.replace('vocab-cat:', 'vocab-').replace(':', '-');
  H.lockedScreen = (title, why, link) => `<div class="panel center locked-screen"><div class="lock-big">🔒</div><h2>${esc(title)}</h2><p>${esc(why)}</p>${link ? `<a class="btn primary" href="${link[0]}">${esc(link[1])}</a>` : ''}<p class="tiny muted">Preview everything now: Settings → Explore mode.</p></div>`;

  /* word detail modal */
  H.openWord = function (id) {
    const w = S.word(id); if (!w) return;
    const saved = !!st().vocab[id];
    UI.modal(`<div class="word-detail">
      <div class="wd-ill">${w.img && MA.hasIllustration(w.img) ? MA.illustration(w.img) + '<span class="tiny muted">Stylized 3D-style illustration</span>' : `<div class="mono big">${esc(w.es.replace(/[¿¡]/g, '').replace(/^(el\/la|el|la|los|las)\s+/i, '')[0].toUpperCase())}</div>`}</div>
      <div class="wd-main"><h2 class="es">${esc(w.es)} ${UI.spk(w.es)}</h2><p class="en">${esc(w.en)}</p>
      <p><span class="ipa">/${esc(w.ipa || U.autoIPA(w.es))}/</span> <span class="tiny muted">IPA · Castilian${w.ipa ? '' : ' (rule-based)'}</span></p>
      <p class="chips">${w.pos ? `<span class="tag">${esc(w.pos)}</span>` : ''}${w.gender ? `<span class="tag">gender: ${esc(w.gender)}</span>` : ''}${w.plural ? `<span class="tag">plural: ${esc(w.plural)}</span>` : ''}</p>
      ${w.ex ? `<div class="example"><p class="es">${esc(w.ex)} ${UI.spk(w.ex)}</p><p class="muted">${esc(w.exEn || '')}</p></div>` : ''}
      ${w.note ? `<p class="note">${esc(w.note)}</p>` : ''}
      ${(w.coll || []).length ? `<h5>Common collocations</h5><p>${w.coll.map(esc).join(' · ')}</p>` : ''}
      ${(w.rel || []).length ? `<h5>Related</h5><p>${w.rel.map(esc).join(' · ')}</p>` : ''}
      ${w.idiom ? `<h5>Idiom</h5><p class="es">${esc(w.idiom)}</p>` : ''}
      <div class="row gap wrap"><button class="btn ${saved ? 'ghost' : 'primary'}" id="wd-save">${saved ? '★ Saved — remove' : '☆ Save to vocabulary book'}</button>
      ${saved ? `<span class="tiny muted">Next review: ${st().vocab[id].due <= Date.now() ? 'now' : H.fmtDate(st().vocab[id].due)}</span>` : ''}</div></div></div>`,
      c => c.querySelector('#wd-save').onclick = () => { if (st().vocab[id]) { S.unsaveWord(id); UI.toast('Removed from your vocabulary book'); } else { S.saveWord(id); UI.toast('★ Saved to your vocabulary book'); } UI.closeModal(); H.render(); });
  };

  /* ---------- SHELL ---------- */
  H.shell = function () {
    const lv = S.level(), cur = H.current.name;
    const cloud = { synced: ['ok', '☁ Synced'], connecting: ['wait', '☁ Connecting…'], error: ['warn', '⚠ Sync issue'], off: ['off', '💾 This device only'] }[S.cloud] || ['off', S.cloud];
    U.$('#nav').innerHTML = `<a class="brand" href="#home"><span class="crest">MA</span><span><b>Madrid Academy</b><small>A Spanish Adventure</small></span></a>
      <nav aria-label="Main">${H.NAV.map(([id, label, ic]) => `<a href="#${id}" class="${cur === id || (id === 'academy' && ['lesson', 'review', 'curriculum'].includes(cur)) || (id === 'exams' && ['exam', 'homework'].includes(cur)) || (id === 'speak' && cur === 'chat') || (id === 'quests' && cur === 'quest') || (id === 'library' && cur === 'story') || (id === 'map' && cur === 'place') || (id === 'vocab' && ['vocab-review', 'game'].includes(cur)) || (id === 'grammar' && cur === 'write') ? 'on' : ''}"><span class="ic">${ic}</span><span>${label}</span></a>`).join('')}</nav>
      <a class="tiny muted about-link" href="#about">About & setup · honest status</a>`;
    U.$('#top').innerHTML = `<button class="menu-btn" id="menu" aria-label="Open menu">☰</button>
      <a class="me" href="#wardrobe" title="Avatar wardrobe">${H.portrait(H.me(), 'xs')}<span><b>${esc(st().profile.name || 'Estudiante')}</b><small>Lv ${lv.lv} · ${S.cefr().working} stage</small></span></a>
      <div class="xpbox" title="${lv.into}/${lv.need} XP to next level"><small>${S.xp()} XP</small>${UI.bar(lv.into / lv.need, 'gold')}</div>
      <span class="stat" title="Daily streak">🔥 ${S.streak()}</span><span class="stat" title="Coins">🪙 ${S.coins()}</span>
      <a class="sync ${cloud[0]}" href="#preferences" title="${esc(S.cloudErr || '')}">${cloud[1]}</a>`;
    U.$('#menu').onclick = () => document.body.classList.toggle('nav-open');
  };

  /* ---------- ROUTER ---------- */
  const MULTI = ['vocab-review', 'prado-write'];
  H.parse = () => {
    const h = (location.hash || '#home').slice(1);
    if (MULTI.includes(h) || V[h]) return { name: h, arg: '' };
    const i = h.indexOf('-'); if (i > 0 && V[h.slice(0, i)]) return { name: h.slice(0, i), arg: h.slice(i + 1) };
    return { name: 'home', arg: '' };
  };
  H.render = function () {
    let { name, arg } = H.parse();
    if (!st().profile.onboarded && !['about'].includes(name)) name = 'create';
    else if (st().profile.onboarded && !S.checkedIn() && !['preferences', 'about'].includes(name)) name = 'attendance';
    H.current = { name, arg };
    try { MA.Audio.stopLines && name !== H.lastName && MA.Audio.stopLines(); } catch (e) { }
    H.lastName = name;
    H.shell();
    mounts = [];
    let html;
    try { html = V[name](arg); } catch (e) { console.error(e); html = `<div class="panel"><h2>Something went wrong</h2><p>${esc(e.message)}</p><a class="btn" href="#home">Back home</a></div>`; }
    const view = U.$('#view'); view.innerHTML = html; view.dataset.view = name;
    mounts.forEach(fn => { try { fn(view); } catch (e) { console.error(e); } });
    document.body.classList.remove('nav-open');
  };
  H.soft = function () { H.shell(); }; // update header only

  document.addEventListener('click', e => {
    const w = e.target.closest('[data-word]'); if (w) { H.openWord(w.dataset.word); return; }
    const pin = e.target.closest('[data-href]'); if (pin) { location.hash = pin.dataset.href; return; }
  });
  document.addEventListener('keydown', e => { const pin = e.target.closest && e.target.closest('[data-href]'); if (pin && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); location.hash = pin.dataset.href; } });

  /* ---------- CHARACTER CREATION ---------- */
  V.create = function () {
    const a = st().avatar;
    H.after(view => MA.H.bindWardrobe(view, true));
    return `<div class="create">
      <div class="panel hero-intro"><p class="eyebrow">Bienvenida a España</p><h1>Create your character</h1>
      <p>Your Spanish journey across ten cities begins in <b>Alicante</b> and ends in <b>Madrid</b>. Choose your name and look. You can change your style later in the Wardrobe.</p></div>
      <div class="wardrobe-grid">
        <div class="panel avatar-stage"><div id="av-preview">${MA.avatarSVG(a)}</div></div>
        <div class="panel"><label for="nm"><b>Your name</b></label><input type="text" id="nm" value="${esc(st().profile.name)}" placeholder="e.g. Sofía" maxlength="24">
        ${H.wardrobeControls(true)}
        <button class="btn primary big" id="begin">Begin my journey →</button></div>
      </div></div>`;
  };

  /* ---------- ATTENDANCE ---------- */
  V.attendance = function () {
    const today = S.today(), att = st().attendance, done = !!att[today];
    const m = H.motto();
    H.after(view => {
      const b = view.querySelector('#checkin'); if (b) b.onclick = () => {
        if (st().attendance[S.today()]) { H.render(); return; }
        st().attendance[S.today()] = Date.now(); S.save(true);
        S.award('checkin:' + S.today(), 10, 5, '¡Presente!');
        view.querySelector('.stamp-anim').classList.add('show');
        setTimeout(() => H.render(), 1400);
      };
    });
    return `<div class="attendance">
      <div class="panel att-card">
        ${MA.sceneSVG('academia')}
        <div class="att-body">
          <div class="att-who">${H.portrait(H.me(), 'md')}<div><p class="eyebrow">${esc(H.academyName ? H.academyName() : 'Academia')} · Asistencia</p><h1>${H.greeting()}, ${esc(st().profile.name || 'estudiante')}!</h1><p class="muted">Welcome back to ${esc(H.academyName ? H.academyName() : 'the academy')}.</p><p class="date">${esc(H.dateES())}</p></div></div>
          <div class="att-stats"><div><b>${S.streak()}</b><small>day streak</small></div><div><b>${Object.keys(att).length}</b><small>study days</small></div><div><b>+10 XP</b><small>daily reward</small></div></div>
          <blockquote class="motto"><span class="es">${esc(m[0])}</span> ${UI.spk(m[0])}<small>${esc(m[1])}</small></blockquote>
          ${done ? `<p class="good">✓ You are checked in for today. Passport stamped!</p><div class="today-plan"><h4>Today’s study plan · ~55 min</h4><ol>${(() => { const nx = H.nextLesson(); const due = S.due().length; return [`Vocabulary · 10 min — ${due} cards due`, `Grammar & writing · 10 min${nx ? ' — ' + esc(nx.title) : ''}`, 'Reading · 10 min — Fairy Tale Library', 'Listening · 10 min — Madrid Radio', 'Speaking · 10 min — chat with Lucía', 'Review · 5 min — your recent mistakes'].map(x => `<li>${x}</li>`).join(''); })()}</ol></div><a class="btn primary big" href="#home">Go to dashboard</a>` : `<button class="btn primary big" id="checkin">Check In — ¡Presente!</button>`}
          <div class="stamp-anim" aria-hidden="true"><div class="stamp">PRESENTE<br><small>${today}</small></div></div>
        </div>
      </div>
      <div class="panel"><h3>Attendance calendar</h3>${H.monthGrid(today.slice(0, 7))}<p class="tiny muted">Timezone: ${esc(st().profile.tz)} (change in Settings). One check-in per calendar day; past days are kept even if you miss one.</p></div>
    </div>`;
  };
  H.monthGrid = function (ym) {
    const [y, mo] = ym.split('-').map(Number); const first = new Date(Date.UTC(y, mo - 1, 1)); const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
    const lead = (first.getUTCDay() + 6) % 7; const today = S.today(); const att = st().attendance;
    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<span class="cal-cell empty"></span>';
    for (let d = 1; d <= days; d++) {
      const k = `${ym}-${String(d).padStart(2, '0')}`; const min = S.minutes(k);
      cells += `<span class="cal-cell ${min ? 'att' : ''} ${k === today ? 'today' : ''}" title="${k}${min ? ' · ' + min + ' min studied' : ''}"><i>${d}</i>${min ? `<small>${min}′</small>` : ''}</span>`;
    }
    const mname = new Date(Date.UTC(y, mo - 1, 15)).toLocaleDateString('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    return `<div class="cal"><div class="cal-h">${esc(mname)}</div><div class="cal-grid">${['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => `<span class="cal-dow">${d}</span>`).join('')}${cells}</div></div>`;
  };

  /* ---------- HOME DASHBOARD ---------- */
  H.dailyTasks = function () {
    const d = S.today(), a = st().answers[d] || {};
    const lessonToday = Object.values(st().lessons).some(l => S.dayKey(l.t || 0) === d);
    return [
      { id: 'lesson', label: 'Complete or replay a lesson', done: lessonToday, href: H.nextLesson() ? '#lesson-' + H.nextLesson().id : '#academy' },
      { id: 'srs', label: 'Review 5 vocabulary cards', done: (a.srs && a.srs.n >= 5), href: '#vocab-review', prog: a.srs ? Math.min(5, a.srs.n) + '/5' : '0/5' },
      { id: 'chat', label: 'Send 3 messages in Spanish to a character', done: (a.chat && a.chat.n >= 3), href: '#chat-lucia', prog: a.chat ? Math.min(3, a.chat.n) + '/3' : '0/3' }
    ];
  };
  V.home = function () {
    const lv = S.level(), next = H.nextLesson(), ch = H.currentChapter(), today = S.today(), study = st().study[today] || {};
    const plan = [['vocab', 'Vocabulary', 10, '#vocab-review'], ['grammar', 'Grammar & writing', 10, '#grammar'], ['reading', 'Reading', 10, '#library'], ['listening', 'Listening', 10, '#radio'], ['speaking', 'Speaking', 10, '#chat-lucia'], ['review', 'Review', 5, '#vocab-review']];
    const stats = S.skillStats(7); const weak = Object.entries(stats).filter(([k, v]) => v.n >= 4 && v.c / v.n < 0.7).map(([k]) => k);
    const due = S.due().length, mist = st().mistakes.filter(m => Date.now() - m.t < 7 * 86400000).length;
    const tasks = H.dailyTasks();
    const total = plan.reduce((a, p) => a + Math.min(p[2] * 60, study[p[0]] || 0), 0) / 60;
    const tip = due ? `Tienes <b>${due}</b> palabras para repasar. <span class="muted">(You have ${due} words to review.)</span>` : next ? `¿Empezamos la lección «${esc(next.title)}»? <span class="muted">(Shall we start “${esc(next.en)}”?)</span>` : '¡Muy bien! Has terminado todas las lecciones disponibles. <span class="muted">(You finished all available lessons.)</span>';
    H.after(view => view.querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { S.award('daily:' + b.dataset.claim + ':' + today, 10, 5, 'Daily quest'); H.render(); }));
    return `<div class="dash">
      <section class="panel hero">
        <div class="hero-av">${MA.avatarSVG(H.me())}</div>
        <div class="hero-txt"><p class="eyebrow">${esc(H.dateES())}</p><h1>${H.greeting()}, ${esc(st().profile.name)}!</h1>
          <div class="chips"><span class="chip gold">Level ${lv.lv}</span><span class="chip">CEFR stage: A1 · Beginner</span><span class="chip">🔥 ${S.streak()}-day streak</span><span class="chip">🪙 ${S.coins()}</span></div>
          <div class="xp-line"><small>${lv.into} / ${lv.need} XP to level ${lv.lv + 1}</small>${UI.bar(lv.into / lv.need, 'gold')}</div>
          <p class="tiny muted">CEFR level is only assessed by exams, never by XP. Passed A1 chapters: ${S.cefr().passedChapters} of ${S.cefr().plannedA1} planned.</p>
          <div class="companion">${H.portrait(MA.NPCS.lucia.look, 'sm')}<p><b>Lucía:</b> ${tip}</p></div>
        </div>
      </section>
      <section class="panel"><div class="ph"><h3>Current chapter</h3><a href="#academy" class="tiny">All chapters →</a></div>
        <p class="eyebrow">A1 · Chapter ${ch.num}</p><h2 class="es">${esc(ch.title)}</h2><p class="muted">${esc(ch.goal)}</p>
        ${UI.bar(ch.lessons.filter(l => S.lessonDone(l.id)).length / ch.lessons.length)}
        <div class="row gap wrap">${next ? `<a class="btn primary" href="#lesson-${next.id}">Continue: ${esc(next.title)} →</a>` : ''}${S.chapterLessonsDone(ch) && !S.examPassed(ch.id) ? `<a class="btn primary" href="#exam-${ch.id}">Take the chapter exam</a>` : ''}</div></section>
      <section class="panel"><div class="ph"><h3>Today’s study plan</h3><span class="muted tiny">${Math.round(total)} / 55 min</span></div>
        ${weak.length ? `<p class="note">Adapted for you: extra practice suggested for <b>${weak.map(UI.skillName).join(', ')}</b> (accuracy below 70% this week).</p>` : ''}
        <ul class="plan">${plan.map(([k, label, min, href]) => { const v = (study[k] || 0) / 60; return `<li><a href="${k === 'review' && mist ? '#progress' : href}"><span>${label}${weak.includes(k) ? ' <span class="tag warn">focus</span>' : ''}</span><small>${Math.floor(v)} / ${min} min${k === 'review' ? ` · ${due} cards due · ${mist} recent mistakes` : ''}</small></a>${UI.bar(v / min)}</li>`; }).join('')}</ul>
        <p class="tiny muted">Minutes count while you actively use each section.</p></section>
      <section class="panel"><h3>Daily quests</h3><ul class="tasks">${tasks.map(t => { const claimed = S.earned('daily:' + t.id + ':' + today); return `<li class="${t.done ? 'done' : ''}"><span class="tick">${t.done ? '✓' : ''}</span><a href="${t.href}">${esc(t.label)}</a>${t.prog && !t.done ? `<small>${t.prog}</small>` : ''}${t.done ? (claimed ? '<small class="muted">claimed</small>' : `<button class="btn small" data-claim="${t.id}">Claim +10 XP</button>`) : ''}</li>`; }).join('')}</ul></section>
      <section class="panel"><h3>Upcoming assessments</h3><ul class="list">${MA.CHAPTERS.map(c => { const passed = S.examPassed(c.id), ready = S.chapterLessonsDone(c); const best = Math.max(0, ...(st().exams[c.id] || []).map(x => x.overall)); return `<li><span><b>Chapter ${c.num} exam</b> · <span class="es">${esc(c.title)}</span></span>${passed ? `<span class="pill ok">Passed · ${best}%</span>` : ready ? `<a class="btn small primary" href="#exam-${c.id}">Ready — start</a>` : `<span class="pill off">${c.lessons.filter(l => S.lessonDone(l.id)).length}/${c.lessons.length} lessons</span>`}</li>`; }).join('')}<li><span><b>A1 level exam</b></span><span class="pill off">After all 8 A1 chapters</span></li></ul></section>
      <section class="panel map-mini"><div class="ph"><h3>Madrid</h3><a href="#map" class="tiny">Open map →</a></div><a href="#map" aria-label="Open the Madrid map">${MA.mapSVG(H.pins())}</a></section>
      <section class="panel mini-grid">
        <a href="#passport" class="mini"><span>🛂</span><b>Passport</b><small>${Object.keys(st().attendance).length} stamps</small></a>
        <a href="#vocab" class="mini"><span>🖼️</span><b>Vocabulary</b><small>${Object.keys(st().vocab).length} saved · ${due} due</small></a>
        <a href="#calendar" class="mini"><span>📅</span><b>Calendar</b><small>${S.minutes(today)} min today</small></a>
        <a href="#progress" class="mini"><span>📈</span><b>Progress</b><small>weekly report</small></a>
      </section>
    </div>`;
  };

  /* ---------- MAP & PLACES ---------- */
  const ICONS = { academia: '🏛️', apartment: '🏠', cafe: '☕', biblioteca: '📚', radio: '📻', retiro: '🌳', mercado: '🍊', prado: '🖼️' };
  H.pins = () => MA.LOCATIONS.map(l => ({ id: l.id, name: l.name, x: l.x, y: l.y, icon: ICONS[l.id], locked: !S.unlocked(l.unlock), quest: MA.QUESTS.some(q => !q.locked && !S.questDone(q.id) && S.unlocked(q.unlock) && ((q.id === 'q1' && l.id === 'academia') || (q.id === 'q2' && l.id === 'cafe'))) }));
  V.map = function () {
    return `<div class="panel"><div class="ph"><div><p class="eyebrow">Explora la ciudad</p><h1>Madrid Map</h1></div><span class="muted tiny">Locations unlock as your Spanish improves. <b class="gold-t">!</b> = quest available</span></div>
      <div class="map-wrap">${MA.mapSVG(H.pins())}</div></div>
      <div class="loc-list">${MA.LOCATIONS.map(l => { const un = S.unlocked(l.unlock); return `<a class="panel loc ${un ? '' : 'locked'}" href="#place-${l.id}"><span class="loc-ic">${un ? ICONS[l.id] : '🔒'}</span><span><b>${esc(l.name)}</b><small>${un ? esc(l.en) : esc(l.unlockText)}</small></span></a>`; }).join('')}</div>`;
  };
  V.place = function (id) {
    const l = MA.LOCATIONS.find(x => x.id === id); if (!l) return V.map();
    if (!S.unlocked(l.unlock)) return H.lockedScreen(l.name, 'Locked: ' + l.unlockText + '.', ['#madrid', 'Back to Madrid']);
    const npc = l.npc && MA.NPCS[l.npc];
    const quests = MA.QUESTS.filter(q => (q.id === 'q1' && id === 'academia') || (q.id === 'q2' && id === 'cafe'));
    return `<div class="place"><div class="panel scene-head">${MA.sceneSVG(id)}<div class="scene-title"><p class="eyebrow">${esc(l.en)}</p><h1>${esc(l.name)}</h1></div>${npc ? `<div class="scene-npc">${H.portrait(npc.look, 'lg')}<span>${esc(npc.name)}</span></div>` : ''}</div>
      ${npc ? `<div class="panel dialog-box"><b>${esc(npc.name)}</b><p class="es">${esc(npc.greet)} ${UI.spk(npc.greet)}</p></div>` : ''}
      ${quests.length ? `<div class="panel"><h3>Quests here</h3>${quests.map(q => `<a class="quest-row" href="#quest-${q.id}"><span>${S.questDone(q.id) ? '✓' : '!'}</span><b>${esc(q.title)}</b><small>${S.questDone(q.id) ? 'Completed — replay' : S.unlocked(q.unlock) ? esc(q.en) : esc(q.unlockText)}</small></a>`).join('')}</div>` : ''}
      <div class="acts">${l.acts.map(([label, act]) => `<a class="panel act" href="${H.actHref(act)}"><b>${esc(label)}</b><span>→</span></a>`).join('')}</div></div>`;
  };

  /* ---------- ACADEMY ---------- */
  V.academy = function () {
    const lvl = MA.LEVELS[0];
    return `<div class="panel scene-head">${MA.sceneSVG('academia')}<div class="scene-title"><p class="eyebrow">Escuela de idiomas</p><h1>Academia Madrid</h1></div><div class="scene-npc">${H.portrait(MA.NPCS.carmen.look, 'lg')}<span>Profesora Carmen</span></div></div>
      ${MA.CHAPTERS.map(c => H.chapterCard(c)).join('')}
      <div class="panel"><h3>Coming next in A1</h3><p class="muted">These chapters are planned but <b>not written yet</b>. The curriculum engine is ready for them.</p><ol class="planned" start="3">${lvl.plannedChapters.slice(2).map(t => `<li>${esc(t)} <span class="pill off">not yet available</span></li>`).join('')}</ol><a href="#curriculum" class="btn ghost">See the full A1–C2 curriculum map</a></div>`;
  };
  H.chapterCard = function (c) {
    const done = c.lessons.filter(l => S.lessonDone(l.id)).length, ready = done === c.lessons.length;
    const exams = st().exams[c.id] || [], best = exams.length ? Math.max(...exams.map(x => x.overall)) : null;
    const hw = st().homework[c.homework.id];
    return `<div class="panel chapter"><div class="ph"><div><p class="eyebrow">A1 · Chapter ${c.num}</p><h2 class="es">${esc(c.title)}</h2><p class="muted">${esc(c.en)} — ${esc(c.goal)}</p></div><span class="pill ${S.examPassed(c.id) ? 'ok' : ''}">${S.examPassed(c.id) ? 'Mastered' : done + '/' + c.lessons.length + ' lessons'}</span></div>
      <ol class="lessons">${c.lessons.map((l, i) => { const r = st().lessons[l.id]; return `<li><a href="#lesson-${l.id}" class="${r && r.done ? 'done' : ''}"><span class="num">${r && r.done ? '✓' : c.num + '.' + (i + 1)}</span><span><b class="es">${esc(l.title)}</b><small>${esc(l.en)} · ~${l.minutes} min${r ? ` · best ${r.best}%` : ''}</small></span></a></li>`; }).join('')}</ol>
      <div class="chap-actions">
        <a class="btn ${ready ? '' : 'ghost'}" href="#review-${c.id}">📖 Chapter review</a>
        ${ready || st().profile.explore ? `<a class="btn primary" href="#exam-${c.id}">📝 Chapter exam${best !== null ? ` · best ${best}%` : ''}</a>` : `<span class="btn ghost disabled" aria-disabled="true">🔒 Exam after all lessons</span>`}
        <a class="btn ghost" href="#homework-${c.id}">🏠 Homework${hw && hw.completed ? ' ✓' : ''}</a></div></div>`;
  };

  /* ---------- LESSON ---------- */
  V.lesson = function (id) {
    const l = MA.LESSONS[id]; if (!l) return V.academy();
    const c = MA.CHAPTERS.find(x => x.id === l.chapter); const r = st().lessons[id];
    const tbl = t => `<div class="tbl-wrap"><table class="tbl"><caption>${esc(t.title)}</caption><thead><tr>${t.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(row => `<tr>${row.map((x, k) => `<td class="${k === 1 || k === 2 && t.head[2] === 'Form' ? 'es' : ''}">${esc(x)}${k === 1 && x && /[a-z]/.test(x) && t.head[1] !== 'Ending' ? ' ' + UI.spk(x.split('/')[0].trim()) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    H.after(view => {
      const box = view.querySelector('#practice');
      view.querySelector('#start').onclick = () => {
        view.querySelector('#start').remove(); box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        UI.runExercises(box, l.ex, {
          mode: 'lesson', src: id, onDone: res => {
            const score = Math.round(100 * res.reduce((a, x) => a + (x ? x.score : 0), 0) / l.ex.length);
            const prev = st().lessons[id] || { attempts: 0, best: 0 };
            st().lessons[id] = { done: true, best: Math.max(prev.best || 0, score), attempts: (prev.attempts || 0) + 1, t: Date.now() };
            let added = 0; l.vocab.forEach(w => { if (S.word(w) && !st().vocab[w]) { st().vocab[w] = { saved: Date.now(), ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now(), last: Date.now() }; added++; } });
            S.save(true);
            const first = S.award('lesson:' + id, 30, 10, 'Lesson complete');
            const nxt = c.lessons[l.idx + 1];
            box.innerHTML = `<div class="result"><div class="score-ring" style="--p:${score}"><span>${score}%</span></div><h3>${score >= 80 ? '¡Excelente!' : score >= 60 ? '¡Bien hecho!' : 'Sigue practicando'}</h3>
              <p>${first ? 'Lesson complete! +30 XP.' : 'Replay finished. XP is only given the first time — your best score is saved.'} ${added ? `${added} new words were added to your vocabulary book.` : ''}</p>
              <div class="row gap wrap center"><button class="btn ghost" id="again">Practice again</button>${nxt ? `<a class="btn primary" href="#lesson-${nxt.id}">Next: ${esc(nxt.title)} →</a>` : `<a class="btn primary" href="#review-${c.id}">Go to chapter review →</a>`}</div></div>`;
            box.querySelector('#again').onclick = () => H.render();
            MA.H.mentorLessonDone && MA.H.mentorLessonDone(id, score, box);
            S.emit();
          }
        });
      };
    });
    return `<div class="lesson">
      <div class="panel"><p class="eyebrow">Chapter ${c.num} · Lesson ${c.num}.${l.idx + 1} · ~${l.minutes} min</p><h1 class="es">${esc(l.title)}</h1><p class="muted">${esc(l.en)}</p>${r ? `<span class="pill ok">Completed · best ${r.best}%</span>` : ''}</div>
      <div class="panel prose"><h3>1 · Learn</h3>${l.intro}</div>
      <div class="panel"><h3>2 · Words <span class="tiny muted">tap a card for IPA, audio and examples</span></h3><div class="vgrid">${l.vocab.map(H.vcard).join('')}</div></div>
      ${l.table || l.mistakes ? `<div class="panel"><h3>3 · Grammar</h3>${l.table ? tbl(l.table) : ''}${l.mistakes ? `<h4>Common mistakes</h4><ul class="mistakes">${l.mistakes.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}</div>` : ''}
      <div class="panel"><h3>${l.table || l.mistakes ? '4' : '3'} · Practice</h3><p class="muted">${l.ex.length} exercises with instant feedback.</p><button class="btn primary big" id="start">Start practice</button><div id="practice"></div></div>
    </div>`;
  };

  /* ---------- CHAPTER REVIEW ---------- */
  V.review = function (cid) {
    const c = MA.CHAPTERS.find(x => x.id === cid); if (!c) return V.academy();
    const rv = c.review; const ids = new Set(c.lessons.map(l => l.id).concat([cid]));
    const errs = st().mistakes.filter(m => ids.has(m.src)).slice(0, 10);
    H.after(view => {
      view.querySelectorAll('.flip').forEach(f => f.onclick = () => f.classList.toggle('on'));
      view.querySelector('#rv-done').onclick = () => { S.award('review:' + cid, 15, 5, 'Chapter review'); H.render(); };
    });
    return `<div class="panel"><p class="eyebrow">Chapter ${c.num} review</p><h1 class="es">${esc(c.title)}</h1></div>
      <div class="panel"><h3>Practice flashcards <span class="tiny muted">tap to flip</span></h3><div class="flips">${rv.keyVocab.map(id => { const w = S.word(id); return `<button class="flip"><span class="front es">${esc(w.es)}</span><span class="back">${esc(w.en)}<small>/${esc(w.ipa)}/</small></span></button>`; }).join('')}</div></div>
      <div class="two"><div class="panel"><h3>Grammar summary</h3><ul>${rv.grammar.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>
      <div class="panel"><h3>Important expressions</h3><ul>${rv.expressions.map(x => `<li class="es">${esc(x)} ${UI.spk(x.replace(/…/g, ''))}</li>`).join('')}</ul></div></div>
      <div class="two"><div class="panel"><h3>Common mistakes</h3><ul class="mistakes">${rv.mistakes.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div>
      <div class="panel"><h3>Your previous errors</h3>${errs.length ? `<ul class="myerr">${errs.map(m => `<li><span class="muted">${esc(m.prompt)}</span><br><s>${esc(m.given)}</s> → <b>${esc(m.expected)}</b></li>`).join('')}</ul>` : '<p class="muted">No mistakes recorded in this chapter yet.</p>'}</div></div>
      <div class="panel row gap wrap"><button class="btn" id="rv-done">${S.earned('review:' + cid) ? '✓ Review completed' : 'Mark review as done (+15 XP)'}</button>${S.chapterLessonsDone(c) || st().profile.explore ? `<a class="btn primary" href="#exam-${cid}">Take the chapter exam →</a>` : '<span class="muted">Finish all lessons to unlock the exam.</span>'}</div>`;
  };

  /* ---------- EXAM ---------- */
  V.exam = function (cid) {
    const c = MA.CHAPTERS.find(x => x.id === cid); if (!c) return V.exams();
    const th = st().profile.threshold || 80; const hist = st().exams[cid] || [];
    const skills = [...new Set(c.exam.map(x => x.skill))];
    H.after(view => {
      view.querySelector('#ex-start').onclick = () => {
        const box = view.querySelector('#exambox'); view.querySelector('#ex-intro').remove();
        UI.runExercises(box, c.exam, {
          mode: 'exam', src: cid, onDone: res => {
            const by = {}; const methods = new Set();
            res.forEach((r, k) => { const s = c.exam[k].skill; by[s] = by[s] || { sum: 0, n: 0 }; by[s].sum += r ? r.score : 0; by[s].n++; if (r && r.method) methods.add(r.method); });
            const skillPct = Object.fromEntries(Object.entries(by).map(([k, v]) => [k, Math.round(100 * v.sum / v.n)]));
            const overall = Math.round(100 * res.reduce((a, r) => a + (r ? r.score : 0), 0) / c.exam.length);
            const passed = overall >= th;
            (st().exams[cid] = st().exams[cid] || []).push({ t: Date.now(), overall, skills: skillPct, passed, methods: [...methods], threshold: th });
            S.save(true);
            if (passed) S.award('exam:' + cid, 100, 50, 'Chapter exam passed');
            const weak = Object.entries(skillPct).filter(([k, v]) => v < th).map(([k]) => k);
            const recs = weak.map(s => { const ls = c.lessons.filter(l => l.skill === s || l.ex.some(e => e.skill === s)); return `<li><b>${UI.skillName(s)}</b>: ${ls.map(l => `<a href="#lesson-${l.id}">${esc(l.title)}</a>`).join(', ')}</li>`; }).join('');
            box.innerHTML = `<div class="result"><div class="score-ring ${passed ? 'pass' : ''}" style="--p:${overall}"><span>${overall}%</span></div>
              <h2>${passed ? '¡Aprobado! Chapter mastered.' : 'Not passed yet'}</h2><p class="muted">Pass mark: ${th}%. ${passed ? (S.earned('exam:' + cid) ? '' : '') + 'A passport stamp has been added.' : 'You can retake the exam any time.'}</p>
              <table class="tbl"><thead><tr><th>Skill</th><th>Score</th></tr></thead><tbody>${Object.entries(skillPct).map(([k, v]) => `<tr><td>${UI.skillName(k)}</td><td><b class="${v >= th ? 'good' : 'bad'}">${v}%</b></td></tr>`).join('')}</tbody></table>
              <p class="tiny muted">Writing and speaking were scored by ${methods.has('ai') ? 'Claude (AI feedback)' : ''}${methods.has('ai') && methods.has('self') ? ' and ' : ''}${methods.has('self') ? 'your self-assessment' : ''}${!methods.size ? 'key-phrase checks' : ''}. Speaking scores judge your words, not pronunciation.</p>
              ${weak.length ? `<h4>Recommended review</h4><ul>${recs}</ul>` : ''}
              <div class="row gap wrap center"><a class="btn ghost" href="#review-${cid}">Chapter review</a><button class="btn" id="retake">Retake exam</button><a class="btn primary" href="#homework-${cid}">Homework →</a></div></div>`;
            box.querySelector('#retake').onclick = () => H.render();
            MA.H.mentorExamDone && MA.H.mentorExamDone(cid, overall, passed, weak, box);
          }
        });
      };
    });
    return `<div class="panel"><p class="eyebrow">Chapter ${c.num} exam</p><h1 class="es">${esc(c.title)}</h1></div>
      <div class="panel" id="ex-intro">${S.chapterLessonsDone(c) ? '' : '<p class="note">Recommended: finish all lessons of this chapter first. You can still take the exam now.</p>'}<p>${c.exam.length} questions covering <b>${skills.map(UI.skillName).join(', ')}</b>. Answers are not shown until the end. Pass mark: <b>${th}%</b> (change in Settings).</p>
      ${hist.length ? `<h4>Previous attempts</h4><ul class="list">${hist.slice(-5).reverse().map(h => `<li><span>${H.fmtDate(h.t)}</span><span class="pill ${h.passed ? 'ok' : ''}">${h.overall}%</span></li>`).join('')}</ul>` : ''}
      <button class="btn primary big" id="ex-start">Start exam</button></div><div class="panel" id="exambox"></div>`;
  };

  /* ---------- HOMEWORK ---------- */
  V.homework = function (cid) {
    const c = MA.CHAPTERS.find(x => x.id === cid); if (!c) return V.exams();
    const hw = c.homework; const rec = st().homework[hw.id] || {};
    let n = 0; const total = hw.parts.reduce((a, p) => a + p.items.length, 0);
    H.after(view => {
      view.querySelector('#hw-save').onclick = () => {
        const checks = view.querySelectorAll('.selfgrade input:checked').length;
        const score = Math.round(100 * checks / total);
        st().homework[hw.id] = { completed: true, selfScore: score, mistakes: view.querySelector('#hw-mist').value, date: S.today(), t: Date.now(), answers: [...view.querySelectorAll('.hw-in')].map(x => x.value) };
        S.save(true); S.award('hw:' + hw.id, 30, 15, 'Homework done'); UI.toast(`Homework saved · self-assessed ${score}%`); H.render();
      };
      view.querySelector('#hw-dl').onclick = async () => {
        const dl = window.claude && await window.claude.use('downloads');
        const text = H.homeworkText(hw);
        if (!dl) { try { await navigator.clipboard.writeText(text); UI.toast('Downloads are not available here — homework copied to clipboard instead.'); } catch (e) { UI.toast('Downloads unavailable here. Select the text and copy it.', 'warn'); } return; }
        try { await dl.save({ filename: hw.id + '-madrid-academy.txt', data: text }); } catch (e) { UI.toast('Download cancelled or refused.', 'warn'); }
      };
      view.querySelector('#hw-copy').onclick = async () => { try { await navigator.clipboard.writeText(H.homeworkText(hw)); UI.toast('Copied (answer key at the end).'); } catch (e) { UI.toast('Copy failed.', 'warn'); } };
    });
    return `<div class="panel"><p class="eyebrow">Chapter ${c.num}</p><h1>${esc(hw.title)}</h1>
      ${rec.completed ? `<p class="pill ok">Completed ${esc(rec.date)} · self-assessed ${rec.selfScore}%</p>` : ''}
      <div class="row gap wrap"><button class="btn ghost" id="hw-dl">⬇ Download (.txt)</button><button class="btn ghost" id="hw-copy">Copy to print</button></div></div>
      <div class="panel homework">${hw.parts.map(p => `<section><h3>${esc(p.h)}</h3>${p.text ? `<div class="readbox es">${esc(p.text)} ${UI.spk(p.text)}</div>` : ''}<ol>${p.items.map(it => { const k = n++; return `<li><label for="hw${k}">${esc(it[0])}</label>${p.open ? `<textarea class="hw-in" id="hw${k}" rows="3">${esc((rec.answers || [])[k] || '')}</textarea>` : `<input type="text" class="hw-in" id="hw${k}" value="${esc((rec.answers || [])[k] || '')}">`}</li>`; }).join('')}</ol>${p.rubric ? `<p class="tiny muted">Rubric: ${p.rubric.map(esc).join(' · ')}</p>` : ''}</section>`).join('')}
      ${UI.accentBar()}
      <details class="answer-key"><summary>🔑 Answer key (hidden — open when you finish)</summary>
        ${(() => { let m = 0; return hw.parts.map(p => `<h4>${esc(p.h)}</h4><ol>${p.items.map(it => { const k = m++; return `<li><span>${esc(it[0])}</span> → <b class="es">${esc(it[1])}</b><label class="selfgrade"><input type="checkbox" data-k="${k}"> I got this right</label></li>`; }).join('')}</ol>${p.open ? '<p class="tiny muted">Open questions: many answers are correct. Compare with the sample and the rubric.</p>' : ''}`).join(''); })()}
      </details>
      <label for="hw-mist"><b>Mistakes to review</b></label><textarea id="hw-mist" rows="2" placeholder="e.g. vosotros → sois">${esc(rec.mistakes || '')}</textarea>
      <button class="btn primary" id="hw-save">Save homework & self-grade</button></div>`;
  };
  H.homeworkText = hw => {
    let t = `MADRID ACADEMY — ${hw.title}\nName: ____________  Date: ____________\n\n`;
    hw.parts.forEach(p => { t += `${p.h}\n${p.text ? p.text + '\n' : ''}`; p.items.forEach((it, k) => t += `  ${k + 1}. ${it[0]}  ______________________\n`); t += '\n'; });
    t += '\n\n-------- ANSWER KEY (fold this part) --------\n'; hw.parts.forEach(p => { t += `${p.h}\n`; p.items.forEach((it, k) => t += `  ${k + 1}. ${it[1]}\n`); if (p.rubric) t += `  Rubric: ${p.rubric.join('; ')}\n`; });
    return t;
  };
  V.exams = function () {
    return `<div class="panel"><p class="eyebrow">Deberes y exámenes</p><h1>Homework & Exams</h1><p class="muted">Each chapter has a review, an exam (pass mark ${st().profile.threshold || 80}%) and printable homework with a hidden answer key.</p></div>
      ${MA.CHAPTERS.map(c => { const ex = st().exams[c.id] || []; const hw = st().homework[c.homework.id]; return `<div class="panel"><h3>Chapter ${c.num} · <span class="es">${esc(c.title)}</span></h3><ul class="list">
        <li><span>📖 Review</span><a class="btn small ghost" href="#review-${c.id}">${S.earned('review:' + c.id) ? '✓ Open' : 'Open'}</a></li>
        <li><span>📝 Exam ${ex.length ? `· ${ex.length} attempt(s), best ${Math.max(...ex.map(x => x.overall))}%` : ''}</span>${S.chapterLessonsDone(c) || st().profile.explore ? `<a class="btn small primary" href="#exam-${c.id}">${S.examPassed(c.id) ? 'Retake' : 'Start'}</a>` : '<span class="pill off">Finish lessons first</span>'}</li>
        <li><span>🏠 Homework ${hw && hw.completed ? `· done ${esc(hw.date)} (${hw.selfScore}%)` : ''}</span><a class="btn small ghost" href="#homework-${c.id}">Open</a></li></ul></div>`; }).join('')}`;
  };

  /* ---------- CURRICULUM MAP ---------- */
  V.curriculum = function () {
    return `<div class="panel"><p class="eyebrow">12-month plan</p><h1>Curriculum A1 → C2</h1>
      <p>Recommended: <b>45–60 minutes a day</b>. The goals (about B2 in 6 months, moving toward C1–C2 by month 12) are <b>ambitious targets, not promises</b>. Your level is only marked when you pass assessments.</p></div>
      ${MA.LEVELS.map(l => `<div class="panel level"><div class="ph"><h2>${l.id} · ${esc(l.name)}</h2><span class="muted">${esc(l.months)}</span></div><p class="chips">${l.topics.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</p>
        <ol>${l.plannedChapters.map((t, i) => { const real = l.id === 'A1' && MA.CHAPTERS[i]; return `<li>${real ? `<a href="#academy"><b class="es">${esc(real.title)}</b></a> <span class="pill ok">playable</span>` : `${esc(t)} <span class="pill off">planned</span>`}</li>`; }).join('')}</ol></div>`).join('')}`;
  };
})();
