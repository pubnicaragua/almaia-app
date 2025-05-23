interface RespuestaSeleccionada {
  respuesta_posible_id: number;
  alumno_id: number;
}

export interface PreguntaConRespuestas {
  pregunta_id: number;
  respuestas: RespuestaSeleccionada[];
}
