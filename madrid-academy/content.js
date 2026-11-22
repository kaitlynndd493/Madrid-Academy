/* MADRID ACADEMY — curriculum content (European Spanish, es-ES).
   Separate from game logic. All Spanish texts are original adaptations. */
window.MA = window.MA || {};

/* ---------------- VOCABULARY ---------------- */
// img: key of a stylized 3D-style SVG illustration in art.js (concrete nouns only)
MA.VOCAB = [
  // Chapter 1 · Lesson 1 — greetings
  {id:'hola', es:'hola', en:'hello / hi', ipa:'ˈola', pos:'interjection', ex:'¡Hola! ¿Qué tal?', exEn:'Hi! How are things?', coll:['hola a todos','hola, buenas'], rel:['buenas (informal hello, very common in Spain)'], cat:'greetings'},
  {id:'buenos_dias', es:'buenos días', en:'good morning', ipa:'ˈbwenos ˈði.as', pos:'phrase', ex:'Buenos días, profesora.', exEn:'Good morning, teacher.', coll:['dar los buenos días'], rel:['buen día (Latin America, rare in Spain)'], cat:'greetings', note:'Used until lunch (about 2 p.m. in Spain).'},
  {id:'buenas_tardes', es:'buenas tardes', en:'good afternoon / good evening', ipa:'ˈbwenas ˈtaɾðes', pos:'phrase', ex:'Buenas tardes, ¿qué desea?', exEn:'Good afternoon, what would you like?', coll:[], rel:['la tarde = afternoon/early evening'], cat:'greetings', note:'In Spain, from lunch until it gets dark (often 8–9 p.m.).'},
  {id:'buenas_noches', es:'buenas noches', en:'good evening / good night', ipa:'ˈbwenas ˈnot͡ʃes', pos:'phrase', ex:'Buenas noches, hasta mañana.', exEn:'Good night, see you tomorrow.', coll:[], rel:['la noche = night'], cat:'greetings', note:'Used both to greet and to say goodbye at night.'},
  {id:'que_tal', es:'¿qué tal?', en:'how are you? / how is it going?', ipa:'ke ˈtal', pos:'phrase', ex:'¿Qué tal el día?', exEn:'How was your day?', coll:['¿qué tal estás?','¿qué tal + noun?'], rel:['¿cómo estás?'], cat:'greetings'},
  {id:'bien', es:'bien', en:'well / fine', ipa:'bjen', pos:'adverb', ex:'Estoy bien, gracias.', exEn:'I am fine, thanks.', coll:['muy bien','bastante bien'], rel:['mal = badly','regular = so-so'], cat:'greetings'},
  {id:'adios', es:'adiós', en:'goodbye', ipa:'aˈðjos', pos:'interjection', ex:'Adiós, ¡que vaya bien!', exEn:'Goodbye, hope it goes well!', coll:[], rel:['hasta luego','chao'], cat:'greetings'},
  {id:'hasta_luego', es:'hasta luego', en:'see you later / bye', ipa:'ˈasta ˈlweɣo', pos:'phrase', ex:'Hasta luego, Lucía.', exEn:'See you later, Lucía.', coll:[], rel:['hasta mañana','hasta pronto'], cat:'greetings', note:'In Spain people say it even when they will not see you later.'},
  {id:'gracias', es:'gracias', en:'thank you', ipa:'ˈɡɾaθjas', pos:'interjection', ex:'Muchas gracias por todo.', exEn:'Thank you very much for everything.', coll:['muchas gracias','gracias por + noun'], rel:['de nada'], cat:'greetings'},
  {id:'por_favor', es:'por favor', en:'please', ipa:'poɾ faˈβoɾ', pos:'phrase', ex:'Un café, por favor.', exEn:'A coffee, please.', coll:[], rel:['¿me ayudas, por favor?'], cat:'greetings'},
  {id:'de_nada', es:'de nada', en:'you are welcome', ipa:'de ˈnaða', pos:'phrase', ex:'—Gracias. —De nada.', exEn:'—Thanks. —You are welcome.', coll:[], rel:['no hay de qué'], cat:'greetings'},
  {id:'perdon', es:'perdón', en:'sorry / excuse me', ipa:'peɾˈðon', pos:'interjection', ex:'Perdón, ¿dónde está la clase?', exEn:'Excuse me, where is the classroom?', coll:['pedir perdón'], rel:['disculpa / disculpe','lo siento'], cat:'greetings'},
  {id:'vale', es:'vale', en:'OK / all right', ipa:'ˈbale', pos:'interjection', ex:'—¿Un café? —¡Vale!', exEn:'—A coffee? —OK!', coll:['vale, vale'], rel:['de acuerdo'], cat:'greetings', note:'Very typical of Spain.'},
  // Chapter 1 · Lesson 2 — people
  {id:'ser', es:'ser', en:'to be (identity, origin, profession)', ipa:'seɾ', pos:'verb (irregular)', ex:'Soy estudiante.', exEn:'I am a student.', coll:['ser de + place'], rel:['estar = to be (state, location)'], cat:'people'},
  {id:'estudiante', es:'estudiante', en:'student', ipa:'estuˈðjante', pos:'noun', gender:'m/f (el/la)', plural:'estudiantes', ex:'Ella es estudiante de español.', exEn:'She is a Spanish student.', coll:['estudiante de + subject'], rel:['estudiar = to study'], cat:'people'},
  {id:'profesora', es:'profesora', en:'teacher (female)', ipa:'pɾofeˈsoɾa', pos:'noun', gender:'f (la) · m: el profesor', plural:'profesoras', ex:'La profesora es muy simpática.', exEn:'The teacher is very nice.', coll:['profesora de español'], rel:['la clase','el aula'], cat:'people'},
  {id:'amiga', es:'amiga', en:'friend (female)', ipa:'aˈmiɣa', pos:'noun', gender:'f (la) · m: el amigo', plural:'amigas', ex:'Lucía es mi amiga.', exEn:'Lucía is my friend.', coll:['una buena amiga'], rel:['la amistad = friendship'], cat:'people'},
  {id:'companera', es:'compañera de clase', en:'classmate (female)', ipa:'kompaˈɲeɾa ðe ˈklase', pos:'noun phrase', gender:'f · m: compañero', plural:'compañeras de clase', ex:'Mi compañera de clase es italiana.', exEn:'My classmate is Italian.', coll:['compañero de piso = flatmate'], rel:[], cat:'people'},
  // Chapter 1 · Lesson 3 — introductions
  {id:'me_llamo', es:'me llamo…', en:'my name is…', ipa:'me ˈʝamo', pos:'phrase (llamarse)', ex:'Me llamo Sofía.', exEn:'My name is Sofía.', coll:[], rel:['¿cómo te llamas?'], cat:'introductions'},
  {id:'como_te_llamas', es:'¿cómo te llamas?', en:'what is your name? (informal)', ipa:'ˈkomo te ˈʝamas', pos:'phrase', ex:'Hola, ¿cómo te llamas?', exEn:'Hi, what is your name?', coll:[], rel:['¿cómo se llama usted? (formal)'], cat:'introductions'},
  {id:'encantada', es:'encantada', en:'nice to meet you (said by a woman)', ipa:'eŋkanˈtaða', pos:'adjective', gender:'f · m: encantado', ex:'—Soy Carmen. —Encantada.', exEn:'—I am Carmen. —Nice to meet you.', coll:[], rel:['mucho gusto'], cat:'introductions', note:'It agrees with the SPEAKER: a woman says encantada.'},
  {id:'mucho_gusto', es:'mucho gusto', en:'pleased to meet you', ipa:'ˈmut͡ʃo ˈɣusto', pos:'phrase', ex:'Mucho gusto, Javi.', exEn:'Pleased to meet you, Javi.', coll:[], rel:['el gusto es mío = the pleasure is mine'], cat:'introductions'},
  {id:'de_donde_eres', es:'¿de dónde eres?', en:'where are you from?', ipa:'de ˈðonde ˈeɾes', pos:'phrase', ex:'¿De dónde eres, Sofía?', exEn:'Where are you from, Sofía?', coll:[], rel:['soy de…'], cat:'introductions'},
  {id:'espanol', es:'español / española', en:'Spanish', ipa:'espaˈɲol / espaˈɲola', pos:'adjective · noun', ex:'Lucía es española.', exEn:'Lucía is Spanish.', coll:['hablar español'], rel:['España'], cat:'nationalities'},
  {id:'ingles', es:'inglés / inglesa', en:'English', ipa:'iŋˈɡles / iŋˈɡlesa', pos:'adjective · noun', ex:'Tom es inglés.', exEn:'Tom is English.', coll:[], rel:['Inglaterra'], cat:'nationalities'},
  {id:'canadiense', es:'canadiense', en:'Canadian', ipa:'kanaˈðjense', pos:'adjective · noun', ex:'Soy canadiense, de Vancouver.', exEn:'I am Canadian, from Vancouver.', coll:[], rel:['Canadá'], cat:'nationalities', note:'Same form for men and women.'},
  {id:'vietnamita', es:'vietnamita', en:'Vietnamese', ipa:'bjetnaˈmita', pos:'adjective · noun', ex:'Mi familia es vietnamita.', exEn:'My family is Vietnamese.', coll:[], rel:['Vietnam'], cat:'nationalities', note:'Same form for men and women.'},
  {id:'frances', es:'francés / francesa', en:'French', ipa:'fɾanˈθes / fɾanˈθesa', pos:'adjective · noun', ex:'Claire es francesa.', exEn:'Claire is French.', coll:[], rel:['Francia'], cat:'nationalities'},
  {id:'italiano', es:'italiano / italiana', en:'Italian', ipa:'itaˈljano / itaˈljana', pos:'adjective · noun', ex:'Giulia es italiana.', exEn:'Giulia is Italian.', coll:[], rel:['Italia'], cat:'nationalities'},
  {id:'japones', es:'japonés / japonesa', en:'Japanese', ipa:'xapoˈnes / xapoˈnesa', pos:'adjective · noun', ex:'Yuki es japonesa.', exEn:'Yuki is Japanese.', coll:[], rel:['Japón'], cat:'nationalities'},
  // Chapter 1 · Lesson 4 — sounds
  {id:'ciudad', es:'ciudad', en:'city', ipa:'θjuˈðað', pos:'noun', gender:'f (la)', plural:'ciudades', ex:'Madrid es una ciudad preciosa.', exEn:'Madrid is a beautiful city.', coll:['el centro de la ciudad'], rel:[], cat:'sounds'},
  {id:'zapatos', es:'zapatos', en:'shoes', ipa:'θaˈpatos', pos:'noun', gender:'m (los) · sing.: el zapato', plural:'zapatos', ex:'Llevo unos zapatos negros.', exEn:'I am wearing black shoes.', coll:['zapatos planos = flats'], rel:['las bailarinas = ballet flats'], cat:'sounds', img:'shoes'},
  {id:'jamon', es:'jamón', en:'cured ham', ipa:'xaˈmon', pos:'noun', gender:'m (el)', plural:'jamones', ex:'El jamón de España es famoso.', exEn:'Spanish ham is famous.', coll:['jamón serrano','jamón ibérico'], rel:[], cat:'sounds'},
  {id:'gente', es:'gente', en:'people', ipa:'ˈxente', pos:'noun', gender:'f (la), grammatically singular', ex:'La gente de Madrid es simpática.', exEn:'People in Madrid are friendly.', coll:['mucha gente'], rel:[], cat:'sounds', note:'Singular verb: la gente ES.'},
  {id:'espana', es:'España', en:'Spain', ipa:'esˈpaɲa', pos:'proper noun', gender:'f', ex:'Vivo en España.', exEn:'I live in Spain.', coll:[], rel:['español'], cat:'sounds'},
  {id:'manana', es:'mañana', en:'tomorrow / morning', ipa:'maˈɲana', pos:'adverb · noun (f)', ex:'Hasta mañana. / Por la mañana estudio.', exEn:'See you tomorrow. / In the morning I study.', coll:['por la mañana'], rel:[], cat:'sounds'},
  {id:'pero', es:'pero', en:'but', ipa:'ˈpeɾo', pos:'conjunction', ex:'Es pequeño, pero bonito.', exEn:'It is small, but pretty.', coll:[], rel:['compare: perro'], cat:'sounds'},
  {id:'perro', es:'perro', en:'dog', ipa:'ˈpero', pos:'noun', gender:'m (el) · f: perra', plural:'perros', ex:'El perro de mi vecina es enorme.', exEn:'My neighbour’s dog is huge.', coll:[], rel:['compare: pero'], cat:'sounds', img:'dog'},
  {id:'gato', es:'gato', en:'cat', ipa:'ˈɡato', pos:'noun', gender:'m (el) · f: gata', plural:'gatos', ex:'Mi gato duerme en el sofá.', exEn:'My cat sleeps on the sofa.', coll:[], rel:['“los gatos” is also a nickname for people born in Madrid'], idiom:'dar gato por liebre = to rip someone off', cat:'sounds', img:'cat'},
  {id:'casa', es:'casa', en:'house / home', ipa:'ˈkasa', pos:'noun', gender:'f (la)', plural:'casas', ex:'Estoy en casa.', exEn:'I am at home.', coll:['en casa','ir a casa'], rel:['el piso = flat/apartment (Spain)'], idiom:'como Pedro por su casa = completely at ease', cat:'sounds', img:'house'},
  {id:'libro', es:'libro', en:'book', ipa:'ˈliβɾo', pos:'noun', gender:'m (el)', plural:'libros', ex:'Leo un libro en la biblioteca.', exEn:'I read a book in the library.', coll:['un libro de cuentos'], rel:['la librería = bookshop','la biblioteca = library'], cat:'sounds', img:'book'},
  // Chapter 2 · Lesson 1 — café
  {id:'cafe', es:'café', en:'coffee / café', ipa:'kaˈfe', pos:'noun', gender:'m (el)', plural:'cafés', ex:'Tomo un café cada mañana.', exEn:'I have a coffee every morning.', coll:['tomar un café'], rel:['la cafetería'], cat:'cafe', img:'coffee'},
  {id:'cafe_con_leche', es:'café con leche', en:'coffee with milk (latte-style)', ipa:'kaˈfe kon ˈlet͡ʃe', pos:'noun phrase', gender:'m', ex:'Un café con leche, por favor.', exEn:'A coffee with milk, please.', coll:[], rel:['un cortado = espresso with a little milk','un café solo = black espresso'], cat:'cafe', img:'coffee'},
  {id:'te', es:'té', en:'tea', ipa:'te', pos:'noun', gender:'m (el)', plural:'tés', ex:'¿Tienes té verde?', exEn:'Do you have green tea?', coll:['té con limón'], rel:['te (no accent) = you (object pronoun)'], cat:'cafe', img:'tea'},
  {id:'agua', es:'agua', en:'water', ipa:'ˈaɣwa', pos:'noun', gender:'f (el agua!)', plural:'aguas', ex:'Un agua sin gas, por favor.', exEn:'A still water, please.', coll:['agua con gas','agua del grifo'], rel:[], cat:'cafe', img:'water', note:'Feminine, but takes EL in the singular: el agua fría.'},
  {id:'zumo', es:'zumo de naranja', en:'orange juice', ipa:'ˈθumo ðe naˈɾaŋxa', pos:'noun phrase', gender:'m (el)', plural:'zumos', ex:'Un zumo de naranja natural.', exEn:'A fresh orange juice.', coll:['zumo natural'], rel:['jugo (Latin America)'], cat:'cafe', img:'juice'},
  {id:'leche', es:'leche', en:'milk', ipa:'ˈlet͡ʃe', pos:'noun', gender:'f (la)', ex:'Con leche de avena, por favor.', exEn:'With oat milk, please.', coll:['leche desnatada'], rel:[], cat:'cafe'},
  {id:'tostada', es:'tostada', en:'toast', ipa:'tosˈtaða', pos:'noun', gender:'f (la)', plural:'tostadas', ex:'Una tostada con tomate y aceite.', exEn:'Toast with tomato and olive oil.', coll:['tostada con tomate'], rel:[], cat:'cafe', img:'toast'},
  {id:'cruasan', es:'cruasán', en:'croissant', ipa:'kɾwaˈsan', pos:'noun', gender:'m (el)', plural:'cruasanes', ex:'Quería un cruasán.', exEn:'I would like a croissant.', coll:['cruasán a la plancha'], rel:[], cat:'cafe', img:'croissant'},
  {id:'tortilla', es:'tortilla de patatas', en:'Spanish potato omelette', ipa:'toɾˈtiʝa ðe paˈtatas', pos:'noun phrase', gender:'f (la)', ex:'Un pincho de tortilla, por favor.', exEn:'A slice of potato omelette, please.', coll:['un pincho de tortilla'], rel:['la patata (Spain) = potato'], cat:'cafe'},
  {id:'azucar', es:'azúcar', en:'sugar', ipa:'aˈθukaɾ', pos:'noun', gender:'m (el)', ex:'Sin azúcar, gracias.', exEn:'No sugar, thanks.', coll:['sin azúcar'], rel:[], cat:'cafe'},
  // Chapter 2 · Lesson 2 — numbers & prices
  {id:'cuanto_es', es:'¿cuánto es?', en:'how much is it?', ipa:'ˈkwanto ˈes', pos:'phrase', ex:'Perdona, ¿cuánto es?', exEn:'Excuse me, how much is it?', coll:[], rel:['¿cuánto cuesta?'], cat:'numbers'},
  {id:'euro', es:'euro', en:'euro', ipa:'ˈewɾo', pos:'noun', gender:'m (el)', plural:'euros', ex:'Son dos euros con cincuenta.', exEn:'That is two euros fifty.', coll:['euros con + céntimos'], rel:['el céntimo = cent'], cat:'numbers'},
  {id:'la_cuenta', es:'la cuenta', en:'the bill', ipa:'la ˈkwenta', pos:'noun', gender:'f (la)', ex:'¿Nos traes la cuenta, por favor?', exEn:'Could you bring us the bill, please?', coll:['pedir la cuenta'], rel:['pagar = to pay'], cat:'numbers'},
  // Chapter 2 · Lesson 3 — ordering
  {id:'que_te_pongo', es:'¿qué te pongo?', en:'what can I get you? (informal)', ipa:'ke te ˈpoŋɡo', pos:'phrase', ex:'Hola, ¿qué te pongo?', exEn:'Hi, what can I get you?', coll:[], rel:['¿qué le pongo? (formal)'], cat:'ordering', note:'Very typical of bars in Spain.'},
  {id:'me_pones', es:'¿me pones…?', en:'can I have…? (lit. will you put me…)', ipa:'me ˈpones', pos:'phrase', ex:'¿Me pones un café con leche?', exEn:'Can I have a coffee with milk?', coll:[], rel:['ponme… (more direct)'], cat:'ordering'},
  {id:'para_mi', es:'para mí…', en:'for me…', ipa:'ˈpaɾa ˈmi', pos:'phrase', ex:'Para mí, un té.', exEn:'For me, a tea.', coll:[], rel:['¿y para ti?'], cat:'ordering'},
  {id:'queria', es:'quería…', en:'I would like… (polite)', ipa:'keˈɾi.a', pos:'verb (querer, imperfect)', ex:'Quería una tostada, por favor.', exEn:'I would like some toast, please.', coll:[], rel:['quiero = I want (more direct)'], cat:'ordering'},
  {id:'algo_mas', es:'¿algo más?', en:'anything else?', ipa:'ˈalɣo ˈmas', pos:'phrase', ex:'—¿Algo más? —No, nada más.', exEn:'—Anything else? —No, nothing else.', coll:[], rel:['nada más, gracias'], cat:'ordering'},
  {id:'para_llevar', es:'para llevar', en:'to take away', ipa:'ˈpaɾa ʝeˈβaɾ', pos:'phrase', ex:'Un café para llevar, por favor.', exEn:'A coffee to go, please.', coll:['¿para tomar aquí o para llevar?'], rel:['para tomar aquí = to have here'], cat:'ordering'},
  {id:'tomar', es:'tomar', en:'to have (food/drink), to take', ipa:'toˈmaɾ', pos:'verb (-ar, regular)', ex:'¿Qué tomas?', exEn:'What are you having?', coll:['tomar algo = have a drink','tomar el sol'], rel:[], cat:'ordering'},
  // Market & museum extras
  {id:'manzana', es:'manzana', en:'apple', ipa:'manˈθana', pos:'noun', gender:'f (la)', plural:'manzanas', ex:'Un kilo de manzanas, por favor.', exEn:'A kilo of apples, please.', coll:['un kilo de manzanas'], rel:['also: a city block in Spain'], cat:'market', img:'apple'},
  {id:'naranja', es:'naranja', en:'orange', ipa:'naˈɾaŋxa', pos:'noun · adj', gender:'f (la)', plural:'naranjas', ex:'Las naranjas de Valencia son dulces.', exEn:'Oranges from Valencia are sweet.', coll:[], rel:[], cat:'market', img:'orange'},
  {id:'pan', es:'pan', en:'bread', ipa:'pan', pos:'noun', gender:'m (el)', plural:'panes', ex:'Una barra de pan, por favor.', exEn:'A baguette, please.', coll:['una barra de pan'], rel:['la panadería = bakery'], idiom:'ser pan comido = to be a piece of cake', cat:'market', img:'bread'},
  {id:'queso', es:'queso', en:'cheese', ipa:'ˈkeso', pos:'noun', gender:'m (el)', plural:'quesos', ex:'El queso manchego es de La Mancha.', exEn:'Manchego cheese is from La Mancha.', coll:['queso manchego'], rel:[], cat:'market', img:'cheese'},
  {id:'cuadro', es:'cuadro', en:'painting', ipa:'ˈkwaðɾo', pos:'noun', gender:'m (el)', plural:'cuadros', ex:'Este cuadro es de Velázquez.', exEn:'This painting is by Velázquez.', coll:['pintar un cuadro'], rel:['el pintor / la pintora = painter'], cat:'museum', img:'painting'},
  {id:'libertad', es:'libertad', en:'freedom', ipa:'liβeɾˈtað', pos:'noun (abstract)', gender:'f (la)', ex:'Vivir sola me da libertad.', exEn:'Living alone gives me freedom.', coll:['libertad de expresión'], rel:['libre = free'], cat:'museum', img:'freedom'}
];
MA.V = Object.fromEntries(MA.VOCAB.map(v => [v.id, v]));

