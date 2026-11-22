/* =====================================================================
   HOME v4 · an introduction to Spain and to the Madrid Academy journey.
   Replaces only the Home view. The old dashboard parts (stats, study plan,
   daily quests…) still live in their own tabs; no data is touched.
   ===================================================================== */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;

  MA.HOST = {
    id: 'rocio', name: 'Rocío', voice: { tts: 'airy', rate: 0.92 },
    look: { hair: 'bun', hairColor: '#3f2419', skin: '#f0d2bb', eyes: '#4a2c1c', outfit: 'flamenca', shoes: 'flats-beige', acc: ['flor', 'earrings-flamenca'] }
  };

  /* Puerta de Alcalá, drawn simply */
  const alcala = `<svg viewBox="0 0 420 200" class="hm-alcala" role="img" aria-label="Illustration of the Puerta de Alcalá in Madrid">
    <defs><linearGradient id="hm-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeee8"/><stop offset="1" stop-color="#f3e2cc"/></linearGradient><linearGradient id="hm-st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4e6cf"/><stop offset="1" stop-color="#dcc6a2"/></linearGradient></defs>
    <rect width="420" height="200" rx="18" fill="url(#hm-sky)"/><circle cx="340" cy="52" r="26" fill="#fff6dc" opacity=".9"/>
    <path d="M0 178 C80 170 160 174 210 172 C280 170 350 168 420 176 L420 200 L0 200Z" fill="#e9d6b9"/>
    <g fill="#b7cf9c" opacity=".8"><circle cx="40" cy="160" r="20"/><circle cx="66" cy="166" r="15"/><circle cx="378" cy="160" r="20"/><circle cx="352" cy="166" r="14"/></g>
    <g transform="translate(90 52)" stroke="#b39463" stroke-width="1.2">
      <rect x="0" y="40" width="240" height="88" fill="url(#hm-st)"/>
      <rect x="-6" y="30" width="252" height="12" fill="#ead9bb"/>
      <path d="M90 30 L90 6 L150 6 L150 30Z" fill="#ead9bb"/><path d="M84 8 L120 -14 L156 8Z" fill="#f1e3c7"/>
      <g fill="#c9a96a" stroke="none"><circle cx="120" cy="-18" r="5"/><rect x="110" y="12" width="20" height="10" rx="2" opacity=".7"/></g>
      ${[18, 64, 120, 176, 222].map((x, i) => { const w = i === 2 ? 34 : i === 1 || i === 3 ? 28 : 18, h = i === 2 || i === 1 || i === 3 ? 62 : 44; return `<path d="M${x - w / 2} 128 L${x - w / 2} ${128 - h + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w / 2} ${128 - h + w / 2} L${x + w / 2} 128Z" fill="#8f7a64" opacity=".55"/>`; }).join('')}
      ${[42, 92, 148, 198].map(x => `<rect x="${x - 3}" y="44" width="6" height="84" fill="#f6ead4"/>`).join('')}
    </g>
    <path d="M150 186 L270 186" stroke="#c98b96" stroke-width="2" stroke-linecap="round" opacity=".6"/></svg>`;

  /* an illustrated passport (not your real stamps) */
  const passport = `<svg viewBox="0 0 240 150" class="hm-pass" role="img" aria-label="Illustration of a Spanish travel passport with city stamps">
    <rect x="8" y="12" width="104" height="130" rx="8" fill="#7a1a29"/><rect x="14" y="18" width="92" height="118" rx="5" fill="none" stroke="#c9a96a" stroke-width="1"/>
    <circle cx="60" cy="64" r="16" fill="none" stroke="#c9a96a" stroke-width="1.6"/><path d="M52 64 L68 64 M60 56 L60 72" stroke="#c9a96a" stroke-width="1.4"/>
    <text x="60" y="100" text-anchor="middle" font-size="9" fill="#e9cf96" font-family="Georgia,serif" letter-spacing="1">PASAPORTE</text><text x="60" y="113" text-anchor="middle" font-size="7" fill="#e9cf96" font-family="Georgia,serif">DE ESPAÑOL</text>
    <rect x="116" y="12" width="116" height="130" rx="6" fill="#fffaf2" stroke="#e5d6bd"/>
    <g font-family="Georgia,serif" text-anchor="middle">
      <g transform="rotate(-10 150 48)"><circle cx="150" cy="48" r="22" fill="none" stroke="#c98b96" stroke-width="2"/><circle cx="150" cy="48" r="17" fill="none" stroke="#c98b96" stroke-width=".8"/><text x="150" y="51" font-size="7" fill="#b5606e">ALICANTE</text></g>
      <g transform="rotate(8 200 62)"><rect x="176" y="46" width="48" height="30" rx="4" fill="none" stroke="#b39463" stroke-width="2"/><text x="200" y="65" font-size="7" fill="#9a7a45">SEVILLA</text></g>
      <g transform="rotate(-4 172 110)"><circle cx="172" cy="110" r="24" fill="none" stroke="#7a1a29" stroke-width="2" opacity=".7"/><text x="172" y="108" font-size="7" fill="#7a1a29">★</text><text x="172" y="118" font-size="7" fill="#7a1a29">MADRID</text></g>
    </g></svg>`;

  const STEP_IC = {
    char: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>',
    map: '<svg viewBox="0 0 24 24"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/></svg>',
    stamp: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="5"/><path d="M8 14l-2 5h12l-2-5M5 21h14"/></svg>'
  };

  V.home = function () {
    const host = MA.HOST, me = H.me ? H.me() : MA.DEFAULT_AVATAR, stamps = MA.CITIES.filter(c => (st().arrivals || {})[c.id]).length;
    const hello = '¡Hola! ¡Bienvenida a España! ¿Lista para comenzar tu aventura?';
    const scene = MA.CITY.sevilla;
    const route = Object.values(MA.STAGES).map(sg => `<div class="hm-stage"><b>${esc(sg.name)} <span class="tag">${esc(sg.cefr)}</span></b><span>${sg.cities.map(id => esc(MA.CITY[id].name)).join(' · ')}</span></div>`).join('')
      + `<div class="hm-stage final"><b>★ Final destination</b><span>Madrid</span></div>`;
    H.after(view => view.querySelectorAll('.hm-rise').forEach((el, i) => setTimeout(() => el.classList.add('in'), 80 + i * 90)));
    return `<div class="home4">
      <section class="h-hero hm-hero">
        ${MA.sceneSVG(scene.id, scene.pal, { sea: scene.sea })}
        <div class="h-glow"></div>
        <div class="h-avatar">${MA.avatarSVG(host.look, { label: `${host.name}, your welcome mentor, in a traje de flamenca` })}</div>
        <div class="h-card">
          <p class="eyebrow">Bienvenida · Welcome</p>
          <h1>¡Bienvenida a España! <span aria-hidden="true">🇪🇸</span></h1>
          <p class="hm-sub"><em>Discover the language, culture, and beauty of Spain.</em></p>
          <p>Welcome to Spain — a country of vibrant cities, rich history, beautiful architecture, lively festivals and unforgettable traditions. From the Mediterranean coast to the streets of Sevilla and the bustling capital, Madrid, every place has a story to tell.</p>
          <p>Spanish is more than a language: it is a gateway to new cultures, friendships and opportunities. <b>And now, your Spanish adventure is about to begin!</b></p>
          <div class="h-bubble">${H.portrait(host.look, 'sm')}<p><span class="who">${esc(host.name)}</span><span class="es">${esc(hello)}</span> ${UI.spk(hello, 'Listen', host.voice.tts)}<br><span class="muted">Hello! Welcome to Spain! Ready to begin your adventure?</span></p></div>
          <p class="tiny muted">Rocío wears a <i>traje de flamenca</i>, the traditional dress of Andalusian fairs and festivals.</p>
        </div>
      </section>

      <section class="panel hm-intro hm-rise">
        <p class="eyebrow">Madrid Academy</p>
        <h2>Your Spanish Adventure Begins Here</h2>
        <p class="hm-lead">Madrid Academy is a gamified Spanish course where learning a language becomes an adventure.</p>
        <p>You’ll explore cities across Spain, meet local mentors and complete language challenges, growing step by step from beginner to advanced. Every destination brings new vocabulary, grammar, expressions, stories and real conversations.</p>
        <p><b>Your goal:</b> explore Spain, master Spanish step by step, and reach your final destination — <b>Madrid</b>.</p>
      </section>

      <section class="hm-how hm-rise">
        <div class="hm-head"><p class="eyebrow">Cómo funciona</p><h2>How Your Journey Works</h2></div>
        <div class="hm-steps">
          <article class="panel hm-step"><span class="hm-n">1</span><div class="hm-ic">${STEP_IC.char}</div><h3>Create Your Character</h3>
            <div class="hm-me">${H.portrait(me, 'md')}</div>
            <p>Your journey begins with your own character — a young traveller arriving in Spain to learn Spanish.</p>
            <p class="muted">You control her and can change her hair, outfit, shoes and accessories.</p>
            <a class="btn small ghost" href="#wardrobe">Open the Wardrobe →</a></article>
          <article class="panel hm-step"><span class="hm-n">2</span><div class="hm-ic">${STEP_IC.map}</div><h3>Explore Spain</h3>
            <p>Travel through nine Spanish cities, each a new stage of your language adventure, with its own local mentor and atmosphere.</p>
            <div class="hm-route">${route}</div>
            <a class="btn small ghost" href="#map">See the World Map →</a></article>
          <article class="panel hm-step"><span class="hm-n">3</span><div class="hm-ic">${STEP_IC.book}</div><h3>Learn Through Adventures</h3>
            <p>Every city brings new lessons, conversations and challenges.</p>
            <ul class="hm-skills">${[['📖', 'Vocabulary'], ['✒️', 'Grammar'], ['💬', 'Idioms & expressions'], ['📚', 'Reading'], ['📝', 'Homework'], ['🎧', 'Listening, speaking & writing']].map(([i, t]) => `<li><span aria-hidden="true">${i}</span>${t}</li>`).join('')}</ul>
            <p class="muted">Complete each city’s lessons and milestone to move on.</p></article>
          <article class="panel hm-step"><span class="hm-n">4</span><div class="hm-ic">${STEP_IC.stamp}</div><h3>Collect Passport Stamps</h3>
            ${passport}
            <p>Your Spanish Passport records your journey across Spain. Finish a city’s milestone, travel to the next city, and its stamp is added. Passed exams and story quests add milestone stamps.</p>
            <p class="muted">Stamps show the journey you completed — they are not a CEFR certificate.</p>
            <a class="btn small ghost" href="#passport">My passport · ${stamps} stamp${stamps === 1 ? '' : 's'} →</a></article>
        </div>
      </section>

      <section class="panel hm-final hm-rise">
        <div class="hm-fart">${alcala}</div>
        <div><p class="eyebrow">Destino final</p><h2>The Final Destination — Madrid</h2>
          <p>After exploring Spain, Madrid awaits. Here there is no homework and there are no exams — just authentic conversations, local expressions, Spanish culture and real-life experiences.</p>
          <p>Your journey doesn’t end in Madrid. It’s where your Spanish becomes part of everyday life.</p>
          <a class="btn primary big" href="#map">Begin My Adventure →</a></div>
      </section>
    </div>`;
  };
})();
