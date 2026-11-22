/* READING DICTIONARY · core: grammar words, pronouns, numbers, very common verbs and expressions.
   Format: lemma|pos|English|notes   (see rlex.js) */
MA.RX.add(`
# articles and determiners
el|art|the|masculine singular article
la|art|the|feminine singular article
los|art|the|masculine plural article
las|art|the|feminine plural article
lo|art|the (neuter): lo que = what; lo bueno = the good thing|neuter article, used before adjectives and «que»
un|art|a, an|masculine singular indefinite article
una|art|a, an|feminine singular indefinite article
unos|art|some, a few|masculine plural
unas|art|some, a few|feminine plural
al|prep|to the, at the|a + el = al (contraction)
del|prep|of the, from the|de + el = del (contraction)
# pronouns
yo|pron|I|subject pronoun, 1st person singular
tú|pron|you (informal)|subject pronoun, 2nd person singular
él|pron|he; him (after a preposition)|subject pronoun, 3rd person masculine
ella|pron|she; her (after a preposition)|subject pronoun, 3rd person feminine
usted|pron|you (formal, one person)|takes 3rd person verb forms
nosotros|pron|we; us (after a preposition)|masculine or mixed group; f: nosotras
nosotras|pron|we; us (all female)|
vosotros|pron|you all (informal)|Spain; masculine or mixed group
vosotras|pron|you all (informal, all female)|Spain
ellos|pron|they; them (after a preposition)|masculine or mixed group
ellas|pron|they; them (all female)|
ustedes|pron|you all (formal)|takes 3rd person plural verb forms
me|pron|me, to me; myself|object or reflexive pronoun (yo)
te|pron|you, to you; yourself|object or reflexive pronoun (tú)
se|pron|himself, herself, itself, themselves, yourself (formal); each other; (in general statements) people, one|reflexive pronoun. Also impersonal/passive: «se come tarde» = people eat late; «se venden pisos» = flats are sold. Replaces le/les before lo/la: «se lo dijo» = he told him/her.
nos|pron|us, to us; ourselves; each other|object or reflexive pronoun (nosotros)
os|pron|you all, to you all; yourselves|object or reflexive pronoun (vosotros), Spain
lo|pron|him, it (masculine object)|direct object pronoun
la|pron|her, it (feminine object)|direct object pronoun
los|pron|them (masculine or mixed)|direct object pronoun
las|pron|them (feminine)|direct object pronoun
le|pron|to him, to her, to you (usted); him (in Spain, for men)|indirect object pronoun
les|pron|to them, to you all (ustedes)|indirect object pronoun
mí|pron|me (after a preposition)|para mí = for me
ti|pron|you (after a preposition)|para ti = for you
sí|adv|yes|with accent: yes; also «sí mismo» = himself
conmigo|pron|with me|
contigo|pron|with you|
consigo|pron|with himself, with herself, with them|
mío|adj|mine, of mine|possessive (stressed form)
tuyo|adj|yours, of yours (tú)|possessive (stressed form)
suyo|adj|his, hers, theirs, yours (usted)|possessive (stressed form)
nuestro|adj|our, ours|possessive
vuestro|adj|your, yours (vosotros)|possessive, Spain
mi|poss|my|possessive before a noun; plural: mis|pl=mis
tu|poss|your (informal)|possessive before a noun; plural: tus|pl=tus
su|poss|his, her, its, their, your (usted/ustedes)|possessive before a noun; plural: sus|pl=sus
este|dem|this (masculine); also: the east (el este)|demonstrative
esta|dem|this (feminine)|demonstrative
estos|dem|these|demonstrative, masculine plural
estas|dem|these|demonstrative, feminine plural
esto|dem|this (thing)|neuter demonstrative
ese|dem|that (masculine)|demonstrative
esa|dem|that (feminine)|demonstrative
esos|dem|those|demonstrative, masculine plural
esas|dem|those|demonstrative, feminine plural
eso|dem|that (thing)|neuter demonstrative; por eso = that's why
aquel|dem|that (over there)|demonstrative, far away
aquella|dem|that (over there)|demonstrative, feminine
aquellos|dem|those (over there)|
aquellas|dem|those (over there)|
aquello|dem|that (thing, far away)|neuter
# relatives and question words
que|conj|that, which, who; than (after más/menos)|relative pronoun / conjunction
qué|q|what? which?; how…! (¡qué bonito!)|question or exclamation word
quien|rel|who, whom|relative pronoun|pl=quienes
quién|q|who?|question word|pl=quiénes
cual|rel|which (el cual = which, who)|relative pronoun|pl=cuales
cuál|q|which? what?|question word|pl=cuáles
cuanto|rel|as much as, all that|en cuanto = as soon as
cuánto|q|how much? how many?|question word; also cuánta, cuántos, cuántas|f=cuánta;pl=cuántos
como|conj|like, as; since (at the start of a sentence)|without accent: comparison or cause
cómo|q|how?; how…! (¡cómo llueve!)|question word
donde|rel|where (in which)|relative adverb
dónde|q|where?|question word
adonde|rel|(to) where|relative adverb of direction
adónde|q|where (to)?|question word of direction
cuando|conj|when|conjunction (no accent)
cuándo|q|when?|question word
porque|conj|because|
cuyo|rel|whose|relative; agrees with the thing owned|f=cuya;pl=cuyos
# prepositions
a|prep|to, at; (personal a before a person object)|preposition; ve a la abuela = sees the grandmother
ante|prep|before, in front of, faced with|
bajo|prep|under, below|also adjective: short, low
con|prep|with|
contra|prep|against|
de|prep|of, from, about; made of|preposition
desde|prep|from, since|
durante|prep|during, for (a period of time)|
en|prep|in, on, at; into|
entre|prep|between, among|
hacia|prep|towards|
hasta|prep|until, up to, as far as; even|
para|prep|for, in order to|para + infinitive = in order to
por|prep|for, by, through, along, because of|por el bosque = through the forest
según|prep|according to|
sin|prep|without|
sobre|prep|on, on top of; about|
tras|prep|after, behind|
# conjunctions
y|conj|and|
e|conj|and (before a word starting with i- / hi-)|
o|conj|or|
u|conj|or (before a word starting with o- / ho-)|
ni|conj|nor, not even; ni… ni = neither… nor|
pero|conj|but|
sino|conj|but (rather), instead|after a negative: no es A, sino B
aunque|conj|although, even though|
si|conj|if; whether|without accent
mientras|conj|while|mientras tanto = meanwhile
pues|conj|well, so, then|
# adverbs
no|adv|no, not|
muy|adv|very|
más|adv|more, most; plus|más… que = more… than
menos|adv|less, fewer; except|
mucho|adj|a lot of, much, many; (as adverb) a lot, much|
poco|adj|little, few; (as adverb) not much; un poco = a little|
bastante|adj|quite, enough; quite a lot|
demasiado|adj|too much, too many; (as adverb) too|
tan|adv|so, as (tan… como = as… as)|
tanto|adj|so much, so many; (as adverb) so much|
también|adv|also, too|
tampoco|adv|neither, not… either|
siempre|adv|always|
nunca|adv|never|
jamás|adv|never, ever|
ya|adv|already; now; any more (ya no = not any more)|
todavía|adv|still; yet (todavía no = not yet)|
aún|adv|still, yet|
hoy|adv|today|
ayer|adv|yesterday|
mañana|nf|morning; (as adverb) tomorrow|la mañana = the morning; mañana = tomorrow
ahora|adv|now|
luego|adv|then, later|
después|adv|after, afterwards, later|después de = after
antes|adv|before, earlier|antes de = before
pronto|adv|soon; early|
tarde|nf|afternoon, evening; (as adverb) late|
temprano|adv|early|
aquí|adv|here|
ahí|adv|there (near you)|
allí|adv|there (far)|
allá|adv|over there; (more) away|
bien|adv|well, fine, good|
mal|adv|badly; wrong|also: evil (el mal)
mejor|adj|better, best|comparative of bueno / bien|inv
peor|adj|worse, worst|comparative of malo / mal|inv
casi|adv|almost|
solo|adj|alone, on one's own; (as adverb) only|solo = only (adverb) or alone (adjective)
además|adv|besides, also, in addition|
quizás|adv|perhaps, maybe|
quizá|adv|perhaps, maybe|
enseguida|adv|immediately, right away|
arriba|adv|up, upstairs, above|
abajo|adv|down, downstairs, below|
encima|adv|on top, above|encima de = on top of
debajo|adv|underneath|debajo de = under
delante|adv|in front|delante de = in front of
detrás|adv|behind|detrás de = behind
dentro|adv|inside|dentro de = inside
fuera|adv|outside|fuera de = outside (of)
cerca|adv|near, close|cerca de = near
lejos|adv|far, far away|lejos de = far from
alrededor|adv|around|alrededor de = around
junto|adj|together; junto a = next to|
así|adv|like this, like that, so|
entonces|adv|then, so|
despacio|adv|slowly|
rápido|adj|fast, quick; (as adverb) quickly|
claro|adj|clear, light; ¡claro! = of course|
todo|adj|all, every, whole; (todo = everything)|
nada|pron|nothing, (not) anything|
algo|pron|something, anything; (as adverb) a bit|
alguien|pron|somebody, someone, anyone|
nadie|pron|nobody, no one, (not) anyone|
ninguno|adj|no, none, not any|before a masculine noun: ningún
ningún|adj|no, not any (before a masculine noun)|short form of ninguno
alguno|adj|some, any|before a masculine noun: algún
algún|adj|some, any (before a masculine noun)|short form of alguno
cada|adj|each, every|inv
otro|adj|other, another|
mismo|adj|same; -self (él mismo = himself)|
tal|adj|such|inv
cualquier|adj|any (before a noun)|inv
varios|adj|several|
medio|adj|half; middle (en medio de = in the middle of)|
demás|adj|other, the rest (los demás = the others)|inv
# numbers
uno|num|one|
dos|num|two|
tres|num|three|
cuatro|num|four|
cinco|num|five|
seis|num|six|
siete|num|seven|
ocho|num|eight|
nueve|num|nine|
diez|num|ten|
once|num|eleven|
doce|num|twelve|also: las doce = twelve o'clock
trece|num|thirteen|
catorce|num|fourteen|
quince|num|fifteen|
veinte|num|twenty|
treinta|num|thirty|
cuarenta|num|forty|
cincuenta|num|fifty|
cien|num|a hundred|
ciento|num|hundred (ciento uno = 101)|
doscientos|num|two hundred|
trescientos|num|three hundred|
mil|num|a thousand|
primero|adj|first|before a masculine noun: primer
primer|adj|first (before a masculine noun)|short form of primero
segundo|adj|second|also noun: second (time)
tercero|adj|third|before a masculine noun: tercer
tercer|adj|third (before a masculine noun)|short form of tercero
último|adj|last|
# interjections
ay|int|oh! ouch! oh dear!|
oh|int|oh!|
hola|int|hello, hi|
adiós|int|goodbye|
gracias|int|thank you, thanks|
socorro|int|help!|
vaya|int|wow! oh well!; also: go (ir, subjunctive)|
bueno|adj|good; (at the start of a sentence) well…, OK|before a masculine noun: buen
buen|adj|good (before a masculine noun)|short form of bueno
malo|adj|bad, evil|before a masculine noun: mal
crac|int|crack! (sound of something breaking)|onomatopoeia
pum|int|boom! thump!|onomatopoeia
fi|int|(sound in the giant's chant)|«¡Fi, fa, fo, fum!» = English «Fee-fi-fo-fum!» — no meaning
fa|int|(sound in the giant's chant)|«¡Fi, fa, fo, fum!» = English «Fee-fi-fo-fum!» — no meaning
fo|int|(sound in the giant's chant)|«¡Fi, fa, fo, fum!» = English «Fee-fi-fo-fum!» — no meaning
fum|int|(sound in the giant's chant)|«¡Fi, fa, fo, fum!» = English «Fee-fi-fo-fum!» — no meaning
# very common verbs
ser|v|to be|for identity, description, origin, time; irregular
estar|v|to be|for location, states and conditions; irregular
haber|v|to have (helper verb)|used to make perfect tenses: «ha comido» = has eaten. Also: hay = there is / are; había = there was / were
tener|v|to have|irregular; tener que + infinitive = to have to
hacer|v|to do, to make|irregular; hace frío = it's cold
ir|v|to go|irregular; ir a + infinitive = to be going to
decir|v|to say, to tell|irregular
poder|v|to be able to (can)|irregular
poner|v|to put|irregular; ponerse = to put on (clothes); to become
querer|v|to want; to love|irregular
saber|v|to know (a fact), to know how to|irregular
venir|v|to come|irregular
ver|v|to see; to watch|irregular
dar|v|to give|irregular
salir|v|to go out, to leave, to come out|irregular
traer|v|to bring|irregular
caer|v|to fall|irregular
oír|v|to hear|irregular
conocer|v:zc|to know (a person or place), to meet|
parecer|v:zc|to seem, to look like|parecerse a = to look like
volver|v|to come back, to return|volver a + infinitive = to do again
morir|v|to die|
dormir|v:ue-u|to sleep|dormirse = to fall asleep
pensar|v:ie|to think|pensar en = to think about
empezar|v:ie|to begin, to start|
cerrar|v:ie|to close|
despertar|v:ie|to wake (someone) up|despertarse = to wake up
sentar|v:ie|to sit (someone)|sentarse = to sit down
sentir|v:ie-i|to feel; to be sorry|sentirse = to feel (well, sad…)
pedir|v:i|to ask for, to order|
seguir|v:i|to follow; to continue, to keep (doing)|seguir + gerund = to keep doing
encontrar|v:ue|to find|encontrarse = to meet; to be (located)
contar|v:ue|to count; to tell (a story)|
recordar|v:ue|to remember|
costar|v:ue|to cost|
mover|v:ue|to move|moverse = to move (oneself)
llover|v:ue|to rain|
jugar|v|to play|
perder|v:ie|to lose; to miss|perderse = to get lost
entender|v:ie|to understand|
querer|v|to want; to love|irregular
llamar|v|to call; to knock (at the door)|llamarse = to be called
llamarse|v|to be called (me llamo = my name is)|reflexive
llevar|v|to carry, to take; to wear|llevarse = to take away
vivir|v|to live|
comer|v|to eat|comerse = to eat up
beber|v|to drink|
hablar|v|to speak, to talk|
mirar|v|to look (at), to watch|mirarse = to look at oneself
escuchar|v|to listen (to)|
preguntar|v|to ask (a question)|
contestar|v|to answer|
responder|v|to answer, to reply|
correr|v|to run|
caminar|v|to walk|
pasar|v|to pass, to go by; to come in; to happen; to spend (time)|¿qué te pasa? = what's wrong?
llegar|v|to arrive; to reach|
entrar|v|to go in, to come in, to enter|
abrir|v|to open|
coger|v|to take, to pick up, to catch|Spain
buscar|v|to look for|
trabajar|v|to work|
ayudar|v|to help|
cantar|v|to sing|
bailar|v|to dance|
gritar|v|to shout|
llorar|v|to cry|
saltar|v|to jump|
tocar|v|to touch; to play (an instrument)|
terminar|v|to finish, to end|
necesitar|v|to need|
esperar|v|to wait (for); to hope; to expect|esperar un bebé = to be expecting a baby
dejar|v|to let, to allow; to leave|dejar de + infinitive = to stop doing
aceptar|v|to accept, to agree|
decidir|v|to decide|
recibir|v|to receive, to welcome|
escribir|v|to write|
subir|v|to go up, to climb; to take up|
bajar|v|to go down; to lower|
gustar|v|to like|Works backwards: «me gusta el pan» = the bread pleases me = I like bread.
encantar|v|to love (something)|Works like gustar: «le encanta leer» = she loves reading.
quedar|v|to remain, to be left; to fit (clothes)|quedarse = to stay; quedarse dormido = to fall asleep
quedarse|v|to stay, to remain; to become (+ adjective)|quedarse dormido = to fall asleep; quedarse ciego = to go blind
convertir|v:ie-i|to turn (into), to convert|convertirse en = to turn into, to become
convertirse|v|to turn into, to become|reflexive; convertirse en
casar|v|to marry (perform a wedding)|casarse = to get married
casarse|v|to get married|casarse con = to marry (someone)
ponerse|v|to put on (clothes); to become; to stand, to get (somewhere)|ponerse furioso = to get furious
irse|v|to go away, to leave|reflexive of ir
levantar|v|to lift, to raise|levantarse = to get up
levantarse|v|to get up, to stand up|reflexive
enfadarse|v|to get angry|reflexive; Spain
enfadar|v|to make angry|enfadarse = to get angry
reír|v|to laugh|reírse de = to laugh at
reírse|v|to laugh (reírse de = to laugh at)|reflexive
sonreír|v:=reír|to smile|
creer|v|to believe, to think|
leer|v|to read|
nacer|v|to be born|
crecer|v|to grow, to grow up|
aparecer|v|to appear|
desaparecer|v|to disappear|
construir|v|to build|
cuidar|v|to look after, to take care of|
probar|v:ue|to try, to taste; to try on|probarse = to try on (clothes)
probarse|v|to try on (clothes)|reflexive
`, 'core');