/* ---------------- CURRICULUM ---------------- */
MA.LEVELS = [
  {id:'A1', name:'Beginner', months:'Months 1–2', topics:['Alphabet & Spain pronunciation','Greetings & introductions','Numbers, dates, time','Gender & articles','Subject pronouns','Ser, estar, tener, hay','Present tense','Basic adjectives','Family','Food & drinks','Shopping','Directions','Daily routines','Basic questions'],
   plannedChapters:['¡Hola, Madrid!','En el café','Mi barrio (estar, hay, directions)','Mi familia (tener, possessives)','Mi día (present tense, routines)','De compras (adjectives, colours, prices)','La hora y el calendario','Repaso A1 (level exam)']},
  {id:'A2', name:'Elementary', months:'Months 2–3', topics:['Reflexive verbs','Present progressive','Irregular verbs','Preterite','Imperfect','Future expressions','Comparisons','Object pronouns','Travel','Invitations'], plannedChapters:['Un fin de semana','Recuerdos','De viaje','¿Quedamos?','Repaso A2']},
  {id:'B1', name:'Intermediate', months:'Months 3–4', topics:['Past-tense contrasts','Future & conditional','Intro to subjunctive','Present perfect','Opinions','Emotions','Advice','Idioms'], plannedChapters:['Mi opinión','Consejos','Historias','Repaso B1']},
  {id:'B2', name:'Upper intermediate', months:'Months 5–6', topics:['Advanced subjunctive','Hypotheticals','Passive voice','Reported speech','Connectors','Registers','Debates','News'], plannedChapters:['El debate','Las noticias','Si yo fuera…','Repaso B2']},
  {id:'C1', name:'Advanced', months:'Months 7–9', topics:['Nuanced grammar','Idioms','Academic & professional Spanish','Literature','Argumentation','Presentations'], plannedChapters:['Español profesional','Literatura','Presentaciones']},
  {id:'C2', name:'Mastery (aspirational)', months:'Months 10–12', topics:['Literary Spanish','Abstract debate','Regional variation','Humour & irony','Sophisticated writing'], plannedChapters:['Matices','Ironía y humor','Variedades del español']}
];

