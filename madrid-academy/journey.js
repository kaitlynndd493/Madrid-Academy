/* MADRID ACADEMY — Phase 1: ten-city journey, stage navigation, six learning categories, breadcrumbs & back navigation */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;

  /* =====================================================================
     DATA — stages, cities, Alicante reading passages and expressions
     ===================================================================== */
  MA.STAGES = {
    beginner: { name: 'Beginner', cefr: 'A1–A2', desc: 'Build your foundations: sounds, survival Spanish, the present tense and your first past tenses.', cities: ['alicante', 'laspalmas', 'palma'] },
    intermediate: { name: 'Intermediate', cefr: 'B1–B2', desc: 'Tell stories, give opinions and advice, use the subjunctive and handle longer conversations.', cities: ['murcia', 'malaga', 'sevilla'] },
    advanced: { name: 'Advanced', cefr: 'C1–C2', desc: 'Nuance, academic and professional Spanish, literature, irony and near-native comprehension.', cities: ['zaragoza', 'valencia', 'barcelona'] }
  };
  const W = (id, title, prompt, sample, level, minWords, rubric) => ({ id, title, prompt, sample, level, minWords, rubric });
  const R_A2 = ['Task fully completed', 'Correct verb tenses', 'Varied, accurate vocabulary', 'Clear order with connectors'];
  const R_B = ['Task fully completed with relevant detail', 'Accurate tenses incl. subjunctive where needed', 'Connectors organise the text', 'Register suits the reader'];
  const R_C = ['Clear, well-structured argument', 'Precise, varied vocabulary and idioms', 'Complex structures used accurately', 'Register and tone fully controlled'];
  const T = (id, title, partner, look, scenario, greet, level) => ({ id, title, partner, look, scenario, greet, level });
  const LK = {
    a: { hair: 'bob', hairColor: '#3a2a20', skin: '#e6bb98', eyes: '#3a281c', outfit: 'knit', shoes: 'sneakers', acc: [] },
    b: { hair: 'short', hairColor: '#2a1d16', skin: '#d9a982', eyes: '#2a1e16', outfit: 'tee-jeans', shoes: 'sneakers', acc: [], male: true },
    c: { hair: 'long', hairColor: '#6b4a32', skin: '#f1d3bc', eyes: '#4f6b4a', outfit: 'cardigan', shoes: 'loafers', acc: ['earrings'] },
    d: { hair: 'short', hairColor: '#5a4a3e', skin: '#efcfb4', eyes: '#33261d', outfit: 'blazer', shoes: 'loafers', acc: ['glasses'], male: true },
    e: { hair: 'ponytail', hairColor: '#1a1a1f', skin: '#b07a55', eyes: '#2e2118', outfit: 'dress', shoes: 'flats-black', acc: ['necklace'] }
  };
  MA.CITIES = [
    { id: 'alicante', name: 'Alicante', stage: 'beginner', order: 1, cefr: 'A0 → A1', level: 'A1', lon: -0.48, lat: 38.35, lab: [34, 4, 'start'], sea: true, pal: ['#fbeedd', '#eec29a'], region: 'Comunidad Valenciana · Costa Blanca', built: true,
      intro: 'Your journey begins on the Costa Blanca. Alicante is a sunny Mediterranean port city with the Postiguet beach in the centre, the Castillo de Santa Bárbara on Mount Benacantil above it, and the palm-lined Explanada de España along the harbour.',
      culture: 'Spanish and Valencian are both official in the Valencian Community, so you will see signs in both. In class you learn standard European Spanish.',
      topics: [['Spanish alphabet: all 27 letters', null], ['Pronunciation & IPA: Castilian sounds', 'c1l4'], ['Greetings & introductions', 'c1l1'], ['SER & subject pronouns (incl. vosotros)', 'c1l2'], ['Nationalities & gender agreement', 'c1l3'], ['Basic vocabulary: café, food & drinks', 'c2l1'], ['Articles & gender', 'c2l1'], ['Numbers 0–20 & prices', 'c2l2'], ['Full number system (21 to millions, ordinals, dates)', null], ['Present tense of regular -ar verbs', 'c2l3'], ['Simple sentence structure & questions', null], ['Everyday survival Spanish', 'c2l3']],
      writing: [], talk: [
        T('alicante-1', 'Language exchange on the Explanada', 'Álex', LK.b, 'You meet Álex, a student from Alicante, at a language exchange (intercambio) on the Explanada. Greet each other, say names, where you are from and what you study.', '¡Hola! Soy Álex. ¿Eres nueva en el intercambio?', 'A1'),
        T('alicante-2', 'A drink at a beach bar on the Postiguet', 'Nuria', LK.a, 'Nuria works at a chiringuito (beach bar) on the Postiguet beach. Order a drink and something to eat, ask the price and pay. Prices: agua 1,50 €, refresco 2,20 €, café con leche 1,80 €, bocadillo 4 €, helado 2,50 €.', '¡Buenas! ¿Qué te pongo?', 'A1')] },
    { id: 'laspalmas', name: 'Las Palmas de Gran Canaria', short: 'Las Palmas', stage: 'beginner', order: 2, cefr: 'A1 → early A2', level: 'A2', lon: -15.42, lat: 28.1, canary: true, lab: [24, 4, 'start'], sea: true, pal: ['#e8f1ef', '#9fcfc6'], region: 'Islas Canarias · Gran Canaria',
      intro: 'Las Palmas is one of the two capitals of the Canary Islands, in the Atlantic Ocean off north-west Africa. It is known for the long Las Canteras beach and the historic Vegueta quarter.',
      culture: 'Canarian Spanish sounds different from central Spain: most people use seseo (no /θ/ sound), say «ustedes» instead of «vosotros», and call a bus a «guagua». You will learn to recognise these features while keeping European standard Spanish as your model.',
      topics: [['Family & relationships', null], ['Food & drinks', null], ['Colours & clothing', null], ['Time, dates & schedules', null], ['Daily routines & reflexive verbs', null], ['Descriptions with ser & estar', null], ['Shopping', null], ['Asking questions', null], ['Common irregular verbs', null], ['Everyday conversations', null]],
      writing: [W('w-laspalmas-1', 'My family', 'Describe your family in 6–8 sentences: who they are, what they are like, what they do.', 'Mi familia es pequeña. Mi madre se llama Lan y es profesora. Es muy paciente. Mi padre es ingeniero y le gusta cocinar. Tengo un hermano menor; es estudiante y es muy divertido.', 'A2', 35, R_A2),
        W('w-laspalmas-2', 'My daily routine', 'Write about a normal weekday: when you get up, what you do in the morning, afternoon and evening. Use reflexive verbs (levantarse, ducharse, acostarse).', 'Me levanto a las siete. Me ducho y desayuno un café con tostadas. A las nueve voy a clase. Por la tarde estudio en la biblioteca. Me acuesto a las once.', 'A2', 35, R_A2),
        W('w-laspalmas-3', 'Shopping message', 'Write a message to a friend: you went to a clothes shop in Triana street. Describe two things you saw (colours, sizes, prices).', '¡Hola, Ana! Hoy estoy en la calle Triana. Hay una camiseta azul muy bonita: cuesta quince euros. También hay unos zapatos negros, pero son caros.', 'A2', 30, R_A2)],
      talk: [T('laspalmas-1', 'Buying clothes in Triana', 'Yaiza', LK.e, 'Yaiza is a shop assistant in a clothes shop on Calle Triana. The learner wants to buy something: ask about colours, sizes (talla), trying on (probarse) and price.', '¡Buenas tardes! ¿Le puedo ayudar en algo?', 'A2'),
        T('laspalmas-2', 'Talking about family at Las Canteras', 'Iballa', LK.c, 'Iballa, a friendly local, chats on Las Canteras beach about families: who is in your family, ages, what they are like, what they do.', '¡Hola! ¿Tú también vienes mucho a Las Canteras? ¿Estás aquí con tu familia?', 'A2')] },
    { id: 'palma', name: 'Palma de Mallorca', short: 'Palma', stage: 'beginner', order: 3, cefr: 'A2', level: 'A2', lon: 2.65, lat: 39.57, lab: [0, 40, 'middle'], sea: true, pal: ['#f4eedf', '#d9c3a0'], region: 'Illes Balears · Mallorca',
      intro: 'Palma is the capital of Mallorca and of the Balearic Islands. Its Gothic cathedral, La Seu, rises above the bay, and the old town is full of courtyards (patios).',
      culture: 'Catalan (in its Mallorcan variety) and Spanish are both official in the Balearic Islands. You will notice Catalan street names and greetings such as «bon dia», while your lessons stay in Spanish.',
      topics: [['Preterite tense', null], ['Imperfect tense', null], ['Preterite vs imperfect', null], ['Present perfect', null], ['Future expressions (ir a + infinitive)', null], ['Direct & indirect object pronouns', null], ['Comparisons', null], ['Travel vocabulary', null], ['Invitations', null], ['Describing past experiences', null]],
      writing: [W('w-palma-1', 'Last weekend', 'Write 8–10 sentences about what you did last weekend. Use the preterite (fui, comí, visité…).', 'El sábado fui a la playa con mis amigos. Comimos en un restaurante pequeño y después visitamos la catedral. Por la noche vimos una película.', 'A2', 50, R_A2),
        W('w-palma-2', 'When I was a child', 'Describe your life when you were a child. Use the imperfect (vivía, jugaba, era…).', 'Cuando era pequeña, vivía en una casa con jardín. Todos los días jugaba con mi hermano. Mi abuela siempre cocinaba los domingos.', 'A2', 50, R_A2),
        W('w-palma-3', 'An invitation', 'Write an email inviting a friend to visit you in Palma. Suggest a plan, a date and a time, and ask them to answer.', 'Hola, Carla: ¿Quieres venir a Palma el próximo fin de semana? Podemos visitar la catedral y comer en el puerto. ¿Te va bien el sábado a las doce? Un abrazo.', 'A2', 45, R_A2)],
      talk: [T('palma-1', 'Your weekend, in the past', 'Joan', LK.d, 'Joan, a café owner in the old town, asks what the learner did last weekend and shares his own story. Encourage preterite and imperfect.', 'Bon dia! Perdona, quiero decir… ¡buenos días! ¿Qué tal el fin de semana?', 'A2'),
        T('palma-2', 'Planning a trip to the Serra de Tramuntana', 'Marga', LK.c, 'Marga helps the learner plan a day trip to the Serra de Tramuntana mountains: transport, times, what to bring. Use future expressions and invitations.', '¡Hola! ¿Te apetece ir a la Serra de Tramuntana este sábado?', 'A2')] },
    { id: 'murcia', name: 'Murcia', stage: 'intermediate', order: 4, cefr: 'B1 foundations', level: 'B1', lon: -1.13, lat: 37.98, lab: [-34, 4, 'end'], pal: ['#f5ecd9', '#d8b27a'], region: 'Región de Murcia',
      intro: 'Murcia sits in the fertile valley of the Segura river, surrounded by the huerta (traditional orchards and market gardens). Its cathedral has a striking Baroque façade.',
      culture: 'The Murcian accent often softens or drops the final «s» and some consonants. Locals are proud of their huerta traditions and food, from vegetables to «paparajotes» (a lemon-leaf dessert).',
      topics: [['Past-tense distinctions', null], ['Future & conditional', null], ['Present perfect review', null], ['Introduction to the subjunctive', null], ['Expressing emotions', null], ['Opinions & preferences', null], ['Giving advice', null], ['Storytelling', null], ['Everyday idioms', null], ['Extended conversations', null]],
      writing: [W('w-murcia-1', 'Advice for a stressed friend', 'A friend is stressed about exams. Write a message giving advice. Use «te recomiendo que…», «es importante que…» + subjunctive.', 'Querida Laura: Siento que estés tan estresada. Te recomiendo que duermas bien y que hagas descansos. Es importante que no estudies toda la noche…', 'B1', 80, R_B),
        W('w-murcia-2', 'City or village?', 'Give your opinion: is it better to live in a city or in a village? Give two reasons and one example.', 'En mi opinión, vivir en un pueblo tiene muchas ventajas. Primero, la vida es más tranquila… Sin embargo, creo que…', 'B1', 90, R_B),
        W('w-murcia-3', 'A story with a surprise', 'Write a short story (120 words) about an unexpected event. Combine preterite and imperfect.', 'Era una tarde tranquila en la huerta. Hacía calor y mi abuelo dormía la siesta. De repente, oímos un ruido extraño…', 'B1', 110, R_B)],
      talk: [T('murcia-1', 'Giving advice', 'Paula', LK.a, 'Paula, a university student in Murcia, is worried about finding a job after graduating. The learner gives advice (subjunctive after recomendar, sugerir, es mejor que…).', 'Uf, estoy un poco agobiada. Termino la carrera en junio y no sé qué hacer. ¿Tú qué harías?', 'B1'),
        T('murcia-2', 'Opinions about city life', 'Andrés', LK.d, 'Andrés runs a small farm in the huerta. Discuss city life vs village life, expressing opinions and agreeing/disagreeing politely.', '¡Buenas! ¿A ti qué te gusta más, la ciudad o el campo?', 'B1')] },
    { id: 'malaga', name: 'Málaga', stage: 'intermediate', order: 5, cefr: 'B1 → early B2', level: 'B1', lon: -4.42, lat: 36.72, lab: [0, 40, 'middle'], sea: true, pal: ['#fbeee4', '#e7b08f'], region: 'Andalucía · Costa del Sol',
      intro: 'Málaga is the main city of the Costa del Sol, with the Moorish Alcazaba fortress, the Roman theatre and many museums. It is the birthplace of Pablo Picasso.',
      culture: 'Andalusian Spanish has its own rhythm and pronunciation (for example, aspirated or dropped final «s»). You will practise understanding it while speaking standard European Spanish.',
      topics: [['Subjunctive in context', null], ['Complex sentences', null], ['Advanced connectors', null], ['Hypothetical situations', null], ['Formal vs informal language', null], ['News & media', null], ['Social situations', null], ['Longer listening comprehension', null], ['Paragraph & essay writing', null], ['Natural conversational expressions', null]],
      writing: [W('w-malaga-1', 'If I won the lottery', 'Write about what you would do if you won the lottery. Use «si + imperfect subjunctive, conditional».', 'Si me tocara la lotería, lo primero que haría sería viajar por toda Sudamérica. Después, compraría un piso con vistas al mar…', 'B2', 120, R_B),
        W('w-malaga-2', 'A formal complaint', 'Write a formal email to a hotel about problems during your stay (noise, cleanliness). Ask for a solution. Use usted and formal connectors.', 'Estimados señores: Me dirijo a ustedes para expresar mi descontento con mi estancia en su hotel del 3 al 6 de mayo…', 'B2', 120, R_B),
        W('w-malaga-3', 'Summarise a news story', 'Choose a recent news topic (tourism, climate, culture). Summarise it in one paragraph and give your opinion in a second paragraph.', 'Según las noticias, el número de turistas en la Costa del Sol ha aumentado… En mi opinión, aunque el turismo es positivo para la economía…', 'B2', 140, R_B)],
      talk: [T('malaga-1', 'Discussing the news', 'Rocío', LK.e, 'Rocío, a journalism student, talks about a news story on tourism in Málaga. Discuss causes, consequences and opinions with connectors.', '¿Has visto la noticia sobre los pisos turísticos en el centro? Me tiene preocupada.', 'B1'),
        T('malaga-2', 'Hypothetical situations', 'Curro', LK.b, 'Curro, a waiter in the Soho district, plays a game of hypotheticals: «¿Qué harías si…?». Practise si-clauses.', 'Vamos a jugar a una cosa: ¿qué harías si mañana no tuvieras que trabajar?', 'B1')] },
    { id: 'sevilla', name: 'Sevilla', stage: 'intermediate', order: 6, cefr: 'B2', level: 'B2', lon: -5.98, lat: 37.39, lab: [-34, 4, 'end'], pal: ['#fbeadf', '#e2a07c'], region: 'Andalucía · capital',
      intro: 'Sevilla, the capital of Andalusia, lies on the Guadalquivir river. The Giralda tower, the Real Alcázar and the Plaza de España are among its landmarks.',
      culture: 'Sevilla is famous for Semana Santa and the Feria de Abril, and it is an important centre of flamenco, which UNESCO lists as Intangible Cultural Heritage.',
      topics: [['Advanced subjunctive', null], ['Conditional structures', null], ['Passive voice', null], ['Reported speech', null], ['Complex argumentation', null], ['Debates', null], ['Extended writing', null], ['Professional communication', null], ['Cultural discussions', null], ['B2 listening & speaking assessments', null]],
      writing: [W('w-sevilla-1', 'Opinion essay: tourist flats', 'Write an opinion essay (200 words): should cities limit tourist apartments? Present both sides and conclude.', 'En los últimos años, el número de pisos turísticos ha crecido de forma notable en el centro de Sevilla. Por un lado… Por otro lado… En conclusión…', 'B2', 180, R_B),
        W('w-sevilla-2', 'Cover letter', 'Write a cover letter for a job at a cultural foundation in Sevilla. Describe your experience and motivation.', 'Estimada señora Ruiz: Le escribo para presentar mi candidatura al puesto de coordinadora de proyectos culturales…', 'B2', 180, R_B),
        W('w-sevilla-3', 'Reported speech', 'Report a conversation you had yesterday using reported speech (me dijo que…, me preguntó si…).', 'Ayer mi compañera me dijo que estaba muy cansada y que no podría venir a la cena. Me preguntó si podíamos cambiar la fecha…', 'B2', 120, R_B)],
      talk: [T('sevilla-1', 'Debate: tourism in the centre', 'Macarena', LK.c, 'Macarena takes the opposite side of the learner in a debate about limiting tourist flats in Sevilla. Push for arguments, examples and counter-arguments.', 'Te aviso: yo creo que los pisos turísticos son buenos para la ciudad. Convénceme de lo contrario.', 'B2'),
        T('sevilla-2', 'Job interview', 'Sr. Domínguez', LK.d, 'Sr. Domínguez interviews the learner (formal, usted) for a job at a cultural foundation. Ask about experience, strengths, and a difficult situation they solved.', 'Buenos días, siéntese, por favor. Cuénteme un poco sobre su experiencia.', 'B2')] },
    { id: 'zaragoza', name: 'Zaragoza', stage: 'advanced', order: 7, cefr: 'C1 foundations', level: 'C1', lon: -0.88, lat: 41.65, lab: [-34, 4, 'end'], pal: ['#efeae2', '#c7b49b'], region: 'Aragón · capital',
      intro: 'Zaragoza, the capital of Aragón, stands on the Ebro river. The Basílica del Pilar dominates its skyline, and the Fiestas del Pilar fill the city every October.',
      culture: 'Aragonese speech has its own touches, such as the diminutive «-ico» (pequeñico) and a famous directness. The cierzo, a strong north-west wind, is part of daily life.',
      topics: [['Nuanced grammar', null], ['Advanced sentence structures', null], ['Academic vocabulary', null], ['Formal communication', null], ['Advanced idioms', null], ['Argumentative writing', null], ['Professional Spanish', null], ['Complex listening comprehension', null]],
      writing: [W('w-zaragoza-1', 'Argumentative essay', 'Write an argumentative essay (250 words): «La inteligencia artificial en la educación: ¿oportunidad o amenaza?»', 'Resulta innegable que la inteligencia artificial está transformando la educación. No obstante, cabe preguntarse si…', 'C1', 230, R_C),
        W('w-zaragoza-2', 'Project proposal', 'Write a formal project proposal for the Zaragoza city council: a cultural initiative along the Ebro. Include objectives, budget outline and impact.', 'Asunto: Propuesta de proyecto «Ebro Vivo». El presente documento tiene por objeto…', 'C1', 230, R_C),
        W('w-zaragoza-3', 'Academic summary', 'Summarise an academic or long article you have read recently in formal Spanish, then evaluate its argument.', 'El artículo analiza… El autor sostiene que… Si bien su argumentación resulta convincente en lo que respecta a…, cabría objetar que…', 'C1', 200, R_C)],
      talk: [T('zaragoza-1', 'Formal project meeting', 'Dra. Lasierra', LK.c, 'Dra. Lasierra chairs a formal meeting at the city council. The learner presents a project proposal and must defend budget and impact. Formal register.', 'Buenas tardes. Tiene usted diez minutos para presentar su propuesta. Adelante.', 'C1'),
        T('zaragoza-2', 'Academic discussion', 'Íñigo', LK.d, 'Íñigo, a philosophy lecturer, discusses an abstract topic (technology and attention) and challenges the learner to nuance their claims.', 'Dicen que nunca hemos tenido tanta información y tan poca atención. ¿Está de acuerdo?', 'C1')] },
    { id: 'valencia', name: 'Valencia', stage: 'advanced', order: 8, cefr: 'C1', level: 'C1', lon: -0.38, lat: 39.47, lab: [34, 4, 'start'], sea: true, pal: ['#eef2f0', '#b7cfc8'], region: 'Comunitat Valenciana · capital',
      intro: 'Valencia is Spain’s third-largest city, home to the City of Arts and Sciences, the Turia gardens built in an old riverbed, and the Fallas festival every March. Paella valenciana comes from here.',
      culture: 'Valencian (a variety of Catalan) and Spanish are both official. Respect for both languages is part of local life; your lessons continue in Spanish.',
      topics: [['Advanced discourse', null], ['Sophisticated expressions', null], ['Literary interpretation', null], ['Abstract discussions', null], ['Academic presentations', null], ['Cultural references', null], ['Advanced writing', null], ['High-level reading & listening', null]],
      writing: [W('w-valencia-1', 'Literary commentary', 'Write a commentary (250 words) on a poem or short story you know in Spanish: themes, style and your interpretation.', 'El poema plantea, desde los primeros versos, una reflexión sobre el paso del tiempo… La elección de imágenes…', 'C1', 230, R_C),
        W('w-valencia-2', 'Presentation script', 'Write the script for a 3-minute academic presentation about the Fallas as cultural heritage.', 'Buenos días a todos. Hoy me gustaría hablarles de las Fallas, una fiesta declarada Patrimonio Cultural Inmaterial…', 'C1', 230, R_C),
        W('w-valencia-3', 'Abstract essay', 'Essay: «¿Es la nostalgia un motor o un freno?» Develop a nuanced position.', 'La nostalgia suele presentarse como un sentimiento amable, casi inofensivo. Sin embargo…', 'C1', 230, R_C)],
      talk: [T('valencia-1', 'Discussing literature', 'Amparo', LK.c, 'Amparo runs a book club in the Ruzafa district. Discuss a novel’s themes, characters and style with nuance.', 'Bienvenida al club. Hoy hablamos de un libro que no deja a nadie indiferente. ¿Qué te pareció el final?', 'C1'),
        T('valencia-2', 'Q&A after a presentation', 'Vicent', LK.d, 'Vicent asks probing questions after the learner’s presentation on cultural heritage. The learner must answer clearly and defend ideas.', 'Muy interesante su presentación. Permítame una pregunta algo incómoda…', 'C1')] },
    { id: 'barcelona', name: 'Barcelona', stage: 'advanced', order: 9, cefr: 'C1 → C2 practice', level: 'C2', lon: 2.17, lat: 41.39, lab: [34, 4, 'start'], sea: true, pal: ['#f3ece6', '#d7a98f'], region: 'Catalunya · capital',
      intro: 'Barcelona, the capital of Catalonia, stretches between the Mediterranean and the Collserola hills. Gaudí’s Sagrada Família and Park Güell, the Gothic Quarter and the Eixample grid define the city.',
      culture: 'Catalan is Catalonia’s own language and is co-official with Spanish. Many people are bilingual; signs, schools and much daily life use Catalan. This game teaches Spanish, and you will learn a few polite Catalan words (bon dia, gràcies) out of respect.',
      topics: [['Highly nuanced language', null], ['Literary Spanish', null], ['Sophisticated argumentation', null], ['Humour & irony', null], ['Advanced idioms', null], ['Complex debates', null], ['Regional variation in Spanish', null], ['Near-native comprehension', null], ['Advanced speaking & writing challenges', null]],
      writing: [W('w-barcelona-1', 'Ironic column', 'Write a short newspaper column (250 words) with irony and humour about a modern habit (e.g. checking your phone constantly).', 'Hubo un tiempo, dicen los más viejos del lugar, en que la gente miraba al frente al caminar…', 'C2', 230, R_C),
        W('w-barcelona-2', 'Bilingualism essay', 'Essay: the advantages and challenges of living in a bilingual society. Be balanced and respectful.', 'Vivir en una sociedad bilingüe supone, ante todo, convivir con dos maneras de nombrar el mundo…', 'C2', 250, R_C),
        W('w-barcelona-3', 'Regional variation', 'Compare three features of Spanish in different regions (e.g. seseo, vosotros/ustedes, vocabulary). Explain with examples.', 'El español peninsular no es uniforme. En Canarias, por ejemplo, se emplea «ustedes» también en contextos informales…', 'C2', 230, R_C)],
      talk: [T('barcelona-1', 'A debate with irony', 'Jordi', LK.b, 'Jordi, a stand-up comedian, debates with humour and irony about city life. The learner must keep up with nuance, irony and idioms.', 'Bon dia! O sea, buenos días. Te aviso: hoy vengo con ganas de discutir… con cariño, eso sí.', 'C2'),
        T('barcelona-2', 'Bilingual life', 'Montse', LK.c, 'Montse, a teacher, talks respectfully about living between Catalan and Spanish. Discuss identity, language and coexistence with nuance.', 'Aquí en casa hablamos catalán, pero con mis amigos de Madrid, castellano. ¿Y tú, cómo vives con varios idiomas?', 'C2')] },
    { id: 'madrid', name: 'Madrid', stage: 'final', order: 10, cefr: 'All levels · free roam', level: 'B2', lon: -3.70, lat: 40.42, lab: [0, 46, 'middle'], pal: ['#f6eee4', '#e2cdb8'], region: 'Comunidad de Madrid · capital', final: true,
      intro: 'The capital and your final destination: free conversations, slang, humour, social life and open exploration after the nine-city journey.', culture: '', topics: [], writing: [], talk: [] }
  ];
  MA.CITY = Object.fromEntries(MA.CITIES.map(c => [c.id, c]));
  MA.CITIES.forEach(c => c.writing.forEach(w => { w.city = c.id; H.WRITING.push(w); }));

  MA.READINGS = [
    { id: 'alicante-1', city: 'alicante', title: 'Una postal desde Alicante', en: 'A postcard from Alicante', type: 'Postcard', level: 'A1',
      sentences: [['¡Hola, Marta!', 'Hi, Marta!'], ['Estoy en Alicante, en el este de España.', 'I am in Alicante, in the east of Spain.'], ['La ciudad es pequeña, pero muy bonita.', 'The city is small, but very pretty.'], ['Hay una playa muy grande en el centro: se llama el Postiguet.', 'There is a very big beach in the centre: it is called the Postiguet.'], ['Arriba, en una montaña, está el castillo de Santa Bárbara.', 'Up above, on a mountain, is the Castle of Santa Bárbara.'], ['Por la mañana estudio español y por la tarde tomo un helado en la Explanada.', 'In the morning I study Spanish and in the afternoon I have an ice cream on the Explanada.'], ['¡Un beso! Sofía', 'Love, Sofía']],
      phrases: { 'se llama': { en: 'is called', ctx: 'llamarse = to be called. «Se llama el Postiguet» = it is called the Postiguet.', pos: 'reflexive verb', gram: 'llamarse, 3rd person singular' }, 'por la mañana': { en: 'in the morning', ctx: 'por la mañana / por la tarde / por la noche', pos: 'expression' }, 'por la tarde': { en: 'in the afternoon / early evening', ctx: 'In Spain «la tarde» lasts until it gets dark.', pos: 'expression' }, 'un beso': { en: 'a kiss · love (sign-off)', ctx: 'Informal way to end a message to a friend or family.', pos: 'expression', gram: 'informal register' } },
      quiz: [{ q: 'Where is Alicante?', o: ['in the north of Spain', 'in the east of Spain', 'on an island'], a: 1 }, { q: 'What is on the mountain?', o: ['a beach', 'a castle', 'a school'], a: 1 }, { q: 'What does Sofía do in the afternoon?', o: ['She studies Spanish', 'She has an ice cream', 'She swims'], a: 1 }] },
    { id: 'alicante-2', city: 'alicante', title: 'El menú del día', en: 'The set menu', type: 'Dialogue', level: 'A1',
      sentences: [['Camarero: ¡Buenas! ¿Qué os pongo?', 'Waiter: Hi! What can I get you (both)?'], ['Ana: Para mí, un agua sin gas, por favor.', 'Ana: For me, a still water, please.'], ['Leo: Y para mí, una caña.', 'Leo: And for me, a small draught beer.'], ['Camarero: ¿Queréis comer algo?', 'Waiter: Do you want to eat something?'], ['Ana: Sí, ¿qué hay de menú del día?', 'Ana: Yes, what is on the set menu today?'], ['Camarero: De primero, ensalada o arroz. De segundo, pescado o pollo.', 'Waiter: For the first course, salad or rice. For the second course, fish or chicken.'], ['Camarero: Con pan, bebida y postre son doce euros.', 'Waiter: With bread, a drink and dessert it is twelve euros.'], ['Leo: ¡Perfecto! Dos menús, por favor.', 'Leo: Perfect! Two set menus, please.']],
      phrases: { 'qué os pongo': { en: 'what can I get you (all)?', ctx: 'os = to you (vosotros). The waiter speaks to two people informally, as is normal in Spain.', pos: 'phrase', gram: 'poner, yo form + os (indirect object, vosotros)' }, 'para mí': { en: 'for me', ctx: 'Used to order in a group.', pos: 'phrase' }, 'sin gas': { en: 'still (water)', ctx: 'agua con gas = sparkling; sin gas = still.', pos: 'phrase' }, 'por favor': { en: 'please', ctx: 'Polite request.', pos: 'expression' }, 'menú del día': { en: 'set menu of the day', ctx: 'A fixed-price lunch menu (first course, second course, drink, bread, dessert) found in most Spanish restaurants on weekdays.', pos: 'noun phrase', gram: 'masculine: el menú' }, 'de primero': { en: 'for the first course', ctx: 'de primero / de segundo / de postre', pos: 'expression' }, 'de segundo': { en: 'for the second course (main)', ctx: 'The main dish of the set menu.', pos: 'expression' } },
      quiz: [{ q: 'What does Ana drink?', o: ['sparkling water', 'still water', 'beer'], a: 1 }, { q: 'Which is a first course?', o: ['rice', 'chicken', 'fish'], a: 0 }, { q: 'How much is the set menu?', o: ['2 €', '12 €', '20 €'], a: 1 }, { q: 'Why does the waiter say «os»?', o: ['He speaks to one person formally', 'He speaks to two people informally', 'He speaks about other people'], a: 1 }] },
    { id: 'alicante-3', city: 'alicante', title: 'Mi compañera de piso', en: 'My flatmate', type: 'Description', level: 'A1',
      sentences: [['Me llamo Sofía y vivo en un piso pequeño en el centro de Alicante.', 'My name is Sofía and I live in a small flat in the centre of Alicante.'], ['Mi compañera de piso se llama Elena.', 'My flatmate is called Elena.'], ['Elena es de Valencia y es enfermera.', 'Elena is from Valencia and she is a nurse.'], ['Es alta, simpática y muy divertida.', 'She is tall, nice and very funny.'], ['Hoy está cansada porque trabaja por la noche.', 'Today she is tired because she works at night.'], ['Los domingos comemos arroz con su familia.', 'On Sundays we eat rice with her family.']],
      phrases: { 'me llamo': { en: 'my name is', ctx: 'llamarse, yo form.', pos: 'phrase' }, 'compañera de piso': { en: 'flatmate (female)', ctx: 'compañero/a de piso = person you share a flat with.', pos: 'noun phrase' }, 'se llama': { en: 'is called', ctx: 'llamarse, 3rd person singular.', pos: 'reflexive verb' }, 'por la noche': { en: 'at night', ctx: 'Time of day expression.', pos: 'expression' }, 'los domingos': { en: 'on Sundays (every Sunday)', ctx: 'The plural article + day = every week on that day.', pos: 'expression' } },
      quiz: [{ q: 'What is Elena’s job?', o: ['teacher', 'nurse', 'student'], a: 1 }, { q: '«Es alta» uses SER because…', o: ['it describes a characteristic', 'it is a temporary state', 'it is a location'], a: 0 }, { q: '«Está cansada» uses ESTAR because…', o: ['it is her profession', 'it describes a current state', 'it is her origin'], a: 1 }] }
  ];
  MA.READ_GLOSS = {
    'hola': { en: 'hello', pos: 'interjection' }, 'marta': { en: '(name)', pos: 'proper noun' }, 'estoy': { en: 'I am (location/state)', pos: 'verb', gram: 'estar, yo — location uses estar' }, 'en': { en: 'in / on / at', pos: 'preposition' }, 'alicante': { en: 'Alicante (city)', pos: 'proper noun' }, 'el': { en: 'the (masc.)', pos: 'article' }, 'este': { en: 'east · this', pos: 'noun · demonstrative', gram: 'el este = the east' }, 'de': { en: 'of / from', pos: 'preposition' }, 'españa': { en: 'Spain', pos: 'proper noun' }, 'la': { en: 'the (fem.)', pos: 'article' }, 'ciudad': { en: 'city', pos: 'noun', gram: 'feminine' }, 'es': { en: 'is', pos: 'verb', gram: 'ser — characteristic / identity' }, 'pequeña': { en: 'small', pos: 'adjective', gram: 'feminine of pequeño' }, 'pequeño': { en: 'small', pos: 'adjective', gram: 'masculine' }, 'pero': { en: 'but', pos: 'conjunction' }, 'muy': { en: 'very', pos: 'adverb' }, 'bonita': { en: 'pretty', pos: 'adjective', gram: 'feminine of bonito' }, 'hay': { en: 'there is / there are', pos: 'verb', gram: 'haber, impersonal' }, 'una': { en: 'a (fem.)', pos: 'article' }, 'un': { en: 'a (masc.)', pos: 'article' }, 'playa': { en: 'beach', pos: 'noun', gram: 'feminine' }, 'grande': { en: 'big', pos: 'adjective' }, 'centro': { en: 'centre', pos: 'noun', gram: 'masculine' }, 'postiguet': { en: '(name of the city beach)', pos: 'proper noun' }, 'arriba': { en: 'up, above', pos: 'adverb' }, 'montaña': { en: 'mountain', pos: 'noun', gram: 'feminine' }, 'está': { en: 'is (location/state)', pos: 'verb', gram: 'estar, 3rd person — location of a thing, or a current state' }, 'castillo': { en: 'castle', pos: 'noun', gram: 'masculine' }, 'santa': { en: 'saint (fem.)', pos: 'adjective · noun' }, 'bárbara': { en: 'Barbara (name)', pos: 'proper noun' }, 'estudio': { en: 'I study', pos: 'verb', gram: 'estudiar, yo' }, 'español': { en: 'Spanish (language)', pos: 'noun' }, 'y': { en: 'and', pos: 'conjunction' }, 'tomo': { en: 'I have (food/drink)', pos: 'verb', gram: 'tomar, yo' }, 'helado': { en: 'ice cream', pos: 'noun', gram: 'masculine' }, 'explanada': { en: 'esplanade (seafront promenade)', pos: 'noun' }, 'sofía': { en: '(name)', pos: 'proper noun' },
    'camarero': { en: 'waiter', pos: 'noun', gram: 'f: camarera' }, 'buenas': { en: 'hi (short for buenos días / buenas tardes)', pos: 'interjection', gram: 'informal' }, 'ana': { en: '(name)', pos: 'proper noun' }, 'agua': { en: 'water', pos: 'noun', gram: 'feminine, but el agua / un agua' }, 'leo': { en: '(name) · also: I read', pos: 'proper noun' }, 'caña': { en: 'small glass of draught beer', pos: 'noun', gram: 'feminine' }, 'queréis': { en: 'do you (all) want', pos: 'verb', gram: 'querer (e→ie), vosotros' }, 'comer': { en: 'to eat', pos: 'verb', gram: 'infinitive' }, 'algo': { en: 'something', pos: 'pronoun' }, 'sí': { en: 'yes', pos: 'adverb' }, 'qué': { en: 'what', pos: 'question word' }, 'ensalada': { en: 'salad', pos: 'noun' }, 'o': { en: 'or', pos: 'conjunction' }, 'arroz': { en: 'rice (often a rice dish)', pos: 'noun', gram: 'masculine' }, 'pescado': { en: 'fish (as food)', pos: 'noun', gram: 'pez = live fish' }, 'pollo': { en: 'chicken', pos: 'noun' }, 'con': { en: 'with', pos: 'preposition' }, 'pan': { en: 'bread', pos: 'noun' }, 'bebida': { en: 'drink', pos: 'noun' }, 'postre': { en: 'dessert', pos: 'noun', gram: 'masculine' }, 'son': { en: 'it is / they are (prices)', pos: 'verb', gram: 'ser — «son doce euros»' }, 'doce': { en: 'twelve', pos: 'number' }, 'euros': { en: 'euros', pos: 'noun' }, 'perfecto': { en: 'perfect', pos: 'adjective' }, 'dos': { en: 'two', pos: 'number' }, 'menús': { en: 'set menus', pos: 'noun', gram: 'plural of menú' },
    'vivo': { en: 'I live', pos: 'verb', gram: 'vivir, yo' }, 'piso': { en: 'flat, apartment', pos: 'noun', gram: 'Spain' }, 'mi': { en: 'my', pos: 'possessive' }, 'elena': { en: '(name)', pos: 'proper noun' }, 'valencia': { en: 'Valencia (city)', pos: 'proper noun' }, 'enfermera': { en: 'nurse (female)', pos: 'noun', gram: 'no article after ser: es enfermera' }, 'alta': { en: 'tall', pos: 'adjective', gram: 'feminine' }, 'simpática': { en: 'nice, friendly', pos: 'adjective' }, 'divertida': { en: 'funny, fun', pos: 'adjective' }, 'hoy': { en: 'today', pos: 'adverb' }, 'cansada': { en: 'tired', pos: 'adjective', gram: 'estar cansada — a current state' }, 'porque': { en: 'because', pos: 'conjunction' }, 'trabaja': { en: 'works', pos: 'verb', gram: 'trabajar, 3rd person' }, 'comemos': { en: 'we eat', pos: 'verb', gram: 'comer, nosotros' }, 'su': { en: 'her / his / their', pos: 'possessive' }, 'familia': { en: 'family', pos: 'noun' }
  };

  // type: idiom (meaning not literal) · expression (fixed everyday phrase) · colloquial · proverb · exclamation
  MA.IDIOMS = {
    alicante: [
      { es: '¡Que aproveche!', type: 'Expression', reg: 'Neutral · everyday', lit: 'May it benefit (you)!', mean: 'Enjoy your meal!', use: 'Said to people who are eating — friends, family, even other diners when you pass their table. Answer: «¡Gracias!».', not: 'Not used when someone is only drinking a coffee.', dlg: [['—¡Que aproveche!', '—Enjoy your meal!'], ['—¡Gracias! ¿Quieres probar?', '—Thanks! Do you want to try some?']], note: '«¡Buen provecho!» means the same and is also common.', when: 'You walk past your neighbours having lunch on their terrace.' },
      { es: 'No pasa nada', type: 'Expression', reg: 'Neutral–informal', lit: 'Nothing happens.', mean: 'No problem · it’s fine · don’t worry.', use: 'Reply to an apology or to calm someone down.', not: 'Too casual to answer a serious formal complaint.', dlg: [['—¡Ay, perdón! Te he pisado.', '—Oh, sorry! I stepped on you.'], ['—No pasa nada.', '—It’s fine.']], when: 'Someone apologises for bumping into you.' },
      { es: '¡Qué bien!', type: 'Exclamation', reg: 'Neutral', lit: 'How well!', mean: 'Great! · How nice!', use: 'Shows you are happy about news.', not: 'Sounds sarcastic if said with a flat voice after bad news.', dlg: [['—¡Mañana vamos a la playa!', '—Tomorrow we are going to the beach!'], ['—¡Qué bien!', '—Great!']], when: 'A friend tells you she passed her exam.' },
      { es: '¡Qué calor!', type: 'Exclamation', reg: 'Neutral', lit: 'What heat!', mean: 'It’s so hot!', use: 'Very common small talk in Alicante summers.', not: '', dlg: [['—¡Qué calor hace hoy!', '—It’s so hot today!'], ['—Sí, vamos a la sombra.', '—Yes, let’s go to the shade.']], note: 'Use HACER for weather: hace calor, hace frío.', when: 'It is 34 °C in August and you meet a friend in the street.' },
      { es: 'Poco a poco', type: 'Expression', reg: 'Neutral', lit: 'Little by little.', mean: 'Gradually · step by step.', use: 'To encourage patience, often when learning something.', not: '', dlg: [['—Mi español es muy malo.', '—My Spanish is very bad.'], ['—Poco a poco, ¡ya hablas mucho!', '—Little by little — you already speak a lot!']], note: 'Proverb version: «Poco a poco se va lejos».', when: 'A classmate is frustrated with verb endings.' },
      { es: '¡Ojo!', type: 'Colloquial', reg: 'Informal', lit: 'Eye!', mean: 'Watch out! · Careful!', use: 'Warning someone about something.', not: 'In a formal written warning use «Atención» or «Cuidado».', dlg: [['—¡Ojo, el suelo está mojado!', '—Careful, the floor is wet!'], ['—¡Gracias!', '—Thanks!']], note: 'Often with a gesture: pulling down the lower eyelid with one finger.', when: 'Your friend is about to step into the road without looking.' },
      { es: 'Ser pan comido', type: 'Idiom', reg: 'Informal', lit: 'To be eaten bread.', mean: 'To be very easy · a piece of cake.', use: 'Talking about an easy task or exam.', not: 'Avoid in formal writing.', dlg: [['—¿Qué tal el examen?', '—How was the exam?'], ['—¡Fue pan comido!', '—It was a piece of cake!']], when: 'A friend asks if the A1 quiz was difficult — it was very easy.' },
      { es: 'Estar en las nubes', type: 'Idiom', reg: 'Informal–neutral', lit: 'To be in the clouds.', mean: 'To be daydreaming · not paying attention.', use: 'When someone is distracted.', not: '', dlg: [['—¿Me estás escuchando?', '—Are you listening to me?'], ['—Perdona, estaba en las nubes.', '—Sorry, I was miles away.']], note: 'Uses ESTAR because it is a temporary state.', when: 'You did not hear the teacher’s question because you were thinking about the beach.' },
      { es: 'Tener buena pinta', type: 'Idiom', reg: 'Informal', lit: 'To have a good appearance/paint.', mean: 'To look good (especially food).', use: 'About food, plans or situations that look promising.', not: 'Not used to compliment a person’s looks.', dlg: [['—Mira esta paella.', '—Look at this paella.'], ['—¡Tiene muy buena pinta!', '—It looks delicious!']], when: 'The waiter brings a beautiful arroz to your table.' },
      { es: 'Más vale tarde que nunca', type: 'Proverb', reg: 'Neutral', lit: 'Late is worth more than never.', mean: 'Better late than never.', use: 'When something arrives or happens late but still happens.', not: '', dlg: [['—Perdón por el retraso.', '—Sorry I’m late.'], ['—Tranquila, más vale tarde que nunca.', '—Don’t worry, better late than never.']], when: 'Your friend finally answers your message after a week.' }
    ]
  };

  /* =====================================================================
     MIGRATION & STATUS
     ===================================================================== */
  H.migrate = function () {
    const s = st();
    ['arrivals', 'readings', 'idioms'].forEach(k => { if (!s[k] || typeof s[k] !== 'object') s[k] = {}; });
    if (!s.arrivals.alicante) s.arrivals.alicante = s.profile.createdAt || Date.now();
    if ((s.v || 1) < 2) { s.v = 2; try { localStorage.setItem('madrid-academy-v1', JSON.stringify(s)); } catch (e) { } }
  };
  H.academyName = () => { const c = H.currentCity(); return c.final ? 'Madrid' : 'Academia de ' + (c.short || c.name); };
  H.stageName = k => k === 'final' ? 'Madrid' : MA.STAGES[k].name;
  H.cityMilestone = function (c) {
    if (c.final) return { done: false, text: 'The end of the journey — free roam.' };
    const ch = MA.CHAPTERS.filter(x => x.city === c.id);
    if (!ch.length) return { done: false, soon: true, text: 'This city’s story milestone arrives with its lessons (coming soon).' };
    const passed = ch.filter(x => S.examPassed(x.id)).length;
    return { done: passed === ch.length, text: `Pass all ${c.name} chapter exams (${passed}/${ch.length} passed — more chapters coming soon).`, prog: passed / ch.length };
  };
  const nine = () => MA.CITIES.filter(c => !c.final);
  H.storyStatus = function (c) {
    if (H.cityMilestone(c).done) return 'completed';
    if (c.final) return 'current'; // Madrid is always open (Real World + Explore Madrid)
    if (c.order === 1) return 'current';
    const prev = MA.CITIES.find(x => x.order === c.order - 1);
    return H.cityMilestone(prev).done || st().profile.explore ? 'current' : 'locked';
  };
  H.currentCity = () => nine().find(c => H.storyStatus(c) === 'current' && !H.cityMilestone(c).done && (st().arrivals[c.id] || c.order === 1)) || (nine().every(c => H.cityMilestone(c).done) ? MA.CITY.madrid : MA.CITY.alicante);
  const STORY_PILL = { completed: ['ok', '✓ Completed'], current: ['cur', '● In progress'], locked: ['off', '🔒 Story locked'] };
  H.storyPill = c => { const s = H.storyStatus(c); const p = STORY_PILL[s]; return `<span class="pill ${p[0]}">${p[1]}</span>`; };
  H.studyPill = c => c.final ? '' : c.built ? '<span class="pill study">Available to study</span>' : '<span class="pill soon">Lessons coming soon</span>';

  /* =====================================================================
     CITY CONTENT INDEX & PROGRESS (real numbers only)
     ===================================================================== */
  const talkDone = id => ((st().chats['talk:' + id] || {}).msgs || []).filter(m => m.r === 'me').length >= 4;
  H.cityContent = function (c) {
    const ch = MA.CHAPTERS.filter(x => x.city === c.id);
    const lessons = ch.flatMap(x => x.lessons);
    const vocab = c.id === 'alicante' ? MA.VOCAB.map(v => v.id) : [];
    const idioms = MA.IDIOMS[c.id] || [];
    const stories = MA.STORIES.filter(s => s.city === c.id);
    const radio = MA.RADIO.filter(r => r.city === c.id);
    const readings = MA.READINGS.filter(r => r.city === c.id);
    const writing = H.WRITING.filter(w => w.city === c.id);
    const talks = c.talk;
    const npcs = c.id === 'alicante' ? ['lucia', 'carmen', 'javi'] : [];
    return { ch, lessons, vocab, idioms, stories, radio, readings, writing, talks, npcs };
  };
  H.cats = function (c) {
    const k = H.cityContent(c);
    const pr = (d, n) => n ? d / n : null;
    const vSaved = k.vocab.filter(id => st().vocab[id]).length;
    const hwN = k.ch.length * 2, hwD = k.ch.filter(x => (st().homework[x.homework.id] || {}).completed).length + k.ch.filter(x => S.examPassed(x.id)).length;
    const listenN = k.radio.length + (c.built ? 2 : 0), pracN = listenN + k.talks.length + k.npcs.length + k.readings.length + k.writing.length;
    const pracD = k.radio.filter(r => st().radio[r.id]).length + k.talks.filter(t => talkDone(t.id)).length + k.readings.filter(r => (st().readings[r.id] || {}).done).length + k.writing.filter(w => st().writings[w.id]).length + (c.built ? ['listen', 'prices'].filter(g => S.earned('game:' + g + ':' + S.today()) || Object.keys(st().ledger).some(x => x.startsWith('game:' + g + ':'))).length : 0) + k.npcs.filter(n => ((st().chats[n] || {}).msgs || []).some(m => m.r === 'me')).length;
    return [
      { key: 'vocabulary', name: 'Vocabulary', desc: 'Word collections with IPA, audio, examples, spaced repetition and games.', n: k.vocab.length, unit: 'words', p: pr(vSaved, k.vocab.length), pText: `${vSaved}/${k.vocab.length} in your book` },
      { key: 'grammar', name: 'Grammar', desc: 'Lessons organised in chapters, with tables, rules, common mistakes and exercises.', n: k.lessons.length, unit: 'lessons', p: pr(k.lessons.filter(l => S.lessonDone(l.id)).length, k.lessons.length), pText: `${k.lessons.filter(l => S.lessonDone(l.id)).length}/${k.lessons.length} completed` },
      { key: 'idioms', name: 'Idioms & Expressions', desc: 'Idioms, everyday expressions and colloquial phrases with literal and real meanings.', n: k.idioms.length, unit: 'expressions', p: k.idioms.length ? (st().idioms[c.id] || 0) / 100 : null, pText: st().idioms[c.id] != null ? `quiz best ${st().idioms[c.id]}%` : 'quiz not taken' },
      { key: 'fairytales', name: 'Fairy Tales', desc: 'Level-adapted retellings with tap-to-translate words, narration and quizzes.', n: k.stories.length, unit: 'stories', p: pr(k.stories.filter(s => (st().stories[s.id] || {}).read).length, k.stories.length), pText: `${k.stories.filter(s => (st().stories[s.id] || {}).read).length}/${k.stories.length} read` },
      { key: 'homework', name: 'Homework & Tests', desc: 'Homework by chapter with hidden answer keys, chapter reviews and exams.', n: hwN, unit: 'assignments & exams', p: pr(hwD, hwN), pText: `${hwD}/${hwN} done` },
      { key: 'practice', name: 'Practice', desc: 'Four skills: Listening, Speaking, Reading and Writing.', n: pracN, unit: 'activities', p: pr(pracD, pracN), pText: `${pracD}/${pracN} tried` }
    ];
  };
  const ICON = {
    vocabulary: '<path d="M10 8h22a4 4 0 0 1 4 4v28H14a4 4 0 0 1-4-4Z"/><path d="M14 40a4 4 0 0 1 0-8h22"/><path d="M17 16h12M17 22h8"/>',
    grammar: '<path d="M34 6 14 30l-3 9 9-3L40 12Z"/><path d="M30 10l6 6"/><path d="M8 42h32"/>',
    idioms: '<path d="M8 10h26a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H20l-8 7v-7H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z"/><path d="M14 18h16M14 23h10"/>',
    fairytales: '<path d="M8 40V20l6-6 6 6v20M28 40V16l6-8 6 8v24M4 40h40"/><path d="M14 30h0M34 26h0"/><circle cx="14" cy="28" r="2"/><circle cx="34" cy="24" r="2"/>',
    homework: '<path d="M14 6h20l6 6v30H14Z"/><path d="M34 6v6h6"/><path d="M19 20h14M19 26h14M19 32h9"/><path d="M8 14v28h6"/>',
    practice: '<path d="M10 28v-4a14 14 0 0 1 28 0v4"/><rect x="6" y="28" width="8" height="12" rx="3"/><rect x="34" y="28" width="8" height="12" rx="3"/>'
  };
  H.icon = (k, cls = '') => `<svg viewBox="0 0 48 48" class="cat-ic ${cls}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;
  H.catName = k => ({ vocabulary: 'Vocabulary', grammar: 'Grammar', idioms: 'Idioms', fairytales: 'Fairy Tales', homework: 'Homework', practice: 'Practice' })[k] || k;
  const CATS = ['vocabulary', 'grammar', 'idioms', 'fairytales', 'homework', 'practice'];
  const TABS = [['listening', 'Listening'], ['speaking', 'Speaking'], ['reading', 'Reading'], ['writing', 'Writing']];

  /* =====================================================================
     SPAIN MAP (keeps the illustrated parchment style of the original map)
     ===================================================================== */
  const P = (lon, lat) => [Math.round(120 + (lon + 9.6) * 57.5), Math.round(50 + (44 - lat) * 75)];
  const CP = (lon, lat) => [Math.round(48 + (lon + 18.2) * 52), Math.round(586 + (29.4 - lat) * 52)];
  const poly = pts => pts.map((p, i) => (i ? 'L' : 'M') + P(p[0], p[1]).join(' ')).join(' ') + 'Z';
  const SPAIN = [[-9.3, 43.2], [-8.4, 43.37], [-7.9, 43.77], [-7.0, 43.55], [-5.7, 43.58], [-4.4, 43.42], [-3.8, 43.47], [-2.9, 43.42], [-1.98, 43.32], [-1.79, 43.37], [-1.4, 43.05], [-0.7, 42.85], [0.7, 42.8], [1.45, 42.6], [2.2, 42.43], [3.17, 42.43], [3.32, 42.32], [3.2, 41.9], [2.8, 41.65], [2.2, 41.32], [1.25, 41.1], [0.9, 40.72], [0.5, 40.4], [0.0, 39.98], [-0.33, 39.45], [-0.2, 39.15], [0.23, 38.73], [-0.48, 38.33], [-0.6, 38.15], [-0.75, 37.85], [-0.98, 37.58], [-1.6, 37.38], [-2.0, 36.73], [-2.45, 36.83], [-3.52, 36.72], [-4.42, 36.7], [-4.9, 36.5], [-5.35, 36.15], [-5.6, 36.02], [-6.3, 36.53], [-6.4, 36.8], [-6.95, 37.2], [-7.4, 37.2], [-7.5, 37.6], [-7.0, 38.2], [-7.3, 38.8], [-7.0, 39.6], [-7.5, 39.7], [-6.9, 40.3], [-6.85, 41.0], [-6.2, 41.6], [-6.6, 41.95], [-7.4, 41.85], [-8.1, 41.85], [-8.85, 41.88], [-8.9, 42.2], [-9.0, 42.6], [-9.3, 42.9]];
  const PORTUGAL = [[-8.85, 41.88], [-8.1, 41.85], [-7.4, 41.85], [-6.6, 41.95], [-6.2, 41.6], [-6.85, 41.0], [-6.9, 40.3], [-7.5, 39.7], [-7.0, 39.6], [-7.3, 38.8], [-7.0, 38.2], [-7.5, 37.6], [-7.4, 37.2], [-8.0, 37.0], [-8.95, 37.0], [-8.8, 37.9], [-8.9, 38.5], [-9.5, 38.8], [-9.4, 39.4], [-9.0, 40.2], [-8.7, 41.0]];
  const FRANCE = [[-1.79, 43.37], [-1.4, 43.05], [-0.7, 42.85], [0.7, 42.8], [1.45, 42.6], [2.2, 42.43], [3.17, 42.43], [3.05, 42.9], [3.5, 43.3], [4.6, 43.4], [5.6, 43.2], [5.6, 44.4], [-1.3, 44.4], [-1.45, 43.6]];
  const AFRICA = [[-6.4, 35.78], [-5.92, 35.78], [-5.4, 35.92], [-5.3, 35.6], [-4.4, 35.2], [-3.0, 35.3], [-2.2, 35.1], [-1.2, 35.3], [0.1, 35.9], [1.2, 36.5], [3.0, 36.8], [5.6, 36.9], [5.6, 34.4], [-7.2, 34.4]];
  const ISLES = { mallorca: [[2.35, 39.6], [2.6, 39.85], [3.1, 39.95], [3.45, 39.75], [3.2, 39.35], [2.95, 39.33], [2.7, 39.5]], menorca: [[3.8, 39.95], [4.1, 40.08], [4.32, 39.88], [4.05, 39.83]], ibiza: [[1.2, 38.95], [1.45, 39.1], [1.6, 39.0], [1.4, 38.85]], formentera: [[1.38, 38.73], [1.55, 38.7], [1.5, 38.65]] };
  const CANARY = { 'La Palma': [-17.85, 28.65, 4, 9], 'El Hierro': [-18.0, 27.75, 5, 4], 'La Gomera': [-17.22, 28.1, 4, 4], 'Tenerife': [-16.6, 28.28, 13, 6], 'Gran Canaria': [-15.6, 27.95, 8, 8], 'Fuerteventura': [-14.05, 28.4, 6, 14], 'Lanzarote': [-13.65, 29.03, 6, 9] };
  H.cityXY = c => c.canary ? CP(c.lon, c.lat) : P(c.lon, c.lat);
  MA.spainSVG = function (opts = {}) {
    const hi = opts.highlight; const order = MA.CITIES.slice().sort((a, b) => a.order - b.order);
    let route = '';
    for (let i = 0; i < order.length - 1; i++) {
      const a = H.cityXY(order[i]), b = H.cityXY(order[i + 1]); const done = H.storyStatus(order[i]) === 'completed';
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - Math.min(80, Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.22);
      route += `<path opacity=".8" d="M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}" class="route ${done ? 'done' : ''}"/>`;
    }
    const pins = order.map(c => {
      const [x, y] = H.cityXY(c); const s = H.storyStatus(c); const dim = hi && !hi.includes(c.id);
      const label = c.short || c.name; const [dx, dy, anc] = c.lab;
      const w = label.length * 7.6 + 18; const bx = anc === 'start' ? dx - 6 : anc === 'end' ? dx - w + 6 : -w / 2;
      return `<g class="cpin ${s} ${c.final ? 'final' : ''} ${dim ? 'dim' : ''}" data-href="${c.final ? '#madrid' : '#city-' + c.id}" tabindex="0" role="link" aria-label="${esc(c.name)} — ${s === 'locked' ? 'story locked, available to study' : s}" transform="translate(${x} ${y})">
        ${s === 'current' ? '<circle r="22" class="ring"/>' : ''}<circle r="${c.final ? 17 : 14}" class="cp-body"/><text y="5" text-anchor="middle" class="cp-num">${c.final ? '★' : c.order}</text>
        ${s === 'locked' ? '<g transform="translate(11 -12)"><circle r="7" fill="#fffaf2" stroke="#cdbfb4"/><text y="3.5" text-anchor="middle" font-size="8">🔒</text></g>' : ''}
        <g transform="translate(0 ${dy - 4})"><rect x="${anc === 'middle' ? -w / 2 : bx}" y="${anc === 'middle' ? -13 : -15}" width="${w}" height="22" rx="11" class="pin-label-bg"/><text x="${anc === 'middle' ? 0 : dx}" y="${anc === 'middle' ? 3 : 1}" text-anchor="${anc}" class="pin-label">${esc(label)}</text></g></g>`;
    }).join('');
    const isles = Object.values(ISLES).map(p => `<path d="${poly(p)}" class="land"/>`).join('');
    const canary = Object.entries(CANARY).map(([n, [lo, la, rx, ry]]) => { const [x, y] = CP(lo, la); return `<ellipse cx="${x}" cy="${y}" rx="${rx * 2}" ry="${ry * 1.6}" class="land"/>`; }).join('');
    return `<svg viewBox="0 0 1000 700" class="map spain" role="group" aria-label="Map of Spain showing the ten-city journey">
      <defs><radialGradient id="seabg" cx=".55" cy=".45" r=".8"><stop offset="0" stop-color="#eef3ef"/><stop offset="1" stop-color="#dfe9e6"/></radialGradient>
      <pattern id="grid2" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><path d="M0 0 L40 0 M0 0 L0 40" stroke="#d9e3df" stroke-width="1"/></pattern>
      <radialGradient id="landg" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#fbf5ea"/><stop offset="1" stop-color="#efe2cf"/></radialGradient></defs>
      <rect width="1000" height="700" fill="url(#seabg)"/><rect width="1000" height="700" fill="url(#grid2)" opacity=".8"/>
      <path d="${poly(FRANCE)}" class="land other"/><path d="${poly(AFRICA)}" class="land other"/><path d="${poly(PORTUGAL)}" class="land other"/>
      <path d="${poly(SPAIN)}" class="land spain-land"/>${isles}
      <text x="${P(-4.2, 40)[0]}" y="${P(-4.2, 39.4)[1]}" class="map-country">ESPAÑA</text><text x="${P(-8.9, 39.8)[0]}" y="${P(-8.9, 39.8)[1]}" class="map-faint">Portugal</text><text x="${P(1.2, 43.9)[0]}" y="${P(1.2, 43.9)[1]}" class="map-faint">Francia</text><text x="${P(-3.2, 35.6)[0]}" y="${P(-3.2, 35.6)[1]}" class="map-faint">Marruecos</text>
      <text x="${P(2.2, 37.9)[0]}" y="${P(2.2, 37.9)[1]}" class="map-faint">Mar Mediterráneo</text><text x="${P(-6.2, 44)[0]}" y="${P(0, 43.85)[1]}" class="map-faint">Mar Cantábrico</text><text x="${P(3.0, 40.55)[0]}" y="${P(3.0, 40.55)[1]}" class="map-faint">Islas Baleares</text>
      <g class="inset"><rect x="24" y="560" width="300" height="124" rx="14" class="inset-box"/><text x="38" y="580" class="map-faint">Islas Canarias · Océano Atlántico</text><text x="38" y="596" class="tinylbl">inset — real position is far to the south-west</text>${canary}</g>
      ${route}${pins}
      <g transform="translate(940 90)"><circle r="30" fill="#fffaf2" stroke="#d6c3a5"/><path d="M0 -24 L6 0 L0 24 L-6 0Z" fill="#c9858f"/><path d="M-24 0 L0 -6 L24 0 L0 6Z" fill="#d6c3a5"/><text y="-34" text-anchor="middle" class="map-faint">N</text></g>
      <text x="640" y="636" class="map-title">Tu viaje</text><text x="642" y="662" class="map-faint">diez ciudades de España</text>
    </svg>`;
  };

  /* =====================================================================
     NAVIGATION — sidebar, breadcrumbs, back stack, scroll restore
     ===================================================================== */
  H.shell = function () {
    const lv = S.level(), cur = H.current;
    const cloud = { synced: ['ok', '☁ Saved to account'], connecting: ['wait', '☁ Connecting…'], error: ['warn', '⚠ Sync issue'], off: ['off', '💾 This browser only'] }[S.cloud] || ['off', S.cloud];
    const curCity = (() => { if (cur.name === 'city') return cur.arg.split('-')[0]; const t = H.trail(); const c = t.find(x => x[1] && x[1].startsWith('#city-')); return c ? c[1].slice(6).split('-')[0] : null; })();
    const curStage = curCity && MA.CITY[curCity] ? MA.CITY[curCity].stage : cur.name === 'stage' ? cur.arg : null;
    const link = (href, label, on, cls = '') => `<a href="${href}" class="${on ? 'on' : ''} ${cls}">${label}</a>`;
    const stageBlock = k => { const sg = MA.STAGES[k]; return `<div class="nav-stage ${curStage === k ? 'open' : ''}"><a href="#stage-${k}" class="stage-h ${cur.name === 'stage' && cur.arg === k ? 'on' : ''}"><b>${sg.name}</b><small>${sg.cefr}</small></a>
      <div class="nav-cities">${sg.cities.map(id => { const c = MA.CITY[id], s = H.storyStatus(c); return `<a href="#city-${id}" class="${curCity === id ? 'on' : ''}"><span class="dot ${s}">${s === 'completed' ? '✓' : c.order}</span>${esc(c.short || c.name)}${c.built ? '' : '<em>soon</em>'}</a>`; }).join('')}</div></div>`; };
    U.$('#nav').innerHTML = `<a class="brand" href="#home"><span class="crest">MA</span><span><b>Madrid Academy</b><small>A Spanish Adventure</small></span></a>
      <nav aria-label="Main">
        ${link('#home', '<span class="ic">🏠</span>Home', cur.name === 'home')}${link('#studyplan', `<span class="ic">${(MA.LUCIDE && MA.LUCIDE.calendarDays) || '📅'}</span>Study Plan`, cur.name === 'studyplan')}${link('#map', '<span class="ic">🗺️</span>World Map', cur.name === 'map')}
        <div class="nav-sec">${stageBlock('beginner')}${stageBlock('intermediate')}${stageBlock('advanced')}</div>
        ${link('#madrid', `<span class="ic">★</span>Madrid <small class="fd">Final Destination</small>`, ['madrid', 'place'].includes(cur.name), 'madrid-link')}
        <div class="nav-div"></div>
        ${link('#passport', '<span class="ic">🛂</span>Spanish Passport', cur.name === 'passport')}${link('#progress', '<span class="ic">📈</span>Progress', cur.name === 'progress')}${link('#wardrobe', '<span class="ic">👗</span>Avatar Wardrobe', cur.name === 'wardrobe')}${link('#preferences', '<span class="ic">⚙️</span>Settings', cur.name === 'preferences')}
      </nav>
      <div class="nav-foot"><a href="#quests" class="tiny">📜 Quest Journal</a><a class="tiny muted" href="#about">About & honest status</a></div>`;
    U.$('#top').innerHTML = `<button class="menu-btn" id="menu" aria-label="Open menu">☰</button>
      <a class="me" href="#wardrobe" title="Avatar wardrobe">${H.portrait(H.me(), 'xs')}<span><b>${esc(st().profile.name || 'Estudiante')}</b><small>Lv ${lv.lv} · ${esc((H.currentCity().short || H.currentCity().name))}</small></span></a>
      <div class="xpbox" title="${lv.into}/${lv.need} XP to next level"><small>${S.xp()} XP</small>${UI.bar(lv.into / lv.need, 'gold')}</div>
      <span class="stat" title="Coins">🪙 ${S.coins()}</span>
      <a class="sync ${cloud[0]}" href="#preferences" title="${esc(S.cloud === 'synced' ? 'Progress is stored in your private claude.ai artifact storage and available wherever you open this artifact signed in.' : S.cloudErr || 'Progress is stored in this browser only.')}">${cloud[1]}</a>`;
    U.$('#menu').onclick = () => document.body.classList.toggle('nav-open');
  };

  const SPEAK_NPC = ['lucia', 'carmen', 'javi'];
  // trail: [[label, href], ...] from Home to current page
  H.trail = function (name = H.current.name, arg = H.current.arg) {
    const home = ['Home', '#home'];
    const city = id => { const c = MA.CITY[id]; return c.final ? [['Madrid', '#madrid']] : [[MA.STAGES[c.stage].name, '#stage-' + c.stage], [c.short || c.name, '#city-' + id]]; };
    const cat = (id, k) => [...city(id), [H.catName(k), `#city-${id}-${k}`]];
    const tab = (id, t) => [...cat(id, 'practice'), [TABS.find(x => x[0] === t)[1], `#city-${id}-practice-${t}`]];
    const chOf = cid => MA.CHAPTERS.find(x => x.id === cid);
    switch (name) {
      case 'home': case 'create': case 'attendance': return [home];
      case 'map': return [home, ['World Map', '#map']];
      case 'stage': return [home, [MA.STAGES[arg] ? MA.STAGES[arg].name : 'Stage', '#stage-' + arg]];
      case 'city': { const [id, k, sub] = arg.split('-'); if (!MA.CITY[id]) return [home]; let t = [home, ...city(id)]; if (k) t.push([H.catName(k), `#city-${id}-${k}`]); if (k === 'practice' && sub && TABS.find(x => x[0] === sub)) t.push([TABS.find(x => x[0] === sub)[1], `#city-${id}-practice-${sub}`]); if (k === 'vocabulary' && sub) t.push([sub === 'saved' ? 'My book' : (H.vcatName ? H.vcatName(sub) : sub), `#city-${id}-vocabulary-${sub}`]); return t; }
      case 'lesson': { const l = MA.LESSONS[arg]; if (!l) return [home]; const c = chOf(l.chapter); return [home, ...cat(c.city, 'grammar'), [`Ch ${c.num} · ${c.title}`, `#city-${c.city}-grammar`], [l.title, '#lesson-' + arg]]; }
      case 'review': case 'exam': case 'homework': { const c = chOf(arg); if (!c) return [home]; return [home, ...cat(c.city, 'homework'), [`Ch ${c.num} ${({ review: 'review', exam: 'exam', homework: 'homework' })[name]}`, `#${name}-${arg}`]]; }
      case 'story': { const s = MA.STORIES.find(x => x.id === arg); return s ? [home, ...cat(s.city, 'fairytales'), [s.title, '#story-' + arg]] : [home]; }
      case 'radio': { const e = MA.RADIO.find(x => x.id === arg); return e ? [home, ...tab(e.city, 'listening'), [e.title, '#radio-' + arg]] : [home]; }
      case 'read': { const r = MA.READINGS.find(x => x.id === arg); return r ? [home, ...tab(r.city, 'reading'), [r.title, '#read-' + arg]] : [home]; }
      case 'talk': { const id = arg.split('-')[0]; const t = MA.CITY[id] && MA.CITY[id].talk.find(x => x.id === arg); return t ? [home, ...tab(id, 'speaking'), [t.title, '#talk-' + arg]] : [home]; }
      case 'write': { const w = H.WRITING.find(x => x.id === arg); return w && w.city ? [home, ...tab(w.city, 'writing'), [w.title, '#write-' + arg]] : [home]; }
      case 'chat': { const n = MA.NPCS[arg]; if (!n) return [home]; if (SPEAK_NPC.includes(arg)) return [home, ...tab('alicante', 'speaking'), [n.name, '#chat-' + arg]]; const p = MA.LOCATIONS.find(l => l.npc === arg); return [home, ['Madrid', '#madrid'], ...(p ? [[p.name, '#place-' + p.id]] : []), [n.name, '#chat-' + arg]]; }
      case 'game': { const g = H.GAMES.find(x => x[0] === arg); return [home, ...(['listen', 'prices'].includes(arg) ? tab('alicante', 'listening') : ['build', 'grammar'].includes(arg) ? tab('alicante', 'writing') : cat('alicante', 'vocabulary')), [g ? g[1] : 'Game', '#game-' + arg]]; }
      case 'vocab-review': return [home, ...cat('alicante', 'vocabulary'), ['Review', '#vocab-review']];
      case 'journal': return [home, ...tab('alicante', 'writing'), ['Journal', '#journal']];
      case 'madrid': return [home, ['Madrid', '#madrid']];
      case 'place': { const p = MA.LOCATIONS.find(l => l.id === arg); return [home, ['Madrid', '#madrid'], [p ? p.name : 'Place', '#place-' + arg]]; }
      case 'expressions': return [home, ['Madrid', '#madrid'], ['Madrid slang & expressions', '#expressions']];
      case 'prado-write': return [home, ['Madrid', '#madrid'], ['Museo del Prado', '#place-prado'], ['Describe a painting', '#prado-write']];
      case 'quests': return [home, ['Quest Journal', '#quests']];
      case 'quest': { const q = MA.QUESTS.find(x => x.id === arg); return [home, ['Quest Journal', '#quests'], [q ? q.title : 'Quest', '#quest-' + arg]]; }
      default: { const lbl = { passport: 'Spanish Passport', progress: 'Progress', wardrobe: 'Avatar Wardrobe', preferences: 'Settings', about: 'About', calendar: 'Calendar' }[name] || name; return [home, [lbl, '#' + name + (arg ? '-' + arg : '')]]; }
    }
  };
  // sequence siblings for Previous / Next
  H.seq = function (name = H.current.name, arg = H.current.arg) {
    const pick = (list, id, toHref, label) => { const i = list.findIndex(x => x.id === id); if (i < 0) return {}; const f = x => x && [label(x), toHref(x)]; return { prev: f(list[i - 1]), next: f(list[i + 1]) }; };
    if (name === 'lesson') { const l = MA.LESSONS[arg]; if (!l) return {}; const c = MA.CHAPTERS.find(x => x.id === l.chapter); return pick(H.cityContent(MA.CITY[c.city]).lessons, arg, x => '#lesson-' + x.id, x => x.title); }
    if (name === 'story') { const s = MA.STORIES.find(x => x.id === arg); return s ? pick(MA.STORIES.filter(x => x.city === s.city), arg, x => '#story-' + x.id, x => x.title) : {}; }
    if (name === 'read') { const r = MA.READINGS.find(x => x.id === arg); return r ? pick(MA.READINGS.filter(x => x.city === r.city), arg, x => '#read-' + x.id, x => x.title) : {}; }
    if (name === 'radio') { const r = MA.RADIO.find(x => x.id === arg); return r ? pick(MA.RADIO.filter(x => x.city === r.city), arg, x => '#radio-' + x.id, x => x.title) : {}; }
    if (name === 'write') { const w = H.WRITING.find(x => x.id === arg); return w ? pick(H.WRITING.filter(x => x.city === w.city), arg, x => '#write-' + x.id, x => x.title) : {}; }
    if (name === 'talk') { const c = MA.CITY[arg.split('-')[0]]; return c ? pick(c.talk, arg, x => '#talk-' + x.id, x => x.title) : {}; }
    if (['exam', 'review', 'homework'].includes(name)) { const c = MA.CHAPTERS.find(x => x.id === arg); if (!c) return {}; const list = MA.CHAPTERS.filter(x => x.city === c.city); return pick(list, arg, x => `#${name}-${x.id}`, x => `Ch ${x.num} ${name}`); }
    if (name === 'city') { const [id, k, sub] = arg.split('-'); const c = MA.CITY[id]; if (!c) return {}; if (!k) { const nx = MA.CITIES.find(x => x.order === c.order + 1), pv = MA.CITIES.find(x => x.order === c.order - 1); return { prev: pv && [pv.short || pv.name, pv.final ? '#madrid' : '#city-' + pv.id], next: nx && [nx.short || nx.name, nx.final ? '#madrid' : '#city-' + nx.id] }; } if (k === 'practice' && sub) { const i = TABS.findIndex(x => x[0] === sub); return { prev: TABS[i - 1] && [TABS[i - 1][1], `#city-${id}-practice-${TABS[i - 1][0]}`], next: TABS[i + 1] && [TABS[i + 1][1], `#city-${id}-practice-${TABS[i + 1][0]}`] }; } const i = CATS.indexOf(k); return { prev: CATS[i - 1] && [H.catName(CATS[i - 1]), `#city-${id}-${CATS[i - 1]}`], next: CATS[i + 1] && [H.catName(CATS[i + 1]), `#city-${id}-${CATS[i + 1]}`] }; }
    return {};
  };
  H.crumbBar = function () {
    const t = H.trail(); if (t.length < 2) return '';
    return `<nav class="crumbs" aria-label="Breadcrumb"><button class="btn small ghost back" id="nav-back" aria-label="Go back">← Back</button><ol>${t.map((c, i) => i === t.length - 1 ? `<li aria-current="page">${esc(c[0])}</li>` : `<li><a href="${c[1]}">${i === 0 ? '🏠 ' : ''}${esc(c[0])}</a></li>`).join('')}</ol></nav>`;
  };
  H.footNav = function () {
    const t = H.trail(); if (t.length < 3) return '';
    const sq = H.seq(); const seen = new Set(); const ups = t.slice(1, -1).reverse().filter(u => !seen.has(u[1]) && seen.add(u[1]));
    return `<nav class="foot-nav" aria-label="Page navigation">
      ${sq.prev ? `<a class="btn ghost" href="${sq.prev[1]}">← ${esc(sq.prev[0])}</a>` : '<span></span>'}
      <span class="ups">${ups.map(u => `<a class="btn small ghost" href="${u[1]}">Back to ${esc(u[0])}</a>`).join('')}<a class="btn small ghost" href="#home">🏠 Home</a></span>
      ${sq.next ? `<a class="btn primary" href="${sq.next[1]}">${esc(sq.next[0])} →</a>` : '<span></span>'}</nav>`;
  };
  H.navInit = function () { H.stack = [location.hash || '#home']; H.scrolls = {}; H.prevHash = H.stack[0]; };
  H.onHash = function () {
    const h = location.hash || '#home';
    H.scrolls[H.prevHash] = window.scrollY;
    let back = false;
    if (H.stack.length > 1 && H.stack[H.stack.length - 2] === h) { H.stack.pop(); back = true; }
    else if (H.stack[H.stack.length - 1] !== h) H.stack.push(h);
    if (H.stack.length > 80) H.stack.shift();
    H.prevHash = h; H.render();
    window.scrollTo(0, back ? (H.scrolls[h] || 0) : 0);
  };
  H.goBack = function () {
    if (H.stack.length > 1) { history.back(); return; }
    const t = H.trail(); location.hash = t.length > 1 ? t[t.length - 2][1] : '#home';
  };
  document.addEventListener('click', e => { if (e.target.closest('#nav-back')) H.goBack(); });

  const ALIAS = { academy: '#city-alicante-grammar', grammar: '#city-alicante-grammar', library: '#city-alicante-fairytales', exams: '#city-alicante-homework', speak: '#city-alicante-practice-speaking', curriculum: '#map' };
  H.render = function () {
    let { name, arg } = H.parse();
    let alias = ALIAS[name] && !arg ? ALIAS[name] : name === 'vocab' ? '#city-alicante-vocabulary' + (arg ? '-' + arg : '') : name === 'radio' && !arg ? '#city-alicante-practice-listening' : null;
    if (alias) { if (H.stack) { H.stack[H.stack.length - 1] = alias; H.prevHash = alias; } location.replace(alias); return; }
    if (!st().profile.onboarded && name !== 'about') name = 'create';
    H.current = { name, arg };
    try { name !== H.lastName && MA.Audio.stopLines && MA.Audio.stopLines(); } catch (e) { }
    H.lastName = name;
    H.shell();
    H._mounts = [];
    let html;
    try { html = V[name](arg); } catch (e) { console.error(e); html = `<div class="panel"><h2>Something went wrong</h2><p>${esc(e.message)}</p><a class="btn" href="#home">Back home</a></div>`; }
    const view = U.$('#view'); view.innerHTML = H.crumbBar() + html + H.footNav(); view.dataset.view = name;
    H.flushMounts(view);
    document.body.classList.remove('nav-open');
  };
  // reuse the mount queue from views1 (H.after pushes into it)
  H.flushMounts = function (view) { const q = H._queue.splice(0); q.forEach(fn => { try { fn(view); } catch (e) { console.error(e); } }); };
  H._queue = [];
  H.after = fn => H._queue.push(fn);
  H.catOf = (function (orig) { return (name, arg) => { if (name === 'city') { const [, k, sub] = arg.split('-'); return k === 'practice' ? ({ listening: 'listening', speaking: 'speaking', reading: 'reading', writing: 'grammar' })[sub || 'listening'] : k === 'fairytales' ? 'reading' : k === 'grammar' || k === 'homework' ? 'grammar' : k === 'vocabulary' || k === 'idioms' ? 'vocab' : null; } if (name === 'read') return 'reading'; if (name === 'talk') return 'speaking'; return orig(name, arg); }; })(H.catOf);

  /* =====================================================================
     VIEWS — world map, stage, city, categories
     ===================================================================== */
  const legend = `<div class="legend"><span><i class="lg completed"></i>Completed</span><span><i class="lg current"></i>Story in progress</span><span><i class="lg locked"></i>Story locked — still open to study</span><span><i class="lg final"></i>Final destination</span></div>`;
  V.map = function () {
    return `<div class="panel"><div class="ph"><div><p class="eyebrow">Mapa del viaje</p><h1>World Map</h1><p class="muted">Ten cities, in game order (not the shortest real route). Every city’s lessons are open to study at any time; the <b>story</b> unlocks city by city.</p></div></div>
      <div class="map-wrap">${MA.spainSVG()}</div>${legend}</div>
      <div class="journey-list">${MA.CITIES.map(c => `<a class="panel jcity ${H.storyStatus(c)}" href="${c.final ? '#madrid' : '#city-' + c.id}"><span class="jnum">${c.final ? '★' : c.order}</span><span><b>${esc(c.name)}</b><small>${c.final ? 'Final destination' : MA.STAGES[c.stage].name} · ${esc(c.cefr)}</small><span class="pills">${H.storyPill(c)} ${H.studyPill(c)}</span></span></a>`).join('')}</div>`;
  };
  V.stage = function (k) {
    const sg = MA.STAGES[k]; if (!sg) return V.map();
    return `<div class="panel stage-hero"><p class="eyebrow">${sg.cefr}</p><h1>${sg.name}</h1><p>${esc(sg.desc)}</p></div>
      <div class="stage-cities">${sg.cities.map(id => { const c = MA.CITY[id]; const cats = H.cats(c); const n = cats.reduce((a, x) => a + x.n, 0); return `<a class="panel scity" href="#city-${id}"><div class="scity-scene">${MA.sceneSVG(id, c.pal, { sea: c.sea })}<span class="scity-num">${c.order}</span></div>
        <div class="scity-body"><p class="eyebrow">${esc(c.cefr)} · ${esc(c.region)}</p><h2>${esc(c.name)}</h2><p class="muted">${esc(c.intro.split('. ')[0])}.</p><div class="pills">${H.storyPill(c)} ${H.studyPill(c)}</div><p class="tiny muted">${n} learning activities available now</p></div></a>`; }).join('')}</div>
      <div class="panel"><h3>Where these cities are</h3><div class="map-wrap">${MA.spainSVG({ highlight: sg.cities })}</div></div>`;
  };
  V.city = function (arg) {
    const [id, k, sub] = (arg || '').split('-'); const c = MA.CITY[id];
    if (!c) return V.map();
    if (c.final && !k) { location.replace('#madrid'); return ''; }
    if (!k) return H.cityHome(c);
    const head = `<div class="panel cat-head">${H.icon(k, 'lg')}<div><p class="eyebrow">${esc(c.name)} · ${esc(c.cefr)}</p><h1>${H.catName(k)}</h1></div></div>`;
    const fn = { vocabulary: H.cityVocab, grammar: H.cityGrammar, idioms: H.cityIdioms, fairytales: H.cityTales, homework: H.cityHomework, practice: H.cityPractice }[k];
    return fn ? fn(c, sub, head) : H.cityHome(c);
  };
  H.soon = (c, what) => `<div class="panel soon-box"><span class="pill soon">Coming soon</span><h3>${esc(what)} for ${esc(c.name)} are being written</h3><p>This section is not built yet. It will teach:</p><ul class="topics">${c.topics.map(t => `<li>${esc(t[0])}</li>`).join('')}</ul><p class="tiny muted">In the meantime, the Practice section of this city already has AI conversation and writing tasks at ${esc(c.level)} level.</p></div>`;

  H.cityHome = function (c) {
    const story = H.storyStatus(c), ms = H.cityMilestone(c), arrived = !!st().arrivals[c.id];
    const quests = MA.QUESTS.filter(q => q.city === c.id);
    const canTravel = story === 'current' && !arrived;
    H.after(view => { const b = view.querySelector('#travel'); if (b) b.onclick = () => H.travel(c); });
    return `<div class="panel scene-head city-hero">${MA.sceneSVG(c.id, c.pal, { sea: c.sea })}<div class="scene-title"><p class="eyebrow">${c.final ? 'City 10 · Final destination' : `City ${c.order} of 9 · ${esc(MA.STAGES[c.stage].name)}`} · ${esc(c.cefr)}</p><h1>${esc(c.name)}</h1><p class="region">${esc(c.region)}</p><div class="pills">${H.storyPill(c)} ${H.studyPill(c)}</div></div></div>
      ${canTravel ? `<div class="panel travel-box"><div><b>The road is open!</b><p class="muted">${c.final ? 'Madrid is open for testing.' : 'You completed the previous city’s milestone.'} Travel to ${esc(c.name)} to begin its story.</p></div><button class="btn primary big" id="travel">${c.canary || c.id === 'palma' ? '✈️' : '🚆'} Travel to ${esc(c.short || c.name)}</button></div>` : ''}
      <div class="panel city-intro"><p>${esc(c.intro)}</p>${c.culture ? `<p class="note"><b>Local language & culture:</b> ${esc(c.culture)}</p>` : ''}<p class="tiny muted">Your local mentor arrives in a later update (Phase 2).</p></div>
      <div class="cat-grid">${H.cats(c).map(x => `<a class="cat-card ${x.n ? '' : 'empty'}" href="#city-${c.id}-${x.key}">${H.icon(x.key)}<div class="cc-body"><h3>${x.name}</h3><p>${esc(x.desc)}</p></div>
        <div class="cc-foot">${x.n ? `<span class="cc-count"><b>${x.n}</b> ${x.n === 1 ? x.unit.replace(/^stories/, 'story').replace(/^words/, 'word').replace(/^lessons/, 'lesson').replace(/^expressions/, 'expression').replace(/^activities/, 'activity') : x.unit}</span>${x.p != null ? UI.bar(x.p) : ''}<small>${esc(x.pText)}</small>` : '<span class="pill soon">Coming soon</span>'}</div></a>`).join('')}</div>
      <div class="two"><div class="panel"><h3>What you learn in ${esc(c.short || c.name)}</h3><ul class="topics">${c.topics.map(t => `<li>${t[1] ? `<a href="#lesson-${t[1]}">${esc(t[0])}</a> <span class="pill study">available</span>` : `${esc(t[0])} <span class="pill soon">coming soon</span>`}</li>`).join('')}</ul></div>
      <div class="panel"><h3>Story</h3><p><b>Milestone:</b> ${esc(ms.text)}</p>${ms.prog != null ? UI.bar(ms.prog, 'gold') : ''}
        ${quests.length ? `<h4>Story quests</h4>${quests.map(q => { const done = S.questDone(q.id), un = !q.locked && S.unlocked(q.unlock); return `<a class="quest-row" href="${un || done ? '#quest-' + q.id : '#quests'}"><span class="${done ? 'qd' : un ? '' : 'ql'}">${done ? '✓' : un ? '!' : q.soon ? '…' : '🔒'}</span><b>${esc(q.title)}</b><small>${done ? 'Completed' : un ? esc(q.en) : q.soon ? 'Coming soon' : 'Story locked: ' + esc(q.unlockText)}</small></a>`; }).join('')}` : '<p class="muted">Story quests for this city: coming soon.</p>'}</div></div>`;
  };
  H.travel = function (c) {
    const ov = document.createElement('div'); ov.className = 'travel-ov';
    ov.innerHTML = `<div class="travel-card"><div class="travel-anim"><span>${c.canary || c.id === 'palma' ? '✈️' : '🚆'}</span></div><p class="eyebrow">Viajando a…</p><h2>${esc(c.name)}</h2><p class="muted">${esc(c.region)}</p></div>`;
    document.body.appendChild(ov);
    setTimeout(() => { st().arrivals[c.id] = Date.now(); S.save(true); S.award('travel:' + c.id, 20, 10, 'Arrived in ' + (c.short || c.name)); ov.classList.add('out'); setTimeout(() => { ov.remove(); H.render(); }, 500); }, 1800);
  };

  /* ---------- Vocabulary ---------- */
  H.cityVocab = function (c, sub, head) {
    if (!c.built) return head + H.soon(c, 'Vocabulary collections');
    return V.vocab(sub);
  };
  /* ---------- Grammar: table of contents ---------- */
  H.cityGrammar = function (c, sub, head) {
    const k = H.cityContent(c); if (!k.ch.length) return head + H.soon(c, 'Grammar chapters');
    const done = k.lessons.filter(l => S.lessonDone(l.id)).length;
    return head + `<div class="panel"><div class="ph"><h3>Table of contents</h3><span class="muted">${done}/${k.lessons.length} lessons completed</span></div>${UI.bar(done / k.lessons.length)}
      ${k.ch.map(ch => `<div class="toc-ch"><h4>Chapter ${ch.num} · <span class="es">${esc(ch.title)}</span> <span class="muted">— ${esc(ch.en)}</span></h4><p class="muted tiny">${esc(ch.goal)}</p>
        <ol class="lessons">${ch.lessons.map((l, i) => { const r = st().lessons[l.id]; return `<li><a href="#lesson-${l.id}" class="${r && r.done ? 'done' : ''}"><span class="num">${r && r.done ? '✓' : ch.num + '.' + (i + 1)}</span><span><b class="es">${esc(l.title)}</b><small>${esc(l.en)} · ~${l.minutes} min${r ? ` · best ${r.best}%` : ''}${l.table ? ' · ' + esc(l.table.title.split('—')[0].trim()) + ' table' : ''}</small></span><span class="pill ${r && r.done ? 'ok' : 'study'}">${r && r.done ? 'Completed' : 'Available'}</span></a></li>`; }).join('')}</ol>
        <div class="chap-actions"><a class="btn small ghost" href="#review-${ch.id}">📖 Chapter ${ch.num} review</a><a class="btn small ghost" href="#exam-${ch.id}">📝 Chapter ${ch.num} exam</a></div></div>`).join('')}
      <div class="toc-ch"><h4>Coming soon in ${esc(c.name)}</h4><ul class="topics">${c.topics.filter(t => !t[1]).map(t => `<li>${esc(t[0])} <span class="pill soon">coming soon</span></li>`).join('')}</ul></div></div>
      <div class="panel"><h3>Grammar drills</h3><div class="row gap wrap"><a class="btn" href="#game-grammar">⏱️ Timed verb forms</a><a class="btn" href="#game-build">🧱 Sentence builder</a></div></div>`;
  };
  /* ---------- Idioms & expressions ---------- */
  H.cityIdioms = function (c, sub, head) {
    const list = MA.IDIOMS[c.id] || []; if (!list.length) return head + H.soon(c, 'Idioms and expressions');
    const types = [...new Set(list.map(x => x.type))];
    H.after(view => {
      view.querySelector('#idq').onclick = e => {
        e.target.remove();
        const L = U.shuffle(list);
        const items = [{ t: 'match', p: L.slice(0, 5).map(x => [x.es, x.mean.split('·')[0].trim()]), skill: 'vocab' }]
          .concat(L.slice(0, 5).map(x => { const o = U.shuffle([x, ...U.shuffle(list.filter(y => y !== x)).slice(0, 2)]); return { t: 'mc', q: `Situation: ${x.when} What do you say?`, o: o.map(y => y.es), a: o.indexOf(x), skill: 'vocab', ex: `${x.es} = ${x.mean}` }; }))
          .concat(L.filter(x => ['Idiom', 'Expression'].includes(x.type)).slice(0, 2).map(x => ({ t: 'mc', q: `Is «${x.es}» a true idiom (meaning not literal) or an everyday expression?`, o: ['A true idiom', 'An everyday expression'], a: x.type === 'Idiom' ? 0 : 1, skill: 'vocab', ex: `Literal: “${x.lit}” — real meaning: “${x.mean}”.` })));
        UI.runExercises(view.querySelector('#idbox'), items, { mode: 'lesson', src: 'idioms:' + c.id, onDone: res => { const p = Math.round(100 * res.reduce((a, r) => a + (r ? r.score : 0), 0) / items.length); st().idioms[c.id] = Math.max(p, st().idioms[c.id] || 0); S.save(true); if (p >= 70) S.award('idioms:' + c.id, 15, 5, 'Expressions quiz'); view.querySelector('#idbox').innerHTML = `<div class="result"><h3>Expressions quiz: ${p}%</h3><p>${p >= 70 ? '¡Genial!' : 'Score 70% or more for the reward.'}</p></div>`; } });
      };
    });
    return head + `<div class="panel"><p>Labels: <b>Idiom</b> = the meaning is not literal · <b>Expression</b> = fixed everyday phrase · <b>Colloquial</b> = informal speech · <b>Proverb</b> = traditional saying · <b>Exclamation</b>.${list.some(x => x.top) ? ' <span class="tag top50">★ Top 50</span> = from the 50 most popular Spanish idioms, with how to use them and good situations.' : ''}</p><p class="chips">${types.map(t => `<span class="tag">${esc(t)}: ${list.filter(x => x.type === t).length}</span>`).join('')}</p></div>
      <div class="idioms">${list.map(x => `<details class="panel idiom"><summary>${x.top ? '<span class="tag top50">★ Top 50</span> ' : ''}<span class="tag ${x.type === 'Idiom' ? 'warn' : ''}">${esc(x.type)}</span> <b class="es">${esc(x.es)}</b> <span class="muted">— ${esc(x.mean)}</span></summary>
        <div class="idiom-body"><p>${UI.spk(x.es)} <span class="ipa">/${esc(x.es.replace(/[¡!¿?]/g, '').split(' ').map(U.autoIPA).join(' '))}/</span> <span class="tiny muted">rule-based IPA</span></p>
        <dl class="kvd"><dt>Literal meaning</dt><dd>${esc(x.lit)}</dd><dt>Actual meaning</dt><dd>${esc(x.mean)}</dd><dt>Register</dt><dd>${esc(x.reg)}</dd><dt>${x.top ? 'How to use it' : 'When to use'}</dt><dd>${esc(x.use)}</dd>${(x.sit || []).length ? `<dt>Good situations</dt><dd><ul class="sit">${x.sit.map(t => `<li>${esc(t)}</li>`).join('')}</ul></dd>` : ''}${x.not ? `<dt>When not to</dt><dd>${esc(x.not)}</dd>` : ''}</dl>
        <div class="dialog">${x.dlg.map(d => `<p><span class="es">${esc(d[0])}</span> ${UI.spk(d[0].replace(/^—/, ''))}<span class="tr">${esc(d[1])}</span></p>`).join('')}</div>${x.note ? `<p class="note">${esc(x.note)}</p>` : ''}</div></details>`).join('')}</div>
      <div class="panel"><h3>Practice</h3><p class="muted">Matching, situations, and “idiom or expression?” questions.</p><button class="btn primary" id="idq">Start expressions quiz</button><div id="idbox"></div></div>`;
  };
  /* ---------- Fairy tales ---------- */
  H.cityTales = function (c, sub, head) {
    const list = MA.STORIES.filter(s => s.city === c.id); if (!list.length) return head + H.soon(c, 'Fairy tales');
    return head + `<div class="shelf">${list.map(s => { const r = st().stories[s.id] || {}; return `<a class="panel book" href="#story-${s.id}"><span class="spine">📖</span><b class="es">${esc(s.title)}</b><small>${esc(s.en)} · ${s.level}</small><small>${r.read ? `✓ read${r.quiz != null ? ` · quiz ${r.quiz}%` : ''}` : `${s.sentences.length} sentences · open to read`}</small></a>`; }).join('')}
      <div class="panel book soon"><span class="spine">📕</span><b class="es">Cenicienta</b><small>Cinderella</small><span class="pill soon">Coming soon</span></div><div class="panel book soon"><span class="spine">📗</span><b class="es">El gato con botas</b><small>Puss in Boots</small><span class="pill soon">Coming soon</span></div></div>
      <p class="tiny muted">Original simplified retellings of public-domain tales. Every story is open to read at any time.</p>`;
  };
  /* ---------- Homework & tests ---------- */
  H.cityHomework = function (c, sub, head) {
    const k = H.cityContent(c); if (!k.ch.length) return head + H.soon(c, 'Homework and tests');
    return head + k.ch.map(ch => { const ex = st().exams[ch.id] || []; const hw = st().homework[ch.homework.id]; return `<div class="panel"><h3>Chapter ${ch.num} · <span class="es">${esc(ch.title)}</span></h3><ul class="list">
      <li><span>🏠 <b>Homework</b> — vocabulary, grammar, reading, writing, optional speaking · answer key hidden</span><span class="row gap">${hw && hw.completed ? `<span class="pill ok">Done · ${hw.selfScore}%</span>` : '<span class="pill study">Available</span>'}<a class="btn small primary" href="#homework-${ch.id}">Open</a></span></li>
      <li><span>📖 <b>Chapter review</b> — key words, grammar summary, your past mistakes</span><span class="row gap">${S.earned('review:' + ch.id) ? '<span class="pill ok">Done</span>' : ''}<a class="btn small ghost" href="#review-${ch.id}">Open</a></span></li>
      <li><span>📝 <b>Chapter exam</b> — all six skills, pass mark ${st().profile.threshold || 80}%${ex.length ? ` · best ${Math.max(...ex.map(x => x.overall))}%` : ''}</span><span class="row gap">${S.examPassed(ch.id) ? '<span class="pill ok">Passed</span>' : S.chapterLessonsDone(ch) ? '<span class="pill cur">Ready</span>' : '<span class="pill study">Open · lessons recommended first</span>'}<a class="btn small ${S.examPassed(ch.id) ? 'ghost' : 'primary'}" href="#exam-${ch.id}">${ex.length ? 'Retake' : 'Start'}</a></span></li></ul></div>`; }).join('');
  };
  /* ---------- Practice: four tabs ---------- */
  H.cityPractice = function (c, sub, head) {
    sub = TABS.find(x => x[0] === sub) ? sub : 'listening';
    const k = H.cityContent(c);
    const tabs = `<div class="tabs" role="tablist">${TABS.map(([t, l]) => `<a role="tab" aria-selected="${t === sub}" class="tab ${t === sub ? 'on' : ''}" href="#city-${c.id}-practice-${t}">${({ listening: '🎧', speaking: '🗣️', reading: '📰', writing: '✍️' })[t]} ${l}</a>`).join('')}</div>`;
    const card = (href, title, sm, done) => `<a class="panel act" href="${href}"><span><b>${title}</b><small>${sm}</small></span><span>${done ? '<span class="pill ok">done</span>' : '→'}</span></a>`;
    let body = '';
    if (sub === 'listening') {
      body = k.radio.length || c.built ? `<div class="panel"><p class="tiny muted">Audio is text-to-speech (${esc(MA.Audio.label())}), not recorded speech. Transcripts and translations are included.</p></div><div class="acts">
        ${k.radio.map(e => card('#radio-' + e.id, esc(e.title), `${esc(e.type)} · ${e.level} · transcript, quiz & dictation`, st().radio[e.id])).join('')}
        ${c.built ? card('#game-listen', '👂 Listening ID', 'Hear a word, pick it', false) + card('#game-prices', '💶 Prices in euros', 'Understand spoken prices', false) + card('#lesson-c1l4', '🔊 Los sonidos de España', 'Pronunciation lesson with IPA and repeat-after-me', S.lessonDone('c1l4')) : ''}</div>` : H.soon(c, 'Listening activities');
    } else if (sub === 'speaking') {
      body = `<div class="panel"><div class="status-row">${UI.status(MA.AI.ok(), 'AI conversation: on (Claude)', MA.AI.checked ? 'AI conversation: unavailable here' : 'AI: checking…')} ${UI.status(MA.Mic.ok(), 'Microphone: dictation', 'Microphone: unavailable — type instead')} <span class="pill off">Pronunciation scoring: not available</span></div>
        <p class="tiny muted">AI partners are played by Claude and adapt to ${esc(c.level)} level. Dictation turns speech into text; corrections judge grammar, vocabulary, structure and naturalness — not pronunciation.</p></div>
        <h3 class="sub-h">Conversation missions · ${esc(c.level)}</h3><div class="acts">${k.talks.map(t => card('#talk-' + t.id, esc(t.title), `with ${esc(t.partner)} (AI) · ${t.level}`, talkDone(t.id))).join('')}</div>
        ${k.npcs.length ? `<h3 class="sub-h">Characters</h3><div class="npcs">${k.npcs.map(id => { const n = MA.NPCS[id]; return `<a class="panel npc" href="#chat-${id}">${H.portrait(n.look, 'md')}<span><b>${esc(n.name)}</b><small>${esc(n.role)}</small><small>AI · ${esc(n.topics.join(' · '))}</small></span></a>`; }).join('')}</div>` : ''}
        ${c.built ? `<h3 class="sub-h">Pronunciation & scripted practice</h3><div class="acts">${card('#lesson-c1l4', 'Repeat after me: Castilian sounds', 'Scripted lesson, no AI needed', S.lessonDone('c1l4'))}${card('#lesson-c1l3', 'Introduce yourself out loud', 'Speaking task with model answer', S.lessonDone('c1l3'))}${MA.QUESTS.filter(q => q.city === c.id).map(q => card('#quest-' + q.id, 'Story mission: ' + esc(q.title), S.unlocked(q.unlock) || S.questDone(q.id) ? 'Scripted dialogue (not AI)' : 'Story locked: ' + esc(q.unlockText), S.questDone(q.id))).join('')}</div>` : ''}`;
    } else if (sub === 'reading') {
      body = k.readings.length ? `<div class="panel"><p class="muted">Short real-life texts, separate from the fairy tales. Tap any word for its meaning.</p></div><div class="acts">${k.readings.map(r => card('#read-' + r.id, esc(r.title), `${esc(r.type)} · ${r.level} · ${r.quiz.length} questions`, (st().readings[r.id] || {}).done)).join('')}</div>` : H.soon(c, 'Reading passages');
    } else {
      body = `<div class="panel"><p class="muted">${MA.AI.ok() ? 'Claude gives feedback on grammar, vocabulary, word order and naturalness. You can also grade yourself with the rubric and model answer.' : 'AI feedback is unavailable here; every task has a model answer and a self-assessment rubric.'}</p></div>
        <div class="acts">${k.writing.map(w => card('#write-' + w.id, esc(w.title), `${w.level} · ${w.minWords}+ words`, st().writings[w.id])).join('')}${c.built ? card('#game-build', '🧱 Sentence builder', 'Put words in order', false) + card('#game-grammar', '⏱️ Timed grammar', 'Verb forms against the clock', false) + card('#journal', '📓 My Spanish journal', 'Free writing', st().journal.length) : ''}</div>`;
    }
    return head + tabs + body;
  };

  /* ---------- Reading passage ---------- */
  V.read = function (id) {
    const r = MA.READINGS.find(x => x.id === id); if (!r) return V.map();
    const saved = H.savedForms();
    H.after(view => {
      const txt = view.querySelector('.story-text');
      view.querySelector('#tr-all').onchange = e => txt.classList.toggle('show-tr', e.target.checked);
      txt.addEventListener('click', e => { const tb = e.target.closest('[data-tr]'); if (tb) { tb.closest('.sent').classList.toggle('open'); return; } const b = e.target.closest('.w'); if (!b) return; const si = +b.dataset.s; H.lookup({ word: b.dataset.lw, phrase: b.dataset.p, sentence: r.sentences[si][0], sentenceEn: r.sentences[si][1], gloss: MA.READ_GLOSS, phrases: r.phrases, source: r.title }); });
      const play = view.querySelector('#narrate'); play.onclick = async () => { play.disabled = true; await MA.Audio.speakLines(r.sentences.map(x => ({ text: x[0], voice: 'airy' })), i => view.querySelectorAll('.sent').forEach((el, k) => el.classList.toggle('reading', k === i))); view.querySelectorAll('.sent').forEach(el => el.classList.remove('reading')); play.disabled = false; };
      view.querySelector('#stopn').onclick = () => MA.Audio.stopLines();
      const mk = view.querySelector('#rmark'); const pm = () => { const d = (st().readings[id] || {}).done; mk.textContent = d ? '✓ Completed' : '✓ Mark as completed'; mk.classList.toggle('primary', !d); mk.classList.toggle('ghost', !!d); }; pm();
      mk.onclick = () => { if ((st().readings[id] || {}).done) return; st().readings[id] = Object.assign({}, st().readings[id], { done: Date.now() }); S.save(true); S.award('reading:' + id, 15, 5, 'Reading'); UI.toast('✓ Reading completed'); pm(); };
    });
    return `<div class="panel reader-head"><p class="eyebrow">${esc(r.type)} · ${r.level}</p><h1 class="es">${esc(r.title)}</h1><p class="muted">${esc(r.en)} · tap any word or <span class="ph-demo">highlighted expression</span>.</p>
      <div class="reader-tools row gap wrap"><button class="btn small" id="narrate">▶ Read aloud</button><button class="btn small ghost" id="stopn">■ Stop</button><label class="chk"><input type="checkbox" id="tr-all"> English translation</label></div></div>
      <div class="panel story-text">${r.sentences.map((x, i) => `<p class="sent"><span class="es">${H.renderTokens(x[0], r.phrases, i, saved)}</span> <button class="trbtn" data-tr="${i}" aria-label="Translate sentence">EN</button><span class="tr">${esc(x[1])}</span></p>`).join('')}</div>
      <div class="panel"><button class="btn primary" id="rmark">✓ Mark as completed</button></div>`;
  };

  /* ---------- Generic AI conversation page (NPCs and city missions) ---------- */
  const LEVEL_GUIDE = { A1: 'very short sentences (max 2–3), very common words, present tense', A2: 'short sentences, everyday vocabulary, present and simple past tenses', B1: 'clear natural Spanish, all common tenses, some subjunctive, short paragraphs', B2: 'natural Spanish at normal pace, opinions, connectors, subjunctive and hypotheticals', C1: 'rich, nuanced Spanish with idioms, complex structures and register shifts', C2: 'near-native Spanish with nuance, irony, idioms and sophisticated argument' };
  H.chatPage = function (cfg) {
    const key = cfg.key; const log = (st().chats[key] = st().chats[key] || { msgs: [] }).msgs;
    if (!log.length) log.push({ r: 'npc', es: cfg.greet, t: Date.now() });
    const voice = cfg.look.male ? 'glassy' : cfg.voice || 'rounded'; let showEn = false;
    const bubble = m => m.r === 'npc' ? `<div class="msg npc">${H.portrait(cfg.look, 'xs')}<div><p class="es">${esc(m.es)} ${UI.spk(m.es, 'Hear', voice)}</p>${m.en ? `<p class="tr">${esc(m.en)}</p>` : ''}${(m.words || []).length ? `<p class="tiny">${m.words.map(w => `<span class="tag">${esc(w.es)} = ${esc(w.en)}</span>`).join(' ')}</p>` : ''}</div></div>`
      : `<div class="msg me">${H.portrait(H.me(), 'xs')}<div><p class="es">${esc(m.es)}</p>${m.corr ? `<div class="corr"><b>✎ ${esc(m.corr)}</b>${m.expl ? `<br><span>${esc(m.expl)}</span>` : ''}</div>` : m.checked ? '<div class="corr ok">✓ Correct</div>' : ''}${m.nat ? `<div class="nat">💬 More natural: <span class="es">${esc(m.nat)}</span></div>` : ''}</div></div>`;
    H.after(view => {
      const box = view.querySelector('.msgs'), inp = view.querySelector('#say'), send = view.querySelector('#send');
      const draw = () => { box.innerHTML = log.map(bubble).join(''); box.classList.toggle('show-tr', showEn); box.scrollTop = box.scrollHeight; };
      draw();
      view.querySelector('#en').onchange = e => { showEn = e.target.checked; draw(); };
      view.querySelector('#autosp').onchange = e => { st().profile.autoSpeak = e.target.checked; S.save(); };
      const go = async () => {
        const text = inp.value.trim(); if (!text) return;
        if (!MA.AI.ok()) { UI.toast('AI conversation is unavailable on this page.', 'warn'); return; }
        inp.value = ''; send.disabled = true; log.push({ r: 'me', es: text, t: Date.now() }); draw();
        box.insertAdjacentHTML('beforeend', `<div class="msg npc typing">${H.portrait(cfg.look, 'xs')}<div><p>…</p></div></div>`); box.scrollTop = box.scrollHeight;
        const hist = log.slice(-14).map(m => (m.r === 'npc' ? cfg.name : 'Learner') + ': ' + m.es).join('\n');
        try {
          const r = await MA.AI.json(`You are ${cfg.name}, ${cfg.role}, in the Spanish-learning game "Madrid Academy". ${cfg.style}${cfg.topics ? ' Usual topics: ' + cfg.topics.join(', ') + '.' : ''}
${MA.AI.learnerSummary()}
This conversation is set at CEFR ${cfg.level}. Reply ONLY in European Spanish${cfg.dialectNote ? ' (' + cfg.dialectNote + ')' : ' from Spain (vosotros, Spain vocabulary)'}, using ${LEVEL_GUIDE[cfg.level] || LEVEL_GUIDE.A1}. Stay in character and friendly. End with one question or prompt that keeps the conversation going. If the learner writes in English, reply in Spanish and encourage them to try in Spanish.${cfg.companion ? ' You are also their study companion: if they ask about grammar or homework, give a short explanation in simple English inside "reply_en" and a hint, but do not just give homework answers.' : ''}
Check the learner's LAST message for real errors (ignore missing ¿¡, capital letters and small punctuation).
Conversation:
${hist}
Return ONLY JSON: {"reply_es": "", "reply_en": "English translation of reply_es", "has_errors": true|false, "corrected": "corrected version of the learner's last message, or empty", "explanation": "short simple-English explanation (grammar, vocabulary, sentence structure), or empty", "natural": "a more natural way a local would say the learner's last message, or empty if already natural", "new_words": [{"es": "", "en": ""}]}`);
          const me = log[log.length - 1]; me.checked = true;
          if (r.has_errors && r.corrected) { me.corr = r.corrected; me.expl = r.explanation; }
          if (r.natural && U.norm(r.natural) !== U.norm(text) && U.norm(r.natural) !== U.norm(r.corrected || '')) me.nat = r.natural;
          log.push({ r: 'npc', es: r.reply_es || '…', en: r.reply_en || '', words: (r.new_words || []).slice(0, 3), t: Date.now() });
          st().chats[key].msgs = log.slice(-40);
          S.record('chat', !r.has_errors); S.record('speaking', !r.has_errors, r.has_errors ? { src: key, prompt: 'Conversation with ' + cfg.name, expected: r.corrected, given: text } : null);
          const today = S.today(); const ct = st().chats[key].days = st().chats[key].days || {}; ct[today] = (ct[today] || 0) + 1;
          if (ct[today] >= 4 && Object.keys(st().ledger).filter(k => k.startsWith('speak:' + today)).length < 3) S.award('speak:' + today + ':' + key, 40, 15, 'Speaking mission');
          S.save(); draw();
          if (st().profile.autoSpeak && MA.Audio.source()) MA.Audio.speak(r.reply_es, { voice });
        } catch (e) { log.pop(); inp.value = text; draw(); UI.toast(e.code === 'rate_limited' ? 'Too many messages — wait a moment.' : 'No answer (' + esc(e.code || e.message || 'error') + ').', 'warn'); }
        send.disabled = false; inp.focus();
      };
      send.onclick = go; inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go(); } };
      const mic = view.querySelector('#mic');
      if (mic) { let base = '', on = false; mic.onclick = () => { if (on) { MA.Mic.stop(); return; } base = inp.value ? inp.value + ' ' : ''; MA.Mic.start(p => inp.value = base + p, f => { base += f + ' '; inp.value = base.trim(); }, s => { on = s === 'listening'; mic.classList.toggle('on', on); mic.textContent = on ? '⏹' : '🎙️'; }); }; }
      view.querySelector('#clear').onclick = () => { st().chats[key].msgs = [{ r: 'npc', es: cfg.greet, t: Date.now() }]; S.save(); H.render(); };
    });
    return `<div class="chat-wrap"><div class="panel chat-side">${H.portrait(cfg.look, 'lg')}<h2>${esc(cfg.name)}</h2><p class="muted">${esc(cfg.role)}</p>${cfg.scenario ? `<p class="tiny note">${esc(cfg.scenario)}</p>` : ''}<span class="pill ai">AI character · ${esc(cfg.level)}</span>
      <label class="chk"><input type="checkbox" id="en"> Show English</label><label class="chk"><input type="checkbox" id="autosp" ${st().profile.autoSpeak ? 'checked' : ''}> Speak replies aloud</label>
      <button class="btn small ghost" id="clear">New conversation</button><p class="tiny muted">Speaking mission: 4 messages today = +40 XP (max 3 per day).</p></div>
      <div class="panel chat-main"><div class="msgs" aria-live="polite"></div>
      ${MA.AI.ok() ? '' : `<p class="warn-box">AI conversation is not available on this page${MA.AI.denied ? ' (permission was declined)' : ''}. Try scripted practice in the Speaking tab instead.</p>`}
      <div class="say-row">${MA.Mic.ok() ? '<button class="btn mic" id="mic" aria-label="Speak (dictation)">🎙️</button>' : ''}<input type="text" id="say" placeholder="Escribe o habla en español…" aria-label="Your message"><button class="btn primary" id="send">Send</button></div>${UI.accentBar()}</div></div>`;
  };
  V.chat = function (id) {
    const n = MA.NPCS[id]; if (!n || !n.style) return V.map();
    if (!n.open && n.place !== 'any' && !H.placeUnlocked(n.place)) return H.lockedScreen(n.name, 'This Madrid character is part of the final-destination story.', ['#madrid', 'Madrid']);
    return H.chatPage({ key: id, name: n.name, role: n.role, look: n.look, style: 'Personality and speaking style: ' + n.style, topics: n.topics, greet: n.greet, level: 'A1', companion: n.companion, voice: id === 'lucia' ? 'airy' : 'rounded' });
  };
  V.talk = function (id) {
    const c = MA.CITY[id.split('-')[0]]; const t = c && c.talk.find(x => x.id === id); if (!t) return V.map();
    const dialect = c.id === 'laspalmas' ? 'you are from Gran Canaria: you may use ustedes for plural "you" and Canarian words like guagua, but keep it understandable; if you use a Canarian word, the learner may ask about it' : c.id === 'barcelona' || c.id === 'palma' || c.id === 'valencia' ? 'Spanish from Spain; you may drop one occasional Catalan/Valencian greeting such as "bon dia" but speak Spanish' : '';
    return H.chatPage({ key: 'talk:' + id, name: t.partner, role: `conversation partner in ${c.name}`, look: t.look, style: 'Scenario: ' + t.scenario, scenario: t.scenario, greet: t.greet, level: t.level, dialectNote: dialect });
  };

  /* ---------- Madrid: final destination (keeps the original Madrid map) ---------- */
  /* V.madrid lives in madrid-world.js (Real World + Explore Madrid map). */

  /* ---------- Quest journal grouped by city ---------- */
  V.quests = function () {
    return `<div class="panel"><p class="eyebrow">Diario de misiones</p><h1>Quest Journal</h1><p class="muted">Story quests follow your journey. <b>Story locked</b> = waiting for a milestone · <b>Coming soon</b> = not built yet.</p></div>
      ${MA.CITIES.filter(c => MA.QUESTS.some(q => q.city === c.id)).map(c => `<div class="panel"><h3>${c.order}. ${esc(c.name)}</h3><div class="quests">${MA.QUESTS.filter(q => q.city === c.id).map(q => { const done = S.questDone(q.id), un = !q.locked && S.unlocked(q.unlock); return `<a class="quest ${done ? 'done' : un ? 'avail' : 'locked'}" href="${un || done ? '#quest-' + q.id : '#quests'}"><span class="qn">${done ? '✓' : un ? '!' : q.soon ? '…' : '🔒'}</span><span><b>${esc(q.title)}</b><small>${esc(q.en)}</small><small>${done ? 'Completed' : un ? `Reward: ${q.reward.xp} XP · ${q.reward.coins} 🪙${q.reward.item ? ' · ' + esc(H.itemName(q.reward.item)) : ''}` : q.soon ? 'Coming soon' : 'Story locked — ' + esc(q.unlockText)}</small></span></a>`; }).join('')}</div></div>`).join('')}`;
  };

  /* ---------- Home ---------- */
  V.home = function () {
    const lv = S.level(), c = H.currentCity(), today = S.today(), study = st().study[today] || {};
    const next = c.built ? H.cityContent(c).lessons.find(l => !S.lessonDone(l.id)) : null;
    const plan = [['vocab', 'Vocabulary', 10, `#city-${c.id}-vocabulary`], ['grammar', 'Grammar & writing', 10, `#city-${c.id}-grammar`], ['reading', 'Reading', 10, `#city-${c.id}-practice-reading`], ['listening', 'Listening', 10, `#city-${c.id}-practice-listening`], ['speaking', 'Speaking', 10, `#city-${c.id}-practice-speaking`], ['review', 'Review', 5, '#vocab-review']];
    const stats = S.skillStats(7); const weak = Object.entries(stats).filter(([k, v]) => v.n >= 4 && v.c / v.n < 0.7).map(([k]) => k);
    const due = S.due().length, mist = st().mistakes.filter(m => Date.now() - m.t < 7 * 86400000).length, tasks = H.dailyTasks();
    const total = plan.reduce((a, p) => a + Math.min(p[2] * 60, study[p[0]] || 0), 0) / 60;
    const tip = due ? `Tienes <b>${due}</b> palabras para repasar. <span class="muted">(You have ${due} words to review.)</span>` : next ? `¿Empezamos «${esc(next.title)}»? <span class="muted">(Shall we start “${esc(next.en)}”?)</span>` : `¡Muy bien! <span class="muted">(Great work — keep practising in ${esc(c.short || c.name)}.)</span>`;
    H.after(view => view.querySelectorAll('[data-claim]').forEach(b => b.onclick = () => { S.award('daily:' + b.dataset.claim + ':' + today, 10, 5, 'Daily quest'); H.render(); }));
    const ms = H.cityMilestone(c);
    return `<div class="dash">
      <section class="panel hero"><div class="hero-av">${MA.avatarSVG(H.me())}</div>
        <div class="hero-txt"><p class="eyebrow">${esc(H.dateES())}</p><h1>${H.greeting()}, ${esc(st().profile.name)}!</h1>
          <div class="chips"><span class="chip gold">Level ${lv.lv}</span><span class="chip">📍 ${esc(c.name)}</span><span class="chip">🔥 ${S.streak()}-day streak</span><span class="chip">🪙 ${S.coins()}</span></div>
          <div class="xp-line"><small>${lv.into} / ${lv.need} XP to level ${lv.lv + 1}</small>${UI.bar(lv.into / lv.need, 'gold')}</div>
          <p class="tiny muted">CEFR level is only assessed by exams, never by XP.</p>
          <div class="companion">${H.portrait(MA.NPCS.lucia.look, 'sm')}<p><b>Lucía:</b> ${tip}</p></div></div></section>
      <section class="panel journey-card"><div class="ph"><div><p class="eyebrow">Your journey · city ${c.final ? 10 : c.order} of ${c.final ? 10 : 9}</p><h2>${esc(c.name)}</h2><p class="muted">${esc(c.final ? '' : MA.STAGES[c.stage].name + ' · ' + c.cefr)}</p></div><a class="tiny" href="#map">World map →</a></div>
        <div class="jstrip">${MA.CITIES.map(x => `<a href="${x.final ? '#madrid' : '#city-' + x.id}" class="js ${H.storyStatus(x)} ${x.id === c.id ? 'here' : ''}" title="${esc(x.name)}"><span>${x.final ? '★' : x.order}</span><small>${esc(x.short || x.name)}</small></a>`).join('')}</div>
        <p><b>Milestone:</b> ${esc(ms.text)}</p>${ms.prog != null ? UI.bar(ms.prog, 'gold') : ''}
        <div class="row gap wrap">${next ? `<a class="btn primary" href="#lesson-${next.id}">Continue: ${esc(next.title)} →</a>` : ''}<a class="btn" href="#city-${c.id}">Open ${esc(c.short || c.name)}</a></div></section>
      <section class="panel"><div class="ph"><h3>Today’s study plan</h3><span class="muted tiny">${Math.round(total)} / 55 min</span></div>
        ${weak.length ? `<p class="note">Adapted for you: extra practice suggested for <b>${weak.map(UI.skillName).join(', ')}</b>.</p>` : ''}
        <ul class="plan">${plan.map(([k, label, min, href]) => { const v = (study[k] || 0) / 60; return `<li><a href="${href}"><span>${label}${weak.includes(k) ? ' <span class="tag warn">focus</span>' : ''}</span><small>${Math.floor(v)} / ${min} min${k === 'review' ? ` · ${due} cards due · ${mist} recent mistakes` : ''}</small></a>${UI.bar(v / min)}</li>`; }).join('')}</ul></section>
      <section class="panel"><h3>Daily quests</h3><ul class="tasks">${tasks.map(t => { const claimed = S.earned('daily:' + t.id + ':' + today); return `<li class="${t.done ? 'done' : ''}"><span class="tick">${t.done ? '✓' : ''}</span><a href="${t.href}">${esc(t.label)}</a>${t.prog && !t.done ? `<small>${t.prog}</small>` : ''}${t.done ? (claimed ? '<small class="muted">claimed</small>' : `<button class="btn small" data-claim="${t.id}">Claim +10 XP</button>`) : ''}</li>`; }).join('')}</ul>
        <h4>Upcoming assessments</h4><ul class="list">${MA.CHAPTERS.map(ch => `<li><span>${esc(MA.CITY[ch.city].name)} · Ch ${ch.num} exam</span>${S.examPassed(ch.id) ? '<span class="pill ok">Passed</span>' : `<a class="btn small ${S.chapterLessonsDone(ch) ? 'primary' : 'ghost'}" href="#exam-${ch.id}">${S.chapterLessonsDone(ch) ? 'Ready' : ch.lessons.filter(l => S.lessonDone(l.id)).length + '/' + ch.lessons.length + ' lessons'}</a>`}</li>`).join('')}</ul></section>
      <section class="panel stages-row">${Object.entries(MA.STAGES).map(([k, sg]) => `<a class="stage-tile" href="#stage-${k}"><b>${sg.name}</b><small>${sg.cefr}</small><span>${sg.cities.map(id => esc(MA.CITY[id].short || MA.CITY[id].name)).join(' · ')}</span></a>`).join('')}<a class="stage-tile final" href="#madrid"><b>Madrid</b><small>Final destination</small><span>Free roam</span></a></section>
      <section class="panel map-mini"><div class="ph"><h3>España</h3><a href="#map" class="tiny">Open map →</a></div>${MA.spainSVG()}</section>
      <section class="panel mini-grid"><a href="#passport" class="mini"><span>🛂</span><b>Passport</b><small>${Object.keys(st().attendance).length} stamps</small></a><a href="#city-${c.built ? c.id : 'alicante'}-vocabulary" class="mini"><span>🖼️</span><b>Vocabulary</b><small>${Object.keys(st().vocab).length} saved · ${due} due</small></a><a href="#calendar" class="mini"><span>📅</span><b>Calendar</b><small>${S.minutes(today)} min today</small></a><a href="#progress" class="mini"><span>📈</span><b>Progress</b><small>weekly report</small></a></section></div>`;
  };

  /* ---------- Small wrappers: lesson/exam/homework banners now rely on breadcrumbs ---------- */
  const oldAbout = V.about;
  V.about = function () {
    return `<div class="panel"><h3>Phase 1 restructure (this update)</h3><ul><li>Ten-city journey with Beginner / Intermediate / Advanced navigation and Madrid as the final destination.</li><li>Every city has six learning categories. Alicante has the existing A1 lessons; other cities show honest “Coming soon” sections plus working AI speaking and writing practice at their level.</li><li>Learning is open everywhere; only story progression is locked.</li><li>Back button, breadcrumbs, previous/next and “Back to…” links on content pages.</li></ul>
      <h4>Is “Saved to account” real sync?</h4><p>Yes, within claude.ai: progress is written to this artifact’s private per-user storage, tied to your claude.ai sign-in, so it appears on any device where you open this artifact while signed in. It is not a separate account system (no Supabase). If the page shows “This browser only”, cloud storage was not reachable, and progress stays in that browser until it reconnects.</p></div>` + oldAbout().replace(/planned/g, 'coming soon');
  };
})();
