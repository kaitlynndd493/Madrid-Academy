/* MADRID ACADEMY — character art v2: layered, shaded illustrated avatar (adult proportions).
   One renderer is used everywhere (home, map, cities, dialogues, passport, wardrobe), so changes show up in every view. */
window.MA = window.MA || {};
(function () {
  let uid = 0;
  const shade = (hex, amt) => { const n = parseInt(hex.slice(1), 16); const c = v => Math.max(0, Math.min(255, v)); return '#' + ((1 << 24) + (c((n >> 16) + amt) << 16) + (c(((n >> 8) & 255) + amt) << 8) + c((n & 255) + amt)).toString(16).slice(1); };
  const mirror = s => `<g transform="translate(200 0) scale(-1 1)">${s}</g>`;

  MA.DEFAULT_AVATAR = { hair: 'wavy', hairColor: '#5a3826', skin: '#f6dccb', eyes: '#9a6a32', outfit: 'refined', shoes: 'sneakers', acc: [] };
  MA.OLD_DEFAULT_AVATAR = { hair: 'layered', hairColor: '#5b3a29' };
  MA.WARDROBE.hair = [['wavy', 'Soft waves & curtain bangs', 0], ['layered', 'Shoulder layers, flipped ends', 0], ['long', 'Long waves', 0], ['bob', 'Chic bob', 0], ['ponytail', 'Low ponytail', 0], ['bun', 'Top bun', 40]];
  MA.WARDROBE.hairColor = [['#5a3826', 'Chocolate brown'], ['#3a2419', 'Espresso'], ['#7a4e30', 'Chestnut'], ['#a0704a', 'Caramel'], ['#c9a27a', 'Honey blonde'], ['#1f1a1d', 'Black'], ['#7a3b2b', 'Auburn'], ['#b98a8f', 'Dusty rose']];
  MA.WARDROBE.skin = [['#fbe7da', 'Porcelain'], ['#f6dccb', 'Light'], ['#ecc8ad', 'Warm beige'], ['#ddb08c', 'Golden'], ['#c18e68', 'Tan'], ['#9c6a4a', 'Caramel'], ['#6f4733', 'Deep']];
  MA.WARDROBE.outfit = [['refined', 'Refined Casual — black turtleneck & cream trousers (default)', 0], ['cozy', 'Cozy Cardigan — pink cardigan & cream trousers', 0], ['denim', 'Denim Classic — denim jacket & wide jeans', 60], ['academia', 'Soft Academia — olive sweater & white maxi skirt', 80], ['preppy', 'Modern Classic — striped top & black trousers', 60]];
  MA.WARDROBE.shoes = [['sneakers', 'White sneakers (default)', 0], ['loafers-cream', 'Beige loafers', 0], ['loafers-white', 'White loafers', 0], ['flats-beige', 'Beige ballet flats', 30], ['flats-black', 'Black ballet flats', 0], ['loafers', 'Tan loafers', 30], ['boots', 'Ankle boots', 40]];
  MA.OUTFIT_MAP = { 'tee-skirt': 'refined', knit: 'cozy', dress: 'academia', blazer: 'preppy', cardigan: 'denim' }; // old wardrobe → new looks
  MA.WARDROBE.eyes = [['#9a6a32', 'Amber brown'], ['#5a3a26', 'Dark brown'], ['#3a2a22', 'Espresso'], ['#5f7a4c', 'Green'], ['#4f7194', 'Blue'], ['#7f6a46', 'Hazel'], ['#6a5a80', 'Violet grey']];

  /* ---------------- hair ---------------- */
  const HAIR = {
    wavy: {
      back: 'M100 35 C72 35 60 56 62 84 C63 102 56 116 59 130 C61 142 54 152 58 164 C64 172 76 170 82 162 L118 162 C124 170 136 172 142 164 C146 152 139 142 141 130 C144 116 137 102 138 84 C140 56 128 35 100 35Z',
      side: 'M79 62 C70 71 66 85 66 98 C66 108 61 116 61 127 C61 137 66 141 64 151 C62 159 66 167 74 167 C80 167 85 163 88 158 C83 156 81 150 83 144 C85 136 82 128 83 120 C83 112 79.5 106 79 98 C78.6 90 78.6 80 81.5 72Z',
      strands: 'M72 96 C69 112 70 126 67 140 C66 148 68 156 72 162 M77 108 C76 122 79 136 76 150',
      bangs: 'M100 39 C82 39 72 50 72 69 C72 76 74 83 76 90 C77 83 79 77 82 73 C83 76 85 78 87 79 C87 74 89 70 92 68 C93 72 95 74 97 75 C97 70 98 66 100 62 C102 66 103 70 103 75 C105 74 107 72 108 68 C111 70 113 74 113 79 C115 78 117 76 118 73 C121 77 123 83 124 90 C126 83 128 76 128 69 C128 50 118 39 100 39Z'
    },
    layered: {
      back: 'M100 35 C73 35 62 56 63 84 C64 108 63 128 65 145 C61 149 59 153 61 156 C69 157 78 153 82 147 L118 147 C122 153 131 157 139 156 C141 153 139 149 135 145 C137 128 136 108 137 84 C138 56 127 35 100 35Z',
      side: 'M79 62 C71 78 68 100 69 122 C69 134 68 143 64 150 C70 154 78 152 83 146 C83 132 81 116 80 102 C79 92 79 80 81.5 72Z',
      strands: 'M76 96 C74 114 75 130 73 144 M81 104 C80 120 81 134 80 146',
      bangs: 'M100 39 C82 39 72 50 72 69 C72 76 74 83 76 90 C77 83 79 77 82 73 C83 76 85 78 87 79 C87 74 89 70 92 68 C93 72 95 74 97 75 C97 70 98 66 100 62 C102 66 103 70 103 75 C105 74 107 72 108 68 C111 70 113 74 113 79 C115 78 117 76 118 73 C121 77 123 83 124 90 C126 83 128 76 128 69 C128 50 118 39 100 39Z'
    },
    long: {
      back: 'M100 35 C73 35 60 56 62 83 C63 110 57 140 61 170 C64 196 56 218 62 240 C70 252 82 246 86 236 C84 220 88 200 86 182 L114 182 C112 200 116 220 114 236 C118 246 130 252 138 240 C144 218 136 196 139 170 C143 140 137 110 138 83 C140 56 127 35 100 35Z',
      side: 'M79 62 C70 84 66 110 68 136 C70 160 63 182 67 206 C70 220 80 224 86 214 C82 200 87 184 86 166 C85 140 81 118 80 102 C79 92 79 80 81.5 72Z',
      strands: 'M75 100 C72 130 74 160 70 196 M80 120 C79 150 82 176 78 208',
      bangs: 'M100 39 C82 39 72 50 72 69 C72 76 74 83 76 90 C77 83 79 77 82 73 C83 76 85 78 87 79 C87 74 89 70 92 68 C93 72 95 74 97 75 C97 70 98 66 100 62 C102 66 103 70 103 75 C105 74 107 72 108 68 C111 70 113 74 113 79 C115 78 117 76 118 73 C121 77 123 83 124 90 C126 83 128 76 128 69 C128 50 118 39 100 39Z'
    },
    bob: {
      back: 'M100 36 C75 36 63 55 64 82 C64 98 63 110 65 120 C72 124 80 122 84 117 L116 117 C120 122 128 124 135 120 C137 110 136 98 136 82 C137 55 125 36 100 36Z',
      side: 'M79 62 C71 80 68 98 69 112 C70 119 75 122 82 121 C82 110 80 100 79.6 92 C79.4 84 79.6 78 81.5 72Z',
      strands: 'M76 94 C74 104 74 112 75 118',
      bangs: 'M100 39 C82 39 72 50 72 69 C72 76 74 83 76 90 C77 83 79 77 82 73 C83 76 85 78 87 79 C87 74 89 70 92 68 C93 72 95 74 97 75 C97 70 98 66 100 62 C102 66 103 70 103 75 C105 74 107 72 108 68 C111 70 113 74 113 79 C115 78 117 76 118 73 C121 77 123 83 124 90 C126 83 128 76 128 69 C128 50 118 39 100 39Z'
    },
    ponytail: {
      back: 'M100 37 C77 37 66 55 67 80 C68 92 70 100 73 106 L127 106 C130 100 132 92 133 80 C134 55 123 37 100 37Z M126 74 C142 84 146 112 142 142 C140 162 146 182 138 198 C130 186 130 168 130 150 C130 126 132 102 120 84Z',
      side: 'M79 70 C75 80 75 92 77 102 C79 98 80 90 82 82Z',
      strands: 'M138 110 C140 140 136 168 138 190',
      oneSide: true, // the tail is only on one side: don't mirror its strands
      bangs: 'M100 40 C84 40 74 50 74 68 C74 74 76 80 78 86 C80 78 85 70 91 65 C95 60 97 54 100 48 C103 54 106 60 110 65 C116 70 120 78 122 86 C124 80 126 74 126 68 C126 50 116 40 100 40Z'
    },
    bun: {
      back: 'M100 37 C77 37 66 55 67 80 C68 92 70 100 73 106 L127 106 C130 100 132 92 133 80 C134 55 123 37 100 37Z',
      top: 'M100 18 C90 18 85 25 86 33 C87 40 93 44 100 44 C107 44 113 40 114 33 C115 25 110 18 100 18Z',
      side: 'M79 70 C75 82 75 94 78 104 C80 98 80 90 82 82Z',
      strands: 'M92 24 C96 30 104 30 108 24',
      bangs: 'M100 40 C84 40 74 50 74 68 C74 74 76 80 78 86 C80 78 85 70 91 65 C95 60 97 54 100 48 C103 54 106 60 110 65 C116 70 120 78 122 86 C124 80 126 74 126 68 C126 50 116 40 100 40Z'
    },
    swept: {
      back: 'M100 37 C77 37 67 54 69 76 C70 88 72 94 75 98 L125 98 C128 94 130 88 131 76 C133 54 123 37 100 37Z',
      side: 'M78 64 C76 72 76 80 78 86 C79 80 80 74 81 70Z',
      strands: '',
      bangs: 'M100 39 C82 39 72 50 73 68 C78 58 88 53 98 56 C105 51 116 52 123 60 C125 62 127 66 127 68 C128 50 118 39 100 39Z'
    },
    short: {
      back: 'M100 38 C78 38 68 54 70 76 C71 86 73 92 76 96 L124 96 C127 92 129 86 130 76 C132 54 122 38 100 38Z',
      side: 'M78 66 C76 74 76 82 78 88 C79 82 80 76 81 72Z',
      strands: '',
      bangs: 'M100 40 C84 40 73 50 74 66 C76 62 80 60 84 61 C88 56 94 54 100 55 C106 52 114 54 118 60 C122 60 125 63 126 66 C127 50 116 40 100 40Z'
    }
  };

  /* ---------------- outfits (each returns layers below the head) ---------------- */
  function body(a, g, male) {
    const sk = a.skin, sd = shade(sk, -26);
    const armL = `<path d="M69 134 C60 150 56.5 174 56 196 C55.5 214 54.5 236 53.5 258 L65.5 260 C66.5 238 68.5 214 70.5 198 C72.5 178 76.5 158 82 144Z" fill="url(#${g}sk)"/><path d="M53.5 256 C49.5 265 50.5 277 55 281.5 C59.5 284 66 279 66 269 C66 262.5 64.5 258 61 256.5Z" fill="${sk}"/><path d="M57 272 L58 279 M60 273 L61 280" stroke="${sd}" stroke-width=".6" opacity=".6"/><path d="M59 198 C60 214 59 236 57 256" stroke="${sd}" stroke-width=".8" opacity=".6" fill="none"/>`;
    const arms = armL + mirror(armL);
    const legs = (from) => `<path d="M89.5 ${from} L90.5 446 L97.5 446 L97.5 ${from}Z M102.5 ${from} L102.5 446 L109.5 446 L110.5 ${from}Z" fill="url(#${g}sk)"/>`;
    const tee = (fill, line) => `<path d="M70 134 C78 128 88 126 93 126 C96 131 104 131 107 126 C112 126 122 128 130 134 C134 150 132 160 128 170 C126 182 122 194 121 206 L79 206 C78 194 74 182 72 170 C68 160 66 150 70 134Z" fill="${fill}" stroke="${line}" stroke-width=".8"/>
      <path d="M84 186 C92 190 108 190 116 186" stroke="${line}" stroke-width=".8" fill="none" opacity=".6"/>`;
    const shortSleeve = (fill, line) => { const s = `<path d="M70 134 C63 140 59 152 57 167 C62 170 68 171 72 170 C72 158 74 147 79 141Z" fill="${fill}" stroke="${line}" stroke-width=".8"/>`; return s + mirror(s); };
    const longSleeve = (fill, line) => { const s = `<path d="M70 134 C62 150 58 180 57 210 C56 230 55 246 54 260 L66 262 C66 246 68 228 69 210 C71 186 74 160 79 142Z" fill="${fill}" stroke="${line}" stroke-width=".8"/><path d="M54 254 L66 256" stroke="${line}" stroke-width="2"/>`; return s + mirror(s); };
    const neckline = (line) => `<path d="M93 126 C96 132 104 132 107 126" stroke="${line}" stroke-width="2.2" fill="none"/>`;
    const longSkirt = (fill, fold, to = 432, flare = 150) => `<path d="M80 202 L120 202 C126 262 ${flare - 12} 340 ${flare} ${to - 4} C138 ${to + 2} 120 ${to + 4} 100 ${to + 4} C80 ${to + 4} 62 ${to + 2} ${200 - flare} ${to - 4} C${212 - flare} 340 74 262 80 202Z" fill="${fill}"/>
      <path d="M92 214 C88 290 80 ${to - 70} ${210 - flare + 12} ${to} M100 216 L100 ${to + 3} M108 214 C112 290 120 ${to - 70} ${flare - 10} ${to}" stroke="${fold}" stroke-width="1.4" fill="none" opacity=".75"/>`;
    const trousers = (fill, fold) => `<path d="M80 202 L120 202 C124 260 130 340 133 442 L104 442 L100 246 L96 442 L67 442 C70 340 76 260 80 202Z" fill="${fill}"/><path d="M100 248 L100 440 M88 220 C86 300 84 380 82 440" stroke="${fold}" stroke-width="1.2" fill="none" opacity=".7"/>`;
    const wide = (fill, fold) => `<path d="M79 202 L121 202 C126 280 134 360 138 444 L104 444 L100 252 L96 444 L62 444 C66 360 74 280 79 202Z" fill="${fill}"/><path d="M100 254 L100 442 M88 220 C84 300 78 380 74 442 M112 220 C116 300 122 380 126 442" stroke="${fold}" stroke-width="1.1" fill="none"/>`;
    const waist = (fill) => `<path d="M79 199 L121 199 L121.5 207 L78.5 207Z" fill="${fill}"/>`;
    const grad = (id, a1, a2) => `<linearGradient id="${g}${id}" x1="0" x2="1"><stop offset="0" stop-color="${a2}"/><stop offset=".45" stop-color="${a1}"/><stop offset="1" stop-color="${a2}"/></linearGradient>`;
    let defs = '', out = '';
    switch (a.outfit) {
      case 'knit':
        defs = grad('top', '#f7efe2', '#e6d8c2') + grad('bot', '#d7c2a3', '#bba582');
        out = arms + trousers(`url(#${g}bot)`, '#a68e6c') + tee(`url(#${g}top)`, '#d9c9b0') + longSleeve(`url(#${g}top)`, '#d9c9b0') + `<path d="M91 125 C95 133 105 133 109 125" stroke="#e2d4bd" stroke-width="4" fill="none"/><path d="M84 140 L84 200 M92 138 L92 202 M100 138 L100 202 M108 138 L108 202 M116 140 L116 200" stroke="#e3d5bf" stroke-width="1" opacity=".8"/><path d="M78 200 L122 200" stroke="#e0d1b9" stroke-width="5"/>`;
        break;
      case 'dress':
        defs = grad('top', '#e2b0b7', '#c98d97');
        out = arms + legs(360) + longSkirt(`url(#${g}top)`, '#b97c87', 362, 146) + tee(`url(#${g}top)`, '#c48b95') + `<path d="M70 134 C60 136 56 150 58 162 C64 166 70 166 74 162 C74 152 76 144 80 140Z" fill="#dba5ad" stroke="#c48b95" stroke-width=".8"/>` + mirror(`<path d="M70 134 C60 136 56 150 58 162 C64 166 70 166 74 162 C74 152 76 144 80 140Z" fill="#dba5ad" stroke="#c48b95" stroke-width=".8"/>`) + `<path d="M79 200 L121 200 L121 206 L79 206Z" fill="#b97c87"/><path d="M100 203 L92 216 M100 203 L108 218" stroke="#b97c87" stroke-width="2.5"/>`;
        break;
      case 'blazer': case 'blazer-pants':
        defs = grad('jk', '#34405e', '#232c45') + grad('sk2', '#fbf8f2', '#e9e3d8') + grad('bk', '#2a2a30', '#16161a');
        out = arms + (a.outfit === 'blazer-pants' ? trousers(`url(#${g}bk)`, '#0c0c10') : legs(372) + longSkirt(`url(#${g}sk2)`, '#d6cfc2', 374, 140)) + tee('#fdfcf9', '#e6e0d6') + longSleeve(`url(#${g}jk)`, '#1d2539') + `<path d="M70 134 C78 128 88 126 93 126 L99 176 L96 214 L73 214 C69 186 66 156 70 134Z" fill="url(#${g}jk)"/>` + mirror(`<path d="M70 134 C78 128 88 126 93 126 L99 176 L96 214 L73 214 C69 186 66 156 70 134Z" fill="url(#${g}jk)"/>`) + `<path d="M93 126 L88 150 L97 168 M107 126 L112 150 L103 168" stroke="#1a2134" stroke-width="1.2" fill="none"/><circle cx="102" cy="188" r="1.8" fill="#c9a96a"/>`;
        break;
      case 'cardigan':
        defs = grad('cd', '#d7b77a', '#b8955a');
        out = arms + legs(358) + longSkirt('#f1e8da', '#d9ccb6', 360, 142) + `<path d="M84 212 L74 356 M92 212 L88 360 M100 212 L100 362 M108 212 L112 360 M116 212 L126 356" stroke="#ddd0bb" stroke-width="1.2"/>` + tee('#fdfcf9', '#e6e0d6') + longSleeve(`url(#${g}cd)`, '#a58448') + `<path d="M70 134 C78 128 88 126 93 126 L97 206 L74 208 C69 186 66 156 70 134Z" fill="url(#${g}cd)"/>` + mirror(`<path d="M70 134 C78 128 88 126 93 126 L97 206 L74 208 C69 186 66 156 70 134Z" fill="url(#${g}cd)"/>`) + `<circle cx="95.5" cy="150" r="1.5" fill="#7d6232"/><circle cx="96" cy="172" r="1.5" fill="#7d6232"/><circle cx="96.5" cy="194" r="1.5" fill="#7d6232"/>`;
        break;
      case 'apron':
        out = arms + trousers('#3a3437', '#2a2528') + tee('#f7f3ec', '#ddd5c6') + shortSleeve('#f7f3ec', '#ddd5c6') + `<path d="M80 176 L120 176 L124 330 L76 330Z" fill="#8a6a52"/><path d="M80 176 L90 130 M120 176 L110 130" stroke="#8a6a52" stroke-width="2.5"/><path d="M90 214 L110 214" stroke="#6e5340" stroke-width="2"/>`;
        break;
      case 'tee-jeans':
        defs = grad('top', '#384560', '#28324a') + grad('bot', '#566a8c', '#43557a');
        out = arms + trousers(`url(#${g}bot)`, '#3a4a6a') + tee(`url(#${g}top)`, '#232c42') + shortSleeve(`url(#${g}top)`, '#232c42') + neckline('#232c42');
        break;
      case 'mint-blouse': /* mint long-sleeve shirt & long white skirt (Lucía, Madrid) */
        defs = grad('top', '#d4eee0', '#a9d6c0') + grad('bot', '#ffffff', '#e9e4dc');
        out = arms + legs(426) + longSkirt(`url(#${g}bot)`, '#d8d1c5', 430, 152) + waist('#f4f0e8') + tee(`url(#${g}top)`, '#8cc2a8') + longSleeve(`url(#${g}top)`, '#8cc2a8') + `<path d="M93 126 L100 140 L107 126" stroke="#8cc2a8" stroke-width="1.6" fill="none"/><path d="M100 140 L100 198" stroke="#8cc2a8" stroke-width=".9"/><circle cx="100" cy="152" r="1.4" fill="#f7fbf9"/><circle cx="100" cy="166" r="1.4" fill="#f7fbf9"/><circle cx="100" cy="180" r="1.4" fill="#f7fbf9"/>`;
        break;
      /* ---------- Bee's outfits (main character, drafts supplied by Kait) ---------- */
      case 'refined': { /* black turtleneck & cream wide trousers */
        defs = grad('tp', '#2c2629', '#171315') + grad('tr', '#f7efe1', '#e4d6be');
        out = arms + wide(`url(#${g}tr)`, '#d8c8ab') + `<path d="M79 199 L121 199 L121.5 206 L78.5 206Z" fill="#efe4d0"/>` + tee(`url(#${g}tp)`, '#0f0c0e') + longSleeve(`url(#${g}tp)`, '#0f0c0e')
          + `<path d="M91 114 L109 114 L110 130 C104 133 96 133 90 130Z" fill="url(#${g}tp)"/><path d="M92 119 L108 119 M92 124 L108 124" stroke="#3a3336" stroke-width=".7"/><path d="M84 140 L84 196 M92 138 L92 198 M108 138 L108 198 M116 140 L116 196" stroke="#3a3336" stroke-width=".6" opacity=".7"/>`
          + `<path d="M92 132 C95 146 105 146 108 132" stroke="#c9a96a" stroke-width=".8" fill="none"/><path d="M100 146 L98.6 149 L100 152 L101.4 149Z" fill="#dcbf82"/>`;
        break; }
      case 'cozy': { /* pink V-neck cardigan & cream wide trousers */
        defs = grad('cd', '#e8aab1', '#cd8a93') + grad('tr', '#f7efe1', '#e4d6be');
        const puff = `<path d="M70 134 C56 142 52 170 54 206 C55 226 54 244 54 256 L66 258 C68 236 70 214 73 196 C75 176 77 156 81 142Z" fill="url(#${g}cd)" stroke="#a8636e" stroke-width=".8"/><path d="M54 248 L66 250" stroke="#a8636e" stroke-width="3"/>`;
        out = arms + wide(`url(#${g}tr)`, '#d8c8ab') + `<path d="M70 134 C78 128 88 126 93 126 L100 160 L107 126 C112 126 122 128 130 134 C134 160 132 186 128 214 L72 214 C68 186 66 160 70 134Z" fill="url(#${g}cd)"/>`
          + `<path d="M93 126 L100 160 L107 126" fill="url(#${g}sk)"/><path d="M93 126 L100 160 L107 126" stroke="#a8636e" stroke-width="1.4" fill="none"/><path d="M100 160 L100 214" stroke="#a8636e" stroke-width="1"/>`
          + `<g fill="#c9a96a"><circle cx="100" cy="170" r="1.5"/><circle cx="100" cy="184" r="1.5"/><circle cx="100" cy="198" r="1.5"/></g><path d="M76 146 L76 210 M84 140 L84 212 M116 140 L116 212 M124 146 L124 210" stroke="#a8636e" stroke-width=".6" opacity=".6"/><path d="M72 208 L128 208" stroke="#a8636e" stroke-width="1.6" opacity=".7"/>`
          + puff + mirror(puff);
        break; }
      case 'denim': { /* denim jacket over white tee, wide jeans */
        defs = grad('dn', '#6584aa', '#4c6a90') + grad('jn', '#6584aa', '#4f6d93');
        const side = `<path d="M70 134 C78 128 88 126 93 127 L94 214 L72 214 C68 188 66 160 70 134Z" fill="url(#${g}dn)"/><path d="M78 150 L91 150 L91 162 L84 165 L78 162Z" fill="none" stroke="#3a5274" stroke-width="1"/><path d="M93 127 L85 146 L93 152" stroke="#3a5274" stroke-width="1.2" fill="none"/><path d="M73 204 L94 204" stroke="#3a5274" stroke-width="1"/>`;
        out = arms + wide(`url(#${g}jn)`, '#3e5a7e') + waist('#5a3424') + tee('#fdfcf9', '#e6e0d6') + neckline('#e6e0d6') + longSleeve(`url(#${g}dn)`, '#3a5274')
          + `<path d="M55 230 L68 233 L67 245 L54 242Z" fill="#9db1c9"/>` + mirror(`<path d="M55 230 L68 233 L67 245 L54 242Z" fill="#9db1c9"/>`) + side + mirror(side);
        break; }
      case 'academia': { /* olive V-neck cable-knit sweater & white maxi skirt */
        defs = grad('sw', '#7a8a4c', '#5f6d38') + grad('sk2', '#fffdf8', '#efe8dc');
        const puff = `<path d="M70 134 C56 142 52 170 54 206 C55 226 54 244 54 256 L66 258 C68 236 70 214 73 196 C75 176 77 156 81 142Z" fill="url(#${g}sw)" stroke="#4e5a2e" stroke-width=".8"/><path d="M54 248 L66 250" stroke="#4e5a2e" stroke-width="3.5"/>`;
        const cable = `<path d="M84 150 C88 156 80 162 84 168 C88 174 80 180 84 186 C88 192 80 198 84 204" stroke="#4e5a2e" stroke-width="1.1" fill="none"/><path d="M76 152 L76 206" stroke="#4e5a2e" stroke-width=".7" opacity=".7"/>`;
        out = arms + legs(430) + longSkirt(`url(#${g}sk2)`, '#ddd3c2', 432, 156) + `<path d="M70 134 C78 128 88 126 93 126 L100 150 L107 126 C112 126 122 128 130 134 C134 160 132 186 128 210 L72 210 C68 186 66 160 70 134Z" fill="url(#${g}sw)"/>`
          + `<path d="M93 126 L100 150 L107 126" fill="url(#${g}sk)"/><path d="M93 126 L100 150 L107 126" stroke="#4e5a2e" stroke-width="2" fill="none"/>` + cable + mirror(cable) + `<path d="M72 204 L128 204" stroke="#4e5a2e" stroke-width="2.2" opacity=".8"/>` + puff + mirror(puff)
          + `<path d="M94 130 C96 140 104 140 106 130" stroke="#c9a96a" stroke-width=".8" fill="none"/><path d="M100 140 L98.8 142.6 L100 145.2 L101.2 142.6Z" fill="#dcbf82"/>`;
        break; }
      case 'preppy': { /* «Modern Classic»: white long-sleeve top with navy stripes, black high-waisted wide trousers, black belt */
        defs = grad('st', '#ffffff', '#efebe4') + grad('tr', '#26262c', '#141418');
        const stripes = `<g stroke="#26304d" stroke-width="2.6"><path d="M71 150 L129 150"/><path d="M70 162 L130 162"/><path d="M70 174 L130 174"/><path d="M71 186 L129 186"/><path d="M62 150 L70 150 M60 166 L69 166 M59 182 L69 182 M58 198 L68 198 M58 214 L67 214 M57 230 L67 230"/><path d="M130 150 L138 150 M131 166 L140 166 M131 182 L141 182 M132 198 L142 198 M133 214 L142 214 M133 230 L143 230"/></g>`;
        out = arms + `<path d="M78 192 L122 192 C127 276 134 360 138 444 L104 444 L100 252 L96 444 L62 444 C66 360 73 276 78 192Z" fill="url(#${g}tr)"/><path d="M100 254 L100 442 M88 214 C84 300 78 380 74 442 M112 214 C116 300 122 380 126 442" stroke="#0a0a0d" stroke-width="1.1" fill="none"/>`
          + tee(`url(#${g}st)`, '#dcd6cc') + longSleeve(`url(#${g}st)`, '#dcd6cc') + `<path d="M92 126 C95 132 105 132 108 126" stroke="#dcd6cc" stroke-width="1.4" fill="none"/>` + stripes
          + `<path d="M78 192 L122 192 L122.6 212 L77.4 212Z" fill="url(#${g}tr)"/><path d="M78 190 L122 190 L122.3 196 L77.7 196Z" fill="#0d0c10"/><rect x="96.5" y="189" width="7" height="8" rx="1" fill="none" stroke="#c9a96a" stroke-width="1.2"/>`
          + `<path d="M118 128 C124 160 130 196 134 222" stroke="#e6dccb" stroke-width="2.4" fill="none"/>`;
        break; }
      case 'lavender': { /* «Lavender Bloom»: lavender floral maxi dress, square neck, puff sleeves, tiered hem */
        defs = grad('lv', '#e2d6ec', '#c9b6da');
        const puff = `<path d="M70 134 C56 140 52 164 54 200 C55 226 54 244 55 252 L67 254 C68 232 70 210 73 192 C75 172 77 154 81 142Z" fill="url(#${g}lv)" stroke="#ad97c2" stroke-width=".8"/><path d="M54 248 C58 254 64 255 68 251" stroke="#ad97c2" stroke-width="2.2" fill="none"/>`;
        const flowers = `<g fill="#b39acb" opacity=".8"><circle cx="82" cy="150" r="2.2"/><circle cx="92" cy="176" r="2"/><circle cx="80" cy="196" r="2.3"/><circle cx="84" cy="240" r="2.6"/><circle cx="72" cy="290" r="2.4"/><circle cx="90" cy="320" r="2.6"/><circle cx="76" cy="360" r="2.5"/><circle cx="62" cy="170" r="1.8"/><circle cx="60" cy="214" r="1.8"/></g><g fill="#f3ecf7" opacity=".9"><circle cx="88" cy="160" r="1.4"/><circle cx="86" cy="270" r="1.6"/><circle cx="70" cy="330" r="1.6"/></g>`;
        out = arms + legs(420) + longSkirt(`url(#${g}lv)`, '#ad97c2', 424, 156) + `<path d="M50 372 C80 380 120 380 150 372 M46 404 C80 412 120 412 154 404" stroke="#ad97c2" stroke-width="1.4" fill="none"/>`
          + tee(`url(#${g}lv)`, '#ad97c2') + longSleeve(`url(#${g}lv)`, '#ad97c2') + puff + mirror(puff) + flowers + mirror(flowers)
          + `<path d="M90 128 L90 140 L110 140 L110 128" fill="url(#${g}sk)"/><path d="M89 127 L89 141 L111 141 L111 127" stroke="#ad97c2" stroke-width="1.4" fill="none"/><path d="M76 200 L124 200" stroke="#ad97c2" stroke-width="1.6"/>`;
        break; }
      case 'flamenca': { /* Rocío (Home mentor): burgundy traje de flamenca — fitted polka-dot bodice and skirt, elbow ruffles, three-tier ruffled hem */
        defs = grad('fl', '#a3283a', '#76192a') + grad('rf', '#9a2235', '#6a1424');
        const dots = pts => `<g fill="#f7ece2">${pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r || 1.6}"/>`).join('')}</g>`;
        const tier = (y0, y1, w0, w1, n) => { let d = `M${100 - w0} ${y0} L${100 + w0} ${y0} L${100 + w1} ${y1}`; const step = (2 * w1) / n; for (let k = 0; k < n; k++) { const x0 = 100 + w1 - k * step, x1 = x0 - step; d += ` Q${(x0 + x1) / 2} ${y1 + 7} ${x1} ${y1}`; } d += 'Z'; let folds = ''; for (let k = 1; k < n; k++) { const xb = 100 - w1 + k * step, xt = 100 - w0 + k * (2 * w0 / n); folds += `M${xt} ${y0 + 2} L${xb} ${y1 + 2} `; } return `<path d="${d}" fill="url(#${g}rf)" stroke="#5a1020" stroke-width=".8"/><path d="${folds}" stroke="#5a1020" stroke-width=".9" opacity=".45" fill="none"/><path d="${d.replace(/^M[^L]+L[^L]+L[^Q]+/, `M${100 + w1} ${y1}`).replace(/Z$/, '')}" stroke="#d9a0a6" stroke-width="1.2" fill="none" opacity=".7"/>`; };
        const sleeve = `<path d="M70 134 C63 146 59 164 58 184 C63 188 70 188 74 184 C74 166 76 150 80 141Z" fill="url(#${g}fl)" stroke="#5a1020" stroke-width=".8"/>`
          + `<path d="M58 180 C50 186 46 196 48 204 C54 200 60 202 64 198 C68 202 74 200 78 194 C77 188 76 184 74 182Z" fill="url(#${g}rf)" stroke="#5a1020" stroke-width=".8"/>`
          + `<path d="M50 196 C44 204 43 214 47 220 C52 214 58 216 62 211 C67 215 74 212 78 205 C76 199 70 196 64 198Z" fill="url(#${g}rf)" stroke="#5a1020" stroke-width=".8"/><path d="M47 220 C52 214 58 216 62 211 C67 215 74 212 78 205" stroke="#d9a0a6" stroke-width="1.1" fill="none" opacity=".7"/>`
          + dots([[66, 150, 1.4], [64, 168, 1.4], [72, 160, 1.3]]);
        out = arms
          + tier(404, 444, 48, 68, 9) + tier(366, 410, 36, 54, 8) + tier(330, 372, 25, 40, 7)
          + `<path d="M80 202 L120 202 C124 246 126 292 125 334 L75 334 C74 292 76 246 80 202Z" fill="url(#${g}fl)"/><path d="M92 216 C90 270 88 300 87 332 M108 216 C110 270 112 300 113 332" stroke="#5a1020" stroke-width=".9" opacity=".4" fill="none"/>`
          + dots([[86, 220], [100, 232], [114, 222], [92, 250], [108, 256], [84, 278], [100, 284], [116, 276], [90, 306], [110, 310], [100, 326, 1.4]])
          + dots([[80, 346], [100, 352], [120, 346], [70, 386], [90, 392], [110, 392], [130, 386], [62, 426], [84, 432], [116, 432], [138, 426], [100, 424]])
          + tee(`url(#${g}fl)`, '#5a1020') + sleeve + mirror(sleeve)
          + `<path d="M88 127 C92 134 96 142 100 148 C104 142 108 134 112 127 C108 125 104 131 100 132 C96 131 92 125 88 127Z" fill="url(#${g}sk)"/><path d="M88 127 C92 134 96 142 100 148 C104 142 108 134 112 127" stroke="#5a1020" stroke-width="1.4" fill="none"/>`
          + dots([[80, 146], [120, 146], [86, 166], [100, 172], [114, 166], [80, 186], [94, 192], [106, 192], [120, 186]])
          + `<path d="M79 199 L121 199 L121.5 205 L78.5 205Z" fill="#5a1020" opacity=".55"/>`;
        break; }
      case 'educator': { /* Valeria (Study Plan mentor): camel blazer, ivory blouse, dusty-pink scarf, navy wide trousers */
        defs = grad('jk', '#cfae86', '#b08d64') + grad('tr', '#2f3a58', '#1f2740');
        const lap = `<path d="M70 134 C78 128 88 126 93 126 L98 172 L95 228 L72 228 C68 194 66 158 70 134Z" fill="url(#${g}jk)"/><path d="M93 126 L87 150 L97 172" stroke="#94734d" stroke-width="1.2" fill="none"/>`;
        out = arms + wide(`url(#${g}tr)`, '#141b30') + waist('#1a1622') + tee('#fbf7ef', '#e3dacb') + longSleeve(`url(#${g}jk)`, '#94734d') + lap + mirror(lap)
          + `<path d="M90 124 C95 131 105 131 110 124 L106 134 C104 146 101 156 99 164 L95 162 C96 152 97 142 96 134Z" fill="#d9a7ab"/><path d="M96 134 L93 168 L99 166Z" fill="#c9959a"/>` + `<circle cx="96" cy="200" r="1.5" fill="#c9a96a"/>`;
        break; }
      /* ---------- mentor outfits (character sheets supplied by Kait) ---------- */
      case 'guide-vest': { /* Dani: linen shirt, tweed vest, burgundy scarf, light trousers */
        defs = grad('sh', '#fbf6ec', '#e7dccb') + grad('vs', '#8f6e50', '#6a4e37') + grad('tr', '#efe5d2', '#d6c7aa') + grad('sc', '#8e2c3c', '#6c1f2c');
        const panel = `<path d="M72 136 C80 130 88 128 93 129 L99 176 L97 210 L76 210 C72 188 70 160 72 136Z" fill="url(#${g}vs)"/>`;
        out = arms + trousers(`url(#${g}tr)`, '#c3b293') + waist('#5a3a26') + `<rect x="96" y="199" width="8" height="8" rx="1" fill="none" stroke="#b8955a" stroke-width="1.2"/>` + tee(`url(#${g}sh)`, '#d9cdb9') + longSleeve(`url(#${g}sh)`, '#d9cdb9') + `<path d="M56 236 L67 238" stroke="#e2d6c3" stroke-width="5"/>` + mirror(`<path d="M56 236 L67 238" stroke="#e2d6c3" stroke-width="5"/>`)
          + panel + mirror(panel) + `<path d="M80 150 L94 150 M78 168 L96 168 M77 186 L97 186" stroke="#5c4330" stroke-width=".6" opacity=".6"/>` + mirror(`<path d="M80 150 L94 150 M78 168 L96 168 M77 186 L97 186" stroke="#5c4330" stroke-width=".6" opacity=".6"/>`)
          + `<circle cx="97" cy="160" r="1.3" fill="#3e2b1e"/><circle cx="97" cy="176" r="1.3" fill="#3e2b1e"/><circle cx="97" cy="192" r="1.3" fill="#3e2b1e"/>`
          + `<path d="M86 124 C92 134 108 134 114 124 C119 131 116 140 106 144 C100 146 94 145 89 142 C83 138 82 130 86 124Z" fill="url(#${g}sc)"/><path d="M90 138 L83 204 L95 206 L98 143Z" fill="url(#${g}sc)"/><path d="M84 204 L83 212 M87 205 L86 213 M90 205 L90 213 M93 206 L93 214" stroke="#6c1f2c" stroke-width="1"/>`
          + `<path d="M118 128 C104 160 86 194 72 214" stroke="#7a4a2c" stroke-width="3" fill="none"/>`;
        break; }
      case 'classic-vest': { /* Marga: puff-sleeve blouse, burgundy vest, silk neck scarf, pleated cream skirt */
        defs = grad('bl', '#fdf9f1', '#ece3d3') + grad('vs', '#8a2534', '#6a1a27') + grad('sk2', '#f6eee0', '#e3d6bf');
        const puff = `<path d="M70 134 C57 140 53 160 56 180 C61 186 69 186 74 180 C74 162 76 148 80 140Z" fill="url(#${g}bl)" stroke="#dcd0bc" stroke-width=".8"/>`;
        const vest = `<path d="M74 138 C82 132 88 130 93 131 L99 170 L97 204 L78 204 C74 184 72 160 74 138Z" fill="url(#${g}vs)"/>`;
        out = arms + legs(430) + longSkirt(`url(#${g}sk2)`, '#d8c9ad', 432, 150) + `<path d="M84 214 L72 426 M90 214 L84 430 M96 214 L94 432 M104 214 L106 432 M110 214 L116 430 M116 214 L128 426" stroke="#e0d3bb" stroke-width="1.1"/>`
          + tee(`url(#${g}bl)`, '#dcd0bc') + longSleeve(`url(#${g}bl)`, '#dcd0bc') + puff + mirror(puff) + vest + mirror(vest)
          + `<circle cx="97.5" cy="156" r="1.5" fill="#c9a96a"/><circle cx="97.5" cy="170" r="1.5" fill="#c9a96a"/><circle cx="97.5" cy="184" r="1.5" fill="#c9a96a"/>` + waist('#5a3424')
          + `<path d="M90 124 C95 132 105 132 110 124 L104 136 L112 150 L101 141 L99 141 L88 150 L96 136Z" fill="#f4e6d2" stroke="#8a2534" stroke-width="1.2"/><circle cx="100" cy="135" r="3" fill="#8a2534"/>`;
        break; }
      case 'pink-blazer': { /* Pilar: rose blazer, cream blouse, cream wide trousers */
        defs = grad('jk', '#e6aeaa', '#cf8f8c') + grad('tr', '#f6eee0', '#e2d4bc');
        const lap = `<path d="M70 134 C78 128 88 126 93 126 L98 172 L95 220 L72 220 C68 190 66 158 70 134Z" fill="url(#${g}jk)"/><path d="M93 126 L87 150 L97 170" stroke="#b97875" stroke-width="1.2" fill="none"/>`;
        out = arms + `<path d="M79 202 L121 202 C126 280 134 360 138 444 L104 444 L100 252 L96 444 L62 444 C66 360 74 280 79 202Z" fill="url(#${g}tr)"/><path d="M100 254 L100 442 M88 220 C84 300 78 380 74 442 M112 220 C116 300 122 380 126 442" stroke="#d8c8ab" stroke-width="1.1" fill="none"/>`
          + waist('#5a3424') + tee('#fbf7ef', '#e3dacb') + `<path d="M93 126 L100 146 L107 126" stroke="#e3dacb" stroke-width="1.2" fill="none"/>` + longSleeve(`url(#${g}jk)`, '#b97875') + lap + mirror(lap)
          + `<circle cx="96" cy="196" r="1.5" fill="#c9a96a"/>`;
        break; }
      case 'shawl-chic': { /* Adrián (men's version of «Cultural Chic»): cream shirt, embroidered shawl, navy trousers */
        defs = grad('sh', '#fbf6ec', '#e8dfcf') + grad('tr', '#2c3654', '#1f2740') + grad('sw', '#26304d', '#1b2238');
        const shawl = `<path d="M92 126 C82 128 70 132 64 142 C58 166 56 196 58 226 C66 232 74 232 80 226 C80 196 84 166 92 146Z" fill="url(#${g}sw)"/><path d="M64 146 C60 170 59 198 60 222 M70 140 C66 168 65 196 66 228 M78 136 C74 166 73 196 74 228" stroke="#c97d6e" stroke-width="2.2" stroke-dasharray="3 4" fill="none"/><path d="M62 150 C64 180 64 204 63 224" stroke="#efd9c0" stroke-width="1.2" stroke-dasharray="1 5" fill="none"/><path d="M58 226 L58 236 M62 228 L62 238 M66 229 L66 239 M70 230 L70 240 M74 229 L74 239 M78 228 L78 238" stroke="#efe2cc" stroke-width="1.2"/>`;
        out = arms + (male ? trousers(`url(#${g}tr)`, '#141a2c') : legs(430) + longSkirt(`url(#${g}tr)`, '#141a2c', 432, 150)) + waist('#1b2238') + `<circle cx="92" cy="212" r="1.6" fill="#c9a96a"/><circle cx="108" cy="212" r="1.6" fill="#c9a96a"/><circle cx="92" cy="222" r="1.6" fill="#c9a96a"/><circle cx="108" cy="222" r="1.6" fill="#c9a96a"/>`
          + tee(`url(#${g}sh)`, '#dacfbd') + longSleeve(`url(#${g}sh)`, '#dacfbd') + `<path d="M100 132 L100 198 M97 140 C99 142 101 142 103 140 M97 152 C99 154 101 154 103 152 M97 164 C99 166 101 166 103 164" stroke="#d6cab5" stroke-width=".9" fill="none"/>` + `<path d="M93 126 L97 120 L100 128 L103 120 L107 126" fill="#fbf6ec" stroke="#d6cab5" stroke-width=".8"/>`
          + shawl + mirror(shawl);
        break; }
      case 'plaid-blazer': { /* Lola: tan plaid blazer, cream turtleneck, dark brown trousers */
        defs = grad('jk', '#c8a983', '#a98a64') + grad('tr', '#4e3528', '#3a271d');
        const lap = `<path d="M70 134 C78 128 88 126 93 127 L98 172 L95 226 L71 226 C67 192 66 158 70 134Z" fill="url(#${g}jk)"/><path d="M93 127 L86 152 L97 172" stroke="#8a6c4a" stroke-width="1.2" fill="none"/>`;
        const plaid = `<path d="M74 150 L94 150 M72 170 L96 170 M71 190 L96 190 M72 210 L95 210 M78 136 L76 224 M86 130 L86 224" stroke="#7d5f40" stroke-width=".7" opacity=".55"/><path d="M73 160 L95 160 M72 200 L96 200" stroke="#e9dcc4" stroke-width=".6" opacity=".6"/>`;
        out = arms + `<path d="M79 202 L121 202 C125 280 131 360 134 444 L104 444 L100 252 L96 444 L66 444 C69 360 75 280 79 202Z" fill="url(#${g}tr)"/><path d="M100 254 L100 442" stroke="#2a1c14" stroke-width="1.1"/>`
          + waist('#2a1c14') + tee('#f6efe2', '#e0d5c2') + `<path d="M91 116 L109 116 L110 130 C104 133 96 133 90 130Z" fill="#f6efe2" stroke="#e0d5c2" stroke-width=".8"/><path d="M92 120 L108 120 M92 124 L108 124" stroke="#e3d8c6" stroke-width=".7"/>`
          + longSleeve(`url(#${g}jk)`, '#8a6c4a') + lap + plaid + mirror(lap + plaid) + `<path d="M118 128 C126 160 132 196 136 222" stroke="#7a4a2c" stroke-width="2.4" fill="none"/>`;
        break; }
      case 'floral-romantic': { /* Ana: floral puff-sleeve blouse, burgundy skirt with a sash bow */
        defs = grad('bl', '#fbf3ea', '#eee0d2') + grad('sk2', '#a53a48', '#7e2532');
        const puff = `<path d="M70 134 C56 140 52 162 55 184 C60 191 70 191 75 184 C75 164 77 148 81 140Z" fill="url(#${g}bl)" stroke="#e2cfbf" stroke-width=".8"/>`;
        const dots = `<g fill="#e09aa0"><circle cx="82" cy="146" r="1.6"/><circle cx="90" cy="160" r="1.4"/><circle cx="80" cy="176" r="1.6"/><circle cx="88" cy="190" r="1.3"/><circle cx="62" cy="160" r="1.5"/><circle cx="66" cy="176" r="1.3"/><circle cx="60" cy="210" r="1.4"/><circle cx="63" cy="232" r="1.3"/></g>`;
        out = arms + legs(430) + longSkirt(`url(#${g}sk2)`, '#6e1f2b', 432, 154) + tee(`url(#${g}bl)`, '#e2cfbf') + longSleeve(`url(#${g}bl)`, '#e2cfbf') + puff + mirror(puff) + dots + mirror(dots)
          + `<path d="M93 126 C96 133 104 133 107 126" stroke="#e2b9b6" stroke-width="1.6" fill="none"/>`
          + `<path d="M78 196 L122 196 L122.5 210 L77.5 210Z" fill="#9a3341"/><path d="M110 203 L126 192 L124 212Z M110 203 L118 236 L108 232Z M110 203 L104 238 L98 234Z" fill="#8e2c3c"/><circle cx="110" cy="203" r="3.2" fill="#7a2331"/>`;
        break; }
      case 'burgundy-dress': case 'green-dress': { /* Neus: long dress (burgundy or light green), square neckline, puff sleeves, belt */
        const green = a.outfit === 'green-dress', ln = green ? '#86b293' : '#4e161e';
        defs = green ? grad('dr', '#d3ead8', '#acd0b6') : grad('dr', '#7e2a33', '#5e1c25');
        const puff = `<path d="M70 134 C58 138 54 156 56 176 C62 182 70 182 75 176 C75 158 77 146 81 140Z" fill="url(#${g}dr)" stroke="${ln}" stroke-width=".8"/>`;
        out = arms + legs(408) + longSkirt(`url(#${g}dr)`, ln, 410, 158) + tee(`url(#${g}dr)`, ln) + longSleeve(`url(#${g}dr)`, ln) + puff + mirror(puff)
          + `<path d="M90 128 L90 140 L110 140 L110 128" fill="url(#${g}sk)"/><path d="M89 127 L89 141 L111 141 L111 127" stroke="${ln}" stroke-width="1.4" fill="none"/>`
          + `<path d="M78 196 L122 196 L122.5 203 L77.5 203Z" fill="#3a2118"/><rect x="104" y="195" width="7" height="9" rx="1" fill="none" stroke="#c9a96a" stroke-width="1.2"/>`;
        break; }
      case 'denim-shirt': { /* Marc (men's version of «Denim Style»): denim shirt, cream wide trousers, belt */
        defs = grad('dn', '#4a6488', '#3a5274') + grad('tr', '#f6eee0', '#e2d4bc');
        const pocket = `<path d="M80 148 L94 148 L94 162 L87 165 L80 162Z" fill="none" stroke="#2c4060" stroke-width="1"/><path d="M79 146 L95 146" stroke="#2c4060" stroke-width="2"/><circle cx="87" cy="150" r="1.2" fill="#c9a96a"/>`;
        out = arms + `<path d="M79 202 L121 202 C126 280 134 360 138 444 L104 444 L100 252 L96 444 L62 444 C66 360 74 280 79 202Z" fill="url(#${g}tr)"/><path d="M100 254 L100 442 M88 220 C84 300 78 380 74 442 M112 220 C116 300 122 380 126 442" stroke="#d8c8ab" stroke-width="1.1" fill="none"/>`
          + waist('#5a3424') + `<rect x="96" y="198.5" width="8" height="9" rx="1" fill="none" stroke="#c9a96a" stroke-width="1.2"/>` + tee(`url(#${g}dn)`, '#2c4060') + longSleeve(`url(#${g}dn)`, '#2c4060')
          + `<path d="M55 222 L68 225 L67 236 L54 233Z" fill="#7d93b0"/>` + mirror(`<path d="M55 222 L68 225 L67 236 L54 233Z" fill="#7d93b0"/>`)
          + `<path d="M93 126 L97 120 L100 130 L103 120 L107 126" fill="#4a6488" stroke="#2c4060" stroke-width=".8"/><path d="M100 130 L100 198" stroke="#2c4060" stroke-width=".9"/><circle cx="100" cy="146" r="1.2" fill="#c9a96a"/><circle cx="100" cy="162" r="1.2" fill="#c9a96a"/><circle cx="100" cy="178" r="1.2" fill="#c9a96a"/>`
          + pocket + mirror(pocket);
        break; }
      default: /* tee-skirt — fitted white T-shirt & long flowing black skirt */
        defs = grad('top', '#ffffff', '#ebe6de') + `<linearGradient id="${g}bot" x1="0" x2="1"><stop offset="0" stop-color="#121014"/><stop offset=".4" stop-color="#2c2832"/><stop offset=".7" stop-color="#1b181f"/><stop offset="1" stop-color="#0f0d11"/></linearGradient>`;
        out = arms + legs(426) + longSkirt(`url(#${g}bot)`, '#3d3844', 430, 152) + waist('#141217') + tee(`url(#${g}top)`, '#e0dad0') + shortSleeve(`url(#${g}top)`, '#e0dad0') + neckline('#e0dad0') + `<path d="M79 200 C88 203 112 203 121 200" stroke="#dcd5ca" stroke-width="1" fill="none"/>`;
    }
    return { defs, out };
  }
  function shoes(s) {
    const pair = x => x + mirror(x);
    switch (s) {
      case 'sneakers': return pair(`<path d="M88 441 C88 436 98 436 99 441 L99 451 L83 451 C81 447 84 443 88 441Z" fill="#fbfbf8" stroke="#cfc8bc" stroke-width=".8"/><path d="M83 451 L99 451" stroke="#bdb5a8" stroke-width="2.4"/>`);
      case 'loafers': return pair(`<path d="M88 442 C89 437 98 437 99 442 L99 450 C93 452 86 452 83 450 C83 446 85 443 88 442Z" fill="#a87a4e"/><path d="M89 443 L97 443" stroke="#7d5636" stroke-width="1.6"/>`);
      case 'oxford': return pair(`<path d="M88 442 C89 437 98 437 99 442 L99 450 C93 452 85 452 82 450 C82 446 85 443 88 442Z" fill="#7a4a2c"/><path d="M89 441 L97 441 M90 444 L96 444" stroke="#4e2e1a" stroke-width=".9"/>`);
      case 'loafers-cream': return pair(`<path d="M88 442 C89 437 98 437 99 442 L99 450 C93 452 86 452 83 450 C83 446 85 443 88 442Z" fill="#f2eadc" stroke="#cdbfa6" stroke-width=".8"/><path d="M89 443 L97 443" stroke="#cdbfa6" stroke-width="1.4"/>`);
      case 'loafers-dark': return pair(`<path d="M88 442 C89 437 98 437 99 442 L99 450 C93 452 86 452 83 450 C83 446 85 443 88 442Z" fill="#2e1c18"/><path d="M89 443 L97 443" stroke="#c9a96a" stroke-width="1.3"/>`);
      case 'loafers-white': return pair(`<path d="M88 442 C89 437 98 437 99 442 L99 450 C93 452 86 452 83 450 C83 446 85 443 88 442Z" fill="#fbfaf7" stroke="#cfc8bc" stroke-width=".8"/><path d="M89 443 L97 443" stroke="#cfc8bc" stroke-width="1.4"/>`);
      case 'flats-beige': return pair(`<path d="M89 443 C90 439 98 439 98.5 443 L98.5 449 C93 452 86 452 83.5 449.5 C83.5 446 86 444 89 443Z" fill="#efe2cc" stroke="#cdbb9c" stroke-width=".7"/><path d="M90 443.5 C92.5 445.5 95.5 445.5 97 443.5" stroke="#cdbb9c" stroke-width="1" fill="none"/>`);
      case 'boots': return pair(`<path d="M89 418 L98.5 418 L99 451 L82 451 C82 445 87 443 89 440Z" fill="#4a3428"/>`);
      default: return pair(`<path d="M89 443 C90 439 98 439 98.5 443 L98.5 449 C93 452 86 452 83.5 449.5 C83.5 446 86 444 89 443Z" fill="#141216"/><path d="M90.5 442.5 C92.5 444 95.5 444 97 442.5" stroke="#4a4550" stroke-width="1" fill="none"/>`);
    }
  }
  function brows(a, male) {
    const one = `<path d="M84.2 ${male ? 69.4 : 69.8} C87.2 ${male ? 67.6 : 68.4} 91.6 ${male ? 67.4 : 68.1} 94.8 ${male ? 68.8 : 69.2}" stroke="${shade(a.hairColor, -18)}" stroke-width="${male ? 1.9 : 1.1}" fill="none" stroke-linecap="round"/>`;
    return `<g opacity=".7">${one}${mirror(one)}</g>`;
  }
  function face(a, g, male) {
    const sk = a.skin, sd = shade(sk, -24), sdd = shade(sk, -48), eye = a.eyes;
    const jaw = male ? 'M77 74 C77 55 87 45 100 45 C113 45 123 55 123 74 C123 90 119 100 113 106 C108 111 104 113 100 113 C96 113 92 111 87 106 C81 100 77 90 77 74Z'
      : 'M78 74 C78 55 88 45 100 45 C112 45 122 55 122 74 C122 89 118 99 111 106 C107 110 103 112.5 100 112.5 C97 112.5 93 110 89 106 C82 99 78 89 78 74Z';
    const eyeP = 'M82.6 84 C84.2 80.6 87 79.6 90 79.7 C93 79.8 95.3 81 96.2 83.5 C94.6 86.5 92.1 87.9 89.4 87.9 C86.5 87.9 84.1 86.6 82.6 84Z';
    const oneEye = `<path d="${eyeP}" fill="#fffaf6"/><g clip-path="url(#${g}ec)"><circle cx="89.6" cy="84" r="4.5" fill="url(#${g}ir)"/><circle cx="89.6" cy="84.3" r="2" fill="#24140f"/><path d="M85.2 81 C87 79.8 92 79.8 94.2 81 L94.2 82.4 L85.2 82.4Z" fill="#000" opacity=".18"/></g>
      <circle cx="91.2" cy="82.4" r="1.25" fill="#fff"/><circle cx="88" cy="86" r=".6" fill="#fff" opacity=".85"/>
      <path d="M81.8 83.4 C83.6 79.4 87 78.1 90.2 78.3 C93 78.5 95 79.8 95.9 82" stroke="#2a1a1c" stroke-width="${male ? 1.3 : 1.5}" fill="none" stroke-linecap="round"/><path d="M82.2 82 C84 79.6 86.6 78.8 89 78.8" stroke="#2a1a1c" stroke-width="${male ? .6 : 1.2}" fill="none" stroke-linecap="round"/>
      ${male ? '' : '<path d="M82 83.2 L80.9 82.1" stroke="#2a1a1c" stroke-width="1" stroke-linecap="round"/>'}
      <path d="M84.2 77.4 C87.2 76 92 76.2 95.4 78" stroke="${sdd}" stroke-width=".7" fill="none" opacity=".55"/>
      <path d="M84.4 86.9 C86.8 88.3 91 88.5 94.4 86.6" stroke="${sdd}" stroke-width=".6" fill="none" opacity=".5"/>
`;
    const eyeG = `<g transform="translate(88 84) scale(1.06) translate(-89.5 -84)">${oneEye}</g>`;
    return `<path d="M93 100 L107 100 L108 128 C104 131 96 131 92 128Z" fill="url(#${g}sk)"/><path d="M93 104 C96 111 104 111 107 104 L107.4 113 C104 116 96 116 92.6 113Z" fill="${sd}" opacity=".55"/>
      <ellipse cx="78.4" cy="86" rx="3" ry="5.6" fill="${sk}"/><ellipse cx="121.6" cy="86" rx="3" ry="5.6" fill="${sk}"/><path d="M78 83 C77 86 77.5 89 79 90 M122 83 C123 86 122.5 89 121 90" stroke="${sd}" stroke-width=".8" fill="none"/>
      <path d="${jaw}" fill="url(#${g}fc)"/>
      <path d="M80 92 C82 100 86 105 90 108" stroke="${sd}" stroke-width=".8" fill="none" opacity=".35"/>
      ${eyeG}${mirror(eyeG)}
      <path d="M100.7 91.8 C101.4 94.6 101 96.4 99.4 96.9" stroke="${sd}" stroke-width=".9" fill="none" stroke-linecap="round"/><ellipse cx="99.6" cy="92.2" rx=".8" ry="1.7" fill="#fff" opacity=".45"/>
      ${male ? `<path d="M95.4 103.4 C98 104.6 102 104.6 104.6 103.4" stroke="#9a5c5e" stroke-width="1.1" fill="none" stroke-linecap="round"/>`
        : `<path d="M95.5 103.2 C98 104.9 102 104.9 104.5 103.2 C102.6 106.6 97.4 106.6 95.5 103.2Z" fill="#e7a0a4"/><path d="M95.5 103.2 C98 104.8 102 104.8 104.5 103.2" stroke="#b5636b" stroke-width="1" fill="none" stroke-linecap="round"/><ellipse cx="100.6" cy="105" rx="1.4" ry=".5" fill="#fff" opacity=".5"/>
           <ellipse cx="85.6" cy="94.5" rx="5" ry="2.4" fill="#f29c9e" opacity=".28"/><ellipse cx="114.4" cy="94.5" rx="5" ry="2.4" fill="#f29c9e" opacity=".28"/>`}`;
  }
  function accessories(acc) {
    let s = '';
    if (acc.includes('necklace')) s += `<path d="M90 128 C94 141 106 141 110 128" fill="none" stroke="#c9a96a" stroke-width="1"/><path d="M100 139 L98.2 142 L100 145 L101.8 142Z" fill="#dcbf82" stroke="#a8884e" stroke-width=".5"/>`;
    if (acc.includes('earrings')) s += `<circle cx="78.6" cy="93" r="1.9" fill="#fffaf0" stroke="#d8cdb8" stroke-width=".5"/><circle cx="121.4" cy="93" r="1.9" fill="#fffaf0" stroke="#d8cdb8" stroke-width=".5"/>`;
    if (acc.includes('glasses')) s += `<rect x="81" y="78" width="17" height="12" rx="5.5" fill="none" stroke="#b39463" stroke-width="1.2"/><rect x="102" y="78" width="17" height="12" rx="5.5" fill="none" stroke="#b39463" stroke-width="1.2"/><path d="M98 83 L102 83" stroke="#b39463" stroke-width="1.2"/>`;
    if (acc.includes('ribbon')) s += `<path d="M120 54 L133 47 L131 62Z M120 54 L126 67 L113 63Z" fill="#c9858f"/><circle cx="121" cy="56" r="2.6" fill="#a8606e"/>`;
    if (acc.includes('sunglasses')) s += `<ellipse cx="89" cy="41" rx="7.5" ry="4.4" fill="#7a5644" stroke="#c9a96a" stroke-width="1"/><ellipse cx="111" cy="41" rx="7.5" ry="4.4" fill="#7a5644" stroke="#c9a96a" stroke-width="1"/><path d="M85 39.5 L88 38.5 M107 39.5 L110 38.5" stroke="#fff" stroke-width="1" opacity=".6"/><path d="M96.5 40 C98 38.6 102 38.6 103.5 40" stroke="#c9a96a" stroke-width="1.2" fill="none"/>`;
    if (acc.includes('earrings-gold')) s += `<circle cx="78.6" cy="92.5" r="1.1" fill="#c9a96a"/><path d="M78.6 93.5 C76.6 96.5 77 99.5 78.6 100 C80.2 99.5 80.6 96.5 78.6 93.5Z" fill="#d9b46a"/><circle cx="121.4" cy="92.5" r="1.1" fill="#c9a96a"/><path d="M121.4 93.5 C119.4 96.5 119.8 99.5 121.4 100 C123 99.5 123.4 96.5 121.4 93.5Z" fill="#d9b46a"/>`;
    if (acc.includes('flor')) s += `<g transform="translate(76 46)"><path d="M-3 6 C-10 10 -14 16 -12 20 C-6 18 -2 13 0 8Z" fill="#5f7d4e"/>${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="0" cy="-6.5" rx="5" ry="6.5" fill="#c62b3e" stroke="#8e1a2b" stroke-width=".7" transform="rotate(${a})"/>`).join('')}${[30, 90, 150, 210, 270, 330].map(a => `<ellipse cx="0" cy="-4" rx="3.4" ry="4.2" fill="#d94656" transform="rotate(${a})"/>`).join('')}<circle r="3" fill="#8e1a2b"/><circle r="1.3" fill="#e9b14f"/></g>`;
    if (acc.includes('earrings-flamenca')) s += [78.6, 121.4].map(x => `<circle cx="${x}" cy="92.6" r="1.1" fill="#c9a96a"/><circle cx="${x}" cy="99" r="4.6" fill="none" stroke="#c9a96a" stroke-width="1.2"/><circle cx="${x}" cy="103.6" r="2.4" fill="#b3263a" stroke="#7a1626" stroke-width=".5"/>`).join('');
    if (acc.includes('bow')) s += `<path d="M118 52 L134 43 L132 62Z M118 52 L125 68 L111 63Z" fill="#8e2c3c"/><circle cx="119" cy="54" r="2.8" fill="#6e1f2b"/>`;
    if (acc.includes('beret-cream')) s += `<path d="M70 52 C69 36 90 29 110 31 C127 33 134 42 131 52 C118 46 92 46 70 52Z" fill="#efe6d4" stroke="#d6c8ae" stroke-width=".8"/><circle cx="103" cy="29" r="2.2" fill="#e2d6be"/>`;
    if (acc.includes('satchel')) s += `<path d="M46 208 L80 208 L78 246 L48 246Z" fill="#8a5634"/><path d="M46 208 L80 208 L79 224 L47 224Z" fill="#a0673f"/><rect x="59" y="220" width="8" height="8" rx="1" fill="none" stroke="#c9a96a" stroke-width="1.2"/>`;
    if (acc.includes('satchel-r')) s += `<path d="M124 216 L152 216 L150 250 L126 250Z" fill="#8a5634"/><path d="M124 216 L152 216 L151 230 L125 230Z" fill="#a0673f"/><rect x="134" y="226" width="7" height="7" rx="1" fill="none" stroke="#c9a96a" stroke-width="1.1"/>`;
    if (acc.includes('book')) s += `<g transform="rotate(8 148 240)"><rect x="136" y="214" width="24" height="34" rx="2" fill="#3a2420"/><path d="M138 216 L138 246" stroke="#c9a96a" stroke-width="1"/></g>`;
    if (acc.includes('beret')) s += `<path d="M66 50 C68 32 92 24 112 28 C130 32 138 42 134 52 C120 46 92 44 66 50Z" fill="#1d1a1f"/><circle cx="104" cy="25" r="2.4" fill="#1d1a1f"/>`;
    if (acc.includes('bag')) s += `<path d="M122 132 C134 180 146 240 152 262" stroke="#8a6a52" stroke-width="2" fill="none"/><path d="M138 258 L170 258 L166 312 L142 312Z" fill="#ead9c0" stroke="#cdb99a"/><path d="M146 276 L162 276" stroke="#c9a96a" stroke-width="2"/>`;
    return s;
  }

  const BODY_ACC = ['bag', 'necklace', 'satchel', 'satchel-r', 'book'];
  MA.avatarSVG = function (a, opts = {}) {
    a = Object.assign({}, MA.DEFAULT_AVATAR, a || {});
    const g = 'v' + (++uid) + '_';
    const male = !!a.male, H2 = HAIR[a.hair] || HAIR.wavy, hc = a.hairColor;
    const hd = shade(hc, -24), hl = shade(hc, 52), sk = a.skin;
    const b = body(a, g, male);
    const vb = opts.portrait ? '48 14 104 128' : '28 8 144 452';
    const size = opts.w ? ` width="${opts.w}" height="${opts.h || opts.w}"${opts.x != null ? ` x="${opts.x}" y="${opts.y}"` : ''}` : '';
    const hairFill = `url(#${g}hr)`;
    const side = H2.side ? `<path d="${H2.side}" fill="${hairFill}"/>${mirror(`<path d="${H2.side}" fill="${hairFill}"/>`)}` : '';
    const st1 = H2.strands ? `<path d="${H2.strands}" stroke="${hd}" stroke-width=".9" fill="none" opacity=".55"/><path d="${H2.strands}" transform="translate(2.2 0)" stroke="${hl}" stroke-width=".8" fill="none" opacity=".35"/>` : ''; const strands = st1 + (H2.oneSide ? '' : mirror(st1));
    return `<svg viewBox="${vb}"${size} xmlns="http://www.w3.org/2000/svg" class="avatar ${opts.cls || ''}" role="img" aria-label="${opts.label || 'Character'}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="${g}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(hc, 14)}"/><stop offset=".55" stop-color="${hc}"/><stop offset="1" stop-color="${hd}"/></linearGradient>
        <linearGradient id="${g}sk" x1="0" x2="1"><stop offset="0" stop-color="${shade(sk, -14)}"/><stop offset=".5" stop-color="${sk}"/><stop offset="1" stop-color="${shade(sk, -14)}"/></linearGradient>
        <radialGradient id="${g}fc" cx=".5" cy=".42" r=".66"><stop offset="0" stop-color="${shade(sk, 8)}"/><stop offset=".8" stop-color="${sk}"/><stop offset="1" stop-color="${shade(sk, -12)}"/></radialGradient>
        <linearGradient id="${g}ir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(a.eyes, -55)}"/><stop offset=".5" stop-color="${a.eyes}"/><stop offset="1" stop-color="${shade(a.eyes, 60)}"/></linearGradient>
        <clipPath id="${g}ec"><path d="M82.6 84 C84.2 80.6 87 79.6 90 79.7 C93 79.8 95.3 81 96.2 83.5 C94.6 86.5 92.1 87.9 89.4 87.9 C86.5 87.9 84.1 86.6 82.6 84Z"/><path transform="translate(200 0) scale(-1 1)" d="M82.6 84 C84.2 80.6 87 79.6 90 79.7 C93 79.8 95.3 81 96.2 83.5 C94.6 86.5 92.1 87.9 89.4 87.9 C86.5 87.9 84.1 86.6 82.6 84Z"/></clipPath>
        ${b.defs}
      </defs>
      ${opts.portrait ? '' : '<ellipse cx="100" cy="452" rx="44" ry="5" fill="#5a3a30" opacity=".1"/>'}
      <g transform="translate(100 128) scale(1.1) translate(-100 -128)">${H2.top ? `<path d="${H2.top}" fill="${hairFill}"/>` : ''}
      <path d="${H2.back}" fill="${hairFill}"/><path d="${H2.back}" fill="#000" opacity=".05"/></g>
      ${b.out}${opts.portrait ? '' : shoes(a.shoes)}
      <g transform="translate(100 128) scale(1.1) translate(-100 -128)">${face(a, g, male)}
      ${side}${strands}
      <path d="${H2.bangs}" fill="${hairFill}"/>${brows(a, male)}
      <path d="M92 44 C86 52 81 64 79 78 M108 44 C114 52 119 64 121 78 M100 47 C98 54 94 60 90 64 M100 47 C102 54 106 60 110 64" stroke="${hd}" stroke-width=".8" fill="none" opacity=".5"/>
      <path d="M83 52 C90 45 110 45 117 52" stroke="${hl}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/><path d="M86 57 C88 55 91 54 93 54 M107 54 C109 54 112 55 114 57" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".35"/>
      ${accessories((a.acc || []).filter(x => !BODY_ACC.includes(x)))}</g>${accessories((a.acc || []).filter(x => BODY_ACC.includes(x)))}
    </svg>`;
  };
})();
