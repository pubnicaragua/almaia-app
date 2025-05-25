"use client"

import { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "../components/common/BackButton"
import CloseButton from "../components/common/CloseButton"
import ProgressBar from "../components/common/ProgressBar"
import ActivityGrid from "../components/good-day-factors/ActivityGrid"
import ContinueButton from "../components/common/ContinueButton"
import { RouteParamsPreguntas } from "data/RouteParamsPreguntas"
import { Activity } from "data/Activity"
import { mapearActivity } from "service/MotorPreguntasService"

const GoodDayFactorsScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const params = route.params as RouteParamsPreguntas; // Tipado en TypeScript
  const [pregunta, setPregunta] = useState("");
  const [activities, setActivities] = useState<Activity[]>( [ ]);
  const [indice, setIndice] = useState<number>(0);
  const [tieneRespuesta, setTieneRespuesta] = useState<boolean>(false);
   async function obtenerPreguntas() {
      try {
        const preguntas = params.preguntas;
        const indice_params = params.indice;
        setIndice(indice_params);
        setPregunta(preguntas[indice_params]?.texto_pregunta);
        const respuestas = mapearActivity(preguntas[indice_params].respuestas) 
        setActivities(respuestas)
        setTieneRespuesta(true);
      } catch (error) {}
    }
    useEffect(() => {
      if (!tieneRespuesta) {
        obtenerPreguntas();
      }
    }, []); // Añade dependencias vacías para evitar bucles
  
  const handleBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.navigate("MainTabs")
  }

  const handleContinue = () => {
    if (selectedActivities.length > 0) {
      navigation.navigate("DiaryEntry", {
        selectedMood: route.params?.selectedMood,
        selectedEmotion: route.params?.selectedEmotion,
        emotionType: route.params?.emotionType,
        selectedActivities,
      })
    }
  }

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) => {
      if (prev.includes(activity)) {
        return prev.filter((a) => a !== activity)
      } else {
        return [...prev, activity]
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <CloseButton onPress={handleClose} />
      </View>

      <ProgressBar progress={0.5} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{pregunta}</Text>

        <ActivityGrid selectedActivities={selectedActivities} onToggleActivity={toggleActivity} activities={activities}/>
      </ScrollView>

      <View style={styles.footer}>
        <ContinueButton onPress={handleContinue} disabled={selectedActivities.length === 0} />
      </View>
    </View>
  )
}

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
})

export default GoodDayFactorsScreen