const SER_TABLE = {title:'SER — to be (present)', head:['Person','Spanish','English'], rows:[
  ['yo','soy','I am'],['tú','eres','you are (informal)'],['él / ella / usted','es','he / she is · you are (formal)'],
  ['nosotros / nosotras','somos','we are'],['vosotros / vosotras','sois','you all are (informal, Spain)'],['ellos / ellas / ustedes','son','they are · you all are (formal)']]};
const TOMAR_TABLE = {title:'TOMAR — to have / take (regular -ar verb)', head:['Person','Ending','Form'], rows:[
  ['yo','-o','tomo'],['tú','-as','tomas'],['él / ella / usted','-a','toma'],['nosotros/as','-amos','tomamos'],['vosotros/as','-áis','tomáis'],['ellos / ellas / ustedes','-an','toman']]};
const ART_TABLE = {title:'Articles', head:['','Masculine','Feminine'], rows:[
  ['the (singular)','el café','la tostada'],['the (plural)','los cafés','las tostadas'],['a / an','un café','una tostada'],['some','unos cafés','unas tostadas']]};
const NUM_TABLE = {title:'Numbers 0–20', head:['#','Spanish','#','Spanish'], rows:[
  ['0','cero','11','once'],['1','uno / un / una','12','doce'],['2','dos','13','trece'],['3','tres','14','catorce'],['4','cuatro','15','quince'],
  ['5','cinco','16','dieciséis'],['6','seis','17','diecisiete'],['7','siete','18','dieciocho'],['8','ocho','19','diecinueve'],['9','nueve','20','veinte'],['10','diez','','']]};

