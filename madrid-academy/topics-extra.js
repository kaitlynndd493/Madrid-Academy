/* =====================================================================
   Extra chapters for topics that were «coming soon»:
   Alicante c4 · Las Palmas lp3 · Palma pm3.
   They are marked `extra` so they never re-lock a city you have finished.
   ===================================================================== */
(function () {
  const { U, UI, H } = MA; const { esc } = U;
  const sec = (h, b) => `<h4>${h}</h4>${b}`;
  const T = (title, head, rows, esCols = [1]) => `<div class="tbl-wrap"><table class="tbl"><caption>${esc(title)}</caption><thead><tr>${head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, k) => `<td class="${esCols.includes(k) ? 'es' : ''}">${esc(c)}${esCols.includes(k) && c && !/^[-–—]/.test(c) ? ' ' + UI.spk(String(c).split(' / ')[0].replace(/[()…¿?¡!]/g, '')) : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const X = (es, en) => `<li><span class="es">${esc(es)}</span> ${UI.spk(es)} <span class="muted">— ${esc(en)}</span></li>`;
  const EX = list => `<ul class="exlist">${list.map(([a, b]) => X(a, b)).join('')}</ul>`;
  const P = h => `<p>${h}</p>`;
  const reg = (ch) => { ch.extra = true; MA.CHAPTERS.push(ch); ch.lessons.forEach((l, i) => { MA.LESSONS[l.id] = Object.assign(l, { chapter: ch.id, idx: i }); }); };

  /* =================================================================
     ALICANTE · Capítulo 4 · Frases, preguntas y verbos en -er / -ir
     ================================================================= */
  reg({ id: 'c4', city: 'alicante', level: 'A1', num: 4, title: 'Frases y preguntas', en: 'Sentences, questions and -er / -ir verbs', goal: 'Build simple sentences, make them negative, ask yes/no and wh- questions, and use -er / -ir verbs plus the key irregular verbs in the present.',
    lessons: [
      { id: 'c4l1', title: '¿Cómo se hace una frase?', en: 'Simple sentence structure & questions', skill: 'grammar', minutes: 20, vocab: [],
        intro: sec('Definition', P('A basic Spanish sentence follows the same order as English: <b>subject + verb + rest</b>. <span class="es">Ana trabaja en Alicante.</span> But Spanish often <b>drops the subject pronoun</b>, because the verb ending already shows who it is: <span class="es">Trabajo en Alicante</span> = I work in Alicante.')) +
          T('Sentence pattern', ['Part', 'Example', 'English'], [['Subject + verb', 'Marta estudia.', 'Marta studies.'], ['+ object', 'Marta estudia español.', 'Marta studies Spanish.'], ['+ place / time', 'Marta estudia español en Alicante por la mañana.', 'Marta studies Spanish in Alicante in the morning.'], ['No subject', 'Estudio español.', 'I study Spanish.'], ['Negative', 'No estudio francés.', 'I don’t study French.']], [1]) +
          sec('Rules', '<ol><li><b>Negative:</b> put <b>no</b> directly before the verb. There is no «do/does»: <span class="es">No hablo alemán.</span></li><li><b>Double negatives are correct:</b> <span class="es">No tengo nada.</span> (I don’t have anything.) · <span class="es">No viene nadie.</span></li><li><b>Adjectives usually go after the noun:</b> <span class="es">un café caliente, una playa bonita</span>.</li><li>Use the subject pronoun only for <b>emphasis or contrast</b>: <span class="es">Yo soy de Canadá y él es de Alicante.</span></li><li>Time and place usually go at the end (or at the start for emphasis): <span class="es">Por la mañana voy a la playa.</span></li></ol>') +
          sec('Yes / no questions', P('Write <b>¿</b> at the start and <b>?</b> at the end. You can keep the same word order and just raise your voice at the end, or put the verb first.') +
            EX([['¿Hablas inglés?', 'Do you speak English?'], ['¿Marta vive en Alicante?', 'Does Marta live in Alicante?'], ['¿Vive Marta en Alicante?', 'Does Marta live in Alicante? (verb first)'], ['Eres de Vancouver, ¿verdad?', 'You’re from Vancouver, right?'], ['Tienes hambre, ¿no?', 'You’re hungry, aren’t you?']])) +
          T('Question words (always with an accent)', ['Spanish', 'English', 'Example'], [['¿Qué?', 'What?', '¿Qué estudias?'], ['¿Quién?', 'Who?', '¿Quién es él?'], ['¿Dónde?', 'Where?', '¿Dónde vives?'], ['¿Cuándo?', 'When?', '¿Cuándo trabajas?'], ['¿Cómo?', 'How? / What … like?', '¿Cómo te llamas?'], ['¿Cuánto?', 'How much?', '¿Cuánto cuesta?'], ['¿Cuántos? / ¿Cuántas?', 'How many?', '¿Cuántas hermanas tienes?'], ['¿Por qué?', 'Why?', '¿Por qué estudias español?']], [0, 2]) +
          sec('Wh- questions', '<ol><li>Order: <b>question word + verb + subject</b>: <span class="es">¿Dónde trabaja tu padre?</span></li><li>Prepositions go <b>in front</b> of the question word, never at the end: <span class="es">¿<b>De</b> dónde eres?</span> (Where are you from?) · <span class="es">¿<b>Con</b> quién vives?</span> (Who do you live with?)</li><li>Answer <b>¿Por qué?</b> with <b>porque</b> (one word, no accent).</li><li>¿Cuánto? agrees with the noun: <span class="es">¿Cuántos años? ¿Cuántas personas?</span></li></ol>') +
          sec('Examples', EX([['No vivo en el centro. Vivo cerca de la playa.', 'I don’t live in the centre. I live near the beach.'], ['¿De dónde eres? — Soy de Canadá.', 'Where are you from? — I’m from Canada.'], ['¿Con quién estudias? — Con mi amiga Lucía.', 'Who do you study with? — With my friend Lucía.'], ['¿Por qué estás aquí? — Porque estudio español.', 'Why are you here? — Because I study Spanish.'], ['¿Cuántas personas hay en tu clase? — Hay doce.', 'How many people are there in your class? — There are twelve.'], ['Hablas español, ¿verdad? — Sí, un poco.', 'You speak Spanish, right? — Yes, a little.']])),
        mistakes: ['❌ Yo no no hablo → ✅ No hablo', '❌ ¿Tú hablas inglés? (fine, but) ❌ ¿Do tú hablas? → ✅ ¿Hablas inglés? (no «do» in Spanish)', '❌ ¿Dónde eres de? → ✅ ¿De dónde eres?', '❌ ¿Porque estudias? → ✅ ¿Por qué estudias? — Porque…', '❌ Una bonita playa (possible, poetic) → ✅ Una playa bonita (normal order)'],
        ex: [
          { t: 'order', w: ['español', 'estudio', 'Alicante', 'en'], a: ['estudio español en alicante'], en: 'I study Spanish in Alicante.', skill: 'grammar' },
          { t: 'order', w: ['no', 'trabaja', 'Marta', 'lunes', 'los'], a: ['marta no trabaja los lunes', 'los lunes marta no trabaja'], en: 'Marta doesn’t work on Mondays.', skill: 'grammar' },
          { t: 'fill', q: 'Yo ___ hablo francés. (negative)', a: ['no'], skill: 'grammar', ex: '«No» goes right before the verb.' },
          { t: 'mc', q: 'Where are you from?', o: ['¿Dónde eres de?', '¿De dónde eres?', '¿De dónde estás?'], a: 1, skill: 'grammar', ex: 'The preposition goes first, and origin uses ser.' },
          { t: 'mc', q: '___ cuesta el café? — Un euro.', o: ['¿Cuántos', '¿Cuánto', '¿Cuándo'], a: 1, skill: 'grammar', ex: '¿Cuánto cuesta? = How much does it cost?' },
          { t: 'mc', q: '¿___ hermanas tienes?', o: ['Cuántos', 'Cuántas', 'Cuánto'], a: 1, skill: 'grammar', ex: 'hermanas is feminine plural → cuántas.' },
          { t: 'fill', q: '¿___ estudias español? — Porque me gusta.', a: ['por qué', 'por que'], skill: 'grammar', ex: 'Why = por qué (two words, accent). Because = porque.' },
          { t: 'fill', q: '¿Con ___ vives? — Con mi familia.', a: ['quién', 'quien'], skill: 'grammar' },
          { t: 'fix', q: '¿Dónde tú trabajas?', a: ['¿dónde trabajas?', 'dónde trabajas?', '¿dónde trabajas tú?'], skill: 'grammar', ex: 'Question word + verb (+ subject): ¿Dónde trabajas (tú)?' },
          { t: 'mc', q: 'Which sentence is normal Spanish?', o: ['No tengo nada.', 'No tengo algo.', 'Tengo no nada.'], a: 0, skill: 'grammar', ex: 'Double negatives are correct in Spanish.' },
          { t: 'tr', en: 'Where do you live? — I live in Alicante.', a: ['¿dónde vives? vivo en alicante', 'dónde vives? vivo en alicante', 'donde vives? vivo en alicante'], skill: 'writing' },
          { t: 'listen', say: '¿De dónde eres? Soy de Canadá, pero vivo en Alicante.', o: ['She is from Alicante and lives in Canada.', 'She is from Canada but lives in Alicante.', 'She lives in Canada with friends.'], a: 1, skill: 'listening' },
          { t: 'speak', prompt: 'Ask 3 questions to a new classmate: where from, where they live, why they study Spanish.', sample: '¿De dónde eres? ¿Dónde vives? ¿Por qué estudias español?', target: ['de dónde', 'dónde vives', 'por qué'], skill: 'speaking' }
        ] },
      { id: 'c4l2', title: 'Como, vivo y voy', en: 'Present tense: -er / -ir verbs and key irregulars', skill: 'grammar', minutes: 24, vocab: [],
        intro: sec('Definition', P('You already know <b>-ar</b> verbs (hablo, hablas…). Now the other two groups: <b>-er</b> verbs (comer, beber, leer, aprender) and <b>-ir</b> verbs (vivir, escribir, abrir, compartir). They share almost all endings.')) +
          T('Regular -er and -ir verbs', ['', 'comer (to eat)', 'vivir (to live)', 'Ending -er / -ir'], [['yo', 'como', 'vivo', '-o / -o'], ['tú', 'comes', 'vives', '-es / -es'], ['él / ella / usted', 'come', 'vive', '-e / -e'], ['nosotros/as', 'comemos', 'vivimos', '-emos / -imos'], ['vosotros/as', 'coméis', 'vivís', '-éis / -ís'], ['ellos / ellas / ustedes', 'comen', 'viven', '-en / -en']], [1, 2]) +
          sec('Rules', '<ol><li>-er and -ir are <b>the same</b> except in <b>nosotros</b> (-emos / -imos) and <b>vosotros</b> (-éis / -ís).</li><li>Vosotros forms have a written accent: <span class="es">coméis, bebéis, vivís, escribís</span>.</li><li>Common -er verbs: <span class="es">comer, beber, leer, aprender, comprender, correr, vender, creer</span>. Common -ir verbs: <span class="es">vivir, escribir, abrir, compartir, recibir, subir, decidir</span>.</li></ol>') +
          T('Key irregular verbs (present)', ['', 'ser', 'estar', 'tener', 'ir', 'hacer'], [['yo', 'soy', 'estoy', 'tengo', 'voy', 'hago'], ['tú', 'eres', 'estás', 'tienes', 'vas', 'haces'], ['él / ella / usted', 'es', 'está', 'tiene', 'va', 'hace'], ['nosotros/as', 'somos', 'estamos', 'tenemos', 'vamos', 'hacemos'], ['vosotros/as', 'sois', 'estáis', 'tenéis', 'vais', 'hacéis'], ['ellos / ustedes', 'son', 'están', 'tienen', 'van', 'hacen']], [1, 2, 3, 4, 5]) +
          T('Verbs irregular only in «yo»', ['Verb', 'yo', 'tú (regular)', 'English'], [['ver', 'veo', 'ves', 'to see'], ['saber', 'sé', 'sabes', 'to know (facts)'], ['conocer', 'conozco', 'conoces', 'to know (people, places)'], ['salir', 'salgo', 'sales', 'to go out'], ['poner', 'pongo', 'pones', 'to put'], ['dar', 'doy', 'das', 'to give'], ['traer', 'traigo', 'traes', 'to bring']], [1, 2]) +
          sec('Useful structures', '<ol><li><b>ir a + place</b>: <span class="es">Voy a la playa.</span> (a + el = <b>al</b>: <span class="es">Voy al mercado.</span>)</li><li><b>tener + noun</b> for many feelings: <span class="es">tengo hambre, tengo sed, tengo frío, tengo veinte años</span>.</li><li><b>tener que + infinitive</b> = to have to: <span class="es">Tengo que estudiar.</span></li><li><b>hacer</b> for weather: <span class="es">Hace sol. Hace calor.</span></li><li><b>saber</b> = facts and skills (<span class="es">Sé nadar</span>); <b>conocer</b> = people and places (<span class="es">Conozco a Lucía. Conozco Alicante.</span>).</li></ol>') +
          sec('Examples', EX([['Como en casa y ceno con mis amigos.', 'I have lunch at home and dinner with my friends.'], ['¿Dónde vivís? — Vivimos en el barrio de Santa Cruz.', 'Where do you all live? — We live in the Santa Cruz neighbourhood.'], ['Leo el periódico y escribo correos.', 'I read the newspaper and write emails.'], ['Hoy hace sol: vamos al Postiguet.', 'It’s sunny today: let’s go to Postiguet beach.'], ['No conozco a tu hermano, pero sé que es médico.', 'I don’t know your brother, but I know he’s a doctor.'], ['Los sábados salgo con mis amigas.', 'On Saturdays I go out with my friends.']])),
        mistakes: ['❌ Nosotros vivemos → ✅ vivimos (-ir: -imos)', '❌ Vosotros comeis → ✅ coméis (accent)', '❌ Yo sabo → ✅ Yo sé', '❌ Yo hace → ✅ Yo hago', '❌ Sé a Lucía → ✅ Conozco a Lucía (people = conocer)', '❌ Voy a el mercado → ✅ Voy al mercado'],
        ex: [
          { t: 'fill', q: 'Yo ___ paella los domingos. (comer)', a: ['como'], skill: 'grammar' },
          { t: 'fill', q: 'Nosotros ___ en Alicante. (vivir)', a: ['vivimos'], skill: 'grammar', ex: '-ir verbs: nosotros -imos.' },
          { t: 'fill', q: 'Nosotros ___ agua. (beber)', a: ['bebemos'], skill: 'grammar', ex: '-er verbs: nosotros -emos.' },
          { t: 'fill', q: 'Vosotros ___ muchos mensajes. (escribir)', a: ['escribís', 'escribis'], skill: 'grammar' },
          { t: 'fill', q: 'Ella ___ el periódico. (leer)', a: ['lee'], skill: 'grammar' },
          { t: 'fill', q: 'Yo ___ veinte años. (tener)', a: ['tengo'], skill: 'grammar' },
          { t: 'fill', q: 'Yo ___ los deberes por la tarde. (hacer)', a: ['hago'], skill: 'grammar' },
          { t: 'fill', q: 'Tú ___ a la playa. (ir)', a: ['vas'], skill: 'grammar' },
          { t: 'mc', q: '___ a Lucía, es mi vecina.', o: ['Sé', 'Conozco', 'Conoce'], a: 1, skill: 'grammar', ex: 'People → conocer (yo conozco).' },
          { t: 'mc', q: 'Yo no ___ dónde está el museo.', o: ['conozco', 'sé', 'sabo'], a: 1, skill: 'grammar', ex: 'A fact → saber (yo sé).' },
          { t: 'match', p: [['salir', 'salgo'], ['poner', 'pongo'], ['ver', 'veo'], ['dar', 'doy'], ['traer', 'traigo']], skill: 'grammar' },
          { t: 'fix', q: 'Nosotros vivemos cerca y comemos en casa.', a: ['nosotros vivimos cerca y comemos en casa'], skill: 'grammar' },
          { t: 'tr', en: 'I have to study, but on Saturdays I go out.', a: ['tengo que estudiar pero los sábados salgo', 'tengo que estudiar, pero los sábados salgo', 'tengo que estudiar pero los sabados salgo'], skill: 'writing' },
          { t: 'listen', say: 'Vivimos en Alicante y los domingos comemos con mis abuelos.', o: ['They live with the grandparents.', 'They eat with the grandparents on Sundays.', 'They visit Alicante on Sundays.'], a: 1, skill: 'listening' },
          { t: 'write', prompt: 'Write 5 sentences about your week: use one -er verb, one -ir verb, tener, ir and hacer.', sample: 'Vivo en un piso pequeño. Como en casa a las dos. Tengo clase por la mañana. Los viernes voy a la playa. Hago deporte los sábados.', minWords: 25, skill: 'writing', rubric: ['-er / -ir endings correct', 'Irregular yo forms (tengo, voy, hago)', 'Simple word order', 'Accents'] }
        ] }
    ],
    review: { keyVocab: [], grammar: ['Subject + verb + object + place/time; the subject pronoun is often dropped.', 'Negative: no + verb. Double negatives are correct (no… nada, no… nadie).', 'Questions: ¿…? · question words always have an accent.', 'Prepositions go first: ¿De dónde…? ¿Con quién…?', '-er: -o, -es, -e, -emos, -éis, -en · -ir: -o, -es, -e, -imos, -ís, -en.', 'ser · estar · tener · ir · hacer are irregular.', 'yo-irregular: veo, sé, conozco, salgo, pongo, doy, traigo.'], expressions: ['¿De dónde eres?', '¿Por qué…? — Porque…', '¿verdad? / ¿no?', 'tener que + infinitive', 'Hace sol / calor'], mistakes: ['¿Dónde eres de? → ¿De dónde eres?', 'vivemos → vivimos', 'sabo → sé', 'Sé a Lucía → Conozco a Lucía'] },
    exam: [
      { t: 'order', w: ['no', 'en', 'vivo', 'centro', 'el'], a: ['no vivo en el centro'], en: 'I don’t live in the centre.', skill: 'grammar' },
      { t: 'mc', q: 'Who do you live with?', o: ['¿Quién vives con?', '¿Con quién vives?', '¿Con quien vives tú con?'], a: 1, skill: 'grammar' },
      { t: 'fill', q: '¿___ años tienes? (how many)', a: ['cuántos', 'cuantos'], skill: 'grammar' },
      { t: 'fill', q: 'Ellos ___ en un piso. (vivir)', a: ['viven'], skill: 'grammar' },
      { t: 'fill', q: 'Nosotros ___ español. (aprender)', a: ['aprendemos'], skill: 'grammar' },
      { t: 'fill', q: 'Nosotros ___ la ventana. (abrir)', a: ['abrimos'], skill: 'grammar' },
      { t: 'fill', q: 'Yo ___ de casa a las ocho. (salir)', a: ['salgo'], skill: 'grammar' },
      { t: 'fill', q: 'Vosotros ___ cansados. (estar)', a: ['estáis', 'estais'], skill: 'grammar' },
      { t: 'mc', q: '¿___ nadar? — Sí, un poco.', o: ['Conoces', 'Sabes', 'Sabe tú'], a: 1, skill: 'grammar' },
      { t: 'fix', q: 'Yo hace la cena y tú vas a el mercado.', a: ['yo hago la cena y tú vas al mercado', 'yo hago la cena y tu vas al mercado'], skill: 'grammar' },
      { t: 'listen', say: '¿Por qué estudias español? Porque quiero vivir en España.', o: ['Because she wants to live in Spain.', 'Because she lives in Spain.', 'Because her friends are Spanish.'], a: 0, skill: 'listening' },
      { t: 'read', text: 'Me llamo Leo. Vivo en Alicante con dos amigos. Por la mañana leo y escribo en una cafetería. Comemos juntos a las dos. Los viernes salgo y voy al Postiguet.', q: 'What does Leo do in the morning?', o: ['He goes to the beach.', 'He reads and writes in a café.', 'He cooks lunch.'], a: 1, skill: 'reading' },
      { t: 'tr', en: 'We eat at home and we don’t drink coffee.', a: ['comemos en casa y no bebemos café', 'comemos en casa y no bebemos cafe'], skill: 'writing' },
      { t: 'speak', prompt: 'Introduce yourself: where you are from, where you live, what you do on Saturdays.', sample: 'Soy de Canadá. Vivo en Alicante. Los sábados salgo con mis amigos y como paella.', target: ['soy de', 'vivo', 'salgo'], skill: 'speaking' }
    ],
    homework: { id: 'hw4', title: 'Homework 4 — Frases y verbos', parts: [
      { h: 'A. Make the sentence negative', items: [['Hablo alemán.', 'No hablo alemán.'], ['Marta vive aquí.', 'Marta no vive aquí.'], ['Tengo algo.', 'No tengo nada.']] },
      { h: 'B. Write the question', items: [['Soy de Canadá. (where from)', '¿De dónde eres?'], ['Vivo con mi hermana. (who with)', '¿Con quién vives?'], ['Cuesta dos euros. (how much)', '¿Cuánto cuesta?'], ['Porque me gusta. (why)', '¿Por qué…?']] },
      { h: 'C. -er / -ir verbs', items: [['nosotros / vivir', 'vivimos'], ['vosotros / comer', 'coméis'], ['ella / escribir', 'escribe'], ['ellos / beber', 'beben']] },
      { h: 'D. Irregular verbs', items: [['yo / tener', 'tengo'], ['yo / hacer', 'hago'], ['nosotros / ir', 'vamos'], ['yo / saber', 'sé'], ['yo / conocer', 'conozco']] },
      { h: 'E. Writing', open: true, items: [['Write 6 sentences about you: 2 questions and 4 answers. Use -er/-ir verbs and 2 irregular verbs.', 'Sample: ¿Dónde vives? Vivo en Alicante. ¿Qué haces los domingos? Como con mi familia y leo un libro.']], rubric: ['Question marks ¿?', 'Accents on question words', '-er/-ir endings', 'Irregular verbs'] }] }
  });

  /* =================================================================
     LAS PALMAS · Capítulo 3 · Comer y moverse por la ciudad
     ================================================================= */
  reg({ id: 'lp3', city: 'laspalmas', level: 'A2', num: 3, title: 'Comer y moverse', en: 'Food, likes, shops and directions', goal: 'Talk about Canarian food, say what you like with gustar, buy things in shops and ask for and give directions.',
    lessons: [
      { id: 'lp3l1', title: 'Me gustan las papas arrugadas', en: 'Food & drinks: Canarian dishes, likes (gustar)', skill: 'vocab', minutes: 22, vocab: [],
        intro: sec('Canarian food', P('Canarian cooking mixes Spanish, African and Latin American influences. In Las Palmas you will see these dishes and words everywhere. Note: in the Canaries a potato is a <b>papa</b> (mainland Spain: <i>patata</i>).')) +
          T('Typical Canarian dishes and drinks', ['Spanish', 'What it is'], [['papas arrugadas con mojo', 'small potatoes boiled in very salty water, with mojo sauce'], ['mojo rojo / mojo verde', 'spicy red pepper sauce / green sauce with coriander or parsley'], ['gofio', 'flour of toasted grain (maize or wheat), used in many dishes'], ['ropa vieja', 'stew of chickpeas, meat, potatoes and vegetables'], ['sancocho canario', 'salted fish with potatoes, sweet potato and mojo'], ['queso de flor de Guía', 'traditional cheese from Gran Canaria'], ['plátano de Canarias', 'small, sweet Canarian banana'], ['bienmesabe', 'sweet almond and honey cream (dessert)'], ['barraquito', 'layered coffee with condensed milk, milk and cinnamon']], [0]) +
          sec('How gustar works', P('<b>Gustar</b> works “backwards”. Literally, the food <b>pleases you</b>. The thing you like is the subject, so the verb agrees with the thing, not with you.')) +
          T('Gustar', ['Pronoun', '+ gusta (one thing / verb)', '+ gustan (plural)'], [['(a mí) me', 'me gusta el gofio', 'me gustan las papas'], ['(a ti) te', 'te gusta cocinar', 'te gustan los mojos'], ['(a él / ella / usted) le', 'le gusta el queso', 'le gustan los plátanos'], ['(a nosotros/as) nos', 'nos gusta comer fuera', 'nos gustan los postres'], ['(a vosotros/as) os', 'os gusta el café', 'os gustan las tapas'], ['(a ellos / ustedes) les', 'les gusta la playa', 'les gustan las guaguas nuevas']], [1, 2]) +
          sec('Rules', '<ol><li><b>gusta</b> + singular noun or infinitive; <b>gustan</b> + plural noun: <span class="es">Me gusta el mojo. Me gustan las papas. Me gusta nadar.</span></li><li>Use the <b>article</b> with the noun: <span class="es">Me gusta <b>el</b> queso</span> (not «me gusta queso»).</li><li><b>a + person</b> adds emphasis or makes le/les clear: <span class="es">A mi madre le gusta el bienmesabe.</span></li><li>Agree / disagree: <span class="es">A mí también</span> (me too, positive) · <span class="es">A mí tampoco</span> (me neither, negative) · <span class="es">A mí sí / A mí no</span> (to disagree).</li><li>Same pattern: <b>encantar</b> (to love), <b>interesar</b>, <b>doler</b>: <span class="es">Me encantan los plátanos. Me duele la cabeza.</span></li><li>Degrees: <span class="es">me encanta › me gusta mucho › me gusta › no me gusta mucho › no me gusta nada</span>.</li></ol>') +
          sec('Ordering in a restaurant', EX([['¿Qué me recomienda?', 'What do you recommend?'], ['Para mí, unas papas arrugadas con mojo, por favor.', 'For me, wrinkly potatoes with mojo, please.'], ['¿El mojo pica mucho?', 'Is the mojo very spicy?'], ['¿Me trae la cuenta, por favor?', 'Can you bring me the bill, please?'], ['Me encanta el queso, pero no me gusta nada el pescado salado.', 'I love cheese, but I don’t like salted fish at all.'], ['—No me gustan las comidas picantes. —A mí tampoco.', '—I don’t like spicy food. —Me neither.']])),
        mistakes: ['❌ Yo gusto las papas → ✅ Me gustan las papas', '❌ Me gusta las papas → ✅ Me gustan las papas (plural)', '❌ Me gustan cocinar y bailar → ✅ Me gusta cocinar y bailar (verbs = gusta)', '❌ Me gusta queso → ✅ Me gusta el queso', '❌ —No me gusta. —A mí también. → ✅ A mí tampoco'],
        ex: [
          { t: 'match', p: [['papas arrugadas', 'salty boiled potatoes'], ['gofio', 'toasted grain flour'], ['mojo verde', 'green sauce'], ['bienmesabe', 'almond dessert'], ['barraquito', 'layered coffee']], skill: 'vocab' },
          { t: 'fill', q: 'Me ___ las papas arrugadas. (gustar)', a: ['gustan'], skill: 'grammar', ex: 'las papas = plural → gustan.' },
          { t: 'fill', q: 'Me ___ el queso de flor de Guía. (gustar)', a: ['gusta'], skill: 'grammar' },
          { t: 'fill', q: 'A mi hermano ___ gusta el gofio.', a: ['le'], skill: 'grammar' },
          { t: 'fill', q: '¿A vosotros ___ gustan los mojos?', a: ['os'], skill: 'grammar' },
          { t: 'fill', q: 'Nos ___ cocinar los domingos. (gustar)', a: ['gusta'], skill: 'grammar', ex: 'Infinitive → gusta.' },
          { t: 'mc', q: '—No me gusta el pescado salado. —___', o: ['A mí también.', 'A mí tampoco.', 'Yo también.'], a: 1, skill: 'grammar', ex: 'Agreeing with a negative sentence → a mí tampoco.' },
          { t: 'mc', q: 'Which one is correct?', o: ['Yo gusto el café.', 'Me gusta el café.', 'Me gusto el café.'], a: 1, skill: 'grammar' },
          { t: 'fix', q: 'A mis padres les gusta mucho los plátanos.', a: ['a mis padres les gustan mucho los plátanos', 'a mis padres les gustan mucho los platanos'], skill: 'grammar' },
          { t: 'order', w: ['me', 'el', 'encanta', 'mojo', 'rojo'], a: ['me encanta el mojo rojo'], en: 'I love red mojo.', skill: 'grammar' },
          { t: 'tr', en: 'For me, wrinkly potatoes with mojo, please.', a: ['para mí, unas papas arrugadas con mojo, por favor', 'para mi unas papas arrugadas con mojo por favor', 'para mí papas arrugadas con mojo por favor', 'para mí, papas arrugadas con mojo, por favor'], skill: 'writing' },
          { t: 'listen', say: 'Me encanta el gofio, pero no me gusta nada el café.', o: ['Likes gofio and coffee.', 'Loves gofio, doesn’t like coffee at all.', 'Doesn’t like gofio.'], a: 1, skill: 'listening' },
          { t: 'speak', prompt: 'Say two foods you love, one you like and one you don’t like at all.', sample: 'Me encantan las papas arrugadas y el queso. Me gusta el gofio. No me gusta nada el pescado salado.', target: ['me encanta', 'me gusta', 'no me gusta nada'], skill: 'speaking' }
        ] },
      { id: 'lp3l2', title: '¿Dónde está la farmacia?', en: 'Everyday conversations: shops & directions', skill: 'speaking', minutes: 22, vocab: [],
        intro: sec('Shops', T('Shops and what they sell', ['Spanish', 'English', 'You buy…'], [['la panadería', 'bakery', 'pan, bollos'], ['la frutería', 'greengrocer’s', 'fruta, verdura, plátanos'], ['la farmacia', 'chemist’s / pharmacy', 'medicinas, crema solar'], ['el supermercado', 'supermarket', 'de todo'], ['el mercado', 'market', 'pescado, queso, fruta'], ['el quiosco', 'kiosk', 'periódicos, revistas'], ['el estanco', 'tobacconist’s', 'sellos, tarjetas de guagua'], ['la tienda de ropa', 'clothes shop', 'camisetas, bañadores']], [0])) +
          sec('In a shop', EX([['Buenos días. ¿Tiene plátanos de Canarias?', 'Good morning. Do you have Canarian bananas?'], ['Me pone un kilo de tomates, por favor.', 'A kilo of tomatoes, please. (Spain: «me pone»)'], ['¿Cuánto cuesta este queso? / ¿Cuánto cuestan estas naranjas?', 'How much is this cheese? / How much are these oranges?'], ['—¿Algo más? —No, nada más, gracias.', '—Anything else? —No, that’s all, thanks.'], ['¿Se puede pagar con tarjeta?', 'Can I pay by card?'], ['¿Cuánto es? — Son seis euros con cincuenta.', 'How much is it? — It’s six fifty.']])) +
          sec('Asking for directions', '<ol><li><b>¿Dónde está + el/la + specific place?</b> <span class="es">¿Dónde está la estación de guaguas de San Telmo?</span></li><li><b>¿Hay + un/una + place + por aquí?</b> (is there any…?) <span class="es">¿Hay una farmacia por aquí?</span> — Use <b>hay</b> with un/una, <b>está</b> with el/la.</li><li>Polite start: <span class="es">Perdone, ¿sabe dónde está…?</span> (usted) · <span class="es">Perdona, ¿sabes…?</span> (tú)</li></ol>') +
          T('Giving directions', ['Spanish', 'English'], [['Siga / Sigue todo recto.', 'Go straight on.'], ['Gire / Gira a la derecha.', 'Turn right.'], ['Gire / Gira a la izquierda.', 'Turn left.'], ['Coja / Coge la primera calle a la izquierda.', 'Take the first street on the left.'], ['Cruce / Cruza la plaza.', 'Cross the square.'], ['al final de la calle', 'at the end of the street'], ['en la esquina', 'on the corner'], ['enfrente de / al lado de', 'opposite / next to'], ['a cinco minutos andando', 'five minutes’ walk away']], [0]) +
          sec('Rules', '<ol><li>Commands: with strangers use the <b>usted</b> form (siga, gire, coja, cruce); with friends use <b>tú</b> (sigue, gira, coge, cruza).</li><li><b>a la derecha</b> (to the right) ≠ <b>todo recto / derecho</b> (straight on). Don’t mix them!</li><li><b>de + el = del</b>: <span class="es">al lado del mercado, enfrente del parque</span>.</li><li>In Las Palmas people often give directions with landmarks: <span class="es">el parque Santa Catalina, la playa de Las Canteras, la calle Triana, el barrio de Vegueta</span>.</li></ol>') +
          sec('Dialogue', EX([['—Perdone, ¿hay una farmacia por aquí?', '—Excuse me, is there a pharmacy around here?'], ['—Sí, en la calle Triana. Siga todo recto y gire la segunda a la derecha.', '—Yes, on Triana street. Go straight on and take the second right.'], ['—¿Está lejos?', '—Is it far?'], ['—No, está a cinco minutos andando, al lado de una panadería.', '—No, it’s five minutes’ walk, next to a bakery.'], ['—Muchas gracias.', '—Thank you very much.'], ['—De nada.', '—You’re welcome.']])),
        mistakes: ['❌ ¿Dónde está una farmacia? → ✅ ¿Hay una farmacia por aquí? (unknown place → hay)', '❌ ¿Hay la estación? → ✅ ¿Dónde está la estación?', '❌ Gire a la recta → ✅ Siga todo recto', '❌ ¿Cuánto cuesta estas naranjas? → ✅ ¿Cuánto cuestan…? (plural)', '❌ Al lado de el mercado → ✅ Al lado del mercado'],
        ex: [
          { t: 'match', p: [['la panadería', 'bread'], ['la farmacia', 'medicine'], ['la frutería', 'fruit'], ['el quiosco', 'newspapers'], ['el estanco', 'stamps']], skill: 'vocab' },
          { t: 'mc', q: '___ un supermercado por aquí?', o: ['¿Dónde está', '¿Hay', '¿Está'], a: 1, skill: 'grammar', ex: 'un/una + unknown place → ¿Hay…?' },
          { t: 'mc', q: '___ la playa de Las Canteras?', o: ['¿Hay', '¿Dónde está', '¿Dónde hay'], a: 1, skill: 'grammar', ex: 'A specific place with la → ¿Dónde está…?' },
          { t: 'fill', q: '¿Cuánto ___ estos plátanos? (costar)', a: ['cuestan'], skill: 'grammar', ex: 'Plural → cuestan (o→ue).' },
          { t: 'fill', q: 'La farmacia está al lado ___ mercado.', a: ['del'], skill: 'grammar' },
          { t: 'mc', q: '“Go straight on” (to a stranger)', o: ['Gire a la derecha.', 'Siga todo recto.', 'Coja la derecha.'], a: 1, skill: 'vocab' },
          { t: 'match', p: [['enfrente de', 'opposite'], ['al lado de', 'next to'], ['en la esquina', 'on the corner'], ['al final de', 'at the end of'], ['todo recto', 'straight on']], skill: 'vocab' },
          { t: 'fill', q: '—¿Algo más? —No, ___ más, gracias.', a: ['nada'], skill: 'vocab' },
          { t: 'order', w: ['la', 'derecha', 'gire', 'a', 'la', 'segunda'], a: ['gire la segunda a la derecha'], en: 'Take the second (street) on the right.', skill: 'grammar' },
          { t: 'tr', en: 'Excuse me, is there a bakery around here?', a: ['perdone, ¿hay una panadería por aquí?', 'perdone hay una panaderia por aqui', 'perdona, ¿hay una panadería por aquí?', 'perdone, hay una panadería por aquí?'], skill: 'writing' },
          { t: 'listen', say: 'Siga todo recto y gire la primera a la izquierda. La farmacia está en la esquina.', o: ['Straight, first left, pharmacy on the corner.', 'First right, pharmacy opposite.', 'Straight, second left, pharmacy at the end.'], a: 0, skill: 'listening' },
          { t: 'speak', prompt: 'Ask a stranger where the bus station is, then thank them.', sample: 'Perdone, ¿dónde está la estación de guaguas? Muchas gracias.', target: ['perdone', 'dónde está', 'gracias'], skill: 'speaking' }
        ] }
    ],
    review: { keyVocab: [], grammar: ['me/te/le/nos/os/les + gusta (singular, infinitive) / gustan (plural).', 'Article with the noun: me gusta el queso.', 'A mí también (+) · a mí tampoco (−).', 'encantar, interesar, doler work like gustar.', '¿Hay un/una…? for any place · ¿Dónde está el/la…? for a specific place.', 'Commands: siga/sigue, gire/gira, coja/coge, cruce/cruza.', 'de + el = del: al lado del mercado.'], expressions: ['¿Qué me recomienda?', 'Para mí…', 'Me pone…', '¿Algo más? — Nada más.', '¿Se puede pagar con tarjeta?', 'todo recto · a la derecha · a la izquierda'], mistakes: ['Yo gusto → Me gusta', 'Me gusta las papas → Me gustan', '¿Dónde está una farmacia? → ¿Hay una farmacia?', 'Cuánto cuesta estas → Cuánto cuestan'] },
    exam: [
      { t: 'fill', q: 'Me ___ mucho los postres canarios. (gustar)', a: ['gustan'], skill: 'grammar' },
      { t: 'fill', q: 'A Dani ___ encanta el sancocho.', a: ['le'], skill: 'grammar' },
      { t: 'fill', q: 'Nos ___ pasear por Vegueta. (gustar)', a: ['gusta'], skill: 'grammar' },
      { t: 'mc', q: '—Me encanta el mojo verde. —___', o: ['A mí tampoco.', 'A mí también.', 'Yo gusto también.'], a: 1, skill: 'grammar' },
      { t: 'mc', q: 'What is «gofio»?', o: ['A Canarian bus', 'Flour of toasted grain', 'A spicy sauce'], a: 1, skill: 'vocab' },
      { t: 'fix', q: 'Yo gusto las papas arrugadas.', a: ['me gustan las papas arrugadas', 'a mí me gustan las papas arrugadas'], skill: 'grammar' },
      { t: 'mc', q: '___ un cajero por aquí?', o: ['¿Hay', '¿Dónde está', '¿Está'], a: 0, skill: 'grammar' },
      { t: 'fill', q: 'El hotel está enfrente ___ parque.', a: ['del'], skill: 'grammar' },
      { t: 'fill', q: '¿Cuánto ___ el queso? (costar)', a: ['cuesta'], skill: 'grammar' },
      { t: 'listen', say: 'Coja la segunda calle a la derecha y siga todo recto hasta la playa.', o: ['Second street right, then straight to the beach.', 'Second left, then turn at the beach.', 'First right, the beach is opposite.'], a: 0, skill: 'listening' },
      { t: 'read', text: 'En el mercado de Vegueta, Ana compra un kilo de plátanos y un queso de flor de Guía. Paga con tarjeta. Después toma un barraquito en un bar enfrente del mercado.', q: 'Where does Ana have a barraquito?', o: ['Inside the market', 'In a bar opposite the market', 'At home'], a: 1, skill: 'reading' },
      { t: 'tr', en: 'I love Canarian bananas, but I don’t like gofio.', a: ['me encantan los plátanos de canarias pero no me gusta el gofio', 'me encantan los plátanos de canarias, pero no me gusta el gofio', 'me encantan los platanos de canarias pero no me gusta el gofio'], skill: 'writing' },
      { t: 'speak', prompt: 'Order food in a restaurant and ask for the bill.', sample: 'Para mí, unas papas arrugadas con mojo y un agua, por favor. ¿Me trae la cuenta?', target: ['para mí', 'por favor', 'la cuenta'], skill: 'speaking' }
    ],
    homework: { id: 'hw_lp3', title: 'Homework LP3 — Comer y moverse', parts: [
      { h: 'A. gusta or gustan?', items: [['Me ___ el gofio.', 'gusta'], ['Te ___ los mojos.', 'gustan'], ['Le ___ nadar.', 'gusta'], ['Nos ___ las guaguas nuevas.', 'gustan']] },
      { h: 'B. Pronoun', items: [['A ti ___ gusta el café.', 'te'], ['A mis abuelos ___ gustan los postres.', 'les'], ['A nosotras ___ encanta la playa.', 'nos']] },
      { h: 'C. Hay or está?', items: [['¿Dónde ___ el parque Santa Catalina?', 'está'], ['¿___ una farmacia por aquí?', 'Hay'], ['¿Dónde ___ la catedral?', 'está']] },
      { h: 'D. Directions', items: [['Go straight on (usted)', 'Siga todo recto.'], ['Turn left (tú)', 'Gira a la izquierda.'], ['Take the first street on the right (usted)', 'Coja la primera calle a la derecha.']] },
      { h: 'E. Writing', open: true, items: [['Write a short dialogue (6 lines) in a shop or asking for directions in Las Palmas.', 'Sample: —Buenos días, ¿tiene plátanos? —Sí, ¿cuántos quiere? —Un kilo, por favor. —¿Algo más? —No, nada más. ¿Cuánto es? —Dos euros.']], rubric: ['Polite phrases', 'hay / está', 'gustar or prices', 'Directions or shop words'] }] }
  });

  /* =================================================================
     PALMA · Capítulo 3 · Los pronombres de objeto
     ================================================================= */
  reg({ id: 'pm3', city: 'palma', level: 'A2', num: 3, title: 'Lo, la, le', en: 'Direct & indirect object pronouns', goal: 'Replace nouns with object pronouns, put them in the right place, and combine them (se lo, me la).',
    lessons: [
      { id: 'pm3l1', title: '¿El billete? Lo tengo yo.', en: 'Direct object pronouns', skill: 'grammar', minutes: 22, vocab: [],
        intro: sec('Definition', P('The <b>direct object</b> is the person or thing that receives the action directly: <span class="es">Compro <b>el billete</b>.</span> To avoid repeating it, we replace it with a <b>direct object pronoun</b>: <span class="es"><b>Lo</b> compro.</span> (I buy it.)')) +
          T('Direct object pronouns', ['Person', 'Pronoun', 'Example'], [['yo', 'me', 'Ana me llama.'], ['tú', 'te', 'Te veo mañana.'], ['él / usted (m) · it (m)', 'lo', 'El billete: lo tengo.'], ['ella / usted (f) · it (f)', 'la', 'La maleta: la llevo yo.'], ['nosotros/as', 'nos', 'Nos invitan a cenar.'], ['vosotros/as', 'os', 'Os espero en el puerto.'], ['ellos / ustedes (m) · them', 'los', 'Los billetes: los compro.'], ['ellas / ustedes (f) · them', 'las', 'Las fotos: las hago yo.']], [1, 2]) +
          sec('Where does the pronoun go?', '<ol><li><b>Before a conjugated verb</b>: <span class="es">Lo compro. No lo compro. Lo he comprado.</span></li><li><b>Attached to an infinitive or a gerund</b> — or before the whole group (both are correct): <span class="es">Voy a comprar<b>lo</b> = <b>Lo</b> voy a comprar. Estoy leyéndo<b>lo</b> = <b>Lo</b> estoy leyendo.</span></li><li><b>Attached to a positive command</b>: <span class="es">¡Cómpra<b>lo</b>!</span> — but <b>before</b> a negative command: <span class="es">¡No <b>lo</b> compres!</span></li><li>When you attach it, you may need a written accent to keep the stress: <span class="es">leyendo → leyéndolo, compra → cómpralo</span>.</li></ol>') +
          sec('Rules', '<ol><li>lo / la / los / las agree with the noun they replace: <span class="es">la playa → la</span>, <span class="es">los museos → los</span>.</li><li><b>lo</b> can replace a whole idea: <span class="es">—¿Sabes dónde está el hotel? —No, no <b>lo</b> sé.</span></li><li><b>Leísmo (Spain):</b> for a <b>man</b>, many Spaniards say <b>le</b> instead of lo: <span class="es">A Toni <b>le</b> veo mañana.</span> This is accepted by the RAE for a male person (singular). For things, always <b>lo</b>.</li><li>A person as direct object takes <b>a</b>: <span class="es">Veo <b>a</b> María → <b>La</b> veo.</span></li></ol>') +
          sec('Examples', EX([['—¿Tienes los billetes del barco? —Sí, los tengo en el móvil.', '—Do you have the boat tickets? —Yes, I have them on my phone.'], ['—¿Conoces la catedral de Palma? —No, no la conozco todavía.', '—Do you know Palma Cathedral? —No, I don’t know it yet.'], ['Voy a visitarla mañana. / La voy a visitar mañana.', 'I’m going to visit it tomorrow.'], ['—¿Me esperas? —Sí, te espero en la plaza.', '—Will you wait for me? —Yes, I’ll wait for you in the square.'], ['¡Prueba la ensaimada! Pruébala, está buenísima.', 'Try the ensaimada! Try it, it’s delicious.'], ['—¿Sabes a qué hora sale el tren de Sóller? —No lo sé.', '—Do you know what time the Sóller train leaves? —I don’t know.']])),
        mistakes: ['❌ Compro lo → ✅ Lo compro', '❌ La maleta: lo llevo → ✅ la llevo (agreement)', '❌ Lo voy a comprarlo → ✅ Lo voy a comprar / Voy a comprarlo (only once)', '❌ ¡No cómpralo! → ✅ ¡No lo compres!', '❌ Los fotos → ✅ Las fotos: las hago'],
        ex: [
          { t: 'mc', q: '—¿Tienes el pasaporte? —Sí, ___ tengo.', o: ['la', 'lo', 'le'], a: 1, skill: 'grammar', ex: 'el pasaporte = masculine thing → lo.' },
          { t: 'mc', q: '—¿Compras las ensaimadas? —Sí, ___ compro.', o: ['los', 'las', 'les'], a: 1, skill: 'grammar' },
          { t: 'fill', q: '—¿Ves a Marta? —Sí, ___ veo.', a: ['la'], skill: 'grammar' },
          { t: 'fill', q: '—¿Conoces los museos de Palma? —No, no ___ conozco.', a: ['los'], skill: 'grammar' },
          { t: 'fill', q: '—¿Me llamas mañana? —Sí, ___ llamo a las diez.', a: ['te'], skill: 'grammar', ex: 'You ask about «me» → the answer uses «te».' },
          { t: 'mc', q: 'Which one is NOT correct?', o: ['Voy a comprarlo.', 'Lo voy a comprar.', 'Voy a lo comprar.'], a: 2, skill: 'grammar', ex: 'Before the conjugated verb or attached to the infinitive — never in between.' },
          { t: 'fix', q: '¡No cómpralo!', a: ['¡no lo compres!', 'no lo compres!', 'no lo compres'], skill: 'grammar', ex: 'Negative command: no + pronoun + subjunctive.' },
          { t: 'fill', q: '¡Prueba la ensaimada! ¡Prueba___!', a: ['la'], skill: 'grammar', ex: 'Positive command: attach → pruébala.' },
          { t: 'order', w: ['lo', 'no', 'sé'], a: ['no lo sé'], en: 'I don’t know (it).', skill: 'grammar' },
          { t: 'tr', en: 'The tickets? I have them.', a: ['¿los billetes? los tengo', 'los billetes? los tengo', 'los billetes los tengo', '¿los billetes? los tengo yo'], skill: 'writing' },
          { t: 'listen', say: '¿La catedral? Sí, la visitamos ayer.', o: ['We visited the cathedral yesterday.', 'We will visit the cathedral.', 'We don’t know the cathedral.'], a: 0, skill: 'listening' },
          { t: 'speak', prompt: 'Answer with a pronoun: ¿Tienes el móvil? ¿Conoces Palma? ¿Ves a tus amigos hoy?', sample: 'Sí, lo tengo. Sí, la conozco. No, no los veo hoy.', target: ['lo tengo', 'la conozco', 'los veo'], skill: 'speaking' }
        ] },
      { id: 'pm3l2', title: 'Se lo doy', en: 'Indirect object pronouns and double pronouns', skill: 'grammar', minutes: 24, vocab: [],
        intro: sec('Definition', P('The <b>indirect object</b> is the person who <b>receives</b> something or <b>benefits</b> from the action — “to whom?” or “for whom?”: <span class="es">Doy el regalo <b>a mi madre</b>.</span> → <span class="es"><b>Le</b> doy el regalo.</span> (I give her the present.)')) +
          T('Indirect object pronouns', ['Person', 'Pronoun', 'Example'], [['yo', 'me', 'Me escribe una postal.'], ['tú', 'te', 'Te compro un helado.'], ['él / ella / usted', 'le', 'Le enseño la ciudad.'], ['nosotros/as', 'nos', 'Nos explica la ruta.'], ['vosotros/as', 'os', 'Os traigo ensaimadas.'], ['ellos / ellas / ustedes', 'les', 'Les mando fotos.']], [1, 2]) +
          sec('Rules', '<ol><li>Same positions as direct pronouns: before a conjugated verb, or attached to an infinitive, gerund or positive command: <span class="es">Le escribo · Voy a escribirle · ¡Escríbele!</span></li><li><b>Doubling is normal in Spanish:</b> you usually keep <b>le/les</b> even when the person is named: <span class="es"><b>Le</b> doy el regalo <b>a mi madre</b>.</span> <span class="es"><b>Les</b> enseño Palma <b>a mis amigos</b>.</span></li><li>Use <b>a + él / ella / usted</b> to make <b>le</b> clear: <span class="es">Le escribo a ella, no a él.</span></li><li>Verbs like <b>gustar</b> always use indirect pronouns: <span class="es">Le gusta el mar.</span></li></ol>') +
          sec('Two pronouns together', '<ol><li>Order: <b>indirect + direct</b> (person before thing): <span class="es">Me lo das. Te la compro. Nos los envían.</span></li><li><b>le / les + lo / la / los / las → se</b>: never «le lo». <span class="es">Le doy el libro → <b>Se lo</b> doy.</span> <span class="es">Les mando las fotos → <b>Se las</b> mando.</span></li><li>Attached to an infinitive, gerund or positive command, both go at the end and you add an accent: <span class="es">Voy a dár<b>selo</b>. ¡Dí<b>melo</b>! Estoy explicándo<b>sela</b>.</span></li><li>Because <b>se</b> can mean him, her, you or them, add <b>a + person</b> if needed: <span class="es">Se lo doy <b>a ella</b>.</span></li></ol>') +
          T('From nouns to pronouns', ['Full sentence', 'With two pronouns'], [['Te doy la llave.', 'Te la doy.'], ['Le doy el billete a Toni.', 'Se lo doy.'], ['Os enseño las fotos.', 'Os las enseño.'], ['Les compro los helados a los niños.', 'Se los compro.'], ['¿Me dejas tu bici?', '¿Me la dejas?']], [0, 1]) +
          sec('Examples', EX([['—¿Le has dado el regalo a tu abuela? —Sí, se lo di ayer.', '—Have you given the present to your grandmother? —Yes, I gave it to her yesterday.'], ['—¿Me prestas tu toalla? —Claro, te la presto.', '—Can you lend me your towel? —Of course, I’ll lend it to you.'], ['—¿Les has enviado las fotos a tus padres? —No, voy a enviárselas esta noche.', '—Have you sent the photos to your parents? —No, I’m going to send them to them tonight.'], ['Dímelo con calma.', 'Tell me (it) calmly.'], ['A Toni le encanta Mallorca: le enseño la Serra de Tramuntana mañana.', 'Toni loves Mallorca: I’m showing him the Tramuntana mountains tomorrow.']])),
        mistakes: ['❌ Le lo doy → ✅ Se lo doy', '❌ Lo le doy → ✅ Se lo doy (indirect first, and le → se)', '❌ Doy el regalo a mi madre (correct but unnatural) → ✅ Le doy el regalo a mi madre', '❌ La doy un regalo (to her) → ✅ Le doy un regalo (indirect = le)', '❌ Dimelo → ✅ Dímelo (accent)'],
        ex: [
          { t: 'mc', q: '___ escribo una postal a mi abuela.', o: ['La', 'Le', 'Lo'], a: 1, skill: 'grammar', ex: '“to my grandmother” = indirect → le.' },
          { t: 'fill', q: '___ mando fotos a mis padres.', a: ['les'], skill: 'grammar' },
          { t: 'fill', q: '¿___ compro un helado? (to you, tú)', a: ['te'], skill: 'grammar' },
          { t: 'mc', q: 'Le doy el libro. → ___ doy.', o: ['Le lo', 'Se lo', 'Lo le'], a: 1, skill: 'grammar', ex: 'le + lo → se lo.' },
          { t: 'mc', q: 'Te doy la llave. → ___ doy.', o: ['Te la', 'La te', 'Se la'], a: 0, skill: 'grammar', ex: 'Indirect (te) + direct (la).' },
          { t: 'fill', q: 'Les compro las entradas. → ___ las compro.', a: ['se'], skill: 'grammar' },
          { t: 'fill', q: 'Os enseño las fotos. → Os ___ enseño.', a: ['las'], skill: 'grammar' },
          { t: 'mc', q: 'Voy a dar el regalo a Toni. →', o: ['Voy a dárselo.', 'Voy a darleslo.', 'Voy a lo darle.'], a: 0, skill: 'grammar', ex: 'Attached at the end + accent: dárselo.' },
          { t: 'fix', q: 'Le lo explico mañana.', a: ['se lo explico mañana', 'se lo explico manana'], skill: 'grammar' },
          { t: 'fill', q: '¡Di___! (tell it to me)', a: ['melo', 'mélo'], skill: 'grammar', ex: 'Dímelo — me + lo attached, with an accent on í.' },
          { t: 'order', w: ['se', 'di', 'ayer', 'lo'], a: ['se lo di ayer', 'ayer se lo di'], en: 'I gave it to him/her yesterday.', skill: 'grammar' },
          { t: 'tr', en: 'Can you lend me your bike? — Yes, I’ll lend it to you.', a: ['¿me prestas tu bici? sí, te la presto', 'me prestas tu bici? sí, te la presto', 'me prestas tu bici? si, te la presto', '¿me dejas tu bici? sí, te la dejo', 'me dejas tu bici? si, te la dejo'], skill: 'writing' },
          { t: 'listen', say: '¿Las fotos? Se las mando a mis padres esta noche.', o: ['She sends the photos to her parents tonight.', 'Her parents send her the photos.', 'She took photos of her parents.'], a: 0, skill: 'listening' },
          { t: 'speak', prompt: 'Answer with two pronouns: ¿Me das tu número? ¿Le mandas el mensaje a Toni?', sample: 'Sí, te lo doy. Sí, se lo mando ahora.', target: ['te lo doy', 'se lo mando'], skill: 'speaking' }
        ] }
    ],
    review: { keyVocab: [], grammar: ['Direct: me, te, lo, la, nos, os, los, las (what? whom?).', 'Indirect: me, te, le, nos, os, les (to/for whom?).', 'Position: before a conjugated verb; attached to infinitive, gerund and positive command.', 'Negative command: no + pronoun + verb (no lo compres).', 'Two pronouns: indirect + direct (me lo, te la).', 'le / les + lo/la/los/las → se lo, se la…', 'Doubling: le doy el regalo a mi madre.', 'Accents when attaching: dámelo, enviárselas.'], expressions: ['No lo sé.', 'Te lo presto.', 'Se lo digo.', 'Dímelo.', 'Voy a dárselo.'], mistakes: ['Compro lo → Lo compro', 'Le lo doy → Se lo doy', 'Lo voy a comprarlo → Lo voy a comprar', 'La doy un regalo → Le doy un regalo'] },
    exam: [
      { t: 'mc', q: '—¿Tienes la maleta? —Sí, ___ tengo.', o: ['lo', 'la', 'le'], a: 1, skill: 'grammar' },
      { t: 'fill', q: '—¿Ves a tus primos? —Sí, ___ veo los domingos.', a: ['los'], skill: 'grammar' },
      { t: 'fill', q: '___ escribo un mensaje a Toni.', a: ['le'], skill: 'grammar' },
      { t: 'mc', q: 'Le doy las llaves. →', o: ['Se las doy.', 'Le las doy.', 'Las le doy.'], a: 0, skill: 'grammar' },
      { t: 'mc', q: 'Me das el número. →', o: ['Me lo das.', 'Lo me das.', 'Se lo das.'], a: 0, skill: 'grammar' },
      { t: 'fill', q: 'Voy a comprar las ensaimadas. → Voy a comprar___.', a: ['las'], skill: 'grammar' },
      { t: 'fix', q: 'No cómpralo, es muy caro.', a: ['no lo compres, es muy caro', 'no lo compres es muy caro'], skill: 'grammar' },
      { t: 'fix', q: 'Le lo explico a mi hermana.', a: ['se lo explico a mi hermana'], skill: 'grammar' },
      { t: 'mc', q: 'Which sentence is correct?', o: ['Le doy un regalo a mi madre.', 'La doy un regalo a mi madre.', 'Lo doy un regalo a mi madre.'], a: 0, skill: 'grammar' },
      { t: 'listen', say: '¿El billete del tren de Sóller? Te lo compro yo mañana.', o: ['I’ll buy you the ticket tomorrow.', 'You buy me the ticket tomorrow.', 'The ticket is for tomorrow.'], a: 0, skill: 'listening' },
      { t: 'read', text: 'Laia está en Palma con sus amigos. Les enseña la catedral y el castillo de Bellver. Después compra ensaimadas para su abuela y se las lleva a casa. Su abuela le da las gracias.', q: 'Who are the ensaimadas for?', o: ['Her friends', 'Her grandmother', 'Herself'], a: 1, skill: 'reading' },
      { t: 'tr', en: 'The photos? I’m going to send them to my parents.', a: ['¿las fotos? voy a enviárselas a mis padres', 'las fotos? voy a enviárselas a mis padres', 'las fotos? se las voy a enviar a mis padres', '¿las fotos? se las voy a enviar a mis padres', 'las fotos? voy a mandárselas a mis padres', 'las fotos? se las voy a mandar a mis padres'], skill: 'writing' },
      { t: 'speak', prompt: 'Answer with pronouns: ¿Conoces la catedral? ¿Le das el regalo a tu madre?', sample: 'Sí, la conozco. Sí, se lo doy mañana.', target: ['la conozco', 'se lo doy'], skill: 'speaking' }
    ],
    homework: { id: 'hw_pm3', title: 'Homework PM3 — Lo, la, le', parts: [
      { h: 'A. Replace with a direct pronoun', items: [['Compro el billete.', 'Lo compro.'], ['Veo a Laia.', 'La veo.'], ['Hago las fotos.', 'Las hago.'], ['Conozco a tus primos.', 'Los conozco.']] },
      { h: 'B. Indirect pronoun', items: [['(to my mother) ___ escribo.', 'Le'], ['(to you, tú) ___ compro un helado.', 'Te'], ['(to my friends) ___ enseño Palma.', 'Les']] },
      { h: 'C. Two pronouns', items: [['Te doy la llave.', 'Te la doy.'], ['Le doy el libro.', 'Se lo doy.'], ['Les mando las fotos.', 'Se las mando.'], ['Nos explican la ruta.', 'Nos la explican.']] },
      { h: 'D. Attach the pronouns', items: [['Voy a dar el regalo a ella.', 'Voy a dárselo.'], ['¡Di la verdad a mí!', '¡Dímela!'], ['Estoy explicando el plan a ellos.', 'Estoy explicándoselo.']] },
      { h: 'E. Writing', open: true, items: [['Write 5 short answers with pronouns about a trip to Palma: tickets, hotel, photos, presents, friends.', 'Sample: ¿Los billetes? Los tengo. ¿El hotel? Lo he reservado. ¿Las fotos? Se las mando a mi madre…']], rubric: ['Pronoun agreement', 'Position', 'se lo / se la', 'Accents when attached'] }] }
  });

  /* ---------- the topics in each city now link to their lessons ---------- */
  const link = (city, label, id) => { const t = (MA.CITY[city].topics || []).find(x => x[0] === label); if (t) t[1] = id; };
  link('alicante', 'Simple sentence structure & questions', 'c4l1');
  link('alicante', 'Present tense: -er / -ir verbs and key irregulars', 'c4l2');
  link('laspalmas', 'Food & drinks: Canarian dishes, likes (gustar)', 'lp3l1');
  link('laspalmas', 'Everyday conversations: shops & directions', 'lp3l2');
  link('palma', 'Direct & indirect object pronouns', 'pm3l1');

  /* ---------- mentor lines ---------- */
  const m = (es, en) => ({ m: es, en });
  const add = (city, ch, lines, tips) => { const M = MA.MENTORS && MA.MENTORS[city]; if (!M) return; M.chapters = M.chapters || {}; M.tips = M.tips || {}; M.chapters[ch] = lines; Object.assign(M.tips, tips); };
  add('alicante', 'c4', [m('Ahora vamos a construir frases y a hacer preguntas. ¡Sin «do» ni «does»!', 'Now we build sentences and ask questions. No “do” or “does”!'), m('Y después, los verbos en -er e -ir: como, vivo… y los irregulares más importantes.', 'Then -er and -ir verbs: como, vivo… and the most important irregular verbs.')],
    { c4l1: [m('Para negar, solo «no» delante del verbo: no hablo alemán.', 'To make it negative, just «no» before the verb: no hablo alemán.'), m('La preposición va primero: ¿de dónde eres?', 'The preposition goes first: ¿de dónde eres?')], c4l2: [m('-er e -ir solo cambian en nosotros y vosotros: comemos, vivimos.', '-er and -ir only differ in nosotros and vosotros: comemos, vivimos.'), m('Sé = facts. Conozco = people and places.', 'Sé = facts. Conozco = people and places.')] });
  add('laspalmas', 'lp3', [m('¡Vamos a comer! Papas arrugadas, gofio, mojo… y el verbo gustar.', 'Let’s eat! Papas arrugadas, gofio, mojo… and the verb gustar.'), m('Luego te enseño a comprar y a moverte por Las Palmas sin perderte.', 'Then I’ll show you how to shop and get around Las Palmas without getting lost.')],
    { lp3l1: [m('Me gusta el mojo, me gustan las papas: el verbo mira a la comida, no a ti.', 'Me gusta el mojo, me gustan las papas: the verb looks at the food, not at you.'), m('¿No te gusta? Pues «a mí tampoco», no «a mí también».', 'Don’t like it? Then «a mí tampoco», not «a mí también».')], lp3l2: [m('¿Hay una farmacia por aquí? — para un sitio cualquiera. ¿Dónde está la farmacia? — para uno concreto.', '¿Hay una farmacia por aquí? for any place. ¿Dónde está la farmacia? for a specific one.'), m('Recto es todo recto. Derecha es a la derecha. ¡No los mezcles!', 'Straight is «todo recto». Right is «a la derecha». Don’t mix them!')] });
  add('palma', 'pm3', [m('Hoy, los pronombres: lo, la, le… pequeños pero muy importantes.', 'Today, pronouns: lo, la, le… small but very important.'), m('Al final dirás «se lo doy» como un mallorquín.', 'By the end you’ll say «se lo doy» like a local.')],
    { pm3l1: [m('El pronombre va delante del verbo: lo compro. Con infinitivo, al final: voy a comprarlo.', 'The pronoun goes before the verb: lo compro. With an infinitive, at the end: voy a comprarlo.')], pm3l2: [m('«Le lo» no existe. Siempre «se lo».', '«Le lo» does not exist. Always «se lo».'), m('Persona primero, cosa después: me lo, te la.', 'Person first, thing second: me lo, te la.')] });

  /* ---------- extra chapters never lock a finished city ---------- */
  H.cityMilestone = (orig => function (c) {
    if (c.final) return orig(c);
    const all = MA.CHAPTERS.filter(x => x.city === c.id), core = all.filter(x => !x.extra);
    if (!core.length || core.length === all.length) return orig(c);
    const passed = core.filter(x => MA.S.examPassed(x.id)).length;
    return { done: passed === core.length, text: `Pass all ${c.name} chapter exams (${passed}/${core.length} passed${all.length > core.length ? ' · extra chapters are optional' : ''}).`, prog: passed / core.length };
  })(H.cityMilestone);
})();
