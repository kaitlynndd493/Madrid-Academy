/* =====================================================================
   READING DICTIONARY ENGINE (MA.RX)
   - A hand-written lexicon (lemma | part of speech | English) in rlex-*.js
   - Generates every inflected form: noun plurals, adjective agreement and
     full verb conjugations (regular, stem-changing, spelling-change and
     irregular verbs), so a form like «vivía» is traced back to «vivir».
   - Handles pronouns attached to verbs (dámelo, levantarse, diciéndole).
   - Multi-word expressions are matched by lemma (se dio cuenta → darse cuenta).
   - Nothing is guessed: a word that cannot be analysed is reported as unknown.
   ===================================================================== */
(function () {
  const MA = window.MA = window.MA || {};
  const RX = MA.RX = { L: new Map(), F: null, PH: [], dirty: true };
  const ACC = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' }, UNACC = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };
  const deacc = s => s.replace(/[áéíóú]/g, c => UNACC[c]);
  const isV = c => /[aeiouáéíóúü]/.test(c);
  RX.deacc = deacc;

  /* ---------- lexicon loading ----------
     line: lemma|pos|english|extra
     pos: nm nf nmf n(pl) adj adv v (v:ie v:ue v:i v:ie-i v:ue-u v:zc v:y v:=base v:irr) prep conj pron det art int num pn exp
     extra: notes · pl=plural · inv (adjective with one form) · f=feminine form */
  RX.add = function (text, src) {
    text.split('\n').forEach(line => {
      line = line.trim(); if (!line || line.startsWith('#')) return;
      const [lemma, pos, en, ...more] = line.split('|').map(x => x.trim()); const extra = more.join(';');
      if (!lemma || !pos) return;
      const e = { lemma: lemma.toLowerCase(), pos, en: en || '', extra, src: src || 'lex' };
      extra.split(';').forEach(p => { const m = /^\s*(pl|f|note|g)=(.*)$/.exec(p); if (m) e[m[1]] = m[2].trim(); else if (p.trim() === 'inv') e.inv = true; else if (p.trim()) e.note = (e.note ? e.note + '; ' : '') + p.trim(); });
      if (!RX.L.has(e.lemma)) RX.L.set(e.lemma, []);
      const L = RX.L.get(e.lemma); if (L.some(x => x.pos.split(':')[0] === e.pos.split(':')[0])) return; // first entry wins
      L.push(e);
    });
    RX.dirty = true;
  };
  /* phrases: words|english|note — words may use a lemma (tener que) or SE for me/te/se/nos/os */
  RX.addPhrases = function (text) {
    text.split('\n').forEach(line => { line = line.trim(); if (!line || line.startsWith('#')) return; const [w, en, note, label] = line.split('|').map(x => (x || '').trim()); RX.PH.push({ w: w.split(/\s+/).map(x => x === 'SE' ? x : x.toLowerCase()), en, note: note || '', key: label || w.replace(/SE /, '').toLowerCase() }); });
    RX.phIndex = null;
  };

  /* ---------- nouns and adjectives ---------- */
  function stressedPenultAccent(w) { // joven → jóven(es): accent the vowel of the penultimate syllable
    const groups = []; const re = /[aeiouü]+/g; let m; while ((m = re.exec(w))) groups.push([m.index, m[0]]);
    if (groups.length < 2) return w;
    const [i, g] = groups[groups.length - 2]; // strong vowel inside the group
    let k = g.search(/[aeo]/); if (k < 0) k = g.length - 1;
    const p = i + k; return w.slice(0, p) + (ACC[w[p]] || w[p]) + w.slice(p + 1);
  }
  RX.plural = function (w) {
    if (/[aeiouáéó]$/.test(w)) return w + 's';
    if (/[íú]$/.test(w)) return w + 's';
    if (/[sx]$/.test(w)) { return /[áéíóú]/.test(w.slice(-3)) || (w.match(/[aeiouáéíóú]+/g) || []).length === 1 ? deacc(w) + 'es' : w; } // autobús→autobuses, mes→meses; lunes→lunes
    if (/z$/.test(w)) return w.slice(0, -1) + 'ces';
    if (/[áéíóú][nls]$/.test(w) || /[áéíóú][rd]$/.test(w)) return deacc(w) + 'es';
    if (/n$/.test(w) && !/[áéíóú]/.test(w)) return stressedPenultAccent(w) + 'es';
    return w + 'es';
  };
  const NO_FEM = new Set(['mejor', 'peor', 'mayor', 'menor', 'superior', 'inferior', 'interior', 'exterior', 'anterior', 'posterior', 'cortés', 'común', 'joven']);
  RX.adjForms = function (w, e) {
    const out = [[w, e.g === 'f' ? 'feminine singular' : 'masculine singular']];
    if (e.inv) return [[w, 'adjective (same form for masculine and feminine)'], [RX.plural(w), 'plural']];
    if (/o$/.test(w)) { const s = w.slice(0, -1); out.push([s + 'a', 'feminine singular'], [s + 'os', 'masculine plural'], [s + 'as', 'feminine plural']); return out; }
    if (e.f) { out.push([e.f, 'feminine singular'], [RX.plural(w), 'masculine plural'], [RX.plural(e.f), 'feminine plural']); return out; }
    if (/^(español|mallorquín)$/.test(w)) { const f = deacc(w) + 'a'; out.push([f, 'feminine singular'], [RX.plural(w), 'masculine plural'], [f + 's', 'feminine plural']); return out; }
    if (!NO_FEM.has(w) && (/or$/.test(w) || /[áéíóú]n$/.test(w) || /és$/.test(w) || /^(holgazán|haragán|pequeñín)$/.test(w))) { const f = deacc(w) + 'a'; out.push([f, 'feminine singular'], [RX.plural(w), 'masculine plural'], [f + 's', 'feminine plural']); return out; }
    return [[w, 'singular (masculine and feminine)'], [RX.plural(w), 'plural (masculine and feminine)']];
  };

  /* ---------- verbs ---------- */
  const PERS = ['yo', 'tú', 'él / ella / usted', 'nosotros / nosotras', 'vosotros / vosotras', 'ellos / ellas / ustedes'];
  RX.PERS = PERS;
  const TN = { pres: 'present', pret: 'preterite (simple past)', impf: 'imperfect (past: was / used to)', fut: 'future', cond: 'conditional', subj: 'present subjunctive', isubj: 'imperfect subjunctive', imp: 'imperative (command)', ger: 'gerund (-ing form)', pp: 'past participle', inf: 'infinitive' };
  RX.TN = TN;
  const END = {
    ar: { pres: ['o', 'as', 'a', 'amos', 'áis', 'an'], pret: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'], impf: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'], subj: ['e', 'es', 'e', 'emos', 'éis', 'en'] },
    er: { pres: ['o', 'es', 'e', 'emos', 'éis', 'en'], pret: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], impf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], subj: ['a', 'as', 'a', 'amos', 'áis', 'an'] },
    ir: { pres: ['o', 'es', 'e', 'imos', 'ís', 'en'], pret: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'], impf: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'], subj: ['a', 'as', 'a', 'amos', 'áis', 'an'] }
  };
  const FUT = ['é', 'ás', 'á', 'emos', 'éis', 'án'], COND = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
  const STRONG = ['e', 'iste', 'o', 'imos', 'isteis', 'ieron'];
  // irregular verbs: only what differs from the regular pattern
  const IRR = {
    ser: { pres: 'soy eres es somos sois son', pret: 'fui fuiste fue fuimos fuisteis fueron', impf: 'era eras era éramos erais eran', subj: 'sea seas sea seamos seáis sean', imp: 'sé', ger: 'siendo', pp: 'sido' },
    ir: { pres: 'voy vas va vamos vais van', pret: 'fui fuiste fue fuimos fuisteis fueron', impf: 'iba ibas iba íbamos ibais iban', subj: 'vaya vayas vaya vayamos vayáis vayan', imp: 've', ger: 'yendo', impv: 'id' },
    estar: { pres: 'estoy estás está estamos estáis están', strong: 'estuv', subj: 'esté estés esté estemos estéis estén', imp: 'está' },
    haber: { pres: 'he has ha hemos habéis han', strong: 'hub', fut: 'habr', subj: 'haya hayas haya hayamos hayáis hayan', imp: 'he' },
    tener: { yo: 'tengo', stem: 'ie', strong: 'tuv', fut: 'tendr', imp: 'ten' },
    hacer: { yo: 'hago', pret: 'hice hiciste hizo hicimos hicisteis hicieron', fut: 'har', imp: 'haz', pp: 'hecho' },
    decir: { yo: 'digo', stem: 'i', pret: 'dije dijiste dijo dijimos dijisteis dijeron', fut: 'dir', imp: 'di', pp: 'dicho', ger: 'diciendo' },
    poder: { stem: 'ue', strong: 'pud', fut: 'podr', ger: 'pudiendo' },
    poner: { yo: 'pongo', strong: 'pus', fut: 'pondr', imp: 'pon', pp: 'puesto' },
    querer: { stem: 'ie', strong: 'quis', fut: 'querr' },
    saber: { pres: 'sé sabes sabe sabemos sabéis saben', strong: 'sup', fut: 'sabr', subj: 'sepa sepas sepa sepamos sepáis sepan' },
    venir: { yo: 'vengo', stem: 'ie', pret: 'vine viniste vino vinimos vinisteis vinieron', fut: 'vendr', imp: 'ven', ger: 'viniendo' },
    ver: { pres: 'veo ves ve vemos veis ven', pret: 'vi viste vio vimos visteis vieron', impf: 'veía veías veía veíamos veíais veían', subj: 'vea veas vea veamos veáis vean', pp: 'visto' },
    dar: { pres: 'doy das da damos dais dan', pret: 'di diste dio dimos disteis dieron', subj: 'dé des dé demos deis den' },
    salir: { yo: 'salgo', fut: 'saldr', imp: 'sal' },
    traer: { yo: 'traigo', pret: 'traje trajiste trajo trajimos trajisteis trajeron' },
    caer: { yo: 'caigo' },
    oír: { pres: 'oigo oyes oye oímos oís oyen', subj: 'oiga oigas oiga oigamos oigáis oigan', imp: 'oye' },
    andar: { strong: 'anduv' },
    caber: { yo: 'quepo', strong: 'cup', fut: 'cabr', subj: 'quepa quepas quepa quepamos quepáis quepan' },
    valer: { yo: 'valgo', fut: 'valdr' },
    reír: { pres: 'río ríes ríe reímos reís ríen', pret: 'reí reíste rio reímos reísteis rieron', subj: 'ría rías ría riamos riais rían', ger: 'riendo', pp: 'reído', imp: 'ríe' },
    oler: { pres: 'huelo hueles huele olemos oléis huelen', subj: 'huela huelas huela olamos oláis huelan', imp: 'huele' },
    morir: { stem: 'ue-u', pp: 'muerto' },
    volver: { stem: 'ue', pp: 'vuelto' },
    abrir: { pp: 'abierto' }, cubrir: { pp: 'cubierto' }, escribir: { pp: 'escrito' }, romper: { pp: 'roto' }, freír: { pres: 'frío fríes fríe freímos freís fríen', pret: 'freí freíste frio freímos freísteis frieron', subj: 'fría frías fría friamos friais frían', ger: 'friendo', pp: 'frito', imp: 'fríe' }, imprimir: { pp: 'impreso' }, disolver: { stem: 'ue', pp: 'disuelto' }, yacer: { yo: 'yazco' }, resolver: { stem: 'ue', pp: 'resuelto' },
    conducir: { stem: 'zc', strongJ: 'conduj' }, traducir: { stem: 'zc', strongJ: 'traduj' }, producir: { stem: 'zc', strongJ: 'produj' }, reducir: { stem: 'zc', strongJ: 'reduj' }, introducir: { stem: 'zc', strongJ: 'introduj' },
    jugar: { pres: 'juego juegas juega jugamos jugáis juegan', subj: 'juegue juegues juegue juguemos juguéis jueguen', imp: 'juega' },
    errar: { pres: 'yerro yerras yerra erramos erráis yerran' },
    satisfacer: { yo: 'satisfago', pret: 'satisfice satisficiste satisfizo satisficimos satisficisteis satisficieron', fut: 'satisfar', pp: 'satisfecho' }
  };
  RX.IRR = IRR;
  const sp = s => s.split(' ');
  const stemVowelChange = (stem, to) => { // change the last stem vowel e / o / u
    for (let i = stem.length - 1; i >= 0; i--) {
      const c = stem[i];
      if (to === 'ie' && c === 'e') return stem.slice(0, i) + (i === 0 ? 'ye' : 'ie') + stem.slice(i + 1);
      if (to === 'ue' && (c === 'o' || c === 'u')) return stem.slice(0, i) + (i === 0 && c === 'o' ? 'hue' : (stem[i - 1] === 'g' ? 'üe' : 'ue')) + stem.slice(i + 1);
      if ((to === 'i') && c === 'e') return stem.slice(0, i) + 'i' + stem.slice(i + 1);
      if (to === 'u' && c === 'o') return stem.slice(0, i) + 'u' + stem.slice(i + 1);
      if (isV(c) && to !== 'i' && to !== 'u') { /* keep looking only through consonants */ }
    }
    return stem;
  };
  function accentLastVowel(s) { for (let i = s.length - 1; i >= 0; i--) if ('aeiou'.includes(s[i])) { if ('iu'.includes(s[i]) && 'aeo'.includes(s[i - 1] || '')) i--; return s.slice(0, i) + ACC[s[i]] + s.slice(i + 1); } return s; }
  // build forms: returns list of [form, tense, personIndex|null]
  RX.conj = function (inf, cls = '') {
    inf = inf.toLowerCase();
    let pre = '', base = inf;
    if (cls.startsWith('=')) { base = cls.slice(1); pre = inf.slice(0, inf.length - base.length); cls = ''; }
    let ir = IRR[base] || {};
    if (!IRR[base] && /ducir$/.test(base)) ir = { stem: 'zc', strongJ: base.slice(0, -3) + 'j' }; // deducir → dedujo
    const type = /ír$/.test(base) ? 'ir' : base.slice(-2);
    const E = END[type]; if (!E) return [];
    let stem = deacc(base.slice(0, -2));
    let sc = ir.stem || cls; // ie, ue, i, ie-i, ue-u, zc, y
    if (!sc && !IRR[base] && /[aeiou]cer$|ucir$/.test(base) && !/^(hacer|cocer|mecer)$/.test(base)) sc = 'zc'; // parecer, conocer, conducir
    const [ch1, ch2] = sc.split('-');
    const out = [];
    const add = (f, t, p) => out.push([f, t, p]);
    const vowelStem = type !== 'ar' && /[aeo]$/.test(stem); // leer, caer, oír
    const uStem = type === 'ir' && /u$/.test(stem) && !/[gq]u$/.test(stem); // construir, huir
    // orthography before e (ar verbs): c→qu, g→gu, z→c, gu→gü
    const ortE = s => type !== 'ar' ? s : s.replace(/c$/, 'qu').replace(/gu$/, 'gü').replace(/g$/, 'gu').replace(/z$/, 'c');
    // orthography before a/o (er/ir verbs): c→z (after consonant or vencer), g→j, gu→g, qu→c
    const ortAO = s => type === 'ar' ? s : /gu$/.test(s) ? s.slice(0, -1) : /qu$/.test(s) ? s.slice(0, -2) + 'c' : /g$/.test(s) ? s.slice(0, -1) + 'j' : s.replace(/([^aeiou])c$/, '$1z');
    const strongStem = p => { // stem for stressed present persons (0,1,2,5)
      if (ch1 === 'ie' || ch1 === 'ue' || ch1 === 'i') return stemVowelChange(stem, ch1);
      return stem;
    };
    // PRESENT
    let pres;
    if (ir.pres) pres = sp(ir.pres);
    else {
      pres = E.pres.map((e, p) => { const st = [0, 1, 2, 5].includes(p) ? strongStem(p) : stem; return st + e; });
      if (ch1 === 'zc') pres[0] = stem.replace(/c$/, 'zc') + 'o';
      if (ch1 === 'y' || uStem) pres = pres.map((f, p) => p === 3 || p === 4 ? f : stem + 'y' + E.pres[p]);
      if (!ch1 || ch1 === 'ie' || ch1 === 'ue' || ch1 === 'i') pres[0] = ortAO(pres[0].slice(0, -1)) + 'o';
      if (ir.yo) pres[0] = ir.yo;
      if (sc === 'ú' || sc === 'í') { const v = sc === 'ú' ? 'u' : 'i'; const as = stem.replace(new RegExp(v + '([^' + v + ']*)$'), sc + '$1'); pres = pres.map((f, p) => [0, 1, 2, 5].includes(p) ? as + E.pres[p] : f); }
    }
    pres.forEach((f, p) => add(f, 'pres', p));
    // SUBJUNCTIVE
    let subj;
    if (ir.subj) subj = sp(ir.subj);
    else {
      const yo = pres[0];
      let s0 = /o$/.test(yo) && !ir.pres ? yo.slice(0, -1) : (ir.pres ? sp(ir.pres)[0].replace(/o$/, '') : stem);
      if (base === 'ir') s0 = 'vay';
      const nosStem = (ch2 === 'i' || ch1 === 'i') && type === 'ir' ? stemVowelChange(stem, 'i') : ch2 === 'u' ? stemVowelChange(stem, 'u') : stem;
      subj = E.subj.map((e, p) => {
        let st = [3, 4].includes(p) ? (ir.yo || ch1 === 'zc' || ch1 === 'y' || uStem ? s0 : nosStem) : s0;
        if (type === 'ar') st = ortE(st);
        if ([3, 4].includes(p) && !ir.yo && ch1 !== 'zc' && ch1 !== 'y' && !uStem && type !== 'ar') st = ortAO(st);
        if ((sc === 'ú' || sc === 'í') && [3, 4].includes(p)) st = deacc(st);
        return st + e;
      });
    }
    subj.forEach((f, p) => add(f, 'subj', p));
    // PRETERITE
    let pret;
    if (ir.pret) pret = sp(ir.pret);
    else if (ir.strong) pret = STRONG.map(e => ir.strong + e);
    else if (ir.strongJ) pret = STRONG.map(e => ir.strongJ + (e === 'ieron' ? 'eron' : e));
    else {
      pret = E.pret.map(e => stem + e);
      if (type === 'ar') pret[0] = ortE(stem) + 'é';
      if (type !== 'ar' && (ch2 === 'i' || ch1 === 'i' || ch2 === 'u')) { const s3 = stemVowelChange(stem, ch2 || 'i'); pret[2] = s3 + 'ió'; pret[5] = s3 + 'ieron'; }
      if (vowelStem) pret = [stem + 'í', stem + 'íste', stem + 'yó', stem + 'ímos', stem + 'ísteis', stem + 'yeron'];
      if (uStem || ch1 === 'y') { pret[2] = stem + 'yó'; pret[5] = stem + 'yeron'; }
    }
    if (type !== 'ar' && /(ñ|ll)$/.test(stem) && !ir.pret && !ir.strong) { pret[2] = stem + 'ó'; pret[5] = stem + 'eron'; }
    pret.forEach((f, p) => add(f, 'pret', p));
    // IMPERFECT
    const impf = ir.impf ? sp(ir.impf) : E.impf.map(e => stem + e);
    impf.forEach((f, p) => add(f, 'impf', p));
    // FUTURE / CONDITIONAL
    const fs = ir.fut || deacc(base);
    FUT.forEach((e, p) => add(fs + e, 'fut', p)); COND.forEach((e, p) => add(fs + e, 'cond', p));
    // IMPERFECT SUBJUNCTIVE (from preterite 3rd plural)
    const p3 = pret[5]; const is = p3.slice(0, -3);
    ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'].forEach((e, p) => add((p === 3 ? accentLastVowel(is) : is) + e, 'isubj', p));
    ['se', 'ses', 'se', 'semos', 'seis', 'sen'].forEach((e, p) => add((p === 3 ? accentLastVowel(is) : is) + e, 'isubj', p));
    // IMPERATIVE (tú, vosotros)
    add(ir.imp || pres[2], 'imp', 1);
    add(ir.impv || base.slice(0, -1) + 'd', 'imp', 4);
    // GERUND / PARTICIPLE / INFINITIVE
    let ger = ir.ger;
    if (!ger) { if (type === 'ar') ger = stem + 'ando'; else if (vowelStem || uStem || ch1 === 'y') ger = stem + 'yendo'; else { const gs = (ch2 === 'i' || ch1 === 'i') && type === 'ir' ? stemVowelChange(stem, 'i') : ch2 === 'u' ? stemVowelChange(stem, 'u') : stem; ger = gs + 'iendo'; } }
    if (type !== 'ar' && /(ñ|ll)$/.test(stem) && !ir.ger) { ger = stem + 'endo'; }
    add(ger, 'ger', null);
    const pp = ir.pp || (type === 'ar' ? stem + 'ado' : vowelStem ? stem + 'ído' : stem + 'ido');
    add(pp, 'pp', null);
    if (/o$/.test(pp) && !/^(ser|estar|haber|poder|soler)$/.test(base)) { const s = pp.slice(0, -1); add(s + 'a', 'pp', 'f'); add(s + 'os', 'pp', 'mpl'); add(s + 'as', 'pp', 'fpl'); }
    add(base, 'inf', null);
    if (!pre) return out;
    // compound verbs (mantener ← tener): prefix + base form; monosyllabic imperatives gain an accent (mantén)
    const mono = f => (f.match(/[aeiouáéíóúü]+/g) || []).length === 1;
    return out.map(([f, t, p]) => { let g = pre + f; if (mono(f) && !/[áéíóú]/.test(f) && /[aeiouns]$/.test(f) && t !== 'inf') g = pre + accentLastVowel(f); else if (mono(f) && /^(dé|sé)$/.test(f)) g = pre + deacc(f); return [g, t, p]; });
  };

  /* ---------- English verb forms (for "here it means…") ---------- */
  const EIRR = {}; ('be was been|have had had|do did done|go went gone|say said said|get got got|make made made|know knew known|think thought thought|take took taken|see saw seen|come came come|give gave given|find found found|tell told told|become became become|leave left left|feel felt felt|bring brought brought|begin began begun|keep kept kept|hold held held|write wrote written|stand stood stood|hear heard heard|let let let|mean meant meant|set set set|meet met met|run ran run|pay paid paid|sit sat sat|speak spoke spoken|lie lay lain|lead led led|read read read|grow grew grown|lose lost lost|fall fell fallen|send sent sent|build built built|understand understood understood|draw drew drawn|break broke broken|spend spent spent|cut cut cut|rise rose risen|drive drove driven|buy bought bought|wear wore worn|choose chose chosen|seek sought sought|throw threw thrown|catch caught caught|deal dealt dealt|win won won|forget forgot forgotten|lay laid laid|sell sold sold|fight fought fought|eat ate eaten|sing sang sung|swim swam swum|fly flew flown|sleep slept slept|teach taught taught|wake woke woken|hide hid hidden|ride rode ridden|shake shook shaken|steal stole stolen|tear tore torn|bite bit bitten|blow blew blown|feed fed fed|freeze froze frozen|hang hung hung|hit hit hit|hurt hurt hurt|light lit lit|put put put|shoot shot shot|shut shut shut|shine shone shone|sink sank sunk|spin spun spun|spread spread spread|stick stuck stuck|strike struck struck|swear swore sworn|swing swung swung|bear bore borne|beat beat beaten|bleed bled bled|dig dug dug|forgive forgave forgiven|lend lent lent|weep wept wept|overcome overcame overcome|undo undid undone|upset upset upset|sweep swept swept|kneel knelt knelt|bend bent bent|ring rang rung|drink drank drunk|sting stung stung|split split split|cost cost cost|shed shed shed|slide slid slid|wind wound wound|fit fitted fitted|quit quit quit|burn burnt burnt|dream dreamt dreamt|learn learnt learnt|smell smelt smelt|spell spelt spelt|spill spilt spilt|bet bet bet|forbid forbade forbidden|arise arose arisen|awake awoke awoken|withdraw withdrew withdrawn|undergo underwent undergone|foresee foresaw foreseen|mislead misled misled|misunderstand misunderstood misunderstood|upbring brought brought|can could could|stride strode stridden|creep crept crept|leap leapt leapt|sew sewed sewn|show showed shown|prove proved proven|grind ground ground|spit spat spat|stink stank stunk|tread trod trodden|weave wove woven|wring wrung wrung|flee fled fled|cling clung clung|lean leant leant|strive strove striven|feel felt felt')
    .split('|').forEach(x => { const [b, p, pp] = x.split(' '); EIRR[b] = [p, pp]; });
  const DOUBLE = new Set('sum fulfil enrol instil distil appal stop plan drop shop chat hug beg nod grab rob rub skip slip step trip travel admit prefer refer occur permit regret commit control knit pat pin plot ship sob spot tap wrap ban jog chop clap drag hop mop pop stir tip trap whip cancel label model quarrel signal equip omit submit transmit compel expel propel rebel patrol hum jam nag pad pet ram rip sip slam snap stab tan wag zip dim fan fit get hit put run set sit swim win begin forget cut dig let'.split(' '));
  const enPast = b => EIRR[b] ? EIRR[b][0] : /e$/.test(b) ? b + 'd' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ied' : DOUBLE.has(b) ? b + b.slice(-1) + 'ed' : b + 'ed';
  const enPP = b => EIRR[b] ? EIRR[b][1] : enPast(b);
  const enIng = b => b === 'be' ? 'being' : /ie$/.test(b) ? b.slice(0, -2) + 'ying' : /[^e]e$/.test(b) && !/(ee|ye|oe)$/.test(b) ? b.slice(0, -1) + 'ing' : DOUBLE.has(b) ? b + b.slice(-1) + 'ing' : b + 'ing';
  const en3 = b => b === 'be' ? 'is' : b === 'have' ? 'has' : b === 'can' ? 'can' : /(s|x|z|ch|sh|o)$/.test(b) ? b + 'es' : /[^aeiou]y$/.test(b) ? b.slice(0, -1) + 'ies' : b + 's';
  function inflectChunk(ch, t, p) {
    const m = /^to ([a-z]+)(.*)$/i.exec(ch.trim()); if (!m) return ch.trim();
    const b = m[1].toLowerCase(), rest = m[2];
    const one = (p === 0 || p === 2) && !(Array.isArray(p));
    let v;
    switch (t) {
      case 'inf': v = 'to ' + b; break;
      case 'pres': v = b === 'be' ? (p === 0 ? 'am' : p === 2 ? 'is' : 'are') : p === 2 ? en3(b) : b; break;
      case 'pret': v = b === 'be' ? (one ? 'was' : 'were') : enPast(b); break;
      case 'impf': return (b === 'be' ? (one ? 'was' : 'were') : enPast(b)) + rest + ' / used to ' + b + rest;
      case 'fut': v = 'will ' + b; break;
      case 'cond': v = 'would ' + b; break;
      case 'subj': v = b; return v + rest + ' (subjunctive)';
      case 'isubj': v = b === 'be' ? 'were' : enPast(b); return v + rest + ' (subjunctive)';
      case 'imp': v = b; return v + rest + '!';
      case 'ger': v = enIng(b); break;
      case 'pp': v = enPP(b); break;
      default: v = 'to ' + b;
    }
    return v + rest;
  }
  RX.enVerb = function (gloss, t, p) {
    const senses = gloss.split(';').map(s => s.trim()).filter(Boolean).slice(0, 2);
    return senses.map(s => s.split(/,\s*(?=to )/).slice(0, 3).map(c => inflectChunk(c, t, p)).join(', ')).join('; ');
  };

  /* ---------- English plurals for noun glosses (árboles → trees) ---------- */
  const EPL = { mouse: 'mice', foot: 'feet', tooth: 'teeth', man: 'men', woman: 'women', child: 'children', person: 'people', leaf: 'leaves', knife: 'knives', wife: 'wives', thief: 'thieves', wolf: 'wolves', life: 'lives', half: 'halves', shelf: 'shelves', loaf: 'loaves', sheep: 'sheep', fish: 'fish', deer: 'deer', goose: 'geese', ox: 'oxen', calf: 'calves', elf: 'elves', self: 'selves', potato: 'potatoes', tomato: 'tomatoes', hero: 'heroes', echo: 'echoes', crisis: 'crises', analysis: 'analyses', thesis: 'theses', phenomenon: 'phenomena', criterion: 'criteria', datum: 'data' };
  const UNC = new Set('bread money hair fear information advice news furniture music water milk rice gold silver iron silk straw wood sand snow ice meat sugar cheese chocolate love fun patience joy sadness beauty kindness intelligence magic harm damage heat wealth luggage work'.split(' '));
  const pl1 = w => EPL[w] || (UNC.has(w) ? w : /(s|x|z|ch|sh)$/.test(w) ? w + 'es' : /[^aeiou]y$/.test(w) ? w.slice(0, -1) + 'ies' : w + 's');
  RX.enPlural = function (gloss) {
    return gloss.split(';').map(sense => sense.split(',').map(ch => { const m = /^(\s*)([a-z][a-z' -]*?)(\s*\(.*\))?\s*$/i.exec(ch); if (!m || /^\s*\(/.test(ch)) return ch; const words = m[2].split(' '); const last = words.pop(); if (!/^[a-z]+$/i.test(last)) return ch; return m[1] + [...words, pl1(last.toLowerCase())].join(' ') + (m[3] || ''); }).join(',')).join(';');
  };
  /* ---------- index of every form ---------- */
  const POSN = { nm: 'masculine noun', nf: 'feminine noun', nmf: 'noun (masculine or feminine)', n: 'noun', npl: 'plural noun', adj: 'adjective', adv: 'adverb', v: 'verb', prep: 'preposition', conj: 'conjunction', pron: 'pronoun', det: 'determiner', art: 'article', int: 'interjection', num: 'number', pn: 'proper noun', exp: 'expression', poss: 'possessive', dem: 'demonstrative', rel: 'relative pronoun', q: 'question word' };
  RX.POSN = POSN; POSN.vf = 'verb form'; POSN.vinf = 'verb (infinitive)';
  function put(F, form, a) { form = form.toLowerCase(); if (!F.has(form)) F.set(form, []); F.get(form).push(a); }
  RX.build = function () {
    if (!RX.dirty && RX.F) return RX.F;
    const F = new Map();
    RX.L.forEach((list) => list.forEach(e => {
      const p0 = e.pos.split(':')[0], cls = e.pos.split(':')[1] || '';
      if (p0 === 'v') {
        if (/se$/.test(e.lemma) && (RX.L.get(e.lemma.slice(0, -2)) || []).some(x => x.pos.startsWith('v'))) return; // shown as «reflexive» on the base verb
        RX.conj(e.lemma.replace(/se$/, '') === e.lemma ? e.lemma : e.lemma.replace(/se$/, ''), cls).forEach(([f, t, p]) => put(F, f, { e, t, p }));
      } else if (p0 === 'nm' || p0 === 'nf' || p0 === 'nmf') {
        put(F, e.lemma, { e, g: 'singular' });
        if (!e.extra.includes('nopl')) put(F, e.pl || RX.plural(e.lemma), { e, g: 'plural' });
        if (e.f) { put(F, e.f, { e, g: 'feminine singular' }); put(F, RX.plural(e.f), { e, g: 'feminine plural' }); }
      } else if (p0 === 'adj') {
        RX.adjForms(e.lemma, e).forEach(([f, g]) => put(F, f, { e, g }));
        if (e.pl) put(F, e.pl, { e, g: 'plural' });
      } else {
        put(F, e.lemma, { e });
        if (e.pl) put(F, e.pl, { e, g: 'plural' });
        if (e.f) put(F, e.f, { e, g: 'feminine' });
      }
    }));
    RX.F = F; RX.dirty = false; return F;
  };

  /* ---------- analysis of one word ---------- */
  const CLIT = ['me', 'te', 'se', 'nos', 'os', 'lo', 'la', 'los', 'las', 'le', 'les'];
  function describe(a, form, viaClitic) {
    const e = a.e, p0 = e.pos.split(':')[0];
    const r = { lemma: e.lemma, pos: POSN[p0] || p0, en: e.en, note: e.note || '', src: e.src, form };
    if (p0 === 'v') {
      const refl = RX.L.get(e.lemma.replace(/se$/, '') + 'se');
      r.lemma = e.lemma; r.pos = 'verb';
      if (a.t === 'inf' && e.lemma === form) { r.isLemma = true; r.gram = 'infinitive'; }
      else {
        const pers = a.p != null && typeof a.p === 'number' ? PERS[a.p] : a.p === 'f' ? 'feminine' : a.p === 'mpl' ? 'masculine plural' : a.p === 'fpl' ? 'feminine plural' : '';
        r.gram = TN[a.t] + (pers ? ' · ' + pers : '');
        r.t = a.t; r.p = a.p;
        r.enForm = RX.enVerb(e.en, a.t, typeof a.p === 'number' ? a.p : null);

      }
      if (refl && !e.lemma.endsWith('se')) r.refl = refl.map(x => x.lemma + ' = ' + x.en).join(' · ');
    } else {
      r.gram = a.g || '';
      r.isLemma = form === e.lemma;
      if (/plural/.test(r.gram) && /^n/.test(p0) && p0 !== 'npl') r.enForm = RX.enPlural(e.en);
      if (p0 === 'nm' || p0 === 'nf') r.gender = p0 === 'nm' ? 'masculine' : 'feminine';
    }
    if (viaClitic) r.clitic = viaClitic;
    return r;
  }
  // merge analyses of the same lemma + tense (vivía = yo or él/ella/usted)
  const HV = ' (helper verb + past participle)';
  const ENO = {
    haber: { pres: r => ((r.ps || []).includes(2) ? 'has' : 'have') + HV + ' — «ha comido» = has eaten', impf: 'had' + HV + ' — «había comido» = had eaten', pret: 'had' + HV, fut: 'will have' + HV, cond: 'would have' + HV + ' — «habría comido» = would have eaten', subj: 'have (subjunctive)' + HV, isubj: 'had (subjunctive)' + HV + ' — «si hubiera sabido» = if I had known', inf: 'to have' + HV, ger: 'having' + HV },
    deber: { pres: 'must, should; owe(s)', cond: 'should, ought to', impf: 'had to; was supposed to', pret: 'had to', fut: 'will have to', subj: 'must (subjunctive)', isubj: 'should (subjunctive)' },
    soler: { pres: r => ((r.ps || []).includes(2) ? 'usually does, tends to' : 'usually do, tend to'), impf: 'used to, usually did', subj: 'usually (subjunctive)' },
    nacer: { pp: 'born' },
    poder: { cond: 'could, would be able to', impf: 'could, was able to', pret: 'was able to, managed to', pres: r => 'can, ' + ((r.ps || []).includes(2) ? 'is' : (r.ps || []).includes(0) ? 'am' : 'are') + ' able to' }
  };
  function group(list) {
    const out = []; const seen = new Map();
    list.forEach(r => {
      const k = r.lemma + '|' + r.pos + '|' + (r.t || r.gram) + '|' + (r.clitic || '') + '|' + r.en;
      if (r.t && seen.has(k)) { const o = seen.get(k); if (typeof r.p === 'number' && !o.ps.includes(r.p)) { o.ps.push(r.p); o.gram = TN[o.t] + ' · ' + o.ps.map(i => PERS[i]).join('  or  '); } return; }
      if (r.t) r.ps = typeof r.p === 'number' ? [r.p] : [];
      seen.set(k, r); out.push(r);
    });
    out.forEach(r => { if (r.t && r.ps && r.ps.length > 1) { r.enForm = RX.enVerb(r.lex || r.en, r.t, r.ps.includes(2) ? 2 : r.ps[0]); } });
    // nosotros: present and preterite look the same for -ar and -ir verbs (hablamos, vivimos)
    for (let i = 0; i < out.length; i++) { const x = out[i]; if (x.t !== 'pres' || !(x.ps || []).includes(3)) continue; const j = out.findIndex(y => y !== x && y.lemma === x.lemma && y.t === 'pret' && (y.ps || []).includes(3)); if (j < 0) continue; const y = out[j]; x.gram = 'present or preterite (past) · nosotros / nosotras'; x.enForm = x.enForm + '  /  ' + y.enForm; x.t2 = 'pret'; out.splice(j, 1); }
    out.forEach(r => { const o = ENO[r.lemma]; if (o && r.t && o[r.t]) r.enForm = typeof o[r.t] === 'function' ? o[r.t](r) : o[r.t]; });
    return out;
  }
  RX.reflexive = function (r) { // «se despierta» → despertarse
    if (r.pos !== 'verb' || /se$/.test(r.lemma)) return null;
    const rf = (RX.L.get(r.lemma + 'se') || []).find(x => x.pos.startsWith('v')); if (!rf) return null;
    const o = Object.assign({}, r, { lemma: rf.lemma, en: rf.en, note: (rf.note && rf.note !== 'reflexive' ? rf.note + '. ' : '') + 'Reflexive verb: used with me / te / se / nos / os.', refl: null, isLemma: false });
    if (r.t) o.enForm = RX.enVerb(rf.en, r.t, r.ps && r.ps.length ? (r.ps.includes(2) ? 2 : r.ps[0]) : (typeof r.p === 'number' ? r.p : null));
    return o;
  };
  RX.analyze = function (word, opts = {}) {
    const F = RX.build(); const w = word.toLowerCase();
    let res = (F.get(w) || []).map(a => describe(a, w));
    if (!res.length) {
      // pronouns attached to infinitive / gerund / command: dámelo, levantarse, diciéndole, sentaos, vámonos
      for (const c1 of CLIT) {
        if (!w.endsWith(c1) || w.length - c1.length < 2) continue;
        const r1 = w.slice(0, -c1.length);
        const tries = [[r1, [c1]]];
        for (const c2 of CLIT) if (r1.endsWith(c2) && r1.length - c2.length >= 2) tries.push([r1.slice(0, -c2.length), [c2, c1]]);
        for (const [stemF, cl] of tries) {
          const cands = [stemF, deacc(stemF)];
          if (cl[0] === 'os') cands.push(stemF + 'd', deacc(stemF) + 'd');
          if (cl[0] === 'nos') cands.push(stemF + 's', deacc(stemF) + 's');
          for (const c of cands) {
            const hits = (F.get(c) || []).filter(a => a.e.pos.startsWith('v') && ['inf', 'ger', 'imp', 'subj'].includes(a.t));
            if (hits.length) { res = hits.map(a => describe(a, c, cl.join(' + '))); break; }
          }
          if (res.length) break;
        }
        if (res.length) break;
      }
    }
    if (!res.length && /mente$/.test(w)) {
      const adj = w.slice(0, -5); const hit = (F.get(adj) || []).find(a => a.e.pos === 'adj');
      if (hit) res = [{ lemma: w, pos: 'adverb', en: 'in a ' + hit.e.en.split(/[;,]/)[0].trim() + ' way', note: 'Adverb made from the adjective «' + hit.e.lemma + '» (' + hit.e.en + ') + -mente (like English -ly).', form: w, src: 'rule', isLemma: true }];
    }
    res = group(res);
    if (opts.lemma) { res.sort((a, b) => (b.lemma === opts.lemma) - (a.lemma === opts.lemma)); res.forEach(r => r.forced = r.lemma === opts.lemma); }
    else if (opts.next != null) { // fue / fueron… + a / al / hacia → ir ; otherwise ser
      const goes = /^(a|al|hacia|hasta|allí|allá|para|corriendo|volando|de)$/.test(opts.next);
      if (res.some(r => r.lemma === 'ir') && res.some(r => r.lemma === 'ser')) res.sort((a, b) => ((b.lemma === (goes ? 'ir' : 'ser')) - (a.lemma === (goes ? 'ir' : 'ser'))));
    }
    // dictionary entries for the exact word first, then inflected forms
    return res;
  };

  /* ---------- phrases ---------- */
  const REFLX = new Set(['me', 'te', 'se', 'nos', 'os']);
  RX.tokMatch = function (spec, tok) {
    if (spec === tok.w) return true;
    if (spec === 'SE') return REFLX.has(tok.w);
    if (spec === 'ALGO') return true;
    return (tok.lemmas || []).includes(spec);
  };
  RX.findPhrases = function (toks) { // toks: [{w, lemmas, gap}] words only; gap = punctuation before this word
    if (!RX.phIndex) { RX.phIndex = new Map(); RX.PH.forEach(ph => { const k = ph.w[0]; if (!RX.phIndex.has(k)) RX.phIndex.set(k, []); RX.phIndex.get(k).push(ph); }); RX.phIndex.forEach(l => l.sort((a, b) => b.w.length - a.w.length)); }
    const marks = new Array(toks.length).fill(null);
    for (let i = 0; i < toks.length; i++) {
      if (marks[i]) continue;
      const t = toks[i]; const keys = [t.w, ...(t.lemmas || []), REFLX.has(t.w) ? 'se' : null, REFLX.has(t.w) ? 'SE' : null].filter(Boolean);
      let best = null;
      keys.forEach(k => (RX.phIndex.get(k) || []).forEach(ph => {
        if (best && best.w.length >= ph.w.length) return;
        if (i + ph.w.length > toks.length) return;
        for (let j = 0; j < ph.w.length; j++) { const tk = toks[i + j]; if (j > 0 && tk.gap) return; if (!RX.tokMatch(ph.w[j], tk)) return; }
        best = ph;
      }));
      if (best) for (let j = 0; j < best.w.length; j++) marks[i + j] = { ph: best, start: i };
    }
    return marks;
  };

  /* ---------- text → paragraphs → tokens ---------- */
  RX.WORD = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\^[a-zñáéíóúü]+)?/g;
  RX.parse = function (text) {
    const paras = text.trim().split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
    let wi = 0;
    return paras.map(p => {
      const parts = []; let last = 0; let m; const re = new RegExp(RX.WORD.source, 'g');
      while ((m = re.exec(p))) {
        if (m.index > last) parts.push({ t: p.slice(last, m.index) });
        const [surf, lem] = m[0].split('^');
        parts.push({ t: surf, w: surf.toLowerCase(), lem: lem || null, i: wi++ });
        last = m.index + m[0].length;
      }
      if (last < p.length) parts.push({ t: p.slice(last) });
      return parts;
    });
  };
  RX.clean = text => text.replace(/\^[a-zñáéíóúü]+/g, '');
})();
