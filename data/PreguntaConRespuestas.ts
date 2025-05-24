export interface RespuestaSeleccionada {
  respuesta_posible_id: number;
  texto_respuesta:string;
  alumno_id: number;
}

export interface PreguntaConRespuestas {
  pregunta_id: number;
  texto_pregunta:string;
  grupo_preguntas:string;
  respuestas: RespuestaSeleccionada[];
}
