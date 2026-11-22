/* MADRID ACADEMY — Phase 4 shared support: per-city vocabulary libraries and city-specific practice links */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;
  MA.V = Object.fromEntries(MA.VOCAB.map(v => [v.id, v])); // rebuild the index after the city files added words
  // every vocabulary entry belongs to a city (old entries = Alicante)
  const cityOf = v => v.city || 'alicante';
  const cc0 = H.cityContent;
  H.cityContent = function (c) { const k = cc0(c); k.vocab = MA.VOCAB.filter(v => cityOf(v) === c.id).map(v => v.id); if (c.id !== 'alicante') k.npcs = []; return k; };
  const CATNAME = { family: 'Family', clothes: 'Clothes & accessories', canarias: 'Canary Islands words', routine: 'Daily routine', time: 'Time & frequency', travel: 'Travel & transport', food: 'Food & dishes', memories: 'Memories', compare: 'Comparisons',
    greetings: 'Greetings & courtesy', people: 'People', introductions: 'Personal information', nationalities: 'Countries & nationalities', sounds: 'Sounds of Spain (alphabet)', cafe: 'Café, drinks & tapas', numbers: 'Numbers', ordering: 'Ordering', market: 'Market: fruit, veg & shopping', museum: 'Museum' };
  H.vcatName = k => MA.VCAT[k] || CATNAME[k] || (k[0].toUpperCase() + k.slice(1));
  const cv1 = H.cityVocab;
  const addCard = id => { if (!st().vocab[id]) { st().vocab[id] = { saved: Date.now(), ease: 2.5, interval: 0, reps: 0, lapses: 0, due: Date.now(), last: Date.now() }; return 1; } return 0; };
  H.cityVocab = function (c, sub, head) {
    if (c.id === 'alicante' && (sub === 'saved' || sub === 'custom')) return cv1(c, sub, head);
    const ids = H.cityContent(c).vocab; if (!ids.length) return head + H.soon(c, 'Vocabulary collections');
    const groups = {}; ids.forEach(id => { const w = MA.V[id]; (groups[w.cat] = groups[w.cat] || []).push(id); });
    const cats = Object.keys(groups); const only = sub && groups[sub] ? sub : null;
    const saved = ids.filter(id => st().vocab[id]).length;
    H.after(view => {
      view.querySelectorAll('[data-savecat]').forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); let n = 0; groups[b.dataset.savecat].forEach(id => n += addCard(id)); S.save(true); UI.toast(n ? `★ ${n} words added to your vocabulary book` : 'All these words are already in your book'); H.render(); });
      const q = view.querySelector('#vq'); q.oninput = () => { const t = U.deacc(U.norm(q.value)); view.querySelectorAll('details.vtopic').forEach(d => { let any = 0; d.querySelectorAll('.vcard').forEach(el => { const w = S.word(el.dataset.word); el.hidden = t && !U.deacc(U.norm(w.es + ' ' + w.en)).includes(t); if (!el.hidden) any++; }); d.hidden = !any; if (t) d.open = true; }); };
    });
    const book = c.id === 'alicante' ? `<a class="btn ghost" href="#city-alicante-vocabulary-saved">★ My book</a><a class="btn ghost" href="#city-alicante-vocabulary-custom">From stories</a>` : '';
    return head + `<div class="panel"><div class="stats3"><div><b>${ids.length}</b><small>words in ${esc(c.short || c.name)} · ${cats.length} topics</small></div><div><b>${saved}</b><small>in your book</small></div><div><b>${S.due().length}</b><small>due for review (all cities)</small></div></div>
      <div class="row gap wrap"><a class="btn primary" href="#vocab-review">Review due cards</a>${book}<a class="btn ghost" href="#game-mc">❓ Quiz</a><a class="btn ghost" href="#game-match">🧩 Matching</a><a class="btn ghost" href="#game-spell">✍️ Spelling</a></div>
      <p class="tiny muted">Save a topic to add its words to spaced-repetition review (games use the words in your book). Tap a card for IPA, audio, examples and notes. IPA marked “rule-based” is generated from Castilian spelling rules.</p>
      <div class="chips filter"><a class="chip ${only ? '' : 'on'}" href="#city-${c.id}-vocabulary">All topics</a>${cats.map(k => `<a class="chip ${k === only ? 'on' : ''}" href="#city-${c.id}-vocabulary-${k}">${esc(H.vcatName(k))} <small>${groups[k].length}</small></a>`).join('')}</div>
      <input type="text" id="vq" placeholder="Search Spanish or English in ${esc(c.short || c.name)}…" aria-label="Search words"></div>
      ${(only ? [only] : cats).map((k, i) => { const list = groups[k]; const sv = list.filter(id => st().vocab[id]).length; return `<details class="panel vtopic" ${only || i < 2 ? 'open' : ''}><summary><h3>${esc(H.vcatName(k))} <span class="tiny muted">${list.length} words · ${sv} saved</span></h3><button class="btn small" data-savecat="${k}">${sv === list.length ? '★ Saved' : '☆ Save topic'}</button></summary><div class="vgrid">${list.map(H.vcard).join('')}</div></details>`; }).join('')}`;
  };
  // Alicante vocabulary page shows only Alicante words under "All"
  const vocab0 = V.vocab;
  V.vocab = function (cat) { const keep = MA.VOCAB; MA.VOCAB = keep.filter(v => cityOf(v) === 'alicante'); try { return vocab0(cat); } finally { MA.VOCAB = keep; } };
  // practice: Alicante-only pronunciation lessons stay in Alicante
  const prac = H.cityPractice;
  H.cityPractice = function (c, sub, head) {
    let h = prac(c, sub, head);
    if (c.id !== 'alicante') h = h.replace(/<a class="panel act" href="#lesson-c1l4">[\s\S]*?<\/a>/g, '').replace(/<a class="panel act" href="#lesson-c1l3">[\s\S]*?<\/a>/g, '').replace('<h3 class="sub-h">Pronunciation & scripted practice</h3>', '<h3 class="sub-h">Story missions (scripted)</h3>');
    return h;
  };
})();
