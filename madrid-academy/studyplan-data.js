/* =====================================================================
   STUDY PLAN · data — mentor Valeria, «La historia del español»,
   «El español en el mundo» (20 countries + Puerto Rico), roadmap, resources.
   ===================================================================== */
(function () {
  const m = (es, en) => ({ m: es, en });
  const choose = (...opts) => ({ choose: opts.map(o => ({ es: o[0], en: o[1], re: o[2] ? { m: o[2], en: o[3] } : null })) });

  MA.GUIDE = {
    id: 'valeria', name: 'Valeria', full: 'Valeria Ruiz', age: 34, voice: { tts: 'buttery', rate: 0.9 },
    look: { hair: 'layered', hairColor: '#7a4e30', skin: '#f3d6c0', eyes: '#5a3a26', outfit: 'educator', shoes: 'loafers-dark', acc: ['earrings-gold', 'necklace'] },
    role: 'Your personal Spanish mentor for the whole journey',
    personality: 'Warm, patient and curious. Loves the stories behind words and celebrates small steps.',
    background: 'From Salamanca. Studied Hispanic Philology at the University of Salamanca and has taught Spanish as a foreign language (ELE) for ten years.',
    teaching: 'Little and often: a clear plan, short daily sessions, lots of listening and speaking out loud — mistakes are part of the plan.',
    welcome: ['¡Hola! ¡Bienvenida a Madrid Academy! Soy tu mentora de español. Antes de comenzar nuestra aventura, vamos a descubrir un poco sobre la historia de este idioma.', 'Hello! Welcome to Madrid Academy! I’m your Spanish mentor. Before starting our adventure, let’s discover a little about the history of this language.'],
    intro: [
      m('¡Hola, {name}! ¡Bienvenida a Madrid Academy!', 'Hello, {name}! Welcome to Madrid Academy!'),
      m('Me llamo Valeria. Soy tu mentora de español.', 'My name is Valeria. I’m your Spanish mentor.'),
      m('Soy de Salamanca y soy profesora de español.', 'I’m from Salamanca and I’m a Spanish teacher.'),
      m('Voy a estar contigo en todo el viaje: desde Alicante hasta Madrid.', 'I’ll be with you on the whole journey: from Alicante to Madrid.'),
      m('Antes de comenzar nuestra aventura, vamos a descubrir un poco sobre la historia de este idioma.', 'Before starting our adventure, let’s discover a little about the history of this language.'),
      choose(['¡Vamos!', 'Let’s go!', '¡Genial! Empezamos por el principio: el latín.', 'Great! We start at the beginning: Latin.'],
        ['Tengo un poco de miedo…', 'I’m a little scared…', 'Tranquila. Paso a paso. Yo te ayudo.', 'Don’t worry. Step by step. I’ll help you.']),
      m('Después vemos el mapa del español en el mundo y, al final, tu plan de estudio.', 'Then we’ll look at the map of Spanish in the world and, at the end, your study plan.'),
      m('¿Lista? ¡Vamos!', 'Ready? Let’s go!')
    ]
  };

  /* ---------- La historia del español (4 chapters) ---------- */
  const art = {
    origins: `<svg viewBox="0 0 220 120" aria-hidden="true"><rect width="220" height="120" rx="14" fill="#f6ece0"/><path d="M40 98 L40 46 Q70 18 100 46 L100 98 L86 98 L86 54 Q70 36 54 54 L54 98Z" fill="#e2cdb2" stroke="#b8955a" stroke-width="1.5"/><rect x="34" y="40" width="72" height="8" rx="2" fill="#d6bd98"/><path d="M130 30 C150 24 176 26 190 36 C196 52 192 74 182 88 C168 96 146 96 134 86 C124 70 122 46 130 30Z" fill="#efd9c6" stroke="#c99aa0" stroke-width="1.5"/><text x="160" y="64" font-size="11" text-anchor="middle" fill="#8a5a5f" font-family="Georgia">Hispania</text><text x="70" y="114" font-size="9" text-anchor="middle" fill="#8a6a3a" font-family="Georgia">218 a. C.</text></svg>`,
    castile: `<svg viewBox="0 0 220 120" aria-hidden="true"><rect width="220" height="120" rx="14" fill="#f6ece0"/><path d="M26 100 L26 58 L36 58 L36 50 L44 50 L44 58 L56 58 L56 44 L64 44 L64 36 L72 36 L72 44 L80 44 L80 58 L92 58 L92 50 L100 50 L100 58 L110 58 L110 100Z" fill="#e2cdb2" stroke="#b8955a" stroke-width="1.5"/><path d="M60 100 L60 80 Q68 70 76 80 L76 100Z" fill="#c9a96a"/><rect x="130" y="34" width="66" height="58" rx="4" fill="#fffaf2" stroke="#c99aa0" stroke-width="1.5"/><path d="M163 34 L163 92" stroke="#c99aa0"/><text x="146" y="58" font-size="8" text-anchor="middle" fill="#8a5a5f" font-family="Georgia">Gramática</text><text x="180" y="58" font-size="8" text-anchor="middle" fill="#8a5a5f" font-family="Georgia">castellana</text><text x="163" y="82" font-size="13" text-anchor="middle" fill="#8a6a3a" font-family="Georgia">1492</text></svg>`,
    world: `<svg viewBox="0 0 220 120" aria-hidden="true"><rect width="220" height="120" rx="14" fill="#eef1ec"/><circle cx="150" cy="60" r="40" fill="#dfe9e6" stroke="#9fb8b0" stroke-width="1.5"/><path d="M128 40 C136 34 146 38 144 48 C142 58 150 62 146 74 C142 86 132 90 130 80 C128 70 122 60 124 50Z M160 32 C170 34 176 42 172 50 C166 54 160 46 160 32Z" fill="#c9d8c2"/><path d="M30 86 L80 86 L72 96 L38 96Z" fill="#b8955a"/><path d="M54 86 L54 40" stroke="#8a6a3a" stroke-width="2"/><path d="M56 42 L78 62 L56 62Z M52 46 L34 66 L52 66Z" fill="#fffaf2" stroke="#c9b48a"/><path d="M20 100 C50 94 90 104 120 98" stroke="#9fb8b0" stroke-width="2" fill="none"/></svg>`,
    modern: `<svg viewBox="0 0 220 120" aria-hidden="true"><rect width="220" height="120" rx="14" fill="#f8eef0"/><rect x="18" y="26" width="84" height="44" rx="14" fill="#fffaf2" stroke="#c99aa0" stroke-width="1.5"/><path d="M40 70 L36 84 L52 70Z" fill="#fffaf2" stroke="#c99aa0" stroke-width="1.5"/><text x="60" y="44" font-size="10" text-anchor="middle" fill="#8a5a5f" font-family="Georgia">vosotros</text><text x="60" y="60" font-size="9" text-anchor="middle" fill="#8a6a3a" font-family="Georgia">Madrid</text><rect x="118" y="44" width="86" height="44" rx="14" fill="#fffaf2" stroke="#b8955a" stroke-width="1.5"/><path d="M182 88 L188 102 L170 88Z" fill="#fffaf2" stroke="#b8955a" stroke-width="1.5"/><text x="161" y="62" font-size="10" text-anchor="middle" fill="#8a5a5f" font-family="Georgia">ustedes</text><text x="161" y="78" font-size="9" text-anchor="middle" fill="#8a6a3a" font-family="Georgia">Bogotá</text></svg>`
  };
  MA.SPANISH_STORY = [
    { id: 'origins', n: 1, title: 'The Origins of Spanish', es: 'Los orígenes del español', art: art.origins,
      body: ['Spanish is a <b>Romance language</b>: it comes mainly from <b>spoken Latin</b> (often called Vulgar Latin), the everyday Latin of soldiers, traders and settlers — not the polished Latin of books.', 'The Romans arrived in the Iberian Peninsula in <b>218 BC</b> and called it <i>Hispania</i>. Over the next centuries Latin replaced most of the languages spoken there before.', 'After the Roman Empire fell, the spoken Latin of each region slowly changed in its own way. Over many centuries it became separate languages: Spanish, Portuguese, Galician, Catalan… and, outside Iberia, French, Italian and Romanian.'],
      facts: ['About three-quarters of Spanish vocabulary comes from Latin: <span class="es">noche</span> ← <i>noctem</i>, <span class="es">hijo</span> ← <i>filium</i>.', 'Basque (<span class="es">euskera</span>) was spoken before the Romans and survived. It is not related to Latin or to any other known language.', 'The Visigoths, a Germanic people, ruled after the Romans and left words like <span class="es">guerra</span> (war).', 'Notes written in a Latin manuscript in La Rioja around the 10th–11th century (the <i>Glosas Emilianenses</i>) are often called the first written words of Spanish.'] },
    { id: 'castile', n: 2, title: 'The Development of Castilian', es: 'El desarrollo del castellano', art: art.castile,
      body: ['Castilian (<span class="es">castellano</span>) began in <b>Castile</b>, a small territory in the north of the peninsula, around the 9th–10th centuries.', 'As the Christian kingdoms expanded south, Castilian spread with them and became more and more influential. In the 13th century King <b>Alfonso X «the Wise»</b> used it for laws, history and science instead of Latin.', 'From 711 to 1492 much of the peninsula was <b>al-Andalus</b>, under Muslim rule. Centuries of contact with <b>Arabic</b> shaped Spanish deeply. Other languages — Basque, Mozarabic, later French and Italian — also left their mark.', 'In <b>1492</b>, <b>Antonio de Nebrija</b> published the <i>Gramática de la lengua castellana</i>, the first grammar of Castilian and one of the first grammars of any modern European language.'],
      facts: ['Spanish has thousands of words from Arabic — often estimated at around 4,000: <span class="es">aceite</span> (oil), <span class="es">almohada</span> (pillow), <span class="es">azúcar</span> (sugar).', '<span class="es">Ojalá</span> (I hope) comes from an Arabic expression meaning «if God wills».', 'Today both names are correct: <span class="es">español</span> and <span class="es">castellano</span>.', 'The Real Academia Española (RAE) was founded in 1713.'] },
    { id: 'world', n: 3, title: 'Spanish Spreads Around the World', es: 'El español llega al mundo', art: art.world,
      body: ['From <b>1492</b>, Spanish colonisation brought the language to the Americas, and later to parts of Africa and Asia.', 'Colonisation was devastating for Indigenous peoples: conquest, forced labour, enslavement and epidemics caused an enormous loss of life. Spanish was imposed in government, the church and education, and many Indigenous languages were pushed aside or lost.', 'The enslaved Africans brought by force to the Caribbean and the coasts also shaped how Spanish is spoken there.', 'Spanish in the Americas grew its own <b>regional varieties</b>, shaped by Indigenous languages, African languages, later migration (for example from Italy to Argentina) and cultural contact. After independence in the 19th century, it became the main language of most of the new countries.'],
      facts: ['Many Indigenous languages are still very much alive: <b>Quechua</b> has millions of speakers in the Andes, and <b>Guaraní</b> is spoken by most people in Paraguay.', 'From Nahuatl (Aztec Empire): <span class="es">chocolate, tomate, aguacate</span>. From Quechua: <span class="es">papa, cóndor, llama</span>. From Taíno: <span class="es">huracán, canoa, hamaca</span>.', 'Some 16th-century missionaries wrote the first grammars of Nahuatl and Quechua.', 'Today many communities are working to revitalise their languages in schools, media and online.'] },
    { id: 'modern', n: 4, title: 'Modern Spanish', es: 'El español de hoy', art: art.modern,
      body: ['Spanish has about <b>635 million speakers</b>, around <b>520 million</b> of them native speakers (Instituto Cervantes, 2025). Mexico has the most speakers of any country.', '<b>European (Peninsular) Spanish</b> and <b>Latin American</b> varieties understand each other easily. The main differences are in pronunciation, some grammar and everyday words.', '<b>Distinción</b> — in most of Spain, <i>z</i> and <i>c</i> (before e, i) sound like English «th», so <span class="es">casa</span> (house) and <span class="es">caza</span> (hunt) sound different. <b>Seseo</b> — in Latin America, the Canary Islands and much of Andalusia, both sound like «s».', '<b>Vosotros vs ustedes</b> — in most of Spain, «you all» to friends is <span class="es">vosotros</span> and <span class="es">ustedes</span> is formal. In Latin America (and the Canary Islands) <span class="es">ustedes</span> is used for everyone.', '<b>No variety is better or more correct than another.</b> Each is correct in its own community, and the RAE works together with the other Spanish-language academies on one shared standard.', '<b>Madrid Academy focuses mainly on European Spanish</b>, so you will learn distinción, vosotros and Spain’s vocabulary — and you will understand Latin American Spanish too.'],
      facts: ['Different words: <span class="es">coche / carro</span> (car), <span class="es">móvil / celular</span> (phone), <span class="es">ordenador / computadora</span> (computer), <span class="es">zumo / jugo</span> (juice).', 'Argentina, Uruguay and other regions use <span class="es">vos</span> instead of <span class="es">tú</span> (voseo).', 'You already met seseo in Las Palmas and Sevilla on your journey!'] }
  ];

  /* ---------- El español en el mundo ---------- */
  const C = (code, name, es, flag, capital, region, lat, lng, note) => ({ code, name, es, flag, capital, region, lat, lng, note });
  MA.SPANISH_COUNTRIES = [
    C('ES', 'Spain', 'España', '🇪🇸', 'Madrid', 'Europe', 40.42, -3.70, 'Spanish (castellano) is official nationwide. Catalan, Galician and Basque are co-official in their regions, so many people are bilingual. This is the main variety in Madrid Academy.'),
    C('MX', 'Mexico', 'México', '🇲🇽', 'Mexico City', 'North & Central America', 19.43, -99.13, 'The country with the most Spanish speakers (over 120 million). Spanish is the national language in practice, and 68 Indigenous languages, such as Nahuatl and Maya, are recognised as national languages too.'),
    C('GT', 'Guatemala', 'Guatemala', '🇬🇹', 'Guatemala City', 'North & Central America', 14.63, -90.51, 'Spanish is official, and more than 20 Mayan languages, such as K’iche’ and Q’eqchi’, are spoken by a large part of the population.'),
    C('HN', 'Honduras', 'Honduras', '🇭🇳', 'Tegucigalpa', 'North & Central America', 14.07, -87.19, 'Spanish is official. Garifuna and Miskito communities on the Caribbean coast keep their own languages.'),
    C('SV', 'El Salvador', 'El Salvador', '🇸🇻', 'San Salvador', 'North & Central America', 13.69, -89.19, 'The smallest country in Central America, famous for pupusas. Speakers often use «vos». Nawat (Pipil), an Indigenous language, is being revived.'),
    C('NI', 'Nicaragua', 'Nicaragua', '🇳🇮', 'Managua', 'North & Central America', 12.11, -86.24, 'Spanish is official. On the Caribbean coast, Miskito and English-based Creole are also widely spoken.'),
    C('CR', 'Costa Rica', 'Costa Rica', '🇨🇷', 'San José', 'North & Central America', 9.93, -84.08, 'Known for «¡Pura vida!». Many Costa Ricans use «usted» even with friends and family.'),
    C('PA', 'Panama', 'Panamá', '🇵🇦', 'Panama City', 'North & Central America', 8.98, -79.52, 'Home of the Panama Canal. English and Indigenous languages such as Ngäbere are also spoken.'),
    C('CU', 'Cuba', 'Cuba', '🇨🇺', 'Havana', 'Caribbean', 23.11, -82.37, 'Caribbean Spanish often softens the final «-s»: «¿Cómo estás?» can sound like «¿Cómo etá?».'),
    C('DO', 'Dominican Republic', 'República Dominicana', '🇩🇴', 'Santo Domingo', 'Caribbean', 18.49, -69.93, 'Shares the island of Hispaniola with Haiti. Santo Domingo is often called the oldest European-founded city still inhabited in the Americas.'),
    C('CO', 'Colombia', 'Colombia', '🇨🇴', 'Bogotá', 'South America', 4.71, -74.07, 'Many Colombians use «usted» in everyday life, even with friends. About 65 Indigenous languages and two Creole languages are also spoken.'),
    C('VE', 'Venezuela', 'Venezuela', '🇻🇪', 'Caracas', 'South America', 10.49, -66.88, 'Known for words like «chévere» (great) and «pana» (friend). Dozens of Indigenous languages are recognised.'),
    C('EC', 'Ecuador', 'Ecuador', '🇪🇨', 'Quito', 'South America', -0.18, -78.47, 'Spanish is official; Kichwa and Shuar are official languages of intercultural relations.'),
    C('PE', 'Peru', 'Perú', '🇵🇪', 'Lima', 'South America', -12.05, -77.04, 'Quechua and Aymara are co-official where they are predominant, and millions of Peruvians speak Quechua.'),
    C('BO', 'Bolivia', 'Bolivia', '🇧🇴', 'Sucre (constitutional) · La Paz (seat of government)', 'South America', -19.05, -65.26, 'The constitution recognises Spanish and 36 Indigenous languages as official, including Quechua, Aymara and Guaraní.'),
    C('PY', 'Paraguay', 'Paraguay', '🇵🇾', 'Asunción', 'South America', -25.26, -57.58, 'Guaraní is co-official and spoken by most of the population. Many people mix both languages in everyday speech (jopara).'),
    C('CL', 'Chile', 'Chile', '🇨🇱', 'Santiago', 'South America', -33.45, -70.67, 'Chilean Spanish is fast and full of local words, like «¿cachai?» (you know?). Mapudungun is the main Indigenous language.'),
    C('AR', 'Argentina', 'Argentina', '🇦🇷', 'Buenos Aires', 'South America', -34.60, -58.38, 'Uses «vos» instead of «tú». In Buenos Aires, «ll» and «y» often sound like «sh» («yo» ≈ «sho»).'),
    C('UY', 'Uruguay', 'Uruguay', '🇺🇾', 'Montevideo', 'South America', -34.90, -56.16, 'Like Argentina, many people use «vos». Near the Brazilian border, Portuguese varieties are also spoken.'),
    C('GQ', 'Equatorial Guinea', 'Guinea Ecuatorial', '🇬🇶', 'Malabo', 'Africa', 3.75, 8.78, 'The only country in Africa where Spanish is official, alongside French and Portuguese. Fang and Bubi are widely spoken at home.')
  ];
  MA.SPANISH_EXTRA = C('PR', 'Puerto Rico', 'Puerto Rico', '🇵🇷', 'San Juan', 'Caribbean · U.S. territory', 18.47, -66.11, 'Spanish and English are both official, but Puerto Rico is a U.S. territory, not a sovereign country.');
  MA.SPANISH_REGIONS = ['Europe', 'North & Central America', 'Caribbean', 'South America', 'Africa'];

  /* ---------- the plan ---------- */
  MA.PLAN = {
    prefs: ['Current level: A0–A1, with some previous Spanish', 'Active study: 30–45 minutes per day', 'Optional passive learning: 10–20 minutes daily', 'Preferred variety: European Spanish', 'Main goal: a strong B2 after about 500–600 study hours', 'Then: C1 (about 700–800 hours) and C2 (about 1,000–1,200 hours)'],
    // cumulative guided study hours: [from, to] for each city
    roadmap: [
      { h: [0, 90], city: 'alicante', cefr: 'A1', focus: 'Sounds, greetings, ser/estar, present tense, numbers', check: 'A1 self-check · Alicante exams' },
      { h: [90, 150], city: 'laspalmas', cefr: 'A1 → A2', focus: 'Daily routine, food, shops & directions, gustar', check: '' },
      { h: [150, 200], city: 'palma', cefr: 'A2', focus: 'Past tenses (pretérito perfecto & indefinido), object pronouns', check: 'A2 self-check · DIALANG test' },
      { h: [200, 290], city: 'murcia', cefr: 'A2 → B1', focus: 'Imperfect vs preterite, future, feelings & opinions', check: '' },
      { h: [290, 380], city: 'malaga', cefr: 'B1', focus: 'Present subjunctive, news, commands, longer conversations', check: 'B1 self-check · AVE Global placement test' },
      { h: [380, 480], city: 'sevilla', cefr: 'B1 → B2', focus: 'Subjunctive in depth, conditional, debate, culture', check: '' },
      { h: [480, 600], city: 'zaragoza', cefr: 'B2', focus: 'Formal & academic Spanish, writing, complex grammar', check: 'B2 checkpoint · DELE B2 practice tasks' },
      { h: [600, 750], city: 'valencia', cefr: 'B2 → C1', focus: 'Nuance, register, idioms, long texts', check: '' },
      { h: [750, 900], city: 'barcelona', cefr: 'C1', focus: 'Varieties of Spanish, translation, media, debate', check: 'C1 self-check · consider DELE C1' },
      { h: [900, 1200], city: 'madrid', cefr: 'C1 → C2 (real life)', focus: 'Real-world Spanish: slang, natural speech, admin, news', check: 'Official exam if you want a certificate' }
    ],
    // cumulative guided hours per level (Cambridge English guidance, approximate)
    levels: [['A1', 90, 100], ['A2', 180, 200], ['B1', 350, 400], ['B2', 500, 600], ['C1', 700, 800], ['C2', 1000, 1200]],
    honest: 'These hours are common estimates of guided study (Cambridge English guidance). Real speed depends on you: daily practice, speaking with people and lots of listening make it faster. Passive listening helps a lot but is not counted in these hours. The app never gives you a CEFR level — only an official exam (DELE / SIELE) certifies it.',
    study: [
      { id: 'warm', min: 5, title: 'Warm-up: vocabulary review', how: 'Spaced-repetition cards that are due today.' },
      { id: 'lesson', min: 20, title: 'Main lesson', how: 'Your next grammar lesson in the current city.' },
      { id: 'practice', min: 10, title: 'Practice', how: 'Reading, idioms or the city’s practice tasks.' },
      { id: 'speak', min: 5, title: 'Speak out loud', how: 'Repeat 5 example sentences from today, or write 3 of your own.' }
    ],
    review: [
      { id: 'srs', min: 15, title: 'Vocabulary review', how: 'Clear all the cards that are due.' },
      { id: 'mistakes', min: 10, title: 'Chapter review & mistakes', how: 'Re-read the chapter summary and redo the exercises you missed.' },
      { id: 'homework', min: 10, title: 'Homework or reading', how: 'Do the chapter homework, or read one text in the city’s Reading card.' }
    ],
    passive: [
      { name: 'Dreaming Spanish', url: 'https://www.dreaming.com/', level: 'A0–C1', what: 'Comprehensible-input videos sorted by difficulty. Filter by a Spain accent.', when: 'Start now' },
      { name: 'Easy Spanish (YouTube)', url: 'https://www.youtube.com/@EasySpanish', level: 'A2–C1', what: 'Street interviews with subtitles in Spanish and English, including many from Spain.', when: 'From about 100 hours (A1–A2)' },
      { name: 'Hoy Hablamos (podcast)', url: 'https://www.hoyhablamos.com/', level: 'A2–C1', what: 'Daily podcast from Spain with transcripts; the «Básico» series is for A2.', when: 'From about 150 hours (A2)' },
      { name: 'Notes in Spanish (podcast)', url: 'https://www.notesinspanish.com/', level: 'A2–C1', what: 'Real conversations with Marina, a madrileña, and Ben. Lots of Madrid life.', when: 'From about 200 hours (A2+)' },
      { name: 'RTVE Play', url: 'https://www.rtve.es/play/', level: 'B1–C2', what: 'Spain’s public TV and radio: series, documentaries and news, free online.', when: 'From about 350 hours (B1)' },
      { name: 'Cadena SER (radio)', url: 'https://cadenaser.com/', level: 'B2–C2', what: 'Spain’s most popular radio station: talk shows, news and tertulias.', when: 'From about 500 hours (B2)' }
    ],
    films: ['[REC] (2007, Barcelona)', 'El orfanato (2007)', 'Verónica (2017, set in Madrid)', 'Las chicas del cable (series, set in Madrid)'],
    assess: [
      { name: 'DIALANG (free self-assessment)', url: 'https://dialangweb.lancaster.ac.uk/', what: 'Free online test that estimates your CEFR level in reading, listening, writing and more.' },
      { name: 'Instituto Cervantes · AVE Global', url: 'https://ave.cervantes.es/', what: 'Official online courses (A1–C1) with a placement test to find your level.' },
      { name: 'DELE & SIELE exams', url: 'https://examenes.cervantes.es/', what: 'Official Instituto Cervantes certificates — the only way to prove your level formally.' }
    ],
    cando: {
      A1: ['Introduce myself and ask simple questions', 'Order food and ask for prices', 'Understand slow, clear everyday phrases'],
      A2: ['Talk about my routine and my past weekend', 'Handle shops, directions and transport', 'Read short messages and simple texts'],
      B1: ['Tell a story in the past with details', 'Give my opinion and explain why', 'Follow the main points of a podcast on familiar topics'],
      B2: ['Debate a topic and defend my view', 'Understand most TV series and news', 'Write a clear, detailed text on many subjects'],
      C1: ['Speak fluently without searching for words', 'Understand long, complex texts and implicit meaning', 'Adapt my register to formal and informal situations']
    }
  };
})();