MA.RX.addPhrases(`
había una vez|once upon a time|Traditional opening of fairy tales.
hace mucho tiempo|a long time ago|hace + time = … ago
de repente|suddenly|
por eso|that's why, so|
por fin|at last, finally|
al final|in the end|
otra vez|again|
de nuevo|again|
poco después|shortly after, soon after|
al día siguiente|the next day|
la noche siguiente|the next night|
todos los días|every day|
todo el día|all day|
toda la noche|all night|
por la mañana|in the morning|
por la tarde|in the afternoon / evening|
por la noche|at night|
tener que|to have to|tener que + infinitive
tener cuidado|to be careful|ten cuidado = be careful
tener miedo|to be afraid|literally: to have fear
tener hambre|to be hungry|literally: to have hunger
tener frío|to be cold|literally: to have cold
tener ganas de|to feel like, to really want to|
SE dar cuenta|to realise|darse cuenta (de)|darse cuenta
dar las gracias|to thank, to say thank you|
dar un beso|to give a kiss|
dar la bienvenida|to welcome|
hacer daño|to hurt, to harm|
hace frío|it is cold (weather)|
hace sol|it is sunny|
hace calor|it is hot (weather)|
mientras tanto|meanwhile|
a cambio|in return, in exchange|
a cambio de|in exchange for|
en lugar de|instead of|
en medio de|in the middle of|
junto a|next to, beside|
cerca de|near|
lejos de|far from|
delante de|in front of|
detrás de|behind|
encima de|on top of, above|
debajo de|under, underneath|
alrededor de|around|
dentro de|inside|
antes de|before|
después de|after|
al otro lado de|on the other side of|
de casa en casa|from house to house|
llamar a la puerta|to knock at the door|
para siempre|forever|
nunca más|never again|
ya no|not any more, no longer|
todavía no|not yet|
sin embargo|however|
a la vez|at the same time|
por favor|please|
de un bocado|in one bite|
en voz alta|out loud|
dar un golpe|to hit, to strike|
dejar de|to stop (doing)|
empezar a|to start (doing)|
SE acercar a|to come near, to approach||acercarse a
SE quedar dormir|to fall asleep||quedarse dormido/a
estar enamorar|to be in love||estar enamorado/a
SE enamorar de|to fall in love with||enamorarse de
SE reír de|to laugh at||reírse de
SE convertir en|to turn into||convertirse en
SE casar con|to marry||casarse con
qué te pasa|what's wrong (with you)?|
no hay que|you shouldn't, one mustn't|no hay que + infinitive
hay que|you have to, one must|hay que + infinitive
ya está|done! that's it!|
`);
