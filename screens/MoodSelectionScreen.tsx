"use client";

import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // ¡Añade useRoute!
import DateTimeHeader from "../components/mood-selection/DateTimeHeader";
import CloseButton from "../components/common/CloseButton";
import GreetingBubble from "../components/common/GreetingBubble";
import MascotImage from "../components/common/MascotImage";
import MoodSelector from "../components/mood-selection/MoodSelector";
import SupportMessage from "../components/mood-selection/SupportMessage";
import ContinueButton from "../components/common/ContinueButton";
import { useAuth } from "context/AuthContext";
import { API_ENDPOINTS, fetchAuthApi } from "config/api";
import { MoodOption } from "data/MoodOption";
import { RespuestaAlumno } from "data/RespuestaAlumno";
import {
  fineface,
  veryfineface,
  verysadface,
  sadface,
  neutralface,
} from "@/indexsvfg";
import { AlumnoRespuestaSeleccion } from "data/AlumnoRespuestaSeleccion";

// Tipos para los parámetros de navegación (TypeScript)
type RouteParams = {
  alumnoId?: number;
  preguntaId?: number;
  respuesta?: AlumnoRespuestaSeleccion; // Asegúrate de importar esta interfaz
  customData?: any; // Para datos adicionales
};

const MoodSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute(); // Obtiene los parámetros
  const params = route.params as RouteParams; // Tipado en TypeScript

  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [tieneRespuesta, setTieneRespuesta] = useState<boolean>(false);
  const [moods, setMoods] = useState<MoodOption[] | null>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const [pregunta, setPregunta] = useState("");

  // ¡Ahora puedes acceder a los parámetros!
  console.log("Parámetros recibidos:", params);

  const handleClose = () => {
    navigation.navigate("MainTabs");
  };

  const handleContinue = () => {
    if (selectedMood !== null) {
      navigation.navigate("EmotionDetail", { selectedMood });
    }
  };

  useEffect(() => {
    if (!tieneRespuesta) {
      obtenerPreguntas();
    }
  }, []); // Añade dependencias vacías para evitar bucles

  async function obtenerPreguntas() {
    try {
      const preguntas = await fetchAuthApi(
        API_ENDPOINTS.ALUMNOS_RESPUESTAS + "?alumno_id=" + user?.alumno_id,
        { method: "GET" }
      );

      setPregunta(preguntas[0]?.preguntas.texto_pregunta);

      const moods_db: MoodOption[] = preguntas.map((item: RespuestaAlumno) => {
        const icon =
          item.respuestas_posibles.respuesta_posible_id === 1
            ? verysadface
            : item.respuestas_posibles.respuesta_posible_id === 2
            ? fineface
            : item.respuestas_posibles.respuesta_posible_id === 3
            ? neutralface
            : item.respuestas_posibles.respuesta_posible_id === 4
            ? sadface            
            : item.respuestas_posibles.respuesta_posible_id === 5
            ? verysadface
            : veryfineface; 

        return {
          id: item.respuestas_posibles.respuesta_posible_id,
          label: item.respuestas_posibles.nombre,
          icon: icon,
        };
      });

      setMoods(moods_db);
      setTieneRespuesta(true);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <DateTimeHeader />
            <CloseButton onPress={handleClose} />
          </View>

          <View style={styles.content}>
            <GreetingBubble name={user?.name || ""} question={pregunta} />
            <MascotImage />
            <MoodSelector
              onSelectMood={setSelectedMood}
              selectedMood={selectedMood}
              moods={moods}
            />
            <SupportMessage />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton
            onPress={handleContinue}
            disabled={selectedMood === null}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

// ... (los estilos se mantienen igual)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer: {
    padding: 20,
  },
});

export default MoodSelectionScreen;
