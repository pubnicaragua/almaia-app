"use client"

import { useState } from "react"
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import BackButton from "../components/common/BackButton"
import CloseButton from "../components/common/CloseButton"
import ProgressBar from "../components/common/ProgressBar"
import ContinueButton from "../components/common/ContinueButton"

const DiaryEntryScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const [diaryText, setDiaryText] = useState(
    "Hoy fue un día muy divertido. En la mañana jugué con mis amigos y nos reímos mucho. En la tarde hice mi tarea y aunque fue un poco difícil, me sentí orgulloso cuando la terminé. También hablé con Almie y me recordó que está bien sentir muchas emociones en un solo día. Me hizo pensar en lo bueno que pasó hoy y me gustó escribirlo aquí. ¡Mañana será otro día para seguir aprendiendo y divirtiéndome!",
  )

  const handleBack = () => {
    navigation.goBack()
  }

  const handleClose = () => {
    navigation.navigate("MainTabs")
  }

  const handleContinue = () => {
    navigation.navigate("ThankYou", {
      selectedMood: route.params?.selectedMood,
      selectedEmotion: route.params?.selectedEmotion,
      emotionType: route.params?.emotionType,
      selectedActivities: route.params?.selectedActivities,
      diaryText,
    })
  }

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
          <CloseButton onPress={handleClose} />
        </View>

        <ProgressBar progress={0.75} />

        <View style={styles.content}>
          <Text style={styles.title}>¿Deseas agregar algo a tu diario?</Text>

          <View style={styles.diaryContainer}>
            <TextInput
              style={styles.diaryInput}
              multiline
              value={diaryText}
              onChangeText={setDiaryText}
              maxLength={1000}
              textAlignVertical="top"
            />
            <View style={styles.diaryFooter}>
              <Text style={styles.charCount}>{diaryText.length}/1000</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <ContinueButton onPress={handleContinue} />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "#A9D4FB",
  },
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
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },
  diaryContainer: {
    backgroundColor: "#64B5F6",
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginBottom: 20,
  },
  diaryInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  diaryFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  charCount: {
    color: "white",
    fontSize: 14,
  },
  footer: {
    padding: 20,
  },
})

export default DiaryEntryScreen
