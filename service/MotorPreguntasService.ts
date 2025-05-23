import { AlumnoRespuestaSeleccion } from "data/AlumnoRespuestaSeleccion";
import { PreguntaConRespuestas } from "data/PreguntaConRespuestas";

export function agruparPorPregunta(respuestas: AlumnoRespuestaSeleccion[]): PreguntaConRespuestas[] {
  const resultado: Record<number, PreguntaConRespuestas> = {};

  for (const respuesta of respuestas) {
    if (!resultado[respuesta.pregunta_id]) {
      resultado[respuesta.pregunta_id] = {
        pregunta_id: respuesta.pregunta_id,
        respuestas: []
      };
    }

    resultado[respuesta.pregunta_id].respuestas.push({
      respuesta_posible_id: respuesta.respuesta_posible_id,
      alumno_id: respuesta.alumno_id
    });
  }

  return Object.values(resultado);
}
