import type { BgKey } from "./assets";

export type Step = {
  bg?: BgKey;
  speaker?: string;
  text: string;
  sprite?: string | null; // sprite key, null = hide
  side?: "left" | "right" | "center";
  chat?: { who: string; msg: string }[];
  fx?: "shake" | "flash" | "fade";
  caption?: string;
  narration?: boolean;
};
export type Scene = { id: string; title: string; subtitle: string; steps: Step[] };

export const CHARACTERS = [
  { name: "Lion", role: "Protagonista", desc: "Estudiante dormilón y sarcástico. Su mejor amigo es Clay y su refugio sagrado, la cama.", sprite: "lion_talk" },
  { name: "Clay", role: "Mejor amigo", desc: "Rubio, ruidoso y apostador. Esta es su última semana en la academia.", sprite: "clay_happy" },
  { name: "Yarein", role: "La chica nueva", desc: "Cabello lavanda, fuerza temible y una mirada que no promete nada bueno.", sprite: "yarein_cold" },
];

export const SCENES: Scene[] = [
  {
    id: "s1", title: "Escena 1", subtitle: "La noche del 17 de mayo",
    steps: [
      { bg: "black", caption: "9:31 p. m. — 17 de mayo de 2016", text: "Día Internacional de Internet. Tercer piso, de noche.", narration: true },
      { bg: "room", fx: "fade", text: "Restos de balas y quemaduras en las paredes. Un teclado golpeado con nervios. Respiraciones agitadas.", narration: true },
      { speaker: "???", text: "Por favor, ya no sigas con esto…", sprite: null },
      { speaker: "Chica", text: "Ya estoy cansada de lo mismo.", sprite: "yarein_cold", side: "right" },
      { text: "En el monitor hay dos ventanas. Una intenta romper contraseñas. La otra, casi oculta, es un chat.", narration: true, chat: [
        { who: "Lion", msg: "Deberías ir a una fiesta, eso sería mejor para ti." },
        { who: "???", msg: "Nwecesetio tu ayda" },
        { who: "Lion", msg: "¿De qué hablas? ¿En qué te ayudo?" },
        { who: "???", msg: "Venn rapidoo" },
        { who: "Lion", msg: "Tranquilo, ya voy." },
      ] },
      { speaker: "Chica", text: "Ya me estás cansando, Rodrigo. ¿En serio quieres seguir con este juego?", sprite: "yarein_annoyed", side: "right" },
      { text: "Rodrigo saca una navaja, se levanta e intenta empujarla. No lo consigue. Ella solo ríe.", narration: true, fx: "shake" },
      { speaker: "Chica", text: "Vamos, Rodrigo, jajaja. ¿Por qué quieres hacer las cosas más difíciles para los dos?", sprite: "yarein_sly", side: "right" },
      { speaker: "Rodrigo", text: "¿Por qué lo hacen? Yo no les hice nada.", sprite: null },
      { speaker: "Chica", text: "¿No lo entiendes? Esto no se trata de ti.", sprite: "yarein_cold", side: "right" },
      { speaker: "Joseph", text: "Señorita Yarein, esto nos está tomando más tiempo del previsto. Dudo que este individuo pueda hacer el trabajo.", sprite: null },
      { speaker: "Yarein", text: "Tienes razón… creo que ya no nos harás más falta.", sprite: "yarein_fury", side: "right" },
      { caption: "» Contraseña eliminada correctamente «", text: "Rodrigo comprende lo inservible que se ha vuelto.", narration: true, sprite: null },
      { speaker: "Rodrigo", text: "¡Por favor, no! Ya tienen lo que quieren, no me hag—", fx: "flash" },
      { speaker: "Yarein", text: "Siempre fuiste una molestia para mis planes. Es mejor que mueras como lo que eres: una escoria.", sprite: "yarein_angry", side: "center", fx: "shake" },
      { speaker: "Joseph", text: "Señorita, ¿qué hacemos con el individuo que conversaba con la herramienta?", sprite: null },
      { speaker: "Yarein", text: "Él no se va a enterar de nada, Joseph. ¿Quién le va a responder cuando llegue? ¿El cadáver?", sprite: "yarein_sly", side: "right" },
      { bg: "black", fx: "fade", sprite: null, text: "Temblando, Rodrigo alcanza un cuaderno, tacha algo con un lapicero… y muere.", narration: true },
    ],
  },
  {
    id: "s2", title: "Escena 2", subtitle: "La mañana siguiente",
    steps: [
      { bg: "black", text: "Sentí cómo mi mundo se oscurecía. La voz de Rodrigo gritaba mi nombre… ¿era real?", narration: true },
      { bg: "morning", fx: "fade", caption: "7:46 a. m. — 18 de mayo de 2016", speaker: "Lion", text: "Mi cuerpo pesa como una piedra. La cama es el lugar más sagrado que tengo… aparte del baño.", sprite: "lion_bored", side: "left" },
      { speaker: "Lion", text: "¿Y si me acuesto cinco minutos más? Después de todo, son las 7:47…", sprite: "lion_indifferent", side: "left" },
      { speaker: "Lion", text: "Espera… ¡¡¿SON LAS 7:47 DE LA MAÑANA?!!", sprite: "lion_angry", side: "left", fx: "shake" },
      { speaker: "Lion", text: "Ducha rápida, despedirme de Naomi, correr… y aun así llegué a las 8:50.", sprite: "lion_gloomy", side: "left" },
      { bg: "school", fx: "fade", speaker: "Lion", text: "El profesor no vino. Fui el único en clase. Debí leer el chat del salón…", sprite: "lion_shy", side: "left" },
      { speaker: "Lion", text: "Ya que estoy aquí, saludaré a Clay. Está jugando vóley… ¿no pasa nada si lo saludo, verdad?", sprite: "lion_sinister", side: "left" },
      { speaker: "Lion", text: "¡¡Clayyy!!", sprite: "lion_laugh", side: "left" },
      { speaker: "Clay", text: "¡¡Lionnn!!", sprite: "clay_happy", side: "right" },
      { text: "¡PUM! El balón le da de lleno en toda la cara.", narration: true, sprite: "clay_shock", side: "right", fx: "shake" },
      { speaker: "Lion", text: "Jajaja… sus compañeros perdieron la apuesta. Fue estúpido y, seguramente, único.", sprite: "lion_laugh", side: "left" },
      { speaker: "Lion", text: "Una academia al lado de un reactor nuclear… «academia nuclear». Tampoco es interesante.", sprite: "lion_sarcastic", side: "left" },
      { speaker: "Lion", text: "Clay… vas a visitar a tus abuelos, ¿verdad?", sprite: "lion_gloomy", side: "left" },
      { speaker: "Clay", text: "No puedo hacer nada… y no quiero irme. Es mi última semana aquí.", sprite: "clay_sad", side: "right" },
      { speaker: "Lion", text: "Clay, no te preocupes…", sprite: "lion_crossed", side: "left" },
      { text: "Una mirada sucia y despiadada nos observaba, como si yo fuera el blanco de un francotirador.", narration: true, sprite: "yarein_cold", side: "center" },
    ],
  },
  {
    id: "s3", title: "Escena 3", subtitle: "La chica nueva",
    steps: [
      { bg: "hall", fx: "fade", sprite: null, text: "A una esquina de salir, nos topamos con una chica.", narration: true },
      { text: "¡CHOQUE!", narration: true, fx: "shake" },
      { speaker: "Chica nueva", text: "¡Hey! ¿Qué crees que haces? ¡Acababa de arreglarme el cabello!", sprite: "yarein_angry", side: "right" },
      { speaker: "Lion", text: "¿Crees que yo tuve la culpa? ¿Por qué no te fijas por dónde vas?", sprite: "lion_angry", side: "left" },
      { speaker: "Clay", text: "¿Estás bien, Lion?", sprite: "clay_surprised", side: "left" },
      { speaker: "Chica nueva", text: "¿Crees que puedes escapar después de hacer todo esto?", sprite: "yarein_crossed", side: "right" },
      { speaker: "Lion", text: "¿Por qué crees que querríamos escapar?", sprite: "lion_indifferent", side: "left" },
      { speaker: "Chica nueva", text: "Pues yo… ¿De verdad no piensan escapar?", sprite: "yarein_confused", side: "right" },
      { speaker: "Clay", text: "Pero nadie hace eso, ¿acaso estás loc—", sprite: "clay_shy", side: "left" },
      { speaker: "Lion", text: "No… nada. Creo que ya tenemos que irnos, ¿verdad, Clay?", sprite: "lion_shy", side: "left" },
      { speaker: "Chica nueva", text: "¿A dónde creen que van?", sprite: "yarein_attack", side: "center", fx: "flash" },
      { speaker: "Clay", text: "Lion, ¿ahora qué hacemos?", sprite: "clay_shock", side: "left" },
      { speaker: "Lion", text: "Deberíamos irnos, ¿no? Esta güerita está algo loquit—", sprite: "lion_sinister", side: "left" },
      { speaker: "Chica nueva", text: "¡¡Se los traté de advertir!!", sprite: "yarein_fury", side: "center", fx: "shake" },
      { text: "Lion y Clay salen volando contra la pared y dejan su huella marcada en ella.", narration: true, sprite: null, fx: "shake" },
      { speaker: "Clay", text: "¡Ayyy, me duele! ¡Mi cuerpecito! ¡Lion, ayudaaa!", sprite: "clay_shock", side: "left" },
      { speaker: "Lion", text: "¡Ya cállate! Esto me pasa por seguir tus tonterías…", sprite: "lion_dark", side: "left" },
      { speaker: "Chica nueva", text: "No importa quién soy. Solo deberían dejar de ser unos cretinos…", sprite: "yarein_blush", side: "right" },
      { speaker: "Clay", text: "¡¡Loquita!! ¡¡Qué dices, no te escuchamosss!!", sprite: "clay_laugh", side: "left" },
      { speaker: "Yarein", text: "¡¡Ya les dije que me llamo YAREIN, y más les vale que no se les olvide!!", sprite: "yarein_fury", side: "center", fx: "flash" },
      { sprite: null, text: "Yarein se marcha avergonzada, mientras Lion y Clay se quedan confundidos…", narration: true },
      { bg: "black", fx: "fade", caption: "FIN DEL CAPÍTULO 00", text: "Continuará en el Capítulo 01.", narration: true },
    ],
  },
];
