/* MADRID ACADEMY — update: check-in removed, character shown everywhere, immersive Home dashboard */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;

  /* ---------- migration to v3 ---------- */
  const migrate2 = H.migrate;
  H.migrate = function () {
    migrate2();
    const s = st();
    // remove the check-in system and every reward that came from it
    Object.keys(s.ledger).forEach(k => { if (k.startsWith('checkin:') || k.startsWith('daily:checkin:')) delete s.ledger[k]; });
    s.attendance = {};
    if ((s.v || 1) < 3) {
      // the old default girl becomes the new default look; any custom choices are kept
      const a = s.avatar || {};
      if (a.hair === MA.OLD_DEFAULT_AVATAR.hair && a.hairColor === MA.OLD_DEFAULT_AVATAR.hairColor) {
        s.avatar = Object.assign({}, MA.DEFAULT_AVATAR, { outfit: a.outfit || 'tee-skirt', shoes: a.shoes || 'flats-black', acc: a.acc || [] });
        if (a.eyes && a.eyes !== '#5a3d2b') s.avatar.eyes = a.eyes;
        if (a.skin && a.skin !== '#f1d3bc') s.avatar.skin = a.skin;
      }
      s.avatarAt = Date.now(); s.v = 3;
    }
    try { localStorage.setItem('madrid-academy-v1', JSON.stringify(s)); } catch (e) { }
  };
  V.attendance = function () { location.replace('#home'); return ''; };
  H.ACH = H.ACH.filter(a => !/check in|streak/i.test(a[2]));

  /* ---------- your character on the world map (current city) ---------- */
  let mk = 0;
  const spain = MA.spainSVG;
  MA.spainSVG = function (opts) {
    const svg = spain(opts); const c = H.currentCity(); const [x, y] = H.cityXY(c); const id = 'me' + (++mk);
    const marker = `<g class="me-pin" transform="translate(${x - 24} ${y - 70})" aria-label="You are here"><path d="M17 46 L24 58 L31 46Z" fill="#fff" stroke="#c98b96" stroke-width="2"/><circle cx="24" cy="24" r="25" fill="#fff" stroke="#c98b96" stroke-width="3"/><clipPath id="${id}"><circle cx="24" cy="24" r="22"/></clipPath><g clip-path="url(#${id})"><rect width="48" height="48" fill="#f8e4e2"/>${MA.avatarSVG(H.me(), { portrait: true, w: 48, h: 48, x: 0, y: 0 })}</g></g>`;
    return svg.replace(/<\/svg>\s*$/, marker + '</svg>');
  };
  /* ---------- your character in each city ---------- */
  const cityHome = H.cityHome;
  H.cityHome = c => cityHome(c).replace('<div class="scene-title">', `<div class="scene-me" aria-hidden="true">${MA.avatarSVG(H.me())}</div><div class="scene-title">`);

  /* ---------- immersive Home ---------- */
  V.home = function () {
    const lv = S.level(), c = H.currentCity(), today = S.today(), study = st().study[today] || {};
    const k = c.built ? H.cityContent(c) : null; const next = k ? k.lessons.find(l => !S.lessonDone(l.id)) : null;
    const nextCh = next ? MA.CHAPTERS.find(x => x.id === next.chapter) : null;
    const lessonsDone = k ? k.lessons.filter(l => S.lessonDone(l.id)).length : 0;
    const due = S.due().length, mist = st().mistakes.filter(m => Date.now() - m.t < 7 * 86400000).length;
    const tasks = H.dailyTasks(); const motto = H.motto(); const ms = H.cityMilestone(c);
    const cityId = c.final ? 'alicante' : c.id, cityRef = MA.CITY[cityId];
    const plan = [['vocab', 'Vocabulary', 10, `#city-${cityId}-vocabulary`, '📖'], ['grammar', 'Grammar & writing', 10, `#city-${cityId}-grammar`, '✒️'], ['reading', 'Reading', 10, `#city-${cityId}-practice-reading`, '📰'], ['listening', 'Listening', 10, `#city-${cityId}-practice-listening`, '🎧'], ['speaking', 'Speaking', 10, `#city-${cityId}-practice-speaking`, '🗣️'], ['review', 'Review', 5, '#vocab-review', '🔁']];
    const total = plan.reduce((a, p) => a + Math.min(p[2] * 60, study[p[0]] || 0), 0) / 60;
    const weak = Object.entries(S.skillStats(7)).filter(([s, v]) => v.n >= 4 && v.c / v.n < 0.7).map(([s]) => s);
    const story = MA.QUESTS.find(q => !q.locked && !S.questDone(q.id) && S.unlocked(q.unlock));
    const ach = H.ACH.filter(a => a[3]()); const recentWords = Object.entries(st().vocab).sort((a, b) => b[1].saved - a[1].saved).slice(0, 8).map(([id]) => S.word(id)).filter(Boolean);
    const tip = due ? `Tienes <b>${due}</b> ${due === 1 ? 'palabra' : 'palabras'} para repasar. <span class="muted">(${due} ${due === 1 ? 'word is' : 'words are'} ready to review.)</span>` : next ? `¿Seguimos con «${esc(next.title)}»? <span class="muted">(Shall we continue with “${esc(next.en)}”?)</span>` : `¡Qué bien! Sigue practicando. <span class="muted">(Great — keep practising.)</span>`;
    H.after(view => view.querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { S.award('daily:' + b.dataset.claim + ':' + today, 10, 5, 'Daily quest'); H.render(); }));
    const ring = (p, label) => `<div class="ring2" style="--p:${Math.round(U.clamp(p, 0, 1) * 100)}"><span>${label}</span></div>`;
    return `<div class="home3">
      <section class="h-hero">
        ${MA.sceneSVG(c.id, c.pal, { sea: c.sea })}
        <div class="h-glow"></div>
        <div class="h-avatar">${MA.avatarSVG(H.me(), { label: 'Your character' })}</div>
        <div class="h-card">
          <p class="eyebrow">${esc(H.dateES())}</p>
          <h1>${H.greeting()}, ${esc(st().profile.name || 'estudiante')}!</h1>
          <p class="h-loc">📍 ${esc(c.name)} · <span>${c.final ? 'Final destination' : esc(MA.STAGES[c.stage].name + ' · ' + c.cefr)}</span></p>
          <div class="h-stats"><div><b>${lv.lv}</b><small>Level</small></div><div><b>${S.xp()}</b><small>XP</small></div><div><b>${S.coins()}</b><small>Coins</small></div><div><b>${Object.keys(st().vocab).length}</b><small>Words</small></div></div>
          <div class="xp-line"><small>${lv.into} / ${lv.need} XP to level ${lv.lv + 1}</small>${UI.bar(lv.into / lv.need, 'gold')}</div>
          <div class="h-bubble">${H.portrait(MA.NPCS.lucia.look, 'sm')}<p><span class="who">Lucía</span>${tip}</p></div>
          <div class="row gap wrap">${next ? `<a class="btn primary big" href="#lesson-${next.id}">▶ Continue: ${esc(next.title)}</a>` : `<a class="btn primary big" href="#city-${cityId}">▶ Continue in ${esc(cityRef.short || cityRef.name)}</a>`}<a class="btn" href="#map">🗺️ World map</a><a class="btn ghost" href="#wardrobe">👗 Wardrobe</a></div>
        </div>
      </section>

      <div class="h-row3">
        <section class="panel h-continue"><p class="eyebrow">Continue learning</p>
          ${next ? `<div class="hc-body">${ring(lessonsDone / k.lessons.length, `${lessonsDone}/${k.lessons.length}`)}<div><small class="muted">Chapter ${nextCh.num} · ${esc(nextCh.title)}</small><h3 class="es">${esc(next.title)}</h3><p class="muted">${esc(next.en)} · ~${next.minutes} min</p></div></div><a class="btn primary" href="#lesson-${next.id}">Start lesson →</a>`
          : `<h3>All available lessons done</h3><p class="muted">Practise speaking and writing, or review your words.</p><a class="btn" href="#city-${cityId}-practice">Go to practice →</a>`}
          ${story ? `<div class="h-story"><span>!</span><div><small>Story quest</small><a href="#quest-${story.id}"><b>${esc(story.title)}</b></a></div></div>` : ''}</section>
        <section class="panel h-plan"><div class="ph"><p class="eyebrow">Today’s study plan</p><span class="tiny muted">${Math.round(total)} / 55 min</span></div>
          ${weak.length ? `<p class="tiny note">Focus this week: <b>${weak.map(UI.skillName).join(', ')}</b></p>` : ''}
          <ul class="plan2">${plan.map(([s, label, min, href, ic]) => { const v = (study[s] || 0) / 60; return `<li><a href="${href}"><span class="pi">${ic}</span><span class="pl">${label}${weak.includes(s) ? ' <span class="tag warn">focus</span>' : ''}</span><small>${Math.floor(v)}/${min}′</small></a>${UI.bar(v / min)}</li>`; }).join('')}</ul>
          <p class="tiny muted">Minutes count while you actively study each skill.</p></section>
        <section class="panel h-quests"><p class="eyebrow">Daily quests</p><ul class="tasks">${tasks.map(t => { const claimed = S.earned('daily:' + t.id + ':' + today); return `<li class="${t.done ? 'done' : ''}"><span class="tick">${t.done ? '✓' : ''}</span><a href="${t.href}">${esc(t.label)}</a>${t.prog && !t.done ? `<small>${t.prog}</small>` : ''}${t.done ? (claimed ? '<small class="muted">claimed</small>' : `<button class="btn small" data-claim="${t.id}">+10 XP</button>`) : ''}</li>`; }).join('')}</ul>
          <blockquote class="motto2"><small>Frase del día</small><span class="es">${esc(motto[0])}</span> ${UI.spk(motto[0])}<em>${esc(motto[1])}</em></blockquote></section>
      </div>

      <section class="panel h-explore"><div class="ph"><div><p class="eyebrow">Explore</p><h2>${esc(cityRef.name)}</h2></div><a class="tiny" href="#city-${cityId}">Open city →</a></div>
        <div class="h-cats">${H.cats(cityRef).map(x => `<a class="h-cat" href="#city-${cityId}-${x.key}">${H.icon(x.key)}<b>${x.name.replace(' & Expressions', '').replace(' & Tests', '')}</b><small>${x.n ? `${x.n} ${x.unit.split(' ')[0]}` : 'Coming soon'}</small>${x.p != null ? UI.bar(x.p) : ''}</a>`).join('')}</div></section>

      <section class="panel h-journey"><div class="hj-map"><p class="eyebrow">Your journey</p><a href="#map" aria-label="Open the world map">${MA.spainSVG()}</a></div>
        <div class="hj-side"><h3>Diez ciudades</h3><p class="tiny"><b>Milestone:</b> ${esc(ms.text)}</p>${ms.prog != null ? UI.bar(ms.prog, 'gold') : ''}
          <ol class="timeline">${MA.CITIES.map(x => { const s = H.storyStatus(x); return `<li class="${s} ${x.id === c.id ? 'here' : ''}"><a href="${x.final ? '#madrid' : '#city-' + x.id}"><span class="tl-dot">${s === 'completed' ? '✓' : x.final ? '★' : x.order}</span><span><b>${esc(x.short || x.name)}</b><small>${x.final ? 'Final destination' : esc(x.cefr)}${x.id === c.id ? ' · you are here' : s === 'locked' ? ' · story locked' : ''}</small></span></a></li>`; }).join('')}</ol></div></section>

      <div class="h-row3">
        <section class="panel"><p class="eyebrow">Vocabulary book</p><div class="stats3"><div><b>${due}</b><small>due now</small></div><div><b>${Object.keys(st().vocab).length}</b><small>saved</small></div><div><b>${S.mastered()}</b><small>mastered</small></div></div>
          ${recentWords.length ? `<p class="chips">${recentWords.map(w => `<button class="chip" data-word="${esc(Object.keys(st().vocab).find(id => S.word(id) === w))}">${esc(w.es)}</button>`).join('')}</p>` : '<p class="muted">Save words from lessons and stories.</p>'}
          <a class="btn ${due ? 'primary' : 'ghost'}" href="#vocab-review">${due ? `Review ${due} word${due === 1 ? '' : 's'}` : 'Open review'}</a></section>
        <section class="panel"><p class="eyebrow">Upcoming assessments</p><ul class="list">${MA.CHAPTERS.filter(ch => ch.city === cityId).map(ch => `<li><span>${esc(MA.CITY[ch.city].short || MA.CITY[ch.city].name)} · Ch ${ch.num} exam</span>${S.examPassed(ch.id) ? '<span class="pill ok">Passed</span>' : `<a class="btn small ${S.chapterLessonsDone(ch) ? 'primary' : 'ghost'}" href="#exam-${ch.id}">${S.chapterLessonsDone(ch) ? 'Ready' : ch.lessons.filter(l => S.lessonDone(l.id)).length + '/' + ch.lessons.length + ' lessons'}</a>`}</li>`).join('')}</ul>
          <p class="tiny muted">CEFR level is only given by assessments, never by XP.</p></section>
        <section class="panel"><p class="eyebrow">Achievements</p>${ach.length ? `<div class="h-badges">${ach.slice(-6).reverse().map(a => `<span class="hb" title="${esc(a[2])}"><i>${a[0]}</i>${esc(a[1])}</span>`).join('')}</div>` : '<p class="muted">Finish a lesson to earn your first badge.</p>'}<a class="btn ghost small" href="#passport">Open passport →</a></section>
      </div>
    </div>`;
  };
})();
