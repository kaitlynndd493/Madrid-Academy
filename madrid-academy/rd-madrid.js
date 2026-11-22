/* READING LIBRARY · MADRID (C2) · «Madrid real»: a news story, a restaurant review,
   a radio column, a history chronicle and a short story. All texts are original;
   the news story and the review describe invented events and places. */
(function () {
  const R = (MA.RLIB = MA.RLIB || []);
  const T = (id, title, en, type, note, text) => R.push({ id, city: 'madrid', level: 'C2', title, en, type, text, note });
  MA.RCURR.push(...[
    ['md-granvia', 'La Gran Vía, sin coches los domingos', 'Gran Vía Without Cars on Sundays'],
    ['md-cocido', 'Reseña: un cocido como los de antes', 'Review: An Old-Fashioned Cocido'],
    ['md-sobremesa', 'Elogio de la sobremesa', 'In Praise of the Sobremesa'],
    ['md-alcazar', 'La Nochebuena en que ardió el Alcázar', 'The Christmas Eve the Alcázar Burned'],
    ['md-rastro', 'Un domingo en el Rastro', 'A Sunday at the Rastro']
  ].map(([id, title, en]) => ({ id, city: 'madrid', level: 'C2', title, en })));
  if (MA.RTHEME) MA.RTHEME.madrid = 'Madrid real · prensa, crónica y relato';

  T('md-granvia', 'La Gran Vía, sin coches los domingos', 'Gran Vía Without Cars on Sundays', 'Noticia', 'Noticia inventada para practicar la lengua de la prensa.', `
MADRID. La Gran Vía será peatonal todos los domingos a partir del próximo mes de marzo. Así lo anunció ayer el Ayuntamiento en una rueda de prensa en la que la concejala de Movilidad aseguró que la medida «mejorará la calidad del aire y devolverá la calle a los vecinos».

Según el plan presentado, el tráfico se cortará entre la plaza de España y la calle de Alcalá desde las nueve de la mañana hasta las nueve de la noche. Los autobuses se desviarán por calles paralelas y se reforzará el servicio de metro en las estaciones de Callao, Gran Vía y Plaza de España.

La reacción no se hizo esperar. La asociación de vecinos del barrio celebró la noticia y recordó que lleva años pidiendo «menos ruido y más aceras». Algunos comerciantes, en cambio, se mostraron preocupados. «Los domingos son nuestro mejor día. Si la gente no puede llegar en coche, venderemos menos», explicó el dueño de una tienda de ropa, que pidió al Ayuntamiento que retrasara la medida hasta el verano.

No es la primera vez que la ciudad prueba^probar algo parecido. Durante las Navidades pasadas, la calle se cerró al tráfico varios fines de semana y, según datos municipales, el número de peatones aumentó un treinta por ciento. Los críticos, sin embargo, señalan que el tráfico simplemente se trasladó a otras calles del centro.

Al parecer, el plan costaría unos dos millones de euros, aunque el Ayuntamiento no ha confirmado la cifra. La oposición exigió ayer que se publique el informe completo y acusó al Gobierno municipal de improvisar.

Mientras tanto, en la propia Gran Vía, las opiniones están divididas. «Me parece estupendo: por fin podremos pasear sin respirar humo», decía una jubilada a la salida del metro. A su lado, un taxista negaba con la cabeza: «Ya veremos cuánto dura».
`);

  T('md-cocido', 'Reseña: un cocido como los de antes', 'Review: An Old-Fashioned Cocido', 'Reseña gastronómica', 'Reseña inventada: la taberna no existe.', `
Hay restaurantes que se anuncian y restaurantes que se recomiendan en voz baja, como quien comparte un secreto. La Taberna del Gato pertenece claramente al segundo grupo. Está en una calle estrecha de La Latina, no tiene página web y, si llamas para reservar, lo más probable es que nadie conteste. Aun así, los jueves a las dos ya no queda ni una mesa libre.

El motivo es el cocido. Aquí se sirve como manda la tradición, en tres vuelcos. Primero llega la sopa, con fideos finos y un caldo tan intenso que podría resucitar a cualquiera después de una mala noche. Después, los garbanzos con las verduras: repollo, zanahoria y patata, todo en su punto. Por último, la carne: morcillo, gallina, chorizo, morcilla y un tocino que se deshace en la boca.

El servicio es rápido y un poco seco, al estilo de las tabernas de toda la vida. El camarero, que lleva treinta años detrás de la barra, no pierde el tiempo con explicaciones. Si dudas^dudar, decide por ti. Si dejas algo en el plato, te mira^mirar como si le hubieras ofendido personalmente.

No todo es perfecto. El local es pequeño y ruidoso, las sillas son incómodas y en invierno las ventanas se empañan tanto que parece que estás comiendo dentro de una nube. Los postres, además, no están a la altura del resto: el arroz con leche era correcto, pero nada más.

Con todo, salimos convencidos. Por veintidós euros, con pan, vino de la casa y una sobremesa sin prisas, es difícil encontrar algo mejor en el centro. Un consejo: no comas nada en todo el día anterior. Y si el camarero te pregunta^preguntar si quieres repetir, di^decir que sí. Es la única respuesta correcta.
`);

  T('md-sobremesa', 'Elogio de la sobremesa', 'In Praise of the Sobremesa', 'Columna de radio', 'Columna original de Lucía Navarro, tu guía en Madrid (personaje de la aplicación).', `
Buenas tardes. Hoy quiero hablarles de una costumbre que los extranjeros no entienden y que los madrileños defendemos como si fuera^ser un tesoro nacional: la sobremesa.

Para quien no lo sepa, la sobremesa es ese tiempo que pasamos sentados a la mesa cuando ya hemos terminado de comer. No hay plato, no hay prisa, a veces ni siquiera hay café. Solo hay conversación. Puede durar veinte minutos o cuatro horas, y nadie sabe nunca cuál de las dos cosas va a pasar.

Un amigo alemán me contó una vez que, en su primera comida en Madrid, se levantó para pagar en cuanto terminó el postre. Todos lo miraron como si hubiera dicho algo terrible. «¿Tienes prisa?», le preguntó la anfitriona, y él, muy educado, contestó que no. «Pues entonces siéntate^sentar». Se quedó hasta las siete de la tarde. Hoy vive en Chamberí y dice que no volvería a Berlín ni aunque le pagaran el doble.

Hay quien dice que la sobremesa es una pérdida de tiempo y que por eso somos menos productivos. Puede ser. Pero yo no creo que un país se mida solo por lo que produce. En la sobremesa se arreglan familias, se rompen y se reconcilian amistades, se cuentan secretos y se deciden viajes. En la sobremesa aprendí más historia escuchando a mi abuela que en todos mis años de colegio.

Además, la sobremesa tiene sus reglas, aunque nadie las haya escrito. No se mira^mirar el móvil. No se habla de trabajo, o al menos no demasiado. Y siempre, siempre, alguien dice «bueno, me voy a ir yendo» una hora antes de marcharse de verdad.

Así que este fin de semana, cuando terminen de comer, no se levanten. Pidan otro café, aunque no les apetezca. Y escuchen. Les aseguro que merece la pena. Esto ha sido «Madrid en voz alta». Hasta la semana que viene.
`);

  T('md-alcazar', 'La Nochebuena en que ardió el Alcázar', 'The Christmas Eve the Alcázar Burned', 'Crónica histórica', 'Crónica divulgativa. Los detalles del rescate de las obras proceden de relatos de la época y no todos están confirmados.', `
En la noche del 24 de diciembre de 1734, mientras Madrid celebraba la Nochebuena, el viejo Alcázar empezó a arder. El edificio, una antigua fortaleza musulmana que los reyes habían transformado durante siglos en palacio, se levantaba en el mismo lugar donde hoy está el Palacio Real.

El rey Felipe V no se encontraba allí. La corte pasaba esas fiestas en el palacio del Buen Retiro, al otro lado de la ciudad, y en el Alcázar apenas quedaban criados y guardias. Según las crónicas, el fuego se habría originado en las habitaciones del pintor de la corte, aunque nunca se supo con certeza cómo empezó.

Al principio nadie se tomó la alarma en serio. Las campanas que avisaban del incendio sonaban tanto que muchos vecinos pensaron que llamaban a misa. Cuando por fin se dieron cuenta de lo que pasaba, las llamas ya habían alcanzado los techos de madera, y el viento de invierno hizo el resto.

El fuego duró varios días. Los que intentaban apagarlo se concentraron en salvar lo más valioso: el dinero, las joyas y, sobre todo, los cuadros. La colección real era una de las más importantes de Europa. Se cuenta que algunas pinturas se arrancaron de sus marcos y se lanzaron^lanzar por las ventanas para salvarlas. Así habría sobrevivido, entre otras, Las Meninas de Velázquez.

Otras obras no tuvieron tanta suerte. Cientos de cuadros desaparecieron para siempre, entre ellos obras de Tiziano, Rubens y del propio Velázquez. Fue una de las mayores pérdidas artísticas de la historia de España.

Felipe V no quiso reconstruir el viejo edificio. Prefirió levantar un palacio nuevo, de piedra, más moderno y, sobre todo, más difícil de quemar. Las obras empezaron en 1738 y duraron casi treinta años. El primer rey que vivió allí fue Carlos III. Hoy, quien visita el Palacio Real camina sobre las ruinas de aquella Nochebuena, aunque muy pocos lo saben.
`);

  T('md-rastro', 'Un domingo en el Rastro', 'A Sunday at the Rastro', 'Relato', 'Relato original.', `
Julia llegó al Rastro a las nueve y media, antes de que la marea de turistas convirtiera la Ribera de Curtidores en un río de gente. Llevaba una lista que su abuelo le había dictado por teléfono la noche anterior: un marco antiguo, dos discos de zarzuela y, si había suerte, «la radio».

—¿Qué radio, abuelo?

—Tú pregunta por la radio de Valentín. Ellos ya sabrán.

Encontró el marco enseguida, en un puesto donde una señora vendía de todo: muñecas sin brazos, cucharas de plata, postales de los años cincuenta. Los discos le costaron un poco más. El vendedor, un hombre con gorra y bigote blanco, le pidió veinte euros por cada uno.

—¿Veinte? Ni que fueran^ser de oro —protestó Julia.

—Son de oro, guapa. De oro puro. Pero por ser tú, treinta los dos.

Julia se rio y pagó. Luego, casi por vergüenza, le preguntó por la radio de Valentín. El hombre dejó de sonreír.

—¿Quién te ha hablado de esa radio?

—Mi abuelo. Se llama Andrés. Vivía en Lavapiés.

El vendedor se quedó callado un buen rato, como si estuviera buscando algo muy lejos. Después se agachó, sacó una caja de debajo de la mesa y la abrió con cuidado. Dentro había una radio de madera, vieja, con los botones dorados.

—Valentín era mi padre —dijo—. Esta radio estaba en su taller. Tu abuelo venía todas las tardes a escuchar los partidos, porque en su casa no tenían. Mi padre siempre decía que algún día vendría a buscarla.

—¿Cuánto cuesta?

—No está a la venta. —Le puso la caja en las manos—. Llévasela. Y dile que Valentín cumplió su palabra.

Esa tarde, en el piso de Lavapiés, el abuelo tardó mucho en encender la radio. Cuando por fin lo hizo, solo se oyó un ruido largo, sin música ni voces. Pero él cerró los ojos y sonrió, como si estuviera escuchando el mejor partido de su vida.
`);
})();
