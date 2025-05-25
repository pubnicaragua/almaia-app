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
import { MoodOption } from "data/MoodOption";
import { mapearPreguntasaEmociones, siguientePregunta } from "service/MotorPreguntasService";
import { RouteParamsPreguntas } from "data/RouteParamsPreguntas";
import { pantallaPregunta } from "data/PantallaPreguntas";

const MoodSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute(); // Obtiene los parámetros
  const params = route.params as RouteParamsPreguntas; // Tipado en TypeScript
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [tieneRespuesta, setTieneRespuesta] = useState<boolean>(false);
  const [moods, setMoods] = useState<MoodOption[] | null>([]);
  const [indice, setIndice] = useState<number>(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const [pregunta, setPregunta] = useState("");
  const handleClose = () => {
    navigation.navigate("MainTabs");
  };

  const handleContinue = () => {
    if (selectedMood !== null) {
      const indice =params.indice+1
     siguientePregunta(navigation,pantallaPregunta[params.preguntas[indice]?.template_code],params.preguntas,indice)
    }
  };

  useEffect(() => {
    if (!tieneRespuesta) {
      obtenerPreguntas();
    }
  }, []); // Añade dependencias vacías para evitar bucles

  async function obtenerPreguntas() {
    try {
      const preguntas = params.preguntas;
      const indice_params = params.indice;
      setIndice(indice_params);
      setPregunta(preguntas[indice_params]?.texto_pregunta);
      const moods_option: MoodOption[] = mapearPreguntasaEmociones(
        preguntas,
        indice_params
      );
      setMoods(moods_option);
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
