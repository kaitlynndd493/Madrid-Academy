/* MADRID ACADEMY — art: modular layered avatar, 3D-style vocabulary illustrations, Madrid map */
window.MA = window.MA || {};
(function () {
  let uid = 0;
  const shade = (hex, amt) => {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
    const c = v => Math.max(0, Math.min(255, v));
    return '#' + ((1 << 24) + (c(r) << 16) + (c(g) << 8) + c(b)).toString(16).slice(1);
  };

  /* ---------- AVATAR (layers: back hair, body+outfit, shoes, head, face, front hair, accessories) ---------- */
  function backHair(style, c, d) {
    switch (style) {
      case 'long': return `<path d="M50 92 C46 46 76 26 100 26 C126 26 154 46 150 92 C152 140 158 190 164 236 C150 250 136 240 130 226 C128 200 124 180 122 168 L78 168 C76 180 72 200 70 226 C64 240 50 250 36 236 C42 190 48 140 50 92Z" fill="${c}"/><path d="M58 140 C54 180 50 210 44 232 M142 140 C146 180 150 210 156 232" stroke="${d}" stroke-width="2" fill="none" opacity=".5"/>`;
      case 'ponytail': return `<path d="M60 90 C58 52 80 32 100 32 C120 32 142 52 140 90 C140 108 136 120 132 128 L68 128 C64 120 60 108 60 90Z" fill="${c}"/><path d="M128 44 C152 40 162 70 156 104 C152 132 160 156 150 176 C142 160 140 140 138 118 C136 92 140 66 128 44Z" fill="${c}"/><path d="M146 70 C152 100 148 130 150 160" stroke="${d}" stroke-width="2" fill="none" opacity=".5"/>`;
      case 'bob': return `<path d="M54 92 C50 48 78 30 100 30 C124 30 150 48 146 92 C148 116 150 132 148 144 C136 150 126 146 122 138 L78 138 C74 146 64 150 52 144 C50 132 52 116 54 92Z" fill="${c}"/>`;
      case 'bun': return `<circle cx="100" cy="136" r="17" fill="${c}"/><path d="M60 90 C58 52 80 34 100 34 C120 34 142 52 140 90 C140 104 136 116 132 124 L68 124 C64 116 60 104 60 90Z" fill="${c}"/>`;
      case 'short': return `<path d="M64 88 C60 52 80 36 100 36 C122 36 142 52 136 90 C136 100 134 108 132 112 L68 112 C66 106 64 98 64 88Z" fill="${c}"/>`;
      default: /* layered */ return `<path d="M52 94 C48 48 76 28 100 28 C126 28 152 48 148 94 C150 128 146 158 154 184 C142 190 130 184 124 172 L76 172 C70 184 58 190 46 184 C54 158 50 128 52 94Z" fill="${c}"/><path d="M60 150 C58 166 54 176 50 182 M140 150 C142 166 146 176 150 182" stroke="${d}" stroke-width="2" fill="none" opacity=".5"/>`;
    }
  }
  function frontHair(style, c, d, hl) {
    const shine = `<path d="M82 46 C90 40 104 38 114 42" stroke="${hl}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/>`;
    switch (style) {
      case 'short': return `<path d="M68 84 C64 52 84 38 102 38 C122 38 138 52 134 84 C128 72 120 62 108 58 C104 66 94 70 84 70 C80 74 72 78 68 84Z" fill="${c}"/>${shine}`;
      case 'bob': return `<path d="M70 90 C66 56 84 40 100 40 C118 40 136 56 130 90 L124 72 L116 76 L110 66 L102 74 L94 64 L86 74 L78 68 Z" fill="${c}"/><path d="M70 82 C66 102 66 124 72 138 L80 136 C76 118 76 100 78 84Z M130 82 C134 102 134 124 128 138 L120 136 C124 118 124 100 122 84Z" fill="${c}"/>${shine}`;
      case 'bun': case 'ponytail': return `<path d="M70 88 C66 56 84 40 102 40 C122 40 136 56 130 88 C126 74 118 64 106 60 C100 70 88 76 74 80 C72 84 70 86 70 88Z" fill="${c}"/><path d="M71 84 C68 98 70 112 74 122 L78 120 C76 108 76 96 78 86Z M129 84 C132 98 130 112 126 122 L122 120 C124 108 124 96 122 86Z" fill="${c}"/>${shine}`;
      default: /* layered + long: soft face-framing bangs */
        return `<path d="M68 90 C64 56 84 40 102 40 C122 40 138 56 132 92 C128 78 122 68 114 62 C112 72 106 78 98 82 C100 74 98 68 96 62 C90 72 82 78 72 82 C70 86 69 88 68 90Z" fill="${c}"/>
        <path d="M70 84 C64 104 64 128 70 150 C74 158 78 160 82 158 C76 140 76 116 80 90Z" fill="${c}"/><path d="M130 84 C136 104 136 128 130 150 C126 158 122 160 118 158 C124 140 124 116 120 90Z" fill="${c}"/>
        <path d="M74 100 C72 118 72 134 76 150 M126 100 C128 118 128 134 124 150" stroke="${d}" stroke-width="1.6" fill="none" opacity=".5"/>${shine}`;
    }
  }
  function outfit(o, skin, sd, male) {
    const arms = (sleeveEnd) => `<path d="M64 170 C54 186 50 230 46 276 C50 282 56 282 58 276 C62 236 66 204 74 186Z" fill="${skin}"/><path d="M136 170 C146 186 150 230 154 276 C150 282 144 282 142 276 C138 236 134 204 126 186Z" fill="${skin}"/><ellipse cx="52" cy="280" rx="6" ry="7" fill="${skin}"/><ellipse cx="148" cy="280" rx="6" ry="7" fill="${skin}"/>`;
    const legs = (from) => `<path d="M84 ${from} L84 418 L94 418 L95 ${from}Z M105 ${from} L106 418 L116 418 L116 ${from}Z" fill="${skin}"/><path d="M84 ${from} L84 418 L88 418 L88 ${from}Z" fill="${sd}" opacity=".35"/>`;
    const torso = (fill, stroke) => `<path d="M66 168 C78 160 90 158 100 160 C110 158 122 160 134 168 L138 196 L134 254 L66 254 L62 196 Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
    const sleevesShort = (fill, stroke) => `<path d="M66 168 C56 176 50 194 48 208 L64 214 L70 190Z M134 168 C144 176 150 194 152 208 L136 214 L130 190Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
    const sleevesLong = (fill, stroke) => `<path d="M66 168 C54 186 50 230 44 270 L58 274 C62 236 66 206 74 188Z M134 168 C146 186 150 230 156 270 L142 274 C138 236 134 206 126 188Z" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
    switch (o) {
      case 'knit': return arms() + legs(400) + `<path d="M68 250 L132 250 L140 410 L104 410 L100 290 L96 410 L60 410Z" fill="#cdb79a"/><path d="M100 292 L100 408" stroke="#a8916f" stroke-width="1.5"/>` + torso('#f3ead9', '#d9ccb4') + sleevesLong('#f3ead9', '#d9ccb4') + `<path d="M86 162 C92 172 108 172 114 162" fill="none" stroke="#d9ccb4" stroke-width="3"/><path d="M70 246 L130 246" stroke="#d9ccb4" stroke-width="5"/>`;
      case 'dress': return arms() + legs(370) + `<path d="M66 168 C78 160 90 158 100 160 C110 158 122 160 134 168 L138 200 L130 240 L154 372 L46 372 L70 240 L62 200Z" fill="#d7a3ab"/><path d="M70 240 L130 240" stroke="#b9848d" stroke-width="3"/><path d="M84 260 L74 370 M100 260 L100 370 M116 260 L126 370" stroke="#c48f98" stroke-width="1.4" opacity=".7"/>` + sleevesShort('#d7a3ab', '#c48f98') + `<path d="M84 162 C92 176 108 176 116 162" fill="${skin}"/>`;
      case 'blazer': return arms() + legs(372) + `<path d="M68 250 L132 250 L148 374 L52 374Z" fill="#f4f0e8" stroke="#ddd6c8"/>` + torso('#fbfaf6', '#e2ddd2') + `<path d="M66 168 C76 162 86 160 92 162 L100 214 L96 256 L64 256 L60 200Z" fill="#2b3550"/><path d="M134 168 C124 162 114 160 108 162 L100 214 L104 256 L136 256 L140 200Z" fill="#2b3550"/>` + sleevesLong('#2b3550', '#1f2840') + `<circle cx="104" cy="230" r="2.2" fill="#c9a96a"/>`;
      case 'cardigan': return arms() + legs(352) + `<path d="M68 250 L132 250 L150 354 L50 354Z" fill="#efe6d8"/><path d="M76 254 L62 352 M88 254 L82 352 M100 254 L100 352 M112 254 L118 352 M124 254 L138 352" stroke="#d6c9b4" stroke-width="1.4"/>` + torso('#fbfaf6', '#e2ddd2') + `<path d="M66 168 C76 162 86 160 92 162 L98 254 L64 254 L60 200Z M134 168 C124 162 114 160 108 162 L102 254 L136 254 L140 200Z" fill="#c9a96a"/>` + sleevesLong('#c9a96a', '#b0925a') + `<circle cx="96" cy="200" r="1.8" fill="#8a7040"/><circle cx="96" cy="226" r="1.8" fill="#8a7040"/>`;
      case 'apron': return arms() + legs(408) + `<path d="M68 250 L132 250 L136 410 L104 410 L100 300 L96 410 L64 410Z" fill="#3a3336"/>` + torso('#f6f1e8', '#ddd5c6') + sleevesShort('#f6f1e8', '#ddd5c6') + `<path d="M78 196 L122 196 L126 330 L74 330Z" fill="#8a6a52"/><path d="M78 196 L88 164 M122 196 L112 164" stroke="#8a6a52" stroke-width="3"/><path d="M90 230 L110 230" stroke="#6e5340" stroke-width="2"/>`;
      case 'tee-jeans': return arms() + legs(408) + `<path d="M68 250 L132 250 L136 410 L104 410 L100 296 L96 410 L64 410Z" fill="#4a5b78"/><path d="M100 298 L100 408" stroke="#3a4a66" stroke-width="1.5"/>` + torso('#2f3a4f', '#253046') + sleevesShort('#2f3a4f', '#253046') + `<path d="M88 162 C94 170 106 170 112 162" fill="none" stroke="#253046" stroke-width="2"/>`;
      default: /* tee-skirt: white T-shirt & long black skirt */
        return arms() + legs(400) + `<path d="M70 248 L130 248 L150 402 L50 402Z" fill="#1d1a1f"/><path d="M84 256 L70 400 M100 256 L100 400 M116 256 L130 400" stroke="#2f2a31" stroke-width="1.6"/><path d="M70 248 L130 248 L131 256 L69 256Z" fill="#141216"/>` + torso('#fdfcf9', '#e4dfd6') + sleevesShort('#fdfcf9', '#e4dfd6') + `<path d="M88 162 C94 170 106 170 112 162" fill="none" stroke="#e4dfd6" stroke-width="2"/><path d="M80 200 C90 206 110 206 120 200" stroke="#ece7de" fill="none"/>`;
    }
  }
  function shoes(s) {
    switch (s) {
      case 'sneakers': return `<path d="M78 414 C78 408 96 408 97 414 L98 424 L74 424 C72 420 74 416 78 414Z M103 414 C104 408 122 408 122 414 C126 416 128 420 126 424 L102 424Z" fill="#fbfbf8" stroke="#cfcac0"/><path d="M74 424 L98 424 M102 424 L126 424" stroke="#bdb6aa" stroke-width="2.5"/>`;
      case 'loafers': return `<path d="M78 414 C80 409 96 409 97 414 L97 424 L74 424 C73 419 75 416 78 414Z M103 414 C104 409 120 409 122 414 C125 416 127 419 126 424 L103 424Z" fill="#a87a4e"/><path d="M82 416 L94 416 M106 416 L118 416" stroke="#7d5636" stroke-width="2"/>`;
      case 'boots': return `<path d="M82 392 L96 392 L97 424 L72 424 C72 416 80 414 82 410Z M104 392 L118 392 L120 410 C126 414 128 418 128 424 L103 424Z" fill="#4a3428"/>`;
      default: return `<path d="M79 415 C82 410 95 410 96 415 L96 422 C88 425 78 424 76 421 C76 418 77 416 79 415Z M104 415 C105 410 118 410 121 415 C123 416 124 418 124 421 C122 424 112 425 104 422Z" fill="#141216"/><path d="M84 414 C87 416 91 416 93 414 M107 414 C109 416 113 416 116 414" stroke="#3a3640" stroke-width="1.2" fill="none"/>`;
    }
  }
  function face(a, id) {
    const skin = a.skin, sd = shade(skin, -28), eye = a.eyes;
    const eyeShape = (cx) => `<ellipse cx="${cx}" cy="95" rx="7.5" ry="8.5" fill="#fff"/><ellipse cx="${cx}" cy="96" rx="5.6" ry="7.2" fill="url(#ir${id})"/><ellipse cx="${cx}" cy="97" rx="2.6" ry="3.4" fill="#1c1418"/><circle cx="${cx + 2}" cy="92.5" r="2.1" fill="#fff"/><circle cx="${cx - 2.2}" cy="99.5" r="1" fill="#fff" opacity=".8"/>`;
    const lash = a.male ? 'stroke-width="2.2"' : 'stroke-width="3"';
    return `<defs><linearGradient id="ir${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(eye, -40)}"/><stop offset=".6" stop-color="${eye}"/><stop offset="1" stop-color="${shade(eye, 45)}"/></linearGradient>
      <radialGradient id="fc${id}" cx=".5" cy=".38" r=".7"><stop offset="0" stop-color="${shade(skin, 10)}"/><stop offset="1" stop-color="${skin}"/></radialGradient></defs>
      <path d="M90 128 L110 128 L111 166 C104 170 96 170 89 166Z" fill="${sd}"/>
      <ellipse cx="72" cy="98" rx="4" ry="7" fill="${skin}"/><ellipse cx="128" cy="98" rx="4" ry="7" fill="${skin}"/>
      <path d="M72 84 C72 58 86 46 100 46 C114 46 128 58 128 84 C128 108 116 128 100 133 C84 128 72 108 72 84Z" fill="url(#fc${id})"/>
      ${eyeShape(88)}${eyeShape(112)}
      <path d="M80 89 C84 85 92 85 96 89" fill="none" stroke="#2a1d1f" ${lash} stroke-linecap="round"/><path d="M104 89 C108 85 116 85 120 89" fill="none" stroke="#2a1d1f" ${lash} stroke-linecap="round"/>
      ${a.male ? '' : '<path d="M79 89 L76 87 M121 89 L124 87" stroke="#2a1d1f" stroke-width="1.6" stroke-linecap="round"/>'}
      <path d="M82 80 C86 77 92 77 95 79 M105 79 C108 77 114 77 118 80" fill="none" stroke="${shade(a.hairColor, -10)}" stroke-width="${a.male ? 2.2 : 1.6}" stroke-linecap="round"/>
      <path d="M100 104 L98.5 109 L101 109.5" fill="none" stroke="${sd}" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M94 116 C97 119 103 119 106 116" fill="${a.male ? 'none' : '#d98a8f'}" stroke="#b5636b" stroke-width="1.4" stroke-linecap="round"/>
      ${a.male ? '' : '<ellipse cx="82" cy="108" rx="6" ry="3" fill="#f2a3a6" opacity=".35"/><ellipse cx="118" cy="108" rx="6" ry="3" fill="#f2a3a6" opacity=".35"/>'}`;
  }
  function accessories(acc, a) {
    let s = '';
    if (acc.includes('necklace')) s += `<path d="M88 166 C94 178 106 178 112 166" fill="none" stroke="#c9a96a" stroke-width="1.4"/><circle cx="100" cy="178" r="2.6" fill="#d9bb7c" stroke="#a8884e" stroke-width=".6"/>`;
    if (acc.includes('earrings')) s += `<circle cx="72" cy="107" r="2.6" fill="#fffaf0" stroke="#d8cdb8" stroke-width=".6"/><circle cx="128" cy="107" r="2.6" fill="#fffaf0" stroke="#d8cdb8" stroke-width=".6"/>`;
    if (acc.includes('glasses')) s += `<circle cx="88" cy="95" r="10" fill="none" stroke="#b39463" stroke-width="1.5"/><circle cx="112" cy="95" r="10" fill="none" stroke="#b39463" stroke-width="1.5"/><path d="M98 94 L102 94" stroke="#b39463" stroke-width="1.5"/>`;
    if (acc.includes('ribbon')) s += `<path d="M126 52 L140 44 L138 60Z M126 52 L132 66 L118 62Z" fill="#c9858f"/><circle cx="127" cy="54" r="3" fill="#b06f7a"/>`;
    if (acc.includes('beret')) s += `<ellipse cx="96" cy="40" rx="38" ry="13" fill="#1d1a1f" transform="rotate(-8 96 40)"/><circle cx="92" cy="27" r="3" fill="#1d1a1f"/>`;
    if (acc.includes('bag')) s += `<path d="M146 262 C146 246 166 246 166 262" fill="none" stroke="#8a6a52" stroke-width="2.5"/><path d="M138 262 L174 262 L170 318 L142 318Z" fill="#e9dcc6" stroke="#cdb99a"/><path d="M148 282 L164 282" stroke="#c9a96a" stroke-width="2"/>`;
    return s;
  }
  MA.avatarSVG = function (a, opts = {}) {
    a = Object.assign({}, MA.DEFAULT_AVATAR, a || {});
    const id = 'av' + (++uid);
    const hc = a.hairColor, hd = shade(hc, -30), hl = shade(hc, 60), sd = shade(a.skin, -28);
    const vb = opts.portrait ? '46 22 108 120' : '20 14 160 420';
    const acc = a.acc || [];
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" class="avatar ${opts.cls || ''}" role="img" aria-label="${opts.label || 'Character portrait'}">
      ${opts.portrait ? '' : '<ellipse cx="100" cy="426" rx="40" ry="5" fill="#000" opacity=".08"/>'}
      ${backHair(a.hair, hc, hd)}
      ${opts.portrait ? '' : outfit(a.outfit, a.skin, sd, a.male) + shoes(a.shoes)}
      ${opts.portrait ? `<g>${outfit(a.outfit, a.skin, sd, a.male)}</g>` : ''}
      ${face(Object.assign({}, a), id)}
      ${frontHair(a.hair, hc, hd, hl)}
      ${accessories(acc, a)}
    </svg>`;
  };

  /* ---------- VOCABULARY ILLUSTRATIONS (stylized, pre-drawn 3D-style SVG — not live 3D models) ---------- */
  const g = (id, a, b) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
  const shadow = `<ellipse cx="60" cy="104" rx="34" ry="6" fill="#5a4038" opacity=".14"/>`;
  const ILL = {
    apple: `<defs>${g('iA', '#ff9a8a', '#b3242c')}</defs>${shadow}<path d="M60 36 C44 26 22 36 24 62 C26 90 44 104 60 98 C76 104 94 90 96 62 C98 36 76 26 60 36Z" fill="url(#iA)"/><path d="M60 36 C60 26 64 20 70 16" stroke="#6b4a2e" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M64 28 C74 18 88 22 90 26 C82 34 70 34 64 28Z" fill="#7ea35a"/><ellipse cx="42" cy="52" rx="6" ry="10" fill="#fff" opacity=".35" transform="rotate(-20 42 52)"/>`,
    orange: `<defs>${g('iO', '#ffd08a', '#e07a1f')}</defs>${shadow}<circle cx="60" cy="64" r="36" fill="url(#iO)"/><path d="M60 28 C64 22 72 20 78 22 C74 30 66 32 60 28Z" fill="#6f9a4e"/><circle cx="48" cy="50" r="7" fill="#fff" opacity=".3"/><g fill="#c96a18" opacity=".25"><circle cx="70" cy="70" r="1.5"/><circle cx="56" cy="80" r="1.5"/><circle cx="78" cy="56" r="1.5"/></g>`,
    cat: `<defs>${g('iC', '#f2d6b8', '#c08a5a')}</defs>${shadow}<ellipse cx="60" cy="80" rx="30" ry="24" fill="url(#iC)"/><circle cx="60" cy="50" r="24" fill="url(#iC)"/><path d="M40 38 L42 18 L56 32Z M80 38 L78 18 L64 32Z" fill="#c08a5a"/><path d="M44 34 L45 24 L52 31Z M76 34 L75 24 L68 31Z" fill="#f2b5b0"/><ellipse cx="51" cy="50" rx="3.4" ry="4.4" fill="#2b2a2a"/><ellipse cx="69" cy="50" rx="3.4" ry="4.4" fill="#2b2a2a"/><circle cx="52" cy="48.5" r="1.2" fill="#fff"/><circle cx="70" cy="48.5" r="1.2" fill="#fff"/><path d="M57 58 L63 58 L60 61Z" fill="#d98a8f"/><path d="M60 61 C58 65 54 65 52 63 M60 61 C62 65 66 65 68 63" stroke="#6b4a3a" stroke-width="1.2" fill="none"/><path d="M88 86 C104 80 104 62 96 56" stroke="#c08a5a" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    dog: `<defs>${g('iD', '#f5e2c8', '#b98b5c')}</defs>${shadow}<ellipse cx="60" cy="82" rx="30" ry="22" fill="url(#iD)"/><circle cx="60" cy="52" r="24" fill="url(#iD)"/><ellipse cx="38" cy="54" rx="9" ry="18" fill="#8a5f3a" transform="rotate(15 38 54)"/><ellipse cx="82" cy="54" rx="9" ry="18" fill="#8a5f3a" transform="rotate(-15 82 54)"/><circle cx="51" cy="50" r="3.6" fill="#2b2a2a"/><circle cx="69" cy="50" r="3.6" fill="#2b2a2a"/><circle cx="52" cy="48.5" r="1.2" fill="#fff"/><circle cx="70" cy="48.5" r="1.2" fill="#fff"/><ellipse cx="60" cy="62" rx="6" ry="4.5" fill="#3a2a22"/><path d="M60 66 C60 72 66 72 66 70" stroke="#3a2a22" stroke-width="1.4" fill="none"/>`,
    house: `<defs>${g('iH', '#fff7ec', '#e6d3bb')}${g('iHr', '#e9a28f', '#a8503f')}</defs>${shadow}<rect x="26" y="52" width="68" height="50" rx="3" fill="url(#iH)"/><path d="M18 56 L60 20 L102 56Z" fill="url(#iHr)"/><rect x="52" y="72" width="16" height="30" rx="2" fill="#8a6a52"/><rect x="32" y="64" width="14" height="14" rx="2" fill="#a9cde0"/><rect x="74" y="64" width="14" height="14" rx="2" fill="#a9cde0"/><path d="M39 64 L39 78 M32 71 L46 71 M81 64 L81 78 M74 71 L88 71" stroke="#fff" stroke-width="1.5"/><rect x="78" y="28" width="9" height="16" fill="#b8644f"/>`,
    shoes: `<defs>${g('iS', '#5a5560', '#121014')}</defs>${shadow}<path d="M14 84 C16 70 40 68 54 74 C60 78 60 86 58 92 L16 94 C12 92 12 88 14 84Z" fill="url(#iS)"/><path d="M62 80 C64 66 88 64 102 70 C108 74 108 82 106 88 L64 90 C60 88 60 84 62 80Z" fill="url(#iS)"/><path d="M24 78 C30 80 38 80 44 77 M72 74 C78 76 86 76 92 73" stroke="#8a8590" stroke-width="1.5" fill="none"/><path d="M30 76 L36 79 L30 82Z M78 72 L84 75 L78 78Z" fill="#c9a96a"/>`,
    coffee: `<defs>${g('iCu', '#ffffff', '#e2d9cc')}</defs>${shadow}<ellipse cx="60" cy="96" rx="40" ry="8" fill="#efe6d8"/><path d="M28 50 L92 50 L86 92 C84 98 36 98 34 92Z" fill="url(#iCu)"/><path d="M92 58 C108 58 108 80 90 80" stroke="#e2d9cc" stroke-width="6" fill="none"/><ellipse cx="60" cy="50" rx="32" ry="8" fill="#7a4a2c"/><ellipse cx="60" cy="50" rx="18" ry="4" fill="#c99a6a"/><path d="M48 38 C44 30 52 26 48 18 M62 36 C58 28 66 24 62 16 M74 38 C70 30 78 26 74 18" stroke="#c8bdb0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>`,
    tea: `<defs>${g('iT', '#ffffff', '#dcd6ce')}</defs>${shadow}<path d="M32 54 L88 54 L84 94 C82 100 38 100 36 94Z" fill="url(#iT)"/><path d="M88 62 C102 62 102 82 86 82" stroke="#dcd6ce" stroke-width="5" fill="none"/><ellipse cx="60" cy="54" rx="28" ry="6" fill="#c8963e"/><path d="M70 54 L76 26" stroke="#bfb6a8" stroke-width="1.2"/><rect x="72" y="18" width="10" height="12" rx="1" fill="#d7a3ab"/>`,
    water: `<defs><linearGradient id="iW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d6ecf5"/><stop offset=".5" stop-color="#f4fbfe"/><stop offset="1" stop-color="#b9dbe9"/></linearGradient></defs>${shadow}<path d="M36 22 L84 22 L78 100 L42 100Z" fill="url(#iW)" stroke="#a7cbdb"/><path d="M39 50 L81 50 L78 100 L42 100Z" fill="#8cc4dc" opacity=".55"/><ellipse cx="60" cy="50" rx="21" ry="3" fill="#b5dbea"/><rect x="44" y="28" width="5" height="60" rx="2" fill="#fff" opacity=".5"/>`,
    juice: `<defs><linearGradient id="iJ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb347"/><stop offset=".5" stop-color="#ffd27a"/><stop offset="1" stop-color="#f08a24"/></linearGradient></defs>${shadow}<path d="M38 28 L82 28 L76 100 L44 100Z" fill="#f6f0e6" stroke="#d9cfbf"/><path d="M40 42 L80 42 L76 100 L44 100Z" fill="url(#iJ)"/><circle cx="82" cy="30" r="13" fill="#f7a23a" stroke="#fff" stroke-width="3"/><path d="M82 17 L82 43 M69 30 L95 30" stroke="#ffd9a0" stroke-width="1.5"/><path d="M66 28 L74 6" stroke="#d7a3ab" stroke-width="3"/>`,
    toast: `<defs>${g('iTo', '#f6d49a', '#c98b3e')}</defs>${shadow}<path d="M24 52 C20 34 44 28 60 34 C76 28 100 34 96 52 L92 98 L28 98Z" fill="url(#iTo)"/><path d="M32 54 C30 42 48 40 60 44 C72 40 90 42 88 54 L85 92 L35 92Z" fill="#fbe7c2"/><path d="M40 60 C50 54 64 66 80 58 L82 78 C66 86 52 74 38 80Z" fill="#d9503f" opacity=".85"/><path d="M44 66 L50 64 M62 70 L68 68" stroke="#f7d36a" stroke-width="3" stroke-linecap="round"/>`,
    croissant: `<defs>${g('iCr', '#f8d38f', '#b9732f')}</defs>${shadow}<path d="M14 84 C18 60 40 44 60 44 C80 44 102 60 106 84 C96 90 86 82 80 74 C76 86 66 90 60 90 C54 90 44 86 40 74 C34 82 24 90 14 84Z" fill="url(#iCr)"/><path d="M40 74 C44 60 52 52 60 50 M80 74 C76 60 68 52 60 50 M60 50 L60 88" stroke="#9a5e26" stroke-width="2" fill="none" opacity=".5"/>`,
    bread: `<defs>${g('iB', '#f3c785', '#b26f2e')}</defs>${shadow}<path d="M12 80 C12 62 30 52 60 52 C90 52 108 62 108 80 C108 94 92 98 60 98 C28 98 12 94 12 80Z" fill="url(#iB)" transform="rotate(-12 60 76)"/><path d="M34 70 L44 62 M52 68 L62 60 M70 66 L80 58" stroke="#f9e1b4" stroke-width="4" stroke-linecap="round" transform="rotate(-12 60 76)"/>`,
    cheese: `<defs>${g('iCh', '#fff0a8', '#e0b23a')}</defs>${shadow}<path d="M16 90 L16 62 L96 40 L104 62 L104 90Z" fill="url(#iCh)"/><path d="M16 62 L96 40 L104 62Z" fill="#fff4bd"/><circle cx="40" cy="76" r="6" fill="#d9a62e"/><circle cx="72" cy="82" r="4" fill="#d9a62e"/><circle cx="88" cy="70" r="5" fill="#d9a62e"/>`,
    book: `<defs>${g('iBk', '#e9a8b0', '#a85a68')}</defs>${shadow}<path d="M20 30 L60 38 L60 100 L20 92Z" fill="url(#iBk)"/><path d="M100 30 L60 38 L60 100 L100 92Z" fill="#c77f8b"/><path d="M24 34 L58 41 L58 96 L24 89Z" fill="#fbf6ee"/><path d="M96 34 L62 41 L62 96 L96 89Z" fill="#f4ede2"/><path d="M30 50 L52 54 M30 58 L52 62 M30 66 L48 69 M68 54 L90 50 M68 62 L90 58 M68 70 L86 67" stroke="#cfc3b2" stroke-width="2"/><path d="M60 38 L60 100" stroke="#8a4a56" stroke-width="2"/>`,
    painting: `<defs>${g('iP', '#e8d39a', '#a9843c')}</defs>${shadow}<rect x="16" y="20" width="88" height="76" rx="4" fill="url(#iP)"/><rect x="26" y="30" width="68" height="56" fill="#5d6b5a"/><circle cx="50" cy="52" r="10" fill="#e8c9a8"/><path d="M36 86 C38 66 62 64 66 86Z" fill="#3a2f3a"/><path d="M70 86 L82 56 L94 86Z" fill="#8a7a5a" opacity=".7"/><circle cx="84" cy="40" r="5" fill="#f2e2b0" opacity=".8"/>`,
    freedom: `<defs>${g('iF', '#ffffff', '#d9e6ef')}</defs>${shadow}<path d="M26 98 L26 54 C26 30 94 30 94 54 L94 98" fill="none" stroke="#c9a96a" stroke-width="3"/><path d="M38 98 L38 50 M50 98 L50 44 M70 98 L70 44 M82 98 L82 50" stroke="#c9a96a" stroke-width="2" opacity=".6"/><path d="M94 60 L112 40" stroke="#c9a96a" stroke-width="3"/><path d="M60 30 C68 18 84 14 96 20 C86 22 80 28 78 34 C90 30 100 32 106 38 C92 40 80 42 70 40 C64 40 58 36 60 30Z" fill="url(#iF)" stroke="#b9c9d6"/><circle cx="66" cy="31" r="1.4" fill="#3a3a3a"/>`
  };
  MA.illustration = function (key) {
    if (!ILL[key]) return '';
    return `<svg viewBox="0 0 120 112" class="ill" role="img" aria-label="Illustration">${ILL[key]}</svg>`;
  };
  MA.hasIllustration = k => !!ILL[k];

  /* ---------- MADRID MAP ---------- */
  MA.mapSVG = function (pins) {
    const pinSVG = pins.map(p => {
      const x = p.x * 10, y = p.y * 7;
      const locked = p.locked;
      return `<g class="pin ${locked ? 'locked' : ''}" data-href="#place-${p.id}" tabindex="0" role="link" aria-label="${p.name}${locked ? ' (locked)' : ''}" transform="translate(${x} ${y})">
        <ellipse cx="0" cy="26" rx="18" ry="5" fill="#000" opacity=".12"/>
        <path d="M0 24 C-6 12 -22 4 -22 -14 C-22 -28 -11 -36 0 -36 C11 -36 22 -28 22 -14 C22 4 6 12 0 24Z" class="pin-body"/>
        <circle cx="0" cy="-14" r="13" fill="#fffaf2"/>
        <text x="0" y="-9" text-anchor="middle" font-size="15">${locked ? '🔒' : p.icon}</text>
        <g transform="translate(0 46)"><rect x="${-p.name.length * 4.2 - 10}" y="-13" width="${p.name.length * 8.4 + 20}" height="22" rx="11" class="pin-label-bg"/><text x="0" y="3" text-anchor="middle" class="pin-label">${p.name}</text></g>
        ${p.quest ? '<g transform="translate(18 -34)"><circle r="9" fill="#c9a96a" stroke="#fff" stroke-width="2"/><text y="4" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">!</text></g>' : ''}
      </g>`;
    }).join('');
    return `<svg viewBox="0 0 1000 700" class="map" role="group" aria-label="Illustrated map of Madrid">
      <defs>
        <radialGradient id="mapbg" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#fbf5ea"/><stop offset="1" stop-color="#efe2cf"/></radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><path d="M0 0 L40 0 M0 0 L0 40" stroke="#e5d6c1" stroke-width="1"/></pattern>
        <linearGradient id="river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9d4dd"/><stop offset="1" stop-color="#9fc1cd"/></linearGradient>
      </defs>
      <rect width="1000" height="700" fill="url(#mapbg)"/>
      <rect width="1000" height="700" fill="url(#grid)" opacity=".7"/>
      <path d="M90 -10 C120 120 60 220 110 330 C160 440 90 560 150 710" stroke="url(#river)" stroke-width="34" fill="none" stroke-linecap="round"/>
      <text x="70" y="470" class="map-faint" transform="rotate(-78 70 470)">Río Manzanares</text>
      <path d="M690 250 C760 220 880 240 900 320 C920 410 860 470 780 470 C700 470 660 420 670 350 C672 300 660 270 690 250Z" fill="#cfdcb8" stroke="#b6c79c" stroke-width="2"/>
      <ellipse cx="770" cy="330" rx="34" ry="18" fill="#b9d4dd" opacity=".8"/>
      ${[[720,290],[740,410],[850,300],[860,410],[810,440],[700,360],[880,360]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="13" fill="#aec493"/><circle cx="${x-3}" cy="${y-3}" r="6" fill="#c3d6aa"/>`).join('')}
      <path d="M150 170 C330 190 520 180 720 140 C820 120 900 110 1000 100" stroke="#f6ecdc" stroke-width="18" fill="none"/>
      <path d="M150 170 C330 190 520 180 720 140 C820 120 900 110 1000 100" stroke="#dcc9ae" stroke-width="1.5" fill="none" stroke-dasharray="6 6"/>
      <text x="560" y="160" class="map-faint">Gran Vía</text>
      <path d="M470 0 L460 700 M200 380 L980 300 M250 560 L900 600" stroke="#f6ecdc" stroke-width="12" fill="none"/>
      <path d="M660 0 C650 200 640 400 680 700" stroke="#f6ecdc" stroke-width="16" fill="none"/>
      <text x="610" y="560" class="map-faint" transform="rotate(-86 610 560)">Paseo del Prado</text>
      <circle cx="470" cy="300" r="26" fill="#f3e6d2" stroke="#dcc9ae"/><text x="470" y="345" text-anchor="middle" class="map-faint">Puerta del Sol</text>
      <rect x="360" y="330" width="48" height="40" fill="#f0e0c8" stroke="#dcc9ae"/><text x="384" y="388" text-anchor="middle" class="map-faint">Plaza Mayor</text>
      <g transform="translate(920 610)"><circle r="34" fill="#fffaf2" stroke="#d6c3a5"/><path d="M0 -28 L7 0 L0 28 L-7 0Z" fill="#c9858f"/><path d="M-28 0 L0 -7 L28 0 L0 7Z" fill="#d6c3a5"/><text y="-38" text-anchor="middle" class="map-faint">N</text></g>
      <text x="40" y="60" class="map-title">Madrid</text><text x="42" y="86" class="map-faint">Tu año en la capital</text>
      ${pinSVG}
    </svg>`;
  };

  /* ---------- PLACE BACKDROPS (scene headers) ---------- */
  MA.sceneSVG = function (place, palOverride, opts = {}) {
    const pal = palOverride || {academia:['#f6e7d9','#e8c9b8'], cafe:['#f3e0cc','#d9b28f'], biblioteca:['#ece3f0','#c9b6d3'], retiro:['#e6efd8','#b9cf9c'], mercado:['#f6e6cf','#e2b980'], prado:['#efe7da','#cdb895'], radio:['#e4e8f0','#b8c3d6'], apartment:['#f7ece6','#e2c3b9']}[place] || ['#f6eee4','#e2cdb8'];
    return `<svg viewBox="0 0 800 220" class="scene" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="sk-${place}${palOverride ? 1 : 0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient></defs>
      <rect width="800" height="220" fill="url(#sk-${place}${palOverride ? 1 : 0})"/>
      <circle cx="660" cy="60" r="38" fill="#fff6dc" opacity=".8"/>
      <g fill="#fffaf2" opacity=".75">
        <path d="M0 220 L0 120 L60 120 L60 90 L90 70 L120 90 L120 120 L200 120 L200 100 L260 100 L260 220Z"/>
        <path d="M280 220 L280 80 L330 50 L380 80 L380 220Z"/><rect x="300" y="110" width="16" height="26" rx="8" fill="${pal[1]}" opacity=".6"/><rect x="344" y="110" width="16" height="26" rx="8" fill="${pal[1]}" opacity=".6"/>
        <path d="M400 220 L400 110 L470 110 L470 70 L520 40 L570 70 L570 110 L640 110 L640 220Z"/><circle cx="520" cy="90" r="14" fill="${pal[1]}" opacity=".6"/>
        <path d="M660 220 L660 130 L800 130 L800 220Z"/>
      </g>
      ${opts.sea ? `<path d="M0 196 C120 186 220 204 340 194 C460 184 560 204 680 194 C740 189 780 194 800 192 L800 220 L0 220Z" fill="#a9cbd6" opacity=".75"/><path d="M0 206 C140 198 260 212 400 204 C540 196 660 212 800 204" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>` : `<g stroke="${pal[1]}" stroke-width="2" opacity=".6"><path d="M0 190 L800 190"/></g>`}
    </svg>`;
  };
})();
