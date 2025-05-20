"use client"

import { useState, useRef } from "react"
import { StyleSheet, View, SafeAreaView, ScrollView, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import DateTimeHeader from "../components/mood-selection/DateTimeHeader"
import CloseButton from "../components/common/CloseButton"
import GreetingBubble from "../components/common/GreetingBubble"
import MascotImage from "../components/common/MascotImage"
import MoodSelector from "../components/mood-selection/MoodSelector"
import SupportMessage from "../components/mood-selection/SupportMessage"
import ContinueButton from "../components/common/ContinueButton"

const MoodSelectionScreen = () => {
  const navigation = useNavigation<any>()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const slideAnim = useRef(new Animated.Value(0)).current

  const handleClose = () => {
    navigation.navigate("MainTabs")
  }

  const handleContinue = () => {
    if (selectedMood !== null) {
<<<<<<< HEAD
      // Animar la salida de la pantalla hacia la izquierda
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Navegar a la pantalla de detalle de emoción
        navigation.navigate("EmotionDetail", { selectedMood })
      })
=======
      // Navegar directamente sin animación personalizada
      navigation.navigate("EmotionDetail", { selectedMood })
>>>>>>> c93316b (Update App AlmaIA)
    }
  }

  return (
<<<<<<< HEAD
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
=======
    <View style={styles.container}>
>>>>>>> c93316b (Update App AlmaIA)
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <DateTimeHeader />
            <CloseButton onPress={handleClose} />
          </View>

          <View style={styles.content}>
            <GreetingBubble name="Paolo" question="¿Como te sientes?" />
            <MascotImage />
            <MoodSelector onSelectMood={setSelectedMood} selectedMood={selectedMood} />
            <SupportMessage />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton onPress={handleContinue} disabled={selectedMood === null} />
        </View>
      </SafeAreaView>
<<<<<<< HEAD
    </Animated.View>
=======
    </View>
>>>>>>> c93316b (Update App AlmaIA)
  )
}

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
<<<<<<< HEAD
    marginTop:30
=======
    marginTop: 30,
>>>>>>> c93316b (Update App AlmaIA)
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footer: {
    padding: 20,
  },
})

export default MoodSelectionScreen
