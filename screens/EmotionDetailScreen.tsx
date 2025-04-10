"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, View, Text, Animated, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "../components/common/BackButton"
import CloseButton from "../components/common/CloseButton"
import ProgressBar from "../components/common/ProgressBar"
import EmotionTypeSelector from "../components/emotion-detail/EmotionTypeSelector"
import EmotionGrid from "../components/emotion-detail/EmotionGrid"
import ContinueButton from "../components/common/ContinueButton"

const EmotionDetailScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const [selectedType, setSelectedType] = useState("positive")
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const slideAnim = useRef(new Animated.Value(300)).current // Comienza fuera de la pantalla

  useEffect(() => {
    // Animar la entrada de la pantalla
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [])

  const handleBack = () => {
    // Animar la salida de la pantalla
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      navigation.goBack()
    })
  }

  const handleClose = () => {
    navigation.navigate("MainTabs")
  }

  const handleContinue = () => {
    if (selectedEmotion) {
      // Animar la salida de la pantalla hacia la izquierda
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Navegar a la pantalla de factores de buen día
        navigation.navigate("GoodDayFactors", {
          selectedMood: route.params?.selectedMood,
          selectedEmotion: selectedEmotion,
          emotionType: selectedType,
        })
      })
    }
  }

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
  ]

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
  ]

  const emotions = selectedType === "positive" ? positiveEmotions : negativeEmotions

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <CloseButton onPress={handleClose} />
      </View>

      <ProgressBar progress={0.25} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Ahora te sientes?</Text>

        <EmotionTypeSelector selectedType={selectedType} onSelectType={setSelectedType} />

        <EmotionGrid emotions={emotions} selectedEmotion={selectedEmotion} onSelectEmotion={setSelectedEmotion} />
      </ScrollView>

      <View style={styles.footer}>
        <ContinueButton onPress={handleContinue} disabled={!selectedEmotion} />
      </View>
    </Animated.View>
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

export default EmotionDetailScreen
