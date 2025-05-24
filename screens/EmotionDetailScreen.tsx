"use client";

import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButton from "../components/common/BackButton";
import CloseButton from "../components/common/CloseButton";
import ProgressBar from "../components/common/ProgressBar";
import EmotionTypeSelector from "../components/emotion-detail/EmotionTypeSelector";
import EmotionGrid from "../components/emotion-detail/EmotionGrid";
import ContinueButton from "../components/common/ContinueButton";
import { RouteParamsPreguntas } from "data/RouteParamsPreguntas";

const EmotionDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [selectedType, setSelectedType] = useState("positive");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const params = route.params as RouteParamsPreguntas; // Tipado en TypeScript
  const [pregunta, setPregunta] = useState("");
  const [indice, setIndice] = useState<number>(0);
  const [tieneRespuesta, setTieneRespuesta] = useState<boolean>(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.navigate("MainTabs");
  };

  const handleContinue = () => {
    if (selectedEmotion) {
      navigation.navigate("GoodDayFactors", {
        selectedMood: route.params?.selectedMood,
        selectedEmotion: selectedEmotion,
        emotionType: selectedType,
      });
    }
  };

  const positiveEmotions = [
    "Feliz",
    "Emocionado",
    "Tranquilo",
    "Orgulloso",
    "Agradecido",
    "Curioso",
    "Motivado",
    "Amado",
    "Divertido",
    "En paz",
  ];

  const negativeEmotions = [
    "Triste",
    "Enojado",
    "Ansioso",
    "Frustrado",
    "Cansado",
    "Confundido",
    "Preocupado",
    "Decepcionado",
    "Abrumado",
    "Inseguro",
  ];

  const emotions =
    selectedType === "positive" ? positiveEmotions : negativeEmotions;
  async function obtenerPreguntas() {
    try {
      const preguntas = params.preguntas;
      const indice_params = params.indice;
      setIndice(indice_params);
      setPregunta(preguntas[indice_params]?.texto_pregunta);
      setTieneRespuesta(true);
    } catch (error) {}
  }
  useEffect(() => {
    if (!tieneRespuesta) {
      obtenerPreguntas();
    }
  }, []); // Añade dependencias vacías para evitar bucles

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <CloseButton onPress={handleClose} />
      </View>

      <ProgressBar progress={0.25} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{pregunta}</Text>

        <EmotionTypeSelector
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />

        <EmotionGrid
          emotions={emotions}
          selectedEmotion={selectedEmotion}
          onSelectEmotion={setSelectedEmotion}
        />
      </ScrollView>

      <View style={styles.footer}>
        <ContinueButton onPress={handleContinue} disabled={!selectedEmotion} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40, // Para dar espacio a la barra de estado
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },
  footer: {
    padding: 20,
  },
});

export default EmotionDetailScreen;
