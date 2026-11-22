/* MADRID ACADEMY — Vocabulary banks: compact topic lists → full vocabulary entries.
   Line format:  [pos:] spanish | english | example | example English | note
   pos prefixes: n: v: adj: adv: exp: prep: conj: int: (optional — inferred when missing) */
(function () {
  const { U } = MA;
  // multi-word IPA: apply the rule-based syllabifier per word, unstressed function words
  const CLITIC = new Set(['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'a', 'al', 'en', 'y', 'e', 'o', 'u', 'que', 'se', 'me', 'te', 'nos', 'os', 'lo', 'le', 'les', 'por', 'con', 'sin', 'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'para']);
  const ipa1 = U.autoIPA;
  if (!ipa1.multi) {
    U.autoIPA = function (txt) {
      const parts = String(txt || '').toLowerCase().replace(/\/[a-záéíóú]+\b/g, '').split(/[\s\-–—]+/).map(p => p.replace(/[^a-záéíóúüñ]/g, '')).filter(Boolean);
      if (parts.length <= 1) return ipa1(parts[0] || '');
      return parts.map(p => CLITIC.has(p) ? ipa1(p).replace(/ˈ/g, '') : ipa1(p)).join(' ');
    };
    U.autoIPA.multi = true;
  }
  const deacc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const key = es => deacc(String(es).toLowerCase()).replace(/^(el|la|los|las|un|una)\s+/, '').replace(/\/[a-z]+$/, '').replace(/[¿?¡!.,]/g, '').replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const POS = { n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb', exp: 'expression', prep: 'preposition', conj: 'connector', int: 'interjection', num: 'number', pron: 'pronoun' };
  const infer = es => {
    if (/^(el|la|los|las)\s/i.test(es)) return 'noun';
    if (/^[a-záéíóúñ]+(ar|er|ir|ír)(se)?$/i.test(es)) return 'verb';
    if (/^[a-záéíóúñ]+o\/a$/i.test(es) || /^[a-záéíóúñ]+(or\/a|ón\/ona)$/i.test(es)) return 'adjective';
    if (/[¿?¡!]/.test(es) || /\s/.test(es)) return 'expression';
    return 'word';
  };
  const gender = es => { if (/^el\/la\s|^el \S+ \/ la /i.test(es)) return 'm/f (el/la)'; const m = /^(el|la|los|las)\s/i.exec(es); if (!m) return null; const a = m[1].toLowerCase(); return a === 'el' ? 'm (el)' : a === 'la' ? 'f (la)' : a === 'los' ? 'm pl (los)' : 'f pl (las)'; };
  const seen = new Map(); // normalized → id (all cities)
  MA.VOCAB.forEach(v => seen.set(key(v.es), v.id));
  MA.VBANK = MA.VBANK || {};      // city → [{cat, name, n}]
  MA.VCAT = MA.VCAT || {};        // cat → display name
  MA.vbank = function (city, groups) {
    MA.VOCAB.forEach(v => { const k = key(v.es); if (!seen.has(k)) seen.set(k, v.id); }); // include words added by city files since the last call
    groups.forEach(([cat, name, lines]) => {
      MA.VCAT[cat] = MA.VCAT[cat] || name;
      let added = 0;
      lines.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//')).forEach(l => {
        let pos = null; const pm = /^([a-z]+):\s*/.exec(l); if (pm && POS[pm[1]]) { pos = POS[pm[1]]; l = l.slice(pm[0].length); }
        const [es, en, ex, exEn, note] = l.split('|').map(s => (s || '').trim());
        if (!es || !en) return;
        const k = key(es);
        if (seen.has(k)) return; // already taught elsewhere — keep the earlier entry and its saved progress
        let id = 'b_' + city.slice(0, 3) + '_' + k.replace(/[^a-z0-9ñ]+/g, '_').replace(/^_|_$/g, '').slice(0, 40);
        while (MA.VOCAB.some(v => v.id === id)) id += '_';
        const entry = { id, city, cat, es, en, pos: pos || infer(es), coll: [], rel: [], bank: true };
        const g = gender(es); if (g) entry.gender = g;
        if (ex) { entry.ex = ex; entry.exEn = exEn || ''; }
        if (note) entry.note = note;
        MA.VOCAB.push(entry); seen.set(k, id); added++;
      });
      (MA.VBANK[city] = MA.VBANK[city] || []).push({ cat, name, n: added });
    });
  };
})();