MA.CHAPTERS = [
 {id:'c1', city:'alicante', level:'A1', num:1, title:'¡Hola, Alicante!', en:'Hello, Alicante!', goal:'Greet people, introduce yourself, say where you are from, and hear the sounds of Spain.',
  lessons:[
   {id:'c1l1', title:'Saludos en España', en:'Greetings in Spain', skill:'vocab', minutes:12,
    vocab:['hola','buenos_dias','buenas_tardes','buenas_noches','que_tal','bien','adios','hasta_luego','gracias','por_favor','de_nada','perdon','vale'],
    intro:`<p>In Spain, the greeting changes with the time of day — and Spanish days are <b>late</b>. Lunch is around 2 p.m., so <b>buenos días</b> lasts until lunch, and <b>buenas tardes</b> continues until it gets dark.</p>
<p>Friends say <b>¡Hola! ¿Qué tal?</b>. In shops you often hear just <b>¡Buenas!</b> — a short form of <i>buenos días / buenas tardes</i>.</p>
<div class="note"><b>Culture:</b> Friends and new acquaintances in Spain often greet with <i>dos besos</i> — two light cheek kisses, right cheek first. In formal or work settings, a handshake is normal.</div>
<div class="note"><b>Spain word:</b> <b>vale</b> = OK. You will hear it many times every day in Spain.</div>`,
    ex:[
     {t:'mc', q:'It is 10:00 a.m. You enter the academy. What do you say?', o:['Buenas noches','Buenos días','Buenas tardes'], a:1, ex:'Buenos días is used in the morning, until lunch (around 2 p.m.).', skill:'vocab'},
     {t:'mc', q:'It is 6:00 p.m. in July and still sunny. Which greeting fits?', o:['Buenas tardes','Buenos días','Buenas noches'], a:0, ex:'In Spain, la tarde lasts until it gets dark, so 6 p.m. is still buenas tardes.', skill:'vocab'},
     {t:'match', p:[['gracias','thank you'],['por favor','please'],['de nada','you are welcome'],['perdón','excuse me / sorry'],['hasta luego','see you later']], skill:'vocab'},
     {t:'listen', say:'Hasta luego', o:['Hasta luego','¿Qué tal?','De nada'], a:0, skill:'listening'},
     {t:'fill', q:'—Muchas gracias. —De ___.', a:['nada'], ex:'De nada = you are welcome.', skill:'vocab'},
     {t:'fill', q:'—¡Hola! ¿Qué ___? —Bien, gracias.', a:['tal'], ex:'¿Qué tal? = How are you? / How is it going?', skill:'vocab'},
     {t:'mc', q:'A friend asks: “¿Tomamos un café?” You agree. The most typical answer in Spain is:', o:['Vale','Perdón','Adiós'], a:0, ex:'Vale = OK. Very common in Spain.', skill:'vocab'},
     {t:'order', w:['gracias','muy','bien,'], a:['muy bien, gracias','muy bien gracias'], en:'Very well, thanks.', skill:'grammar'}
    ]},
   {id:'c1l2', title:'Ser y los pronombres', en:'The verb SER and subject pronouns', skill:'grammar', minutes:14,
    vocab:['ser','estudiante','profesora','amiga','companera'],
    intro:`<p><b>Ser</b> means <i>to be</i>. Use it for <b>who</b> someone is: identity, nationality, origin and profession.</p>
<p><b>Subject pronouns:</b> yo (I), tú (you, informal), él (he), ella (she), usted (you, formal), nosotros/nosotras (we), <b>vosotros/vosotras</b> (you all, informal — used every day in Spain), ellos/ellas (they), ustedes (you all, formal in Spain).</p>
<p>Spanish often <b>drops the pronoun</b> because the verb ending already shows the person: <i>Soy estudiante</i> (not usually <i>Yo soy estudiante</i>).</p>
<div class="note"><b>tú or usted?</b> In Spain, <i>tú</i> is used a lot — with classmates, young people, even many shop staff. Use <i>usted</i> with older people or in very formal situations. Your teacher Carmen will tell you: “Puedes tutearme” (you can use tú with me).</div>`,
    table:SER_TABLE,
    mistakes:['❌ Soy una estudiante → ✅ Soy estudiante (no article with a profession, unless you add an adjective: Soy una estudiante nueva).','❌ Ella son → ✅ Ella es','❌ Vosotros son → ✅ Vosotros sois (Spain).'],
    ex:[
     {t:'fill', q:'Yo ___ estudiante.', a:['soy'], ex:'yo → soy', skill:'grammar'},
     {t:'fill', q:'Tú ___ de Canadá, ¿verdad?', a:['eres'], ex:'tú → eres', skill:'grammar'},
     {t:'fill', q:'Lucía y yo ___ amigas.', a:['somos'], ex:'Lucía y yo = nosotras → somos', skill:'grammar'},
     {t:'fill', q:'Vosotras ___ compañeras de clase.', a:['sois'], ex:'vosotras → sois (used in Spain)', skill:'grammar'},
     {t:'mc', q:'You speak to two classmates in Madrid: “You are very nice.”', o:['Sois muy simpáticos.','Son muy simpáticos.','Eres muy simpáticos.'], a:0, ex:'In Spain, informal “you all” = vosotros → sois. (Ustedes son is used in Spain only for formal situations.)', skill:'grammar'},
     {t:'mc', q:'You meet an elderly woman, the owner of your flat. Polite form?', o:['¿Tú eres la señora García?','¿Usted es la señora García?','¿Vosotros sois la señora García?'], a:1, ex:'Usted is the formal “you”, with the él/ella verb form: es.', skill:'grammar'},
     {t:'fix', q:'Ella son profesora.', a:['ella es profesora','es profesora'], ex:'Ella → es.', skill:'grammar'},
     {t:'fix', q:'Soy una estudiante.', a:['soy estudiante','yo soy estudiante'], ex:'No article with a profession: Soy estudiante.', skill:'grammar'},
     {t:'order', w:['profesora','Carmen','es','la'], a:['carmen es la profesora','la profesora es carmen'], en:'Carmen is the teacher.', skill:'grammar'}
    ]},
   {id:'c1l3', title:'¿De dónde eres?', en:'Introducing yourself and nationalities', skill:'speaking', minutes:14,
    vocab:['me_llamo','como_te_llamas','encantada','mucho_gusto','de_donde_eres','espanol','ingles','canadiense','vietnamita','frances','italiano','japones'],
    intro:`<p>A typical first conversation:</p>
<div class="dialog"><p><b>Lucía:</b> ¡Hola! Me llamo Lucía. ¿Y tú? ¿Cómo te llamas?<br><span class="tr">Hi! My name is Lucía. And you? What’s your name?</span></p>
<p><b>Tú:</b> Me llamo Sofía. Encantada.<br><span class="tr">My name is Sofía. Nice to meet you.</span></p>
<p><b>Lucía:</b> Encantada. ¿De dónde eres?<br><span class="tr">Nice to meet you. Where are you from?</span></p>
<p><b>Tú:</b> Soy canadiense, de Vancouver. ¿Y tú?<br><span class="tr">I’m Canadian, from Vancouver. And you?</span></p>
<p><b>Lucía:</b> Yo soy de aquí, de Madrid. ¡Soy madrileña!<br><span class="tr">I’m from here, from Madrid. I’m a madrileña!</span></p></div>
<p><b>Gender agreement:</b> nationality adjectives change for women. Rules:</p>
<ul><li>-o → -a: italiano → italian<b>a</b></li><li>consonant → add -a (and drop the accent): español → español<b>a</b>, inglés → ingles<b>a</b>, francés → frances<b>a</b></li><li>-e / -a / -í stay the same: canadiense, vietnamita, estadounidense, marroquí</li></ul>
<p>Nationalities are written with a <b>small letter</b> in Spanish: <i>soy canadiense</i>, not <i>Canadiense</i>.</p>`,
    mistakes:['❌ Soy Inglesa → ✅ Soy inglesa (no capital letter)','❌ (woman) Soy español → ✅ Soy española','❌ (woman) Encantado → ✅ Encantada'],
    ex:[
     {t:'mc', q:'Giulia (a woman from Rome) says:', o:['Soy italiano.','Soy italiana.','Soy Italiana.'], a:1, ex:'-o → -a for women, and no capital letter.', skill:'grammar'},
     {t:'fill', q:'Claire es de París. Es ___. (French)', a:['francesa'], ex:'francés → francesa (the accent disappears).', skill:'grammar'},
     {t:'fill', q:'Tom es de Londres. Es ___. (English)', a:['inglés','ingles'], ex:'Tom is a man: inglés.', skill:'grammar'},
     {t:'mc', q:'Which form is the SAME for men and women?', o:['canadiense','español','japonés'], a:0, ex:'Adjectives ending in -e do not change: canadiense.', skill:'grammar'},
     {t:'listen', say:'¿De dónde eres?', o:['Where are you from?','What is your name?','How are you?'], a:0, skill:'listening'},
     {t:'tr', en:'My name is Ana. I am Canadian.', a:['me llamo ana. soy canadiense','me llamo ana, soy canadiense','me llamo ana soy canadiense','soy ana. soy canadiense','me llamo ana y soy canadiense'], ex:'Me llamo Ana. Soy canadiense.', skill:'writing'},
     {t:'speak', prompt:'Introduce yourself out loud: your name, where you are from, and one more sentence.', sample:'¡Hola! Me llamo Sofía. Soy canadiense, de Vancouver. Soy estudiante de español en la Academia Costa Blanca.', target:['me llamo','soy'], skill:'speaking'}
    ]},
   {id:'c1l4', title:'Los sonidos de España', en:'The sounds of Spain (pronunciation)', skill:'listening', minutes:12,
    vocab:['ciudad','zapatos','gracias','jamon','gente','espana','manana','pero','perro','casa'],
    intro:`<p>Spanish spelling is very regular. Learn these sounds of <b>Spain (Castilian) Spanish</b>:</p>
<table class="tbl"><thead><tr><th>Spelling</th><th>Sound (IPA)</th><th>Like…</th><th>Examples</th></tr></thead><tbody>
<tr><td>z, ce, ci</td><td>/θ/</td><td>English <i>th</i> in “think”</td><td>zapatos, gracias, ciudad</td></tr>
<tr><td>j, ge, gi</td><td>/x/</td><td>a strong h from the throat (Scottish “loch”)</td><td>jamón, gente</td></tr>
<tr><td>ñ</td><td>/ɲ/</td><td>“ny” in “canyon”</td><td>España, mañana</td></tr>
<tr><td>r (between vowels)</td><td>/ɾ/</td><td>one quick tap, like “tt” in American “butter”</td><td>pero, para</td></tr>
<tr><td>rr, or r at the start</td><td>/r/</td><td>a rolled trill (several taps)</td><td>perro, Roma</td></tr>
<tr><td>d (between vowels / at the end)</td><td>/ð/</td><td>soft “th” in “this”</td><td>nada, Madrid, ciudad</td></tr>
<tr><td>b / v</td><td>/b/ ~ /β/</td><td>the same sound! soft between vowels</td><td>vale, Barcelona</td></tr>
<tr><td>h</td><td>—</td><td>silent</td><td>hola, hasta</td></tr></tbody></table>
<p class="muted">The English-friendly hints are approximations. The IPA symbols are the true reference.</p>
<p><b>Repeat after me:</b> press the speaker on each word, then say it out loud.</p>
<div class="note"><b>The /θ/ sound</b> is a main difference between Spain and Latin America. In Madrid, <i>gracias</i> sounds like “GRA-thyas”.</div>`,
    ex:[
     {t:'mc', q:'In Madrid, the “z” in zapatos sounds like…', o:['English “s” in “sun”','English “th” in “think”','English “z” in “zoo”'], a:1, ex:'z → /θ/ in Castilian Spanish.', skill:'listening'},
     {t:'mc', q:'Which word has the rolled /r/ sound?', o:['pero','perro','para'], a:1, ex:'rr = rolled /r/. pero (but) has a single tap /ɾ/; perro (dog) has a trill.', skill:'listening'},
     {t:'listen', say:'perro', o:['pero (but)','perro (dog)'], a:1, skill:'listening'},
     {t:'listen', say:'mañana', o:['manana','mañana','manzana'], a:1, skill:'listening'},
     {t:'mc', q:'Which letter is silent in Spanish?', o:['j','h','ñ'], a:1, ex:'h is always silent: hola = /ˈola/.', skill:'listening'},
     {t:'listen', say:'gente', o:['gente','jefe','gato'], a:0, skill:'listening'},
     {t:'speak', prompt:'Say these words: gracias, zapatos, ciudad, jamón, España, perro.', sample:'gracias, zapatos, ciudad, jamón, España, perro', target:['gracias','zapatos','ciudad'], skill:'speaking'}
    ]}
  ],
  review:{keyVocab:['hola','buenos_dias','buenas_tardes','que_tal','gracias','de_nada','vale','me_llamo','encantada','de_donde_eres','canadiense','espanol'],
    grammar:['Ser: soy, eres, es, somos, sois, son.','Drop the pronoun when the meaning is clear: Soy estudiante.','vosotros/as = informal “you all” in Spain → sois.','Nationalities agree with the person: español / española; -e stays the same.','Spanish nationalities use a small letter.'],
    expressions:['¿Qué tal?','Me llamo…','¿De dónde eres?','Soy de…','Encantada / Mucho gusto','Vale'],
    mistakes:['Soy una estudiante → Soy estudiante','Ella son → Ella es','Vosotros son → Vosotros sois','(woman) Encantado → Encantada','Soy Inglesa → Soy inglesa']},
  exam:[
   {t:'listen', say:'Buenas tardes', o:['Good morning','Good afternoon','Good night'], a:1, skill:'listening'},
   {t:'listen', say:'¿Cómo te llamas?', o:['Where are you from?','What is your name?','How much is it?'], a:1, skill:'listening'},
   {t:'listen', say:'Soy de Madrid', o:['I am from Madrid','I live in Madrid','I like Madrid'], a:0, skill:'listening'},
   {t:'mc', q:'“See you later” in Spanish is:', o:['hasta luego','de nada','por favor'], a:0, skill:'vocab'},
   {t:'match', p:[['vale','OK'],['perdón','excuse me'],['encantada','nice to meet you'],['bien','well']], skill:'vocab'},
   {t:'fill', q:'Nosotros ___ estudiantes.', a:['somos'], skill:'grammar'},
   {t:'fill', q:'¿Vosotros ___ de Barcelona?', a:['sois'], skill:'grammar'},
   {t:'fill', q:'Usted ___ el profesor, ¿no?', a:['es'], skill:'grammar'},
   {t:'mc', q:'A woman from Spain: “Soy ___.”', o:['española','español','Española'], a:0, skill:'grammar'},
   {t:'read', text:'Hola, me llamo Yuki. Soy japonesa, de Osaka, pero vivo en Alicante. Soy estudiante en la Academia Costa Blanca. Mi profesora se llama Carmen y es muy simpática. Mi compañera de clase, Giulia, es italiana.', q:'Where is Yuki from?', o:['Madrid','Osaka','Italy'], a:1, skill:'reading'},
   {t:'read', text:'Hola, me llamo Yuki. Soy japonesa, de Osaka, pero vivo en Alicante. Soy estudiante en la Academia Costa Blanca. Mi profesora se llama Carmen y es muy simpática. Mi compañera de clase, Giulia, es italiana.', q:'Who is Giulia?', o:['the teacher','a classmate','Yuki’s sister'], a:1, skill:'reading'},
   {t:'tr', en:'Good morning! My name is Sofía and I am a student.', a:['buenos dias! me llamo sofia y soy estudiante','buenos dias, me llamo sofia y soy estudiante','buenos dias me llamo sofia y soy estudiante','buenos dias. me llamo sofia y soy estudiante'], skill:'writing'},
   {t:'write', prompt:'Write 3–4 sentences introducing yourself to your new class: name, nationality, city, and that you are a student.', sample:'¡Hola a todos! Me llamo Sofía. Soy canadiense, de Vancouver. Soy estudiante de español en la Academia Costa Blanca. ¡Encantada!', minWords:12, skill:'writing',
    rubric:['Uses me llamo / soy correctly','Nationality agrees (feminine if you are a woman)','Says the city with “de”','Correct spelling and small letters for nationalities']},
   {t:'speak', prompt:'Say out loud: greet the class, say your name and where you are from.', sample:'¡Buenos días! Me llamo Sofía y soy de Vancouver, en Canadá.', target:['me llamo','soy'], skill:'speaking'}
  ],
  homework:{id:'hw1', title:'Homework 1 — ¡Hola, Alicante!', parts:[
   {h:'A. Vocabulary — write the Spanish', items:[['thank you','gracias'],['please','por favor'],['see you later','hasta luego'],['good night','buenas noches'],['OK (Spain)','vale']]},
   {h:'B. Grammar — complete with SER', items:[['Yo ___ de Canadá.','soy'],['Vosotras ___ muy simpáticas.','sois'],['Mi profesora ___ de Madrid.','es'],['Lucía y yo ___ amigas.','somos'],['¿Tú ___ estudiante?','eres']]},
   {h:'C. Agreement — write the feminine form', items:[['italiano','italiana'],['inglés','inglesa (no accent)'],['canadiense','canadiense (no change: ends in -e)'],['japonés','japonesa'],['francés','francesa']]},
   {h:'D. Reading — answer in English', text:'Me llamo Pablo. Soy de Madrid, del barrio de Lavapiés. Soy camarero en un bar y estudiante de inglés por la tarde. Mi amiga Lucía es estudiante de diseño.', items:[['Where is Pablo from?','Madrid (the Lavapiés neighbourhood).'],['What is his job?','He is a waiter (camarero) in a bar.'],['What does Lucía study?','Design (diseño).']]},
   {h:'E. Writing — 4 sentences about you', open:true, items:[['Write 4 sentences: name, nationality, city, what you do.','Sample: Me llamo Sofía. Soy canadiense. Soy de Vancouver. Soy estudiante de español en Madrid.']],
    rubric:['4 complete sentences','Correct forms of ser','Nationality agrees with you','Small letter for nationality']},
   {h:'F. Speaking (optional)', open:true, items:[['Record yourself or say out loud: introduce yourself in 20 seconds.','Sample: ¡Hola! Me llamo… Soy… de… Soy estudiante en la academia. ¡Encantada!']]}
  ]}
 },
 {id:'c2', city:'alicante', level:'A1', num:2, title:'En el café', en:'At the café', goal:'Order food and drinks like a local, use articles and gender, and understand prices.',
  lessons:[
   {id:'c2l1', title:'Bebidas y comida', en:'Drinks, food, and articles', skill:'vocab', minutes:14,
    vocab:['cafe','cafe_con_leche','te','agua','zumo','leche','tostada','cruasan','tortilla','azucar'],
    intro:`<p>Every Spanish noun is <b>masculine</b> or <b>feminine</b>. Learn each word with its article.</p>
<ul><li>Most nouns in <b>-o</b> are masculine: <i>el zumo</i>, <i>el bocadillo</i>.</li><li>Most nouns in <b>-a</b> are feminine: <i>la tostada</i>, <i>la tortilla</i>.</li><li>Others you must learn: <i>el café</i>, <i>el té</i>, <i>la leche</i>, <i>el pan</i>.</li><li>Special: <i>el agua</i> is feminine but uses <i>el</i> (stressed a- sound at the start): <i>el agua fría</i>.</li></ul>
<p><b>Plural:</b> vowel + s (café → cafés), consonant + es (cruasán → cruasanes).</p>
<div class="note"><b>Madrid breakfast:</b> a café con leche and a tostada con tomate y aceite (toast with crushed tomato and olive oil) — or churros on Sunday.</div>`,
    table:ART_TABLE,
    mistakes:['❌ la agua → ✅ el agua','❌ el leche → ✅ la leche','❌ un tostada → ✅ una tostada'],
    ex:[
     {t:'mc', q:'Choose the correct article: ___ tostada', o:['el','la','los'], a:1, ex:'tostada ends in -a → feminine → la.', skill:'grammar'},
     {t:'mc', q:'Choose the correct article: ___ agua', o:['la','el','las'], a:1, ex:'agua is feminine but takes el in the singular.', skill:'grammar'},
     {t:'fill', q:'Quería ___ café con leche. (a)', a:['un'], ex:'café is masculine → un.', skill:'grammar'},
     {t:'fill', q:'Dos ___, por favor. (plural of café)', a:['cafés','cafes'], ex:'vowel + s → cafés.', skill:'grammar'},
     {t:'match', p:[['zumo de naranja','orange juice'],['tostada','toast'],['leche','milk'],['azúcar','sugar'],['té','tea']], skill:'vocab'},
     {t:'listen', say:'Un café con leche, por favor', o:['A black coffee, please','A coffee with milk, please','A tea with milk, please'], a:1, skill:'listening'},
     {t:'fix', q:'La agua está fría.', a:['el agua esta fria','el agua está fría'], ex:'el agua (feminine noun, masculine article in the singular).', skill:'grammar'}
    ]},
   {id:'c2l2', title:'Números y precios', en:'Numbers 0–20 and prices', skill:'listening', minutes:12,
    vocab:['cuanto_es','euro','la_cuenta'],
    intro:`<p>Prices in Spain are in <b>euros</b>. Say prices like this:</p>
<ul><li>2,50 € → <b>dos euros con cincuenta</b> (or just <i>dos cincuenta</i>)</li><li>1 € → <b>un euro</b> (uno becomes un before a masculine noun)</li><li>Spain writes decimals with a <b>comma</b>: 2,50 €</li></ul>
<p>To pay: <b>¿Cuánto es?</b> (How much is it?) — <b>La cuenta, por favor.</b> (The bill, please.)</p>
<p>Extra numbers for prices: <i>treinta (30), cuarenta (40), cincuenta (50)</i>.</p>`,
    table:NUM_TABLE,
    ex:[
     {t:'listen', say:'Son tres euros con cincuenta', o:['3,15 €','3,50 €','13,50 €'], a:1, skill:'listening'},
     {t:'listen', say:'Quince euros', o:['5 €','15 €','50 €'], a:1, skill:'listening'},
     {t:'listen', say:'Doce', o:['2','12','20'], a:1, skill:'listening'},
     {t:'fill', q:'7 = ___', a:['siete'], skill:'vocab'},
     {t:'fill', q:'16 = ___', a:['dieciséis','dieciseis'], skill:'vocab'},
     {t:'mc', q:'How do you say 1 € ?', o:['uno euro','un euro','una euro'], a:1, ex:'uno → un before a masculine noun.', skill:'grammar'},
     {t:'mc', q:'You want to pay. You say:', o:['¿Qué te pongo?','¿Cuánto es?','¿Algo más?'], a:1, ex:'¿Cuánto es? = How much is it? (The other two are what the waiter says.)', skill:'vocab'}
    ]},
   {id:'c2l3', title:'Pedir en un bar', en:'Ordering like a madrileña', skill:'speaking', minutes:15,
    vocab:['que_te_pongo','me_pones','para_mi','queria','algo_mas','para_llevar','tomar'],
    intro:`<p>In a Madrid bar or café, the waiter says <b>¿Qué te pongo?</b> (What can I get you?). Locals order directly — it is not rude:</p>
<div class="dialog"><p><b>Javi:</b> ¡Buenas! ¿Qué te pongo?</p><p><b>Tú:</b> ¿Me pones un café con leche, por favor?</p><p><b>Javi:</b> ¿Para tomar aquí o para llevar?</p><p><b>Tú:</b> Para tomar aquí.</p><p><b>Javi:</b> ¿Algo más?</p><p><b>Tú:</b> Sí, quería una tostada con tomate. Nada más, gracias.</p><p><b>Javi:</b> Muy bien. Son tres euros con veinte.</p></div>
<p>Three ways to order, from direct to polite: <b>Ponme…</b> → <b>¿Me pones…?</b> → <b>Quería…</b>. All are normal in Spain. In a group: <b>Para mí, un té.</b></p>
<p><b>Tomar</b> = to have (a drink/food). It is a regular <b>-ar</b> verb — the pattern for hundreds of verbs.</p>`,
    table:TOMAR_TABLE,
    mistakes:['❌ Puedo tener un café? (English calque) → ✅ ¿Me pones un café?','❌ Nosotros tomamos? for vosotros → ✅ ¿Qué tomáis? (you all, Spain)'],
    ex:[
     {t:'mc', q:'The waiter says “¿Qué te pongo?”. He means:', o:['Where do I put you?','What can I get you?','How are you?'], a:1, skill:'vocab'},
     {t:'fill', q:'Yo ___ un té verde. (tomar)', a:['tomo'], skill:'grammar'},
     {t:'fill', q:'¿Qué ___ vosotros? (tomar)', a:['tomáis','tomais'], ex:'vosotros → -áis', skill:'grammar'},
     {t:'fill', q:'Lucía ___ un zumo. (tomar)', a:['toma'], skill:'grammar'},
     {t:'order', w:['pones','me','un','¿','cortado','?'], a:['¿ me pones un cortado ?','me pones un cortado'], en:'Can I have a cortado?', skill:'grammar'},
     {t:'listen', say:'¿Para tomar aquí o para llevar?', o:['Here or to take away?','Anything else?','Cash or card?'], a:0, skill:'listening'},
     {t:'tr', en:'For me, an orange juice, please.', a:['para mi, un zumo de naranja, por favor','para mi un zumo de naranja por favor','para mi, un zumo de naranja por favor'], skill:'writing'},
     {t:'speak', prompt:'Order a drink and something to eat at a Madrid café. Use ¿me pones…? or quería…', sample:'¡Buenas! ¿Me pones un café con leche y una tostada con tomate, por favor?', target:['por favor'], skill:'speaking'}
    ]}
  ],
  review:{keyVocab:['cafe','cafe_con_leche','agua','zumo','tostada','cuanto_es','la_cuenta','que_te_pongo','me_pones','queria','algo_mas','para_llevar'],
   grammar:['el / la / los / las · un / una / unos / unas','Most -o nouns are masculine; most -a nouns are feminine.','el agua (feminine with el)','uno → un before masculine nouns: un euro','tomar: tomo, tomas, toma, tomamos, tomáis, toman'],
   expressions:['¿Qué te pongo?','¿Me pones…?','Quería…','Para mí…','¿Algo más? — Nada más, gracias.','¿Cuánto es?','La cuenta, por favor.'],
   mistakes:['la agua → el agua','uno euro → un euro','Puedo tener… → ¿Me pones…?']},
  exam:[
   {t:'listen', say:'Son cuatro euros con veinte', o:['4,20 €','14,20 €','4,02 €'], a:0, skill:'listening'},
   {t:'listen', say:'¿Algo más?', o:['Anything else?','How much?','For here?'], a:0, skill:'listening'},
   {t:'listen', say:'Para llevar, por favor', o:['To have here, please','To take away, please','The bill, please'], a:1, skill:'listening'},
   {t:'match', p:[['la cuenta','the bill'],['el zumo','the juice'],['la leche','the milk'],['el azúcar','the sugar']], skill:'vocab'},
   {t:'mc', q:'12 is…', o:['doce','dos','veinte'], a:0, skill:'vocab'},
   {t:'fill', q:'___ agua, por favor. (the)', a:['el'], skill:'grammar'},
   {t:'fill', q:'Nosotras ___ café. (tomar)', a:['tomamos'], skill:'grammar'},
   {t:'fill', q:'¿Vosotros ___ tostadas? (tomar)', a:['tomáis','tomais'], skill:'grammar'},
   {t:'mc', q:'Which is NOT a natural way to order in Spain?', o:['¿Me pones un café?','Quería un café.','¿Puedo tener un café?'], a:2, skill:'grammar'},
   {t:'read', text:'El Café del Puerto abre a las siete de la mañana. Hay café, té, zumo de naranja natural y tostadas. El café con leche cuesta un euro con ochenta. Los domingos hay churros con chocolate.', q:'When are there churros?', o:['every day','on Sundays','in the evening'], a:1, skill:'reading'},
   {t:'read', text:'El Café del Puerto abre a las siete de la mañana. Hay café, té, zumo de naranja natural y tostadas. El café con leche cuesta un euro con ochenta. Los domingos hay churros con chocolate.', q:'How much is a café con leche?', o:['1,08 €','1,80 €','8,10 €'], a:1, skill:'reading'},
   {t:'tr', en:'Can I have a tea, please? How much is it?', a:['me pones un te, por favor? cuanto es','me pones un te por favor cuanto es','quería un te, por favor. cuanto es','queria un te por favor cuanto es'], skill:'writing'},
   {t:'write', prompt:'Write a short dialogue (4–6 lines) between you and a waiter in a Madrid café. Order a drink and food, and ask for the price.', sample:'—¡Buenas! ¿Qué te pongo?\n—¿Me pones un café con leche, por favor?\n—¿Algo más?\n—Sí, una tostada con tomate.\n—Muy bien.\n—¿Cuánto es?\n—Son tres euros.', minWords:15, skill:'writing',
    rubric:['Uses an ordering expression (¿me pones…? / quería…)','Correct articles (un/una)','Asks for the price','Polite words (por favor, gracias)']},
   {t:'speak', prompt:'Say out loud: order a coffee to take away and ask how much it is.', sample:'¿Me pones un café para llevar, por favor? ¿Cuánto es?', target:['para llevar','cuánto'], skill:'speaking'}
  ],
  homework:{id:'hw2', title:'Homework 2 — En el café', parts:[
   {h:'A. Articles — write el, la, los or las', items:[['___ tostadas','las'],['___ café','el'],['___ agua','el (feminine noun, but el in the singular)'],['___ leche','la'],['___ zumos','los']]},
   {h:'B. Numbers — write the number in words', items:[['14','catorce'],['9','nueve'],['20','veinte'],['17','diecisiete'],['3,50 €','tres euros con cincuenta']]},
   {h:'C. Tomar — conjugate', items:[['yo','tomo'],['tú','tomas'],['nosotros','tomamos'],['vosotras','tomáis'],['ellos','toman']]},
   {h:'D. Reading', text:'Lucía y Sofía están en un bar de la calle Huertas. Lucía toma una caña y Sofía toma un agua con gas. Para comer, piden una ración de tortilla de patatas. Todo cuesta ocho euros con cuarenta.', items:[['What does Sofía drink?','Sparkling water (un agua con gas).'],['What food do they order?','A portion of Spanish potato omelette (una ración de tortilla de patatas).'],['How much is everything?','8,40 € (ocho euros con cuarenta).']]},
   {h:'E. Writing — your café order', open:true, items:[['Write what you order for breakfast in Madrid (3 sentences, use ¿me pones…? or quería…).','Sample: ¡Buenas! Quería un café con leche y una tostada con tomate, por favor. ¿Cuánto es?']],
    rubric:['Ordering expression used','Articles correct','Polite words','Price question']}
  ]}
 }
];
MA.LESSONS = {};
MA.CHAPTERS.forEach(c => c.lessons.forEach((l, i) => { MA.LESSONS[l.id] = Object.assign(l, {chapter:c.id, idx:i}); }));

