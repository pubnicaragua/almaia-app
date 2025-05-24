import {
  fineface,
  neutralface,
  sadface,
  veryfineface,
  verysadface,
} from "@/indexsvfg";
import { MoodOption } from "data/MoodOption";
import {
  PreguntaConRespuestas,
  RespuestaSeleccionada,
} from "data/PreguntaConRespuestas";
import { RespuestaAlumno } from "data/RespuestaAlumno";

export function agruparPorPregunta(
  respuestas: RespuestaAlumno[]
): PreguntaConRespuestas[] {
  const resultado: Record<number, PreguntaConRespuestas> = {};

  for (const respuesta of respuestas) {
    if (!resultado[respuesta.pregunta_id]) {
      resultado[respuesta.pregunta_id] = {
        pregunta_id: respuesta.pregunta_id,
        grupo_preguntas: respuesta.preguntas.grupo_preguntas,
        texto_pregunta: respuesta.preguntas.texto_pregunta,
        respuestas: [],
      };
    }

    resultado[respuesta.pregunta_id].respuestas.push({
      respuesta_posible_id: respuesta?.respuesta_posible_id||0,
      texto_respuesta: respuesta?.respuestas_posibles?.nombre||" ",
      alumno_id: respuesta?.alumno_id||0,
    });
  }

  return Object.values(resultado);
}
export function mapearPreguntasaEmociones(
  preguntas: PreguntaConRespuestas[],indice:number
): MoodOption[] {
  return preguntas[indice]?.respuestas.map((item: RespuestaSeleccionada) => {
    const icon =
      item.respuesta_posible_id === 1
        ? verysadface
        : item.respuesta_posible_id === 2
        ? fineface
        : item.respuesta_posible_id === 3
        ? neutralface
        : item.respuesta_posible_id === 4
        ? sadface
        : item.respuesta_posible_id === 5
        ? verysadface
        : veryfineface;

    return {
      id: item.respuesta_posible_id,
      label: item.texto_respuesta,
      icon: icon,
    };
  });
}
