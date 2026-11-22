/* MADRID ACADEMY — Phase 3 (Alicante): number engine, Numbers chapter, Alphabet chapter */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;

  /* =====================================================================
     NUMBER ENGINE — European Spanish (long scale)
     g: 'n' = counting (uno), 'm' = before a masculine noun (un), 'f' = before a feminine noun (una)
     ===================================================================== */
  const UNITS = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const TENS = { 3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa' };
  const HUND = { 1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos', 7: 'setecientos', 8: 'ochocientos', 9: 'novecientos' };
  const one = (n, g) => n === 1 ? (g === 'm' ? 'un' : g === 'f' ? 'una' : 'uno') : n === 21 ? (g === 'm' ? 'veintiún' : g === 'f' ? 'veintiuna' : 'veintiuno') : UNITS[n];
  function below100(n, g) { if (n < 30) return one(n, g); const t = Math.floor(n / 10), u = n % 10; return TENS[t] + (u ? ' y ' + one(u, g) : ''); }
  // hFem: hundreds agree with a feminine noun (doscientas)
  function below1000(n, g, hFem) {
    if (n === 100) return 'cien';
    const h = Math.floor(n / 100), r = n % 100; const parts = [];
    if (h) parts.push(h === 1 ? 'ciento' : hFem ? HUND[h].replace(/os$/, 'as') : HUND[h]);
    if (r) parts.push(below100(r, g));
    return parts.join(' ');
  }
  function upTo999999(n, hFem) { // used before "millón/millones/billones" (masculine nouns) → apocope un
    const th = Math.floor(n / 1000), r = n % 1000; const p = [];
    if (th) p.push(th === 1 ? 'mil' : below1000(th, 'm', hFem) + ' mil');
    if (r) p.push(below1000(r, 'm', hFem));
    return p.join(' ');
  }
  MA.numES = function (n, g = 'n') {
    n = Math.floor(Math.abs(+n)); if (!isFinite(n)) return '';
    if (n === 0) return 'cero';
    const bil = Math.floor(n / 1e12), mill = Math.floor(n / 1e6) % 1e6, th = Math.floor(n / 1e3) % 1e3, rest = n % 1e3; const p = [];
    if (bil) p.push(bil === 1 ? 'un billón' : upTo999999(bil, false) + ' billones');
    if (mill) p.push(mill === 1 ? 'un millón' : upTo999999(mill, false) + ' millones');
    if (th) p.push(th === 1 ? 'mil' : below1000(th, 'm', g === 'f') + ' mil');
    if (rest) p.push(below1000(rest, g, g === 'f'));
    return p.join(' ');
  };
  // English (short scale)
  const EN1 = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const EN10 = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const en999 = n => { const h = Math.floor(n / 100), r = n % 100; const p = []; if (h) p.push(EN1[h] + ' hundred'); if (r) p.push(r < 20 ? EN1[r] : EN10[Math.floor(r / 10)] + (r % 10 ? '-' + EN1[r % 10] : '')); return p.join(' '); };
  MA.numEN = function (n) { n = Math.floor(n); if (n === 0) return 'zero'; const sc = [[1e12, 'trillion'], [1e9, 'billion'], [1e6, 'million'], [1e3, 'thousand']]; const p = []; for (const [v, w] of sc) { const k = Math.floor(n / v) % 1000; if (k) p.push(en999(k) + ' ' + w); } if (n % 1000) p.push(en999(n % 1000)); return p.join(' '); };
  // Spain formatting: 1.250 / 1 250 · decimal comma
  MA.numFmt = n => String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // years are written without a point (2026)
  // IPA (Castilian), hand-written for every building block
  const IPA = { cero: 'ˈθeɾo', uno: 'ˈuno', un: 'un', una: 'ˈuna', dos: 'dos', tres: 'tɾes', cuatro: 'ˈkwatɾo', cinco: 'ˈθiŋko', seis: 'sejs', siete: 'ˈsjete', ocho: 'ˈot͡ʃo', nueve: 'ˈnweβe', diez: 'djeθ', once: 'ˈonθe', doce: 'ˈdoθe', trece: 'ˈtɾeθe', catorce: 'kaˈtoɾθe', quince: 'ˈkinθe', 'dieciséis': 'djeθiˈsejs', diecisiete: 'djeθiˈsjete', dieciocho: 'djeθiˈot͡ʃo', diecinueve: 'djeθiˈnweβe', veinte: 'ˈbejnte', veintiuno: 'bejnˈtjuno', 'veintiún': 'bejnˈtjun', veintiuna: 'bejnˈtjuna', 'veintidós': 'bejntiˈðos', 'veintitrés': 'bejntiˈtɾes', veinticuatro: 'bejntiˈkwatɾo', veinticinco: 'bejntiˈθiŋko', 'veintiséis': 'bejntiˈsejs', veintisiete: 'bejntiˈsjete', veintiocho: 'bejntiˈot͡ʃo', veintinueve: 'bejntiˈnweβe', treinta: 'ˈtɾejnta', cuarenta: 'kwaˈɾenta', cincuenta: 'θiŋˈkwenta', sesenta: 'seˈsenta', setenta: 'seˈtenta', ochenta: 'oˈt͡ʃenta', noventa: 'noˈβenta', cien: 'θjen', ciento: 'ˈθjento', doscientos: 'dosˈθjentos', trescientos: 'tɾesˈθjentos', cuatrocientos: 'kwatɾoˈθjentos', quinientos: 'kiˈnjentos', seiscientos: 'sejsˈθjentos', setecientos: 'seteˈθjentos', ochocientos: 'ot͡ʃoˈθjentos', novecientos: 'noβeˈθjentos', mil: 'mil', 'millón': 'miˈʝon', millones: 'miˈʝones', 'billón': 'biˈʝon', billones: 'biˈʝones', y: 'i', de: 'de', primero: 'pɾiˈmeɾo', primer: 'pɾiˈmeɾ', segundo: 'seˈɣundo', tercero: 'teɾˈθeɾo', tercer: 'teɾˈθeɾ' };
  MA.numIPA = words => words.split(' ').map(w => IPA[w] || IPA[w.replace(/as$/, 'os')] && IPA[w.replace(/as$/, 'os')].replace(/os$/, 'as') || U.autoIPA(w)).join(' ');

  // step-by-step construction (English explanation + Spanish pieces)
  MA.numSteps = function (n, g = 'n') {
    n = Math.floor(n); const out = []; const W = x => `<b class="es">${esc(x)}</b>`;
    const explain100 = (x, gg, hf) => {
      const s = []; const h = Math.floor(x / 100), r = x % 100;
      if (x === 100) { s.push(`100 on its own (or before mil / millones) is ${W('cien')}.`); return s; }
      if (h) s.push(h === 1 ? `100 + more → ${W('ciento')} (cien becomes ciento when another number follows).` : `${h * 100} = ${W(hf ? HUND[h].replace(/os$/, 'as') : HUND[h])}${[5, 7, 9].includes(h) ? ' (irregular: learn it by heart)' : ` (${UNITS[h]} + -cientos)`}${hf ? ' — feminine because the noun is feminine' : ''}.`);
      if (r) {
        if (r < 16) s.push(`${r} = ${W(one(r, gg))}${r === 1 && gg !== 'n' ? ` (uno → ${one(1, gg)} before a ${gg === 'm' ? 'masculine' : 'feminine'} noun)` : r >= 11 ? ' (11–15 have their own words)' : ''}.`);
        else if (r < 20) s.push(`${r} = diez y ${UNITS[r - 10]} → one word: ${W(UNITS[r])}.`);
        else if (r === 20) s.push(`20 = ${W('veinte')}.`);
        else if (r < 30) s.push(`${r} = veinte + ${UNITS[r - 20]} → one word with veinti-: ${W(one(r, gg))}${r === 21 && gg !== 'n' ? ' (shortened before a noun)' : [22, 23, 26].includes(r) ? ' (written accent!)' : ''}.`);
        else { const t = Math.floor(r / 10) * 10, u = r % 10; s.push(u ? `${r} = ${t} + ${u} → ${W(TENS[t / 10])} + ${W('y')} + ${W(one(u, gg))}. From 31 to 99 use three words joined by «y».` : `${r} = ${W(TENS[t / 10])}.`); }
        if (h) s.push(`No «y» after the hundreds: ${W(below1000(x, gg, hf))}.`);
      }
      return s;
    };
    if (n === 0) return [`0 = ${W('cero')}.`];
    const bil = Math.floor(n / 1e12), mill = Math.floor(n / 1e6) % 1e6, th = Math.floor(n / 1e3) % 1e3, rest = n % 1e3;
    const groups = [bil && bil * 1e12, mill && mill * 1e6, th && th * 1e3, rest].filter(Boolean);
    if (groups.length > 1) out.push(`Split into groups: ${groups.map(x => MA.numFmt(x)).join(' + ')}.`);
    if (bil) out.push(bil === 1 ? `1.000.000.000.000 = ${W('un billón')}. Careful: Spanish «billón» = a million millions (English “trillion”).` : `${MA.numFmt(bil)} × 1.000.000.000.000 = ${W(upTo999999(bil) + ' billones')}.`);
    if (mill) {
      if (mill === 1) out.push(`1.000.000 = ${W('un millón')}. «Millón» is a noun, so it takes «un» (never «uno»).`);
      else if (mill % 1000 === 0 && mill / 1000 === 1) out.push(`1.000 millones = ${W('mil millones')} — this is English “one billion”. Spain does NOT say «un billón» for it.`);
      else out.push(`${MA.numFmt(mill)} millions → say ${W(upTo999999(mill))} + ${W('millones')} (plural, no accent).${mill >= 1000 ? ' Thousands of millions = English billions.' : ''}`);
    }
    if (th) { if (th === 1) out.push(`1.000 = ${W('mil')} — never «un mil».`); else { out.push(`${MA.numFmt(th * 1000)} = (${th}) + ${W('mil')}: ${W(below1000(th, 'm', g === 'f') + ' mil')}. «Mil» never changes to «miles» when counting.`); explain100(th, 'm', g === 'f').forEach(x => out.push('&nbsp;&nbsp;↳ ' + x)); } }
    if (rest) explain100(rest, g, g === 'f').forEach(x => out.push(x));
    if (n % 1e6 === 0 && n >= 1e6) out.push(`Before a noun, add ${W('de')}: ${W(MA.numES(n) + ' de euros')}.`);
    out.push(`Result: ${W(MA.numES(n, g))}`);
    return out;
  };
  MA.numCard = (n, g = 'n', note = '') => { const w = MA.numES(n, g); return `<tr><td class="num-d">${note === 'year' ? n : MA.numFmt(n)}${note ? `<small>${esc(note)}</small>` : ''}</td><td class="es">${esc(w)} ${UI.spk(w)}</td><td><span class="ipa">/${esc(MA.numIPA(w))}/</span></td><td>${esc(MA.numEN(n))}</td><td class="steps"><details><summary>How it’s built</summary><ol>${MA.numSteps(n, g).map(x => `<li>${x}</li>`).join('')}</ol></details></td></tr>`; };
  MA.numTable = (list, caption) => `<div class="tbl-wrap"><table class="tbl numtbl">${caption ? `<caption>${esc(caption)}</caption>` : ''}<thead><tr><th>Number</th><th>Spanish</th><th>IPA (Castilian)</th><th>English</th><th>Construction</th></tr></thead><tbody>${list.map(x => Array.isArray(x) ? MA.numCard(x[0], x[1], x[2]) : MA.numCard(x)).join('')}</tbody></table></div>`;
  const nAns = (n, g = 'n') => [MA.numES(n, g)];
  const dAns = n => [String(n), MA.numFmt(n), String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')];

  /* ---------- Number Lab: build and hear any number ---------- */
  H.numLab = function (el, preset) {
    el.innerHTML = `<div class="lab"><div class="lab-in"><label for="lab-n">Type any number (up to 999 billion)</label><div class="row gap wrap"><input type="text" id="lab-n" inputmode="numeric" value="${preset || 1250}" aria-label="Number"><select id="lab-g" aria-label="Use"><option value="n">counting (uno)</option><option value="m">+ masculine noun (un libro)</option><option value="f">+ feminine noun (una casa)</option></select></div>
      <div class="lab-rand">${[['0–99', 0, 99], ['100–999', 100, 999], ['1.000–999.999', 1000, 999999], ['Millions', 1e6, 999999999], ['Billions (mil millones)', 1e9, 999e9]].map(r => `<button class="btn small ghost" data-r="${r[1]},${r[2]}">🎲 ${r[0]}</button>`).join('')}</div></div>
      <div class="lab-out" aria-live="polite"></div></div>`;
    const inp = el.querySelector('#lab-n'), sel = el.querySelector('#lab-g'), out = el.querySelector('.lab-out');
    const draw = () => {
      const n = parseInt(inp.value.replace(/[^\d]/g, ''), 10);
      if (!isFinite(n) || n > 999999999999999) { out.innerHTML = '<p class="muted">Type a whole number from 0 to 999.999.999.999.999.</p>'; return; }
      const w = MA.numES(n, sel.value), noun = sel.value === 'm' ? ' libros' : sel.value === 'f' ? ' casas' : '';
      const say = w + (n === 1 ? (sel.value === 'm' ? ' libro' : sel.value === 'f' ? ' casa' : '') : noun && (n % 1e6 === 0 && n >= 1e6 ? ' de' + noun : noun));
      out.innerHTML = `<p class="lab-digits">${MA.numFmt(n)}${noun ? `<small>${noun.trim()}</small>` : ''}</p><p class="lab-words es">${esc(say)} ${UI.spk(say)}</p><p><span class="ipa">/${esc(MA.numIPA(w))}/</span></p><p class="muted">${esc(MA.numEN(n))}${n >= 1e9 && n < 1e12 ? ' (English “billion” = Spanish «mil millones»)' : n >= 1e12 ? ' (English “trillion” = Spanish «billón»)' : ''}</p><ol class="lab-steps">${MA.numSteps(n, sel.value).map(x => `<li>${x}</li>`).join('')}</ol>`;
    };
    inp.oninput = draw; sel.onchange = draw;
    el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { const [a, z] = b.dataset.r.split(',').map(Number); let n = a + Math.floor(Math.random() * (z - a + 1)); if (z > 1e6) n = Math.round(n / 1000) * 1000; inp.value = n; draw(); });
    draw();
  };

  /* ---------- counting exercise ---------- */
  UI.R.count = (it, body, done, ctx) => {
    const seq = []; for (let i = 0; i < it.show; i++) seq.push(it.start + i * (it.step || 1));
    const ask = it.start + it.show * (it.step || 1);
    body.innerHTML = `<p class="q">Keep counting${it.step && it.step !== 1 ? ` (in steps of ${MA.numFmt(it.step)})` : ''}. Write the next number in words.</p><p class="count-seq es">${seq.map(n => `${esc(MA.numES(n))} <small>(${MA.numFmt(n)})</small>`).join(' → ')} → <b>?</b></p>
      <input type="text" id="ans" autocomplete="off" aria-label="Next number in words">${UI.accentBar()}<button class="btn primary" id="chk">${ctx.exam ? 'Submit answer' : 'Check'}</button>`;
    const inp = body.querySelector('#ans'); const go = () => { const g = inp.value.trim(); if (!g) return; const m = U.matchAnswer(g, [MA.numES(ask)]); inp.disabled = true; body.querySelector('#chk').disabled = true; done({ objective: true, correct: m.ok, accent: m.ok && !m.exact, score: m.ok ? 1 : 0, given: g, expected: MA.numES(ask) + ` (${MA.numFmt(ask)})` }); };
    body.querySelector('#chk').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); }; setTimeout(() => inp.focus(), 20);
  };

  /* =====================================================================
     CHAPTER 3 — LOS NÚMEROS (textbook format)
     ===================================================================== */
  const sec = (h, body) => `<h4>${h}</h4>${body}`;
  const L = (num, words) => `<b>${num}</b> = <span class="es">${esc(words)}</span> ${UI.spk(words)}`;
  const NUM_LESSONS = [
    { id: 'c3l1', title: 'Del 0 al 29', en: 'Numbers 0–29: the building blocks', skill: 'vocab', minutes: 15, vocab: ['uno_un_una'], lab: 21,
      intro: sec('Definition', '<p>Cardinal numbers (<i>números cardinales</i>) say <b>how many</b>. Numbers 0–29 are the building blocks: almost every bigger number re-uses them.</p>') +
        sec('Sentence structure', '<p>Number + noun: <span class="es">dos cafés</span>, <span class="es">quince euros</span>. Numbers go <b>before</b> the noun and do not change for plural (except <i>uno</i> and the hundreds).</p>') +
        sec('Rules', `<ol><li><b>0–15</b> have their own words: learn them by heart.</li><li><b>16–19</b> = <i>diez y seis</i> written as one word: ${L(16, 'dieciséis')}, ${L(17, 'diecisiete')}, ${L(18, 'dieciocho')}, ${L(19, 'diecinueve')}. Note: <b>z → c</b> (diez → dieci-).</li><li><b>20</b> = ${L(20, 'veinte')}. <b>21–29</b> = veinte + unit as one word with <b>veinti-</b>: ${L(23, 'veintitrés')}, ${L(28, 'veintiocho')}.</li><li><b>Written accents</b>: dieciséis, veintidós, veintitrés, veintiséis (and veintiún).</li></ol>`) +
        sec('Uno, un, una', `<p><b>Uno</b> is for counting: <span class="es">uno, dos, tres…</span>. Before a <b>masculine noun</b> it becomes <b>un</b>: <span class="es">un café</span>, <span class="es">veintiún años</span>. Before a <b>feminine noun</b> it becomes <b>una</b>: <span class="es">una tostada</span>, <span class="es">veintiuna personas</span>.</p>`) +
        sec('Common mistakes', '<ul class="mistakes"><li>❌ <s>diez y seis</s> → ✅ dieciséis (one word since 1950s spelling rules)</li><li>❌ <s>veinte y dos</s> → ✅ veintidós</li><li>❌ <s>uno café</s> → ✅ un café</li><li>❌ <s>veintidos</s> → ✅ veintidós (accent)</li></ul>') +
        MA.numTable([0, 1, [1, 'm', 'un libro'], [1, 'f', 'una casa'], 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, [21, 'm', 'veintiún años'], 22, 23, 26, 29], 'Numbers 0–29') +
        sec('Summary', '<p>0–15 memorise · 16–19 dieci- · 20 veinte · 21–29 veinti- · uno/un/una agree with the noun.</p>'),
      ex: [
        { t: 'fill', q: '15 = ___', a: nAns(15), skill: 'vocab' }, { t: 'fill', q: '17 = ___', a: nAns(17), skill: 'vocab', ex: 'diez + siete → diecisiete' },
        { t: 'fill', q: '22 = ___ (remember the accent)', a: nAns(22), skill: 'vocab', ex: 'veinte + dos → veintidós' },
        { t: 'listen', say: 'catorce', o: ['4', '14', '40'], a: 1, skill: 'listening' }, { t: 'listen', say: 'veintisiete', o: ['17', '27', '72'], a: 1, skill: 'listening' },
        { t: 'count', start: 17, show: 3, skill: 'vocab' }, { t: 'count', start: 26, show: 3, skill: 'vocab' },
        { t: 'mc', q: 'Tengo ___ hermano. (1)', o: ['uno', 'un', 'una'], a: 1, ex: 'hermano is masculine → un', skill: 'grammar' },
        { t: 'mc', q: 'Quería ___ tostada. (1)', o: ['uno', 'un', 'una'], a: 2, ex: 'tostada is feminine → una', skill: 'grammar' },
        { t: 'fix', q: 'Tengo veinte y cinco años.', a: ['tengo veinticinco años'], ex: '21–29 are one word: veinticinco.', skill: 'grammar' },
        { t: 'match', p: [['once', '11'], ['trece', '13'], ['dieciséis', '16'], ['veinte', '20'], ['veintinueve', '29']], skill: 'vocab' }
      ] },
    { id: 'c3l2', title: 'Las decenas: 30–99', en: 'Tens and the «y» pattern', skill: 'vocab', minutes: 15, vocab: [], lab: 32,
      intro: sec('Definition', '<p>From 30 to 99 Spanish builds numbers with a simple pattern: <b>TENS + y + UNIT</b>, written as <b>three words</b>.</p>') +
        sec('The tens', MA.numTable([30, 40, 50, 60, 70, 80, 90], 'Tens (decenas)')) +
        sec('Rules', `<ol><li>Tens + <b>y</b> + unit: ${L(31, 'treinta y uno')}, ${L(32, 'treinta y dos')}, ${L(45, 'cuarenta y cinco')}, ${L(99, 'noventa y nueve')}.</li><li>«y» is used <b>only</b> between tens and units (31–99). Never after hundreds or thousands.</li><li>Watch the irregular stems: <b>cincuenta</b> (not cinconta), <b>sesenta</b> (6 = seis), <b>setenta</b> (7 = siete), <b>noventa</b> (9 = nueve).</li><li>Sesenta vs setenta: listen for <b>-s-</b> (60) and <b>-t-</b> (70).</li></ol>`) +
        sec('Uno, un, una after 30', `<p>The final <i>uno</i> still changes before nouns: <span class="es">treinta y <b>un</b> libros</span> (31 books) · <span class="es">treinta y <b>una</b> casas</span> (31 houses) · counting: <span class="es">treinta y <b>uno</b></span>.</p>`) +
        sec('Correct vs incorrect', '<ul class="mistakes"><li>❌ <s>treintaiuno</s> → ✅ treinta y uno (one word only for 16–29)</li><li>❌ <s>trenta</s> → ✅ treinta (Italian/Catalan interference)</li><li>❌ <s>treinta y uno casas</s> → ✅ treinta y una casas</li><li>❌ <s>cincoenta</s> → ✅ cincuenta</li></ul>') +
        sec('Compare', '<p>English: thirty-one (hyphen) · Spanish: <span class="es">treinta y uno</span> (three words). Up to 29 Spanish fuses the words; from 31 it keeps them apart.</p>') +
        MA.numTable([31, [31, 'm', 'treinta y un libros'], [31, 'f', 'treinta y una casas'], 32, 45, 58, 67, 76, 84, 99], 'Examples 31–99') +
        sec('Summary', '<p>Tens + y + unit · three words · y only from 31 to 99 · uno/un/una still agrees.</p>'),
      ex: [
        { t: 'fill', q: '31 = ___', a: nAns(31), skill: 'vocab' }, { t: 'fill', q: '32 = ___', a: nAns(32), skill: 'vocab' }, { t: 'fill', q: '58 = ___', a: nAns(58), skill: 'vocab' },
        { t: 'listen', say: 'setenta y siete', o: ['67', '77', '76'], a: 1, skill: 'listening' }, { t: 'listen', say: 'sesenta y seis', o: ['66', '76', '56'], a: 0, skill: 'listening' },
        { t: 'mc', q: '31 books =', o: ['treinta y uno libros', 'treinta y un libros', 'treinta y una libros'], a: 1, skill: 'grammar', ex: 'libro is masculine → un' },
        { t: 'mc', q: '31 houses =', o: ['treinta y una casas', 'treinta y un casas', 'treintaiuna casas'], a: 0, skill: 'grammar', ex: 'casa is feminine → una' },
        { t: 'count', start: 37, show: 3, skill: 'vocab' }, { t: 'count', start: 30, show: 3, step: 10, skill: 'vocab' },
        { t: 'order', w: ['y', 'cinco', 'cuarenta'], a: ['cuarenta y cinco'], en: '45', skill: 'grammar' },
        { t: 'fix', q: 'Son trenta y dos euros.', a: ['son treinta y dos euros'], ex: 'treinta (with an e-i diphthong).', skill: 'grammar' },
        { t: 'fill', q: 'noventa y nueve = ___ (digits)', a: dAns(99), skill: 'vocab' }
      ] },
    { id: 'c3l3', title: 'Las centenas: 100–999', en: 'Hundreds, and «cien» vs «ciento»', skill: 'grammar', minutes: 18, vocab: ['cien', 'ciento'], lab: 112,
      intro: sec('Definition', '<p>Hundreds (<i>centenas</i>) are written as one word for each hundred, followed by the rest of the number <b>without «y»</b>.</p>') +
        sec('Cien or ciento?', `<p>This is the key rule of this lesson:</p><ul><li><b>cien</b> = exactly 100, alone or before a noun or before <i>mil / millones</i>: ${L(100, 'cien')} · <span class="es">cien euros</span> · <span class="es">cien mil</span>.</li><li><b>ciento</b> = 100 + something more: ${L(101, 'ciento uno')}, ${L(111, 'ciento once')}, ${L(112, 'ciento doce')}, ${L(150, 'ciento cincuenta')}.</li><li>Only in percentages Spain also says <span class="es">cien por cien</span> (or <i>ciento por ciento</i>, more formal).</li></ul>`) +
        sec('The hundreds', MA.numTable([100, 200, 300, 400, 500, 600, 700, 800, 900], 'Hundreds') + '<p><b>Irregular:</b> 500 <span class="es">quinientos</span>, 700 <span class="es">setecientos</span>, 900 <span class="es">novecientos</span>. The rest = number + <i>-cientos</i>.</p>') +
        sec('Gender', `<p>200–900 agree with feminine nouns: <span class="es">doscient<b>os</b> libros</span> · <span class="es">doscient<b>as</b> casas</span> · <span class="es">quinient<b>as</b> personas</span>. <i>Cien</i> and <i>ciento</i> never change.</p>`) +
        sec('Rules', '<ol><li>Hundreds + tens/units, no «y»: <span class="es">ciento uno</span>, <span class="es">trescientos cuarenta y dos</span>.</li><li>The «y» inside 31–99 stays: <span class="es">doscientos treinta <b>y</b> uno</span>.</li></ol>') +
        sec('Correct vs incorrect', '<ul class="mistakes"><li>❌ <s>ciento y uno</s> → ✅ ciento uno (no «y» after hundreds — that is Latin American/older usage only in a few fixed phrases)</li><li>❌ <s>un ciento</s> → ✅ cien</li><li>❌ <s>cien uno</s> → ✅ ciento uno</li><li>❌ <s>cincocientos</s> → ✅ quinientos</li><li>❌ <s>doscientos personas</s> → ✅ doscientas personas</li></ul>') +
        MA.numTable([101, 111, 112, 125, 199, [200, 'f', 'doscientas casas'], 342, 555, 777, 999], 'Examples 101–999') +
        sec('Summary', '<p>100 = cien · 101–199 = ciento… · 500/700/900 irregular · no «y» after hundreds · 200–900 agree with feminine nouns.</p>'),
      ex: [
        { t: 'mc', q: '100 euros =', o: ['ciento euros', 'cien euros', 'un ciento euros'], a: 1, skill: 'grammar', ex: 'Exactly 100 before a noun → cien.' },
        { t: 'fill', q: '101 = ___', a: nAns(101), skill: 'vocab', ex: '100 + 1 → ciento uno (no «y»)' }, { t: 'fill', q: '111 = ___', a: nAns(111), skill: 'vocab' }, { t: 'fill', q: '112 = ___', a: nAns(112), skill: 'vocab' },
        { t: 'fill', q: '500 = ___', a: nAns(500), skill: 'vocab', ex: 'Irregular: quinientos' }, { t: 'fill', q: '700 = ___', a: nAns(700), skill: 'vocab' },
        { t: 'mc', q: '200 houses =', o: ['doscientos casas', 'doscientas casas', 'dos cien casas'], a: 1, skill: 'grammar' },
        { t: 'fix', q: 'Son ciento y cinco euros.', a: ['son ciento cinco euros'], skill: 'grammar', ex: 'No «y» after the hundreds.' },
        { t: 'listen', say: 'quinientos cincuenta', o: ['505', '550', '515'], a: 1, skill: 'listening' }, { t: 'listen', say: 'novecientos noventa y nueve', o: ['999', '909', '990'], a: 0, skill: 'listening' },
        { t: 'count', start: 98, show: 2, skill: 'vocab' }, { t: 'count', start: 100, show: 3, step: 100, skill: 'vocab' },
        { t: 'fill', q: 'trescientos cuarenta y dos = ___ (digits)', a: dAns(342), skill: 'vocab' }
      ] },
    { id: 'c3l4', title: 'Miles, millones y billones', en: 'Thousands, millions and the long-scale «billón»', skill: 'grammar', minutes: 20, vocab: ['mil', 'millon', 'billon'], lab: 1000000000,
      intro: sec('Definition', '<p>Big numbers are built in <b>groups of three digits</b>, exactly like English: thousands (<i>mil</i>), millions (<i>millones</i>). But the names above a million are different.</p>') +
        sec('Mil (1.000)', `<ul><li>${L(1000, 'mil')} — never «un mil».</li><li>${L(2000, 'dos mil')}, ${L(10000, 'diez mil')}, ${L(100000, 'cien mil')} (cien because <i>mil</i> follows).</li><li><i>Mil</i> does not change: <span class="es">tres mil</span>, not «tres miles». (<i>Miles de…</i> = thousands of, an approximate amount: <span class="es">miles de personas</span>.)</li><li>${L(1250, 'mil doscientos cincuenta')} — group by group, no «y».</li></ul>`) +
        sec('Millón (1.000.000)', `<ul><li><b>Millón is a noun</b>: ${L(1000000, 'un millón')}, ${L(2000000, 'dos millones')} (plural, no accent).</li><li>Before another noun add <b>de</b>: <span class="es">un millón <b>de</b> euros</span>, <span class="es">tres millones <b>de</b> habitantes</span>. Without <i>de</i> if more digits follow: <span class="es">un millón doscientos mil habitantes</span>.</li><li>Numbers before <i>millón</i> use the masculine short form: <span class="es">veintiún millones</span>.</li></ul>`) +
        `<div class="note warn-note"><b>Important — billion vs billón.</b> Spain uses the <b>long scale</b>:<ul><li>English <b>one billion</b> (1.000.000.000) = <span class="es"><b>mil millones</b></span> ${UI.spk('mil millones')}</li><li>Spanish <b>un billón</b> (1.000.000.000.000) = English <b>one trillion</b> ${UI.spk('un billón')}</li></ul>So «The company earned 2 billion» = <span class="es">La empresa ganó dos mil millones</span>. Translating “billion” as «billón» is a classic, very expensive mistake.</div>` +
        sec('Writing big numbers in Spain', '<p>Spain uses a <b>comma for decimals</b> (2,50 €) and groups thousands with a <b>point</b> (1.250.000) or a <b>thin space</b> (1 250 000, recommended by the RAE for numbers over four digits). Four-digit numbers and years have no separator: <b>2026</b>.</p>') +
        sec('Correct vs incorrect', '<ul class="mistakes"><li>❌ <s>un mil</s> → ✅ mil</li><li>❌ <s>dos miles</s> → ✅ dos mil</li><li>❌ <s>un millón euros</s> → ✅ un millón de euros</li><li>❌ <s>un billón</s> for 10⁹ → ✅ mil millones</li><li>❌ <s>ciento mil</s> → ✅ cien mil</li></ul>') +
        MA.numTable([1000, 1250, [2026, 'n', 'year'], 10000, [21000, 'm', 'veintiún mil'], 100000, [200000, 'f', 'doscientas mil personas'], 1000000, 2500000, 1000000000, 2000000000, 1000000000000], 'From mil to billón') +
        sec('Summary', '<p>mil (never un mil) · cien mil · un millón / dos millones (+ de + noun) · 10⁹ = mil millones · un billón = 10¹² · decimal comma.</p>'),
      ex: [
        { t: 'fill', q: '1.000 = ___', a: nAns(1000), skill: 'vocab' }, { t: 'fill', q: '10.000 = ___', a: nAns(10000), skill: 'vocab' }, { t: 'fill', q: '100.000 = ___', a: nAns(100000), skill: 'vocab', ex: 'cien (not ciento) because mil follows' },
        { t: 'fill', q: '1.000.000 = ___', a: nAns(1000000), skill: 'vocab' },
        { t: 'mc', q: 'English “one billion” (1.000.000.000) in Spain is…', o: ['un billón', 'mil millones', 'un millón de mil'], a: 1, skill: 'grammar', ex: 'Long scale: 10⁹ = mil millones; un billón = 10¹².' },
        { t: 'mc', q: 'Spanish «un billón» means…', o: ['1.000.000.000 (English billion)', '1.000.000.000.000 (English trillion)', '1.000.000'], a: 1, skill: 'grammar' },
        { t: 'mc', q: 'Madrid tiene más de tres millones ___ habitantes.', o: ['de', 'y', '—'], a: 0, skill: 'grammar', ex: 'millón/millones + de + noun' },
        { t: 'fix', q: 'El coche cuesta un mil euros.', a: ['el coche cuesta mil euros'], skill: 'grammar', ex: 'Never «un mil».' },
        { t: 'fill', q: '2026 (a year) = ___', a: nAns(2026), skill: 'vocab' },
        { t: 'listen', say: 'mil doscientos cincuenta', o: ['1.250', '1.205', '12.050'], a: 0, skill: 'listening' }, { t: 'listen', say: 'dos millones', o: ['2.000', '200.000', '2.000.000'], a: 2, skill: 'listening' },
        { t: 'count', start: 998, show: 2, skill: 'vocab' }, { t: 'count', start: 1000, show: 2, step: 1000, skill: 'vocab' },
        { t: 'fill', q: 'doscientos mil = ___ (digits)', a: dAns(200000), skill: 'vocab' }
      ] },
    { id: 'c3l5', title: 'Números en la vida real', en: 'Ordinals, dates, ages, prices, quantities and phone numbers', skill: 'listening', minutes: 18, vocab: ['primero', 'docena', 'medio'], lab: 2026,
      intro: sec('Ordinal numbers', `<p>Ordinals say the <b>position</b>: ${L('1.º', 'primero')}, ${L('2.º', 'segundo')}, ${L('3.º', 'tercero')}, <span class="es">cuarto, quinto, sexto, séptimo, octavo, noveno, décimo</span> ${UI.spk('cuarto, quinto, sexto, séptimo, octavo, noveno, décimo')}. They agree like adjectives: <span class="es">la primera calle</span>. <b>Primero</b> and <b>tercero</b> lose the -o before a masculine noun: <span class="es">el <b>primer</b> piso</span>, <span class="es">el <b>tercer</b> día</span>. From 11 up, people normally use cardinals: <span class="es">el siglo veintiuno</span>.</p>`) +
        sec('Dates', `<p>Day + <b>de</b> + month + <b>de</b> + year, with cardinals: ${L('15/03/2026', 'el quince de marzo de dos mil veintiséis')}. For the 1st, Spain says <span class="es">el uno de mayo</span> (also <i>el primero de mayo</i>). Years are read as normal numbers: ${L(1999, 'mil novecientos noventa y nueve')} — never «diecinueve noventa y nueve».</p>`) +
        sec('Age', `<p>Spanish uses <b>tener</b> + number + <b>años</b>: <span class="es">Tengo veinticinco años</span> ${UI.spk('Tengo veinticinco años')} (not «soy veinticinco»). With 21/31…: <span class="es">tengo veintiún años</span>.</p>`) +
        sec('Prices', `<p>Decimal comma; say <b>con</b> or just the pair of numbers: ${L('12,50 €', 'doce euros con cincuenta')} or <span class="es">doce cincuenta</span>. <span class="es">Un euro</span>, <span class="es">veintiún euros</span>.</p>`) +
        sec('Quantities', '<p><span class="es">una docena de huevos</span> (12), <span class="es">media docena</span> (6), <span class="es">medio kilo</span>, <span class="es">un cuarto de kilo</span> (250 g), <span class="es">cien gramos de jamón</span>, <span class="es">el doble / la mitad</span>.</p>') +
        sec('Phone numbers', `<p>Spanish mobile numbers have 9 digits starting with 6 or 7. People usually say them in groups: <b>612 34 56 78</b> → <span class="es">seis uno dos, treinta y cuatro, cincuenta y seis, setenta y ocho</span> ${UI.spk('seis uno dos, treinta y cuatro, cincuenta y seis, setenta y ocho')}. Some people read digit by digit; both are normal. Spain’s country code: <b>+34</b> (<i>más treinta y cuatro</i>).</p>`) +
        sec('Common mistakes', '<ul class="mistakes"><li>❌ <s>Soy veinte años</s> → ✅ Tengo veinte años</li><li>❌ <s>el primero piso</s> → ✅ el primer piso</li><li>❌ <s>marzo quince</s> → ✅ el quince de marzo</li><li>❌ <s>2.50 €</s> → ✅ 2,50 €</li></ul>') +
        MA.numTable([[1999, 'n', 'year'], [2026, 'n', 'year'], [21, 'm', 'veintiún años'], 12], 'Real-life examples'),
      ex: [
        { t: 'mc', q: 'I live on the 3rd floor: Vivo en el ___ piso.', o: ['tercero', 'tercer', 'tres'], a: 1, skill: 'grammar', ex: 'tercero → tercer before a masculine noun' },
        { t: 'fill', q: '15/03 → el ___ de marzo', a: ['quince'], skill: 'vocab' },
        { t: 'tr', en: 'I am 25 years old.', a: ['tengo veinticinco años', 'yo tengo veinticinco años'], skill: 'writing' },
        { t: 'listen', say: 'doce euros con cincuenta', o: ['12,15 €', '12,50 €', '20,50 €'], a: 1, skill: 'listening' },
        { t: 'listen', say: 'seis uno dos, treinta y cuatro, cincuenta y seis, setenta y ocho', o: ['612 34 56 78', '612 43 65 87', '621 34 56 78'], a: 0, skill: 'listening' },
        { t: 'fill', q: '1999 (a year) = ___', a: nAns(1999), skill: 'vocab' },
        { t: 'match', p: [['una docena', '12'], ['media docena', '6'], ['medio kilo', '500 g'], ['un cuarto de kilo', '250 g']], skill: 'vocab' },
        { t: 'fix', q: 'Soy veintiún años.', a: ['tengo veintiun años', 'tengo veintiún años'], skill: 'grammar', ex: 'Age uses tener … años.' },
        { t: 'mc', q: 'el ___ de mayo (1st May, most common in Spain)', o: ['uno', 'una', 'un'], a: 0, skill: 'grammar' }
      ] }
  ];

  /* =====================================================================
     CHAPTER 0 — EL ALFABETO
     ===================================================================== */
  const ABC = [['a', 'a', 'a', '/a/', 'agua'], ['b', 'be', 'be', '/b/ ~ [β]', 'barco'], ['c', 'ce', 'θe', '/k/ (ca, co, cu) · /θ/ (ce, ci)', 'casa · cine'], ['d', 'de', 'de', '/d/ ~ [ð]', 'dedo'], ['e', 'e', 'e', '/e/', 'euro'],
    ['f', 'efe', 'ˈefe', '/f/', 'foto'], ['g', 'ge', 'xe', '/ɡ/ ~ [ɣ] (ga, go, gu) · /x/ (ge, gi)', 'gato · gente'], ['h', 'hache', 'ˈat͡ʃe', 'silent', 'hola'], ['i', 'i', 'i', '/i/', 'isla'], ['j', 'jota', 'ˈxota', '/x/', 'jamón'],
    ['k', 'ka', 'ka', '/k/', 'kilo'], ['l', 'ele', 'ˈele', '/l/', 'luna'], ['m', 'eme', 'ˈeme', '/m/', 'mar'], ['n', 'ene', 'ˈene', '/n/', 'no'], ['ñ', 'eñe', 'ˈeɲe', '/ɲ/', 'niño'],
    ['o', 'o', 'o', '/o/', 'ojo'], ['p', 'pe', 'pe', '/p/', 'pan'], ['q', 'cu', 'ku', '/k/ (only in que, qui)', 'queso'], ['r', 'erre', 'ˈere', '/ɾ/ tap · /r/ trill (start of word, rr)', 'pero · rosa'], ['s', 'ese', 'ˈese', '/s/', 'sol'],
    ['t', 'te', 'te', '/t/', 'taza'], ['u', 'u', 'u', '/u/', 'uva'], ['v', 'uve', 'ˈuβe', '/b/ ~ [β] — same as b', 'vaso'], ['w', 'uve doble', 'ˈuβe ˈðoβle', '/w/ or /b/ (loanwords)', 'wifi'], ['x', 'equis', 'ˈekis', '/ks/', 'taxi'],
    ['y', 'ye (i griega)', 'ʝe', '/ʝ/ · /i/ at the end', 'yo · hoy'], ['z', 'zeta', 'ˈθeta', '/θ/', 'zapato']];
  const ABC_LESSON = { id: 'c0l1', title: 'El alfabeto', en: 'The 27 letters, their names and sounds', skill: 'listening', minutes: 15, vocab: [],
    intro: sec('Definition', '<p>The Spanish alphabet (<i>el abecedario</i>) has <b>27 letters</b>: the 26 English letters plus <b>ñ</b>. Letter names are feminine: <span class="es">la a, la be, la eñe</span>.</p>') +
      sec('Why it matters', '<p>You need letter names to <b>spell</b> (<i>deletrear</i>) your name, an email or an address — at hotels, phones and offices: <span class="es">¿Cómo se escribe?</span> ' + UI.spk('¿Cómo se escribe?') + ' = How do you spell it?</p>') +
      `<div class="tbl-wrap"><table class="tbl abc"><thead><tr><th>Letter</th><th>Name</th><th>IPA of name</th><th>Sound in words</th><th>Example</th></tr></thead><tbody>${ABC.map(r => `<tr><td class="num-d">${r[0].toUpperCase()} ${r[0]}</td><td class="es">${esc(r[1])} ${UI.spk(r[1].replace(/ \(.*\)/, ''))}</td><td><span class="ipa">/${esc(r[2])}/</span></td><td>${esc(r[3])}</td><td class="es">${esc(r[4])} ${UI.spk(r[4].split(' · ')[0])}</td></tr>`).join('')}</tbody></table></div>` +
      sec('Rules', '<ol><li><b>ch</b> and <b>ll</b> are no longer separate letters (RAE, 2010) but still represent single sounds: <span class="es">chico, llave</span>.</li><li><b>rr</b> is a digraph (two letters, one sound): <span class="es">perro</span>.</li><li><b>b</b> and <b>v</b> sound the same. To distinguish them when spelling, people in Spain say «be» and «uve».</li><li>The vowels <b>a e i o u</b> are always short and clear — no English “ay”, “ee” glides.</li><li>Recommended names: <b>ye</b> for y, <b>uve</b> for v, <b>uve doble</b> for w (Spain).</li></ol>') +
      sec('Spelling your name', '<p class="es">—¿Cómo te llamas? —Kait. —¿Cómo se escribe? —Ka, a, i, te.</p><p class="muted">Capital letter = <i>mayúscula</i>, small letter = <i>minúscula</i>, accent = <i>tilde</i> («e con tilde» = é).</p>') +
      sec('Common mistakes', '<ul class="mistakes"><li>❌ Saying “ee” for e → ✅ <b>e</b> = /e/ as in “bed”</li><li>❌ Saying the h in <i>hola</i> → ✅ h is silent</li><li>❌ Calling ñ “n” → ✅ <b>eñe</b>; <i>año</i> (year) ≠ <i>ano</i> (anus)!</li></ul>') +
      sec('Summary', '<p>27 letters · ñ is its own letter · names: be, uve, ye, zeta · h silent · b = v.</p>'),
    ex: [
      { t: 'listen', say: 'jota', o: ['g', 'j', 'h'], a: 1, skill: 'listening' }, { t: 'listen', say: 'eñe', o: ['n', 'ñ', 'm'], a: 1, skill: 'listening' }, { t: 'listen', say: 'uve', o: ['b', 'v', 'w'], a: 1, skill: 'listening' },
      { t: 'listen', say: 'hache', o: ['h', 'ch', 'j'], a: 0, skill: 'listening' }, { t: 'listen', say: 'zeta', o: ['s', 'c', 'z'], a: 2, skill: 'listening' },
      { t: 'mc', q: 'How many letters does the Spanish alphabet have?', o: ['26', '27', '29'], a: 1, skill: 'vocab' },
      { t: 'mc', q: 'Which letter is silent?', o: ['j', 'h', 'g'], a: 1, skill: 'listening' },
      { t: 'match', p: [['be', 'b'], ['uve', 'v'], ['ge', 'g'], ['jota', 'j'], ['ye', 'y']], skill: 'vocab' },
      { t: 'listen', say: 'eme, a, de, ere, i, de', o: ['MADRID', 'MADRIT', 'NADRID'], a: 0, skill: 'listening' },
      { t: 'fill', q: 'Spell «sol» with letter names (comma separated): ___', a: ['ese, o, ele', 'ese o ele'], skill: 'vocab' },
      { t: 'mc', q: '¿Cómo se escribe? means…', o: ['How do you say it?', 'How do you spell it?', 'What is it?'], a: 1, skill: 'vocab' }
    ] };

  /* ---------- new vocabulary entries ---------- */
  MA.VOCAB.push(
    { id: 'uno_un_una', es: 'uno / un / una', en: 'one', ipa: 'ˈuno / un / ˈuna', pos: 'number', ex: 'Uno, dos, tres… · un café · una tostada', exEn: 'One, two, three… · a coffee · a toast', coll: ['veintiún años', 'treinta y una casas'], rel: ['uno for counting; un + masc. noun; una + fem. noun'], cat: 'numbers', note: 'uno → un before a masculine noun; una before a feminine noun.' },
    { id: 'cien', es: 'cien', en: 'one hundred (exactly)', ipa: 'θjen', pos: 'number', ex: 'Cien euros, por favor.', exEn: 'A hundred euros, please.', coll: ['cien mil', 'cien por cien'], rel: ['ciento (101–199)'], cat: 'numbers', note: 'Exactly 100, or before mil / millones.' },
    { id: 'ciento', es: 'ciento', en: 'one hundred (+ more)', ipa: 'ˈθjento', pos: 'number', ex: 'Ciento doce personas.', exEn: 'One hundred and twelve people.', coll: ['ciento uno', 'por ciento (per cent)'], rel: ['cien'], cat: 'numbers', note: 'Used when more numbers follow: ciento uno.' },
    { id: 'mil', es: 'mil', en: 'one thousand', ipa: 'mil', pos: 'number', ex: 'Mil gracias.', exEn: 'Thanks a lot (lit. a thousand thanks).', coll: ['dos mil', 'miles de personas'], rel: ['never «un mil»'], idiom: 'mil gracias = thanks a million', cat: 'numbers' },
    { id: 'millon', es: 'millón', en: 'million', ipa: 'miˈʝon', pos: 'noun (number)', gender: 'm (el)', plural: 'millones', ex: 'Un millón de gracias.', exEn: 'A million thanks.', coll: ['un millón de euros', 'mil millones = one billion'], rel: ['billón'], cat: 'numbers', note: 'Needs de before a noun: un millón de personas.' },
    { id: 'billon', es: 'billón', en: 'trillion (10¹²) — NOT English billion', ipa: 'biˈʝon', pos: 'noun (number)', gender: 'm (el)', plural: 'billones', ex: 'Un billón es un millón de millones.', exEn: 'A «billón» is a million millions.', coll: ['un billón de euros'], rel: ['mil millones = English billion'], cat: 'numbers', note: 'Long scale: 1 billón = 1.000.000.000.000.' },
    { id: 'primero', es: 'primero / primer', en: 'first', ipa: 'pɾiˈmeɾo / pɾiˈmeɾ', pos: 'ordinal number', ex: 'Vivo en el primer piso.', exEn: 'I live on the first floor.', coll: ['la primera vez', 'en primer lugar'], rel: ['segundo, tercero (tercer)'], cat: 'numbers' },
    { id: 'docena', es: 'docena', en: 'dozen', ipa: 'doˈθena', pos: 'noun', gender: 'f (la)', plural: 'docenas', ex: 'Una docena de huevos, por favor.', exEn: 'A dozen eggs, please.', coll: ['media docena'], rel: [], cat: 'numbers' },
    { id: 'medio', es: 'medio / media', en: 'half', ipa: 'ˈmeðjo', pos: 'adjective · noun', ex: 'Medio kilo de manzanas.', exEn: 'Half a kilo of apples.', coll: ['medio kilo', 'y media (half past)'], rel: ['la mitad'], cat: 'numbers' }
  );
  MA.V = Object.fromEntries(MA.VOCAB.map(v => [v.id, v]));

  /* ---------- chapters ---------- */
  const c0 = { id: 'c0', city: 'alicante', level: 'A0', num: 0, title: 'El alfabeto', en: 'The alphabet', goal: 'Know the 27 letters, their names and sounds, and spell words and names.', lessons: [ABC_LESSON],
    review: { keyVocab: [], grammar: ['27 letters: the English 26 + ñ.', 'Letter names are feminine: la be, la eñe.', 'b and v sound the same (be / uve).', 'h is silent.', 'ch, ll, rr: two letters, one sound.'], expressions: ['¿Cómo se escribe?', 'Con mayúscula / con minúscula', 'e con tilde'], mistakes: ['Pronouncing h', 'English vowel glides', 'ñ ≠ n (año ≠ ano)'] },
    exam: [{ t: 'listen', say: 'ge', o: ['g', 'j', 'c'], a: 0, skill: 'listening' }, { t: 'listen', say: 'equis', o: ['k', 'x', 's'], a: 1, skill: 'listening' }, { t: 'listen', say: 'ce, a, ese, a', o: ['CASA', 'KASA', 'CAZA'], a: 0, skill: 'listening' },
      { t: 'mc', q: 'The Spanish name of the letter v is…', o: ['ve', 'uve', 'be'], a: 1, skill: 'vocab' }, { t: 'mc', q: 'Which pair sounds the same?', o: ['b / v', 'c / s', 'g / j'], a: 0, skill: 'vocab' },
      { t: 'match', p: [['hache', 'h'], ['zeta', 'z'], ['jota', 'j'], ['cu', 'q']], skill: 'vocab' },
      { t: 'fill', q: 'Spell «pan» with letter names: ___', a: ['pe, a, ene', 'pe a ene'], skill: 'writing' },
      { t: 'read', text: '—Hola, quería una habitación. —¿Su nombre? —Laura Ñúñez. —¿Cómo se escribe? —Ñúñez: eñe, u con tilde, eñe, e, zeta.', q: 'How is the surname spelled?', o: ['Nunez', 'Ñúñez', 'Ñuñes'], a: 1, skill: 'reading' },
      { t: 'speak', prompt: 'Say your name and spell it with Spanish letter names.', sample: 'Me llamo Kait. Se escribe: ka, a, i, te.', target: ['se escribe'], skill: 'speaking' }],
    homework: { id: 'hw0', title: 'Homework 0 — El alfabeto', parts: [
      { h: 'A. Write the letter names', items: [['h', 'hache'], ['j', 'jota'], ['ñ', 'eñe'], ['v', 'uve'], ['z', 'zeta']] },
      { h: 'B. Spell these words with letter names', items: [['casa', 'ce, a, ese, a'], ['queso', 'cu, u, e, ese, o'], ['Valencia', 'uve (mayúscula), a, ele, e, ene, ce, i, a'], ['jamón', 'jota, a, eme, o con tilde, ene']] },
      { h: 'C. Silent or not?', items: [['the h in «hola»', 'silent'], ['the u in «queso»', 'silent (qu = /k/)'], ['the r at the start of «rosa»', 'pronounced, rolled /r/']] },
      { h: 'D. Speaking (optional)', open: true, items: [['Spell your full name and your email address out loud.', 'Sample: Kait — ka, a, i, te. Email: kait arroba gmail punto com (arroba = @, punto = dot).']] }] } };
  const c3 = { id: 'c3', city: 'alicante', level: 'A1', num: 3, title: 'Los números', en: 'Numbers', goal: 'Say, write, pronounce and build any number — from cero to un billón — plus dates, ages, prices and phone numbers.', lessons: NUM_LESSONS,
    review: { keyVocab: ['uno_un_una', 'cien', 'ciento', 'mil', 'millon', 'billon', 'primero', 'docena', 'medio'],
      grammar: ['0–15 own words · 16–19 dieci- · 21–29 veinti- (one word).', '31–99: tens + y + unit (three words).', '100 = cien; 101–199 = ciento… (no «y»).', '500 quinientos, 700 setecientos, 900 novecientos.', '200–900 agree: doscientas casas.', 'mil (never un mil) · un millón / dos millones (+ de + noun).', '10⁹ = mil millones; un billón = 10¹² (long scale).', 'uno → un (masc.) / una (fem.): veintiún años, treinta y una casas.', 'Age: tener … años · Dates: el 15 de marzo de 2026.'],
      expressions: ['¿Cuánto es?', '¿Cuántos años tienes?', '¿Qué día es hoy?', '¿Cuál es tu número de teléfono?', 'una docena de…'],
      mistakes: ['un mil → mil', 'ciento y uno → ciento uno', 'un billón for 10⁹ → mil millones', 'treinta y uno casas → treinta y una casas', 'Soy 20 años → Tengo 20 años'] },
    exam: [
      { t: 'listen', say: 'treinta y dos', o: ['23', '32', '302'], a: 1, skill: 'listening' }, { t: 'listen', say: 'ciento once', o: ['111', '101', '110'], a: 0, skill: 'listening' }, { t: 'listen', say: 'diez mil', o: ['1.000', '10.000', '100.000'], a: 1, skill: 'listening' }, { t: 'listen', say: 'mil millones', o: ['1.000.000', '1.000.000.000', '1.000.000.000.000'], a: 1, skill: 'listening' },
      { t: 'fill', q: '31 = ___', a: nAns(31), skill: 'vocab' }, { t: 'fill', q: '112 = ___', a: nAns(112), skill: 'vocab' }, { t: 'fill', q: '100.000 = ___', a: nAns(100000), skill: 'vocab' }, { t: 'fill', q: '1.000.000 = ___', a: nAns(1000000), skill: 'vocab' },
      { t: 'mc', q: '100 personas =', o: ['ciento personas', 'cien personas', 'cientas personas'], a: 1, skill: 'grammar' }, { t: 'mc', q: '21 años =', o: ['veintiuno años', 'veintiún años', 'veintiuna años'], a: 1, skill: 'grammar' },
      { t: 'mc', q: 'Un billón =', o: ['10⁹', '10¹²', '10⁶'], a: 1, skill: 'grammar' }, { t: 'fix', q: 'Hay doscientos personas.', a: ['hay doscientas personas'], skill: 'grammar' },
      { t: 'count', start: 29, show: 2, skill: 'vocab' },
      { t: 'read', text: 'PISO EN ALICANTE. Tercer piso, 85 m², dos dormitorios, a 300 metros de la playa del Postiguet. Precio: 189.000 €. Llame al 612 45 78 90.', q: 'How much is the flat?', o: ['189 €', '18.900 €', '189.000 €'], a: 2, skill: 'reading' },
      { t: 'read', text: 'PISO EN ALICANTE. Tercer piso, 85 m², dos dormitorios, a 300 metros de la playa del Postiguet. Precio: 189.000 €. Llame al 612 45 78 90.', q: 'Which floor is it on?', o: ['1st', '3rd', '13th'], a: 1, skill: 'reading' },
      { t: 'tr', en: 'I am 31 years old and I live on the first floor.', a: ['tengo treinta y un años y vivo en el primer piso'], skill: 'writing' },
      { t: 'write', prompt: 'Write 4 sentences with numbers: your age, your birthday (date), a price you paid this week, and how many people live in your city.', sample: 'Tengo veintitrés años. Mi cumpleaños es el doce de mayo. Ayer pagué tres euros con cincuenta por un café. En Vancouver viven unas seiscientas setenta mil personas.', minWords: 20, skill: 'writing', rubric: ['Age with tener … años', 'Date: el + day + de + month', 'Price with euros (con…)', 'Big number written correctly (mil / millones)'] },
      { t: 'speak', prompt: 'Read these aloud: 31 · 101 · 1.250 · 1.000.000 · 1.000.000.000', sample: 'treinta y uno, ciento uno, mil doscientos cincuenta, un millón, mil millones', target: ['treinta y uno', 'ciento uno', 'mil doscientos cincuenta', 'un millón', 'mil millones'], skill: 'speaking' }],
    homework: { id: 'hw3', title: 'Homework 3 — Los números', parts: [
      { h: 'A. Write in words', items: [[31, 0], [32, 0], [100, 0], [101, 0], [111, 0], [112, 0], [1000, 0], [10000, 0], [100000, 0], [1000000, 0], [1000000000, 0]].map(([n]) => [MA.numFmt(n), MA.numES(n) + (n === 1e9 ? ' (English: one billion)' : '')]) },
      { h: 'B. uno, un or una?', items: [['___ café', 'un'], ['veinti___ personas', 'veintiuna'], ['treinta y ___ libros', 'treinta y un'], ['el número treinta y ___', 'treinta y uno (counting)']] },
      { h: 'C. cien or ciento?', items: [['___ euros (100)', 'cien'], ['___ cinco (105)', 'ciento'], ['___ mil (100.000)', 'cien'], ['___ cuarenta (140)', 'ciento']] },
      { h: 'D. Write in digits', items: [['quinientos cincuenta y cinco', '555'], ['mil doscientos cincuenta', '1.250'], ['dos millones', '2.000.000'], ['mil millones', '1.000.000.000']] },
      { h: 'E. Reading', text: 'En Alicante viven unas trescientas sesenta mil personas. El castillo de Santa Bárbara está a ciento sesenta y seis metros sobre el mar. Un café con leche cuesta un euro con ochenta.', items: [['How many people live in Alicante?', 'About 360.000 (trescientas sesenta mil — feminine because «personas»).'], ['How high is the castle above the sea?', '166 metres.'], ['How much is a café con leche?', '1,80 €.']] },
      { h: 'F. Writing', open: true, items: [['Write 5 sentences with numbers: your age, your phone number (invented), your birthday, a price and a big number about your country.', 'Sample: Tengo veinticuatro años. Mi número es el 612 34 56 78. Mi cumpleaños es el tres de abril. Un billete de autobús cuesta un euro con cincuenta. Canadá tiene más de cuarenta millones de habitantes.']], rubric: ['tener … años', 'uno/un/una correct', 'cien/ciento correct', 'millones + de + noun'] },
      { h: 'G. Listening/speaking (optional)', open: true, items: [['Use the Number Lab: choose 5 random numbers, say them aloud, then press 🔊 to compare.', 'Self-check with the construction steps shown under each number.']] }] } };

  MA.CHAPTERS.unshift(c0); MA.CHAPTERS.push(c3);
  [c0, c3].forEach(c => c.lessons.forEach((l, i) => { MA.LESSONS[l.id] = Object.assign(l, { chapter: c.id, idx: i }); }));
  // the old 0–20 lesson now points forward to the full system
  const c2l2 = MA.LESSONS.c2l2; if (c2l2) c2l2.intro += '<p class="note">➡ The complete number system (21 to billions, ordinals, dates, phone numbers) is in <a href="#lesson-c3l1">Chapter 3 · Los números</a>.</p>';
  // Alicante syllabus
  MA.CITY.alicante.topics = [['Spanish alphabet: all 27 letters', 'c0l1'], ['Pronunciation & IPA: Castilian sounds', 'c1l4'], ['Greetings & introductions', 'c1l1'], ['SER & subject pronouns (incl. vosotros)', 'c1l2'], ['Nationalities & gender agreement', 'c1l3'], ['Basic vocabulary: café, food & drinks', 'c2l1'], ['Articles & gender', 'c2l1'], ['Numbers 0–29', 'c3l1'], ['Numbers 30–99', 'c3l2'], ['Hundreds: cien vs ciento', 'c3l3'], ['Thousands, millions, billón', 'c3l4'], ['Ordinals, dates, ages, prices, phones', 'c3l5'], ['Present tense of regular -ar verbs', 'c2l3'], ['Everyday survival Spanish', 'c2l3'], ['Simple sentence structure & questions', null], ['Present tense: -er / -ir verbs and key irregulars', null]];

  /* ---------- mentor lines for the new chapters ---------- */
  const mm = (es, en) => ({ m: es, en }); const E = MA.MENTORS && MA.MENTORS.alicante;
  if (E) {
    E.chapters.c0 = [mm('Antes de hablar, vamos a conocer las letras.', 'Before speaking, let’s get to know the letters.'), mm('En español hay veintisiete letras. La más famosa es la eñe: «España».', 'Spanish has twenty-seven letters. The most famous is ñ: “España”.'), mm('Cuando no entiendas un nombre, pregunta: «¿Cómo se escribe?».', 'When you don’t understand a name, ask: “How is it spelled?”')];
    E.chapters.c3 = [mm('¡Hoy toca matemáticas! Bueno… números en español.', 'Today is maths day! Well… numbers in Spanish.'), mm('No vas a memorizar listas. Vas a aprender patrones para construir cualquier número.', 'You will not memorise lists. You will learn patterns to build any number.'), mm('Al final sabrás decir «mil millones»… y sabrás por qué no es «un billón».', 'At the end you will be able to say “mil millones”… and know why it is not “un billón”.')];
    Object.assign(E.tips, {
      c0l1: [mm('La hache no suena: «hola».', 'The h is silent: “hola”.'), mm('La be y la uve suenan igual. Por eso decimos «be» y «uve» al deletrear.', 'B and v sound the same. That is why we say “be” and “uve” when spelling.')],
      c3l1: [mm('Del dieciséis al veintinueve, ¡todo junto en una palabra!', 'From sixteen to twenty-nine, everything together in one word!'), mm('Uno, un, una: un café, una tostada.', 'Uno, un, una: un café, una tostada.')],
      c3l2: [mm('Desde el treinta y uno: decena, «y», unidad. Treinta y uno.', 'From thirty-one: tens, “y”, unit. Treinta y uno.'), mm('Escucha bien: sesenta… setenta.', 'Listen carefully: sesenta (60)… setenta (70).')],
      c3l3: [mm('Cien, solo. Ciento, con algo más: ciento uno.', 'Cien, alone. Ciento, with something more: ciento uno.'), mm('Después de las centenas, nada de «y»: ciento doce.', 'After the hundreds, no “y”: ciento doce.')],
      c3l4: [mm('Mil, nunca «un mil».', 'Mil, never “un mil”.'), mm('Mil millones es un billion en inglés. Un billón es mucho más: ¡un millón de millones!', 'Mil millones is an English billion. Un billón is much more: a million millions!')],
      c3l5: [mm('Para la edad usamos «tener»: tengo veinte años.', 'For age we use “tener”: tengo veinte años.'), mm('Las fechas: el quince de marzo.', 'Dates: el quince de marzo.')]
    });
  }

  /* ---------- mount the Number Lab inside number lessons + standalone page ---------- */
  const lesson1 = V.lesson;
  V.lesson = function (id) {
    let html = lesson1(id); const l = MA.LESSONS[id];
    if (l && l.lab != null) {
      html = html.replace('<div class="panel"><h3>2 · Words', `<div class="panel"><h3>Number Lab <span class="tiny muted">type any number — see words, IPA, English and how it is built</span></h3><div class="numlab"></div><p class="tiny muted"><a href="#numlab">Open the Number Lab on its own page</a></p></div><div class="panel"><h3>2 · Words`);
      if (!html.includes('class="numlab"')) html = html.replace('<div class="panel"><h3>', `<div class="panel"><h3>Number Lab</h3><div class="numlab"></div></div><div class="panel"><h3>`);
      H.after(view => { const el = view.querySelector('.numlab'); el && H.numLab(el, l.lab); });
    }
    return html;
  };
  V.numlab = function () { H.after(view => H.numLab(view.querySelector('.numlab'), 31)); return `<div class="panel"><p class="eyebrow">Alicante · Los números</p><h1>Number Lab</h1><p class="muted">Type any whole number. You get European Spanish words, Castilian IPA, audio, English, and every rule used to build it.</p><div class="numlab"></div></div><div class="panel"><h3>Lessons</h3><div class="acts">${NUM_LESSONS.map(l => `<a class="panel act" href="#lesson-${l.id}"><span><b class="es">${esc(l.title)}</b><small>${esc(l.en)}</small></span><span>→</span></a>`).join('')}</div></div>`; };
  const tr0 = H.trail; H.trail = function (name = H.current.name, arg = H.current.arg) { return name === 'numlab' ? [['Home', '#home'], ['Beginner', '#stage-beginner'], ['Alicante', '#city-alicante'], ['Grammar', '#city-alicante-grammar'], ['Number Lab', '#numlab']] : tr0(name, arg); };
  const cv0 = H.cityVocab; H.cityVocab = function (c, sub, head) { let h = cv0(c, sub, head); if (c.id === 'alicante') h = h.replace('<h4>Practice games</h4>', '<h4>Practice games</h4><p><a class="btn small" href="#numlab">🔢 Number Lab — build any number</a></p>'); return h; };
  const cg0 = H.cityGrammar; H.cityGrammar = function (c, sub, head) { let h = cg0(c, sub, head); if (c.id === 'alicante') h = h.replace('<div class="panel"><h3>Grammar drills</h3><div class="row gap wrap">', '<div class="panel"><h3>Grammar drills</h3><div class="row gap wrap"><a class="btn" href="#numlab">🔢 Number Lab</a>'); return h; };
})();
