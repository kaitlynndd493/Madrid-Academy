/* MADRID ACADEMY — Phase 2: nine local mentors + dialogue engine.
   Scripted dialogues work without AI. The "Ask your mentor" chat is the only AI part, and it is labelled as AI. */
(function () {
  const { U, S, UI, H, VIEWS: V } = MA; const { esc } = U; const st = () => S.state;
  const m = (es, en) => ({ m: es, en });
  const choose = (...opts) => ({ choose: opts.map(o => ({ es: o[0], en: o[1], re: o[2] ? { m: o[2], en: o[3] } : null })) });

  /* =====================================================================
     THE NINE MENTORS
     ===================================================================== */
  MA.MENTORS = {
    alicante: {
      id: 'elena', name: 'Elena', full: 'Elena Soler', age: 31, voice: { tts: 'buttery', rate: 0.88 },
      look: { hair: 'bob', hairColor: '#7a3b2b', skin: '#f3d3bd', eyes: '#5f7a4c', outfit: 'blazer-pants', shoes: 'loafers', acc: ['earrings'] },
      role: 'Spanish teacher at the Academia Costa Blanca',
      personality: 'Warm, patient and very organised. Celebrates every small step.',
      background: 'Grew up in Alicante’s old Santa Cruz quarter. Worked as a tour guide before becoming a teacher, so she loves explaining her city.',
      relation: 'Born and raised in Alicante; knows every corner of the Explanada and the castle.',
      teaching: 'Step by step: short explanations, lots of repetition, and speaking from the first day.',
      expressions: [['¡Muy bien!', 'Very good!'], ['Poco a poco.', 'Little by little.'], ['Venga, otra vez.', 'Come on, once more.']],
      greet: '¡Hola! Soy Elena, tu profesora. ¿Qué tal? ¿Tienes alguna pregunta?',
      intro: [m('¡Hola! ¡Bienvenida a Alicante!', 'Hello! Welcome to Alicante!'), m('Me llamo Elena. Soy profesora en la Academia Costa Blanca.', 'My name is Elena. I am a teacher at the Costa Blanca Academy.'),
        m('Soy de aquí, de Alicante. Mira: allí arriba está el castillo de Santa Bárbara.', 'I am from here, from Alicante. Look: up there is the Castle of Santa Bárbara.'),
        choose(['¡Hola, Elena! Me llamo {name}.', 'Hi, Elena! My name is {name}.', '¡Encantada, {name}! Hablas muy bien.', 'Nice to meet you, {name}! You speak very well.'], ['Encantada.', 'Nice to meet you.', '¡Encantada! ¿Cómo te llamas?… ¡Ah, {name}! Muy bonito.', 'Nice to meet you! What is your name?… Ah, {name}! Very pretty.']),
        m('Aquí vas a aprender los sonidos del español, los saludos y tus primeras frases.', 'Here you will learn the sounds of Spanish, greetings and your first sentences.'),
        m('Poco a poco, ¿vale? Yo te ayudo.', 'Little by little, OK? I will help you.'),
        m('¿Empezamos? La primera lección es «Saludos en España».', 'Shall we start? The first lesson is “Greetings in Spain”.')],
      chapters: {
        c1: [m('Antes de empezar, una pregunta: ¿sabes saludar en español?', 'Before we start, a question: can you greet people in Spanish?'),
          choose(['¡Hola! ¿Qué tal?', 'Hi! How are you?', '¡Muy bien! Ya sabes un poco.', 'Very good! You already know a little.'], ['Un poco…', 'A little…', '¡No pasa nada! Para eso estoy aquí.', 'No problem! That is why I am here.']),
          m('En este capítulo vas a aprender a saludar, a presentarte y a decir de dónde eres.', 'In this chapter you will learn to greet people, introduce yourself and say where you are from.'),
          m('También vamos a escuchar los sonidos de España, como la «z» de «zapatos».', 'We will also listen to the sounds of Spain, like the “z” in “zapatos”.'),
          m('¿Lista? ¡Vamos!', 'Ready? Let’s go!')],
        c2: [m('¿Tienes hambre? En este capítulo vamos al café.', 'Are you hungry? In this chapter we go to the café.'),
          m('Vas a aprender a pedir en un bar como una alicantina, los números y los precios.', 'You will learn to order in a bar like someone from Alicante, numbers and prices.'),
          m('Una pista: en España decimos «¿Me pones un café?». ¡Es muy normal!', 'A tip: in Spain we say “¿Me pones un café?” (Can I have a coffee?). It is very normal!'),
          choose(['¿Me pones un café, por favor?', 'Can I have a coffee, please?', '¡Perfecto! Suenas como una alicantina.', 'Perfect! You sound like a local.'], ['Quiero un café.', 'I want a coffee.', 'Está bien, pero «¿me pones…?» suena más natural en un bar.', 'That is OK, but “¿me pones…?” sounds more natural in a bar.'])]
      },
      tips: {
        c1l1: [m('En España comemos tarde. Por eso decimos «buenos días» hasta las dos, más o menos.', 'In Spain we eat lunch late. So we say “buenos días” until about two o’clock.'), m('Y una palabra mágica: «vale». ¡La vas a oír todo el día!', 'And a magic word: “vale” (OK). You will hear it all day!')],
        c1l2: [m('Yo soy, tú eres, ella es… Escucha «sois»: es para «vosotros», y en España la usamos mucho.', 'I am, you are, she is… Listen to “sois”: it is for “vosotros” (you all), and in Spain we use it a lot.'), m('Un truco: no digas «soy una estudiante». Di «soy estudiante».', 'A trick: don’t say “soy una estudiante”. Say “soy estudiante”.')],
        c1l3: [m('Si eres mujer, di «encantada». Si eres hombre, «encantado».', 'If you are a woman, say “encantada”. If you are a man, “encantado”.'), m('Las nacionalidades se escriben con minúscula: «soy canadiense».', 'Nationalities are written with a small letter: “soy canadiense”.')],
        c1l4: [m('Escucha la «z» de «zapatos»: pon la lengua entre los dientes.', 'Listen to the “z” in “zapatos”: put your tongue between your teeth.'), m('La «j» suena fuerte, desde la garganta: «jamón».', 'The “j” is strong, from the throat: “jamón”.')],
        c2l1: [m('Aprende cada palabra con su artículo: «el café», «la leche».', 'Learn each word with its article: “el café”, “la leche”.'), m('¡Cuidado! «Agua» es femenina, pero decimos «el agua».', 'Careful! “Agua” is feminine, but we say “el agua”.')],
        c2l2: [m('En España escribimos los precios con coma: dos coma cincuenta, 2,50 €.', 'In Spain we write prices with a comma: 2,50 €.'), m('«Uno» cambia a «un» delante de un nombre masculino: «un euro».', '“Uno” becomes “un” before a masculine noun: “un euro”.')],
        c2l3: [m('En un bar, el camarero te dice: «¿Qué te pongo?».', 'In a bar, the waiter says: “¿Qué te pongo?” (What can I get you?)'), m('Tú contestas: «¿Me pones un café con leche, por favor?».', 'You answer: “¿Me pones un café con leche, por favor?”')]
      },
      hw: m('Aquí tienes tus deberes. Hazlos sin mirar las respuestas, ¿vale? Después, corrígelos tú.', 'Here is your homework. Do it without looking at the answers, OK? Then correct it yourself.'),
      celebrate: [m('¡Lo has conseguido, {name}! Has terminado tu etapa en Alicante.', 'You did it, {name}! You have finished your time in Alicante.'), m('Ahora te espera Las Palmas de Gran Canaria. Allí vas a conocer a Dani.', 'Now Las Palmas de Gran Canaria is waiting for you. There you will meet Dani.'), m('Te voy a echar de menos. ¡Buen viaje!', 'I will miss you. Have a good trip!')]
    },
    laspalmas: {
      id: 'dani', name: 'Dani', full: 'Daniela «Dani» Rivero', age: 28, voice: { tts: 'airy', rate: 0.92 },
      look: { hair: 'ponytail', hairColor: '#6b4530', skin: '#efcdb2', eyes: '#5a3a26', outfit: 'guide-vest', shoes: 'oxford', acc: ['satchel', 'earrings-gold'] },
      role: 'Marine biologist and part-time Spanish tutor',
      personality: 'Relaxed, curious and funny. Always connects language to real life.',
      background: 'Born in the Vegueta quarter. Studies marine life along Las Canteras beach and tutors international students in the evenings.',
      relation: 'A proud canaria who loves explaining the Canary way of speaking.',
      teaching: 'Real-life tasks: shopping, family talk and daily routines, practised in conversation.',
      expressions: [['¡Qué fuerte!', 'Wow! / No way!'], ['Tranquila, sin prisa.', 'Relax, no rush.'], ['¿Vamos en guagua?', 'Shall we take the bus? (Canarian)']],
      greet: '¡Buenas! Soy Dani. ¿Qué tal todo? ¿En qué te ayudo hoy?',
      intro: [m('¡Hola! ¿Qué tal el vuelo? Bienvenida a Las Palmas de Gran Canaria.', 'Hi! How was the flight? Welcome to Las Palmas de Gran Canaria.'), m('Soy Dani. Tengo veintiocho años y trabajo como bióloga marina. También doy clases de español.', 'I am Dani. I am twenty-eight and I work as a marine biologist. I also teach Spanish.'),
        m('Aquí vivimos entre el mar y la montaña. La playa de Las Canteras está muy cerca.', 'Here we live between the sea and the mountains. Las Canteras beach is very close.'),
        m('Una cosa: en Canarias decimos «guagua» para el autobús, y usamos «ustedes» en vez de «vosotros».', 'One thing: in the Canaries we say “guagua” for the bus, and we use “ustedes” instead of “vosotros”.'),
        m('Tú vas a aprender el español estándar de España, pero te ayudaré a entender nuestro acento.', 'You will learn standard Spanish from Spain, but I will help you understand our accent.'),
        m('Aquí vamos a hablar de la familia, la comida, la ropa y la rutina diaria.', 'Here we will talk about family, food, clothes and daily routine.'),
        choose(['¡Me parece genial!', 'Sounds great!', '¡Perfecto! Empezamos mañana temprano.', 'Perfect! We start early tomorrow.'], ['Estoy un poco nerviosa.', 'I am a bit nervous.', '¡Tranquila! Aquí vamos sin prisa.', 'Relax! Here we take it easy.'])],
      hw: m('Tus deberes de hoy. Hazlos con calma, y si tienes dudas, me preguntas.', 'Your homework for today. Do it calmly, and if you have questions, ask me.'),
      celebrate: [m('¡Qué fuerte, {name}! Has terminado Las Palmas.', 'Wow, {name}! You have finished Las Palmas.'), m('Ahora vuelas a Palma de Mallorca. Marga te espera en su librería.', 'Now you fly to Palma de Mallorca. Marga is waiting for you in her bookshop.')]
    },
    palma: {
      id: 'marga', name: 'Marga', full: 'Margalida Ferrer', age: 46, voice: { tts: 'rounded', rate: 0.92 },
      look: { hair: 'bun', hairColor: '#6b4430', skin: '#f3d6c0', eyes: '#5a3a26', outfit: 'classic-vest', shoes: 'loafers', acc: ['earrings-gold'] },
      role: 'Bookshop owner in Palma’s old town',
      personality: 'A natural storyteller: gentle, nostalgic and full of anecdotes.',
      background: 'Runs the bookshop her grandfather opened in 1962. Bilingual in Catalan and Spanish; reads stories to children every Saturday.',
      relation: 'Has lived her whole life between the cathedral and the old town’s patios.',
      teaching: 'Through stories: every past tense is learned by telling and retelling real anecdotes.',
      expressions: [['Bon dia!', 'Good morning! (Catalan)'], ['Érase una vez…', 'Once upon a time…'], ['¿Y qué pasó después?', 'And what happened next?']],
      greet: 'Bon dia! Perdona… ¡buenos días! ¿Qué historia me cuentas hoy?',
      intro: [m('Bon dia! Perdona, la costumbre… ¡Buenos días! Soy Margalida, pero todos me llaman Marga.', 'Good morning (in Catalan)! Sorry, habit… Good morning! I am Margalida, but everyone calls me Marga.'),
        m('Tengo una pequeña librería en el casco antiguo. La abrió mi abuelo en 1962.', 'I have a small bookshop in the old town. My grandfather opened it in 1962.'),
        m('Cuando era niña, pasaba las tardes leyendo entre estas estanterías.', 'When I was a child, I spent the afternoons reading between these shelves.'),
        m('En Mallorca hablamos catalán y castellano. Verás muchos carteles en catalán.', 'In Mallorca we speak Catalan and Spanish. You will see many signs in Catalan.'),
        m('Aquí vas a aprender a contar historias del pasado: el pretérito, el imperfecto y el pretérito perfecto.', 'Here you will learn to tell stories about the past: the preterite, the imperfect and the present perfect.'),
        choose(['¡Me encantan las historias!', 'I love stories!', 'Entonces vamos a ser muy buenas amigas.', 'Then we are going to be very good friends.'], ['El pasado es difícil…', 'The past is difficult…', 'Al principio, sí. Pero con historias, todo es más fácil.', 'At first, yes. But with stories, everything is easier.'])],
      hw: m('Te he preparado unos deberes. Cuéntame qué hiciste y cómo era todo.', 'I have prepared some homework. Tell me what you did and what everything was like.'),
      celebrate: [m('¡Enhorabuena, {name}! Ya sabes contar historias en pasado.', 'Congratulations, {name}! You can now tell stories in the past.'), m('Tu próxima parada es Murcia. Pilar te enseñará a hablar de emociones.', 'Your next stop is Murcia. Pilar will teach you to talk about emotions.')]
    },
    murcia: {
      id: 'pilar', name: 'Pilar', full: 'Pilar Hernández', age: 37, voice: { tts: 'airy', rate: 0.95 },
      look: { hair: 'wavy', hairColor: '#3b2620', skin: '#f3d3bd', eyes: '#5a3a26', outfit: 'lavender', shoes: 'flats-beige', acc: ['sunglasses', 'earrings-gold', 'bag'] },
      role: 'Workshop coordinator at a cultural centre by the Segura river',
      personality: 'Empathetic and thoughtful. Listens carefully and asks good questions.',
      background: 'Worked for years as a school counsellor. Now runs Spanish and conversation workshops for newcomers in Murcia.',
      relation: 'Grew up surrounded by the huerta; her family still grows lemons.',
      teaching: 'Reflective conversations: you learn emotions, opinions and advice by talking about real situations.',
      expressions: [['Me alegra que…', 'I am glad that…'], ['¿Cómo te sientes?', 'How do you feel?'], ['Te aconsejo que…', 'I advise you to…']],
      greet: 'Hola, ¿cómo estás hoy? Cuéntame, ¿qué te preocupa o qué te hace ilusión?',
      intro: [m('Hola, bienvenida a Murcia. Me alegra mucho que hayas llegado hasta aquí.', 'Hello, welcome to Murcia. I am very glad you have made it this far.'),
        m('Soy Pilar. Durante años trabajé como orientadora en un instituto, y ahora coordino talleres de español junto al río Segura.', 'I am Pilar. For years I worked as a school counsellor, and now I run Spanish workshops by the Segura river.'),
        m('Murcia es una ciudad tranquila, rodeada de huerta. Aquí la gente habla mucho… ¡y con mucho cariño!', 'Murcia is a calm city surrounded by orchards. People here talk a lot… and with a lot of warmth!'),
        m('Quizás notes que muchos murcianos no pronuncian la «s» final. No te preocupes: con práctica lo entenderás.', 'You may notice many people here do not pronounce the final “s”. Don’t worry: with practice you will understand.'),
        m('En esta etapa quiero que aprendas a expresar emociones, dar consejos y opinar. Para eso, nos hará falta el subjuntivo.', 'In this stage I want you to learn to express emotions, give advice and give opinions. For that, we will need the subjunctive.'),
        choose(['Estoy ilusionada.', 'I am excited.', 'Me alegra que estés ilusionada. Eso ya es subjuntivo, ¿te has dado cuenta?', 'I am glad you are excited. That was already the subjunctive — did you notice?'], ['Estoy un poco nerviosa.', 'I am a bit nervous.', 'Es normal que te sientas así. Vamos a ir paso a paso.', 'It is normal that you feel that way. We will go step by step.'])],
      hw: m('Estos son tus deberes. Te recomiendo que los hagas con calma y que escribas con tus propias palabras.', 'This is your homework. I recommend that you do it calmly and write in your own words.'),
      celebrate: [m('¡Qué orgullosa estoy de ti, {name}!', 'I am so proud of you, {name}!'), m('En Málaga te espera Adriana, una diseñadora de prensa que te enseñará a entender las noticias.', 'In Málaga, Adriana is waiting — a newspaper designer who will teach you to understand the news.')]
    },
    malaga: {
      id: 'adrian', name: 'Adriana', full: 'Adriana Molina', age: 27, voice: { tts: 'buttery', rate: 1 },
      look: { hair: 'long', hairColor: '#3b2620', skin: '#ecc8ad', eyes: '#5a3a26', outfit: 'shawl-chic', shoes: 'loafers-dark', acc: ['beret-cream', 'earrings-gold'] },
      role: 'Graphic designer for a Málaga newspaper',
      personality: 'Creative, witty and energetic. Loves a good headline — and a beautiful page to put it on.',
      background: 'Grew up in the Soho district, among street art. Designs the front pages of a local newspaper and co-hosts its weekly radio debate.',
      relation: 'Knows Málaga’s news, neighbourhoods and people better than anyone.',
      teaching: 'News analysis and discussion: headlines, interviews and short debates.',
      expressions: [['Última hora…', 'Breaking news…'], ['O sea, que…', 'So, in other words…'], ['¿Tú qué opinas?', 'What do you think?']],
      greet: '¡Buenos días! Aquí Adriana, en directo. ¿De qué noticia hablamos hoy?',
      intro: [m('¡Buenas! Bienvenida a Málaga, la ciudad de Picasso, del sol… y de las noticias que diseño cada día.', 'Hi! Welcome to Málaga, the city of Picasso, of the sun… and of the news I design every day.'),
        m('Soy Adriana, diseñadora gráfica. Diseño las portadas de un periódico local y los viernes presento su debate en la radio.', 'I am Adriana, a graphic designer. I design the front pages of a local newspaper, and on Fridays I host its radio debate.'),
        m('Si quieres entender lo que pasa en España, tendrás que entender a los medios: titulares, entrevistas, debates.', 'If you want to understand what happens in Spain, you will need to understand the media: headlines, interviews, debates.'),
        m('Aquí trabajaremos los conectores, las oraciones complejas y las situaciones hipotéticas.', 'Here we will work on connectors, complex sentences and hypothetical situations.'),
        m('Por cierto, el acento malagueño es rápido. Si no entiendes algo, pídeme que lo repita.', 'By the way, the Málaga accent is fast. If you do not understand something, ask me to repeat it.'),
        choose(['¿Puedes repetirlo más despacio?', 'Can you repeat that more slowly?', '¡Claro! Esa frase te va a salvar la vida en Andalucía.', 'Of course! That sentence will save your life in Andalusia.'], ['¡Lo he entendido todo!', 'I understood everything!', '¡Vaya nivel! Ya veremos cuando hable a mi velocidad normal.', 'What a level! We will see when I speak at my normal speed.'])],
      hw: m('Tu tarea: lee, resume y opina. Como en una redacción de verdad.', 'Your task: read, summarise and give your opinion. Like in a real newsroom.'),
      celebrate: [m('Titular del día: «{name} termina su etapa en Málaga».', 'Today’s headline: “{name} finishes her time in Málaga”.'), m('Te espera Sevilla. Lola es exigente, pero aprenderás muchísimo.', 'Sevilla is waiting. Lola is demanding, but you will learn a lot.')]
    },
    sevilla: {
      id: 'lola', name: 'Lola', full: 'Dolores «Lola» Jiménez', age: 42, voice: { tts: 'buttery', rate: 1 },
      look: { hair: 'bun', hairColor: '#7a4a2e', skin: '#f1d0b8', eyes: '#5a3a26', outfit: 'plaid-blazer', shoes: 'loafers', acc: ['glasses', 'earrings-gold', 'satchel-r'] },
      role: 'Lawyer and university debate coach',
      personality: 'Precise and demanding, but generous with her time. Hates vague answers.',
      background: 'Grew up in the Triana neighbourhood. Practises law and coaches the University of Sevilla debate team.',
      relation: 'Loves her city’s traditions and its passionate conversations in every terrace.',
      teaching: 'Argumentation: structure, evidence, counter-arguments and formal register.',
      expressions: [['Vamos al grano.', 'Let’s get to the point.'], ['¿En qué te basas?', 'What is your evidence?'], ['Matízame eso.', 'Nuance that for me.']],
      greet: 'Buenas tardes. Vamos al grano: ¿qué quieres argumentar hoy?',
      intro: [m('Buenas tardes y bienvenida a Sevilla. Soy Dolores Jiménez, aunque todo el mundo me llama Lola.', 'Good afternoon and welcome to Sevilla. I am Dolores Jiménez, though everyone calls me Lola.'),
        m('Soy abogada y entreno al equipo de debate de la universidad.', 'I am a lawyer and I coach the university debate team.'),
        m('Sevilla es una ciudad de tradiciones —la Semana Santa, la Feria— pero también de conversaciones apasionadas en cada terraza.', 'Sevilla is a city of traditions — Holy Week, the April Fair — but also of passionate conversations on every terrace.'),
        m('Aquí no basta con tener razón: hay que saber argumentarla. Trabajaremos la voz pasiva, el estilo indirecto y el registro formal.', 'Here it is not enough to be right: you must know how to argue it. We will work on the passive voice, reported speech and formal register.'),
        m('Te lo advierto: soy exigente. Pero si algo no está claro, te lo explicaré las veces que haga falta.', 'I warn you: I am demanding. But if something is not clear, I will explain it as many times as needed.'),
        choose(['Me gustan los retos.', 'I like challenges.', 'Perfecto. Entonces nos vamos a llevar muy bien.', 'Perfect. Then we are going to get on very well.'], ['¿Y si no tengo opinión?', 'And if I have no opinion?', 'Entonces la construiremos juntas, con datos y argumentos.', 'Then we will build one together, with data and arguments.'])],
      hw: m('Tus deberes: un texto argumentativo. Tesis clara, argumentos, contraargumento y conclusión.', 'Your homework: an argumentative text. Clear thesis, arguments, counter-argument and conclusion.'),
      celebrate: [m('Impecable, {name}. Has superado el nivel B2 de esta escuela.', 'Impeccable, {name}. You have completed this school’s B2 stage.'), m('Ahora, Zaragoza. Ana te enseñará a ser todavía más precisa.', 'Now, Zaragoza. Ana will teach you to be even more precise.')]
    },
    zaragoza: {
      id: 'ana', name: 'Ana', full: 'Ana Lacasa', age: 36, voice: { tts: 'rounded', rate: 1 },
      look: { hair: 'wavy', hairColor: '#8a5a3a', skin: '#f6dccb', eyes: '#5a3a26', outfit: 'floral-romantic', shoes: 'flats-black', acc: ['bow', 'earrings'] },
      role: 'Dancer and teacher at the Zaragoza dance conservatory',
      personality: 'Disciplined, direct and dryly funny. Values precision above all — in dance and in words.',
      background: 'Dances jota and contemporary dance. Teaches at the conservatory, writes the company’s grant applications and often moderates cultural talks at the university.',
      relation: 'A proud aragonesa who knows the cierzo wind and the Ebro river by heart.',
      teaching: 'Like a rehearsal: read closely, write, correct and repeat until it is precise.',
      expressions: [['Al grano.', 'Straight to the point.'], ['Con precisión, por favor.', 'Precisely, please.'], ['Reformúlalo.', 'Rephrase it.']],
      greet: 'Buenos días. ¿Qué ensayamos hoy: un texto o una duda?',
      intro: [m('Bienvenida a Zaragoza. Soy Ana Lacasa, bailarina. Bailo jota y danza contemporánea, y doy clases en el conservatorio.', 'Welcome to Zaragoza. I am Ana Lacasa, a dancer. I dance jota and contemporary dance, and I teach at the conservatory.'),
        m('Si has llegado hasta aquí, ya dominas lo esencial. Ahora se trata de matizar.', 'If you have come this far, you already master the essentials. Now it is about nuance.'),
        m('Aquí sopla el cierzo, un viento que no perdona; los aragoneses tenemos fama de ir al grano.', 'Here the cierzo blows, an unforgiving wind; people from Aragón are known for getting straight to the point.'),
        m('Trabajaremos el vocabulario académico, la comunicación formal y la argumentación escrita.', 'We will work on academic vocabulary, formal communication and written argumentation.'),
        m('Mi método es el de la danza: ensayar, corregir y repetir hasta que salga perfecto.', 'My method is the dancer’s method: rehearse, correct and repeat until it is perfect.'),
        choose(['Prefiero empezar por un texto académico.', 'I prefer to start with an academic text.', 'Sabia elección. La lectura atenta es la base de todo.', 'Wise choice. Careful reading is the basis of everything.'], ['Prefiero una reunión formal.', 'I prefer a formal meeting.', 'De acuerdo. Prepárate: en las reuniones formales cada palabra cuenta.', 'Agreed. Be ready: in formal meetings every word counts.'])],
      hw: m('Le dejo los deberes. Revíselos dos veces antes de mirar las soluciones.', 'Here is your homework. Check it twice before looking at the answers.'),
      celebrate: [m('Muy bien, {name}. Ha demostrado rigor y constancia.', 'Very good, {name}. You have shown rigour and perseverance.'), m('En Valencia le espera Neus, que le hará disfrutar de la literatura.', 'In Valencia, Neus is waiting; she will make you enjoy literature.')]
    },
    valencia: {
      id: 'neus', name: 'Neus', full: 'Neus Puig', age: 34, voice: { tts: 'airy', rate: 1 },
      look: { hair: 'long', hairColor: '#d1aa76', skin: '#f1d0b8', eyes: '#5a3a26', outfit: 'green-dress', shoes: 'loafers-dark', acc: ['earrings-gold', 'book'] },
      role: 'Literature PhD and director of a small theatre company in Ruzafa',
      personality: 'Creative, poetic and expressive. Turns every class into a small performance.',
      background: 'Wrote her doctoral thesis on contemporary Spanish poetry. Directs a theatre company and teaches public speaking.',
      relation: 'Born in Valencia; adores the Fallas, the Turia gardens and the smell of orange blossom.',
      teaching: 'Texts and performance: interpret literature, then present it aloud.',
      expressions: [['¡Qué maravilla!', 'How wonderful!'], ['Léelo en voz alta.', 'Read it aloud.'], ['¿Qué te sugiere?', 'What does it suggest to you?']],
      greet: '¡Hola! ¿Qué has leído últimamente? Cuéntamelo como si fuera una escena de teatro.',
      intro: [m('Bon dia i benvinguda! Bueno, en castellano: ¡bienvenida a Valencia!', 'Good morning and welcome (in Valencian)! Well, in Spanish: welcome to Valencia!'),
        m('Soy Neus Puig. Me doctoré en literatura y ahora dirijo una pequeña compañía de teatro en el barrio de Ruzafa.', 'I am Neus Puig. I did a PhD in literature and now I direct a small theatre company in Ruzafa.'),
        m('Valencia huele a azahar en primavera y a pólvora en Fallas.', 'Valencia smells of orange blossom in spring and of gunpowder during the Fallas.'),
        m('Aquí leeremos poemas, cuentos y ensayos, y aprenderás a interpretarlos, no solo a entenderlos.', 'Here we will read poems, stories and essays, and you will learn to interpret them, not just understand them.'),
        m('También prepararás presentaciones: hablar en público es, al fin y al cabo, otra forma de teatro.', 'You will also prepare presentations: speaking in public is, after all, another form of theatre.'),
        choose(['Me encanta leer.', 'I love reading.', '¡Qué maravilla! Entonces ya tenemos medio camino hecho.', 'How wonderful! Then we are halfway there.'], ['Hablar en público me da miedo.', 'Public speaking scares me.', 'A todos nos da miedo. El truco es convertir el miedo en energía.', 'It scares all of us. The trick is to turn fear into energy.'])],
      hw: m('Tus deberes: lee el texto, subraya lo que te emocione y escribe por qué.', 'Your homework: read the text, underline what moves you and write why.'),
      celebrate: [m('¡Bravo, {name}! Hoy cae el telón en Valencia.', 'Bravo, {name}! Today the curtain falls in Valencia.'), m('Tu última etapa de aprendizaje es Barcelona. Mar te espera.', 'Your last learning stage is Barcelona. Mar is waiting for you.')]
    },
    barcelona: {
      id: 'marc', name: 'Mar', full: 'Mar Vidal', age: 32, voice: { tts: 'airy', rate: 1.02 },
      look: { hair: 'long', hairColor: '#4a2e22', skin: '#efcdb2', eyes: '#5a3a26', outfit: 'denim-shirt', shoes: 'loafers-cream', acc: ['earrings-gold'] },
      role: 'Translator and podcast host',
      personality: 'Witty, ironic and curious. Loves wordplay and the many faces of Spanish.',
      background: 'Translates novels between Catalan, Spanish and English. Hosts a podcast about how Spanish is spoken around the world.',
      relation: 'Grew up in Gràcia, bilingual from birth; sees both languages as part of who she is.',
      teaching: 'Nuance: irony, humour, register and regional variation, practised through real conversations.',
      expressions: [['Bon dia!', 'Good morning! (Catalan)'], ['Ojo con el matiz.', 'Watch the nuance.'], ['Pillar la ironía', 'To get the irony']],
      greet: 'Bon dia! Bueno, buenos días. ¿Qué matiz del español quieres explorar hoy?',
      intro: [m('Bon dia! Benvinguda a Barcelona. Tranquila, que seguimos en castellano.', 'Good morning! Welcome to Barcelona (in Catalan). Relax, we continue in Spanish.'),
        m('Soy Mar Vidal, traductora y presentadora de un pódcast sobre las mil caras del español.', 'I am Mar Vidal, translator and host of a podcast about the thousand faces of Spanish.'),
        m('Aquí convivimos con dos lenguas, el catalán y el castellano, y eso se nota en cómo pensamos el idioma.', 'Here we live with two languages, Catalan and Spanish, and that shows in how we think about language.'),
        m('En este nivel vamos a jugar con los matices: la ironía, el humor, los registros, las variedades del español.', 'At this level we will play with nuance: irony, humour, registers and varieties of Spanish.'),
        m('Si al final de esta etapa entiendes un chiste a la primera, habré hecho bien mi trabajo.', 'If by the end of this stage you understand a joke the first time, I will have done my job well.'),
        choose(['Los chistes son lo más difícil.', 'Jokes are the hardest part.', 'Exacto. Por eso son el mejor examen.', 'Exactly. That is why they are the best test.'], ['¡Cuéntame uno!', 'Tell me one!', '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter. Vale, ese era malo a propósito.', 'Why don’t birds use Facebook? Because they already have Twitter. OK, that one was bad on purpose.'])],
      hw: m('Deberes: un texto con ironía. Que se note, pero sin pasarse.', 'Homework: a text with irony. Make it noticeable, but don’t overdo it.'),
      celebrate: [m('{name}, lo has hecho. Nueve ciudades, nueve maneras de vivir el español.', '{name}, you did it. Nine cities, nine ways of living Spanish.'), m('Ahora sí: Madrid te espera, y Lucía también. Allí no habrá libros de texto, solo vida real.', 'Now it is time: Madrid awaits, and so does Lucía. There will be no textbooks there, only real life.')]
    }
  };
  // fallback feedback for lessons and exams (simple Spanish for A-levels, richer above)
  const FB = {
    lessonHi: m('¡Excelente, {name}! Has sacado un {score}%. Así se hace.', 'Excellent, {name}! You got {score}%. That is how it is done.'),
    lessonMid: m('¡Bien hecho! Un {score}%. Repasa tus errores y lo harás aún mejor.', 'Well done! {score}%. Review your mistakes and you will do even better.'),
    lessonLo: m('Un {score}%. No pasa nada: poco a poco. ¿Lo intentamos otra vez?', '{score}%. No problem: little by little. Shall we try again?'),
    examPass: m('¡Enhorabuena! Has aprobado el examen del capítulo {n} con un {score}%.', 'Congratulations! You passed the chapter {n} exam with {score}%.'),
    examFail: m('Esta vez no has aprobado ({score}%), pero estás cerca. Repasa {weak} y vuelve a intentarlo.', 'You did not pass this time ({score}%), but you are close. Review {weak} and try again.')
  };

  /* =====================================================================
     DIALOGUE ENGINE (visual-novel overlay)
     ===================================================================== */
  const fill = (t, vars = {}) => String(t).replace(/\{(\w+)\}/g, (_, k) => vars[k] != null ? vars[k] : k === 'name' ? (st().profile.name || 'estudiante') : '');
  H.mentorOf = cityId => MA.MENTORS[cityId];
  H.seen = key => !!st().dialogs[key];
  H.say = (mentor, text) => { if (MA.Audio.source()) MA.Audio.speak(text, { voice: mentor.voice.tts, rate: mentor.voice.rate }); };
  H.scene = function (cityId, lines, opts = {}) {
    const mt = MA.MENTORS[cityId], c = MA.CITY[cityId]; if (!mt) return;
    const ov = document.createElement('div'); ov.className = 'dlg-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Conversation with ' + mt.name);
    ov.innerHTML = `<div class="dlg-stage">${MA.sceneSVG(cityId, c.pal, { sea: c.sea })}<div class="dlg-mentor">${MA.avatarSVG(mt.look, { label: mt.name })}</div><div class="dlg-me">${MA.avatarSVG(H.me(), { label: 'You' })}</div>
      <div class="dlg-top"><span class="pill">${esc(opts.title || 'Conversation')}</span><span class="pill">Scripted dialogue</span><button class="btn small ghost" id="dlg-skip">Skip ✕</button></div></div>
      <div class="dlg-box"><div class="nameplate" id="dlg-name"></div><p class="es dlg-line" id="dlg-text"></p><p class="dlg-en" id="dlg-en"></p><div class="dlg-choices" id="dlg-ch"></div>
      <div class="dlg-ctrl"><button class="spk" id="dlg-say" aria-label="Hear this line">🔊</button><label class="chk"><input type="checkbox" id="dlg-showen" ${st().profile.showTr !== false ? 'checked' : ''}> English</label><span class="dlg-count" id="dlg-count"></span><button class="btn primary" id="dlg-next">Next ▸</button></div></div>`;
    document.body.appendChild(ov); document.body.classList.add('dlg-open');
    const $ = s => ov.querySelector(s); let i = 0, cur = null; const seq = lines.slice();
    const showEn = () => $('#dlg-en').hidden = !$('#dlg-showen').checked;
    $('#dlg-showen').onchange = () => { st().profile.showTr = $('#dlg-showen').checked; showEn(); };
    const close = (done) => { ov.classList.add('out'); document.body.classList.remove('dlg-open'); MA.Audio.stop(); document.removeEventListener('keydown', key); setTimeout(() => ov.remove(), 300); if (opts.key) { st().dialogs[opts.key] = Date.now(); S.save(); } if (done && opts.reward) S.award('dlg:' + opts.key, opts.reward, 0, 'Met ' + mt.name); opts.onDone && opts.onDone(); };
    const draw = () => {
      if (i >= seq.length) { close(true); return; }
      cur = seq[i]; $('#dlg-ch').innerHTML = ''; $('#dlg-next').hidden = false;
      $('#dlg-count').textContent = `${i + 1} / ${seq.length}`;
      if (cur.choose) {
        ov.classList.add('me-speaks'); ov.classList.remove('mentor-speaks');
        $('#dlg-name').textContent = st().profile.name || 'Tú'; $('#dlg-text').textContent = '¿Qué dices?'; $('#dlg-en').textContent = 'What do you say?'; $('#dlg-next').hidden = true;
        $('#dlg-ch').innerHTML = cur.choose.map((o, k) => `<button class="opt" data-k="${k}"><span class="es">${esc(fill(o.es))}</span><small>${esc(fill(o.en))}</small></button>`).join('');
        $('#dlg-ch').querySelectorAll('.opt').forEach(b => b.onclick = () => { const o = cur.choose[+b.dataset.k]; seq.splice(i + 1, 0, { p: o.es, en: o.en }, ...(o.re ? [o.re] : [])); i++; draw(); });
        $('#dlg-ch').querySelector('.opt').focus();
      } else if (cur.p) {
        ov.classList.add('me-speaks'); ov.classList.remove('mentor-speaks');
        $('#dlg-name').textContent = st().profile.name || 'Tú'; $('#dlg-text').textContent = fill(cur.p); $('#dlg-en').textContent = fill(cur.en);
      } else {
        ov.classList.add('mentor-speaks'); ov.classList.remove('me-speaks');
        $('#dlg-name').textContent = mt.name; $('#dlg-text').textContent = fill(cur.m, opts.vars); $('#dlg-en').textContent = fill(cur.en, opts.vars);
        if (st().profile.autoSpeak) H.say(mt, fill(cur.m, opts.vars));
      }
      showEn(); if (!$('#dlg-next').hidden) $('#dlg-next').focus();
    };
    const key = e => { if (e.key === 'Escape') close(false); };
    document.addEventListener('keydown', key);
    $('#dlg-next').onclick = () => { i++; draw(); };
    $('#dlg-skip').onclick = () => close(false);
    $('#dlg-say').onclick = () => { if (cur && !cur.choose) { const t = cur.p ? fill(cur.p) : fill(cur.m, opts.vars); MA.Audio.speak(t, cur.p ? { voice: 'airy' } : { voice: mt.voice.tts, rate: mt.voice.rate }); } };
    draw();
  };
  H.mentorBubble = (cityId, line, vars, extra = '') => {
    const mt = MA.MENTORS[cityId]; if (!mt || !line) return '';
    const es = fill(line.m, vars), en = fill(line.en, vars);
    return `<div class="mentor-bubble">${H.portrait(mt.look, 'sm')}<div><b>${esc(mt.name)}</b><p class="es">${esc(es)} <button class="spk" data-mentor-say="${cityId}" data-t="${esc(es)}" aria-label="Hear ${esc(mt.name)}">🔊</button></p><p class="muted tiny">${esc(en)}</p>${extra}</div></div>`;
  };
  document.addEventListener('click', e => { const b = e.target.closest('[data-mentor-say]'); if (b) { e.preventDefault(); e.stopPropagation(); const mt = MA.MENTORS[b.dataset.mentorSay]; MA.Audio.speak(b.dataset.t, { voice: mt.voice.tts, rate: mt.voice.rate }); } }, true);

  /* =====================================================================
     CITY PAGE — mentor card + automatic city introduction
     ===================================================================== */
  H.storyOpen = c => H.storyStatus(c) !== 'locked' && (st().arrivals[c.id] || c.order === 1);
  H.mentorCard = function (c) {
    const mt = MA.MENTORS[c.id]; if (!mt) return '';
    const open = H.storyOpen(c), met = H.seen('intro:' + c.id);
    return `<div class="panel mentor-card"><div class="mc-art">${MA.avatarSVG(mt.look, { label: mt.name })}</div>
      <div class="mc-body"><p class="eyebrow">Your local mentor</p><h2>${esc(mt.full)} <span class="muted">· ${mt.age}</span></h2><p class="mc-role">${esc(mt.role)}</p>
        <dl class="kvd"><dt>Personality</dt><dd>${esc(mt.personality)}</dd><dt>Background</dt><dd>${esc(mt.background)}</dd><dt>Connection to ${esc(c.short || c.name)}</dt><dd>${esc(mt.relation)}</dd><dt>Teaching style</dt><dd>${esc(mt.teaching)}</dd>
        <dt>Says things like</dt><dd>${mt.expressions.map(x => `<span class="tag">${esc(x[0])}</span> <span class="tiny muted">${esc(x[1])}</span>`).join(' · ')}</dd></dl>
        <div class="row gap wrap">${open ? `<button class="btn primary" data-intro="${c.id}">${met ? '↻ Replay introduction' : '▶ Meet ' + esc(mt.name)}</button>` : `<span class="pill off">🔒 Story locked — you meet ${esc(mt.name)} when you travel here</span>`}
        <a class="btn" href="#mentor-${c.id}">💬 Ask ${esc(mt.name)} (AI)</a>${c.built ? `<button class="btn ghost" data-demo="${c.id}">🔊 Hear ${esc(mt.name)} speak</button>` : ''}</div>
        <p class="tiny muted">Introduction and lesson talks are scripted. “Ask ${esc(mt.name)}” is an AI conversation played by Claude at ${esc(c.level)} level.</p></div></div>`;
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-intro]'); if (b) { const id = b.dataset.intro; H.scene(id, MA.MENTORS[id].intro, { key: 'intro:' + id, title: 'Welcome to ' + (MA.CITY[id].short || MA.CITY[id].name), reward: 10, onDone: () => H.render() }); return; }
    const d = e.target.closest('[data-demo]'); if (d) { const mt = MA.MENTORS[d.dataset.demo]; MA.Audio.speak(mt.expressions.map(x => x[0]).join(' … '), { voice: mt.voice.tts, rate: mt.voice.rate }); }
  });
  const cityHome2 = H.cityHome;
  H.cityHome = function (c) {
    let html = cityHome2(c).replace(/<p class="tiny muted">Your local mentor arrives in a later update \(Phase 2\)\.<\/p>/, '');
    const card = H.mentorCard(c);
    html = html.replace('<div class="cat-grid">', card + '<div class="cat-grid">');
    if (MA.MENTORS[c.id] && H.storyOpen(c) && !H.seen('intro:' + c.id)) H.after(() => setTimeout(() => { if (H.current.name === 'city' && H.current.arg === c.id && !document.querySelector('.dlg-ov')) H.scene(c.id, MA.MENTORS[c.id].intro, { key: 'intro:' + c.id, title: 'Welcome to ' + (c.short || c.name), reward: 10, onDone: () => H.render() }); }, 450));
    return html;
  };

  /* =====================================================================
     LESSONS — pre-chapter talk, mentor explanation, demonstration, feedback
     ===================================================================== */
  const lesson0 = V.lesson;
  V.lesson = function (id) {
    const l = MA.LESSONS[id]; let html = lesson0(id); if (!l) return html;
    const ch = MA.CHAPTERS.find(x => x.id === l.chapter); const mt = MA.MENTORS[ch.city]; if (!mt) return html;
    const tips = (mt.tips || {})[id] || [];
    const box = `<div class="panel mentor-lesson">${H.portrait(mt.look, 'md')}<div class="ml-body"><p class="eyebrow">${esc(mt.name)} explains</p>
      <div class="ml-steps">${tips.map((t, k) => `<div class="ml-step ${k ? '' : 'on'}" data-step="${k}"><p class="es">${esc(t.m)} <button class="spk" data-mentor-say="${ch.city}" data-t="${esc(t.m)}" aria-label="Hear">🔊</button></p><p class="muted">${esc(t.en)}</p></div>`).join('')}</div>
      <div class="row gap wrap">${tips.length > 1 ? `<button class="btn small" id="ml-next">Next tip ▸</button>` : ''}<button class="btn small ghost" id="ml-demo">🔊 ${esc(mt.name)} says the key words</button>${(mt.chapters || {})[ch.id] ? `<button class="btn small ghost" id="ml-pre">↻ Chapter ${ch.num} talk</button>` : ''}</div></div></div>`;
    html = html.replace('<div class="panel prose">', box + '<div class="panel prose">');
    H.after(view => {
      const steps = view.querySelectorAll('.ml-step'); let k = 0;
      const nb = view.querySelector('#ml-next'); if (nb) nb.onclick = () => { steps[k].classList.remove('on'); k = (k + 1) % steps.length; steps[k].classList.add('on'); nb.textContent = k === steps.length - 1 ? '↻ First tip' : 'Next tip ▸'; if (st().profile.autoSpeak) H.say(mt, tips[k].m); };
      view.querySelector('#ml-demo').onclick = async () => { for (const w of l.vocab.slice(0, 6)) { const v = S.word(w); if (!v) continue; await MA.Audio.speak(v.es.replace(/…/g, ''), { voice: mt.voice.tts, rate: mt.voice.rate }); } };
      const pre = view.querySelector('#ml-pre'); if (pre) pre.onclick = () => H.scene(ch.city, mt.chapters[ch.id], { key: 'pre:' + ch.id, title: `Chapter ${ch.num}: ${ch.title}` });
      if (l.idx === 0 && (mt.chapters || {})[ch.id] && !H.seen('pre:' + ch.id)) setTimeout(() => { if (H.current.name === 'lesson' && H.current.arg === id && !document.querySelector('.dlg-ov')) H.scene(ch.city, mt.chapters[ch.id], { key: 'pre:' + ch.id, title: `Chapter ${ch.num}: ${ch.title}` }); }, 400);
    });
    return html;
  };
  H.mentorLessonDone = function (id, score, box) {
    const l = MA.LESSONS[id]; const ch = MA.CHAPTERS.find(x => x.id === l.chapter); if (!MA.MENTORS[ch.city]) return;
    const line = score >= 80 ? FB.lessonHi : score >= 60 ? FB.lessonMid : FB.lessonLo;
    box.querySelector('.result').insertAdjacentHTML('afterbegin', H.mentorBubble(ch.city, line, { score }));
    if (st().profile.autoSpeak) H.say(MA.MENTORS[ch.city], fill(line.m, { score }));
  };
  H.mentorExamDone = function (cid, overall, passed, weak, box) {
    const ch = MA.CHAPTERS.find(x => x.id === cid); const mt = MA.MENTORS[ch.city]; if (!mt) return;
    const SK = { vocab: 'el vocabulario', grammar: 'la gramática', listening: 'la comprensión auditiva', reading: 'la lectura', writing: 'la escritura', speaking: 'la expresión oral' };
    const line = passed ? FB.examPass : FB.examFail;
    const vars = { score: overall, n: ch.num, weak: weak.map(w => SK[w] || w).join(' y ') || 'los temas del capítulo' };
    box.querySelector('.result').insertAdjacentHTML('afterbegin', H.mentorBubble(ch.city, line, vars));
    const c = MA.CITY[ch.city];
    if (passed && H.cityMilestone(c).done && !H.seen('celebrate:' + c.id) && mt.celebrate) setTimeout(() => H.scene(c.id, mt.celebrate, { key: 'celebrate:' + c.id, title: 'Milestone: ' + c.name, reward: 50, onDone: () => H.render() }), 900);
  };

  /* ---------- homework handed out by the mentor ---------- */
  const hw0 = V.homework;
  V.homework = function (cid) { const ch = MA.CHAPTERS.find(x => x.id === cid); const html = hw0(cid); const mt = ch && MA.MENTORS[ch.city]; return mt ? H.mentorBubble(ch.city, mt.hw) + html : html; };
  const cityHw = H.cityHomework;
  H.cityHomework = function (c, sub, head) { const mt = MA.MENTORS[c.id]; return head + (mt ? H.mentorBubble(c.id, mt.hw) : '') + cityHw(c, sub, ''); };

  /* ---------- AI conversation with the mentor ---------- */
  V.mentor = function (cityId) {
    const mt = MA.MENTORS[cityId], c = MA.CITY[cityId]; if (!mt) return V.map();
    return H.chatPage({ key: 'mentor:' + cityId, name: mt.name, role: `${mt.role} in ${c.name}, the learner's local mentor`, look: mt.look, voice: mt.voice.tts,
      style: `Personality: ${mt.personality} Background: ${mt.background} Teaching style: ${mt.teaching} You teach this city's topics: ${c.topics.map(t => t[0]).join(', ')}. When the learner asks, explain grammar or vocabulary briefly in simple English inside "reply_en", give a tiny practice question, and encourage. Typical expressions you use: ${mt.expressions.map(x => x[0]).join(', ')}.`,
      topics: c.topics.slice(0, 5).map(t => t[0]), greet: mt.greet, level: c.level, companion: true,
      dialectNote: cityId === 'laspalmas' ? 'you are Canarian: you may use ustedes and words like guagua, and explain them if asked' : '' });
  };
  const trail0 = H.trail;
  H.trail = function (name = H.current.name, arg = H.current.arg) {
    if (name === 'mentor') { const c = MA.CITY[arg], mt = MA.MENTORS[arg]; if (!c || !mt) return [['Home', '#home']]; return [['Home', '#home'], [MA.STAGES[c.stage].name, '#stage-' + c.stage], [c.short || c.name, '#city-' + c.id], ['Ask ' + mt.name, '#mentor-' + c.id]]; }
    return trail0(name, arg);
  };
  const catOf0 = H.catOf; H.catOf = (n, a) => n === 'mentor' ? 'speaking' : catOf0(n, a);

  /* ---------- speaking tab: mentor first ---------- */
  const prac = H.cityPractice;
  H.cityPractice = function (c, sub, head) {
    let html = prac(c, sub, head); const mt = MA.MENTORS[c.id];
    if (mt && (sub === 'speaking')) html = html.replace('<h3 class="sub-h">Conversation missions', `<h3 class="sub-h">Your mentor</h3><div class="npcs"><a class="panel npc" href="#mentor-${c.id}">${H.portrait(mt.look, 'md')}<span><b>${esc(mt.full)}</b><small>${esc(mt.role)}</small><small>AI conversation · ${esc(c.level)} · explains grammar on request</small></span></a></div><h3 class="sub-h">Conversation missions`);
    return html;
  };

  /* ---------- passport: mentors you have met ---------- */
  const pass0 = V.passport;
  V.passport = function () {
    const met = MA.CITIES.filter(c => MA.MENTORS[c.id] && H.seen('intro:' + c.id));
    const block = `<div class="panel"><h3>Mentors you have met</h3>${met.length ? `<div class="mentors-met">${met.map(c => { const mt = MA.MENTORS[c.id]; return `<a href="#city-${c.id}" class="mm">${H.portrait(mt.look, 'md')}<b>${esc(mt.name)}</b><small>${esc(c.short || c.name)}</small></a>`; }).join('')}</div>` : '<p class="muted">Meet your first mentor in Alicante.</p>'}</div>`;
    return pass0().replace('<div class="panel"><h3>Achievements</h3>', block + '<div class="panel"><h3>Achievements</h3>');
  };
  H.ACH.push(['🤝', 'Primera mentora', 'Meet your first mentor', () => H.seen('intro:alicante')]);
  H.ACH.push(['🎓', 'Etapa completada', 'Complete a city milestone', () => MA.CITIES.some(c => !c.final && H.cityMilestone(c).done)]);

  /* ---------- About: honest status ---------- */
  const about0 = V.about;
  V.about = () => `<div class="panel"><h3>Phase 2 (this update)</h3><ul><li>Nine local mentors, each with age, look, personality, background, link to the city, teaching style, typical expressions and a voice setting.</li><li>Scripted city introductions (shown automatically when you arrive), chapter talks before Chapters 1–2, mentor explanations and pronunciation demos inside every Alicante lesson, feedback after lessons and exams, homework hand-off, and a milestone celebration.</li><li>“Ask your mentor” is an AI conversation (Claude) at the city’s level. Scripted parts never use AI.</li><li>Chapter talks and lesson explanations exist only where lessons exist (Alicante for now).</li></ul></div>` + about0();
})();