/* ---------------- STORIES (original adaptations) ---------------- */
// Every word is clickable. phrases = multiword expressions. gloss = word glossary (lowercase form).
MA.STORIES = [
 {id:'caperucita', city:'alicante', title:'Caperucita Roja', en:'Little Red Riding Hood', level:'A1', unlock:null,
  sentences:[
   ['Había una vez una niña muy simpática.','Once upon a time there was a very nice girl.'],
   ['Todo el mundo la llama Caperucita Roja.','Everyone calls her Little Red Riding Hood.'],
   ['Un día, su madre le dice: «Tu abuela está enferma».','One day, her mother tells her: “Your grandmother is ill.”'],
   ['«Lleva esta cesta a casa de la abuela, por favor».','“Take this basket to grandma’s house, please.”'],
   ['En la cesta hay pan, queso y una tarta de manzana.','In the basket there is bread, cheese and an apple cake.'],
   ['Caperucita camina por el bosque y tiene ganas de cantar.','Little Red walks through the forest and feels like singing.'],
   ['De repente, aparece un lobo grande y gris.','Suddenly, a big grey wolf appears.'],
   ['«Hola, niña. ¿Adónde vas?», pregunta el lobo.','“Hello, girl. Where are you going?” asks the wolf.'],
   ['«Voy a casa de mi abuela», contesta Caperucita.','“I am going to my grandmother’s house,” answers Little Red.'],
   ['El lobo corre muy rápido y llega primero.','The wolf runs very fast and arrives first.'],
   ['Pero la abuela es muy lista y llama a un cazador.','But grandma is very clever and calls a hunter.'],
   ['Al final, el lobo sale corriendo y no vuelve nunca más.','In the end, the wolf runs away and never comes back.']
  ],
  phrases:{
   'había una vez':{en:'once upon a time (there was)', ctx:'The classic opening of fairy tales.', pos:'fixed expression', gram:'había = imperfect of haber (there was)'},
   'todo el mundo':{en:'everyone, everybody', ctx:'Literally “all the world”. Takes a singular verb: todo el mundo la llama.', pos:'expression', gram:'singular verb'},
   'un día':{en:'one day', ctx:'Starts an event in a story.', pos:'expression'},
   'a casa de':{en:'to the house of (someone)', ctx:'Ir a casa de + person = go to someone’s home.', pos:'expression', gram:'a (to) + casa + de (of)'},
   'tiene ganas de':{en:'feels like (doing something)', ctx:'tener ganas de + infinitive = to feel like doing something. Here: she feels like singing.', pos:'verbal expression', gram:'tener (irregular) → tiene, 3rd person singular'},
   'de repente':{en:'suddenly', ctx:'Introduces a surprising event.', pos:'adverbial expression'},
   'al final':{en:'in the end, finally', ctx:'Introduces the ending.', pos:'adverbial expression', gram:'al = a + el'},
   'sale corriendo':{en:'runs away / runs off', ctx:'salir corriendo = to run off quickly.', pos:'verbal expression', gram:'salir (irregular) + gerund corriendo'},
   'nunca más':{en:'never again', ctx:'no + verb + nunca más = never again.', pos:'adverbial expression'},
   'por favor':{en:'please', ctx:'Polite request.', pos:'expression'}
  },
  gloss:{
   'una':{en:'a / an (feminine)', pos:'article', gram:'indefinite, feminine singular'},'un':{en:'a / an (masculine)', pos:'article', gram:'indefinite, masculine singular'},
   'niña':{en:'girl', pos:'noun', gram:'feminine; niño = boy'},'muy':{en:'very', pos:'adverb'},'simpática':{en:'nice, friendly', pos:'adjective', gram:'feminine of simpático'},
   'la':{en:'the (fem.) / her (object pronoun)', pos:'article · pronoun', gram:'In “la llama” it is an object pronoun: “calls HER”.'},
   'llama':{en:'calls', pos:'verb', gram:'llamar, 3rd person singular present'},'caperucita':{en:'little hood (name)', pos:'proper noun', gram:'caperuza + diminutive -ita'},'roja':{en:'red', pos:'adjective', gram:'feminine of rojo'},
   'su':{en:'her / his / their', pos:'possessive', gram:'su madre = her mother'},'madre':{en:'mother', pos:'noun', gram:'feminine'},'le':{en:'to her / to him', pos:'pronoun', gram:'indirect object'},'dice':{en:'says, tells', pos:'verb', gram:'decir (irregular), 3rd person singular'},
   'tu':{en:'your (informal)', pos:'possessive', gram:'no accent; tú with accent = you'},'abuela':{en:'grandmother', pos:'noun', gram:'feminine; abuelo = grandfather'},'está':{en:'is (state)', pos:'verb', gram:'estar, 3rd person singular — used for temporary states like illness'},'enferma':{en:'ill, sick', pos:'adjective', gram:'feminine of enfermo'},
   'lleva':{en:'take (command)', pos:'verb', gram:'llevar, informal command (tú)'},'esta':{en:'this', pos:'demonstrative', gram:'feminine: esta cesta'},'cesta':{en:'basket', pos:'noun', gram:'feminine'},'casa':{en:'house, home', pos:'noun', gram:'feminine'},'de':{en:'of / from', pos:'preposition'},
   'en':{en:'in / on', pos:'preposition'},'hay':{en:'there is / there are', pos:'verb', gram:'haber, impersonal form'},'pan':{en:'bread', pos:'noun', gram:'masculine'},'queso':{en:'cheese', pos:'noun', gram:'masculine'},'y':{en:'and', pos:'conjunction'},'tarta':{en:'cake, tart', pos:'noun', gram:'feminine'},'manzana':{en:'apple', pos:'noun', gram:'feminine'},
   'camina':{en:'walks', pos:'verb', gram:'caminar, 3rd person singular'},'por':{en:'through / along / by', pos:'preposition', gram:'por el bosque = through the forest'},'el':{en:'the (masc.)', pos:'article'},'bosque':{en:'forest, woods', pos:'noun', gram:'masculine'},'cantar':{en:'to sing', pos:'verb', gram:'infinitive'},
   'aparece':{en:'appears', pos:'verb', gram:'aparecer, 3rd person singular'},'lobo':{en:'wolf', pos:'noun', gram:'masculine'},'grande':{en:'big', pos:'adjective', gram:'same for m/f'},'gris':{en:'grey', pos:'adjective'},
   'hola':{en:'hello', pos:'interjection'},'adónde':{en:'where (to)', pos:'question word', gram:'used with movement verbs: ¿adónde vas?'},'vas':{en:'you go / are going', pos:'verb', gram:'ir (irregular), tú form'},'pregunta':{en:'asks', pos:'verb', gram:'preguntar, 3rd person singular'},
   'voy':{en:'I go / I am going', pos:'verb', gram:'ir (irregular), yo form'},'a':{en:'to', pos:'preposition'},'mi':{en:'my', pos:'possessive'},'contesta':{en:'answers', pos:'verb', gram:'contestar, 3rd person singular'},
   'corre':{en:'runs', pos:'verb', gram:'correr, 3rd person singular'},'rápido':{en:'fast, quickly', pos:'adverb · adjective'},'llega':{en:'arrives', pos:'verb', gram:'llegar, 3rd person singular'},'primero':{en:'first', pos:'adverb'},
   'pero':{en:'but', pos:'conjunction'},'es':{en:'is', pos:'verb', gram:'ser, 3rd person singular — used for characteristics'},'lista':{en:'clever, smart', pos:'adjective', gram:'ser lista = clever; estar lista = ready'},'cazador':{en:'hunter', pos:'noun', gram:'masculine'},
   'no':{en:'not / no', pos:'adverb'},'vuelve':{en:'comes back, returns', pos:'verb', gram:'volver (o→ue), 3rd person singular'},
   'había':{en:'there was / there were', pos:'verb', gram:'haber, imperfect'},'vez':{en:'time (occasion)', pos:'noun', gram:'feminine; plural veces'},'todo':{en:'all, every', pos:'adjective · pronoun'},'mundo':{en:'world', pos:'noun'},'día':{en:'day', pos:'noun', gram:'masculine despite -a: el día'},
   'tiene':{en:'has', pos:'verb', gram:'tener (irregular), 3rd person singular'},'ganas':{en:'desire, wish', pos:'noun', gram:'feminine plural; used in tener ganas de'},'repente':{en:'(only in “de repente”) suddenly', pos:'noun (fixed expression)'},
   'al':{en:'to the / at the', pos:'contraction', gram:'a + el'},'final':{en:'end', pos:'noun'},'sale':{en:'goes out, leaves', pos:'verb', gram:'salir (irregular), 3rd person singular'},'corriendo':{en:'running', pos:'gerund', gram:'correr → corriendo'},'nunca':{en:'never', pos:'adverb'},'más':{en:'more', pos:'adverb'},
   'favor':{en:'favour', pos:'noun'}
  },
  quiz:[
   {q:'Why does Caperucita go to her grandmother’s house?', o:['It is her birthday','Her grandmother is ill','She is lost'], a:1},
   {q:'What is in the basket?', o:['bread, cheese and an apple cake','milk and eggs','flowers'], a:0},
   {q:'“Tiene ganas de cantar” means…', o:['she has to sing','she feels like singing','she sings badly'], a:1},
   {q:'Who helps the grandmother?', o:['the mother','a hunter','the wolf'], a:1}
  ]},
 {id:'cerditos', city:'alicante', title:'Los tres cerditos', en:'The Three Little Pigs', level:'A1–A2', unlock:null,
  sentences:[
   ['Había una vez tres cerditos que vivían con su madre.','Once upon a time there were three little pigs who lived with their mother.'],
   ['Un día, la madre les dice: «Ya sois mayores. Necesitáis una casa».','One day, their mother tells them: “You are grown up now. You need a house.”'],
   ['El primer cerdito es muy perezoso y hace una casa de paja.','The first little pig is very lazy and makes a house of straw.'],
   ['El segundo cerdito hace una casa de madera, rápido y sin ganas.','The second little pig makes a wooden house, quickly and without enthusiasm.'],
   ['El tercer cerdito trabaja todo el día y hace una casa de ladrillos.','The third little pig works all day and makes a brick house.'],
   ['Por la noche llega el lobo y sopla muy fuerte.','At night the wolf arrives and blows very hard.'],
   ['La casa de paja y la casa de madera se caen enseguida.','The straw house and the wooden house fall down right away.'],
   ['Los dos cerditos corren a casa de su hermano.','The two little pigs run to their brother’s house.'],
   ['El lobo sopla y sopla, pero la casa de ladrillos no se mueve.','The wolf blows and blows, but the brick house does not move.'],
   ['Por fin, el lobo se va muy cansado.','Finally, the wolf goes away very tired.'],
   ['Desde ese día, los tres hermanos viven juntos y felices.','From that day on, the three brothers live together and happy.']
  ],
  phrases:{
   'había una vez':{en:'once upon a time (there was/were)', ctx:'Fairy-tale opening.', pos:'fixed expression'},
   'un día':{en:'one day', ctx:'Starts an event.', pos:'expression'},
   'ya sois mayores':{en:'you are grown up now', ctx:'ya = already/now; ser mayor = to be grown up (or older). sois = vosotros form, typical of Spain.', pos:'sentence', gram:'ser, vosotros'},
   'sin ganas':{en:'without enthusiasm, half-heartedly', ctx:'Hacer algo sin ganas = to do something unwillingly.', pos:'expression'},
   'todo el día':{en:'all day', ctx:'Duration.', pos:'expression'},
   'por la noche':{en:'at night', ctx:'por la mañana / por la tarde / por la noche = in the morning / afternoon / at night.', pos:'expression'},
   'se caen':{en:'fall down', ctx:'caerse = to fall (down), reflexive.', pos:'verb (reflexive)', gram:'caerse, 3rd person plural'},
   'a casa de':{en:'to the house of', ctx:'ir/correr a casa de + person.', pos:'expression'},
   'se mueve':{en:'moves', ctx:'moverse = to move (itself). no se mueve = does not move.', pos:'verb (reflexive)', gram:'moverse (o→ue)'},
   'por fin':{en:'finally, at last', ctx:'After waiting or effort.', pos:'expression'},
   'se va':{en:'goes away, leaves', ctx:'irse = to leave, go away.', pos:'verb (reflexive)', gram:'irse, 3rd person singular'},
   'desde ese día':{en:'from that day on', ctx:'desde = since/from.', pos:'expression'}
  },
  gloss:{
   'tres':{en:'three', pos:'number'},'cerditos':{en:'little pigs', pos:'noun', gram:'cerdo + diminutive -ito, plural'},'cerdito':{en:'little pig', pos:'noun', gram:'diminutive of cerdo'},'que':{en:'who / that', pos:'relative pronoun'},'vivían':{en:'lived, used to live', pos:'verb', gram:'vivir, imperfect, 3rd person plural'},'con':{en:'with', pos:'preposition'},'su':{en:'their / his / her', pos:'possessive'},'madre':{en:'mother', pos:'noun'},
   'la':{en:'the (feminine)', pos:'article'},'les':{en:'to them', pos:'pronoun', gram:'indirect object, plural'},'dice':{en:'says, tells', pos:'verb', gram:'decir, 3rd sing.'},'necesitáis':{en:'you (all) need', pos:'verb', gram:'necesitar, vosotros form (Spain)'},'una':{en:'a (feminine)', pos:'article'},'casa':{en:'house', pos:'noun'},
   'el':{en:'the (masculine)', pos:'article'},'primer':{en:'first', pos:'ordinal', gram:'primero → primer before a masculine noun'},'es':{en:'is', pos:'verb', gram:'ser'},'muy':{en:'very', pos:'adverb'},'perezoso':{en:'lazy', pos:'adjective'},'y':{en:'and', pos:'conjunction'},'hace':{en:'makes, builds', pos:'verb', gram:'hacer (irregular), 3rd sing.'},'de':{en:'of / made of', pos:'preposition', gram:'casa de paja = house made of straw'},'paja':{en:'straw', pos:'noun'},
   'segundo':{en:'second', pos:'ordinal'},'madera':{en:'wood', pos:'noun'},'rápido':{en:'quickly', pos:'adverb'},'sin':{en:'without', pos:'preposition'},'ganas':{en:'desire, enthusiasm', pos:'noun'},
   'tercer':{en:'third', pos:'ordinal', gram:'tercero → tercer before a masculine noun'},'trabaja':{en:'works', pos:'verb', gram:'trabajar, 3rd sing.'},'todo':{en:'all', pos:'adjective'},'día':{en:'day', pos:'noun', gram:'masculine: el día'},'ladrillos':{en:'bricks', pos:'noun', gram:'masculine plural'},
   'por':{en:'in / during / through', pos:'preposition'},'noche':{en:'night', pos:'noun'},'llega':{en:'arrives', pos:'verb'},'lobo':{en:'wolf', pos:'noun'},'sopla':{en:'blows', pos:'verb', gram:'soplar, 3rd sing.'},'fuerte':{en:'hard, strongly', pos:'adverb · adjective'},
   'se':{en:'(reflexive pronoun)', pos:'pronoun', gram:'part of a reflexive verb'},'caen':{en:'fall', pos:'verb', gram:'caer'},'enseguida':{en:'right away, immediately', pos:'adverb'},
   'los':{en:'the (masc. plural)', pos:'article'},'dos':{en:'two', pos:'number'},'corren':{en:'run', pos:'verb', gram:'correr, 3rd plural'},'a':{en:'to', pos:'preposition'},'hermano':{en:'brother', pos:'noun'},'hermanos':{en:'brothers / siblings', pos:'noun', gram:'masculine plural can mean siblings'},
   'pero':{en:'but', pos:'conjunction'},'no':{en:'not', pos:'adverb'},'mueve':{en:'moves', pos:'verb', gram:'mover (o→ue)'},'fin':{en:'end', pos:'noun'},'va':{en:'goes', pos:'verb', gram:'ir'},'cansado':{en:'tired', pos:'adjective', gram:'estar cansado'},
   'desde':{en:'since, from', pos:'preposition'},'ese':{en:'that', pos:'demonstrative', gram:'masculine'},'viven':{en:'live', pos:'verb', gram:'vivir, 3rd plural'},'juntos':{en:'together', pos:'adjective', gram:'masculine plural'},'felices':{en:'happy', pos:'adjective', gram:'plural of feliz'},
   'había':{en:'there was / there were', pos:'verb', gram:'haber, imperfect'},'vez':{en:'time (occasion)', pos:'noun'},'un':{en:'a (masculine)', pos:'article'},'ya':{en:'already, now', pos:'adverb'},'sois':{en:'you (all) are', pos:'verb', gram:'ser, vosotros'},'mayores':{en:'grown up, older', pos:'adjective'}
  },
  quiz:[
   {q:'Why is the first house made of straw?', o:['Straw is strong','The first pig is lazy','The mother says so'], a:1},
   {q:'“Necesitáis” is the form for…', o:['nosotros','vosotros','ellos'], a:1},
   {q:'What happens to the brick house?', o:['It falls down','It does not move','It burns'], a:1},
   {q:'“Por fin” means…', o:['finally','because','for the end'], a:0}
  ]}
];

