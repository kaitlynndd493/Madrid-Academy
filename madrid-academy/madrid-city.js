/* =====================================================================
   MADRID as a full city page (same layout as the other nine cities):
   hero · travel · intro · local guide (Lucía) · Real World · Explore Madrid
   · 6 categories (filled in later phases) · topics & story.
   ===================================================================== */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;
  const m = (es, en) => ({ m: es, en });
  const choose = (...opts) => ({ choose: opts.map(o => ({ es: o[0], en: o[1], re: o[2] ? { m: o[2], en: o[3] } : null })) });
  const c = MA.CITY.madrid;

  Object.assign(c, {
    cefr: 'C2 · real life', level: 'C2',
    intro: 'Spain’s capital, right in the centre of the country. Here you use everything you learned on the journey in real life: slang, natural speech, humour and social life — and you explore the city’s most famous places.',
    culture: 'Madrid speaks the central Peninsular Spanish you have been learning: «vosotros», the «z» and soft «c» like English “th”, and lots of «vale». Some madrileños say the final -d like a soft «z» («Madriz», «verdaz»). People are direct and friendly, life happens in the street and in bars, and dinner is rarely before 9 pm.',
    topics: [
      ['Social life: making plans, invitations and small talk', null],
      ['Giving opinions and debating naturally', null],
      ['Humour, irony and wordplay', null],
      ['Everyday admin: flat, bank, doctor and phone', null],
      ['Madrid culture: history, art and festivals', null],
      ['Real news and media: understanding fast Spanish', null]
    ]
  });

  MA.MENTORS.madrid = {
    id: 'lucia', name: 'Lucía', full: 'Lucía Navarro', age: 38, voice: { tts: 'rounded', rate: 0.95 },
    look: { hair: 'wavy', hairColor: '#3b2620', skin: '#e9c2a4', eyes: '#5a3d2b', outfit: 'mint-blouse', shoes: 'flats-black', acc: ['earrings'] },
    role: 'Radio journalist and walking-tour guide',
    personality: 'Lively, direct and funny. Very madrileña: she talks fast, loves a good chat and always has a plan.',
    background: 'Grew up in Lavapiés, studied journalism at the Complutense and now presents a culture programme on local radio. At weekends she runs walking tours of old Madrid.',
    relation: 'A true «gata» — born in Madrid, like her parents. She knows every bar, square and story in the centre.',
    teaching: 'Real life first: conversations, slang and natural Spanish, with honest feedback on how native you sound.',
    expressions: [['¡Hala, vamos!', 'Come on, let’s go!'], ['¿A que mola?', 'Isn’t it cool?'], ['Tranqui, que no pasa nada.', 'Relax, it’s fine.']],
    greet: '¡Hola! Soy Lucía. ¿Qué tal, cómo lo llevas? Cuéntame, ¿qué quieres practicar hoy?',
    intro: [
      m('¡Hola, {name}! ¡Por fin en Madrid! Bienvenida a la capital.', 'Hi, {name}! Finally in Madrid! Welcome to the capital.'),
      m('Soy Lucía. Soy periodista de radio y, los fines de semana, hago rutas a pie por el centro.', 'I’m Lucía. I’m a radio journalist and, at weekends, I give walking tours of the centre.'),
      m('Soy de Lavapiés, gata de toda la vida: mis padres también nacieron aquí.', 'I’m from Lavapiés, a born-and-bred madrileña: my parents were born here too.'),
      choose(['¡Encantada, Lucía! Tenía muchísimas ganas de llegar.', 'Nice to meet you, Lucía! I couldn’t wait to arrive.', '¡Normal! Has hecho un viaje larguísimo. Nueve ciudades, ¡casi nada!', 'Of course! You’ve made a very long trip. Nine cities — no small thing!'],
        ['Hola… Estoy un poco nerviosa, la verdad.', 'Hi… I’m a bit nervous, to be honest.', 'Tranqui, que no pasa nada. Aquí nadie te va a examinar: vamos a vivir.', 'Relax, it’s fine. Nobody is going to test you here: we’re going to live.']),
      m('Aquí el español ya no es de libro: es el de la calle, el de los bares y el de las sobremesas.', 'Here Spanish isn’t textbook any more: it’s the Spanish of the street, the bars and the long after-lunch chats.'),
      m('Empieza por «Real World»: jerga madrileña y español natural. Y luego, ¡a explorar el mapa!', 'Start with “Real World”: Madrid slang and natural Spanish. And then — explore the map!'),
      m('¿Te hace un bocata de calamares en la Plaza Mayor? ¡Hala, vamos!', 'Fancy a squid sandwich in Plaza Mayor? Come on, let’s go!')
    ],
    chapters: {}, tips: {},
    hw: m('Deberes a la madrileña: escucha, habla y no te cortes. Si te equivocas, ¡no pasa nada!', 'Madrid-style homework: listen, speak and don’t be shy. If you make a mistake, it’s fine!'),
    celebrate: []
  };

  /* Madrid is the final destination: no homework/tests or practice sections */
  const MADRID_DROP = ['homework', 'practice'];
  const cats0 = H.cats;
  H.cats = cc => cc && cc.final ? cats0(cc).filter(x => !MADRID_DROP.includes(x.key)) : cats0(cc);
  const city0 = V.city;
  V.city = function (arg) { const [id, k] = (arg || '').split('-'); if (id === 'madrid' && MADRID_DROP.includes(k)) { location.replace('#madrid'); return ''; } return city0(arg); };

  /* ---------- the Madrid page = the shared city page + Real World + map ---------- */
  V.madrid = function () {
    let html = H.cityHome(c).replace(/Story quests for this city: coming soon\.?/, 'No more quests: talk to Lucía, use Real World and explore the map. Madrid is yours.');
    // mentors.js only auto-plays the intro on #city-… routes; do the same here
    if (H.storyOpen(c) && !H.seen('intro:madrid')) H.after(() => setTimeout(() => { if (H.current.name === 'madrid' && !document.querySelector('.dlg-ov')) H.scene('madrid', MA.MENTORS.madrid.intro, { key: 'intro:madrid', title: 'Welcome to Madrid', reward: 10, onDone: () => H.render() }); }, 450));
    const extra = `<div class="mw-entry"><a class="panel mw-tile" href="#realworld"><span class="mw-ic">${MA.LUCIDE.notebook}</span><span><b>Real World</b><small>Madrid Slang (${MA.SLANG.length}) · Natural Spanish (${MA.NATURAL.length})</small></span></a></div>${H.exploreSection()}`;
    const at = html.indexOf('<div class="cat-grid">');
    return at < 0 ? html + extra : html.slice(0, at) + extra + html.slice(at);
  };
})();