/* ---------------- MADRID RADIO (scripts; audio = text-to-speech) ---------------- */
MA.RADIO = [
 {id:'r1', city:'alicante', title:'¡Me he perdido en Sol!', en:'I got lost in Sol!', level:'A1', type:'Funny audio drama', unlock:null,
  desc:'Sofía looks for her language academy in the old town and gets help from a very talkative señora.',
  lines:[
   ['S','Perdone, señora. ¿Habla inglés?','Excuse me, madam. Do you speak English?'],
   ['R','¿Inglés? No, hija, no. Pero hablo español muy bien. ¡Y muy rápido!','English? No, dear, no. But I speak Spanish very well. And very fast!'],
   ['S','Vale… Busco la Academia Costa Blanca.','OK… I am looking for the Costa Blanca Academy.'],
   ['R','¿La academia? ¡Está muy cerca! Es en la calle Mayor, número doce.','The academy? It is very close! It’s on Calle Mayor, number twelve.'],
   ['S','¿Número dos?','Number two?'],
   ['R','No, no. Doce. Uno, dos… doce. Como los huevos.','No, no. Twelve. One, two… twelve. Like eggs (a dozen).'],
   ['S','¡Ah, doce! Muchas gracias, señora.','Ah, twelve! Thank you very much, madam.'],
   ['R','De nada, guapa. ¿Y de dónde eres?','You are welcome, dear. And where are you from?'],
   ['S','Soy canadiense.','I am Canadian.'],
   ['R','¡Canadá! Mi sobrino vive en Toronto. Es ingeniero, muy guapo, soltero…','Canada! My nephew lives in Toronto. He is an engineer, very handsome, single…'],
   ['S','¡Hasta luego, señora!','See you later, madam!']
  ],
  voices:{S:'airy', R:'rounded'}, names:{S:'Sofía', R:'Señora Rosa'},
  quiz:[
   {q:'What number is the academy?', o:['2','12','20'], a:1},
   {q:'Does the señora speak English?', o:['Yes, very well','No','A little'], a:1},
   {q:'Where does her nephew live?', o:['Madrid','Toronto','Vancouver'], a:1},
   {q:'Why is the episode funny?', o:['The señora tries to set Sofía up with her nephew','Sofía falls down','The academy is closed'], a:0}
  ],
  dictation:['Busco la academia.','Muchas gracias, señora.']},
 {id:'r2', city:'alicante', title:'El misterio del café frío', en:'The mystery of the cold coffee', level:'A1', type:'Café comedy podcast', unlock:null,
  desc:'Lucía orders at a seaside café, but Javi the barista is having a very strange morning.',
  lines:[
   ['J','¡Buenos días! ¿Qué te pongo?','Good morning! What can I get you?'],
   ['L','Hola, Javi. ¿Me pones un café con leche, por favor? Caliente.','Hi, Javi. Can I have a coffee with milk, please? Hot.'],
   ['J','Marchando un café con leche… ¡aquí tienes!','One coffee with milk coming up… here you go!'],
   ['L','Javi… el café está frío.','Javi… the coffee is cold.'],
   ['J','¿Frío? ¡Imposible! La máquina es nueva.','Cold? Impossible! The machine is new.'],
   ['L','Y esto no es leche. Es zumo de naranja.','And this is not milk. It is orange juice.'],
   ['J','¡Ay, perdón! Hoy estoy fatal. No duermo bien.','Oh, sorry! Today I am a mess. I am not sleeping well.'],
   ['L','No pasa nada. ¿Me pones un té, mejor?','No problem. Can I have a tea instead?'],
   ['J','Claro. Un té… y una tostada gratis, por las molestias.','Of course. A tea… and a free toast, for the trouble.'],
   ['L','¡Vale! ¿Cuánto es?','OK! How much is it?'],
   ['J','Para ti, un euro con cincuenta.','For you, one euro fifty.']
  ],
  voices:{J:'glassy', L:'airy'}, names:{J:'Javi', L:'Lucía'},
  quiz:[
   {q:'What is wrong with the first coffee?', o:['It is cold','It is too sweet','It is small'], a:0},
   {q:'What is in the cup instead of milk?', o:['water','orange juice','tea'], a:1},
   {q:'What does Lucía get for free?', o:['a croissant','a toast','a coffee'], a:1},
   {q:'How much does she pay?', o:['1,50 €','5,10 €','15 €'], a:0}
  ],
  dictation:['El café está frío.','¿Me pones un té?']}
];

/* ---------------- CHARACTERS ---------------- */
// look = avatar config for the shared renderer
MA.NPCS = {
 lucia:{name:'Lucía', role:'Your AI friend & guide · design student, 24, madrileña', place:'any', companion:true,
   look:{hair:'long', hairColor:'#2b1d18', skin:'#f1d3bc', eyes:'#3b2a20', outfit:'knit', shoes:'sneakers', acc:['earrings']},
   style:'Warm, playful, patient. Speaks slowly to beginners, uses “vale”, “¡qué guay!”. Uses tú. Gently corrects one or two mistakes per turn and encourages the learner to answer in Spanish.',
   topics:['your day','Madrid neighbourhoods','food','study tips','homework help'], greet:'¡Hola! Soy Lucía, tu amiga madrileña. ¿Qué tal tu día?'},
 carmen:{name:'Profesora Carmen', role:'Spanish teacher (your online class)', place:'academia', open:true,
   look:{hair:'bob', hairColor:'#6b6566', skin:'#f3d6c1', eyes:'#3c2f2a', outfit:'blazer', shoes:'loafers', acc:['glasses']},
   style:'Clear, encouraging teacher in her 50s. Speaks carefully and clearly, explains grammar briefly in English when asked, asks follow-up questions. Lets the student use tú with her.',
   topics:['class','grammar questions','your goals','Spanish culture'], greet:'Buenos días. Soy Carmen, tu profesora. Puedes tutearme. ¿Cómo te llamas?'},
 javi:{name:'Javi', role:'Barista at a seaside café', place:'cafe', open:true,
   look:{hair:'short', hairColor:'#1f1a17', skin:'#e8bf9f', eyes:'#2e2118', outfit:'apron', shoes:'sneakers', acc:[], male:true},
   style:'Friendly, quick, funny Madrid barista in his late 20s. Uses bar phrases: “¿Qué te pongo?”, “¿Algo más?”, “Marchando”, “Son X euros”. Keeps to café situations: drinks, food, prices. Menu: café solo 1,30 €, cortado 1,40 €, café con leche 1,80 €, té 1,60 €, zumo de naranja natural 2,50 €, tostada con tomate 2,00 €, cruasán 1,70 €, pincho de tortilla 2,80 €.',
   topics:['ordering','prices','the menu'], greet:'¡Buenas! Bienvenida al café. ¿Qué te pongo?'},
 rosario:{name:'Doña Rosario', role:'Librarian at the Enchanted Library', place:'biblioteca',
   look:{hair:'bun', hairColor:'#bdb6b0', skin:'#f0d5c2', eyes:'#4a3a30', outfit:'cardigan', shoes:'loafers', acc:['glasses','necklace']},
   style:'Gentle, poetic librarian in her 70s who loves fairy tales. Uses usted naturally but accepts tú. Talks about books and stories, asks the learner about the stories they read.',
   topics:['fairy tales','books','reading'], greet:'Bienvenida a la Biblioteca Encantada, querida. ¿Qué cuento le apetece leer hoy?'},
 pablo:{name:'Pablo', role:'Local friend · waiter from Lavapiés', place:'retiro',
   look:{hair:'short', hairColor:'#3a2a20', skin:'#d9a982', eyes:'#2a1e16', outfit:'tee-jeans', shoes:'sneakers', acc:[], male:true},
   style:'Relaxed young madrileño (26). Casual Spain Spanish: “tío/tía”, “guay”, “venga”, “¿qué pasa?”. Talks about weekends, the Retiro, hobbies, football, music. Keeps it simple for beginners.',
   topics:['hobbies','weekends','the Retiro park'], greet:'¡Ey! ¿Qué pasa? Soy Pablo. ¿Vienes mucho al Retiro?'},
 ines:{name:'Inés', role:'Shop assistant at Mercado de San Miguel', place:'mercado',
   look:{hair:'ponytail', hairColor:'#4a2f22', skin:'#e6bb98', eyes:'#3a281c', outfit:'apron', shoes:'flats-black', acc:[]},
   style:'Cheerful market stall worker. Sells fruit, cheese, ham and bread. Says prices clearly in euros. Helps with weights (un kilo, medio kilo, cien gramos).',
   topics:['shopping','prices','food'], greet:'¡Hola, guapa! ¿Qué te pongo hoy? Tenemos unas manzanas buenísimas.'},
 andres:{name:'Andrés', role:'Guide at Museo del Prado', place:'prado',
   look:{hair:'short', hairColor:'#5a4a3e', skin:'#efcfb4', eyes:'#33261d', outfit:'blazer', shoes:'loafers', acc:['glasses'], male:true},
   style:'Elegant, knowledgeable museum guide. Talks about Velázquez, Goya and Spanish art in simple words, asks the learner to describe colours, people and feelings in paintings.',
   topics:['paintings','artists','describing art'], greet:'Bienvenida al Prado. ¿Qué cuadro quiere ver hoy?'},
 marisol:{name:'Marisol', role:'Your neighbour', place:'apartment',
   look:{hair:'layered', hairColor:'#7a3b2b', skin:'#eac6a8', eyes:'#3d2b22', outfit:'dress', shoes:'flats-black', acc:['necklace']},
   style:'Chatty neighbour in her 40s with a big dog called Rufo. Talks about the building, the neighbourhood, shops, and everyday life.',
   topics:['the neighbourhood','daily life','pets'], greet:'¡Hola, vecina! Soy Marisol, del tercero B. ¿Ya conoces el barrio?'}
};

/* ---------------- MAP LOCATIONS ---------------- */
MA.LOCATIONS = [
 {id:'academia', name:'Academia Madrid', en:'Language school', x:47, y:44, unlock:null, npc:'carmen',
  acts:[['Lessons & chapters','academy'],['Homework & exams','exams'],['Talk to Profesora Carmen','chat:carmen'],['Curriculum map A1–C2','curriculum']]},
 {id:'apartment', name:'Tu piso', en:'Student apartment', x:30, y:62, unlock:null, npc:'marisol',
  acts:[['Vocabulary review (SRS)','vocab-review'],['Study calendar','calendar'],['Learning journal','journal'],['Wardrobe','wardrobe'],['Achievements','passport'],['Chat with Marisol','chat:marisol']]},
 {id:'cafe', name:'Café de Madrid', en:'Café', x:58, y:30, unlock:{quest:'q1'}, unlockText:'Finish Quest 1: First Day in Madrid', npc:'javi',
  acts:[['Order from Javi (AI)','chat:javi'],['Quest: Your First Café','quest:q2'],['Lesson: Pedir en un bar','lesson:c2l3']]},
 {id:'biblioteca', name:'Biblioteca Encantada', en:'Enchanted Library', x:36, y:26, unlock:{lesson:'c1l2'}, unlockText:'Complete lesson 1.2', npc:'rosario',
  acts:[['Fairy tale library','library'],['Talk to Doña Rosario','chat:rosario']]},
 {id:'radio', name:'Radio Madrid', en:'Radio studio', x:22, y:40, unlock:{lesson:'c1l3'}, unlockText:'Complete lesson 1.3',
  acts:[['Madrid Radio episodes','radio']]},
 {id:'retiro', name:'Parque del Retiro', en:'Retiro Park', x:78, y:52, unlock:{exam:'c1'}, unlockText:'Pass the Chapter 1 exam', npc:'pablo',
  acts:[['Chat with Pablo','chat:pablo'],['Everyday expressions','expressions']]},
 {id:'mercado', name:'Mercado de San Miguel', en:'Market', x:40, y:74, unlock:{lesson:'c2l2'}, unlockText:'Complete lesson 2.2', npc:'ines',
  acts:[['Price listening game','game:prices'],['Shop with Inés (AI)','chat:ines'],['Market vocabulary','vocab-cat:market']]},
 {id:'prado', name:'Museo del Prado', en:'Prado Museum', x:68, y:70, unlock:{exam:'c2'}, unlockText:'Pass the Chapter 2 exam', npc:'andres',
  acts:[['Describe a painting (writing)','prado-write'],['Talk with Andrés','chat:andres'],['Museum vocabulary','vocab-cat:museum']]}
];

/* ---------------- QUESTS ---------------- */
MA.QUESTS = [
 {id:'q1', city:'alicante', title:'First Day in Alicante', en:'Introduce yourself to the receptionist', reward:{xp:50, coins:30, item:'beret'}, unlock:null, npc:'marta',
  steps:[
   {say:'¡Buenos días! Bienvenida a la Academia Costa Blanca. Soy Marta, la recepcionista.', tr:'Good morning! Welcome to the Costa Blanca Academy. I am Marta, the receptionist.'},
   {say:'¿Cómo te llamas?', tr:'What is your name?', ask:{type:'type', hint:'Answer with “Me llamo …”', check:'name'}},
   {say:'¡Encantada! ¿De dónde eres?', tr:'Nice to meet you! Where are you from?', ask:{type:'type', hint:'Answer with “Soy de …” or a nationality', check:'origin'}},
   {say:'¡Qué bien! Una pregunta: ¿eres estudiante nueva?', tr:'Great! A question: are you a new student?', ask:{type:'mc', o:['Sí, soy estudiante nueva.','Sí, eres estudiante nueva.','Sí, es estudiante nuevo.'], a:0, ex:'You talk about yourself: soy. You are a woman: nueva.'}},
   {say:'Perfecto. Tu clase es la A1, con la profesora Carmen. ¡Mucha suerte!', tr:'Perfect. Your class is A1, with teacher Carmen. Good luck!', ask:{type:'mc', o:['¡Muchas gracias! Hasta luego.','De nada, adiós.','Perdón, buenas noches.'], a:0, ex:'Marta helped you, so you thank her.'}}
  ]},
 {id:'q2', city:'alicante', title:'Your First Café', en:'Order a drink using correct Spanish', reward:{xp:60, coins:40, item:'earrings'}, unlock:{quest:'q1', lesson:'c2l3'}, unlockText:'Finish Quest 1 and lesson 2.3', npc:'javi',
  steps:[
   {say:'¡Buenas! ¿Qué te pongo?', tr:'Hi! What can I get you?', ask:{type:'type', hint:'Order a drink politely: ¿Me pones…? / Quería… + por favor', check:'order'}},
   {say:'Marchando. ¿Para tomar aquí o para llevar?', tr:'Coming up. To have here or to take away?', ask:{type:'mc', o:['Para tomar aquí, gracias.','Para mí, un té.','Son dos euros.'], a:0}},
   {say:'¿Algo más?', tr:'Anything else?', ask:{type:'mc', o:['Sí, una tostada con tomate.','Sí, un tostada con tomate.','Sí, la tostada con tomate es.'], a:0, ex:'tostada is feminine → una.'}},
   {say:'Muy bien. Son tres euros con ochenta.', tr:'Very good. That is three euros eighty.', listen:true, ask:{type:'mc', q:'How much do you pay?', o:['3,80 €','3,18 €','13,80 €'], a:0}},
   {say:'¡Gracias! ¡Que aproveche!', tr:'Thanks! Enjoy your meal!', ask:{type:'mc', o:['¡Gracias, Javi! Hasta luego.','¿Qué te pongo?','¿Cuánto es?'], a:0}}
  ]},
 {id:'q3', city:'laspalmas', title:'Lost in Las Palmas', en:'Ask for directions', reward:{xp:60, coins:40}, unlock:{chapter:'c3'}, unlockText:'Coming soon — arrives with the Las Palmas lessons', locked:true, soon:true},
 {id:'q4', city:'laspalmas', title:'A New Friend', en:'Talk with a classmate about hobbies', reward:{xp:60, coins:40}, unlock:{chapter:'c5'}, unlockText:'Coming soon — arrives with the Las Palmas lessons', locked:true, soon:true},
 {id:'q5', city:'palma', title:'The Missing Library Book', en:'Read clues and solve a mystery', reward:{xp:80, coins:50}, unlock:{chapter:'a2'}, unlockText:'Coming soon — arrives with the Palma lessons', locked:true, soon:true},
 {id:'q6', city:'palma', title:'A Weekend Adventure', en:'Plan a trip using future expressions', reward:{xp:80, coins:50}, unlock:{chapter:'a2'}, unlockText:'Coming soon — arrives with the Palma lessons', locked:true, soon:true},
 {id:'q7', city:'sevilla', title:'The Great Debate', en:'Take part in a debate', reward:{xp:120, coins:80}, unlock:{chapter:'b2'}, unlockText:'Coming soon — arrives with the Sevilla lessons', locked:true, soon:true}
];
MA.NPCS.marta = {name:'Marta', role:'Receptionist', look:{hair:'ponytail', hairColor:'#2a1b14', skin:'#efcab0', eyes:'#3a2a20', outfit:'blazer', shoes:'flats-black', acc:['earrings']}};

/* ---------------- WARDROBE ---------------- */
MA.WARDROBE = {
 hair:[['layered','Medium layers (default)',0],['long','Long waves',0],['ponytail','High ponytail',0],['bob','Chic bob',0],['bun','Low bun',40]],
 hairColor:[['#5b3a29','Chestnut brown (default)'],['#2b1d18','Espresso'],['#8a5a3b','Caramel'],['#c49a6c','Honey blonde'],['#1a1a1f','Black'],['#7a3b2b','Auburn'],['#c9a3a8','Dusty rose']],
 skin:[['#f6dcc8','Porcelain'],['#f1d3bc','Light (default)'],['#e6bb98','Warm beige'],['#d9a982','Tan'],['#b07a55','Caramel'],['#7d5238','Deep']],
 eyes:[['#5a3d2b','Brown (default)'],['#2e2118','Dark brown'],['#4f6b4a','Green'],['#4a6a8a','Blue'],['#7a6a4a','Hazel'],['#5a4a6a','Violet grey']],
 outfit:[['tee-skirt','White tee & long black skirt (default)',0],['knit','Cream knit & beige trousers',0],['dress','Dusty-pink midi dress',60],['blazer','Navy blazer & white skirt',80],['cardigan','Gold cardigan & pleated skirt',60]],
 shoes:[['flats-black','Black ballet flats (default)',0],['sneakers','White sneakers',0],['loafers','Tan loafers',30],['boots','Ankle boots',40]],
 acc:[['earrings','Pearl earrings','quest'],['beret','Black beret','quest'],['necklace','Gold necklace',30],['glasses','Round glasses',20],['bag','Tote bag',30],['ribbon','Hair ribbon',20]]
};
MA.DEFAULT_AVATAR = {hair:'layered', hairColor:'#5b3a29', skin:'#f1d3bc', eyes:'#5a3d2b', outfit:'tee-skirt', shoes:'flats-black', acc:[]};

MA.EXPRESSIONS = [
 ['¡Qué guay!','How cool!','Very common with young people in Spain.'],
 ['Venga','Come on / OK then / Bye','Used to agree, to encourage, or to end a conversation: “¡Venga, hasta luego!”'],
 ['¿Qué pasa?','What’s up?','Informal greeting between friends.'],
 ['tío / tía','dude / mate (lit. uncle/aunt)','Very informal, between friends: “¡Tía, qué bien!”'],
 ['No pasa nada','No problem / It’s fine','Reply to an apology.'],
 ['¡Qué rollo!','What a drag! / How boring!','When something is annoying or boring.'],
 ['Me apetece…','I feel like… (Spain)','“¿Te apetece un café?” = Do you fancy a coffee?'],
 ['Estoy fatal','I feel awful / I am a mess','fatal = terrible.'],
 ['¡Ojalá!','I hope so!','From Arabic; expresses a wish.'],
 ['Quedar','to meet up','“¿Quedamos a las seis?” = Shall we meet at six?']
];

MA.MOTTOS = [
 ['Poco a poco se va lejos.','Little by little, one goes far.'],
 ['Querer es poder.','Where there’s a will, there’s a way.'],
 ['Hoy es un buen día para aprender.','Today is a good day to learn.'],
 ['Paso a paso.','Step by step.'],
 ['Más vale tarde que nunca.','Better late than never.'],
 ['El que la sigue, la consigue.','Whoever keeps at it, gets it.'],
 ['¡Tú puedes!','You can do it!']
];
